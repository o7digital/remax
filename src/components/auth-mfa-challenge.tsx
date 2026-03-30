"use client";

import { useEffect, useState } from "react";
import type { Factor } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

export function AuthMfaChallenge({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [code, setCode] = useState("");
  const [factors, setFactors] = useState<Factor[]>([]);
  const [selectedFactorId, setSelectedFactorId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadState() {
      const [{ data: aalData, error: aalError }, { data: factorData, error: factorError }] = await Promise.all([
        supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
        supabase.auth.mfa.listFactors()
      ]);

      if (!active) {
        return;
      }

      if (aalError || factorError) {
        setError("Impossible de charger l'etat MFA.");
        setLoading(false);
        return;
      }

      if (aalData?.currentLevel === "aal2") {
        router.replace(nextPath);
        return;
      }

      const verifiedFactors = factorData?.all.filter((factor) => factor.status === "verified") ?? [];

      if (verifiedFactors.length === 0) {
        router.replace(`/app/settings/security?setup=required&next=${encodeURIComponent(nextPath)}`);
        return;
      }

      setFactors(verifiedFactors);
      setSelectedFactorId((currentFactorId) => currentFactorId || verifiedFactors[0]?.id || "");
      setLoading(false);
    }

    void loadState();

    return () => {
      active = false;
    };
  }, [nextPath, router, supabase.auth.mfa]);

  async function handleSubmit(formData: FormData) {
    const submittedCode = String(formData.get("code") ?? "").trim();
    const factorId = String(formData.get("factorId") ?? selectedFactorId).trim();

    if (!submittedCode || !factorId) {
      setError("Code MFA obligatoire.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code: submittedCode
    });

    setSubmitting(false);

    if (verifyError) {
      setError("Code invalide. Reessaye avec le code courant de ton application d'authentification.");
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-card-header">
          <p className="eyebrow">MFA Challenge</p>
          <h1>Verifier le second facteur</h1>
          <p className="page-description">
            Entre le code TOTP de ton application d&apos;authentification pour acceder a l&apos;ERP.
          </p>
        </div>

        {loading ? <p className="page-description">Chargement du challenge MFA...</p> : null}
        {error ? <p className="auth-error">{error}</p> : null}

        {!loading ? (
          <form
            className="auth-form"
            action={(formData) => {
              void handleSubmit(formData);
            }}
          >
            <label className="field">
              <span className="field-label">Facteur</span>
              <select
                name="factorId"
                value={selectedFactorId}
                onChange={(event) => setSelectedFactorId(event.target.value)}
              >
                {factors.map((factor) => (
                  <option key={factor.id} value={factor.id}>
                    {factor.friendly_name ?? "Authenticator app"}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">Code a 6 chiffres</span>
              <input
                type="text"
                name="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                required
              />
            </label>

            <button type="submit" className="button" disabled={submitting}>
              {submitting ? "Verification..." : "Valider le code"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

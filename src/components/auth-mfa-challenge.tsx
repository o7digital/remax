"use client";

import { useEffect, useState } from "react";
import type { Factor } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { tryCreateClient } from "@/utils/supabase/client";

export function AuthMfaChallenge({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [supabase] = useState(() => tryCreateClient());
  const [code, setCode] = useState("");
  const [factors, setFactors] = useState<Factor[]>([]);
  const [selectedFactorId, setSelectedFactorId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadState() {
      if (!supabase) {
        if (active) {
          setError("No se pudo inicializar el cliente de autenticacion.");
          setLoading(false);
        }
        return;
      }

      const [{ data: aalData, error: aalError }, { data: factorData, error: factorError }] = await Promise.all([
        supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
        supabase.auth.mfa.listFactors()
      ]);

      if (!active) {
        return;
      }

      if (aalError || factorError) {
        setError("No se pudo cargar el estado MFA.");
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
  }, [nextPath, router, supabase]);

  async function handleSubmit(formData: FormData) {
    if (!supabase) {
      setError("No se pudo inicializar el cliente de autenticacion.");
      return;
    }

    const submittedCode = String(formData.get("code") ?? "").trim();
    const factorId = String(formData.get("factorId") ?? selectedFactorId).trim();

    if (!submittedCode || !factorId) {
      setError("El codigo MFA es obligatorio.");
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
      setError("Codigo invalido. Intenta de nuevo con el codigo actual de tu aplicacion autenticadora.");
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
          <h1>Verifica el segundo factor</h1>
          <p className="page-description">
            Introduce el codigo TOTP de tu aplicacion autenticadora para entrar al ERP.
          </p>
        </div>

        {loading ? <p className="page-description">Cargando desafio MFA...</p> : null}
        {error ? <p className="auth-error">{error}</p> : null}

        {!loading ? (
          <form
            className="auth-form"
            action={(formData) => {
              void handleSubmit(formData);
            }}
          >
            <label className="field">
              <span className="field-label">Factor</span>
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
              <span className="field-label">Codigo de 6 digitos</span>
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
              {submitting ? "Verificando..." : "Validar codigo"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

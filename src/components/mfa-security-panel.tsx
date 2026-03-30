"use client";

import { useEffect, useMemo, useState } from "react";
import type { Factor } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

type SecurityState = {
  currentLevel: "aal1" | "aal2" | null;
  factors: Factor[];
};

type PendingEnrollment = {
  id: string;
  friendlyName: string;
  qrCode: string;
  secret: string;
};

function encodeQrCode(svgMarkup: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}`;
}

export function MfaSecurityPanel({
  nextPath,
  setupRequired
}: {
  nextPath: string;
  setupRequired: boolean;
}) {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [security, setSecurity] = useState<SecurityState>({ currentLevel: null, factors: [] });
  const [pendingEnrollment, setPendingEnrollment] = useState<PendingEnrollment | null>(null);
  const [friendlyName, setFriendlyName] = useState("ERP Admin");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifiedFactors = useMemo(
    () => security.factors.filter((factor) => factor.status === "verified"),
    [security.factors]
  );

  async function refreshState() {
    const [{ data: aalData, error: aalError }, { data: factorData, error: factorError }] = await Promise.all([
      supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
      supabase.auth.mfa.listFactors()
    ]);

    if (aalError || factorError) {
      throw aalError ?? factorError;
    }

    setSecurity({
      currentLevel: aalData?.currentLevel ?? null,
      factors: factorData?.all ?? []
    });
  }

  useEffect(() => {
    let active = true;

    async function loadState() {
      try {
        await refreshState();
        if (active) {
          setLoading(false);
        }
      } catch {
        if (active) {
          setError("Impossible de charger la configuration de securite.");
          setLoading(false);
        }
      }
    }

    void loadState();

    return () => {
      active = false;
    };
  }, [supabase.auth.mfa]);

  async function handleEnroll() {
    setBusy(true);
    setError(null);

    const { data, error: enrollError } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: friendlyName.trim() || "ERP Admin"
    });

    setBusy(false);

    if (enrollError || !data || data.type !== "totp") {
      setError("Impossible d'activer le facteur TOTP.");
      return;
    }

    setPendingEnrollment({
      id: data.id,
      friendlyName: data.friendly_name ?? (friendlyName.trim() || "ERP Admin"),
      qrCode: data.totp.qr_code,
      secret: data.totp.secret
    });
    setVerificationCode("");
    await refreshState();
  }

  async function handleVerify() {
    if (!pendingEnrollment || verificationCode.length !== 6) {
      setError("Entre un code TOTP valide a 6 chiffres.");
      return;
    }

    setBusy(true);
    setError(null);

    const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
      factorId: pendingEnrollment.id,
      code: verificationCode
    });

    setBusy(false);

    if (verifyError) {
      setError("Verification MFA invalide. Utilise le code TOTP courant.");
      return;
    }

    setPendingEnrollment(null);
    setVerificationCode("");
    await refreshState();
    router.refresh();
  }

  async function handleUnenroll(factorId: string) {
    setBusy(true);
    setError(null);

    const { error: unenrollError } = await supabase.auth.mfa.unenroll({
      factorId
    });

    setBusy(false);

    if (unenrollError) {
      setError("Suppression du facteur refusee. Un facteur verifie demande une session aal2.");
      return;
    }

    await refreshState();
  }

  return (
    <div className="security-stack">
      {setupRequired ? (
        <div className="security-banner">
          <strong>Second facteur requis.</strong>
          <span>Active et verifie ton application TOTP avant d&apos;ouvrir l&apos;ERP.</span>
        </div>
      ) : null}

      {loading ? <p className="page-description">Chargement de la configuration de securite...</p> : null}
      {error ? <p className="auth-error">{error}</p> : null}

      {!loading ? (
        <>
          <div className="security-grid">
            <div className="security-card">
              <p className="eyebrow">Session</p>
              <strong>{security.currentLevel === "aal2" ? "AAL2 active" : "AAL1 uniquement"}</strong>
              <p className="page-description">
                {security.currentLevel === "aal2"
                  ? "La session courante a deja valide le second facteur."
                  : "Le second facteur n'est pas encore verifie sur cette session."}
              </p>
            </div>

            <div className="security-card">
              <p className="eyebrow">Facteurs verifies</p>
              <strong>{verifiedFactors.length}</strong>
              <p className="page-description">
                {verifiedFactors.length > 0
                  ? "Un login futur exigera le code TOTP apres le mot de passe."
                  : "Aucun facteur verifie. Le compte reste en simple mot de passe."}
              </p>
            </div>
          </div>

          <div className="security-panel">
            <div className="security-panel-header">
              <div>
                <p className="eyebrow">Activer TOTP</p>
                <h2>Ajouter une application d&apos;authentification</h2>
              </div>
              {verifiedFactors.length > 0 ? (
                <button type="button" className="button button-secondary" onClick={() => router.push(nextPath)}>
                  Continuer vers l&apos;ERP
                </button>
              ) : null}
            </div>

            <label className="field">
              <span className="field-label">Nom du facteur</span>
              <input
                type="text"
                value={friendlyName}
                onChange={(event) => setFriendlyName(event.target.value)}
                placeholder="ERP Admin"
              />
            </label>

            <div className="button-row">
              <button type="button" className="button" disabled={busy} onClick={() => void handleEnroll()}>
                {busy && !pendingEnrollment ? "Activation..." : "Generer le QR code"}
              </button>
            </div>

            {pendingEnrollment ? (
              <div className="mfa-enrollment">
                <div className="mfa-qr">
                  <img
                    src={encodeQrCode(pendingEnrollment.qrCode)}
                    alt={`QR code pour ${pendingEnrollment.friendlyName}`}
                  />
                </div>

                <div className="mfa-secret">
                  <p className="field-label">Secret manuel</p>
                  <code>{pendingEnrollment.secret}</code>
                  <p className="page-description">
                    Si le QR ne passe pas, copie ce secret dans ton application d&apos;authentification.
                  </p>

                  <label className="field">
                    <span className="field-label">Code TOTP</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                      required
                    />
                  </label>

                  <button type="button" className="button" disabled={busy} onClick={() => void handleVerify()}>
                    {busy ? "Verification..." : "Verifier le facteur"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="security-panel">
            <div className="security-panel-header">
              <div>
                <p className="eyebrow">Facteurs enregistres</p>
                <h2>Applications deja attachees</h2>
              </div>
            </div>

            {security.factors.length === 0 ? (
              <p className="page-description">Aucun facteur MFA attache a ce compte.</p>
            ) : (
              <div className="factor-list">
                {security.factors.map((factor) => (
                  <div key={factor.id} className="factor-row">
                    <div>
                      <strong>{factor.friendly_name ?? "Authenticator app"}</strong>
                      <p className="page-description">
                        {factor.factor_type.toUpperCase()} · {factor.status}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="button button-secondary"
                      disabled={busy}
                      onClick={() => void handleUnenroll(factor.id)}
                    >
                      Retirer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

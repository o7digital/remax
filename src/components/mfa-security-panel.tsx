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
          setError("No se pudo cargar la configuracion de seguridad.");
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
      setError("No se pudo activar el factor TOTP.");
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
      setError("Introduce un codigo TOTP valido de 6 digitos.");
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
      setError("Verificacion MFA invalida. Usa el codigo TOTP actual.");
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
      setError("No se pudo eliminar el factor. Un factor verificado requiere una sesion aal2.");
      return;
    }

    await refreshState();
  }

  return (
    <div className="security-stack">
      {setupRequired ? (
        <div className="security-banner">
          <strong>Segundo factor obligatorio.</strong>
          <span>Activa y verifica tu aplicacion TOTP antes de abrir el ERP.</span>
        </div>
      ) : null}

      {loading ? <p className="page-description">Cargando configuracion de seguridad...</p> : null}
      {error ? <p className="auth-error">{error}</p> : null}

      {!loading ? (
        <>
          <div className="security-grid">
            <div className="security-card">
              <p className="eyebrow">Sesion</p>
              <strong>{security.currentLevel === "aal2" ? "AAL2 activa" : "Solo AAL1"}</strong>
              <p className="page-description">
                {security.currentLevel === "aal2"
                  ? "La sesion actual ya valido el segundo factor."
                  : "El segundo factor todavia no esta validado en esta sesion."}
              </p>
            </div>

            <div className="security-card">
              <p className="eyebrow">Factores verificados</p>
              <strong>{verifiedFactors.length}</strong>
              <p className="page-description">
                {verifiedFactors.length > 0
                  ? "El proximo acceso exigira el codigo TOTP despues de la contrasena."
                  : "No hay factores verificados. La cuenta sigue solo con contrasena."}
              </p>
            </div>
          </div>

          <div className="security-panel">
            <div className="security-panel-header">
              <div>
                <p className="eyebrow">Activar TOTP</p>
                <h2>Agregar una aplicacion autenticadora</h2>
              </div>
              {verifiedFactors.length > 0 ? (
                <button type="button" className="button button-secondary" onClick={() => router.push(nextPath)}>
                  Continuar al ERP
                </button>
              ) : null}
            </div>

            <label className="field">
              <span className="field-label">Nombre del factor</span>
              <input
                type="text"
                value={friendlyName}
                onChange={(event) => setFriendlyName(event.target.value)}
                placeholder="ERP Admin"
              />
            </label>

            <div className="button-row">
              <button type="button" className="button" disabled={busy} onClick={() => void handleEnroll()}>
                {busy && !pendingEnrollment ? "Activando..." : "Generar codigo QR"}
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
                  <p className="field-label">Secreto manual</p>
                  <code>{pendingEnrollment.secret}</code>
                  <p className="page-description">
                    Si el QR no funciona, copia este secreto en tu aplicacion autenticadora.
                  </p>

                  <label className="field">
                    <span className="field-label">Codigo TOTP</span>
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
                    {busy ? "Verificando..." : "Verificar factor"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="security-panel">
            <div className="security-panel-header">
              <div>
                <p className="eyebrow">Factores registrados</p>
                <h2>Aplicaciones ya vinculadas</h2>
              </div>
            </div>

            {security.factors.length === 0 ? (
              <p className="page-description">No hay factores MFA vinculados a esta cuenta.</p>
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
                      Quitar
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

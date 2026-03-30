import { redirect } from "next/navigation";

import { signInAction } from "@/app/auth/actions";
import { sanitizeNextPath } from "@/utils/supabase/auth";
import { createServerClientFromCookies } from "@/utils/supabase/server";

function getSingleParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AuthLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string | string[]; next?: string | string[] }>;
}) {
  const supabase = await createServerClientFromCookies();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const params = await searchParams;
  const nextPath = sanitizeNextPath(getSingleParam(params.next));
  const error = getSingleParam(params.error);

  if (user) {
    redirect(nextPath);
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-card-header">
          <p className="eyebrow">Backoffice O7</p>
          <h1>Acceso seguro</h1>
          <p className="page-description">
            Accede al backoffice O7 con autenticacion por correo, contrasena y segundo factor.
          </p>
        </div>

        {error ? (
          <p className="auth-error">
            {error === "missing"
              ? "Correo y contrasena obligatorios."
              : "Acceso invalido. Verifica las credenciales de la cuenta administradora."}
          </p>
        ) : null}

        <form action={signInAction} className="auth-form">
          <input type="hidden" name="next" value={nextPath} />

          <label className="field">
            <span className="field-label">Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>

          <label className="field">
            <span className="field-label">Contrasena</span>
            <input type="password" name="password" autoComplete="current-password" required />
          </label>

          <button type="submit" className="button">
            Entrar al ERP
          </button>
        </form>

        <div className="auth-footer">
          <span>Plataforma segura conectada a Supabase.</span>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
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
          <p className="eyebrow">Admin Access</p>
          <h1>Connexion ERP</h1>
          <p className="page-description">
            Authentification admin sur Supabase. Cette base servira au 2FA juste apres.
          </p>
        </div>

        {error ? (
          <p className="auth-error">
            {error === "missing"
              ? "Email et mot de passe obligatoires."
              : "Connexion invalide. Verifie les identifiants du compte admin."}
          </p>
        ) : null}

        <form action={signInAction} className="auth-form">
          <input type="hidden" name="next" value={nextPath} />

          <label className="field">
            <span className="field-label">Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>

          <label className="field">
            <span className="field-label">Mot de passe</span>
            <input type="password" name="password" autoComplete="current-password" required />
          </label>

          <button type="submit" className="button">
            Ouvrir l&apos;ERP
          </button>
        </form>

        <div className="auth-footer">
          <span>Environnement de dev branche sur Supabase.</span>
          <Link href="/remax-demo/login" className="button button-secondary">
            Ouvrir la demo REMAX
          </Link>
        </div>
      </div>
    </div>
  );
}

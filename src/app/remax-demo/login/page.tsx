import { remaxDemoNotice } from "@/remax-demo/data";
import { loginAction } from "@/remax-demo/auth-actions";
import {
  REMAX_DEMO_HOME_PATH,
  remaxDemoLoginAccounts,
  sanitizeRemaxDemoNextPath
} from "@/remax-demo/auth-config";
import { getSingleSearchParam } from "@/remax-demo/formatters";
import { getRemaxLanguage } from "@/remax-demo/get-language";

export default async function RemaxDemoLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string | string[]; next?: string | string[] }>;
}) {
  const language = await getRemaxLanguage();
  const params = await searchParams;
  const error = getSingleSearchParam(params.error) === "invalid";
  const nextPath = sanitizeRemaxDemoNextPath(getSingleSearchParam(params.next) ?? REMAX_DEMO_HOME_PATH);

  return (
    <div className="remax-auth-card">
      <div className="remax-auth-card-header">
        <span>{language === "en" ? "Test access" : "Acceso de prueba"}</span>
        <strong>{language === "en" ? "Login to the REMAX demo" : "Ingresar a la demo REMAX"}</strong>
        <p>
          {language === "en"
            ? "Simple access for the client test environment with demo-only data."
            : "Acceso simple para el entorno de prueba del cliente con datos exclusivamente ficticios."}
        </p>
      </div>

      {error ? (
        <p className="remax-auth-error">
          {language === "en"
            ? "Invalid credentials. Use one of the demo profiles below."
            : "Credenciales invalidas. Usa uno de los perfiles demo listados abajo."}
        </p>
      ) : null}

      <form action={loginAction} className="remax-auth-form">
        <input type="hidden" name="next" value={nextPath} />

        <label className="remax-field">
          <span>{language === "en" ? "Email" : "Correo"}</span>
          <input
            type="email"
            name="email"
            placeholder={remaxDemoLoginAccounts[0]?.email}
            autoComplete="username"
            required
          />
        </label>

        <label className="remax-field">
          <span>{language === "en" ? "Password" : "Password"}</span>
          <input
            type="password"
            name="password"
            placeholder={remaxDemoLoginAccounts[0]?.password}
            autoComplete="current-password"
            required
          />
        </label>

        <button type="submit" className="button">
          {language === "en" ? "Open demo" : "Abrir demo"}
        </button>
      </form>

      <div className="remax-auth-note">
        <strong>{remaxDemoNotice}</strong>
        <p>
          {language === "en"
            ? "The same structure is ready to evolve toward real roles and a stronger auth provider later."
            : "La misma estructura queda lista para evolucionar despues hacia roles reales y un proveedor de autenticacion mas robusto."}
        </p>
      </div>

      <div className="remax-auth-account-list">
        {remaxDemoLoginAccounts.map((account) => (
          <article key={account.id} className="remax-auth-account">
            <span>{account.roleLabel}</span>
            <strong>{account.name}</strong>
            <p>{account.email}</p>
            <code>{account.password}</code>
          </article>
        ))}
      </div>
    </div>
  );
}

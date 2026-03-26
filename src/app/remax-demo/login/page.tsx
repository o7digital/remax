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

      <div className="remax-auth-section-header">
        <span>{language === "en" ? "Quick access" : "Acceso rapido"}</span>
        <p>
          {language === "en"
            ? "Open the demo with one click, without exposing the passwords in the layout."
            : "Abre la demo en un clic, sin mostrar los passwords dentro del layout."}
        </p>
      </div>

      <div className="remax-auth-profile-grid">
        {remaxDemoLoginAccounts.map((account) => (
          <form key={account.id} action={loginAction} className="remax-auth-profile-card">
            <input type="hidden" name="email" value={account.email} />
            <input type="hidden" name="password" value={account.password} />
            <input type="hidden" name="next" value={nextPath} />
            <span>{account.roleLabel}</span>
            <strong>{account.name}</strong>
            <p>{account.email}</p>
            <button type="submit" className="button button-secondary">
              {language === "en" ? `Continue as ${account.roleLabel}` : `Entrar como ${account.roleLabel}`}
            </button>
          </form>
        ))}
      </div>

      <div className="remax-auth-section-header">
        <span>{language === "en" ? "Manual login" : "Ingreso manual"}</span>
        <p>
          {language === "en"
            ? "If needed, you can still enter a demo user manually."
            : "Si hace falta, tambien puedes ingresar un usuario demo manualmente."}
        </p>
      </div>

      <form action={loginAction} className="remax-auth-form" autoComplete="off">
        <input type="hidden" name="next" value={nextPath} />

        <label className="remax-field">
          <span>{language === "en" ? "Email" : "Correo"}</span>
          <input
            type="email"
            name="email"
            placeholder={language === "en" ? "demo@remax-demo.test" : "usuario@remax-demo.test"}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            inputMode="email"
            data-1p-ignore="true"
            data-lpignore="true"
            required
          />
        </label>

        <label className="remax-field">
          <span>{language === "en" ? "Password" : "Password"}</span>
          <input
            type="password"
            name="password"
            placeholder={language === "en" ? "Demo password" : "Password de demo"}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            data-1p-ignore="true"
            data-lpignore="true"
            required
          />
        </label>

        <button type="submit" className="button">
          {language === "en" ? "Open demo" : "Abrir demo"}
        </button>
      </form>

      <p className="remax-auth-helper">
        {language === "en"
          ? "If your browser password manager gets in the way, use the quick access cards above."
          : "Si el gestor de passwords del navegador interfiere, usa las tarjetas de acceso rapido de arriba."}
      </p>

      <div className="remax-auth-note">
        <strong>{remaxDemoNotice}</strong>
        <p>
          {language === "en"
            ? "The same structure is ready to evolve toward real roles and a stronger auth provider later."
            : "La misma estructura queda lista para evolucionar despues hacia roles reales y un proveedor de autenticacion mas robusto."}
        </p>
      </div>

    </div>
  );
}

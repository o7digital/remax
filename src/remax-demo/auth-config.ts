export type RemaxDemoRole = "direccion" | "asesor";

interface RemaxDemoAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: RemaxDemoRole;
  roleLabel: string;
  sessionToken: string;
}

export interface RemaxDemoSessionView {
  id: string;
  name: string;
  email: string;
  role: RemaxDemoRole;
  roleLabel: string;
}

export interface RemaxDemoLoginAccountPreview extends RemaxDemoSessionView {
  password: string;
}

export const REMAX_DEMO_SESSION_COOKIE = "remax_demo_session";
export const REMAX_DEMO_LOGIN_PATH = "/remax-demo/login";
export const REMAX_DEMO_HOME_PATH = "/remax-demo";

const demoAccounts: RemaxDemoAccount[] = [
  {
    id: "demo-direccion",
    name: "Mariana Fuentes",
    email: "direccion@remax-demo.test",
    password: "DemoDireccion26!",
    role: "direccion",
    roleLabel: "Direccion demo",
    sessionToken: "remax-demo-session-mariana-4f7c91"
  },
  {
    id: "demo-asesor",
    name: "Luis Navarro",
    email: "asesor@remax-demo.test",
    password: "DemoAsesor26!",
    role: "asesor",
    roleLabel: "Asesor demo",
    sessionToken: "remax-demo-session-luis-92ab44"
  }
];

const accountByEmail = new Map(demoAccounts.map((account) => [account.email.toLowerCase(), account]));
const accountBySessionToken = new Map(
  demoAccounts.map((account) => [account.sessionToken, account])
);

function toSessionView(account: RemaxDemoAccount): RemaxDemoSessionView {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    roleLabel: account.roleLabel
  };
}

export const remaxDemoLoginAccounts: RemaxDemoLoginAccountPreview[] = demoAccounts.map((account) => ({
  ...toSessionView(account),
  password: account.password
}));

export function authenticateRemaxDemoAccount(email: string, password: string) {
  const account = accountByEmail.get(email.trim().toLowerCase());

  if (!account || account.password !== password) {
    return null;
  }

  return {
    session: toSessionView(account),
    sessionToken: account.sessionToken
  };
}

export function getRemaxDemoSessionByToken(sessionToken?: string | null): RemaxDemoSessionView | null {
  if (!sessionToken) {
    return null;
  }

  const account = accountBySessionToken.get(sessionToken);
  return account ? toSessionView(account) : null;
}

export function sanitizeRemaxDemoNextPath(value?: string | null) {
  if (!value || !value.startsWith("/remax-demo")) {
    return REMAX_DEMO_HOME_PATH;
  }

  if (value.startsWith(REMAX_DEMO_LOGIN_PATH)) {
    return REMAX_DEMO_HOME_PATH;
  }

  return value;
}

export function getRemaxDemoSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/remax-demo",
    maxAge: 60 * 60 * 12
  };
}

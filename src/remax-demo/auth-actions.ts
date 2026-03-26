"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  REMAX_DEMO_HOME_PATH,
  REMAX_DEMO_LOGIN_PATH,
  REMAX_DEMO_SESSION_COOKIE,
  authenticateRemaxDemoAccount,
  getRemaxDemoSessionCookieOptions,
  sanitizeRemaxDemoNextPath
} from "@/remax-demo/auth-config";

function buildLoginRedirect(error: string, nextPath: string) {
  const searchParams = new URLSearchParams({ error });

  if (nextPath !== REMAX_DEMO_HOME_PATH) {
    searchParams.set("next", nextPath);
  }

  return `${REMAX_DEMO_LOGIN_PATH}?${searchParams.toString()}`;
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const nextPath = sanitizeRemaxDemoNextPath(String(formData.get("next") ?? ""));
  const authenticated = authenticateRemaxDemoAccount(email, password);

  if (!authenticated) {
    redirect(buildLoginRedirect("invalid", nextPath));
  }

  const cookieStore = await cookies();

  cookieStore.set(
    REMAX_DEMO_SESSION_COOKIE,
    authenticated.sessionToken,
    getRemaxDemoSessionCookieOptions()
  );

  redirect(nextPath);
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.set(REMAX_DEMO_SESSION_COOKIE, "", {
    ...getRemaxDemoSessionCookieOptions(),
    maxAge: 0
  });

  redirect(REMAX_DEMO_LOGIN_PATH);
}

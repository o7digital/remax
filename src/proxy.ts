import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { canRoleAccessPath, type AppRole } from "@/lib/access-control";
import {
  REMAX_DEMO_HOME_PATH,
  REMAX_DEMO_LOGIN_PATH,
  REMAX_DEMO_SESSION_COOKIE,
  getRemaxDemoSessionByToken,
  sanitizeRemaxDemoNextPath
} from "@/remax-demo/auth-config";
import { updateSupabaseSession } from "@/utils/supabase/middleware";

const MAINTENANCE_MODE = false;
const MAINTENANCE_PATH = "/maintenance";
const REMAX_DEMO_ADMIN_PATH = "/remax-demo/admin";
const APP_FORBIDDEN_PATH = "/app/forbidden";

export function proxy(request: NextRequest) {
  const supabaseResponse = updateSupabaseSession(request);
  const { pathname, search } = request.nextUrl;

  if (MAINTENANCE_MODE) {
    if (pathname === MAINTENANCE_PATH) {
      return supabaseResponse;
    }

    return NextResponse.redirect(new URL(MAINTENANCE_PATH, request.url));
  }

  const sessionToken = request.cookies.get(REMAX_DEMO_SESSION_COOKIE)?.value;
  const session = getRemaxDemoSessionByToken(sessionToken);

  if (pathname === REMAX_DEMO_LOGIN_PATH) {
    return session
      ? NextResponse.redirect(new URL(REMAX_DEMO_HOME_PATH, request.url))
      : supabaseResponse;
  }

  if (pathname.startsWith(REMAX_DEMO_HOME_PATH) && !session) {
    const loginUrl = new URL(REMAX_DEMO_LOGIN_PATH, request.url);
    loginUrl.searchParams.set("next", sanitizeRemaxDemoNextPath(`${pathname}${search}`));
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith(REMAX_DEMO_ADMIN_PATH) && session?.role !== "direccion") {
    return NextResponse.redirect(new URL(REMAX_DEMO_HOME_PATH, request.url));
  }

  const appRole = request.cookies.get("app-role")?.value as AppRole | undefined;
  if (pathname.startsWith("/app") && pathname !== APP_FORBIDDEN_PATH && appRole) {
    if (!canRoleAccessPath(appRole, pathname)) {
      const deniedUrl = new URL(APP_FORBIDDEN_PATH, request.url);
      deniedUrl.searchParams.set("path", pathname);
      return NextResponse.redirect(deniedUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"]
};

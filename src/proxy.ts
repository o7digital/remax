import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

import { hasClerkConfig } from "@/lib/clerk-config";
import {
  REMAX_DEMO_HOME_PATH,
  REMAX_DEMO_LOGIN_PATH,
  REMAX_DEMO_SESSION_COOKIE,
  getRemaxDemoSessionByToken,
  sanitizeRemaxDemoNextPath
} from "@/remax-demo/auth-config";
const MAINTENANCE_MODE = false;
const MAINTENANCE_PATH = "/maintenance";
const REMAX_DEMO_ADMIN_PATH = "/remax-demo/admin";

function handlePublicRoutes(request: NextRequest, clerkConfigured: boolean) {
  const { pathname, search } = request.nextUrl;

  if (MAINTENANCE_MODE) {
    if (pathname === MAINTENANCE_PATH) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(MAINTENANCE_PATH, request.url));
  }

  const sessionToken = request.cookies.get(REMAX_DEMO_SESSION_COOKIE)?.value;
  const session = getRemaxDemoSessionByToken(sessionToken);

  if (pathname === REMAX_DEMO_LOGIN_PATH) {
    return session
      ? NextResponse.redirect(new URL(REMAX_DEMO_HOME_PATH, request.url))
      : NextResponse.next();
  }

  if (pathname.startsWith(REMAX_DEMO_HOME_PATH) && !session) {
    const loginUrl = new URL(REMAX_DEMO_LOGIN_PATH, request.url);
    loginUrl.searchParams.set("next", sanitizeRemaxDemoNextPath(`${pathname}${search}`));
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith(REMAX_DEMO_ADMIN_PATH) && session?.role !== "direccion") {
    return NextResponse.redirect(new URL(REMAX_DEMO_HOME_PATH, request.url));
  }

  if (pathname.startsWith("/app") && !clerkConfigured) {
    return NextResponse.redirect(new URL(MAINTENANCE_PATH, request.url));
  }

  return NextResponse.next();
}

const clerkProxy = clerkMiddleware(async (_auth, request: NextRequest) => {
  return handlePublicRoutes(request, true);
});

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  if (!hasClerkConfig()) {
    return handlePublicRoutes(request, false);
  }

  return clerkProxy(request, event);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"]
};

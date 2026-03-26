import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  REMAX_DEMO_HOME_PATH,
  REMAX_DEMO_LOGIN_PATH,
  REMAX_DEMO_SESSION_COOKIE,
  getRemaxDemoSessionByToken,
  sanitizeRemaxDemoNextPath
} from "@/remax-demo/auth-config";

export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get(REMAX_DEMO_SESSION_COOKIE)?.value;
  const session = getRemaxDemoSessionByToken(sessionToken);
  const { pathname, search } = request.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/remax-demo/:path*"]
};

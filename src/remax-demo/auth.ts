import { cookies } from "next/headers";

import {
  REMAX_DEMO_SESSION_COOKIE,
  getRemaxDemoSessionByToken
} from "@/remax-demo/auth-config";

export async function getRemaxDemoSession() {
  const cookieStore = await cookies();
  return getRemaxDemoSessionByToken(cookieStore.get(REMAX_DEMO_SESSION_COOKIE)?.value);
}

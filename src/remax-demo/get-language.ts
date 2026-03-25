import { cookies } from "next/headers";

import { normalizeRemaxLanguage, type RemaxLanguage } from "@/remax-demo/i18n";

export async function getRemaxLanguage(): Promise<RemaxLanguage> {
  const cookieStore = await cookies();
  return normalizeRemaxLanguage(cookieStore.get("remax_demo_lang")?.value);
}

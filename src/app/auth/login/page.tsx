import { redirect } from "next/navigation";

import { sanitizeNextPath } from "@/utils/supabase/auth";

function getSingleParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AuthLoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const nextPath = sanitizeNextPath(getSingleParam(params.next));

  redirect(`/sign-in?redirect_url=${encodeURIComponent(nextPath)}`);
}

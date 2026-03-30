import { redirect } from "next/navigation";

import { AuthMfaChallenge } from "@/components/auth-mfa-challenge";
import { hasVerifiedFactors, sanitizeNextPath } from "@/utils/supabase/auth";
import { createServerClientFromCookies } from "@/utils/supabase/server";

function getSingleParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AuthMfaPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const nextPath = sanitizeNextPath(getSingleParam(params.next));
  const supabase = await createServerClientFromCookies();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?next=${encodeURIComponent(nextPath)}`);
  }

  const [{ data: aalData }, { data: factorData }] = await Promise.all([
    supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
    supabase.auth.mfa.listFactors()
  ]);

  if (aalData?.currentLevel === "aal2") {
    redirect(nextPath);
  }

  if (!hasVerifiedFactors(factorData?.all ?? [])) {
    redirect(`/app/settings/security?setup=required&next=${encodeURIComponent(nextPath)}`);
  }

  return <AuthMfaChallenge nextPath={nextPath} />;
}

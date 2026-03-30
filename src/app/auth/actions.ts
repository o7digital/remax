"use server";

import { redirect } from "next/navigation";

import { hasVerifiedFactors, sanitizeNextPath } from "@/utils/supabase/auth";
import { ensureProfileForUser } from "@/utils/supabase/profiles";
import { createServerClientFromCookies } from "@/utils/supabase/server";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = sanitizeNextPath(String(formData.get("next") ?? "/app"));

  if (!email || !password) {
    redirect(`/auth/login?error=missing&next=${encodeURIComponent(next)}`);
  }

  const supabase = await createServerClientFromCookies();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    redirect(`/auth/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  await ensureProfileForUser(user);

  const [{ data: aalData }, { data: factorData }] = await Promise.all([
    supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
    supabase.auth.mfa.listFactors()
  ]);

  if (aalData?.currentLevel === "aal2") {
    redirect(next);
  }

  if (hasVerifiedFactors(factorData?.all ?? [])) {
    redirect(`/auth/mfa?next=${encodeURIComponent(next)}`);
  }

  redirect(`/app/settings/security?setup=required&next=${encodeURIComponent(next)}`);
}

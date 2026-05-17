"use server";

import { redirect } from "next/navigation";

import { sanitizeNextPath } from "@/utils/supabase/auth";

export async function signInAction(formData: FormData) {
  const next = sanitizeNextPath(String(formData.get("next") ?? "/app"));
  redirect(`/sign-in?redirect_url=${encodeURIComponent(next)}`);
}

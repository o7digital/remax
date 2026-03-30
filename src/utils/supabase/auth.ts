import type { Factor, User } from "@supabase/supabase-js";

export function sanitizeNextPath(value?: string | null) {
  if (!value || !value.startsWith("/app")) {
    return "/app";
  }

  return value;
}

export function getUserLabel(user: User) {
  const fullName = user.user_metadata?.full_name;

  if (typeof fullName === "string" && fullName.trim()) {
    return fullName.trim();
  }

  if (user.email) {
    return user.email;
  }

  return "Admin";
}

export function hasVerifiedFactors(factors: Factor[] = []) {
  return factors.some((factor) => factor.status === "verified");
}

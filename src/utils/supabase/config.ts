function getRequiredEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

function getOptionalEnv(name: "SUPABASE_SERVICE_ROLE_KEY") {
  return process.env[name];
}

export function getSupabaseUrl() {
  return getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
}

export function getSupabasePublishableKey() {
  return getRequiredEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY");
}

export function getSupabaseServiceRoleKey() {
  return getOptionalEnv("SUPABASE_SERVICE_ROLE_KEY");
}

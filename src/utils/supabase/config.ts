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

const supabaseUrl = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
const supabasePublishableKey = getRequiredEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY");
const supabaseServiceRoleKey = getOptionalEnv("SUPABASE_SERVICE_ROLE_KEY");

export { supabasePublishableKey, supabaseServiceRoleKey, supabaseUrl };

import { createClient } from "@supabase/supabase-js";

import {
  supabaseServiceRoleKey,
  supabaseUrl
} from "@/utils/supabase/config";

export function createAdminClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

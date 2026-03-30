import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublishableKey, getSupabaseUrl } from "@/utils/supabase/config";

export function createClient() {
  return createBrowserClient(getSupabaseUrl(), getSupabasePublishableKey());
}

export function tryCreateClient() {
  try {
    return createClient();
  } catch {
    return null;
  }
}

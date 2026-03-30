import { createBrowserClient } from "@supabase/ssr";

import { supabasePublishableKey, supabaseUrl } from "@/utils/supabase/config";

export function createClient() {
  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}

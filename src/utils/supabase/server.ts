import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabasePublishableKey, getSupabaseUrl } from "@/utils/supabase/config";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

function createServerSupabaseClient(cookieStore: CookieStore) {
  return createServerClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options as CookieOptions);
          });
        } catch {
          // Server Components cannot always mutate cookies directly.
        }
      }
    }
  });
}

export function createClient(cookieStore: CookieStore) {
  return createServerSupabaseClient(cookieStore);
}

export async function createServerClientFromCookies() {
  const cookieStore = await cookies();
  return createServerSupabaseClient(cookieStore);
}

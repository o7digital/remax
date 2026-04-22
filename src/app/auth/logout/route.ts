import { NextResponse } from "next/server";

import { createServerClientFromCookies } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = await createServerClientFromCookies();
  await supabase.auth.signOut();
  const response = NextResponse.redirect(new URL("/auth/login", request.url));
  response.cookies.set("app-role", "", {
    path: "/",
    maxAge: 0
  });
  return response;
}

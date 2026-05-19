import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const { sessionId } = await auth();
  if (sessionId) {
    const client = await clerkClient();
    await client.sessions.revokeSession(sessionId);
  }
  const response = NextResponse.redirect(new URL("/auth/login", request.url));
  response.cookies.set("app-role", "", {
    path: "/",
    maxAge: 0
  });
  return response;
}

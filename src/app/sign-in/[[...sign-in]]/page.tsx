import { SignIn } from "@clerk/nextjs";

import { sanitizeNextPath } from "@/utils/supabase/auth";

function getSingleParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignInPage({
  searchParams
}: {
  searchParams: Promise<{ redirect_url?: string | string[] }>;
}) {
  const params = await searchParams;
  const redirectUrl = sanitizeNextPath(getSingleParam(params.redirect_url));

  return (
    <main className="auth-screen">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl={redirectUrl}
      />
    </main>
  );
}

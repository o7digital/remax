import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { MfaSecurityPanel } from "@/components/mfa-security-panel";
import { sanitizeNextPath } from "@/utils/supabase/auth";

function getSingleParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SettingsSecurityPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string | string[]; setup?: string | string[] }>;
}) {
  const params = await searchParams;
  const nextPath = sanitizeNextPath(getSingleParam(params.next));
  const setupRequired = getSingleParam(params.setup) === "required";

  return (
    <div className="page-stack">
      <PageHeader
        title="Security"
        description="Gestion du login admin, du mot de passe et du facteur TOTP pour l'ERP."
      />

      <SectionCard
        title="2FA obligatoire"
        description="Ajoute un facteur TOTP via Google Authenticator, 1Password ou Authy avant d'ouvrir l'admin en production."
      >
        <MfaSecurityPanel nextPath={nextPath} setupRequired={setupRequired} />
      </SectionCard>
    </div>
  );
}

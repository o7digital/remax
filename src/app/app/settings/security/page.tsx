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
        description="Gestion del acceso administrador, la contrasena y el factor TOTP del ERP."
      />

      <SectionCard
        title="2FA obligatorio"
        description="Agrega un factor TOTP con Google Authenticator, 1Password o Authy antes de abrir la administracion en produccion."
      >
        <MfaSecurityPanel nextPath={nextPath} setupRequired={setupRequired} />
      </SectionCard>
    </div>
  );
}

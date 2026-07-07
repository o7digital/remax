import { UserProfile } from "@clerk/nextjs";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";

export default function SettingsSecurityPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Security"
        description="Gestion del acceso, la contrasena y los factores de seguridad del ERP mediante Clerk."
      />

      <SectionCard
        title="Cuenta y autenticacion"
        description="Administra el perfil, la contrasena, las sesiones activas y los factores de autenticacion."
      >
        <UserProfile routing="hash" />
      </SectionCard>
    </div>
  );
}

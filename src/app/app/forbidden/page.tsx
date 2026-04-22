import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";

export default async function ForbiddenPage({
  searchParams
}: {
  searchParams: Promise<{ path?: string }>;
}) {
  const params = await searchParams;
  const deniedPath = params.path ?? "/app";

  return (
    <div className="page-stack">
      <PageHeader
        title="Acceso denegado"
        description="Tu rol actual no tiene permiso para abrir este modulo."
        actions={
          <div className="button-row">
            <Link href="/app/dashboard" className="button">
              Volver al dashboard
            </Link>
            <Link href="/app/settings/roles" className="button button-secondary">
              Ver roles y permisos
            </Link>
          </div>
        }
      />

      <SectionCard title="Ruta bloqueada" description="Control de acceso por modulo activo en entorno dev.">
        <p>
          Ruta solicitada: <code>{deniedPath}</code>
        </p>
      </SectionCard>
    </div>
  );
}


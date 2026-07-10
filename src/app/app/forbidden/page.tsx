import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { MAX_AUTHORIZED_USERS } from "@/lib/access-control";

export default async function ForbiddenPage({
  searchParams
}: {
  searchParams: Promise<{ path?: string; reason?: string }>;
}) {
  const params = await searchParams;
  const deniedPath = params.path ?? "/app";
  const isSeatLimit = params.reason === "seat_limit";

  return (
    <div className="page-stack">
      <PageHeader
        title="Acceso denegado"
        description={
          isSeatLimit
            ? `Esta instalacion esta limitada a ${MAX_AUTHORIZED_USERS} usuarios autorizados. Contacta al administrador para activar mas accesos.`
            : "Tu rol actual no tiene permiso para abrir este modulo."
        }
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

      <SectionCard
        title={isSeatLimit ? "Limite de usuarios" : "Ruta bloqueada"}
        description={
          isSeatLimit
            ? "El acceso esta restringido por lista blanca para evitar altas no contratadas."
            : "Control de acceso por modulo activo en entorno dev."
        }
      >
        <p>
          Ruta solicitada: <code>{deniedPath}</code>
        </p>
      </SectionCard>
    </div>
  );
}

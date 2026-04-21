import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { getDemoI18n } from "@/lib/server-i18n";
import { getClientOverviewData } from "@/lib/remax-app-data";

export default async function ClientsPage() {
  const { txt } = await getDemoI18n();
  const { records, summary } = await getClientOverviewData();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Clients")}
        description={txt(
          "Propietarios y compradores reales consolidados desde la base Access migrada a Supabase."
        )}
      />

      <div className="stats-grid">
        <StatCard label={txt("Clientes unicos")} value={String(summary.totalClients)} detail={txt("base consolidada")} />
        <StatCard label={txt("Propietarios")} value={String(summary.ownerClients)} detail={txt("contactos lado captacion")} />
        <StatCard label={txt("Compradores")} value={String(summary.buyerClients)} detail={txt("contactos lado cierre")} />
        <StatCard label={txt("Con email")} value={String(summary.clientsWithEmail)} detail={txt("listos para seguimiento")} />
      </div>

      <SectionCard
        title={txt("Base de clientes")}
        description={txt("Vista operativa con cartera, ubicacion y datos de contacto reales.")}
      >
        <DataTable
          rows={records}
          getRowId={(row) => row.id}
          emptyMessage={txt("No hay clientes importados.")}
          columns={[
            {
              key: "name",
              label: txt("Cliente"),
              render: (row) => (
                <div>
                  <Link href={`/app/clients/detail?id=${encodeURIComponent(row.id)}`} className="table-link">
                    <strong>{row.fullName}</strong>
                  </Link>
                  <div className="muted">{row.primaryPropertyTitle}</div>
                </div>
              )
            },
            {
              key: "kind",
              label: txt("Tipo"),
              render: (row) => <StatusBadge value={txt(row.contactKind === "owner" ? "Propietario" : "Comprador")} />
            },
            {
              key: "properties",
              label: txt("Propiedades"),
              align: "right",
              render: (row) => row.propertyCount
            },
            {
              key: "location",
              label: txt("Ubicacion"),
              render: (row) => row.primaryLocation
            },
            {
              key: "contact",
              label: txt("Contacto"),
              render: (row) => (
                <div>
                  <div>{row.email ?? "Sin email"}</div>
                  <div className="muted">{row.phone ?? "Sin telefono"}</div>
                </div>
              )
            },
            {
              key: "status",
              label: txt("Estado cartera"),
              render: (row) => <StatusBadge value={txt(row.portfolioStatus)} />
            },
            {
              key: "keys",
              label: txt("Claves"),
              render: (row) => (
                <div className="inline-stack">
                  {row.propertyKeys.map((propertyKey) => (
                    <StatusBadge key={propertyKey} value={propertyKey} />
                  ))}
                </div>
              )
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}

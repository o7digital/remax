import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getClientOverviewData } from "@/lib/remax-app-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { txt } = await getDemoI18n();
  const { id } = await params;
  const { records } = await getClientOverviewData();

  const client = records.find((record) => record.id === id);

  if (!client) {
    notFound();
  }

  return (
    <div className="page-stack">
      <PageHeader
        title={client.fullName}
        description={txt("Ficha cliente con consolidado de cartera, contacto y propiedades vinculadas.")}
        actions={
          <Link href="/app/clients" className="button button-secondary">
            {txt("Volver a clientes")}
          </Link>
        }
      />

      <SectionCard title={txt("Resumen")}>
        <div className="two-columns">
          <div>
            <p className="field-label">{txt("Tipo")}</p>
            <StatusBadge value={txt(client.contactKind === "owner" ? "Propietario" : "Comprador")} />
          </div>
          <div>
            <p className="field-label">Email</p>
            <p>{client.email ?? "Sin email"}</p>
          </div>
          <div>
            <p className="field-label">{txt("Telefono")}</p>
            <p>{client.phone ?? "Sin telefono"}</p>
          </div>
          <div>
            <p className="field-label">{txt("Propiedades")}</p>
            <p>{client.propertyCount}</p>
          </div>
          <div>
            <p className="field-label">{txt("Ubicacion")}</p>
            <p>{client.primaryLocation}</p>
          </div>
          <div>
            <p className="field-label">{txt("Estado cartera")}</p>
            <StatusBadge value={txt(client.portfolioStatus)} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title={txt("Propiedades vinculadas")}> 
        <div className="inline-stack">
          {client.propertyKeys.map((propertyKey) => (
            <StatusBadge key={propertyKey} value={propertyKey} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";

import { ClientEditPanel } from "@/components/client-edit-panel";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getClientOverviewData } from "@/lib/remax-app-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function ClientDetailPage({
  searchParams
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { txt } = await getDemoI18n();
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

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

      <ClientEditPanel client={client} />

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

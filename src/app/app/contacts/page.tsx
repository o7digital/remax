import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { getDemoI18n } from "@/lib/server-i18n";
import { getContactDirectoryData } from "@/lib/remax-app-data";

export default async function ContactsPage() {
  const { txt } = await getDemoI18n();
  const { totalContacts, ownerContacts, buyerContacts, contactsWithEmail, records } = await getContactDirectoryData();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Contacts")}
        description={txt(
          "Directorio real de propietarios y compradores vinculado a propiedades importadas."
        )}
      />

      <div className="stats-grid">
        <StatCard label={txt("Contactos importados")} value={String(totalContacts)} detail={txt("registros operativos")} />
        <StatCard label={txt("Propietarios")} value={String(ownerContacts)} detail={txt("lado captacion")} />
        <StatCard label={txt("Compradores")} value={String(buyerContacts)} detail={txt("lado cierre")} />
        <StatCard label={txt("Con email")} value={String(contactsWithEmail)} detail={txt("listos para outreach")} />
      </div>

      <SectionCard
        title={txt("Directorio de contactos")}
        description={txt("Vista detallada por propiedad para operacion, recepcion y seguimiento comercial.")}
      >
        <DataTable
          rows={records}
          getRowId={(row) => row.id}
          emptyMessage={txt("No hay contactos importados.")}
          columns={[
            {
              key: "name",
              label: txt("Contacto"),
              render: (row) => (
                <div>
                  <strong>{row.fullName}</strong>
                  <div className="muted">{row.isPrimary ? "Principal" : "Secundario"}</div>
                </div>
              )
            },
            {
              key: "kind",
              label: txt("Tipo"),
              render: (row) => <StatusBadge value={txt(row.contactKind === "owner" ? "Propietario" : "Comprador")} />
            },
            {
              key: "property",
              label: txt("Propiedad"),
              render: (row) => (
                <div>
                  <strong>{row.propertyKey}</strong>
                  <div className="muted">{row.propertyTitle}</div>
                </div>
              )
            },
            { key: "location", label: txt("Ubicacion"), render: (row) => row.location },
            { key: "email", label: "Email", render: (row) => row.email ?? "Sin email" },
            { key: "phone", label: txt("Telefono"), render: (row) => row.phone ?? "Sin telefono" },
            { key: "status", label: txt("Estado"), render: (row) => <StatusBadge value={txt(row.propertyStatus)} /> }
          ]}
        />
      </SectionCard>
    </div>
  );
}

import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { getDemoI18n } from "@/lib/server-i18n";
import { createPropertyContact } from "@/lib/remax-app-mutations";
import { getClientOverviewData, getPropertyContactReferenceData } from "@/lib/remax-app-data";

async function createClientAction(formData: FormData) {
  "use server";

  const propertyId = String(formData.get("propertyId") ?? "").trim();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const contactKind = String(formData.get("contactKind") ?? "buyer").trim();

  if (!propertyId || !fullName || !["owner", "buyer", "tenant", "prospect", "other"].includes(contactKind)) {
    redirect("/app/clients?error=missing");
  }

  try {
    await createPropertyContact({
      propertyId,
      contactKind,
      fullName,
      email: String(formData.get("email") ?? "").trim() || null,
      phone: String(formData.get("phone") ?? "").trim() || null,
      isPrimary: formData.get("isPrimary") === "on"
    });
  } catch (error) {
    console.error("Failed to create client contact", error);
    redirect("/app/clients?error=database");
  }

  revalidatePath("/app/clients");
  revalidatePath("/app/contacts");
  redirect("/app/clients?saved=1");
}

export default async function ClientsPage() {
  const { txt } = await getDemoI18n();
  const [{ records, summary }, propertyOptions] = await Promise.all([
    getClientOverviewData(),
    getPropertyContactReferenceData()
  ]);

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Clients")}
        description={txt(
          "Propietarios y compradores reales consolidados desde la base Access migrada a Railway/Postgres."
        )}
      />

      <SectionCard title={txt("Crear cliente")} description={txt("Vincula un propietario, comprador o prospecto a una propiedad real.")}>
        <form action={createClientAction} className="form-grid">
          <label className="field"><span className="field-label">Nombre</span><input name="fullName" required /></label>
          <label className="field"><span className="field-label">Tipo</span><select name="contactKind" defaultValue="buyer"><option value="buyer">Comprador</option><option value="owner">Propietario</option><option value="tenant">Inquilino</option><option value="prospect">Prospecto</option><option value="other">Otro</option></select></label>
          <label className="field"><span className="field-label">Email</span><input name="email" type="email" /></label>
          <label className="field"><span className="field-label">Telefono</span><input name="phone" /></label>
          <label className="field field-full"><span className="field-label">Propiedad vinculada</span><select name="propertyId" required defaultValue=""><option value="">Seleccionar propiedad</option>{propertyOptions.map((property) => <option key={property.id} value={property.id}>{property.propertyKey} · {property.title}</option>)}</select></label>
          <label className="badge badge-neutral"><input name="isPrimary" type="checkbox" style={{ minHeight: "auto", width: "auto" }} />Contacto principal</label>
          <div className="field"><button type="submit" className="button">Crear cliente</button></div>
        </form>
      </SectionCard>

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
                  <Link href={`/app/clients/${encodeURIComponent(row.id)}`} className="table-link">
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
            },
            {
              key: "detail",
              label: txt("Detalle"),
              render: (row) => <Link href={`/app/clients/${encodeURIComponent(row.id)}`} className="button button-secondary">Ver detalle</Link>
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}

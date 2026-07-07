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
import { getContactDirectoryData, getPropertyContactReferenceData } from "@/lib/remax-app-data";

async function createContactAction(formData: FormData) {
  "use server";

  const propertyId = String(formData.get("propertyId") ?? "").trim();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const contactKind = String(formData.get("contactKind") ?? "owner").trim();

  if (!propertyId || !fullName || !["owner", "buyer", "tenant", "prospect", "other"].includes(contactKind)) redirect("/app/contacts?error=missing");

  try {
    await createPropertyContact({ propertyId, contactKind, fullName, email: String(formData.get("email") ?? "").trim() || null, phone: String(formData.get("phone") ?? "").trim() || null, isPrimary: formData.get("isPrimary") === "on" });
  } catch (error) {
    console.error("Failed to create contact", error);
    redirect("/app/contacts?error=database");
  }

  revalidatePath("/app/clients");
  revalidatePath("/app/contacts");
  redirect("/app/contacts?saved=1");
}

export default async function ContactsPage() {
  const { txt } = await getDemoI18n();
  const [{ totalContacts, ownerContacts, buyerContacts, contactsWithEmail, records }, propertyOptions] = await Promise.all([
    getContactDirectoryData(),
    getPropertyContactReferenceData()
  ]);

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Contacts")}
        description={txt(
          "Directorio real de propietarios y compradores vinculado a propiedades importadas."
        )}
      />

      <SectionCard title={txt("Crear contacto")} description={txt("Registra un contacto y vincularlo a una propiedad real.")}>
        <form action={createContactAction} className="form-grid">
          <label className="field"><span className="field-label">Nombre</span><input name="fullName" required /></label>
          <label className="field"><span className="field-label">Tipo</span><select name="contactKind" defaultValue="owner"><option value="owner">Propietario</option><option value="buyer">Comprador</option><option value="tenant">Inquilino</option><option value="prospect">Prospecto</option><option value="other">Otro</option></select></label>
          <label className="field"><span className="field-label">Email</span><input name="email" type="email" /></label>
          <label className="field"><span className="field-label">Telefono</span><input name="phone" /></label>
          <label className="field field-full"><span className="field-label">Propiedad vinculada</span><select name="propertyId" required defaultValue=""><option value="">Seleccionar propiedad</option>{propertyOptions.map((property) => <option key={property.id} value={property.id}>{property.propertyKey} · {property.title}</option>)}</select></label>
          <label className="badge badge-neutral"><input name="isPrimary" type="checkbox" style={{ minHeight: "auto", width: "auto" }} />Contacto principal</label>
          <div className="field"><button type="submit" className="button">Crear contacto</button></div>
        </form>
      </SectionCard>

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
                  <Link href={`/app/contacts/${row.id}`} className="table-link">
                    <strong>{row.fullName}</strong>
                  </Link>
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
            { key: "status", label: txt("Estado"), render: (row) => <StatusBadge value={txt(row.propertyStatus)} /> },
            { key: "detail", label: txt("Detalle"), render: (row) => <Link href={`/app/contacts/${row.id}`} className="button button-secondary">Ver detalle</Link> }
          ]}
        />
      </SectionCard>
    </div>
  );
}

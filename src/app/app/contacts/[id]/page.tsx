import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getContactDirectoryData } from "@/lib/remax-app-data";
import { getDemoI18n } from "@/lib/server-i18n";

function toRouteSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toCanonicalKey(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { txt } = await getDemoI18n();
  const { id } = await params;
  const { records } = await getContactDirectoryData();
  const canonicalId = toCanonicalKey(id);

  const contact = records.find((record) => {
    if (record.id === id || toRouteSlug(record.id) === id) {
      return true;
    }

    return toCanonicalKey(record.id) === canonicalId || toCanonicalKey(toRouteSlug(record.id)) === canonicalId;
  });

  if (!contact) {
    notFound();
  }

  return (
    <div className="page-stack">
      <PageHeader
        title={contact.fullName}
        description={txt("Ficha contacto con datos de propiedad, ubicacion y estado operativo.")}
        actions={
          <Link href="/app/contacts" className="button button-secondary">
            {txt("Volver a contactos")}
          </Link>
        }
      />

      <SectionCard title={txt("Resumen")}>
        <div className="two-columns">
          <div>
            <p className="field-label">{txt("Tipo")}</p>
            <StatusBadge value={txt(contact.contactKind === "owner" ? "Propietario" : "Comprador")} />
          </div>
          <div>
            <p className="field-label">Email</p>
            <p>{contact.email ?? "Sin email"}</p>
          </div>
          <div>
            <p className="field-label">{txt("Telefono")}</p>
            <p>{contact.phone ?? "Sin telefono"}</p>
          </div>
          <div>
            <p className="field-label">{txt("Propiedad")}</p>
            <p>
              <strong>{contact.propertyKey}</strong> {contact.propertyTitle}
            </p>
          </div>
          <div>
            <p className="field-label">{txt("Ubicacion")}</p>
            <p>{contact.location}</p>
          </div>
          <div>
            <p className="field-label">{txt("Estado")}</p>
            <StatusBadge value={txt(contact.propertyStatus)} />
          </div>
          <div>
            <p className="field-label">{txt("Perfil")}</p>
            <StatusBadge value={txt(contact.isPrimary ? "Principal" : "Secundario")} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

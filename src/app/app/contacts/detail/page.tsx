import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactEditPanel } from "@/components/contact-edit-panel";
import { PageHeader } from "@/components/page-header";
import { getContactDirectoryData } from "@/lib/remax-app-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function ContactDetailPage({
  searchParams
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { txt } = await getDemoI18n();
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

  const { records } = await getContactDirectoryData();
  const contact = records.find((record) => record.id === id);

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

      <ContactEditPanel contact={contact} />
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";

import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { getPropertyDetailData } from "@/lib/remax-app-data";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getPropertyDetailData(id);

  if (!data) notFound();

  const { property, contacts, values, deals, expediente } = data;

  return (
    <div className="page-stack">
      <PageHeader
        title={`${property.propertyKey} · ${property.title}`}
        description="Ficha completa de la propiedad y sus registros relacionados en Railway/Postgres."
        actions={<Link href="/app/properties" className="button button-secondary">Volver a propiedades</Link>}
      />

      <SectionCard title="Resumen de propiedad">
        <div className="two-columns">
          <div><p className="field-label">Estado</p><StatusBadge value={property.status} /></div>
          <div><p className="field-label">Ubicacion</p><p>{property.location}</p></div>
          <div><p className="field-label">Direccion</p><p>{property.fullAddress ?? "Sin direccion"}</p></div>
          <div><p className="field-label">Operacion</p><p>{[property.businessLine, property.operationType].filter(Boolean).join(" / ") || "Sin operacion"}</p></div>
          <div><p className="field-label">Precio lista</p><p>{property.listPrice !== null ? formatCurrency(property.listPrice, property.currencyCode, "es-MX") : "Sin precio"}</p></div>
          <div><p className="field-label">Fecha listado</p><p>{property.listedOn ? formatDate(property.listedOn, "es-MX") : "Sin fecha"}</p></div>
        </div>
        {property.description ? <p className="muted">{property.description}</p> : null}
      </SectionCard>

      <SectionCard title="Expediente fisico" description="Recepcion, responsable y documentos incluidos.">
        {expediente ? (
          <div className="two-columns">
            <div><p className="field-label">Estatus</p><StatusBadge value={expediente.status ?? "Sin estatus"} /></div>
            <div><p className="field-label">Registra alta</p><p>{expediente.registeredBy ?? "Sin responsable"}</p></div>
            <div><p className="field-label">Fecha expediente</p><p>{expediente.receivedOn ? formatDate(expediente.receivedOn, "es-MX") : "Sin fecha"}</p></div>
            <div><p className="field-label">Documentos</p><p>{expediente.documents.join(", ") || "Sin documentos"}</p></div>
          </div>
        ) : <p className="muted">Sin expediente de alta capturado.</p>}
      </SectionCard>

      <SectionCard title="Contactos vinculados">
        <DataTable rows={contacts} getRowId={(row) => row.id} emptyMessage="No hay contactos vinculados." columns={[
          { key: "name", label: "Nombre", render: (row) => <strong>{row.fullName}</strong> },
          { key: "kind", label: "Tipo", render: (row) => <StatusBadge value={row.kind} /> },
          { key: "email", label: "Email", render: (row) => row.email ?? "Sin email" },
          { key: "phone", label: "Telefono", render: (row) => row.phone ?? "Sin telefono" }
        ]} />
      </SectionCard>

      <SectionCard title="Historial de valores">
        <DataTable rows={values} getRowId={(row) => row.id} emptyMessage="No hay valores registrados." columns={[
          { key: "date", label: "Fecha", render: (row) => row.valuedOn ? formatDate(row.valuedOn, "es-MX") : "Sin fecha" },
          { key: "kind", label: "Tipo", render: (row) => row.priceKind ?? "Sin tipo" },
          { key: "amount", label: "Valor", align: "right", render: (row) => row.amount !== null ? formatCurrency(row.amount, row.currencyCode, "es-MX") : "Sin valor" }
        ]} />
      </SectionCard>

      <SectionCard title="Operaciones relacionadas">
        <DataTable rows={deals} getRowId={(row) => row.id} emptyMessage="No hay operaciones relacionadas." columns={[
          { key: "title", label: "Operacion", render: (row) => <strong>{row.title}</strong> },
          { key: "kind", label: "Tipo", render: (row) => row.kind },
          { key: "status", label: "Estado", render: (row) => <StatusBadge value={row.status} /> },
          { key: "date", label: "Fecha", render: (row) => row.closedOn ? formatDate(row.closedOn, "es-MX") : row.signedOn ? formatDate(row.signedOn, "es-MX") : "Sin fecha" }
        ]} />
      </SectionCard>
    </div>
  );
}

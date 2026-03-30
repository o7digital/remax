import Link from "next/link";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { getMarketingData } from "@/lib/remax-app-data";

export default async function MarketingPage() {
  const { summary, audience } = await getMarketingData();

  return (
    <div className="page-stack">
      <PageHeader
        title="Marketing"
        description="Base comercial para newsletter, landing pages SEO y captacion de leads con deduplicacion previa."
        actions={
          <div className="button-row">
            <Link href="/app/clients" className="button button-secondary">
              Ver clientes
            </Link>
            <Link href="/app/pipeline" className="button">
              Abrir pipeline
            </Link>
          </div>
        }
      />

      <DataOriginNotice
        title="Base real + modulos a integrar"
        description="La audiencia y los duplicados salen de los contactos reales importados del cliente. Newsletter, landing SEO Astro y chat IA se integran despues sobre esta misma base."
      />

      <div className="stats-grid">
        <StatCard label="Audiencia unica" value={String(summary.uniqueAudience)} detail="contactos consolidados" />
        <StatCard label="Con email" value={String(summary.emailableContacts)} detail="listos para newsletter" />
        <StatCard label="Duplicados" value={String(summary.duplicateContacts)} detail="a limpiar antes de campañas" />
        <StatCard label="Propietarios" value={String(summary.ownerAudience)} detail="captacion y nurturing" />
        <StatCard label="Compradores" value={String(summary.buyerAudience)} detail="cierres y follow-up" />
      </div>

      <div className="two-columns">
        <SectionCard
          title="Landing pages y chat IA"
          description="Punto de entrada para captacion SEO en Astro, formularios y chatbot inteligente."
        >
          <div className="info-grid">
            <div className="info-item">
              <strong>Landing pages SEO</strong>
              <p>Modulo previsto para crear paginas tematicas, segmentadas por ciudad, propiedad y servicio.</p>
            </div>
            <div className="info-item">
              <strong>Chat IA</strong>
              <p>Captura de leads, preguntas frecuentes y calificacion automatica antes de entrar al pipeline.</p>
            </div>
            <div className="info-item">
              <strong>Routing</strong>
              <p>Asignacion futura a asesor, scoring IA y entrada directa a workflow comercial.</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Newsletter"
          description="Preparacion de audiencias y limpieza de base antes de conectar proveedor email."
        >
          <div className="info-grid">
            <div className="info-item">
              <strong>Base emailable</strong>
              <p>{summary.emailableContacts} contactos con email utilizable desde la migracion actual.</p>
            </div>
            <div className="info-item">
              <strong>Deduplicacion</strong>
              <p>{summary.duplicateContacts} contactos muestran colision por email, telefono o nombre.</p>
            </div>
            <div className="info-item">
              <strong>Segmentacion</strong>
              <p>Propietarios, compradores, cartera activa y audiencias por zona ya se pueden separar.</p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Audiencia consolidada"
        description="Muestra priorizada para outreach, limpieza comercial y futura automatizacion."
      >
        <DataTable
          rows={audience}
          getRowId={(row) => row.id}
          emptyMessage="No hay audiencia consolidada."
          columns={[
            {
              key: "name",
              label: "Contacto",
              render: (row) => (
                <div>
                  <strong>{row.fullName}</strong>
                  <div className="muted">{row.email ?? row.phone ?? "Sin dato principal"}</div>
                </div>
              )
            },
            {
              key: "segment",
              label: "Segmento",
              render: (row) => <StatusBadge value={row.segmentLabel} />
            },
            {
              key: "kind",
              label: "Tipo",
              render: (row) => <StatusBadge value={row.contactKind === "owner" ? "Propietario" : "Comprador"} />
            },
            { key: "linkedProperties", label: "Propiedades", align: "right", render: (row) => row.linkedProperties },
            { key: "activeProperties", label: "Activas", align: "right", render: (row) => row.activeProperties },
            {
              key: "duplicateCount",
              label: "Duplicados",
              align: "right",
              render: (row) => row.duplicateCount
            },
            { key: "location", label: "Zona", render: (row) => row.location }
          ]}
        />
      </SectionCard>
    </div>
  );
}

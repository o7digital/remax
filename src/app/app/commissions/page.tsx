import Link from "next/link";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { getCommissionData } from "@/lib/remax-app-data";

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export default async function CommissionsPage() {
  const { summary, dealRecords, advisorRecords } = await getCommissionData();

  return (
    <div className="page-stack">
      <PageHeader
        title="Comisiones"
        description="Calculo operativo por cierre, renta o cancelacion usando la formula configurada en Settings y las participaciones importadas."
        actions={
          <div className="button-row">
            <Link href="/app/settings/commissions" className="button">
              Editar formula
            </Link>
            <Link href="/app/reporting" className="button">
              Ver reporting
            </Link>
            <Link href="/app/dashboard" className="button button-secondary">
              Volver al dashboard
            </Link>
          </div>
        }
      />

      <DataOriginNotice
        title="Formula en Settings"
        description="La base operativa es real del cliente. Las tasas por deal kind se leen desde commission_rules en Settings > Commissions."
      />

      <div className="stats-grid">
        <StatCard label="Operaciones" value={String(summary.totalDeals)} detail="deals migrados" />
        <StatCard label="Con base de calculo" value={String(summary.estimableDeals)} detail="valor operativo disponible" />
        <StatCard
          label="Comision estimada"
          value={formatCurrency(summary.totalEstimatedCommission, "MXN", "es-MX")}
          detail="lectura agregada"
        />
        <StatCard
          label="Cobertura"
          value={formatPercent(summary.coverageRatio)}
          detail="deals con estimacion"
        />
      </div>

      <div className="two-columns">
        <SectionCard
          title="Top asesores"
          description="Ranking operativo segun participaciones y reparto estimado."
        >
          <DataTable
            rows={advisorRecords}
            getRowId={(row) => row.id}
            emptyMessage="No hay comisiones calculadas todavia."
            columns={[
              {
                key: "advisor",
                label: "Asesor",
                render: (row) => (
                  <div>
                    <strong>{row.advisorName}</strong>
                    <div className="muted">{row.staffKind}</div>
                  </div>
                )
              },
              {
                key: "status",
                label: "Estado",
                render: (row) => <StatusBadge value={row.employmentStatus} />
              },
              {
                key: "deals",
                label: "Deals",
                align: "right",
                render: (row) => row.dealCount
              },
              {
                key: "commission",
                label: "Comision estimada",
                align: "right",
                render: (row) => formatCurrency(row.estimatedCommission, row.currencyCode, "es-MX")
              }
            ]}
          />
        </SectionCard>

        <SectionCard
          title="Lectura de cobertura"
          description="Contexto rapido para validar la calidad del calculo antes de cerrar la formula final."
        >
          <ul className="list">
            <li className="list-item">
              <strong>Asesores con monto</strong>
              <span className="muted">{summary.activeAdvisorsWithCommission} perfiles activos con participacion utilizable</span>
            </li>
            <li className="list-item">
              <strong>Deals sin formula final</strong>
              <span className="muted">El modulo ya estima bruto, pero aun falta definir repartos exactos de oficina y direccion.</span>
            </li>
            <li className="list-item">
              <strong>Fuente real</strong>
              <span className="muted">Se usan `deals`, `deal_participants`, `properties` y `property_values` importados desde Access.</span>
            </li>
          </ul>
        </SectionCard>
      </div>

      <SectionCard
        title="Operaciones con estimacion"
        description="Ultimos deals ordenados por fecha operativa con bruto estimado y cobertura de participantes."
      >
        <DataTable
          rows={dealRecords}
          getRowId={(row) => row.id}
          emptyMessage="No hay operaciones con valor disponible."
          columns={[
            {
              key: "deal",
              label: "Operacion",
              render: (row) => (
                <div>
                  <strong>{row.dealTitle}</strong>
                  <div className="muted">{row.propertyKey} · {row.propertyTitle}</div>
                </div>
              )
            },
            {
              key: "kind",
              label: "Tipo",
              render: (row) => <StatusBadge value={row.dealKind} />
            },
            {
              key: "status",
              label: "Estado",
              render: (row) => <StatusBadge value={row.dealStatus} />
            },
            {
              key: "value",
              label: "Valor operacion",
              align: "right",
              render: (row) =>
                row.operationValue !== null
                  ? formatCurrency(row.operationValue, row.currencyCode, "es-MX")
                  : "Sin valor"
            },
            {
              key: "rate",
              label: "Tasa",
              align: "right",
              render: (row) => formatPercent(row.commissionRate)
            },
            {
              key: "gross",
              label: "Bruto estimado",
              align: "right",
              render: (row) =>
                row.estimatedGrossCommission !== null
                  ? formatCurrency(row.estimatedGrossCommission, row.currencyCode, "es-MX")
                  : "Sin calculo"
            },
            {
              key: "participants",
              label: "Participantes",
              align: "right",
              render: (row) => row.participantCount
            },
            {
              key: "date",
              label: "Fecha",
              render: (row) => (row.closedOn ? formatDate(row.closedOn, "es-MX") : "Sin fecha")
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}

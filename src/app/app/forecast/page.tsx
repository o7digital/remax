import Link from "next/link";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { formatCurrency } from "@/lib/formatters";
import { getStageStatusLabel } from "@/lib/pipeline-utils";
import { getPipelineForecastData } from "@/lib/remax-app-data";

export default async function ForecastPage() {
  const { workflow, summary, rows } = await getPipelineForecastData();

  return (
    <div className="page-stack">
      <PageHeader
        title="Forecast"
        description="Pronostico comercial ponderado sobre el pipeline operativo REMAX, usando las probabilidades activas por etapa."
        actions={
          <div className="button-row">
            <Link href="/app/pipeline" className="button">
              Abrir pipeline
            </Link>
            <Link href="/app/reporting" className="button button-secondary">
              Ver reporting
            </Link>
          </div>
        }
      />

      <DataOriginNotice
        title="Datos reales + forecast derivado"
        description="Los deals vienen de la base real del cliente. El forecast se calcula con las probabilidades visibles del workflow actual y se muestra en MXN para lectura ejecutiva."
      />

      <div className="stats-grid">
        <StatCard label="Workflow activo" value={workflow.name} detail="pipeline operativo" />
        <StatCard label="Deals abiertos" value={String(summary.openDeals)} detail="en seguimiento" />
        <StatCard
          label="Valor abierto"
          value={formatCurrency(summary.totalAmount, summary.currency, "es-MX")}
          detail="total base"
        />
        <StatCard
          label="Forecast ponderado"
          value={formatCurrency(summary.weightedAmount, summary.currency, "es-MX")}
          detail="monto ajustado por probabilidad"
        />
      </div>

      <SectionCard
        title="Pronostico por etapa"
        description="Lectura del pipeline por etapa, estado, probabilidad y valor ponderado."
      >
        <DataTable
          rows={rows}
          getRowId={(row) => row.stageId}
          emptyMessage="No hay etapas con deals visibles."
          columns={[
            { key: "stageName", label: "Etapa", render: (row) => row.stageName },
            { key: "status", label: "Estado", render: (row) => getStageStatusLabel(row.status) },
            { key: "dealCount", label: "Deals", align: "right", render: (row) => row.dealCount },
            { key: "probability", label: "Probabilidad", align: "right", render: (row) => `${row.probability}%` },
            {
              key: "totalAmount",
              label: "Total",
              align: "right",
              render: (row) => formatCurrency(row.totalAmount, row.currency, "es-MX")
            },
            {
              key: "weightedAmount",
              label: "Ponderado",
              align: "right",
              render: (row) => formatCurrency(row.weightedAmount, row.currency, "es-MX")
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}

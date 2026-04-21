import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { getCommissionRulesData } from "@/lib/remax-app-data";

function formatPercent(value: number | null) {
  if (typeof value !== "number") {
    return "Sin porcentaje";
  }

  return `${Math.round(value * 10000) / 100}%`;
}

export default async function SettingsCommissionsPage() {
  const { summary, records } = await getCommissionRulesData();

  return (
    <div className="page-stack">
      <PageHeader
        title="Formula de comisiones"
        description="Configuracion real de reglas desde la tabla commission_rules. Este es el origen usado por el calculo operativo."
      />

      <DataOriginNotice
        title="Fuente real"
        description="Las tasas se leen desde Supabase en commission_rules. Si una regla no existe para un deal_kind, se aplica fallback tecnico."
      />

      <div className="stats-grid">
        <StatCard label="Reglas" value={String(summary.totalRules)} detail="total cargadas" />
        <StatCard label="Activas" value={String(summary.activeRules)} detail="en uso" />
        <StatCard label="Cobertura" value={String(summary.dealKindCoverage)} detail="deal kinds con regla" />
      </div>

      <SectionCard
        title="Reglas de calculo"
        description="Define el porcentaje por tipo de operacion. 'global' se usa como base si no hay regla especifica."
      >
        <DataTable
          rows={records}
          getRowId={(row) => row.id}
          emptyMessage="No hay reglas de comision cargadas."
          columns={[
            { key: "code", label: "Codigo", render: (row) => <span className="mono">{row.ruleCode}</span> },
            { key: "name", label: "Nombre", render: (row) => row.name },
            { key: "dealKind", label: "Deal kind", render: (row) => <StatusBadge value={row.dealKind} /> },
            { key: "rate", label: "Porcentaje", align: "right", render: (row) => formatPercent(row.defaultPercent) },
            {
              key: "status",
              label: "Estado",
              render: (row) => (
                <StatusBadge value={row.isActive ? "active" : "inactive"} tone={row.isActive ? "info" : "neutral"} />
              )
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}

import Link from "next/link";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { getReportingData } from "@/lib/remax-app-data";

function formatMonth(month: string) {
  return formatDate(`${month}-01`, "es-MX");
}

export default async function ReportingPage() {
  const { summary, monthlyClosings, topAreas, topAdvisors } = await getReportingData();

  return (
    <div className="page-stack">
      <PageHeader
        title="Reporting"
        description="Vista ejecutiva del inventario, actividad operativa y productividad comercial cargada desde la base real del cliente."
        actions={
          <div className="button-row">
            <Link href="/app/commissions" className="button">
              Ver comisiones
            </Link>
            <Link href="/app/dashboard" className="button button-secondary">
              Volver al dashboard
            </Link>
          </div>
        }
      />

      <DataOriginNotice
        title="Datos reales + capa estimada"
        description="Inventario, deals, asistencia y guardias salen de Supabase. La columna de comision sigue siendo una estimacion operativa mientras se valida la regla final del cliente."
      />

      <div className="stats-grid">
        <StatCard label="Propiedades" value={String(summary.totalProperties)} detail="inventario migrado" />
        <StatCard label="Propiedades activas" value={String(summary.activeProperties)} detail="cartera vigente" />
        <StatCard label="Deals completados" value={String(summary.completedDeals)} detail="cierres historicos" />
        <StatCard label="Asistencia" value={String(summary.attendanceEvents)} detail="eventos importados" />
        <StatCard label="Guardias" value={String(summary.guardShifts)} detail="turnos consolidados" />
        <StatCard
          label="Comision estimada"
          value={formatCurrency(summary.estimatedCommissionTotal, "MXN", "es-MX")}
          detail="lectura agregada"
        />
      </div>

      <div className="two-columns">
        <SectionCard
          title="Cierres por mes"
          description="Tendencia mensual de deals y comision estimada sobre la data migrada."
        >
          <DataTable
            rows={monthlyClosings}
            getRowId={(row) => row.month}
            emptyMessage="No hay meses consolidados."
            columns={[
              { key: "month", label: "Mes", render: (row) => formatMonth(row.month) },
              { key: "deals", label: "Deals", align: "right", render: (row) => row.deals },
              {
                key: "commission",
                label: "Comision estimada",
                align: "right",
                render: (row) => formatCurrency(row.estimatedCommission, "MXN", "es-MX")
              }
            ]}
          />
        </SectionCard>

        <SectionCard
          title="Zonas con mas inventario"
          description="Municipios o estados con mayor concentracion de propiedades importadas."
        >
          <DataTable
            rows={topAreas}
            getRowId={(row) => row.area}
            emptyMessage="No hay ubicaciones disponibles."
            columns={[
              { key: "area", label: "Zona", render: (row) => row.area },
              { key: "properties", label: "Propiedades", align: "right", render: (row) => row.propertyCount },
              {
                key: "active",
                label: "Activas",
                align: "right",
                render: (row) => row.activePropertyCount
              }
            ]}
          />
        </SectionCard>
      </div>

      <SectionCard
        title="Productividad comercial"
        description="Asesores con mayor monto estimado de comision segun participaciones encontradas."
      >
        <DataTable
          rows={topAdvisors}
          getRowId={(row) => row.id}
          emptyMessage="No hay asesores con comision estimable."
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
            { key: "deals", label: "Deals", align: "right", render: (row) => row.dealCount },
            {
              key: "commission",
              label: "Comision estimada",
              align: "right",
              render: (row) => formatCurrency(row.estimatedCommission, row.currencyCode, "es-MX")
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}

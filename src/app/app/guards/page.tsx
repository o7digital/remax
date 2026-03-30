import Link from "next/link";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/formatters";
import { getGuardAttendanceData } from "@/lib/remax-app-data";

export default async function GuardsPage() {
  const { summary, coverage, shifts, attendance } = await getGuardAttendanceData();

  return (
    <div className="page-stack">
      <PageHeader
        title="Guardias"
        description="Cobertura historica de turnos, puntualidad y eventos de check-in/check-out importados desde la base real."
        actions={
          <div className="button-row">
            <Link href="/app/settings/users" className="button">
              Ver staff
            </Link>
            <Link href="/app/dashboard" className="button button-secondary">
              Volver al dashboard
            </Link>
          </div>
        }
      />

      <DataOriginNotice
        title="Historico real"
        description="Los turnos y eventos de asistencia salen de la migracion Access. El check-in webapp en tiempo real se construira en la siguiente fase."
      />

      <div className="stats-grid">
        <StatCard label="Turnos" value={String(summary.totalShifts)} detail="guardias importadas" />
        <StatCard label="Asignadas" value={String(summary.assignedShifts)} detail="con asesor match" />
        <StatCard label="Asistencia" value={String(summary.attendanceEvents)} detail="check-in / check-out" />
        <StatCard label="Staff activo elegible" value={String(summary.activeGuardStaff)} detail="cobertura actual" />
      </div>

      <div className="two-columns">
        <SectionCard
          title="Cobertura por asesor"
          description="Ranking de guardias acumuladas, retardos y volumen de asistencia registrada."
        >
          <DataTable
            rows={coverage}
            getRowId={(row) => row.id}
            emptyMessage="No hay cobertura consolidada."
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
              { key: "shifts", label: "Turnos", align: "right", render: (row) => row.shiftCount },
              { key: "late", label: "Retardos", align: "right", render: (row) => row.lateCount },
              { key: "events", label: "Eventos", align: "right", render: (row) => row.attendanceEvents }
            ]}
          />
        </SectionCard>

        <SectionCard
          title="Actividad reciente"
          description="Ultimos eventos de asistencia ya reconciliados contra el staff real."
        >
          <DataTable
            rows={attendance}
            getRowId={(row) => row.id}
            emptyMessage="No hay eventos de asistencia."
            columns={[
              { key: "advisor", label: "Asesor", render: (row) => row.advisorName },
              { key: "event", label: "Evento", render: (row) => <StatusBadge value={row.eventType} tone="info" /> },
              { key: "date", label: "Fecha", render: (row) => formatDate(row.eventAt, "es-MX") }
            ]}
          />
        </SectionCard>
      </div>

      <SectionCard
        title="Ultimos turnos"
        description="Detalle reciente de turno, puntualidad y cierre."
      >
        <DataTable
          rows={shifts}
          getRowId={(row) => row.id}
          emptyMessage="No hay turnos cargados."
          columns={[
            { key: "date", label: "Fecha", render: (row) => formatDate(row.shiftDate, "es-MX") },
            { key: "slot", label: "Turno", render: (row) => row.shiftLabel },
            {
              key: "advisor",
              label: "Asignado",
              render: (row) => (
                <div>
                  <strong>{row.advisorName}</strong>
                  <div className="muted">{row.replacementName ? `Reemplazo: ${row.replacementName}` : "Sin reemplazo"}</div>
                </div>
              )
            },
            { key: "status", label: "Estado", render: (row) => <StatusBadge value={row.shiftStatus} /> },
            {
              key: "checkin",
              label: "Entrada",
              render: (row) => (
                <StatusBadge
                  value={row.punctualityStatus}
                  tone={row.punctualityStatus === "Puntual" ? "success" : "warning"}
                />
              )
            },
            {
              key: "checkout",
              label: "Salida",
              render: (row) => (
                <StatusBadge
                  value={row.checkoutStatus}
                  tone={row.checkoutStatus === "Puntual" ? "success" : "warning"}
                />
              )
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}

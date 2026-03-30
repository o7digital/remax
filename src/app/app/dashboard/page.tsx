import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/formatters";
import { getDashboardData } from "@/lib/remax-app-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function DashboardPage() {
  const { txt } = await getDemoI18n();
  const { summary, properties, deals, staff, shifts, attendance } = await getDashboardData();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Dashboard")}
        description={txt(
          "Vista ejecutiva de propiedades, operaciones, asesores y asistencia cargada desde la base real del cliente."
        )}
        actions={
          <div className="button-row">
            <Link href="/app/clients" className="button">
              {txt("Ver clientes")}
            </Link>
            <Link href="/app/contacts" className="button button-secondary">
              {txt("Ver contactos")}
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard
          label={txt("Propiedades")}
          value={String(summary.propertyCount)}
          detail={txt("inventario migrado")}
        />
        <StatCard
          label={txt("Propiedades activas")}
          value={String(summary.activePropertyCount)}
          detail={txt("cartera comercial vigente")}
        />
        <StatCard
          label={txt("Staff activo")}
          value={String(summary.activeStaffCount)}
          detail={txt("asesores y administracion")}
        />
        <StatCard
          label={txt("Guardias")}
          value={String(summary.guardShiftCount)}
          detail={txt("turnos historicos importados")}
        />
      </div>

      <div className="two-columns">
        <SectionCard
          title={txt("Propiedades destacadas")}
          description={txt("Muestra inicial del inventario real con estado y ubicacion.")}
          action={
            <Link href="/app/clients" className="button button-ghost">
              {txt("Clientes")}
            </Link>
          }
        >
          <DataTable
            rows={properties}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "property",
                label: txt("Propiedad"),
                render: (row) => (
                  <div>
                    <strong>{row.propertyKey}</strong>
                    <div className="muted">{row.title}</div>
                  </div>
                )
              },
              {
                key: "location",
                label: txt("Ubicacion"),
                render: (row) => row.location
              },
              {
                key: "status",
                label: txt("Estado"),
                render: (row) => <StatusBadge value={txt(row.propertyStatus)} />
              }
            ]}
          />
        </SectionCard>

        <SectionCard
          title={txt("Resumen operativo")}
          description={txt("Lectura rapida del nucleo importado desde Access.")}
        >
          <ul className="list">
            <li className="list-item">
              <strong>{txt("Operaciones completadas")}</strong>
              <span className="muted">{summary.completedDealCount} {txt("cierres y cancelaciones")}</span>
            </li>
            <li className="list-item">
              <strong>{txt("Propiedades cerradas")}</strong>
              <span className="muted">{summary.closedPropertyCount} {txt("historico consolidado")}</span>
            </li>
            <li className="list-item">
              <strong>{txt("Eventos de asistencia")}</strong>
              <span className="muted">{summary.attendanceEventCount} {txt("check-in y check-out importados")}</span>
            </li>
            <li className="list-item">
              <strong>{txt("Cobertura de guardias")}</strong>
              <span className="muted">{summary.guardShiftCount} {txt("registros listos para explotacion")}</span>
            </li>
          </ul>
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard
          title={txt("Operaciones recientes")}
          description={txt("Ultimos cierres y cancelaciones del historico migrado.")}
          action={
            <Link href="/app/contacts" className="button button-ghost">
              {txt("Contactos")}
            </Link>
          }
        >
          <DataTable
            rows={deals}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "deal",
                label: txt("Operacion"),
                render: (row) => (
                  <div>
                    <strong>{row.title}</strong>
                    <div className="muted">{row.propertyKey} · {row.propertyTitle}</div>
                  </div>
                )
              },
              {
                key: "kind",
                label: txt("Tipo"),
                render: (row) => <StatusBadge value={txt(row.dealKind)} />
              },
              {
                key: "status",
                label: txt("Estado"),
                render: (row) => <StatusBadge value={txt(row.status)} />
              },
              {
                key: "date",
                label: txt("Fecha"),
                render: (row) => row.closedOn ? formatDate(row.closedOn, "es-MX") : "Sin fecha"
              }
            ]}
          />
        </SectionCard>

        <SectionCard
          title={txt("Equipo operativo")}
          description={txt("Staff importado con foco en perfiles activos y elegibilidad de guardia.")}
        >
          <ul className="list">
            {staff.map((member) => (
              <li key={member.id} className="timeline-item">
                <strong>{member.displayName}</strong>
                <span className="muted">
                  {txt(member.staffKind)} · {txt(member.employmentStatus)} · {member.guardEligible ? "Guardia" : "Sin guardia"}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard
          title={txt("Guardias recientes")}
          description={txt("Ultimos turnos importados con asesor asignado.")}
        >
          <DataTable
            rows={shifts}
            getRowId={(row) => row.id}
            columns={[
              { key: "date", label: txt("Fecha"), render: (row) => formatDate(row.shiftDate, "es-MX") },
              { key: "label", label: txt("Turno"), render: (row) => row.shiftLabel },
              { key: "advisor", label: txt("Asesor"), render: (row) => row.advisorName },
              { key: "status", label: txt("Estado"), render: (row) => <StatusBadge value={txt(row.shiftStatus)} /> }
            ]}
          />
        </SectionCard>

        <SectionCard
          title={txt("Asistencia reciente")}
          description={txt("Ultimos eventos de check-in y check-out del historico cargado.")}
        >
          <DataTable
            rows={attendance}
            getRowId={(row) => row.id}
            columns={[
              { key: "advisor", label: txt("Asesor"), render: (row) => row.advisorName },
              { key: "event", label: txt("Evento"), render: (row) => <StatusBadge value={txt(row.eventType)} /> },
              { key: "date", label: txt("Fecha"), render: (row) => formatDate(row.eventAt, "es-MX") }
            ]}
          />
        </SectionCard>
      </div>
    </div>
  );
}

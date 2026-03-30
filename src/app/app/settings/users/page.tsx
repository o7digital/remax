import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/formatters";
import { getStaffDirectoryData } from "@/lib/remax-app-data";

export default async function SettingsUsersPage() {
  const { summary, records } = await getStaffDirectoryData();

  return (
    <div className="page-stack">
      <PageHeader
        title="Usuarios"
        description="Directorio real del staff REMAX importado desde Access. Las cuentas de acceso del producto se gestionan aparte."
      />

      <DataOriginNotice
        title="Staff real"
        description="Esta vista muestra asesores y administracion reales del cliente. El login tecnico de dev sigue siendo una cuenta separada del producto."
      />

      <div className="stats-grid">
        <StatCard label="Staff total" value={String(summary.totalStaff)} detail="directorio importado" />
        <StatCard label="Activos" value={String(summary.activeStaff)} detail="equipo vigente" />
        <StatCard label="Asesores" value={String(summary.advisorCount)} detail="comerciales" />
        <StatCard label="Guardias elegibles" value={String(summary.guardEligibleCount)} detail="cobertura potencial" />
      </div>

      <SectionCard title="Directorio del staff" description="Asesores, administracion, contacto y elegibilidad para guardias.">
        <DataTable
          rows={records}
          getRowId={(row) => row.id}
          emptyMessage="No hay staff importado."
          columns={[
            {
              key: "name",
              label: "Usuario",
              render: (row) => (
                <div>
                  <strong>{row.displayName}</strong>
                  <div className="muted">{row.email ?? "Sin email"}</div>
                </div>
              )
            },
            { key: "role", label: "Rol", render: (row) => row.roleLabel },
            { key: "location", label: "Ubicacion", render: (row) => row.location },
            { key: "phone", label: "Telefono", render: (row) => row.phone ?? "Sin telefono" },
            { key: "status", label: "Estado", render: (row) => <StatusBadge value={row.employmentStatus} /> },
            {
              key: "guard",
              label: "Guardia",
              render: (row) => (
                <StatusBadge value={row.guardEligible ? "Elegible" : "Sin guardia"} tone={row.guardEligible ? "info" : "neutral"} />
              )
            },
            {
              key: "joined",
              label: "Alta",
              render: (row) => (row.joinedOn ? formatDate(row.joinedOn, "es-MX") : "Sin fecha")
            },
            {
              key: "left",
              label: "Baja",
              render: (row) => (row.leftOn ? formatDate(row.leftOn, "es-MX") : "Activa")
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}

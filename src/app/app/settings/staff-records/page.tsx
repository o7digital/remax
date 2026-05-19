import Link from "next/link";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/formatters";
import { getStaffAccessFormData } from "@/lib/remax-app-data";

export default async function StaffRecordsPage() {
  const { summary, records } = await getStaffAccessFormData();
  const formModules = [
    {
      name: "F-Asesores",
      title: "Registro de asesores internos",
      detail: "INF. GRAL. + INF. FISCAL + INF. PERSONAL + INF. SOCIO REMAX",
      table: "staff_members + staff_fiscal_profiles + staff_personal_profiles + staff_remax_accounts"
    },
    {
      name: "F-Staff",
      title: "Registro de miembros del Staff",
      detail: "INF. GRAL. + INF. FISCAL + INF. PERSONAL + INF. SOCIO REMAX",
      table: "staff_members + staff_fiscal_profiles + staff_personal_profiles + staff_remax_accounts"
    },
    {
      name: "F-Asesores - parte inferior",
      title: "Socio REMAX / SIR / AMPI / Universidad",
      detail: "Fecha ingreso SIR, ID Remax Mexico, Remax Int, Universidad, AMPI, estatus y comentarios",
      table: "staff_remax_accounts"
    }
  ];

  return (
    <div className="page-stack">
      <PageHeader
        title="F-Asesores / F-Staff"
        description="Pantallas de captura migradas desde Access: Registro de asesores internos, Registro de miembros del Staff y bloque Socio REMAX."
        actions={
          <div className="button-row">
            <Link href="/app/settings/users" className="button">
              Directorio
            </Link>
            <Link href="/app/settings" className="button button-secondary">
              Settings
            </Link>
          </div>
        }
      />

      <DataOriginNotice
        title="Nombres originales Access visibles"
        description="Los formularios que pasaste quedan identificados aqui por su nombre original. Abajo se ve la tabla consolidada conectada a Railway/Postgres."
      />

      <SectionCard
        title="Formularios Access migrados"
        description="Estos son los modulos de captura que corresponden directamente a tus capturas."
      >
        <DataTable
          rows={formModules}
          getRowId={(row) => row.name}
          emptyMessage="No hay formularios configurados."
          columns={[
            {
              key: "form",
              label: "Formulario Access",
              render: (row) => (
                <div>
                  <strong>{row.name}</strong>
                  <div className="muted">{row.title}</div>
                </div>
              )
            },
            { key: "blocks", label: "Bloques de saisie", render: (row) => row.detail },
            { key: "tables", label: "Tables Railway/Postgres", render: (row) => <span className="mono">{row.table}</span> }
          ]}
        />
      </SectionCard>

      <div className="stats-grid">
        <StatCard label="F-Asesores / F-Staff" value={String(summary.totalStaff)} detail="staff_members" />
        <StatCard label="INF. FISCAL" value={String(summary.fiscalProfiles)} detail="staff_fiscal_profiles" />
        <StatCard label="INF. PERSONAL" value={String(summary.personalProfiles)} detail="staff_personal_profiles" />
        <StatCard label="INF. SOCIO REMAX" value={String(summary.remaxAccounts)} detail="staff_remax_accounts" />
      </div>

      <div className="stats-grid">
        <StatCard label="RESICO" value={String(summary.resicoCount)} detail="marcados en Access" />
        <StatCard label="AMPI" value={String(summary.ampiCount)} detail="asociaciones detectadas" />
      </div>

      <SectionCard
        title="F-Asesores / F-Staff - registros importados"
        description="Vista consolidada de los bloques INF. FISCAL, INF. PERSONAL et INF. SOCIO REMAX conectados por staff_member_id."
      >
        <DataTable
          rows={records}
          getRowId={(row) => row.id}
          emptyMessage="No hay expedientes staff importados."
          columns={[
            {
              key: "staff",
              label: "Staff",
              render: (row) => (
                <div>
                  <strong>{row.displayName}</strong>
                  <div className="muted">{row.roleLabel}</div>
                </div>
              )
            },
            { key: "status", label: "Estado", render: (row) => <StatusBadge value={row.employmentStatus} /> },
            {
              key: "fiscal",
              label: "Fiscal",
              render: (row) => (
                <div>
                  <strong>{row.taxId ?? "Sin RFC"}</strong>
                  <div className="muted">{row.fiscalEmail ?? row.bankLabel}</div>
                </div>
              )
            },
            { key: "bank", label: "Banco", render: (row) => row.bankLabel },
            {
              key: "personal",
              label: "Personal",
              render: (row) => (
                <div>
                  <strong>{row.emergencyContact}</strong>
                  <div className="muted">{row.medicalLabel}</div>
                </div>
              )
            },
            {
              key: "systems",
              label: "Sistemas",
              render: (row) => (
                <div>
                  <strong>{row.sirUser ?? "Sin SIR"}</strong>
                  <div className="muted">{row.remaxMexico}</div>
                </div>
              )
            },
            { key: "ampi", label: "AMPI", render: (row) => row.ampi },
            { key: "profile", label: "Perfil", render: (row) => row.profile },
            {
              key: "dates",
              label: "Fechas",
              render: (row) => (
                <div>
                  <strong>{row.joinedOn ? formatDate(row.joinedOn, "es-MX") : "Sin alta"}</strong>
                  <div className="muted">{row.rejoinedOn ? `Reingreso ${formatDate(row.rejoinedOn, "es-MX")}` : "Sin reingreso"}</div>
                </div>
              )
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}

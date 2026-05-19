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

  return (
    <div className="page-stack">
      <PageHeader
        title="Expedientes staff"
        description="Modulos importados desde los formularios Access F-Asesores y F-Staff: fiscal, personal y socio REMAX."
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
        title="Datos Access"
        description="Estas tablas complementan staff_members y conservan los bloques visibles en los formularios originales para migracion operativa."
      />

      <div className="stats-grid">
        <StatCard label="Staff" value={String(summary.totalStaff)} detail="expedientes base" />
        <StatCard label="Fiscal" value={String(summary.fiscalProfiles)} detail="RFC, banco, RESICO" />
        <StatCard label="Personal" value={String(summary.personalProfiles)} detail="emergencia y salud" />
        <StatCard label="Socio REMAX" value={String(summary.remaxAccounts)} detail="SIR, AMPI, universidad" />
      </div>

      <div className="stats-grid">
        <StatCard label="RESICO" value={String(summary.resicoCount)} detail="marcados en Access" />
        <StatCard label="AMPI" value={String(summary.ampiCount)} detail="asociaciones detectadas" />
      </div>

      <SectionCard
        title="Registro de asesores y staff"
        description="Vista consolidada de los tres modulos nuevos conectados por staff_member_id."
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

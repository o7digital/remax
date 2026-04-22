import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { ROLE_MODULE_ACCESS } from "@/lib/access-control";
import { permissionCatalog, roles } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function SettingsRolesPage() {
  const { txt } = await getDemoI18n();
  const roleModuleRows = Object.entries(ROLE_MODULE_ACCESS).map(([role, modules]) => ({
    id: role,
    role,
    modules
  }));

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Roles")}
        description={txt("Roles et permissions pour sales, finance, operations et administration.")}
      />

      <DataOriginNotice description="El catalogo de roles y permisos sigue siendo temporal. Todavia no representa la estructura final del cliente." />

      <SectionCard title="Acceso por modulo" description="Definicion de que rol puede abrir cada modulo del ERP.">
        <DataTable
          rows={roleModuleRows}
          getRowId={(row) => row.id}
          columns={[
            { key: "role", label: txt("Role"), render: (row) => row.role },
            {
              key: "modules",
              label: "Modulos permitidos",
              render: (row) => (
                <div className="inline-stack">
                  {row.modules.map((module) => (
                    <StatusBadge key={module} value={module} />
                  ))}
                </div>
              )
            }
          ]}
        />
      </SectionCard>

      <div className="two-columns">
        <SectionCard title={txt("Roles actifs")} description={txt("Roles appliques dans le workspace.")}>
          <DataTable
            rows={roles}
            getRowId={(row) => row.id}
            columns={[
              { key: "name", label: txt("Role"), render: (row) => txt(row.name) },
              { key: "users", label: txt("Users"), align: "right", render: (row) => row.users },
              {
                key: "permissions",
                label: txt("Permissions"),
                render: (row) => (
                  <div className="inline-stack">
                    {row.permissions.map((permission) => (
                      <StatusBadge key={permission} value={permission} />
                    ))}
                  </div>
                )
              }
            ]}
          />
        </SectionCard>

        <SectionCard title={txt("Catalogue permissions")} description={txt("Granularite cible de l'IAM ERP.")}>
          <ul className="list">
            {permissionCatalog.map((permission) => (
              <li key={permission} className="list-item">
                <strong className="mono">{permission}</strong>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}

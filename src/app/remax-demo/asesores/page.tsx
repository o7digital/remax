import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { AccessSection } from "@/remax-demo/components/access-section";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { formatPercent, getSingleSearchParam } from "@/remax-demo/formatters";
import { getRemaxLanguage } from "@/remax-demo/get-language";
import { rt, translateOperation, translatePropertyStatus, translateRoleContext, translateStaffType } from "@/remax-demo/i18n";
import {
  getAdviserSummaryRows,
  getAdvisorById,
  getPropertyRoleMatrix
} from "@/remax-demo/stats";

export default async function AsesoresPage({
  searchParams
}: {
  searchParams: Promise<{ asesor?: string | string[] }>;
}) {
  const language = await getRemaxLanguage();
  const t = (value: string) => rt(language, value);
  const params = await searchParams;
  const selectedId = getSingleSearchParam(params.asesor) ?? "pedro-leyva";
  const selectedAdvisor = getAdvisorById(selectedId) ?? getAdvisorById("pedro-leyva");
  const advisorRows = getAdviserSummaryRows();
  const selectedRow = advisorRows.find((row) => row.advisor.id === selectedAdvisor?.id) ?? advisorRows[0];

  if (!selectedAdvisor || !selectedRow) {
    return null;
  }

  const linkedProperties = [...selectedRow.alta, ...selectedRow.baja, ...selectedRow.cancelacion]
    .filter((property, index, array) => array.findIndex((candidate) => candidate.clave === property.clave) === index);

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title={language === "en" ? "Agents" : "Asesores"}
        description={language === "en" ? "Agent view for the new platform: main table by context, A/M level, participation and linked properties. Pedro Leyva is shown as General Manager and also Class A Agent." : "Vista de asesores de la nueva plataforma: tabla principal por contexto, nivel A/M, participacion y propiedades vinculadas. Pedro Leyva se muestra como Director General y ademas Asesor A."}
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo/alta?step=asesores&propiedad=IBR-OP277" className="button">
              {language === "en" ? "View onboarding agents" : "Ver asesores de alta"}
            </Link>
            <Link href="/remax-demo/baja?step=asesores&propiedad=CBR-1748" className="button button-secondary">
              {language === "en" ? "View closing agents" : "Ver asesores de baja"}
            </Link>
          </div>
        }
      />

      <AccessSection title={language === "en" ? "Agent summary" : "Resumen por asesor"}>
        <DataTable
          rows={advisorRows}
          getRowId={(row) => row.advisor.id}
          columns={[
            {
              key: "asesor",
              label: language === "en" ? "Agent" : "Asesor",
              render: (row) => (
                <Link href={`/remax-demo/asesores?asesor=${row.advisor.id}`}>
                  <strong>{row.advisor.nombre}</strong>
                </Link>
              )
            },
            { key: "clase", label: language === "en" ? "Class" : "Clase", render: (row) => row.advisor.clase ?? "Staff" },
            { key: "rol", label: language === "en" ? "Primary role" : "Rol principal", render: (row) => t(row.advisor.rol) },
            { key: "comision", label: language === "en" ? "Base commission" : "Comision base", render: (row) => formatPercent(row.advisor.comisionRate, language) },
            { key: "alta", label: language === "en" ? "Onboarding" : "Alta", render: (row) => String(row.alta.length) },
            { key: "baja", label: language === "en" ? "Closing" : "Baja", render: (row) => String(row.baja.length) },
            { key: "cancelacion", label: language === "en" ? "Cancellation" : "Cancelacion", render: (row) => String(row.cancelacion.length) },
            { key: "total", label: language === "en" ? "Properties" : "Propiedades", render: (row) => String(row.total) }
          ]}
        />
      </AccessSection>

      <AccessSection title={`${language === "en" ? "Profile of" : "Ficha de"} ${selectedAdvisor.nombre}`} accent="blue">
        <div className="remax-form-grid remax-form-grid-4">
          <label className="remax-field"><span>{language === "en" ? "Name" : "Nombre"}</span><input value={selectedAdvisor.nombre} readOnly /></label>
          <label className="remax-field"><span>{language === "en" ? "Class" : "Clase"}</span><input value={selectedAdvisor.clase ?? "Staff"} readOnly /></label>
          <label className="remax-field"><span>{language === "en" ? "Staff type" : "Tipo personal"}</span><input value={translateStaffType(language, selectedAdvisor.tipoPersonal)} readOnly /></label>
          <label className="remax-field"><span>{language === "en" ? "Role" : "Rol"}</span><input value={t(selectedAdvisor.rol)} readOnly /></label>
        </div>

        <div className="remax-summary-strip">
          <div>
            <span>{language === "en" ? "Onboarding participation" : "Participacion en alta"}</span>
            <strong>{selectedRow.alta.length}</strong>
          </div>
          <div>
            <span>{language === "en" ? "Closing participation" : "Participacion en baja"}</span>
            <strong>{selectedRow.baja.length}</strong>
          </div>
          <div>
            <span>{language === "en" ? "Cancellation participation" : "Participacion en cancelacion"}</span>
            <strong>{selectedRow.cancelacion.length}</strong>
          </div>
          <div>
            <span>{language === "en" ? "Scheme" : "Esquema"}</span>
            <strong>{selectedAdvisor.clase === "A" ? (language === "en" ? "Higher commission" : "Comision mayor") : selectedAdvisor.clase === "M" ? (language === "en" ? "New level" : "Nivel nuevo") : "Staff"}</strong>
          </div>
        </div>
      </AccessSection>

      <AccessSection title={language === "en" ? "Linked properties" : "Propiedades vinculadas"} accent="red">
        <DataTable
          rows={linkedProperties}
          getRowId={(row) => row.id}
          columns={[
            {
              key: "clave",
              label: language === "en" ? "Property" : "Propiedad",
              render: (row) => (
                <Link href={`/remax-demo/alta?step=asesores&propiedad=${row.clave}`}>
                  <strong>{row.clave}</strong>
                </Link>
              )
            },
            { key: "estatus", label: language === "en" ? "Status" : "Estatus", render: (row) => translatePropertyStatus(language, row.estatus) },
            { key: "operacion", label: language === "en" ? "Operation" : "Operacion", render: (row) => translateOperation(language, row.operacion) },
            { key: "tipo", label: language === "en" ? "Type" : "Tipo", render: (row) => t(row.tipo) },
            {
              key: "roles",
              label: language === "en" ? "Roles for this agent" : "Roles de este asesor",
              render: (row) =>
                getPropertyRoleMatrix(row)
                  .find((item) => item.advisor.id === selectedAdvisor.id)
                  ?.roles.map((role) => translateRoleContext(language, role)).join(", ") ?? "-"
            }
          ]}
        />
      </AccessSection>
    </div>
  );
}

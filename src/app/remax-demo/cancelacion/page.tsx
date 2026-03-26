import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { remaxDemoDefaults } from "@/remax-demo/data";
import { CommunicationsPreview } from "@/remax-demo/components/communications-preview";
import { AccessSection } from "@/remax-demo/components/access-section";
import { PropertyBanner } from "@/remax-demo/components/property-banner";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { WorkflowTabs } from "@/remax-demo/components/workflow-tabs";
import {
  formatCompactPercent,
  formatCurrencyMXN,
  getSingleSearchParam
} from "@/remax-demo/formatters";
import {
  rt,
  translatePropertyStatus,
  translateRoleContext
} from "@/remax-demo/i18n";
import { getRemaxLanguage } from "@/remax-demo/get-language";
import {
  getAdvisorById,
  getCurrentValue,
  getPropertiesByStatus,
  getPropertyByClave,
  getPropertyCommunications,
  getPropertyRoleMatrix
} from "@/remax-demo/stats";

const cancelacionSteps = [
  { key: "busqueda", label: "Busqueda" },
  { key: "registro", label: "Registro de cancelacion" },
  { key: "asesores", label: "Asesores de cancelacion" },
  { key: "comunicado", label: "Comunicado" }
] as const;

export default async function CancelacionPage({
  searchParams
}: {
  searchParams: Promise<{ step?: string | string[]; propiedad?: string | string[] }>;
}) {
  const params = await searchParams;
  const step = getSingleSearchParam(params.step) ?? "busqueda";
  const language = await getRemaxLanguage();
  const t = (value: string) => rt(language, value);
  const maybeT = (value?: string | null) => (value ? t(value) : "");
  const selectedKey = getSingleSearchParam(params.propiedad) ?? remaxDemoDefaults.cancelacionPropertyKey;
  const property = getPropertyByClave(selectedKey) ?? getPropertyByClave(remaxDemoDefaults.cancelacionPropertyKey);

  if (!property) {
    return null;
  }

  const roleMatrix = getPropertyRoleMatrix(property).filter((row) => row.roles.length > 1);
  const communication = getPropertyCommunications(property.clave)[0];

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title={language === "en" ? "Property cancellation" : "Cancelacion de propiedad"}
        description={language === "en"
          ? "Cancellation workflow in the new platform: property selection, cancellation reason, commission yes/no, recording user, cancellation agents and communication."
          : "Flujo de cancelacion de la nueva plataforma: seleccion de propiedad, motivo de cancelacion, comision si/no, persona que registra, asesores de cancelacion y comunicado."}
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo" className="button button-secondary">
              {t("Regresar a menú")}
            </Link>
            <Link href="/remax-demo/comunicados" className="button">
              {t("Ver bitacora")}
            </Link>
          </div>
        }
      />

      <PropertyBanner property={property} title={t("Proceso de Cancelacion")} language={language} />

      <WorkflowTabs
        items={cancelacionSteps.map((item) => ({
          label: t(item.label),
          href: `/remax-demo/cancelacion?step=${item.key}&propiedad=${property.clave}`,
          active: step === item.key
        }))}
      />

      {step === "busqueda" ? (
        <AccessSection
          title={language === "en" ? "Property cancellation record" : "Registro de Cancelacion de Propiedad"}
          action={
            <Link href={`/remax-demo/cancelacion?step=registro&propiedad=${property.clave}`} className="button">
              {language === "en" ? "Go to property cancellation" : "Ir a cancelacion de propiedad"}
            </Link>
          }
        >
          <div className="remax-search-header">
            <strong>{language === "en" ? "Search by key, neighborhood, street, gated area, subdivision or agent" : "Buscar por Clave, Colonia, Calle, Coto, Fraccionamiento o Asesor"}</strong>
            <span>{language === "en" ? `Showing ${getPropertiesByStatus("Cancelada").length} cancelled records` : `Mostrando ${getPropertiesByStatus("Cancelada").length} registros cancelados`}</span>
          </div>
          <DataTable
            rows={getPropertiesByStatus("Cancelada")}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "clave",
                label: t("Clave Propiedad"),
                render: (row) => (
                  <Link href={`/remax-demo/cancelacion?step=registro&propiedad=${row.clave}`}>
                    <strong>{row.clave}</strong>
                  </Link>
                )
              },
              { key: "colonia", label: t("Colonia"), render: (row) => row.address.colonia },
              { key: "domicilio", label: t("Domicilio"), render: (row) => `${row.address.calle} ${row.address.noExt}` },
              { key: "asesor", label: language === "en" ? "Agent" : "Asesor", render: (row) => getAdvisorById(row.asesoresAlta[0]?.advisorId ?? "")?.nombre ?? "" },
              { key: "precio", label: language === "en" ? "Price" : "Precio", align: "right", render: (row) => formatCurrencyMXN(getCurrentValue(row), language) },
              { key: "status", label: language === "en" ? "Property status" : "Status Propiedad", render: () => translatePropertyStatus(language, "Cancelada") }
            ]}
          />
        </AccessSection>
      ) : null}

      {step === "registro" ? (
        <AccessSection
          title={language === "en" ? "Property cancellation details" : "Registro de Cancelacion de Propiedades"}
          action={
            <Link href={`/remax-demo/cancelacion?step=asesores&propiedad=${property.clave}`} className="button">
              {language === "en" ? "Register cancellation agents" : "Registrar Asesores de Cancelacion"}
            </Link>
          }
        >
          <div className="remax-form-grid remax-form-grid-4">
            <label className="remax-field"><span>{t("Clave Propiedad")}</span><input value={property.clave} readOnly /></label>
            <label className="remax-field"><span>{t("Baja por Cancelacion")}</span><input value={maybeT(property.cancelacion?.bajaPor)} readOnly /></label>
            <label className="remax-field"><span>{t("Fecha aviso a recepcion")}</span><input value={property.cancelacion?.fechaAvisoRecepcion ?? ""} readOnly /></label>
            <div className="remax-cancel-box remax-field-span-3">
              <div className="remax-cancel-box-title">{language === "en" ? "CANCELLATION" : "CANCELACION"}</div>
              <div className="remax-form-grid remax-form-grid-3">
                <label className="remax-field"><span>{t("Fecha Cancelacion")}</span><input value={property.cancelacion?.fechaCancelacion ?? ""} readOnly /></label>
                <label className="remax-field remax-field-span-2"><span>{language === "en" ? "Does commission apply in case of cancellation? (Yes/No)" : "En caso de cancelación aplica comisión? (Sí/No)"}</span><input value={language === "en" ? (property.cancelacion?.aplicaComision ? "Yes" : "No") : property.cancelacion?.aplicaComision ? "Sí" : "No"} readOnly /></label>
                <label className="remax-field remax-field-span-3"><span>{t("Motivo Cancelacion")}</span><input value={maybeT(property.cancelacion?.motivo)} readOnly /></label>
              </div>
            </div>
            <label className="remax-field"><span>{t("Persona que registra")}</span><input value={property.cancelacion?.personaRegistra ?? ""} readOnly /></label>
            <label className="remax-field remax-field-span-4"><span>{t("Comentarios")}</span><textarea value={property.cancelacion?.comentarios ?? ""} readOnly /></label>
          </div>
        </AccessSection>
      ) : null}

      {step === "asesores" ? (
        <AccessSection
          title={language === "en" ? "Cancellation agents" : "Asesores de cancelacion"}
          action={
            <Link href={`/remax-demo/cancelacion?step=comunicado&propiedad=${property.clave}`} className="button">
              {language === "en" ? "View communication" : "Ver comunicado"}
            </Link>
          }
        >
          <DataTable
            rows={property.asesoresCancelacion}
            getRowId={(row) => `${row.advisorId}-${row.contexto}`}
            columns={[
              {
                key: "asesor",
                label: language === "en" ? "Agent" : "Asesor",
                render: (row) => getAdvisorById(row.advisorId)?.nombre ?? row.advisorId
              },
              { key: "nivel", label: t("Nivel"), render: (row) => row.nivel },
              { key: "tipo", label: t("Tipo de intervencion"), render: (row) => t(row.tipoIntervencion) },
              {
                key: "participacion",
                label: t("Participacion %"),
                render: (row) => formatCompactPercent(row.participacionPorcentaje)
              },
              { key: "monto", label: language === "en" ? "Amount $" : "Monto $", align: "right", render: (row) => formatCurrencyMXN(row.monto, language) }
            ]}
          />

          <div className="remax-role-callout">
            <strong>{t("Asesor multirol sobre la misma propiedad")}</strong>
            <p>
              {roleMatrix.length > 0
                ? roleMatrix
                    .map((item) => `${item.advisor.nombre}: ${item.roles.map((role) => translateRoleContext(language, role)).join(", ")}`)
                    .join(" · ")
                : language === "en"
                  ? "The model allows the same agent to be registered in onboarding and cancellation without duplicating records."
                  : "El modelo permite registrar el mismo asesor en alta y cancelacion sin duplicar expedientes."}
            </p>
          </div>
        </AccessSection>
      ) : null}

      {step === "comunicado" && communication ? (
        <AccessSection title={language === "en" ? "Cancellation communication" : "Comunicado de cancelacion"}>
          <CommunicationsPreview communication={communication} property={property} language={language} />
        </AccessSection>
      ) : null}
    </div>
  );
}

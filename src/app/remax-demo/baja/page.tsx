import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
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
  getPropertyByClave,
  getPropertyCommunications,
  getPropertyRoleMatrix,
  getSearchableProperties
} from "@/remax-demo/stats";

const bajaSteps = [
  { key: "busqueda", label: "Busqueda" },
  { key: "registro", label: "Registro de baja" },
  { key: "valores", label: "Revision de valores" },
  { key: "asesores", label: "Asesores de baja" },
  { key: "comunicado", label: "Comunicado de baja" }
] as const;

export default async function BajaPage({
  searchParams
}: {
  searchParams: Promise<{ step?: string | string[]; propiedad?: string | string[] }>;
}) {
  const params = await searchParams;
  const step = getSingleSearchParam(params.step) ?? "busqueda";
  const language = await getRemaxLanguage();
  const t = (value: string) => rt(language, value);
  const maybeT = (value?: string | null) => (value ? t(value) : "");
  const selectedKey = getSingleSearchParam(params.propiedad) ?? "CBR-1748";
  const property = getPropertyByClave(selectedKey) ?? getPropertyByClave("CBR-1748");

  if (!property) {
    return null;
  }

  const communications = getPropertyCommunications(property.clave);
  const communication = communications[0];
  const roleMatrix = getPropertyRoleMatrix(property).filter((row) => row.roles.length > 1);

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title={language === "en" ? "Property closing / offboarding" : "Baja / cierre de propiedad"}
        description={language === "en"
          ? "Offboarding workflow in the new platform: property search, status change, value review, involved agents and generated communication."
          : "Flujo de baja de la nueva plataforma: busqueda de propiedad, cambio de estatus, revision de valores, asesores involucrados y comunicado generado."}
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo" className="button button-secondary">
              {t("Regresar a menú")}
            </Link>
            <Link href="/remax-demo/cancelacion" className="button">
              {t("Ir a Cancelacion")}
            </Link>
          </div>
        }
      />

      <PropertyBanner property={property} title={t("Proceso de Baja / cierre")} language={language} />

      <WorkflowTabs
        items={bajaSteps.map((item) => ({
          label: t(item.label),
          href: `/remax-demo/baja?step=${item.key}&propiedad=${property.clave}`,
          active: step === item.key
        }))}
      />

      {step === "busqueda" ? (
        <AccessSection
          title={language === "en" ? "Cancellation / offboarding property record" : "Registro de Cancelacion / Baja de Propiedad"}
          action={
            <Link href={`/remax-demo/baja?step=registro&propiedad=${property.clave}`} className="button">
              {language === "en" ? "Go to property offboarding" : "Ir a baja de propiedad"}
            </Link>
          }
        >
          <div className="remax-search-header">
            <strong>{language === "en" ? "Search by key, neighborhood, street, gated area, subdivision or agent" : "Buscar por Clave, Colonia, Calle, Coto, Fraccionamiento o Asesor"}</strong>
            <span>{language === "en" ? `Showing ${getSearchableProperties().length} demo records` : `Mostrando ${getSearchableProperties().length} registros demo`}</span>
          </div>
          <DataTable
            rows={getSearchableProperties()}
            getRowId={(row) => row.clave}
            columns={[
              {
                key: "clave",
                label: t("Clave Propiedad"),
                render: (row) => (
                  <Link href={`/remax-demo/baja?step=registro&propiedad=${row.clave}`}>
                    <strong>{row.clave}</strong>
                  </Link>
                )
              },
              { key: "colonia", label: t("Colonia"), render: (row) => row.colonia },
              { key: "domicilio", label: t("Domicilio"), render: (row) => row.domicilio },
              { key: "coto", label: t("Coto"), render: (row) => row.coto },
              { key: "fracc", label: t("Fraccionamiento"), render: (row) => row.fraccionamiento },
              { key: "asesor", label: language === "en" ? "Agent" : "Asesor", render: (row) => row.asesor },
              { key: "precio", label: language === "en" ? "Price" : "Precio", align: "right", render: (row) => formatCurrencyMXN(row.precio, language) },
              {
                key: "estatus",
                label: language === "en" ? "Property status" : "Status Propiedad",
                render: (row) => (
                  <StatusBadge
                    value={translatePropertyStatus(language, row.estatus)}
                    tone={row.estatus === "Cerrada" ? "info" : row.estatus === "Cancelada" ? "danger" : "success"}
                  />
                )
              }
            ]}
          />
        </AccessSection>
      ) : null}

      {step === "registro" ? (
        <AccessSection
          title={language === "en" ? "Property offboarding record" : "Registro de BAJA de Propiedad"}
          action={
            <Link href={`/remax-demo/baja?step=valores&propiedad=${property.clave}`} className="button">
              {language === "en" ? "Go to value review" : "Ir a Revision de Valores"}
            </Link>
          }
        >
          <div className="remax-form-grid remax-form-grid-6">
            <label className="remax-field"><span>{t("Registro")}</span><input value={String(property.folio)} readOnly /></label>
            <label className="remax-field"><span>{language === "en" ? "Key" : "Clave"}</span><input value={property.clave} readOnly /></label>
            <label className="remax-field"><span>{t("Status Propiedad")}</span><input value={translatePropertyStatus(language, property.estatus)} readOnly /></label>
            <label className="remax-field"><span>{t("Alta / Baja")}</span><input value={t(property.altaBaja)} readOnly /></label>
            <label className="remax-field"><span>{language === "en" ? "Segment" : "Giro"}</span><input value={t(property.giro)} readOnly /></label>
            <label className="remax-field"><span>{language === "en" ? "Type" : "Tipo"}</span><input value={t(property.tipo)} readOnly /></label>
            <label className="remax-field remax-field-span-3"><span>{t("Calle")}</span><input value={property.address.calle} readOnly /></label>
            <label className="remax-field"><span>{t("No Ext")}</span><input value={property.address.noExt} readOnly /></label>
            <label className="remax-field"><span>{t("Piso")}</span><input value={property.address.piso ?? ""} readOnly /></label>
            <label className="remax-field"><span>{t("No Int")}</span><input value={property.address.noInt} readOnly /></label>
            <label className="remax-field"><span>{t("Colonia")}</span><input value={property.address.colonia} readOnly /></label>
            <label className="remax-field"><span>{t("Municipio")}</span><input value={property.address.municipio} readOnly /></label>
            <label className="remax-field"><span>C.P.</span><input value={property.address.cp} readOnly /></label>
            <label className="remax-field"><span>{t("Entidad")}</span><input value={property.address.entidad} readOnly /></label>
            <label className="remax-field"><span>{language === "en" ? "Onboarding date" : "Fecha ALTA"}</span><input value={property.fechas.alta} readOnly /></label>
            <label className="remax-field"><span>{t("Fecha aviso")}</span><input value={property.fechas.aviso} readOnly /></label>
            <label className="remax-field"><span>{t("Fecha baja")}</span><input value={property.baja?.fechaBaja ?? ""} readOnly /></label>
            <label className="remax-field"><span>{t("Condiciones visitas")}</span><input value={t(property.agenda.condicionesVisitas)} readOnly /></label>
            <label className="remax-field"><span>{t("Tel Citas")}</span><input value={property.agenda.telCitas} readOnly /></label>
            <label className="remax-field remax-field-span-2"><span>{t("Contacto para Citas")}</span><input value={property.agenda.contactoCitas} readOnly /></label>
            <label className="remax-field remax-field-span-2"><span>{t("Condicion de cierre")}</span><input value={maybeT(property.baja?.condicionCierre)} readOnly /></label>
            <label className="remax-field"><span>{t("Tipo de cierre")}</span><input value={maybeT(property.baja?.tipoCierre)} readOnly /></label>
            <label className="remax-field"><span>{t("Persona que registra")}</span><input value={property.baja?.personaRegistra ?? ""} readOnly /></label>
            <label className="remax-field remax-field-span-4"><span>{t("Comentarios")}</span><textarea value={property.baja?.comentarios ?? ""} readOnly /></label>
          </div>
        </AccessSection>
      ) : null}

      {step === "valores" ? (
        <AccessSection
          title={language === "en" ? "Property value review" : "Revision de Valores de Propiedades"}
          action={
            <Link href={`/remax-demo/baja?step=asesores&propiedad=${property.clave}`} className="button">
              {language === "en" ? "Go to closing agents" : "Ir a Asesores Baja"}
            </Link>
          }
        >
          <div className="remax-mini-summary">
            <div>
              <span>{language === "en" ? "Final price" : "Precio final"}</span>
              <strong>{formatCurrencyMXN(getCurrentValue(property), language)}</strong>
            </div>
            <div>
              <span>{language === "en" ? "Condition" : "Condicion"}</span>
              <strong>{property.baja?.condicionCierre ? t(property.baja.condicionCierre) : "N/A"}</strong>
            </div>
          </div>
          <DataTable
            rows={property.historialValores}
            getRowId={(row) => row.id}
            columns={[
              { key: "reg", label: t("Clave Propiedad"), render: (row) => row.propiedadClave },
              { key: "valor", label: language === "en" ? "Value" : "Valor", align: "right", render: (row) => formatCurrencyMXN(row.valor, language) },
              { key: "fecha", label: t("Fecha"), render: (row) => row.fecha },
              { key: "moneda", label: t("Moneda"), render: (row) => t(row.moneda) },
              { key: "posicion", label: t("Posicion"), render: (row) => row.posicion ? t(row.posicion) : "-" },
              { key: "motivo", label: t("Motivo de cambio"), render: (row) => t(row.motivoCambio) },
              { key: "minuta", label: t("Motivo de cambio para senalar en Minuta"), render: (row) => t(row.motivoMinuta) }
            ]}
          />
        </AccessSection>
      ) : null}

      {step === "asesores" ? (
        <AccessSection
          title={language === "en" ? "Agents involved in closing / offboarding" : "Asesores involucrados en baja / cierre"}
          action={
            <Link href={`/remax-demo/baja?step=comunicado&propiedad=${property.clave}`} className="button">
              {language === "en" ? "View communication" : "Ver comunicado"}
            </Link>
          }
        >
          <DataTable
            rows={property.asesoresBaja}
            getRowId={(row) => `${row.advisorId}-${row.contexto}`}
            columns={[
              {
                key: "asesor",
                label: language === "en" ? "Agent" : "Asesor",
                render: (row) => getAdvisorById(row.advisorId)?.nombre ?? row.advisorId
              },
              { key: "nivel", label: t("Nivel A / M"), render: (row) => row.nivel },
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
            <strong>{t("Ventaja del nuevo modelo operativo")}</strong>
            <p>
              {roleMatrix.length > 0
                ? roleMatrix
                    .map((item) => `${item.advisor.nombre}: ${item.roles.map((role) => translateRoleContext(language, role)).join(", ")}`)
                    .join(" · ")
                : language === "en"
                  ? "This closing does not repeat agents between onboarding and offboarding, but the model already supports it."
                  : "Este cierre no repite asesores entre alta y baja, pero el modelo ya lo soporta."}
            </p>
          </div>
        </AccessSection>
      ) : null}

      {step === "comunicado" && communication ? (
        <AccessSection title={language === "en" ? "Offboarding communication" : "Comunicado de baja"}>
          <CommunicationsPreview communication={communication} property={property} language={language} />
        </AccessSection>
      ) : null}
    </div>
  );
}

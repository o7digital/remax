import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { remaxCategoryOptions, remaxGiroOptions, remaxOperacionOptions, remaxTipoOptions } from "@/remax-demo/data";
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
  translateOperation,
  translatePropertyStatus,
  translateRoleContext,
  type RemaxLanguage
} from "@/remax-demo/i18n";
import { getRemaxLanguage } from "@/remax-demo/get-language";
import {
  getAdvisorById,
  getCurrentValue,
  getPropertyByClave,
  getPropertyRoleMatrix
} from "@/remax-demo/stats";

const altaSteps = [
  { key: "clave", label: "Generacion de clave" },
  { key: "expediente", label: "Expediente" },
  { key: "condiciones", label: "Condiciones" },
  { key: "valores", label: "Valores" },
  { key: "asesores", label: "Asesores" },
  { key: "propietarios", label: "Propietarios" },
  { key: "ficha", label: "Ficha tecnica" }
] as const;

function buildKeyPreview(
  giroCode: string,
  tipoCode: string,
  operacionCode: string,
  categoriaCode: string,
  sequence = "277"
) {
  return `${giroCode}${tipoCode}${operacionCode}-${categoriaCode}${sequence}`;
}

function YesNoBadge({ value, language }: { value: boolean; language: RemaxLanguage }) {
  return (
    <StatusBadge value={language === "en" ? (value ? "Yes" : "No") : value ? "Si" : "No"} tone={value ? "success" : "neutral"} />
  );
}

export default async function AltaPage({
  searchParams
}: {
  searchParams: Promise<{ step?: string | string[]; propiedad?: string | string[] }>;
}) {
  const params = await searchParams;
  const step = getSingleSearchParam(params.step) ?? "clave";
  const language = await getRemaxLanguage();
  const t = (value: string) => rt(language, value);
  const maybeT = (value?: string | null) => (value ? t(value) : "");
  const selectedKey = getSingleSearchParam(params.propiedad) ?? "IBR-OP277";
  const property = getPropertyByClave(selectedKey) ?? getPropertyByClave("IBR-OP277");

  if (!property) {
    return null;
  }

  const generatedKey = buildKeyPreview(
    property.giroCode,
    property.tipoCode,
    property.operacionCode,
    property.categoriaCode
  );
  const roleMatrix = getPropertyRoleMatrix(property).filter((row) => row.roles.length > 1);

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title={language === "en" ? "Property Onboarding" : "Alta de propiedad"}
        description={language === "en"
          ? "Property onboarding workflow in the new platform: first the key is generated, then the operational record is built and finally conditions, values, agents, owners and technical sheet are completed."
          : "Flujo operativo de alta de la nueva plataforma: primero se genera la clave, luego se construye el expediente operativo y finalmente se completan condiciones, valores, asesores, propietarios y ficha tecnica."}
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo" className="button button-secondary">
              {t("Regresar a menú")}
            </Link>
            <Link href="/remax-demo/baja" className="button">
              {t("Ir a Baja")}
            </Link>
          </div>
        }
      />

      <PropertyBanner property={property} title={t("Flujo ALTA de propiedad")} language={language} />

      <WorkflowTabs
        items={altaSteps.map((item) => ({
          label: t(item.label),
          href: `/remax-demo/alta?step=${item.key}&propiedad=${property.clave}`,
          active: step === item.key
        }))}
      />

      {step === "clave" ? (
        <AccessSection
          title={language === "en" ? "Property key generation for a new record" : "Generacion de CLAVE para nuevo registro de Propiedad"}
          action={
            <Link href={`/remax-demo/alta?step=expediente&propiedad=${property.clave}`} className="button">
              {language === "en" ? "GO TO Record" : "IR A Expediente"}
            </Link>
          }
        >
          <div className="remax-form-grid remax-form-grid-3">
            <label className="remax-field">
              <span>{t("Categoria: Exclusiva, Opcion, Coop, Otro")}</span>
              <div className="remax-field-with-code">
                <select defaultValue={property.categoria}>
                  {remaxCategoryOptions.map((option) => (
                    <option key={option.code} value={option.label}>
                      {t(option.label)}
                    </option>
                  ))}
                </select>
                <input value={property.categoriaCode} readOnly />
              </div>
            </label>
            <label className="remax-field">
              <span>{t("Giro: Residencial, Comercial, Industrial")}</span>
              <div className="remax-field-with-code">
                <select defaultValue={property.giro}>
                  {remaxGiroOptions.map((option) => (
                    <option key={option.code} value={option.label}>
                      {t(option.label)}
                    </option>
                  ))}
                </select>
                <input value={property.giroCode} readOnly />
              </div>
            </label>
            <div className="remax-key-preview">
              <span>{language === "en" ? "New generated key" : "Nueva clave generada"}</span>
              <strong>{generatedKey}</strong>
            </div>
            <label className="remax-field">
              <span>{t("Tipo de Propiedad")}</span>
              <div className="remax-field-with-code">
                <select defaultValue={property.tipo}>
                  {remaxTipoOptions.map((option) => (
                    <option key={option.code} value={option.label}>
                      {t(option.label)}
                    </option>
                  ))}
                </select>
                <input value={property.tipoCode} readOnly />
              </div>
            </label>
            <label className="remax-field">
              <span>{t("Operacion: Venta o Renta")}</span>
              <div className="remax-field-with-code">
                <select defaultValue={property.operacion}>
                  {remaxOperacionOptions.map((option) => (
                    <option key={option.code} value={option.label}>
                      {option.label === "Venta" || option.label === "Renta" ? translateOperation(language, option.label) : t(option.label)}
                    </option>
                  ))}
                </select>
                <input value={property.operacionCode} readOnly />
              </div>
            </label>
            <div className="remax-note-box">
              <strong>{language === "en" ? "Key logic integrated into the new platform" : "Logica de clave integrada al nuevo sistema"}</strong>
              <p>
                {language === "en"
                  ? `${property.giroCode} + ${property.tipoCode} + ${property.operacionCode} defines the record type; ${property.categoriaCode} keeps the commercial category.`
                  : `${property.giroCode} + ${property.tipoCode} + ${property.operacionCode} define el tipo de expediente; ${property.categoriaCode} conserva la categoria comercial.`}
              </p>
            </div>
          </div>

          <div className="remax-inline-actions">
            <button className="button button-secondary" type="button">
              {language === "en" ? "Generate another key" : "Generar otra CLAVE"}
            </button>
            <Link href={`/remax-demo/alta?step=expediente&propiedad=${property.clave}`} className="button">
              {language === "en" ? "Continue to record" : "Continuar al expediente"}
            </Link>
          </div>
        </AccessSection>
      ) : null}

      {step === "expediente" ? (
        <>
          <AccessSection
            title={language === "en" ? "Property onboarding record" : "Registro de ALTA de Propiedades"}
            action={
              <Link href={`/remax-demo/alta?step=condiciones&propiedad=${property.clave}`} className="button">
                {language === "en" ? "Go to operating conditions" : "Ir a Condiciones de Operacion"}
              </Link>
            }
          >
            <div className="remax-form-grid remax-form-grid-6">
              <label className="remax-field"><span>{t("Registro")}</span><input value={String(property.folio)} readOnly /></label>
              <label className="remax-field"><span>{language === "en" ? "Key" : "Clave"}</span><input value={property.clave} readOnly /></label>
              <label className="remax-field"><span>{language === "en" ? "Exclusive / option / co-op" : "Exclusiva, Opcion, Coop"}</span><input value={t(property.exclusividad)} readOnly /></label>
              <label className="remax-field"><span>{language === "en" ? "Segment" : "Giro"}</span><input value={t(property.giro)} readOnly /></label>
              <label className="remax-field"><span>{language === "en" ? "Type" : "Tipo"}</span><input value={t(property.tipo)} readOnly /></label>
              <label className="remax-field"><span>{language === "en" ? "Operation" : "Operacion"}</span><input value={translateOperation(language, property.operacion)} readOnly /></label>
              <label className="remax-field remax-field-span-3"><span>{t("Calle")}</span><input value={property.address.calle} readOnly /></label>
              <label className="remax-field"><span>{t("No Ext")}</span><input value={property.address.noExt} readOnly /></label>
              <label className="remax-field"><span>{t("No Int")}</span><input value={property.address.noInt} readOnly /></label>
              <label className="remax-field"><span>{t("Piso")}</span><input value={property.address.piso ?? ""} readOnly /></label>
              <label className="remax-field remax-field-span-2"><span>{t("Entre calles")}</span><input value={property.address.entreCalles ?? ""} readOnly /></label>
              <label className="remax-field"><span>{t("Colonia")}</span><input value={property.address.colonia} readOnly /></label>
              <label className="remax-field"><span>{t("Coto")}</span><input value={property.address.coto ?? ""} readOnly /></label>
              <label className="remax-field"><span>{t("Fraccionamiento")}</span><input value={property.address.fraccionamiento ?? ""} readOnly /></label>
              <label className="remax-field"><span>{t("Municipio")}</span><input value={property.address.municipio} readOnly /></label>
              <label className="remax-field"><span>C.P.</span><input value={property.address.cp} readOnly /></label>
              <label className="remax-field"><span>{t("Entidad")}</span><input value={property.address.entidad} readOnly /></label>
              <label className="remax-field"><span>{t("Coordenadas Guia Roji")}</span><input value={property.address.coordenadasGuiaRoji ?? ""} readOnly /></label>
              <label className="remax-field"><span>{t("Condicion Visitas")}</span><input value={t(property.agenda.condicionesVisitas)} readOnly /></label>
              <label className="remax-field"><span>{t("Caja No.")}</span><input value={property.agenda.cajaNo} readOnly /></label>
              <label className="remax-field"><span>{t("Disponibilidad para Visitas")}</span><input value={t(property.agenda.disponibilidadVisitas)} readOnly /></label>
              <label className="remax-field"><span>{t("Estatus Llaves")}</span><input value={maybeT(property.agenda.estatusLlaves)} readOnly /></label>
              <label className="remax-field"><span>{t("Tel Citas")}</span><input value={property.agenda.telCitas} readOnly /></label>
              <label className="remax-field remax-field-span-2"><span>{t("Contacto para Citas")}</span><input value={property.agenda.contactoCitas} readOnly /></label>
              <label className="remax-field"><span>{t("Origen")}</span><input value={t(property.agenda.origen)} readOnly /></label>
              <label className="remax-field"><span>{language === "en" ? "Onboarding date" : "Fecha ALTA"}</span><input value={property.fechas.alta} readOnly /></label>
              <label className="remax-field"><span>{t("Fecha aviso")}</span><input value={property.fechas.aviso} readOnly /></label>
              <label className="remax-field"><span>{t("Fecha Contrato")}</span><input value={property.fechas.contrato} readOnly /></label>
              <label className="remax-field"><span>{t("Inicio Promo")}</span><input value={property.fechas.inicioPromo} readOnly /></label>
              <label className="remax-field"><span>{t("ID AMPI")}</span><input value={property.ids.ampi} readOnly /></label>
              <label className="remax-field"><span>{t("ID REMAX")}</span><input value={property.ids.remax} readOnly /></label>
              <label className="remax-field"><span>{t("Clave Catastral")}</span><input value={property.ids.catastral} readOnly /></label>
              <div className="remax-field">
                <span>{t("Status Propiedad")}</span>
                <StatusBadge value={translatePropertyStatus(language, property.estatus)} tone="success" />
              </div>
              <label className="remax-field"><span>{t("Alta / Baja")}</span><input value={t(property.altaBaja)} readOnly /></label>
              <label className="remax-field"><span>{t("Estatus de visita en recorrido")}</span><input value={maybeT(property.visitaRecorrido)} readOnly /></label>
              <label className="remax-field remax-field-span-3"><span>{t("Como llegar / ligas")}</span><input value={property.comoLlegar.ligasA} readOnly /></label>
              <label className="remax-field remax-field-span-3"><span>{t("Comentarios")}</span><textarea value={property.comoLlegar.comentarios} readOnly /></label>
            </div>
          </AccessSection>

          <AccessSection title={language === "en" ? "Property characteristics" : "Caracteristicas de la propiedad"} accent="red">
            <div className="remax-form-grid remax-form-grid-6">
              <label className="remax-field"><span>{t("Sup. Terreno m2")}</span><input value={String(property.caracteristicas.supTerreno)} readOnly /></label>
              <label className="remax-field"><span>{t("Sup. Const. m2")}</span><input value={String(property.caracteristicas.supConstruccion)} readOnly /></label>
              <label className="remax-field"><span>{t("Frente")}</span><input value={String(property.caracteristicas.frente)} readOnly /></label>
              <label className="remax-field"><span>{t("Fondo")}</span><input value={String(property.caracteristicas.fondo)} readOnly /></label>
              <label className="remax-field"><span>{t("Jardin")}</span><input value={language === "en" ? (property.caracteristicas.jardin ? "Yes" : "No") : property.caracteristicas.jardin ? "Si" : "No"} readOnly /></label>
              <label className="remax-field"><span>{t("Estac. Descubiertos")}</span><input value={String(property.caracteristicas.estacionamientosDescubiertos)} readOnly /></label>
              <label className="remax-field"><span>{t("Nivel")}</span><input value={property.caracteristicas.nivel} readOnly /></label>
              <label className="remax-field"><span>{t("Pisos totales")}</span><input value={String(property.caracteristicas.pisosTotales)} readOnly /></label>
              <label className="remax-field"><span>{t("Exterior / Interior")}</span><input value={property.caracteristicas.exteriorInterior} readOnly /></label>
              <label className="remax-field"><span>{t("Forma terreno")}</span><input value={t(property.caracteristicas.formaTerreno)} readOnly /></label>
              <label className="remax-field"><span>{t("Inclinacion")}</span><input value={t(property.caracteristicas.inclinacion)} readOnly /></label>
              <label className="remax-field"><span>{t("Uso de suelo")}</span><input value={t(property.caracteristicas.usoSuelo)} readOnly /></label>
              <label className="remax-field remax-field-span-3"><span>{t("Descripcion")}</span><input value={maybeT(property.caracteristicas.descripcion)} readOnly /></label>
              <label className="remax-field"><span>{t("Categoria")}</span><input value={t(property.caracteristicas.categoria)} readOnly /></label>
              <label className="remax-field remax-field-span-2"><span>{t("Notas")}</span><textarea value={property.caracteristicas.notas} readOnly /></label>
            </div>

            <div className="remax-subgrid">
              <div className="remax-chip-list">
                {property.caracteristicas.servicios.map((service) => (
                  <span key={service} className="remax-chip">
                    {t(service)}
                  </span>
                ))}
              </div>
              <DataTable
                rows={property.caracteristicas.superficiesValores}
                getRowId={(row) => row.concepto}
                columns={[
                  { key: "concepto", label: t("Superficies m2 y valores"), render: (row) => t(row.concepto) },
                  { key: "metros", label: t("Sup. m2"), align: "right", render: (row) => row.metros.toFixed(2) },
                  { key: "valor", label: language === "en" ? "Value $" : "Valor $", align: "right", render: (row) => formatCurrencyMXN(row.valor, language) },
                  { key: "total", label: t("Total"), align: "right", render: (row) => formatCurrencyMXN(row.total, language) }
                ]}
              />
            </div>
          </AccessSection>
        </>
      ) : null}

      {step === "condiciones" ? (
        <>
          <AccessSection
            title={language === "en" ? "Lease operating conditions" : "Registro de condiciones de operacion renta"}
            action={
              <Link href={`/remax-demo/alta?step=valores&propiedad=${property.clave}`} className="button">
                {language === "en" ? "Go to property value" : "Ir a Valor de Propiedad"}
              </Link>
            }
          >
            <div className="remax-form-grid remax-form-grid-4">
              <label className="remax-field"><span>{t("Clave propiedad")}</span><input value={property.clave} readOnly /></label>
              <label className="remax-field"><span>{t("Politica / Monto")}</span><input value={t(property.condicionesOperacion.modoComision)} readOnly /></label>
              <label className="remax-field"><span>{t("Porcentaje")}</span><input value={formatCompactPercent(property.condicionesOperacion.porcentaje)} readOnly /></label>
              <label className="remax-field"><span>{t("Monto")}</span><input value={formatCurrencyMXN(property.condicionesOperacion.monto, language)} readOnly /></label>
              <label className="remax-field remax-field-span-2"><span>{t("Politica vigente")}</span><input value={t(property.condicionesOperacion.politicaVigente)} readOnly /></label>
              <div className="remax-field">
                <span>{language === "en" ? "Exception applies" : "Aplica excepcion"}</span>
                <YesNoBadge value={property.condicionesOperacion.aplicaExcepcion} language={language} />
              </div>
              <div className="remax-field">
                <span>{language === "en" ? "Data confirmed" : "Datos confirmados"}</span>
                <YesNoBadge value={property.condicionesOperacion.datosConfirmados} language={language} />
              </div>
              <label className="remax-field remax-field-span-4"><span>{t("Comentarios")}</span><textarea value={property.condicionesOperacion.comentarios} readOnly /></label>
            </div>
          </AccessSection>

          {property.condicionesRenta ? (
            <AccessSection title={language === "en" ? "Lease conditions" : "Edicion de condiciones de renta"} accent="red">
              <div className="remax-form-grid remax-form-grid-4">
                <label className="remax-field"><span>{t("Confirmar anos de renta")}</span><input value={String(property.condicionesRenta.anos)} readOnly /></label>
                <label className="remax-field"><span>{t("Forma de pago")}</span><input value={t(property.condicionesRenta.formaPago)} readOnly /></label>
                <label className="remax-field"><span>{t("Vigencia")}</span><input value={t(property.condicionesRenta.vigencia)} readOnly /></label>
                <label className="remax-field"><span>{t("Herramienta juridica")}</span><input value={t(property.condicionesRenta.herramientaJuridica)} readOnly /></label>
                <div className="remax-checklist">
                  <span>{t("Controles principales")}</span>
                  <div className="remax-check-grid">
                    <div><YesNoBadge value={property.condicionesRenta.rentaAdelantada} language={language} /> {language === "en" ? "Advance rent" : "Renta adelantada"}</div>
                    <div><YesNoBadge value={property.condicionesRenta.rentaDeposito} language={language} /> {language === "en" ? "Deposit rent" : "Renta deposito"}</div>
                    <div><YesNoBadge value={property.condicionesRenta.aplicaFianza} language={language} /> {language === "en" ? "Bond applies" : "Aplica fianza"}</div>
                    <div><YesNoBadge value={property.condicionesRenta.fiadorSolidario} language={language} /> {language === "en" ? "Solid guarantor" : "Fiador solidario"}</div>
                    <div><YesNoBadge value={property.condicionesRenta.fiadorBienRaiz} language={language} /> {language === "en" ? "Property guarantor" : "Fiador con bien raiz"}</div>
                    <div><YesNoBadge value={property.condicionesRenta.aplicaMantenimiento} language={language} /> {language === "en" ? "Maintenance applies" : "Aplica mantenimiento"}</div>
                    <div><YesNoBadge value={property.condicionesRenta.contratoTransaccion} language={language} /> {language === "en" ? "Transaction contract" : "Contrato de transaccion"}</div>
                    <div><YesNoBadge value={property.condicionesRenta.contratoIntermediacion} language={language} /> {language === "en" ? "Intermediation contract" : "Contrato de intermediacion"}</div>
                    <div><YesNoBadge value={property.condicionesRenta.seguroDanios} language={language} /> {language === "en" ? "Property damage insurance" : "Seguro de danos materiales"}</div>
                    <div><YesNoBadge value={property.condicionesRenta.seguroResponsabilidadCivil} language={language} /> {language === "en" ? "Liability insurance" : "Seguro de responsabilidad civil"}</div>
                    <div><YesNoBadge value={property.condicionesRenta.investigacion} language={language} /> {language === "en" ? "Investigation" : "Investigacion"}</div>
                  </div>
                </div>
                <label className="remax-field"><span>{t("Afianzadora")}</span><input value={property.condicionesRenta.afianzadora} readOnly /></label>
                <label className="remax-field"><span>{t("Monto de la fianza")}</span><input value={formatCurrencyMXN(property.condicionesRenta.montoFianza, language)} readOnly /></label>
                <label className="remax-field"><span>{t("Investigador")}</span><input value={property.condicionesRenta.investigador} readOnly /></label>
                <label className="remax-field"><span>{t("Costo de investigacion")}</span><input value={formatCurrencyMXN(property.condicionesRenta.costoInvestigacion, language)} readOnly /></label>
                <label className="remax-field"><span>{t("Abogado")}</span><input value={property.condicionesRenta.abogado} readOnly /></label>
                <label className="remax-field"><span>{t("Notario")}</span><input value={property.condicionesRenta.notario} readOnly /></label>
                <label className="remax-field"><span>{t("Empresa")}</span><input value={property.condicionesRenta.empresa} readOnly /></label>
                <label className="remax-field"><span>{t("Monto de mantenimiento")}</span><input value={formatCurrencyMXN(property.condicionesRenta.montoMantenimiento, language)} readOnly /></label>
                <label className="remax-field"><span>{t("Periodo de mantenimiento")}</span><input value={t(property.condicionesRenta.periodoMantenimiento)} readOnly /></label>
                <label className="remax-field remax-field-span-4"><span>{t("Observaciones")}</span><textarea value={property.condicionesRenta.observaciones} readOnly /></label>
              </div>
            </AccessSection>
          ) : null}
        </>
      ) : null}

      {step === "valores" ? (
        <AccessSection
          title={language === "en" ? "Property values" : "Registro de Valores de Propiedades"}
          action={
            <Link href={`/remax-demo/alta?step=asesores&propiedad=${property.clave}`} className="button">
              {language === "en" ? "Go to onboarding agents" : "Ir a Asesores Alta"}
            </Link>
          }
        >
          <div className="remax-mini-summary">
            <div>
              <span>{language === "en" ? "Current price" : "Precio actual"}</span>
              <strong>{formatCurrencyMXN(getCurrentValue(property), language)}</strong>
            </div>
            <div>
              <span>{language === "en" ? "Status" : "Status"}</span>
              <strong>{translatePropertyStatus(language, property.estatus)}</strong>
            </div>
          </div>
          <DataTable
            rows={property.historialValores}
            getRowId={(row) => row.id}
            columns={[
              { key: "clave", label: t("Clave Propiedad"), render: (row) => row.propiedadClave },
              { key: "valor", label: language === "en" ? "Initial value" : "Valor Inicial", align: "right", render: (row) => formatCurrencyMXN(row.valor, language) },
              { key: "fecha", label: t("Fecha"), render: (row) => row.fecha },
              { key: "moneda", label: t("Moneda"), render: (row) => t(row.moneda) },
              { key: "posicion", label: t("Posicion"), render: (row) => row.posicion ? t(row.posicion) : "-" },
              { key: "motivo", label: t("Motivo de cambio"), render: (row) => t(row.motivoCambio) },
              { key: "minuta", label: t("Motivo de cambio para senalar en minuta"), render: (row) => t(row.motivoMinuta) }
            ]}
          />
        </AccessSection>
      ) : null}

      {step === "asesores" ? (
        <AccessSection
          title={language === "en" ? "Onboarding agents for the property" : "Registro de ASESOR(ES) de lado ALTA de la Propiedad"}
          action={
            <Link href={`/remax-demo/alta?step=propietarios&propiedad=${property.clave}`} className="button">
              {language === "en" ? "Go to owners record" : "Ir a Registro de Propietarios"}
            </Link>
          }
        >
          <DataTable
            rows={property.asesoresAlta}
            getRowId={(row) => `${row.advisorId}-${row.contexto}`}
            columns={[
              { key: "clave", label: t("Clave Propiedad"), render: () => property.clave },
              {
                key: "asesor",
                label: language === "en" ? "Agent" : "Asesor",
                render: (row) => getAdvisorById(row.advisorId)?.nombre ?? row.advisorId
              },
              { key: "nivel", label: t("Nivel Asesor A/N"), render: (row) => row.nivel },
              { key: "comision", label: t("Com por % / $"), render: (row) => row.comisionTipo },
              {
                key: "participacion",
                label: t("Participacion en ALTA %"),
                render: (row) => formatCompactPercent(row.participacionPorcentaje)
              },
              { key: "monto", label: language === "en" ? "Amount $" : "Monto $", align: "right", render: (row) => formatCurrencyMXN(row.monto, language) },
              { key: "alta", label: language === "en" ? "ONBOARDING" : "ALTA", render: (row) => t(row.tipoIntervencion) }
            ]}
          />

          <div className="remax-role-callout">
            <strong>{language === "en" ? "New multi-role model by property" : "Nuevo modelo multirol por propiedad"}</strong>
            <p>
              {language === "en"
                ? "In the new platform an agent can exist in more than one context on the same property. "
                : "En la nueva plataforma un asesor puede existir en mas de un contexto sobre la misma propiedad. "}
              {` `}
              {roleMatrix.length > 0
                ? roleMatrix
                    .map((item) => `${item.advisor.nombre}: ${item.roles.map((role) => translateRoleContext(language, role)).join(", ")}`)
                    .join(" · ")
                : language === "en"
                  ? "This property does not yet show multi-role participation, but the model already supports it."
                  : "Esta propiedad aun no tiene multirol, pero el modelo ya lo soporta."}
            </p>
          </div>
        </AccessSection>
      ) : null}

      {step === "propietarios" ? (
        <AccessSection
          title={language === "en" ? "Owners record" : "Registro de PROPIETARIOS"}
          action={
            <Link href={`/remax-demo/alta?step=ficha&propiedad=${property.clave}`} className="button">
              {language === "en" ? "Go to technical sheet" : "Ir a Ficha Tecnica"}
            </Link>
          }
        >
          <DataTable
            rows={property.propietarios}
            getRowId={(row) => row.id}
            columns={[
              { key: "clave", label: language === "en" ? "Property key" : "Clave de la propiedad", render: () => property.clave },
              { key: "nombre", label: t("Nombre(s)"), render: (row) => row.nombre },
              { key: "telefono", label: language === "en" ? "Phone" : "Telefono", render: (row) => row.telefono },
              { key: "correo", label: language === "en" ? "Email" : "Correo", render: (row) => row.correo },
              {
                key: "principal",
                label: t("Principal"),
                render: (row) => <YesNoBadge value={row.principal} language={language} />
              }
            ]}
          />
        </AccessSection>
      ) : null}

      {step === "ficha" ? (
        <>
          <AccessSection title={language === "en" ? "Technical sheet" : "Ficha Tecnica"} accent="red">
            <div className="remax-form-grid remax-form-grid-5">
              <label className="remax-field"><span>{t("Estilo")}</span><input value={property.fichaTecnica.residencial.estilo} readOnly /></label>
              <label className="remax-field"><span>{t("Proyecto")}</span><input value={property.fichaTecnica.residencial.proyecto} readOnly /></label>
              <label className="remax-field"><span>{t("Acabados")}</span><input value={property.fichaTecnica.residencial.acabados} readOnly /></label>
              <label className="remax-field"><span>{t("Conservacion")}</span><input value={property.fichaTecnica.residencial.conservacion} readOnly /></label>
              <label className="remax-field"><span>{t("Fachada")}</span><input value={property.fichaTecnica.residencial.fachada} readOnly /></label>
              <label className="remax-field"><span>{t("Ventanas")}</span><input value={property.fichaTecnica.residencial.ventanas} readOnly /></label>
              <label className="remax-field"><span>{t("Cristales")}</span><input value={property.fichaTecnica.residencial.cristales} readOnly /></label>
              <label className="remax-field"><span>{t("Carpinteria")}</span><input value={property.fichaTecnica.residencial.carpinteria} readOnly /></label>
              <label className="remax-field"><span>{t("Puertas")}</span><input value={property.fichaTecnica.residencial.puertas} readOnly /></label>
              <label className="remax-field"><span>{t("Otro")}</span><input value={property.fichaTecnica.residencial.otro} readOnly /></label>
            </div>
            <DataTable
              rows={property.fichaTecnica.residencial.espacios}
              getRowId={(row) => row.nombre}
              columns={[
                { key: "nombre", label: t("Espacio"), render: (row) => row.nombre },
                { key: "nivel", label: t("Nivel"), render: (row) => row.nivel },
                { key: "banos", label: t("Banos"), render: (row) => String(row.banos) },
                { key: "acabados", label: t("Acabados"), render: (row) => row.acabados }
              ]}
            />
            <div className="remax-chip-list">
              {property.fichaTecnica.residencial.amenidades.map((item) => (
                <span key={item} className="remax-chip">
                  {item}
                </span>
              ))}
            </div>
          </AccessSection>

          <AccessSection title={language === "en" ? "Commercial module" : "Modulo comercial"} accent="blue">
            <div className="remax-form-grid remax-form-grid-4">
              <label className="remax-field"><span>{t("Categoria")}</span><input value={t(property.fichaTecnica.comercial.categoria)} readOnly /></label>
              <label className="remax-field"><span>{t("Clasificacion")}</span><input value={maybeT(property.fichaTecnica.comercial.clasificacion)} readOnly /></label>
              <div className="remax-field"><span>{language === "en" ? "Security" : "Vigilancia"}</span><YesNoBadge value={property.fichaTecnica.comercial.vigilancia} language={language} /></div>
              <div className="remax-field"><span>{language === "en" ? "Phones" : "Telefonos"}</span><YesNoBadge value={property.fichaTecnica.comercial.telefonos} language={language} /></div>
              <label className="remax-field"><span>{t("Lineas")}</span><input value={property.fichaTecnica.comercial.lineas} readOnly /></label>
              <label className="remax-field"><span>{t("Iluminacion")}</span><input value={property.fichaTecnica.comercial.iluminacion} readOnly /></label>
              <label className="remax-field"><span>{t("Banos")}</span><input value={String(property.fichaTecnica.comercial.banios)} readOnly /></label>
              <label className="remax-field"><span>{t("Estacionamiento")}</span><input value={maybeT(property.fichaTecnica.comercial.estacionamiento)} readOnly /></label>
              <label className="remax-field remax-field-span-4"><span>{t("Observaciones")}</span><textarea value={property.fichaTecnica.comercial.observaciones} readOnly /></label>
            </div>
          </AccessSection>
        </>
      ) : null}
    </div>
  );
}

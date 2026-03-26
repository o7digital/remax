import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { remaxDemoDefaults } from "@/remax-demo/data";
import { AccessSection } from "@/remax-demo/components/access-section";
import { PropertyBanner } from "@/remax-demo/components/property-banner";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { ValueHistoryTimeline } from "@/remax-demo/components/value-history-timeline";
import {
  formatCurrencyMXN,
  getSingleSearchParam
} from "@/remax-demo/formatters";
import { getRemaxLanguage } from "@/remax-demo/get-language";
import { rt } from "@/remax-demo/i18n";
import { getAllValueHistory, getCurrentValue, getPropertyByClave, getPropertyValueHistory } from "@/remax-demo/stats";

export default async function ValoresPage({
  searchParams
}: {
  searchParams: Promise<{ propiedad?: string | string[] }>;
}) {
  const language = await getRemaxLanguage();
  const t = (value: string) => rt(language, value);
  const params = await searchParams;
  const selectedKey = getSingleSearchParam(params.propiedad) ?? remaxDemoDefaults.bajaPropertyKey;
  const property = getPropertyByClave(selectedKey) ?? getPropertyByClave(remaxDemoDefaults.bajaPropertyKey);

  if (!property) {
    return null;
  }

  const events = getPropertyValueHistory(property.clave);

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title={language === "en" ? "Property values" : "Valores de propiedad"}
        description={language === "en" ? "Values module of the new platform. It prioritizes the operating table with date, currency, position, change reason and minute reference reason." : "Modulo de valores de la nueva plataforma. Prioriza la tabla operativa con fecha, moneda, posicion, motivo de cambio y motivo para minuta."}
        actions={
          <div className="remax-header-actions">
            <Link href={`/remax-demo/alta?step=valores&propiedad=${property.clave}`} className="button">
              {language === "en" ? "Go to onboarding flow" : "Ir a flujo Alta"}
            </Link>
            <Link href={`/remax-demo/baja?step=valores&propiedad=${remaxDemoDefaults.bajaPropertyKey}`} className="button button-secondary">
              {language === "en" ? "Go to closing flow" : "Ir a flujo Baja"}
            </Link>
          </div>
        }
      />

      <PropertyBanner property={property} title={language === "en" ? "Value record / review" : "Registro / revision de valores"} language={language} />

      <AccessSection title={language === "en" ? "Property values record" : "Registro de Valores de Propiedades"}>
        <div className="remax-mini-summary">
          <div>
            <span>{language === "en" ? "Current value" : "Valor actual"}</span>
            <strong>{formatCurrencyMXN(getCurrentValue(property), language)}</strong>
          </div>
          <div>
            <span>{language === "en" ? "Value events" : "Eventos de valor"}</span>
            <strong>{events.length}</strong>
          </div>
          <div>
            <span>{language === "en" ? "Property" : "Propiedad"}</span>
            <strong>{property.clave}</strong>
          </div>
        </div>
        <DataTable
          rows={events}
          getRowId={(row) => row.id}
          columns={[
            { key: "clave", label: language === "en" ? "Property key" : "Clave Propiedad", render: (row) => row.propiedadClave },
            { key: "valor", label: language === "en" ? "Initial value" : "Valor Inicial", align: "right", render: (row) => formatCurrencyMXN(row.valor, language) },
            { key: "fecha", label: language === "en" ? "Date" : "Fecha", render: (row) => row.fecha },
            { key: "moneda", label: language === "en" ? "Currency" : "Moneda", render: (row) => t(row.moneda) },
            { key: "posicion", label: language === "en" ? "Position" : "Posicion", render: (row) => row.posicion ? t(row.posicion) : "-" },
            { key: "motivo", label: language === "en" ? "Change reason" : "Motivo de cambio", render: (row) => t(row.motivoCambio) },
            { key: "minuta", label: language === "en" ? "Minute reason" : "Motivo de cambio para senalar en Minuta", render: (row) => t(row.motivoMinuta) }
          ]}
        />
      </AccessSection>

      <div className="remax-two-columns">
        <AccessSection title={language === "en" ? "Property timeline" : "Timeline de la propiedad"} accent="blue">
          <ValueHistoryTimeline events={events} language={language} />
        </AccessSection>

        <AccessSection title={language === "en" ? "Global value log" : "Bitacora global de valores"} accent="red">
          <DataTable
            rows={getAllValueHistory()}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "propiedad",
                label: language === "en" ? "Property" : "Propiedad",
                render: (row) => (
                  <Link href={`/remax-demo/valores?propiedad=${row.propiedadClave}`}>
                    <strong>{row.propiedadClave}</strong>
                  </Link>
                )
              },
              { key: "fecha", label: language === "en" ? "Date" : "Fecha", render: (row) => row.fecha },
              { key: "valor", label: language === "en" ? "Value" : "Valor", align: "right", render: (row) => formatCurrencyMXN(row.valor, language) },
              { key: "motivo", label: language === "en" ? "Reason" : "Motivo", render: (row) => t(row.motivoCambio) }
            ]}
          />
        </AccessSection>
      </div>
    </div>
  );
}

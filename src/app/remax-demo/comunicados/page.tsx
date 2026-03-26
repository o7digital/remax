import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import {
  remaxDemoCommunications,
  remaxDemoDefaults
} from "@/remax-demo/data";
import { CommunicationsPreview } from "@/remax-demo/components/communications-preview";
import { AccessSection } from "@/remax-demo/components/access-section";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { getSingleSearchParam } from "@/remax-demo/formatters";
import { getRemaxLanguage } from "@/remax-demo/get-language";
import { translateCommunicationStatus, translateCommunicationType } from "@/remax-demo/i18n";
import { getCommunicationById, getCommunicationsByType, getPropertyByClave } from "@/remax-demo/stats";

function getTone(status: string) {
  if (status === "enviado") {
    return "success" as const;
  }

  if (status === "borrador") {
    return "warning" as const;
  }

  return "neutral" as const;
}

export default async function ComunicadosPage({
  searchParams
}: {
  searchParams: Promise<{ comunicado?: string | string[] }>;
}) {
  const language = await getRemaxLanguage();
  const params = await searchParams;
  const selectedId = getSingleSearchParam(params.comunicado) ?? remaxDemoDefaults.featuredCommunicationId;
  const communication = getCommunicationById(selectedId) ?? remaxDemoCommunications[0];
  const property = getPropertyByClave(communication.propiedadClave);

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title={language === "en" ? "Communications" : "Comunicados"}
        description={language === "en" ? "Screen dedicated to onboarding, closing and cancellation communications. The goal is to show a centralized record that is clearer and ready for automation." : "Pantalla dedicada a los comunicados de alta, baja y cancelacion. El objetivo es mostrar un registro centralizado, mas claro y listo para automatizacion."}
        actions={
          <div className="remax-header-actions">
            <Link href={`/remax-demo/cancelacion?step=comunicado&propiedad=${remaxDemoDefaults.featuredCancellationPropertyKey}`} className="button">
              {language === "en" ? "Cancellation communication" : "Comunicado cancelacion"}
            </Link>
            <Link href={`/remax-demo/alta?step=asesores&propiedad=${remaxDemoDefaults.altaPropertyKey}`} className="button button-secondary">
              {language === "en" ? "Back to operations" : "Volver a operacion"}
            </Link>
          </div>
        }
      />

      <div className="remax-summary-strip">
        <div>
          <span>{language === "en" ? "ONBOARDING" : "ALTA"}</span>
          <strong>{getCommunicationsByType("ALTA").length}</strong>
        </div>
        <div>
          <span>{language === "en" ? "CLOSING" : "BAJA"}</span>
          <strong>{getCommunicationsByType("BAJA").length}</strong>
        </div>
        <div>
          <span>{language === "en" ? "CANCELLATION" : "CANCELACION"}</span>
          <strong>{getCommunicationsByType("CANCELACION").length}</strong>
        </div>
      </div>

      <div className="remax-two-columns">
        <AccessSection title={language === "en" ? "Communications log" : "Bitacora de comunicados"}>
          <DataTable
            rows={remaxDemoCommunications}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "asunto",
                label: language === "en" ? "Subject" : "Asunto",
                render: (row) => (
                  <Link href={`/remax-demo/comunicados?comunicado=${row.id}`}>
                    <strong>{language === "en" ? `${translateCommunicationType(language, row.tipo)} · ${row.propiedadClave}` : row.asunto}</strong>
                  </Link>
                )
              },
              { key: "tipo", label: language === "en" ? "Type" : "Tipo", render: (row) => translateCommunicationType(language, row.tipo) },
              { key: "propiedad", label: language === "en" ? "Property" : "Propiedad", render: (row) => row.propiedadClave },
              { key: "fecha", label: language === "en" ? "Date" : "Fecha", render: (row) => row.fecha },
              { key: "destinatarios", label: language === "en" ? "Recipients" : "Destinatarios", render: (row) => `${row.destinatarios.length} ${language === "en" ? "contacts" : "contactos"}` },
              {
                key: "estado",
                label: language === "en" ? "Status" : "Estado",
                render: (row) => <StatusBadge value={translateCommunicationStatus(language, row.estado)} tone={getTone(row.estado)} />
              }
            ]}
          />
        </AccessSection>

        <AccessSection title={language === "en" ? "Communication preview" : "Preview del comunicado"} accent="red">
          <CommunicationsPreview communication={communication} property={property} language={language} />
        </AccessSection>
      </div>
    </div>
  );
}

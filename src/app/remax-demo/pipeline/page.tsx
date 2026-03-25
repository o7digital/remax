import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { AccessSection } from "@/remax-demo/components/access-section";
import { PriorityBadge } from "@/remax-demo/components/priority-badge";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { SentimentBadge } from "@/remax-demo/components/sentiment-badge";
import { getSingleSearchParam } from "@/remax-demo/formatters";
import { getRemaxLanguage } from "@/remax-demo/get-language";
import {
  getAdvisorById,
  getPipelineColumns,
  getPipelineItems,
  getPipelineSummary
} from "@/remax-demo/stats";
import type { RemaxPipelineItem, RemaxPipelineView } from "@/remax-demo/types";

function getPipelineHref(item: RemaxPipelineItem) {
  return item.propertyClave
    ? `/remax-demo/alta?step=expediente&propiedad=${item.propertyClave}`
    : "/remax-demo/analisis";
}

function getViewLink(view: RemaxPipelineView) {
  return `/remax-demo/pipeline?view=${view}`;
}

export default async function PipelineOperativoPage({
  searchParams
}: {
  searchParams: Promise<{ view?: string | string[] }>;
}) {
  const language = await getRemaxLanguage();
  const params = await searchParams;
  const view = (getSingleSearchParam(params.view) ?? "kanban") === "list" ? "list" : "kanban";
  const summary = getPipelineSummary();
  const items = getPipelineItems();
  const columns = getPipelineColumns();
  const topActions = items
    .filter((item) => item.priority === "alta" || item.sentiment === "sensible / en riesgo")
    .slice(0, 4);

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title={language === "en" ? "Operational Pipeline" : "Pipeline operativo"}
        description={
          language === "en"
            ? "Commercial follow-up in Kanban and List views to manage leads, onboarding, publishing, visits, negotiation, closings and cancellations in a more modern and actionable experience."
            : "Seguimiento comercial en vista Kanban y Lista para administrar leads, altas, publicaciones, visitas, negociacion, cierres y cancelaciones en una experiencia mas moderna y accionable."
        }
        actions={
          <>
            <Link href="/remax-demo/analisis" className="button">
              {language === "en" ? "View analysis" : "Ver analisis"}
            </Link>
            <Link href={getViewLink(view === "kanban" ? "list" : "kanban")} className="button button-secondary">
              {language === "en"
                ? `Switch to ${view === "kanban" ? "List" : "Kanban"}`
                : `Cambiar a ${view === "kanban" ? "Lista" : "Kanban"}`}
            </Link>
          </>
        }
      />

      <div className="remax-summary-strip">
        <div>
          <span>{language === "en" ? "Active opportunities" : "Oportunidades activas"}</span>
          <strong>{summary.active}</strong>
        </div>
        <div>
          <span>{language === "en" ? "Total pipeline" : "Total pipeline"}</span>
          <strong>{summary.total}</strong>
        </div>
        <div>
          <span>{language === "en" ? "High priority" : "Prioridad alta"}</span>
          <strong>{summary.highPriority}</strong>
        </div>
        <div>
          <span>{language === "en" ? "Sensitive cases" : "Casos sensibles"}</span>
          <strong>{summary.risk}</strong>
        </div>
        <div>
          <span>{language === "en" ? "View" : "Vista"}</span>
          <strong>{view === "kanban" ? "Kanban" : language === "en" ? "List" : "Lista"}</strong>
        </div>
      </div>

      <AccessSection
        title={language === "en" ? "Pipeline view" : "Vista del pipeline"}
        accent="blue"
        action={
          <div className="remax-view-switch">
            <Link href={getViewLink("kanban")} className={view === "kanban" ? "remax-view-link active" : "remax-view-link"}>
              Kanban
            </Link>
            <Link href={getViewLink("list")} className={view === "list" ? "remax-view-link active" : "remax-view-link"}>
              {language === "en" ? "List" : "Lista"}
            </Link>
          </div>
        }
      >
        {view === "kanban" ? (
          <div className="remax-pipeline-board-wrap">
            <div className="remax-pipeline-board">
              {columns.map((column) => (
                <section key={column.stage} className="remax-pipeline-column">
                  <div className="remax-pipeline-column-header">
                    <span>{column.items.length} {language === "en" ? "opportunities" : "oportunidades"}</span>
                    <strong>{column.stage}</strong>
                  </div>
                  <div className="remax-pipeline-card-stack">
                    {column.items.map((item) => {
                      const advisor = getAdvisorById(item.advisorId);

                      return (
                        <Link key={item.id} href={getPipelineHref(item)} className="remax-pipeline-card">
                          <div className="remax-pipeline-card-top">
                            <span>{advisor?.nombre ?? item.advisorId}</span>
                            <time>{item.updatedAt}</time>
                          </div>
                          <strong>{item.itemLabel}</strong>
                          <p>{item.status}</p>
                          <div className="remax-pipeline-card-meta">
                            <SentimentBadge sentiment={item.sentiment} language={language} />
                            <PriorityBadge priority={item.priority} language={language} />
                          </div>
                          <div className="remax-pipeline-reference">
                            <span>{language === "en" ? "Commercial reference" : "Referencia comercial"}</span>
                            <strong>{item.commercialReference}</strong>
                          </div>
                          <div className="remax-pipeline-next-action">
                            <span>{language === "en" ? "Next action" : "Proxima accion"}</span>
                            <p>{item.nextAction}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        ) : (
          <DataTable
            rows={items}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "oportunidad",
                label: language === "en" ? "Property / client" : "Propiedad / cliente",
                render: (row) => (
                  <Link href={getPipelineHref(row)}>
                    <strong>{row.itemLabel}</strong>
                  </Link>
                )
              },
              { key: "etapa", label: language === "en" ? "Stage" : "Etapa", render: (row) => row.stage },
              { key: "asesor", label: language === "en" ? "Agent" : "Asesor", render: (row) => getAdvisorById(row.advisorId)?.nombre ?? row.advisorId },
              { key: "referencia", label: language === "en" ? "Value / reference" : "Valor / referencia", render: (row) => row.commercialReference },
              { key: "estado", label: language === "en" ? "Status" : "Estado", render: (row) => row.status },
              { key: "accion", label: language === "en" ? "Next action" : "Proxima accion", render: (row) => row.nextAction },
              { key: "sentimiento", label: language === "en" ? "Sentiment" : "Sentimiento", render: (row) => <SentimentBadge sentiment={row.sentiment} language={language} /> },
              { key: "prioridad", label: language === "en" ? "Priority" : "Prioridad", render: (row) => <PriorityBadge priority={row.priority} language={language} /> },
              { key: "fecha", label: language === "en" ? "Date" : "Fecha", render: (row) => row.updatedAt }
            ]}
          />
        )}
      </AccessSection>

      <div className="remax-two-columns">
        <AccessSection title={language === "en" ? "Commercial prioritization" : "Priorizacion comercial"} accent="red">
          <div className="remax-process-list">
            {topActions.map((item) => (
              <Link key={item.id} href={getPipelineHref(item)} className="remax-process-card">
                <span>{item.stage}</span>
                <strong>{item.itemLabel}</strong>
                <p>{item.nextAction}</p>
                <div className="remax-pipeline-card-meta">
                  <SentimentBadge sentiment={item.sentiment} language={language} />
                  <PriorityBadge priority={item.priority} language={language} />
                </div>
              </Link>
            ))}
          </div>
        </AccessSection>

        <AccessSection title={language === "en" ? "Recommended operating design" : "Diseno operativo recomendado"} accent="gold">
          <div className="remax-detail-list">
            <article className="remax-detail-card">
              <span>Kanban</span>
              <strong>{language === "en" ? "Fast reading of the commercial flow" : "Lectura rapida del flujo comercial"}</strong>
              <p>{language === "en" ? "Leadership and coordination detect workload, blockers and commercial velocity by stage." : "Direccion y coordinacion detectan carga, bloqueos y velocidad comercial por etapa."}</p>
            </article>
            <article className="remax-detail-card">
              <span>{language === "en" ? "List" : "Lista"}</span>
              <strong>{language === "en" ? "Operational control" : "Control administrable"}</strong>
              <p>{language === "en" ? "Ideal view for granular supervision, operational follow-up and executive pipeline reading." : "Vista ideal para supervision puntual, seguimiento operativo y lectura ejecutiva del pipeline."}</p>
            </article>
            <article className="remax-detail-card">
              <span>{language === "en" ? "Sentiment" : "Sentimiento"}</span>
              <strong>{language === "en" ? "Visible risk and opportunity" : "Riesgo y oportunidad visibles"}</strong>
              <p>{language === "en" ? "Each card shows commercial signal to organize follow-up and detect friction." : "Cada tarjeta muestra senal comercial para ordenar el seguimiento y detectar friccion."}</p>
            </article>
            <article className="remax-detail-card">
              <span>{language === "en" ? "Priority" : "Prioridad"}</span>
              <strong>{language === "en" ? "Clear next action" : "Proxima accion clara"}</strong>
              <p>{language === "en" ? "Priority guides who to handle today, in 48h or when the opportunity cools down." : "La prioridad orienta a quien atender hoy, en 48h o cuando la oportunidad se enfria."}</p>
            </article>
          </div>
        </AccessSection>
      </div>
    </div>
  );
}

import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { AccessSection } from "@/remax-demo/components/access-section";
import { PriorityBadge } from "@/remax-demo/components/priority-badge";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { SentimentBadge } from "@/remax-demo/components/sentiment-badge";
import { getSingleSearchParam } from "@/remax-demo/formatters";
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
        title="Pipeline operativo"
        description="Seguimiento comercial en vista Kanban y Lista para administrar leads, altas, publicaciones, visitas, negociacion, cierres y cancelaciones en una experiencia mas moderna y accionable."
        actions={
          <>
            <Link href="/remax-demo/analisis" className="button">
              Ver analisis
            </Link>
            <Link href={getViewLink(view === "kanban" ? "list" : "kanban")} className="button button-secondary">
              Cambiar a {view === "kanban" ? "Lista" : "Kanban"}
            </Link>
          </>
        }
      />

      <div className="remax-summary-strip">
        <div>
          <span>Oportunidades activas</span>
          <strong>{summary.active}</strong>
        </div>
        <div>
          <span>Total pipeline</span>
          <strong>{summary.total}</strong>
        </div>
        <div>
          <span>Prioridad alta</span>
          <strong>{summary.highPriority}</strong>
        </div>
        <div>
          <span>Casos sensibles</span>
          <strong>{summary.risk}</strong>
        </div>
        <div>
          <span>Vista</span>
          <strong>{view === "kanban" ? "Kanban" : "Lista"}</strong>
        </div>
      </div>

      <AccessSection
        title="Vista del pipeline"
        accent="blue"
        action={
          <div className="remax-view-switch">
            <Link href={getViewLink("kanban")} className={view === "kanban" ? "remax-view-link active" : "remax-view-link"}>
              Kanban
            </Link>
            <Link href={getViewLink("list")} className={view === "list" ? "remax-view-link active" : "remax-view-link"}>
              Lista
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
                    <span>{column.items.length} oportunidades</span>
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
                            <SentimentBadge sentiment={item.sentiment} />
                            <PriorityBadge priority={item.priority} />
                          </div>
                          <div className="remax-pipeline-next-action">
                            <span>Proxima accion</span>
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
                label: "Propiedad / cliente",
                render: (row) => (
                  <Link href={getPipelineHref(row)}>
                    <strong>{row.itemLabel}</strong>
                  </Link>
                )
              },
              { key: "etapa", label: "Etapa", render: (row) => row.stage },
              { key: "asesor", label: "Asesor", render: (row) => getAdvisorById(row.advisorId)?.nombre ?? row.advisorId },
              { key: "estado", label: "Estado", render: (row) => row.status },
              { key: "accion", label: "Proxima accion", render: (row) => row.nextAction },
              { key: "sentimiento", label: "Sentimiento", render: (row) => <SentimentBadge sentiment={row.sentiment} /> },
              { key: "prioridad", label: "Prioridad", render: (row) => <PriorityBadge priority={row.priority} /> }
            ]}
          />
        )}
      </AccessSection>

      <div className="remax-two-columns">
        <AccessSection title="Priorizacion comercial" accent="red">
          <div className="remax-process-list">
            {topActions.map((item) => (
              <Link key={item.id} href={getPipelineHref(item)} className="remax-process-card">
                <span>{item.stage}</span>
                <strong>{item.itemLabel}</strong>
                <p>{item.nextAction}</p>
                <div className="remax-pipeline-card-meta">
                  <SentimentBadge sentiment={item.sentiment} />
                  <PriorityBadge priority={item.priority} />
                </div>
              </Link>
            ))}
          </div>
        </AccessSection>

        <AccessSection title="Diseno operativo recomendado" accent="gold">
          <div className="remax-detail-list">
            <article className="remax-detail-card">
              <span>Kanban</span>
              <strong>Lectura rapida del flujo comercial</strong>
              <p>Direccion y coordinacion detectan carga, bloqueos y velocidad comercial por etapa.</p>
            </article>
            <article className="remax-detail-card">
              <span>Lista</span>
              <strong>Control administrable</strong>
              <p>Vista ideal para supervision puntual, seguimiento operativo y lectura ejecutiva del pipeline.</p>
            </article>
            <article className="remax-detail-card">
              <span>Sentimiento</span>
              <strong>Riesgo y oportunidad visibles</strong>
              <p>Cada tarjeta muestra senal comercial para ordenar el seguimiento y detectar friccion.</p>
            </article>
            <article className="remax-detail-card">
              <span>Prioridad</span>
              <strong>Proxima accion clara</strong>
              <p>La prioridad orienta a quien atender hoy, en 48h o cuando la oportunidad se enfria.</p>
            </article>
          </div>
        </AccessSection>
      </div>
    </div>
  );
}

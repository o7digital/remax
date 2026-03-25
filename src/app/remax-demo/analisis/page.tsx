import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { AccessSection } from "@/remax-demo/components/access-section";
import { PriorityBadge } from "@/remax-demo/components/priority-badge";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { SentimentBadge } from "@/remax-demo/components/sentiment-badge";
import {
  getAdvisorById,
  getSentimentActionQueue,
  getSentimentInsights,
  getSentimentSummary
} from "@/remax-demo/stats";

function getInsightHref(propertyClave?: string) {
  return propertyClave
    ? `/remax-demo/alta?step=expediente&propiedad=${propertyClave}`
    : "/remax-demo/pipeline";
}

export default function AnalisisInteligentePage() {
  const summary = getSentimentSummary();
  const insights = getSentimentInsights();
  const queue = getSentimentActionQueue();

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title="Analisis inteligente"
        description="Clasificacion asistida con modelos de Hugging Face para priorizar leads, detectar riesgo comercial y mejorar el seguimiento sobre notas de asesores, comentarios de clientes e interacciones operativas."
        actions={
          <>
            <Link href="/remax-demo/pipeline" className="button">
              Abrir pipeline
            </Link>
            <Link href="/remax-demo/comunicados" className="button button-secondary">
              Ver comunicados
            </Link>
          </>
        }
      />

      <div className="remax-summary-strip">
        <div>
          <span>Positivo</span>
          <strong>{summary.positive}</strong>
        </div>
        <div>
          <span>Neutro</span>
          <strong>{summary.neutral}</strong>
        </div>
        <div>
          <span>Sensible / en riesgo</span>
          <strong>{summary.risk}</strong>
        </div>
        <div>
          <span>Prioridad alta</span>
          <strong>{summary.highPriority}</strong>
        </div>
        <div>
          <span>Notas leidas</span>
          <strong>{summary.total}</strong>
        </div>
      </div>

      <AccessSection title="Capa inteligente aplicada al seguimiento" accent="blue">
        <div className="remax-note-box">
          <strong>Lectura comercial, no IA generica</strong>
          <p>
            El analisis de sentimiento funciona como una ayuda concreta para priorizar leads, detectar riesgo
            comercial y ordenar el seguimiento del equipo. La lectura convierte notas, comentarios y observaciones en
            prioridad sugerida y accion operativa inmediata.
          </p>
        </div>
      </AccessSection>

      <div className="remax-two-columns">
        <AccessSection title="Lectura de notas y seguimientos">
          <div className="remax-intelligence-list">
            {insights.map((item) => {
              const advisor = getAdvisorById(item.advisorId);

              return (
                <article key={item.id} className="remax-insight-card">
                  <div className="remax-insight-topline">
                    <div>
                      <span>{item.sourceLabel}</span>
                      <strong>{item.clientName}</strong>
                    </div>
                    <time>{item.createdAt}</time>
                  </div>

                  <div className="remax-insight-badges">
                    <SentimentBadge sentiment={item.sentiment} />
                    <PriorityBadge priority={item.priority} />
                    <span className="remax-recommendation-pill">{item.suggestedAction}</span>
                  </div>

                  <p>{item.note}</p>

                  <div className="remax-insight-footer">
                    <small>
                      {advisor?.nombre ?? item.advisorId} · {item.commercialSignal}
                    </small>
                    <Link href={getInsightHref(item.propertyClave)}>Abrir contexto</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </AccessSection>

        <div className="remax-dashboard-side">
          <AccessSection title="Priorizacion sugerida" accent="red">
            <DataTable
              rows={queue.slice(0, 5)}
              getRowId={(row) => row.id}
              columns={[
                {
                  key: "lead",
                  label: "Lead / propiedad",
                  render: (row) => (
                    <Link href={getInsightHref(row.propertyClave)}>
                      <strong>{row.clientName}</strong>
                    </Link>
                  )
                },
                { key: "sentimiento", label: "Sentimiento", render: (row) => <SentimentBadge sentiment={row.sentiment} /> },
                { key: "prioridad", label: "Prioridad", render: (row) => <PriorityBadge priority={row.priority} /> },
                { key: "accion", label: "Accion sugerida", render: (row) => row.suggestedAction }
              ]}
            />
          </AccessSection>

          <AccessSection title="Uso comercial recomendado" accent="gold">
            <div className="remax-detail-list">
              <article className="remax-detail-card">
                <span>Priorizacion</span>
                <strong>Ordenar la carga comercial</strong>
                <p>La lectura de sentimiento ayuda a decidir que casos atender primero sin perder contexto del negocio.</p>
              </article>
              <article className="remax-detail-card">
                <span>Riesgo</span>
                <strong>Detectar alertas tempranas</strong>
                <p>Los comentarios sensibles o en riesgo se escalan antes de que afecten cierres o permanencia en cartera.</p>
              </article>
              <article className="remax-detail-card">
                <span>Seguimiento</span>
                <strong>Accion sugerida inmediata</strong>
                <p>Seguimiento inmediato, recontacto en 48h u oportunidad fria segun la senal comercial detectada.</p>
              </article>
              <article className="remax-detail-card">
                <span>Direccion</span>
                <strong>Lectura ejecutiva del pipeline</strong>
                <p>Direccion y coordinacion comercial pueden ver rapidamente donde hay friccion o aceleracion real.</p>
              </article>
            </div>
          </AccessSection>
        </div>
      </div>
    </div>
  );
}

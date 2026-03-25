import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { AccessSection } from "@/remax-demo/components/access-section";
import { PriorityBadge } from "@/remax-demo/components/priority-badge";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { SentimentBadge } from "@/remax-demo/components/sentiment-badge";
import { getRemaxLanguage } from "@/remax-demo/get-language";
import { rt } from "@/remax-demo/i18n";
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

export default async function AnalisisInteligentePage() {
  const language = await getRemaxLanguage();
  const t = (value: string) => rt(language, value);
  const summary = getSentimentSummary();
  const insights = getSentimentInsights();
  const queue = getSentimentActionQueue();

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title={t("Analisis inteligente")}
        description={
          language === "en"
            ? "Assisted classification with Hugging Face models to prioritize leads, detect commercial risk and improve follow-up across agent notes, client comments and operational interactions."
            : "Clasificacion asistida con modelos de Hugging Face para priorizar leads, detectar riesgo comercial y mejorar el seguimiento sobre notas de asesores, comentarios de clientes e interacciones operativas."
        }
        actions={
          <>
            <Link href="/remax-demo/pipeline" className="button">
              {language === "en" ? "Open pipeline" : "Abrir pipeline"}
            </Link>
            <Link href="/remax-demo/comunicados" className="button button-secondary">
              {language === "en" ? "View communications" : "Ver comunicados"}
            </Link>
          </>
        }
      />

      <div className="remax-summary-strip">
        <div>
          <span>{language === "en" ? "Positive" : "Positivo"}</span>
          <strong>{summary.positive}</strong>
        </div>
        <div>
          <span>{language === "en" ? "Neutral" : "Neutro"}</span>
          <strong>{summary.neutral}</strong>
        </div>
        <div>
          <span>{language === "en" ? "Sensitive / at risk" : "Sensible / en riesgo"}</span>
          <strong>{summary.risk}</strong>
        </div>
        <div>
          <span>{language === "en" ? "High priority" : "Prioridad alta"}</span>
          <strong>{summary.highPriority}</strong>
        </div>
        <div>
          <span>{language === "en" ? "Notes read" : "Notas leidas"}</span>
          <strong>{summary.total}</strong>
        </div>
      </div>

      <AccessSection title={language === "en" ? "Intelligent layer applied to follow-up" : "Capa inteligente aplicada al seguimiento"} accent="blue">
        <div className="remax-note-box">
          <strong>{language === "en" ? "Commercial reading, not generic AI" : "Lectura comercial, no IA generica"}</strong>
          <p>
            {language === "en"
              ? "Sentiment analysis works as a practical aid to prioritize leads, detect commercial risk and organize team follow-up. It turns notes, comments and observations into suggested priority and immediate operational action."
              : "El analisis de sentimiento funciona como una ayuda concreta para priorizar leads, detectar riesgo comercial y ordenar el seguimiento del equipo. La lectura convierte notas, comentarios y observaciones en prioridad sugerida y accion operativa inmediata."}
          </p>
        </div>
      </AccessSection>

      <div className="remax-two-columns">
        <AccessSection title={language === "en" ? "Reading notes and follow-up" : "Lectura de notas y seguimientos"}>
          <div className="remax-intelligence-list">
            {insights.map((item) => {
              const advisor = getAdvisorById(item.advisorId);

              return (
                <article key={item.id} className="remax-insight-card">
                  <div className="remax-insight-topline">
                    <div>
                      <span>{t(item.sourceLabel)}</span>
                      <strong>{item.clientName}</strong>
                    </div>
                    <time>{item.createdAt}</time>
                  </div>

                  <div className="remax-insight-badges">
                    <SentimentBadge sentiment={item.sentiment} language={language} />
                    <PriorityBadge priority={item.priority} language={language} />
                    <span className="remax-recommendation-pill">{t(item.suggestedAction)}</span>
                  </div>

                  <p>{t(item.note)}</p>
                  <div className="remax-insight-followup">
                    <span>{language === "en" ? "Next follow-up" : "Proximo seguimiento"}</span>
                    <strong>{t(item.nextFollowUp)}</strong>
                  </div>

                  <div className="remax-insight-footer">
                    <small>
                      {advisor?.nombre ?? item.advisorId} · {t(item.commercialSignal)}
                    </small>
                    <Link href={getInsightHref(item.propertyClave)}>{language === "en" ? "Open context" : "Abrir contexto"}</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </AccessSection>

        <div className="remax-dashboard-side">
          <AccessSection title={language === "en" ? "Suggested prioritization" : "Priorizacion sugerida"} accent="red">
            <DataTable
              rows={queue.slice(0, 5)}
              getRowId={(row) => row.id}
              columns={[
                {
                  key: "lead",
                  label: language === "en" ? "Lead / property" : "Lead / propiedad",
                  render: (row) => (
                    <Link href={getInsightHref(row.propertyClave)}>
                      <strong>{row.clientName}</strong>
                    </Link>
                  )
                },
                {
                  key: "sentimiento",
                  label: language === "en" ? "Sentiment" : "Sentimiento",
                  render: (row) => <SentimentBadge sentiment={row.sentiment} language={language} />
                },
                {
                  key: "prioridad",
                  label: language === "en" ? "Priority" : "Prioridad",
                  render: (row) => <PriorityBadge priority={row.priority} language={language} />
                },
                { key: "accion", label: language === "en" ? "Suggested action" : "Accion sugerida", render: (row) => t(row.suggestedAction) },
                { key: "seguimiento", label: language === "en" ? "Next follow-up" : "Proximo seguimiento", render: (row) => t(row.nextFollowUp) }
              ]}
            />
          </AccessSection>

          <AccessSection title={language === "en" ? "Recommended commercial use" : "Uso comercial recomendado"} accent="gold">
            <div className="remax-detail-list">
              <article className="remax-detail-card">
                <span>{language === "en" ? "Prioritization" : "Priorizacion"}</span>
                <strong>{language === "en" ? "Sort the commercial workload" : "Ordenar la carga comercial"}</strong>
                <p>{language === "en" ? "Sentiment reading helps decide which cases to address first without losing business context." : "La lectura de sentimiento ayuda a decidir que casos atender primero sin perder contexto del negocio."}</p>
              </article>
              <article className="remax-detail-card">
                <span>{language === "en" ? "Risk" : "Riesgo"}</span>
                <strong>{language === "en" ? "Detect early alerts" : "Detectar alertas tempranas"}</strong>
                <p>{language === "en" ? "Sensitive or at-risk comments are escalated before they affect closings or portfolio retention." : "Los comentarios sensibles o en riesgo se escalan antes de que afecten cierres o permanencia en cartera."}</p>
              </article>
              <article className="remax-detail-card">
                <span>{language === "en" ? "Follow-up" : "Seguimiento"}</span>
                <strong>{language === "en" ? "Immediate recommended action" : "Accion sugerida inmediata"}</strong>
                <p>{language === "en" ? "Immediate follow-up, recontact in 48h or cold opportunity depending on the commercial signal detected." : "Seguimiento inmediato, recontacto en 48h u oportunidad fria segun la senal comercial detectada."}</p>
              </article>
              <article className="remax-detail-card">
                <span>{language === "en" ? "Leadership" : "Direccion"}</span>
                <strong>{language === "en" ? "Executive pipeline reading" : "Lectura ejecutiva del pipeline"}</strong>
                <p>{language === "en" ? "Leadership and commercial coordination can quickly see where there is friction or real acceleration." : "Direccion y coordinacion comercial pueden ver rapidamente donde hay friccion o aceleracion real."}</p>
              </article>
            </div>
          </AccessSection>
        </div>
      </div>
    </div>
  );
}

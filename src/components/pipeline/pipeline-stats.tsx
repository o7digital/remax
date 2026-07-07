import { formatCurrency } from "@/lib/formatters";
import { clientLocaleTag, clientTxt } from "@/lib/client-i18n";
import type { DemoLocale } from "@/lib/demo-locale";
import { getPreferredCurrencyTotal } from "@/lib/pipeline-utils";
import type { PipelineSummary } from "@/lib/pipeline-types";

export function PipelineStats({
  locale,
  summary,
  workflowName,
  visibleCount,
  totalCount
}: {
  locale: DemoLocale;
  summary: PipelineSummary;
  workflowName: string;
  visibleCount: number;
  totalCount: number;
}) {
  const txt = (value: string) => clientTxt(locale, value);
  const localeTag = clientLocaleTag(locale);
  const openValue = getPreferredCurrencyTotal(summary.openValueTotals, "MXN");
  const totalValue = getPreferredCurrencyTotal(summary.totalValueTotals, "MXN");

  return (
    <section className="pipeline-stats-grid">
      <article className="pipeline-stat-card">
        <span>{txt("Operaciones abiertas")}</span>
        <strong className="pipeline-stat-number">{summary.openLeads}</strong>
        <p>{visibleCount === totalCount ? txt("Vista completa") : `${visibleCount} ${txt("visibles con filtros")}`}</p>
      </article>

      <article className="pipeline-stat-card">
        <span>{txt("Total operaciones")}</span>
        <strong className="pipeline-stat-number">{summary.totalLeads}</strong>
        <p>{txt("Incluye abiertas, cerradas y canceladas")}</p>
      </article>

      <article className="pipeline-stat-card">
        <span>{txt("Valor abierto")}</span>
        <strong className="pipeline-stat-amount">
          {openValue ? formatCurrency(openValue.amount, openValue.currency, localeTag) : txt("Sin monto")}
        </strong>
        <p>{openValue ? `${txt("Total principal en")} ${openValue.currency}` : txt("Sin valor disponible")}</p>
      </article>

      <article className="pipeline-stat-card">
        <span>{txt("Workflow activo")}</span>
        <strong className="pipeline-stat-title">{workflowName}</strong>
        <p>
          {totalValue
            ? `${formatCurrency(totalValue.amount, totalValue.currency, localeTag)} ${txt("visibles en esta vista")}`
            : txt("Sin valor consolidado")}
        </p>
      </article>
    </section>
  );
}

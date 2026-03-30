import { formatCurrency } from "@/lib/formatters";
import { getPreferredCurrencyTotal } from "@/lib/pipeline-utils";
import type { PipelineSummary } from "@/lib/pipeline-types";

export function PipelineStats({
  summary,
  workflowName,
  visibleCount,
  totalCount
}: {
  summary: PipelineSummary;
  workflowName: string;
  visibleCount: number;
  totalCount: number;
}) {
  const openValue = getPreferredCurrencyTotal(summary.openValueTotals, "MXN");
  const totalValue = getPreferredCurrencyTotal(summary.totalValueTotals, "MXN");

  return (
    <section className="pipeline-stats-grid">
      <article className="pipeline-stat-card">
        <span>Operaciones abiertas</span>
        <strong className="pipeline-stat-number">{summary.openLeads}</strong>
        <p>{visibleCount === totalCount ? "Vista completa" : `${visibleCount} visibles con filtros`}</p>
      </article>

      <article className="pipeline-stat-card">
        <span>Total operaciones</span>
        <strong className="pipeline-stat-number">{summary.totalLeads}</strong>
        <p>Incluye abiertas, cerradas y canceladas</p>
      </article>

      <article className="pipeline-stat-card">
        <span>Valor abierto</span>
        <strong className="pipeline-stat-amount">
          {openValue ? formatCurrency(openValue.amount, openValue.currency, "es-MX") : "Sin monto"}
        </strong>
        <p>{openValue ? `Total principal en ${openValue.currency}` : "Sin valor disponible"}</p>
      </article>

      <article className="pipeline-stat-card">
        <span>Workflow activo</span>
        <strong className="pipeline-stat-title">{workflowName}</strong>
        <p>
          {totalValue
            ? `${formatCurrency(totalValue.amount, totalValue.currency, "es-MX")} visibles en esta vista`
            : "Sin valor consolidado"}
        </p>
      </article>
    </section>
  );
}

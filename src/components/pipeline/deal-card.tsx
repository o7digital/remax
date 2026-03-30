import type { DragEvent } from "react";

import { formatCurrency, formatDate } from "@/lib/formatters";
import type { PipelineDeal } from "@/lib/pipeline-types";

export function DealCard({
  deal,
  onOpen,
  onDragStart,
  onDragEnd
}: {
  deal: PipelineDeal;
  onOpen: (deal: PipelineDeal) => void;
  onDragStart?: (deal: PipelineDeal, event: DragEvent<HTMLButtonElement>) => void;
  onDragEnd?: () => void;
}) {
  return (
    <button
      type="button"
      className="deal-card"
      draggable
      onClick={() => onOpen(deal)}
      onDragStart={(event) => onDragStart?.(deal, event)}
      onDragEnd={onDragEnd}
    >
      <div className="deal-card-top">
        <div>
          <p className="deal-card-title">{deal.title}</p>
          <p className="deal-card-client">
            Cliente: {deal.client}
            {deal.company ? ` · ${deal.company}` : ""}
          </p>
        </div>
        <span className="deal-probability-badge">{deal.probability}%</span>
      </div>

      <div className="deal-card-meta">
        <span>{deal.owner}</span>
        <span>Cierre: {formatDate(deal.closeDate, "es-MX")}</span>
      </div>

      <div className="deal-card-footer">
        <strong>{formatCurrency(deal.amount, deal.currency, "es-MX")}</strong>
        <div className="deal-card-badges">
          {deal.aiPulse ? <span className="deal-ai-badge">IA Pulse</span> : null}
          <span className="deal-status-dot">Detalle</span>
        </div>
      </div>
    </button>
  );
}

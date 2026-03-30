import { KanbanColumn } from "@/components/pipeline/kanban-column";
import type { PipelineColumnData, PipelineDeal } from "@/lib/pipeline-types";

export function KanbanBoard({
  columns,
  onOpenDeal,
  onAddDeal,
  onMoveDeal,
  draggingDealId,
  onDragStartDeal
}: {
  columns: PipelineColumnData[];
  onOpenDeal: (deal: PipelineDeal) => void;
  onAddDeal: (stageId: string) => void;
  onMoveDeal?: (dealId: string, stageId: string) => void;
  draggingDealId?: string | null;
  onDragStartDeal?: (dealId: string | null) => void;
}) {
  return (
    <section className="kanban-board-shell">
      <div className="kanban-board">
        {columns.map((column) => (
          <KanbanColumn
            key={column.stage.id}
            column={column}
            onOpenDeal={onOpenDeal}
            onAddDeal={onAddDeal}
            onMoveDeal={onMoveDeal}
            draggingDealId={draggingDealId}
            onDragStartDeal={onDragStartDeal}
          />
        ))}
      </div>
    </section>
  );
}

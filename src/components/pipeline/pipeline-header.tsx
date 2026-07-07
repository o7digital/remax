import { clientTxt } from "@/lib/client-i18n";
import type { DemoLocale } from "@/lib/demo-locale";
import type { PipelineViewMode, PipelineWorkflow } from "@/lib/pipeline-types";

export function PipelineHeader({
  locale,
  pipelines,
  selectedPipelineId,
  viewMode,
  onViewModeChange,
  onPipelineChange,
  onOpenManageWorkflow,
  onOpenNewWorkflow,
  onOpenNewDeal
}: {
  locale: DemoLocale;
  pipelines: PipelineWorkflow[];
  selectedPipelineId: string;
  viewMode: PipelineViewMode;
  onViewModeChange: (viewMode: PipelineViewMode) => void;
  onPipelineChange: (pipelineId: string) => void;
  onOpenManageWorkflow: () => void;
  onOpenNewWorkflow: () => void;
  onOpenNewDeal: () => void;
}) {
  const txt = (value: string) => clientTxt(locale, value);

  return (
    <section className="pipeline-hero">
      <div>
        <p className="pipeline-hero-eyebrow">REMAX Activa</p>
        <h1>Pipeline</h1>
        <p className="pipeline-hero-description">{txt("Seguimiento visual de oportunidades inmobiliarias por etapa")}</p>
      </div>

      <div className="pipeline-hero-actions">
        <div className="pipeline-select-wrap">
          <label htmlFor="pipeline-selector">Pipeline</label>
          <select
            id="pipeline-selector"
            className="pipeline-select"
            value={selectedPipelineId}
            onChange={(event) => onPipelineChange(event.target.value)}
          >
            {pipelines.map((pipeline) => (
              <option key={pipeline.id} value={pipeline.id}>
                {pipeline.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pipeline-action-row">
          <button type="button" className="pipeline-secondary-button" onClick={onOpenManageWorkflow}>
            {txt("Gestionar workflow")}
          </button>
          <button type="button" className="pipeline-secondary-button" onClick={onOpenNewWorkflow}>
            + {txt("Nuevo workflow")}
          </button>
          <button type="button" className="pipeline-primary-button" onClick={onOpenNewDeal}>
            {txt("Nuevo deal")}
          </button>
        </div>

        <div className="pipeline-view-toggle" aria-label={txt("Vista del pipeline")}>
          {([
            ["kanban", "Kanban"],
            ["list", txt("Lista")],
            ["forecast", "Forecast"]
          ] as const).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              className={viewMode === mode ? "pipeline-view-button active" : "pipeline-view-button"}
              onClick={() => onViewModeChange(mode)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

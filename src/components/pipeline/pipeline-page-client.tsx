"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { KanbanBoard } from "@/components/pipeline/kanban-board";
import { PipelineDialog } from "@/components/pipeline/pipeline-dialog";
import { PipelineHeader } from "@/components/pipeline/pipeline-header";
import { PipelineStats } from "@/components/pipeline/pipeline-stats";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { filterPipelineDeals, formatCurrencyTotals, getCurrencyTotals, getPipelineColumns, getPipelineSummary, getStageStatusLabel } from "@/lib/pipeline-utils";
import type { PipelineDeal, PipelineFilters, PipelineStage, PipelineStageStatus, PipelineViewMode, PipelineWorkflow } from "@/lib/pipeline-types";

type PipelineDialogState =
  | { type: "new-deal"; stageId?: string }
  | { type: "manage-workflow" }
  | { type: "new-workflow" }
  | { type: "deal"; deal: PipelineDeal }
  | null;

const defaultFilters: PipelineFilters = {
  query: "",
  owner: "all",
  status: "all",
  aiOnly: false
};

export function PipelinePageClient({
  workflows,
  deals,
  initialViewMode = "kanban",
  onMoveForecastDeal,
  onSaveWorkflow,
  onCreateWorkflow,
  onDeleteWorkflow
}: {
  workflows: PipelineWorkflow[];
  deals: PipelineDeal[];
  initialViewMode?: PipelineViewMode;
  onMoveForecastDeal: (dealId: string, closeDate: string) => Promise<void>;
  onSaveWorkflow: (workflowId: string, name: string, stages: PipelineStage[]) => Promise<{ name: string; stages: PipelineStage[] }>;
  onCreateWorkflow: (name: string, stages: PipelineStage[]) => Promise<PipelineWorkflow>;
  onDeleteWorkflow: (workflowId: string) => Promise<void>;
}) {
  const [activeWorkflows, setActiveWorkflows] = useState(workflows);
  const [selectedPipelineId, setSelectedPipelineId] = useState(workflows[0]?.id ?? "");
  const [filters, setFilters] = useState<PipelineFilters>(defaultFilters);
  const [dialogState, setDialogState] = useState<PipelineDialogState>(null);
  const [boardDeals, setBoardDeals] = useState<PipelineDeal[]>(deals);
  const [draggingDealId, setDraggingDealId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<PipelineViewMode>(initialViewMode);
  const availableYears = [...new Set(deals.map((deal) => new Date(deal.closeDate).getFullYear()).filter(Number.isFinite))].sort((a, b) => b - a);
  const [forecastYear, setForecastYear] = useState(availableYears[0] ?? new Date().getFullYear());
  const [forecastSavingId, setForecastSavingId] = useState<string | null>(null);
  const [forecastError, setForecastError] = useState("");
  const [workflowName, setWorkflowName] = useState(workflows[0]?.name ?? "");
  const [workflowStages, setWorkflowStages] = useState<PipelineStage[]>(workflows[0]?.stages ?? []);
  const [workflowSaving, setWorkflowSaving] = useState(false);
  const [workflowError, setWorkflowError] = useState("");
  const [draggedStageId, setDraggedStageId] = useState<string | null>(null);

  const selectedWorkflow = activeWorkflows.find((workflow) => workflow.id === selectedPipelineId) ?? activeWorkflows[0];
  const workflowDeals = boardDeals.filter((deal) => deal.pipelineId === selectedWorkflow.id);
  const filteredDeals = filterPipelineDeals(workflowDeals, filters);
  const columns = getPipelineColumns(selectedWorkflow.stages, filteredDeals);
  const summary = getPipelineSummary(filteredDeals);
  const owners = [...new Set(workflowDeals.map((deal) => deal.owner))].sort((left, right) => left.localeCompare(right));
  const hasActiveFilters =
    filters.query.trim().length > 0 || filters.owner !== "all" || filters.status !== "all" || filters.aiOnly;
  const openForecastDeals = filteredDeals.filter((deal) => deal.status === "open");
  const monthlyForecast = Array.from({ length: 12 }, (_, month) => {
    const monthDeals = openForecastDeals.filter((deal) => {
      const date = new Date(deal.closeDate);
      return date.getFullYear() === forecastYear && date.getMonth() === month;
    });
    return { month, deals: monthDeals, totals: getCurrencyTotals(monthDeals) };
  });
  const outsideForecastYear = openForecastDeals.filter((deal) => new Date(deal.closeDate).getFullYear() !== forecastYear);

  useEffect(() => {
    if (!dialogState) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDialogState(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dialogState]);

  useEffect(() => {
    setFilters(defaultFilters);
  }, [selectedPipelineId]);

  useEffect(() => {
    setBoardDeals(deals);
  }, [deals]);

  useEffect(() => {
    setActiveWorkflows(workflows);
  }, [workflows]);

  function openWorkflowEditor() {
    setWorkflowName(selectedWorkflow.name);
    setWorkflowStages(selectedWorkflow.stages.map((stage) => ({ ...stage })));
    setWorkflowError("");
    setDialogState({ type: "manage-workflow" });
  }

  function openNewWorkflowEditor() {
    setWorkflowName("Nuevo workflow");
    setWorkflowStages([
      { id: `stage-${crypto.randomUUID()}`, name: "Nuevo lead", probability: 10, status: "open", position: 0 },
      { id: `stage-${crypto.randomUUID()}`, name: "Ganado", probability: 100, status: "won", position: 1 },
      { id: `stage-${crypto.randomUUID()}`, name: "Perdido", probability: 0, status: "lost", position: 2 }
    ]);
    setWorkflowError("");
    setDialogState({ type: "new-workflow" });
  }

  function addWorkflowStage() {
    setWorkflowStages((current) => [
      ...current,
      {
        id: `stage-${crypto.randomUUID()}`,
        name: `Etapa ${current.length + 1}`,
        probability: 0,
        status: "open",
        position: current.length
      }
    ]);
  }

  function removeWorkflowStage(stageId: string) {
    setWorkflowStages((current) =>
      current.filter((stage) => stage.id !== stageId).map((stage, position) => ({ ...stage, position }))
    );
  }

  function updateWorkflowStage(stageId: string, changes: Partial<PipelineStage>) {
    setWorkflowStages((current) => current.map((stage) => stage.id === stageId ? { ...stage, ...changes } : stage));
  }

  function moveWorkflowStage(targetStageId: string) {
    if (!draggedStageId || draggedStageId === targetStageId) return;
    setWorkflowStages((current) => {
      const sourceIndex = current.findIndex((stage) => stage.id === draggedStageId);
      const targetIndex = current.findIndex((stage) => stage.id === targetStageId);
      if (sourceIndex < 0 || targetIndex < 0) return current;
      const next = [...current];
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next.map((stage, position) => ({ ...stage, position }));
    });
    setDraggedStageId(null);
  }

  async function persistWorkflow() {
    if (!workflowName.trim() || workflowStages.some((stage) => !stage.name.trim())) {
      setWorkflowError("El nombre del workflow y todas las etapas son obligatorios.");
      return;
    }
    setWorkflowSaving(true);
    setWorkflowError("");
    try {
      const saved = await onSaveWorkflow(selectedWorkflow.id, workflowName, workflowStages);
      const nextWorkflow = { ...selectedWorkflow, name: saved.name, stages: saved.stages };
      setActiveWorkflows((current) => current.map((workflow) => workflow.id === selectedWorkflow.id ? nextWorkflow : workflow));
      setBoardDeals((current) => current.map((deal) => {
        if (deal.pipelineId !== selectedWorkflow.id) return deal;
        const stage = saved.stages.find((item) => item.id === deal.stage) ?? saved.stages[0];
        return { ...deal, stage: stage.id, probability: stage.probability, status: stage.status };
      }));
      setDialogState(null);
    } catch (error) {
      console.error("Failed to save workflow", error);
      setWorkflowError("No se pudo guardar el workflow en Railway. Intenta de nuevo.");
    } finally {
      setWorkflowSaving(false);
    }
  }

  async function createWorkflow() {
    if (!workflowName.trim() || workflowStages.length === 0 || workflowStages.some((stage) => !stage.name.trim())) {
      setWorkflowError("El nombre del workflow y al menos una etapa son obligatorios.");
      return;
    }
    setWorkflowSaving(true);
    setWorkflowError("");
    try {
      const created = await onCreateWorkflow(workflowName, workflowStages);
      setActiveWorkflows((current) => [...current, created]);
      setSelectedPipelineId(created.id);
      setDialogState(null);
    } catch (error) {
      console.error("Failed to create workflow", error);
      setWorkflowError("No se pudo crear el workflow en Railway. Intenta de nuevo.");
    } finally {
      setWorkflowSaving(false);
    }
  }

  async function deleteWorkflow() {
    if (selectedWorkflow.id === "real-operations") return;
    if (!window.confirm(`¿Eliminar el workflow “${selectedWorkflow.name}”?`)) return;
    setWorkflowSaving(true);
    setWorkflowError("");
    try {
      await onDeleteWorkflow(selectedWorkflow.id);
      const remaining = activeWorkflows.filter((workflow) => workflow.id !== selectedWorkflow.id);
      setActiveWorkflows(remaining);
      setSelectedPipelineId(remaining[0]?.id ?? "");
      setDialogState(null);
    } catch (error) {
      console.error("Failed to delete workflow", error);
      setWorkflowError("No se pudo eliminar el workflow.");
    } finally {
      setWorkflowSaving(false);
    }
  }

  function moveDealToStage(dealId: string, stageId: string) {
    const targetStage = selectedWorkflow.stages.find((stage) => stage.id === stageId);
    if (!targetStage) {
      return;
    }

    setBoardDeals((current) =>
      current.map((deal) =>
        deal.id === dealId
          ? {
              ...deal,
              stage: targetStage.id,
              probability: targetStage.probability,
              status: targetStage.status
            }
          : deal
      )
    );
    setDraggingDealId(null);
  }

  async function moveDealToForecastMonth(dealId: string, month: number) {
    const currentDeal = boardDeals.find((deal) => deal.id === dealId);
    if (!currentDeal) return;

    const currentDate = new Date(currentDeal.closeDate);
    const day = Number.isFinite(currentDate.getTime()) ? Math.min(currentDate.getUTCDate(), 28) : 15;
    const closeDate = `${forecastYear}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const previousDate = currentDeal.closeDate;

    setForecastError("");
    setForecastSavingId(dealId);
    setBoardDeals((current) => current.map((deal) => deal.id === dealId ? { ...deal, closeDate } : deal));

    try {
      await onMoveForecastDeal(dealId, closeDate);
    } catch (error) {
      console.error("Failed to move forecast deal", error);
      setBoardDeals((current) => current.map((deal) => deal.id === dealId ? { ...deal, closeDate: previousDate } : deal));
      setForecastError("No se pudo guardar el nuevo mes. Intenta de nuevo.");
    } finally {
      setForecastSavingId(null);
    }
  }

  function saveDeal(formData: FormData, existingDeal?: PipelineDeal) {
    const stageId = String(formData.get("stage") || existingDeal?.stage || selectedWorkflow.stages[0]?.id);
    const stage = selectedWorkflow.stages.find((item) => item.id === stageId) ?? selectedWorkflow.stages[0];
    const amount = Number(formData.get("amount") || existingDeal?.amount || 0);
    const title = String(formData.get("title") || existingDeal?.title || "").trim();

    if (!title || !stage) {
      return;
    }

    const nextDeal: PipelineDeal = {
      ...(existingDeal ?? {
        id: `deal-${Date.now()}`,
        pipelineId: selectedWorkflow.id,
        linkedContactCount: 0,
        duplicateClientCount: 1,
        proposalLabel: "Propuesta base",
        aiPulse: false
      }),
      title,
      client: String(formData.get("client") || existingDeal?.client || "").trim(),
      company: String(formData.get("company") || existingDeal?.company || "").trim(),
      propertyKey: String(formData.get("propertyKey") || existingDeal?.propertyKey || "").trim(),
      propertyTitle: String(formData.get("propertyTitle") || existingDeal?.propertyTitle || "").trim(),
      location: String(formData.get("location") || existingDeal?.location || "").trim(),
      primaryEmail: String(formData.get("primaryEmail") || existingDeal?.primaryEmail || "").trim() || null,
      primaryPhone: String(formData.get("primaryPhone") || existingDeal?.primaryPhone || "").trim() || null,
      amount: Number.isFinite(amount) ? amount : 0,
      currency: String(formData.get("currency") || existingDeal?.currency || "MXN"),
      owner: String(formData.get("owner") || existingDeal?.owner || "").trim(),
      closeDate: String(formData.get("closeDate") || existingDeal?.closeDate || new Date().toISOString().slice(0, 10)),
      stage: stage.id,
      probability: stage.probability,
      status: stage.status
    };

    setBoardDeals((current) => {
      const exists = current.some((deal) => deal.id === nextDeal.id);
      return exists ? current.map((deal) => (deal.id === nextDeal.id ? nextDeal : deal)) : [nextDeal, ...current];
    });
    setDialogState(null);
  }

  return (
    <div className="page-stack pipeline-page">
      <PipelineHeader
        pipelines={activeWorkflows}
        selectedPipelineId={selectedPipelineId}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onPipelineChange={setSelectedPipelineId}
        onOpenManageWorkflow={openWorkflowEditor}
        onOpenNewWorkflow={openNewWorkflowEditor}
        onOpenNewDeal={() => setDialogState({ type: "new-deal" })}
      />

      <PipelineStats
        summary={summary}
        workflowName={selectedWorkflow.name}
        visibleCount={filteredDeals.length}
        totalCount={workflowDeals.length}
      />

      <section className="pipeline-toolbar">
        <div className="pipeline-search-field">
          <label htmlFor="pipeline-search">Buscar operacion, propiedad, cliente u owner</label>
          <input
            id="pipeline-search"
            type="search"
            placeholder="Ej. Leticia Diaz, RTV-571, Zapopan"
            value={filters.query}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                query: event.target.value
              }))
            }
          />
        </div>

        <div className="pipeline-toolbar-controls">
          <div className="pipeline-select-wrap">
            <label htmlFor="owner-filter">Owner</label>
            <select
              id="owner-filter"
              className="pipeline-select"
              value={filters.owner}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  owner: event.target.value
                }))
              }
            >
              <option value="all">Todos los owners</option>
              {owners.map((owner) => (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              ))}
            </select>
          </div>

          <div className="pipeline-filter-pills" aria-label="Filtro de estado">
            {[
              { value: "all", label: "Todos" },
              { value: "open", label: "Abierto" },
              { value: "won", label: "Ganado" },
              { value: "lost", label: "Perdido" }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                className={filters.status === option.value ? "pipeline-filter-pill active" : "pipeline-filter-pill"}
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    status: option.value as PipelineFilters["status"]
                  }))
                }
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={filters.aiOnly ? "pipeline-filter-pill active" : "pipeline-filter-pill"}
            onClick={() =>
              setFilters((current) => ({
                ...current,
                aiOnly: !current.aiOnly
              }))
            }
          >
            IA Pulse
          </button>

          {hasActiveFilters ? (
            <button type="button" className="pipeline-text-button" onClick={() => setFilters(defaultFilters)}>
              Limpiar filtros
            </button>
          ) : null}
        </div>
      </section>

      <div className="pipeline-summary-row">
        <span>Operaciones abiertas: {summary.openLeads}</span>
        <span>Total operaciones: {summary.totalLeads}</span>
        <span>{filteredDeals.length} visibles en {viewMode === "kanban" ? "Kanban" : viewMode === "list" ? "Lista" : "Forecast"}</span>
      </div>

      {viewMode === "kanban" ? (
        <KanbanBoard
          columns={columns}
          onOpenDeal={(deal) => setDialogState({ type: "deal", deal })}
          onAddDeal={(stageId) => setDialogState({ type: "new-deal", stageId })}
          onMoveDeal={moveDealToStage}
          draggingDealId={draggingDealId}
          onDragStartDeal={setDraggingDealId}
        />
      ) : null}

      {viewMode === "list" ? (
        <section className="pipeline-list-view">
          <table className="data-table">
            <thead><tr><th>Operacion</th><th>Cliente</th><th>Etapa</th><th>Estado</th><th>Owner</th><th className="align-right">Valor</th><th>Cierre</th></tr></thead>
            <tbody>
              {filteredDeals.map((deal) => (
                <tr key={deal.id} onClick={() => setDialogState({ type: "deal", deal })} className="pipeline-list-row">
                  <td><strong>{deal.title}</strong><div className="muted">{deal.propertyKey ?? "Sin propiedad"}</div></td>
                  <td>{deal.client || "Sin cliente"}</td>
                  <td>{selectedWorkflow.stages.find((stage) => stage.id === deal.stage)?.name ?? deal.stage}</td>
                  <td>{getStageStatusLabel(deal.status)}</td>
                  <td>{deal.owner || "Sin owner"}</td>
                  <td className="align-right">{formatCurrency(deal.amount, deal.currency, "es-MX")}</td>
                  <td>{formatDate(deal.closeDate, "es-MX")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      {viewMode === "forecast" ? (
        <section className="pipeline-forecast-view">
          <div className="pipeline-forecast-heading">
            <div><strong>Forecast mensual por fecha de cierre</strong><p className="muted">{openForecastDeals.length} operaciones abiertas · {outsideForecastYear.length} fuera de {forecastYear}</p></div>
            <label className="pipeline-select-wrap"><span>Año</span><select className="pipeline-select" value={forecastYear} onChange={(event) => setForecastYear(Number(event.target.value))}>{availableYears.map((year) => <option key={year} value={year}>{year}</option>)}</select></label>
          </div>
          {forecastError ? <p className="auth-error">{forecastError}</p> : null}
          <div className="pipeline-forecast-scroll">
            {monthlyForecast.map(({ month, deals: monthDeals, totals }) => (
              <article
                key={`${forecastYear}-${month}`}
                className="pipeline-forecast-month"
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  const dealId = event.dataTransfer.getData("text/plain");
                  if (dealId) void moveDealToForecastMonth(dealId, month);
                }}
              >
                <p className="pipeline-hero-eyebrow">{new Intl.DateTimeFormat("es-MX", { month: "long" }).format(new Date(forecastYear, month, 1))}</p>
                <strong>{monthDeals.length} deals</strong>
                <span>{formatCurrencyTotals(totals, "es-MX")}</span>
                <div className="pipeline-forecast-cards">
                  {monthDeals.map((deal) => (
                    <button
                      key={deal.id}
                      type="button"
                      draggable
                      aria-busy={forecastSavingId === deal.id}
                      onDragStart={(event) => {
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData("text/plain", deal.id);
                      }}
                      onClick={() => setDialogState({ type: "deal", deal })}
                    >
                      <strong>{deal.title}</strong><span>{deal.client || "Sin cliente"}</span><span>{formatCurrency(deal.amount, deal.currency, "es-MX")}</span>
                    </button>
                  ))}
                  {monthDeals.length === 0 ? <p className="muted">Sin operaciones</p> : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {dialogState?.type === "new-deal" ? (
        <PipelineDialog
          eyebrow="Nuevo deal"
          title="Crear deal"
          description="Alta rapida editable en el tablero."
          onClose={() => setDialogState(null)}
        >
          <form action={(formData) => saveDeal(formData)} className="form-grid">
            <label className="field"><span className="field-label">Titulo</span><input name="title" required /></label>
            <label className="field"><span className="field-label">Cliente</span><input name="client" /></label>
            <label className="field"><span className="field-label">Empresa</span><input name="company" /></label>
            <label className="field"><span className="field-label">Propiedad</span><input name="propertyKey" /></label>
            <label className="field"><span className="field-label">Ubicacion</span><input name="location" /></label>
            <label className="field"><span className="field-label">Owner</span><input name="owner" /></label>
            <label className="field"><span className="field-label">Monto</span><input name="amount" type="number" min="0" step="0.01" /></label>
            <label className="field"><span className="field-label">Moneda</span><select name="currency" defaultValue="MXN"><option>MXN</option><option>USD</option></select></label>
            <label className="field"><span className="field-label">Cierre</span><input name="closeDate" type="date" /></label>
            <label className="field">
              <span className="field-label">Etapa</span>
              <select name="stage" defaultValue={dialogState.stageId ?? selectedWorkflow.stages[0]?.id}>
                {selectedWorkflow.stages.map((stage) => <option key={stage.id} value={stage.id}>{stage.name}</option>)}
              </select>
            </label>
            <div className="field" style={{ alignSelf: "end" }}><button className="button" type="submit">Crear deal</button></div>
          </form>
        </PipelineDialog>
      ) : null}

      {dialogState?.type === "manage-workflow" ? (
        <PipelineDialog
          eyebrow="Workflow"
          title="Gestionar workflow"
          description="Edita, ordena y guarda las etapas del workflow en Railway/Postgres."
          onClose={() => setDialogState(null)}
        >
          <div className="workflow-editor">
            <label className="field">
              <span>Nombre del workflow</span>
              <input value={workflowName} onChange={(event) => setWorkflowName(event.target.value)} maxLength={120} />
            </label>
            <div className="workflow-editor-heading">
              <div><strong>Etapas</strong><p>Arrastra una fila para cambiar su posición.</p></div>
              <button type="button" className="button button-secondary" onClick={() => setWorkflowStages((current) => [...current, { id: `stage-${crypto.randomUUID()}`, name: "Nueva etapa", probability: 0, status: "open", position: current.length }])}>+ Etapa</button>
            </div>
            <div className="workflow-stage-list">
              {workflowStages.map((stage) => (
                <div key={stage.id} className="workflow-stage-row" draggable onDragStart={() => setDraggedStageId(stage.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => moveWorkflowStage(stage.id)}>
                  <span className="workflow-drag-handle" title="Arrastrar">⠿</span>
                  <input aria-label="Nombre de etapa" value={stage.name} onChange={(event) => updateWorkflowStage(stage.id, { name: event.target.value })} />
                  <select aria-label="Estado de etapa" value={stage.status} onChange={(event) => updateWorkflowStage(stage.id, { status: event.target.value as PipelineStageStatus })}>
                    <option value="open">Abierto</option>
                    <option value="won">Ganado</option>
                    <option value="lost">Perdido</option>
                  </select>
                  <label className="workflow-probability"><input aria-label="Probabilidad" type="number" min="0" max="100" value={stage.probability} onChange={(event) => updateWorkflowStage(stage.id, { probability: Number(event.target.value) })} /><span>%</span></label>
                  <button type="button" className="workflow-delete-stage" aria-label={`Eliminar ${stage.name}`} disabled={workflowStages.length === 1} onClick={() => setWorkflowStages((current) => current.filter((item) => item.id !== stage.id).map((item, position) => ({ ...item, position })))}>×</button>
                </div>
              ))}
            </div>
            {workflowError ? <p className="form-error" role="alert">{workflowError}</p> : null}
            <div className="workflow-editor-actions">
              <div>
                {selectedWorkflow.id === "real-operations" ? (
                  <Link href="/app/forecast" className="button button-secondary">Abrir forecast</Link>
                ) : (
                  <button type="button" className="button workflow-delete-button" disabled={workflowSaving} onClick={() => void deleteWorkflow()}>Eliminar workflow</button>
                )}
              </div>
              <div className="inline-stack">
                <button type="button" className="button button-secondary" onClick={() => setDialogState(null)}>Cancelar</button>
                <button type="button" className="button" disabled={workflowSaving} onClick={() => void persistWorkflow()}>{workflowSaving ? "Guardando…" : "Guardar"}</button>
              </div>
            </div>
          </div>
        </PipelineDialog>
      ) : null}

      {dialogState?.type === "new-workflow" ? (
        <PipelineDialog
          eyebrow="Nuevo workflow"
          title="Crear workflow"
          description="Crea un pipeline independiente con sus propias etapas, estados y probabilidades."
          onClose={() => setDialogState(null)}
        >
          <div className="workflow-editor">
            <label className="field"><span>Nombre del workflow</span><input value={workflowName} onChange={(event) => setWorkflowName(event.target.value)} maxLength={120} /></label>
            <div className="workflow-editor-heading">
              <div><strong>Etapas</strong><p>Arrastra una fila para cambiar su posición.</p></div>
              <button type="button" className="button button-secondary" onClick={addWorkflowStage}>+ Etapa</button>
            </div>
            <div className="workflow-stage-list">
              {workflowStages.map((stage) => (
                <div key={stage.id} className="workflow-stage-row" draggable onDragStart={() => setDraggedStageId(stage.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => moveWorkflowStage(stage.id)}>
                  <span className="workflow-drag-handle" title="Arrastrar">⠿</span>
                  <input aria-label="Nombre de etapa" value={stage.name} onChange={(event) => updateWorkflowStage(stage.id, { name: event.target.value })} />
                  <select aria-label="Estado de etapa" value={stage.status} onChange={(event) => updateWorkflowStage(stage.id, { status: event.target.value as PipelineStageStatus })}><option value="open">Abierto</option><option value="won">Ganado</option><option value="lost">Perdido</option></select>
                  <label className="workflow-probability"><input aria-label="Probabilidad" type="number" min="0" max="100" value={stage.probability} onChange={(event) => updateWorkflowStage(stage.id, { probability: Number(event.target.value) })} /><span>%</span></label>
                  <button type="button" className="workflow-delete-stage" aria-label={`Eliminar ${stage.name}`} disabled={workflowStages.length === 1} onClick={() => removeWorkflowStage(stage.id)}>×</button>
                </div>
              ))}
            </div>
            {workflowError ? <p className="form-error" role="alert">{workflowError}</p> : null}
            <div className="workflow-editor-actions"><span /><div className="inline-stack"><button type="button" className="button button-secondary" onClick={() => setDialogState(null)}>Cancelar</button><button type="button" className="button" disabled={workflowSaving} onClick={() => void createWorkflow()}>{workflowSaving ? "Creando…" : "Crear workflow"}</button></div></div>
          </div>
        </PipelineDialog>
      ) : null}

      {dialogState?.type === "deal" ? (
        <PipelineDialog
          eyebrow={dialogState.deal.aiPulse ? "IA Pulse" : "Deal"}
          title={dialogState.deal.title}
          description="Ficha operativa enriquecida con cliente, propiedad, riesgo de duplicado y acceso a propuestas."
          onClose={() => setDialogState(null)}
        >
          <form action={(formData) => saveDeal(formData, dialogState.deal)} className="form-grid">
            <label className="field"><span className="field-label">Titulo</span><input name="title" defaultValue={dialogState.deal.title} required /></label>
            <label className="field"><span className="field-label">Cliente</span><input name="client" defaultValue={dialogState.deal.client} /></label>
            <label className="field"><span className="field-label">Empresa</span><input name="company" defaultValue={dialogState.deal.company ?? ""} /></label>
            <label className="field"><span className="field-label">Propiedad</span><input name="propertyKey" defaultValue={dialogState.deal.propertyKey ?? ""} /></label>
            <label className="field"><span className="field-label">Ubicacion</span><input name="location" defaultValue={dialogState.deal.location ?? ""} /></label>
            <label className="field"><span className="field-label">Owner</span><input name="owner" defaultValue={dialogState.deal.owner} /></label>
            <label className="field"><span className="field-label">Monto</span><input name="amount" type="number" min="0" step="0.01" defaultValue={dialogState.deal.amount} /></label>
            <label className="field"><span className="field-label">Moneda</span><select name="currency" defaultValue={dialogState.deal.currency}><option>MXN</option><option>USD</option></select></label>
            <label className="field"><span className="field-label">Cierre</span><input name="closeDate" type="date" defaultValue={dialogState.deal.closeDate.slice(0, 10)} /></label>
            <label className="field"><span className="field-label">Email</span><input name="primaryEmail" type="email" defaultValue={dialogState.deal.primaryEmail ?? ""} /></label>
            <label className="field"><span className="field-label">Telefono</span><input name="primaryPhone" defaultValue={dialogState.deal.primaryPhone ?? ""} /></label>
            <label className="field">
              <span className="field-label">Etapa</span>
              <select name="stage" defaultValue={dialogState.deal.stage}>
                {selectedWorkflow.stages.map((stage) => <option key={stage.id} value={stage.id}>{stage.name}</option>)}
              </select>
            </label>
            <div className="field" style={{ alignSelf: "end" }}><button className="button" type="submit">Guardar deal</button></div>
          </form>
          <div className="pipeline-dialog-grid">
            <div className="pipeline-dialog-card">
              <span>Cliente</span>
              <strong>
                {dialogState.deal.client}
                {dialogState.deal.company ? ` · ${dialogState.deal.company}` : ""}
              </strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Monto</span>
              <strong>{formatCurrency(dialogState.deal.amount, dialogState.deal.currency, "es-MX")}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Cierre</span>
              <strong>{formatDate(dialogState.deal.closeDate, "es-MX")}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Owner</span>
              <strong>{dialogState.deal.owner}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Propiedad</span>
              <strong>{dialogState.deal.propertyKey ?? dialogState.deal.propertyTitle ?? "Sin propiedad"}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Ubicacion</span>
              <strong>{dialogState.deal.location ?? "Sin ubicacion"}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Probabilidad</span>
              <strong>{dialogState.deal.probability}%</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Estado</span>
              <strong>{getStageStatusLabel(dialogState.deal.status)}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Contacto principal</span>
              <strong>{dialogState.deal.primaryEmail ?? dialogState.deal.primaryPhone ?? "Pendiente de enriquecer"}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Contactos vinculados</span>
              <strong>{dialogState.deal.linkedContactCount ?? 0}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Riesgo duplicado</span>
              <strong>
                {(dialogState.deal.duplicateClientCount ?? 0) > 1
                  ? `${dialogState.deal.duplicateClientCount} coincidencias`
                  : "Sin duplicado visible"}
              </strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Propuesta</span>
              <strong>{dialogState.deal.proposalLabel ?? "Sin propuesta"}</strong>
            </div>
            <div className="pipeline-dialog-card pipeline-dialog-card-wide">
              <span>Acciones relacionadas</span>
              <strong className="inline-stack">
                <Link href="/app/clients" className="pipeline-text-button">
                  Gestionar cliente
                </Link>
                <Link href="/app/contacts" className="pipeline-text-button">
                  Ver contactos
                </Link>
                <Link href="/app/quotes" className="pipeline-text-button">
                  Abrir propuestas
                </Link>
                <Link href="/app/marketing" className="pipeline-text-button">
                  Leads y newsletter
                </Link>
              </strong>
            </div>
            <div className="pipeline-dialog-card pipeline-dialog-card-wide">
              <span>Movimiento rapido</span>
              <strong>Tambien puedes arrastrar este deal a otra etapa directamente desde el tablero.</strong>
            </div>
          </div>
        </PipelineDialog>
      ) : null}
    </div>
  );
}

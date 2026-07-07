"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { KanbanBoard } from "@/components/pipeline/kanban-board";
import { PipelineDialog } from "@/components/pipeline/pipeline-dialog";
import { PipelineHeader } from "@/components/pipeline/pipeline-header";
import { PipelineStats } from "@/components/pipeline/pipeline-stats";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { filterPipelineDeals, formatCurrencyTotals, getCurrencyTotals, getPipelineColumns, getPipelineSummary, getStageStatusLabel } from "@/lib/pipeline-utils";
import type { PipelineDeal, PipelineFilters, PipelineViewMode, PipelineWorkflow } from "@/lib/pipeline-types";

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
  initialViewMode = "kanban"
}: {
  workflows: PipelineWorkflow[];
  deals: PipelineDeal[];
  initialViewMode?: PipelineViewMode;
}) {
  const [selectedPipelineId, setSelectedPipelineId] = useState(workflows[0]?.id ?? "");
  const [filters, setFilters] = useState<PipelineFilters>(defaultFilters);
  const [dialogState, setDialogState] = useState<PipelineDialogState>(null);
  const [boardDeals, setBoardDeals] = useState<PipelineDeal[]>(deals);
  const [draggingDealId, setDraggingDealId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<PipelineViewMode>(initialViewMode);
  const availableYears = [...new Set(deals.map((deal) => new Date(deal.closeDate).getFullYear()).filter(Number.isFinite))].sort((a, b) => b - a);
  const [forecastYear, setForecastYear] = useState(availableYears[0] ?? new Date().getFullYear());

  const selectedWorkflow = workflows.find((workflow) => workflow.id === selectedPipelineId) ?? workflows[0];
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
        pipelines={workflows}
        selectedPipelineId={selectedPipelineId}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onPipelineChange={setSelectedPipelineId}
        onOpenManageWorkflow={() => setDialogState({ type: "manage-workflow" })}
        onOpenNewWorkflow={() => setDialogState({ type: "new-workflow" })}
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
          <div className="pipeline-forecast-scroll">
            {monthlyForecast.map(({ month, deals: monthDeals, totals }) => (
              <article key={`${forecastYear}-${month}`} className="pipeline-forecast-month">
                <p className="pipeline-hero-eyebrow">{new Intl.DateTimeFormat("es-MX", { month: "long" }).format(new Date(forecastYear, month, 1))}</p>
                <strong>{monthDeals.length} deals</strong>
                <span>{formatCurrencyTotals(totals, "es-MX")}</span>
                <div className="pipeline-forecast-cards">
                  {monthDeals.map((deal) => (
                    <button key={deal.id} type="button" onClick={() => setDialogState({ type: "deal", deal })}>
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
          description="Editor operativo del workflow actual. La persistencia en base llega en la siguiente iteracion."
          onClose={() => setDialogState(null)}
        >
          <div className="pipeline-dialog-grid">
            <div className="pipeline-dialog-card">
              <span>Workflow actual</span>
              <strong>{selectedWorkflow.name}</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Etapas activas</span>
              <strong>{selectedWorkflow.stages.length}</strong>
            </div>
            <div className="pipeline-dialog-card pipeline-dialog-card-wide">
              <span>Forecast</span>
              <strong>
                <Link href="/app/forecast" className="pipeline-text-button">
                  Abrir forecast del workflow
                </Link>
              </strong>
            </div>
            {selectedWorkflow.stages.map((stage) => (
              <div key={stage.id} className="pipeline-dialog-card">
                <span>{stage.name}</span>
                <strong>
                  {getStageStatusLabel(stage.status)} · {stage.probability}%
                </strong>
              </div>
            ))}
            <div className="pipeline-dialog-card pipeline-dialog-card-wide">
              <span>Movimiento manual</span>
              <strong>Ya puedes mover deals entre columnas con la souris / drag and drop en el kanban.</strong>
            </div>
          </div>
        </PipelineDialog>
      ) : null}

      {dialogState?.type === "new-workflow" ? (
        <PipelineDialog
          eyebrow="Nuevo workflow"
          title="Crear workflow"
          description="La vista ya está preparada para sumar Kanban y futura vista Lista sin cambiar la arquitectura."
          onClose={() => setDialogState(null)}
        >
          <div className="pipeline-dialog-grid">
            <div className="pipeline-dialog-card">
              <span>Base prevista</span>
              <strong>Nombre, etapas, probabilidades, estado</strong>
            </div>
            <div className="pipeline-dialog-card">
              <span>Vista inicial</span>
              <strong>Kanban principal</strong>
            </div>
            <div className="pipeline-dialog-card pipeline-dialog-card-wide">
              <span>Disponibilidad</span>
              <strong>Próximamente se conecta la creación real de workflows reutilizando este layout.</strong>
            </div>
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

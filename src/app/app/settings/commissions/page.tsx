import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { getCommissionRulesData } from "@/lib/remax-app-data";
import { createAdminClient } from "@/utils/supabase/admin";

const DEAL_KIND_OPTIONS = [
  { value: "global", label: "Global (fallback)" },
  { value: "closing", label: "Closing (venta cerrada)" },
  { value: "sale", label: "Sale (captacion/venta)" },
  { value: "rental", label: "Rental (renta)" },
  { value: "cancellation", label: "Cancellation (cancelacion)" },
  { value: "listing", label: "Listing" }
];

function formatPercent(value: number | null) {
  if (typeof value !== "number") {
    return "Sin porcentaje";
  }

  return `${Math.round(value * 10000) / 100}%`;
}

async function saveCommissionRuleAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "").trim();
  const ruleCode = String(formData.get("ruleCode") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const dealKindInput = String(formData.get("dealKind") ?? "").trim();
  const percentInput = String(formData.get("defaultPercent") ?? "").trim();
  const isActive = String(formData.get("isActive") ?? "") === "on";

  if (!ruleCode || !name || !percentInput) {
    redirect("/app/settings/commissions?error=missing");
  }

  const parsedPercent = Number(percentInput);

  if (!Number.isFinite(parsedPercent) || parsedPercent < 0 || parsedPercent > 100) {
    redirect("/app/settings/commissions?error=percent");
  }

  const defaultPercent = parsedPercent / 100;
  const dealKind = dealKindInput.toLowerCase() === "global" ? null : dealKindInput.toLowerCase();
  const admin = createAdminClient();

  const payload = {
    rule_code: ruleCode.toLowerCase(),
    name,
    deal_kind: dealKind,
    default_percent: defaultPercent,
    is_active: isActive
  };

  if (id) {
    const updateResult = await admin.from("commission_rules").update(payload).eq("id", id);

    if (updateResult.error) {
      redirect(`/app/settings/commissions?error=${encodeURIComponent(updateResult.error.message)}`);
    }
  } else {
    const existing = await admin
      .from("commission_rules")
      .select("id")
      .eq("rule_code", payload.rule_code)
      .maybeSingle();

    if (existing.error) {
      redirect(`/app/settings/commissions?error=${encodeURIComponent(existing.error.message)}`);
    }

    if (existing.data?.id) {
      const updateResult = await admin.from("commission_rules").update(payload).eq("id", existing.data.id);

      if (updateResult.error) {
        redirect(`/app/settings/commissions?error=${encodeURIComponent(updateResult.error.message)}`);
      }
    } else {
      const insertResult = await admin.from("commission_rules").insert(payload);

      if (insertResult.error) {
        redirect(`/app/settings/commissions?error=${encodeURIComponent(insertResult.error.message)}`);
      }
    }
  }

  revalidatePath("/app/settings/commissions");
  revalidatePath("/app/commissions");
  redirect("/app/settings/commissions?saved=1");
}

export default async function SettingsCommissionsPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { summary, records } = await getCommissionRulesData();

  return (
    <div className="page-stack">
      <PageHeader
        title="Formula de comisiones"
        description="Configuracion real de reglas desde la tabla commission_rules. Este es el origen usado por el calculo operativo."
      />

      <DataOriginNotice
        title="Fuente real"
        description="Las tasas se leen desde Supabase en commission_rules. Si una regla no existe para un deal_kind, se aplica fallback tecnico."
      />

      <SectionCard
        title="Como funciona la formula"
        description="La comision se calcula con una regla por tipo de operacion."
      >
        <div className="list">
          <div className="list-item">
            <strong>Formula base</strong>
            <div className="muted mono">comision_bruta = valor_operacion × tasa(deal_kind)</div>
          </div>
          <div className="list-item">
            <strong>Prioridad de reglas</strong>
            <div className="muted">
              1) Busca regla activa exacta para el `deal kind` del deal. 2) Si no existe, usa `global`. 3) Si no hay `global`, aplica fallback tecnico.
            </div>
          </div>
          <div className="list-item">
            <strong>Ejemplo rapido</strong>
            <div className="muted">
              Si el deal es `closing` y el valor es `$1,000,000`, con tasa `6%` la comision bruta es `$60,000`.
            </div>
          </div>
        </div>
      </SectionCard>

      {params.saved ? <p className="helper-text">Regla guardada correctamente.</p> : null}
      {params.error ? <p className="auth-error">Error al guardar: {params.error}</p> : null}

      <div className="stats-grid">
        <StatCard label="Reglas" value={String(summary.totalRules)} detail="total cargadas" />
        <StatCard label="Activas" value={String(summary.activeRules)} detail="en uso" />
        <StatCard label="Cobertura" value={String(summary.dealKindCoverage)} detail="deal kinds con regla" />
      </div>

      <SectionCard title="Nueva regla" description="Crea o sobreescribe una regla por codigo.">
        <form action={saveCommissionRuleAction} className="form-grid">
          <label className="field">
            <span className="field-label">Codigo</span>
            <input name="ruleCode" placeholder="closing_standard" required />
          </label>
          <label className="field">
            <span className="field-label">Nombre</span>
            <input name="name" placeholder="Cierre estandar" required />
          </label>
          <label className="field">
            <span className="field-label">Deal kind</span>
            <select name="dealKind" defaultValue="global" required>
              {DEAL_KIND_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Porcentaje</span>
            <input name="defaultPercent" type="number" min="0" max="100" step="0.01" placeholder="6" required />
          </label>
          <label className="field" style={{ alignSelf: "end" }}>
            <span className="field-label">Activa</span>
            <input name="isActive" type="checkbox" defaultChecked style={{ minHeight: "auto" }} />
          </label>
          <div className="field" style={{ alignSelf: "end" }}>
            <button type="submit" className="button">
              Guardar regla
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard
        title="Reglas de calculo"
        description="Define el porcentaje por tipo de operacion. 'global' se usa como base si no hay regla especifica."
      >
        <DataTable
          rows={records}
          getRowId={(row) => row.id}
          emptyMessage="No hay reglas de comision cargadas."
          columns={[
            { key: "code", label: "Codigo", render: (row) => <span className="mono">{row.ruleCode}</span> },
            { key: "name", label: "Nombre", render: (row) => row.name },
            { key: "dealKind", label: "Deal kind", render: (row) => <StatusBadge value={row.dealKind} /> },
            { key: "rate", label: "Porcentaje", align: "right", render: (row) => formatPercent(row.defaultPercent) },
            {
              key: "status",
              label: "Estado",
              render: (row) => (
                <StatusBadge value={row.isActive ? "active" : "inactive"} tone={row.isActive ? "info" : "neutral"} />
              )
            }
          ]}
        />
      </SectionCard>

      {records.length > 0 ? (
        <SectionCard title="Editar reglas existentes" description="Actualiza porcentaje, deal kind o estado y guarda.">
          <div className="list">
            {records.map((row) => (
              <form key={row.id} action={saveCommissionRuleAction} className="form-grid list-item">
                <input type="hidden" name="id" value={row.id} />
                <label className="field">
                  <span className="field-label">Codigo</span>
                  <input name="ruleCode" defaultValue={row.ruleCode} required />
                </label>
                <label className="field">
                  <span className="field-label">Nombre</span>
                  <input name="name" defaultValue={row.name} required />
                </label>
                <label className="field">
                  <span className="field-label">Deal kind</span>
                  <select name="dealKind" defaultValue={row.dealKind} required>
                    {DEAL_KIND_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="field-label">Porcentaje</span>
                  <input
                    name="defaultPercent"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    defaultValue={typeof row.defaultPercent === "number" ? row.defaultPercent * 100 : 0}
                    required
                  />
                </label>
                <label className="field" style={{ alignSelf: "end" }}>
                  <span className="field-label">Activa</span>
                  <input name="isActive" type="checkbox" defaultChecked={row.isActive} style={{ minHeight: "auto" }} />
                </label>
                <div className="field" style={{ alignSelf: "end" }}>
                  <button type="submit" className="button-secondary">
                    Guardar cambios
                  </button>
                </div>
              </form>
            ))}
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}

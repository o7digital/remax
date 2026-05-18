import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency } from "@/lib/formatters";
import { getPropertyDirectoryData } from "@/lib/remax-app-data";
import { getDemoI18n } from "@/lib/server-i18n";
import { createAdminClient } from "@/utils/supabase/admin";

const STATUS_OPTIONS = ["draft", "active", "under_offer", "closed", "cancelled", "inactive", "archived"];
const BUSINESS_LINE_OPTIONS = ["residential", "commercial", "industrial", "land", "other"];
const OPERATION_OPTIONS = ["sale", "rent", "transfer", "other"];

function getText(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || null;
}

function getNumber(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

async function createPropertyAction(formData: FormData) {
  "use server";

  const propertyKey = String(formData.get("propertyKey") ?? "").trim().toUpperCase();
  const title = getText(formData, "title");
  const propertyStatus = String(formData.get("propertyStatus") ?? "draft").trim();
  const businessLine = getText(formData, "businessLine");
  const operationType = getText(formData, "operationType");
  const listPrice = getNumber(formData, "listPrice");
  const municipality = getText(formData, "municipality");
  const state = getText(formData, "state");
  const fullAddress = getText(formData, "fullAddress");
  const description = getText(formData, "description");

  if (!propertyKey || !title) {
    redirect("/app/properties?error=missing");
  }

  const admin = createAdminClient();
  const insertResult = await admin.from("properties").insert({
    property_key: propertyKey,
    title,
    description,
    property_status: propertyStatus,
    business_line: businessLine,
    operation_type: operationType,
    list_price: listPrice,
    currency_code: "MXN",
    municipality,
    state,
    full_address: fullAddress,
    country: "MX",
    source_primary: "manual_app"
  });

  if (insertResult.error) {
    redirect(`/app/properties?error=${encodeURIComponent(insertResult.error.message)}`);
  }

  revalidatePath("/app/properties");
  revalidatePath("/app/dashboard");
  redirect("/app/properties?saved=1");
}

export default async function PropertiesPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { txt } = await getDemoI18n();
  const { summary, records } = await getPropertyDirectoryData();

  return (
    <div className="page-stack">
      <PageHeader
        title="Propiedades"
        description="Inventario real migrado desde Access, con alta manual conectada a Supabase."
        actions={<a className="button button-secondary" href="#nueva-propiedad">Nueva propiedad</a>}
      />

      <DataOriginNotice
        title="Fuente real"
        description="Esta pantalla lee y escribe en la tabla properties. Es el primer bloque CRUD para validar la migracion contigo."
      />

      {params.saved ? <p className="helper-text">Propiedad creada correctamente.</p> : null}
      {params.error ? <p className="auth-error">Error al guardar: {params.error}</p> : null}

      <div className="stats-grid">
        <StatCard label="Propiedades" value={String(summary.totalProperties)} detail="inventario total" />
        <StatCard label="Activas" value={String(summary.activeProperties)} detail="cartera vigente" />
        <StatCard label="Cerradas" value={String(summary.closedProperties)} detail="historico consolidado" />
        <StatCard label="Borrador" value={String(summary.draftProperties)} detail="altas pendientes" />
      </div>

      <SectionCard
        title="Inventario de propiedades"
        description="Ultimas propiedades importadas o capturadas manualmente."
      >
        <DataTable
          rows={records}
          getRowId={(row) => row.id}
          emptyMessage="No hay propiedades."
          columns={[
            {
              key: "property",
              label: "Propiedad",
              render: (row) => (
                <div>
                  <strong>{row.propertyKey}</strong>
                  <div className="muted">{row.title}</div>
                </div>
              )
            },
            { key: "location", label: "Ubicacion", render: (row) => row.location },
            { key: "status", label: "Estado", render: (row) => <StatusBadge value={txt(row.propertyStatus)} /> },
            {
              key: "operation",
              label: "Operacion",
              render: (row) => [row.businessLine, row.operationType].filter(Boolean).join(" / ") || "Sin clasificar"
            },
            {
              key: "price",
              label: "Precio",
              align: "right",
              render: (row) => row.listPrice ? formatCurrency(row.listPrice, row.currencyCode, "es-MX") : "Sin precio"
            },
            { key: "owners", label: "Propietarios", align: "right", render: (row) => row.ownerCount }
          ]}
        />
      </SectionCard>

      <SectionCard
        title="Nueva propiedad"
        description="Captura minima para crear el registro base. Los bloques propietarios, valores, asesores y documentos se agregan en los siguientes lotes."
      >
        <form id="nueva-propiedad" action={createPropertyAction} className="form-grid">
          <label className="field">
            <span className="field-label">Clave propiedad</span>
            <input name="propertyKey" placeholder="RTV-2001" required />
          </label>
          <label className="field">
            <span className="field-label">Titulo</span>
            <input name="title" placeholder="Casa en Zapopan" required />
          </label>
          <label className="field">
            <span className="field-label">Estado</span>
            <select name="propertyStatus" defaultValue="draft">
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Linea</span>
            <select name="businessLine" defaultValue="residential">
              {BUSINESS_LINE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Operacion</span>
            <select name="operationType" defaultValue="sale">
              {OPERATION_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Precio lista</span>
            <input name="listPrice" type="number" min="0" step="0.01" placeholder="3500000" />
          </label>
          <label className="field">
            <span className="field-label">Municipio</span>
            <input name="municipality" placeholder="Zapopan" />
          </label>
          <label className="field">
            <span className="field-label">Estado</span>
            <input name="state" placeholder="Jalisco" />
          </label>
          <label className="field field-full">
            <span className="field-label">Direccion</span>
            <input name="fullAddress" placeholder="Calle, colonia, ciudad" />
          </label>
          <label className="field field-full">
            <span className="field-label">Descripcion</span>
            <textarea name="description" placeholder="Notas iniciales de captacion" />
          </label>
          <div className="field" style={{ alignSelf: "end" }}>
            <button type="submit" className="button">Crear propiedad</button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}

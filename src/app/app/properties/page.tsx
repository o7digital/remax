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
const CATEGORY_OPTIONS = ["exclusive", "option", "coop", "other"];
const BUSINESS_LINE_OPTIONS = ["residential", "commercial", "industrial", "land", "other"];
const OPERATION_OPTIONS = ["sale", "rent", "transfer", "other"];
const DOCUMENT_OPTIONS = [
  "Contrato firmado",
  "Identificacion propietario",
  "Escritura / titulo",
  "Predial",
  "Recibo agua",
  "Plano / croquis",
  "Fotografias",
  "Llaves"
];

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

function getDate(formData: FormData, key: string) {
  return getText(formData, key);
}

function getCheckboxValues(formData: FormData, key: string) {
  return formData.getAll(key).map((value) => String(value));
}

async function createPropertyAction(formData: FormData) {
  "use server";

  const propertyKey = String(formData.get("propertyKey") ?? "").trim().toUpperCase();
  const title = getText(formData, "title");
  const propertyStatus = String(formData.get("propertyStatus") ?? "draft").trim();
  const listingCategory = getText(formData, "listingCategory");
  const businessLine = getText(formData, "businessLine");
  const operationType = getText(formData, "operationType");
  const listPrice = getNumber(formData, "listPrice");
  const priceDate = getDate(formData, "priceDate");
  const currencyCode = String(formData.get("currencyCode") ?? "MXN").trim() || "MXN";
  const municipality = getText(formData, "municipality");
  const state = getText(formData, "state");
  const fullAddress = getText(formData, "fullAddress");
  const description = getText(formData, "description");
  const ownerName = getText(formData, "ownerName");
  const ownerEmail = getText(formData, "ownerEmail");
  const ownerPhone = getText(formData, "ownerPhone");
  const advisorName = getText(formData, "advisorName");
  const commissionPercent = getNumber(formData, "commissionPercent");

  if (!propertyKey || !title) {
    redirect("/app/properties?error=missing");
  }

  if (!ownerName || !ownerEmail || !ownerPhone) {
    redirect("/app/properties?error=owner");
  }

  const admin = createAdminClient();
  const insertResult = await admin.from("properties").insert({
    property_key: propertyKey,
    title,
    description,
    property_status: propertyStatus,
    listing_category: listingCategory,
    business_line: businessLine,
    operation_type: operationType,
    source_primary: getText(formData, "sourcePrimary"),
    contract_signed_on: getDate(formData, "contractSignedOn"),
    promotion_started_on: getDate(formData, "promotionStartedOn"),
    listed_on: getDate(formData, "listedOn"),
    list_price: listPrice,
    currency_code: currencyCode,
    municipality,
    state,
    full_address: fullAddress,
    lot_area_m2: getNumber(formData, "lotAreaM2"),
    construction_area_m2: getNumber(formData, "constructionAreaM2"),
    bedrooms: getNumber(formData, "bedrooms"),
    bathrooms: getNumber(formData, "bathrooms"),
    parking_spaces: getNumber(formData, "parkingSpaces"),
    land_shape: getText(formData, "landShape"),
    land_topography: getText(formData, "landTopography"),
    land_use: getText(formData, "landUse"),
    country: "MX"
  }).select("id").single();

  if (insertResult.error) {
    redirect(`/app/properties?error=${encodeURIComponent(insertResult.error.message)}`);
  }

  const propertyId = insertResult.data.id;

  const expedienteResult = await admin.from("property_alta_expedientes").insert({
    property_id: propertyId,
    process_version: "230426",
    received_on: getDate(formData, "expedienteReceivedOn"),
    expediente_status: getText(formData, "expedienteStatus"),
    registered_by: getText(formData, "registeredBy"),
    included_documents: getCheckboxValues(formData, "documents")
  });

  if (expedienteResult.error) {
    redirect(`/app/properties?error=${encodeURIComponent(expedienteResult.error.message)}`);
  }

  const conditionsResult = await admin.from("property_operation_conditions").insert({
    property_id: propertyId,
    commission_percent: commissionPercent,
    policy_type: getText(formData, "policyType"),
    minimum_amount_note: getText(formData, "minimumAmountNote"),
    rent_deposits: getNumber(formData, "rentDeposits"),
    rent_advance_months: getNumber(formData, "rentAdvanceMonths")
  });

  if (conditionsResult.error) {
    redirect(`/app/properties?error=${encodeURIComponent(conditionsResult.error.message)}`);
  }

  const technicalSheetResult = await admin.from("property_technical_sheets").insert({
    property_id: propertyId,
    sheet_type: getText(formData, "technicalSheetType") ?? "residential",
    land_area_m2: getNumber(formData, "lotAreaM2"),
    construction_area_m2: getNumber(formData, "constructionAreaM2"),
    bedrooms: getNumber(formData, "bedrooms"),
    bathrooms: getNumber(formData, "bathrooms"),
    parking_spaces: getNumber(formData, "parkingSpaces"),
    land_shape: getText(formData, "landShape"),
    land_topography: getText(formData, "landTopography"),
    land_use: getText(formData, "landUse"),
    facade_photo_url: getText(formData, "facadePhotoUrl"),
    croquis_url: getText(formData, "croquisUrl"),
    notes: description
  });

  if (technicalSheetResult.error) {
    redirect(`/app/properties?error=${encodeURIComponent(technicalSheetResult.error.message)}`);
  }

  if (listPrice) {
    const valueResult = await admin.from("property_values").insert({
      property_id: propertyId,
      valued_on: priceDate,
      price_amount: listPrice,
      currency_code: currencyCode,
      price_kind: "initial",
      notes: "Alta inicial desde formulario"
    });

    if (valueResult.error) {
      redirect(`/app/properties?error=${encodeURIComponent(valueResult.error.message)}`);
    }
  }

  const ownerResult = await admin.from("property_contacts").insert({
    property_id: propertyId,
    contact_kind: "owner",
    full_name: ownerName,
    email: ownerEmail,
    phone: ownerPhone,
    is_primary: true,
    sequence_number: 1
  });

  if (ownerResult.error) {
    redirect(`/app/properties?error=${encodeURIComponent(ownerResult.error.message)}`);
  }

  if (advisorName) {
    const dealResult = await admin.from("deals").insert({
      property_id: propertyId,
      deal_kind: "listing",
      status: "in_progress",
      title: `Alta ${propertyKey}`,
      signed_on: getDate(formData, "contractSignedOn"),
      notes: "Deal tecnico creado desde alta de propiedad",
      metadata: { commission_percent: commissionPercent }
    }).select("id").single();

    if (dealResult.error) {
      redirect(`/app/properties?error=${encodeURIComponent(dealResult.error.message)}`);
    }

    const participantResult = await admin.from("deal_participants").insert({
      deal_id: dealResult.data.id,
      participant_name: advisorName,
      participant_side: "listing",
      participant_role: "asesor_alta",
      participation_percent: getNumber(formData, "advisorParticipationPercent"),
      fixed_amount: getNumber(formData, "advisorFixedAmount"),
      notes: getText(formData, "advisorLevel")
    });

    if (participantResult.error) {
      redirect(`/app/properties?error=${encodeURIComponent(participantResult.error.message)}`);
    }

    const altaAdvisorResult = await admin.from("property_alta_advisors").insert({
      property_id: propertyId,
      deal_id: dealResult.data.id,
      advisor_name: advisorName,
      advisor_level: getText(formData, "advisorLevel"),
      participation_percent: getNumber(formData, "advisorParticipationPercent"),
      fixed_amount: getNumber(formData, "advisorFixedAmount")
    });

    if (altaAdvisorResult.error) {
      redirect(`/app/properties?error=${encodeURIComponent(altaAdvisorResult.error.message)}`);
    }
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
        title="Alta de propiedad"
        description="Flujo basado en el proceso Access: clave, expediente, caracteristicas, condiciones, valor, asesor alta, propietarios y ficha tecnica."
      >
        <form id="nueva-propiedad" action={createPropertyAction} className="form-grid">
          <div className="field field-full">
            <strong>1. Asignacion de clave</strong>
            <span className="muted">Categoria, giro, tipo y operacion son obligatorios en el alta original.</span>
          </div>
          <label className="field">
            <span className="field-label">Clave propiedad</span>
            <input name="propertyKey" placeholder="RTV-2001" required />
          </label>
          <label className="field">
            <span className="field-label">Categoria</span>
            <select name="listingCategory" defaultValue="option" required>
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Giro</span>
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

          <div className="field field-full">
            <strong>2. Expediente fisico</strong>
            <span className="muted">Documentos recibidos, fecha de entrega, estatus y usuario que registra el alta.</span>
          </div>
          <label className="field">
            <span className="field-label">Fecha expediente</span>
            <input name="expedienteReceivedOn" type="date" />
          </label>
          <label className="field">
            <span className="field-label">Estatus expediente</span>
            <select name="expedienteStatus" defaultValue="Activo">
              <option value="Activo">Activo</option>
              <option value="Destruido">Destruido</option>
              <option value="Muerto">Muerto</option>
            </select>
          </label>
          <label className="field">
            <span className="field-label">Registra alta</span>
            <input name="registeredBy" placeholder="Auxiliar administrativo" />
          </label>
          <div className="field field-full">
            <span className="field-label">Documentos incluidos</span>
            <div className="button-row">
              {DOCUMENT_OPTIONS.map((documentName) => (
                <label key={documentName} className="badge badge-neutral">
                  <input name="documents" type="checkbox" value={documentName} style={{ minHeight: "auto", width: "auto" }} />
                  {documentName}
                </label>
              ))}
            </div>
          </div>

          <div className="field field-full">
            <strong>3. Registro y caracteristicas</strong>
            <span className="muted">Origen, fechas comerciales, estatus activo y datos principales del inmueble.</span>
          </div>
          <label className="field">
            <span className="field-label">Titulo</span>
            <input name="title" placeholder="Casa en Zapopan" required />
          </label>
          <label className="field">
            <span className="field-label">Origen</span>
            <input name="sourcePrimary" placeholder="Referido, portal, asesor, oficina" />
          </label>
          <label className="field">
            <span className="field-label">Fecha contrato</span>
            <input name="contractSignedOn" type="date" />
          </label>
          <label className="field">
            <span className="field-label">Alta portales</span>
            <input name="promotionStartedOn" type="date" />
          </label>
          <label className="field">
            <span className="field-label">Fecha listado</span>
            <input name="listedOn" type="date" />
          </label>
          <label className="field">
            <span className="field-label">Estado propiedad</span>
            <select name="propertyStatus" defaultValue="active">
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Municipio</span>
            <input name="municipality" placeholder="Zapopan" />
          </label>
          <label className="field">
            <span className="field-label">Estado</span>
            <input name="state" placeholder="Jalisco" />
          </label>
          <label className="field">
            <span className="field-label">Terreno m2</span>
            <input name="lotAreaM2" type="number" min="0" step="0.01" />
          </label>
          <label className="field">
            <span className="field-label">Construccion m2</span>
            <input name="constructionAreaM2" type="number" min="0" step="0.01" />
          </label>
          <label className="field field-full">
            <span className="field-label">Direccion</span>
            <input name="fullAddress" placeholder="Calle, colonia, ciudad" />
          </label>

          <div className="field field-full">
            <strong>4. Condiciones de operacion</strong>
            <span className="muted">Comision, politica vigente o antigua, monto minimo y condiciones de renta si aplica.</span>
          </div>
          <label className="field">
            <span className="field-label">% comision</span>
            <input name="commissionPercent" type="number" min="0" max="100" step="0.01" placeholder="6" />
          </label>
          <label className="field">
            <span className="field-label">Politica</span>
            <select name="policyType" defaultValue="actual">
              <option value="actual">Politica actual</option>
              <option value="antigua">Politica antigua</option>
              <option value="excepcion">Excepcion / monto minimo</option>
            </select>
          </label>
          <label className="field">
            <span className="field-label">Depositos renta</span>
            <input name="rentDeposits" type="number" min="0" step="1" />
          </label>
          <label className="field">
            <span className="field-label">Rentas adelantadas</span>
            <input name="rentAdvanceMonths" type="number" min="0" step="1" />
          </label>
          <label className="field field-full">
            <span className="field-label">Nota monto minimo / politica</span>
            <input name="minimumAmountNote" placeholder="Aclaracion operativa" />
          </label>

          <div className="field field-full">
            <strong>5. Valor de propiedad</strong>
            <span className="muted">Precio inicial con fecha y moneda. Queda historizado en property_values.</span>
          </div>
          <label className="field">
            <span className="field-label">Precio lista</span>
            <input name="listPrice" type="number" min="0" step="0.01" placeholder="3500000" />
          </label>
          <label className="field">
            <span className="field-label">Fecha precio</span>
            <input name="priceDate" type="date" />
          </label>
          <label className="field">
            <span className="field-label">Moneda</span>
            <select name="currencyCode" defaultValue="MXN">
              <option value="MXN">MXN</option>
              <option value="USD">USD</option>
            </select>
          </label>

          <div className="field field-full">
            <strong>6. Asesor de alta</strong>
            <span className="muted">Permite capturar participacion por porcentaje o monto acordado.</span>
          </div>
          <label className="field">
            <span className="field-label">Asesor</span>
            <input name="advisorName" placeholder="Nombre asesor" />
          </label>
          <label className="field">
            <span className="field-label">Nivel asesor</span>
            <input name="advisorLevel" placeholder="A, M, Staff" />
          </label>
          <label className="field">
            <span className="field-label">% participacion</span>
            <input name="advisorParticipationPercent" type="number" min="0" max="100" step="0.01" />
          </label>
          <label className="field">
            <span className="field-label">Monto fijo</span>
            <input name="advisorFixedAmount" type="number" min="0" step="0.01" />
          </label>

          <div className="field field-full">
            <strong>7. Registro propietario</strong>
            <span className="muted">Nombre, correo y telefono son obligatorios como en el proceso original.</span>
          </div>
          <label className="field">
            <span className="field-label">Propietario principal</span>
            <input name="ownerName" placeholder="Nombre completo" required />
          </label>
          <label className="field">
            <span className="field-label">Correo propietario</span>
            <input name="ownerEmail" type="email" placeholder="propietario@correo.com" required />
          </label>
          <label className="field">
            <span className="field-label">Telefono propietario</span>
            <input name="ownerPhone" placeholder="+52..." required />
          </label>

          <div className="field field-full">
            <strong>8. Ficha tecnica</strong>
            <span className="muted">Residencial, comercial o industrial; foto fachada y croquis quedan como URL temporal.</span>
          </div>
          <label className="field">
            <span className="field-label">Tipo ficha</span>
            <select name="technicalSheetType" defaultValue="residential">
              <option value="residential">Residencial</option>
              <option value="commercial">Comercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </label>
          <label className="field">
            <span className="field-label">Recamaras</span>
            <input name="bedrooms" type="number" min="0" step="1" />
          </label>
          <label className="field">
            <span className="field-label">Banos</span>
            <input name="bathrooms" type="number" min="0" step="1" />
          </label>
          <label className="field">
            <span className="field-label">Estacionamientos</span>
            <input name="parkingSpaces" type="number" min="0" step="1" />
          </label>
          <label className="field">
            <span className="field-label">Forma terreno</span>
            <input name="landShape" />
          </label>
          <label className="field">
            <span className="field-label">Topografia</span>
            <input name="landTopography" />
          </label>
          <label className="field">
            <span className="field-label">Uso suelo</span>
            <input name="landUse" />
          </label>
          <label className="field">
            <span className="field-label">Foto fachada URL</span>
            <input name="facadePhotoUrl" type="url" />
          </label>
          <label className="field">
            <span className="field-label">Croquis URL</span>
            <input name="croquisUrl" type="url" />
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

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { PropertyCreateForm } from "@/components/property-create-form";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency } from "@/lib/formatters";
import { getPropertyDirectoryData, getPropertyFormReferenceData } from "@/lib/remax-app-data";
import { getDemoI18n } from "@/lib/server-i18n";
import { createAdminClient } from "@/utils/supabase/admin";

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
  const [{ summary, records }, formReferences] = await Promise.all([
    getPropertyDirectoryData(),
    getPropertyFormReferenceData()
  ]);

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
        <PropertyCreateForm
          action={createPropertyAction}
          locations={formReferences.locations}
          advisors={formReferences.advisors}
        />
      </SectionCard>
    </div>
  );
}

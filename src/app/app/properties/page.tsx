import Link from "next/link";
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
import { createProperty } from "@/lib/remax-app-mutations";
import { getPropertyDirectoryData, getPropertyFormReferenceData } from "@/lib/remax-app-data";
import { getDemoI18n } from "@/lib/server-i18n";
import { getAuthenticatedUserEmail } from "@/lib/auth";
import { getRoleForEmail } from "@/lib/access-control";

const emptyPropertyDirectoryData = {
  summary: {
    totalProperties: 0,
    activeProperties: 0,
    closedProperties: 0,
    draftProperties: 0
  },
  records: []
};

const emptyPropertyFormReferenceData = {
  locations: [],
  advisors: [],
  auxiliaries: []
};

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

  try {
    await createProperty({
      propertyKey,
      title,
      description,
      propertyStatus,
      listingCategory,
      businessLine,
      operationType,
      sourcePrimary: getText(formData, "sourcePrimary"),
      contractSignedOn: getDate(formData, "contractSignedOn"),
      promotionStartedOn: getDate(formData, "promotionStartedOn"),
      listedOn: getDate(formData, "listedOn"),
      listPrice,
      priceDate,
      currencyCode,
      municipality,
      state,
      fullAddress,
      lotAreaM2: getNumber(formData, "lotAreaM2"),
      constructionAreaM2: getNumber(formData, "constructionAreaM2"),
      bedrooms: getNumber(formData, "bedrooms"),
      bathrooms: getNumber(formData, "bathrooms"),
      parkingSpaces: getNumber(formData, "parkingSpaces"),
      landShape: getText(formData, "landShape"),
      landTopography: getText(formData, "landTopography"),
      landUse: getText(formData, "landUse"),
      expedienteReceivedOn: getDate(formData, "expedienteReceivedOn"),
      expedienteStatus: getText(formData, "expedienteStatus"),
      registeredBy: getText(formData, "registeredBy"),
      documents: getCheckboxValues(formData, "documents"),
      commissionPercent,
      policyType: getText(formData, "policyType"),
      minimumAmountNote: getText(formData, "minimumAmountNote"),
      rentDeposits: getNumber(formData, "rentDeposits"),
      rentAdvanceMonths: getNumber(formData, "rentAdvanceMonths"),
      technicalSheetType: getText(formData, "technicalSheetType") ?? "residential",
      facadePhotoUrl: getText(formData, "facadePhotoUrl"),
      croquisUrl: getText(formData, "croquisUrl"),
      ownerName,
      ownerEmail,
      ownerPhone,
      advisorName,
      advisorParticipationPercent: getNumber(formData, "advisorParticipationPercent"),
      advisorFixedAmount: getNumber(formData, "advisorFixedAmount"),
      advisorLevel: getText(formData, "advisorLevel")
    });
  } catch (error) {
    console.error("Failed to create property in Railway Postgres", error);
    redirect("/app/properties?error=database");
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
  const email = await getAuthenticatedUserEmail();
  const role = getRoleForEmail(email);
  const [{ summary, records }, formReferences] = await Promise.all([
    getPropertyDirectoryData(role === "asesor" ? { advisorEmail: email } : undefined).catch((error: unknown) => {
      console.error("Unable to load property directory data", error);
      return emptyPropertyDirectoryData;
    }),
    getPropertyFormReferenceData().catch((error: unknown) => {
      console.error("Unable to load property form reference data", error);
      return emptyPropertyFormReferenceData;
    })
  ]);

  return (
    <div className="page-stack">
      <PageHeader
        title="Propiedades"
        description={role === "asesor" ? "Tus propiedades asignadas como asesor." : "Inventario real migrado desde Access, con alta manual conectada a Railway/Postgres."}
        actions={role === "asesor" ? undefined : <a className="button button-secondary" href="#nueva-propiedad">Nueva propiedad</a>}
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
            { key: "owners", label: "Propietarios", align: "right", render: (row) => row.ownerCount },
            {
              key: "detail",
              label: "Detalle",
              render: (row) => (
                <Link href={`/app/properties/${row.id}`} className="button button-secondary">
                  Ver detalle
                </Link>
              )
            }
          ]}
        />
      </SectionCard>

      {role === "asesor" ? null : (
        <SectionCard
          title="Alta de propiedad"
          description="Flujo basado en el proceso Access: clave, expediente, caracteristicas, condiciones, valor, asesor alta, propietarios y ficha tecnica."
        >
          <PropertyCreateForm
            action={createPropertyAction}
            locations={formReferences.locations}
            advisors={formReferences.advisors}
            auxiliaries={formReferences.auxiliaries}
          />
        </SectionCard>
      )}
    </div>
  );
}

import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DataOriginNotice } from "@/components/data-origin-notice";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/formatters";
import { getStaffAccessFormData } from "@/lib/remax-app-data";
import { createAdminClient } from "@/utils/supabase/admin";

function getText(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || null;
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

async function createStaffRecordAction(formData: FormData) {
  "use server";

  const formType = String(formData.get("formType") ?? "asesor");
  const staffKind = formType === "staff" ? "admin" : "advisor";
  const advisorClass = formType === "staff" ? "staff" : String(formData.get("advisorClass") ?? "M");
  const firstName = getText(formData, "firstName");
  const paternalLastName = getText(formData, "paternalLastName");
  const maternalLastName = getText(formData, "maternalLastName");
  const fullName = getText(formData, "fullName");
  const displayName =
    fullName ??
    [firstName, paternalLastName, maternalLastName].filter(Boolean).join(" ").trim();

  if (!displayName) {
    redirect("/app/settings/staff-records?error=missing-name");
  }

  const admin = createAdminClient();
  const staffResult = await admin
    .from("staff_members")
    .insert({
      first_name: firstName,
      last_name: [paternalLastName, maternalLastName].filter(Boolean).join(" ").trim() || null,
      display_name: displayName,
      legacy_full_name: fullName,
      staff_kind: staffKind,
      advisor_class: advisorClass,
      employment_status: getText(formData, "employmentStatus") ?? "active",
      is_guard_eligible: getBoolean(formData, "isGuardEligible"),
      tax_id: getText(formData, "taxId"),
      tax_regime: getBoolean(formData, "isResico") ? "RESICO" : null,
      bank_name: getText(formData, "bankName"),
      bank_account: getText(formData, "bankAccount"),
      bank_clabe: getText(formData, "bankClabe"),
      mobile_phone: getText(formData, "mobilePhone"),
      office_phone: getText(formData, "officePhone"),
      personal_email: getText(formData, "personalEmail"),
      work_email: getText(formData, "workEmail"),
      address_line_1: [getText(formData, "street"), getText(formData, "exteriorNumber"), getText(formData, "interiorNumber")]
        .filter(Boolean)
        .join(" ") || null,
      neighborhood: getText(formData, "neighborhood") ?? getText(formData, "subdivision"),
      city: getText(formData, "municipality"),
      state: getText(formData, "state"),
      postal_code: getText(formData, "postalCode"),
      country: "MX",
      joined_on: getText(formData, "joinedOn"),
      first_joined_on: getText(formData, "firstJoinedOn"),
      left_on: getText(formData, "leftOn"),
      notes: getText(formData, "notes"),
      metadata: {
        access_form: formType === "staff" ? "F-Staff" : "F-Asesores",
        alias: getText(formData, "alias"),
        home_phone: getText(formData, "homePhone"),
        building: getText(formData, "building"),
        floor: getText(formData, "floor"),
        birth_city: getText(formData, "birthCity"),
        birth_country: getText(formData, "birthCountry")
      }
    })
    .select("id")
    .single();

  if (staffResult.error) {
    redirect(`/app/settings/staff-records?error=${encodeURIComponent(staffResult.error.message)}`);
  }

  const staffMemberId = staffResult.data.id;
  const fiscalResult = await admin.from("staff_fiscal_profiles").insert({
    staff_member_id: staffMemberId,
    legal_name: getText(formData, "legalName"),
    tax_id: getText(formData, "taxId"),
    fiscal_street: getText(formData, "fiscalStreet"),
    fiscal_exterior_number: getText(formData, "fiscalExteriorNumber"),
    fiscal_neighborhood: getText(formData, "fiscalNeighborhood"),
    fiscal_postal_code: getText(formData, "fiscalPostalCode"),
    fiscal_email: getText(formData, "fiscalEmail"),
    bank_name: getText(formData, "bankName"),
    bank_account: getText(formData, "bankAccount"),
    bank_clabe: getText(formData, "bankClabe"),
    bank_branch_number: getText(formData, "bankBranchNumber"),
    is_resico: getBoolean(formData, "isResico")
  });

  if (fiscalResult.error) {
    redirect(`/app/settings/staff-records?error=${encodeURIComponent(fiscalResult.error.message)}`);
  }

  const personalResult = await admin.from("staff_personal_profiles").insert({
    staff_member_id: staffMemberId,
    birth_date: getText(formData, "birthDate"),
    birth_city: getText(formData, "birthCity"),
    birth_country: getText(formData, "birthCountry"),
    education_level: getText(formData, "educationLevel"),
    language_1: getText(formData, "language1"),
    language_2: getText(formData, "language2"),
    emergency_contact_name: getText(formData, "emergencyContactName"),
    emergency_contact_phone: getText(formData, "emergencyContactPhone"),
    emergency_contact_relationship: getText(formData, "emergencyRelationship"),
    imss_number: getText(formData, "imssNumber"),
    medical_insurance: getText(formData, "medicalInsurance"),
    blood_type: getText(formData, "bloodType"),
    medical_conditions: getText(formData, "medicalConditions"),
    allergies: getText(formData, "allergies")
  });

  if (personalResult.error) {
    redirect(`/app/settings/staff-records?error=${encodeURIComponent(personalResult.error.message)}`);
  }

  const remaxResult = await admin.from("staff_remax_accounts").insert({
    staff_member_id: staffMemberId,
    sir_joined_on: getText(formData, "sirJoinedOn"),
    sir_user: getText(formData, "sirUser"),
    sir_last_login_on: getText(formData, "sirLastLoginOn"),
    easy_broker_last_login_on: getText(formData, "easyBrokerLastLoginOn"),
    remax_mexico_id: getText(formData, "remaxMexicoId"),
    remax_mexico_status: getText(formData, "remaxMexicoStatus"),
    remax_international_id: getText(formData, "remaxInternationalId"),
    remax_international_user: getText(formData, "remaxInternationalUser"),
    remax_international_status: getText(formData, "remaxInternationalStatus"),
    university_user: getText(formData, "universityUser"),
    university_status: getText(formData, "universityStatus"),
    ampi_id: getText(formData, "ampiId"),
    ampi_user: getText(formData, "ampiUser"),
    ampi_status: getText(formData, "ampiStatus"),
    advisor_profile: getText(formData, "advisorProfile"),
    advisor_or_staff: formType === "staff" ? "Staff" : "Asesor",
    other_associations: getText(formData, "otherAssociations"),
    is_high_performance: getBoolean(formData, "isHighPerformance"),
    level_changed_on: getText(formData, "levelChangedOn"),
    rejoined_on: getText(formData, "rejoinedOn"),
    separation_reason: getText(formData, "separationReason")
  });

  if (remaxResult.error) {
    redirect(`/app/settings/staff-records?error=${encodeURIComponent(remaxResult.error.message)}`);
  }

  revalidatePath("/app/settings/staff-records");
  revalidatePath("/app/settings/users");
  redirect("/app/settings/staff-records?saved=1");
}

function StaffCaptureForm({ type }: { type: "asesor" | "staff" }) {
  const isStaff = type === "staff";

  return (
    <form id={isStaff ? "nuevo-f-staff" : "nuevo-f-asesores"} action={createStaffRecordAction} className="form-grid">
      <input type="hidden" name="formType" value={type} />

      <div className="field field-full">
        <strong>{isStaff ? "F-Staff - Registro de miembros del Staff" : "F-Asesores - Registro de asesores internos"}</strong>
        <span className="muted">INF. GRAL.</span>
      </div>
      <label className="field">
        <span className="field-label">Nombre</span>
        <input name="firstName" required />
      </label>
      <label className="field">
        <span className="field-label">Paterno</span>
        <input name="paternalLastName" />
      </label>
      <label className="field">
        <span className="field-label">Materno</span>
        <input name="maternalLastName" />
      </label>
      <label className="field">
        <span className="field-label">Alias</span>
        <input name="alias" />
      </label>
      <label className="field field-full">
        <span className="field-label">Nombre completo</span>
        <input name="fullName" />
      </label>
      {!isStaff ? (
        <label className="field">
          <span className="field-label">Categoria A / N</span>
          <select name="advisorClass" defaultValue="M">
            <option value="A">A</option>
            <option value="M">N / M</option>
          </select>
        </label>
      ) : null}
      <label className="field">
        <span className="field-label">Activo / Inactivo</span>
        <select name="employmentStatus" defaultValue="active">
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
          <option value="suspended">Suspendido</option>
        </select>
      </label>
      <label className="field">
        <span className="field-label">Prog guardias</span>
        <span className="badge badge-neutral">
          <input name="isGuardEligible" type="checkbox" style={{ minHeight: "auto", width: "auto" }} />
          Incluido
        </span>
      </label>
      <label className="field">
        <span className="field-label">Movil</span>
        <input name="mobilePhone" />
      </label>
      <label className="field">
        <span className="field-label">Tel Oficina</span>
        <input name="officePhone" />
      </label>
      <label className="field">
        <span className="field-label">Tel Casa</span>
        <input name="homePhone" />
      </label>
      <label className="field">
        <span className="field-label">Correo Remax Activa</span>
        <input name="workEmail" type="email" />
      </label>
      <label className="field">
        <span className="field-label">Correo Personal</span>
        <input name="personalEmail" type="email" />
      </label>
      <label className="field">
        <span className="field-label">Calle</span>
        <input name="street" />
      </label>
      <label className="field">
        <span className="field-label">No. Ext.</span>
        <input name="exteriorNumber" />
      </label>
      <label className="field">
        <span className="field-label">No. Int.</span>
        <input name="interiorNumber" />
      </label>
      <label className="field">
        <span className="field-label">Colonia</span>
        <input name="neighborhood" />
      </label>
      <label className="field">
        <span className="field-label">Fraccionamiento</span>
        <input name="subdivision" />
      </label>
      <label className="field">
        <span className="field-label">Municipio</span>
        <input name="municipality" />
      </label>
      <label className="field">
        <span className="field-label">C. P.</span>
        <input name="postalCode" />
      </label>
      <label className="field">
        <span className="field-label">Entidad</span>
        <input name="state" />
      </label>
      <label className="field">
        <span className="field-label">Fecha Nacimiento</span>
        <input name="birthDate" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Ciudad nacimiento</span>
        <input name="birthCity" />
      </label>
      <label className="field">
        <span className="field-label">Pais nacimiento</span>
        <input name="birthCountry" />
      </label>

      <div className="field field-full">
        <strong>INF. FISCAL</strong>
      </div>
      <label className="field">
        <span className="field-label">Razon Social</span>
        <input name="legalName" />
      </label>
      <label className="field">
        <span className="field-label">RFC</span>
        <input name="taxId" />
      </label>
      <label className="field">
        <span className="field-label">Calle fiscal</span>
        <input name="fiscalStreet" />
      </label>
      <label className="field">
        <span className="field-label">No. Ext</span>
        <input name="fiscalExteriorNumber" />
      </label>
      <label className="field">
        <span className="field-label">Colonia fiscal</span>
        <input name="fiscalNeighborhood" />
      </label>
      <label className="field">
        <span className="field-label">C. P. fiscal</span>
        <input name="fiscalPostalCode" />
      </label>
      <label className="field">
        <span className="field-label">Correo electronico fiscal</span>
        <input name="fiscalEmail" type="email" />
      </label>
      <label className="field">
        <span className="field-label">Banco</span>
        <input name="bankName" />
      </label>
      <label className="field">
        <span className="field-label">No. Cuenta</span>
        <input name="bankAccount" />
      </label>
      <label className="field">
        <span className="field-label">CLABE</span>
        <input name="bankClabe" />
      </label>
      <label className="field">
        <span className="field-label">No. Sucursal</span>
        <input name="bankBranchNumber" />
      </label>
      <label className="field">
        <span className="field-label">RESICO</span>
        <span className="badge badge-neutral">
          <input name="isResico" type="checkbox" style={{ minHeight: "auto", width: "auto" }} />
          Si
        </span>
      </label>

      <div className="field field-full">
        <strong>INF. PERSONAL</strong>
      </div>
      <label className="field">
        <span className="field-label">Nombre contacto emergencia</span>
        <input name="emergencyContactName" />
      </label>
      <label className="field">
        <span className="field-label">Tel contacto emergencia</span>
        <input name="emergencyContactPhone" />
      </label>
      <label className="field">
        <span className="field-label">Parentesco</span>
        <input name="emergencyRelationship" />
      </label>
      <label className="field">
        <span className="field-label">No. IMSS</span>
        <input name="imssNumber" />
      </label>
      <label className="field">
        <span className="field-label">SGMM</span>
        <input name="medicalInsurance" />
      </label>
      <label className="field">
        <span className="field-label">Tipo Sangre</span>
        <input name="bloodType" />
      </label>
      <label className="field field-full">
        <span className="field-label">Enfermedades</span>
        <textarea name="medicalConditions" />
      </label>
      <label className="field field-full">
        <span className="field-label">Alergias</span>
        <textarea name="allergies" />
      </label>

      <div className="field field-full">
        <strong>INF. SOCIO REMAX</strong>
      </div>
      <label className="field">
        <span className="field-label">Fecha Ingreso Remax Activa</span>
        <input name="joinedOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Fecha 1er Ingreso</span>
        <input name="firstJoinedOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Fecha Separacion</span>
        <input name="leftOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Motivo Separacion</span>
        <input name="separationReason" />
      </label>
      <label className="field">
        <span className="field-label">Fecha Reingreso</span>
        <input name="rejoinedOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Fecha cambio Nivel</span>
        <input name="levelChangedOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Nivel Estudios</span>
        <input name="educationLevel" />
      </label>
      <label className="field">
        <span className="field-label">Idioma 1</span>
        <input name="language1" />
      </label>
      <label className="field">
        <span className="field-label">Idioma 2</span>
        <input name="language2" />
      </label>
      <label className="field">
        <span className="field-label">Fecha Ingreso SIR</span>
        <input name="sirJoinedOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Usuario SIR</span>
        <input name="sirUser" />
      </label>
      <label className="field">
        <span className="field-label">Ultimo Ingreso SIR</span>
        <input name="sirLastLoginOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">Ultimo Ingreso Easy Broker</span>
        <input name="easyBrokerLastLoginOn" type="date" />
      </label>
      <label className="field">
        <span className="field-label">ID Remax Mexico</span>
        <input name="remaxMexicoId" />
      </label>
      <label className="field">
        <span className="field-label">Status Remax Mexico</span>
        <input name="remaxMexicoStatus" />
      </label>
      <label className="field">
        <span className="field-label">ID Internacional</span>
        <input name="remaxInternationalId" />
      </label>
      <label className="field">
        <span className="field-label">Usuario Remax Int</span>
        <input name="remaxInternationalUser" />
      </label>
      <label className="field">
        <span className="field-label">Status Remax Int</span>
        <input name="remaxInternationalStatus" />
      </label>
      <label className="field">
        <span className="field-label">Usuario Universidad</span>
        <input name="universityUser" />
      </label>
      <label className="field">
        <span className="field-label">Estatus Universidad</span>
        <input name="universityStatus" />
      </label>
      <label className="field">
        <span className="field-label">ID AMPI</span>
        <input name="ampiId" />
      </label>
      <label className="field">
        <span className="field-label">Usuario AMPI</span>
        <input name="ampiUser" />
      </label>
      <label className="field">
        <span className="field-label">Estatus AMPI</span>
        <input name="ampiStatus" />
      </label>
      <label className="field">
        <span className="field-label">Asesor, Afiliado, Socio</span>
        <input name="advisorProfile" />
      </label>
      <label className="field">
        <span className="field-label">Otras Asociaciones</span>
        <input name="otherAssociations" />
      </label>
      <label className="field">
        <span className="field-label">Nivel AD</span>
        <span className="badge badge-neutral">
          <input name="isHighPerformance" type="checkbox" style={{ minHeight: "auto", width: "auto" }} />
          Alto desempeno
        </span>
      </label>
      <label className="field field-full">
        <span className="field-label">Comentarios</span>
        <textarea name="notes" />
      </label>

      <div className="field field-full">
        <button type="submit" className="button">
          {isStaff ? "Guardar F-Staff" : "Guardar F-Asesores"}
        </button>
      </div>
    </form>
  );
}

export default async function StaffRecordsPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { summary, records } = await getStaffAccessFormData();
  const formModules = [
    {
      name: "F-Asesores",
      title: "Registro de asesores internos",
      detail: "INF. GRAL. + INF. FISCAL + INF. PERSONAL + INF. SOCIO REMAX",
      table: "staff_members + staff_fiscal_profiles + staff_personal_profiles + staff_remax_accounts"
    },
    {
      name: "F-Staff",
      title: "Registro de miembros del Staff",
      detail: "INF. GRAL. + INF. FISCAL + INF. PERSONAL + INF. SOCIO REMAX",
      table: "staff_members + staff_fiscal_profiles + staff_personal_profiles + staff_remax_accounts"
    },
    {
      name: "F-Asesores - parte inferior",
      title: "Socio REMAX / SIR / AMPI / Universidad",
      detail: "Fecha ingreso SIR, ID Remax Mexico, Remax Int, Universidad, AMPI, estatus y comentarios",
      table: "staff_remax_accounts"
    }
  ];

  return (
    <div className="page-stack">
      <PageHeader
        title="F-Asesores / F-Staff"
        description="Pantallas de captura migradas desde Access: Registro de asesores internos, Registro de miembros del Staff y bloque Socio REMAX."
        actions={
          <div className="button-row">
            <a href="#nuevo-f-asesores" className="button">
              Nuevo F-Asesores
            </a>
            <a href="#nuevo-f-staff" className="button">
              Nuevo F-Staff
            </a>
            <Link href="/app/settings/users" className="button">
              Directorio
            </Link>
            <Link href="/app/settings" className="button button-secondary">
              Settings
            </Link>
          </div>
        }
      />

      <DataOriginNotice
        title="Nombres originales Access visibles"
        description="Los formularios que pasaste quedan identificados aqui por su nombre original. Abajo se ve la tabla consolidada conectada a Railway/Postgres."
      />

      {params.saved ? <p className="helper-text">Formulario guardado correctamente.</p> : null}
      {params.error ? <p className="auth-error">Error al guardar: {params.error}</p> : null}

      <SectionCard
        title="Formularios Access migrados"
        description="Estos son los modulos de captura que corresponden directamente a tus capturas."
      >
        <DataTable
          rows={formModules}
          getRowId={(row) => row.name}
          emptyMessage="No hay formularios configurados."
          columns={[
            {
              key: "form",
              label: "Formulario Access",
              render: (row) => (
                <div>
                  <strong>{row.name}</strong>
                  <div className="muted">{row.title}</div>
                </div>
              )
            },
            { key: "blocks", label: "Bloques de saisie", render: (row) => row.detail },
            { key: "tables", label: "Tables Railway/Postgres", render: (row) => <span className="mono">{row.table}</span> }
          ]}
        />
      </SectionCard>

      <div className="stats-grid">
        <StatCard label="F-Asesores / F-Staff" value={String(summary.totalStaff)} detail="staff_members" />
        <StatCard label="INF. FISCAL" value={String(summary.fiscalProfiles)} detail="staff_fiscal_profiles" />
        <StatCard label="INF. PERSONAL" value={String(summary.personalProfiles)} detail="staff_personal_profiles" />
        <StatCard label="INF. SOCIO REMAX" value={String(summary.remaxAccounts)} detail="staff_remax_accounts" />
      </div>

      <div className="stats-grid">
        <StatCard label="RESICO" value={String(summary.resicoCount)} detail="marcados en Access" />
        <StatCard label="AMPI" value={String(summary.ampiCount)} detail="asociaciones detectadas" />
      </div>

      <SectionCard
        title="Nuevo F-Asesores"
        description="Captura operativa del formulario Registro de asesores internos."
      >
        <StaffCaptureForm type="asesor" />
      </SectionCard>

      <SectionCard
        title="Nuevo F-Staff"
        description="Captura operativa del formulario Registro de miembros del Staff."
      >
        <StaffCaptureForm type="staff" />
      </SectionCard>

      <SectionCard
        title="F-Asesores / F-Staff - registros importados"
        description="Vista consolidada de los bloques INF. FISCAL, INF. PERSONAL et INF. SOCIO REMAX conectados por staff_member_id."
      >
        <DataTable
          rows={records}
          getRowId={(row) => row.id}
          emptyMessage="No hay expedientes staff importados."
          columns={[
            {
              key: "staff",
              label: "Staff",
              render: (row) => (
                <div>
                  <strong>{row.displayName}</strong>
                  <div className="muted">{row.roleLabel}</div>
                </div>
              )
            },
            { key: "status", label: "Estado", render: (row) => <StatusBadge value={row.employmentStatus} /> },
            {
              key: "fiscal",
              label: "Fiscal",
              render: (row) => (
                <div>
                  <strong>{row.taxId ?? "Sin RFC"}</strong>
                  <div className="muted">{row.fiscalEmail ?? row.bankLabel}</div>
                </div>
              )
            },
            { key: "bank", label: "Banco", render: (row) => row.bankLabel },
            {
              key: "personal",
              label: "Personal",
              render: (row) => (
                <div>
                  <strong>{row.emergencyContact}</strong>
                  <div className="muted">{row.medicalLabel}</div>
                </div>
              )
            },
            {
              key: "systems",
              label: "Sistemas",
              render: (row) => (
                <div>
                  <strong>{row.sirUser ?? "Sin SIR"}</strong>
                  <div className="muted">{row.remaxMexico}</div>
                </div>
              )
            },
            { key: "ampi", label: "AMPI", render: (row) => row.ampi },
            { key: "profile", label: "Perfil", render: (row) => row.profile },
            {
              key: "dates",
              label: "Fechas",
              render: (row) => (
                <div>
                  <strong>{row.joinedOn ? formatDate(row.joinedOn, "es-MX") : "Sin alta"}</strong>
                  <div className="muted">{row.rejoinedOn ? `Reingreso ${formatDate(row.rejoinedOn, "es-MX")}` : "Sin reingreso"}</div>
                </div>
              )
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}

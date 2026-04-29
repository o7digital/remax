import Link from "next/link";
import { redirect } from "next/navigation";

import { AccessSection } from "@/remax-demo/components/access-section";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { getRemaxLanguage } from "@/remax-demo/get-language";
import { createAdminClient } from "@/utils/supabase/admin";

type StaffMember = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string;
  staff_kind: "advisor" | "manager" | "admin" | "reception";
  advisor_class: "A" | "M" | "staff";
  employment_status: "active" | "inactive" | "suspended" | "archived";
  mobile_phone: string | null;
  office_phone: string | null;
  personal_email: string | null;
  work_email: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  tax_id: string | null;
  bank_name: string | null;
  bank_account: string | null;
  bank_clabe: string | null;
  joined_on: string | null;
  left_on: string | null;
  metadata: Record<string, unknown> | null;
};

function asString(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

async function saveAdvisorAction(formData: FormData) {
  "use server";

  const admin = createAdminClient();
  const id = asString(formData.get("id"));
  const nombre = asString(formData.get("nombre"));
  const paterno = asString(formData.get("paterno"));
  const materno = asString(formData.get("materno"));
  const displayName = [nombre, paterno, materno].filter(Boolean).join(" ") || asString(formData.get("nombre_completo"));

  const payload = {
    first_name: nombre || null,
    last_name: [paterno, materno].filter(Boolean).join(" ") || null,
    display_name: displayName || "Asesor sin nombre",
    staff_kind: "advisor" as const,
    advisor_class: (asString(formData.get("clase")) || "M") as "A" | "M" | "staff",
    employment_status: (asString(formData.get("estatus_empleo")) || "active") as "active" | "inactive" | "suspended" | "archived",
    mobile_phone: asString(formData.get("movil")) || null,
    office_phone: asString(formData.get("tel_oficina")) || null,
    personal_email: asString(formData.get("correo_personal")) || null,
    work_email: asString(formData.get("correo_remax")) || null,
    address_line_1: asString(formData.get("calle")) || null,
    address_line_2: [asString(formData.get("no_ext")), asString(formData.get("no_int"))].filter(Boolean).join(" ") || null,
    neighborhood: asString(formData.get("colonia")) || null,
    city: asString(formData.get("municipio")) || null,
    state: asString(formData.get("entidad")) || null,
    postal_code: asString(formData.get("cp")) || null,
    tax_id: asString(formData.get("rfc")) || null,
    bank_name: asString(formData.get("banco")) || null,
    bank_account: asString(formData.get("no_cuenta")) || null,
    bank_clabe: asString(formData.get("clabe")) || null,
    joined_on: asString(formData.get("fecha_ingreso")) || null,
    left_on: asString(formData.get("fecha_separacion")) || null,
    metadata: {
      alias: asString(formData.get("alias")) || null,
      nombreCompleto: asString(formData.get("nombre_completo")) || null,
      telCasa: asString(formData.get("tel_casa")) || null,
      correoRemaxInternacional: asString(formData.get("correo_remax_internacional")) || null,
      razonSocial: asString(formData.get("razon_social")) || null,
      calleFiscal: asString(formData.get("calle_fiscal")) || null,
      correoFiscal: asString(formData.get("correo_fiscal")) || null,
      contactoEmergencia: asString(formData.get("contacto_emergencia")) || null,
      telEmergencia: asString(formData.get("tel_emergencia")) || null,
      parentesco: asString(formData.get("parentesco")) || null,
      imss: asString(formData.get("imss")) || null,
      sgmm: asString(formData.get("sgmm")) || null,
      tipoSangre: asString(formData.get("tipo_sangre")) || null,
      enfermedades: asString(formData.get("enfermedades")) || null,
      alergias: asString(formData.get("alergias")) || null,
      idioma1: asString(formData.get("idioma_1")) || null,
      idioma2: asString(formData.get("idioma_2")) || null,
      nivelEstudios: asString(formData.get("nivel_estudios")) || null,
      activoInactivo: asString(formData.get("activo_inactivo")) || null
    }
  };

  if (id) {
    const { error } = await admin.from("staff_members").update(payload).eq("id", id);
    if (error) {
      redirect(`/remax-demo/asesores/alta?id=${id}&error=${encodeURIComponent(error.message)}`);
    }
    redirect(`/remax-demo/asesores/alta?id=${id}&saved=1`);
  }

  const { data, error } = await admin.from("staff_members").insert(payload).select("id").single();
  if (error || !data) {
    redirect(`/remax-demo/asesores/alta?error=${encodeURIComponent(error?.message ?? "insert_failed")}`);
  }

  redirect(`/remax-demo/asesores/alta?id=${data.id}&saved=1`);
}

export default async function AltaAsesorPage({
  searchParams
}: {
  searchParams: Promise<{ id?: string; saved?: string; error?: string }>;
}) {
  const language = await getRemaxLanguage();
  const isEnglish = language === "en";
  const params = await searchParams;
  const editId = params.id?.trim() || "";
  const admin = createAdminClient();

  let advisor: StaffMember | null = null;
  if (editId) {
    const { data } = await admin
      .from("staff_members")
      .select("id, first_name, last_name, display_name, staff_kind, advisor_class, employment_status, mobile_phone, office_phone, personal_email, work_email, address_line_1, address_line_2, neighborhood, city, state, postal_code, tax_id, bank_name, bank_account, bank_clabe, joined_on, left_on, metadata")
      .eq("id", editId)
      .maybeSingle();
    advisor = (data as StaffMember | null) ?? null;
  }

  const md = (advisor?.metadata ?? {}) as Record<string, string | null | undefined>;

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title={isEnglish ? "Advisor onboarding form" : "Alta de asesor"}
        description={
          isEnglish
            ? "Initial advisor registration form with general, tax, personal and REMAX membership blocks."
            : "Formulario inicial de registro de asesor con bloques de informacion general, fiscal, personal y socio REMAX."
        }
        actions={
          <div className="remax-header-actions">
            <button type="submit" form="alta-asesor-form" className="button">
              {isEnglish ? "Save" : "Guardar"}
            </button>
            <Link href="/remax-demo/asesores" className="button button-secondary">
              {isEnglish ? "Close" : "Cerrar"}
            </Link>
          </div>
        }
      />

      {params.saved ? <div className="remax-note-box"><strong>{isEnglish ? "Saved" : "Guardado"}</strong></div> : null}
      {params.error ? <div className="remax-role-callout"><strong>{params.error}</strong></div> : null}

      <form id="alta-asesor-form" action={saveAdvisorAction}>
        <input type="hidden" name="id" value={advisor?.id ?? ""} />

        <AccessSection title={isEnglish ? "General information" : "INF. GRAL."}>
          <div className="remax-form-grid remax-form-grid-6 remax-advisor-alta-grid">
            <label className="remax-field"><span>Reg.</span><select name="modo" defaultValue={advisor ? "edicion" : "nuevo"}><option value="nuevo">(Nuevo)</option><option value="edicion">(Edicion)</option></select></label>
            <label className="remax-field"><span>Nombre</span><input name="nombre" defaultValue={advisor?.first_name ?? ""} /></label>
            <label className="remax-field"><span>Paterno</span><input name="paterno" defaultValue={advisor?.last_name?.split(" ")[0] ?? ""} /></label>
            <label className="remax-field"><span>Materno</span><input name="materno" defaultValue={advisor?.last_name?.split(" ").slice(1).join(" ") ?? ""} /></label>
            <label className="remax-field"><span>Alias</span><input name="alias" defaultValue={md.alias ?? ""} /></label>
            <label className="remax-field"><span>Nombre completo</span><input name="nombre_completo" defaultValue={advisor?.display_name ?? md.nombreCompleto ?? ""} /></label>
            <label className="remax-field"><span>Movil</span><input name="movil" defaultValue={advisor?.mobile_phone ?? ""} /></label>
            <label className="remax-field"><span>Tel Oficina</span><input name="tel_oficina" defaultValue={advisor?.office_phone ?? ""} /></label>
            <label className="remax-field"><span>Tel Casa</span><input name="tel_casa" defaultValue={md.telCasa ?? ""} /></label>
            <label className="remax-field remax-field-span-2"><span>Correo Remax Activa</span><input name="correo_remax" defaultValue={advisor?.work_email ?? ""} /></label>
            <label className="remax-field"><span>Correo Remax Internacional</span><input name="correo_remax_internacional" defaultValue={md.correoRemaxInternacional ?? ""} /></label>
            <label className="remax-field remax-field-span-2"><span>Correo Personal</span><input name="correo_personal" defaultValue={advisor?.personal_email ?? ""} /></label>
            <label className="remax-field"><span>Calle</span><input name="calle" defaultValue={advisor?.address_line_1 ?? ""} /></label>
            <label className="remax-field"><span>No. Ext.</span><input name="no_ext" defaultValue={advisor?.address_line_2?.split(" ")[0] ?? ""} /></label>
            <label className="remax-field"><span>No. Int.</span><input name="no_int" defaultValue={advisor?.address_line_2?.split(" ").slice(1).join(" ") ?? ""} /></label>
            <label className="remax-field"><span>Colonia</span><input name="colonia" defaultValue={advisor?.neighborhood ?? ""} /></label>
            <label className="remax-field"><span>Municipio</span><input name="municipio" defaultValue={advisor?.city ?? ""} /></label>
            <label className="remax-field"><span>C.P.</span><input name="cp" defaultValue={advisor?.postal_code ?? ""} /></label>
            <label className="remax-field"><span>Entidad</span><input name="entidad" defaultValue={advisor?.state ?? ""} /></label>
          </div>
        </AccessSection>

        <AccessSection title="INF. FISCAL" accent="red">
          <div className="remax-form-grid remax-form-grid-6">
            <label className="remax-field remax-field-span-2"><span>Razon Social</span><input name="razon_social" defaultValue={md.razonSocial ?? ""} /></label>
            <label className="remax-field"><span>RFC</span><input name="rfc" defaultValue={advisor?.tax_id ?? ""} /></label>
            <label className="remax-field remax-field-span-2"><span>Calle fiscal</span><input name="calle_fiscal" defaultValue={md.calleFiscal ?? ""} /></label>
            <label className="remax-field"><span>Correo fiscal</span><input name="correo_fiscal" defaultValue={md.correoFiscal ?? ""} /></label>
            <label className="remax-field"><span>Banco</span><input name="banco" defaultValue={advisor?.bank_name ?? ""} /></label>
            <label className="remax-field"><span>No. Cuenta</span><input name="no_cuenta" defaultValue={advisor?.bank_account ?? ""} /></label>
            <label className="remax-field"><span>CLABE</span><input name="clabe" defaultValue={advisor?.bank_clabe ?? ""} /></label>
          </div>
        </AccessSection>

        <AccessSection title="INF. PERSONAL" accent="red">
          <div className="remax-form-grid remax-form-grid-4">
            <label className="remax-field"><span>Nombre de contacto emergencia</span><input name="contacto_emergencia" defaultValue={md.contactoEmergencia ?? ""} /></label>
            <label className="remax-field"><span>No. IMSS</span><input name="imss" defaultValue={md.imss ?? ""} /></label>
            <label className="remax-field"><span>Enfermedades</span><input name="enfermedades" defaultValue={md.enfermedades ?? ""} /></label>
            <label className="remax-field"><span>Tel contacto emergencia</span><input name="tel_emergencia" defaultValue={md.telEmergencia ?? ""} /></label>
            <label className="remax-field"><span>SGMM</span><input name="sgmm" defaultValue={md.sgmm ?? ""} /></label>
            <label className="remax-field"><span>Alergias</span><input name="alergias" defaultValue={md.alergias ?? ""} /></label>
            <label className="remax-field"><span>Parentesco</span><input name="parentesco" defaultValue={md.parentesco ?? ""} /></label>
            <label className="remax-field"><span>Tipo Sangre</span><input name="tipo_sangre" defaultValue={md.tipoSangre ?? ""} /></label>
          </div>
        </AccessSection>

        <AccessSection title="INF. SOCIO REMAX" accent="gold">
          <div className="remax-form-grid remax-form-grid-6 remax-advisor-alta-grid">
            <label className="remax-field"><span>Fecha Ingreso</span><input type="date" name="fecha_ingreso" defaultValue={advisor?.joined_on ?? ""} /></label>
            <label className="remax-field"><span>Fecha Separacion</span><input type="date" name="fecha_separacion" defaultValue={advisor?.left_on ?? ""} /></label>
            <label className="remax-field"><span>Activo / Inactivo</span><select name="activo_inactivo" defaultValue={md.activoInactivo ?? "activo"}><option value="activo">Activo</option><option value="inactivo">Inactivo</option></select></label>
            <label className="remax-field"><span>Nivel Estudios</span><input name="nivel_estudios" defaultValue={md.nivelEstudios ?? ""} /></label>
            <label className="remax-field"><span>Idioma 1</span><input name="idioma_1" defaultValue={md.idioma1 ?? ""} /></label>
            <label className="remax-field"><span>Idioma 2</span><input name="idioma_2" defaultValue={md.idioma2 ?? ""} /></label>
            <label className="remax-field"><span>Clase</span><select name="clase" defaultValue={advisor?.advisor_class ?? "M"}><option value="A">A</option><option value="M">M</option><option value="staff">staff</option></select></label>
            <label className="remax-field"><span>Estatus empleo</span><select name="estatus_empleo" defaultValue={advisor?.employment_status ?? "active"}><option value="active">active</option><option value="inactive">inactive</option><option value="suspended">suspended</option><option value="archived">archived</option></select></label>
          </div>
        </AccessSection>
      </form>
    </div>
  );
}

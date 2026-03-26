"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { DataTable } from "@/components/data-table";
import { AccessSection } from "@/remax-demo/components/access-section";
import {
  REMAX_LANGUAGE_COOKIE,
  REMAX_LANGUAGE_STORAGE_KEY,
  translateStaffType,
  type RemaxLanguage
} from "@/remax-demo/i18n";
import {
  isRemaxTheme,
  REMAX_THEME_STORAGE_KEY,
  remaxThemeOptions,
  type RemaxTheme
} from "@/remax-demo/theme";
import type { RemaxAdvisorClass, RemaxStaffType } from "@/remax-demo/types";

const REMAX_ADMIN_SANDBOX_STORAGE_KEY = "remax-demo-admin-sandbox";

interface RemaxAdminAdvisor {
  id: string;
  nombre: string;
  clase: RemaxAdvisorClass;
  tipoPersonal: RemaxStaffType;
  rol: string;
  comisionRate: number | null;
  activo: boolean;
  ciudadBase: string;
  correo: string;
  telefono: string;
  scope: "base" | "sandbox";
}

interface AdvisorFormState {
  nombre: string;
  clase: "A" | "M";
  tipoPersonal: RemaxStaffType;
  rol: string;
  comisionRate: string;
  ciudadBase: string;
  correo: string;
  telefono: string;
}

interface CommissionFormState {
  valorOperacion: string;
  porcentajeComision: string;
  participacionCaptacion: string;
  participacionCierre: string;
}

const defaultAdvisorForm: AdvisorFormState = {
  nombre: "Camille Laurent",
  clase: "A",
  tipoPersonal: "asesor",
  rol: "Captacion residencial CDMX",
  comisionRate: "7",
  ciudadBase: "Polanco, Miguel Hidalgo, CDMX",
  correo: "camille.laurent@remax-demo.test",
  telefono: "55 1000 2040"
};

const defaultCommissionForm: CommissionFormState = {
  valorOperacion: "8350000",
  porcentajeComision: "6",
  participacionCaptacion: "50",
  participacionCierre: "25"
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/(^\.|\.$)/g, "");
}

function parsePositiveNumber(value: string) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

export function RemaxAdminPanel({
  language,
  baseAdvisors
}: {
  language: RemaxLanguage;
  baseAdvisors: Omit<RemaxAdminAdvisor, "scope">[];
}) {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedTheme, setSelectedTheme] = useState<RemaxTheme>("classic");
  const [advisorForm, setAdvisorForm] = useState(defaultAdvisorForm);
  const [commissionForm, setCommissionForm] = useState(defaultCommissionForm);
  const [sandboxAdvisors, setSandboxAdvisors] = useState<RemaxAdminAdvisor[]>([]);
  const [sandboxReady, setSandboxReady] = useState(false);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  useEffect(() => {
    const storedSandbox = window.localStorage.getItem(REMAX_ADMIN_SANDBOX_STORAGE_KEY);

    if (storedSandbox) {
      try {
        const parsed = JSON.parse(storedSandbox) as RemaxAdminAdvisor[];
        if (Array.isArray(parsed)) {
          setSandboxAdvisors(parsed);
        }
      } catch {
        window.localStorage.removeItem(REMAX_ADMIN_SANDBOX_STORAGE_KEY);
      }
    }

    const storedTheme = window.localStorage.getItem(REMAX_THEME_STORAGE_KEY);
    const theme = isRemaxTheme(storedTheme) ? storedTheme : "classic";
    document.documentElement.dataset.remaxTheme = theme;
    setSelectedTheme(theme);
    setSandboxReady(true);
  }, []);

  useEffect(() => {
    if (!sandboxReady) {
      return;
    }

    window.localStorage.setItem(REMAX_ADMIN_SANDBOX_STORAGE_KEY, JSON.stringify(sandboxAdvisors));
  }, [sandboxAdvisors, sandboxReady]);

  const isEnglish = language === "en";
  const advisors = useMemo<RemaxAdminAdvisor[]>(
    () => [
      ...sandboxAdvisors,
      ...baseAdvisors.map((advisor): RemaxAdminAdvisor => ({ ...advisor, scope: "base" }))
    ],
    [baseAdvisors, sandboxAdvisors]
  );

  const activeCommercialUsers = advisors.filter(
    (advisor) => advisor.activo && (advisor.tipoPersonal === "asesor" || advisor.tipoPersonal === "direccion")
  ).length;
  const activeOperationsUsers = advisors.filter(
    (advisor) => advisor.activo && (advisor.tipoPersonal === "administrativo" || advisor.tipoPersonal === "recepcion")
  ).length;
  const averageCommission =
    advisors
      .filter((advisor) => typeof advisor.comisionRate === "number")
      .reduce((sum, advisor) => sum + (advisor.comisionRate ?? 0), 0) /
    Math.max(
      advisors.filter((advisor) => typeof advisor.comisionRate === "number").length,
      1
    );

  const valorOperacion = parsePositiveNumber(commissionForm.valorOperacion);
  const porcentajeComision = parsePositiveNumber(commissionForm.porcentajeComision);
  const participacionCaptacion = parsePositiveNumber(commissionForm.participacionCaptacion);
  const participacionCierre = parsePositiveNumber(commissionForm.participacionCierre);
  const totalComision = valorOperacion * (porcentajeComision / 100);
  const montoCaptacion = totalComision * (participacionCaptacion / 100);
  const montoCierre = totalComision * (participacionCierre / 100);
  const montoOficina = totalComision - montoCaptacion - montoCierre;
  const commissionOverflow = participacionCaptacion + participacionCierre > 100;

  function formatMoney(value: number) {
    return new Intl.NumberFormat(isEnglish ? "en-US" : "es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0
    }).format(value);
  }

  function formatPercent(value: number) {
    return new Intl.NumberFormat(isEnglish ? "en-US" : "es-MX", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value);
  }

  function updateAdvisorForm<Key extends keyof AdvisorFormState>(key: Key, value: AdvisorFormState[Key]) {
    setAdvisorForm((current) => ({ ...current, [key]: value }));
  }

  function updateCommissionForm<Key extends keyof CommissionFormState>(
    key: Key,
    value: CommissionFormState[Key]
  ) {
    setCommissionForm((current) => ({ ...current, [key]: value }));
  }

  function handleAddAdvisor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nombre = advisorForm.nombre.trim();
    const ciudadBase = advisorForm.ciudadBase.trim();
    const rol = advisorForm.rol.trim();

    if (!nombre || !ciudadBase || !rol) {
      return;
    }

    const commissionRate =
      advisorForm.tipoPersonal === "asesor" || advisorForm.tipoPersonal === "direccion"
        ? parsePositiveNumber(advisorForm.comisionRate) / 100
        : null;

    const advisor: RemaxAdminAdvisor = {
      id: `sandbox-${slugify(nombre)}-${Date.now()}`,
      nombre,
      clase:
        advisorForm.tipoPersonal === "asesor" || advisorForm.tipoPersonal === "direccion"
          ? advisorForm.clase
          : null,
      tipoPersonal: advisorForm.tipoPersonal,
      rol,
      comisionRate: commissionRate,
      activo: true,
      ciudadBase,
      correo: advisorForm.correo.trim() || `${slugify(nombre)}@remax-demo.test`,
      telefono: advisorForm.telefono.trim() || "55 0000 0000",
      scope: "sandbox"
    };

    setSandboxAdvisors((current) => [advisor, ...current]);
    setAdvisorForm({
      ...defaultAdvisorForm,
      nombre: "Sophie Bernard",
      correo: "sophie.bernard@remax-demo.test",
      ciudadBase: "Roma Norte, Cuauhtemoc, CDMX",
      telefono: "55 1000 3050"
    });
  }

  function clearSandbox() {
    setSandboxAdvisors([]);
    window.localStorage.removeItem(REMAX_ADMIN_SANDBOX_STORAGE_KEY);
  }

  function applyLanguage(nextLanguage: RemaxLanguage) {
    setSelectedLanguage(nextLanguage);
    document.cookie = `${REMAX_LANGUAGE_COOKIE}=${nextLanguage}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem(REMAX_LANGUAGE_STORAGE_KEY, nextLanguage);
    router.refresh();
  }

  function applyTheme(nextTheme: RemaxTheme) {
    setSelectedTheme(nextTheme);
    document.documentElement.dataset.remaxTheme = nextTheme;
    window.localStorage.setItem(REMAX_THEME_STORAGE_KEY, nextTheme);
  }

  return (
    <div className="remax-page-stack">
      <div className="remax-admin-kpi-grid">
        <article className="remax-admin-kpi-card">
          <span>{isEnglish ? "Commercial users" : "Usuarios comerciales"}</span>
          <strong>{activeCommercialUsers}</strong>
          <p>{isEnglish ? "Direction and active agents in the demo roster." : "Direccion y asesores activos en el roster demo."}</p>
        </article>
        <article className="remax-admin-kpi-card">
          <span>{isEnglish ? "Operations users" : "Usuarios operativos"}</span>
          <strong>{activeOperationsUsers}</strong>
          <p>{isEnglish ? "Administrative and front-desk support profiles." : "Perfiles administrativos y de recepcion para soporte interno."}</p>
        </article>
        <article className="remax-admin-kpi-card">
          <span>{isEnglish ? "Sandbox records" : "Registros sandbox"}</span>
          <strong>{sandboxAdvisors.length}</strong>
          <p>{isEnglish ? "Created in this browser only, with no real persistence." : "Creados solo en este navegador, sin persistencia real."}</p>
        </article>
        <article className="remax-admin-kpi-card">
          <span>{isEnglish ? "Average commission" : "Comision promedio"}</span>
          <strong>{formatPercent(averageCommission)}</strong>
          <p>{isEnglish ? "Reference mix for classes A and M in the demo." : "Mezcla de referencia para clases A y M dentro de la demo."}</p>
        </article>
      </div>

      <div className="remax-two-columns">
        <AccessSection
          title={isEnglish ? "Demo advisor onboarding" : "Alta demo de asesores"}
          accent="blue"
          action={
            sandboxAdvisors.length > 0 ? (
              <button type="button" className="button button-secondary" onClick={clearSandbox}>
                {isEnglish ? "Clear sandbox" : "Limpiar sandbox"}
              </button>
            ) : null
          }
        >
          <form className="remax-admin-stack" onSubmit={handleAddAdvisor}>
            <p className="remax-admin-helper">
              {isEnglish
                ? "This creates test-only advisor profiles with French names and CDMX bases. The records stay local to the browser."
                : "Esto crea perfiles de prueba con nombres franceses y bases CDMX. Los registros se quedan solo en el navegador."}
            </p>

            <div className="remax-form-grid remax-form-grid-4">
              <label className="remax-field remax-field-span-2">
                <span>{isEnglish ? "Full name" : "Nombre completo"}</span>
                <input
                  value={advisorForm.nombre}
                  onChange={(event) => updateAdvisorForm("nombre", event.target.value)}
                />
              </label>
              <label className="remax-field">
                <span>{isEnglish ? "Class" : "Clase"}</span>
                <select
                  value={advisorForm.clase}
                  onChange={(event) => updateAdvisorForm("clase", event.target.value as "A" | "M")}
                >
                  <option value="A">A</option>
                  <option value="M">M</option>
                </select>
              </label>
              <label className="remax-field">
                <span>{isEnglish ? "Staff type" : "Tipo personal"}</span>
                <select
                  value={advisorForm.tipoPersonal}
                  onChange={(event) =>
                    updateAdvisorForm("tipoPersonal", event.target.value as RemaxStaffType)
                  }
                >
                  <option value="asesor">{isEnglish ? "Agent" : "Asesor"}</option>
                  <option value="direccion">{isEnglish ? "Leadership" : "Direccion"}</option>
                  <option value="administrativo">{isEnglish ? "Administrative" : "Administrativo"}</option>
                  <option value="recepcion">{isEnglish ? "Front desk" : "Recepcion"}</option>
                </select>
              </label>
              <label className="remax-field remax-field-span-2">
                <span>{isEnglish ? "Role" : "Rol"}</span>
                <input
                  value={advisorForm.rol}
                  onChange={(event) => updateAdvisorForm("rol", event.target.value)}
                />
              </label>
              <label className="remax-field remax-field-span-2">
                <span>{isEnglish ? "CDMX base" : "Base CDMX"}</span>
                <input
                  value={advisorForm.ciudadBase}
                  onChange={(event) => updateAdvisorForm("ciudadBase", event.target.value)}
                />
              </label>
              <label className="remax-field">
                <span>{isEnglish ? "Commission %" : "Comision %"}</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={advisorForm.comisionRate}
                  onChange={(event) => updateAdvisorForm("comisionRate", event.target.value)}
                />
              </label>
              <label className="remax-field">
                <span>{isEnglish ? "Phone" : "Telefono"}</span>
                <input
                  value={advisorForm.telefono}
                  onChange={(event) => updateAdvisorForm("telefono", event.target.value)}
                />
              </label>
              <label className="remax-field remax-field-span-2">
                <span>{isEnglish ? "Demo email" : "Correo demo"}</span>
                <input
                  value={advisorForm.correo}
                  onChange={(event) => updateAdvisorForm("correo", event.target.value)}
                />
              </label>
            </div>

            <div className="remax-admin-form-actions">
              <button type="submit" className="button">
                {isEnglish ? "Save demo advisor" : "Guardar asesor demo"}
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={() =>
                  setAdvisorForm({
                    nombre: "Juliette Morel",
                    clase: "M",
                    tipoPersonal: "asesor",
                    rol: "Rentas ejecutivas CDMX",
                    comisionRate: "4.5",
                    ciudadBase: "Del Valle, Benito Juarez, CDMX",
                    correo: "juliette.morel@remax-demo.test",
                    telefono: "55 1000 1180"
                  })
                }
              >
                {isEnglish ? "Load quick preset" : "Cargar preset rapido"}
              </button>
            </div>
          </form>
        </AccessSection>

        <AccessSection title={isEnglish ? "Commission calculator" : "Calculadora de comisiones"} accent="red">
          <div className="remax-admin-stack">
            <p className="remax-admin-helper">
              {isEnglish
                ? "Simple admin calculator for gross commission, capture split, closing split and office remainder."
                : "Calculadora simple para comision bruta, reparto de captacion, reparto de cierre y remanente de oficina."}
            </p>

            <div className="remax-form-grid remax-form-grid-4">
              <label className="remax-field">
                <span>{isEnglish ? "Operation value" : "Valor operacion"}</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={commissionForm.valorOperacion}
                  onChange={(event) => updateCommissionForm("valorOperacion", event.target.value)}
                />
              </label>
              <label className="remax-field">
                <span>{isEnglish ? "Commission %" : "Comision %"}</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={commissionForm.porcentajeComision}
                  onChange={(event) => updateCommissionForm("porcentajeComision", event.target.value)}
                />
              </label>
              <label className="remax-field">
                <span>{isEnglish ? "Capture split %" : "Captacion %"}</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={commissionForm.participacionCaptacion}
                  onChange={(event) => updateCommissionForm("participacionCaptacion", event.target.value)}
                />
              </label>
              <label className="remax-field">
                <span>{isEnglish ? "Closing split %" : "Cierre %"}</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={commissionForm.participacionCierre}
                  onChange={(event) => updateCommissionForm("participacionCierre", event.target.value)}
                />
              </label>
            </div>

            <div className="remax-admin-metric-grid">
              <article className="remax-admin-metric">
                <span>{isEnglish ? "Gross commission" : "Comision bruta"}</span>
                <strong>{formatMoney(totalComision)}</strong>
              </article>
              <article className="remax-admin-metric">
                <span>{isEnglish ? "Capture" : "Captacion"}</span>
                <strong>{formatMoney(montoCaptacion)}</strong>
              </article>
              <article className="remax-admin-metric">
                <span>{isEnglish ? "Closing" : "Cierre"}</span>
                <strong>{formatMoney(montoCierre)}</strong>
              </article>
              <article className="remax-admin-metric">
                <span>{isEnglish ? "Office remainder" : "Remanente oficina"}</span>
                <strong>{formatMoney(Math.max(montoOficina, 0))}</strong>
              </article>
            </div>

            {commissionOverflow ? (
              <p className="remax-admin-helper remax-admin-helper-danger">
                {isEnglish
                  ? "Capture and closing split exceed 100%. Reduce one of them to keep the office remainder positive."
                  : "La captacion y el cierre superan 100%. Reduce uno de los porcentajes para mantener un remanente positivo."}
              </p>
            ) : null}
          </div>
        </AccessSection>
      </div>

      <div className="remax-two-columns">
        <AccessSection title={isEnglish ? "Demo preferences" : "Preferencias de demo"} accent="gold">
          <div className="remax-admin-stack">
            <div className="remax-admin-preference-block">
              <span>{isEnglish ? "Language" : "Idioma"}</span>
              <div className="remax-language-switch" aria-label="Language switcher">
                <button
                  type="button"
                  className={selectedLanguage === "es" ? "remax-language-button active" : "remax-language-button"}
                  onClick={() => applyLanguage("es")}
                >
                  ES
                </button>
                <button
                  type="button"
                  className={selectedLanguage === "en" ? "remax-language-button active" : "remax-language-button"}
                  onClick={() => applyLanguage("en")}
                >
                  EN
                </button>
              </div>
              <p className="remax-admin-helper">
                {isEnglish
                  ? "This updates the current session preference and refreshes the interface."
                  : "Esto actualiza la preferencia de la sesion actual y refresca la interfaz."}
              </p>
            </div>

            <div className="remax-admin-preference-block">
              <span>{isEnglish ? "Color palette" : "Paleta de color"}</span>
              <div className="remax-admin-theme-grid">
                {remaxThemeOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={
                      selectedTheme === option.id
                        ? "remax-admin-theme-card active"
                        : "remax-admin-theme-card"
                    }
                    onClick={() => applyTheme(option.id)}
                  >
                    <strong>{option.label}</strong>
                    <p>{option.description}</p>
                    <div className="remax-admin-theme-swatches" aria-hidden="true">
                      {option.swatches.map((swatch) => (
                        <span key={swatch} style={{ background: swatch }} />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AccessSection>

        <AccessSection title={isEnglish ? "Can the client create records?" : "Pruebas de alta en demo"} accent="blue">
          <div className="remax-admin-stack">
            <p className="remax-admin-helper">
              {isEnglish
                ? "Yes, it is possible, but today only the advisor admin sandbox writes local test records. The existing property onboarding flow is still presentational."
                : "Si es posible, pero hoy solo el sandbox admin de asesores escribe registros locales de prueba. El flujo de alta de propiedad sigue siendo presentacional."}
            </p>

            <div className="remax-admin-status-grid">
              <article className="remax-admin-status-card">
                <span>{isEnglish ? "Available now" : "Disponible ahora"}</span>
                <strong>{isEnglish ? "Sandbox advisor creation" : "Alta sandbox de asesores"}</strong>
                <p>
                  {isEnglish
                    ? "Useful for the client to test creation, validation and admin review without touching real data."
                    : "Sirve para que el cliente pruebe alta, validacion y revision admin sin tocar datos reales."}
                </p>
              </article>
              <article className="remax-admin-status-card">
                <span>{isEnglish ? "Next step" : "Siguiente paso"}</span>
                <strong>{isEnglish ? "Property sandbox" : "Sandbox de alta de propiedad"}</strong>
                <p>
                  {isEnglish
                    ? "Straightforward to add with the same approach: local or Supabase-backed fake records."
                    : "Es directo de agregar con el mismo enfoque: registros ficticios en local o respaldados por Supabase."}
                </p>
              </article>
            </div>

            <div className="remax-admin-link-row">
              <Link href="/remax-demo/alta?step=clave" className="button">
                {isEnglish ? "Open property onboarding flow" : "Abrir flujo de alta de propiedad"}
              </Link>
              <Link href="/remax-demo/asesores" className="button button-secondary">
                {isEnglish ? "Review team view" : "Revisar vista de asesores"}
              </Link>
            </div>
          </div>
        </AccessSection>
      </div>

      <AccessSection
        title={isEnglish ? "Admin roster" : "Roster administrativo"}
        accent="gold"
        action={
          <div className="remax-chip-list">
            <span className="remax-admin-pill remax-admin-pill-base">
              {isEnglish ? "Base demo" : "Base demo"}
            </span>
            <span className="remax-admin-pill remax-admin-pill-sandbox">
              {isEnglish ? "Local sandbox" : "Sandbox local"}
            </span>
          </div>
        }
      >
        <DataTable
          rows={advisors}
          getRowId={(advisor) => advisor.id}
          emptyMessage={isEnglish ? "No admin records yet." : "Aun no hay registros admin."}
          columns={[
            {
              key: "nombre",
              label: isEnglish ? "Advisor" : "Asesor",
              render: (advisor) => (
                <div>
                  <strong>{advisor.nombre}</strong>
                  <div className="remax-admin-table-subline">{advisor.correo}</div>
                </div>
              )
            },
            {
              key: "rol",
              label: isEnglish ? "Role" : "Rol",
              render: (advisor) => advisor.rol
            },
            {
              key: "tipo",
              label: isEnglish ? "Staff type" : "Tipo personal",
              render: (advisor) =>
                `${translateStaffType(language, advisor.tipoPersonal)}${advisor.clase ? ` · ${advisor.clase}` : ""}`
            },
            {
              key: "base",
              label: isEnglish ? "CDMX base" : "Base CDMX",
              render: (advisor) => (
                <div>
                  <strong>{advisor.ciudadBase}</strong>
                  <div className="remax-admin-table-subline">{advisor.telefono}</div>
                </div>
              )
            },
            {
              key: "comision",
              label: isEnglish ? "Commission" : "Comision",
              render: (advisor) => (advisor.comisionRate ? formatPercent(advisor.comisionRate) : "Staff"),
              align: "right"
            },
            {
              key: "scope",
              label: isEnglish ? "Scope" : "Entorno",
              render: (advisor) => (
                <span
                  className={
                    advisor.scope === "sandbox"
                      ? "remax-admin-pill remax-admin-pill-sandbox"
                      : "remax-admin-pill remax-admin-pill-base"
                  }
                >
                  {advisor.scope === "sandbox"
                    ? isEnglish
                      ? "Local sandbox"
                      : "Sandbox local"
                    : isEnglish
                      ? "Base demo"
                      : "Base demo"}
                </span>
              )
            }
          ]}
        />
      </AccessSection>
    </div>
  );
}

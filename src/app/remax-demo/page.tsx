import Link from "next/link";

import { remaxDemoAdvisors, remaxDemoCommunications } from "@/remax-demo/data";
import { AccessSection } from "@/remax-demo/components/access-section";
import { PriorityBadge } from "@/remax-demo/components/priority-badge";
import { SentimentBadge } from "@/remax-demo/components/sentiment-badge";
import { formatCurrencyMXN } from "@/remax-demo/formatters";
import { getRemaxLanguage } from "@/remax-demo/get-language";
import {
  rt,
  translateCommunicationType,
  translatePipelineStage,
  type RemaxLanguage
} from "@/remax-demo/i18n";
import {
  getAllValueHistory,
  getMenuStats,
  getPipelineItems,
  getPipelineSummary,
  getSentimentActionQueue,
  getSentimentCountsByPriority,
  getSentimentSummary
} from "@/remax-demo/stats";
import type { RemaxPriorityLevel } from "@/remax-demo/types";

type SectionTone = "blue" | "red" | "gold";
type MobileScreenStyle = "dashboard" | "agenda" | "property" | "prospect";

interface DashboardAction {
  icon: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  note: string;
  pills: string[];
  tone: SectionTone;
}

interface DashboardSection {
  title: string;
  description: string;
  accent: SectionTone;
  cards: DashboardAction[];
}

interface OpenProcess {
  type: string;
  property: string;
  stage: string;
  owners: string[];
  nextAction: string;
  priority: RemaxPriorityLevel;
  href: string;
  status: string;
}

interface QuickAction {
  icon: string;
  title: string;
  description: string;
  href: string;
  tag: string;
}

interface MobileKpi {
  label: string;
  value: string;
}

interface MobileVisit {
  time: string;
  client: string;
  property: string;
  status: string;
}

interface MobileField {
  label: string;
  value: string;
}

interface MobileScreen {
  title: string;
  subtitle: string;
  style: MobileScreenStyle;
  kpis?: MobileKpi[];
  visits?: MobileVisit[];
  details?: MobileField[];
  note?: string;
  actions: string[];
}

function formatShortDate(date: string, language: RemaxLanguage) {
  return new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getActivityTone(category: string): SectionTone {
  if (category.includes("CANCELACION")) {
    return "red";
  }

  if (category.includes("BAJA")) {
    return "gold";
  }

  if (category.includes("ALTA")) {
    return "blue";
  }

  return "gold";
}

const dashboardSections: DashboardSection[] = [
  {
    title: "Operacion comercial",
    description: "Flujos centrales para captar, cerrar, cancelar y mover visitas con una lectura mas clara.",
    accent: "red",
    cards: [
      {
        icon: "ALT",
        title: "Altas",
        description: "Clave, expediente, condiciones, asesores y ficha tecnica en un solo recorrido.",
        href: "/remax-demo/alta?step=clave&propiedad=IBR-OP277",
        cta: "Abrir alta",
        note: "Flujo continuo de captura.",
        pills: ["Clave", "Expediente", "Ficha tecnica"],
        tone: "blue"
      },
      {
        icon: "CIE",
        title: "Bajas / cierres",
        description: "Salida comercial con valores, responsables y comunicado listos para control interno.",
        href: "/remax-demo/baja?step=registro&propiedad=CBR-1748",
        cta: "Abrir cierre",
        note: "Control de estatus final.",
        pills: ["Cierre", "Valores", "Comunicado"],
        tone: "red"
      },
      {
        icon: "CAN",
        title: "Cancelaciones",
        description: "Motivo, comision, responsables y trazabilidad de salida de cartera.",
        href: "/remax-demo/cancelacion?step=registro&propiedad=RTV-571",
        cta: "Abrir cancelacion",
        note: "Seguimiento hasta comunicado.",
        pills: ["Motivo", "Asesores", "Bitacora"],
        tone: "gold"
      },
      {
        icon: "VIS",
        title: "Visitas y recorridos",
        description: "Agenda de campo, visitas programadas y cobertura comercial del dia.",
        href: "/remax-demo/baja?step=busqueda&propiedad=CBR-1748",
        cta: "Ver agenda",
        note: "Lectura diaria de actividad.",
        pills: ["Visitas", "Recorridos", "Agenda"],
        tone: "blue"
      }
    ]
  },
  {
    title: "Gestion de cartera",
    description: "Inventario, valores, propietarios y control operativo por inmueble en una base unica.",
    accent: "blue",
    cards: [
      {
        icon: "CAR",
        title: "Propiedades",
        description: "Expediente comercial, ubicacion, origen y estatus del inventario activo.",
        href: "/remax-demo/propiedades",
        cta: "Ver propiedades",
        note: "Inventario siempre visible.",
        pills: ["Expediente", "Estatus", "Origen"],
        tone: "blue"
      },
      {
        icon: "VAL",
        title: "Valores",
        description: "Historico de precio, posicion comercial y referencia para minuta.",
        href: "/remax-demo/valores?propiedad=CBR-1748",
        cta: "Ver valores",
        note: "Evolucion comercial clara.",
        pills: ["Historico", "Precio", "Minuta"],
        tone: "gold"
      },
      {
        icon: "PRO",
        title: "Propietarios",
        description: "Relacion de propietarios, copropiedad y contacto vinculado a cada expediente.",
        href: "/remax-demo/propietarios?propiedad=IBR-OP277",
        cta: "Ver propietarios",
        note: "Contacto y contexto unificados.",
        pills: ["Contacto", "Copropiedad", "Ficha"],
        tone: "blue"
      },
      {
        icon: "LLV",
        title: "Control de llaves",
        description: "Recepcion, citas, disponibilidad y coordinacion de visitas por propiedad.",
        href: "/remax-demo/alta?step=expediente&propiedad=IBR-OP277",
        cta: "Abrir control",
        note: "Operacion de campo sin friccion.",
        pills: ["Llaves", "Citas", "Recepcion"],
        tone: "red"
      }
    ]
  },
  {
    title: "Equipo y seguimiento",
    description: "Asesores, guardias, recorridos y comisiones alineados en un mismo entorno operativo.",
    accent: "gold",
    cards: [
      {
        icon: "ASE",
        title: "Asesores",
        description: "Clase A y M, participacion por contexto y visibilidad del equipo comercial.",
        href: "/remax-demo/asesores",
        cta: "Ver asesores",
        note: "Direccion y equipo en la misma vista.",
        pills: ["Clase A/M", "Participacion", "Equipo"],
        tone: "blue"
      },
      {
        icon: "GRD",
        title: "Guardias",
        description: "Cobertura comercial y continuidad de atencion con foco en recepcion y respuesta.",
        href: "/remax-demo/asesores",
        cta: "Ver guardias",
        note: "Cobertura del dia.",
        pills: ["Cobertura", "Recepcion", "Seguimiento"],
        tone: "gold"
      },
      {
        icon: "COM",
        title: "Comisiones",
        description: "Politica, monto y control interno visibles para asesores y administracion.",
        href: "/remax-demo/alta?step=condiciones&propiedad=IBR-OP277",
        cta: "Ver comisiones",
        note: "Mas claridad para todo el equipo.",
        pills: ["Politica", "Monto", "Control"],
        tone: "red"
      },
      {
        icon: "REC",
        title: "Recorridos",
        description: "Seguimiento de campo para visitas, cierres y cobertura por zona.",
        href: "/remax-demo/baja?step=busqueda&propiedad=CBR-1748",
        cta: "Ver recorridos",
        note: "Campo y coordinacion conectados.",
        pills: ["Campo", "Zona", "Cobertura"],
        tone: "blue"
      }
    ]
  },
  {
    title: "Control y reportes",
    description: "Comunicados, minutas, reporte ejecutivo y arquitectura del producto en una sola lectura.",
    accent: "blue",
    cards: [
      {
        icon: "MSG",
        title: "Comunicados",
        description: "Bitacora de altas, bajas y cancelaciones con vista previa y estado.",
        href: "/remax-demo/comunicados",
        cta: "Ver comunicados",
        note: "Historial centralizado.",
        pills: ["Alta", "Baja", "Cancelacion"],
        tone: "red"
      },
      {
        icon: "MIN",
        title: "Minutas",
        description: "Cambios comerciales vinculados a valores, cierres y salida administrativa.",
        href: "/remax-demo/valores?propiedad=CBR-1748",
        cta: "Ver minutas",
        note: "Menos friccion documental.",
        pills: ["Cambios", "Motivos", "Versiones"],
        tone: "gold"
      },
      {
        icon: "RPT",
        title: "Reporte de cartera",
        description: "Inventario, procesos abiertos, actividad y estado comercial del mes.",
        href: "/remax-demo",
        cta: "Ver reporte",
        note: "Vista para direccion.",
        pills: ["KPIs", "Inventario", "Actividad"],
        tone: "blue"
      },
      {
        icon: "WEB",
        title: "Arquitectura web",
        description: "Astro, Supabase, Railway y evolucion futura a app movil conectada.",
        href: "/remax-demo/arquitectura",
        cta: "Ver arquitectura",
        note: "Base preparada para crecer.",
        pills: ["Astro", "Supabase", "Railway"],
        tone: "red"
      }
    ]
  }
];

const benefitStrip = [
  "Mas claridad operativa",
  "Seguimiento comercial mas agil",
  "Mejor visibilidad para direccion",
  "Base preparada para crecer"
];

const benefitCards = [
  {
    icon: "OPS",
    title: "Operacion centralizada",
    copy: "Propiedades, asesores, propietarios, visitas y cierres trabajan sobre la misma base operativa."
  },
  {
    icon: "DIR",
    title: "Lectura ejecutiva",
    copy: "Direccion y coordinacion comercial ven pipeline, actividad y alertas en una vista unica."
  },
  {
    icon: "MOV",
    title: "Roadmap movil concreto",
    copy: "La etapa web resuelve control hoy y la etapa movil acelera al asesor en campo."
  },
  {
    icon: "INT",
    title: "Capa inteligente util",
    copy: "Hugging Face ayuda a priorizar seguimientos y detectar riesgo comercial real."
  }
];

const openProcesses: OpenProcess[] = [
  {
    type: "Alta",
    property: "IBR-OP277",
    stage: "Expediente, condiciones y ficha tecnica",
    owners: ["Pedro Leyva", "Patricia Romo"],
    nextAction: "Validar condiciones de renta y liberar ficha comercial",
    priority: "alta",
    href: "/remax-demo/alta?step=expediente&propiedad=IBR-OP277",
    status: "En captura"
  },
  {
    type: "Baja / cierre",
    property: "CBR-1748",
    stage: "Revision de valores y comunicado de salida",
    owners: ["Julieta Mora", "Erika Valles"],
    nextAction: "Confirmar ultimo valor y emitir comunicado interno",
    priority: "alta",
    href: "/remax-demo/baja?step=valores&propiedad=CBR-1748",
    status: "En revision"
  },
  {
    type: "Cancelacion",
    property: "RTV-571",
    stage: "Registro, asesores y condicion de comision",
    owners: ["Patricia Romo", "Sofia Campos"],
    nextAction: "Validar cancelacion y confirmar salida operativa",
    priority: "media",
    href: "/remax-demo/cancelacion?step=asesores&propiedad=RTV-571",
    status: "Listo para comunicado"
  },
  {
    type: "Seguimiento comercial",
    property: "ICV-441",
    stage: "Visitas, propietarios y control de agenda",
    owners: ["Gabriela Perez", "Diego Ruiz"],
    nextAction: "Actualizar visitas activas y feedback del cliente",
    priority: "media",
    href: "/remax-demo/propietarios?propiedad=ICV-441",
    status: "En seguimiento"
  }
];

const quickActions: QuickAction[] = [
  {
    icon: "KAN",
    title: "Ver pipeline operativo",
    description: "Kanban y Lista con prioridad, sentimiento y referencia comercial.",
    href: "/remax-demo/pipeline",
    tag: "Pipeline"
  },
  {
    icon: "IA",
    title: "Abrir analisis inteligente",
    description: "Lectura asistida para priorizar seguimientos y detectar riesgo comercial.",
    href: "/remax-demo/analisis",
    tag: "Hugging Face"
  },
  {
    icon: "ALT",
    title: "Nueva alta",
    description: "Abrir un expediente desde clave hasta ficha tecnica.",
    href: "/remax-demo/alta?step=clave&propiedad=IBR-OP277",
    tag: "Operacion"
  },
  {
    icon: "APP",
    title: "Ver roadmap movil",
    description: "Presentar la etapa 2 para asesores en campo.",
    href: "/remax-demo#roadmap-producto",
    tag: "Mobile"
  }
];

const mobileScreens: MobileScreen[] = [
  {
    title: "Dashboard del asesor",
    subtitle: "Buenos dias, Carlos",
    style: "dashboard",
    kpis: [
      { label: "Visitas hoy", value: "4" },
      { label: "Propiedades activas", value: "12" },
      { label: "Seguimientos pendientes", value: "7" }
    ],
    note: "Enfoque del dia: 2 visitas activas y 1 cierre por destrabar.",
    actions: ["Registrar visita", "Ver agenda", "Subir evidencia", "Contactar cliente"]
  },
  {
    title: "Agenda de visitas",
    subtitle: "Agenda de hoy",
    style: "agenda",
    visits: [
      { time: "09:30", client: "Mariana Fuentes", property: "ICV-441", status: "Confirmada" },
      { time: "12:00", client: "Grupo Laureles", property: "IBR-OP277", status: "Ruta lista" },
      { time: "16:30", client: "Parques Santa Maria", property: "CBR-1748", status: "En seguimiento" }
    ],
    note: "Ruta optimizada para cubrir zona poniente y cierre de campo antes de las 18:00.",
    actions: ["Iniciar ruta", "Marcar llegada"]
  },
  {
    title: "Ficha de propiedad",
    subtitle: "IBR-OP277 · El Zapote del Valle",
    style: "property",
    details: [
      { label: "Precio", value: "MXN 605,253.60" },
      { label: "Direccion", value: "Camino viejo a los Laureles 195" },
      { label: "Propietario", value: "Oscar Ivan Olivares" },
      { label: "Asesor asignado", value: "Pedro Leyva" },
      { label: "Estado", value: "Alta iniciada" }
    ],
    note: "Cliente interesado en agendar visita de seguimiento y revisar acceso para citas.",
    actions: ["Llamar", "WhatsApp", "Abrir mapa", "Registrar visita"]
  },
  {
    title: "Seguimiento de prospecto",
    subtitle: "Mariana Fuentes",
    style: "prospect",
    details: [
      { label: "Origen", value: "Referido digital" },
      { label: "Interes", value: "Casa familiar zona poniente" },
      { label: "Ultima interaccion", value: "WhatsApp hace 2h" },
      { label: "Proximo recordatorio", value: "Hoy 16:30" }
    ],
    note: "Prospecto activo; valora rapidez en respuesta y comparativo de precio por zona.",
    actions: ["Llamada", "WhatsApp", "Correo", "Actualizar estatus"]
  }
];

export default async function RemaxMenuOperacionPage() {
  const language = await getRemaxLanguage();
  const t = (value: string) => rt(language, value);
  const menuStats = getMenuStats();
  const pipelineSummary = getPipelineSummary();
  const pipelineItems = getPipelineItems();
  const sentimentSummary = getSentimentSummary();
  const sentimentPriority = getSentimentCountsByPriority();
  const followUpAlerts = getSentimentActionQueue();
  const valueHistory = getAllValueHistory();
  const monthlyCommunications = remaxDemoCommunications.filter((item) => item.fecha.startsWith("2026-03")).length;
  const monthlyValueEvents = valueHistory.filter((item) => item.fecha.startsWith("2026-03")).length;
  const monthlyActivityTotal = monthlyCommunications + monthlyValueEvents;

  const totalStaff = remaxDemoAdvisors.length;
  const adminCount = remaxDemoAdvisors.filter((advisor) => advisor.tipoPersonal === "administrativo").length;
  const receptionCount = remaxDemoAdvisors.filter((advisor) => advisor.tipoPersonal === "recepcion").length;

  const criticalOpportunities = pipelineItems
    .filter((item) => item.priority === "alta" || item.sentiment === "sensible / en riesgo")
    .slice(0, 4);
  const pendingClosures = pipelineItems
    .filter((item) => item.stage === "Negociacion" || item.stage === "Cierre")
    .slice(0, 4);

  const totalProperties = menuStats.active + menuStats.closed + menuStats.cancelled;
  const hotOpportunities = pipelineItems.filter(
    (item) => item.priority === "alta" && item.stage !== "Cancelado"
  ).length;
  const urgentFollowUps = followUpAlerts.filter((item) => item.priority === "alta").length;
  const closeProbability = Math.round((pendingClosures.length / Math.max(pipelineSummary.active, 1)) * 100);

  const stageOverview = [
    "Nuevo lead",
    "Contactado",
    "Evaluacion",
    "Alta iniciada",
    "Publicado",
    "Visitas",
    "Negociacion",
    "Cierre",
    "Cancelado"
  ].map((stage) => ({
    stage,
    total: pipelineItems.filter((item) => item.stage === stage).length
  }));

  const kpis = [
    {
      label: "Propiedades activas",
      value: String(menuStats.active),
      note: "Inventario comercial listo para seguimiento."
    },
    {
      label: "Eventos de valor",
      value: String(valueHistory.length),
      note: "Historico de precios y posiciones centralizado."
    },
    {
      label: "Comunicados del mes",
      value: String(monthlyCommunications),
      note: "Operacion interna unificada en un solo flujo."
    },
    {
      label: "Equipo operativo",
      value: String(totalStaff),
      note: "Direccion, administracion, recepcion y asesores clase A y M."
    }
  ];

  const executiveKpis = [
    {
      label: "Propiedades activas",
      value: String(menuStats.active),
      note: "Inventario listo para comercializacion."
    },
    {
      label: "Procesos abiertos",
      value: String(openProcesses.length),
      note: "Altas, cierres y seguimiento en curso."
    },
    {
      label: "Seguimientos criticos",
      value: String(urgentFollowUps),
      note: "Casos que requieren accion inmediata."
    },
    {
      label: "Cierres pendientes",
      value: String(pendingClosures.length),
      note: "Operaciones cercanas a cierre."
    },
    {
      label: "Actividad comercial del mes",
      value: String(monthlyActivityTotal),
      note: "Valores y comunicados con movimiento real."
    },
    {
      label: "Equipo operativo en accion",
      value: String(totalStaff),
      note: "Direccion, staff, recepcion y asesores activos."
    }
  ];

  const inventoryMix = [
    {
      label: "Activas",
      total: menuStats.active,
      share: Math.round((menuStats.active / Math.max(totalProperties, 1)) * 100),
      tone: "blue" as SectionTone
    },
    {
      label: "Cerradas",
      total: menuStats.closed,
      share: Math.round((menuStats.closed / Math.max(totalProperties, 1)) * 100),
      tone: "gold" as SectionTone
    },
    {
      label: "Canceladas",
      total: menuStats.cancelled,
      share: Math.round((menuStats.cancelled / Math.max(totalProperties, 1)) * 100),
      tone: "red" as SectionTone
    }
  ];

  const riskInsight = followUpAlerts.find((item) => item.sentiment === "sensible / en riesgo") ?? followUpAlerts[0];
  const cancelProcess = openProcesses.find((process) => process.type === "Cancelacion");
  const closureProcess = pendingClosures[0];
  const staleVisit = pipelineItems.find((item) => item.stage === "Visitas");
  const priceSensitiveLead = followUpAlerts.find((item) => item.priority === "alta") ?? followUpAlerts[0];

  const executiveAlerts = [
    {
      title: "Cliente sensible por precio",
      detail: `${riskInsight?.clientName ?? "Lead prioritario"} requiere ajuste comercial y contacto puntual.`,
      priority: "alta" as RemaxPriorityLevel,
      href: "/remax-demo/analisis"
    },
    {
      title: "Cancelacion pendiente de validacion",
      detail: `${cancelProcess?.property ?? "RTV-571"} necesita confirmacion de salida y comunicado final.`,
      priority: "alta" as RemaxPriorityLevel,
      href: cancelProcess?.href ?? "/remax-demo/cancelacion?step=registro&propiedad=RTV-571"
    },
    {
      title: "Cierre esperando comunicado",
      detail: `${closureProcess?.itemLabel ?? "CBR-1748"} avanza a cierre y debe pasar a circuito administrativo.`,
      priority: "media" as RemaxPriorityLevel,
      href: "/remax-demo/pipeline"
    },
    {
      title: "Seguimiento vencido",
      detail: `${priceSensitiveLead?.clientName ?? "Prospecto activo"} necesita recontacto antes del final del dia.`,
      priority: "alta" as RemaxPriorityLevel,
      href: "/remax-demo/analisis"
    },
    {
      title: "Propiedad con visitas activas sin actualizacion",
      detail: `${staleVisit?.itemLabel ?? "ICV-441"} sigue en visitas y requiere feedback comercial inmediato.`,
      priority: "media" as RemaxPriorityLevel,
      href: "/remax-demo/pipeline"
    }
  ];

  const recentActivities = [
    ...remaxDemoCommunications.map((item) => ({
      date: item.fecha,
      category:
        language === "en"
          ? `${translateCommunicationType(language, item.tipo)} communication`
          : `Comunicado ${item.tipo}`,
      title: `${translateCommunicationType(language, item.tipo)} · ${item.propiedadClave}`,
      detail:
        language === "en"
          ? `${item.destinatarios.length} recipients · ${item.remitente}`
          : `${item.destinatarios.length} destinatarios · ${item.remitente}`,
      href: `/remax-demo/comunicados?comunicado=${item.id}`
    })),
    ...valueHistory.map((item) => ({
      date: item.fecha,
      category: t("Actualizacion de valor"),
      title: `${item.propiedadClave} · ${t(item.motivoCambio)}`,
      detail: `${formatCurrencyMXN(item.valor, language)} · ${item.usuario}`,
      href: `/remax-demo/valores?propiedad=${item.propiedadClave}`
    }))
  ]
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, 6);

  return (
    <div className="remax-page-stack">
      <section className="remax-premium-hero">
        <div className="remax-premium-hero-copy">
          <p className="remax-hero-kicker">{t("REMAX ACTIVA | PLATAFORMA OPERATIVA INMOBILIARIA")}</p>
          <h1>{t("REMAX Activa | Plataforma Operativa Inmobiliaria")}</h1>
          <p className="remax-hero-description">{t("Sistema inmobiliario moderno desarrollado en Astro para centralizar la operacion comercial, administrativa y ejecutiva de una oficina inmobiliaria en una sola plataforma mas clara, rapida y escalable.")}</p>

          <div className="remax-hero-actions">
            <Link href="/remax-demo/pipeline" className="button">
              {t("Ver pipeline operativo")}
            </Link>
            <Link href="/remax-demo/analisis" className="button button-secondary">
              {t("Abrir analisis inteligente")}
            </Link>
            <Link href="/remax-demo#roadmap-producto" className="button button-secondary">
              {t("Ver roadmap movil")}
            </Link>
          </div>

          <div className="remax-hero-benefits">
            <span>{t("Astro, Supabase y Railway")}</span>
            <span>{t("Gestion centralizada de propiedades, asesores, propietarios, visitas y cierres")}</span>
            <span>{t("Plataforma disenada para la operacion inmobiliaria real")}</span>
          </div>
        </div>

        <aside className="remax-executive-panel">
          <div className="remax-executive-topline">
            <span>{t("Vista ejecutiva")}</span>
            <strong>{t("Direccion, administracion y coordinacion comercial")}</strong>
            <p className="remax-executive-caption">
              {t("Lectura sintetica del inventario, actividad, prioridades y capacidad de cierre desde una sola vista.")}
            </p>
          </div>
          <div className="remax-executive-grid">
            <article className="remax-executive-item">
              <span>{t("Pipeline activo")}</span>
              <strong>{pipelineSummary.active}</strong>
              <p>{t("Oportunidades visibles entre lead, visitas, negociacion y cierre.")}</p>
            </article>
            <article className="remax-executive-item">
              <span>{t("Alertas de seguimiento")}</span>
              <strong>{sentimentSummary.highPriority}</strong>
              <p>{t("Casos con prioridad alta detectados por la capa inteligente.")}</p>
            </article>
            <article className="remax-executive-item">
              <span>{t("Cierres pendientes")}</span>
              <strong>{pendingClosures.length}</strong>
              <p>{t("Operaciones en negociacion o cierre con accion inmediata.")}</p>
            </article>
            <article className="remax-executive-item">
              <span>{t("Estado del equipo")}</span>
              <strong>
                {menuStats.advisorsA}A / {menuStats.advisorsM}M
              </strong>
              <p>{t("Equipo comercial activo con soporte administrativo y recepcion.")}</p>
            </article>
          </div>
        </aside>
      </section>

      <div className="remax-kpi-grid">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="remax-kpi-card">
            <span>{t(kpi.label)}</span>
            <strong>{kpi.value}</strong>
            <p>{t(kpi.note)}</p>
          </article>
        ))}
      </div>

      <div className="remax-benefit-strip">
        {benefitStrip.map((item) => (
          <span key={item}>{t(item)}</span>
        ))}
      </div>

      <AccessSection title={t("Por que esta plataforma")} accent="blue">
        <div className="remax-benefits-grid">
          {benefitCards.map((benefit) => (
            <article key={benefit.title} className="remax-benefit-card">
              <span className="remax-benefit-icon">{benefit.icon}</span>
              <strong>{t(benefit.title)}</strong>
              <p>{t(benefit.copy)}</p>
            </article>
          ))}
        </div>
      </AccessSection>

      <AccessSection
        title={t("Plataforma ejecutiva")}
        accent="red"
        action={<span className="remax-section-badge">{language === "en" ? "Leadership & coordination" : "Direccion y coordinacion"}</span>}
      >
        <div className="remax-executive-command">
          <div className="remax-executive-command-header">
            <div className="remax-executive-command-copy">
              <span>{t("Plataforma ejecutiva")}</span>
              <strong>
                {language === "en"
                  ? "Leadership view to supervise inventory, open processes, commercial activity and priority follow-up from a single screen."
                  : "Lectura de direccion para supervisar inventario, procesos abiertos, actividad comercial y seguimiento prioritario desde una sola vista."}
              </strong>
              <p>{t("Un cockpit de pilotaje inmobiliario con foco en operacion, ritmo comercial, alertas y capacidad de respuesta del equipo.")}</p>
            </div>
            <div className="remax-executive-command-status">
              <span>{t("Corte operativo")}</span>
              <strong>{t("25 de marzo de 2026")}</strong>
              <p>{t("Operacion estable con actividad comercial alta, seguimiento prioritario visible y cierres por destrabar.")}</p>
            </div>
          </div>

          <div className="remax-executive-kpi-grid">
            {executiveKpis.map((kpi) => (
              <article key={kpi.label} className="remax-executive-kpi">
                <span>{t(kpi.label)}</span>
                <strong>{kpi.value}</strong>
                <p>{t(kpi.note)}</p>
              </article>
            ))}
          </div>

          <div className="remax-executive-command-grid">
            <article className="remax-command-card">
              <div className="remax-command-card-header">
                <span>{language === "en" ? "Inventory overview" : "Estado general del inventario"}</span>
                <strong>{language === "en" ? `${totalProperties} properties monitored` : `${totalProperties} propiedades monitoreadas`}</strong>
              </div>
              <div className="remax-inventory-stack">
                {inventoryMix.map((item) => (
                  <div key={item.label} className="remax-inventory-row">
                    <div className="remax-inventory-copy">
                      <strong>{t(item.label)}</strong>
                      <span>{language === "en" ? `${item.total} properties` : `${item.total} propiedades`}</span>
                    </div>
                    <div className={`remax-inventory-meter remax-inventory-meter-${item.tone}`}>
                      <span style={{ width: `${item.share}%` }} />
                    </div>
                    <strong className="remax-inventory-share">{item.share}%</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="remax-command-card">
              <div className="remax-command-card-header">
                <span>{t("Procesos criticos del dia")}</span>
                <strong>{language === "en" ? `${openProcesses.length} active workstreams` : `${openProcesses.length} frentes abiertos`}</strong>
              </div>
              <div className="remax-executive-process-list">
                {openProcesses.map((process) => (
                  <Link key={`${process.type}-${process.property}`} href={process.href} className="remax-executive-process-card">
                    <div className="remax-executive-process-topline">
                      <span>{t(process.type)}</span>
                      <PriorityBadge priority={process.priority} language={language} />
                    </div>
                    <strong>{process.property}</strong>
                    <p>{t(process.stage)}</p>
                    <div className="remax-executive-process-next">
                      <span>{language === "en" ? "Next action" : "Proxima accion"}</span>
                      <strong>{t(process.nextAction)}</strong>
                    </div>
                    <div className="remax-executive-process-owners">
                      <div className="remax-owner-avatar-row">
                        {process.owners.map((owner) => (
                          <span key={owner} className="remax-owner-avatar">
                            {getInitials(owner)}
                          </span>
                        ))}
                      </div>
                      <small>{process.owners.join(" · ")}</small>
                    </div>
                  </Link>
                ))}
              </div>
            </article>

            <article className="remax-command-card">
              <div className="remax-command-card-header">
                <span>{t("Resumen del pipeline comercial")}</span>
                <strong>{language === "en" ? `${pipelineSummary.total} active and monitored opportunities` : `${pipelineSummary.total} oportunidades activas y monitorizadas`}</strong>
              </div>
              <div className="remax-stage-overview remax-stage-overview-dense">
                {stageOverview.map((item) => (
                  <div key={item.stage} className="remax-stage-row">
                    <span>{translatePipelineStage(language, item.stage)}</span>
                    <strong>{item.total}</strong>
                  </div>
                ))}
              </div>
              <div className="remax-pipeline-summary-cards">
                <div className="remax-pipeline-summary-card">
                  <span>{language === "en" ? "Hot opportunities" : "Oportunidades calientes"}</span>
                  <strong>{hotOpportunities}</strong>
                </div>
                <div className="remax-pipeline-summary-card">
                  <span>{language === "en" ? "Urgent follow-ups" : "Seguimientos urgentes"}</span>
                  <strong>{urgentFollowUps}</strong>
                </div>
                <div className="remax-pipeline-summary-card">
                  <span>{language === "en" ? "Closing probability" : "Probabilidad de cierre"}</span>
                  <strong>{closeProbability}%</strong>
                </div>
              </div>
              <div className="remax-inline-actions">
                <Link href="/remax-demo/pipeline?view=kanban" className="button button-secondary">
                  {t("Ver Kanban")}
                </Link>
                <Link href="/remax-demo/pipeline?view=list" className="button button-secondary">
                  {t("Ver Lista")}
                </Link>
              </div>
            </article>

            <article className="remax-command-card">
              <div className="remax-command-card-header">
                <span>{t("Alertas y seguimiento prioritario")}</span>
                <strong>{t("Alertas ejecutivas")}</strong>
              </div>
              <div className="remax-alert-list">
                {executiveAlerts.map((alert) => (
                  <Link key={alert.title} href={alert.href} className="remax-alert-card">
                    <div className="remax-alert-card-topline">
                      <strong>{t(alert.title)}</strong>
                      <PriorityBadge priority={alert.priority} language={language} />
                    </div>
                    <p>{language === "en"
                      ? alert.detail
                          .replace("requiere ajuste comercial y contacto puntual.", "requires commercial adjustment and timely contact.")
                          .replace("necesita confirmacion de salida y comunicado final.", "needs offboarding confirmation and final communication.")
                          .replace("avanza a cierre y debe pasar a circuito administrativo.", "is moving toward closing and should enter the administrative circuit.")
                          .replace("necesita recontacto antes del final del dia.", "needs to be recontacted before the end of the day.")
                          .replace("sigue en visitas y requiere feedback comercial inmediato.", "remains in visits and needs immediate commercial feedback.")
                      : alert.detail}</p>
                  </Link>
                ))}
              </div>
            </article>
          </div>

          <p className="remax-executive-closing">
            {t("Disenada para direccion, coordinacion y control comercial con una lectura mas clara, rapida y accionable.")}
          </p>
        </div>
      </AccessSection>

      <div className="remax-dashboard-grid">
        {dashboardSections.map((section) => (
          <AccessSection
            key={section.title}
            title={t(section.title)}
            accent={section.accent}
            action={<span className="remax-section-badge">{language === "en" ? `${section.cards.length} modules` : `${section.cards.length} modulos`}</span>}
          >
            <p className="remax-section-copy">{t(section.description)}</p>
            <div className="remax-action-grid">
              {section.cards.map((card) => (
                <Link key={card.title} href={card.href} className={`remax-action-card remax-action-card-${card.tone}`}>
                  <div className="remax-action-header">
                    <span className="remax-action-icon">{card.icon}</span>
                    <div className="remax-action-topline">
                      <span>{t(card.note)}</span>
                      <strong>{t(card.title)}</strong>
                    </div>
                  </div>
                  <p>{t(card.description)}</p>
                  <div className="remax-action-pills">
                    {card.pills.map((pill) => (
                      <span key={pill} className="remax-action-pill">
                        {t(pill)}
                      </span>
                    ))}
                  </div>
                  <span className="remax-action-cta">{t(card.cta)}</span>
                </Link>
              ))}
            </div>
          </AccessSection>
        ))}
      </div>

      <AccessSection title={t("Capa comercial avanzada")} accent="gold">
        <p className="remax-section-copy">
          {language === "en"
            ? "Two differentiators turn the platform into a commercial leadership tool: an intelligent layer with Hugging Face and an operational pipeline with a visual CRM-style reading."
            : "Dos diferenciadores para convertir la plataforma en una herramienta de direccion comercial: una capa inteligente con Hugging Face y un pipeline operativo con lectura visual tipo CRM inmobiliario."}
        </p>
        <div className="remax-advanced-grid">
          <article className="remax-feature-panel">
            <div className="remax-feature-panel-header">
              <span className="remax-feature-icon">IA</span>
              <div>
                <strong>{t("Analisis inteligente")}</strong>
                <p>
                  {language === "en"
                    ? "Hugging Face assisted classification reads agent notes, client comments and commercial signals to prioritize follow-ups, detect sensitive opportunities and improve commercial decision-making."
                    : "Clasificacion asistida con Hugging Face para leer notas de asesores, comentarios de clientes y senales comerciales con el fin de priorizar seguimientos, detectar oportunidades sensibles y mejorar la toma de decision comercial."}
                </p>
              </div>
            </div>

            <div className="remax-feature-preview-list">
              {followUpAlerts.slice(0, 4).map((item) => (
                <Link key={item.id} href="/remax-demo/analisis" className="remax-feature-preview-card">
                  <div className="remax-feature-preview-topline">
                    <strong>{item.clientName}</strong>
                    <span>{item.nextFollowUp}</span>
                  </div>
                  <p>{item.note}</p>
                  <div className="remax-feature-preview-badges">
                    <SentimentBadge sentiment={item.sentiment} language={language} />
                    <PriorityBadge priority={item.priority} language={language} />
                    <span className="remax-recommendation-pill">{item.suggestedAction}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="remax-feature-footer">
              <small>
                {language === "en"
                  ? `High priority: ${sentimentPriority.alta} · Medium: ${sentimentPriority.media} · Low: ${sentimentPriority.baja}`
                  : `Prioridad alta: ${sentimentPriority.alta} · Media: ${sentimentPriority.media} · Baja: ${sentimentPriority.baja}`}
              </small>
              <Link href="/remax-demo/analisis">{t("Abrir analisis inteligente")}</Link>
            </div>
          </article>

          <article className="remax-feature-panel">
            <div className="remax-feature-panel-header">
              <span className="remax-feature-icon">KAN</span>
              <div>
                <strong>{t("Pipeline operativo")}</strong>
                <p>
                  {language === "en"
                    ? "Kanban and List views to track leads, onboarding, publishing, visits, negotiation, closing and cancellation with visible next action, sentiment, priority and commercial reference."
                    : "Vista Kanban y Lista para seguir leads, altas, publicaciones, visitas, negociacion, cierre y cancelacion con proxima accion, sentimiento, prioridad y referencia comercial visibles."}
                </p>
              </div>
            </div>

            <div className="remax-mini-board">
              {pipelineItems.slice(0, 5).map((item) => (
                <Link key={item.id} href="/remax-demo/pipeline" className="remax-mini-board-card">
                  <div className="remax-feature-preview-topline">
                    <strong>{item.itemLabel}</strong>
                    <span>{translatePipelineStage(language, item.stage)}</span>
                  </div>
                  <p>{item.nextAction}</p>
                  <div className="remax-feature-preview-badges">
                    <SentimentBadge sentiment={item.sentiment} language={language} />
                    <PriorityBadge priority={item.priority} language={language} />
                  </div>
                  <small>{item.commercialReference}</small>
                </Link>
              ))}
            </div>

            <div className="remax-feature-footer">
              <small>
                {language === "en"
                  ? `Active pipeline: ${pipelineSummary.active} · At-risk cases: ${pipelineSummary.risk} · Kanban + List view`
                  : `Pipeline activo: ${pipelineSummary.active} · Casos sensibles: ${pipelineSummary.risk} · Vista Kanban + Lista`}
              </small>
              <Link href="/remax-demo/pipeline">{t("Ver pipeline operativo")}</Link>
            </div>
          </article>
        </div>
      </AccessSection>

      <AccessSection title={t("Hoja de ruta del producto")} accent="blue">
        <div className="remax-roadmap-grid">
          <article className="remax-context-card remax-roadmap-card">
            <span>{language === "en" ? "Stage 1" : "Etapa 1"}</span>
            <strong>{language === "en" ? "Web Operations Platform" : "Plataforma Web Operativa"}</strong>
            <p>
              {language === "en"
                ? "Designed for leadership, administration, commercial coordination and internal operations. This stage centralizes properties, owners, agents, visits, closings, cancellations, commissions and operational control in a modern, clear and scalable web interface."
                : "Pensada para direccion, administracion, coordinacion comercial y operacion interna. Esta etapa centraliza la gestion de propiedades, propietarios, asesores, visitas, cierres, cancelaciones, comisiones y control operativo en una interfaz web moderna, clara y escalable."}
            </p>
            <ul className="remax-feature-list">
              <li>{t("Gestion centralizada")}</li>
              <li>{language === "en" ? "Clearer operating flow" : "Flujo operativo mas claro"}</li>
              <li>{language === "en" ? "Stronger administrative control" : "Mayor control administrativo"}</li>
              <li>{language === "en" ? "Foundation ready for future growth" : "Base lista para crecimiento futuro"}</li>
            </ul>
          </article>

          <article className="remax-context-card remax-roadmap-card">
            <span>{language === "en" ? "Stage 2" : "Etapa 2"}</span>
            <strong>{language === "en" ? "Mobile App for Field Agents" : "App movil para asesores en campo"}</strong>
            <p>
              {language === "en"
                ? "Natural evolution of the platform toward a mobile experience for iPhone and Android, connected to the same operating base for lookup, follow-up, visits, communication and rapid field updates."
                : "Evolucion natural de la plataforma hacia una experiencia movil para iPhone y Android, conectada a la misma base operativa para consulta, seguimiento, visitas, comunicacion y actualizacion rapida de operaciones en campo."}
            </p>
            <ul className="remax-feature-list">
              <li>{t("Dashboard del asesor")}</li>
              <li>{t("Agenda de visitas")}</li>
              <li>{t("Ficha de propiedad")}</li>
              <li>{language === "en" ? "Prospect follow-up" : "Seguimiento de prospectos"}</li>
              <li>{language === "en" ? "Quick visit logging" : "Registro rapido de visitas"}</li>
              <li>{language === "en" ? "Call, WhatsApp and location" : "Llamada, WhatsApp y ubicacion"}</li>
              <li>{language === "en" ? "Photo and notes upload" : "Carga de fotos y notas"}</li>
              <li>{language === "en" ? "Reminders and notifications" : "Recordatorios y notificaciones"}</li>
            </ul>
          </article>
        </div>

        <div className="remax-roadmap-summary">
          <span>{language === "en" ? "Final note" : "Subtexto final"}</span>
          <strong>{language === "en" ? "One platform, two usage layers" : "Una sola plataforma, dos niveles de uso"}</strong>
          <ol className="remax-roadmap-list">
            <li>{language === "en" ? "Web operations for administration and control" : "Operacion web para administracion y control"}</li>
            <li>{language === "en" ? "Mobile experience for field commercial productivity" : "Experiencia movil para productividad comercial en campo"}</li>
          </ol>
        </div>
      </AccessSection>

      <div id="roadmap-producto">
        <AccessSection
          title={t("Etapa 2 — App movil para asesores en campo")}
          accent="gold"
          action={<span className="remax-section-badge">{language === "en" ? "iPhone and Android via wrapper" : "iPhone y Android via wrapper"}</span>}
        >
          <div className="remax-mobile-stage">
            <div className="remax-mobile-stage-copy">
              <span>{language === "en" ? "Mobile commercial productivity" : "Productividad comercial movil"}</span>
              <strong>{language === "en" ? "Mobile version focused on commercial productivity for agents outside the office." : "Version movil enfocada en productividad comercial para asesores fuera de oficina."}</strong>
              <p>
                {language === "en"
                  ? "Designed for iPhone and Android through a wrapper, connected to the same operating base for lookup, follow-up, visits, communication and rapid field updates."
                  : "Disenada para iPhone y Android mediante wrapper, conectada a la misma base operativa para consulta, seguimiento, visitas, comunicacion y actualizacion rapida de operaciones en campo."}
              </p>

              <div className="remax-mobile-stage-summary">
                <span>{language === "en" ? "One platform, two usage layers" : "Una sola plataforma, dos niveles de uso"}</span>
                <ol className="remax-roadmap-list">
                  <li>{language === "en" ? "Web operations for administration and control" : "Operacion web para administracion y control"}</li>
                  <li>{language === "en" ? "Mobile experience for field commercial productivity" : "Experiencia movil para productividad comercial en campo"}</li>
                </ol>
              </div>

              <div className="remax-mobile-stage-pills">
                <span>{language === "en" ? "Fast lookup" : "Consulta rapida"}</span>
                <span>{language === "en" ? "Commercial follow-up" : "Seguimiento comercial"}</span>
                <span>{language === "en" ? "Visits and location" : "Visitas y ubicacion"}</span>
                <span>{language === "en" ? "Operations from the phone" : "Operacion desde el telefono"}</span>
              </div>
            </div>

            <div className="remax-mobile-grid">
              {mobileScreens.map((screen) => (
                <article key={screen.title} className={`remax-phone-mock remax-phone-mock-${screen.style}`}>
                  <div className="remax-phone-shell">
                    <div className="remax-phone-notch" />
                    <div className="remax-phone-screen">
                      <div className="remax-phone-statusbar">
                        <span>9:41</span>
                        <small>5G · 92%</small>
                      </div>

                      <div className="remax-phone-topline">
                        <span>{t(screen.title)}</span>
                        <strong>{t(screen.subtitle)}</strong>
                      </div>

                      {screen.style === "dashboard" ? (
                        <div className="remax-phone-hero-card">
                          <strong>{language === "en" ? "Commercial day in progress" : "Jornada comercial en curso"}</strong>
                          <p>{screen.note ? t(screen.note) : null}</p>
                        </div>
                      ) : null}

                      {screen.kpis ? (
                        <div className="remax-phone-kpi-grid">
                          {screen.kpis.map((kpi) => (
                            <div key={kpi.label} className="remax-phone-kpi">
                              <span>{t(kpi.label)}</span>
                              <strong>{kpi.value}</strong>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {screen.visits ? (
                        <div className="remax-phone-visit-list">
                          {screen.visits.map((visit) => (
                            <div key={`${visit.time}-${visit.client}`} className="remax-phone-visit-card">
                              <div>
                                <span>{visit.time}</span>
                                <strong>{visit.client}</strong>
                              </div>
                              <div>
                                <span>{visit.property}</span>
                                <strong>{t(visit.status)}</strong>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {screen.style === "agenda" ? (
                        <div className="remax-phone-route-card">
                          <span>{language === "en" ? "Active route" : "Ruta activa"}</span>
                          <strong>{language === "en" ? "West zone ready for coverage" : "Zona poniente lista para cobertura"}</strong>
                        </div>
                      ) : null}

                      {screen.style === "property" ? <div className="remax-phone-photo">{language === "en" ? "West side residence" : "Residencial poniente"}</div> : null}

                      {screen.details ? (
                        <div className="remax-phone-detail-stack">
                          {screen.details.map((detail) => (
                            <div key={detail.label} className="remax-phone-detail-card">
                              <span>{t(detail.label)}</span>
                              <strong>{t(detail.value)}</strong>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {screen.note ? <div className="remax-phone-note">{t(screen.note)}</div> : null}

                      <div className="remax-phone-actions">
                        {screen.actions.map((action) => (
                          <span key={action} className="remax-phone-action">
                            {t(action)}
                          </span>
                        ))}
                      </div>

                      <div className="remax-phone-bottomnav">
                        <span className="active">{language === "en" ? "Home" : "Inicio"}</span>
                        <span>{language === "en" ? "Agenda" : "Agenda"}</span>
                        <span>{language === "en" ? "Prospects" : "Prospectos"}</span>
                        <span>{language === "en" ? "More" : "Mas"}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <p className="remax-mobile-footnote">
            {t("Pensado para asesores en movimiento: visitas, seguimiento, contacto y operacion rapida desde el telefono.")}
          </p>
        </AccessSection>
      </div>

      <div className="remax-dashboard-lower">
        <AccessSection title={t("Actividad reciente")} accent="blue">
          <div className="remax-activity-list">
            {recentActivities.map((item) => (
              <Link
                key={`${item.date}-${item.title}`}
                href={item.href}
                className={`remax-activity-item remax-activity-item-${getActivityTone(item.category)}`}
              >
                <div className="remax-activity-topline">
                  <span className={`remax-activity-tag remax-activity-tag-${getActivityTone(item.category)}`}>
                    {item.category}
                  </span>
                  <time>{formatShortDate(item.date, language)}</time>
                </div>
                <div className="remax-activity-meta">
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
              </Link>
            ))}
          </div>
        </AccessSection>

        <div className="remax-dashboard-side">
          <AccessSection title={t("Procesos abiertos")} accent="red">
            <div className="remax-process-list">
              {openProcesses.map((process) => (
                <Link key={`${process.type}-${process.property}`} href={process.href} className="remax-process-card">
                  <div className="remax-process-topline">
                    <span>{t(process.type)}</span>
                    <PriorityBadge priority={process.priority} language={language} />
                  </div>
                  <strong>{process.property}</strong>
                  <p>{t(process.stage)}</p>
                  <div className="remax-process-next">
                    <span>{language === "en" ? "Next action" : "Proxima accion"}</span>
                    <strong>{t(process.nextAction)}</strong>
                  </div>
                  <div className="remax-process-meta">
                    <div className="remax-process-owners">
                      <div className="remax-owner-avatar-row">
                        {process.owners.map((owner) => (
                          <span key={owner} className="remax-owner-avatar">
                            {getInitials(owner)}
                          </span>
                        ))}
                      </div>
                      <small>{process.owners.join(" · ")}</small>
                    </div>
                    <em>{t(process.status)}</em>
                  </div>
                </Link>
              ))}
            </div>
          </AccessSection>

          <AccessSection title={t("Acciones rapidas")} accent="gold">
            <div className="remax-quick-actions">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href} className="remax-quick-action">
                  <div className="remax-quick-action-topline">
                    <span className="remax-action-icon">{action.icon}</span>
                    <span className="remax-quick-action-tag">{t(action.tag)}</span>
                  </div>
                  <strong>{t(action.title)}</strong>
                  <p>{t(action.description)}</p>
                </Link>
              ))}
            </div>
          </AccessSection>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

import { remaxDemoAdvisors, remaxDemoCommunications } from "@/remax-demo/data";
import { AccessSection } from "@/remax-demo/components/access-section";
import { PriorityBadge } from "@/remax-demo/components/priority-badge";
import { SentimentBadge } from "@/remax-demo/components/sentiment-badge";
import { formatCurrencyMXN } from "@/remax-demo/formatters";
import {
  getAllValueHistory,
  getMenuStats,
  getPipelineItems,
  getPipelineSummary,
  getSentimentActionQueue,
  getSentimentCountsByPriority,
  getSentimentSummary
} from "@/remax-demo/stats";

type SectionTone = "blue" | "red" | "gold";

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

const dashboardSections: DashboardSection[] = [
  {
    title: "Operacion comercial",
    description:
      "Procesos centrales para alta, baja, cancelacion y seguimiento de visitas dentro de una operacion mas clara, elegante y accionable.",
    accent: "red",
    cards: [
      {
        icon: "ALT",
        title: "Altas",
        description: "Generacion de clave, expediente, condiciones de operacion, asesores y ficha tecnica.",
        href: "/remax-demo/alta?step=clave&propiedad=IBR-OP277",
        cta: "Abrir alta",
        note: "Flujo continuo de captura y validacion.",
        pills: ["Clave", "Expediente", "Ficha tecnica"],
        tone: "blue"
      },
      {
        icon: "CIE",
        title: "Bajas / cierres",
        description: "Cierre operativo con revision de valores, asesores involucrados y salida comercial.",
        href: "/remax-demo/baja?step=registro&propiedad=CBR-1748",
        cta: "Abrir cierre",
        note: "Control de estatus y comunicado final.",
        pills: ["Cierre", "Valores", "Comunicado"],
        tone: "red"
      },
      {
        icon: "CAN",
        title: "Cancelaciones",
        description: "Registro de motivo, condicion de comision, responsables y trazabilidad del proceso.",
        href: "/remax-demo/cancelacion?step=registro&propiedad=RTV-571",
        cta: "Abrir cancelacion",
        note: "Seguimiento puntual hasta su salida de cartera.",
        pills: ["Motivo", "Asesores", "Bitacora"],
        tone: "gold"
      },
      {
        icon: "VIS",
        title: "Visitas y recorridos",
        description: "Agenda comercial, recorridos de campo y programacion operativa para seguimiento real.",
        href: "/remax-demo/baja?step=busqueda&propiedad=CBR-1748",
        cta: "Ver agenda",
        note: "Ideal para control comercial y coordinacion diaria.",
        pills: ["Visitas", "Recorridos", "Agenda"],
        tone: "blue"
      }
    ]
  },
  {
    title: "Gestion de cartera",
    description:
      "Control centralizado del inventario, historico de valores, propietarios y elementos operativos por inmueble.",
    accent: "blue",
    cards: [
      {
        icon: "CAR",
        title: "Propiedades",
        description: "Vista integral del expediente, ubicacion, origen, estatus y contexto comercial.",
        href: "/remax-demo/propiedades",
        cta: "Ver propiedades",
        note: "Base limpia para inventario y operacion diaria.",
        pills: ["Expediente", "Estatus", "Origen"],
        tone: "blue"
      },
      {
        icon: "VAL",
        title: "Valores",
        description: "Historico comercial con motivo de cambio, posicion y referencia para minuta.",
        href: "/remax-demo/valores?propiedad=CBR-1748",
        cta: "Ver valores",
        note: "Lectura rapida del precio y su evolucion.",
        pills: ["Historico", "Precio", "Minuta"],
        tone: "gold"
      },
      {
        icon: "PRO",
        title: "Propietarios",
        description: "Relacion de propietarios, copropiedad, datos de contacto y contexto por inmueble.",
        href: "/remax-demo/propietarios?propiedad=IBR-OP277",
        cta: "Ver propietarios",
        note: "Navegacion directa a ficha tecnica y expediente.",
        pills: ["Contacto", "Copropiedad", "Ficha"],
        tone: "blue"
      },
      {
        icon: "LLV",
        title: "Control de llaves",
        description: "Disponibilidad para visitas, recepcion, citas y seguimiento operativo por propiedad.",
        href: "/remax-demo/alta?step=expediente&propiedad=IBR-OP277",
        cta: "Abrir control",
        note: "Permite coordinar recepcion y agenda comercial.",
        pills: ["Llaves", "Citas", "Recepcion"],
        tone: "red"
      }
    ]
  },
  {
    title: "Equipo y seguimiento",
    description:
      "Operacion alineada entre asesores, staff administrativo, guardias y control de comisiones en un solo entorno.",
    accent: "gold",
    cards: [
      {
        icon: "ASE",
        title: "Asesores",
        description: "Clase A y M, participacion por contexto y visibilidad del equipo comercial completo.",
        href: "/remax-demo/asesores",
        cta: "Ver asesores",
        note: "Pedro Leyva participa como Director General y Asesor A.",
        pills: ["Clase A/M", "Participacion", "Equipo"],
        tone: "blue"
      },
      {
        icon: "GRD",
        title: "Guardias",
        description: "Cobertura comercial, continuidad de atencion y coordinacion de recepcion.",
        href: "/remax-demo/asesores",
        cta: "Ver guardias",
        note: "Organizacion operativa para turnos y seguimiento.",
        pills: ["Cobertura", "Recepcion", "Seguimiento"],
        tone: "gold"
      },
      {
        icon: "COM",
        title: "Comisiones",
        description: "Esquemas por politica o monto, visibles para la operacion y el equipo administrativo.",
        href: "/remax-demo/alta?step=condiciones&propiedad=IBR-OP277",
        cta: "Ver comisiones",
        note: "Mayor claridad para asesores A, M y staff.",
        pills: ["Politica", "Monto", "Control"],
        tone: "red"
      },
      {
        icon: "REC",
        title: "Recorridos",
        description: "Seguimiento de campo para visitas, cierres y acompanamiento comercial por zona.",
        href: "/remax-demo/baja?step=busqueda&propiedad=CBR-1748",
        cta: "Ver recorridos",
        note: "Conecta agenda, cartera y contacto comercial.",
        pills: ["Campo", "Zona", "Cobertura"],
        tone: "blue"
      }
    ]
  },
  {
    title: "Control y reportes",
    description:
      "Trazabilidad ejecutiva para comunicados, minutas, cartera y roadmap de una arquitectura mas rapida y escalable.",
    accent: "blue",
    cards: [
      {
        icon: "MSG",
        title: "Comunicados",
        description: "Bitacora centralizada de altas, bajas y cancelaciones con vista previa y estado.",
        href: "/remax-demo/comunicados",
        cta: "Ver comunicados",
        note: "Todo el equipo opera sobre el mismo historial.",
        pills: ["Alta", "Baja", "Cancelacion"],
        tone: "red"
      },
      {
        icon: "MIN",
        title: "Minutas",
        description: "Cambios comerciales listos para minuta con referencias directas a valores y cierres.",
        href: "/remax-demo/valores?propiedad=CBR-1748",
        cta: "Ver minutas",
        note: "Menos friccion para el cierre administrativo.",
        pills: ["Cambios", "Motivos", "Versiones"],
        tone: "gold"
      },
      {
        icon: "RPT",
        title: "Reporte de cartera",
        description: "Lectura ejecutiva del inventario, procesos abiertos y actividad reciente del equipo.",
        href: "/remax-demo",
        cta: "Ver reporte",
        note: "Vista premium para direccion y coordinacion operativa.",
        pills: ["KPIs", "Inventario", "Actividad"],
        tone: "blue"
      },
      {
        icon: "WEB",
        title: "Arquitectura web",
        description: "Roadmap del producto con Astro, Supabase, Railway y evolucion futura a wrapper movil.",
        href: "/remax-demo/arquitectura",
        cta: "Ver arquitectura",
        note: "Base preparada para crecer sin perder claridad operativa.",
        pills: ["Astro", "Supabase", "Railway"],
        tone: "red"
      }
    ]
  }
];

const benefitCards = [
  {
    icon: "OPS",
    title: "Operacion centralizada",
    copy: "Propiedades, asesores, propietarios, visitas y cierres viven en un solo entorno operativo."
  },
  {
    icon: "DIR",
    title: "Pilotaje ejecutivo",
    copy: "Direccion y coordinacion comercial ven actividad, prioridades, pipeline y alertas desde una vista unica."
  },
  {
    icon: "MOV",
    title: "Roadmap movil real",
    copy: "La web resuelve administracion y control ahora, mientras la etapa movil acelera el trabajo del asesor en campo."
  },
  {
    icon: "INT",
    title: "Capa inteligente util",
    copy: "Hugging Face se usa para priorizar seguimientos y detectar riesgo comercial, no como un recurso cosmetico."
  }
];

const openProcesses = [
  {
    type: "Alta",
    property: "IBR-OP277",
    stage: "Expediente, condiciones y ficha tecnica",
    owner: "Pedro Leyva y Patricia Romo",
    href: "/remax-demo/alta?step=expediente&propiedad=IBR-OP277",
    status: "En captura"
  },
  {
    type: "Baja / cierre",
    property: "CBR-1748",
    stage: "Revision de valores y comunicado de salida",
    owner: "Julieta Mora y Erika Valles",
    href: "/remax-demo/baja?step=valores&propiedad=CBR-1748",
    status: "En revision"
  },
  {
    type: "Cancelacion",
    property: "RTV-571",
    stage: "Registro, asesores y condicion de comision",
    owner: "Patricia Romo y Sofia Campos",
    href: "/remax-demo/cancelacion?step=asesores&propiedad=RTV-571",
    status: "Listo para comunicado"
  },
  {
    type: "Seguimiento comercial",
    property: "ICV-441",
    stage: "Visitas, propietarios y control de agenda",
    owner: "Gabriela Perez y Diego Ruiz",
    href: "/remax-demo/propietarios?propiedad=ICV-441",
    status: "En seguimiento"
  }
];

const quickActions = [
  {
    title: "Ver pipeline operativo",
    description: "Visualizar oportunidades en Kanban y Lista con prioridad, sentimiento y referencia comercial.",
    href: "/remax-demo/pipeline"
  },
  {
    title: "Abrir analisis inteligente",
    description: "Priorizar seguimientos con lectura asistida sobre notas y comentarios comerciales.",
    href: "/remax-demo/analisis"
  },
  {
    title: "Nueva alta",
    description: "Abrir un expediente desde clave hasta ficha tecnica.",
    href: "/remax-demo/alta?step=clave&propiedad=IBR-OP277"
  },
  {
    title: "Ver roadmap movil",
    description: "Presentar la evolucion a app para asesores en campo.",
    href: "/remax-demo#roadmap-producto"
  }
];

const mobileScreens = [
  {
    title: "Dashboard del asesor",
    subtitle: "Buenos dias, Carlos",
    style: "dashboard",
    kpis: [
      { label: "Visitas hoy", value: "4" },
      { label: "Propiedades activas", value: "12" },
      { label: "Seguimientos pendientes", value: "7" }
    ],
    actions: ["Registrar visita", "Ver agenda", "Subir evidencia", "Contactar cliente"]
  },
  {
    title: "Agenda de visitas",
    subtitle: "Viernes 25 de marzo",
    style: "agenda",
    visits: [
      "09:30 · Mariana Fuentes · ICV-441 · Confirmada",
      "12:00 · Grupo Laureles · IBR-OP277 · Ruta lista",
      "16:30 · Parques Santa Maria · CBR-1748 · En seguimiento"
    ],
    actions: ["Iniciar ruta", "Marcar llegada"]
  },
  {
    title: "Ficha de propiedad",
    subtitle: "IBR-OP277 · El Zapote del Valle",
    style: "property",
    details: [
      "Precio referencia: MXN 605,253.60",
      "Propietario: Oscar Ivan Olivares",
      "Asesor asignado: Pedro Leyva",
      "Estado: Alta iniciada"
    ],
    actions: ["Llamar", "WhatsApp", "Abrir mapa", "Registrar visita"]
  },
  {
    title: "Seguimiento de prospecto",
    subtitle: "Mariana Fuentes",
    style: "prospect",
    details: [
      "Origen: Referido digital",
      "Interes: Casa familiar zona poniente",
      "Ultima interaccion: WhatsApp hace 2h",
      "Proximo recordatorio: Hoy 16:30"
    ],
    actions: ["Llamada", "WhatsApp", "Correo", "Actualizar estatus"]
  }
];

export default function RemaxMenuOperacionPage() {
  const menuStats = getMenuStats();
  const pipelineSummary = getPipelineSummary();
  const pipelineItems = getPipelineItems();
  const sentimentSummary = getSentimentSummary();
  const sentimentPriority = getSentimentCountsByPriority();
  const followUpAlerts = getSentimentActionQueue();
  const valueHistory = getAllValueHistory();
  const monthlyCommunications = remaxDemoCommunications.filter((item) => item.fecha.startsWith("2026-03")).length;

  const totalStaff = remaxDemoAdvisors.length;
  const adminCount = remaxDemoAdvisors.filter((advisor) => advisor.tipoPersonal === "administrativo").length;
  const receptionCount = remaxDemoAdvisors.filter((advisor) => advisor.tipoPersonal === "recepcion").length;
  const criticalOpportunities = pipelineItems
    .filter((item) => item.priority === "alta" || item.sentiment === "sensible / en riesgo")
    .slice(0, 4);
  const pendingClosures = pipelineItems
    .filter((item) => item.stage === "Negociacion" || item.stage === "Cierre")
    .slice(0, 4);
  const stageOverview = [
    "Nuevo lead",
    "Alta iniciada",
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

  const recentActivities = [
    ...remaxDemoCommunications.map((item) => ({
      date: item.fecha,
      category: `Comunicado ${item.tipo}`,
      title: item.asunto.replace("COMUNICADO INTERNO: ", "").replace(/\.$/, ""),
      detail: item.resumen,
      href: `/remax-demo/comunicados?comunicado=${item.id}`
    })),
    ...valueHistory.map((item) => ({
      date: item.fecha,
      category: "Actualizacion de valor",
      title: `${item.propiedadClave} · ${item.motivoCambio}`,
      detail: `${formatCurrencyMXN(item.valor)} · ${item.usuario}`,
      href: `/remax-demo/valores?propiedad=${item.propiedadClave}`
    }))
  ]
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, 6);

  return (
    <div className="remax-page-stack">
      <section className="remax-premium-hero">
        <div className="remax-premium-hero-copy">
          <p className="remax-hero-kicker">RE/MAX ACTIVA | PLATAFORMA OPERATIVA INMOBILIARIA</p>
          <h1>RE/MAX Activa | Plataforma Operativa Inmobiliaria</h1>
          <p className="remax-hero-description">
            Sistema inmobiliario moderno desarrollado en Astro para centralizar la operacion comercial,
            administrativa y ejecutiva de una oficina inmobiliaria en una sola plataforma mas clara, rapida y
            escalable.
          </p>

          <div className="remax-hero-actions">
            <Link href="/remax-demo/pipeline" className="button">
              Ver pipeline operativo
            </Link>
            <Link href="/remax-demo/analisis" className="button button-secondary">
              Abrir analisis inteligente
            </Link>
            <Link href="/remax-demo#roadmap-producto" className="button button-secondary">
              Ver roadmap movil
            </Link>
          </div>

          <div className="remax-hero-benefits">
            <span>Astro, Supabase y Railway</span>
            <span>Gestion centralizada de propiedades, asesores, propietarios, visitas y cierres</span>
            <span>Plataforma disenada para la operacion inmobiliaria real</span>
          </div>
        </div>

        <aside className="remax-executive-panel">
          <div className="remax-executive-topline">
            <span>Vista ejecutiva</span>
            <strong>Direccion, administracion y coordinacion comercial</strong>
          </div>
          <div className="remax-executive-grid">
            <article className="remax-executive-item">
              <span>Pipeline activo</span>
              <strong>{pipelineSummary.active}</strong>
              <p>Oportunidades visibles entre lead, visitas, negociacion y cierre.</p>
            </article>
            <article className="remax-executive-item">
              <span>Alertas de seguimiento</span>
              <strong>{sentimentSummary.highPriority}</strong>
              <p>Casos con prioridad alta detectados por la capa inteligente.</p>
            </article>
            <article className="remax-executive-item">
              <span>Cierres pendientes</span>
              <strong>{pendingClosures.length}</strong>
              <p>Operaciones en negociacion o cierre con accion inmediata.</p>
            </article>
            <article className="remax-executive-item">
              <span>Estado del equipo</span>
              <strong>
                {menuStats.advisorsA}A / {menuStats.advisorsM}M
              </strong>
              <p>Equipo comercial activo con soporte administrativo y recepcion.</p>
            </article>
          </div>
        </aside>
      </section>

      <div className="remax-kpi-grid">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="remax-kpi-card">
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
            <p>{kpi.note}</p>
          </article>
        ))}
      </div>

      <AccessSection title="Por que esta plataforma" accent="blue">
        <div className="remax-benefits-grid">
          {benefitCards.map((benefit) => (
            <article key={benefit.title} className="remax-benefit-card">
              <span className="remax-benefit-icon">{benefit.icon}</span>
              <strong>{benefit.title}</strong>
              <p>{benefit.copy}</p>
            </article>
          ))}
        </div>
      </AccessSection>

      <AccessSection title="Plataforma ejecutiva" accent="red">
        <p className="remax-section-copy">
          Una vista pensada para pilotar la oficina: KPIs globales, oportunidades criticas, cierres pendientes,
          alertas de seguimiento, resumen del pipeline y estado operativo del equipo.
        </p>
        <div className="remax-executive-cards">
          <article className="remax-executive-card">
            <div className="remax-executive-card-header">
              <span>Resumen del pipeline</span>
              <strong>{pipelineSummary.total} oportunidades</strong>
            </div>
            <div className="remax-stage-overview">
              {stageOverview.map((item) => (
                <div key={item.stage} className="remax-stage-row">
                  <span>{item.stage}</span>
                  <strong>{item.total}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="remax-executive-card">
            <div className="remax-executive-card-header">
              <span>Oportunidades criticas</span>
              <strong>{criticalOpportunities.length} focos comerciales</strong>
            </div>
            <div className="remax-executive-list">
              {criticalOpportunities.map((item) => (
                <Link key={item.id} href="/remax-demo/pipeline" className="remax-mini-opportunity">
                  <div>
                    <strong>{item.itemLabel}</strong>
                    <p>{item.nextAction}</p>
                  </div>
                  <div className="remax-mini-opportunity-badges">
                    <SentimentBadge sentiment={item.sentiment} />
                    <PriorityBadge priority={item.priority} />
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <article className="remax-executive-card">
            <div className="remax-executive-card-header">
              <span>Cierres pendientes</span>
              <strong>{pendingClosures.length} operaciones</strong>
            </div>
            <div className="remax-executive-list">
              {pendingClosures.map((item) => (
                <Link key={item.id} href="/remax-demo/pipeline" className="remax-mini-opportunity">
                  <div>
                    <strong>{item.itemLabel}</strong>
                    <p>{item.commercialReference}</p>
                  </div>
                  <small>{item.stage}</small>
                </Link>
              ))}
            </div>
          </article>

          <article className="remax-executive-card">
            <div className="remax-executive-card-header">
              <span>Alertas de seguimiento</span>
              <strong>{followUpAlerts.length} siguientes pasos</strong>
            </div>
            <div className="remax-executive-list">
              {followUpAlerts.slice(0, 4).map((item) => (
                <Link key={item.id} href="/remax-demo/analisis" className="remax-mini-opportunity">
                  <div>
                    <strong>{item.clientName}</strong>
                    <p>{item.nextFollowUp}</p>
                  </div>
                  <div className="remax-mini-opportunity-badges">
                    <PriorityBadge priority={item.priority} />
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <article className="remax-executive-card">
            <div className="remax-executive-card-header">
              <span>Estado operativo del equipo</span>
              <strong>{totalStaff} personas activas</strong>
            </div>
            <div className="remax-team-grid">
              <div className="remax-team-chip">
                <span>Asesores A</span>
                <strong>{menuStats.advisorsA}</strong>
              </div>
              <div className="remax-team-chip">
                <span>Asesores M</span>
                <strong>{menuStats.advisorsM}</strong>
              </div>
              <div className="remax-team-chip">
                <span>Administracion</span>
                <strong>{adminCount}</strong>
              </div>
              <div className="remax-team-chip">
                <span>Recepcion</span>
                <strong>{receptionCount}</strong>
              </div>
            </div>
          </article>
        </div>
      </AccessSection>

      <div className="remax-dashboard-grid">
        {dashboardSections.map((section) => (
          <AccessSection
            key={section.title}
            title={section.title}
            accent={section.accent}
            action={<span className="remax-section-badge">{section.cards.length} modulos</span>}
          >
            <p className="remax-section-copy">{section.description}</p>
            <div className="remax-action-grid">
              {section.cards.map((card) => (
                <Link key={card.title} href={card.href} className={`remax-action-card remax-action-card-${card.tone}`}>
                  <div className="remax-action-header">
                    <span className="remax-action-icon">{card.icon}</span>
                    <div className="remax-action-topline">
                      <span>{card.note}</span>
                      <strong>{card.title}</strong>
                    </div>
                  </div>
                  <p>{card.description}</p>
                  <div className="remax-action-pills">
                    {card.pills.map((pill) => (
                      <span key={pill} className="remax-action-pill">
                        {pill}
                      </span>
                    ))}
                  </div>
                  <span className="remax-action-cta">{card.cta}</span>
                </Link>
              ))}
            </div>
          </AccessSection>
        ))}
      </div>

      <AccessSection title="Capa comercial avanzada" accent="gold">
        <p className="remax-section-copy">
          Dos diferenciadores modernos para convertir la plataforma en una herramienta de direccion comercial: una
          capa inteligente con Hugging Face y un pipeline operativo con lectura visual tipo CRM inmobiliario.
        </p>
        <div className="remax-advanced-grid">
          <article className="remax-feature-panel">
            <div className="remax-feature-panel-header">
              <span className="remax-feature-icon">IA</span>
              <div>
                <strong>Análisis inteligente</strong>
                <p>
                  Clasificacion asistida con Hugging Face para leer notas de asesores, comentarios de clientes y
                  senales comerciales con el fin de priorizar seguimientos, detectar oportunidades sensibles y mejorar
                  la toma de decision comercial.
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
                    <SentimentBadge sentiment={item.sentiment} />
                    <PriorityBadge priority={item.priority} />
                    <span className="remax-recommendation-pill">{item.suggestedAction}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="remax-feature-footer">
              <small>
                Prioridad alta: {sentimentPriority.alta} · Media: {sentimentPriority.media} · Baja: {sentimentPriority.baja}
              </small>
              <Link href="/remax-demo/analisis">Abrir analisis inteligente</Link>
            </div>
          </article>

          <article className="remax-feature-panel">
            <div className="remax-feature-panel-header">
              <span className="remax-feature-icon">KAN</span>
              <div>
                <strong>Pipeline operativo</strong>
                <p>
                  Vista Kanban y Lista para seguir leads, altas, publicaciones, visitas, negociacion, cierre y
                  cancelacion con proxima accion, sentimiento, prioridad y referencia comercial visibles.
                </p>
              </div>
            </div>

            <div className="remax-mini-board">
              {pipelineItems.slice(0, 5).map((item) => (
                <Link key={item.id} href="/remax-demo/pipeline" className="remax-mini-board-card">
                  <div className="remax-feature-preview-topline">
                    <strong>{item.itemLabel}</strong>
                    <span>{item.stage}</span>
                  </div>
                  <p>{item.nextAction}</p>
                  <div className="remax-feature-preview-badges">
                    <SentimentBadge sentiment={item.sentiment} />
                    <PriorityBadge priority={item.priority} />
                  </div>
                  <small>{item.commercialReference}</small>
                </Link>
              ))}
            </div>

            <div className="remax-feature-footer">
              <small>
                Pipeline activo: {pipelineSummary.active} · Casos sensibles: {pipelineSummary.risk} · Vista Kanban + Lista
              </small>
              <Link href="/remax-demo/pipeline">Ver pipeline operativo</Link>
            </div>
          </article>
        </div>
      </AccessSection>

      <div id="roadmap-producto">
        <AccessSection title="Hoja de ruta del producto" accent="blue">
          <div className="remax-roadmap-grid">
            <article className="remax-context-card remax-roadmap-card">
              <span>Etapa 1</span>
              <strong>Plataforma Web Operativa</strong>
              <p>
                Pensada para direccion, administracion, coordinacion comercial y operacion interna. Esta etapa
                centraliza la gestion de propiedades, propietarios, asesores, visitas, cierres, cancelaciones,
                comisiones y control operativo en una interfaz web moderna, clara y escalable.
              </p>
              <ul className="remax-feature-list">
                <li>Gestion centralizada</li>
                <li>Flujo operativo mas claro</li>
                <li>Mayor control administrativo</li>
                <li>Base lista para crecimiento futuro</li>
              </ul>
            </article>

            <article className="remax-context-card remax-roadmap-card">
              <span>Etapa 2</span>
              <strong>App movil para asesores en campo</strong>
              <p>
                Evolucion natural de la plataforma hacia una experiencia movil para iPhone y Android, enfocada en
                asesores fuera de oficina. El objetivo es permitir seguimiento comercial mas agil, registro de
                visitas, contacto rapido con clientes y actualizacion de operaciones en tiempo real mediante un
                wrapper conectado a la misma base del sistema.
              </p>
              <ul className="remax-feature-list">
                <li>Dashboard del asesor</li>
                <li>Agenda de visitas</li>
                <li>Ficha de propiedad</li>
                <li>Seguimiento de prospectos</li>
                <li>Registro rapido de visitas</li>
                <li>Llamada, WhatsApp y ubicacion</li>
                <li>Carga de fotos y notas</li>
                <li>Recordatorios y notificaciones</li>
              </ul>
            </article>
          </div>

          <div className="remax-roadmap-summary">
            <span>Subtexto final</span>
            <strong>Una sola plataforma, dos niveles de uso</strong>
            <ol className="remax-roadmap-list">
              <li>Operacion web para administracion y control</li>
              <li>App movil para productividad comercial en campo</li>
            </ol>
          </div>
        </AccessSection>
      </div>

      <AccessSection title="Mockup movil para asesores en campo" accent="gold">
        <p className="remax-section-copy">
          Una vista clara de la etapa 2: app para asesores con enfoque en visitas, seguimiento comercial,
          comunicacion rapida y actualizacion de operaciones desde campo.
        </p>
        <div className="remax-mobile-grid">
          {mobileScreens.map((screen) => (
            <article key={screen.title} className="remax-phone-mock">
              <div className="remax-phone-notch" />
              <div className="remax-phone-screen">
                <div className="remax-phone-topline">
                  <span>{screen.title}</span>
                  <strong>{screen.subtitle}</strong>
                </div>

                {screen.kpis ? (
                  <div className="remax-phone-kpi-grid">
                    {screen.kpis.map((kpi) => (
                      <div key={kpi.label} className="remax-phone-kpi">
                        <span>{kpi.label}</span>
                        <strong>{kpi.value}</strong>
                      </div>
                    ))}
                  </div>
                ) : null}

                {screen.visits ? (
                  <div className="remax-phone-list">
                    {screen.visits.map((visit) => (
                      <div key={visit} className="remax-phone-list-item">
                        {visit}
                      </div>
                    ))}
                  </div>
                ) : null}

                {screen.style === "property" ? <div className="remax-phone-photo">IBR-OP277</div> : null}

                {screen.details ? (
                  <div className="remax-phone-list">
                    {screen.details.map((detail) => (
                      <div key={detail} className="remax-phone-list-item">
                        {detail}
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="remax-phone-actions">
                  {screen.actions.map((action) => (
                    <span key={action} className="remax-phone-action">
                      {action}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </AccessSection>

      <div className="remax-dashboard-lower">
        <AccessSection title="Actividad reciente" accent="blue">
          <div className="remax-activity-list">
            {recentActivities.map((item) => (
              <Link key={`${item.date}-${item.title}`} href={item.href} className="remax-activity-item">
                <div className="remax-activity-meta">
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                </div>
                <p>{item.detail}</p>
                <time>{item.date}</time>
              </Link>
            ))}
          </div>
        </AccessSection>

        <div className="remax-dashboard-side">
          <AccessSection title="Procesos abiertos" accent="red">
            <div className="remax-process-list">
              {openProcesses.map((process) => (
                <Link key={`${process.type}-${process.property}`} href={process.href} className="remax-process-card">
                  <span>{process.type}</span>
                  <strong>{process.property}</strong>
                  <p>{process.stage}</p>
                  <div className="remax-process-meta">
                    <small>{process.owner}</small>
                    <em>{process.status}</em>
                  </div>
                </Link>
              ))}
            </div>
          </AccessSection>

          <AccessSection title="Acciones rapidas" accent="gold">
            <div className="remax-quick-actions">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href} className="remax-quick-action">
                  <strong>{action.title}</strong>
                  <p>{action.description}</p>
                </Link>
              ))}
            </div>
          </AccessSection>
        </div>
      </div>
    </div>
  );
}

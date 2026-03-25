import Link from "next/link";

import { remaxDemoCommunications } from "@/remax-demo/data";
import { AccessSection } from "@/remax-demo/components/access-section";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { formatCurrencyMXN } from "@/remax-demo/formatters";
import {
  getAllValueHistory,
  getMenuStats,
  getPipelineSummary,
  getSentimentSummary
} from "@/remax-demo/stats";

type SectionTone = "blue" | "red" | "gold";

interface DashboardAction {
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
      "Procesos centrales para alta, baja, cancelacion y seguimiento de visitas dentro de una operacion mas clara y elegante.",
    accent: "red",
    cards: [
      {
        title: "Altas",
        description: "Generacion de clave, expediente, condiciones de operacion, asesores y ficha tecnica.",
        href: "/remax-demo/alta?step=clave&propiedad=IBR-OP277",
        cta: "Abrir alta",
        note: "Flujo continuo de captura y validacion.",
        pills: ["Clave", "Expediente", "Ficha tecnica"],
        tone: "blue"
      },
      {
        title: "Bajas / cierres",
        description: "Cierre operativo con revision de valores, asesores involucrados y salida comercial.",
        href: "/remax-demo/baja?step=registro&propiedad=CBR-1748",
        cta: "Abrir cierre",
        note: "Control de estatus y comunicado final.",
        pills: ["Cierre", "Valores", "Comunicado"],
        tone: "red"
      },
      {
        title: "Cancelaciones",
        description: "Registro de motivo, condicion de comision, responsables y trazabilidad del proceso.",
        href: "/remax-demo/cancelacion?step=registro&propiedad=RTV-571",
        cta: "Abrir cancelacion",
        note: "Seguimiento puntual hasta su salida de cartera.",
        pills: ["Motivo", "Asesores", "Bitacora"],
        tone: "gold"
      },
      {
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
        title: "Propiedades",
        description: "Vista integral del expediente, ubicacion, origen, estatus y contexto comercial.",
        href: "/remax-demo/propiedades",
        cta: "Ver propiedades",
        note: "Base limpia para inventario y operacion diaria.",
        pills: ["Expediente", "Estatus", "Origen"],
        tone: "blue"
      },
      {
        title: "Valores",
        description: "Historico comercial con motivo de cambio, posicion y referencia para minuta.",
        href: "/remax-demo/valores?propiedad=CBR-1748",
        cta: "Ver valores",
        note: "Lectura rapida del precio y su evolucion.",
        pills: ["Historico", "Precio", "Minuta"],
        tone: "gold"
      },
      {
        title: "Propietarios",
        description: "Relacion de propietarios, copropiedad, datos de contacto y contexto por inmueble.",
        href: "/remax-demo/propietarios?propiedad=IBR-OP277",
        cta: "Ver propietarios",
        note: "Navegacion directa a ficha tecnica y expediente.",
        pills: ["Contacto", "Copropiedad", "Ficha"],
        tone: "blue"
      },
      {
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
        title: "Asesores",
        description: "Clase A y M, participacion por contexto y visibilidad del equipo comercial completo.",
        href: "/remax-demo/asesores",
        cta: "Ver asesores",
        note: "Pedro Leyva participa como Director General y Asesor A.",
        pills: ["Clase A/M", "Participacion", "Equipo"],
        tone: "blue"
      },
      {
        title: "Guardias",
        description: "Cobertura comercial, continuidad de atencion y coordinacion de recepcion.",
        href: "/remax-demo/asesores",
        cta: "Ver guardias",
        note: "Organizacion operativa para turnos y seguimiento.",
        pills: ["Cobertura", "Recepcion", "Seguimiento"],
        tone: "gold"
      },
      {
        title: "Comisiones",
        description: "Esquemas por politica o monto, visibles para la operacion y el equipo administrativo.",
        href: "/remax-demo/alta?step=condiciones&propiedad=IBR-OP277",
        cta: "Ver comisiones",
        note: "Mayor claridad para asesores A, M y staff.",
        pills: ["Politica", "Monto", "Control"],
        tone: "red"
      },
      {
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
        title: "Comunicados",
        description: "Bitacora centralizada de altas, bajas y cancelaciones con vista previa y estado.",
        href: "/remax-demo/comunicados",
        cta: "Ver comunicados",
        note: "Todo el equipo opera sobre el mismo historial.",
        pills: ["Alta", "Baja", "Cancelacion"],
        tone: "red"
      },
      {
        title: "Minutas",
        description: "Cambios comerciales listos para minuta con referencias directas a valores y cierres.",
        href: "/remax-demo/valores?propiedad=CBR-1748",
        cta: "Ver minutas",
        note: "Menos friccion para el cierre administrativo.",
        pills: ["Cambios", "Motivos", "Versiones"],
        tone: "gold"
      },
      {
        title: "Reporte de cartera",
        description: "Lectura ejecutiva del inventario, procesos abiertos y actividad reciente del equipo.",
        href: "/remax-demo",
        cta: "Ver reporte",
        note: "Vista premium para direccion y coordinacion operativa.",
        pills: ["KPIs", "Inventario", "Actividad"],
        tone: "blue"
      },
      {
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
    title: "Nueva alta",
    description: "Abrir un expediente desde clave hasta ficha tecnica.",
    href: "/remax-demo/alta?step=clave&propiedad=IBR-OP277"
  },
  {
    title: "Pipeline operativo",
    description: "Visualizar oportunidades en Kanban y Lista con prioridad comercial.",
    href: "/remax-demo/pipeline"
  },
  {
    title: "Analisis inteligente",
    description: "Priorizar seguimientos con lectura asistida sobre notas y comentarios.",
    href: "/remax-demo/analisis"
  },
  {
    title: "Revisar cierres",
    description: "Validar valores, asesores y comunicado de baja.",
    href: "/remax-demo/baja?step=registro&propiedad=CBR-1748"
  },
  {
    title: "Ver comunicados",
    description: "Supervisar la bitacora centralizada por propiedad.",
    href: "/remax-demo/comunicados"
  },
  {
    title: "Abrir roadmap",
    description: "Presentar la arquitectura web moderna al cliente.",
    href: "/remax-demo/arquitectura"
  }
];

export default function RemaxMenuOperacionPage() {
  const menuStats = getMenuStats();
  const pipelineSummary = getPipelineSummary();
  const sentimentSummary = getSentimentSummary();
  const valueHistory = getAllValueHistory();
  const monthlyCommunications = remaxDemoCommunications.filter((item) => item.fecha.startsWith("2026-03")).length;

  const advancedModules = [
    {
      title: "Analisis inteligente",
      href: "/remax-demo/analisis",
      note: `${sentimentSummary.risk} casos sensibles y ${sentimentSummary.highPriority} seguimientos de prioridad alta`,
      description:
        "Clasificacion asistida con Hugging Face para leer notas de asesores, comentarios de clientes y senales comerciales sin vender IA generica.",
      cta: "Abrir analisis",
      pills: ["positivo", "neutro", "sensible / en riesgo"],
      tone: "gold" as const
    },
    {
      title: "Pipeline operativo",
      href: "/remax-demo/pipeline",
      note: `${pipelineSummary.active} oportunidades activas con vista Kanban y Lista`,
      description:
        "Seguimiento comercial mas moderno y administrable, con etapas inmobiliarias, proxima accion, sentimiento y prioridad visibles para direccion y equipo.",
      cta: "Abrir pipeline",
      pills: ["Kanban", "Lista", "Prioridad"],
      tone: "blue" as const
    }
  ];

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
      label: "Comunicados de marzo",
      value: String(monthlyCommunications),
      note: "Operacion interna unificada en un solo flujo."
    },
    {
      label: "Equipo operativo",
      value: "35",
      note: "4 administrativos, 1 recepcion y asesores clase A y M."
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
      <RemaxPageHeader
        title="RE/MAX Activa | Plataforma Operativa Inmobiliaria"
        description="Sistema inmobiliario moderno desarrollado en Astro. Plataforma disenada para la operacion inmobiliaria real, con arquitectura web moderna, mas rapida y escalable para una gestion centralizada de propiedades, asesores, propietarios, visitas y cierres."
        actions={
          <>
            <Link href="/remax-demo/alta?step=clave&propiedad=IBR-OP277" className="button">
              Abrir alta
            </Link>
            <Link href="/remax-demo/propiedades" className="button button-secondary">
              Ver cartera
            </Link>
            <Link href="/remax-demo/arquitectura" className="button button-secondary">
              Arquitectura Astro
            </Link>
          </>
        }
      />

      <div className="remax-kpi-grid">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="remax-kpi-card">
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
            <p>{kpi.note}</p>
          </article>
        ))}
      </div>

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
                  <div className="remax-action-topline">
                    <span>{card.note}</span>
                    <strong>{card.title}</strong>
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
          Dos mejoras enfocadas en priorizacion comercial y seguimiento moderno: inteligencia aplicada a notas y un
          pipeline visual pensado para la operacion inmobiliaria real.
        </p>
        <div className="remax-action-grid">
          {advancedModules.map((module) => (
            <Link key={module.title} href={module.href} className={`remax-action-card remax-action-card-${module.tone}`}>
              <div className="remax-action-topline">
                <span>{module.note}</span>
                <strong>{module.title}</strong>
              </div>
              <p>{module.description}</p>
              <div className="remax-action-pills">
                {module.pills.map((pill) => (
                  <span key={pill} className="remax-action-pill">
                    {pill}
                  </span>
                ))}
              </div>
              <span className="remax-action-cta">{module.cta}</span>
            </Link>
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

import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { getDemoI18n } from "@/lib/server-i18n";

const chapters = [
  {
    id: "inicio",
    number: "01",
    title: "Panel de control",
    description: "Consulta de un vistazo el inventario, las propiedades activas, el equipo y la actividad reciente.",
    image: "/user-guide/properties.jpg",
    width: 1780,
    height: 948,
    alt: "Pantalla de propiedades de Inmo o7",
    steps: [
      "Utiliza el menú izquierdo para abrir cada módulo.",
      "Revisa los indicadores superiores antes de entrar al detalle.",
      "Haz clic en una propiedad, cliente o contacto para consultar su ficha.",
      "Usa los filtros y la búsqueda para reducir los resultados."
    ],
    links: [
      { label: "Abrir Panel", href: "/app/dashboard" },
      { label: "Ver propiedades", href: "/app/properties" },
      { label: "Ver clientes", href: "/app/clients" }
    ]
  },
  {
    id: "pipeline",
    number: "02",
    title: "Pipeline comercial",
    description: "Gestiona las operaciones inmobiliarias en Kanban, lista o forecast.",
    image: "/user-guide/pipeline.jpg",
    width: 3408,
    height: 1774,
    alt: "Pipeline comercial con indicadores y filtros",
    steps: [
      "Selecciona el workflow en el desplegable superior derecho.",
      "Alterna entre Kanban, Lista y Forecast según la tarea.",
      "Filtra por owner, estado o IA Pulse.",
      "En Kanban, arrastra una operación a otra columna para cambiar su etapa.",
      "Abre una tarjeta para editar cliente, monto, owner, fecha y etapa."
    ],
    links: [{ label: "Abrir Pipeline", href: "/app/pipeline" }]
  },
  {
    id: "workflow",
    number: "03",
    title: "Workflows y etapas",
    description: "Crea procesos comerciales adaptados al negocio y configura sus probabilidades.",
    image: "/user-guide/workflow-editor.jpg",
    width: 2868,
    height: 1814,
    alt: "Editor de workflow con etapas, estados y probabilidades",
    steps: [
      "Pulsa Gestionar workflow para editar el proceso seleccionado.",
      "Cambia el nombre del workflow o añade una nueva etapa.",
      "Define cada etapa como Abierto, Ganado o Perdido.",
      "Asigna una probabilidad entre 0 % y 100 %.",
      "Arrastra las etapas para reordenarlas y pulsa Guardar.",
      "Usa Nuevo workflow para crear un pipeline independiente."
    ],
    links: [{ label: "Gestionar workflows", href: "/app/pipeline" }]
  },
  {
    id: "forecast",
    number: "04",
    title: "Forecast mensual",
    description: "Planifica los cierres por mes y visualiza los importes previstos.",
    image: "/user-guide/forecast.jpg",
    width: 3280,
    height: 1804,
    alt: "Forecast mensual con operaciones distribuidas por mes",
    steps: [
      "Selecciona Forecast en la cabecera del pipeline.",
      "Elige el año que deseas analizar.",
      "Revisa el número de operaciones y los importes de cada mes.",
      "Arrastra una tarjeta a otro mes para modificar su fecha prevista de cierre.",
      "Abre la tarjeta para consultar o editar el detalle."
    ],
    links: [{ label: "Abrir Forecast", href: "/app/forecast" }]
  }
];

export default async function UserGuidePage() {
  const { txt } = await getDemoI18n();
  return (
    <div className="page-stack user-guide-page">
      <PageHeader
        title={txt("Guía de usuario")}
        description={txt("Manual práctico para utilizar la plataforma operativa inmobiliaria.")}
        actions={
          <a className="button" href="/user-guide/guia-usuario-inmo-o7.pdf" download>
            {txt("Descargar PDF")}
          </a>
        }
      />

      <section className="user-guide-hero">
        <div>
          <span className="user-guide-kicker">{txt("Inicio rápido")}</span>
          <h2>{txt("Todo lo necesario para trabajar en Inmo o7")}</h2>
          <p>{txt("Recorre las pantallas principales, sigue los pasos y utiliza los accesos directos para practicar en la plataforma.")}</p>
        </div>
        <nav className="user-guide-toc" aria-label="Contenido de la guía">
          {chapters.map((chapter) => (
            <a key={chapter.id} href={`#${chapter.id}`}><span>{chapter.number}</span>{txt(chapter.title)}</a>
          ))}
        </nav>
      </section>

      {chapters.map((chapter) => (
        <article className="user-guide-chapter" id={chapter.id} key={chapter.id}>
          <header className="user-guide-chapter-header">
            <span>{chapter.number}</span>
            <div><h2>{txt(chapter.title)}</h2><p>{txt(chapter.description)}</p></div>
          </header>
          <figure className="user-guide-screen">
            <Image src={chapter.image} width={chapter.width} height={chapter.height} alt={chapter.alt} sizes="(max-width: 900px) 100vw, 1200px" />
            <figcaption>{txt("Captura de la plataforma Inmo o7")}</figcaption>
          </figure>
          <div className="user-guide-instructions">
            <div><h3>{txt("Pasos")}</h3><ol>{chapter.steps.map((step) => <li key={step}>{txt(step)}</li>)}</ol></div>
            <div className="user-guide-actions"><h3>{txt("Accesos directos")}</h3>{chapter.links.map((link) => <Link className="button" href={link.href} key={link.href}>{txt(link.label)}</Link>)}</div>
          </div>
        </article>
      ))}

      <div className="two-columns">
        <SectionCard title={txt("Módulos disponibles")} description={txt("Accesos operativos más utilizados.")}>
          <div className="user-guide-module-links">
            <Link href="/app/settings/staff-records">F-Asesores / F-Staff</Link>
            <Link href="/app/contacts">{txt("Contactos")}</Link>
            <Link href="/app/tasks">{txt("Tareas")}</Link>
            <Link href="/app/settings/company">{txt("Configuración de empresa")}</Link>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

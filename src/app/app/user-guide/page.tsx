import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { UserGuidePromptButton } from "@/components/user-guide-prompt-button";

const guideSections = [
  {
    title: "Panel",
    description: "Resumen ejecutivo de propiedades, operaciones, asesores, staff, guardias y asistencia.",
    actions: [
      { label: "Revisar indicadores", href: "/app/dashboard" },
      { label: "Entrar a clientes", href: "/app/clients" },
      { label: "Revisar propiedades", href: "/app/properties" }
    ]
  },
  {
    title: "F-Asesores / F-Staff",
    description: "Alta y seguimiento de asesores internos y miembros del staff con formato similar al Access original.",
    actions: [
      { label: "Crear asesor", href: "/app/settings/staff-records#nuevo-f-asesores" },
      { label: "Completar datos fiscales", href: "/app/settings/staff-records" },
      { label: "Registrar informacion personal", href: "/app/settings/staff-records" },
      { label: "Definir estatus REMAX", href: "/app/settings/staff-records" }
    ]
  },
  {
    title: "Propiedades y clientes",
    description: "Gestion operativa de inventario, propietarios, clientes y seguimiento comercial.",
    actions: [
      { label: "Buscar propiedades", href: "/app/properties" },
      { label: "Revisar clientes", href: "/app/clients" },
      { label: "Revisar contactos", href: "/app/contacts" }
    ]
  },
  {
    title: "Facturacion y cumplimiento",
    description: "Configuracion de datos fiscales, series, proveedores y paises para facturacion electronica.",
    actions: [
      { label: "Validar empresa", href: "/app/settings/company" },
      { label: "Revisar cumplimiento Mexico/Francia", href: "/app/settings/compliance" },
      { label: "Preparar facturacion", href: "/app/invoices" }
    ]
  },
  {
    title: "Usuarios y roles",
    description: "Control de accesos por perfil para que cada usuario vea solo las funciones necesarias.",
    actions: [
      { label: "Revisar usuarios", href: "/app/settings/users" },
      { label: "Revisar roles", href: "/app/settings/roles" },
      { label: "Validar seguridad", href: "/app/settings/security" }
    ]
  }
];

const quickPrompts = [
  "Como creo un asesor F-Asesores?",
  "Que datos fiscales son obligatorios?",
  "Donde reviso propiedades activas?",
  "Como cambio permisos de usuario?",
  "Que hago si una pagina no muestra datos?"
];

export default function UserGuidePage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="User Guide"
        description="Guia operativa dinamica para orientar al usuario dentro del sistema REMAX."
      />

      <div className="two-columns">
        <SectionCard
          title="Como usar la ayuda"
          description="Olivia AI esta disponible en el boton flotante inferior. Acepta el aviso de privacidad y pregunta sobre la pantalla actual."
        >
          <div className="guide-callout">
            <strong>Soporte contextual</strong>
            <p>
              Olivia recibe el contexto de la ruta actual para orientar al usuario sobre el modulo abierto. Tambien puedes abrir el chat en una ventana independiente.
            </p>
          </div>
          <Link href="https://suitesmine-bot.vercel.app" className="button button-secondary" target="_blank" rel="noreferrer">
            Abrir Olivia en una ventana
          </Link>
        </SectionCard>

        <SectionCard title="Preguntas rapidas" description="Ideas de preguntas para empezar con Olivia AI.">
          <div className="guide-prompt-list">
            {quickPrompts.map((prompt) => (
              <UserGuidePromptButton key={prompt} prompt={prompt} />
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="guide-grid">
        {guideSections.map((section) => (
          <SectionCard key={section.title} title={section.title} description={section.description}>
            <ul className="guide-action-list">
              {section.actions.map((action) => (
                <li key={action.href + action.label}>
                  <Link href={action.href}>{action.label}</Link>
                </li>
              ))}
            </ul>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";

const guideSections = [
  {
    title: "Panel",
    description: "Resumen ejecutivo de propiedades, operaciones, asesores, staff, guardias y asistencia.",
    actions: ["Revisar indicadores", "Entrar a clientes o propiedades", "Confirmar importaciones desde Access"]
  },
  {
    title: "F-Asesores / F-Staff",
    description: "Alta y seguimiento de asesores internos y miembros del staff con formato similar al Access original.",
    actions: ["Crear asesor", "Completar datos fiscales", "Registrar informacion personal", "Definir estatus REMAX"]
  },
  {
    title: "Propiedades y clientes",
    description: "Gestion operativa de inventario, propietarios, clientes y seguimiento comercial.",
    actions: ["Buscar registros", "Actualizar estado", "Revisar datos relacionados"]
  },
  {
    title: "Facturacion y cumplimiento",
    description: "Configuracion de datos fiscales, series, proveedores y paises para facturacion electronica.",
    actions: ["Validar empresa", "Revisar cumplimiento Mexico/Francia", "Preparar facturacion"]
  },
  {
    title: "Usuarios y roles",
    description: "Control de accesos por perfil para que cada usuario vea solo las funciones necesarias.",
    actions: ["Revisar usuario", "Asignar rol", "Validar permisos"]
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
              Olivia recibe el contexto de la ruta actual para orientar al usuario sobre el modulo abierto. Tambien puede escalar a revision humana desde el inbox del channel manager.
            </p>
          </div>
          <Link href="https://suitesmine-bot.vercel.app/inbox" className="button button-secondary" target="_blank">
            Abrir channel manager
          </Link>
        </SectionCard>

        <SectionCard title="Preguntas rapidas" description="Ideas de preguntas para empezar con Olivia AI.">
          <div className="guide-prompt-list">
            {quickPrompts.map((prompt) => (
              <span key={prompt}>{prompt}</span>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="guide-grid">
        {guideSections.map((section) => (
          <SectionCard key={section.title} title={section.title} description={section.description}>
            <ul className="guide-action-list">
              {section.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

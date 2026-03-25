import Link from "next/link";

import { AccessSection } from "@/remax-demo/components/access-section";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { getRemaxLanguage } from "@/remax-demo/get-language";

export default async function ArquitecturaPage() {
  const language = await getRemaxLanguage();
  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title={language === "en" ? "Proposed architecture" : "Arquitectura propuesta"}
        description={
          language === "en"
            ? "This section complements the operational demo with the product architecture: a modern, faster and more scalable web platform for real estate operations."
            : "Esta seccion complementa la demo operativa con la arquitectura de producto: una plataforma web moderna, mas rapida y escalable para la operacion inmobiliaria."
        }
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo" className="button button-secondary">
              {language === "en" ? "Back to platform" : "Volver a plataforma"}
            </Link>
            <Link href="/remax-demo/alta" className="button">
              {language === "en" ? "Open operating demo" : "Abrir demo operativa"}
            </Link>
          </div>
        }
      />

      <div className="remax-two-columns">
        <AccessSection title={language === "en" ? "Phase A - Web app" : "Fase A - Webapp"} accent="blue">
          <ul className="remax-feature-list">
            <li>{language === "en" ? "Modern front end focused on operational flow, following REMAX's real structure." : "Frontend moderno orientado a flujo operativo, siguiendo la estructura real de REMAX."}</li>
            <li>{language === "en" ? "Astro as the interface layer for performance and clear composition." : "Astro como capa de interfaz para rendimiento y composicion clara."}</li>
            <li>{language === "en" ? "Supabase for auth, database and relational model by property, agent and communication." : "Supabase para auth, base de datos y modelo relacional por propiedad, asesor y comunicado."}</li>
            <li>{language === "en" ? "Railway for jobs, internal services and backend deployment." : "Railway para jobs, servicios internos y despliegue backend."}</li>
            <li>{language === "en" ? "Real history, multi-user traceability and stronger role control for a scalable operation." : "Historico real, trazabilidad multiusuario y mejor control de roles para una operacion escalable."}</li>
          </ul>
        </AccessSection>

        <AccessSection title={language === "en" ? "Phase B - iOS / Android wrapper" : "Fase B - Wrapper iOS / Android"} accent="red">
          <ul className="remax-feature-list">
            <li>{language === "en" ? "Mobile wrapper on top of the same web app for field agents." : "Wrapper movil sobre la misma webapp para asesores en campo."}</li>
            <li>{language === "en" ? "Property, status, communications and follow-up access from the phone." : "Consulta de propiedades, status, comunicados y seguimiento desde telefono."}</li>
            <li>{language === "en" ? "Foundation ready to evolve into notifications and more automation." : "Base lista para evolucionar a notificaciones y mas automatizaciones."}</li>
            <li>{language === "en" ? "Lower risk and cost than rewriting the entire operation natively from scratch." : "Menor riesgo y menor costo que reescribir toda la operacion en nativo desde cero."}</li>
          </ul>
        </AccessSection>
      </div>

      <AccessSection title={language === "en" ? "Product roadmap" : "Hoja de ruta del producto"} accent="gold">
        <div className="remax-roadmap-grid">
          <article className="remax-context-card remax-roadmap-card">
            <span>{language === "en" ? "Stage 1" : "Etapa 1"}</span>
            <strong>{language === "en" ? "Operational Web Platform" : "Plataforma Web Operativa"}</strong>
            <p>
              {language === "en"
                ? "Designed for leadership, administration, commercial coordination and internal operations. This stage centralizes property, owner, agent, visit, closing, cancellation, commission and operational control management in a modern, clear and scalable web interface."
                : "Pensada para direccion, administracion, coordinacion comercial y operacion interna. Esta etapa centraliza la gestion de propiedades, propietarios, asesores, visitas, cierres, cancelaciones, comisiones y control operativo en una interfaz web moderna, clara y escalable."}
            </p>
            <ul className="remax-feature-list">
              <li>{language === "en" ? "Centralized management" : "Gestion centralizada"}</li>
              <li>{language === "en" ? "Clearer operational flow" : "Flujo operativo mas claro"}</li>
              <li>{language === "en" ? "Stronger administrative control" : "Mayor control administrativo"}</li>
              <li>{language === "en" ? "Foundation ready for future growth" : "Base lista para crecimiento futuro"}</li>
            </ul>
          </article>

          <article className="remax-context-card remax-roadmap-card">
            <span>{language === "en" ? "Stage 2" : "Etapa 2"}</span>
            <strong>{language === "en" ? "Mobile App for Field Agents" : "App movil para asesores en campo"}</strong>
            <p>
              {language === "en"
                ? "A natural evolution of the platform into a mobile experience for iPhone and Android, focused on agents outside the office. The goal is to enable faster commercial follow-up, visit logging, fast client contact and real-time operation updates through a wrapper connected to the same system base."
                : "Evolucion natural de la plataforma hacia una experiencia movil para iPhone y Android, enfocada en asesores fuera de oficina. El objetivo es permitir seguimiento comercial mas agil, registro de visitas, contacto rapido con clientes y actualizacion de operaciones en tiempo real mediante un wrapper conectado a la misma base del sistema."}
            </p>
            <ul className="remax-feature-list">
              <li>{language === "en" ? "Agent dashboard" : "Dashboard del asesor"}</li>
              <li>{language === "en" ? "Visit schedule" : "Agenda de visitas"}</li>
              <li>{language === "en" ? "Property profile" : "Ficha de propiedad"}</li>
              <li>{language === "en" ? "Prospect follow-up" : "Seguimiento de prospectos"}</li>
              <li>{language === "en" ? "Fast visit logging" : "Registro rapido de visitas"}</li>
              <li>{language === "en" ? "Call, WhatsApp and location" : "Llamada, WhatsApp y ubicacion"}</li>
              <li>{language === "en" ? "Photo and note uploads" : "Carga de fotos y notas"}</li>
              <li>{language === "en" ? "Reminders and notifications" : "Recordatorios y notificaciones"}</li>
            </ul>
          </article>
        </div>

        <div className="remax-roadmap-summary">
          <span>{language === "en" ? "Final note" : "Subtexto final"}</span>
          <strong>{language === "en" ? "One platform, two usage levels" : "Una sola plataforma, dos niveles de uso"}</strong>
          <ol className="remax-roadmap-list">
            <li>{language === "en" ? "Web operations for administration and control" : "Operacion web para administracion y control"}</li>
            <li>{language === "en" ? "Mobile app for field commercial productivity" : "App movil para productividad comercial en campo"}</li>
          </ol>
        </div>
      </AccessSection>

      <AccessSection title={language === "en" ? "From problem to solution" : "Traduccion de problema a solucion"}>
        <div className="remax-context-grid">
          <article className="remax-context-card">
            <span>{language === "en" ? "Previous operating model" : "Modelo operativo anterior"}</span>
            <strong>{language === "en" ? "Fragmented flow" : "Flujo fragmentado"}</strong>
            <p>{language === "en" ? "It works, but with separated screens, limited support for multiple roles and complicated maintenance." : "Opera, pero con pantallas separadas, limitacion para roles multiples y mantenimiento complicado."}</p>
          </article>
          <article className="remax-context-card">
            <span>{language === "en" ? "Proposal" : "Propuesta"}</span>
            <strong>{language === "en" ? "Real estate platform in Astro" : "Plataforma inmobiliaria en Astro"}</strong>
            <p>{language === "en" ? "The real business logic is preserved, but with better UX, clean history and centralized traceability." : "Se preserva la logica real del negocio, pero con mejor UX, historico limpio y trazabilidad centralizada."}</p>
          </article>
          <article className="remax-context-card">
            <span>{language === "en" ? "Benefit" : "Beneficio"}</span>
            <strong>{language === "en" ? "Foundation ready to scale" : "Base lista para crecer"}</strong>
            <p>{language === "en" ? "The demo positions a clearer, faster platform ready for reporting, automation and mobile." : "La demo posiciona una plataforma mas clara, mas rapida y preparada para reporting, automatizacion y mobile."}</p>
          </article>
        </div>
      </AccessSection>
    </div>
  );
}

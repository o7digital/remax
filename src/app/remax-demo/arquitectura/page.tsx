import Link from "next/link";

import { AccessSection } from "@/remax-demo/components/access-section";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";

export default function ArquitecturaPage() {
  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title="Arquitectura propuesta"
        description="Esta seccion complementa la demo operativa con la arquitectura de producto: una plataforma web moderna, mas rapida y escalable para la operacion inmobiliaria."
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo" className="button button-secondary">
              Volver a plataforma
            </Link>
            <Link href="/remax-demo/alta" className="button">
              Abrir demo operativa
            </Link>
          </div>
        }
      />

      <div className="remax-two-columns">
        <AccessSection title="Fase A - Webapp" accent="blue">
          <ul className="remax-feature-list">
            <li>Frontend moderno orientado a flujo operativo, siguiendo la estructura real de REMAX.</li>
            <li>Astro como capa de interfaz para rendimiento y composicion clara.</li>
            <li>Supabase para auth, base de datos y modelo relacional por propiedad, asesor y comunicado.</li>
            <li>Railway para jobs, servicios internos y despliegue backend.</li>
            <li>Historico real, trazabilidad multiusuario y mejor control de roles para una operacion escalable.</li>
          </ul>
        </AccessSection>

        <AccessSection title="Fase B - Wrapper iOS / Android" accent="red">
          <ul className="remax-feature-list">
            <li>Wrapper movil sobre la misma webapp para asesores en campo.</li>
            <li>Consulta de propiedades, status, comunicados y seguimiento desde telefono.</li>
            <li>Base lista para evolucionar a notificaciones y mas automatizaciones.</li>
            <li>Menor riesgo y menor costo que reescribir toda la operacion en nativo desde cero.</li>
          </ul>
        </AccessSection>
      </div>

      <AccessSection title="Hoja de ruta del producto" accent="gold">
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

      <AccessSection title="Traduccion de problema a solucion">
        <div className="remax-context-grid">
          <article className="remax-context-card">
            <span>Modelo operativo anterior</span>
            <strong>Flujo fragmentado</strong>
            <p>Opera, pero con pantallas separadas, limitacion para roles multiples y mantenimiento complicado.</p>
          </article>
          <article className="remax-context-card">
            <span>Propuesta</span>
            <strong>Plataforma inmobiliaria en Astro</strong>
            <p>Se preserva la logica real del negocio, pero con mejor UX, historico limpio y trazabilidad centralizada.</p>
          </article>
          <article className="remax-context-card">
            <span>Beneficio</span>
            <strong>Base lista para crecer</strong>
            <p>La demo posiciona una plataforma mas clara, mas rapida y preparada para reporting, automatizacion y mobile.</p>
          </article>
        </div>
      </AccessSection>
    </div>
  );
}

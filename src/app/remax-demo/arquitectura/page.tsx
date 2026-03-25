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

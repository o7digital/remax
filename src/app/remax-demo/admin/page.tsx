import Link from "next/link";
import { redirect } from "next/navigation";

import { getRemaxDemoSession } from "@/remax-demo/auth";
import { AccessSection } from "@/remax-demo/components/access-section";
import { RemaxAdminPanel } from "@/remax-demo/components/remax-admin-panel";
import { RemaxPageHeader } from "@/remax-demo/components/remax-page-header";
import { getRemaxLanguage } from "@/remax-demo/get-language";

const adminBaseAdvisors = [
  {
    id: "claire-dubois",
    nombre: "Claire Dubois",
    clase: "A" as const,
    tipoPersonal: "direccion" as const,
    rol: "Direccion comercial y validacion final",
    comisionRate: 0.075,
    activo: true,
    ciudadBase: "Lomas de Chapultepec, Miguel Hidalgo, CDMX",
    correo: "claire.dubois@remax-demo.test",
    telefono: "55 1000 1001"
  },
  {
    id: "camille-laurent",
    nombre: "Camille Laurent",
    clase: "A" as const,
    tipoPersonal: "asesor" as const,
    rol: "Captacion residencial premium",
    comisionRate: 0.07,
    activo: true,
    ciudadBase: "Polanco, Miguel Hidalgo, CDMX",
    correo: "camille.laurent@remax-demo.test",
    telefono: "55 1000 2040"
  },
  {
    id: "julien-moreau",
    nombre: "Julien Moreau",
    clase: "A" as const,
    tipoPersonal: "asesor" as const,
    rol: "Cierres y negociacion",
    comisionRate: 0.07,
    activo: true,
    ciudadBase: "Condesa, Cuauhtemoc, CDMX",
    correo: "julien.moreau@remax-demo.test",
    telefono: "55 1000 1180"
  },
  {
    id: "sophie-bernard",
    nombre: "Sophie Bernard",
    clase: "M" as const,
    tipoPersonal: "asesor" as const,
    rol: "Seguimiento comercial y visitas",
    comisionRate: 0.045,
    activo: true,
    ciudadBase: "Roma Norte, Cuauhtemoc, CDMX",
    correo: "sophie.bernard@remax-demo.test",
    telefono: "55 1000 3050"
  },
  {
    id: "emma-chevalier",
    nombre: "Emma Chevalier",
    clase: "M" as const,
    tipoPersonal: "asesor" as const,
    rol: "Rentas ejecutivas",
    comisionRate: 0.045,
    activo: true,
    ciudadBase: "Del Valle, Benito Juarez, CDMX",
    correo: "emma.chevalier@remax-demo.test",
    telefono: "55 1000 4222"
  },
  {
    id: "leo-fournier",
    nombre: "Leo Fournier",
    clase: null,
    tipoPersonal: "administrativo" as const,
    rol: "Control de comisiones y cierres",
    comisionRate: null,
    activo: true,
    ciudadBase: "Napoles, Benito Juarez, CDMX",
    correo: "leo.fournier@remax-demo.test",
    telefono: "55 1000 5100"
  },
  {
    id: "adele-martin",
    nombre: "Adele Martin",
    clase: null,
    tipoPersonal: "administrativo" as const,
    rol: "Backoffice de expedientes",
    comisionRate: null,
    activo: true,
    ciudadBase: "Santa Maria la Ribera, Cuauhtemoc, CDMX",
    correo: "adele.martin@remax-demo.test",
    telefono: "55 1000 6120"
  },
  {
    id: "nora-petit",
    nombre: "Nora Petit",
    clase: null,
    tipoPersonal: "recepcion" as const,
    rol: "Recepcion y agenda operativa",
    comisionRate: null,
    activo: true,
    ciudadBase: "San Angel, Alvaro Obregon, CDMX",
    correo: "nora.petit@remax-demo.test",
    telefono: "55 1000 7007"
  }
];

export default async function RemaxAdminPage() {
  const language = await getRemaxLanguage();
  const session = await getRemaxDemoSession();

  if (!session || session.role !== "direccion") {
    redirect("/remax-demo");
  }

  return (
    <div className="remax-page-stack">
      <RemaxPageHeader
        title={language === "en" ? "Admin control module" : "Modulo de control admin"}
        description={
          language === "en"
            ? "Direction view for demo administration: advisor onboarding, commission simulation, language control and color themes without touching any live data."
            : "Vista de direccion para administracion demo: alta de asesores, simulacion de comisiones, control de idioma y temas de color sin tocar ningun dato real."
        }
        actions={
          <div className="remax-header-actions">
            <Link href="/remax-demo/asesores" className="button button-secondary">
              {language === "en" ? "Open agents view" : "Abrir vista de asesores"}
            </Link>
            <Link href="/remax-demo/alta?step=clave" className="button">
              {language === "en" ? "Review property flow" : "Revisar flujo de alta"}
            </Link>
          </div>
        }
      />

      <AccessSection title={language === "en" ? "Admin sandbox scope" : "Alcance del sandbox admin"} accent="gold">
        <p className="remax-section-copy">
          {language === "en"
            ? "This module is intentionally isolated from the rest of the demo data. It uses French fictitious profiles and CDMX references so the client can review an admin layer without exposing any real operational information."
            : "Este modulo esta intencionalmente aislado del resto de la demo. Usa perfiles ficticios franceses y referencias CDMX para que el cliente pueda revisar una capa admin sin exponer informacion operativa real."}
        </p>
      </AccessSection>

      <RemaxAdminPanel language={language} baseAdvisors={adminBaseAdvisors} />
    </div>
  );
}

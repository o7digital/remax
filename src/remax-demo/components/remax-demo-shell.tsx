"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

import type { NavSection } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getFormTabs(pathname: string, step: string | null) {
  if (pathname === "/remax-demo") {
    return ["Plataforma ejecutiva"];
  }

  if (pathname === "/remax-demo/alta") {
    const labelByStep = {
      clave: "Generacion de clave",
      expediente: "Expediente",
      condiciones: "Condiciones",
      valores: "Valores",
      asesores: "Asesores",
      propietarios: "Propietarios",
      ficha: "Ficha tecnica"
    } as const;

    return ["Plataforma RE/MAX", "Alta de propiedad", labelByStep[(step ?? "clave") as keyof typeof labelByStep] ?? "Alta de propiedad"];
  }

  if (pathname === "/remax-demo/baja") {
    const labelByStep = {
      busqueda: "Busqueda",
      registro: "Registro",
      valores: "Valores",
      asesores: "Asesores",
      comunicado: "Comunicado"
    } as const;

    return ["Plataforma RE/MAX", "Bajas y cierres", labelByStep[(step ?? "busqueda") as keyof typeof labelByStep] ?? "Bajas y cierres"];
  }

  if (pathname === "/remax-demo/cancelacion") {
    const labelByStep = {
      busqueda: "Busqueda",
      registro: "Registro",
      asesores: "Asesores",
      comunicado: "Comunicado"
    } as const;

    return ["Plataforma RE/MAX", "Cancelaciones", labelByStep[(step ?? "busqueda") as keyof typeof labelByStep] ?? "Cancelaciones"];
  }

  if (pathname === "/remax-demo/valores") {
    return ["Plataforma RE/MAX", "Gestion de cartera", "Valores"];
  }

  if (pathname === "/remax-demo/propietarios") {
    return ["Plataforma RE/MAX", "Gestion de cartera", "Propietarios"];
  }

  if (pathname === "/remax-demo/asesores") {
    return ["Plataforma RE/MAX", "Equipo", "Asesores"];
  }

  if (pathname === "/remax-demo/comunicados") {
    return ["Plataforma RE/MAX", "Control", "Comunicados"];
  }

  if (pathname === "/remax-demo/analisis") {
    return ["Plataforma RE/MAX", "Inteligencia comercial", "Analisis inteligente"];
  }

  if (pathname === "/remax-demo/pipeline") {
    return ["Plataforma RE/MAX", "Inteligencia comercial", "Pipeline operativo"];
  }

  return ["Plataforma RE/MAX", "Arquitectura Astro"];
}

export function RemaxDemoShell({
  children,
  navigationSections
}: {
  children: ReactNode;
  navigationSections: NavSection[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabs = getFormTabs(pathname, searchParams.get("step"));

  return (
    <div className="remax-shell">
      <aside className="remax-sidebar">
        <div className="remax-brand-panel">
          <div className="remax-brand-lockup">
            <span className="remax-brand-mark">RE/MAX</span>
            <span className="remax-brand-sub">ACTIVA</span>
          </div>
          <p>RE/MAX Activa | Plataforma Operativa Inmobiliaria</p>
        </div>

        {navigationSections.map((section) => (
          <div key={section.title} className="remax-nav-section">
            <p className="remax-nav-title">{section.title}</p>
            <div className="remax-nav-links">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive(pathname, item.href) ? "remax-nav-link active" : "remax-nav-link"}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="remax-side-note">
          <span>Arquitectura web moderna</span>
          <strong>Astro, Supabase y Railway</strong>
          <p>Interfaz mas rapida, datos centralizados y base preparada para evolucionar a nuevas funciones.</p>
        </div>

        <div className="remax-side-note">
          <span>Gestion centralizada</span>
          <strong>Propiedades, asesores y cierres</strong>
          <p>Operacion comercial, cartera, propietarios, visitas y comunicados en una sola plataforma.</p>
        </div>
      </aside>

      <div className="remax-main">
        <div className="remax-windowbar">
          {tabs.map((tab, index) => (
            <span key={tab} className={index === tabs.length - 1 ? "remax-window-tab active" : "remax-window-tab"}>
              {tab}
            </span>
          ))}
        </div>
        <header className="remax-toolbar">
          <div className="remax-toolbar-ribbon">
            <span className="remax-toolbar-chip">RE/MAX ACTIVA</span>
            <span className="remax-toolbar-copy">Plataforma disenada para la operacion inmobiliaria real</span>
          </div>
          <div className="remax-toolbar-meta">
            <strong>martes, 24 de marzo de 2026</strong>
            <p>Gestion centralizada de propiedades, asesores, propietarios, visitas y cierres</p>
          </div>
        </header>
        <main className="remax-content">{children}</main>
      </div>
    </div>
  );
}

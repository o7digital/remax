"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, type ReactNode } from "react";

import { remaxDemoNotice } from "@/remax-demo/data";
import {
  REMAX_DEMO_LOGIN_PATH,
  type RemaxDemoSessionView
} from "@/remax-demo/auth-config";
import {
  getRemaxDemoNavigation,
  REMAX_LANGUAGE_COOKIE,
  REMAX_LANGUAGE_STORAGE_KEY,
  rt,
  type RemaxLanguage
} from "@/remax-demo/i18n";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getFormTabs(pathname: string, step: string | null, language: RemaxLanguage) {
  if (pathname === "/remax-demo") {
    return [rt(language, "Plataforma ejecutiva")];
  }

  if (pathname === "/remax-demo/alta") {
    const labelByStep = {
      clave: rt(language, "Generacion de clave"),
      expediente: rt(language, "Expediente"),
      condiciones: rt(language, "Condiciones"),
      valores: rt(language, "Valores"),
      asesores: rt(language, "Asesores"),
      propietarios: rt(language, "Propietarios"),
      ficha: language === "en" ? "Technical Sheet" : "Ficha tecnica"
    } as const;

    return [
      rt(language, "Plataforma REMAX"),
      rt(language, "Alta de propiedad"),
      labelByStep[(step ?? "clave") as keyof typeof labelByStep] ?? rt(language, "Alta de propiedad")
    ];
  }

  if (pathname === "/remax-demo/baja") {
    const labelByStep = {
      busqueda: rt(language, "Busqueda"),
      registro: rt(language, "Registro"),
      valores: rt(language, "Valores"),
      asesores: rt(language, "Asesores"),
      comunicado: rt(language, "Comunicado")
    } as const;

    return [
      rt(language, "Plataforma REMAX"),
      rt(language, "Bajas y cierres"),
      labelByStep[(step ?? "busqueda") as keyof typeof labelByStep] ?? rt(language, "Bajas y cierres")
    ];
  }

  if (pathname === "/remax-demo/cancelacion") {
    const labelByStep = {
      busqueda: rt(language, "Busqueda"),
      registro: rt(language, "Registro"),
      asesores: rt(language, "Asesores"),
      comunicado: rt(language, "Comunicado")
    } as const;

    return [
      rt(language, "Plataforma REMAX"),
      rt(language, "Cancelaciones"),
      labelByStep[(step ?? "busqueda") as keyof typeof labelByStep] ?? rt(language, "Cancelaciones")
    ];
  }

  if (pathname === "/remax-demo/valores") {
    return [rt(language, "Plataforma REMAX"), rt(language, "Gestion de cartera"), rt(language, "Valores")];
  }

  if (pathname === "/remax-demo/propietarios") {
    return [rt(language, "Plataforma REMAX"), rt(language, "Gestion de cartera"), rt(language, "Propietarios")];
  }

  if (pathname === "/remax-demo/asesores") {
    return [rt(language, "Plataforma REMAX"), rt(language, "Equipo"), rt(language, "Asesores")];
  }

  if (pathname === "/remax-demo/comunicados") {
    return [rt(language, "Plataforma REMAX"), rt(language, "Control"), rt(language, "Comunicados")];
  }

  if (pathname === "/remax-demo/analisis") {
    return [rt(language, "Plataforma REMAX"), rt(language, "Inteligencia comercial"), rt(language, "Analisis inteligente")];
  }

  if (pathname === "/remax-demo/pipeline") {
    return [rt(language, "Plataforma REMAX"), rt(language, "Inteligencia comercial"), rt(language, "Pipeline operativo")];
  }

  return [rt(language, "Plataforma REMAX"), rt(language, "Arquitectura Astro")];
}

export function RemaxDemoShell({
  children,
  currentDateLabel,
  currentLanguage,
  currentSession,
  logoutAction,
  shellTitle
}: {
  children: ReactNode;
  currentDateLabel: string;
  currentLanguage: RemaxLanguage;
  currentSession: RemaxDemoSessionView | null;
  logoutAction: () => Promise<void>;
  shellTitle: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isLoginPage = pathname === REMAX_DEMO_LOGIN_PATH;
  const tabs = getFormTabs(pathname, searchParams.get("step"), currentLanguage);
  const navigationSections = useMemo(() => getRemaxDemoNavigation(currentLanguage), [currentLanguage]);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(REMAX_LANGUAGE_STORAGE_KEY);

    if (storedLanguage && storedLanguage !== currentLanguage) {
      document.cookie = `${REMAX_LANGUAGE_COOKIE}=${storedLanguage}; path=/; max-age=31536000; samesite=lax`;
      router.refresh();
      return;
    }

    window.localStorage.setItem(REMAX_LANGUAGE_STORAGE_KEY, currentLanguage);
  }, [currentLanguage, router]);

  function setLanguage(language: RemaxLanguage) {
    document.cookie = `${REMAX_LANGUAGE_COOKIE}=${language}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem(REMAX_LANGUAGE_STORAGE_KEY, language);
    router.refresh();
  }

  if (isLoginPage) {
    return (
      <div className="remax-auth-shell">
        <div className="remax-auth-stage">
          <section className="remax-auth-brand">
            <div className="remax-brand-lockup">
              <span className="remax-brand-mark">REMAX</span>
              <span className="remax-brand-sub">ACTIVA</span>
            </div>
            <strong>{shellTitle}</strong>
            <p>
              {rt(
                currentLanguage,
                "Operacion comercial, cartera, propietarios, visitas y comunicados en una sola plataforma."
              )}
            </p>
            <div className="remax-auth-brand-note">
              <span>{remaxDemoNotice}</span>
              <p>
                {currentLanguage === "en"
                  ? "Login mock prepared for client tests with protected internal views."
                  : "Login mock preparado para pruebas de cliente con vistas internas protegidas."}
              </p>
            </div>
          </section>

          <section className="remax-auth-content">{children}</section>
        </div>
      </div>
    );
  }

  return (
    <div className="remax-shell">
      <aside className="remax-sidebar">
        <div className="remax-brand-panel">
          <div className="remax-brand-lockup">
            <span className="remax-brand-mark">REMAX</span>
            <span className="remax-brand-sub">ACTIVA</span>
          </div>
          <p>{shellTitle}</p>
        </div>

        {currentSession ? (
          <div className="remax-session-card">
            <span>{currentSession.roleLabel}</span>
            <strong>{currentSession.name}</strong>
            <p>{currentSession.email}</p>
            <form action={logoutAction}>
              <button type="submit" className="button button-secondary remax-logout-button">
                {currentLanguage === "en" ? "Logout" : "Cerrar sesion"}
              </button>
            </form>
          </div>
        ) : null}

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
          <span>{rt(currentLanguage, "Arquitectura web moderna")}</span>
          <strong>{rt(currentLanguage, "Astro, Supabase y Railway")}</strong>
          <p>{rt(currentLanguage, "Interfaz mas rapida, datos centralizados y base preparada para evolucionar a nuevas funciones.")}</p>
        </div>

        <div className="remax-side-note">
          <span>{rt(currentLanguage, "Gestion centralizada")}</span>
          <strong>{rt(currentLanguage, "Propiedades, asesores y cierres")}</strong>
          <p>{rt(currentLanguage, "Operacion comercial, cartera, propietarios, visitas y comunicados en una sola plataforma.")}</p>
        </div>

        <div className="remax-demo-disclaimer">{remaxDemoNotice}</div>
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
            <span className="remax-toolbar-chip">REMAX ACTIVA</span>
            <span className="remax-toolbar-copy">{rt(currentLanguage, "Plataforma disenada para la operacion inmobiliaria real")}</span>
          </div>
          <div className="remax-language-switch" aria-label="Language switcher">
            <button
              type="button"
              className={currentLanguage === "es" ? "remax-language-button active" : "remax-language-button"}
              onClick={() => setLanguage("es")}
            >
              ES
            </button>
            <button
              type="button"
              className={currentLanguage === "en" ? "remax-language-button active" : "remax-language-button"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
          <div className="remax-toolbar-meta">
            <strong>{currentDateLabel}</strong>
            <p>{rt(currentLanguage, "Gestion centralizada de propiedades, asesores, propietarios, visitas y cierres")}</p>
          </div>
        </header>
        <main className="remax-content">{children}</main>
      </div>
    </div>
  );
}

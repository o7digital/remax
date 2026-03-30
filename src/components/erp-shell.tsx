"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import type { DemoLocale } from "@/lib/demo-locale";
import type { NavSection } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ErpShell({
  children,
  locale,
  navigationSections,
  workspace,
  shellCopy,
  currentUser
}: {
  children: ReactNode;
  locale: DemoLocale;
  navigationSections: NavSection[];
  workspace: {
    productName: string;
    workspaceName: string;
    planName: string;
    activeSeats: number;
    seatLimit: number;
  };
  shellCopy: {
    workspaceLabel: string;
    seatsLabel: string;
    activeTenantLabel: string;
    invoicesLabel: string;
    complianceLabel: string;
  };
  currentUser: {
    email: string;
    label: string;
  };
}) {
  const pathname = usePathname();
  const activeItem = navigationSections.flatMap((section) => section.items).find((item) => isActive(pathname, item.href));

  return (
    <div className="app-shell remax-backoffice-shell">
      <aside className="sidebar remax-sidebar-shell">
        <div className="sidebar-brand remax-brand-panel app-brand-panel">
          <div className="remax-brand-lockup">
            <span className="remax-brand-mark">REMAX</span>
            <span className="remax-brand-sub">ACTIVA</span>
          </div>
          <strong>{workspace.productName}</strong>
          <p>{workspace.workspaceName}</p>
        </div>

        <div className="remax-session-card app-session-card">
          <span>{shellCopy.activeTenantLabel}</span>
          <strong>{currentUser.label}</strong>
          <p>{currentUser.email}</p>
          <form action="/auth/logout" method="post">
            <button type="submit" className="button button-secondary remax-logout-button">
              Logout
            </button>
          </form>
        </div>

        {navigationSections.map((section) => (
          <div key={section.title} className="nav-section remax-nav-section">
            <p className="nav-title remax-nav-title">{section.title}</p>
            <div className="nav-links remax-nav-links">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive(pathname, item.href) ? "nav-link remax-nav-link active" : "nav-link remax-nav-link"}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="sidebar-footer remax-side-note app-side-note">
          <span>{shellCopy.workspaceLabel}</span>
          <strong>{workspace.planName}</strong>
          <p>
            {workspace.activeSeats}/{workspace.seatLimit} {shellCopy.seatsLabel.toLowerCase()}
          </p>
        </div>

        <div className="sidebar-footer remax-side-note app-side-note">
          <span>Backoffice</span>
          <strong>{activeItem?.label ?? "Panel"}</strong>
          <p>Operacion, administracion y seguimiento centralizado en una sola interfaz.</p>
        </div>
      </aside>

      <div className="shell-main remax-main-shell">
        <div className="remax-windowbar app-windowbar">
          <span className="remax-window-tab active">{activeItem?.label ?? workspace.productName}</span>
        </div>

        <header className="topbar remax-toolbar app-toolbar">
          <div className="app-toolbar-copy">
            <div className="remax-toolbar-ribbon">
              <span className="remax-toolbar-chip">Plataforma ejecutiva</span>
              <span className="remax-toolbar-copy">
                Gestion centralizada de propiedades, asesores, clientes, documentos y operaciones.
              </span>
            </div>
          </div>

          <div className="topbar-actions app-toolbar-actions">
            <div className="topbar-user app-toolbar-user">
              <span>{currentUser.label}</span>
              <strong>{currentUser.email}</strong>
            </div>
            <LanguageSwitcher locale={locale} />
            <Link href="/app/invoices" className="button button-secondary">
              {shellCopy.invoicesLabel}
            </Link>
            <Link href="/app/settings/compliance" className="button">
              {shellCopy.complianceLabel}
            </Link>
          </div>
        </header>

        <div className="app-toolbar-meta">
          <span>{shellCopy.activeTenantLabel}</span>
          <strong>{workspace.workspaceName}</strong>
        </div>

        <main className="page-content remax-content-shell">{children}</main>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { StatusBadge } from "@/components/status-badge";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { DemoLocale } from "@/lib/demo-locale";
import type { NavSection } from "@/lib/nav";
import {
  defaultRemaxBrandingSettings,
  getRemaxBrandingStyle,
  parseRemaxBrandingSettings,
  REMAX_BRANDING_STORAGE_KEY,
  type RemaxBrandingSettings
} from "@/lib/remax-branding";
import type { AppRole } from "@/lib/access-control";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ErpShell({
  children,
  locale,
  navigationSections,
  workspace,
  shellCopy,
  currentUser,
  quickAccess
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
    role: AppRole;
  };
  quickAccess: {
    invoicesEnabled: boolean;
    complianceEnabled: boolean;
  };
}) {
  const pathname = usePathname();
  const [branding, setBranding] = useState<RemaxBrandingSettings>(defaultRemaxBrandingSettings);
  const activeItem = navigationSections.flatMap((section) => section.items).find((item) => isActive(pathname, item.href));
  const isFictitiousIdentity = /@o7digitalgroup\.com$|@o7\.digital$/i.test(currentUser.email);

  useEffect(() => {
    const applyStoredBranding = () => {
      const stored = window.localStorage.getItem(REMAX_BRANDING_STORAGE_KEY);
      setBranding(parseRemaxBrandingSettings(stored));
    };

    applyStoredBranding();
    window.addEventListener("remax-branding-updated", applyStoredBranding);

    return () => {
      window.removeEventListener("remax-branding-updated", applyStoredBranding);
    };
  }, []);

  return (
    <div className="app-shell app-remax-shell" style={getRemaxBrandingStyle(branding)}>
      <aside className="remax-sidebar app-remax-sidebar">
        <div className="remax-brand-panel app-remax-brand-panel">
          {branding.logoDataUrl ? (
            <img src={branding.logoDataUrl} alt={workspace.productName} className="remax-brand-logo" />
          ) : (
            <div className="remax-brand-lockup">
              <span className="remax-brand-mark">REMAX</span>
              <span className="remax-brand-sub">ACTIVA</span>
            </div>
          )}
          <strong>{workspace.productName}</strong>
          <p>{workspace.workspaceName}</p>
        </div>

        <div className="remax-session-card app-remax-session-card">
          <span>Panel operativo</span>
          <strong>{currentUser.label}</strong>
          <p>{currentUser.email}</p>
          {isFictitiousIdentity ? (
            <div className="inline-stack">
              <StatusBadge value="Datos ficticios" tone="warning" />
            </div>
          ) : null}
          <form action="/auth/logout" method="post">
            <button type="submit" className="button button-secondary remax-logout-button">
              Cerrar sesion
            </button>
          </form>
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

        <div className="remax-side-note app-remax-side-note">
          <span>{shellCopy.workspaceLabel}</span>
          <strong>{workspace.planName}</strong>
          <p>
            {workspace.activeSeats}/{workspace.seatLimit} {shellCopy.seatsLabel.toLowerCase()}
          </p>
        </div>

        <div className="remax-side-note app-remax-side-note">
          <span>{shellCopy.activeTenantLabel}</span>
          <strong>{activeItem?.label ?? "Panel"}</strong>
          <p>Operacion, administracion y seguimiento centralizado en una sola interfaz.</p>
        </div>
      </aside>

      <div className="remax-main app-remax-main">
        <div className="remax-windowbar">
          <span className="remax-window-tab active">{activeItem?.label ?? workspace.productName}</span>
        </div>

        <header className="remax-toolbar app-remax-toolbar">
          <div className="remax-toolbar-ribbon">
            <span className="remax-toolbar-chip">Plataforma ejecutiva</span>
            <span className="remax-toolbar-copy">
              Gestion centralizada de propiedades, asesores, clientes, documentos y operaciones.
            </span>
          </div>

          <div className="remax-header-actions">
            <LanguageSwitcher locale={locale} />
            {quickAccess.invoicesEnabled ? (
              <Link href="/app/invoices" className="button button-secondary">
                {shellCopy.invoicesLabel}
              </Link>
            ) : null}
            {quickAccess.complianceEnabled ? (
              <Link href="/app/settings/compliance" className="button">
                {shellCopy.complianceLabel}
              </Link>
            ) : null}
          </div>
        </header>

        <div className="app-remax-subbar">
          <div className="app-remax-subbar-title">
            <span>{shellCopy.activeTenantLabel}</span>
            <strong>{workspace.workspaceName}</strong>
          </div>
          <div className="remax-toolbar-meta">
            <strong>{currentUser.email}</strong>
            <p>{currentUser.label}</p>
            {isFictitiousIdentity ? (
              <div className="inline-stack">
                <StatusBadge value="Datos ficticios" tone="warning" />
              </div>
            ) : null}
          </div>
        </div>

        <main className="page-content remax-content app-remax-content">{children}</main>
      </div>
    </div>
  );
}

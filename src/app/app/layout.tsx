import { redirect } from "next/navigation";
import { headers } from "next/headers";
import type { ReactNode } from "react";

import { ErpShell } from "@/components/erp-shell";
import { getAuthenticatedUserEmail } from "@/lib/auth";
import { canEmailAccessApp, canRoleAccessPath, getAllowedModulesForRole, getRoleForEmail } from "@/lib/access-control";
import { workspaceProfile } from "@/lib/erp-data";
import { getNavigationSections } from "@/lib/nav";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { locale, txt } = await getDemoI18n();
  const headerStore = await headers();
  const pathname = headerStore.get("x-remax-pathname") ?? "/app";
  const email = await getAuthenticatedUserEmail();

  if (!email) {
    redirect("/auth/login?next=/app");
  }

  if (!canEmailAccessApp(email) && pathname !== "/app/forbidden") {
    redirect(`/app/forbidden?path=${encodeURIComponent(pathname)}&reason=seat_limit`);
  }

  const role = getRoleForEmail(email);
  const allowedModules = getAllowedModulesForRole(role);

  if (!canRoleAccessPath(role, pathname)) {
    redirect(`/app/forbidden?path=${encodeURIComponent(pathname)}`);
  }

  return (
    <ErpShell
      locale={locale}
      navigationSections={getNavigationSections(txt, allowedModules)}
      workspace={{
        ...workspaceProfile,
        workspaceName: txt(workspaceProfile.workspaceName),
        planName: txt(workspaceProfile.planName)
      }}
      shellCopy={{
        workspaceLabel: txt("Organisation"),
        seatsLabel: txt("Seats"),
        activeTenantLabel: txt("Structure active"),
        invoicesLabel: txt("Factures"),
        complianceLabel: txt("Compliance")
      }}
      currentUser={{
        email,
        label: email,
        role
      }}
      quickAccess={{
        invoicesEnabled: allowedModules.has("invoices"),
        complianceEnabled: allowedModules.has("settings_compliance")
      }}
    >
      {children}
    </ErpShell>
  );
}

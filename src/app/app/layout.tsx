import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { ErpShell } from "@/components/erp-shell";
import { getAuthenticatedUserEmail } from "@/lib/auth";
import { getAllowedModulesForRole, getRoleForEmail } from "@/lib/access-control";
import { workspaceProfile } from "@/lib/erp-data";
import { getNavigationSections } from "@/lib/nav";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { locale, txt } = await getDemoI18n();
  const email = await getAuthenticatedUserEmail();

  if (!email) {
    redirect("/auth/login?next=/app");
  }
  const role = getRoleForEmail(email);
  const allowedModules = getAllowedModulesForRole(role);

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

import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { ErpShell } from "@/components/erp-shell";
import { getAllowedModulesForRole, getRoleForEmail } from "@/lib/access-control";
import { workspaceProfile } from "@/lib/erp-data";
import { getNavigationSections } from "@/lib/nav";
import { getDemoI18n } from "@/lib/server-i18n";
import { createServerClientFromCookies } from "@/utils/supabase/server";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { locale, txt } = await getDemoI18n();
  const supabase = await createServerClientFromCookies();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/app");
  }
  const role = getRoleForEmail(user.email);
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
        email: user.email ?? "",
        label: user.user_metadata?.full_name ?? user.email ?? "Admin",
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

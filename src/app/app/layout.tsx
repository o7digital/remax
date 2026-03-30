import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { ErpShell } from "@/components/erp-shell";
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

  return (
    <ErpShell
      locale={locale}
      navigationSections={getNavigationSections(txt)}
      workspace={{
        ...workspaceProfile,
        workspaceName: txt(workspaceProfile.workspaceName),
        planName: txt(workspaceProfile.planName)
      }}
      shellCopy={{
        workspaceLabel: txt("Workspace"),
        seatsLabel: txt("Seats"),
        activeTenantLabel: txt("Tenant actif"),
        invoicesLabel: txt("Factures"),
        complianceLabel: txt("Compliance")
      }}
      currentUser={{
        email: user.email ?? "",
        label: user.user_metadata?.full_name ?? user.email ?? "Admin"
      }}
    >
      {children}
    </ErpShell>
  );
}

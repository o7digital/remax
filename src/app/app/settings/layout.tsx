import type { ReactNode } from "react";

import { Subnav } from "@/components/subnav";
import { getAllowedModulesForRole, getRoleForEmail } from "@/lib/access-control";
import { getAuthenticatedUserEmail } from "@/lib/auth";
import { getSettingsLinks } from "@/lib/nav";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  const { txt } = await getDemoI18n();
  const email = await getAuthenticatedUserEmail();
  const role = getRoleForEmail(email);
  const allowedModules = getAllowedModulesForRole(role);

  return (
    <div className="page-stack">
      <Subnav items={getSettingsLinks(txt, allowedModules)} />
      {children}
    </div>
  );
}

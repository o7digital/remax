import type { ReactNode } from "react";

import { Subnav } from "@/components/subnav";
import { getAllowedModulesForRole, getRoleForEmail } from "@/lib/access-control";
import { getSettingsLinks } from "@/lib/nav";
import { getDemoI18n } from "@/lib/server-i18n";
import { createServerClientFromCookies } from "@/utils/supabase/server";

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  const { txt } = await getDemoI18n();
  const supabase = await createServerClientFromCookies();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const role = getRoleForEmail(user?.email);
  const allowedModules = getAllowedModulesForRole(role);

  return (
    <div className="page-stack">
      <Subnav items={getSettingsLinks(txt, allowedModules)} />
      {children}
    </div>
  );
}

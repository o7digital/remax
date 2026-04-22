export type AppRole =
  | "owner"
  | "sales_admin"
  | "finance_ops_mx"
  | "implementation_lead"
  | "dev_admin"
  | "viewer";

export type AppModule =
  | "dashboard"
  | "clients"
  | "contacts"
  | "surveys"
  | "marketing"
  | "commissions"
  | "reporting"
  | "forecast"
  | "guards"
  | "tasks"
  | "pipeline"
  | "quotes"
  | "orders"
  | "invoices"
  | "payments"
  | "documents"
  | "contracts"
  | "settings_overview"
  | "settings_ia_search"
  | "settings_users"
  | "settings_commissions"
  | "settings_roles"
  | "settings_security"
  | "settings_company"
  | "settings_billing"
  | "settings_compliance"
  | "settings_tax_identities"
  | "settings_invoice_series";

const ALL_MODULES: AppModule[] = [
  "dashboard",
  "clients",
  "contacts",
  "surveys",
  "marketing",
  "commissions",
  "reporting",
  "forecast",
  "guards",
  "tasks",
  "pipeline",
  "quotes",
  "orders",
  "invoices",
  "payments",
  "documents",
  "contracts",
  "settings_overview",
  "settings_ia_search",
  "settings_users",
  "settings_commissions",
  "settings_roles",
  "settings_security",
  "settings_company",
  "settings_billing",
  "settings_compliance",
  "settings_tax_identities",
  "settings_invoice_series"
];

export const ROLE_MODULE_ACCESS: Record<AppRole, AppModule[]> = {
  owner: ALL_MODULES,
  dev_admin: ALL_MODULES,
  sales_admin: [
    "dashboard",
    "clients",
    "contacts",
    "surveys",
    "marketing",
    "commissions",
    "reporting",
    "forecast",
    "tasks",
    "pipeline",
    "quotes",
    "orders",
    "invoices",
    "documents",
    "contracts",
    "settings_ia_search"
  ],
  finance_ops_mx: [
    "dashboard",
    "reporting",
    "invoices",
    "payments",
    "documents",
    "contracts",
    "settings_overview",
    "settings_company",
    "settings_billing",
    "settings_compliance",
    "settings_tax_identities",
    "settings_invoice_series"
  ],
  implementation_lead: [
    "dashboard",
    "tasks",
    "pipeline",
    "documents",
    "contracts",
    "reporting",
    "settings_ia_search",
    "settings_overview"
  ],
  viewer: ["dashboard", "reporting"]
};

const ROLE_BY_EMAIL: Record<string, AppRole> = {
  "info@o7digitalgroup.com": "dev_admin",
  "christopher.suarez@remax-activa.com.mx": "owner",
  "pedro.leyva@remax-activa.com.mx": "sales_admin"
};

const PATH_MODULE_RULES: Array<{ prefix: string; module: AppModule }> = [
  { prefix: "/app/settings/compliance", module: "settings_compliance" },
  { prefix: "/app/settings/tax-identities", module: "settings_tax_identities" },
  { prefix: "/app/settings/invoice-series", module: "settings_invoice_series" },
  { prefix: "/app/settings/ia-search", module: "settings_ia_search" },
  { prefix: "/app/settings/users", module: "settings_users" },
  { prefix: "/app/settings/commissions", module: "settings_commissions" },
  { prefix: "/app/settings/roles", module: "settings_roles" },
  { prefix: "/app/settings/security", module: "settings_security" },
  { prefix: "/app/settings/company", module: "settings_company" },
  { prefix: "/app/settings/billing", module: "settings_billing" },
  { prefix: "/app/settings", module: "settings_overview" },
  { prefix: "/app/dashboard", module: "dashboard" },
  { prefix: "/app/clients", module: "clients" },
  { prefix: "/app/contacts", module: "contacts" },
  { prefix: "/app/surveys", module: "surveys" },
  { prefix: "/app/marketing", module: "marketing" },
  { prefix: "/app/commissions", module: "commissions" },
  { prefix: "/app/reporting", module: "reporting" },
  { prefix: "/app/forecast", module: "forecast" },
  { prefix: "/app/guards", module: "guards" },
  { prefix: "/app/tasks", module: "tasks" },
  { prefix: "/app/pipeline", module: "pipeline" },
  { prefix: "/app/quotes", module: "quotes" },
  { prefix: "/app/orders", module: "orders" },
  { prefix: "/app/invoices", module: "invoices" },
  { prefix: "/app/payments", module: "payments" },
  { prefix: "/app/documents", module: "documents" },
  { prefix: "/app/contracts", module: "contracts" }
];

export function getRoleForEmail(email: string | null | undefined): AppRole {
  if (!email) {
    return "viewer";
  }

  return ROLE_BY_EMAIL[email.trim().toLowerCase()] ?? "viewer";
}

export function getAllowedModulesForRole(role: AppRole): Set<AppModule> {
  return new Set(ROLE_MODULE_ACCESS[role]);
}

export function getModuleForPath(pathname: string): AppModule | null {
  for (const rule of PATH_MODULE_RULES) {
    if (pathname === rule.prefix || pathname.startsWith(`${rule.prefix}/`)) {
      return rule.module;
    }
  }

  return null;
}

export function canRoleAccessPath(role: AppRole, pathname: string): boolean {
  const module = getModuleForPath(pathname);

  if (!module) {
    return true;
  }

  return getAllowedModulesForRole(role).has(module);
}


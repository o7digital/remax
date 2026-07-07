export type AppRole =
  | "super_admin"
  | "client_admin"
  | "asesor";

export type AppModule =
  | "dashboard"
  | "properties"
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
  | "settings_staff_records"
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
  "properties",
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
  "settings_staff_records",
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
  super_admin: ALL_MODULES,
  client_admin: ALL_MODULES,
  asesor: [
    "dashboard",
    "properties",
    "clients",
    "contacts",
    "surveys",
    "commissions",
    "reporting",
    "forecast",
    "tasks",
    "pipeline",
    "quotes",
    "documents"
  ]
};

const ROLE_BY_EMAIL: Record<string, AppRole> = {
  "olivier.steineur@gmail.com": "super_admin",
  "oliviersteineur@gmail.com": "super_admin",
  "christopher.suarez@remax-activa.com.mx": "client_admin",
  "pedro.leyva@remax-activa.com.mx": "client_admin",
  "brendac0101@gmail.com": "client_admin",
  "brenda.aguilar@remax-activa.com.mx": "client_admin"
};

const ROLE_BY_EMAIL_DOMAIN: Record<string, AppRole> = {
  "remax-activa.com.mx": "asesor"
};

const DEFAULT_AUTHENTICATED_ROLE: AppRole = "asesor";

const PATH_MODULE_RULES: Array<{ prefix: string; module: AppModule }> = [
  { prefix: "/app/settings/compliance", module: "settings_compliance" },
  { prefix: "/app/settings/tax-identities", module: "settings_tax_identities" },
  { prefix: "/app/settings/invoice-series", module: "settings_invoice_series" },
  { prefix: "/app/settings/ia-search", module: "settings_ia_search" },
  { prefix: "/app/settings/staff-records", module: "settings_staff_records" },
  { prefix: "/app/settings/users", module: "settings_users" },
  { prefix: "/app/settings/commissions", module: "settings_commissions" },
  { prefix: "/app/settings/roles", module: "settings_roles" },
  { prefix: "/app/settings/security", module: "settings_security" },
  { prefix: "/app/settings/company", module: "settings_company" },
  { prefix: "/app/settings/billing", module: "settings_billing" },
  { prefix: "/app/settings", module: "settings_overview" },
  { prefix: "/app/dashboard", module: "dashboard" },
  { prefix: "/app/properties", module: "properties" },
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
    return DEFAULT_AUTHENTICATED_ROLE;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const domain = normalizedEmail.split("@")[1];

  return ROLE_BY_EMAIL[normalizedEmail] ?? ROLE_BY_EMAIL_DOMAIN[domain] ?? DEFAULT_AUTHENTICATED_ROLE;
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

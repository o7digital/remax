import type { AppModule } from "@/lib/access-control";

export interface NavItem {
  label: string;
  href: string;
  module?: AppModule;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

type Translator = (value: string) => string;

export function getNavigationSections(txt: Translator, allowedModules?: Set<AppModule>): NavSection[] {
  const sections: NavSection[] = [
    {
      title: txt("Operations"),
      items: [
        { label: txt("Dashboard"), href: "/app/dashboard", module: "dashboard" },
        { label: txt("Clients"), href: "/app/clients", module: "clients" },
        { label: txt("Contacts"), href: "/app/contacts", module: "contacts" },
        { label: txt("Encuestas"), href: "/app/surveys", module: "surveys" },
        { label: txt("Marketing"), href: "/app/marketing", module: "marketing" },
        { label: txt("Comisiones"), href: "/app/commissions", module: "commissions" },
        { label: txt("Reporting"), href: "/app/reporting", module: "reporting" },
        { label: txt("Forecast"), href: "/app/forecast", module: "forecast" },
        { label: txt("Guardias"), href: "/app/guards", module: "guards" },
        { label: txt("Tasks"), href: "/app/tasks", module: "tasks" },
        { label: txt("Pipeline"), href: "/app/pipeline", module: "pipeline" },
        { label: txt("Quotes"), href: "/app/quotes", module: "quotes" },
        { label: txt("Orders"), href: "/app/orders", module: "orders" },
        { label: txt("Invoices"), href: "/app/invoices", module: "invoices" },
        { label: txt("Payments"), href: "/app/payments", module: "payments" },
        { label: txt("Documents"), href: "/app/documents", module: "documents" },
        { label: txt("Contracts"), href: "/app/contracts", module: "contracts" }
      ]
    },
    {
      title: txt("Administration"),
      items: [
        { label: txt("Settings"), href: "/app/settings", module: "settings_overview" },
        { label: txt("IA Search"), href: "/app/settings/ia-search", module: "settings_ia_search" },
        { label: txt("Users"), href: "/app/settings/users", module: "settings_users" },
        { label: txt("Roles"), href: "/app/settings/roles", module: "settings_roles" },
        { label: txt("Security"), href: "/app/settings/security", module: "settings_security" },
        { label: txt("Company"), href: "/app/settings/company", module: "settings_company" },
        { label: txt("Billing"), href: "/app/settings/billing", module: "settings_billing" },
        { label: txt("Compliance"), href: "/app/settings/compliance", module: "settings_compliance" }
      ]
    }
  ];

  if (!allowedModules) {
    return sections;
  }

  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => !item.module || allowedModules.has(item.module))
    }))
    .filter((section) => section.items.length > 0);
}

export function getSettingsLinks(txt: Translator, allowedModules?: Set<AppModule>): NavItem[] {
  const items: NavItem[] = [
    { label: txt("Vue globale"), href: "/app/settings", module: "settings_overview" },
    { label: txt("IA Search"), href: "/app/settings/ia-search", module: "settings_ia_search" },
    { label: txt("Users"), href: "/app/settings/users", module: "settings_users" },
    { label: txt("Commissions"), href: "/app/settings/commissions", module: "settings_commissions" },
    { label: txt("Roles"), href: "/app/settings/roles", module: "settings_roles" },
    { label: txt("Security"), href: "/app/settings/security", module: "settings_security" },
    { label: txt("Company"), href: "/app/settings/company", module: "settings_company" },
    { label: txt("Billing"), href: "/app/settings/billing", module: "settings_billing" },
    { label: txt("Compliance"), href: "/app/settings/compliance", module: "settings_compliance" },
    { label: txt("Tax identities"), href: "/app/settings/tax-identities", module: "settings_tax_identities" },
    { label: txt("Invoice series"), href: "/app/settings/invoice-series", module: "settings_invoice_series" }
  ];

  if (!allowedModules) {
    return items;
  }

  return items.filter((item) => !item.module || allowedModules.has(item.module));
}

export function getComplianceLinks(txt: Translator): NavItem[] {
  return [
    { label: txt("Overview"), href: "/app/settings/compliance" },
    { label: txt("Countries"), href: "/app/settings/compliance/countries" },
    { label: txt("Mexico"), href: "/app/settings/compliance/mexico" },
    { label: txt("France"), href: "/app/settings/compliance/france" },
    { label: txt("Providers"), href: "/app/settings/compliance/providers" }
  ];
}

import { execFileSync } from "child_process";

const databaseUrl = process.env.DATABASE_URL;
const confirmation = process.argv.find((arg) => arg.startsWith("--confirm="))?.split("=")[1];

if (!databaseUrl) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

if (confirmation !== "PURGE_REMAX_CLIENT_DATA") {
  console.error("Refusing to purge without --confirm=PURGE_REMAX_CLIENT_DATA");
  process.exit(1);
}

const tables = [
  "public.lead_activities",
  "public.leads",
  "public.campaigns",
  "public.lead_sources",
  "public.attendance_events",
  "public.guard_shifts",
  "public.commission_payments",
  "public.commission_splits",
  "public.deal_participants",
  "public.commission_calculations",
  "public.deals",
  "public.listings",
  "public.property_alta_advisors",
  "public.property_technical_sheets",
  "public.property_operation_conditions",
  "public.property_alta_expedientes",
  "public.property_values",
  "public.property_contacts",
  "public.properties",
  "public.staff_remax_accounts",
  "public.staff_personal_profiles",
  "public.staff_fiscal_profiles",
  "public.staff_roles",
  "public.staff_members",
];

const sql = `truncate table ${tables.join(", ")} restart identity cascade;`;

execFileSync("psql", [databaseUrl, "-v", "ON_ERROR_STOP=1", "-c", sql], {
  stdio: "inherit",
});

console.log("Client data tables purged.");

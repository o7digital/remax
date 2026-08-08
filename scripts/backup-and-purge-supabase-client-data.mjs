import * as fs from "fs";
import * as path from "path";
import { gzipSync } from "zlib";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const backupDir = process.env.BACKUP_DIR ?? "backups";
const confirmation = process.argv.find((arg) => arg.startsWith("--confirm="))?.split("=")[1];

if (!supabaseUrl || !serviceRoleKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set");
  process.exit(1);
}

if (confirmation !== "PURGE_REMAX_CLIENT_DATA") {
  console.error("Refusing to purge without --confirm=PURGE_REMAX_CLIENT_DATA");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const tables = [
  "lead_activities",
  "leads",
  "campaigns",
  "lead_sources",
  "attendance_events",
  "guard_shifts",
  "commission_payments",
  "commission_splits",
  "deal_participants",
  "commission_calculations",
  "deals",
  "listings",
  "property_alta_advisors",
  "property_technical_sheets",
  "property_operation_conditions",
  "property_alta_expedientes",
  "property_values",
  "property_contacts",
  "properties",
  "staff_remax_accounts",
  "staff_personal_profiles",
  "staff_fiscal_profiles",
  "staff_roles",
  "staff_members",
];

const pageSize = 1000;
const deleteChunkSize = 100;

async function fetchAllRows(table) {
  const rows = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .range(from, from + pageSize - 1);

    if (error) {
      throw error;
    }

    rows.push(...(data ?? []));

    if (!data || data.length < pageSize) {
      return rows;
    }

    from += pageSize;
  }
}

async function deleteRowsById(table, rows) {
  const ids = rows.map((row) => row.id).filter(Boolean);

  for (let index = 0; index < ids.length; index += deleteChunkSize) {
    const chunk = ids.slice(index, index + deleteChunkSize);
    const { error } = await supabase.from(table).delete().in("id", chunk);

    if (error) {
      throw error;
    }
  }
}

fs.mkdirSync(backupDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupPath = path.join(backupDir, `remax-supabase-client-data-${timestamp}.json.gz`);
const backup = {
  createdAt: new Date().toISOString(),
  source: supabaseUrl,
  tables: {},
};

console.log("Creating Supabase client-data backup.");

for (const table of tables) {
  const rows = await fetchAllRows(table);
  backup.tables[table] = rows;
  console.log(`Backed up ${table}: ${rows.length} rows`);
}

fs.writeFileSync(backupPath, gzipSync(JSON.stringify(backup)));
console.log(`Backup written: ${backupPath}`);

console.log("Purging Supabase client-data tables.");

for (const table of tables) {
  const rows = backup.tables[table] ?? [];

  if (rows.length === 0) {
    console.log(`Skipped ${table}: 0 rows`);
    continue;
  }

  await deleteRowsById(table, rows);
  console.log(`Purged ${table}: ${rows.length} rows`);
}

console.log("Supabase client-data backup and purge completed.");

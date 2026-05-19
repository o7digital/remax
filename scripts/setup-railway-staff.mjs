import { execFileSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const databaseUrl = process.env.DATABASE_URL;

const staffTables = [
  { file: "staff_members.csv", table: "public.staff_members", expected: 257 },
  { file: "staff_fiscal_profiles.csv", table: "public.staff_fiscal_profiles", expected: 257 },
  { file: "staff_personal_profiles.csv", table: "public.staff_personal_profiles", expected: 257 },
  { file: "staff_remax_accounts.csv", table: "public.staff_remax_accounts", expected: 257 }
];

if (!databaseUrl) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

function psql(args, options = {}) {
  return execFileSync("psql", [databaseUrl, ...args], {
    cwd: rootDir,
    encoding: "utf8",
    stdio: options.stdio ?? "pipe"
  });
}

function tableExists(table) {
  const [schema, name] = table.split(".");
  const result = psql([
    "-t",
    "-A",
    "-c",
    `select exists (select 1 from information_schema.tables where table_schema = '${schema}' and table_name = '${name}');`
  ]);

  return result.trim() === "t";
}

function tableCount(table) {
  return Number(psql(["-t", "-A", "-c", `select count(*) from ${table};`]).trim());
}

function runSqlFile(relativePath) {
  const sqlPath = path.join(rootDir, relativePath);

  if (!fs.existsSync(sqlPath)) {
    throw new Error(`Missing SQL file: ${relativePath}`);
  }

  psql(["-v", "ON_ERROR_STOP=1", "-f", sqlPath], { stdio: "inherit" });
}

function importCsv({ file, table }) {
  const csvPath = path.join(rootDir, "bdd", "exports", file);

  if (!fs.existsSync(csvPath)) {
    throw new Error(`Missing CSV file: ${file}`);
  }

  psql(["-v", "ON_ERROR_STOP=1", "-c", `\\copy ${table} FROM '${csvPath}' WITH (FORMAT csv, HEADER true);`], {
    stdio: "inherit"
  });
}

console.log("== Railway staff data setup ==");

if (!tableExists("public.staff_members")) {
  console.log("staff_members missing; applying core schema migration.");
  runSqlFile("supabase/migrations/20260329_001_remax_core_schema.sql");
} else {
  console.log("staff_members exists; skipping core schema migration.");
}

const missingProfileTable = staffTables.slice(1).some(({ table }) => !tableExists(table));

if (missingProfileTable) {
  console.log("One or more staff profile tables missing; applying staff module migration.");
  runSqlFile("supabase/migrations/20260518_002_staff_access_form_modules.sql");
} else {
  console.log("Staff profile tables exist; skipping staff module migration.");
}

const counts = Object.fromEntries(staffTables.map(({ table }) => [table, tableCount(table)]));
const countValues = Object.values(counts);
const allEmpty = countValues.every((count) => count === 0);
const allExpected = staffTables.every(({ table, expected }) => counts[table] === expected);

if (allEmpty) {
  console.log("Staff tables are empty; importing staff CSV files.");

  for (const table of staffTables) {
    importCsv(table);
  }
} else if (allExpected) {
  console.log("Staff tables already contain the expected 257 rows; skipping import.");
} else {
  console.error("Staff tables are partially populated. Refusing to import to avoid duplicates.");

  for (const { table, expected } of staffTables) {
    console.error(`${table}: ${counts[table]} rows (expected ${expected})`);
  }

  process.exit(1);
}

console.log("\nFinal counts:");

for (const { table, expected } of staffTables) {
  const count = tableCount(table);
  const marker = count === expected ? "OK" : "CHECK";
  console.log(`${marker} ${table}: ${count} rows (expected ${expected})`);
}

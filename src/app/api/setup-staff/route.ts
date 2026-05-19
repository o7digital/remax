import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function projectRoot(): string {
  // In Next.js the CWD at runtime is the project root
  return process.cwd();
}

function readMigration(filename: string): string {
  return readFileSync(
    join(projectRoot(), "supabase", "migrations", filename),
    "utf-8"
  );
}

function readCsv(filename: string): string {
  return readFileSync(
    join(projectRoot(), "bdd", "exports", filename),
    "utf-8"
  );
}

/**
 * Minimal CSV parser that handles quoted fields and CRLF/LF line endings.
 * Returns an array of objects keyed by the header row.
 */
function parseCsv(raw: string): Record<string, string>[] {
  const lines = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const nonEmpty = lines.filter((l) => l.trim() !== "");
  if (nonEmpty.length < 2) return [];

  const headers = splitCsvLine(nonEmpty[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < nonEmpty.length; i++) {
    const values = splitCsvLine(nonEmpty[i]);
    const row: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j] ?? "";
    }
    rows.push(row);
  }

  return rows;
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

/** Convert an empty string to null, otherwise return the value. */
function nullIfEmpty(v: string): string | null {
  return v === "" ? null : v;
}

/** Convert a CSV boolean string ("true"/"false"/"1"/"0") to a JS boolean. */
function parseBool(v: string): boolean {
  return v === "true" || v === "1";
}

// ---------------------------------------------------------------------------
// Migration runner
// ---------------------------------------------------------------------------

async function runMigrations(): Promise<string[]> {
  const migrations = [
    "20260329_001_remax_core_schema.sql",
    "20260518_002_staff_access_form_modules.sql",
  ];

  const log: string[] = [];

  for (const filename of migrations) {
    try {
      const sql = readMigration(filename);
      // Split on statement boundaries — execute each statement individually
      // so that "already exists" errors on individual objects don't abort the batch.
      const statements = sql
        .split(/;\s*\n/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.startsWith("--"));

      let ok = 0;
      let skipped = 0;

      for (const stmt of statements) {
        try {
          await prisma.$executeRawUnsafe(stmt + ";");
          ok++;
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          // Ignore "already exists" errors — migration is idempotent
          if (
            msg.includes("already exists") ||
            msg.includes("duplicate_object") ||
            msg.includes("42710") || // duplicate_object
            msg.includes("42P07")    // duplicate_table
          ) {
            skipped++;
          } else {
            throw new Error(`Migration ${filename} failed on statement: ${stmt.slice(0, 80)}… — ${msg}`);
          }
        }
      }

      log.push(`${filename}: ${ok} statements executed, ${skipped} skipped (already exist)`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Migration error: ${msg}`);
    }
  }

  return log;
}

// ---------------------------------------------------------------------------
// CSV importers
// ---------------------------------------------------------------------------

async function importStaffMembers(): Promise<number> {
  const rows = parseCsv(readCsv("staff_members.csv"));
  if (rows.length === 0) return 0;

  let imported = 0;

  for (const r of rows) {
    try {
      await prisma.$executeRawUnsafe(
        `INSERT INTO public.staff_members (
          id, legacy_access_id, legacy_full_name, first_name, last_name,
          display_name, staff_kind, advisor_class, employment_status,
          is_guard_eligible, tax_id, tax_regime, bank_name, bank_account,
          bank_clabe, mobile_phone, office_phone, personal_email, work_email,
          address_line_1, neighborhood, city, state, postal_code, country,
          joined_on, first_joined_on, left_on, notes
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7::public.staff_kind, $8::public.advisor_class, $9::public.employment_status,
          $10, $11, $12, $13, $14,
          $15, $16, $17, $18, $19,
          $20, $21, $22, $23, $24, $25,
          $26, $27, $28, $29
        ) ON CONFLICT (id) DO NOTHING`,
        r.id,
        nullIfEmpty(r.legacy_access_id) !== null ? parseInt(r.legacy_access_id) : null,
        nullIfEmpty(r.legacy_full_name),
        nullIfEmpty(r.first_name),
        nullIfEmpty(r.last_name),
        r.display_name,
        r.staff_kind,
        r.advisor_class,
        r.employment_status,
        parseBool(r.is_guard_eligible),
        nullIfEmpty(r.tax_id),
        nullIfEmpty(r.tax_regime),
        nullIfEmpty(r.bank_name),
        nullIfEmpty(r.bank_account),
        nullIfEmpty(r.bank_clabe),
        nullIfEmpty(r.mobile_phone),
        nullIfEmpty(r.office_phone),
        nullIfEmpty(r.personal_email),
        nullIfEmpty(r.work_email),
        nullIfEmpty(r.address_line_1),
        nullIfEmpty(r.neighborhood),
        nullIfEmpty(r.city),
        nullIfEmpty(r.state),
        nullIfEmpty(r.postal_code),
        r.country || "MX",
        nullIfEmpty(r.joined_on),
        nullIfEmpty(r.first_joined_on),
        nullIfEmpty(r.left_on),
        nullIfEmpty(r.notes)
      );
      imported++;
    } catch {
      // Skip rows that fail (e.g. FK violations) and continue
    }
  }

  return imported;
}

async function importStaffFiscalProfiles(): Promise<number> {
  const rows = parseCsv(readCsv("staff_fiscal_profiles.csv"));
  if (rows.length === 0) return 0;

  let imported = 0;

  for (const r of rows) {
    try {
      await prisma.$executeRawUnsafe(
        `INSERT INTO public.staff_fiscal_profiles (
          id, staff_member_id, tax_id, tax_regime, cfdi_use,
          billing_name, billing_address_line_1, billing_neighborhood,
          billing_city, billing_state, billing_postal_code, billing_country, notes
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8,
          $9, $10, $11, $12, $13
        ) ON CONFLICT (id) DO NOTHING`,
        r.id,
        r.staff_member_id,
        nullIfEmpty(r.tax_id),
        nullIfEmpty(r.tax_regime),
        nullIfEmpty(r.cfdi_use),
        nullIfEmpty(r.billing_name),
        nullIfEmpty(r.billing_address_line_1),
        nullIfEmpty(r.billing_neighborhood),
        nullIfEmpty(r.billing_city),
        nullIfEmpty(r.billing_state),
        nullIfEmpty(r.billing_postal_code),
        r.billing_country || "MX",
        nullIfEmpty(r.notes)
      );
      imported++;
    } catch {
      // Skip rows that fail and continue
    }
  }

  return imported;
}

async function importStaffPersonalProfiles(): Promise<number> {
  const rows = parseCsv(readCsv("staff_personal_profiles.csv"));
  if (rows.length === 0) return 0;

  let imported = 0;

  for (const r of rows) {
    try {
      await prisma.$executeRawUnsafe(
        `INSERT INTO public.staff_personal_profiles (
          id, staff_member_id, curp, nss, birth_date, birth_place,
          nationality, marital_status, emergency_contact_name,
          emergency_contact_phone, emergency_contact_relationship, notes
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9,
          $10, $11, $12
        ) ON CONFLICT (id) DO NOTHING`,
        r.id,
        r.staff_member_id,
        nullIfEmpty(r.curp),
        nullIfEmpty(r.nss),
        nullIfEmpty(r.birth_date),
        nullIfEmpty(r.birth_place),
        r.nationality || "MX",
        nullIfEmpty(r.marital_status),
        nullIfEmpty(r.emergency_contact_name),
        nullIfEmpty(r.emergency_contact_phone),
        nullIfEmpty(r.emergency_contact_relationship),
        nullIfEmpty(r.notes)
      );
      imported++;
    } catch {
      // Skip rows that fail and continue
    }
  }

  return imported;
}

async function importStaffRemaxAccounts(): Promise<number> {
  const rows = parseCsv(readCsv("staff_remax_accounts.csv"));
  if (rows.length === 0) return 0;

  let imported = 0;

  for (const r of rows) {
    try {
      await prisma.$executeRawUnsafe(
        `INSERT INTO public.staff_remax_accounts (
          id, staff_member_id, agent_code, franchise_code, region_code,
          mls_access, mls_username, remax_email, remax_profile_url,
          licensed_on, license_expires_on, notes
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9,
          $10, $11, $12
        ) ON CONFLICT (id) DO NOTHING`,
        r.id,
        r.staff_member_id,
        nullIfEmpty(r.agent_code),
        nullIfEmpty(r.franchise_code),
        nullIfEmpty(r.region_code),
        parseBool(r.mls_access),
        nullIfEmpty(r.mls_username),
        nullIfEmpty(r.remax_email),
        nullIfEmpty(r.remax_profile_url),
        nullIfEmpty(r.licensed_on),
        nullIfEmpty(r.license_expires_on),
        nullIfEmpty(r.notes)
      );
      imported++;
    } catch {
      // Skip rows that fail and continue
    }
  }

  return imported;
}

// ---------------------------------------------------------------------------
// Count queries
// ---------------------------------------------------------------------------

async function getTableCounts(): Promise<Record<string, number>> {
  const tables = [
    "staff_members",
    "staff_fiscal_profiles",
    "staff_personal_profiles",
    "staff_remax_accounts",
  ];

  const counts: Record<string, number> = {};

  for (const table of tables) {
    try {
      const result = await prisma.$queryRawUnsafe<[{ count: bigint }]>(
        `SELECT count(*)::bigint AS count FROM public.${table}`
      );
      counts[table] = Number(result[0].count);
    } catch {
      counts[table] = -1;
    }
  }

  return counts;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(): Promise<NextResponse> {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "DATABASE_URL environment variable is not set" },
      { status: 500 }
    );
  }

  try {
    // 1. Run migrations
    const migrationLog = await runMigrations();

    // 2. Import CSVs
    const [
      staffMembersImported,
      fiscalProfilesImported,
      personalProfilesImported,
      remaxAccountsImported,
    ] = await Promise.all([
      importStaffMembers(),
      importStaffFiscalProfiles(),
      importStaffPersonalProfiles(),
      importStaffRemaxAccounts(),
    ]);

    // 3. Verify counts
    const counts = await getTableCounts();

    return NextResponse.json({
      ok: true,
      migrations: migrationLog,
      imported: {
        staff_members: staffMembersImported,
        staff_fiscal_profiles: fiscalProfilesImported,
        staff_personal_profiles: personalProfilesImported,
        staff_remax_accounts: remaxAccountsImported,
      },
      counts,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}

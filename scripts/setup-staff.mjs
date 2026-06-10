import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set.');
  process.exit(1);
}

const csvDir = path.join(__dirname, '../bdd/exports');
const staffCsv = path.join(csvDir, 'staff_members.csv');

function sql(query) {
  return execSync(`psql "${DATABASE_URL}" -t -c "${query}"`, {
    encoding: 'utf-8',
  }).trim();
}

function sqlFile(query) {
  execSync(`psql "${DATABASE_URL}" -c "${query}"`, { stdio: 'inherit' });
}

// ---------------------------------------------------------------------------
// Step 1 — Ensure required enum types exist
// ---------------------------------------------------------------------------
function ensureEnumTypes() {
  console.log('🔧 Ensuring enum types exist...');

  const enums = [
    {
      name: 'staff_kind',
      values: "'advisor','manager','admin','reception'",
    },
    {
      name: 'advisor_class',
      values: "'A','M','staff'",
    },
    {
      name: 'employment_status',
      values: "'active','inactive','suspended','archived'",
    },
  ];

  for (const { name, values } of enums) {
    try {
      sql(`SELECT 'public.${name}'::regtype`);
      console.log(`  ✓ enum public.${name} already exists`);
    } catch {
      sqlFile(
        `CREATE TYPE public.${name} AS ENUM (${values});`
      );
      console.log(`  ✓ created enum public.${name}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Step 2 — Create tables if they don't exist
// ---------------------------------------------------------------------------
function createTables() {
  console.log('\n🏗  Creating tables if they do not exist...');

  // staff_members — core identity table, matches the CSV schema exactly
  sqlFile(`
    CREATE TABLE IF NOT EXISTS public.staff_members (
      id uuid PRIMARY KEY,
      profile_id uuid,
      legacy_access_id integer,
      legacy_full_name text,
      first_name text,
      last_name text,
      display_name text NOT NULL,
      staff_kind public.staff_kind NOT NULL,
      advisor_class public.advisor_class NOT NULL DEFAULT 'staff',
      employment_status public.employment_status NOT NULL DEFAULT 'active',
      is_guard_eligible boolean NOT NULL DEFAULT false,
      tax_id text,
      tax_regime text,
      bank_name text,
      bank_account text,
      bank_clabe text,
      mobile_phone text,
      office_phone text,
      personal_email text,
      work_email text,
      address_line_1 text,
      address_line_2 text,
      neighborhood text,
      city text,
      state text,
      postal_code text,
      country text NOT NULL DEFAULT 'MX',
      joined_on date,
      first_joined_on date,
      left_on date,
      notes text,
      metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  `);
  console.log('  ✓ public.staff_members');

  // staff_fiscal_profiles — fiscal and banking data per staff member
  sqlFile(`
    CREATE TABLE IF NOT EXISTS public.staff_fiscal_profiles (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      staff_member_id uuid NOT NULL REFERENCES public.staff_members(id) ON DELETE CASCADE,
      tax_id text,
      tax_regime text,
      bank_name text,
      bank_account text,
      bank_clabe text,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      UNIQUE (staff_member_id)
    );
  `);
  console.log('  ✓ public.staff_fiscal_profiles');

  // staff_personal_profiles — personal contact and address data
  sqlFile(`
    CREATE TABLE IF NOT EXISTS public.staff_personal_profiles (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      staff_member_id uuid NOT NULL REFERENCES public.staff_members(id) ON DELETE CASCADE,
      mobile_phone text,
      personal_email text,
      address_line_1 text,
      neighborhood text,
      city text,
      state text,
      postal_code text,
      country text NOT NULL DEFAULT 'MX',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      UNIQUE (staff_member_id)
    );
  `);
  console.log('  ✓ public.staff_personal_profiles');

  // staff_remax_accounts — RE/MAX-specific account and career data
  sqlFile(`
    CREATE TABLE IF NOT EXISTS public.staff_remax_accounts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      staff_member_id uuid NOT NULL REFERENCES public.staff_members(id) ON DELETE CASCADE,
      work_email text,
      office_phone text,
      advisor_class public.advisor_class NOT NULL DEFAULT 'staff',
      employment_status public.employment_status NOT NULL DEFAULT 'active',
      joined_on date,
      first_joined_on date,
      left_on date,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      UNIQUE (staff_member_id)
    );
  `);
  console.log('  ✓ public.staff_remax_accounts');
}

// ---------------------------------------------------------------------------
// Step 3 — Import staff_members.csv into public.staff_members
// ---------------------------------------------------------------------------
function importStaffMembers() {
  console.log('\n📥 Importing staff_members.csv → public.staff_members...');

  if (!fs.existsSync(staffCsv)) {
    throw new Error(`CSV file not found: ${staffCsv}`);
  }

  // The CSV columns that exist in the table (address_line_2 and metadata are
  // not in the CSV so they keep their defaults).
  const columns = [
    'id',
    'legacy_access_id',
    'legacy_full_name',
    'first_name',
    'last_name',
    'display_name',
    'staff_kind',
    'advisor_class',
    'employment_status',
    'is_guard_eligible',
    'tax_id',
    'tax_regime',
    'bank_name',
    'bank_account',
    'bank_clabe',
    'mobile_phone',
    'office_phone',
    'personal_email',
    'work_email',
    'address_line_1',
    'neighborhood',
    'city',
    'state',
    'postal_code',
    'country',
    'joined_on',
    'first_joined_on',
    'left_on',
    'notes',
  ].join(', ');

  const copySql = `\\copy public.staff_members (${columns}) FROM '${staffCsv}' WITH (FORMAT csv, HEADER true);`;
  execSync(`psql "${DATABASE_URL}" -c "${copySql}"`, { stdio: 'inherit' });
  console.log('  ✓ staff_members.csv imported');
}

// ---------------------------------------------------------------------------
// Step 4 — Populate satellite tables from staff_members
// ---------------------------------------------------------------------------
function populateSatelliteTables() {
  console.log('\n🔗 Populating satellite tables from staff_members...');

  sqlFile(`
    INSERT INTO public.staff_fiscal_profiles
      (staff_member_id, tax_id, tax_regime, bank_name, bank_account, bank_clabe)
    SELECT
      id,
      tax_id,
      tax_regime,
      bank_name,
      bank_account,
      bank_clabe
    FROM public.staff_members
    ON CONFLICT (staff_member_id) DO NOTHING;
  `);
  console.log('  ✓ public.staff_fiscal_profiles populated');

  sqlFile(`
    INSERT INTO public.staff_personal_profiles
      (staff_member_id, mobile_phone, personal_email, address_line_1,
       neighborhood, city, state, postal_code, country)
    SELECT
      id,
      mobile_phone,
      personal_email,
      address_line_1,
      neighborhood,
      city,
      state,
      postal_code,
      country
    FROM public.staff_members
    ON CONFLICT (staff_member_id) DO NOTHING;
  `);
  console.log('  ✓ public.staff_personal_profiles populated');

  sqlFile(`
    INSERT INTO public.staff_remax_accounts
      (staff_member_id, work_email, office_phone, advisor_class,
       employment_status, joined_on, first_joined_on, left_on)
    SELECT
      id,
      work_email,
      office_phone,
      advisor_class,
      employment_status,
      joined_on,
      first_joined_on,
      left_on
    FROM public.staff_members
    ON CONFLICT (staff_member_id) DO NOTHING;
  `);
  console.log('  ✓ public.staff_remax_accounts populated');
}

// ---------------------------------------------------------------------------
// Step 5 — Verify row counts
// ---------------------------------------------------------------------------
function verifyCounts() {
  console.log('\n📊 Verifying row counts...\n');

  const expected = 257;
  const tables = [
    'public.staff_members',
    'public.staff_fiscal_profiles',
    'public.staff_personal_profiles',
    'public.staff_remax_accounts',
  ];

  let allOk = true;

  for (const table of tables) {
    try {
      const result = sql(`SELECT count(*) FROM ${table};`);
      const actual = parseInt(result, 10);
      const status = actual === expected ? '✓' : '⚠';
      if (actual !== expected) allOk = false;
      console.log(`  ${status} ${table}: ${actual} rows (expected: ${expected})`);
    } catch (err) {
      console.error(`  ✗ Error counting ${table}: ${err.message}`);
      allOk = false;
    }
  }

  return allOk;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('🚀 Staff setup starting...\n');

  try {
    ensureEnumTypes();
    createTables();
    importStaffMembers();
    populateSatelliteTables();

    const ok = verifyCounts();

    if (ok) {
      console.log('\n✅ Staff setup completed successfully!');
    } else {
      console.warn('\n⚠  Setup finished but some row counts are unexpected. Check the output above.');
      process.exit(1);
    }
  } catch (err) {
    console.error(`\n❌ Setup failed: ${err.message}`);
    process.exit(1);
  }
}

main();

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const csvDir = path.join(__dirname, '../bdd/exports');
const csvFiles = [
  { file: 'properties.csv', table: 'public.properties' },
  { file: 'staff_members.csv', table: 'public.staff_members' },
  { file: 'property_contacts.csv', table: 'public.property_contacts' },
  { file: 'property_values.csv', table: 'public.property_values' },
  { file: 'deals.csv', table: 'public.deals' },
  { file: 'deal_participants.csv', table: 'public.deal_participants' },
  { file: 'guard_shifts.csv', table: 'public.guard_shifts' },
  { file: 'attendance_events.csv', table: 'public.attendance_events' },
];

function importCsv(csvFile, table) {
  const csvPath = path.join(csvDir, csvFile);

  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found: ${csvPath}`);
  }

  try {
    console.log(`Importing ${csvFile} → ${table}`);
    const sql = `\\copy ${table} FROM '${csvPath}' WITH (FORMAT csv, HEADER true);`;
    execSync(`psql "${DATABASE_URL}" -c "${sql}"`, {
      stdio: 'inherit',
    });
    console.log(`✓ Imported ${csvFile}`);
  } catch (error) {
    throw new Error(`Import failed for ${csvFile}: ${error.message}`);
  }
}

function verifyCounts() {
  console.log('\n📊 Verifying row counts...\n');
  const expectedCounts = {
    'public.properties': 2916,
    'public.staff_members': 257,
    'public.property_contacts': 1941,
    'public.property_values': 3855,
    'public.deals': 1620,
    'public.deal_participants': 2629,
    'public.guard_shifts': 7563,
    'public.attendance_events': 19996,
  };

  for (const [table, expected] of Object.entries(expectedCounts)) {
    try {
      const result = execSync(
        `psql "${DATABASE_URL}" -t -c "SELECT count(*) FROM ${table};"`,
        { encoding: 'utf-8' }
      );
      const actual = parseInt(result.trim());
      const status = actual === expected ? '✓' : '⚠';
      console.log(`${status} ${table}: ${actual} (expected: ${expected})`);
    } catch (error) {
      console.error(`✗ Error counting ${table}: ${error.message}`);
    }
  }
}

async function main() {
  try {
    console.log('📥 Starting CSV Import\n');

    for (const { file, table } of csvFiles) {
      importCsv(file, table);
    }

    verifyCounts();
    console.log('\n✅ Import completed successfully!');
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();

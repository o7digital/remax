import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export async function POST(request: Request) {
  try {
    // Vérifier que DATABASE_URL existe
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      return Response.json(
        { error: 'DATABASE_URL not configured' },
        { status: 500 }
      );
    }

    const csvDir = path.join(process.cwd(), 'bdd/exports');
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

    const results: any[] = [];

    for (const { file, table } of csvFiles) {
      const csvPath = path.join(csvDir, file);

      if (!fs.existsSync(csvPath)) {
        results.push({
          file,
          status: 'skipped',
          reason: 'File not found',
        });
        continue;
      }

      try {
        const sql = `\\copy ${table} FROM '${csvPath}' WITH (FORMAT csv, HEADER true);`;
        execSync(`psql "${DATABASE_URL}" -c "${sql}"`, {
          stdio: 'pipe',
        });
        results.push({
          file,
          status: 'success',
        });
      } catch (error: any) {
        results.push({
          file,
          status: 'error',
          error: error.message,
        });
      }
    }

    // Vérifier les counts
    const expectedCounts: Record<string, number> = {
      'public.properties': 2916,
      'public.staff_members': 257,
      'public.property_contacts': 1941,
      'public.property_values': 3855,
      'public.deals': 1620,
      'public.deal_participants': 2629,
      'public.guard_shifts': 7563,
      'public.attendance_events': 19996,
    };

    const counts: Record<string, number> = {};
    for (const [table, expected] of Object.entries(expectedCounts)) {
      try {
        const result = execSync(
          `psql "${DATABASE_URL}" -t -c "SELECT count(*) FROM ${table};"`,
          { encoding: 'utf-8' }
        );
        counts[table] = parseInt(result.trim());
      } catch (error) {
        counts[table] = 0;
      }
    }

    return Response.json({
      status: 'completed',
      imports: results,
      counts,
    });
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

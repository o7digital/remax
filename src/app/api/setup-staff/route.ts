import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// CSV parser — handles quoted fields (including embedded commas / newlines)
// ---------------------------------------------------------------------------
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (inQuotes) {
      if (ch === '"') {
        // Peek ahead: escaped quote?
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        fields.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }

  fields.push(current);
  return fields;
}

function parseCsv(content: string): { headers: string[]; rows: string[][] } {
  // Normalise line endings
  const lines = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

  // Drop trailing empty line if present
  if (lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  const headers = parseCsvLine(lines[0]);
  const rows = lines.slice(1).map((line) => parseCsvLine(line));

  return { headers, rows };
}

// ---------------------------------------------------------------------------
// SQL literal escaping — used only for values we insert via raw SQL
// ---------------------------------------------------------------------------
function sqlLiteral(value: string | null | undefined): string {
  if (value === null || value === undefined || value === "") {
    return "NULL";
  }
  // Escape single quotes
  return `'${value.replace(/'/g, "''")}'`;
}

// ---------------------------------------------------------------------------
// Run a migration SQL file, splitting on statement boundaries.
// Handles dollar-quoted blocks ($...$) used in PL/pgSQL function bodies.
// ---------------------------------------------------------------------------
function splitSqlStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = "";
  let inDollarQuote = false;
  let dollarTag = "";
  let i = 0;

  while (i < sql.length) {
    // Detect start/end of dollar-quoted string (e.g. $ or $tag$)
    if (!inDollarQuote && sql[i] === "$") {
      // Find the closing $ of the tag
      const tagEnd = sql.indexOf("$", i + 1);
      if (tagEnd !== -1) {
        const tag = sql.slice(i, tagEnd + 1); // e.g. "$" or "$body$"
        inDollarQuote = true;
        dollarTag = tag;
        current += tag;
        i = tagEnd + 1;
        continue;
      }
    }

    if (inDollarQuote) {
      // Look for the closing dollar tag
      if (sql.startsWith(dollarTag, i)) {
        current += dollarTag;
        i += dollarTag.length;
        inDollarQuote = false;
        dollarTag = "";
        continue;
      }
    } else if (sql[i] === ";") {
      // Statement boundary outside of any quoted block
      current += ";";
      const trimmed = current.trim();
      if (trimmed.length > 1) {
        // more than just ";"
        statements.push(trimmed);
      }
      current = "";
      i++;
      continue;
    }

    current += sql[i];
    i++;
  }

  // Flush any remaining content (statement without trailing semicolon)
  const trimmed = current.trim();
  if (trimmed.length > 0) {
    statements.push(trimmed.endsWith(";") ? trimmed : trimmed + ";");
  }

  return statements;
}

async function runMigration(filePath: string): Promise<void> {
  const sql = fs.readFileSync(filePath, "utf-8");
  const statements = splitSqlStatements(sql);

  for (const stmt of statements) {
    try {
      await prisma.$executeRawUnsafe(stmt);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      // Ignore "already exists" errors — idempotent re-runs are safe
      const isAlreadyExists =
        message.includes("already exists") ||
        message.includes("42710") || // duplicate_object
        message.includes("42P07"); // duplicate_table
      if (!isAlreadyExists) {
        throw err;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Import staff_members CSV
// ---------------------------------------------------------------------------
async function importStaffMembers(csvPath: string): Promise<number> {
  const content = fs.readFileSync(csvPath, "utf-8");
  const { headers, rows } = parseCsv(content);

  // Columns present in the CSV (must match table column names exactly)
  const columns = headers.join(", ");

  let imported = 0;

  // Insert in batches of 50 to avoid overly large SQL statements
  const BATCH = 50;

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);

    const valuesClauses = batch.map((row) => {
      const literals = row.map((cell) => sqlLiteral(cell));
      return `(${literals.join(", ")})`;
    });

    const sql = `
      INSERT INTO public.staff_members (${columns})
      VALUES ${valuesClauses.join(",\n")}
      ON CONFLICT (id) DO NOTHING;
    `;

    await prisma.$executeRawUnsafe(sql);
    imported += batch.length;
  }

  return imported;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(): Promise<NextResponse> {
  try {
    const projectRoot = process.cwd();

    // ── 1. Run migrations ──────────────────────────────────────────────────
    const migrationsDir = path.join(projectRoot, "supabase", "migrations");

    const migrationFiles = [
      "20260329_001_remax_core_schema.sql",
      "20260518_001_property_alta_tables.sql",
    ];

    const migrationResults: Record<string, string> = {};

    for (const fileName of migrationFiles) {
      const filePath = path.join(migrationsDir, fileName);

      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { error: `Migration file not found: ${fileName}` },
          { status: 500 }
        );
      }

      try {
        await runMigration(filePath);
        migrationResults[fileName] = "ok";
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json(
          {
            error: `Migration failed: ${fileName}`,
            detail: message,
            migrations: migrationResults,
          },
          { status: 500 }
        );
      }
    }

    // ── 2. Import staff_members CSV ────────────────────────────────────────
    const csvPath = path.join(
      projectRoot,
      "bdd",
      "exports",
      "staff_members.csv"
    );

    if (!fs.existsSync(csvPath)) {
      return NextResponse.json(
        { error: "CSV file not found: bdd/exports/staff_members.csv" },
        { status: 500 }
      );
    }

    let importedRows = 0;
    try {
      importedRows = await importStaffMembers(csvPath);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return NextResponse.json(
        {
          error: "CSV import failed",
          detail: message,
          migrations: migrationResults,
        },
        { status: 500 }
      );
    }

    // ── 3. Query counts ────────────────────────────────────────────────────
    const countResult = await prisma.$queryRawUnsafe<[{ count: bigint }]>(
      "SELECT COUNT(*) AS count FROM public.staff_members;"
    );

    const staffMembersCount = Number(countResult[0].count);

    // ── 4. Return result ───────────────────────────────────────────────────
    return NextResponse.json({
      ok: true,
      migrations: migrationResults,
      imported: importedRows,
      counts: {
        staff_members: staffMembersCount,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Unexpected error", detail: message },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}

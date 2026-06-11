import { execSync, spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const DATABASE_URL = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;
const BACKUP_DIR = process.env.BACKUP_DIR || '/data/backups';
const RETENTION_DAYS = parseInt(process.env.BACKUP_RETENTION_DAYS || '14', 10);

if (!DATABASE_URL) {
  console.error('❌ DATABASE_PUBLIC_URL (or DATABASE_URL) environment variable is not set.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns a timestamp string formatted as YYYY-MM-DD-HH-mm, suitable for
 * embedding in a filename.
 */
function timestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return [
    now.getUTCFullYear(),
    pad(now.getUTCMonth() + 1),
    pad(now.getUTCDate()),
    pad(now.getUTCHours()),
    pad(now.getUTCMinutes()),
  ].join('-');
}

/**
 * Deletes compressed backup files whose mtime is older than RETENTION_DAYS.
 */
function pruneOldBackups() {
  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
  const entries = fs.readdirSync(BACKUP_DIR);
  let pruned = 0;

  for (const entry of entries) {
    if (!entry.startsWith('backup-') || !entry.endsWith('.sql.gz')) continue;

    const fullPath = path.join(BACKUP_DIR, entry);
    const stat = fs.statSync(fullPath);

    if (stat.mtimeMs < cutoff) {
      fs.unlinkSync(fullPath);
      console.log(`  🗑  Deleted old backup: ${entry}`);
      pruned++;
    }
  }

  if (pruned === 0) {
    console.log('  ✓ No expired backups to remove.');
  } else {
    console.log(`  ✓ Removed ${pruned} expired backup(s).`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('🗄  Database backup starting...\n');

  // Ensure the backup directory exists (the volume should already be mounted,
  // but create subdirectories if needed).
  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  const filename = `backup-${timestamp()}.sql.gz`;
  const destPath = path.join(BACKUP_DIR, filename);

  // ── Step 1: pg_dump → gzip → file ────────────────────────────────────────
  console.log(`📦 Dumping database to ${destPath} ...`);

  try {
    // Pipe pg_dump output directly into gzip to avoid writing an uncompressed
    // intermediate file on the volume.
    execSync(
      `pg_dump --no-password "${DATABASE_URL}" | gzip > "${destPath}"`,
      { stdio: ['ignore', 'pipe', 'pipe'], shell: true }
    );
  } catch (err) {
    // Clean up a potentially partial file before aborting.
    if (fs.existsSync(destPath)) {
      fs.unlinkSync(destPath);
    }
    console.error(`❌ pg_dump failed: ${err.message}`);
    process.exit(1);
  }

  const { size } = fs.statSync(destPath);
  const sizeMb = (size / 1024 / 1024).toFixed(2);
  console.log(`  ✓ Backup written — ${filename} (${sizeMb} MB)\n`);

  // ── Step 2: Prune old backups ─────────────────────────────────────────────
  console.log(`🧹 Pruning backups older than ${RETENTION_DAYS} days...`);
  pruneOldBackups();

  console.log('\n✅ Backup completed successfully!');
}

main();

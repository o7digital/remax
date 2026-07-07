import { execFileSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const databaseUrl = process.env.DATABASE_URL;
const backupDir = process.env.BACKUP_DIR ?? "/data/backups";
const retentionDays = Number(process.env.BACKUP_RETENTION_DAYS ?? "14");

if (!databaseUrl) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

fs.mkdirSync(backupDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputPath = path.join(backupDir, `remax-${timestamp}.dump`);

console.log(`Creating Railway Postgres backup: ${outputPath}`);

execFileSync("pg_dump", [databaseUrl, "--format=custom", "--no-owner", "--no-acl", "--file", outputPath], {
  stdio: "inherit"
});

if (Number.isFinite(retentionDays) && retentionDays > 0) {
  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;

  for (const entry of fs.readdirSync(backupDir)) {
    if (!entry.startsWith("remax-") || !entry.endsWith(".dump")) {
      continue;
    }

    const filePath = path.join(backupDir, entry);
    const stat = fs.statSync(filePath);

    if (stat.mtimeMs < cutoff) {
      fs.rmSync(filePath);
      console.log(`Deleted expired backup: ${filePath}`);
    }
  }
}

console.log("Backup completed.");

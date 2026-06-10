# Railway Postgres backups

This project includes a backup command for the Railway Postgres database:

```bash
npm run railway:backup
```

Required environment:

- `DATABASE_URL`: Railway Postgres connection string.
- `BACKUP_DIR`: optional directory for dump files. Defaults to `/data/backups`.
- `BACKUP_RETENTION_DAYS`: optional retention window. Defaults to `14`.

Recommended Railway setup:

1. Add a persistent Railway volume mounted at `/data`.
2. Create a small cron service using this repo.
3. Set the cron command to `npm run railway:backup`.
4. Set the schedule, for example daily at night.
5. Share the same `DATABASE_URL` as the production app or connect the same Postgres plugin.

Restore example:

```bash
pg_restore --clean --if-exists --no-owner --no-acl --dbname "$DATABASE_URL" /data/backups/remax-YYYY-MM-DDTHH-MM-SS.dump
```

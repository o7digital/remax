# Directus Railway backups

Objectif: sauvegarder les donnees Directus sur Railway avec deux cadences distinctes:

- hebdomadaire: conservation 120 jours ;
- mensuelle: conservation 730 jours.

Ces backups couvrent la base PostgreSQL utilisee par Directus. Si Directus stocke les fichiers localement, activer aussi les backups du volume Railway attache au dossier d'uploads Directus ou migrer les uploads vers un bucket S3 compatible.

## Services Railway a creer

Creer deux services Railway de type cron depuis ce repo.

### 1. Directus backup weekly

- Service name: `directus-backup-weekly`
- Start command: `npm run directus:backup:weekly`
- Cron schedule: `0 8 * * 1`
- Timezone: Railway evalue les crons en UTC. Cette expression lance le backup chaque lundi a 08:00 UTC.
- Volume: attacher un volume persistant monte sur `/data`

Variables:

```bash
DATABASE_URL=${{Postgres.DATABASE_URL}}
BACKUP_DIR=/data/backups/directus/weekly
BACKUP_RETENTION_DAYS=120
BACKUP_PREFIX=directus-weekly
```

### 2. Directus backup monthly

- Service name: `directus-backup-monthly`
- Start command: `npm run directus:backup:monthly`
- Cron schedule: `30 8 1 * *`
- Timezone: Railway evalue les crons en UTC. Cette expression lance le backup le 1er de chaque mois a 08:30 UTC.
- Volume: attacher un volume persistant monte sur `/data`

Variables:

```bash
DATABASE_URL=${{Postgres.DATABASE_URL}}
BACKUP_DIR=/data/backups/directus/monthly
BACKUP_RETENTION_DAYS=730
BACKUP_PREFIX=directus-monthly
```

## Validation apres mise en place

1. Lancer manuellement chaque service cron une premiere fois.
2. Verifier les logs Railway:

```text
Creating Railway Postgres backup: /data/backups/directus/...
Backup completed.
```

3. Verifier les fichiers dans le volume:

```bash
railway volume files list /data/backups/directus/weekly
railway volume files list /data/backups/directus/monthly
```

4. Telecharger un dump de test hors Railway:

```bash
railway volume files download /data/backups/directus/weekly/directus-weekly-YYYY-MM-DDTHH-MM-SS-ZZZ.dump ./directus-weekly-test.dump
```

5. Tester le restore sur une base de staging, jamais directement sur production:

```bash
pg_restore --clean --if-exists --no-owner --no-acl --dbname "$STAGING_DATABASE_URL" ./directus-weekly-test.dump
```

## Restore production

Procedure en incident:

1. Mettre Directus en maintenance ou couper temporairement les ecritures.
2. Identifier le dump a restaurer dans `/data/backups/directus/weekly` ou `/data/backups/directus/monthly`.
3. Restaurer sur une nouvelle base ou un clone de production.
4. Verifier Directus: collections, users, permissions, relations et fichiers.
5. Basculer `DATABASE_URL` de Directus vers la base restauree.

Commande de restore:

```bash
pg_restore --clean --if-exists --no-owner --no-acl --dbname "$DATABASE_URL" /data/backups/directus/monthly/directus-monthly-YYYY-MM-DDTHH-MM-SS-ZZZ.dump
```

## Points d'attention

- Les services cron doivent s'arreter a la fin du script. Le script `scripts/backup-railway-postgres.mjs` le fait.
- Ne pas stocker les dumps dans le filesystem ephemeral du container. Le volume `/data` est obligatoire.
- Si les assets Directus sont sur disque local, la base PostgreSQL ne suffit pas: il faut aussi sauvegarder le volume d'uploads.
- Garder au moins un test de restore mensuel documente.

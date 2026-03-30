# Supabase Dev Setup

## Ce qu'il faut fournir

Pour brancher le projet de dev, il faut quatre informations reelles :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_PASSWORD`

Optionnel mais utile :

- `SUPABASE_ACCESS_TOKEN`
- `DATABASE_URL`

## Ce qui manque dans les infos recues

Tu as deja donne :

- l'URL du projet
- la cle publishable
- le `project_ref`

Il manque encore :

- le vrai mot de passe Postgres a la place de `[YOUR-PASSWORD]`
- la `service_role key`
- si on veut utiliser le CLI en mode connecte sans prompt, le `access token`

## Variables attendues

Exemple de `.env.local` quand on branchera l'app :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://zbajdczhdbchigtkksky.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
DATABASE_URL=postgresql://postgres:...@db.zbajdczhdbchigtkksky.supabase.co:5432/postgres
```

## CLI

Une fois les secrets dispo, la sequence type est :

```bash
supabase login
supabase link --project-ref zbajdczhdbchigtkksky
supabase db push
```

Si on prefere passer par Postgres direct, on peut aussi appliquer les migrations via `psql` avec `DATABASE_URL`.

## Strategie de branche

Le travail continue sur `dev`.

Sequence recommandee :

1. appliquer le schema sur Supabase dev
2. charger les CSV pilotes
3. brancher Next.js sur cette base dev
4. corriger les mappings et la qualite de donnees
5. merger `dev` vers `main`
6. recreer la meme sequence sur la base de prod

## Point important

La cle publishable seule ne suffit pas pour :

- appliquer les migrations
- importer les donnees
- faire des scripts serveur

Pour ca, il faut soit :

- `SUPABASE_SERVICE_ROLE_KEY`
- soit `DATABASE_URL` complet avec vrai mot de passe

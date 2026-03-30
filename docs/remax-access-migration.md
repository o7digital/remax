# REMAX Access Migration

## Constat

Le depot Next.js contient aujourd'hui une base produit et une demo operationnelle. Le fichier Access fourni par le client montre cependant que le futur produit doit couvrir bien plus que la navigation actuelle :

- gestion complete des proprietes et de leur cycle de vie ;
- gestion des asesores, staff et gerentes ;
- calcul et suivi des commissions ;
- guardias, presence, check-in et check-out ;
- marketing, leads et communications ;
- reporting et historique contractuel.

La base Access contient un historique riche et heterogene. Beaucoup de tables sont des archives mensuelles ou des copies de travail. Il faut donc migrer vers un modele Postgres nettoye et normalise au lieu de recopier Access tel quel.

## Tables source prioritaires

Tables coeur identifiees dans `REMAXDB_be.accdb` :

- `PROPIEDADES` : fiche principale du bien, statut, origine, adresse, type, prix, visites, clefs, metadata de promotion.
- `PropietariosALTA` : proprietaires rattaches a une propriete.
- `Compradores` : acheteurs ou locataires rattaches a une propriete.
- `AsesoresInternos` : base RH/commerciale des asesores et staff, avec coordonnees, statut, fiscalite et informations bancaires.
- `AsesoresALTA` : repartition de commission cote alta.
- `AsesoresCIERRE` : repartition de commission cote cierre.
- `AsesoresCANCEL` : repartition de commission cote cancelacion.
- `ComisionesBD` : enregistrement global des commissions calculees/payees.
- `Finiquitos` : fermeture, cancelacion, dates de cobro, dates de pago, notaire et elements de sortie.
- `Guardias` : planification et suivi de guardias.
- `StaffAsistencia` : presence du personnel administratif.
- `AsesorActivOK` : activites et heures d'entree/sortie des asesores.
- `Marketing` : traces de campagnes et d'engagement.

Tables de reference probables a reutiliser partiellement :

- `Origen`, `Origen2`
- `TipoProp`
- `Statusp`
- `Municipios`
- `Entidades`
- `Giro`
- `Idiomas`
- `Llaves`
- `ValoresProp`

## Lecture produit

Le besoin cible n'est plus une simple demo. Le produit doit converger vers quatre blocs :

1. Un backoffice transactionnel pour les proprietes, proprietaires, acheteurs, contrats et suivi commercial.
2. Un module admin pour les asesores, gerentes, staff, commissions et presence mobile.
3. Une couche marketing pour landing pages SEO, leads entrants, newsletter et nurturing.
4. Une couche data pour historiser Access, fiabiliser les imports et produire des tableaux de bord propres.

## Schema cible recommande

Base recommandee : `Next.js + Vercel + Supabase Postgres`

Tables coeur a creer dans Postgres :

- `profiles`
  - identite applicative
  - lien auth Supabase
  - langue, agence, statut
- `staff_members`
  - type : `advisor`, `manager`, `admin`, `reception`
  - classe : `A`, `M`, `staff`
  - dates d'entree/sortie
  - infos fiscales et bancaires utiles aux paiements
- `staff_roles`
  - multi-role par personne
  - ex. asesor + gerente
- `attendance_events`
  - `check_in`, `check_out`, `manual_adjustment`
  - horodatage, source mobile, geoloc optionnelle
- `guard_shifts`
  - date, plage horaire, assigne, remplacant, statut
- `properties`
  - cle metier, statut, type, operation, prix, adresse, source, metadata de diffusion
- `property_owners`
  - rattachement des proprietaires au bien
- `property_contacts`
  - acheteurs, locataires, prospects lies au bien
- `property_values`
  - historique des prix et changements de valorisation
- `listings`
  - donnees marketing/publication d'une propriete
- `deals`
  - alta, cierre, cancelacion, renta, venta
- `deal_participants`
  - asesores impliques par deal avec role et pourcentage
- `commission_rules`
  - regles de calcul par type d'operation et classe
- `commission_calculations`
  - calcul global par deal
- `commission_splits`
  - detail par participant
- `commission_payments`
  - statut de paiement, facture, date et mode de reglement
- `lead_sources`
  - SEO, formulaire, portal, referidos, campagne
- `leads`
  - personne, besoin, source, statut
- `lead_activities`
  - appels, emails, visites, relances
- `campaigns`
  - newsletter, campagne email, diffusion listing

## Mapping initial Access vers Postgres

- `PROPIEDADES` -> `properties`
- `PropietariosALTA` -> `property_owners`
- `Compradores` -> `property_contacts`
- `AsesoresInternos` -> `staff_members`
- `AsesoresALTA` + `AsesoresCIERRE` + `AsesoresCANCEL` -> `deal_participants`, `commission_splits`
- `ComisionesBD` -> `commission_calculations`
- `Finiquitos` -> `deals`, `commission_payments`
- `Guardias` -> `guard_shifts`
- `StaffAsistencia` + `AsesorActivOK` -> `attendance_events`
- `Marketing` -> `campaigns` et une partie de `lead_activities`

## Decisions structurantes

- Ne pas migrer les copies mensuelles `Marketing ...`, `Portal actividad ...`, `Copia de ...` en tables cibles distinctes.
- Conserver les historiques Access bruts comme source d'audit, puis normaliser.
- Separer clairement l'application authentifiee du site marketing SEO, meme si les deux restent en Next.js.
- Faire de la presence mobile une PWA web simple, pas une app native au depart.

## Roadmap recommande sur `dev`

1. Extraire le dictionnaire de donnees complet du fichier Access.
2. Identifier les tables historiques, doublons et archives mensuelles.
3. Definir le schema SQL cible pour Supabase.
4. Creer les imports CSV prioritaires : proprietes, staff, proprietaires, acheteurs, commissions.
5. Brancher le backoffice Next.js sur la vraie base.
6. Remplacer progressivement les donnees demo.
7. Ajouter la landing SEO, les formulaires leads et la newsletter.
8. Ajouter la presence mobile et la validation manager.

## Prochain lot concret

Le prochain travail utile est purement data :

- extraire toutes les tables et colonnes du `.accdb` ;
- classer les tables en `core`, `reference`, `archive`, `obsolete` ;
- produire un premier schema SQL Supabase ;
- preparer un import pilote sur `properties`, `staff_members` et `property_owners`.

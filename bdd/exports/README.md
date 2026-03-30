# Export CSV pilotes

Ces fichiers sont les premiers exports transformes depuis Access vers le schema cible Supabase v1.

Fichiers generes :

- `staff_members.csv`
- `properties.csv`
- `property_contacts.csv`
- `property_values.csv`
- `guard_shifts.csv`
- `attendance_events.csv`
- `deals.csv`
- `commission_calculations.csv`
- `deal_participants.csv`

Script source :

- `scripts/export_remax_seed_csvs.py`

Commande :

```bash
python3 scripts/export_remax_seed_csvs.py
```

Usage :

- charger d'abord `properties.csv`
- charger ensuite `staff_members.csv`
- charger ensuite `property_contacts.csv`
- charger ensuite `property_values.csv`
- charger ensuite `deals.csv`
- charger ensuite `deal_participants.csv`
- charger ensuite `guard_shifts.csv`
- charger enfin `attendance_events.csv`

Points d'attention :

- les UUID sont stables et derives des cles Access pour faciliter les reprises d'import ;
- certains champs Access restent bruts ou incomplets et devront etre nettoyes avant import final ;
- `property_contacts.csv` regroupe les proprietaires et les acheteurs dans la meme table cible ;
- `commission_calculations.csv` est actuellement vide car la table `ComisionesBD` de la base source ne contient pas de lignes ;
- `attendance_events.csv` est actuellement vide car les noms historiques des tables de presence ne correspondent pas encore proprement aux identites exportees dans `staff_members.csv` ;
- `deal_participants.csv` contient les participants de commissions, mais beaucoup de `staff_member_id` restent vides tant que la reconciliation des noms Access n'est pas amelioree.

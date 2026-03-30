# Base Access

Le fichier source Access du client doit rester dans ce dossier pour l'analyse et l'import.

Fichier actuellement detecte :

- `REMAXDB_be.accdb`

Recommandations :

- ne pas versionner les fichiers `.accdb` dans Git ;
- conserver ici uniquement la copie de travail locale ;
- exporter ensuite des CSV cibles par table pour des imports reproductibles vers Postgres.

Premieres tables source identifiees comme prioritaires :

- `PROPIEDADES`
- `PropietariosALTA`
- `Compradores`
- `AsesoresInternos`
- `AsesoresALTA`
- `AsesoresCIERRE`
- `AsesoresCANCEL`
- `ComisionesBD`
- `Finiquitos`
- `Guardias`
- `StaffAsistencia`
- `Marketing`

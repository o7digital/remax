# REMAX Access Dictionary

Source file: `bdd/REMAXDB_be.accdb`

## Summary

- Tables inventoried: `190`
- Core tables: `65`
- Reference tables: `69`
- Archive tables: `53`
- Obsolete tables: `3`

## Core Tables To Migrate First

| Table | Category | Priority | Rows | Columns |
| --- | --- | --- | ---: | ---: |
| `AsesorActivOK` | `core` | `high` | 1953 | 18 |
| `AsesoresCANCEL` | `core` | `high` | 721 | 15 |
| `AsesoresCIERRE` | `core` | `high` | 1307 | 20 |
| `AsesoresInternos` | `core` | `high` | 257 | 97 |
| `ComisionesBD` | `core` | `high` | 0 | 9 |
| `Compradores` | `core` | `high` | 351 | 5 |
| `Expediente` | `core` | `high` | 2568 | 57 |
| `ExpedientesControl` | `core` | `high` | 11 | 10 |
| `Finiquitos` | `core` | `high` | 1643 | 31 |
| `Guardias` | `core` | `high` | 7497 | 15 |
| `Marketing` | `core` | `high` | 284 | 19 |
| `Ofertas` | `core` | `high` | 2112 | 48 |
| `OfertasAsesores` | `core` | `high` | 2155 | 24 |
| `PROPIEDADES` | `core` | `high` | 2900 | 132 |
| `PropietariosALTA` | `core` | `high` | 1604 | 9 |
| `Recorridos` | `core` | `high` | 0 | 6 |
| `ReferidoCIERRE` | `core` | `high` | 11 | 13 |
| `Referidos Pre` | `core` | `high` | 435 | 38 |
| `ReferidosCobrados` | `core` | `high` | 14 | 44 |
| `StaffAsistencia` | `core` | `high` | 8386 | 10 |
| `ValoresProp` | `core` | `high` | 3851 | 8 |
| `Visitas` | `core` | `high` | 2791 | 28 |
| `AsesoresALTA` | `core` | `high` | 2962 | 21 |
| `Llaves` | `core` | `high` | 2402 | 20 |
| `Prospectación` | `core` | `high` | 1 | 28 |
| `ReferidoALTA` | `core` | `high` | 69 | 13 |

## Archive Families

These tables should not become first-class Postgres tables. They are mainly monthly copies, exports or work snapshots.

| Table | Category | Priority | Rows | Columns |
| --- | --- | --- | ---: | ---: |
| `Copia de Marketing` | `archive` | `low` | 33 | 11 |
| `Copia de Marketing 01-04-24` | `archive` | `low` | 31 | 19 |
| `Copia de Marketing Abril2024` | `archive` | `low` | 251 | 19 |
| `Copia de Marketing Febrero 2024` | `archive` | `low` | 212 | 19 |
| `Copia de Marketing Mayo2024` | `archive` | `low` | 283 | 19 |
| `Destacadas` | `archive` | `low` | 142 | 23 |
| `DestacadasEne-Abril` | `archive` | `low` | 7292 | 23 |
| `Marketing 080623` | `archive` | `low` | 587 | 11 |
| `Marketing 2` | `archive` | `low` | 587 | 11 |
| `Marketing Abril` | `archive` | `low` | 396 | 11 |
| `Marketing abril2021` | `archive` | `low` | 385 | 11 |
| `Marketing AGO 23` | `archive` | `low` | 33 | 11 |
| `Marketing Agosto` | `archive` | `low` | 420 | 11 |
| `Marketing Agosto 20` | `archive` | `low` | 431 | 11 |
| `Marketing Agosto 2021` | `archive` | `low` | 381 | 11 |
| `Marketing Agosto-S 2021` | `archive` | `low` | 388 | 11 |
| `Marketing Diciembre 2021` | `archive` | `low` | 527 | 11 |
| `Marketing Enero 2022` | `archive` | `low` | 565 | 11 |
| `Marketing febrero 2021` | `archive` | `low` | 444 | 11 |
| `Marketing Febrero 2024` | `archive` | `low` | 190 | 19 |
| `Marketing Julio` | `archive` | `low` | 406 | 11 |
| `Marketing Julio 20` | `archive` | `low` | 404 | 11 |
| `Marketing JULIO 23` | `archive` | `low` | 23 | 11 |
| `Marketing Junio` | `archive` | `low` | 406 | 11 |
| `Marketing Junio 20` | `archive` | `low` | 366 | 11 |
| `Marketing Junio 2021` | `archive` | `low` | 380 | 11 |
| `Marketing Marzo` | `archive` | `low` | 397 | 11 |
| `Marketing Marzo 20` | `archive` | `low` | 435 | 11 |
| `Marketing Marzo 22` | `archive` | `low` | 596 | 11 |
| `Marketing Mayo` | `archive` | `low` | 417 | 11 |
| `Marketing Mayo 2021` | `archive` | `low` | 379 | 11 |
| `Marketing Mayo 23` | `archive` | `low` | 14 | 11 |
| `Marketing Mayo2024` | `archive` | `low` | 270 | 19 |
| `Marketing Noviembre 20` | `archive` | `low` | 477 | 11 |
| `Marketing Noviembre 2019` | `archive` | `low` | 427 | 11 |
| `Marketing Noviembre 2021` | `archive` | `low` | 466 | 11 |
| `Marketing NOVIEMBRE 2023` | `archive` | `low` | 103 | 11 |
| `Marketing Octubre 20` | `archive` | `low` | 452 | 11 |
| `Marketing Octubre 2021` | `archive` | `low` | 431 | 11 |
| `Marketing Octubre 2023` | `archive` | `low` | 103 | 11 |
| `Marketing Septiembre 2019` | `archive` | `low` | 423 | 11 |
| `Marketing Septiembre 2021` | `archive` | `low` | 404 | 11 |
| `Marketing Septiembre 2023` | `archive` | `low` | 67 | 11 |
| `Portal actividad Agosto 2019` | `archive` | `low` | 119 | 19 |
| `Portal actividad Julio 2019` | `archive` | `low` | 107 | 19 |
| `Portal actividad Junio 2019` | `archive` | `low` | 107 | 19 |
| `Portales actividad Abril 2019` | `archive` | `low` | 100 | 17 |
| `Portales actividad Enero 2019` | `archive` | `low` | 119 | 17 |
| `Portales actividad Marzo 2019` | `archive` | `low` | 103 | 19 |
| `Portales Actividad Mayo 2019` | `archive` | `low` | 103 | 19 |
| `Portales Actividad Septiembre 2019` | `archive` | `low` | 14141 | 21 |
| `PortalesOK` | `archive` | `low` | 51 | 2 |
| `Portales actividad Feb 2019` | `archive` | `low` | 112 | 17 |

## Reference Tables

| Table | Category | Priority | Rows | Columns |
| --- | --- | --- | ---: | ---: |
| `acabados` | `reference` | `medium` | 4 | 1 |
| `Actividades` | `reference` | `medium` | 6 | 1 |
| `ActivPortalesOK` | `reference` | `low` | 21 | 7 |
| `Bajas` | `reference` | `low` | 2634 | 31 |
| `CalidProp` | `reference` | `medium` | 4 | 1 |
| `Califprop` | `reference` | `medium` | 4 | 1 |
| `Calipe` | `reference` | `medium` | 3 | 1 |
| `Carpint` | `reference` | `medium` | 4 | 1 |
| `CatProp1` | `reference` | `medium` | 3 | 1 |
| `CatProp2` | `reference` | `medium` | 4 | 1 |
| `ClasificCons` | `reference` | `medium` | 3 | 1 |
| `ConcepEgresos` | `reference` | `medium` | 89 | 7 |
| `ConcepIngresos` | `reference` | `medium` | 30 | 7 |
| `CondCompra` | `reference` | `medium` | 0 | 5 |
| `CONDICIONES` | `reference` | `medium` | 2881 | 18 |
| `Credito2` | `reference` | `medium` | 84 | 1 |
| `Cristales` | `reference` | `medium` | 3 | 1 |
| `EnlacePortales` | `reference` | `low` | 2767 | 5 |
| `Escrituradores` | `reference` | `medium` | 75 | 4 |
| `Estilop` | `reference` | `medium` | 7 | 1 |
| `Fachada` | `reference` | `medium` | 3 | 1 |
| `FechasCont` | `reference` | `medium` | 0 | 20 |
| `FPago` | `reference` | `medium` | 4 | 1 |
| `Guardias Asignadas` | `reference` | `low` | 262 | 17 |
| `Guardias Aux` | `reference` | `low` | 28 | 16 |
| `Herramientas` | `reference` | `medium` | 29 | 10 |
| `Hipotecas` | `reference` | `medium` | 123 | 8 |
| `Idiomas` | `reference` | `medium` | 10 | 1 |
| `incidentesAsesor` | `reference` | `low` | 1 | 7 |
| `InternetOK` | `reference` | `low` | 39 | 1 |
| `InvOficina` | `reference` | `low` | 1 | 11 |
| `MinutaCambios` | `reference` | `low` | 23 | 4 |
| `MinutaFechasEscP` | `reference` | `low` | 9 | 4 |
| `MinutasDetlOK` | `reference` | `low` | 0 | 3 |
| `MinutasGralOK` | `reference` | `low` | 0 | 4 |
| `Moneda` | `reference` | `medium` | 2 | 1 |
| `Municipios` | `reference` | `medium` | 2318 | 1 |
| `NotaríasEsc` | `reference` | `medium` | 25 | 8 |
| `OperaProp` | `reference` | `medium` | 9 | 2 |
| `Origen` | `reference` | `medium` | 15 | 1 |
| `Origen2` | `reference` | `medium` | 50 | 1 |
| `ProgActiv` | `reference` | `low` | 289 | 10 |
| `PropAdmRenta` | `reference` | `low` | 25 | 5 |
| `Puertas` | `reference` | `medium` | 4 | 1 |
| `Puntualidad` | `reference` | `low` | 0 | 10 |
| `ReferidoCIERREProy` | `reference` | `low` | 20 | 12 |
| `RegistrosExt` | `reference` | `low` | 48 | 51 |
| `Renta Condic` | `reference` | `medium` | 1395 | 29 |
| `Rótulos` | `reference` | `medium` | 81 | 11 |
| `Salas` | `reference` | `medium` | 224 | 9 |
| `SaldosTesorería` | `reference` | `low` | 3 | 2 |
| `Socios` | `reference` | `low` | 5996 | 48 |
| `Statusp` | `reference` | `medium` | 2 | 1 |
| `T-AuxiliarASESORES` | `reference` | `low` | 81 | 13 |
| `Terre1` | `reference` | `medium` | 2 | 1 |
| `Terre2` | `reference` | `medium` | 3 | 1 |
| `TipoProp` | `reference` | `medium` | 21 | 2 |
| `TipoSocio` | `reference` | `medium` | 20 | 1 |
| `UsosS` | `reference` | `medium` | 4 | 1 |
| `Ventana` | `reference` | `medium` | 3 | 1 |
| `Asociaciones` | `reference` | `low` | 5 | 1 |
| `ConcepIngresosEgresos` | `reference` | `medium` | 132 | 7 |
| `Credito1` | `reference` | `medium` | 5 | 1 |
| `Entidades` | `reference` | `medium` | 32 | 1 |
| `Giro` | `reference` | `medium` | 13 | 2 |
| `HJuridica` | `reference` | `low` | 4 | 1 |
| `ListaNegra` | `reference` | `low` | 0 | 7 |
| `Requerimientos` | `reference` | `low` | 1 | 10 |
| `TUbica` | `reference` | `medium` | 3 | 1 |

## Obsolete Or Temporary Tables

| Table | Category | Priority | Rows | Columns |
| --- | --- | --- | ---: | ---: |
| `Hoja1` | `obsolete` | `low` | 305 | 30 |
| `Tabla1` | `obsolete` | `low` | 87 | 2 |
| `Tabla2` | `obsolete` | `low` | 54 | 2 |

## Detailed Dictionary

### `acabados`

- Category: `reference`
- Priority: `medium`
- Rows:`4`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `acabados` | `VARCHAR (255)` | `yes` |  |

### `Actividades`

- Category: `reference`
- Priority: `medium`
- Rows:`6`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `actividades` | `VARCHAR (255)` | `yes` | Actividades varias |

### `ActivPortalesOK`

- Category: `reference`
- Priority: `low`
- Rows:`21`
- Columns: `7`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idactport` | `SERIAL` | `yes` | Actividad en portal |
| `cactport` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `portalport` | `VARCHAR (255)` | `yes` | Portal en el que se realizó la actividad |
| `factport` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de la actividad |
| `visitas` | `INTEGER` | `yes` | No de visitas |
| `interes` | `INTEGER` | `yes` | No de interesados |
| `pregun` | `INTEGER` | `yes` | No de preguntas y consultas |

### `AdmonRentasPagoServ`

- Category: `core`
- Priority: `medium`
- Rows:`0`
- Columns: `15`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idregps` | `SERIAL` | `yes` |  |
| `claveps` | `VARCHAR (255)` | `yes` | Clave de la propiedad administrada |
| `domps` | `VARCHAR (255)` | `yes` | Domicilio |
| `conceptops` | `VARCHAR (255)` | `yes` | Concepto del pago relizado |
| `descripps` | `VARCHAR (255)` | `yes` | Descripción complementaria |
| `personaps` | `VARCHAR (255)` | `yes` | Persona |
| `fechaps` | `DATE` | `yes` | Fecha de realización del pago |
| `mesps` | `INTEGER` | `yes` | Mes del pago |
| `añops` | `INTEGER` | `yes` | Año del pago |
| `montops` | `NUMERIC(15,2)` | `yes` | Monto pagado |
| `bancops` | `VARCHAR (255)` | `yes` | Banco |
| `cuentaps` | `VARCHAR (255)` | `yes` | Cuenta Bancaria |
| `clabeps` | `VARCHAR (255)` | `yes` | CLABE |
| `comprobps` | `VARCHAR (255)` | `yes` | Comprobante de pago |
| `comps` | `VARCHAR (255)` | `yes` | Comentarios |

### `AsesorActivOK`

- Category: `core`
- Priority: `high`
- Rows:`1953`
- Columns: `18`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idopas` | `SERIAL` | `yes` | Registro de operación asesores |
| `asesorop` | `VARCHAR (255)` | `yes` | Asesor |
| `activa` | `VARCHAR (255)` | `yes` | Actividad, junta, guardia, otro |
| `nactiva` | `VARCHAR (255)` | `yes` | Descripción de la actividad |
| `factiv` | `DATE` | `yes` | Fecha de la actividad |
| `hactiv` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de la actividad |
| `asistencia` | `VARCHAR (255)` | `yes` | Asistencia, falta |
| `heact` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora llegada |
| `hsact` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora salida |
| `entradaact` | `VARCHAR (255)` | `yes` | Puntual, Retardo |
| `salidaact` | `VARCHAR (255)` | `yes` | Puntual, Anticipada |
| `justifact` | `BOOLEAN NOT NULL` | `no` | Justificada o no |
| `just` | `VARCHAR (255)` | `yes` | Justificada, no justificada |
| `punt` | `VARCHAR (255)` | `yes` | Puntual, retardo |
| `descjact` | `VARCHAR (255)` | `yes` | Descripción de la Justificación |
| `comacta` | `VARCHAR (255)` | `yes` | Comentarios |
| `descb` | `VARCHAR (255)` | `yes` | Descripción sin fecha |
| `prog` | `VARCHAR (255)` | `yes` | Grupo de Actividad |

### `AsesoresALTAPenalizacion`

- Category: `core`
- Priority: `medium`
- Rows:`58`
- Columns: `24`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcomiasespen` | `SERIAL` | `yes` | Registro de asesores para ALTA |
| `ccomiasespen` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `clavoferpena` | `VARCHAR (255)` | `yes` | Clave de la oferta |
| `ncomiaspen` | `VARCHAR (255) NOT NULL` | `no` | Nombre del asesor |
| `niasecompen` | `VARCHAR (255) NOT NULL` | `no` | Nivel del asesor A o N |
| `cppartipen` | `DOUBLE PRECISION NOT NULL` | `no` | Porcentaje de participación |
| `lacompen` | `VARCHAR (255)` | `yes` | Lado ALTA |
| `facaapen` | `BOOLEAN NOT NULL` | `no` | Factura |
| `peraapen` | `VARCHAR (255)` | `yes` | Persona Física o Moral |
| `resiscoapen` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal |
| `facconaapen` | `VARCHAR (255)` | `yes` | Concepto por Honorarios o Comisionista |
| `fpcapen` | `VARCHAR (255)` | `yes` | Forma de Pago |
| `vpapen` | `VARCHAR (255)` | `yes` | Vía de Pago Alta |
| `fpapen` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de pago de penalización asesorAlta |
| `nappen` | `INTEGER` | `yes` | Número de posición del asesor en el proyecto |
| `anrpen` | `BOOLEAN NOT NULL` | `no` | Anular registro de las comisiones |
| `araapen` | `BOOLEAN NOT NULL` | `no` | Aplicación especial de retención de administrativa |
| `concpapen` | `VARCHAR (255)` | `yes` | Concepto de comisión |
| `aapen1` | `NUMERIC(15,2)` | `yes` |  |
| `aapen2` | `NUMERIC(15,2)` | `yes` |  |
| `aapen3` | `NUMERIC(15,2)` | `yes` |  |
| `aapen4` | `NUMERIC(15,2)` | `yes` |  |
| `aapen5` | `NUMERIC(15,2)` | `yes` |  |
| `aapen6` | `NUMERIC(15,2)` | `yes` |  |

### `AsesoresCANCEL`

- Category: `core`
- Priority: `high`
- Rows:`721`
- Columns: `15`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcomiases3` | `SERIAL` | `yes` | Registro de asesores para CANCELACIÓN |
| `ccomiases3` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `ncomias3` | `VARCHAR (255) NOT NULL` | `no` | Nombre del asesor de Cancelación |
| `niasecom3` | `VARCHAR (255)` | `yes` | Nivel del asesor A o N |
| `cpcmc3` | `INTEGER` | `yes` | Porcentaje o Monto Cancelación |
| `cpparti3` | `DOUBLE PRECISION` | `yes` | Porcentaje de participación Cancelación |
| `cmparti3` | `NUMERIC(15,2)` | `yes` | Monto que se le asigna al asesor Cancelación |
| `lacom3` | `VARCHAR (255)` | `yes` | Lado CANCELACIÓN |
| `perac3` | `VARCHAR (255)` | `yes` | Persona Física o Moral Cancelación |
| `facac3` | `BOOLEAN NOT NULL` | `no` | Factura Cancelación |
| `facconac3` | `VARCHAR (255)` | `yes` | Concepto por Honorarios o Comisionista Cancelación |
| `fpcc3` | `VARCHAR (255)` | `yes` | Forma de Pago Cancelación |
| `vpc3` | `VARCHAR (255)` | `yes` | Vía de Pago Cancelación |
| `fpc3` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de pago de comisión Cancelación |
| `napc3` | `INTEGER` | `yes` | Número de posición del asesor de cierre en el proyecto Cancelación |

### `AsesoresCapacOK`

- Category: `core`
- Priority: `medium`
- Rows:`69`
- Columns: `17`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idca` | `SERIAL` | `yes` | Registro de capacitación |
| `nomcap` | `VARCHAR (255)` | `yes` | Nombre del Asesor |
| `curso` | `VARCHAR (255)` | `yes` | Curso, Certificación, Seminario, Diplomado, etc |
| `fcap` | `DATE` | `yes` | Fecha de la capacitación |
| `hcap` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de la capacitación |
| `asiscap` | `VARCHAR (255)` | `yes` | Asistencia, Falta |
| `hecap` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora entrada |
| `hscap` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora Salida |
| `ecap` | `VARCHAR (255)` | `yes` | Puntual, Retardo |
| `scap` | `VARCHAR (255)` | `yes` | Puntual, Anticipada |
| `justcap` | `BOOLEAN NOT NULL` | `no` | Justificada Sí/No |
| `desccap` | `VARCHAR (255)` | `yes` | Descripción de la justificación |
| `reca` | `VARCHAR (255)` | `yes` | Título de reconocimiento |
| `fra` | `DATE` | `yes` | Fecha de reconocimiento |
| `era` | `VARCHAR (255)` | `yes` | Institución, Organismo, empresa que otorga |
| `tra` | `VARCHAR (255)` | `yes` | Tipo de reconocimiento |
| `comcap` | `VARCHAR (255)` | `yes` | Comentarios sobre capacitación |

### `AsesoresCatCursos`

- Category: `core`
- Priority: `medium`
- Rows:`22`
- Columns: `5`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcurso` | `SERIAL` | `yes` |  |
| `catcurso` | `VARCHAR (255)` | `yes` |  |
| `curso` | `VARCHAR (255)` | `yes` |  |
| `desccurso` | `VARCHAR (255)` | `yes` |  |
| `ordencurso` | `INTEGER` | `yes` |  |

### `AsesoresCIERRE`

- Category: `core`
- Priority: `high`
- Rows:`1307`
- Columns: `20`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcomiases2` | `SERIAL` | `yes` | Registro de asesores para CIERRE |
| `ccomiases2` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `ncomias2` | `VARCHAR (255) NOT NULL` | `no` | Nombre del asesor de Cierre |
| `niasecom2` | `VARCHAR (255) NOT NULL` | `no` | Nivel del asesor A o N |
| `ad2` | `VARCHAR (255)` | `yes` | Alto desempeño |
| `cpcmc` | `INTEGER NOT NULL` | `no` | Porcentaje o Monto |
| `cpparti2` | `DOUBLE PRECISION NOT NULL` | `no` | Porcentaje de participación |
| `cmparti2` | `NUMERIC(15,2)` | `yes` | Monto que se le asigna al asesor |
| `lacom2` | `VARCHAR (255)` | `yes` | Lado CIERRE |
| `perac` | `VARCHAR (255)` | `yes` | Persona Física o Moral Cierre |
| `resiscoc` | `BOOLEAN NOT NULL` | `no` | Régimen Simplificado de Confianza |
| `facac` | `BOOLEAN NOT NULL` | `no` | Factura Cierre |
| `facconac` | `VARCHAR (255)` | `yes` | Concepto por Honorarios o Comisionista |
| `fpcc` | `VARCHAR (255)` | `yes` | Forma de Pago Cierre |
| `vpc` | `VARCHAR (255)` | `yes` | Vía de Pago Cierre |
| `fpc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de pago de comisión Cierre |
| `napc` | `INTEGER` | `yes` | Número de posición del asesor de cierre en el proyecto |
| `anrc` | `BOOLEAN NOT NULL` | `no` | Anular registro de las comisiones |
| `arac` | `BOOLEAN NOT NULL` | `no` | Aplicación especial de retención administrativa |
| `cc2` | `VARCHAR (254)` | `yes` | Clave pivote |

### `AsesoresCIERREProy`

- Category: `core`
- Priority: `medium`
- Rows:`815`
- Columns: `23`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcomiases2` | `SERIAL` | `yes` | Registro de asesores para CIERRE |
| `ccomiases2` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `claveofertaaseproy` | `VARCHAR (255)` | `yes` | Clave ID de la oferta |
| `ncomias2` | `VARCHAR (255)` | `yes` | Nombre del asesor de Cierre |
| `niasecom2` | `VARCHAR (255)` | `yes` | Nivel del asesor A o N |
| `asesorextof` | `VARCHAR (255)` | `yes` | Asesor externo |
| `asesordefof` | `VARCHAR (254)` | `yes` | Asesor definitivo |
| `nivelao` | `VARCHAR (254)` | `yes` | Nivel de asesor definitivo |
| `asesordefof2` | `VARCHAR (254)` | `yes` |  |
| `nivelao2` | `VARCHAR (254)` | `yes` |  |
| `cpcmc` | `INTEGER NOT NULL` | `no` | Porcentaje o Monto |
| `cpparti2` | `DOUBLE PRECISION NOT NULL` | `no` | Porcentaje de participación |
| `cmparti2` | `NUMERIC(15,2)` | `yes` | Monto que se le asigna al asesor |
| `lacom2` | `VARCHAR (255)` | `yes` | Lado CIERRE |
| `perac` | `VARCHAR (255)` | `yes` | Persona Física o Moral Cierre |
| `facac` | `BOOLEAN NOT NULL` | `no` | Factura Cierre |
| `facconac` | `VARCHAR (255)` | `yes` | Concepto por Honorarios o Comisionista |
| `fpcc` | `VARCHAR (255)` | `yes` | Forma de Pago Cierre |
| `vpc` | `VARCHAR (255)` | `yes` | Vía de Pago Cierre |
| `fpc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de pago de comisión Cierre |
| `napc` | `INTEGER` | `yes` | Número de posición del asesor de cierre en el proyecto |
| `anrc` | `BOOLEAN NOT NULL` | `no` | Anular registro de las comisiones |
| `arac` | `BOOLEAN NOT NULL` | `no` | Aplicación especial de retención administrativa |

### `AsesoresCIERRERC`

- Category: `core`
- Priority: `medium`
- Rows:`69`
- Columns: `20`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcomiases2rc` | `SERIAL` | `yes` | Registro de asesores para CIERRE |
| `ccomiases3rc` | `VARCHAR (255)` | `yes` | Clave de la propiedad con Renovación de contrato |
| `ccomiases2rc` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `ncomias2rc` | `VARCHAR (255) NOT NULL` | `no` | Nombre del asesor de Cierre |
| `niasecom2rc` | `VARCHAR (255) NOT NULL` | `no` | Nivel del asesor A o N |
| `cpcmcrc` | `INTEGER` | `yes` | Porcentaje o Monto |
| `cpparti2rc` | `DOUBLE PRECISION NOT NULL` | `no` | Porcentaje de participación |
| `cpparti3rc` | `DOUBLE PRECISION` | `yes` | Participación |
| `cmparti2rc` | `NUMERIC(15,2)` | `yes` | Monto que se le asigna al asesor |
| `lacom2rc` | `VARCHAR (255)` | `yes` | Lado CIERRE |
| `peracrc` | `VARCHAR (255)` | `yes` | Persona Física o Moral Cierre |
| `resiscorc` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal |
| `facacrc` | `BOOLEAN NOT NULL` | `no` | Factura Cierre |
| `facconacrc` | `VARCHAR (255)` | `yes` | Concepto por Honorarios o Comisionista |
| `fpccrc` | `VARCHAR (255)` | `yes` | Forma de Pago Cierre |
| `vpcrc` | `VARCHAR (255)` | `yes` | Vía de Pago Cierre |
| `fpcrc` | `DATE` | `yes` | Fecha de pago de comisión Cierre |
| `napcrc` | `INTEGER` | `yes` | Número de posición del asesor de cierre en el proyecto |
| `anrcrc` | `BOOLEAN NOT NULL` | `no` | Anular registro de las comisiones |
| `aracrc` | `BOOLEAN NOT NULL` | `no` | Aplicación especial de retención administrativa |

### `AsesoresCursos`

- Category: `core`
- Priority: `medium`
- Rows:`1260`
- Columns: `15`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idasecursos` | `SERIAL` | `yes` | Registro de Cursos seleccionados por los Asesores |
| `asesorc` | `VARCHAR (255)` | `yes` | Asesor que toma el Curso |
| `fing` | `DATE` | `yes` | Fecha de ingreso a REMAX ACTIVA |
| `fcnivel` | `DATE` | `yes` | Fecha de cambio de nivel |
| `nivel` | `VARCHAR (255)` | `yes` | Nivel actual del Asesor |
| `catcursoase` | `VARCHAR (255)` | `yes` | Catálogo al que pertenece el curso |
| `catcursoase2` | `VARCHAR (255)` | `yes` | 2a Categoría |
| `ordenc` | `INTEGER` | `yes` | Orden de los Cursos |
| `cursoase` | `VARCHAR (255)` | `yes` | Nombre del Curso |
| `desccurso` | `VARCHAR (255)` | `yes` | Descripción del Curso |
| `seleccurso` | `BOOLEAN NOT NULL` | `no` | Selección del Curso |
| `statuscurso` | `VARCHAR (255)` | `yes` | Estatus del curso: "En Curso", "Cancelado", "Concluído","Seleccionado" |
| `fechacurso` | `DATE` | `yes` | Fecha de registro del curso |
| `añocurso` | `INTEGER` | `yes` | Año en el que se seleccionó el curso |
| `comcurso` | `VARCHAR (255)` | `yes` | Comentarios |

### `AsesoresCursosOtros`

- Category: `core`
- Priority: `medium`
- Rows:`21`
- Columns: `11`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idasecursos` | `SERIAL` | `yes` | Registro de Cursos seleccionados por los Asesores |
| `asesorco` | `VARCHAR (255)` | `yes` | Asesor que toma el Curso |
| `catcursoaseo` | `VARCHAR (255)` | `yes` | Catálogo al que pertenece el curso |
| `ordenenco` | `INTEGER` | `yes` | Orden del Curso |
| `cursoaseo` | `VARCHAR (255)` | `yes` | Nombre del Curso |
| `desccursoo` | `VARCHAR (255)` | `yes` | Descripción del Curso |
| `selecto` | `BOOLEAN NOT NULL` | `no` | Selección de Otros Cursos |
| `statuscursoo` | `VARCHAR (255)` | `yes` | Estatus del curso: "En Curso", "Cancelado", "Concluído","Seleccionado" |
| `fechaco` | `DATE` | `yes` | Fecha de selección del Curso |
| `añocursoo` | `INTEGER` | `yes` | Año en el que se seleccionó el curso |
| `comcursoo` | `VARCHAR (255)` | `yes` | Comentarios |

### `AsesoresInternos`

- Category: `core`
- Priority: `high`
- Rows:`257`
- Columns: `97`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idai` | `SERIAL` | `yes` | Registro asesor iterno |
| `noma` | `VARCHAR (255)` | `yes` | Nombre (s) del cliente |
| `ape1a` | `VARCHAR (255)` | `yes` | Apellido Paterno |
| `ape2a` | `VARCHAR (255)` | `yes` | Apellido Materno |
| `alias` | `VARCHAR (255)` | `yes` | Alias |
| `ncai` | `VARCHAR (254)` | `yes` | Nombre completo |
| `fingre` | `DATE` | `yes` | Fecha de Ingreso SIR |
| `ta` | `VARCHAR (255)` | `yes` | Tipo de asesor N o A |
| `fechta` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de cambio de nivel de Asesor |
| `guard` | `BOOLEAN NOT NULL` | `no` | Esta incluído en el programa de guardias |
| `vigen2` | `VARCHAR (255)` | `yes` | Estado vigente para informe |
| `fna` | `DATE` | `yes` | Fecha de nacimiento |
| `cna` | `VARCHAR (255)` | `yes` | Ciudad de nacimiento |
| `pna` | `VARCHAR (255)` | `yes` | País de nacimiento |
| `movila` | `DOUBLE PRECISION` | `yes` | Número de móvil del asesor |
| `tca` | `DOUBLE PRECISION` | `yes` | Teléfono de casa |
| `toa` | `DOUBLE PRECISION` | `yes` | Teléfono de oficina |
| `craa` | `VARCHAR (255)` | `yes` | Correo Remax activa |
| `cria` | `VARCHAR (255)` | `yes` | Correo Remax internacional |
| `cpea` | `VARCHAR (255)` | `yes` | Correo personal |
| `niea` | `VARCHAR (255)` | `yes` | Nivel de estudios |
| `calla` | `VARCHAR (255)` | `yes` | Calle |
| `edifa` | `VARCHAR (255)` | `yes` | Edificio |
| `cotoa` | `VARCHAR (255)` | `yes` | Coto |
| `nea` | `VARCHAR (255)` | `yes` | Número exterior |
| `nia` | `VARCHAR (255)` | `yes` | Número interior |
| `pa` | `VARCHAR (255)` | `yes` | País |
| `pia` | `VARCHAR (255)` | `yes` | Piso |
| `cola` | `VARCHAR (255)` | `yes` | Colonia |
| `fra` | `VARCHAR (255)` | `yes` | Fraccionamiento |
| `muna` | `VARCHAR (255)` | `yes` | Municipio |
| `cpa` | `VARCHAR (255)` | `yes` | Código Postal |
| `enta` | `VARCHAR (255)` | `yes` | Entidad Federativa |
| `fia` | `DATE` | `yes` | Fecha de ingreso a Remax Activa |
| `fsa` | `DATE` | `yes` | Fecha de separación de Remax Activa |
| `fsaa` | `INTEGER` | `yes` | Año de fecha de separación |
| `msa` | `VARCHAR (255)` | `yes` | Motivo de separación |
| `frra` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de reingreso a Remax Activa |
| `ena` | `VARCHAR (255)` | `yes` | Nombre de contacto de emergencia |
| `eta` | `DOUBLE PRECISION` | `yes` | Teléfono de contacto de emergencia |
| `epa` | `VARCHAR (255)` | `yes` | Parentesco |
| `nimssa` | `VARCHAR (255)` | `yes` | Número de IMSS |
| `statusa` | `VARCHAR (255)` | `yes` | Status del asesor ACTIVO / INACTIVO |
| `fahoraa` | `DATE` | `yes` | Fecha actual |
| `sga` | `VARCHAR (255)` | `yes` | Seguro de gastos médicos |
| `tsa` | `VARCHAR (255)` | `yes` | Tipo de Sangre |
| `ea` | `VARCHAR (255)` | `yes` | Enfermedades, padecimientos |
| `aa` | `VARCHAR (255)` | `yes` | Alergías |
| `ia` | `VARCHAR (255)` | `yes` | Idioma 1 |
| `i2a` | `VARCHAR (255)` | `yes` | Idioma 2 |
| `rsa` | `VARCHAR (255)` | `yes` | Nombre o Razón social |
| `rfca` | `VARCHAR (255)` | `yes` | Registro Federal de Contribuyentes (RFC) |
| `cfa` | `VARCHAR (255)` | `yes` | Calle |
| `nefa` | `VARCHAR (255)` | `yes` | Número exterior |
| `cofa` | `VARCHAR (255)` | `yes` | Colonia |
| `cpfa` | `INTEGER` | `yes` | Código Postal |
| `cefa` | `VARCHAR (255)` | `yes` | Correo electrónico |
| `idea` | `VARCHAR (255)` | `yes` | Id de Remax México |
| `sira` | `VARCHAR (255)` | `yes` | Usuario SIR |
| `cssira` | `VARCHAR (255)` | `yes` | Contraseña SIR |
| `uisir` | `DATE` | `yes` | Fecha último ingreso SIR |
| `uieb` | `DATE` | `yes` | Fecha último ingreso Easy Broker |
| `fapa` | `DATE` | `yes` | Fecha alta prueba Remax México |
| `fbpa` | `DATE` | `yes` | Fecha baja prueba Remax México |
| `era` | `VARCHAR (255)` | `yes` | Estatus Remax México |
| `uua` | `VARCHAR (255)` | `yes` | Usuario Universidad |
| `cua` | `VARCHAR (255)` | `yes` | Contraseña universidad |
| `fapua` | `VARCHAR (255)` | `yes` | Fecha alta prueba Universidad |
| `fbpua` | `VARCHAR (255)` | `yes` | Fecha baja prueba Universidad |
| `eua` | `VARCHAR (255)` | `yes` | Estatus Remax Universidad |
| `ua` | `VARCHAR (255)` | `yes` | Usuario asesor Remax Internacional |
| `ca` | `VARCHAR (255)` | `yes` | Contraseña Remax Internacional |
| `faa` | `VARCHAR (255)` | `yes` | Fecha alta Remax Internacional |
| `fba` | `VARCHAR (255)` | `yes` | Fecha baja Remax Internacional |
| `idia` | `VARCHAR (255)` | `yes` | ID Internacional |
| `eria` | `VARCHAR (255)` | `yes` | Estatus Remax Internacional |
| `ampua` | `VARCHAR (255)` | `yes` | Ususario AMPI |
| `asmpca` | `VARCHAR (255)` | `yes` | Contraseña AMPI |
| `ampfaa` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha alta AMPI |
| `ampfba` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha baja AMPI |
| `eampa` | `VARCHAR (255)` | `yes` | Estatus AMPI Activo, Inactivo |
| `aperfa` | `VARCHAR (255)` | `yes` | Perfil Asesor, Afiliado, Asociado |
| `idampa` | `VARCHAR (255)` | `yes` | ID AMPI |
| `oaa` | `VARCHAR (255)` | `yes` | Otras asociaciones CANACO, PAIS, MIO |
| `bancoase` | `VARCHAR (255)` | `yes` | Banco para depósito |
| `cuentaase` | `VARCHAR (255)` | `yes` | Número de cuenta bancaria |
| `clabease` | `INTEGER` | `yes` | CLABE Interbancaria |
| `sucase` | `INTEGER` | `yes` | Número de sucursal del banco |
| `doca` | `Unknown_0012` | `yes` |  |
| `coia` | `Unknown_0012` | `yes` |  |
| `foa` | `Unknown_0012` | `yes` |  |
| `asa` | `VARCHAR (255)` | `yes` | Asesor o Staff |
| `fechapingreso` | `DATE` | `yes` | Fecha de primer ingreso |
| `rfasesor` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal RESICO |
| `nad` | `BOOLEAN NOT NULL` | `no` | Nivel de asesor Alto Desempeño AD |
| `comenase` | `VARCHAR (255)` | `yes` | Comentarios sobre el asesor |
| `vigas` | `VARCHAR (254)` | `yes` | Estado vigente o histórico |

### `AsesoresMovOK`

- Category: `core`
- Priority: `medium`
- Rows:`0`
- Columns: `7`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idam` | `SERIAL` | `yes` | Registro de movimientos |
| `amova` | `VARCHAR (255)` | `yes` | Nombre del asesor |
| `mova` | `VARCHAR (255)` | `yes` | Permiso, Vacaciones, Incapacidad, Otro |
| `fmova` | `DATE` | `yes` | Fecha del movimiento |
| `dmova` | `INTEGER` | `yes` | Días utilizados |
| `fmova2` | `DATE` | `yes` |  |
| `cmov` | `VARCHAR (255)` | `yes` | Comentario |

### `AsesoresPremios`

- Category: `core`
- Priority: `medium`
- Rows:`5`
- Columns: `11`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idaseprem` | `SERIAL` | `yes` | Registro de Premios de los Asesores |
| `asesorprem` | `VARCHAR (255)` | `yes` | Asesor que trecibe el Premio |
| `catpremase` | `VARCHAR (255)` | `yes` | Catálogo al que pertenece el Premio |
| `catpremase2` | `VARCHAR (255)` | `yes` | 2a Categoría |
| `ordenenprem` | `INTEGER` | `yes` | Orden del Premio |
| `premase` | `VARCHAR (255)` | `yes` | Nombre del Premio |
| `descprem` | `VARCHAR (255)` | `yes` | Descripción del Premio |
| `statusprem` | `VARCHAR (255)` | `yes` | Estatus del Premio: "En Curso", "Cancelado", "Concluído","Seleccionado" |
| `fechaprem` | `DATE` | `yes` | Fecha de selección del Premio |
| `añoprem` | `INTEGER` | `yes` | Año en el que se seleccionó el Premio |
| `comcprem` | `VARCHAR (255)` | `yes` | ComentariosPrem |

### `AsesoresPremiosOK`

- Category: `core`
- Priority: `medium`
- Rows:`20`
- Columns: `8`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idprem` | `SERIAL` | `yes` | Registro de premios |
| `aliasp` | `VARCHAR (255)` | `yes` | Alias del asesor |
| `prema` | `VARCHAR (255)` | `yes` | Premio recibido |
| `fecp` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del premio |
| `añopr` | `INTEGER` | `yes` | Año del premio |
| `lprem` | `VARCHAR (255)` | `yes` | Lugar en donde se recibió el premio |
| `otprem` | `VARCHAR (255)` | `yes` | Quién otorgó el premio Remax Activa o Remax México |
| `comprem` | `VARCHAR (255)` | `yes` | Comentarios sobre el premio |

### `AsesorJuntas`

- Category: `core`
- Priority: `medium`
- Rows:`4606`
- Columns: `14`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idjuntas` | `SERIAL` | `yes` | Registro de juntas asesores |
| `asesorjunt` | `VARCHAR (255)` | `yes` | Asesor |
| `tjunta` | `VARCHAR (255)` | `yes` | Tema de la junta |
| `tjuntasf` | `VARCHAR (255)` | `yes` | Para filtro de junta de ventas |
| `fjunta` | `DATE` | `yes` | Fecha de la Junta |
| `hjunta` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de la Junta |
| `asisjunta` | `VARCHAR (255)` | `yes` | Asistencia, falta |
| `hejunt` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora llegada |
| `hsjunt` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora salida |
| `ejunta` | `VARCHAR (255)` | `yes` | Puntual, Retardo |
| `sjunta` | `VARCHAR (255)` | `yes` | Puntual, Anticipada |
| `justijunta` | `BOOLEAN NOT NULL` | `no` | Justificada o no |
| `descjunta` | `VARCHAR (255)` | `yes` | Descripción de la Justificación |
| `comjunta` | `VARCHAR (255)` | `yes` | Comentarios |

### `AsesorRecor`

- Category: `core`
- Priority: `medium`
- Rows:`411`
- Columns: `18`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idrecas` | `SERIAL` | `yes` | Registro del recorrido asesores |
| `asesorec` | `VARCHAR (255)` | `yes` | Asesor |
| `nrecorra` | `VARCHAR (255)` | `yes` | Nombre o número del recorrido |
| `frec` | `DATE` | `yes` | Fecha del recorrido |
| `hrec` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora del recorrido |
| `asrecor` | `VARCHAR (255)` | `yes` | Asistencia, falta |
| `herec` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora entrada |
| `hsrec` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora salida |
| `erec` | `VARCHAR (255)` | `yes` | Puntual, retardo |
| `srec` | `VARCHAR (255)` | `yes` | Puntual, Anticipada |
| `justrec` | `BOOLEAN NOT NULL` | `no` | Justificada |
| `descjrec` | `VARCHAR (255)` | `yes` | Descripción de la justificación |
| `puntrecor` | `VARCHAR (255)` | `yes` | Puntual, retardo |
| `justrecor` | `VARCHAR (255)` | `yes` | Justificada, no justificada |
| `mparecr` | `NUMERIC(15,2)` | `yes` | Monto del pago del recorrido |
| `pagorec` | `BOOLEAN NOT NULL` | `no` | Realizó el pago del recorrido |
| `estrec` | `VARCHAR (254)` | `yes` | Estatus del recorrido |
| `comreco` | `VARCHAR (255)` | `yes` | Comentarios del recorrido |

### `Bajas`

- Category: `reference`
- Priority: `low`
- Rows:`2634`
- Columns: `31`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idbaja` | `SERIAL` | `yes` | Registro de baja |
| `clvbaja` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `operbaja` | `VARCHAR (255)` | `yes` | Operación Venta o Renta |
| `tifbaja` | `VARCHAR (255)` | `yes` | Cierre o Cancelación |
| `motcanbaja` | `VARCHAR (255)` | `yes` | Motivo de cancelación |
| `cancacbaja` | `BOOLEAN NOT NULL` | `no` | Cancelación aplica comisión? |
| `opcan` | `INTEGER` | `yes` | Opción de cobro de penalización por cancelación |
| `pccan` | `DOUBLE PRECISION` | `yes` | Porcentaje de penalización por cancelación |
| `mccan` | `NUMERIC(15,2)` | `yes` | Monto de penalización por cancelación |
| `fcancel` | `DATE` | `yes` | Fecha de CANCELACIÓN |
| `fbr` | `DATE` | `yes` | Fecha de aviso de BAJA a recepción |
| `contpcv` | `BOOLEAN NOT NULL` | `no` | Contrato de compraventa |
| `ffirma` | `DATE` | `yes` | Fecha de firma promesa de compra venta |
| `addemdum` | `BOOLEAN NOT NULL` | `no` | Addemdum convenio modificatorio |
| `addemdum2` | `VARCHAR (255)` | `yes` | Cambios relevantes en el addemdum |
| `fadd` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del Addemdum |
| `escritf` | `BOOLEAN NOT NULL` | `no` | Escrituración |
| `fesc` | `DATE` | `yes` | Fecha de firma de Escrituras |
| `fcarr` | `DATE` | `yes` | Fecha de firma contrato de arrendamiento |
| `fcierre` | `DATE` | `yes` | Fecha de CIERRE |
| `mfcierre` | `INTEGER` | `yes` | Número de mes de la fecha de cierre o cancelación |
| `mnfcierre` | `VARCHAR (254)` | `yes` | Nombre de mes de la fecha de cierre o cancelación |
| `afcierre` | `INTEGER` | `yes` | Año de la fecha de Cierre o cancelación |
| `fescase` | `DATE` | `yes` | Fecha de escrituración proporcionado por el ASESOR |
| `epes` | `BOOLEAN NOT NULL` | `no` | Indica si esta en proceso de escrituración |
| `efecondi` | `VARCHAR (255)` | `yes` | Entrega a firma de escrituras |
| `medcom` | `VARCHAR (255)` | `yes` | Medio de compra Contado o crédito |
| `medcom2` | `VARCHAR (255)` | `yes` | Infonavit, Banco, Institución, Sofon, Hir Casa |
| `medcom3` | `VARCHAR (255)` | `yes` | Bancos, Instituciones y Fondos |
| `combaja` | `VARCHAR (255)` | `yes` | Comentarios  de Baja de la propiedad |
| `idregbaja` | `VARCHAR (255)` | `yes` | Persona que registra la baja o cancelación |

### `CalidProp`

- Category: `reference`
- Priority: `medium`
- Rows:`4`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `nivcalid` | `VARCHAR (255)` | `yes` | Lujo, Residencial, Medio, Económico |

### `Califprop`

- Category: `reference`
- Priority: `medium`
- Rows:`4`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `califi` | `VARCHAR (255)` | `yes` | Calificación Proyecto, estado de conservación, etc Muy bueno, Bueno, Regular, Malo |

### `Calipe`

- Category: `reference`
- Priority: `medium`
- Rows:`3`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `calipe` | `VARCHAR (255)` | `yes` | Asesor, Afiliado, Socio |

### `Carpint`

- Category: `reference`
- Priority: `medium`
- Rows:`4`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `carpint` | `VARCHAR (255)` | `yes` |  |

### `CatProp1`

- Category: `reference`
- Priority: `medium`
- Rows:`3`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `catprop1` | `VARCHAR (255)` | `yes` | Categoría |

### `CatProp2`

- Category: `reference`
- Priority: `medium`
- Rows:`4`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `catprop2` | `VARCHAR (255)` | `yes` | Categoría |

### `ClasificCons`

- Category: `reference`
- Priority: `medium`
- Rows:`3`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `clasifind` | `VARCHAR (255)` | `yes` | Clasificación Industrial, popular, suburbana |

### `ClienteComentarios`

- Category: `core`
- Priority: `medium`
- Rows:`119`
- Columns: `4`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcomcliente` | `SERIAL` | `yes` | Registro |
| `ccomc` | `VARCHAR (255)` | `yes` | Clave de la Propiedad |
| `domclient` | `VARCHAR (255)` | `yes` | Domicilio |
| `comcliente` | `VARCHAR (255)` | `yes` | Comentario para el informe de cliente |

### `Comisiones 2011 2016`

- Category: `core`
- Priority: `medium`
- Rows:`814`
- Columns: `20`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idhist` | `SERIAL` | `yes` |  |
| `clave` | `VARCHAR (255)` | `yes` |  |
| `asesor alta` | `VARCHAR (255)` | `yes` |  |
| `dirección` | `VARCHAR (255)` | `yes` |  |
| `valor de la operación` | `NUMERIC(15,2)` | `yes` |  |
| `% comisión cobrada real` | `DOUBLE PRECISION` | `yes` |  |
| `comisión cobrada` | `NUMERIC(15,2)` | `yes` |  |
| `$ 5%` | `NUMERIC(15,2)` | `yes` |  |
| `importe comisionable` | `NUMERIC(15,2)` | `yes` |  |
| `comision asesor` | `NUMERIC(15,2)` | `yes` |  |
| `menos retención` | `NUMERIC(15,2)` | `yes` |  |
| `total comision` | `NUMERIC(15,2)` | `yes` |  |
| `tipo` | `VARCHAR (255)` | `yes` |  |
| `mes` | `DOUBLE PRECISION` | `yes` |  |
| `% ref` | `VARCHAR (255)` | `yes` |  |
| `ref` | `NUMERIC(15,2)` | `yes` |  |
| `año` | `DOUBLE PRECISION` | `yes` |  |
| `comentario` | `VARCHAR (255)` | `yes` |  |
| `campo1` | `VARCHAR (255)` | `yes` |  |
| `% comisión cobrada cal` | `DOUBLE PRECISION` | `yes` |  |

### `Comisiones AUX`

- Category: `core`
- Priority: `medium`
- Rows:`197`
- Columns: `42`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idr` | `SERIAL` | `yes` |  |
| `clave aux` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consec` | `VARCHAR (255)` | `yes` | Número consecutivo |
| `revisado aux` | `VARCHAR (255)` | `yes` | Capturado |
| `topc` | `VARCHAR (255)` | `yes` | Tipo de operación de cierre si es una cooperación ya sea de REMAX Activa o de un Coop externo |
| `lado aux` | `VARCHAR (255)` | `yes` | Exclusiva o cierre |
| `ca` | `VARCHAR (255)` | `yes` | Alta o Cierre |
| `lado aux2` | `INTEGER` | `yes` | Valor aux 2 cálculo para evitar número de lados dobles |
| `asesor aux` | `VARCHAR (255)` | `yes` | Asesor |
| `col aux` | `VARCHAR (255)` | `yes` | Colonia |
| `fecha aux` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de cierre |
| `oper aux` | `VARCHAR (255)` | `yes` | Operación |
| `valor aux` | `NUMERIC(15,2)` | `yes` | Valor de la operación |
| `valor aux2` | `NUMERIC(15,2)` | `yes` | Valor aux 2 cálculo para evitar montos dobles |
| `comcob` | `NUMERIC(15,2)` | `yes` | Comisión cobrada 50% |
| `comcob2` | `NUMERIC(15,2)` | `yes` | Comisión cobrada 2 cálculo para evitar montos dobles |
| `comcob1` | `DOUBLE PRECISION` | `yes` | Porcentaje de comisión cobrada |
| `comgen` | `NUMERIC(15,2)` | `yes` | Comisión generada |
| `comgen1` | `DOUBLE PRECISION` | `yes` | Porcentaje de comisión generada |
| `referido` | `VARCHAR (255)` | `yes` | Referido Sí/No |
| `referido1` | `DOUBLE PRECISION` | `yes` | Porcentaje de referido |
| `referido2` | `DOUBLE PRECISION` | `yes` | Comisión de referido |
| `balance` | `DOUBLE PRECISION` | `yes` | Balance |
| `franq1` | `DOUBLE PRECISION` | `yes` | Porcentaje de Franquicia |
| `franq2` | `NUMERIC(15,2)` | `yes` | Comisión de franquicia |
| `importe comisi` | `NUMERIC(15,2)` | `yes` | Importe comisionable |
| `escalatoria` | `VARCHAR (255)` | `yes` | Sí / No |
| `escalatoria1` | `NUMERIC(15,2)` | `yes` | 50%-60% |
| `escalatoria2` | `NUMERIC(15,2)` | `yes` | 40%-60% |
| `escalatoria3` | `NUMERIC(15,2)` | `yes` | 30%-70% |
| `escalatoria4` | `NUMERIC(15,2)` | `yes` | 20%-80% |
| `sumesc` | `NUMERIC(15,2)` | `yes` | Suma de la escalatoria |
| `comasesor` | `NUMERIC(15,2)` | `yes` | Comision Asesor Antes de Impuestos |
| `retadm` | `NUMERIC(15,2)` | `yes` | 10% |
| `retisr` | `NUMERIC(15,2)` | `yes` | 10% |
| `retiva` | `NUMERIC(15,2)` | `yes` | 10.6667% |
| `iva` | `NUMERIC(15,2)` | `yes` | 16% |
| `totalcomasesor` | `NUMERIC(15,2)` | `yes` |  |
| `totalcomp` | `NUMERIC(15,2)` | `yes` |  |
| `totalfactura` | `NUMERIC(15,2)` | `yes` | Total Factura |
| `comentarios` | `TEXT` | `yes` |  |
| `clasifcomision` | `VARCHAR (255)` | `yes` |  |

### `Comisiones AUX2`

- Category: `core`
- Priority: `medium`
- Rows:`4`
- Columns: `42`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idr` | `SERIAL` | `yes` |  |
| `clave aux` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consec` | `VARCHAR (255)` | `yes` | Número consecutivo |
| `revisado aux` | `VARCHAR (255)` | `yes` | Capturado |
| `topc` | `VARCHAR (255)` | `yes` | Tipo de operación de cierre si es una cooperación ya sea de REMAX Activa o de un Coop externo |
| `lado aux` | `VARCHAR (255)` | `yes` | Exclusiva o cierre |
| `ca` | `VARCHAR (255)` | `yes` | Alta o Cierre |
| `lado aux2` | `INTEGER` | `yes` | Valor aux 2 cálculo para evitar número de lados dobles |
| `asesor aux` | `VARCHAR (255)` | `yes` | Asesor |
| `col aux` | `VARCHAR (255)` | `yes` | Colonia |
| `fecha aux` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de cierre |
| `oper aux` | `VARCHAR (255)` | `yes` | Operación |
| `valor aux` | `NUMERIC(15,2)` | `yes` | Valor de la operación |
| `valor aux2` | `NUMERIC(15,2)` | `yes` | Valor aux 2 cálculo para evitar montos dobles |
| `comcob` | `NUMERIC(15,2)` | `yes` | Comisión cobrada 50% |
| `comcob2` | `NUMERIC(15,2)` | `yes` | Comisión cobrada 2 cálculo para evitar montos dobles |
| `comcob1` | `DOUBLE PRECISION` | `yes` | Porcentaje de comisión cobrada |
| `comgen` | `NUMERIC(15,2)` | `yes` | Comisión generada |
| `comgen1` | `DOUBLE PRECISION` | `yes` | Porcentaje de comisión generada |
| `referido` | `VARCHAR (255)` | `yes` | Referido Sí/No |
| `referido1` | `DOUBLE PRECISION` | `yes` | Porcentaje de referido |
| `referido2` | `DOUBLE PRECISION` | `yes` | Comisión de referido |
| `balance` | `DOUBLE PRECISION` | `yes` | Balance |
| `franq1` | `DOUBLE PRECISION` | `yes` | Porcentaje de Franquicia |
| `franq2` | `NUMERIC(15,2)` | `yes` | Comisión de franquicia |
| `importe comisi` | `NUMERIC(15,2)` | `yes` | Importe comisionable |
| `escalatoria` | `VARCHAR (255)` | `yes` | Sí / No |
| `escalatoria1` | `NUMERIC(15,2)` | `yes` | 50%-60% |
| `escalatoria2` | `NUMERIC(15,2)` | `yes` | 40%-60% |
| `escalatoria3` | `NUMERIC(15,2)` | `yes` | 30%-70% |
| `escalatoria4` | `NUMERIC(15,2)` | `yes` | 20%-80% |
| `sumesc` | `NUMERIC(15,2)` | `yes` | Suma de la escalatoria |
| `comasesor` | `NUMERIC(15,2)` | `yes` | Comision Asesor Antes de Impuestos |
| `retadm` | `NUMERIC(15,2)` | `yes` | 10% |
| `retisr` | `NUMERIC(15,2)` | `yes` | 10% |
| `retiva` | `NUMERIC(15,2)` | `yes` | 10.6667% |
| `iva` | `NUMERIC(15,2)` | `yes` | 16% |
| `totalcomasesor` | `NUMERIC(15,2)` | `yes` |  |
| `totalcomp` | `NUMERIC(15,2)` | `yes` |  |
| `totalfactura` | `NUMERIC(15,2)` | `yes` | Total Factura |
| `comentarios` | `TEXT` | `yes` |  |
| `clasifcomision` | `VARCHAR (255)` | `yes` |  |

### `ComisionesBD`

- Category: `core`
- Priority: `high`
- Rows:`0`
- Columns: `9`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcomisiones` | `SERIAL` | `yes` | Registro |
| `clavecomi` | `VARCHAR (255)` | `yes` | Clave |
| `domcomi` | `VARCHAR (255)` | `yes` | Domicilio |
| `ladocomi` | `VARCHAR (255)` | `yes` | Lado Alta o Cierre |
| `asecomi` | `VARCHAR (255)` | `yes` | Asesor |
| `fechacomi` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del cálculo |
| `fechapago` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de Pago |
| `comiglobal` | `NUMERIC(15,2)` | `yes` | Monto Comisión global |
| `opercomi` | `VARCHAR (255)` | `yes` | Operación |

### `Compradores`

- Category: `core`
- Priority: `high`
- Rows:`351`
- Columns: `5`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcomp` | `SERIAL` | `yes` |  |
| `clca` | `VARCHAR (255) NOT NULL` | `no` | Clave de la propiedad |
| `cap` | `VARCHAR (255) NOT NULL` | `no` | Comprador Arrendatario |
| `repper` | `VARCHAR (255)` | `yes` | Persona que ostenta Comprador o representante |
| `ncomp` | `INTEGER` | `yes` | Número de comprador |

### `ConcepEgresos`

- Category: `reference`
- Priority: `medium`
- Rows:`89`
- Columns: `7`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idconcep` | `SERIAL` | `yes` |  |
| `concepto` | `VARCHAR (255)` | `yes` |  |
| `movc` | `VARCHAR (255)` | `yes` |  |
| `cat1ord` | `INTEGER` | `yes` |  |
| `cat1` | `VARCHAR (255)` | `yes` |  |
| `cat2` | `VARCHAR (255)` | `yes` |  |
| `movcn` | `INTEGER` | `yes` |  |

### `ConcepIngresos`

- Category: `reference`
- Priority: `medium`
- Rows:`30`
- Columns: `7`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idconcep` | `SERIAL` | `yes` |  |
| `concepto` | `VARCHAR (255)` | `yes` |  |
| `movc` | `VARCHAR (255)` | `yes` |  |
| `cat1ord` | `INTEGER` | `yes` |  |
| `cat1` | `VARCHAR (255)` | `yes` |  |
| `cat2` | `VARCHAR (255)` | `yes` |  |
| `movcn` | `INTEGER` | `yes` |  |

### `CondCompra`

- Category: `reference`
- Priority: `medium`
- Rows:`0`
- Columns: `5`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcc` | `SERIAL` | `yes` | Registro |
| `ccc` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `condcompra` | `VARCHAR (255)` | `yes` | Crédito o Contado |
| `instcred` | `VARCHAR (255)` | `yes` | Institución de Crédito |
| `comcc` | `VARCHAR (255)` | `yes` | Comentarios |

### `CONDICIONES`

- Category: `reference`
- Priority: `medium`
- Rows:`2881`
- Columns: `18`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcond` | `SERIAL` | `yes` | Registro condiciones de operación |
| `clavecondici` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `opcomglobal` | `INTEGER NOT NULL` | `no` | Selección para la asignación de comisión global |
| `cgap1` | `DOUBLE PRECISION NOT NULL` | `no` | Porcentaje de Comisión Global Acordada |
| `cgam1` | `NUMERIC(15,2)` | `yes` | Monto de Comisión Global Acordada |
| `opcomglobalr` | `INTEGER` | `yes` | Selección para la asignación de comisión global RENTA |
| `cgap1r` | `DOUBLE PRECISION` | `yes` | Porcentaje de Comisión Global Acordada RENTA |
| `cgam1r` | `NUMERIC(15,2)` | `yes` | Monto de Comisión Global Acordada RENTA |
| `cpcoop` | `INTEGER` | `yes` | Porcentaje de Comisión para Coop de Cierre |
| `pl1` | `DOUBLE PRECISION NOT NULL` | `no` | Porcentaje Lado 1 Alta |
| `pl2` | `DOUBLE PRECISION NOT NULL` | `no` | Porcentaje Lado 2 Cierre |
| `prl1` | `DOUBLE PRECISION NOT NULL` | `no` | Porcentaje Referido Lado 1 Alta |
| `prl2` | `DOUBLE PRECISION NOT NULL` | `no` | Porcentaje Referido Lado 2 Cierre |
| `condcom` | `VARCHAR (255)` | `yes` | Comentarios |
| `excepcionpol` | `BOOLEAN NOT NULL` | `no` | Excepción de la política de comisión |
| `politicapl` | `VARCHAR (255)` | `yes` | Política de comisión que se aplica 2019 o anterior |
| `politicaaño` | `INTEGER` | `yes` | Año correspondiente a la polítca a aplicar |
| `vdc` | `VARCHAR (255)` | `yes` | Confirma datos correctos |

### `Copia de Marketing`

- Category: `archive`
- Priority: `low`
- Rows:`33`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Copia de Marketing 01-04-24`

- Category: `archive`
- Priority: `low`
- Rows:`31`
- Columns: `19`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |
| `f12` | `VARCHAR (255)` | `yes` |  |
| `f13` | `VARCHAR (255)` | `yes` |  |
| `f14` | `VARCHAR (255)` | `yes` |  |
| `f15` | `VARCHAR (255)` | `yes` |  |
| `f16` | `VARCHAR (255)` | `yes` |  |
| `f17` | `VARCHAR (255)` | `yes` |  |
| `f18` | `VARCHAR (255)` | `yes` |  |
| `f19` | `VARCHAR (255)` | `yes` |  |

### `Copia de Marketing Abril2024`

- Category: `archive`
- Priority: `low`
- Rows:`251`
- Columns: `19`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |
| `f12` | `VARCHAR (255)` | `yes` |  |
| `f13` | `VARCHAR (255)` | `yes` |  |
| `f14` | `VARCHAR (255)` | `yes` |  |
| `f15` | `VARCHAR (255)` | `yes` |  |
| `f16` | `VARCHAR (255)` | `yes` |  |
| `f17` | `VARCHAR (255)` | `yes` |  |
| `f18` | `VARCHAR (255)` | `yes` |  |
| `f19` | `VARCHAR (255)` | `yes` |  |

### `Copia de Marketing Febrero 2024`

- Category: `archive`
- Priority: `low`
- Rows:`212`
- Columns: `19`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |
| `f12` | `VARCHAR (255)` | `yes` |  |
| `f13` | `VARCHAR (255)` | `yes` |  |
| `f14` | `VARCHAR (255)` | `yes` |  |
| `f15` | `VARCHAR (255)` | `yes` |  |
| `f16` | `VARCHAR (255)` | `yes` |  |
| `f17` | `VARCHAR (255)` | `yes` |  |
| `f18` | `VARCHAR (255)` | `yes` |  |
| `f19` | `VARCHAR (255)` | `yes` |  |

### `Copia de Marketing Mayo2024`

- Category: `archive`
- Priority: `low`
- Rows:`283`
- Columns: `19`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |
| `f12` | `VARCHAR (255)` | `yes` |  |
| `f13` | `VARCHAR (255)` | `yes` |  |
| `f14` | `VARCHAR (255)` | `yes` |  |
| `f15` | `VARCHAR (255)` | `yes` |  |
| `f16` | `VARCHAR (255)` | `yes` |  |
| `f17` | `VARCHAR (255)` | `yes` |  |
| `f18` | `VARCHAR (255)` | `yes` |  |
| `f19` | `VARCHAR (255)` | `yes` |  |

### `Credito2`

- Category: `reference`
- Priority: `medium`
- Rows:`84`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `credito2` | `VARCHAR (255)` | `yes` | Bancos, instituciones, etc |

### `Cristales`

- Category: `reference`
- Priority: `medium`
- Rows:`3`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `cristales` | `VARCHAR (255)` | `yes` |  |

### `Destacadas`

- Category: `archive`
- Priority: `low`
- Rows:`142`
- Columns: `23`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idd` | `SERIAL` | `yes` | Registro |
| `fechadest` | `DATE` | `yes` | Fecha de registro |
| `mesdest` | `VARCHAR (254)` | `yes` | Mes |
| `añodest` | `INTEGER` | `yes` | Año |
| `domicidest` | `VARCHAR (255)` | `yes` | Domicilio |
| `valordest` | `NUMERIC(15,2)` | `yes` | Valor de la propiedad |
| `clavedest` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `vivad` | `INTEGER` | `yes` | Número de destacadas Vivanuncios |
| `vivad2` | `INTEGER` | `yes` | Número de destacadas Vivanuncios nivel 2 |
| `vivad3` | `INTEGER` | `yes` | Número de destacadas Vivanuncios nivel 3 |
| `remaxd` | `INTEGER` | `yes` | Número de destacadas Remax |
| `ampid` | `INTEGER` | `yes` | Número de destacadas AMPI Guadalajara |
| `inm24d` | `INTEGER` | `yes` | Número de destacadas Inmuebles 24 |
| `easybrokerd` | `INTEGER` | `yes` | Número de visitas al portal EasyBroker |
| `wiggotd` | `INTEGER` | `yes` | Número de visitas al portal Wiggot |
| `mcubd` | `INTEGER` | `yes` | Número de destacadas Metros Cúbicos |
| `mld` | `INTEGER` | `yes` | Número de destacadas Mercado Libre |
| `cytd` | `INTEGER` | `yes` | Número de destacadas Casas y Terrenos |
| `smd` | `INTEGER` | `yes` | Número de destacadas Segunda Mano |
| `nockd` | `INTEGER` | `yes` | Número de destacadas Nocknok |
| `inmd` | `INTEGER` | `yes` | Número de destacadas Inmobiliarias |
| `lamudid` | `INTEGER` | `yes` | Número de destacadas Lamudi |
| `statuspd` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `DestacadasEne-Abril`

- Category: `archive`
- Priority: `low`
- Rows:`7292`
- Columns: `23`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idd` | `SERIAL` | `yes` | Registro |
| `fechadest` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesdest` | `VARCHAR (254)` | `yes` | Mes |
| `añodest` | `INTEGER` | `yes` | Año |
| `domicidest` | `VARCHAR (255)` | `yes` | Domicilio |
| `valordest` | `NUMERIC(15,2)` | `yes` | Valor de la propiedad |
| `clavedest` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `vivad` | `INTEGER` | `yes` | Número de destacadas Vivanuncios |
| `vivad2` | `INTEGER` | `yes` | Número de destacadas Vivanuncios nivel 2 |
| `vivad3` | `INTEGER` | `yes` | Número de destacadas Vivanuncios nivel 3 |
| `remaxd` | `INTEGER` | `yes` | Número de destacadas Remax |
| `ampid` | `INTEGER` | `yes` | Número de destacadas AMPI Guadalajara |
| `inm24d` | `INTEGER` | `yes` | Número de destacadas Inmuebles 24 |
| `easybrokerd` | `INTEGER` | `yes` | Número de visitas al portal EasyBroker |
| `wiggotd` | `INTEGER` | `yes` | Número de visitas al portal Wiggot |
| `mcubd` | `INTEGER` | `yes` | Número de destacadas Metros Cúbicos |
| `mld` | `INTEGER` | `yes` | Número de destacadas Mercado Libre |
| `cytd` | `INTEGER` | `yes` | Número de destacadas Casas y Terrenos |
| `smd` | `INTEGER` | `yes` | Número de destacadas Segunda Mano |
| `nockd` | `INTEGER` | `yes` | Número de destacadas Nocknok |
| `inmd` | `INTEGER` | `yes` | Número de destacadas Inmobiliarias |
| `lamudid` | `INTEGER` | `yes` | Número de destacadas Lamudi |
| `statuspd` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Directorio REMAX México`

- Category: `core`
- Priority: `medium`
- Rows:`867`
- Columns: `18`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `iddr` | `SERIAL` | `yes` |  |
| `inmobiliaria` | `VARCHAR (255) NOT NULL` | `no` |  |
| `calle` | `VARCHAR (255)` | `yes` |  |
| `no ext` | `VARCHAR (255)` | `yes` |  |
| `no int` | `VARCHAR (255)` | `yes` |  |
| `edificio` | `VARCHAR (255)` | `yes` |  |
| `piso` | `VARCHAR (255)` | `yes` |  |
| `colonia` | `VARCHAR (255)` | `yes` |  |
| `cp` | `VARCHAR (255)` | `yes` |  |
| `ciudad` | `VARCHAR (255)` | `yes` |  |
| `estado` | `VARCHAR (255)` | `yes` |  |
| `pais` | `VARCHAR (255)` | `yes` |  |
| `tel oficina` | `VARCHAR (255)` | `yes` |  |
| `telofi2` | `DOUBLE PRECISION` | `yes` |  |
| `movil oficina` | `VARCHAR (255)` | `yes` |  |
| `email oficina` | `VARCHAR (255)` | `yes` |  |
| `sitio web` | `VARCHAR (255)` | `yes` |  |
| `broker` | `VARCHAR (255)` | `yes` |  |

### `EnlacePortales`

- Category: `reference`
- Priority: `low`
- Rows:`2767`
- Columns: `5`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idlinks` | `SERIAL` | `yes` |  |
| `cmdp` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `mpd` | `VARCHAR (255)` | `yes` | Medio de publicidad digital |
| `enlace` | `TEXT` | `yes` | Enlace de la propiedad en el medio respectivo |
| `idportal` | `VARCHAR (255)` | `yes` | Código de la propiedad en el portal |

### `Escrituradores`

- Category: `reference`
- Priority: `medium`
- Rows:`75`
- Columns: `4`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idescit` | `SERIAL` | `yes` | Registro |
| `clescr` | `VARCHAR (255) NOT NULL` | `no` | Clave de la propiedad |
| `escriturador` | `VARCHAR (255) NOT NULL` | `no` | nombre de la(s) persona(s) esciturada(s) |
| `nescrit` | `INTEGER` | `yes` | Número de escroturador |

### `Estilop`

- Category: `reference`
- Priority: `medium`
- Rows:`7`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `estilop` | `VARCHAR (255)` | `yes` | Estilo |

### `Expediente`

- Category: `core`
- Priority: `high`
- Rows:`2568`
- Columns: `57`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `iddocum` | `SERIAL` | `yes` |  |
| `cdocum` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `doccontrato` | `Unknown_0012` | `yes` |  |
| `ps` | `BOOLEAN NOT NULL` | `no` | Prestación de servicios |
| `amc` | `BOOLEAN NOT NULL` | `no` | Análisis de mercado comparativo |
| `cvc` | `BOOLEAN NOT NULL` | `no` | Conclusión de valor comercial |
| `cisr` | `BOOLEAN NOT NULL` | `no` | Cálculo de ISR |
| `irpp` | `BOOLEAN NOT NULL` | `no` | Investigación en el R.P.P. |
| `oprev` | `BOOLEAN NOT NULL` | `no` | Otro documento previo |
| `oprev2` | `VARCHAR (255)` | `yes` | Descipción de otro documento previo |
| `tp` | `BOOLEAN NOT NULL` | `no` | Título de propiedad |
| `bp` | `BOOLEAN NOT NULL` | `no` | Boleta predial reciente pagada |
| `ba` | `BOOLEAN NOT NULL` | `no` | Boleta agua reciente pagada |
| `cfe` | `BOOLEAN NOT NULL` | `no` | Recibo CFE |
| `pa` | `BOOLEAN NOT NULL` | `no` | Planos arquitectónicos |
| `idprop` | `BOOLEAN NOT NULL` | `no` | Identificación de propietarios |
| `am` | `BOOLEAN NOT NULL` | `no` | Acta de matrimonio |
| `lc` | `BOOLEAN NOT NULL` | `no` | Licencia de construcción |
| `ato` | `BOOLEAN NOT NULL` | `no` | Aviso de terminación de obra |
| `clg` | `BOOLEAN NOT NULL` | `no` | Certificado de libertad de gravamen |
| `cdtud` | `BOOLEAN NOT NULL` | `no` | Certificado de dictámen de trazo, usos y destinos |
| `ac` | `BOOLEAN NOT NULL` | `no` | Acta constitutiva (solo empresas) |
| `ch` | `BOOLEAN NOT NULL` | `no` | Cancelación de hipoteca |
| `prl` | `BOOLEAN NOT NULL` | `no` | Poder de respresentante legal |
| `rsti` | `BOOLEAN NOT NULL` | `no` | Radicación de sucesión testamentaria o int |
| `ccm` | `BOOLEAN NOT NULL` | `no` | Convenio de capitulación matrimonial (Sentencia de divorcio) |
| `aj` | `BOOLEAN NOT NULL` | `no` | Autorización del Juez |
| `dt` | `BOOLEAN NOT NULL` | `no` | Derecho del tanto (Copropietarios o Arrendatarios) |
| `otrodoc` | `BOOLEAN NOT NULL` | `no` | Otro documento |
| `otrodoc2` | `VARCHAR (255)` | `yes` | Descripción de otro documento |
| `cps` | `BOOLEAN NOT NULL` | `no` | Contrato de prestación de servicios |
| `iexp` | `BOOLEAN NOT NULL` | `no` | Inventario |
| `fot` | `BOOLEAN NOT NULL` | `no` | Fotos |
| `llavexp` | `BOOLEAN NOT NULL` | `no` | Llaves |
| `telcita` | `DOUBLE PRECISION` | `yes` | Teléfono para citas |
| `cpexp` | `BOOLEAN NOT NULL` | `no` | Captura en portales |
| `emailing` | `BOOLEAN NOT NULL` | `no` | Envío de emailing |
| `prs` | `BOOLEAN NOT NULL` | `no` | Publicidad redes sociales |
| `eci` | `BOOLEAN NOT NULL` | `no` | Envío comunicado interno |
| `cbd` | `BOOLEAN NOT NULL` | `no` | Captura base de datos |
| `cr` | `BOOLEAN NOT NULL` | `no` | Colocación de rótulo |
| `rp` | `BOOLEAN NOT NULL` | `no` | Refuerzo de publicidad |
| `otroalta` | `BOOLEAN NOT NULL` | `no` | Otro alta |
| `otroalta2` | `VARCHAR (255)` | `yes` | Descripción de otro alta |
| `status2` | `VARCHAR (255)` | `yes` | Archivado, Destruído |
| `fexped` | `DATE` | `yes` | Expediente fecha |
| `comexp` | `VARCHAR (255)` | `yes` | Comentarios expediente |
| `exp2` | `VARCHAR (255)` | `yes` | Expediente comentarios |
| `fexped2` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Entrega de Expediente por Asesor |
| `oforig` | `BOOLEAN NOT NULL` | `no` | Oferta Original |
| `invest` | `BOOLEAN NOT NULL` | `no` | Investigación |
| `inearrend` | `BOOLEAN NOT NULL` | `no` | INE Arrendatario o Comprador |
| `inefia` | `BOOLEAN NOT NULL` | `no` | INE Fiador |
| `arrec` | `BOOLEAN NOT NULL` | `no` | Contrato Arrendamiento |
| `compventc` | `BOOLEAN NOT NULL` | `no` | Contrato Compra Venta |
| `escnuevas` | `BOOLEAN NOT NULL` | `no` | Escrituras nuevas |
| `idregistro` | `VARCHAR (255)` | `yes` | Persona que captura el registro |

### `ExpedientesControl`

- Category: `core`
- Priority: `high`
- Rows:`11`
- Columns: `10`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idexp` | `SERIAL` | `yes` | Registro |
| `fechasexp` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de Salida del expediente |
| `opexp` | `VARCHAR (255)` | `yes` | Objeto del préstamo del expediente |
| `cpexp` | `VARCHAR (255)` | `yes` | Clave de la propiedad del expediente |
| `domexp` | `VARCHAR (255)` | `yes` | Domicilio de la propiedad |
| `respexp` | `VARCHAR (255)` | `yes` | Responsable |
| `firmaexp1` | `BOOLEAN NOT NULL` | `no` | Firma del responsable y resguardatario |
| `firmaexp` | `VARCHAR (255)` | `yes` | Firma del responsable y resguardatario |
| `fechaexp` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de Devolución del Expediente |
| `comexp` | `VARCHAR (255)` | `yes` | Comentarios |

### `Fachada`

- Category: `reference`
- Priority: `medium`
- Rows:`3`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `fachada` | `VARCHAR (255)` | `yes` |  |

### `FechasCont`

- Category: `reference`
- Priority: `medium`
- Rows:`0`
- Columns: `20`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idfechas` | `SERIAL` | `yes` | Registros de fechas |
| `cfechas` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `falta` | `DATE` | `yes` | Fecha de ALTA |
| `far` | `DATE` | `yes` | Fecha de aviso de ALTA a recepción |
| `fcancel` | `DATE` | `yes` | Fecha de CANCELACIÓN |
| `fbr` | `DATE` | `yes` | Fecha de aviso de BAJA a recepción |
| `fcontrato` | `DATE` | `yes` | Fecha de firma contrato de servicios |
| `finicio` | `DATE` | `yes` | Fecha de inicio de promoción |
| `fvenc` | `DATE` | `yes` | Fecha de vencimiento de contrato de servicios |
| `díasc` | `INTEGER` | `yes` | Días de contrato |
| `díasp` | `INTEGER` | `yes` | Días de promoción e oficina |
| `ffirma` | `DATE` | `yes` | Fecha de firma promesa de compra venta |
| `fesc` | `DATE` | `yes` | Fecha de firma de Escrituras |
| `fcarr` | `DATE` | `yes` | Fecha de firma contrato de arrendamiento |
| `fcierre` | `DATE` | `yes` | Fecha de CIERRE |
| `fcobro` | `DATE` | `yes` | Fecha de cobro de servicios |
| `fpago` | `DATE` | `yes` | Fecha de pago de comisión |
| `fex` | `DATE` | `yes` | Fecha de cierre de expediente |
| `leyalf` | `DATE` | `yes` | Fecha Ley antilavado |
| `statcon` | `VARCHAR (255)` | `yes` | Activo Inactivo, renovación mensual |

### `Finiquitos`

- Category: `core`
- Priority: `high`
- Rows:`1643`
- Columns: `31`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idfini` | `SERIAL` | `yes` | Registro de finiquitos |
| `clvfini` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `tifini` | `VARCHAR (255)` | `yes` | Cierre o Cancelación |
| `motcan` | `VARCHAR (255)` | `yes` | Motivo de cancelación |
| `cancac` | `BOOLEAN NOT NULL` | `no` | Cancelación aplica comisión? |
| `notc` | `VARCHAR (255)` | `yes` | Notario de CIERRE |
| `investc` | `VARCHAR (255)` | `yes` | Investigador de CIERRE |
| `valuc` | `VARCHAR (255)` | `yes` | Valuador de CIERRE |
| `cohipc` | `VARCHAR (255)` | `yes` | Corredor hipotecario de CIERRE |
| `herrjc` | `VARCHAR (255)` | `yes` | Herramienta jurídica de CIERRE |
| `medcom` | `VARCHAR (255)` | `yes` | Medio de compra Contado o crédito |
| `medcom2` | `VARCHAR (255)` | `yes` | Infonavit, Banco, Institución, Sofon, Hir Casa |
| `medcom3` | `VARCHAR (255)` | `yes` | Bancos, Instituciones y Fondos |
| `fcancel` | `DATE` | `yes` | Fecha de CANCELACIÓN |
| `fbr` | `DATE` | `yes` | Fecha de aviso de BAJA a recepción |
| `ffirma` | `DATE` | `yes` | Fecha de firma promesa de compra venta |
| `fesc` | `DATE` | `yes` | Fecha de firma de Escrituras |
| `fcarr` | `DATE` | `yes` | Fecha de firma contrato de arrendamiento |
| `fcierre` | `DATE` | `yes` | Fecha de CIERRE |
| `fpago` | `DATE` | `yes` | Fecha de pago de comisión ALTA |
| `fpago2` | `DATE` | `yes` | Fecha de pago de comisión CIERRE |
| `fcobro` | `DATE` | `yes` | Fecha de cobro de servicios |
| `factcobro` | `BOOLEAN NOT NULL` | `no` | Factura de cobro de comisión |
| `mcobr` | `VARCHAR (255)` | `yes` | Medio de cobro Efectivo, Depósito, Tranferencia, Cheque, Otro |
| `fexped` | `DATE` | `yes` | Expediente fecha |
| `comexp` | `VARCHAR (255)` | `yes` | Comentarios expediente |
| `exp2` | `VARCHAR (255)` | `yes` | Expediente comentarios |
| `lalfini` | `DATE` | `yes` | Ley Antilavado fecha en que se informa al SAT |
| `lalfinicom` | `VARCHAR (255)` | `yes` | Ley Antilavado comentario |
| `fexped2` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Entrega de Expediente por Asesor |
| `pagosparciales` | `BOOLEAN NOT NULL` | `no` | Pagos parciales Sí/No |

### `FPago`

- Category: `reference`
- Priority: `medium`
- Rows:`4`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `fpago` | `VARCHAR (255)` | `yes` | Forma de pago |

### `Guardias`

- Category: `core`
- Priority: `high`
- Rows:`7497`
- Columns: `15`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idguarda` | `SERIAL` | `yes` | Registro |
| `fguardia` | `DATE` | `yes` | Fecha de la guardia |
| `turno` | `VARCHAR (255)` | `yes` | Turno 1, 2 o 3 |
| `hguardia` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de entrada |
| `hguardia1` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de entrada |
| `hguardia2` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de salida |
| `asesor` | `VARCHAR (255)` | `yes` | Asesor asignado |
| `asesor2` | `VARCHAR (255)` | `yes` | Asesor de reemplazo |
| `sust` | `VARCHAR (255)` | `yes` | NA o Sustitución |
| `asistguardia` | `VARCHAR (255)` | `yes` | Asistencia, Falta |
| `gpunt` | `VARCHAR (255)` | `yes` | Puntualidad, retardo o falta |
| `gpunt1` | `VARCHAR (255)` | `yes` | Salida puntual, anticipada |
| `gjust` | `BOOLEAN NOT NULL` | `no` | Justificación |
| `gjust2` | `VARCHAR (255)` | `yes` | Descripción de la justificación |
| `gcom` | `VARCHAR (255)` | `yes` | Comentarios de la guardia |

### `Guardias Asignadas`

- Category: `reference`
- Priority: `low`
- Rows:`262`
- Columns: `17`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idga` | `SERIAL` | `yes` |  |
| `ncai` | `VARCHAR (255) NOT NULL` | `no` |  |
| `ape1a` | `VARCHAR (255)` | `yes` |  |
| `prodg` | `DOUBLE PRECISION` | `yes` |  |
| `tguar` | `DOUBLE PRECISION` | `yes` |  |
| `gasig` | `DOUBLE PRECISION` | `yes` |  |
| `ptg` | `DOUBLE PRECISION` | `yes` |  |
| `fg` | `DOUBLE PRECISION` | `yes` |  |
| `rg` | `DOUBLE PRECISION` | `yes` |  |
| `sg` | `DOUBLE PRECISION` | `yes` |  |
| `penguardias` | `DOUBLE PRECISION` | `yes` |  |
| `gtot` | `DOUBLE PRECISION` | `yes` |  |
| `gtot2` | `DOUBLE PRECISION` | `yes` |  |
| `mesg` | `VARCHAR (255)` | `yes` |  |
| `fechacg` | `DATE` | `yes` |  |
| `nguardias` | `DOUBLE PRECISION` | `yes` |  |
| `gdm` | `DOUBLE PRECISION` | `yes` |  |

### `Guardias Aux`

- Category: `reference`
- Priority: `low`
- Rows:`28`
- Columns: `16`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idga` | `SERIAL` | `yes` |  |
| `ncai` | `VARCHAR (255) NOT NULL` | `no` |  |
| `prodg` | `DOUBLE PRECISION` | `yes` |  |
| `tendg` | `DOUBLE PRECISION` | `yes` |  |
| `gasig` | `DOUBLE PRECISION` | `yes` |  |
| `ptg` | `DOUBLE PRECISION` | `yes` |  |
| `fg` | `DOUBLE PRECISION` | `yes` |  |
| `rg` | `DOUBLE PRECISION` | `yes` |  |
| `sg` | `DOUBLE PRECISION` | `yes` |  |
| `penguardias` | `DOUBLE PRECISION` | `yes` |  |
| `gtot` | `DOUBLE PRECISION` | `yes` |  |
| `gtot2` | `DOUBLE PRECISION` | `yes` |  |
| `mesg` | `VARCHAR (255)` | `yes` |  |
| `fechacg` | `DATE` | `yes` |  |
| `nguardias` | `DOUBLE PRECISION` | `yes` |  |
| `gdm` | `DOUBLE PRECISION` | `yes` |  |

### `Herramientas`

- Category: `reference`
- Priority: `medium`
- Rows:`29`
- Columns: `10`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idher` | `SERIAL` | `yes` | Registro |
| `fechash` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de Salida de la herramienta o equipo |
| `resph` | `VARCHAR (255)` | `yes` | Responsable |
| `herra` | `VARCHAR (255)` | `yes` | Herramienta que se prestó |
| `canther` | `INTEGER` | `yes` | Cantidad que salió |
| `firmaher1` | `BOOLEAN NOT NULL` | `no` | Firma |
| `firmaher` | `VARCHAR (255)` | `yes` | Firma |
| `fechaher` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de Devolución de la herramienta o equipo |
| `canther2` | `INTEGER` | `yes` | Cantidad devuelta |
| `comher` | `VARCHAR (255)` | `yes` | Comentarios |

### `Hipotecas`

- Category: `reference`
- Priority: `medium`
- Rows:`123`
- Columns: `8`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idprophipot` | `SERIAL` | `yes` | Registro |
| `clavehipot` | `VARCHAR (255)` | `yes` | Clave de la Propiedad |
| `hipote` | `BOOLEAN NOT NULL` | `no` | Hipoteca |
| `hipotcondi` | `VARCHAR (255)` | `yes` | Hipoteca con que Institución |
| `añoscondi` | `INTEGER` | `yes` | Años de hipoteca |
| `sicondi` | `NUMERIC(15,2)` | `yes` | Saldo insoluto de hipoteca |
| `pmcondi` | `NUMERIC(15,2)` | `yes` | Pago mensual de hipoteca |
| `comhipot` | `VARCHAR (255)` | `yes` | Comentarios sobre hipoteca |

### `Hoja1`

- Category: `obsolete`
- Priority: `low`
- Rows:`305`
- Columns: `30`
- Note: Table de travail ou import ancien probable.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `id` | `SERIAL` | `yes` | Registro |
| `no` | `DOUBLE PRECISION` | `yes` | Número |
| `operación` | `VARCHAR (255)` | `yes` | Operación |
| `tipo` | `VARCHAR (255)` | `yes` | Tipo |
| `fecha` | `VARCHAR (255)` | `yes` | Fecha |
| `oficiref` | `VARCHAR (255)` | `yes` | Oficina que refiere |
| `asesorref` | `VARCHAR (255)` | `yes` | Asesor que refiere |
| `telofref` | `DOUBLE PRECISION` | `yes` | Telefono Oficina |
| `telmovref` | `DOUBLE PRECISION` | `yes` | Telefono Movil |
| `emailref` | `VARCHAR (255)` | `yes` | eMail |
| `otroref` | `VARCHAR (255)` | `yes` | Otro |
| `asesorrec` | `VARCHAR (255)` | `yes` | Asesor que recibe |
| `telofrec` | `VARCHAR (255)` | `yes` | Telefono de oficina de quien recibe |
| `telmovrec` | `DOUBLE PRECISION` | `yes` | Telefono móvil de quien recibe |
| `mailrec` | `VARCHAR (255)` | `yes` | Correo de quien recibe |
| `nomcliente` | `VARCHAR (255)` | `yes` | Nombre de cliente |
| `apellidop` | `VARCHAR (255)` | `yes` | Apellido Paterno |
| `apellidom` | `VARCHAR (255)` | `yes` | Apellido Materno |
| `telfijocl` | `DOUBLE PRECISION` | `yes` | Teléfono fijo del cliente |
| `telmovcl` | `DOUBLE PRECISION` | `yes` | Teléfono móvil del cliente |
| `correo` | `VARCHAR (255)` | `yes` | Correo del cliente |
| `dir propiedad` | `VARCHAR (255)` | `yes` | Dirección de la propiedad |
| `colonia` | `VARCHAR (255)` | `yes` | Colonia |
| `municipio` | `VARCHAR (255)` | `yes` | Municipio |
| `estado` | `VARCHAR (255)` | `yes` | Entidad |
| `pais` | `VARCHAR (255)` | `yes` | País |
| `presupuesto` | `VARCHAR (255)` | `yes` | Presupuesto |
| `compactada` | `DOUBLE PRECISION` | `yes` | Comisión pactada |
| `estatus` | `VARCHAR (255)` | `yes` | Estatus |
| `obs` | `VARCHAR (255)` | `yes` | Observaciones |

### `Idiomas`

- Category: `reference`
- Priority: `medium`
- Rows:`10`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idioma` | `VARCHAR (255)` | `yes` |  |

### `incidentesAsesor`

- Category: `reference`
- Priority: `low`
- Rows:`1`
- Columns: `7`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idia` | `SERIAL` | `yes` | Registro |
| `asesoria` | `VARCHAR (255)` | `yes` | Asesor interno o externo |
| `faia` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha en la que se registra el reporte |
| `maia` | `VARCHAR (255)` | `yes` | Asunto o tema que generó el registro |
| `detmaia` | `VARCHAR (255)` | `yes` | Descripción del tema |
| `efectosia` | `VARCHAR (255)` | `yes` | Efectos que generó la acción en cuestión |
| `conclusiónia` | `VARCHAR (255)` | `yes` | Conclusión o status del asunto |

### `Ingresos-Egresos`

- Category: `core`
- Priority: `medium`
- Rows:`21325`
- Columns: `80`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idmov` | `SERIAL` | `yes` | Registro de movimientos |
| `regid` | `VARCHAR (254)` | `yes` |  |
| `mov` | `VARCHAR (255)` | `yes` | Ingreso/Egreso |
| `fecha` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `dir` | `VARCHAR (255)` | `yes` | Directo, Indirecto, Otro |
| `banco` | `VARCHAR (255)` | `yes` | Banorte, Bancomer, Efectivo |
| `reembolso` | `VARCHAR (255)` | `yes` | Reembolso |
| `nreemb` | `INTEGER` | `yes` | Número de reembolso |
| `cch` | `VARCHAR (255)` | `yes` | Caja Chica |
| `apartado` | `VARCHAR (255)` | `yes` | El importe se refiere a un Apartado |
| `nrenta` | `INTEGER` | `yes` | Numero de mes de renta |
| `doc2` | `BOOLEAN NOT NULL` | `no` | Se tiene el documento |
| `doc` | `VARCHAR (255)` | `yes` | Documento que ampara el movimiento |
| `no` | `VARCHAR (255)` | `yes` | Número o Folio |
| `fechadoc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del documento |
| `persona` | `VARCHAR (255)` | `yes` | Persona que ejerce el movimiento |
| `empresa` | `VARCHAR (255)` | `yes` | Empresa que factura, cobra o paga |
| `pe` | `VARCHAR (254)` | `yes` | Persona o Empresa |
| `concepto` | `VARCHAR (255)` | `yes` | Concepto |
| `descripción` | `VARCHAR (255)` | `yes` | Descripción detallada del concepto |
| `mov2` | `VARCHAR (255)` | `yes` | Ingreso/Egreso Directos o Indirectos |
| `cat1ord` | `INTEGER` | `yes` | Orden de Categoría 1 |
| `cat1` | `VARCHAR (255)` | `yes` | Categoría 1 |
| `cat2` | `VARCHAR (255)` | `yes` | Categoría 2 |
| `mov2n` | `INTEGER` | `yes` | Número de catálogo del Movimiento |
| `cargop` | `NUMERIC(15,2)` | `yes` | Egreso programado |
| `cargo` | `NUMERIC(15,2)` | `yes` | Egreso real |
| `abonop` | `NUMERIC(15,2)` | `yes` | Ingreso programado |
| `abono` | `NUMERIC(15,2)` | `yes` | Ingreso real |
| `iva1` | `BOOLEAN NOT NULL` | `no` | Aplica IVA |
| `ieps1` | `BOOLEAN NOT NULL` | `no` | Aplica IEPS |
| `ieps2` | `NUMERIC(15,2)` | `yes` | Monto correspondiente al IEPS |
| `ieps3` | `NUMERIC(15,2)` | `yes` | Monto correspondiente al IEPS |
| `otroimp1` | `BOOLEAN NOT NULL` | `no` | Aplica de Otro Impuesto |
| `otroimp2` | `NUMERIC(15,2)` | `yes` | Monto correspondiente a Otro Impuesto |
| `otroimp3` | `NUMERIC(15,2)` | `yes` | Monto correspondiente a Otro Impuesto |
| `isr1` | `BOOLEAN NOT NULL` | `no` | Aplica ISR |
| `retadm1` | `BOOLEAN NOT NULL` | `no` | Aplica retención administrativa |
| `retiva1` | `BOOLEAN NOT NULL` | `no` | Aplica retención del IVA |
| `saldo` | `NUMERIC(15,2)` | `yes` | Saldo histórico |
| `monto` | `NUMERIC(15,2)` | `yes` | Monto VALOR ABSOLUTO [Cargo} o [Abono] |
| `montoie` | `NUMERIC(15,2)` | `yes` | Monto VALOR RELATIVO [Monto] |
| `montoie2` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDOS INICIAL MENSUAL, VALOR RELATIVO [Montoie] |
| `montoie2i` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDOS INICIAL MENSUAL, VALOR ABSOLUTO [Monto] |
| `montoiebab` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDO INICIAL DE APARTADOS, VALOR ABONO para Balance de efectivo Apartados |
| `montoiebca` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDO INICIAL DE APARTADOS, VALOR CARGO para Balance de efectivo Apartados |
| `ca` | `VARCHAR (254)` | `yes` | Abono, Cargo |
| `propiedad` | `VARCHAR (255)` | `yes` | Clave de la propiedad a que refiere el movimiento |
| `domicilio` | `VARCHAR (255)` | `yes` | Domicilio de la propiedad |
| `proprent` | `VARCHAR (255)` | `yes` | Clave propiedad administración de rentas |
| `rentdom` | `VARCHAR (255)` | `yes` | Domicilio propiedad administración de rentas |
| `fmovp` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de movimiento programado |
| `fmovr` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de movimiento real |
| `com` | `VARCHAR (255)` | `yes` | Comentario |
| `statusmov1` | `INTEGER` | `yes` | Estatus de Pagado/Pendiente de Pago/Cobrado/Pendiente de Cobro |
| `statusmov` | `VARCHAR (254)` | `yes` | Estatus de Pagado/Pendiente de Pago/Cobrado/Pendiente de Cobro |
| `statusmov2` | `VARCHAR (255)` | `yes` | Pagado Parcial/Cobrado Parcial |
| `statusapartado1` | `BOOLEAN NOT NULL` | `no` | Estatus de registro de Apartado en Resguardo o Devuelto |
| `statusapartado` | `VARCHAR (254)` | `yes` | Estatus de registro de Apartado en Resguardo o Devuelto |
| `nmes` | `INTEGER` | `yes` |  |
| `nmes2` | `VARCHAR (254)` | `yes` |  |
| `naño` | `INTEGER` | `yes` |  |
| `iva2` | `NUMERIC (39)` | `yes` | Monto correspondiente al IVA |
| `montoie3` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR RELATIVO [Montoie2] |
| `montoie3i` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR ABSOLUTO [Montoie2i] |
| `montoie3s` | `NUMERIC(15,2)` | `yes` | Monto CON SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR RELATIVO [Montoie] |
| `montoie4` | `NUMERIC(15,2)` | `yes` | Monto SIN APARTADOS, SIN SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR RELATIVO [Montoie3] |
| `montoie4i` | `NUMERIC(15,2)` | `yes` | Monto SIN APARTADOS, SIN SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR ABSOLUTO [Montoie3i] |
| `montoie4s` | `NUMERIC(15,2)` | `yes` | Monto SIN APARTADOS, CON SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR RELATIVO [Montoie3s] |
| `montoie5s` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDO INICIAL DE APARTADOS, CON SALDOS INICIAL MENSUAL, sin status de tesorería, solo Ingresos, VALOR RELATIVO [Montoie3s] |
| `montoie6s` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDO INICIAL DE APARTADOS, CON SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR RELATIVO [Montoie3s] |
| `montotes` | `NUMERIC(15,2)` | `yes` | Monto para cálculo de Tesorería [Montoie] |
| `impuestos` | `NUMERIC (39)` | `yes` |  |
| `importe` | `NUMERIC (39)` | `yes` | Importe o subtotal |
| `isr2` | `NUMERIC (39)` | `yes` | Monto correspondiente al ISR |
| `retadm2` | `NUMERIC (39)` | `yes` | Monto correspondiente a la retención administrativa |
| `retiva2` | `NUMERIC (39)` | `yes` | Monto correspondiente a la retención del IVA |
| `retenciones` | `NUMERIC (39)` | `yes` |  |
| `importe2` | `NUMERIC (39)` | `yes` | Importe menos retenciones |
| `total` | `NUMERIC (39)` | `yes` | Total con impuestos y retenciones |

### `Ingresos-EgresosIVA`

- Category: `core`
- Priority: `medium`
- Rows:`4`
- Columns: `72`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `mov` | `VARCHAR (255)` | `yes` | Ingreso/Egreso |
| `fmovr` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de movimiento real |
| `cargo` | `NUMERIC(15,2)` | `yes` | Egreso real |
| `cargop` | `NUMERIC(15,2)` | `yes` | Egreso programado |
| `banco` | `VARCHAR (255)` | `yes` | Banorte, Bancomer, Efectivo |
| `concepto` | `VARCHAR (255)` | `yes` | Concepto |
| `descripción` | `VARCHAR (255)` | `yes` | Descripción detallada del concepto |
| `mov2` | `VARCHAR (255)` | `yes` | Ingreso/Egreso Directos o Indirectos |
| `cat1ord` | `INTEGER` | `yes` | Orden de Categoría 1 |
| `cat1` | `VARCHAR (255)` | `yes` | Categoría 1 |
| `cat2` | `VARCHAR (255)` | `yes` | Categoría 2 |
| `mov2n` | `INTEGER` | `yes` | Número de catálogo del Movimiento |
| `statusmov1` | `INTEGER` | `yes` | Estatus de Pagado/Pendiente de Pago/Cobrado/Pendiente de Cobro |
| `statusmov` | `VARCHAR (254)` | `yes` | Estatus de Pagado/Pendiente de Pago/Cobrado/Pendiente de Cobro |
| `fecha` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del registro |
| `nmes` | `INTEGER` | `yes` |  |
| `nmes2` | `VARCHAR (254)` | `yes` |  |
| `naño` | `INTEGER` | `yes` |  |
| `dir` | `VARCHAR (255)` | `yes` | Directo, Indirecto, Otro |
| `reembolso` | `VARCHAR (255)` | `yes` | Reembolso |
| `nreemb` | `INTEGER` | `yes` | Número de reembolso |
| `cch` | `VARCHAR (255)` | `yes` | Caja Chica |
| `apartado` | `VARCHAR (255)` | `yes` | El importe se refiere a un Apartado |
| `nrenta` | `INTEGER` | `yes` | Numero de mes de renta |
| `doc2` | `BOOLEAN NOT NULL` | `no` | Se tiene el documento |
| `doc` | `VARCHAR (255)` | `yes` | Documento que ampara el movimiento |
| `no` | `VARCHAR (255)` | `yes` | Número o Folio |
| `fechadoc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del Dcumento |
| `persona` | `VARCHAR (255)` | `yes` | Persona que ejerce el movimiento |
| `empresa` | `VARCHAR (255)` | `yes` | Empresa que factura, cobra o paga |
| `pe` | `VARCHAR (254)` | `yes` | Persona o Empresa |
| `abonop` | `NUMERIC(15,2)` | `yes` | Ingreso programado |
| `abono` | `NUMERIC(15,2)` | `yes` | Ingreso real |
| `iva1` | `BOOLEAN NOT NULL` | `no` | Aplica IVA |
| `ieps1` | `BOOLEAN NOT NULL` | `no` | Aplica IEPS |
| `ieps2` | `NUMERIC(15,2)` | `yes` | Monto correspondiente al IEPS |
| `ieps3` | `NUMERIC(15,2)` | `yes` | Monto correspondiente al IEPS |
| `otroimp1` | `BOOLEAN NOT NULL` | `no` | Aplica de Otro Impuesto |
| `otroimp2` | `NUMERIC(15,2)` | `yes` | Monto correspondiente a Otro Impuesto |
| `otroimp3` | `NUMERIC(15,2)` | `yes` | Monto correspondiente a Otro Impuesto |
| `isr1` | `BOOLEAN NOT NULL` | `no` | Aplica ISR |
| `retadm1` | `BOOLEAN NOT NULL` | `no` | Aplica retención administrativa |
| `retiva1` | `BOOLEAN NOT NULL` | `no` | Aplica retención del IVA |
| `saldo` | `NUMERIC(15,2)` | `yes` | Saldo histórico |
| `monto` | `NUMERIC(15,2)` | `yes` | Monto VALOR ABSOLUTO [Cargo} o [Abono] |
| `montoie` | `NUMERIC(15,2)` | `yes` | Monto VALOR RELATIVO [Monto] |
| `montoie2` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDOS INICIAL MENSUAL, VALOR RELATIVO [Montoie] |
| `montoie2i` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDOS INICIAL MENSUAL, VALOR ABSOLUTO [Monto] |
| `montoie3` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR RELATIVO [Montoie2] |
| `montoie3i` | `NUMERIC(15,2)` | `yes` | Monto SIN SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR ABSOLUTO [Montoie2i] |
| `montoie3s` | `NUMERIC(15,2)` | `yes` | Monto CON SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR RELATIVO [Montoie] |
| `montoie4` | `NUMERIC(15,2)` | `yes` | Monto SIN APARTADOS, SIN SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR RELATIVO [Montoie3] |
| `montoie4i` | `NUMERIC(15,2)` | `yes` | Monto SIN APARTADOS, SIN SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR ABSOLUTO [Montoie3i] |
| `montoie4s` | `NUMERIC(15,2)` | `yes` | Monto SIN APARTADOS, CON SALDOS INICIAL MENSUAL, sin status de tesorería, VALOR RELATIVO [Montoie3s] |
| `montotes` | `NUMERIC(15,2)` | `yes` | Monto para cálculo de Tesorería [Montoie] |
| `ca` | `VARCHAR (254)` | `yes` | Abono, Cargo |
| `propiedad` | `VARCHAR (255)` | `yes` | Clave de la propiedad a que refiere el movimiento |
| `domicilio` | `VARCHAR (255)` | `yes` | Domicilio de la propiedad |
| `proprent` | `VARCHAR (255)` | `yes` | Clave propiedad administración de rentas |
| `rentdom` | `VARCHAR (255)` | `yes` | Domicilio propiedad administración de rentas |
| `fmovp` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` |  |
| `com` | `VARCHAR (255)` | `yes` | Comentario |
| `statusmov2` | `VARCHAR (255)` | `yes` | Pagado Parcial/Cobrado Parcial |
| `iva2` | `NUMERIC (39)` | `yes` | Monto correspondiente al IVA |
| `impuestos` | `NUMERIC (39)` | `yes` |  |
| `importe` | `NUMERIC (39)` | `yes` | Importe o subtotal |
| `isr2` | `NUMERIC (39)` | `yes` | Monto correspondiente al ISR |
| `retadm2` | `NUMERIC (39)` | `yes` | Monto correspondiente a la retención administrativa |
| `retiva2` | `NUMERIC (39)` | `yes` | Monto correspondiente a la retención del IVA |
| `retenciones` | `NUMERIC (39)` | `yes` |  |
| `importe2` | `NUMERIC (39)` | `yes` | Importe menos retenciones |
| `total` | `NUMERIC (39)` | `yes` | Total con impuestos y retenciones |

### `InternetOK`

- Category: `reference`
- Priority: `low`
- Rows:`39`
- Columns: `1`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `sitio` | `VARCHAR (255)` | `yes` | Sitio web |

### `InvOficina`

- Category: `reference`
- Priority: `low`
- Rows:`1`
- Columns: `11`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idinof` | `SERIAL` | `yes` | Reg |
| `invcat` | `VARCHAR (255)` | `yes` | Categoría |
| `invdesc` | `VARCHAR (255)` | `yes` | Descripción del bien inventariado |
| `invcod` | `VARCHAR (255)` | `yes` | Código del bien inventariado |
| `invcant` | `DOUBLE PRECISION` | `yes` | Cantidad |
| `invresp` | `VARCHAR (255)` | `yes` | Resguardatario |
| `invfec` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de alta e ingreso |
| `invfec2` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de baja |
| `marca` | `VARCHAR (255)` | `yes` | Marca |
| `proveedor` | `VARCHAR (255)` | `yes` | Proveedor |
| `invcom` | `VARCHAR (255)` | `yes` | Comentarios |

### `Llamadas`

- Category: `core`
- Priority: `medium`
- Rows:`86593`
- Columns: `28`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idllc` | `SERIAL` | `yes` | Registro de correos, llamadas y visitas |
| `interll` | `VARCHAR (255)` | `yes` | Nombre del prospecto |
| `asell` | `VARCHAR (255)` | `yes` | Nombre del asesor externo |
| `inmobiliaria` | `VARCHAR (255)` | `yes` | Inmobiliaria |
| `telll` | `VARCHAR (255)` | `yes` | Teléfono |
| `tel2` | `DOUBLE PRECISION` | `yes` | Teléfono |
| `tipoll` | `VARCHAR (255) NOT NULL` | `no` | Llamada, correo o visita |
| `tipoll2` | `VARCHAR (254)` | `yes` |  |
| `operll` | `VARCHAR (255) NOT NULL` | `no` | Adquirir, ofrecer |
| `pni` | `VARCHAR (255)` | `yes` | Propiedad nueva o de Inventario |
| `correoll` | `VARCHAR (255)` | `yes` | Buzón de correo electrónico |
| `vistall` | `VARCHAR (255) NOT NULL` | `no` | Dónde vió la propiedad |
| `portalll1` | `VARCHAR (255)` | `yes` | Portal nombre comercial o corto |
| `portalll` | `VARCHAR (255)` | `yes` | Portal liga completa |
| `asesll` | `VARCHAR (255) NOT NULL` | `no` | Asesor Remax Activa |
| `fechlls` | `DATE` | `yes` | Fecha en Sistema |
| `horalls` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora en Sistema |
| `fechlll` | `DATE NOT NULL` | `no` | Fecha de Llamada, correo o visita |
| `horalll` | `TIMESTAMP WITHOUT TIME ZONE NOT NULL` | `no` | Hora de Llamada, correo o visita |
| `afechlll` | `INTEGER` | `yes` | Año de la llamada |
| `comll` | `VARCHAR (255)` | `yes` | Comentarios |
| `ascat` | `VARCHAR (255)` | `yes` | Ascenso de Prospecto a Cliente |
| `clavell` | `VARCHAR (255)` | `yes` | Clave de la propiedad del inventario |
| `domll` | `VARCHAR (255)` | `yes` | Domicilio |
| `mes` | `VARCHAR (254)` | `yes` | Mes |
| `statusll` | `VARCHAR (255) NOT NULL` | `no` | Llamada turnada a |
| `control` | `VARCHAR (255)` | `yes` |  |
| `horadato` | `VARCHAR (255)` | `yes` | Es el dato hora capturado en el Form |

### `Llamadas 2`

- Category: `core`
- Priority: `medium`
- Rows:`23316`
- Columns: `22`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idllc` | `SERIAL` | `yes` | Registro de correos, llamadas y visitas |
| `interll` | `VARCHAR (255)` | `yes` | Nombre del prospecto |
| `inmobiliaria` | `VARCHAR (255)` | `yes` | Inmobiliaria |
| `telll` | `VARCHAR (255)` | `yes` | Teléfono |
| `tel2` | `DOUBLE PRECISION` | `yes` | Teléfono |
| `tipoll` | `VARCHAR (255)` | `yes` | Llamada, correo o visita |
| `tipoll2` | `VARCHAR (254)` | `yes` |  |
| `operll` | `VARCHAR (255)` | `yes` | Adquirir, ofrecer |
| `pni` | `VARCHAR (255)` | `yes` | Propiedad nueva o de Inventario |
| `correoll` | `VARCHAR (255)` | `yes` | Buzón de correo electrónico |
| `vistall` | `VARCHAR (255)` | `yes` | Dónde vió la propiedad |
| `portalll` | `VARCHAR (255)` | `yes` | Portal |
| `asesll` | `VARCHAR (255)` | `yes` | Asesor Remax Activa |
| `fechlls` | `DATE` | `yes` | Fecha en Sistema |
| `horalls` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora en Sistema |
| `fechlll` | `DATE` | `yes` | Fecha de Llamada, correo o visita |
| `horalll` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de Llamada, correo o visita |
| `comll` | `VARCHAR (255)` | `yes` | Comentarios |
| `ascat` | `VARCHAR (255)` | `yes` | Ascenso de Prospecto a Cliente |
| `clavell` | `VARCHAR (255)` | `yes` | Clave de la propiedad del inventario |
| `domll` | `VARCHAR (255)` | `yes` | Domicilio |
| `mes` | `VARCHAR (254)` | `yes` | Mes |

### `Llamadas 3`

- Category: `core`
- Priority: `medium`
- Rows:`23316`
- Columns: `22`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idllc` | `SERIAL` | `yes` | Registro de correos, llamadas y visitas |
| `interll` | `VARCHAR (255)` | `yes` | Nombre del prospecto |
| `inmobiliaria` | `VARCHAR (255)` | `yes` | Inmobiliaria |
| `telll` | `VARCHAR (255)` | `yes` | Teléfono |
| `tel2` | `DOUBLE PRECISION` | `yes` | Teléfono |
| `tipoll` | `VARCHAR (255)` | `yes` | Llamada, correo o visita |
| `tipoll2` | `VARCHAR (254)` | `yes` |  |
| `operll` | `VARCHAR (255)` | `yes` | Adquirir, ofrecer |
| `pni` | `VARCHAR (255)` | `yes` | Propiedad nueva o de Inventario |
| `correoll` | `VARCHAR (255)` | `yes` | Buzón de correo electrónico |
| `vistall` | `VARCHAR (255)` | `yes` | Dónde vió la propiedad |
| `portalll` | `VARCHAR (255)` | `yes` | Portal |
| `asesll` | `VARCHAR (255)` | `yes` | Asesor Remax Activa |
| `fechlls` | `DATE` | `yes` | Fecha en Sistema |
| `horalls` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora en Sistema |
| `fechlll` | `DATE` | `yes` | Fecha de Llamada, correo o visita |
| `horalll` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de Llamada, correo o visita |
| `comll` | `VARCHAR (255)` | `yes` | Comentarios |
| `ascat` | `VARCHAR (255)` | `yes` | Ascenso de Prospecto a Cliente |
| `clavell` | `VARCHAR (255)` | `yes` | Clave de la propiedad del inventario |
| `domll` | `VARCHAR (255)` | `yes` | Domicilio |
| `mes` | `VARCHAR (254)` | `yes` | Mes |

### `Marketing`

- Category: `core`
- Priority: `high`
- Rows:`284`
- Columns: `19`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |
| `f12` | `VARCHAR (255)` | `yes` |  |
| `f13` | `VARCHAR (255)` | `yes` |  |
| `f14` | `VARCHAR (255)` | `yes` |  |
| `f15` | `VARCHAR (255)` | `yes` |  |
| `f16` | `VARCHAR (255)` | `yes` |  |
| `f17` | `VARCHAR (255)` | `yes` |  |
| `f18` | `VARCHAR (255)` | `yes` |  |
| `f19` | `VARCHAR (255)` | `yes` |  |

### `Marketing 080623`

- Category: `archive`
- Priority: `low`
- Rows:`587`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing 2`

- Category: `archive`
- Priority: `low`
- Rows:`587`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Abril`

- Category: `archive`
- Priority: `low`
- Rows:`396`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing abril2021`

- Category: `archive`
- Priority: `low`
- Rows:`385`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing AGO 23`

- Category: `archive`
- Priority: `low`
- Rows:`33`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Agosto`

- Category: `archive`
- Priority: `low`
- Rows:`420`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Agosto 20`

- Category: `archive`
- Priority: `low`
- Rows:`431`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Agosto 2021`

- Category: `archive`
- Priority: `low`
- Rows:`381`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Agosto-S 2021`

- Category: `archive`
- Priority: `low`
- Rows:`388`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Diciembre 2021`

- Category: `archive`
- Priority: `low`
- Rows:`527`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Enero 2022`

- Category: `archive`
- Priority: `low`
- Rows:`565`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing febrero 2021`

- Category: `archive`
- Priority: `low`
- Rows:`444`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Febrero 2024`

- Category: `archive`
- Priority: `low`
- Rows:`190`
- Columns: `19`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |
| `f12` | `VARCHAR (255)` | `yes` |  |
| `f13` | `VARCHAR (255)` | `yes` |  |
| `f14` | `VARCHAR (255)` | `yes` |  |
| `f15` | `VARCHAR (255)` | `yes` |  |
| `f16` | `VARCHAR (255)` | `yes` |  |
| `f17` | `VARCHAR (255)` | `yes` |  |
| `f18` | `VARCHAR (255)` | `yes` |  |
| `f19` | `VARCHAR (255)` | `yes` |  |

### `Marketing Julio`

- Category: `archive`
- Priority: `low`
- Rows:`406`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Julio 20`

- Category: `archive`
- Priority: `low`
- Rows:`404`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing JULIO 23`

- Category: `archive`
- Priority: `low`
- Rows:`23`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Junio`

- Category: `archive`
- Priority: `low`
- Rows:`406`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Junio 20`

- Category: `archive`
- Priority: `low`
- Rows:`366`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Junio 2021`

- Category: `archive`
- Priority: `low`
- Rows:`380`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Marzo`

- Category: `archive`
- Priority: `low`
- Rows:`397`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Marzo 20`

- Category: `archive`
- Priority: `low`
- Rows:`435`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Marzo 22`

- Category: `archive`
- Priority: `low`
- Rows:`596`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Mayo`

- Category: `archive`
- Priority: `low`
- Rows:`417`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Mayo 2021`

- Category: `archive`
- Priority: `low`
- Rows:`379`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Mayo 23`

- Category: `archive`
- Priority: `low`
- Rows:`14`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Mayo2024`

- Category: `archive`
- Priority: `low`
- Rows:`270`
- Columns: `19`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |
| `f12` | `VARCHAR (255)` | `yes` |  |
| `f13` | `VARCHAR (255)` | `yes` |  |
| `f14` | `VARCHAR (255)` | `yes` |  |
| `f15` | `VARCHAR (255)` | `yes` |  |
| `f16` | `VARCHAR (255)` | `yes` |  |
| `f17` | `VARCHAR (255)` | `yes` |  |
| `f18` | `VARCHAR (255)` | `yes` |  |
| `f19` | `VARCHAR (255)` | `yes` |  |

### `Marketing Noviembre 20`

- Category: `archive`
- Priority: `low`
- Rows:`477`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Noviembre 2019`

- Category: `archive`
- Priority: `low`
- Rows:`427`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Noviembre 2021`

- Category: `archive`
- Priority: `low`
- Rows:`466`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing NOVIEMBRE 2023`

- Category: `archive`
- Priority: `low`
- Rows:`103`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Octubre 20`

- Category: `archive`
- Priority: `low`
- Rows:`452`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Octubre 2021`

- Category: `archive`
- Priority: `low`
- Rows:`431`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Octubre 2023`

- Category: `archive`
- Priority: `low`
- Rows:`103`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Septiembre 2019`

- Category: `archive`
- Priority: `low`
- Rows:`423`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Septiembre 2021`

- Category: `archive`
- Priority: `low`
- Rows:`404`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Marketing Septiembre 2023`

- Category: `archive`
- Priority: `low`
- Rows:`67`
- Columns: `11`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idm` | `SERIAL` | `yes` | Registro |
| `fechamark` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesmark` | `VARCHAR (254)` | `yes` | Mes |
| `añomark` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `clavemark` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `consecmark` | `VARCHAR (255)` | `yes` | Número Consecutivo |
| `ligamark` | `INTEGER` | `yes` | Liga a e-mailing |
| `ncontac` | `DOUBLE PRECISION` | `yes` | Número de Contactos |
| `pcontac` | `INTEGER` | `yes` | Porcentaje de apertura |
| `statusm` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `MinutaCambios`

- Category: `reference`
- Priority: `low`
- Rows:`23`
- Columns: `4`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idpch` | `SERIAL` | `yes` | Registro de cambios para minuta |
| `clavechoprop` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `fechach` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del cambio |
| `cambioprop` | `VARCHAR (255)` | `yes` | Cambio en la información de la propiedad |

### `MinutaFechasEscP`

- Category: `reference`
- Priority: `low`
- Rows:`9`
- Columns: `4`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idfep` | `SERIAL` | `yes` | Registro |
| `clavefep` | `VARCHAR (255)` | `yes` |  |
| `fechafep` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` |  |
| `epesc` | `BOOLEAN NOT NULL` | `no` |  |

### `MinutasDetlOK`

- Category: `reference`
- Priority: `low`
- Rows:`0`
- Columns: `3`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idmind` | `SERIAL` | `yes` | Registro de minutas |
| `cmind` | `VARCHAR (255)` | `yes` | Clave de minutas |
| `nmind` | `VARCHAR (255)` | `yes` | Nota |

### `MinutasGralOK`

- Category: `reference`
- Priority: `low`
- Rows:`0`
- Columns: `4`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idmin` | `SERIAL` | `yes` | Registro de minutas |
| `cmin` | `VARCHAR (255)` | `yes` | Clave de minutas |
| `fmin` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de la minuta |
| `rmin` | `VARCHAR (255)` | `yes` | Nombre de la reunión |

### `Moneda`

- Category: `reference`
- Priority: `medium`
- Rows:`2`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `moneda` | `VARCHAR (255)` | `yes` |  |

### `MovAdmon`

- Category: `core`
- Priority: `medium`
- Rows:`5`
- Columns: `19`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `iddetadmon` | `SERIAL` | `yes` | Registro detalle de movimientos de administración |
| `movdet` | `VARCHAR (255)` | `yes` | Movimiento Ingreso o egreso |
| `dirind` | `VARCHAR (255)` | `yes` | Directo, Indirecto, Otro |
| `categoría` | `VARCHAR (255)` | `yes` | Corretaje, Consultoría Admon Rentas, oficina, Remax México, Publicidad, Servicios |
| `concepto` | `VARCHAR (255)` | `yes` | Concepto |
| `persona` | `VARCHAR (255)` | `yes` | Física o Moral |
| `tipo` | `VARCHAR (255)` | `yes` | Cobro, Pago, Reembolso |
| `doc` | `VARCHAR (255)` | `yes` | Factura, Nota, ticket, Recibo, Reembolso |
| `folio` | `VARCHAR (255)` | `yes` | Folio o número de referencia |
| `nombre` | `VARCHAR (255)` | `yes` | Nombre o razón social |
| `fechaconc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del documento |
| `importe` | `NUMERIC(15,2)` | `yes` | Importe |
| `iva` | `NUMERIC (39)` | `yes` | IVA |
| `ieps` | `NUMERIC(15,2)` | `yes` | IEPS |
| `isr` | `NUMERIC(15,2)` | `yes` | ISR |
| `otroimpuesto` | `NUMERIC(15,2)` | `yes` | Otro impuesto |
| `total` | `NUMERIC (39)` | `yes` | Total |
| `movcom` | `VARCHAR (255)` | `yes` | Comentarios |
| `clave` | `VARCHAR (255)` | `yes` | Clave de la propiedad asociada |

### `Municipios`

- Category: `reference`
- Priority: `medium`
- Rows:`2318`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `municipio` | `VARCHAR (255)` | `yes` |  |

### `NotaríasEsc`

- Category: `reference`
- Priority: `medium`
- Rows:`25`
- Columns: `8`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idnotar` | `SERIAL` | `yes` | Registro |
| `cnot` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `abogado` | `VARCHAR (255)` | `yes` | Abogado o contacto de Notaría |
| `notaría` | `VARCHAR (255)` | `yes` | Notaría que tramita la escritura |
| `notario` | `VARCHAR (255)` | `yes` | Nombre del Notario |
| `valuador` | `VARCHAR (255)` | `yes` | Valuador |
| `gestor hip` | `VARCHAR (255)` | `yes` | Gestor Hipotecario |
| `comnot` | `VARCHAR (255)` | `yes` | Comentarios sobre la notaría |

### `Ofertas`

- Category: `core`
- Priority: `high`
- Rows:`2112`
- Columns: `48`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idofertas` | `SERIAL` | `yes` | Registro de ofertas |
| `coferta` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `domof` | `VARCHAR (255)` | `yes` | Domicilio |
| `idgoferta` | `VARCHAR (254)` | `yes` | Clave de la oferta |
| `pintext` | `VARCHAR (255)` | `yes` | Propiedad interna o externa |
| `fecof` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de la oferta |
| `horof` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de la oferta |
| `fecof2` | `DATE` | `yes` | Fecha de aceptación de la oferta |
| `fecofcancel` | `DATE` | `yes` | Fecha de cancelación de la oferta |
| `asesor` | `VARCHAR (255)` | `yes` | Asesor interno que presenta la oferta |
| `asesorext` | `VARCHAR (255)` | `yes` | Asesor externo que presenta la oferta |
| `aseintex` | `VARCHAR (255)` | `yes` | Asesor interno o externo |
| `ofertante` | `VARCHAR (255)` | `yes` | Prospecto comprador u ofertante |
| `montoof` | `NUMERIC(15,2)` | `yes` | Monto de la oferta |
| `monof` | `VARCHAR (255)` | `yes` | Moneda M.N. o Dólares |
| `formpago` | `VARCHAR (255)` | `yes` | Forma de pago para la compra |
| `monocof` | `NUMERIC(15,2)` | `yes` | Monto de la contra oferta |
| `statusofe` | `VARCHAR (255)` | `yes` | Aceptada, presentada, rechazada, contraoferta |
| `apoferta` | `BOOLEAN NOT NULL` | `no` | Aplica Penalización sobre la oferta |
| `cpar` | `BOOLEAN NOT NULL` | `no` | Penalización calculada y registrada |
| `statusofe2` | `VARCHAR (254)` | `yes` | Status para informe cliente |
| `respof` | `BOOLEAN NOT NULL` | `no` | Respaldo |
| `metpagof` | `VARCHAR (255)` | `yes` | Método de pago Efectivo, cheque, transferencia, depósito, sin respaldo |
| `respmont` | `NUMERIC(15,2)` | `yes` | Monto del respaldo ofrecido |
| `statresp` | `VARCHAR (255)` | `yes` | Conservado, devuelto |
| `fdelresp` | `DATE` | `yes` | Fecha devolución de respaldo |
| `respalesp` | `BOOLEAN NOT NULL` | `no` | Hacer escepción con el estatus del resguardo, se conserva auqneu la propiedad esté cerrada o cancelada |
| `origenof` | `VARCHAR (255)` | `yes` | Guardia o Asesor |
| `origof` | `VARCHAR (255)` | `yes` | Origen oferta |
| `origof2` | `VARCHAR (255)` | `yes` | Origen de internet, periodico o redes sociales |
| `refcerre` | `BOOLEAN NOT NULL` | `no` | Referido Cierre |
| `nomref` | `VARCHAR (255)` | `yes` | Nombre del Referido |
| `empref` | `VARCHAR (255)` | `yes` | Empresa del referido |
| `lacrefc` | `VARCHAR (255)` | `yes` | Lado CIERRE |
| `perrefc` | `VARCHAR (255)` | `yes` | Persona Física o Moral Cierre |
| `facrefc` | `BOOLEAN NOT NULL` | `no` | Factura Cierre |
| `faccrefc` | `VARCHAR (255)` | `yes` | Concepto por Honorarios o Comisionista |
| `fpagrefc` | `VARCHAR (255)` | `yes` | Forma de Pago Cierre |
| `vprefc` | `VARCHAR (255)` | `yes` | Vía de Pago Cierre |
| `fecprefcc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de pago de comisión Cierre |
| `eproy` | `VARCHAR (255)` | `yes` | Estatus para proyección de ingreso por comisión |
| `docof` | `Unknown_0012` | `yes` |  |
| `comofe` | `VARCHAR (255)` | `yes` | Comentarios sobre la oferta |
| `sicomppena` | `BOOLEAN NOT NULL` | `no` | Comparte penalización con propietario? Sí/No |
| `asigmonto` | `BOOLEAN NOT NULL` | `no` | Asigna el total del monto a un Asesor? |
| `ppena` | `DOUBLE PRECISION` | `yes` | Porcentaje de compartición con propietario |
| `mpena` | `NUMERIC (39)` | `yes` | Monto de penalización para repartir |
| `cierracoop` | `BOOLEAN NOT NULL` | `no` | Señala si el que cierra es un Coop |

### `OfertasAsesores`

- Category: `core`
- Priority: `high`
- Rows:`2155`
- Columns: `24`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idsuboase` | `SERIAL` | `yes` |  |
| `claveoferta` | `VARCHAR (255)` | `yes` |  |
| `clavoprop` | `VARCHAR (255)` | `yes` |  |
| `asesoroferta` | `VARCHAR (255)` | `yes` |  |
| `nasesoroferta` | `VARCHAR (255)` | `yes` |  |
| `asesorextoferta` | `VARCHAR (255)` | `yes` |  |
| `asesorrdef` | `VARCHAR (254)` | `yes` | Asesor definitivo |
| `nivelao` | `VARCHAR (254)` | `yes` |  |
| `cpcmc` | `INTEGER NOT NULL` | `no` | Opción de Porcentaje o Monto |
| `cpparti2` | `DOUBLE PRECISION NOT NULL` | `no` | Porcentaje de participación |
| `cpparti2b` | `DOUBLE PRECISION` | `yes` | Participación del asesor |
| `cmparti2` | `NUMERIC(15,2)` | `yes` | Monto que se le asigna al asesor |
| `lacom2` | `VARCHAR (255)` | `yes` | Lado CIERRE |
| `perac` | `VARCHAR (255)` | `yes` | Persona Física o Moral Cierre |
| `resiscoaofertas` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal |
| `facac` | `BOOLEAN NOT NULL` | `no` | Factura Cierre |
| `facconac` | `VARCHAR (255)` | `yes` | Concepto por Honorarios o Comisionista |
| `fpcc` | `VARCHAR (255)` | `yes` | Forma de Pago Cierre |
| `vpc` | `VARCHAR (255)` | `yes` | Vía de Pago Cierre |
| `fpc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de pago de comisión Cierre |
| `napc` | `INTEGER` | `yes` | Número de posición del asesor de cierre en el proyecto |
| `fpcpen` | `DATE` | `yes` | Fecha de Pago de Penalización de la oferta |
| `anrcof` | `BOOLEAN NOT NULL` | `no` | Anular registro de las comisiones |
| `aracof` | `BOOLEAN NOT NULL` | `no` | Aplicación especial de retención administrativa |

### `OperaProp`

- Category: `reference`
- Priority: `medium`
- Rows:`9`
- Columns: `2`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `operprop` | `VARCHAR (255)` | `yes` |  |
| `campo1` | `VARCHAR (255)` | `yes` |  |

### `Origen`

- Category: `reference`
- Priority: `medium`
- Rows:`15`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `origen` | `VARCHAR (255)` | `yes` |  |

### `Origen2`

- Category: `reference`
- Priority: `medium`
- Rows:`50`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `origen` | `VARCHAR (255)` | `yes` |  |

### `PagosParciales`

- Category: `core`
- Priority: `medium`
- Rows:`23`
- Columns: `8`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idpp` | `SERIAL` | `yes` | Registro |
| `clavepp` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `dompp` | `VARCHAR (255)` | `yes` | Domicilio |
| `npago` | `INTEGER` | `yes` | Número de pago |
| `monto` | `NUMERIC(15,2)` | `yes` | Monto del pago Parcial |
| `fecmp` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del cobro parcial |
| `statuspp` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |
| `compp` | `VARCHAR (255)` | `yes` | Comentarios |

### `PagosParcialesCierre`

- Category: `core`
- Priority: `medium`
- Rows:`24`
- Columns: `21`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idppc` | `SERIAL` | `yes` | Registro pago parcial cierre |
| `claveppc` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `asesorc` | `VARCHAR (255)` | `yes` | Asesor cierre |
| `nivelac` | `VARCHAR (255)` | `yes` | Nivel de asesor de cierre |
| `napc` | `INTEGER` | `yes` | Posición |
| `cpparti2c` | `DOUBLE PRECISION` | `yes` | Participación |
| `npagoppc` | `INTEGER` | `yes` | Número de pago |
| `porcpac` | `DOUBLE PRECISION` | `yes` | Porcentaje de pago para asesor cierre |
| `comitotalc` | `NUMERIC(15,2)` | `yes` | Comisión total asesor de cierre |
| `montoppc` | `DOUBLE PRECISION` | `yes` | Monto del pago Parcial asesor cierre |
| `fecppc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del cobro parcial cierre |
| `factppc` | `BOOLEAN NOT NULL` | `no` | Factura Sí/No |
| `perppc` | `VARCHAR (255)` | `yes` | Persona Física o Moral cierre |
| `resiscoppcierre` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal |
| `concppc` | `VARCHAR (255)` | `yes` | Concepto Honorarios, Comisión, Consultoría, Socio |
| `formppc` | `VARCHAR (255)` | `yes` | Forma de Pago |
| `viappc` | `VARCHAR (255)` | `yes` | Vía de pago Directa o por administradora |
| `fechppc` | `DATE` | `yes` | Fecha de pago de comisión parcial |
| `conppc` | `VARCHAR (255)` | `yes` | Concepto cierre |
| `lacomc` | `VARCHAR (255)` | `yes` | Concepto cierre 2 |
| `comppc` | `VARCHAR (255)` | `yes` | Comentarios |

### `PagosParcialesExc`

- Category: `core`
- Priority: `medium`
- Rows:`30`
- Columns: `21`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idppe` | `SERIAL` | `yes` | Registro pago parcial exclusiva |
| `claveppe` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `asesorppe` | `VARCHAR (255)` | `yes` | Asesor Exclusiva |
| `nivele` | `VARCHAR (255)` | `yes` | Nivel del asesor exclusiva |
| `nape` | `INTEGER` | `yes` | Posición |
| `cpparti2e` | `DOUBLE PRECISION` | `yes` | Participación |
| `npagoppe` | `INTEGER` | `yes` | Número de pago |
| `comitotale` | `NUMERIC(15,2)` | `yes` | Comisión total asesor de exclusiva |
| `porcpae` | `DOUBLE PRECISION` | `yes` | Porcentaje de pago para asesor exclusiva |
| `montoppe` | `DOUBLE PRECISION` | `yes` | Monto parcial calculado |
| `fechappe` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del cobro parcial |
| `factppe` | `BOOLEAN NOT NULL` | `no` | Factura Sí/No |
| `perppe` | `VARCHAR (255)` | `yes` | Persona Física o Moral |
| `resiscoppexc` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal |
| `concppe` | `VARCHAR (255)` | `yes` | Concepto Honorarios, Comisión, Consultoría, Socio |
| `formppe` | `VARCHAR (255)` | `yes` | Forma de Pago |
| `viappe` | `VARCHAR (255)` | `yes` | Vía de pago Directa o por administradora |
| `fechppe` | `DATE` | `yes` | Fecha de pago de comisión parcial |
| `conppe` | `VARCHAR (255)` | `yes` | Concepto exclusiva |
| `lacome` | `VARCHAR (255)` | `yes` | Concepto exclusiva 2 |
| `comppe` | `VARCHAR (255)` | `yes` | Comentarios |

### `PagosParcialesRefCierre`

- Category: `core`
- Priority: `medium`
- Rows:`1`
- Columns: `22`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idpprc` | `SERIAL` | `yes` | Registro pago parcial referido cierre |
| `clavepprc` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `asesorrc` | `VARCHAR (255)` | `yes` | Asesor referido de cierre |
| `nivelrc` | `VARCHAR (255)` | `yes` | Nivel de asesor referido de cierre |
| `naprc` | `INTEGER` | `yes` | Posición |
| `cpparti2rc` | `DOUBLE PRECISION` | `yes` | Participación |
| `npagopprc` | `INTEGER` | `yes` | Número de pago |
| `comitotalrc` | `NUMERIC(15,2)` | `yes` | Comisión total referido de cierre |
| `porcpprc` | `DOUBLE PRECISION` | `yes` | Porcentaje de pago para  referido cierre |
| `montopprc` | `DOUBLE PRECISION` | `yes` | Monto del pago Parcial  referido cierre |
| `fechapprc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del cobro parcial |
| `factpprc` | `BOOLEAN NOT NULL` | `no` | Factura Sí/No |
| `perpprc` | `VARCHAR (255)` | `yes` | Persona Física o Moral |
| `resiscopprefcierre` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal |
| `concpprc` | `VARCHAR (255)` | `yes` | Concepto Honorarios, Comisión, Consultoría, Socio |
| `formpprc` | `VARCHAR (255)` | `yes` | Forma de Pago |
| `viapprc` | `VARCHAR (255)` | `yes` | Vía de pago Directa o por administradora |
| `fechpprc` | `DATE` | `yes` | Fecha de pago de comisión parcial |
| `conpprc` | `VARCHAR (255)` | `yes` | Concepto referido cierre |
| `conpprc2` | `VARCHAR (255)` | `yes` | Concepto referido cierre 2 |
| `lacomrc` | `VARCHAR (255)` | `yes` | Lado |
| `compprc` | `VARCHAR (255)` | `yes` | Comentarios |

### `PenalizaOfertas`

- Category: `core`
- Priority: `medium`
- Rows:`0`
- Columns: `10`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idpo` | `SERIAL` | `yes` | Registro de penalización de ofertas |
| `claveoferta` | `VARCHAR (255)` | `yes` | Clave de Oferta |
| `clavepropof` | `VARCHAR (255)` | `yes` | Clave de propiedad |
| `ofertante` | `VARCHAR (255)` | `yes` | Empresa que paga |
| `tipoop` | `VARCHAR (255)` | `yes` | Tipo de operación |
| `valorapart` | `NUMERIC(15,2)` | `yes` | Valor del apartado penalizado |
| `fechaofp` | `DATE` | `yes` | Fecha de la oferta |
| `fechaap` | `DATE` | `yes` | Fecha de la aplicación de la penalización |
| `conceptop` | `VARCHAR (255)` | `yes` | Concepto Penalización de oferta |
| `comp` | `VARCHAR (255)` | `yes` | Comentarios |

### `PenalOfertas`

- Category: `core`
- Priority: `medium`
- Rows:`1`
- Columns: `22`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idpen` | `SERIAL` | `yes` | Registro |
| `clnoferta` | `VARCHAR (255)` | `yes` | Clave de oferta |
| `clavepen` | `VARCHAR (255)` | `yes` | Clave penalizaciones |
| `dompen` | `VARCHAR (255)` | `yes` | Domicilio |
| `fpen` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha |
| `fecpen` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de aplicación de la penalización |
| `montopen` | `NUMERIC(15,2)` | `yes` | Monto de apartado |
| `montopenc` | `NUMERIC(15,2)` | `yes` | Monto de apartado asignado |
| `montopen3` | `NUMERIC(15,2)` | `yes` | Monto de apartado asignado confirmado |
| `montopen4` | `DOUBLE PRECISION` | `yes` | Monto penalización para Remax y para Propietario |
| `montopen5` | `DOUBLE PRECISION` | `yes` | Monto penalización por lado para repartir entre Remax y asesores |
| `origenpen` | `VARCHAR (255)` | `yes` | Origen de la Oferta |
| `porigp` | `DOUBLE PRECISION` | `yes` | Porcentaje para Referido |
| `morigp` | `DOUBLE PRECISION` | `yes` | Monto para Referido |
| `montopen2` | `DOUBLE PRECISION` | `yes` | Monto de apartado despues de Referido |
| `montopenf` | `NUMERIC (39)` | `yes` | Monto de apartado para Franquicia |
| `mpenrem` | `NUMERIC (39)` | `yes` | Monto para repartir entre Remax y Asesores |
| `prem` | `DOUBLE PRECISION` | `yes` | Porcentaje Remax |
| `pprop` | `DOUBLE PRECISION` | `yes` | Porcentaje Propietario |
| `mprem` | `NUMERIC (39)` | `yes` | Monto para Remax Activa |
| `mpprop` | `NUMERIC (39)` | `yes` | Monto para Propietario |
| `compen` | `VARCHAR (255)` | `yes` | Comentarios |

### `Portal actividad Agosto 2019`

- Category: `archive`
- Priority: `low`
- Rows:`119`
- Columns: `19`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idp` | `SERIAL` | `yes` | Registro |
| `fechainf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesport` | `VARCHAR (254)` | `yes` | Mes |
| `añoport` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `valorport` | `NUMERIC(15,2)` | `yes` | Valor de la propiedad |
| `claveportalin` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `remax` | `INTEGER` | `yes` | Número de visitas al portal Remax |
| `ampi` | `INTEGER` | `yes` | Número de visitas al portal AMPI Guadalajara |
| `inm24` | `INTEGER` | `yes` | Número de visitas al portal Inmuebles 24 |
| `mcub` | `INTEGER` | `yes` | Número de visitas al portal Metros Cúbicos |
| `ml` | `INTEGER` | `yes` | Número de visitas al portal Mercado Libre |
| `cyt` | `INTEGER` | `yes` | Número de visitas al portal Casas y Terrenos |
| `sm` | `INTEGER` | `yes` | Número de visitas al portal Segunda Mano |
| `nock` | `INTEGER` | `yes` | Número de visitas al portal Nocknok |
| `inm` | `INTEGER` | `yes` | Número de visitas al portal Inmobiliarias |
| `lamudi` | `INTEGER` | `yes` | Número de visitas al portal Lamudi |
| `viva` | `INTEGER` | `yes` | Número de visitas al portal Vivanuncios |
| `statusp` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Portal actividad Julio 2019`

- Category: `archive`
- Priority: `low`
- Rows:`107`
- Columns: `19`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idp` | `SERIAL` | `yes` | Registro |
| `fechainf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesport` | `VARCHAR (254)` | `yes` | Mes |
| `añoport` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `valorport` | `NUMERIC(15,2)` | `yes` | Valor de la propiedad |
| `claveportalin` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `remax` | `INTEGER` | `yes` | Número de visitas al portal Remax |
| `ampi` | `INTEGER` | `yes` | Número de visitas al portal AMPI Guadalajara |
| `inm24` | `INTEGER` | `yes` | Número de visitas al portal Inmuebles 24 |
| `mcub` | `INTEGER` | `yes` | Número de visitas al portal Metros Cúbicos |
| `ml` | `INTEGER` | `yes` | Número de visitas al portal Mercado Libre |
| `cyt` | `INTEGER` | `yes` | Número de visitas al portal Casas y Terrenos |
| `sm` | `INTEGER` | `yes` | Número de visitas al portal Segunda Mano |
| `nock` | `INTEGER` | `yes` | Número de visitas al portal Nocknok |
| `inm` | `INTEGER` | `yes` | Número de visitas al portal Inmobiliarias |
| `lamudi` | `INTEGER` | `yes` | Número de visitas al portal Lamudi |
| `viva` | `INTEGER` | `yes` | Número de visitas al portal Vivanuncios |
| `statusp` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Portal actividad Junio 2019`

- Category: `archive`
- Priority: `low`
- Rows:`107`
- Columns: `19`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idp` | `SERIAL` | `yes` | Registro |
| `fechainf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesport` | `VARCHAR (254)` | `yes` | Mes |
| `añoport` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `valorport` | `NUMERIC(15,2)` | `yes` | Valor de la propiedad |
| `claveportalin` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `remax` | `INTEGER` | `yes` | Número de visitas al portal Remax |
| `ampi` | `INTEGER` | `yes` | Número de visitas al portal AMPI Guadalajara |
| `inm24` | `INTEGER` | `yes` | Número de visitas al portal Inmuebles 24 |
| `mcub` | `INTEGER` | `yes` | Número de visitas al portal Metros Cúbicos |
| `ml` | `INTEGER` | `yes` | Número de visitas al portal Mercado Libre |
| `cyt` | `INTEGER` | `yes` | Número de visitas al portal Casas y Terrenos |
| `sm` | `INTEGER` | `yes` | Número de visitas al portal Segunda Mano |
| `nock` | `INTEGER` | `yes` | Número de visitas al portal Nocknok |
| `inm` | `INTEGER` | `yes` | Número de visitas al portal Inmobiliarias |
| `lamudi` | `INTEGER` | `yes` | Número de visitas al portal Lamudi |
| `viva` | `INTEGER` | `yes` | Número de visitas al portal Vivanuncios |
| `statusp` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Portales actividad Abril 2019`

- Category: `archive`
- Priority: `low`
- Rows:`100`
- Columns: `17`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idp` | `SERIAL` | `yes` |  |
| `fechainf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` |  |
| `domicipor` | `VARCHAR (255)` | `yes` |  |
| `valorport` | `NUMERIC(15,2)` | `yes` |  |
| `claveportalin` | `VARCHAR (255)` | `yes` |  |
| `remax` | `INTEGER` | `yes` |  |
| `ampi` | `INTEGER` | `yes` |  |
| `inm24` | `INTEGER` | `yes` |  |
| `mcub` | `INTEGER` | `yes` |  |
| `ml` | `INTEGER` | `yes` |  |
| `cyt` | `INTEGER` | `yes` |  |
| `sm` | `INTEGER` | `yes` |  |
| `nock` | `INTEGER` | `yes` |  |
| `inm` | `INTEGER` | `yes` |  |
| `lamudi` | `INTEGER` | `yes` |  |
| `viva` | `INTEGER` | `yes` |  |
| `statusp` | `VARCHAR (255)` | `yes` |  |

### `Portales actividad Enero 2019`

- Category: `archive`
- Priority: `low`
- Rows:`119`
- Columns: `17`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idp` | `SERIAL` | `yes` |  |
| `fechainf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` |  |
| `domicipor` | `VARCHAR (255)` | `yes` |  |
| `valorport` | `NUMERIC(15,2)` | `yes` |  |
| `claveportalin` | `VARCHAR (255)` | `yes` |  |
| `remax` | `INTEGER` | `yes` |  |
| `ampi` | `INTEGER` | `yes` |  |
| `inm24` | `INTEGER` | `yes` |  |
| `mcub` | `INTEGER` | `yes` |  |
| `ml` | `INTEGER` | `yes` |  |
| `cyt` | `INTEGER` | `yes` |  |
| `sm` | `INTEGER` | `yes` |  |
| `nock` | `INTEGER` | `yes` |  |
| `inm` | `INTEGER` | `yes` |  |
| `lamudi` | `INTEGER` | `yes` |  |
| `viva` | `INTEGER` | `yes` |  |
| `statusp` | `VARCHAR (255)` | `yes` |  |

### `Portales actividad Marzo 2019`

- Category: `archive`
- Priority: `low`
- Rows:`103`
- Columns: `19`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idp` | `SERIAL` | `yes` | Registro |
| `fechainf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesport` | `VARCHAR (254)` | `yes` | Mes |
| `añoport` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `valorport` | `NUMERIC(15,2)` | `yes` | Valor de la propiedad |
| `claveportalin` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `remax` | `INTEGER` | `yes` | Número de visitas al portal Remax |
| `ampi` | `INTEGER` | `yes` | Número de visitas al portal AMPI Guadalajara |
| `inm24` | `INTEGER` | `yes` | Número de visitas al portal Inmuebles 24 |
| `mcub` | `INTEGER` | `yes` | Número de visitas al portal Metros Cúbicos |
| `ml` | `INTEGER` | `yes` | Número de visitas al portal Mercado Libre |
| `cyt` | `INTEGER` | `yes` | Número de visitas al portal Casas y Terrenos |
| `sm` | `INTEGER` | `yes` | Número de visitas al portal Segunda Mano |
| `nock` | `INTEGER` | `yes` | Número de visitas al portal Nocknok |
| `inm` | `INTEGER` | `yes` | Número de visitas al portal Inmobiliarias |
| `lamudi` | `INTEGER` | `yes` | Número de visitas al portal Lamudi |
| `viva` | `INTEGER` | `yes` | Número de visitas al portal Vivanuncios |
| `statusp` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Portales Actividad Mayo 2019`

- Category: `archive`
- Priority: `low`
- Rows:`103`
- Columns: `19`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idp` | `SERIAL` | `yes` | Registro |
| `fechainf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesport` | `VARCHAR (254)` | `yes` | Mes |
| `añoport` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `valorport` | `NUMERIC(15,2)` | `yes` | Valor de la propiedad |
| `claveportalin` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `remax` | `INTEGER` | `yes` | Número de visitas al portal Remax |
| `ampi` | `INTEGER` | `yes` | Número de visitas al portal AMPI Guadalajara |
| `inm24` | `INTEGER` | `yes` | Número de visitas al portal Inmuebles 24 |
| `mcub` | `INTEGER` | `yes` | Número de visitas al portal Metros Cúbicos |
| `ml` | `INTEGER` | `yes` | Número de visitas al portal Mercado Libre |
| `cyt` | `INTEGER` | `yes` | Número de visitas al portal Casas y Terrenos |
| `sm` | `INTEGER` | `yes` | Número de visitas al portal Segunda Mano |
| `nock` | `INTEGER` | `yes` | Número de visitas al portal Nocknok |
| `inm` | `INTEGER` | `yes` | Número de visitas al portal Inmobiliarias |
| `lamudi` | `INTEGER` | `yes` | Número de visitas al portal Lamudi |
| `viva` | `INTEGER` | `yes` | Número de visitas al portal Vivanuncios |
| `statusp` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `Portales Actividad Septiembre 2019`

- Category: `archive`
- Priority: `low`
- Rows:`14141`
- Columns: `21`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idp` | `SERIAL` | `yes` | Registro |
| `fechainf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesport` | `VARCHAR (254)` | `yes` | Mes |
| `añoport` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `valorport` | `NUMERIC(15,2)` | `yes` | Valor de la propiedad |
| `claveportalin` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `remax` | `INTEGER` | `yes` | Número de visitas al portal Remax |
| `ampi` | `INTEGER` | `yes` | Número de visitas al portal AMPI Guadalajara |
| `inm24` | `INTEGER` | `yes` | Número de visitas al portal Inmuebles 24 |
| `easybroker` | `INTEGER` | `yes` | Número de visitas al portal EasyBroker |
| `wiggot` | `INTEGER` | `yes` | Número de visitas al portal Wiggot |
| `mcub` | `INTEGER` | `yes` | Número de visitas al portal Metros Cúbicos |
| `ml` | `INTEGER` | `yes` | Número de visitas al portal Mercado Libre |
| `cyt` | `INTEGER` | `yes` | Número de visitas al portal Casas y Terrenos |
| `sm` | `INTEGER` | `yes` | Número de visitas al portal Segunda Mano |
| `nock` | `INTEGER` | `yes` | Número de visitas al portal Nocknok |
| `inm` | `INTEGER` | `yes` | Número de visitas al portal Inmobiliarias |
| `lamudi` | `INTEGER` | `yes` | Número de visitas al portal Lamudi |
| `viva` | `INTEGER` | `yes` | Número de visitas al portal Vivanuncios |
| `statusp` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `PortalesOK`

- Category: `archive`
- Priority: `low`
- Rows:`51`
- Columns: `2`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `portal` | `VARCHAR (255) NOT NULL` | `no` | Portal |
| `portalliga` | `VARCHAR (255)` | `yes` | Portal liga completa |

### `PortalInforme`

- Category: `core`
- Priority: `medium`
- Rows:`229`
- Columns: `21`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idp` | `SERIAL` | `yes` | Registro |
| `fechainf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de registro |
| `mesport` | `VARCHAR (254)` | `yes` | Mes |
| `añoport` | `INTEGER` | `yes` | Año |
| `domicipor` | `VARCHAR (255)` | `yes` | Domicilio |
| `valorport` | `NUMERIC(15,2)` | `yes` | Valor de la propiedad |
| `claveportalin` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `remax` | `INTEGER` | `yes` | Número de visitas al portal Remax |
| `ampi` | `INTEGER` | `yes` | Número de visitas al portal AMPI Guadalajara |
| `inm24` | `INTEGER` | `yes` | Número de visitas al portal Inmuebles 24 |
| `easybroker` | `INTEGER` | `yes` | Número de visitas al portal EasyBroker |
| `wiggot` | `INTEGER` | `yes` | Número de visitas al portal Wiggot |
| `mcub` | `INTEGER` | `yes` | Número de visitas al portal Metros Cúbicos |
| `ml` | `INTEGER` | `yes` | Número de visitas al portal Mercado Libre |
| `cyt` | `INTEGER` | `yes` | Número de visitas al portal Casas y Terrenos |
| `sm` | `INTEGER` | `yes` | Número de visitas al portal Segunda Mano |
| `nock` | `INTEGER` | `yes` | Número de visitas al portal Nocknok |
| `inm` | `INTEGER` | `yes` | Número de visitas al portal Inmobiliarias |
| `lamudi` | `INTEGER` | `yes` | Número de visitas al portal Lamudi |
| `viva` | `INTEGER` | `yes` | Número de visitas al portal Vivanuncios |
| `statusp` | `VARCHAR (255)` | `yes` | Estatus de la propiedad |

### `ProgActiv`

- Category: `reference`
- Priority: `low`
- Rows:`289`
- Columns: `10`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idprogact` | `SERIAL` | `yes` | Registro de actividades programadas |
| `claveactiv` | `VARCHAR (255)` | `yes` | Clave de la actividad |
| `program` | `VARCHAR (255)` | `yes` | Junta, recorrido, curso, open house, otro |
| `titprog` | `VARCHAR (255)` | `yes` | Tema o título del evento |
| `fprog` | `DATE` | `yes` | Fecha del evento |
| `hprg` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora del evento |
| `costact` | `NUMERIC(15,2)` | `yes` | Costo del recorrido o actividad |
| `improg` | `VARCHAR (255)` | `yes` | Nivel de importancia de asistencia |
| `clprog` | `VARCHAR (255)` | `yes` | Clave de la propiedad si es una actividad relacionada |
| `comact` | `VARCHAR (255)` | `yes` | Comentarios |

### `PropAdmRenta`

- Category: `reference`
- Priority: `low`
- Rows:`25`
- Columns: `5`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idproprent` | `SERIAL` | `yes` |  |
| `claveproprent` | `VARCHAR (255)` | `yes` |  |
| `clpr2` | `VARCHAR (255)` | `yes` |  |
| `clpr3` | `VARCHAR (254)` | `yes` |  |
| `domproprent` | `VARCHAR (255)` | `yes` |  |

### `PROPIEDADES`

- Category: `core`
- Priority: `high`
- Rows:`2900`
- Columns: `132`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idprop` | `SERIAL` | `yes` | Registro detalles de la propiedad |
| `claveprop` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `claveprop2` | `TEXT` | `yes` | Hipervínculo a Remax |
| `lgearth` | `TEXT` | `yes` | Hipervínculo a Google Earth |
| `consec` | `VARCHAR (255)` | `yes` | Numero consecutivo de la propiedad |
| `consec2` | `INTEGER` | `yes` | Numero consecutivo de la propiedad numérico |
| `clavepropor` | `VARCHAR (255)` | `yes` | Clave de la propiedad Original |
| `clavepropor2` | `INTEGER` | `yes` | Clave de la propiedad Original para productividad |
| `statusprop` | `VARCHAR (255)` | `yes` | Status de la propiedad |
| `statusprop2` | `VARCHAR (254)` | `yes` | Status ALTA o BAJA de a propiedad |
| `origen` | `VARCHAR (255)` | `yes` | Origen de ALTA 1 |
| `origen2` | `VARCHAR (255)` | `yes` | Origen de ALTA 2 |
| `idref` | `INTEGER` | `yes` | Id de referido |
| `origperra` | `VARCHAR (255)` | `yes` | Origen referido nombre |
| `origempra` | `VARCHAR (255)` | `yes` | Origen referido empresa |
| `colgrl` | `VARCHAR (255)` | `yes` | Colonia |
| `colgrl2` | `VARCHAR (255)` | `yes` | Ruta FT PDF |
| `rftpdf` | `VARCHAR (255)` | `yes` | Nombre archivo FT |
| `rftpdf1` | `VARCHAR (254)` | `yes` | Concatenación de ruta y nombre FT |
| `ftpdf2` | `TEXT` | `yes` | Hipervínculo a Ficha técnica PDF en Dropbox |
| `catgral1` | `VARCHAR (255)` | `yes` | Categoría de inventario Residencial, Comercial, Industrial |
| `catgral2` | `VARCHAR (255)` | `yes` | Exclusiva, Opción, Coop, Bancomer |
| `catgral3` | `VARCHAR (254)` | `yes` |  |
| `desarrollo` | `BOOLEAN NOT NULL` | `no` | Determinar si es una propiedad normal o es parte de un desarollo |
| `girogral` | `VARCHAR (255)` | `yes` | Residencial, Comercial, Industrial, Agrícola, Ganadero, etc |
| `girogral2` | `VARCHAR (255)` | `yes` |  |
| `tipogral` | `VARCHAR (255)` | `yes` | Casa, apartamento, Bodega, Local, Oficina, terreno, etc |
| `tipogral2` | `VARCHAR (255)` | `yes` |  |
| `tipogralx` | `VARCHAR (254)` | `yes` |  |
| `opercgral` | `VARCHAR (255)` | `yes` | Operación Venta, Renta, Aportación, Atraque, etc |
| `opercgral2` | `VARCHAR (254)` | `yes` |  |
| `fechagrl` | `DATE` | `yes` | Fecha de registro de ALTA |
| `far` | `DATE` | `yes` | Fecha de aviso de ALTA a recepción |
| `fcontrato` | `DATE` | `yes` | Fecha de firma contrato de servicios |
| `finicio` | `DATE` | `yes` | Fecha de inicio de promoción |
| `mesna` | `INTEGER` | `yes` | Número de mes de ALTA |
| `mesa` | `VARCHAR (254)` | `yes` | Nombre del mes de ALTA |
| `añoa` | `INTEGER` | `yes` | Año de ALTA |
| `ampiidgrl` | `VARCHAR (255)` | `yes` | ID de registro en AMPI |
| `ampiidgrl2` | `TEXT` | `yes` | Hipervínculo a AMPI |
| `idrremaxgral` | `VARCHAR (255)` | `yes` | ID de registro en REMAX |
| `callegrl` | `VARCHAR (255)` | `yes` | Calle |
| `callegrl2` | `TEXT` | `yes` | Hipervínculo a google maps |
| `npgrl` | `VARCHAR (255)` | `yes` | Número |
| `cotogrl` | `VARCHAR (255)` | `yes` | Coto |
| `edifgrl` | `VARCHAR (255)` | `yes` | Edificio |
| `pisogrl` | `VARCHAR (255)` | `yes` | Piso |
| `nigrl` | `VARCHAR (255)` | `yes` | Número Interior |
| `entregrl` | `VARCHAR (255)` | `yes` | Entre calles |
| `mungrl` | `VARCHAR (255)` | `yes` | Municipio |
| `fraccgrl` | `VARCHAR (255)` | `yes` | Fraccionamiento |
| `cpgrl` | `VARCHAR (255)` | `yes` | Código Postal |
| `entigrl` | `VARCHAR (255)` | `yes` | Entidad |
| `domp` | `VARCHAR (254)` | `yes` | Domicilio completo de la Propiedad |
| `cgrgrl` | `VARCHAR (255)` | `yes` | Coordenadas Guía Rojí |
| `ccatgrl` | `VARCHAR (255)` | `yes` | Clave catastral |
| `condvisres` | `VARCHAR (255)` | `yes` | Condiciones de visita Llaves o Cita |
| `cajallaves` | `INTEGER` | `yes` | Número de caja para guardar Llaves |
| `statusllavesp` | `VARCHAR (255)` | `yes` | Status de las Llaves de esta propiedad |
| `fdcllaves` | `DATE` | `yes` | Fecha de devolución o entrega de Llaves a cliente |
| `dispvislla` | `VARCHAR (255)` | `yes` | Disponibilidad de visita |
| `telcitares` | `DOUBLE PRECISION` | `yes` | Teléfono para citas |
| `indlleres` | `TEXT` | `yes` | Indicaciones de como llegar |
| `nomcitas` | `VARCHAR (255)` | `yes` | Nombre de la persona para citas de visita a la propiedad |
| `comeprop` | `VARCHAR (255)` | `yes` | Comentarios generales sobre la propiedad |
| `preciocondi` | `NUMERIC(15,2)` | `yes` | Precio original inicial |
| `monedacondi` | `VARCHAR (255)` | `yes` | Pesos o Dólares |
| `suptres` | `DOUBLE PRECISION` | `yes` | Superficie de terreno m2 |
| `supcres` | `DOUBLE PRECISION` | `yes` | Superficie de Construcción m2 |
| `freres` | `DOUBLE PRECISION` | `yes` | Longitud metros de frente |
| `frenres` | `INTEGER` | `yes` | Número de frentes |
| `ffres` | `DOUBLE PRECISION` | `yes` | Longitud metros de fondo |
| `recres` | `INTEGER` | `yes` | Número de recámaras |
| `bañosres` | `INTEGER` | `yes` | Número de baños completos |
| `mbañosres` | `INTEGER` | `yes` | Número de medios baños |
| `jardres` | `DOUBLE PRECISION` | `yes` | Jardín m2 |
| `estacionres` | `INTEGER` | `yes` | Estacionamientos |
| `estcubres` | `INTEGER` | `yes` | Estacionamiento cubiertos |
| `estdescres` | `INTEGER` | `yes` | Estacionamiento descubiertos |
| `nivelres` | `VARCHAR (255)` | `yes` | Nivel |
| `ptres` | `INTEGER` | `yes` | Pisos totales |
| `extres` | `VARCHAR (255)` | `yes` | Exterior o Interior |
| `nures` | `INTEGER` | `yes` | Número de unidades |
| `vistares` | `VARCHAR (255)` | `yes` | Vista a |
| `elevres` | `INTEGER` | `yes` | Número de Elevadores |
| `edadres` | `INTEGER` | `yes` | Edad de la propiedad |
| `tgres` | `VARCHAR (255)` | `yes` | Regular, Irregular |
| `tpres` | `VARCHAR (255)` | `yes` | Plano, ascendente, descendente |
| `ubicterres` | `VARCHAR (255)` | `yes` | Esquina, medianero, cabeza de manzana |
| `usores` | `VARCHAR (255)` | `yes` | Uso de suelo |
| `restres` | `VARCHAR (255)` | `yes` | Restricciones |
| `desres` | `VARCHAR (255)` | `yes` | Descripción Casa, Terreno, Duplex, Depto, Edificio, Condominio Horizontal, Otro |
| `catres` | `VARCHAR (255)` | `yes` | Lujo, Residencial, Medio, Económico |
| `otrores` | `VARCHAR (255)` | `yes` | Otro descripción |
| `notasres` | `VARCHAR (255)` | `yes` | Notas |
| `steres` | `DOUBLE PRECISION` | `yes` | Superficie de terreno en m2 |
| `svterres` | `NUMERIC(15,2)` | `yes` | Valor de terreno por m2 |
| `sterrtres` | `DOUBLE PRECISION` | `yes` | Total de valor de terreno |
| `apres` | `DOUBLE PRECISION` | `yes` | Superficie de áreas principales en m2 |
| `apvres` | `NUMERIC(15,2)` | `yes` | Valor de áreas principales $/m2 |
| `aptres` | `DOUBLE PRECISION` | `yes` | Total de valor de áreas principales |
| `asres` | `DOUBLE PRECISION` | `yes` | Superficie de áreas secundarias en m2 |
| `asvres` | `NUMERIC(15,2)` | `yes` | Valor de áreas secundarias $/m2 |
| `astres` | `DOUBLE PRECISION` | `yes` | Total de valor de áreas secundarias |
| `eptres` | `DOUBLE PRECISION` | `yes` | Superficie de áreas Estacionamientos, patios y terrazas en m2 |
| `eptvres` | `NUMERIC(15,2)` | `yes` | Valor de áreas Estacionamientos, patios y terrazas $/m2 |
| `epttres` | `DOUBLE PRECISION` | `yes` | Total de valor de estacionamientos patios y terrazas |
| `scm` | `DOUBLE PRECISION` | `yes` | Superficie de construción en m2 |
| `vcm` | `NUMERIC(15,2)` | `yes` | Valor de construción $/m2 |
| `tcm` | `DOUBLE PRECISION` | `yes` | Total de valor de construcción |
| `ieres` | `DOUBLE PRECISION` | `yes` | Superficie de áreas instalaciones especiales en m2 |
| `ievres` | `NUMERIC(15,2)` | `yes` | Valor de áreas instalaciones especiales $/m2 |
| `ietres` | `DOUBLE PRECISION` | `yes` | Total de valor de instalaciones especiales |
| `sstres` | `DOUBLE PRECISION` | `yes` | Total de superficie m2 |
| `svtsres` | `NUMERIC(15,2)` | `yes` | Valor Total $/m2 |
| `transpres` | `BOOLEAN NOT NULL` | `no` | Transportes |
| `parqres` | `BOOLEAN NOT NULL` | `no` | Parques |
| `comeres` | `BOOLEAN NOT NULL` | `no` | Comercios |
| `escures` | `BOOLEAN NOT NULL` | `no` | Escuelas |
| `igleres` | `BOOLEAN NOT NULL` | `no` | Iglesias |
| `bancres` | `BOOLEAN NOT NULL` | `no` | Bancos |
| `hospres` | `BOOLEAN NOT NULL` | `no` | Hospitales |
| `otserres` | `VARCHAR (255)` | `yes` | Otros servicios |
| `visitada` | `VARCHAR (255)` | `yes` | Status de visita por recorrido |
| `visitas` | `INTEGER` | `yes` | Estatus por visitar, programada, visitada, selección de opción numérica |
| `visitas2` | `VARCHAR (254)` | `yes` | Estatus por visitar, programada, visitada,selecciónde opción en palabra |
| `fp` | `VARCHAR (255) NOT NULL` | `no` | Para filtrar las renovaciones de rentas |
| `ce` | `VARCHAR (255)` | `yes` | Para filtrar los casos especiales de comisión |
| `consec3` | `VARCHAR (254)` | `yes` | Se crea con la concateación de la categoría y numero consecutivo |
| `altas` | `VARCHAR (254)` | `yes` | Clasificación de altas |
| `inicial` | `VARCHAR (254)` | `yes` | Inicial o Alta del año |
| `statusclasif` | `VARCHAR (254)` | `yes` | Combinanción de status para informe |

### `PROPIEDADES FT`

- Category: `core`
- Priority: `medium`
- Rows:`2216`
- Columns: `146`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idpropft` | `SERIAL` | `yes` | Registro detalles de la propiedad |
| `clavepropft` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `rampcom` | `INTEGER` | `yes` | Rampas |
| `vigicom` | `BOOLEAN NOT NULL` | `no` | Vigilancia |
| `otrcom` | `VARCHAR (255)` | `yes` | Otro servicio |
| `camioind` | `BOOLEAN NOT NULL` | `no` | Entrada de camiones |
| `andenind` | `INTEGER` | `yes` | Número de andenes |
| `categcom` | `VARCHAR (255)` | `yes` | Categoría Inteligente, AAA, AA, otro |
| `estilres` | `VARCHAR (255)` | `yes` | Estilo de la propiedad |
| `proyres` | `VARCHAR (255)` | `yes` | Proyecto: Muy bueno,bueno, regular, malo |
| `acabadres` | `VARCHAR (255)` | `yes` | Acabados: Lujo, residencial, medio, económico |
| `consres` | `VARCHAR (255)` | `yes` | Estado de conservación Muy bueno, bueno, regular, malo |
| `fachares` | `VARCHAR (255)` | `yes` | Fachada: aplanado, recubrimiento, ladrillo aparente |
| `ventares` | `VARCHAR (255)` | `yes` | Ventanería fieero, madera, aluminio |
| `cristres` | `VARCHAR (255)` | `yes` | Cristales Vidrio, Cristal transparente, Cristal tintex |
| `carpres` | `VARCHAR (255)` | `yes` | Carpintería Triplay, pino, cedro, caoba |
| `puertres` | `VARCHAR (255)` | `yes` | Puertas fierro forjado, lámina, madera, aluminio |
| `otconres` | `VARCHAR (255)` | `yes` | Otros detalles de construcción |
| `tiobracom` | `VARCHAR (255)` | `yes` | Tipo de obra / divisiones |
| `clasifprop` | `VARCHAR (255)` | `yes` | Clasificacón: Industrial, popular, suburbana |
| `fotopres` | `Unknown_0012` | `yes` |  |
| `croquisres` | `Unknown_0012` | `yes` |  |
| `h1` | `BOOLEAN NOT NULL` | `no` | Hall |
| `h2` | `VARCHAR (255)` | `yes` | Hall nivel |
| `h3` | `INTEGER` | `yes` | Hall Baños |
| `h4` | `VARCHAR (255)` | `yes` | Hall acabados |
| `s1` | `BOOLEAN NOT NULL` | `no` | Sala |
| `s2` | `VARCHAR (255)` | `yes` | Sala nivel |
| `s3` | `INTEGER` | `yes` | Sala baños |
| `s4` | `VARCHAR (255)` | `yes` | Sala acabados |
| `c1` | `BOOLEAN NOT NULL` | `no` | Comedor |
| `c2` | `VARCHAR (255)` | `yes` | Comedor nivel |
| `c3` | `VARCHAR (255)` | `yes` | Comedor acabados |
| `e1` | `BOOLEAN NOT NULL` | `no` | Estudio |
| `e2` | `VARCHAR (255)` | `yes` | Estudio nivel |
| `e3` | `VARCHAR (255)` | `yes` | Estudio acabados |
| `d1` | `BOOLEAN NOT NULL` | `no` | Desayunador |
| `d2` | `VARCHAR (255)` | `yes` | Desayunador nivel |
| `d3` | `VARCHAR (255)` | `yes` | Desayunador acabados |
| `co1` | `BOOLEAN NOT NULL` | `no` | Cocina |
| `co2` | `VARCHAR (255)` | `yes` | Cocina nivel |
| `co3` | `VARCHAR (255)` | `yes` | Cocina acabados |
| `r11` | `VARCHAR (255)` | `yes` | Recámara principal nivel |
| `r12` | `BOOLEAN NOT NULL` | `no` | Baños |
| `r13` | `BOOLEAN NOT NULL` | `no` | Clóset |
| `r14` | `BOOLEAN NOT NULL` | `no` | Vestidor |
| `r15` | `BOOLEAN NOT NULL` | `no` | Terraza |
| `r16` | `VARCHAR (255)` | `yes` | Acabados |
| `r21` | `VARCHAR (255)` | `yes` | Recámara 2 nivel |
| `r22` | `BOOLEAN NOT NULL` | `no` | Baños |
| `r23` | `BOOLEAN NOT NULL` | `no` | Clóset |
| `r24` | `BOOLEAN NOT NULL` | `no` | Vestidor |
| `r25` | `BOOLEAN NOT NULL` | `no` | Terraza |
| `r26` | `VARCHAR (255)` | `yes` | Acabados |
| `r31` | `VARCHAR (255)` | `yes` | Recámara 3 nivel |
| `r32` | `BOOLEAN NOT NULL` | `no` | Baños |
| `r33` | `BOOLEAN NOT NULL` | `no` | Clóset |
| `r34` | `BOOLEAN NOT NULL` | `no` | Vestidor |
| `r35` | `BOOLEAN NOT NULL` | `no` | Terraza |
| `r36` | `VARCHAR (255)` | `yes` | Acabados |
| `r41` | `VARCHAR (255)` | `yes` | Recámara 4 nivel |
| `r42` | `BOOLEAN NOT NULL` | `no` | Baños |
| `r43` | `BOOLEAN NOT NULL` | `no` | Clóset |
| `r44` | `BOOLEAN NOT NULL` | `no` | Vestidor |
| `r45` | `BOOLEAN NOT NULL` | `no` | Terraza |
| `r46` | `VARCHAR (255)` | `yes` | Acabados |
| `r51` | `VARCHAR (255)` | `yes` | Recámara 5 nivel |
| `r52` | `BOOLEAN NOT NULL` | `no` | Baños |
| `r53` | `BOOLEAN NOT NULL` | `no` | Clóset |
| `r54` | `BOOLEAN NOT NULL` | `no` | Vestidor |
| `r55` | `BOOLEAN NOT NULL` | `no` | Terraza |
| `r56` | `VARCHAR (255)` | `yes` | Acabados |
| `r61` | `VARCHAR (255)` | `yes` | Recámara 6 nivel |
| `r62` | `BOOLEAN NOT NULL` | `no` | Baños |
| `r63` | `BOOLEAN NOT NULL` | `no` | Clóset |
| `r64` | `BOOLEAN NOT NULL` | `no` | Vestidor |
| `r65` | `BOOLEAN NOT NULL` | `no` | Terraza |
| `r66` | `VARCHAR (255)` | `yes` | Acabados |
| `tv1` | `BOOLEAN NOT NULL` | `no` | TV nivel |
| `tv2` | `VARCHAR (255)` | `yes` | Acabados |
| `cs1` | `BOOLEAN NOT NULL` | `no` | Cuarto de Servicio |
| `l1` | `BOOLEAN NOT NULL` | `no` | Lavandería |
| `sj1` | `BOOLEAN NOT NULL` | `no` | Salón de juegos |
| `sj2` | `VARCHAR (255)` | `yes` | Acabados |
| `jar` | `BOOLEAN NOT NULL` | `no` | Jardín |
| `ilumcom` | `VARCHAR (255)` | `yes` | Iluminación |
| `plafcom` | `VARCHAR (255)` | `yes` | Plafones |
| `pisoscom` | `VARCHAR (255)` | `yes` | Pisos |
| `muroscom` | `VARCHAR (255)` | `yes` | Muros |
| `usoperind` | `VARCHAR (255)` | `yes` | Usos permitidos |
| `tipzind` | `VARCHAR (255)` | `yes` | Tipo de industria predominante en la zona |
| `cdind` | `BOOLEAN NOT NULL` | `no` | Carga y descarga |
| `patmind` | `BOOLEAN NOT NULL` | `no` | Patio de maniobras |
| `cvigind` | `BOOLEAN NOT NULL` | `no` | Caseta de vigilancia |
| `cvelind` | `BOOLEAN NOT NULL` | `no` | Cuarto velador |
| `bvel` | `BOOLEAN NOT NULL` | `no` | Baño velador |
| `estructuind` | `VARCHAR (255)` | `yes` | Estructuras |
| `techind` | `VARCHAR (255)` | `yes` | Techos |
| `pisoind` | `VARCHAR (255)` | `yes` | Pisos industriales |
| `aguaind` | `BOOLEAN NOT NULL` | `no` | Agua |
| `tmaaguind` | `BOOLEAN NOT NULL` | `no` | Tomas mm |
| `pozopind` | `BOOLEAN NOT NULL` | `no` | Pozo propio |
| `dconagind` | `BOOLEAN NOT NULL` | `no` | Derechos de agua CONAGUA |
| `conaind` | `VARCHAR (255)` | `yes` | Vigencia derechos CONAGUA |
| `conaind2` | `DOUBLE PRECISION` | `yes` | Volumen CONAGUA |
| `conecind` | `BOOLEAN NOT NULL` | `no` | Conectada |
| `drenind` | `BOOLEAN NOT NULL` | `no` | Drenaje |
| `municiind` | `BOOLEAN NOT NULL` | `no` | Municipal |
| `fosind` | `BOOLEAN NOT NULL` | `no` | Fosa |
| `luzind` | `BOOLEAN NOT NULL` | `no` | Luz |
| `bifind` | `BOOLEAN NOT NULL` | `no` | Bifásica |
| `trifind` | `BOOLEAN NOT NULL` | `no` | Trifásica |
| `eferroind` | `BOOLEAN NOT NULL` | `no` | Espuela de ferrocarril |
| `ietiind` | `VARCHAR (255)` | `yes` | Instalaciones especiales por tipo de industria |
| `of1` | `VARCHAR (255)` | `yes` | Nivel oficinas |
| `ofm1` | `DOUBLE PRECISION` | `yes` | m2 oficinas |
| `ofv1` | `NUMERIC(15,2)` | `yes` | $ m2 oficinas |
| `ofa1` | `VARCHAR (255)` | `yes` | Acabados oficinas |
| `bod1` | `VARCHAR (255)` | `yes` | Nivel bodega |
| `bodm1` | `DOUBLE PRECISION` | `yes` | m2 bodega |
| `bodv1` | `NUMERIC(15,2)` | `yes` | $ m2 bodega |
| `boda1` | `VARCHAR (255)` | `yes` | Acabados bodega |
| `nav1` | `VARCHAR (255)` | `yes` | Nivel nave |
| `navm1` | `DOUBLE PRECISION` | `yes` | m2 nave |
| `navv1` | `NUMERIC(15,2)` | `yes` | $ m2 nave |
| `nava1` | `VARCHAR (255)` | `yes` | Acabados nave |
| `cargdescind` | `DOUBLE PRECISION` | `yes` | Área de carga y descarga |
| `altlibind1` | `DOUBLE PRECISION` | `yes` | Altura libre mínima |
| `altlibind2` | `DOUBLE PRECISION` | `yes` | Altura libre máxima |
| `manioind` | `DOUBLE PRECISION` | `yes` | Área de maniobras |
| `capcarind` | `DOUBLE PRECISION` | `yes` | Capacidad de carga en pisos Ton / m2 |
| `bofiind` | `INTEGER` | `yes` | Baños en oficinas |
| `btrabind` | `INTEGER` | `yes` | Baños para trabajadores |
| `telefcom` | `BOOLEAN NOT NULL` | `no` | Teléfonos |
| `linelcom` | `INTEGER` | `yes` | Líneas |
| `conmucom` | `BOOLEAN NOT NULL` | `no` | Conmutador |
| `extencom` | `INTEGER` | `yes` | Extensiones |
| `fopcom` | `BOOLEAN NOT NULL` | `no` | Fibra óptica |
| `redcomcom` | `BOOLEAN NOT NULL` | `no` | Red de cómputo |
| `bañoscom` | `INTEGER` | `yes` | Baños |
| `bañintcom` | `INTEGER` | `yes` | Baños interiores |
| `bañentrcom` | `INTEGER` | `yes` | Baños entrepiso |
| `cocinet` | `BOOLEAN NOT NULL` | `no` | Cocineta industrial |
| `comedo` | `BOOLEAN NOT NULL` | `no` | Comedor industrial |
| `ieeres` | `VARCHAR (255)` | `yes` | Instalaciones y equipos especiales |
| `descres` | `TEXT` | `yes` | Descripción y observaciones |

### `PropietariosALTA`

- Category: `core`
- Priority: `high`
- Rows:`1604`
- Columns: `9`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idprpalta` | `SERIAL` | `yes` | Registro de propietarios para ALTA de propiedad |
| `clvpropi` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `npropi` | `VARCHAR (255)` | `yes` | Nombre del propietario |
| `apep1` | `VARCHAR (255)` | `yes` | Apellido paterno del propietario |
| `apep2` | `VARCHAR (255)` | `yes` | Apellido materno del propietario |
| `ncpr` | `VARCHAR (254)` | `yes` | Nombre completo del propietario |
| `numprop` | `INTEGER` | `yes` | Número de propietario |
| `correopa` | `VARCHAR (255)` | `yes` | Correo del Propietario |
| `telprop` | `DOUBLE PRECISION` | `yes` | Telefono del Propietario |

### `PropietariosALTAPenalizacion`

- Category: `core`
- Priority: `medium`
- Rows:`29`
- Columns: `26`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idprpaltapen` | `SERIAL` | `yes` | Registro de propietarios para ALTA de propiedad |
| `clvpropipen` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `clvofertpen` | `VARCHAR (255)` | `yes` | Clave de la oferta que se penalizó |
| `npropietario` | `VARCHAR (255)` | `yes` | Nombre del propietario |
| `numproppen` | `INTEGER` | `yes` | Número de propietario |
| `conceptoproppen` | `VARCHAR (255)` | `yes` | Concepto de comisión |
| `nivelppen` | `VARCHAR (255)` | `yes` | Nivel de propietario |
| `cpppapen` | `INTEGER` | `yes` | Participación |
| `ladoproppen` | `VARCHAR (255)` | `yes` | Lado Alta |
| `pvpen` | `NUMERIC(15,2)` | `yes` |  |
| `papen1` | `NUMERIC(15,2)` | `yes` |  |
| `papen2` | `NUMERIC(15,2)` | `yes` |  |
| `papen3` | `NUMERIC(15,2)` | `yes` |  |
| `papen4` | `NUMERIC(15,2)` | `yes` |  |
| `papen5` | `NUMERIC(15,2)` | `yes` |  |
| `papen6` | `NUMERIC(15,2)` | `yes` |  |
| `comppapen` | `NUMERIC(15,2)` | `yes` | Comisión para el propietario |
| `factpapen` | `BOOLEAN NOT NULL` | `no` | Factura Sí/No |
| `perpapen` | `VARCHAR (255)` | `yes` | Persona Física o Moral |
| `resiscopropietario` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal |
| `concfactpen` | `VARCHAR (255)` | `yes` | Concepto de la factura |
| `formppapen` | `VARCHAR (255)` | `yes` | Forma de pago |
| `viappapen` | `VARCHAR (255)` | `yes` | Vía de pago |
| `fechpapen` | `DATE` | `yes` | Fecha de pago de la penalización |
| `anrpapen` | `BOOLEAN NOT NULL` | `no` |  |
| `araapen` | `BOOLEAN NOT NULL` | `no` |  |

### `PublicDigital`

- Category: `core`
- Priority: `medium`
- Rows:`50`
- Columns: `5`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idlinks` | `SERIAL` | `yes` |  |
| `cmdp` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `mpd` | `VARCHAR (255)` | `yes` | Medio de publicidad digital |
| `enlace` | `TEXT` | `yes` | Enlace de la propiedad en el medio respectivo |
| `idportal` | `VARCHAR (255)` | `yes` | Código de la propiedad en el portal |

### `Puertas`

- Category: `reference`
- Priority: `medium`
- Rows:`4`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `puertas` | `VARCHAR (255)` | `yes` | Puertas |

### `Puntualidad`

- Category: `reference`
- Priority: `low`
- Rows:`0`
- Columns: `10`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idpuntual` | `SERIAL` | `yes` | Registro |
| `evento` | `VARCHAR (255)` | `yes` | Evento al que se refiere el registro |
| `asesorp` | `VARCHAR (255)` | `yes` | Nombre del asesor |
| `asistencia` | `BOOLEAN NOT NULL` | `no` | Registro de asistencia o ausencia |
| `puntual` | `VARCHAR (255)` | `yes` | Puntual o retardo |
| `horap` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de llegada |
| `horaps` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de salida |
| `justificación` | `VARCHAR (255)` | `yes` | Justificación de Ausencias |
| `comentarios` | `VARCHAR (255)` | `yes` | Comentarios |
| `firma` | `VARCHAR (255)` | `yes` | Firma del asesor |

### `Recorridos`

- Category: `core`
- Priority: `high`
- Rows:`0`
- Columns: `6`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idrecor` | `SERIAL` | `yes` | Registro de recorridos |
| `clrecorr` | `VARCHAR (255)` | `yes` | IdRecorrido |
| `frecor` | `DATE` | `yes` | Fecha del recorrido |
| `hrecorr` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora del recorrido |
| `cosrecorr` | `NUMERIC(15,2)` | `yes` | Costo del recorrido |
| `comrecorr` | `VARCHAR (255)` | `yes` | Comentarios del recorrido |

### `RecorridosCom`

- Category: `core`
- Priority: `medium`
- Rows:`1018`
- Columns: `6`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `regrec` | `SERIAL` | `yes` | Registro |
| `claverecom` | `VARCHAR (255) NOT NULL` | `no` | Clave de la propiedad |
| `domrec` | `VARCHAR (255)` | `yes` | Domicilio |
| `asesorrec` | `VARCHAR (255) NOT NULL` | `no` | Asesor que comenta |
| `comrec` | `TEXT NOT NULL` | `no` | Comentario |
| `frecorrcom` | `DATE NOT NULL` | `no` | Fecha del comentario |

### `RecorridosDet`

- Category: `core`
- Priority: `medium`
- Rows:`0`
- Columns: `9`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idrecor2` | `SERIAL` | `yes` | Registro de recorridos |
| `claredet` | `VARCHAR (255)` | `yes` | Id de recorrido |
| `crecorr` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `colrec` | `VARCHAR (255)` | `yes` | Colonia de la propiedad |
| `nr` | `VARCHAR (255)` | `yes` | Posición dentro de la ruta |
| `naser` | `VARCHAR (255)` | `yes` | Asesor de Alta |
| `valrecor` | `NUMERIC(15,2)` | `yes` | Valor de la propiedad |
| `tiporec` | `VARCHAR (255)` | `yes` | Tipo de propiedad |
| `operrec` | `VARCHAR (255)` | `yes` | Operación |

### `ReferidoCIERRE`

- Category: `core`
- Priority: `high`
- Rows:`11`
- Columns: `13`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idrefc` | `SERIAL` | `yes` | Registro de referidos para CIERRE |
| `crefc` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `nrefc` | `VARCHAR (255)` | `yes` | Nombre del asesor de Cierre |
| `emprefc` | `VARCHAR (255)` | `yes` | Empresa referido Cierre |
| `lacrefc` | `VARCHAR (255)` | `yes` | Lado CIERRE |
| `perrefc` | `VARCHAR (255)` | `yes` | Persona Física o Moral Cierre |
| `resiscocref` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal RESISCO |
| `facrefc` | `BOOLEAN NOT NULL` | `no` | Factura Cierre |
| `faccrefc` | `VARCHAR (255)` | `yes` | Concepto por Honorarios o Comisionista |
| `fpagrefc` | `VARCHAR (255)` | `yes` | Forma de Pago Cierre |
| `vprefc` | `VARCHAR (255)` | `yes` | Vía de Pago Cierre |
| `fecprefcc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de pago de comisión Cierre |
| `ararc` | `BOOLEAN NOT NULL` | `no` | Aplicación especial de retención administrativa Referido Cierre |

### `ReferidoCIERREProy`

- Category: `reference`
- Priority: `low`
- Rows:`20`
- Columns: `12`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idrefc` | `SERIAL` | `yes` | Registro de referidos para CIERRE |
| `crefc` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `claveofertarefproy` | `VARCHAR (255)` | `yes` | Clave ID de la oferta |
| `nrefc` | `VARCHAR (255)` | `yes` | Nombre del asesor de Cierre |
| `emprefc` | `VARCHAR (255)` | `yes` | Empresa referido Cierre |
| `lacrefc` | `VARCHAR (255)` | `yes` | Lado CIERRE |
| `perrefc` | `VARCHAR (255)` | `yes` | Persona Física o Moral Cierre |
| `facrefc` | `BOOLEAN NOT NULL` | `no` | Factura Cierre |
| `faccrefc` | `VARCHAR (255)` | `yes` | Concepto por Honorarios o Comisionista |
| `fpagrefc` | `VARCHAR (255)` | `yes` | Forma de Pago Cierre |
| `vprefc` | `VARCHAR (255)` | `yes` | Vía de Pago Cierre |
| `fecprefcc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de pago de comisión Cierre |

### `Referidos Pre`

- Category: `core`
- Priority: `high`
- Rows:`435`
- Columns: `38`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idrefp` | `SERIAL` | `yes` | Registro ID |
| `refconsec` | `INTEGER` | `yes` | Número consecutivo registro |
| `operación` | `VARCHAR (255)` | `yes` | Tipo de operación |
| `tipo` | `VARCHAR (255)` | `yes` | Tipo de propiedad |
| `fecha` | `DATE` | `yes` | Fecha de registro |
| `of1` | `VARCHAR (255)` | `yes` | Empresa que refiere |
| `broker1` | `VARCHAR (255)` | `yes` | Broker que refiere |
| `asesor1` | `VARCHAR (255)` | `yes` | Asesor que refiere |
| `telof1` | `DOUBLE PRECISION` | `yes` | Teléfono de asesor que refiere |
| `telofe1` | `DOUBLE PRECISION` | `yes` | Extensión teléfono de asesor que refiere |
| `movil1` | `DOUBLE PRECISION` | `yes` | Móvil del asesor que refiere |
| `email1` | `VARCHAR (255)` | `yes` | Correo del asesor que refiere |
| `of2` | `VARCHAR (255)` | `yes` | Empresa que recibe la referencia |
| `broker2` | `VARCHAR (255)` | `yes` | Broker que recibe |
| `asesor2` | `VARCHAR (255)` | `yes` | Asesor al que se le asigna la referencia |
| `telof2` | `DOUBLE PRECISION` | `yes` | Teléfono del asesor que recibe la referencia |
| `telofe2` | `DOUBLE PRECISION` | `yes` | Extensión teléfono de asesor que refiere |
| `movil2` | `DOUBLE PRECISION` | `yes` | Móvil del asesor que recibe la referencia |
| `email2` | `VARCHAR (255)` | `yes` | Correo del asesor que recibe la referencia |
| `cliente` | `VARCHAR (255)` | `yes` | Nombre del Cliente |
| `apaterno` | `VARCHAR (255)` | `yes` | Apellido Paterno |
| `amaterno` | `VARCHAR (255)` | `yes` | Apellido Materno |
| `telcliente` | `DOUBLE PRECISION` | `yes` | Teléfono oficina cliente |
| `telclientee` | `DOUBLE PRECISION` | `yes` | Extensión teléfono del cliente |
| `movilcliente` | `DOUBLE PRECISION` | `yes` | Móvil cliente |
| `emailcliente` | `VARCHAR (255)` | `yes` | Correo Cliente |
| `calleref` | `VARCHAR (255)` | `yes` | Domicilio de la Propiedad |
| `coloniar` | `VARCHAR (255)` | `yes` | Colonia |
| `mpior` | `VARCHAR (255)` | `yes` | Municipio |
| `estador` | `VARCHAR (255)` | `yes` | Entidad |
| `paisr` | `VARCHAR (255)` | `yes` | País |
| `presupr` | `VARCHAR (255)` | `yes` | Presupuesto |
| `comisionref` | `DOUBLE PRECISION` | `yes` | Comisión pactada |
| `estatusref` | `VARCHAR (255)` | `yes` | Estatus de la referencia |
| `tiporef` | `VARCHAR (255)` | `yes` | Se recibe referido de una fuente externa o se envía referido a un agente externo (Por parte de Remax) |
| `perfiscal` | `VARCHAR (255)` | `yes` | Persona Física o Moral |
| `obsref` | `TEXT` | `yes` | Observaciones |
| `f34` | `VARCHAR (255)` | `yes` | Comentarios |

### `ReferidosCobrados`

- Category: `core`
- Priority: `high`
- Rows:`14`
- Columns: `44`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idrc` | `SERIAL` | `yes` | Registro de referido Cobrado |
| `nrefc` | `INTEGER` | `yes` | Numero de registro |
| `src` | `VARCHAR (255)` | `yes` | Siglas de clasificación |
| `colrcob` | `VARCHAR (255)` | `yes` | Colonia |
| `entrcob` | `VARCHAR (255)` | `yes` | Entidad |
| `cercob` | `VARCHAR (254)` | `yes` | Colonia Entidad |
| `clavercob` | `VARCHAR (254)` | `yes` | Clave de la propiedad |
| `nombreref` | `VARCHAR (255)` | `yes` | Nombre del asesor que refiere |
| `nivelase` | `VARCHAR (255)` | `yes` | Nivel del asesor que refiere |
| `naprcob` | `INTEGER` | `yes` | Posición |
| `cpparti2refcob` | `INTEGER` | `yes` | Participación |
| `empresaref` | `VARCHAR (255)` | `yes` | Empresa que paga |
| `tipoop` | `VARCHAR (255)` | `yes` | Tipo de operación |
| `tipoprop` | `VARCHAR (255)` | `yes` | Tipo de propiedad |
| `giroprop` | `VARCHAR (255)` | `yes` | Giro de la Propiedad |
| `valoropr` | `NUMERIC(15,2)` | `yes` | Valor de la operación |
| `pcomisión` | `DOUBLE PRECISION` | `yes` | Porcentaje de comisión cobrada |
| `mcomr1` | `DOUBLE PRECISION` | `yes` | Monto de comisión global calculado |
| `mcomr2` | `NUMERIC(15,2)` | `yes` | Monto de comisión capturado |
| `mcomr3` | `NUMERIC(15,2)` | `yes` | Monto de comisión global final |
| `plado` | `DOUBLE PRECISION` | `yes` | Porcentaje de lado cierre |
| `mlado` | `DOUBLE PRECISION` | `yes` | Monto lado cierre |
| `pcomr` | `DOUBLE PRECISION` | `yes` | Porcentaje pagado para referido |
| `comrefcob` | `DOUBLE PRECISION` | `yes` | Comisión de referido cobrado calculado |
| `comrefcob2` | `NUMERIC(15,2)` | `yes` | Comisión de referido cobrado capturado |
| `comrefcob3` | `NUMERIC(15,2)` | `yes` | Comisión de referido cobrado final |
| `comfrq` | `DOUBLE PRECISION` | `yes` | Porcentaje de comisión de franquicia |
| `comfrq2` | `DOUBLE PRECISION` | `yes` | Comisión de franquicia |
| `bcomfr` | `NUMERIC(15,2)` | `yes` | Balance |
| `fechar` | `DATE` | `yes` | Fecha en que se realizó la referencia |
| `fechacr` | `DATE` | `yes` | Fecha de cobro de la comisión |
| `conceptor` | `VARCHAR (255)` | `yes` | Concepto Referido Cobrado |
| `ladorc` | `VARCHAR (255)` | `yes` | Lado que se cobra |
| `facrcob` | `BOOLEAN NOT NULL` | `no` | Sí/No |
| `persrcob` | `VARCHAR (255)` | `yes` | Física o Moral |
| `resiscorefcobrados` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal |
| `conceprcob` | `VARCHAR (255)` | `yes` | Concepto a facturar |
| `formrcob` | `VARCHAR (255)` | `yes` | Forma de Pago |
| `víarcob` | `VARCHAR (255)` | `yes` | Vía de pago directo a la persona o por administradora |
| `fechpagorcob` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de pago de la comisión |
| `anrrcob` | `INTEGER` | `yes` |  |
| `araarcob` | `INTEGER` | `yes` |  |
| `comr` | `VARCHAR (255)` | `yes` | Comentarios |
| `comasesorr` | `NUMERIC (39)` | `yes` | Comisión asesor antes de deducciones |

### `RegistrosExt`

- Category: `reference`
- Priority: `low`
- Rows:`48`
- Columns: `51`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `regext` | `SERIAL` | `yes` |  |
| `claveext` | `VARCHAR (255)` | `yes` |  |
| `domext` | `VARCHAR (255)` | `yes` |  |
| `conceptoext` | `VARCHAR (255)` | `yes` |  |
| `conceptoext2` | `VARCHAR (255)` | `yes` |  |
| `conceptoext3` | `VARCHAR (255)` | `yes` |  |
| `fechagrlext` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` |  |
| `fcierreext` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` |  |
| `facext` | `INTEGER` | `yes` |  |
| `fpagoext` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` |  |
| `empresaext` | `VARCHAR (255)` | `yes` |  |
| `asesorext` | `VARCHAR (255)` | `yes` |  |
| `niasecomext` | `VARCHAR (255)` | `yes` |  |
| `napext` | `INTEGER` | `yes` |  |
| `cpparti2ext` | `INTEGER` | `yes` |  |
| `ladoext` | `VARCHAR (255)` | `yes` |  |
| `statuspropext` | `VARCHAR (255)` | `yes` |  |
| `operaciónext` | `VARCHAR (255)` | `yes` |  |
| `valoroperext` | `NUMERIC(15,2)` | `yes` |  |
| `pcglobalext` | `DOUBLE PRECISION` | `yes` |  |
| `cglobalext` | `NUMERIC(15,2)` | `yes` |  |
| `cladoasext` | `NUMERIC(15,2)` | `yes` |  |
| `pcladoext` | `DOUBLE PRECISION` | `yes` |  |
| `cladoext` | `NUMERIC(15,2)` | `yes` |  |
| `preferidoext` | `DOUBLE PRECISION` | `yes` |  |
| `referido ext` | `NUMERIC(15,2)` | `yes` |  |
| `balanceext` | `NUMERIC(15,2)` | `yes` |  |
| `pfranquiciaext` | `DOUBLE PRECISION` | `yes` |  |
| `franquiciaext` | `NUMERIC(15,2)` | `yes` |  |
| `casesorext` | `NUMERIC(15,2)` | `yes` |  |
| `remaxtotalrext` | `NUMERIC(15,2)` | `yes` |  |
| `escext4060` | `NUMERIC(15,2)` | `yes` |  |
| `escext5050` | `NUMERIC(15,2)` | `yes` |  |
| `escext6040` | `NUMERIC(15,2)` | `yes` |  |
| `escext7030` | `NUMERIC(15,2)` | `yes` |  |
| `escext8020` | `NUMERIC(15,2)` | `yes` |  |
| `cingasesorext` | `NUMERIC(15,2)` | `yes` |  |
| `facturaext` | `INTEGER` | `yes` |  |
| `personaext` | `VARCHAR (255)` | `yes` |  |
| `resiscoext` | `BOOLEAN NOT NULL` | `no` |  |
| `confactext` | `VARCHAR (255)` | `yes` |  |
| `fpext` | `VARCHAR (255)` | `yes` |  |
| `vpaext` | `VARCHAR (255)` | `yes` |  |
| `ivaext` | `NUMERIC(15,2)` | `yes` |  |
| `retivaext` | `NUMERIC(15,2)` | `yes` |  |
| `retisrext` | `NUMERIC(15,2)` | `yes` |  |
| `retadmext` | `NUMERIC(15,2)` | `yes` |  |
| `cpagadaext` | `NUMERIC(15,2)` | `yes` |  |
| `comext` | `TEXT` | `yes` |  |
| `reio` | `BOOLEAN NOT NULL` | `no` |  |
| `araac` | `BOOLEAN NOT NULL` | `no` |  |

### `RenovacionContratos`

- Category: `core`
- Priority: `medium`
- Rows:`61`
- Columns: `20`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idrc` | `SERIAL` | `yes` | Reg. de renovación |
| `clarc` | `VARCHAR (255)` | `yes` | Clave de propiedad original |
| `clarc1` | `INTEGER` | `yes` | Número consecutivo |
| `clarc2` | `VARCHAR (254)` | `yes` | Clave de la renovación de contrato |
| `domrc` | `VARCHAR (255)` | `yes` | Domicilio |
| `operrc` | `VARCHAR (255)` | `yes` | Tipo de operación |
| `catgralrc` | `VARCHAR (255)` | `yes` | Categoría |
| `statusproprc` | `VARCHAR (255)` | `yes` | Statuts de la propiedad |
| `fecharc` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de renovación de contrato |
| `fecharc2` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de Alta |
| `montorc` | `NUMERIC(15,2)` | `yes` | Monto de renovación de contrato |
| `pmontorc` | `DOUBLE PRECISION` | `yes` | Porcentaje de monto de renovación |
| `pmontorc2` | `DOUBLE PRECISION` | `yes` | Porcentaje de monto de renovación en número |
| `pmontorc3` | `DOUBLE PRECISION` | `yes` | Monto final para repartir de comisión |
| `fecharccob` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de cobro |
| `ladorc` | `VARCHAR (255)` | `yes` | Lado |
| `conceptorc` | `VARCHAR (255)` | `yes` | Concepto de renovación de contrato |
| `comrc` | `VARCHAR (255)` | `yes` | Comentarios sobre renovación de contrato |
| `anrrc` | `BOOLEAN NOT NULL` | `no` | Sacar del cálculo |
| `araarc` | `BOOLEAN NOT NULL` | `no` | Sacar del Cálculo |

### `Renta Condic`

- Category: `reference`
- Priority: `medium`
- Rows:`1395`
- Columns: `29`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idpropiedades2` | `SERIAL` | `yes` | Registro |
| `claveren` | `VARCHAR (255)` | `yes` | Clave de la Propiedad |
| `conttran` | `BOOLEAN NOT NULL` | `no` | Contrato de transacción |
| `invrcondi` | `BOOLEAN NOT NULL` | `no` | Investigación de crédito |
| `investi` | `VARCHAR (255)` | `yes` | Investigador |
| `invccondi` | `NUMERIC(15,2)` | `yes` | Costo de investigación |
| `hjurid` | `VARCHAR (255)` | `yes` | Herramienta Jurídica |
| `ehj` | `VARCHAR (255)` | `yes` | Empresa para herramienta jurídica |
| `abogadohj` | `VARCHAR (255)` | `yes` | Abogado herramienta jurídica |
| `notariohj` | `VARCHAR (255)` | `yes` | Notario herramienta jurídica |
| `fcondi` | `BOOLEAN NOT NULL` | `no` | Aplica Fianza |
| `fmcondi` | `NUMERIC(15,2)` | `yes` | Monto de la Fianza |
| `ficond` | `VARCHAR (255)` | `yes` | Fianza |
| `afianzadora` | `VARCHAR (255)` | `yes` | Afianzadora |
| `fiacondi` | `BOOLEAN NOT NULL` | `no` | Fiador con bien raíz |
| `fiadeu` | `VARCHAR (255)` | `yes` | Fiador o deudor solidario |
| `nfiadeu` | `VARCHAR (255)` | `yes` | Nombre del Fiador o deudor solidario |
| `vigenciacr` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Vigencia |
| `raños` | `INTEGER NOT NULL` | `no` | Número de años de vigencia del contrato |
| `mantcondi` | `BOOLEAN NOT NULL` | `no` | Cuota de mantenimiento |
| `mmantcondi` | `NUMERIC(15,2)` | `yes` | Monto de Mantenimiento |
| `pmantcondi` | `VARCHAR (255)` | `yes` | Periodo mensual, bimestral |
| `fpcondi` | `VARCHAR (255)` | `yes` | Forma de pago contado, depósito |
| `continter` | `BOOLEAN NOT NULL` | `no` | Contrato de intermediación |
| `sdmcondi` | `BOOLEAN NOT NULL` | `no` | Seguro de daños materiales |
| `segresp` | `BOOLEAN NOT NULL` | `no` | Seguro de responsabilidad civil |
| `racondi` | `BOOLEAN NOT NULL` | `no` | Renta adelantada |
| `rdcondi` | `BOOLEAN NOT NULL` | `no` | Renta depósito |
| `vdrc` | `VARCHAR (255)` | `yes` | Confirma datos correctos |

### `Rótulos`

- Category: `reference`
- Priority: `medium`
- Rows:`81`
- Columns: `11`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idmate` | `SERIAL` | `yes` | Registro |
| `fechasm` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de Salida del material |
| `resprot` | `VARCHAR (255)` | `yes` | Responsable |
| `matrot` | `VARCHAR (255)` | `yes` | Material Rótulo, Gallardete, Lona, Herramienta |
| `vrrot` | `VARCHAR (255)` | `yes` | Venta o Renta |
| `cantrot` | `INTEGER` | `yes` | Cantidad que salió |
| `firma1` | `BOOLEAN NOT NULL` | `no` | Firma |
| `firma` | `VARCHAR (255)` | `yes` | Firma |
| `fecharm` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de Devolución del material |
| `cantrot2` | `INTEGER` | `yes` | Cantidad devuelta |
| `comrot` | `VARCHAR (255)` | `yes` | Comentarios |

### `Salas`

- Category: `reference`
- Priority: `medium`
- Rows:`224`
- Columns: `9`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idsalas` | `SERIAL` | `yes` | Registro |
| `salasas` | `VARCHAR (255)` | `yes` | Asesor que solicita |
| `salasev` | `VARCHAR (255)` | `yes` | Evento que se llevará a cabo |
| `fechasa` | `DATE` | `yes` | Fecha de asignación |
| `horasa` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de asignación |
| `sala` | `VARCHAR (255)` | `yes` | Sala que se asigna |
| `nasist` | `INTEGER` | `yes` | Número de asistentes |
| `ncestas` | `INTEGER` | `yes` | Número de lugares de estacionamiento |
| `salascom` | `VARCHAR (255)` | `yes` | Comentarios |

### `SaldosTesorería`

- Category: `reference`
- Priority: `low`
- Rows:`3`
- Columns: `2`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `cuentat` | `VARCHAR (255)` | `yes` |  |
| `saldot` | `NUMERIC(15,2)` | `yes` |  |

### `Socios`

- Category: `reference`
- Priority: `low`
- Rows:`5996`
- Columns: `48`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idae` | `SERIAL` | `yes` | Registro asesor interno |
| `noms` | `VARCHAR (255)` | `yes` | Nombre (s) del socio |
| `ape1s` | `VARCHAR (255)` | `yes` | Apellido Paterno |
| `ape2s` | `VARCHAR (255)` | `yes` | Apellido Materno |
| `ncs` | `VARCHAR (254)` | `yes` | Nombre completo |
| `mos` | `DOUBLE PRECISION` | `yes` | Teléfono móvil |
| `tos` | `DOUBLE PRECISION` | `yes` | Teléfono de oficina |
| `cos` | `VARCHAR (255)` | `yes` | Correo empresa |
| `cpes` | `VARCHAR (255)` | `yes` | Correo personal |
| `correoso` | `VARCHAR (254)` | `yes` | Correo del Propietario |
| `calles` | `VARCHAR (255)` | `yes` | Calle |
| `tca` | `DOUBLE PRECISION` | `yes` | Teléfono de casa |
| `edifes` | `VARCHAR (255)` | `yes` | Edificio |
| `cotoes` | `VARCHAR (255)` | `yes` | Coto |
| `nes` | `VARCHAR (255)` | `yes` | Número exterior |
| `nis` | `VARCHAR (255)` | `yes` | Número interior |
| `pis` | `VARCHAR (255)` | `yes` | Piso |
| `cols` | `VARCHAR (255)` | `yes` | Colonia |
| `frs` | `VARCHAR (255)` | `yes` | Fraccionamiento |
| `muns` | `VARCHAR (255)` | `yes` | Municipio |
| `cps` | `VARCHAR (255)` | `yes` | Código Postal |
| `ents` | `VARCHAR (255)` | `yes` | Entidad Federativa |
| `inmobs` | `VARCHAR (255)` | `yes` | Inmobiliaria |
| `rss` | `VARCHAR (255)` | `yes` | Nombre o Razón social |
| `rfcs` | `VARCHAR (255)` | `yes` | Registro Federal de Contribuyentes (RFC) |
| `cfs` | `VARCHAR (255)` | `yes` | Calle |
| `nefs` | `VARCHAR (255)` | `yes` | Número exterior |
| `nis2` | `VARCHAR (255)` | `yes` | Número interior |
| `edifes2` | `VARCHAR (255)` | `yes` | Edificio fiscal |
| `pis2` | `VARCHAR (255)` | `yes` | Piso fiscal |
| `cofs` | `VARCHAR (255)` | `yes` | Colonia |
| `frs2` | `VARCHAR (255)` | `yes` | Fraccionamiento fiscal |
| `cotoes2` | `VARCHAR (255)` | `yes` | Coto fiscal |
| `cpfs` | `INTEGER` | `yes` | Código Postal |
| `muns2` | `VARCHAR (255)` | `yes` | Municipio fiscal |
| `ents2` | `VARCHAR (255)` | `yes` | Entidad fiscal |
| `cefs` | `VARCHAR (255)` | `yes` | Correo electrónico |
| `bancos` | `VARCHAR (255)` | `yes` | Banco del socio para depósito |
| `cuentab` | `VARCHAR (255)` | `yes` | Número de Cuenta Bancaria del socio |
| `clabes` | `VARCHAR (255)` | `yes` | CLABE Interbancaria del socio |
| `sucbanc` | `INTEGER` | `yes` | Número de Sucursal del banco del socio |
| `oas` | `VARCHAR (255)` | `yes` | Otras asociaciones AMPI, CANACO, PAIS, MIO |
| `catas` | `VARCHAR (255)` | `yes` | Propietario, Ofertante, Asesor Externo, Asesor Independiente, Representante, Comprador |
| `nnotaria` | `VARCHAR (255)` | `yes` | Número de Notaría |
| `rsocs` | `VARCHAR (255)` | `yes` | Notario, Legal, Fiscal, Técnico, Operativo, Proveedor, Otro |
| `nrsocs` | `VARCHAR (255)` | `yes` | Número de identificación |
| `freg` | `DATE` | `yes` | Fecha Registro |
| `coms` | `VARCHAR (255)` | `yes` | Comentarios |

### `StaffAsistencia`

- Category: `core`
- Priority: `high`
- Rows:`8386`
- Columns: `10`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idasisstaff` | `SERIAL` | `yes` | Registro asistencia Staff |
| `nsatf` | `VARCHAR (255)` | `yes` | Nombre del colaborador |
| `fstaf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha |
| `hstaf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora entrada |
| `hstaf2` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora salida |
| `asstaf` | `VARCHAR (255)` | `yes` | Asistencia |
| `passtaf` | `VARCHAR (255)` | `yes` | Puntualidad |
| `jussta1` | `BOOLEAN NOT NULL` | `no` | Justificación |
| `jussta` | `VARCHAR (255)` | `yes` | Justificación |
| `comstaf` | `VARCHAR (255)` | `yes` | Comentarios |

### `Statusp`

- Category: `reference`
- Priority: `medium`
- Rows:`2`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `statusper` | `VARCHAR (255)` | `yes` | Activo, Inactivo |

### `Tabla1`

- Category: `obsolete`
- Priority: `low`
- Rows:`87`
- Columns: `2`
- Note: Table de travail ou import ancien probable.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcontr` | `SERIAL` | `yes` |  |
| `clave fer` | `VARCHAR (255)` | `yes` |  |

### `T-AuxiliarASESORES`

- Category: `reference`
- Priority: `low`
- Rows:`81`
- Columns: `13`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `nama` | `VARCHAR (255)` | `yes` | Asesor |
| `fingreso` | `DATE` | `yes` | Fecha ingreso |
| `fsalida` | `DATE` | `yes` | Fecha salida |
| `guardias` | `INTEGER` | `yes` | Guardias |
| `llamadas` | `INTEGER` | `yes` | Llamadas |
| `correos` | `INTEGER` | `yes` | Correos |
| `propvig` | `INTEGER` | `yes` | Propiedades vigentes |
| `altas` | `INTEGER` | `yes` | Altas |
| `cierresalta` | `INTEGER` | `yes` | No de cierres de alta |
| `cierrescierres` | `INTEGER` | `yes` | No de cierres de cierre |
| `totalcierres` | `INTEGER` | `yes` | Total de cierres |
| `antig` | `INTEGER` | `yes` | Antiguedad |
| `status` | `VARCHAR (255)` | `yes` | Status |

### `Terre1`

- Category: `reference`
- Priority: `medium`
- Rows:`2`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `terre1` | `VARCHAR (255)` | `yes` | Tipo de terreno Regular, Irregular |

### `Terre2`

- Category: `reference`
- Priority: `medium`
- Rows:`3`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `terre2` | `VARCHAR (255)` | `yes` | Tipo de terreno Plano, ascendente, descendente |

### `TipoProp`

- Category: `reference`
- Priority: `medium`
- Rows:`21`
- Columns: `2`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `tipoprop` | `VARCHAR (255) NOT NULL` | `no` |  |
| `tipoprop2` | `VARCHAR (255)` | `yes` |  |

### `TipoSocio`

- Category: `reference`
- Priority: `medium`
- Rows:`20`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `tsocio` | `VARCHAR (255)` | `yes` |  |

### `UsosS`

- Category: `reference`
- Priority: `medium`
- Rows:`4`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `usossuelo` | `VARCHAR (255)` | `yes` | Usos de suelo |

### `ValoresProp`

- Category: `core`
- Priority: `high`
- Rows:`3851`
- Columns: `8`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `id` | `SERIAL` | `yes` | Registro |
| `clavevalg` | `VARCHAR (255) NOT NULL` | `no` | Clave de la propiedad |
| `preciovalini` | `NUMERIC(15,2) NOT NULL` | `no` | Valor inicial |
| `fechval` | `TIMESTAMP WITHOUT TIME ZONE NOT NULL` | `no` | Fecha de cambio |
| `monval` | `VARCHAR (255)` | `yes` | Moneda: Pesos, Dólares |
| `motivo` | `VARCHAR (255)` | `yes` | Motivo por el cual cambia |
| `posicion` | `VARCHAR (255)` | `yes` | Control para sistema |
| `cambiominuta` | `VARCHAR (255)` | `yes` | Cambio para señalar en minuta |

### `Ventana`

- Category: `reference`
- Priority: `medium`
- Rows:`3`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `ventan` | `VARCHAR (255)` | `yes` | Ventanería |

### `Visitas`

- Category: `core`
- Priority: `high`
- Rows:`2791`
- Columns: `28`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idvisit` | `SERIAL` | `yes` | Registro de visita |
| `clvisi` | `VARCHAR (255) NOT NULL` | `no` | Clave de la propiedad |
| `direcc` | `VARCHAR (255)` | `yes` | Dirección de la propiedad |
| `fecvis` | `DATE NOT NULL` | `no` | Fecha de la visita |
| `horvis` | `TIMESTAMP WITHOUT TIME ZONE NOT NULL` | `no` | Hora de la visita |
| `inmob` | `VARCHAR (255) NOT NULL` | `no` | Inmobiliaria |
| `asevis` | `VARCHAR (255)` | `yes` | Asesor que realiza la visita |
| `asevis2` | `VARCHAR (255)` | `yes` | Asesor externo que realiza la visita |
| `clienten` | `VARCHAR (255) NOT NULL` | `no` | Nombre del visitante |
| `corrclie` | `VARCHAR (255)` | `yes` | Correo electrónico del interesado |
| `telvis` | `DOUBLE PRECISION` | `yes` | Teléfono del interesado |
| `fpvis` | `VARCHAR (255)` | `yes` | Forma de pago que proyecta el interesado |
| `ecvis` | `VARCHAR (255) NOT NULL` | `no` | Estado de conservación |
| `ubgv` | `VARCHAR (255) NOT NULL` | `no` | Ubicación geográfica |
| `pavis` | `VARCHAR (255) NOT NULL` | `no` | Proyecto arquitectónico |
| `pprom` | `VARCHAR (255) NOT NULL` | `no` | Precio de promoción |
| `limpv` | `VARCHAR (255) NOT NULL` | `no` | Limpieza |
| `atenvis` | `VARCHAR (255) NOT NULL` | `no` | Atención del agente |
| `ampi` | `BOOLEAN NOT NULL` | `no` | AMPI |
| `pais` | `BOOLEAN NOT NULL` | `no` | PAIS |
| `mio` | `BOOLEAN NOT NULL` | `no` | MIO |
| `canaco` | `BOOLEAN NOT NULL` | `no` | CANACO |
| `indep` | `BOOLEAN NOT NULL` | `no` | INDEPENDIENTE |
| `mvis` | `VARCHAR (255) NOT NULL` | `no` | Medio por el que se enteró |
| `mvis2` | `VARCHAR (255)` | `yes` | Medio por el que se enteró nivel 2 |
| `mvis3` | `VARCHAR (255)` | `yes` | Medio por el que se enteró nivel 3 |
| `comcliv` | `TEXT` | `yes` | Comentarios visitante |
| `comasev` | `TEXT` | `yes` | Comentarios visitante |

### `AsesoresALTA`

- Category: `core`
- Priority: `high`
- Rows:`2962`
- Columns: `21`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idcomiases` | `SERIAL` | `yes` | Registro de asesores para ALTA |
| `ccomiases` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `ncomias` | `VARCHAR (255) NOT NULL` | `no` | Nombre del asesor |
| `niasecom` | `VARCHAR (255) NOT NULL` | `no` | Nivel del asesor A o N |
| `ad` | `VARCHAR (255)` | `yes` | Alto desempeño |
| `cpcma` | `INTEGER NOT NULL` | `no` | Porcentaje o Monto |
| `cpparti` | `DOUBLE PRECISION NOT NULL` | `no` | Porcentaje de participación |
| `cmparti` | `NUMERIC(15,2)` | `yes` | Monto que se le asigna al asesor |
| `lacom` | `VARCHAR (255)` | `yes` | Lado ALTA |
| `peraa` | `VARCHAR (255)` | `yes` | Persona Física o Moral |
| `resiscoa` | `BOOLEAN NOT NULL` | `no` | Régimen Simplificado de Confianza |
| `facaa` | `BOOLEAN NOT NULL` | `no` | Factura |
| `facconaa` | `VARCHAR (255)` | `yes` | Concepto por Honorarios o Comisionista |
| `fpca` | `VARCHAR (255)` | `yes` | Forma de Pago |
| `vpa` | `VARCHAR (255)` | `yes` | Vía de Pago Alta |
| `fpa` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de pago de comisión Alta |
| `nap` | `INTEGER` | `yes` | Número de posición del asesor en el proyecto |
| `fpapen` | `DATE` | `yes` | Fecha de pago de penalización |
| `anr` | `BOOLEAN NOT NULL` | `no` | Anular registro de las comisiones |
| `araa` | `BOOLEAN NOT NULL` | `no` | Aplicación especial de retención de administrativa |
| `ca2` | `VARCHAR (254)` | `yes` | Clave pivote |

### `AsesoresMetas`

- Category: `core`
- Priority: `medium`
- Rows:`36`
- Columns: `2`
- Note: Bloc staff, performance, formation ou commissions a regrouper.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `asesormetas` | `VARCHAR (255) NOT NULL` | `no` |  |
| `metasobjetivo` | `VARCHAR (255)` | `yes` |  |

### `Asociaciones`

- Category: `reference`
- Priority: `low`
- Rows:`5`
- Columns: `1`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `asociacion` | `VARCHAR (255)` | `yes` |  |

### `ConcepIngresosEgresos`

- Category: `reference`
- Priority: `medium`
- Rows:`132`
- Columns: `7`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idconcep` | `SERIAL` | `yes` |  |
| `concepto` | `VARCHAR (255)` | `yes` |  |
| `movc` | `VARCHAR (255)` | `yes` |  |
| `cat1ord` | `INTEGER` | `yes` |  |
| `cat1` | `VARCHAR (255)` | `yes` |  |
| `cat2` | `VARCHAR (255)` | `yes` |  |
| `movcn` | `INTEGER` | `yes` |  |

### `Credito1`

- Category: `reference`
- Priority: `medium`
- Rows:`5`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `credito1` | `VARCHAR (255)` | `yes` | Banco, Infonavit, Hir Casa |

### `Entidades`

- Category: `reference`
- Priority: `medium`
- Rows:`32`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `entidad` | `VARCHAR (255)` | `yes` |  |

### `Giro`

- Category: `reference`
- Priority: `medium`
- Rows:`13`
- Columns: `2`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `giro` | `VARCHAR (255)` | `yes` |  |
| `cgiro` | `VARCHAR (255)` | `yes` |  |

### `HJuridica`

- Category: `reference`
- Priority: `low`
- Rows:`4`
- Columns: `1`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `hjuridica` | `VARCHAR (255)` | `yes` | Herramienta jurídica |

### `ListaNegra`

- Category: `reference`
- Priority: `low`
- Rows:`0`
- Columns: `7`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idbl` | `SERIAL` | `yes` | idbl |
| `asesorbl` | `VARCHAR (255)` | `yes` | Asesor |
| `fabl` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha en la que se registra el reporte |
| `mabl` | `VARCHAR (255)` | `yes` | Asunto o tema que generó el registro |
| `detmabl` | `VARCHAR (255)` | `yes` | Descripción del tema |
| `efectosbl` | `VARCHAR (255)` | `yes` | Efectos que generó la acción en cuestión |
| `conclusiónbl` | `VARCHAR (255)` | `yes` | Conclusión o status del asunto |

### `Llaves`

- Category: `core`
- Priority: `high`
- Rows:`2402`
- Columns: `20`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idllave` | `SERIAL` | `yes` | Registro de llaves |
| `fllave` | `DATE` | `yes` | Fecha de préstamo |
| `hllave` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora del préstamo |
| `fapart` | `DATE` | `yes` | Fecha de apartado |
| `hapart` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora del apartado |
| `cllaves` | `VARCHAR (255) NOT NULL` | `no` | Clave de la propiedad |
| `nombllav` | `VARCHAR (255)` | `yes` | Nombre del responsable interno |
| `nombllave` | `VARCHAR (255)` | `yes` | Nombre del responsable externo |
| `inmbllav` | `VARCHAR (255) NOT NULL` | `no` | Inmobiliaria |
| `telllav` | `DOUBLE PRECISION` | `yes` | Teléfono |
| `idrpllav` | `VARCHAR (255)` | `yes` | Identificación que deja |
| `depllav` | `NUMERIC(15,2)` | `yes` | Depósito $ por préstamo |
| `statllave` | `VARCHAR (255)` | `yes` | Status Disponibles, Apartadas, Prestadas |
| `iddocllav` | `Unknown_0012` | `yes` |  |
| `firmallav` | `VARCHAR (255)` | `yes` | Firma de préstamo |
| `fellave` | `DATE` | `yes` | Fecha de devolución |
| `hdevlla` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de devolución |
| `firmallav2` | `VARCHAR (255)` | `yes` | Firma de devolución |
| `fecliente` | `DATE` | `yes` | Fecha de entrega a Cliente |
| `comllav` | `VARCHAR (255)` | `yes` | Comentarios |

### `PagosParcialesRefExc`

- Category: `core`
- Priority: `medium`
- Rows:`4`
- Columns: `22`
- Note: Table operationnelle ou financiere a normaliser avant import.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idppre` | `SERIAL` | `yes` | Registro pago parcial referido exclusiva |
| `claveppre` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `asesorre` | `VARCHAR (255)` | `yes` | Asesor referido exclusiva |
| `nivelre` | `VARCHAR (255)` | `yes` | Nivel de asesor referido exclusiva |
| `napre` | `INTEGER` | `yes` | Posición |
| `cpparti2re` | `DOUBLE PRECISION` | `yes` | Participación |
| `npagoppre` | `INTEGER` | `yes` | Número de pago |
| `porcpare` | `DOUBLE PRECISION` | `yes` | Porcentaje de pago para referido exclusiva |
| `comitotalrc` | `NUMERIC(15,2)` | `yes` | Comisión total referido de cierre |
| `montoppre` | `DOUBLE PRECISION` | `yes` | Monto del pago Parcial referido exclusiva |
| `fechappre` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha del cobro parcial |
| `factppre` | `BOOLEAN NOT NULL` | `no` | Factura Sí/No |
| `perppre` | `VARCHAR (255)` | `yes` | Persona Física o Moral |
| `resiscopprefexc` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal |
| `concppre` | `VARCHAR (255)` | `yes` | Concepto Honorarios, Comisión, Consultoría, Socio |
| `formppre` | `VARCHAR (255)` | `yes` | Forma de Pago |
| `viappre` | `VARCHAR (255)` | `yes` | Vía de pago Directa o por administradora |
| `fechppre` | `DATE` | `yes` | Fecha de pago de comisión parcial |
| `conppre` | `VARCHAR (255)` | `yes` | Concepto referido exclusiva |
| `conppre2` | `VARCHAR (255)` | `yes` | Concepto referido exclusiva 2 |
| `lacomre` | `VARCHAR (255)` | `yes` | Lado |
| `comppre` | `VARCHAR (255)` | `yes` | Comentarios |

### `Portales actividad Feb 2019`

- Category: `archive`
- Priority: `low`
- Rows:`112`
- Columns: `17`
- Note: Archive mensuelle ou copie de travail a consolider.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idp` | `SERIAL` | `yes` |  |
| `fechainf` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` |  |
| `domicipor` | `VARCHAR (255)` | `yes` |  |
| `valorport` | `NUMERIC(15,2)` | `yes` |  |
| `claveportalin` | `VARCHAR (255)` | `yes` |  |
| `remax` | `INTEGER` | `yes` |  |
| `ampi` | `INTEGER` | `yes` |  |
| `inm24` | `INTEGER` | `yes` |  |
| `mcub` | `INTEGER` | `yes` |  |
| `ml` | `INTEGER` | `yes` |  |
| `cyt` | `INTEGER` | `yes` |  |
| `sm` | `INTEGER` | `yes` |  |
| `nock` | `INTEGER` | `yes` |  |
| `inm` | `INTEGER` | `yes` |  |
| `lamudi` | `INTEGER` | `yes` |  |
| `viva` | `INTEGER` | `yes` |  |
| `statusp` | `VARCHAR (255)` | `yes` |  |

### `Prospectación`

- Category: `core`
- Priority: `high`
- Rows:`1`
- Columns: `28`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idllp` | `SERIAL` | `yes` | Registro de correos, llamadas y visitas |
| `interllp` | `VARCHAR (255)` | `yes` | Nombre del prospecto |
| `telllp` | `VARCHAR (255)` | `yes` | Teléfono |
| `tel2p` | `DOUBLE PRECISION` | `yes` | Teléfono |
| `tipollp` | `VARCHAR (255)` | `yes` | Llamada, correo o visita |
| `operllp` | `VARCHAR (255)` | `yes` | Adquirir, ofrecer |
| `pnip` | `VARCHAR (255)` | `yes` | Propiedad nueva o de Inventario |
| `clavellp` | `VARCHAR (255)` | `yes` | Clave de la propiedad del inventario |
| `correollp` | `VARCHAR (255)` | `yes` | Buzón de correo electrónico |
| `vistallp` | `VARCHAR (255)` | `yes` | Dónde vió la propiedad |
| `portalllp` | `VARCHAR (255)` | `yes` | Portal |
| `asesllp` | `VARCHAR (255)` | `yes` | Asesor Remax Activa |
| `fechllsp` | `DATE` | `yes` | Fecha en Sistema |
| `horallsp` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora en Sistema |
| `fechlllp` | `DATE` | `yes` | Fecha de Llamada, correo o visita |
| `horalllp` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Hora de Llamada, correo o visita |
| `comllp` | `VARCHAR (255)` | `yes` | Comentarios |
| `statuspropp` | `VARCHAR (255)` | `yes` | Status de la propiedad en prospecto |
| `colgrlp` | `VARCHAR (255)` | `yes` | Colonia |
| `tipogral` | `VARCHAR (255)` | `yes` | Casa, apartamento, Bodega, Local, Oficina, terreno, etc |
| `callegrlp` | `VARCHAR (255)` | `yes` | Calle |
| `npgrlp` | `VARCHAR (255)` | `yes` | Número |
| `nigrl` | `VARCHAR (255)` | `yes` | Número Interior |
| `entregrlp` | `VARCHAR (255)` | `yes` | Entre calles |
| `mungrlp` | `VARCHAR (255)` | `yes` | Municipio |
| `fraccgrlp` | `VARCHAR (255)` | `yes` | Fraccionamiento |
| `cpgrlp` | `VARCHAR (255)` | `yes` | Código Postal |
| `entigrlp` | `VARCHAR (255)` | `yes` | Entidad |

### `ReferidoALTA`

- Category: `core`
- Priority: `high`
- Rows:`69`
- Columns: `13`
- Note: Table directement exploitable pour la migration initiale.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idrefa` | `SERIAL` | `yes` | Registro de referido para ALTA |
| `crefa` | `VARCHAR (255)` | `yes` | Clave de la propiedad |
| `nrefa` | `VARCHAR (255)` | `yes` | Nombre del referido |
| `emprefa` | `VARCHAR (255)` | `yes` | Empresa referido Alta |
| `laref` | `VARCHAR (255)` | `yes` | Lado ALTA |
| `fmrefa` | `VARCHAR (255)` | `yes` | Persona Física o Moral |
| `resiscoaref` | `BOOLEAN NOT NULL` | `no` | Régimen fiscal Resisco |
| `facrefa` | `BOOLEAN NOT NULL` | `no` | Factura |
| `faccrefa` | `VARCHAR (255)` | `yes` | Concepto por Honorarios o Comisionista |
| `fpagrefa` | `VARCHAR (255)` | `yes` | Forma de Pago |
| `vparefa` | `VARCHAR (255)` | `yes` | Vía de Pago Alta |
| `fecprefaa` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de pago de comisión Alta |
| `arara` | `BOOLEAN NOT NULL` | `no` | Aplicación especial de retención administrativa Referido Alta |

### `Requerimientos`

- Category: `reference`
- Priority: `low`
- Rows:`1`
- Columns: `10`
- Note: A confirmer apres revue manuelle du dictionnaire complet.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `idreq` | `SERIAL` | `yes` | Registro |
| `reqfec` | `TIMESTAMP WITHOUT TIME ZONE` | `yes` | Fecha de solicitud |
| `reqas` | `INTEGER` | `yes` | Asesor que solicita |
| `reqas2` | `VARCHAR (255)` | `yes` | Asesor que solicita |
| `reqtipo` | `VARCHAR (255)` | `yes` | Tipo de propiedad que se requiere |
| `reqvr` | `VARCHAR (255)` | `yes` | Venta o Renta |
| `reqpr` | `NUMERIC(15,2)` | `yes` | Presupuesto |
| `reqzon` | `VARCHAR (255)` | `yes` | Zona |
| `reqcol` | `VARCHAR (255)` | `yes` | Colonia |
| `reqcom` | `VARCHAR (255)` | `yes` | Comentarios |

### `Tabla2`

- Category: `obsolete`
- Priority: `low`
- Rows:`54`
- Columns: `2`
- Note: Table de travail ou import ancien probable.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `id` | `SERIAL` | `yes` |  |
| `claves cerradas` | `VARCHAR (255)` | `yes` |  |

### `TUbica`

- Category: `reference`
- Priority: `medium`
- Rows:`3`
- Columns: `1`
- Note: Table de reference ou liste de valeurs.

| Column | Type | Nullable | Comment |
| --- | --- | --- | --- |
| `tubic` | `VARCHAR (255)` | `yes` | Tipo de ubicación |


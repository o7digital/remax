#!/usr/bin/env python3

from __future__ import annotations

import json
import re
import subprocess
from dataclasses import asdict, dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "bdd" / "REMAXDB_be.accdb"
JSON_OUTPUT = ROOT / "bdd" / "access-inventory.json"
MARKDOWN_OUTPUT = ROOT / "docs" / "remax-access-dictionary.md"


@dataclass
class Column:
    name: str
    data_type: str
    nullable: bool
    comment: str | None = None


@dataclass
class TableInventory:
    source_name: str
    normalized_name: str
    category: str
    priority: str
    row_count: int | None
    column_count: int
    notes: list[str]
    columns: list[Column]


def run_command(*args: str) -> str:
    result = subprocess.run(args, check=True, capture_output=True, text=True)
    return result.stdout


def slug(value: str) -> str:
    cleaned = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return cleaned or "table"


def classify_table(name: str) -> tuple[str, str, list[str]]:
    lower = name.lower()
    notes: list[str] = []

    archive_prefixes = (
        "marketing ",
        "copia de marketing",
        "portal actividad",
        "portales actividad",
        "portalesok",
        "destacadas",
    )

    reference_names = {
        "acabados",
        "actividades",
        "calidprop",
        "califprop",
        "calipe",
        "carpint",
        "catprop1",
        "catprop2",
        "clasificcons",
        "concepingresos",
        "concepingresosegresos",
        "concepegresos",
        "condcompra",
        "condiciones",
        "credito1",
        "credito2",
        "cristales",
        "entidades",
        "escrituradores",
        "estilop",
        "fachada",
        "fechascont",
        "fpago",
        "giro",
        "herramientas",
        "hipotecas",
        "idiomas",
        "moneda",
        "municipios",
        "notaríasesc",
        "notariasesc",
        "operaprop",
        "origen",
        "origen2",
        "puertas",
        "renta condic",
        "rotulos",
        "rótulos",
        "salas",
        "statusp",
        "terre1",
        "terre2",
        "tipoprop",
        "tiposocio",
        "tubica",
        "usoss",
        "ventana",
    }

    obsolete_names = {"hoja1", "tabla1", "tabla2"}

    if lower in obsolete_names:
        return "obsolete", "low", ["Table de travail ou import ancien probable."]

    if lower.startswith(archive_prefixes):
        return "archive", "low", ["Archive mensuelle ou copie de travail a consolider."]

    if lower in reference_names:
        return "reference", "medium", ["Table de reference ou liste de valeurs."]

    if lower in {
        "propiedades",
        "propietariosalta",
        "compradores",
        "asesoresinternos",
        "asesoresalta",
        "asesorescierre",
        "asesorescancel",
        "comisionesbd",
        "finiquitos",
        "guardias",
        "staffasistencia",
        "asesoractivok",
        "marketing",
        "visitas",
        "recorridos",
        "valoresprop",
        "llaves",
        "expediente",
        "expedientescontrol",
        "ofertas",
        "ofertasasesores",
        "referidoalta",
        "referidocierre",
        "referidos pre",
        "referidoscobrados",
        "prospectación",
        "prospectacion",
    }:
        return "core", "high", ["Table directement exploitable pour la migration initiale."]

    if lower.startswith("asesor") or lower.startswith("asesores"):
        return "core", "medium", ["Bloc staff, performance, formation ou commissions a regrouper."]

    if any(
        lower.startswith(prefix)
        for prefix in (
            "pagosparciales",
            "ingresos-egresos",
            "movadmon",
            "admonrentas",
            "penal",
            "comisiones",
            "portalinforme",
            "publicdigital",
            "renovacioncontratos",
            "propi",
            "recorridos",
            "llamadas",
            "clientecomentarios",
            "directorio remax",
        )
    ):
        return "core", "medium", ["Table operationnelle ou financiere a normaliser avant import."]

    return "reference", "low", ["A confirmer apres revue manuelle du dictionnaire complet."]


def parse_schema(table_name: str) -> list[Column]:
    schema = run_command("mdb-schema", "-T", table_name, str(DB_PATH), "postgres")
    lines = schema.splitlines()
    columns: list[Column] = []
    comments: dict[str, str] = {}
    in_create = False

    for raw_line in lines:
        line = raw_line.rstrip()
        if line.startswith("CREATE TABLE"):
            in_create = True
            continue
        if in_create:
            if line.strip() == ");":
                in_create = False
                continue
            match = re.match(r'\s*"([^"]+)"\s+(.+?)(,)?\s*$', line)
            if match:
                name = match.group(1)
                data_type = match.group(2).strip()
                nullable = "NOT NULL" not in data_type.upper()
                columns.append(
                    Column(
                        name=name,
                        data_type=data_type,
                        nullable=nullable,
                    )
                )
        comment_match = re.match(
            r'COMMENT ON COLUMN ".*?"\."([^"]+)" IS \'(.*)\';',
            line,
        )
        if comment_match:
            comments[comment_match.group(1)] = comment_match.group(2)

    for column in columns:
        column.comment = comments.get(column.name)

    return columns


def get_row_count(table_name: str) -> int | None:
    try:
        value = run_command("mdb-count", str(DB_PATH), table_name).strip()
        return int(value)
    except Exception:
        return None


def build_inventory() -> list[TableInventory]:
    table_names = [line.strip() for line in run_command("mdb-tables", "-1", str(DB_PATH)).splitlines() if line.strip()]
    inventory: list[TableInventory] = []

    for table_name in table_names:
        category, priority, notes = classify_table(table_name)
        columns = parse_schema(table_name)
        inventory.append(
            TableInventory(
                source_name=table_name,
                normalized_name=slug(table_name),
                category=category,
                priority=priority,
                row_count=get_row_count(table_name),
                column_count=len(columns),
                notes=notes,
                columns=columns,
            )
        )

    return inventory


def write_json(inventory: list[TableInventory]) -> None:
    payload = {
        "database_file": str(DB_PATH.relative_to(ROOT)),
        "table_count": len(inventory),
        "tables": [
            {
                **asdict(table),
                "columns": [asdict(column) for column in table.columns],
            }
            for table in inventory
        ],
    }
    JSON_OUTPUT.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n")


def render_summary_table(tables: list[TableInventory]) -> list[str]:
    lines = [
        "| Table | Category | Priority | Rows | Columns |",
        "| --- | --- | --- | ---: | ---: |",
    ]
    for table in tables:
        row_count = "?" if table.row_count is None else str(table.row_count)
        lines.append(
            f"| `{table.source_name}` | `{table.category}` | `{table.priority}` | {row_count} | {table.column_count} |"
        )
    return lines


def write_markdown(inventory: list[TableInventory]) -> None:
    category_counts: dict[str, int] = {}
    for table in inventory:
        category_counts[table.category] = category_counts.get(table.category, 0) + 1

    core_high = [table for table in inventory if table.category == "core" and table.priority == "high"]
    archives = [table for table in inventory if table.category == "archive"]
    references = [table for table in inventory if table.category == "reference"]
    obsolete = [table for table in inventory if table.category == "obsolete"]

    lines: list[str] = []
    lines.append("# REMAX Access Dictionary")
    lines.append("")
    lines.append(f"Source file: `{DB_PATH.relative_to(ROOT)}`")
    lines.append("")
    lines.append("## Summary")
    lines.append("")
    lines.append(f"- Tables inventoried: `{len(inventory)}`")
    lines.append(f"- Core tables: `{category_counts.get('core', 0)}`")
    lines.append(f"- Reference tables: `{category_counts.get('reference', 0)}`")
    lines.append(f"- Archive tables: `{category_counts.get('archive', 0)}`")
    lines.append(f"- Obsolete tables: `{category_counts.get('obsolete', 0)}`")
    lines.append("")
    lines.append("## Core Tables To Migrate First")
    lines.append("")
    lines.extend(render_summary_table(core_high))
    lines.append("")
    lines.append("## Archive Families")
    lines.append("")
    lines.append("These tables should not become first-class Postgres tables. They are mainly monthly copies, exports or work snapshots.")
    lines.append("")
    lines.extend(render_summary_table(archives[:60]))
    lines.append("")
    lines.append("## Reference Tables")
    lines.append("")
    lines.extend(render_summary_table(references[:80]))
    lines.append("")
    if obsolete:
        lines.append("## Obsolete Or Temporary Tables")
        lines.append("")
        lines.extend(render_summary_table(obsolete))
        lines.append("")
    lines.append("## Detailed Dictionary")
    lines.append("")

    for table in inventory:
        lines.append(f"### `{table.source_name}`")
        lines.append("")
        lines.append(f"- Category: `{table.category}`")
        lines.append(f"- Priority: `{table.priority}`")
        lines.append(f"- Rows: `{table.row_count if table.row_count is not None else '?'} `".replace(" `", "`"))
        lines.append(f"- Columns: `{table.column_count}`")
        for note in table.notes:
            lines.append(f"- Note: {note}")
        lines.append("")
        lines.append("| Column | Type | Nullable | Comment |")
        lines.append("| --- | --- | --- | --- |")
        for column in table.columns:
            comment = column.comment or ""
            nullable = "yes" if column.nullable else "no"
            lines.append(
                f"| `{column.name}` | `{column.data_type}` | `{nullable}` | {comment} |"
            )
        lines.append("")

    MARKDOWN_OUTPUT.write_text("\n".join(lines) + "\n")


def main() -> None:
    if not DB_PATH.exists():
        raise SystemExit(f"Missing Access file: {DB_PATH}")
    inventory = build_inventory()
    write_json(inventory)
    write_markdown(inventory)
    print(f"Wrote {JSON_OUTPUT.relative_to(ROOT)}")
    print(f"Wrote {MARKDOWN_OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

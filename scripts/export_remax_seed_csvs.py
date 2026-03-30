#!/usr/bin/env python3

from __future__ import annotations

import csv
import hashlib
import json
import re
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "bdd" / "REMAXDB_be.accdb"
INVENTORY_PATH = ROOT / "bdd" / "access-inventory.json"
OUTPUT_DIR = ROOT / "bdd" / "exports"


def load_inventory() -> dict[str, list[str]]:
    data = json.loads(INVENTORY_PATH.read_text())
    return {
        table["source_name"]: [column["name"] for column in table["columns"]]
        for table in data["tables"]
    }


def export_rows(table_name: str, columns: list[str]) -> list[dict[str, str]]:
    raw = subprocess.check_output(
        ["mdb-export", "-D", "%Y-%m-%d %H:%M:%S", "-d", "|", str(DB_PATH), table_name],
        text=True,
    )
    rows: list[dict[str, str]] = []
    reader = csv.reader(raw.splitlines(), delimiter="|")
    for raw_row in reader:
        if raw_row and raw_row[0].strip().lower() == columns[0].strip().lower():
            continue
        padded = raw_row + [""] * max(0, len(columns) - len(raw_row))
        row = {columns[i]: padded[i] if i < len(padded) else "" for i in range(len(columns))}
        rows.append(row)
    return rows


def normalize_spaces(value: str | None) -> str | None:
    if value is None:
        return None
    value = re.sub(r"\s+", " ", value).strip()
    return value or None


def normalize_name_key(value: str | None) -> str:
    return re.sub(r"\s+", " ", (value or "").strip()).lower()


def parse_date(value: str | None) -> str | None:
    value = normalize_spaces(value)
    if not value:
        return None
    match = re.match(r"(\d{2})/(\d{2})/(\d{2,4})", value)
    if not match:
        return None
    month, day, year = match.groups()
    year_int = int(year)
    if year_int < 100:
        year_int += 2000 if year_int < 70 else 1900
    month_int = int(month)
    day_int = int(day)
    if month_int < 1 or month_int > 12 or day_int < 1 or day_int > 31:
        return None
    return f"{year_int:04d}-{month_int:02d}-{day_int:02d}"


def parse_time_fragment(value: str | None) -> str | None:
    value = normalize_spaces(value)
    if not value:
        return None
    match = re.search(r"(\d{2}):(\d{2})(?::(\d{2}))?", value)
    if not match:
        return None
    hh, mm, ss = match.groups()
    return f"{hh}:{mm}:{ss or '00'}"


def combine_date_time(date_value: str | None, time_value: str | None) -> str | None:
    parsed_date = parse_date(date_value)
    parsed_time = parse_time_fragment(time_value)
    if not parsed_date:
        return None
    if not parsed_time:
        return f"{parsed_date}T00:00:00"
    return f"{parsed_date}T{parsed_time}"


def parse_bool_from_si_no(value: str | None) -> bool | None:
    value = (value or "").strip().lower()
    if value in {"1", "true", "si", "sí", "y", "yes"}:
        return True
    if value in {"0", "false", "no", "n"}:
        return False
    return None


def parse_number_string(value: str | None) -> str | None:
    value = normalize_spaces(value)
    if not value:
        return None
    value = value.replace("$", "").replace(" ", "")
    return value or None


def normalize_staff_kind(role_value: str | None) -> str:
    value = (role_value or "").strip().lower()
    if "gerent" in value or "direc" in value:
        return "manager"
    if "recep" in value:
        return "reception"
    if "staff" in value or "admin" in value:
        return "admin"
    return "advisor"


def normalize_advisor_class(value: str | None, default_staff_kind: str) -> str:
    token = (value or "").strip().upper()
    if token == "A":
        return "A"
    if token in {"M", "N"}:
        return "M"
    return "staff" if default_staff_kind != "advisor" else "M"


def normalize_employment_status(value: str | None) -> str:
    token = (value or "").strip().lower()
    if token.startswith("act"):
        return "active"
    if token.startswith("inact") or "hist" in token:
        return "inactive"
    return "inactive"


def normalize_property_status(value: str | None) -> str:
    token = (value or "").strip().lower()
    mapping = {
        "activa": "active",
        "cerrada": "closed",
        "cancelada": "cancelled",
        "inactiva": "inactive",
    }
    return mapping.get(token, "draft")


def normalize_listing_category(value: str | None) -> str | None:
    token = (value or "").strip().lower()
    mapping = {
        "exclusiva": "exclusive",
        "opcion": "option",
        "opción": "option",
        "coop": "coop",
    }
    return mapping.get(token, "other" if token else None)


def normalize_business_line(value: str | None) -> str | None:
    token = (value or "").strip().lower()
    mapping = {
        "residencial": "residential",
        "comercial": "commercial",
        "industrial": "industrial",
        "terreno": "land",
    }
    return mapping.get(token, "other" if token else None)


def normalize_operation(value: str | None) -> str | None:
    token = (value or "").strip().lower()
    mapping = {
        "venta": "sale",
        "renta": "rent",
    }
    return mapping.get(token, "other" if token else None)


def normalize_currency(value: str | None) -> str:
    token = (value or "").strip().lower()
    if token in {"pesos", "mxn"}:
        return "MXN"
    if token in {"dolares", "dólares", "usd"}:
        return "USD"
    return "MXN"


def stable_uuid(namespace: str, legacy_key: str) -> str:
    digest = hashlib.md5(f"{namespace}:{legacy_key}".encode()).hexdigest()
    return f"{digest[:8]}-{digest[8:12]}-{digest[12:16]}-{digest[16:20]}-{digest[20:32]}"


def build_staff_lookup() -> dict[str, str]:
    inventory = load_inventory()
    rows = export_rows("AsesoresInternos", inventory["AsesoresInternos"])
    lookup: dict[str, str] = {}
    for row in rows:
        legacy_id = row["idai"]
        full_name = normalize_spaces(
            row["ncai"] or " ".join(part for part in [row["noma"], row["ape1a"], row["ape2a"]] if part)
        )
        if full_name:
            lookup[normalize_name_key(full_name)] = stable_uuid("staff", legacy_id)
        alias = normalize_spaces(row["alias"])
        if alias:
            lookup[normalize_name_key(alias)] = stable_uuid("staff", legacy_id)
    return lookup


def build_property_lookup() -> set[str]:
    inventory = load_inventory()
    rows = export_rows("PROPIEDADES", inventory["PROPIEDADES"])
    keys: set[str] = set()
    for row in rows:
        property_key = normalize_spaces(row["claveprop"])
        if property_key:
            keys.add(property_key)
    return keys


def build_deal_lookup(valid_property_keys: set[str]) -> set[str]:
    inventory = load_inventory()
    rows = export_rows("Finiquitos", inventory["Finiquitos"])
    keys: set[str] = set()
    for row in rows:
        property_key = normalize_spaces(row["clvfini"])
        if not property_key or property_key not in valid_property_keys:
            continue
        if property_key in keys:
            continue
        keys.add(property_key)
    return keys


def export_staff_members() -> Path:
    inventory = load_inventory()
    rows = export_rows("AsesoresInternos", inventory["AsesoresInternos"])
    out_path = OUTPUT_DIR / "staff_members.csv"
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "id",
        "legacy_access_id",
        "legacy_full_name",
        "first_name",
        "last_name",
        "display_name",
        "staff_kind",
        "advisor_class",
        "employment_status",
        "is_guard_eligible",
        "tax_id",
        "tax_regime",
        "bank_name",
        "bank_account",
        "bank_clabe",
        "mobile_phone",
        "office_phone",
        "personal_email",
        "work_email",
        "address_line_1",
        "neighborhood",
        "city",
        "state",
        "postal_code",
        "country",
        "joined_on",
        "first_joined_on",
        "left_on",
        "notes",
    ]
    with out_path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for index, row in enumerate(rows, start=1):
            legacy_id = row["idai"]
            full_name = normalize_spaces(
                row["ncai"] or " ".join(part for part in [row["noma"], row["ape1a"], row["ape2a"]] if part)
            )
            display_name = full_name or normalize_spaces(row["alias"]) or "Sin nombre"
            staff_kind = normalize_staff_kind(row["asa"] or row["aperfa"])
            writer.writerow(
                {
                    "id": stable_uuid("staff", legacy_id),
                    "legacy_access_id": legacy_id,
                    "legacy_full_name": full_name,
                    "first_name": normalize_spaces(row["noma"]),
                    "last_name": normalize_spaces(" ".join(part for part in [row["ape1a"], row["ape2a"]] if part)),
                    "display_name": display_name,
                    "staff_kind": staff_kind,
                    "advisor_class": normalize_advisor_class(row["ta"], staff_kind),
                    "employment_status": normalize_employment_status(row["statusa"] or row["vigen2"] or row["vigas"]),
                    "is_guard_eligible": str(bool(parse_bool_from_si_no(row["guard"])) ).lower(),
                    "tax_id": normalize_spaces(row["rfca"]),
                    "tax_regime": "RESICO" if parse_bool_from_si_no(row["rfasesor"]) else None,
                    "bank_name": normalize_spaces(row["bancoase"]),
                    "bank_account": normalize_spaces(row["cuentaase"]),
                    "bank_clabe": normalize_spaces(row["clabease"]),
                    "mobile_phone": normalize_spaces(row["movila"]),
                    "office_phone": normalize_spaces(row["toa"]),
                    "personal_email": normalize_spaces(row["cpea"]),
                    "work_email": normalize_spaces(row["craa"]),
                    "address_line_1": normalize_spaces(" ".join(part for part in [row["calla"], row["nea"], row["nia"]] if part)),
                    "neighborhood": normalize_spaces(row["cola"] or row["fra"]),
                    "city": normalize_spaces(row["muna"]),
                    "state": normalize_spaces(row["enta"]),
                    "postal_code": normalize_spaces(row["cpa"]),
                    "country": "MX",
                    "joined_on": parse_date(row["fia"]),
                    "first_joined_on": parse_date(row["fechapingreso"] or row["fingre"]),
                    "left_on": parse_date(row["fsa"]),
                    "notes": normalize_spaces(row["comenase"]),
                }
            )
    return out_path


def export_properties() -> Path:
    inventory = load_inventory()
    rows = export_rows("PROPIEDADES", inventory["PROPIEDADES"])
    out_path = OUTPUT_DIR / "properties.csv"
    fieldnames = [
        "id",
        "legacy_access_id",
        "legacy_key",
        "property_key",
        "original_property_key",
        "title",
        "description",
        "property_status",
        "listing_category",
        "business_line",
        "property_type",
        "operation_type",
        "source_primary",
        "source_secondary",
        "source_referral_name",
        "source_referral_company",
        "contract_signed_on",
        "promotion_started_on",
        "listed_on",
        "street",
        "exterior_number",
        "interior_number",
        "building",
        "floor",
        "neighborhood",
        "subdivision",
        "municipality",
        "state",
        "postal_code",
        "country",
        "full_address",
        "remax_url",
        "cadastral_key",
        "appointment_mode",
        "appointment_contact_name",
        "appointment_contact_phone",
        "key_box_number",
        "key_status",
        "key_returned_on",
        "visit_availability",
        "list_price",
        "currency_code",
        "lot_area_m2",
        "construction_area_m2",
        "bedrooms",
        "bathrooms",
        "half_bathrooms",
        "parking_spaces",
        "floors",
        "age_years",
        "land_shape",
        "land_topography",
        "land_position",
        "land_use",
        "visit_count",
        "internal_notes",
    ]
    with out_path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for index, row in enumerate(rows, start=1):
            legacy_id = row["idprop"]
            property_key = normalize_spaces(row["claveprop"]) or f"legacy-{legacy_id}"
            writer.writerow(
                {
                    "id": stable_uuid("property", property_key),
                    "legacy_access_id": legacy_id,
                    "legacy_key": normalize_spaces(row["claveprop"]),
                    "property_key": property_key,
                    "original_property_key": normalize_spaces(row["clavepropor"]),
                    "title": normalize_spaces(row["domp"] or row["callegrl"] or row["fraccgrl"]),
                    "description": normalize_spaces(row["desres"]),
                    "property_status": normalize_property_status(row["statusprop"]),
                    "listing_category": normalize_listing_category(row["catgral2"]),
                    "business_line": normalize_business_line(row["girogral"]),
                    "property_type": normalize_spaces(row["tipogral"]),
                    "operation_type": normalize_operation(row["opercgral"]),
                    "source_primary": normalize_spaces(row["origen"]),
                    "source_secondary": normalize_spaces(row["origen2"]),
                    "source_referral_name": normalize_spaces(row["origperra"]),
                    "source_referral_company": normalize_spaces(row["origempra"]),
                    "contract_signed_on": parse_date(row["fcontrato"]),
                    "promotion_started_on": parse_date(row["finicio"]),
                    "listed_on": parse_date(row["fechagrl"]),
                    "street": normalize_spaces(row["callegrl"]),
                    "exterior_number": normalize_spaces(row["npgrl"]),
                    "interior_number": normalize_spaces(row["nigrl"]),
                    "building": normalize_spaces(row["edifgrl"]),
                    "floor": normalize_spaces(row["pisogrl"]),
                    "neighborhood": normalize_spaces(row["colgrl"]),
                    "subdivision": normalize_spaces(row["fraccgrl"]),
                    "municipality": normalize_spaces(row["mungrl"]),
                    "state": normalize_spaces(row["entigrl"]),
                    "postal_code": normalize_spaces(row["cpgrl"]),
                    "country": "MX",
                    "full_address": normalize_spaces(row["domp"]),
                    "remax_url": normalize_spaces(row["claveprop2"]),
                    "cadastral_key": normalize_spaces(row["ccatgrl"]),
                    "appointment_mode": normalize_spaces(row["condvisres"]),
                    "appointment_contact_name": normalize_spaces(row["nomcitas"]),
                    "appointment_contact_phone": normalize_spaces(row["telcitares"]),
                    "key_box_number": normalize_spaces(row["cajallaves"]),
                    "key_status": normalize_spaces(row["statusllavesp"]),
                    "key_returned_on": parse_date(row["fdcllaves"]),
                    "visit_availability": normalize_spaces(row["dispvislla"]),
                    "list_price": parse_number_string(row["preciocondi"]),
                    "currency_code": normalize_currency(row["monedacondi"]),
                    "lot_area_m2": parse_number_string(row["suptres"]),
                    "construction_area_m2": parse_number_string(row["supcres"]),
                    "bedrooms": normalize_spaces(row["recres"]),
                    "bathrooms": normalize_spaces(row["bañosres"]),
                    "half_bathrooms": normalize_spaces(row["mbañosres"]),
                    "parking_spaces": normalize_spaces(row["estacionres"]),
                    "floors": normalize_spaces(row["ptres"]),
                    "age_years": normalize_spaces(row["edadres"]),
                    "land_shape": normalize_spaces(row["tgres"]),
                    "land_topography": normalize_spaces(row["tpres"]),
                    "land_position": normalize_spaces(row["ubicterres"]),
                    "land_use": normalize_spaces(row["usores"]),
                    "visit_count": normalize_spaces(row["visitas"]) or "0",
                    "internal_notes": normalize_spaces(row["comeprop"] or row["notasres"]),
                }
            )
    return out_path


def export_property_contacts(valid_property_keys: set[str]) -> Path:
    inventory = load_inventory()
    owners = export_rows("PropietariosALTA", inventory["PropietariosALTA"])
    buyers = export_rows("Compradores", inventory["Compradores"])
    out_path = OUTPUT_DIR / "property_contacts.csv"
    fieldnames = [
        "id",
        "property_id",
        "legacy_access_id",
        "contact_kind",
        "full_name",
        "first_name",
        "last_name",
        "email",
        "phone",
        "is_primary",
        "sequence_number",
        "notes",
    ]
    with out_path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in owners:
            legacy_id = row["idprpalta"]
            property_key = normalize_spaces(row["clvpropi"])
            full_name = normalize_spaces(row["ncpr"] or " ".join(part for part in [row["npropi"], row["apep1"], row["apep2"]] if part))
            if not full_name or not property_key or property_key not in valid_property_keys:
                continue
            writer.writerow(
                {
                    "id": stable_uuid("contact-owner", legacy_id),
                    "property_id": stable_uuid("property", property_key or f"owner-{legacy_id}"),
                    "legacy_access_id": legacy_id,
                    "contact_kind": "owner",
                    "full_name": full_name,
                    "first_name": normalize_spaces(row["npropi"]),
                    "last_name": normalize_spaces(" ".join(part for part in [row["apep1"], row["apep2"]] if part)),
                    "email": normalize_spaces(row["correopa"]),
                    "phone": normalize_spaces(row["telprop"]),
                    "is_primary": str((row["numprop"] or "").strip() in {"", "1"}).lower(),
                    "sequence_number": normalize_spaces(row["numprop"]),
                    "notes": None,
                }
            )
        for row in buyers:
            legacy_id = row["idcomp"]
            property_key = normalize_spaces(row["clca"])
            full_name = normalize_spaces(row["cap"])
            if not full_name or not property_key or property_key not in valid_property_keys:
                continue
            writer.writerow(
                {
                    "id": stable_uuid("contact-buyer", legacy_id),
                    "property_id": stable_uuid("property", property_key or f"buyer-{legacy_id}"),
                    "legacy_access_id": legacy_id,
                    "contact_kind": "buyer",
                    "full_name": full_name,
                    "first_name": None,
                    "last_name": None,
                    "email": None,
                    "phone": None,
                    "is_primary": str((row["ncomp"] or "").strip() in {"", "1"}).lower(),
                    "sequence_number": normalize_spaces(row["ncomp"]),
                    "notes": normalize_spaces(row["repper"]),
                }
            )
    return out_path


def export_property_values(valid_property_keys: set[str]) -> Path:
    inventory = load_inventory()
    rows = export_rows("ValoresProp", inventory["ValoresProp"])
    out_path = OUTPUT_DIR / "property_values.csv"
    fieldnames = [
        "id",
        "property_id",
        "legacy_access_id",
        "valued_on",
        "price_amount",
        "currency_code",
        "price_kind",
        "notes",
    ]
    with out_path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for index, row in enumerate(rows, start=1):
            property_key = normalize_spaces(row["clavevalg"])
            if not property_key or property_key not in valid_property_keys:
                continue
            writer.writerow(
                {
                    "id": stable_uuid("property-value", row["id"]),
                    "property_id": stable_uuid("property", property_key or row["Id"]),
                    "legacy_access_id": row["id"],
                    "valued_on": parse_date(row["fechval"]),
                    "price_amount": parse_number_string(row["preciovalini"]),
                    "currency_code": normalize_currency(row["monval"]),
                    "price_kind": normalize_spaces(row["posicion"]),
                    "notes": normalize_spaces(row["motivo"] or row["cambiominuta"]),
                }
            )
    return out_path


def export_guard_shifts(staff_lookup: dict[str, str]) -> Path:
    inventory = load_inventory()
    rows = export_rows("Guardias", inventory["Guardias"])
    out_path = OUTPUT_DIR / "guard_shifts.csv"
    fieldnames = [
        "id",
        "legacy_access_id",
        "shift_date",
        "shift_label",
        "scheduled_start_at",
        "scheduled_end_at",
        "check_in_at",
        "check_out_at",
        "assigned_staff_member_id",
        "replacement_staff_member_id",
        "shift_status",
        "punctuality_status",
        "checkout_status",
        "is_justified",
        "justification_notes",
        "notes",
    ]
    with out_path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for index, row in enumerate(rows, start=1):
            assigned_name = normalize_spaces(row["asesor"])
            replacement_name = normalize_spaces(row["asesor2"])
            asist = (row["asistguardia"] or "").strip().lower()
            sust = (row["sust"] or "").strip().lower()
            shift_status = "scheduled"
            if asist == "falta":
                shift_status = "missed"
            elif "sust" in sust:
                shift_status = "covered"
            elif asist == "asistencia":
                shift_status = "completed"
            writer.writerow(
                {
                    "id": stable_uuid(
                        "guard-shift",
                        f"{index}:{row['idguarda']}:{row['fguardia']}:{row['turno']}:{row['asesor']}"
                    ),
                    "legacy_access_id": row["idguarda"],
                    "shift_date": parse_date(row["fguardia"]),
                    "shift_label": normalize_spaces(row["turno"]),
                    "scheduled_start_at": combine_date_time(row["fguardia"], row["hguardia"]),
                    "scheduled_end_at": combine_date_time(row["fguardia"], row["hguardia2"]),
                    "check_in_at": combine_date_time(row["fguardia"], row["hguardia1"]),
                    "check_out_at": combine_date_time(row["fguardia"], row["hguardia2"]),
                    "assigned_staff_member_id": staff_lookup.get(normalize_name_key(assigned_name)),
                    "replacement_staff_member_id": staff_lookup.get(normalize_name_key(replacement_name)),
                    "shift_status": shift_status,
                    "punctuality_status": normalize_spaces(row["gpunt"]),
                    "checkout_status": normalize_spaces(row["gpunt1"]),
                    "is_justified": str(bool(parse_bool_from_si_no(row["gjust"]))).lower(),
                    "justification_notes": normalize_spaces(row["gjust2"]),
                    "notes": normalize_spaces(row["gcom"]),
                }
            )
    return out_path


def export_attendance_events(staff_lookup: dict[str, str]) -> Path:
    inventory = load_inventory()
    staff_rows = export_rows("StaffAsistencia", inventory["StaffAsistencia"])
    advisor_rows = export_rows("AsesorActivOK", inventory["AsesorActivOK"])
    out_path = OUTPUT_DIR / "attendance_events.csv"
    fieldnames = [
        "id",
        "legacy_access_id",
        "staff_member_id",
        "event_type",
        "source",
        "event_at",
        "local_event_date",
        "notes",
    ]
    with out_path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in staff_rows:
            staff_name = normalize_spaces(row["nsatf"])
            staff_member_id = staff_lookup.get(normalize_name_key(staff_name))
            if not staff_member_id:
                continue
            check_in = combine_date_time(row["fstaf"], row["hstaf"])
            check_out = combine_date_time(row["fstaf"], row["hstaf2"])
            if check_in:
                writer.writerow(
                    {
                        "id": stable_uuid("attendance-in", f"staff-{row['idasisstaff']}"),
                        "legacy_access_id": row["idasisstaff"],
                        "staff_member_id": staff_member_id,
                        "event_type": "check_in",
                        "source": "import",
                        "event_at": check_in,
                        "local_event_date": parse_date(row["fstaf"]),
                        "notes": normalize_spaces(row["asstaf"]),
                    }
                )
            if check_out:
                writer.writerow(
                    {
                        "id": stable_uuid("attendance-out", f"staff-{row['idasisstaff']}"),
                        "legacy_access_id": row["idasisstaff"],
                        "staff_member_id": staff_member_id,
                        "event_type": "check_out",
                        "source": "import",
                        "event_at": check_out,
                        "local_event_date": parse_date(row["fstaf"]),
                        "notes": normalize_spaces(row["passtaf"] or row["comstaf"]),
                    }
                )
        for row in advisor_rows:
            staff_name = normalize_spaces(row["asesorop"])
            staff_member_id = staff_lookup.get(normalize_name_key(staff_name))
            if not staff_member_id:
                continue
            check_in = combine_date_time(row["factiv"], row["heact"] or row["hactiv"])
            check_out = combine_date_time(row["factiv"], row["hsact"])
            if check_in:
                writer.writerow(
                    {
                        "id": stable_uuid("attendance-in", f"advisor-{row['idopas']}"),
                        "legacy_access_id": row["idopas"],
                        "staff_member_id": staff_member_id,
                        "event_type": "check_in",
                        "source": "import",
                        "event_at": check_in,
                        "local_event_date": parse_date(row["factiv"]),
                        "notes": normalize_spaces(row["activa"] or row["nactiva"]),
                    }
                )
            if check_out:
                writer.writerow(
                    {
                        "id": stable_uuid("attendance-out", f"advisor-{row['idopas']}"),
                        "legacy_access_id": row["idopas"],
                        "staff_member_id": staff_member_id,
                        "event_type": "check_out",
                        "source": "import",
                        "event_at": check_out,
                        "local_event_date": parse_date(row["factiv"]),
                        "notes": normalize_spaces(row["salidaact"] or row["comacta"]),
                    }
                )
    return out_path


def export_deals(valid_property_keys: set[str]) -> Path:
    inventory = load_inventory()
    rows = export_rows("Finiquitos", inventory["Finiquitos"])
    out_path = OUTPUT_DIR / "deals.csv"
    seen_property_keys: set[str] = set()
    fieldnames = [
        "id",
        "property_id",
        "legacy_access_id",
        "deal_kind",
        "status",
        "title",
        "closing_reason",
        "cancellation_reason",
        "started_on",
        "signed_on",
        "cancelled_on",
        "closed_on",
        "deed_signed_on",
        "notes",
    ]
    with out_path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            property_key = normalize_spaces(row["clvfini"])
            if not property_key or property_key not in valid_property_keys:
                continue
            if property_key in seen_property_keys:
                continue
            seen_property_keys.add(property_key)
            kind_raw = (row["tifini"] or "").strip().lower()
            deal_kind = "closing"
            if "cancel" in kind_raw:
                deal_kind = "cancellation"
            elif "renta" in kind_raw or row["fcarr"]:
                deal_kind = "rental"
            status = "completed" if row["fcierre"] or row["fcancel"] else "draft"
            writer.writerow(
                {
                    "id": stable_uuid("deal", property_key),
                    "property_id": stable_uuid("property", property_key or row["idfini"]),
                    "legacy_access_id": row["idfini"],
                    "deal_kind": deal_kind,
                    "status": status,
                    "title": f"{property_key or 'sin-clave'} {deal_kind}",
                    "closing_reason": normalize_spaces(row["medcom"] or row["medcom2"] or row["medcom3"]),
                    "cancellation_reason": normalize_spaces(row["motcan"]),
                    "started_on": parse_date(row["ffirma"] or row["fbr"]),
                    "signed_on": parse_date(row["ffirma"] or row["fcarr"]),
                    "cancelled_on": parse_date(row["fcancel"]),
                    "closed_on": parse_date(row["fcierre"]),
                    "deed_signed_on": parse_date(row["fesc"]),
                    "notes": normalize_spaces(row["comexp"] or row["exp2"] or row["lalfinicom"]),
                }
            )
    return out_path


def export_commission_calculations() -> Path:
    inventory = load_inventory()
    rows = export_rows("ComisionesBD", inventory["ComisionesBD"])
    out_path = OUTPUT_DIR / "commission_calculations.csv"
    fieldnames = [
        "id",
        "deal_id",
        "legacy_access_id",
        "commission_status",
        "operation_type",
        "gross_commission_amount",
        "calculated_on",
        "payable_on",
        "notes",
    ]
    with out_path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            legacy_id = row["idcomisiones"]
            property_key = normalize_spaces(row["clavecomi"])
            writer.writerow(
                {
                    "id": stable_uuid("commission-calculation", legacy_id),
                    "deal_id": stable_uuid("deal", property_key or legacy_id),
                    "legacy_access_id": legacy_id,
                    "commission_status": "paid" if row["fechapago"] else "calculated",
                    "operation_type": normalize_operation(row["opercomi"]),
                    "gross_commission_amount": parse_number_string(row["comiglobal"]) or "0",
                    "calculated_on": parse_date(row["fechacomi"]),
                    "payable_on": parse_date(row["fechapago"]),
                    "notes": normalize_spaces(row["domcomi"] or row["ladocomi"] or row["asecomi"]),
                }
            )
    return out_path


def export_deal_participants(
    staff_lookup: dict[str, str],
    valid_property_keys: set[str],
    valid_deal_keys: set[str]
) -> Path:
    inventory = load_inventory()
    sources = [
        ("AsesoresALTA", "listing"),
        ("AsesoresCIERRE", "closing"),
        ("AsesoresCANCEL", "cancellation"),
    ]
    out_path = OUTPUT_DIR / "deal_participants.csv"
    fieldnames = [
        "id",
        "deal_id",
        "staff_member_id",
        "legacy_access_id",
        "participant_name",
        "participant_side",
        "participant_role",
        "advisor_class",
        "participation_percent",
        "fixed_amount",
        "is_high_performance",
        "requires_invoice",
        "tax_regime",
        "payment_method",
        "payment_channel",
        "payable_on",
        "notes",
    ]
    with out_path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for table_name, side in sources:
            rows = export_rows(table_name, inventory[table_name])
            for row in rows:
                legacy_id = next(iter(row.values()))
                if table_name == "AsesoresALTA":
                    property_key = normalize_spaces(row["ccomiases"])
                    name = normalize_spaces(row["ncomias"])
                    advisor_class = normalize_advisor_class(row["niasecom"], "advisor")
                    payable_on = parse_date(row["fpa"])
                    notes = normalize_spaces(row["lacom"])
                    tax_regime = "RESICO" if parse_bool_from_si_no(row["resiscoa"]) else None
                    requires_invoice = str(bool(parse_bool_from_si_no(row["facaa"]))).lower()
                    payment_method = normalize_spaces(row["fpca"])
                    payment_channel = normalize_spaces(row["vpa"])
                    is_high_performance = str(bool(parse_bool_from_si_no(row["ad"]))).lower()
                    percent = parse_number_string(row["cpparti"])
                    amount = parse_number_string(row["cmparti"])
                elif table_name == "AsesoresCIERRE":
                    property_key = normalize_spaces(row["ccomiases2"])
                    name = normalize_spaces(row["ncomias2"])
                    advisor_class = normalize_advisor_class(row["niasecom2"], "advisor")
                    payable_on = parse_date(row["fpc"])
                    notes = normalize_spaces(row["lacom2"])
                    tax_regime = "RESICO" if parse_bool_from_si_no(row["resiscoc"]) else None
                    requires_invoice = str(bool(parse_bool_from_si_no(row["facac"]))).lower()
                    payment_method = normalize_spaces(row["fpcc"])
                    payment_channel = normalize_spaces(row["vpc"])
                    is_high_performance = str(bool(parse_bool_from_si_no(row["ad2"]))).lower()
                    percent = parse_number_string(row["cpparti2"])
                    amount = parse_number_string(row["cmparti2"])
                else:
                    property_key = normalize_spaces(row["ccomiases3"])
                    name = normalize_spaces(row["ncomias3"])
                    advisor_class = normalize_advisor_class(row["niasecom3"], "advisor")
                    payable_on = parse_date(row["fpc3"])
                    notes = normalize_spaces(row["lacom3"])
                    tax_regime = None
                    requires_invoice = str(bool(parse_bool_from_si_no(row["facac3"]))).lower()
                    payment_method = normalize_spaces(row["fpcc3"])
                    payment_channel = normalize_spaces(row["vpc3"])
                    is_high_performance = "false"
                    percent = parse_number_string(row["cpparti3"])
                    amount = parse_number_string(row["cmparti3"])
                if (
                    not property_key
                    or property_key not in valid_property_keys
                    or property_key not in valid_deal_keys
                ):
                    continue
                writer.writerow(
                    {
                        "id": stable_uuid("deal-participant", f"{table_name}-{legacy_id}"),
                        "deal_id": stable_uuid("deal", property_key or legacy_id),
                        "staff_member_id": staff_lookup.get(normalize_name_key(name)),
                        "legacy_access_id": legacy_id,
                        "participant_name": name,
                        "participant_side": side,
                        "participant_role": side,
                        "advisor_class": advisor_class,
                        "participation_percent": percent,
                        "fixed_amount": amount,
                        "is_high_performance": is_high_performance,
                        "requires_invoice": requires_invoice,
                        "tax_regime": tax_regime,
                        "payment_method": payment_method,
                        "payment_channel": payment_channel,
                        "payable_on": payable_on,
                        "notes": notes,
                    }
                )
    return out_path


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    staff_lookup = build_staff_lookup()
    property_lookup = build_property_lookup()
    deal_lookup = build_deal_lookup(property_lookup)
    staff_path = export_staff_members()
    properties_path = export_properties()
    contacts_path = export_property_contacts(property_lookup)
    values_path = export_property_values(property_lookup)
    guard_shifts_path = export_guard_shifts(staff_lookup)
    attendance_events_path = export_attendance_events(staff_lookup)
    deals_path = export_deals(property_lookup)
    calculations_path = export_commission_calculations()
    participants_path = export_deal_participants(staff_lookup, property_lookup, deal_lookup)
    print(f"Wrote {staff_path.relative_to(ROOT)}")
    print(f"Wrote {properties_path.relative_to(ROOT)}")
    print(f"Wrote {contacts_path.relative_to(ROOT)}")
    print(f"Wrote {values_path.relative_to(ROOT)}")
    print(f"Wrote {guard_shifts_path.relative_to(ROOT)}")
    print(f"Wrote {attendance_events_path.relative_to(ROOT)}")
    print(f"Wrote {deals_path.relative_to(ROOT)}")
    print(f"Wrote {calculations_path.relative_to(ROOT)}")
    print(f"Wrote {participants_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

#!/bin/bash
set -e

DATABASE_URL="${DATABASE_URL}"

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL not set"
  exit 1
fi

CSV_DIR="bdd/exports"

echo "📥 Starting CSV Import"
echo ""

# Import CSVs in order
psql "$DATABASE_URL" -c "\copy public.properties FROM '$CSV_DIR/properties.csv' WITH (FORMAT csv, HEADER true);"
echo "✓ Imported properties.csv"

psql "$DATABASE_URL" -c "\copy public.staff_members FROM '$CSV_DIR/staff_members.csv' WITH (FORMAT csv, HEADER true);"
echo "✓ Imported staff_members.csv"

psql "$DATABASE_URL" -c "\copy public.property_contacts FROM '$CSV_DIR/property_contacts.csv' WITH (FORMAT csv, HEADER true);"
echo "✓ Imported property_contacts.csv"

psql "$DATABASE_URL" -c "\copy public.property_values FROM '$CSV_DIR/property_values.csv' WITH (FORMAT csv, HEADER true);"
echo "✓ Imported property_values.csv"

psql "$DATABASE_URL" -c "\copy public.deals FROM '$CSV_DIR/deals.csv' WITH (FORMAT csv, HEADER true);"
echo "✓ Imported deals.csv"

psql "$DATABASE_URL" -c "\copy public.deal_participants FROM '$CSV_DIR/deal_participants.csv' WITH (FORMAT csv, HEADER true);"
echo "✓ Imported deal_participants.csv"

psql "$DATABASE_URL" -c "\copy public.guard_shifts FROM '$CSV_DIR/guard_shifts.csv' WITH (FORMAT csv, HEADER true);"
echo "✓ Imported guard_shifts.csv"

psql "$DATABASE_URL" -c "\copy public.attendance_events FROM '$CSV_DIR/attendance_events.csv' WITH (FORMAT csv, HEADER true);"
echo "✓ Imported attendance_events.csv"

echo ""
echo "📊 Verifying row counts..."
echo ""

psql "$DATABASE_URL" -t -c "SELECT 'properties: ' || count(*) FROM public.properties;"
psql "$DATABASE_URL" -t -c "SELECT 'staff_members: ' || count(*) FROM public.staff_members;"
psql "$DATABASE_URL" -t -c "SELECT 'property_contacts: ' || count(*) FROM public.property_contacts;"
psql "$DATABASE_URL" -t -c "SELECT 'property_values: ' || count(*) FROM public.property_values;"
psql "$DATABASE_URL" -t -c "SELECT 'deals: ' || count(*) FROM public.deals;"
psql "$DATABASE_URL" -t -c "SELECT 'deal_participants: ' || count(*) FROM public.deal_participants;"
psql "$DATABASE_URL" -t -c "SELECT 'guard_shifts: ' || count(*) FROM public.guard_shifts;"
psql "$DATABASE_URL" -t -c "SELECT 'attendance_events: ' || count(*) FROM public.attendance_events;"

echo ""
echo "✅ Import completed successfully!"

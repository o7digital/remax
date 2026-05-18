create table if not exists public.property_alta_expedientes (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null unique references public.properties(id) on delete cascade,
  process_version text not null default '230426',
  received_on date,
  expediente_status text,
  registered_by text,
  included_documents text[] not null default '{}'::text[],
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.property_operation_conditions (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null unique references public.properties(id) on delete cascade,
  commission_percent numeric(7, 4),
  policy_type text,
  minimum_amount_note text,
  rent_deposits integer,
  rent_advance_months integer,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.property_technical_sheets (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null unique references public.properties(id) on delete cascade,
  sheet_type text not null,
  land_area_m2 numeric(12, 2),
  construction_area_m2 numeric(12, 2),
  bedrooms integer,
  bathrooms integer,
  parking_spaces integer,
  land_shape text,
  land_topography text,
  land_use text,
  facade_photo_url text,
  croquis_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.property_alta_advisors (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  deal_id uuid references public.deals(id) on delete set null,
  staff_member_id uuid references public.staff_members(id) on delete set null,
  advisor_name text not null,
  advisor_level text,
  participation_percent numeric(7, 4),
  fixed_amount numeric(14, 2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists property_alta_advisors_property_id_idx
  on public.property_alta_advisors(property_id);

create trigger set_property_alta_expedientes_updated_at
before update on public.property_alta_expedientes
for each row execute function public.set_updated_at();

create trigger set_property_operation_conditions_updated_at
before update on public.property_operation_conditions
for each row execute function public.set_updated_at();

create trigger set_property_technical_sheets_updated_at
before update on public.property_technical_sheets
for each row execute function public.set_updated_at();

create trigger set_property_alta_advisors_updated_at
before update on public.property_alta_advisors
for each row execute function public.set_updated_at();

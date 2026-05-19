-- Staff fiscal profiles: RFC, tax regime, billing address, CFDI usage
create table if not exists public.staff_fiscal_profiles (
  id uuid primary key default gen_random_uuid(),
  staff_member_id uuid not null unique references public.staff_members(id) on delete cascade,
  tax_id text,
  tax_regime text,
  cfdi_use text,
  billing_name text,
  billing_address_line_1 text,
  billing_neighborhood text,
  billing_city text,
  billing_state text,
  billing_postal_code text,
  billing_country text not null default 'MX',
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists staff_fiscal_profiles_staff_member_id_idx
  on public.staff_fiscal_profiles(staff_member_id);

-- Staff personal profiles: emergency contacts, CURP, NSS, personal data
create table if not exists public.staff_personal_profiles (
  id uuid primary key default gen_random_uuid(),
  staff_member_id uuid not null unique references public.staff_members(id) on delete cascade,
  curp text,
  nss text,
  birth_date date,
  birth_place text,
  nationality text not null default 'MX',
  marital_status text,
  emergency_contact_name text,
  emergency_contact_phone text,
  emergency_contact_relationship text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists staff_personal_profiles_staff_member_id_idx
  on public.staff_personal_profiles(staff_member_id);

-- Staff RE/MAX accounts: agent code, franchise data, MLS access, certifications
create table if not exists public.staff_remax_accounts (
  id uuid primary key default gen_random_uuid(),
  staff_member_id uuid not null unique references public.staff_members(id) on delete cascade,
  agent_code text,
  franchise_code text,
  region_code text,
  mls_access boolean not null default false,
  mls_username text,
  remax_email text,
  remax_profile_url text,
  certifications text[] not null default '{}'::text[],
  licensed_on date,
  license_expires_on date,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists staff_remax_accounts_staff_member_id_idx
  on public.staff_remax_accounts(staff_member_id);

create trigger set_staff_fiscal_profiles_updated_at
before update on public.staff_fiscal_profiles
for each row execute function public.set_updated_at();

create trigger set_staff_personal_profiles_updated_at
before update on public.staff_personal_profiles
for each row execute function public.set_updated_at();

create trigger set_staff_remax_accounts_updated_at
before update on public.staff_remax_accounts
for each row execute function public.set_updated_at();

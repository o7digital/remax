create table if not exists public.staff_fiscal_profiles (
  id uuid primary key default gen_random_uuid(),
  staff_member_id uuid not null unique references public.staff_members(id) on delete cascade,
  legal_name text,
  tax_id text,
  fiscal_street text,
  fiscal_exterior_number text,
  fiscal_neighborhood text,
  fiscal_postal_code text,
  fiscal_email text,
  bank_name text,
  bank_account text,
  bank_clabe text,
  bank_branch_number text,
  is_resico boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.staff_personal_profiles (
  id uuid primary key default gen_random_uuid(),
  staff_member_id uuid not null unique references public.staff_members(id) on delete cascade,
  birth_date date,
  birth_city text,
  birth_country text,
  education_level text,
  language_1 text,
  language_2 text,
  emergency_contact_name text,
  emergency_contact_phone text,
  emergency_contact_relationship text,
  imss_number text,
  medical_insurance text,
  blood_type text,
  medical_conditions text,
  allergies text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.staff_remax_accounts (
  id uuid primary key default gen_random_uuid(),
  staff_member_id uuid not null unique references public.staff_members(id) on delete cascade,
  sir_joined_on date,
  sir_user text,
  sir_legacy_password text,
  sir_last_login_on date,
  easy_broker_last_login_on date,
  remax_mexico_id text,
  remax_mexico_trial_started_on date,
  remax_mexico_trial_ended_on date,
  remax_mexico_status text,
  remax_international_id text,
  remax_international_user text,
  remax_international_legacy_password text,
  remax_international_started_on date,
  remax_international_ended_on date,
  remax_international_status text,
  university_user text,
  university_legacy_password text,
  university_trial_started_on date,
  university_trial_ended_on date,
  university_status text,
  ampi_id text,
  ampi_user text,
  ampi_legacy_password text,
  ampi_started_on date,
  ampi_ended_on date,
  ampi_status text,
  advisor_profile text,
  advisor_or_staff text,
  other_associations text,
  is_high_performance boolean not null default false,
  level_changed_on date,
  rejoined_on date,
  separation_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists staff_fiscal_profiles_tax_id_idx
  on public.staff_fiscal_profiles(tax_id);

create index if not exists staff_remax_accounts_sir_user_idx
  on public.staff_remax_accounts(sir_user);

drop trigger if exists set_staff_fiscal_profiles_updated_at on public.staff_fiscal_profiles;
create trigger set_staff_fiscal_profiles_updated_at
before update on public.staff_fiscal_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_staff_personal_profiles_updated_at on public.staff_personal_profiles;
create trigger set_staff_personal_profiles_updated_at
before update on public.staff_personal_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_staff_remax_accounts_updated_at on public.staff_remax_accounts;
create trigger set_staff_remax_accounts_updated_at
before update on public.staff_remax_accounts
for each row execute function public.set_updated_at();

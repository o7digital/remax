create extension if not exists "pgcrypto";

create type public.staff_kind as enum (
  'advisor',
  'manager',
  'admin',
  'reception'
);

create type public.advisor_class as enum (
  'A',
  'M',
  'staff'
);

create type public.employment_status as enum (
  'active',
  'inactive',
  'suspended',
  'archived'
);

create type public.property_status as enum (
  'draft',
  'active',
  'under_offer',
  'closed',
  'cancelled',
  'inactive',
  'archived'
);

create type public.listing_category as enum (
  'exclusive',
  'option',
  'coop',
  'other'
);

create type public.property_business_line as enum (
  'residential',
  'commercial',
  'industrial',
  'land',
  'other'
);

create type public.property_operation as enum (
  'sale',
  'rent',
  'transfer',
  'other'
);

create type public.contact_kind as enum (
  'owner',
  'buyer',
  'tenant',
  'prospect',
  'other'
);

create type public.deal_kind as enum (
  'listing',
  'closing',
  'cancellation',
  'rental',
  'sale'
);

create type public.deal_status as enum (
  'draft',
  'in_progress',
  'completed',
  'cancelled'
);

create type public.participant_side as enum (
  'listing',
  'closing',
  'cancellation',
  'referral',
  'office'
);

create type public.commission_status as enum (
  'draft',
  'calculated',
  'approved',
  'partially_paid',
  'paid',
  'cancelled'
);

create type public.payment_status as enum (
  'pending',
  'scheduled',
  'paid',
  'cancelled'
);

create type public.shift_status as enum (
  'scheduled',
  'completed',
  'missed',
  'covered',
  'cancelled'
);

create type public.attendance_event_type as enum (
  'check_in',
  'check_out',
  'manual_adjustment'
);

create type public.attendance_source as enum (
  'webapp',
  'admin',
  'import'
);

create type public.lead_status as enum (
  'new',
  'contacted',
  'qualified',
  'unqualified',
  'converted',
  'lost'
);

create type public.campaign_channel as enum (
  'seo',
  'newsletter',
  'email',
  'portal',
  'referral',
  'manual'
);

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  email text unique,
  display_name text not null,
  locale text not null default 'es-MX',
  timezone text not null default 'America/Mexico_City',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.staff_members (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  legacy_access_id integer,
  legacy_full_name text,
  first_name text,
  last_name text,
  display_name text not null,
  staff_kind public.staff_kind not null,
  advisor_class public.advisor_class not null default 'staff',
  employment_status public.employment_status not null default 'active',
  is_guard_eligible boolean not null default false,
  tax_id text,
  tax_regime text,
  bank_name text,
  bank_account text,
  bank_clabe text,
  mobile_phone text,
  office_phone text,
  personal_email text,
  work_email text,
  address_line_1 text,
  address_line_2 text,
  neighborhood text,
  city text,
  state text,
  postal_code text,
  country text not null default 'MX',
  joined_on date,
  first_joined_on date,
  left_on date,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index staff_members_legacy_access_id_idx
  on public.staff_members(legacy_access_id)
  where legacy_access_id is not null;

create table public.staff_roles (
  id uuid primary key default gen_random_uuid(),
  staff_member_id uuid not null references public.staff_members(id) on delete cascade,
  role_code text not null,
  role_label text not null,
  is_primary boolean not null default false,
  starts_on date,
  ends_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (staff_member_id, role_code, starts_on)
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  legacy_access_id integer,
  legacy_key text,
  property_key text not null unique,
  original_property_key text,
  title text,
  description text,
  property_status public.property_status not null default 'draft',
  listing_category public.listing_category,
  business_line public.property_business_line,
  property_type text,
  operation_type public.property_operation,
  source_primary text,
  source_secondary text,
  source_referral_name text,
  source_referral_company text,
  contract_signed_on date,
  promotion_started_on date,
  listed_on date,
  closed_on date,
  street text,
  exterior_number text,
  interior_number text,
  building text,
  floor text,
  neighborhood text,
  subdivision text,
  municipality text,
  state text,
  postal_code text,
  country text not null default 'MX',
  full_address text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  google_maps_url text,
  remax_url text,
  cadastral_key text,
  appointment_mode text,
  appointment_contact_name text,
  appointment_contact_phone text,
  key_box_number text,
  key_status text,
  key_returned_on date,
  visit_availability text,
  list_price numeric(14, 2),
  currency_code text not null default 'MXN',
  lot_area_m2 numeric(12, 2),
  construction_area_m2 numeric(12, 2),
  bedrooms integer,
  bathrooms integer,
  half_bathrooms integer,
  parking_spaces integer,
  floors integer,
  age_years integer,
  land_shape text,
  land_topography text,
  land_position text,
  land_use text,
  visit_count integer not null default 0,
  internal_notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index properties_legacy_access_id_idx
  on public.properties(legacy_access_id)
  where legacy_access_id is not null;

create table public.property_contacts (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  legacy_access_id integer,
  contact_kind public.contact_kind not null,
  full_name text not null,
  first_name text,
  last_name text,
  email text,
  phone text,
  is_primary boolean not null default false,
  sequence_number integer,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index property_contacts_property_id_idx on public.property_contacts(property_id);

create table public.property_values (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  legacy_access_id integer,
  valued_on date,
  price_amount numeric(14, 2),
  currency_code text not null default 'MXN',
  price_kind text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index property_values_property_id_idx on public.property_values(property_id);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  external_portal text,
  external_listing_id text,
  public_url text,
  marketing_status text,
  campaign_notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  legacy_access_id integer,
  deal_kind public.deal_kind not null,
  status public.deal_status not null default 'draft',
  title text not null,
  closing_reason text,
  cancellation_reason text,
  started_on date,
  signed_on date,
  cancelled_on date,
  closed_on date,
  deed_signed_on date,
  possession_delivered_on date,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index deals_property_id_idx on public.deals(property_id);

create table public.deal_participants (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals(id) on delete cascade,
  staff_member_id uuid references public.staff_members(id) on delete set null,
  legacy_access_id integer,
  participant_name text,
  participant_side public.participant_side not null,
  participant_role text,
  advisor_class public.advisor_class,
  participation_percent numeric(7, 4),
  fixed_amount numeric(14, 2),
  is_high_performance boolean not null default false,
  requires_invoice boolean not null default false,
  tax_regime text,
  payment_method text,
  payment_channel text,
  payable_on date,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index deal_participants_deal_id_idx on public.deal_participants(deal_id);

create table public.commission_rules (
  id uuid primary key default gen_random_uuid(),
  rule_code text not null unique,
  name text not null,
  deal_kind public.deal_kind,
  operation_type public.property_operation,
  advisor_class public.advisor_class,
  participant_side public.participant_side,
  default_percent numeric(7, 4),
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.commission_calculations (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals(id) on delete cascade,
  legacy_access_id integer,
  commission_status public.commission_status not null default 'draft',
  operation_type public.property_operation,
  gross_commission_amount numeric(14, 2) not null default 0,
  net_commission_amount numeric(14, 2),
  calculated_on date,
  payable_on date,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index commission_calculations_deal_id_idx
  on public.commission_calculations(deal_id);

create table public.commission_splits (
  id uuid primary key default gen_random_uuid(),
  commission_calculation_id uuid not null references public.commission_calculations(id) on delete cascade,
  deal_participant_id uuid references public.deal_participants(id) on delete set null,
  rule_id uuid references public.commission_rules(id) on delete set null,
  split_percent numeric(7, 4),
  split_amount numeric(14, 2) not null default 0,
  retention_amount numeric(14, 2),
  net_amount numeric(14, 2),
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index commission_splits_calculation_id_idx
  on public.commission_splits(commission_calculation_id);

create table public.commission_payments (
  id uuid primary key default gen_random_uuid(),
  commission_split_id uuid not null references public.commission_splits(id) on delete cascade,
  payment_status public.payment_status not null default 'pending',
  scheduled_for date,
  paid_on date,
  invoice_required boolean not null default false,
  invoice_number text,
  payment_method text,
  payment_channel text,
  amount numeric(14, 2) not null default 0,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index commission_payments_split_id_idx
  on public.commission_payments(commission_split_id);

create table public.guard_shifts (
  id uuid primary key default gen_random_uuid(),
  legacy_access_id integer,
  shift_date date not null,
  shift_label text,
  scheduled_start_at timestamptz,
  scheduled_end_at timestamptz,
  check_in_at timestamptz,
  check_out_at timestamptz,
  assigned_staff_member_id uuid references public.staff_members(id) on delete set null,
  replacement_staff_member_id uuid references public.staff_members(id) on delete set null,
  shift_status public.shift_status not null default 'scheduled',
  punctuality_status text,
  checkout_status text,
  is_justified boolean not null default false,
  justification_notes text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index guard_shifts_shift_date_idx on public.guard_shifts(shift_date);

create table public.attendance_events (
  id uuid primary key default gen_random_uuid(),
  legacy_access_id integer,
  staff_member_id uuid not null references public.staff_members(id) on delete cascade,
  event_type public.attendance_event_type not null,
  source public.attendance_source not null default 'import',
  event_at timestamptz not null,
  local_event_date date,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  accuracy_meters numeric(10, 2),
  device_label text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index attendance_events_staff_member_id_idx
  on public.attendance_events(staff_member_id, event_at desc);

create table public.lead_sources (
  id uuid primary key default gen_random_uuid(),
  source_code text not null unique,
  name text not null,
  channel public.campaign_channel not null,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete set null,
  source_id uuid references public.lead_sources(id) on delete set null,
  assigned_staff_member_id uuid references public.staff_members(id) on delete set null,
  full_name text not null,
  email text,
  phone text,
  intent text,
  notes text,
  lead_status public.lead_status not null default 'new',
  contacted_at timestamptz,
  converted_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index leads_property_id_idx on public.leads(property_id);
create index leads_assigned_staff_member_id_idx on public.leads(assigned_staff_member_id);

create table public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  staff_member_id uuid references public.staff_members(id) on delete set null,
  activity_type text not null,
  occurred_at timestamptz not null default now(),
  summary text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index lead_activities_lead_id_idx on public.lead_activities(lead_id, occurred_at desc);

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  legacy_access_id integer,
  source_id uuid references public.lead_sources(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  channel public.campaign_channel not null,
  name text not null,
  status text,
  launched_at timestamptz,
  contacts_count integer,
  open_rate numeric(7, 4),
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index campaigns_property_id_idx on public.campaigns(property_id);

create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_staff_members_updated_at
before update on public.staff_members
for each row execute function public.set_updated_at();

create trigger set_staff_roles_updated_at
before update on public.staff_roles
for each row execute function public.set_updated_at();

create trigger set_properties_updated_at
before update on public.properties
for each row execute function public.set_updated_at();

create trigger set_property_contacts_updated_at
before update on public.property_contacts
for each row execute function public.set_updated_at();

create trigger set_listings_updated_at
before update on public.listings
for each row execute function public.set_updated_at();

create trigger set_deals_updated_at
before update on public.deals
for each row execute function public.set_updated_at();

create trigger set_deal_participants_updated_at
before update on public.deal_participants
for each row execute function public.set_updated_at();

create trigger set_commission_rules_updated_at
before update on public.commission_rules
for each row execute function public.set_updated_at();

create trigger set_commission_calculations_updated_at
before update on public.commission_calculations
for each row execute function public.set_updated_at();

create trigger set_commission_splits_updated_at
before update on public.commission_splits
for each row execute function public.set_updated_at();

create trigger set_commission_payments_updated_at
before update on public.commission_payments
for each row execute function public.set_updated_at();

create trigger set_guard_shifts_updated_at
before update on public.guard_shifts
for each row execute function public.set_updated_at();

create trigger set_lead_sources_updated_at
before update on public.lead_sources
for each row execute function public.set_updated_at();

create trigger set_leads_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

create trigger set_campaigns_updated_at
before update on public.campaigns
for each row execute function public.set_updated_at();

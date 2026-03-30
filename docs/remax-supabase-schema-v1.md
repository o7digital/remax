# REMAX Supabase Schema V1

## Objective

This first schema version is designed to replace the current demo data with a real transactional backbone while staying small enough for an incremental migration from Access.

It intentionally does not mirror Access table-by-table. It normalizes the data into product-oriented entities.

## Main Domains

- Staff and permissions
- Properties and contacts
- Deals and commissions
- Attendance and guard shifts
- Leads and campaigns

## Core Tables

### Staff

- `profiles`
  - application profile linked later to Supabase Auth
- `staff_members`
  - advisor, manager, admin, reception
  - stores fiscal and banking data needed for commissions
- `staff_roles`
  - allows one person to be both `advisor` and `manager`

### Properties

- `properties`
  - normalized property card
  - source, status, address, pricing, operational data
- `property_contacts`
  - owners, buyers, tenants, prospects linked to a property
- `property_values`
  - price history
- `listings`
  - publication and portal context

### Deals And Commissions

- `deals`
  - alta, cierre, cancelacion, rental, sale lifecycle
- `deal_participants`
  - advisor split by side and role
- `commission_rules`
  - reusable commission setup
- `commission_calculations`
  - global commission result
- `commission_splits`
  - per participant amounts
- `commission_payments`
  - payment tracking and invoice data

### Operations

- `guard_shifts`
  - scheduled guards and replacement handling
- `attendance_events`
  - mobile check-in/check-out and manual corrections

### Marketing

- `lead_sources`
  - SEO, newsletter, portal, referral
- `leads`
  - captured contacts
- `lead_activities`
  - calls, follow-ups, emails, visits
- `campaigns`
  - newsletter and marketing actions

## Main Mapping From Access

- `AsesoresInternos` -> `staff_members`
- `PROPIEDADES` -> `properties`
- `PropietariosALTA` + `Compradores` -> `property_contacts`
- `ValoresProp` -> `property_values`
- `Marketing` -> `campaigns`
- `Guardias` -> `guard_shifts`
- `StaffAsistencia` + `AsesorActivOK` -> `attendance_events`
- `Finiquitos` -> `deals`
- `AsesoresALTA` + `AsesoresCIERRE` + `AsesoresCANCEL` -> `deal_participants`
- `ComisionesBD` -> `commission_calculations`

## Important Decisions

- `property_owners` is folded into `property_contacts` using `contact_kind = 'owner'`
- the schema keeps `legacy_access_id` and `legacy_key` fields to make the migration traceable
- the first version does not include row-level security yet
- the first version does not include storage buckets, edge functions or auth policies yet

## File

SQL migration file:

- `supabase/migrations/20260329_001_remax_core_schema.sql`

import "server-only";

import { createAdminClient } from "@/utils/supabase/admin";

const SUPABASE_BATCH_SIZE = 1000;

type PropertyRow = {
  id: string;
  property_key: string;
  title: string | null;
  municipality: string | null;
  state: string | null;
  property_status: string;
  list_price?: number | null;
  currency_code?: string | null;
};

type PropertyContactRow = {
  id: string;
  property_id: string;
  contact_kind: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  is_primary: boolean;
};

export interface ClientOverviewRecord {
  id: string;
  fullName: string;
  contactKind: string;
  email: string | null;
  phone: string | null;
  propertyCount: number;
  activePropertyCount: number;
  primaryLocation: string;
  portfolioStatus: string;
  propertyKeys: string[];
  primaryPropertyTitle: string;
}

export interface ClientOverviewSummary {
  totalClients: number;
  ownerClients: number;
  buyerClients: number;
  clientsWithEmail: number;
  clientsWithPhone: number;
}

export interface ContactDirectoryRecord {
  id: string;
  fullName: string;
  contactKind: string;
  email: string | null;
  phone: string | null;
  propertyKey: string;
  propertyTitle: string;
  location: string;
  propertyStatus: string;
  isPrimary: boolean;
}

type StaffMemberRow = {
  id: string;
  display_name: string;
  staff_kind: string;
  employment_status: string;
  is_guard_eligible: boolean;
  joined_on: string | null;
};

type DealRow = {
  id: string;
  title: string;
  deal_kind: string;
  status: string;
  property_id: string;
  closed_on: string | null;
  created_at: string;
};

type GuardShiftRow = {
  id: string;
  shift_date: string;
  shift_label: string | null;
  shift_status: string;
  assigned_staff_member_id: string | null;
};

type AttendanceEventRow = {
  id: string;
  event_type: string;
  event_at: string;
  staff_member_id: string;
};

type PropertyValueRow = {
  property_id: string;
  price_amount: number | null;
  currency_code: string | null;
  valued_on: string | null;
};

type DealParticipantRow = {
  id: string;
  deal_id: string;
  staff_member_id: string | null;
  participant_name: string | null;
  participant_side: string;
  participant_role: string | null;
  advisor_class: string | null;
  participation_percent: number | null;
  fixed_amount: number | null;
};

export interface DashboardSummary {
  propertyCount: number;
  activePropertyCount: number;
  closedPropertyCount: number;
  activeStaffCount: number;
  guardShiftCount: number;
  attendanceEventCount: number;
  completedDealCount: number;
}

export interface DashboardPropertyRecord {
  id: string;
  propertyKey: string;
  title: string;
  location: string;
  propertyStatus: string;
}

export interface DashboardDealRecord {
  id: string;
  title: string;
  dealKind: string;
  status: string;
  propertyKey: string;
  propertyTitle: string;
  closedOn: string | null;
}

export interface DashboardStaffRecord {
  id: string;
  displayName: string;
  staffKind: string;
  employmentStatus: string;
  guardEligible: boolean;
  joinedOn: string | null;
}

export interface DashboardShiftRecord {
  id: string;
  shiftDate: string;
  shiftLabel: string;
  shiftStatus: string;
  advisorName: string;
}

export interface DashboardAttendanceRecord {
  id: string;
  eventType: string;
  eventAt: string;
  advisorName: string;
}

export interface CommissionSummary {
  totalDeals: number;
  estimableDeals: number;
  totalEstimatedCommission: number;
  activeAdvisorsWithCommission: number;
  coverageRatio: number;
}

export interface CommissionDealRecord {
  id: string;
  dealTitle: string;
  propertyKey: string;
  propertyTitle: string;
  dealKind: string;
  dealStatus: string;
  operationValue: number | null;
  currencyCode: string;
  commissionRate: number;
  estimatedGrossCommission: number | null;
  participantCount: number;
  closedOn: string | null;
}

export interface CommissionAdvisorRecord {
  id: string;
  advisorName: string;
  staffKind: string;
  employmentStatus: string;
  dealCount: number;
  estimatedCommission: number;
  currencyCode: string;
}

interface CommissionDealComputation {
  id: string;
  dealTitle: string;
  propertyKey: string;
  propertyTitle: string;
  dealKind: string;
  dealStatus: string;
  operationValue: number | null;
  currencyCode: string;
  commissionRate: number;
  estimatedGrossCommission: number | null;
  participantCount: number;
  closedOn: string | null;
  eventDate: string;
}

export interface ReportingSummary {
  totalProperties: number;
  activeProperties: number;
  completedDeals: number;
  attendanceEvents: number;
  guardShifts: number;
  estimatedCommissionTotal: number;
}

export interface ReportingMonthRecord {
  month: string;
  deals: number;
  estimatedCommission: number;
}

export interface ReportingAreaRecord {
  area: string;
  propertyCount: number;
  activePropertyCount: number;
}

const commissionRateByDealKind: Record<string, number> = {
  closing: 0.06,
  sale: 0.06,
  listing: 0.05,
  rental: 0.04,
  cancellation: 0.02
};

function assertData<T>(value: T | null, error: { message: string } | null, label: string): T {
  if (error) {
    throw new Error(`Failed to load ${label}: ${error.message}`);
  }

  if (value === null) {
    throw new Error(`Missing ${label} data`);
  }

  return value;
}

async function fetchAllRows<T>(table: string, selectClause: string): Promise<T[]> {
  const admin = createAdminClient();
  const rows: T[] = [];
  let from = 0;

  while (true) {
    const response = await admin
      .from(table)
      .select(selectClause)
      .range(from, from + SUPABASE_BATCH_SIZE - 1);

    const batch = assertData<T[]>(response.data as T[] | null, response.error, table);
    rows.push(...batch);

    if (batch.length < SUPABASE_BATCH_SIZE) {
      break;
    }

    from += SUPABASE_BATCH_SIZE;
  }

  return rows;
}

function normalizeText(value: string | null | undefined) {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizePhone(value: string | null | undefined) {
  const digits = (value ?? "").replace(/\D/g, "");
  return digits.length > 1 && !/^0+$/.test(digits) ? digits : null;
}

function isActivePropertyStatus(status: string) {
  return status === "active" || status === "under_offer" || status === "draft";
}

function getPortfolioStatus(propertyStatuses: string[]) {
  if (propertyStatuses.some((status) => isActivePropertyStatus(status))) {
    return "active";
  }

  if (propertyStatuses.some((status) => status === "closed")) {
    return "closed";
  }

  if (propertyStatuses.some((status) => status === "cancelled")) {
    return "cancelled";
  }

  return "inactive";
}

function getLocation(property: Pick<PropertyRow, "municipality" | "state">) {
  return [property.municipality, property.state].filter(Boolean).join(", ") || "Sin ubicacion";
}

function getClientKey(contact: PropertyContactRow) {
  const normalizedEmail = normalizeText(contact.email);

  if (normalizedEmail) {
    return `${contact.contact_kind}:${normalizedEmail}`;
  }

  const normalizedPhone = normalizePhone(contact.phone);

  if (normalizedPhone) {
    return `${contact.contact_kind}:${normalizedPhone}`;
  }

  return `${contact.contact_kind}:${normalizeText(contact.full_name)}`;
}

async function fetchPropertiesAndContacts() {
  const admin = createAdminClient();
  const [propertiesResponse, contactsResponse] = await Promise.all([
    admin
      .from("properties")
      .select("id, property_key, title, municipality, state, property_status")
      .range(0, 4000)
      .order("property_key", { ascending: true }),
    admin
      .from("property_contacts")
      .select("id, property_id, contact_kind, full_name, email, phone, is_primary")
      .range(0, 4000)
      .order("full_name", { ascending: true })
  ]);

  return {
    properties: assertData<PropertyRow[]>(propertiesResponse.data, propertiesResponse.error, "properties"),
    contacts: assertData<PropertyContactRow[]>(contactsResponse.data, contactsResponse.error, "property contacts")
  };
}

export async function getClientOverviewData(): Promise<{
  summary: ClientOverviewSummary;
  records: ClientOverviewRecord[];
}> {
  const { properties, contacts } = await fetchPropertiesAndContacts();
  const propertiesById = new Map(properties.map((property) => [property.id, property]));
  const grouped = new Map<
    string,
    {
      id: string;
      fullName: string;
      contactKind: string;
      email: string | null;
      phone: string | null;
      properties: PropertyRow[];
    }
  >();

  for (const contact of contacts) {
    const property = propertiesById.get(contact.property_id);

    if (!property) {
      continue;
    }

    const key = getClientKey(contact);
    const existing = grouped.get(key);

    if (existing) {
      if (!existing.email && contact.email) {
        existing.email = contact.email;
      }

      if (!existing.phone && normalizePhone(contact.phone)) {
        existing.phone = contact.phone;
      }

      if (!existing.properties.some((item) => item.id === property.id)) {
        existing.properties.push(property);
      }

      continue;
    }

    grouped.set(key, {
      id: key,
      fullName: contact.full_name,
      contactKind: contact.contact_kind,
      email: contact.email,
      phone: normalizePhone(contact.phone) ? contact.phone : null,
      properties: [property]
    });
  }

  const records = Array.from(grouped.values())
    .map<ClientOverviewRecord>((entry) => {
      const orderedProperties = [...entry.properties].sort((left, right) => {
        const activeDelta = Number(isActivePropertyStatus(right.property_status)) - Number(isActivePropertyStatus(left.property_status));

        if (activeDelta !== 0) {
          return activeDelta;
        }

        return left.property_key.localeCompare(right.property_key);
      });

      const primaryProperty = orderedProperties[0];
      const propertyStatuses = orderedProperties.map((property) => property.property_status);

      return {
        id: entry.id,
        fullName: entry.fullName,
        contactKind: entry.contactKind,
        email: entry.email,
        phone: entry.phone,
        propertyCount: orderedProperties.length,
        activePropertyCount: orderedProperties.filter((property) => isActivePropertyStatus(property.property_status)).length,
        primaryLocation: getLocation(primaryProperty),
        portfolioStatus: getPortfolioStatus(propertyStatuses),
        propertyKeys: orderedProperties.slice(0, 3).map((property) => property.property_key),
        primaryPropertyTitle: primaryProperty.title ?? primaryProperty.property_key
      };
    })
    .sort((left, right) => {
      if (right.activePropertyCount !== left.activePropertyCount) {
        return right.activePropertyCount - left.activePropertyCount;
      }

      if (right.propertyCount !== left.propertyCount) {
        return right.propertyCount - left.propertyCount;
      }

      return left.fullName.localeCompare(right.fullName);
    });

  return {
    summary: {
      totalClients: records.length,
      ownerClients: records.filter((record) => record.contactKind === "owner").length,
      buyerClients: records.filter((record) => record.contactKind === "buyer").length,
      clientsWithEmail: records.filter((record) => record.email).length,
      clientsWithPhone: records.filter((record) => normalizePhone(record.phone)).length
    },
    records
  };
}

export async function getContactDirectoryData(): Promise<{
  totalContacts: number;
  ownerContacts: number;
  buyerContacts: number;
  contactsWithEmail: number;
  records: ContactDirectoryRecord[];
}> {
  const { properties, contacts } = await fetchPropertiesAndContacts();
  const propertiesById = new Map(properties.map((property) => [property.id, property]));

  const records = contacts
    .map<ContactDirectoryRecord | null>((contact) => {
      const property = propertiesById.get(contact.property_id);

      if (!property) {
        return null;
      }

      return {
        id: contact.id,
        fullName: contact.full_name,
        contactKind: contact.contact_kind,
        email: contact.email,
        phone: normalizePhone(contact.phone) ? contact.phone : null,
        propertyKey: property.property_key,
        propertyTitle: property.title ?? property.property_key,
        location: getLocation(property),
        propertyStatus: property.property_status,
        isPrimary: contact.is_primary
      };
    })
    .filter((record): record is ContactDirectoryRecord => Boolean(record))
    .sort((left, right) => {
      const activeDelta = Number(isActivePropertyStatus(right.propertyStatus)) - Number(isActivePropertyStatus(left.propertyStatus));

      if (activeDelta !== 0) {
        return activeDelta;
      }

      if (Number(right.isPrimary) !== Number(left.isPrimary)) {
        return Number(right.isPrimary) - Number(left.isPrimary);
      }

      return left.fullName.localeCompare(right.fullName);
    });

  return {
    totalContacts: records.length,
    ownerContacts: records.filter((record) => record.contactKind === "owner").length,
    buyerContacts: records.filter((record) => record.contactKind === "buyer").length,
    contactsWithEmail: records.filter((record) => record.email).length,
    records
  };
}

function compareDateDesc(left: string | null, right: string | null) {
  return new Date(right ?? 0).getTime() - new Date(left ?? 0).getTime();
}

function getCommissionRate(dealKind: string) {
  return commissionRateByDealKind[dealKind] ?? 0.05;
}

function getLatestPropertyValueMap(values: PropertyValueRow[]) {
  const latestByProperty = new Map<string, PropertyValueRow>();

  for (const value of values) {
    if (!value.price_amount) {
      continue;
    }

    const existing = latestByProperty.get(value.property_id);
    const currentStamp = new Date(value.valued_on ?? 0).getTime();
    const existingStamp = new Date(existing?.valued_on ?? 0).getTime();

    if (!existing || currentStamp >= existingStamp) {
      latestByProperty.set(value.property_id, value);
    }
  }

  return latestByProperty;
}

function roundAmount(value: number) {
  return Math.round(value * 100) / 100;
}

async function buildCommissionDataset(): Promise<{
  summary: CommissionSummary;
  advisorRecords: CommissionAdvisorRecord[];
  dealRecords: CommissionDealComputation[];
}> {
  const [properties, propertyValues, deals, participants, staff] = await Promise.all([
    fetchAllRows<PropertyRow>(
      "properties",
      "id, property_key, title, municipality, state, property_status, list_price, currency_code"
    ),
    fetchAllRows<PropertyValueRow>(
      "property_values",
      "property_id, price_amount, currency_code, valued_on"
    ),
    fetchAllRows<DealRow>(
      "deals",
      "id, title, deal_kind, status, property_id, closed_on, created_at"
    ),
    fetchAllRows<DealParticipantRow>(
      "deal_participants",
      "id, deal_id, staff_member_id, participant_name, participant_side, participant_role, advisor_class, participation_percent, fixed_amount"
    ),
    fetchAllRows<StaffMemberRow>(
      "staff_members",
      "id, display_name, staff_kind, employment_status, is_guard_eligible, joined_on"
    )
  ]);

  const propertiesById = new Map(properties.map((property) => [property.id, property]));
  const staffById = new Map(staff.map((member) => [member.id, member]));
  const latestValueByPropertyId = getLatestPropertyValueMap(propertyValues);
  const participantsByDealId = new Map<string, DealParticipantRow[]>();

  for (const participant of participants) {
    const current = participantsByDealId.get(participant.deal_id) ?? [];
    current.push(participant);
    participantsByDealId.set(participant.deal_id, current);
  }

  const dealRecords = deals
    .map<CommissionDealComputation>((deal) => {
      const property = propertiesById.get(deal.property_id);
      const latestValue = latestValueByPropertyId.get(deal.property_id);
      const operationValue = latestValue?.price_amount ?? property?.list_price ?? null;
      const currencyCode = latestValue?.currency_code ?? property?.currency_code ?? "MXN";
      const participantRows = participantsByDealId.get(deal.id) ?? [];
      const commissionRate = getCommissionRate(deal.deal_kind);
      const estimatedGrossCommission = operationValue ? roundAmount(operationValue * commissionRate) : null;

      return {
        id: deal.id,
        dealTitle: deal.title,
        propertyKey: property?.property_key ?? "Sin clave",
        propertyTitle: property?.title ?? property?.property_key ?? "Sin propiedad",
        dealKind: deal.deal_kind,
        dealStatus: deal.status,
        operationValue,
        currencyCode,
        commissionRate,
        estimatedGrossCommission,
        participantCount: participantRows.length,
        closedOn: deal.closed_on,
        eventDate: deal.closed_on ?? deal.created_at
      };
    })
    .sort((left, right) => compareDateDesc(left.eventDate, right.eventDate));

  const advisorTotals = new Map<
    string,
    {
      id: string;
      advisorName: string;
      staffKind: string;
      employmentStatus: string;
      dealIds: Set<string>;
      estimatedCommission: number;
      currencyCode: string;
    }
  >();

  for (const dealRecord of dealRecords) {
    if (!dealRecord.estimatedGrossCommission) {
      continue;
    }

    const participantRows = participantsByDealId.get(dealRecord.id) ?? [];

    if (participantRows.length === 0) {
      continue;
    }

    for (const participant of participantRows) {
      const splitPercent = participant.participation_percent ?? 0;
      const splitAmount =
        participant.fixed_amount ??
        (splitPercent > 0 ? roundAmount(dealRecord.estimatedGrossCommission * (splitPercent / 100)) : 0);

      if (splitAmount <= 0) {
        continue;
      }

      const staffMatch = participant.staff_member_id ? staffById.get(participant.staff_member_id) : null;
      const key = participant.staff_member_id ?? participant.participant_name ?? participant.id;
      const current = advisorTotals.get(key) ?? {
        id: key,
        advisorName: staffMatch?.display_name ?? participant.participant_name ?? "Sin asignar",
        staffKind: staffMatch?.staff_kind ?? "advisor",
        employmentStatus: staffMatch?.employment_status ?? "inactive",
        dealIds: new Set<string>(),
        estimatedCommission: 0,
        currencyCode: dealRecord.currencyCode
      };

      current.dealIds.add(dealRecord.id);
      current.estimatedCommission += splitAmount;
      advisorTotals.set(key, current);
    }
  }

  const advisorRecords = Array.from(advisorTotals.values())
    .map<CommissionAdvisorRecord>((entry) => ({
      id: entry.id,
      advisorName: entry.advisorName,
      staffKind: entry.staffKind,
      employmentStatus: entry.employmentStatus,
      dealCount: entry.dealIds.size,
      estimatedCommission: roundAmount(entry.estimatedCommission),
      currencyCode: entry.currencyCode
    }))
    .sort((left, right) => right.estimatedCommission - left.estimatedCommission);

  const estimableDealsCount = dealRecords.filter((entry) => typeof entry.estimatedGrossCommission === "number").length;
  const totalEstimatedCommission = roundAmount(
    dealRecords.reduce((sum, entry) => sum + (entry.estimatedGrossCommission ?? 0), 0)
  );

  return {
    summary: {
      totalDeals: deals.length,
      estimableDeals: estimableDealsCount,
      totalEstimatedCommission,
      activeAdvisorsWithCommission: advisorRecords.filter((record) => record.employmentStatus === "active").length,
      coverageRatio: deals.length > 0 ? estimableDealsCount / deals.length : 0
    },
    advisorRecords,
    dealRecords
  };
}

export async function getDashboardData(): Promise<{
  summary: DashboardSummary;
  properties: DashboardPropertyRecord[];
  deals: DashboardDealRecord[];
  staff: DashboardStaffRecord[];
  shifts: DashboardShiftRecord[];
  attendance: DashboardAttendanceRecord[];
}> {
  const admin = createAdminClient();
  const [
    propertiesResponse,
    staffResponse,
    dealsResponse,
    shiftsResponse,
    attendanceResponse
  ] = await Promise.all([
    admin
      .from("properties")
      .select("id, property_key, title, municipality, state, property_status")
      .range(0, 4000),
    admin
      .from("staff_members")
      .select("id, display_name, staff_kind, employment_status, is_guard_eligible, joined_on")
      .range(0, 1000),
    admin
      .from("deals")
      .select("id, title, deal_kind, status, property_id, closed_on, created_at")
      .range(0, 3000),
    admin
      .from("guard_shifts")
      .select("id, shift_date, shift_label, shift_status, assigned_staff_member_id")
      .range(0, 9000),
    admin
      .from("attendance_events")
      .select("id, event_type, event_at, staff_member_id")
      .range(0, 22000)
  ]);

  const properties = assertData<PropertyRow[]>(propertiesResponse.data, propertiesResponse.error, "dashboard properties");
  const staff = assertData<StaffMemberRow[]>(staffResponse.data, staffResponse.error, "dashboard staff");
  const deals = assertData<DealRow[]>(dealsResponse.data, dealsResponse.error, "dashboard deals");
  const shifts = assertData<GuardShiftRow[]>(shiftsResponse.data, shiftsResponse.error, "dashboard guard shifts");
  const attendance = assertData<AttendanceEventRow[]>(attendanceResponse.data, attendanceResponse.error, "dashboard attendance");

  const propertiesById = new Map(properties.map((property) => [property.id, property]));
  const staffById = new Map(staff.map((member) => [member.id, member]));

  return {
    summary: {
      propertyCount: properties.length,
      activePropertyCount: properties.filter((property) => property.property_status === "active").length,
      closedPropertyCount: properties.filter((property) => property.property_status === "closed").length,
      activeStaffCount: staff.filter((member) => member.employment_status === "active").length,
      guardShiftCount: shifts.length,
      attendanceEventCount: attendance.length,
      completedDealCount: deals.filter((deal) => deal.status === "completed").length
    },
    properties: [...properties]
      .sort((left, right) => {
        const activeDelta = Number(isActivePropertyStatus(right.property_status)) - Number(isActivePropertyStatus(left.property_status));

        if (activeDelta !== 0) {
          return activeDelta;
        }

        return left.property_key.localeCompare(right.property_key);
      })
      .slice(0, 8)
      .map((property) => ({
        id: property.id,
        propertyKey: property.property_key,
        title: property.title ?? property.property_key,
        location: getLocation(property),
        propertyStatus: property.property_status
      })),
    deals: [...deals]
      .sort((left, right) => compareDateDesc(left.closed_on ?? left.created_at, right.closed_on ?? right.created_at))
      .slice(0, 8)
      .map((deal) => {
        const property = propertiesById.get(deal.property_id);

        return {
          id: deal.id,
          title: deal.title,
          dealKind: deal.deal_kind,
          status: deal.status,
          propertyKey: property?.property_key ?? "Sin clave",
          propertyTitle: property?.title ?? property?.property_key ?? "Sin propiedad",
          closedOn: deal.closed_on
        };
      }),
    staff: [...staff]
      .sort((left, right) => {
        const activeDelta = Number(right.employment_status === "active") - Number(left.employment_status === "active");

        if (activeDelta !== 0) {
          return activeDelta;
        }

        return left.display_name.localeCompare(right.display_name);
      })
      .slice(0, 8)
      .map((member) => ({
        id: member.id,
        displayName: member.display_name,
        staffKind: member.staff_kind,
        employmentStatus: member.employment_status,
        guardEligible: member.is_guard_eligible,
        joinedOn: member.joined_on
      })),
    shifts: [...shifts]
      .sort((left, right) => compareDateDesc(left.shift_date, right.shift_date))
      .slice(0, 8)
      .map((shift) => ({
        id: shift.id,
        shiftDate: shift.shift_date,
        shiftLabel: shift.shift_label ?? "Guardia",
        shiftStatus: shift.shift_status,
        advisorName: shift.assigned_staff_member_id
          ? staffById.get(shift.assigned_staff_member_id)?.display_name ?? "Sin asignar"
          : "Sin asignar"
      })),
    attendance: [...attendance]
      .sort((left, right) => compareDateDesc(left.event_at, right.event_at))
      .slice(0, 8)
      .map((event) => ({
        id: event.id,
        eventType: event.event_type,
        eventAt: event.event_at,
        advisorName: staffById.get(event.staff_member_id)?.display_name ?? "Sin match"
      }))
  };
}

export async function getCommissionData(): Promise<{
  summary: CommissionSummary;
  dealRecords: CommissionDealRecord[];
  advisorRecords: CommissionAdvisorRecord[];
}> {
  const { summary, advisorRecords, dealRecords } = await buildCommissionDataset();

  return {
    summary,
    dealRecords: dealRecords.slice(0, 16).map<CommissionDealRecord>((record) => ({
      id: record.id,
      dealTitle: record.dealTitle,
      propertyKey: record.propertyKey,
      propertyTitle: record.propertyTitle,
      dealKind: record.dealKind,
      dealStatus: record.dealStatus,
      operationValue: record.operationValue,
      currencyCode: record.currencyCode,
      commissionRate: record.commissionRate,
      estimatedGrossCommission: record.estimatedGrossCommission,
      participantCount: record.participantCount,
      closedOn: record.closedOn
    })),
    advisorRecords: advisorRecords.slice(0, 12)
  };
}

export async function getReportingData(): Promise<{
  summary: ReportingSummary;
  monthlyClosings: ReportingMonthRecord[];
  topAreas: ReportingAreaRecord[];
  topAdvisors: CommissionAdvisorRecord[];
}> {
  const [{ summary: commissionSummary, advisorRecords, dealRecords }, dashboard, properties] = await Promise.all([
    buildCommissionDataset(),
    getDashboardData(),
    fetchAllRows<PropertyRow>("properties", "id, property_key, title, municipality, state, property_status")
  ]);

  const monthlyMap = new Map<string, { deals: number; estimatedCommission: number }>();
  const areaMap = new Map<string, ReportingAreaRecord>();

  for (const property of properties) {
    const area = property.municipality ?? property.state ?? "Sin ubicacion";
    const current = areaMap.get(area) ?? {
      area,
      propertyCount: 0,
      activePropertyCount: 0
    };

    current.propertyCount += 1;
    current.activePropertyCount += Number(property.property_status === "active");
    areaMap.set(area, current);
  }

  for (const deal of dealRecords) {
    const month = deal.eventDate.slice(0, 7);
    const current = monthlyMap.get(month) ?? {
      deals: 0,
      estimatedCommission: 0
    };

    current.deals += 1;
    current.estimatedCommission += deal.estimatedGrossCommission ?? 0;
    monthlyMap.set(month, current);
  }

  return {
    summary: {
      totalProperties: dashboard.summary.propertyCount,
      activeProperties: dashboard.summary.activePropertyCount,
      completedDeals: dashboard.summary.completedDealCount,
      attendanceEvents: dashboard.summary.attendanceEventCount,
      guardShifts: dashboard.summary.guardShiftCount,
      estimatedCommissionTotal: commissionSummary.totalEstimatedCommission
    },
    monthlyClosings: Array.from(monthlyMap.entries())
      .map(([month, values]) => ({
        month,
        deals: values.deals,
        estimatedCommission: roundAmount(values.estimatedCommission)
      }))
      .sort((left, right) => right.month.localeCompare(left.month))
      .slice(0, 12),
    topAreas: Array.from(areaMap.values())
      .sort((left, right) => right.propertyCount - left.propertyCount)
      .slice(0, 10),
    topAdvisors: advisorRecords.slice(0, 10)
  };
}

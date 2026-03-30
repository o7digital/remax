import "server-only";

import { createAdminClient } from "@/utils/supabase/admin";

type PropertyRow = {
  id: string;
  property_key: string;
  title: string | null;
  municipality: string | null;
  state: string | null;
  property_status: string;
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

function assertData<T>(value: T | null, error: { message: string } | null, label: string): T {
  if (error) {
    throw new Error(`Failed to load ${label}: ${error.message}`);
  }

  if (value === null) {
    throw new Error(`Missing ${label} data`);
  }

  return value;
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

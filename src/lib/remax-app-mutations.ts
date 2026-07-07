import "server-only";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export interface CreatePropertyInput {
  propertyKey: string;
  title: string;
  description: string | null;
  propertyStatus: string;
  listingCategory: string | null;
  businessLine: string | null;
  operationType: string | null;
  sourcePrimary: string | null;
  contractSignedOn: string | null;
  promotionStartedOn: string | null;
  listedOn: string | null;
  listPrice: number | null;
  priceDate: string | null;
  currencyCode: string;
  municipality: string | null;
  state: string | null;
  fullAddress: string | null;
  lotAreaM2: number | null;
  constructionAreaM2: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parkingSpaces: number | null;
  landShape: string | null;
  landTopography: string | null;
  landUse: string | null;
  expedienteReceivedOn: string | null;
  expedienteStatus: string | null;
  registeredBy: string | null;
  documents: string[];
  commissionPercent: number | null;
  policyType: string | null;
  minimumAmountNote: string | null;
  rentDeposits: number | null;
  rentAdvanceMonths: number | null;
  technicalSheetType: string;
  facadePhotoUrl: string | null;
  croquisUrl: string | null;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  advisorName: string | null;
  advisorParticipationPercent: number | null;
  advisorFixedAmount: number | null;
  advisorLevel: string | null;
}

export async function createProperty(input: CreatePropertyInput) {
  return prisma.$transaction(async (tx) => {
    const [property] = await tx.$queryRaw<Array<{ id: string }>>`
      INSERT INTO public.properties (
        property_key, title, description, property_status, listing_category,
        business_line, operation_type, source_primary, contract_signed_on,
        promotion_started_on, listed_on, list_price, currency_code, municipality,
        state, full_address, lot_area_m2, construction_area_m2, bedrooms,
        bathrooms, parking_spaces, land_shape, land_topography, land_use, country
      ) VALUES (
        ${input.propertyKey}, ${input.title}, ${input.description},
        ${input.propertyStatus}::public.property_status,
        ${input.listingCategory}::public.listing_category,
        ${input.businessLine}::public.property_business_line,
        ${input.operationType}::public.property_operation,
        ${input.sourcePrimary}, ${input.contractSignedOn}::date,
        ${input.promotionStartedOn}::date, ${input.listedOn}::date,
        ${input.listPrice}, ${input.currencyCode}, ${input.municipality},
        ${input.state}, ${input.fullAddress}, ${input.lotAreaM2},
        ${input.constructionAreaM2}, ${input.bedrooms}, ${input.bathrooms},
        ${input.parkingSpaces}, ${input.landShape}, ${input.landTopography},
        ${input.landUse}, 'MX'
      )
      RETURNING id::text
    `;

    const propertyId = property.id;
    const documentsSql = input.documents.length
      ? Prisma.sql`ARRAY[${Prisma.join(input.documents)}]::text[]`
      : Prisma.sql`ARRAY[]::text[]`;

    await tx.$executeRaw`
      INSERT INTO public.property_alta_expedientes (
        property_id, process_version, received_on, expediente_status,
        registered_by, included_documents
      ) VALUES (
        ${propertyId}::uuid, '230426', ${input.expedienteReceivedOn}::date,
        ${input.expedienteStatus}, ${input.registeredBy}, ${documentsSql}
      )
    `;

    await tx.$executeRaw`
      INSERT INTO public.property_operation_conditions (
        property_id, commission_percent, policy_type, minimum_amount_note,
        rent_deposits, rent_advance_months
      ) VALUES (
        ${propertyId}::uuid, ${input.commissionPercent}, ${input.policyType},
        ${input.minimumAmountNote}, ${input.rentDeposits}, ${input.rentAdvanceMonths}
      )
    `;

    await tx.$executeRaw`
      INSERT INTO public.property_technical_sheets (
        property_id, sheet_type, land_area_m2, construction_area_m2, bedrooms,
        bathrooms, parking_spaces, land_shape, land_topography, land_use,
        facade_photo_url, croquis_url, notes
      ) VALUES (
        ${propertyId}::uuid, ${input.technicalSheetType}, ${input.lotAreaM2},
        ${input.constructionAreaM2}, ${input.bedrooms}, ${input.bathrooms},
        ${input.parkingSpaces}, ${input.landShape}, ${input.landTopography},
        ${input.landUse}, ${input.facadePhotoUrl}, ${input.croquisUrl},
        ${input.description}
      )
    `;

    if (input.listPrice !== null) {
      await tx.$executeRaw`
        INSERT INTO public.property_values (
          property_id, valued_on, price_amount, currency_code, price_kind, notes
        ) VALUES (
          ${propertyId}::uuid, ${input.priceDate}::date, ${input.listPrice},
          ${input.currencyCode}, 'initial', 'Alta inicial desde formulario'
        )
      `;
    }

    await tx.$executeRaw`
      INSERT INTO public.property_contacts (
        property_id, contact_kind, full_name, email, phone, is_primary,
        sequence_number
      ) VALUES (
        ${propertyId}::uuid, 'owner'::public.contact_kind, ${input.ownerName},
        ${input.ownerEmail}, ${input.ownerPhone}, true, 1
      )
    `;

    if (input.advisorName) {
      const [deal] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO public.deals (
          property_id, deal_kind, status, title, signed_on, notes, metadata
        ) VALUES (
          ${propertyId}::uuid, 'listing'::public.deal_kind,
          'in_progress'::public.deal_status, ${`Alta ${input.propertyKey}`},
          ${input.contractSignedOn}::date,
          'Deal tecnico creado desde alta de propiedad',
          ${JSON.stringify({ commission_percent: input.commissionPercent })}::jsonb
        )
        RETURNING id::text
      `;

      await tx.$executeRaw`
        INSERT INTO public.deal_participants (
          deal_id, participant_name, participant_side, participant_role,
          participation_percent, fixed_amount, notes
        ) VALUES (
          ${deal.id}::uuid, ${input.advisorName},
          'listing'::public.participant_side, 'asesor_alta',
          ${input.advisorParticipationPercent}, ${input.advisorFixedAmount},
          ${input.advisorLevel}
        )
      `;

      await tx.$executeRaw`
        INSERT INTO public.property_alta_advisors (
          property_id, deal_id, advisor_name, advisor_level,
          participation_percent, fixed_amount
        ) VALUES (
          ${propertyId}::uuid, ${deal.id}::uuid, ${input.advisorName},
          ${input.advisorLevel}, ${input.advisorParticipationPercent},
          ${input.advisorFixedAmount}
        )
      `;
    }

    return propertyId;
  });
}

export interface SaveCommissionRuleInput {
  id: string | null;
  ruleCode: string;
  name: string;
  dealKind: string | null;
  defaultPercent: number;
  isActive: boolean;
}

export async function saveCommissionRule(input: SaveCommissionRuleInput) {
  if (input.id) {
    await prisma.$executeRaw`
      UPDATE public.commission_rules
      SET rule_code = ${input.ruleCode},
          name = ${input.name},
          deal_kind = ${input.dealKind}::public.deal_kind,
          default_percent = ${input.defaultPercent},
          is_active = ${input.isActive},
          updated_at = now()
      WHERE id = ${input.id}::uuid
    `;
    return;
  }

  await prisma.$executeRaw`
    INSERT INTO public.commission_rules (
      rule_code, name, deal_kind, default_percent, is_active
    ) VALUES (
      ${input.ruleCode}, ${input.name}, ${input.dealKind}::public.deal_kind,
      ${input.defaultPercent}, ${input.isActive}
    )
    ON CONFLICT (rule_code) DO UPDATE
    SET name = EXCLUDED.name,
        deal_kind = EXCLUDED.deal_kind,
        default_percent = EXCLUDED.default_percent,
        is_active = EXCLUDED.is_active,
        updated_at = now()
  `;
}

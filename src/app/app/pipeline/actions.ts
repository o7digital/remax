"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function updateDealForecastDate(dealId: string, closeDate: string) {
  if (!/^[0-9a-f-]{36}$/i.test(dealId) || !/^\d{4}-\d{2}-\d{2}$/.test(closeDate)) {
    throw new Error("invalid-forecast-date");
  }

  const updated = await prisma.$executeRaw`
    UPDATE public.deals
    SET metadata = jsonb_set(
          COALESCE(metadata, '{}'::jsonb),
          '{expected_close_date}',
          to_jsonb(${closeDate}::text),
          true
        ),
        updated_at = now()
    WHERE id = ${dealId}::uuid
  `;

  if (updated !== 1) {
    throw new Error("deal-not-found");
  }

  revalidatePath("/app/pipeline");
  revalidatePath("/app/forecast");
}

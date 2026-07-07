"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import type { PipelineStage } from "@/lib/pipeline-types";

const validStatuses = new Set(["open", "won", "lost"]);

async function ensureWorkflowTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS public.app_pipeline_workflows (
      id text PRIMARY KEY,
      name text NOT NULL,
      stages jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `);
}

function cleanWorkflow(name: string, stages: PipelineStage[]) {
  const cleanName = name.trim().slice(0, 120);
  const cleanStages = stages.map((stage, position) => ({
    id: String(stage.id).trim().slice(0, 80),
    name: String(stage.name).trim().slice(0, 80),
    probability: Math.max(0, Math.min(100, Math.round(Number(stage.probability)))),
    status: stage.status,
    position
  }));

  if (!cleanName || cleanStages.length === 0 || cleanStages.some((stage) => !stage.id || !stage.name || !validStatuses.has(stage.status))) {
    throw new Error("invalid-workflow");
  }

  return { cleanName, cleanStages };
}

export async function savePipelineWorkflow(workflowId: string, name: string, stages: PipelineStage[]) {
  const { cleanName, cleanStages } = cleanWorkflow(name, stages);

  if (!workflowId) {
    throw new Error("invalid-workflow");
  }

  await ensureWorkflowTable();

  await prisma.$executeRaw`
    INSERT INTO public.app_pipeline_workflows (id, name, stages, updated_at)
    VALUES (${workflowId}, ${cleanName}, ${JSON.stringify(cleanStages)}::jsonb, now())
    ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name, stages = EXCLUDED.stages, updated_at = now()
  `;

  revalidatePath("/app/pipeline");
  revalidatePath("/app/forecast");
  return { name: cleanName, stages: cleanStages as PipelineStage[] };
}

export async function createPipelineWorkflow(name: string, stages: PipelineStage[]) {
  const { cleanName, cleanStages } = cleanWorkflow(name, stages);
  const workflowId = `workflow-${randomUUID()}`;
  await ensureWorkflowTable();

  await prisma.$executeRaw`
    INSERT INTO public.app_pipeline_workflows (id, name, stages, updated_at)
    VALUES (${workflowId}, ${cleanName}, ${JSON.stringify(cleanStages)}::jsonb, now())
  `;

  revalidatePath("/app/pipeline");
  return {
    id: workflowId,
    name: cleanName,
    description: "Workflow personalizado",
    stages: cleanStages as PipelineStage[]
  };
}

export async function deletePipelineWorkflow(workflowId: string) {
  if (!workflowId || workflowId === "real-operations") {
    throw new Error("protected-workflow");
  }

  await ensureWorkflowTable();
  await prisma.$executeRaw`DELETE FROM public.app_pipeline_workflows WHERE id = ${workflowId}`;
  revalidatePath("/app/pipeline");
}

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

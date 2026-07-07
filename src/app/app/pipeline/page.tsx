import { PipelinePageClient } from "@/components/pipeline/pipeline-page-client";
import {
  createPipelineWorkflow,
  deletePipelineWorkflow,
  savePipelineWorkflow,
  updateDealForecastDate
} from "@/app/app/pipeline/actions";
import { getPipelineData } from "@/lib/remax-app-data";

export default async function PipelinePage() {
  const { workflows, deals } = await getPipelineData();

  return (
    <PipelinePageClient
      workflows={workflows}
      deals={deals}
      onMoveForecastDeal={updateDealForecastDate}
      onSaveWorkflow={savePipelineWorkflow}
      onCreateWorkflow={createPipelineWorkflow}
      onDeleteWorkflow={deletePipelineWorkflow}
    />
  );
}

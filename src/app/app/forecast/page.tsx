import { PipelinePageClient } from "@/components/pipeline/pipeline-page-client";
import {
  createPipelineWorkflow,
  deletePipelineWorkflow,
  savePipelineWorkflow,
  updateDealForecastDate
} from "@/app/app/pipeline/actions";
import { getPipelineData } from "@/lib/remax-app-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function ForecastPage() {
  const { locale } = await getDemoI18n();
  const { workflows, deals } = await getPipelineData();
  return (
    <PipelinePageClient
      locale={locale}
      workflows={workflows}
      deals={deals}
      initialViewMode="forecast"
      onMoveForecastDeal={updateDealForecastDate}
      onSaveWorkflow={savePipelineWorkflow}
      onCreateWorkflow={createPipelineWorkflow}
      onDeleteWorkflow={deletePipelineWorkflow}
    />
  );
}

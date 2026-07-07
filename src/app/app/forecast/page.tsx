import { PipelinePageClient } from "@/components/pipeline/pipeline-page-client";
import { getPipelineData } from "@/lib/remax-app-data";

export default async function ForecastPage() {
  const { workflows, deals } = await getPipelineData();
  return <PipelinePageClient workflows={workflows} deals={deals} initialViewMode="forecast" />;
}

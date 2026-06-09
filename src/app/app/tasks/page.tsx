import { PageHeader } from "@/components/page-header";
import { TaskManager } from "@/components/task-manager";
import { tasks } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function TasksPage() {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Tasks")}
        description={txt("Pilotage operationnel des actions commerciales, finance et compliance.")}
      />

      <TaskManager initialTasks={tasks} />
    </div>
  );
}

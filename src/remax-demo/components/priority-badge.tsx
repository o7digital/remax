import { translatePriority, type RemaxLanguage } from "@/remax-demo/i18n";
import type { RemaxPriorityLevel } from "@/remax-demo/types";

function getPriorityClassName(priority: RemaxPriorityLevel) {
  switch (priority) {
    case "alta":
      return "remax-priority-badge remax-priority-high";
    case "media":
      return "remax-priority-badge remax-priority-medium";
    default:
      return "remax-priority-badge remax-priority-low";
  }
}

export function PriorityBadge({
  priority,
  language = "es"
}: {
  priority: RemaxPriorityLevel;
  language?: RemaxLanguage;
}) {
  return <span className={getPriorityClassName(priority)}>{translatePriority(language, priority)}</span>;
}

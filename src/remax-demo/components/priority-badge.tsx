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

export function PriorityBadge({ priority }: { priority: RemaxPriorityLevel }) {
  return <span className={getPriorityClassName(priority)}>{priority}</span>;
}

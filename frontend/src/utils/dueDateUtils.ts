/**
 * Utility functions for due date handling
 */

export type DueDateStatus = "overdue" | "warning" | "ok" | "none";

/**
 * Determines the urgency status of a due date:
 * - "overdue": date has passed
 * - "warning": due in less than 48 hours
 * - "ok": due in 48 hours or more
 * - "none": no due date set
 */
export function getDueDateStatus(dueDate: string | null | undefined): DueDateStatus {
  if (!dueDate) return "none";

  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 0) return "overdue";
  if (diffHours < 48) return "warning";
  return "ok";
}

/**
 * Returns Tailwind CSS classes for the due date badge based on its status
 */
export function getDueDateBadgeClasses(status: DueDateStatus): string {
  switch (status) {
    case "overdue":
      return "bg-red-100 text-red-700 border border-red-300";
    case "warning":
      return "bg-orange-100 text-orange-700 border border-orange-300";
    case "ok":
      return "bg-slate-100 text-slate-600 border border-slate-200";
    default:
      return "";
  }
}

/**
 * Formats a due date string for display (e.g. "Mar 15")
 */
export function formatDueDate(dueDate: string): string {
  return new Date(dueDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

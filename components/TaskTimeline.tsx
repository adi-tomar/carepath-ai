import { groupTasksByTimeframe } from "../lib/constants";
import type { Task } from "../lib/schema";

interface TaskTimelineProps {
  tasks: Task[];
}

const timeframeLabels: Record<string, string> = {
  today: "Today",
  "within-48-hours": "Within 48 hours",
  "this-week": "This week",
  upcoming: "Upcoming",
};

const timeframeDescriptions: Record<string, string> = {
  today: "Immediate focus for the next few hours",
  "within-48-hours": "High-priority actions to tackle soon",
  "this-week": "Planned next steps for the week ahead",
  upcoming: "Future follow-up work that should stay visible",
};

function priorityClass(priority: string) {
  switch (priority) {
    case "high":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "medium":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
}

export function TaskTimeline({ tasks }: TaskTimelineProps) {
  const groupedTasks = groupTasksByTimeframe(tasks);
  const populatedGroups = Object.entries(groupedTasks).filter(([, items]) => items.length > 0);

  return (
    <section className="space-y-4">
      {populatedGroups.map(([timeframe, items], index) => (
          <div key={timeframe} className="relative rounded-[22px] border border-emerald-100 bg-emerald-50/70 p-4 sm:p-5">
            {index < populatedGroups.length - 1 ? (
              <span className="absolute -bottom-5 left-9 h-6 w-0.5 bg-emerald-200" aria-hidden="true" />
            ) : null}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white text-sm font-semibold text-emerald-700 shadow-sm">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{timeframeLabels[timeframe]}</h3>
                <p className="text-sm text-slate-600">{timeframeDescriptions[timeframe]}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {items.map((task) => (
                <div key={task.id} className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-slate-900">{task.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{task.description}</p>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${priorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityClass(task.priority)}`}>
                      {task.priority} priority
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      Owner: {task.owner}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {task.source}
                    </span>
                    {task.changeStatus !== "unchanged" ? (
                      <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">
                        {task.changeStatus}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-500">
                    <span className="font-semibold text-slate-600">Why it matters:</span> {task.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
      ))}
    </section>
  );
}

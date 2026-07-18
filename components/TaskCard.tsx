import type { Task } from "../lib/schema";

interface TaskCardProps {
  task: Task;
}

function formatLabel(value: string) {
  return value.replace(/-/g, " ");
}

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

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${priorityClass(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{task.description}</p>
        </div>
      </div>

      <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Owner</dt>
          <dd className="mt-1 font-medium text-slate-900">{task.owner}</dd>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Source</dt>
          <dd className="mt-1 font-medium text-slate-900">{task.source}</dd>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</dt>
          <dd className="mt-1 font-medium text-slate-900">{task.status}</dd>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Change status</dt>
          <dd className="mt-1 font-medium text-slate-900">{task.changeStatus}</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why this matters</p>
        <p className="mt-1 leading-6">{task.reason}</p>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-500">{formatLabel(task.timeframe)}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          Helpful next step
        </span>
      </div>
    </article>
  );
}

import type { PatientSummary as PatientSummaryType } from "../lib/schema";

interface PatientSummaryProps {
  summary: PatientSummaryType;
}

export function PatientSummary({ summary }: PatientSummaryProps) {
  const fields = [
    { label: "Situation", value: summary.context },
    { label: "Living situation", value: "Not provided" },
    { label: "Mobility", value: "Not provided" },
    { label: "Transportation", value: "Not provided" },
    { label: "Support available", value: "Not provided" },
    { label: "Constraints", value: "Not provided" },
  ];

  return (
    <section className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Patient summary</h2>
          <p className="mt-1 text-sm text-slate-500">A simple snapshot of the person and situation behind the plan.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          At a glance
        </span>
      </div>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</dt>
          <dd className="mt-1 text-base font-semibold text-slate-900">{summary.name}</dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Age</dt>
          <dd className="mt-1 text-base font-medium text-slate-900">{summary.age}</dd>
        </div>
        {fields.map((field) => (
          <div key={field.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{field.label}</dt>
            <dd className="mt-1 text-base font-medium text-slate-900">{field.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

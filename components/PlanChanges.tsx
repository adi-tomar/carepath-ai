interface PlanChangesProps {
  summary: string;
}

export function PlanChanges({ summary }: PlanChangesProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Plan change summary</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">{summary}</p>
    </section>
  );
}

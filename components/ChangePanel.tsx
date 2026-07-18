interface ChangePanelProps {
  value: string;
  onChange: (value: string) => void;
}

export function ChangePanel({ value, onChange }: ChangePanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Scenario change</h2>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-500"
        placeholder="Describe a change in circumstances..."
      />
    </section>
  );
}

"use client";

import { useState } from "react";
import { maryCareInstructions, maryPatientScenario } from "../lib/demo-data";

interface ScenarioFormProps {
  isLoading: boolean;
  onSubmit: (payload: {
    patientScenario: string;
    careInstructions: string;
  }) => Promise<void> | void;
}

export function ScenarioForm({ isLoading, onSubmit }: ScenarioFormProps) {
  const [patientScenario, setPatientScenario] = useState(maryPatientScenario);
  const [careInstructions, setCareInstructions] = useState(maryCareInstructions);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;
    setError(null);

    if (!patientScenario.trim() || !careInstructions.trim()) {
      setError("Patient scenario and care instructions are required.");
      return;
    }

    await onSubmit({
      patientScenario: patientScenario.trim(),
      careInstructions: careInstructions.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_12px_35px_rgba(16,185,129,0.06)] sm:p-6"
    >
      <div>
        <label htmlFor="patient-scenario" className="mb-2 block text-sm font-semibold text-slate-800">
          Patient scenario
        </label>
        <textarea
          id="patient-scenario"
          value={patientScenario}
          onChange={(event) => setPatientScenario(event.target.value)}
          rows={7}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
          required
        />
      </div>

      <div>
        <label htmlFor="care-instructions" className="mb-2 block text-sm font-semibold text-slate-800">
          Clinician-provided care instructions
        </label>
        <textarea
          id="care-instructions"
          value={careInstructions}
          onChange={(event) => setCareInstructions(event.target.value)}
          rows={7}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
          required
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
        <p className="max-w-md text-sm leading-5 text-slate-600">
          Gemma will organize the supplied information into coordination cards and a timeline.
        </p>
        <button
          type="submit"
          disabled={isLoading || !patientScenario.trim() || !careInstructions.trim()}
          className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLoading ? "Generating plan..." : "Generate care plan"}
        </button>
      </div>

      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
    </form>
  );
}

"use client";

import { useState } from "react";
import { maryCareInstructions, maryPatientScenario } from "../lib/demo-data";

interface ScenarioFormProps {
  onSubmit: (payload: {
    patientScenario: string;
    careInstructions: string;
  }) => Promise<void> | void;
}

export function ScenarioForm({ onSubmit }: ScenarioFormProps) {
  const [patientScenario, setPatientScenario] = useState(maryPatientScenario);
  const [careInstructions, setCareInstructions] = useState(maryCareInstructions);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!patientScenario.trim()) {
      setError("Patient scenario is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({ patientScenario, careInstructions });
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unable to submit the form.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="patient-scenario" className="mb-2 block text-sm font-medium text-slate-700">
          Patient scenario
        </label>
        <textarea
          id="patient-scenario"
          name="patientScenario"
          value={patientScenario}
          onChange={(event) => setPatientScenario(event.target.value)}
          rows={6}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-500"
          required
        />
      </div>
      <div>
        <label htmlFor="care-instructions" className="mb-2 block text-sm font-medium text-slate-700">
          Care instructions
        </label>
        <textarea
          id="care-instructions"
          name="careInstructions"
          value={careInstructions}
          onChange={(event) => setCareInstructions(event.target.value)}
          rows={6}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-500"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Demo data is prefilled to help you explore the care-plan flow.
        </p>
        <button
          type="submit"
          disabled={isSubmitting || !patientScenario.trim()}
          className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isSubmitting ? "Generating..." : "Generate plan"}
        </button>
      </div>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </form>
  );
}

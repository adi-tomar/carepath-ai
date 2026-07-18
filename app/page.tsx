"use client";

import { useMemo, useState } from "react";
import { ChangePanel } from "../components/ChangePanel";
import { Disclaimer } from "../components/Disclaimer";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingState } from "../components/LoadingState";
import { PatientSummary } from "../components/PatientSummary";
import { PlanChanges } from "../components/PlanChanges";
import { ScenarioForm } from "../components/ScenarioForm";
import { SupportSections } from "../components/SupportSections";
import { TaskTimeline } from "../components/TaskTimeline";
import { initialFallbackPlan } from "../lib/demo-data";
import type { Plan } from "../lib/schema";

export default function Home() {
  const [plan, setPlan] = useState<Plan | null>(initialFallbackPlan);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scenarioChange, setScenarioChange] = useState("");

  const summary = useMemo(() => plan?.patientSummary ?? null, [plan]);

  async function handleGenerate(payload: { patientScenario: string; careInstructions: string }) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          patientScenario: payload.patientScenario,
          careInstructions: payload.careInstructions,
          scenarioChange: scenarioChange.trim() || undefined,
          previousPlan: plan ?? undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to generate a plan from the current inputs.");
      }

      const nextPlan = (await response.json()) as Plan;
      setPlan(nextPlan);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unable to generate a plan.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(226,232,240,0.35),_transparent_35%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">CarePath AI</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            A calmer way to turn care details into a clear next-step plan.
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Organize care instructions, spot important follow-ups, and keep the next steps easy to understand.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <ScenarioForm onSubmit={handleGenerate} />
            <ChangePanel value={scenarioChange} onChange={setScenarioChange} />
          </div>

          <div className="space-y-6">
            {error ? <ErrorMessage message={error} /> : null}
            {isLoading ? <LoadingState /> : null}

            {summary ? (
              <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Overview</p>
                    <h2 className="mt-1 text-2xl font-semibold text-slate-900">Your care plan snapshot</h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                    Friendly and simple
                  </span>
                </div>
                <div className="mt-5">
                  <PatientSummary summary={summary} />
                </div>
              </section>
            ) : null}

            {plan ? (
              <>
                <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Tasks</p>
                      <h2 className="mt-1 text-2xl font-semibold text-slate-900">Your next steps</h2>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                      Clear priorities
                    </span>
                  </div>
                  <div className="mt-5">
                    <TaskTimeline tasks={plan.tasks} />
                  </div>
                </section>

                <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Updates</p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-900">What changed</h2>
                  <div className="mt-4">
                    <PlanChanges summary={plan.planChangeSummary} />
                  </div>
                </section>

                <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support</p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-900">Helpful follow-up details</h2>
                  <div className="mt-4">
                    <SupportSections
                      questions={plan.questionsForCareTeam}
                      missingInformation={plan.missingInformation}
                      risks={plan.coordinationRisks}
                    />
                  </div>
                </section>

                <Disclaimer />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { ChangePanel } from "../components/ChangePanel";
import { Disclaimer } from "../components/Disclaimer";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingState } from "../components/LoadingState";
import { PatientSummary } from "../components/PatientSummary";
import { PlanChanges } from "../components/PlanChanges";
import { ScenarioForm } from "../components/ScenarioForm";
import { SupportSections } from "../components/SupportSections";
import { TaskTimeline } from "../components/TaskTimeline";
import type { Plan } from "../lib/schema";

export default function Home() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scenarioChange, setScenarioChange] = useState("");

  async function handleGenerate(payload: {
    patientScenario: string;
    careInstructions: string;
  }) {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          scenarioChange: scenarioChange.trim() || undefined,
          previousPlan: plan ?? undefined,
        }),
      });
      const result = (await response.json()) as Plan & { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to generate the care plan.");
      }

      setPlan(result);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to generate the care plan.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleToggleComplete(taskId: string) {
    setPlan((currentPlan) => {
      if (!currentPlan) return currentPlan;

      return {
        ...currentPlan,
        tasks: currentPlan.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: task.status === "completed" ? "not started" : "completed",
              }
            : task,
        ),
      };
    });
  }

  return (
    <main className="min-h-screen bg-[#f8fdf9] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-[30px] border border-emerald-100 bg-white p-6 shadow-[0_12px_40px_rgba(16,185,129,0.07)] sm:p-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Local Gemma
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              Coordination only
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            A clearer path through care coordination.
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Turn supplied patient circumstances and care instructions into focused cards,
            priorities, owners, and an easy-to-scan timeline.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 lg:sticky lg:top-6">
            <ScenarioForm isLoading={isLoading} onSubmit={handleGenerate} />
            <ChangePanel value={scenarioChange} onChange={setScenarioChange} />
          </div>

          <div className="space-y-6" aria-live="polite">
            {error ? <ErrorMessage message={error} /> : null}
            {isLoading ? <LoadingState /> : null}

            {!plan && !isLoading && !error ? (
              <section className="rounded-[28px] border border-dashed border-emerald-200 bg-white/70 p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-700">
                  ✓
                </div>
                <h2 className="mt-4 text-xl font-semibold text-slate-900">Your plan will appear here</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Tasks will be grouped by timing and displayed with priority, owner,
                  status, and source pills.
                </p>
              </section>
            ) : null}

            {plan && !isLoading ? (
              <>
                <PatientSummary summary={plan.patientSummary} />

                <section className="rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_12px_35px_rgba(16,185,129,0.07)] sm:p-6">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Timeline</p>
                      <h2 className="mt-1 text-2xl font-semibold text-slate-900">Prioritized next steps</h2>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                      {plan.tasks.length} tasks
                    </span>
                  </div>
                  <div className="mt-5">
                    <TaskTimeline
                      tasks={plan.tasks}
                      onToggleComplete={handleToggleComplete}
                    />
                  </div>
                </section>

                <PlanChanges summary={plan.planChangeSummary} />
                <SupportSections
                  questions={plan.questionsForCareTeam}
                  missingInformation={plan.missingInformation}
                  risks={plan.coordinationRisks}
                />
                <Disclaimer />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

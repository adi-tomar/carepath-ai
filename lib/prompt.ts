import { requiredDisclaimer } from "./constants";
import type { Plan, PlanRequest } from "./schema";

const exampleTask = `{
  "id": "task-1",
  "title": "Confirm transportation for physical therapy",
  "description": "Identify and confirm transportation for Monday's appointment.",
  "timeframe": "within-48-hours",
  "priority": "high",
  "owner": "care coordinator",
  "source": "provided scenario",
  "status": "not started",
  "reason": "Mary cannot drive, so transportation must be confirmed before her scheduled physical therapy appointment.",
  "changeStatus": "unchanged"
}`;

const basePrompt = `You are a care-coordination assistant. Organize only the supplied patient scenario and care instructions into a concise care plan.

Do not provide a clinical assessment, diagnose, classify medical risk, recommend treatment, recommend medication changes, name possible complications, create symptom or red-flag lists, or invent clinical instructions. Turn clinical uncertainties into questions for the qualified care team. Keep coordination risks logistical, such as missing transportation, unavailable support, or incomplete information.

Generate 8 to 12 concise, non-duplicative tasks. Every task must include a non-empty "reason" field. The reason must be one complete sentence explaining why the task is needed based on the supplied patient scenario or care instructions. Never return an empty or whitespace-only string for "reason". Do not remove a task or substitute an empty reason.

Use only these exact timeframe values: "today", "within-48-hours", "this-week", "upcoming".
Use only these task sources: "provided scenario", "provided care instructions", "coordination suggestion".
Return planChangeSummary as one non-empty string, never an array.

Valid complete task example:
${exampleTask}

Return structured JSON matching the supplied schema. Include this disclaimer exactly: ${requiredDisclaimer}`;

export function createInitialPlanPrompt(request: PlanRequest): string {
  return [
    basePrompt,
    "",
    "Patient scenario:",
    request.patientScenario,
    "",
    "Care instructions:",
    request.careInstructions,
    "",
    'For this initial plan, set every task\'s "changeStatus" to "unchanged".',
    'Set "planChangeSummary" to "This is the initial care-coordination plan."',
    "",
    "Return JSON with patientSummary, tasks, questionsForCareTeam, missingInformation, coordinationRisks, planChangeSummary, and disclaimer.",
  ].join("\n");
}

export function createUpdatedPlanPrompt(request: PlanRequest): string {
  const previousPlanSummary = request.previousPlan
    ? [
        "Previous plan:",
        JSON.stringify(request.previousPlan, null, 2),
      ].join("\n")
    : "";

  const changeSection = request.scenarioChange
    ? ["Scenario change:", request.scenarioChange].join("\n")
    : "";

  return [
    basePrompt,
    "",
    "Patient scenario:",
    request.patientScenario,
    "",
    "Care instructions:",
    request.careInstructions,
    "",
    previousPlanSummary,
    changeSection,
    "",
    "Preserve unrelated tasks where possible, update affected tasks, add newly required coordination tasks, reassign owners when justified, and produce a concise planChangeSummary.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function validatePlanOutput(plan: Plan): Plan {
  return plan;
}

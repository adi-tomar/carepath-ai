import { requiredDisclaimer } from "./constants";
import type { Plan, PlanRequest } from "./schema";

const basePrompt = `You are a care-coordination assistant. Organize the supplied patient scenario and care instructions into a concise care plan. Do not diagnose, recommend treatment, recommend medication changes, or invent clinical instructions. Label every task source as one of: provided scenario, provided care instructions, or coordination suggestion. Generate 8 to 12 concise tasks. Use the allowed task values and return structured JSON that matches the expected schema. Include this disclaimer in the output: ${requiredDisclaimer}`;

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

import { planSchema } from "./schema";

export const maryPatientScenario =
  "Mary is 74 and was discharged after total knee replacement. She lives alone. Her daughter can help for two days. Mary cannot drive. Physical therapy begins Monday, and her surgeon follow-up appointment is in two weeks. She uses a walker and has six prescribed medications.";

export const maryCareInstructions = [
  "Follow the written medication schedule provided at discharge.",
  "Use the walker as instructed.",
  "Attend physical therapy beginning Monday.",
  "Attend the surgeon follow-up appointment in two weeks.",
  "Keep the surgical dressing clean and dry according to the discharge instructions.",
].join("\n");

export const maryScenarioChange =
  "Mary's daughter is no longer available to help.";

export const initialFallbackPlan = planSchema.parse({
  patientSummary: {
    name: "Mary",
    age: 74,
    context:
      "Recovering after total knee replacement with limited transportation and short-term caregiver support.",
  },
  tasks: [
    {
      id: "task-1",
      title: "Review discharge instructions",
      description: "Confirm the written medication and recovery instructions are available and understood.",
      timeframe: "today",
      priority: "high",
      owner: "patient",
      source: "provided care instructions",
      status: "not started",
      reason: "Important for safe coordination and follow-through.",
      changeStatus: "unchanged",
    },
    {
      id: "task-2",
      title: "Confirm medication availability",
      description: "Verify all prescribed medications are available before the first refill window.",
      timeframe: "today",
      priority: "high",
      owner: "caregiver",
      source: "provided scenario",
      status: "not started",
      reason: "Medications are part of the discharge plan and transport depends on preparation.",
      changeStatus: "unchanged",
    },
    {
      id: "task-3",
      title: "Arrange transportation for physical therapy",
      description: "Coordinate safe transportation for the Monday therapy visit.",
      timeframe: "within-48-hours",
      priority: "high",
      owner: "care coordinator",
      source: "provided scenario",
      status: "not started",
      reason: "Mary cannot drive and the appointment is soon.",
      changeStatus: "unchanged",
    },
    {
      id: "task-4",
      title: "Arrange transportation for follow-up appointment",
      description: "Plan transportation for the surgeon follow-up appointment in two weeks.",
      timeframe: "this-week",
      priority: "medium",
      owner: "care coordinator",
      source: "provided scenario",
      status: "not started",
      reason: "The appointment is scheduled and transportation will be needed.",
      changeStatus: "unchanged",
    },
    {
      id: "task-5",
      title: "Prepare walker and recovery equipment",
      description: "Ensure the walker and any needed recovery items are available at home.",
      timeframe: "today",
      priority: "medium",
      owner: "patient",
      source: "provided scenario",
      status: "not started",
      reason: "The walker is part of the immediate setup for daily movement.",
      changeStatus: "unchanged",
    },
    {
      id: "task-6",
      title: "Confirm support responsibilities",
      description: "Clarify who will cover short-term support tasks while the daughter is available.",
      timeframe: "within-48-hours",
      priority: "medium",
      owner: "caregiver",
      source: "coordination suggestion",
      status: "not started",
      reason: "The caregiver schedule directly affects transport and daily support.",
      changeStatus: "unchanged",
    },
  ],
  questionsForCareTeam: [
    "What transportation options are available for physical therapy and follow-up appointments?",
  ],
  missingInformation: [
    "Whether a community transport service or family support can cover transportation.",
  ],
  coordinationRisks: [
    "The patient may miss transportation-dependent appointments if support is not arranged.",
  ],
  planChangeSummary: "Initial coordination plan prepared for transportation, medication readiness, and support planning.",
  disclaimer:
    "This tool organizes supplied care information and does not provide medical advice. Contact the patient’s qualified healthcare team regarding clinical questions or concerning symptoms.",
});

export const updatedFallbackPlan = planSchema.parse({
  patientSummary: {
    name: "Mary",
    age: 74,
    context:
      "Recovery plan updated after losing short-term caregiver support and needing alternative transportation arrangements.",
  },
  tasks: [
    {
      id: "task-1",
      title: "Review discharge instructions",
      description: "Confirm the written medication and recovery instructions are available and understood.",
      timeframe: "today",
      priority: "high",
      owner: "patient",
      source: "provided care instructions",
      status: "not started",
      reason: "Important for safe coordination and follow-through.",
      changeStatus: "unchanged",
    },
    {
      id: "task-2",
      title: "Confirm medication availability",
      description: "Verify all prescribed medications are available before the first refill window.",
      timeframe: "today",
      priority: "high",
      owner: "caregiver",
      source: "provided scenario",
      status: "not started",
      reason: "Medications are part of the discharge plan and transport depends on preparation.",
      changeStatus: "updated",
    },
    {
      id: "task-3",
      title: "Arrange transportation for physical therapy",
      description: "Coordinate safe transportation for the Monday therapy visit.",
      timeframe: "within-48-hours",
      priority: "high",
      owner: "care coordinator",
      source: "provided scenario",
      status: "not started",
      reason: "Mary cannot drive and the appointment is soon.",
      changeStatus: "updated",
    },
    {
      id: "task-4",
      title: "Arrange transportation for follow-up appointment",
      description: "Plan transportation for the surgeon follow-up appointment in two weeks.",
      timeframe: "this-week",
      priority: "high",
      owner: "care coordinator",
      source: "provided scenario",
      status: "not started",
      reason: "The appointment is scheduled and transportation will be needed.",
      changeStatus: "updated",
    },
    {
      id: "task-5",
      title: "Prepare walker and recovery equipment",
      description: "Ensure the walker and any needed recovery items are available at home.",
      timeframe: "today",
      priority: "medium",
      owner: "patient",
      source: "provided scenario",
      status: "not started",
      reason: "The walker is part of the immediate setup for daily movement.",
      changeStatus: "unchanged",
    },
    {
      id: "task-6",
      title: "Contact clinic about support options",
      description: "Ask the clinic or care coordinator about alternative support options after the daughter becomes unavailable.",
      timeframe: "within-48-hours",
      priority: "high",
      owner: "care coordinator",
      source: "coordination suggestion",
      status: "not started",
      reason: "Support gaps now require a direct coordination outreach.",
      changeStatus: "new",
    },
  ],
  questionsForCareTeam: [
    "What transportation options are available for physical therapy and follow-up appointments now that short-term support has changed?",
  ],
  missingInformation: [
    "Whether a community transport service or alternative caregiver support can cover transportation.",
  ],
  coordinationRisks: [
    "The patient may miss transportation-dependent appointments if support is not arranged quickly.",
  ],
  planChangeSummary: "Transportation and support planning increased in priority after the loss of short-term caregiver availability.",
  disclaimer:
    "This tool organizes supplied care information and does not provide medical advice. Contact the patient’s qualified healthcare team regarding clinical questions or concerning symptoms.",
});

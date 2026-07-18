import { z } from "zod";

export const timeframeEnum = z.enum([
  "today",
  "within-48-hours",
  "this-week",
  "upcoming",
]);

export const priorityEnum = z.enum(["high", "medium", "low"]);
export const ownerEnum = z.enum(["patient", "caregiver", "clinic", "care coordinator"]);
export const sourceEnum = z.enum([
  "provided scenario",
  "provided care instructions",
  "coordination suggestion",
]);
export const statusEnum = z.enum(["not started", "in progress", "completed"]);
export const changeStatusEnum = z.enum([
  "unchanged",
  "updated",
  "new",
  "removed",
]);

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  timeframe: timeframeEnum,
  priority: priorityEnum,
  owner: ownerEnum,
  source: sourceEnum,
  status: statusEnum,
  reason: z.string().min(1),
  changeStatus: changeStatusEnum,
});

export const patientSummarySchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive(),
  context: z.string().min(1),
});

export const planSchema = z.object({
  patientSummary: patientSummarySchema,
  tasks: z.array(taskSchema),
  questionsForCareTeam: z.array(z.string().min(1)),
  missingInformation: z.array(z.string().min(1)),
  coordinationRisks: z.array(z.string().min(1)),
  planChangeSummary: z.string().min(1),
  disclaimer: z.string().min(1),
});

export const planRequestSchema = z.object({
  patientScenario: z.string().min(1),
  careInstructions: z.string().min(1),
  scenarioChange: z.string().optional(),
  previousPlan: planSchema.optional(),
});

export type Timeframe = z.infer<typeof timeframeEnum>;
export type Priority = z.infer<typeof priorityEnum>;
export type Owner = z.infer<typeof ownerEnum>;
export type Source = z.infer<typeof sourceEnum>;
export type Status = z.infer<typeof statusEnum>;
export type ChangeStatus = z.infer<typeof changeStatusEnum>;
export type Task = z.infer<typeof taskSchema>;
export type PatientSummary = z.infer<typeof patientSummarySchema>;
export type Plan = z.infer<typeof planSchema>;
export type PlanRequest = z.infer<typeof planRequestSchema>;

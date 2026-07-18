import { type Timeframe } from "./schema";

export const timeframeOrder: Timeframe[] = [
  "today",
  "within-48-hours",
  "this-week",
  "upcoming",
];

export const requiredDisclaimer =
  "This tool organizes supplied care information and does not provide medical advice. Contact the patient’s qualified healthcare team regarding clinical questions or concerning symptoms.";

export function groupTasksByTimeframe<T extends { timeframe: Timeframe }>(tasks: T[]) {
  return timeframeOrder.reduce<Record<Timeframe, T[]>>((accumulator, timeframe) => {
    accumulator[timeframe] = tasks.filter((task) => task.timeframe === timeframe);
    return accumulator;
  }, {
    today: [],
    "within-48-hours": [],
    "this-week": [],
    upcoming: [],
  });
}

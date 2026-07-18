import { groupTasksByTimeframe } from "../lib/constants";
import type { Task } from "../lib/schema";
import { TaskCard } from "./TaskCard";

interface TaskTimelineProps {
  tasks: Task[];
}

const timeframeLabels: Record<string, string> = {
  today: "Today",
  "within-48-hours": "Within 48 hours",
  "this-week": "This week",
  upcoming: "Upcoming",
};

export function TaskTimeline({ tasks }: TaskTimelineProps) {
  const groupedTasks = groupTasksByTimeframe(tasks);

  return (
    <section className="space-y-6">
      {Object.entries(groupedTasks).map(([timeframe, items]) => {
        if (items.length === 0) {
          return null;
        }

        return (
          <div key={timeframe}>
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              {timeframeLabels[timeframe]}
            </h3>
            <div className="space-y-3">
              {items.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

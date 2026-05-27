import { GreetingCard } from "@/components/dashboard/home/greeting-card";
import {
  LevelProgressSummary,
  SkillTrackerCard,
} from "@/components/dashboard/home/stats-overview";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <GreetingCard />

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <LevelProgressSummary />
        <SkillTrackerCard />
      </div>
    </div>
  );
}

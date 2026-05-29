import { GreetingCard } from "@/components/dashboard/home/greeting-card";
import { DailyPlan } from "@/components/dashboard/home/daily-plan";
import {
  LevelProgressSummary,
  SkillTrackerCard,
} from "@/components/dashboard/home/stats-overview";
import { VocabPreview } from "@/components/dashboard/home/vocab-preview";
import { WeaknessTracker } from "@/components/dashboard/home/weakness-tracker";
import { CertificateMilestone } from "@/components/dashboard/home/certificate-milestone";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <GreetingCard />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <LevelProgressSummary />
          <DailyPlan />
        </div>

        <div className="space-y-6">
          <SkillTrackerCard />
          <CertificateMilestone />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <WeaknessTracker />
        <VocabPreview />
      </div>
    </div>
  );
}

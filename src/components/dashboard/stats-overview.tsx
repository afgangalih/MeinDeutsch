import Link from "next/link";
import { ArrowRight, BookOpenText, Headphones, Mic, PenLine } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const skills = [
  { label: "Hören", value: 42, icon: Headphones },
  { label: "Lesen", value: 58, icon: BookOpenText },
  { label: "Schreiben", value: 30, icon: PenLine },
  { label: "Sprechen", value: 24, icon: Mic },
];

export function LevelProgressSummary() {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>Level Aktif</CardTitle>
        <CardDescription>A1 Beginner</CardDescription>
        <CardAction>
          <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
            38%
          </span>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-sm font-medium">Fondasi A1</p>
            <p className="text-sm tabular-nums text-muted-foreground">38%</p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[38%] rounded-full bg-primary" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-muted px-3 py-3">
            <p className="text-lg font-semibold">12</p>
            <p className="text-xs text-muted-foreground">Modul</p>
          </div>
          <div className="rounded-lg bg-muted px-3 py-3">
            <p className="text-lg font-semibold">86</p>
            <p className="text-xs text-muted-foreground">Kosakata</p>
          </div>
          <div className="rounded-lg bg-muted px-3 py-3">
            <p className="text-lg font-semibold">4</p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
        </div>

        <Link
          href="/dashboard/courses"
          className={cn(buttonVariants(), "h-10 w-full")}
        >
          Lanjutkan Belajar
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function SkillTrackerCard() {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>Skill Tracker</CardTitle>
        <CardDescription>Ringkasan latihan empat keterampilan.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <div key={skill.label} className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{skill.label}</p>
                    <p className="text-sm tabular-nums text-muted-foreground">{skill.value}%</p>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-[#111827]"
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, BookOpenText, Headphones, Mic, PenLine } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const skills = [
  { label: "Hören", value: 42, icon: Headphones },
  { label: "Lesen", value: 58, icon: BookOpenText },
  { label: "Schreiben", value: 30, icon: PenLine },
  { label: "Sprechen", value: 24, icon: Mic },
];

export function LevelProgressSummary() {
  return (
    <Card className="rounded-3xl border border-border/40 bg-card p-6 shadow-xs">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Level Aktif</p>
          <h3 className="text-xl font-extrabold text-foreground">A1 Beginner</h3>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground shadow-sm">
          38% Selesai
        </span>
      </div>

      <CardContent className="p-0 space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>Kurikulum Fondasi A1</span>
            <span>38%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: "38%" }} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl border border-border/30 bg-muted/40 px-3 py-3">
            <p className="text-xl font-extrabold text-foreground">12</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Modul</p>
          </div>
          <div className="rounded-2xl border border-border/30 bg-muted/40 px-3 py-3">
            <p className="text-xl font-extrabold text-foreground">86</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Kosakata</p>
          </div>
          <div className="rounded-2xl border border-border/30 bg-muted/40 px-3 py-3">
            <p className="text-xl font-extrabold text-foreground">4</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Streak</p>
          </div>
        </div>

        <Link
          href="/dashboard/courses"
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-11 w-full gap-2 rounded-xl text-sm font-bold shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
          )}
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
    <Card className="rounded-3xl border border-border/40 bg-card p-6 shadow-xs">
      <div className="mb-6">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Latihan</p>
        <h3 className="text-xl font-extrabold text-foreground">Skill Tracker</h3>
      </div>

      <CardContent className="p-0 space-y-4">
        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <div key={skill.label} className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted border border-border/30 text-foreground">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <p className="text-foreground">{skill.label}</p>
                  <p className="text-muted-foreground">{skill.value}%</p>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-secondary"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

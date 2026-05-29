"use client";

import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tasks = [
  "Pelajari 1 modul utama",
  "Latih 5 kosakata baru",
  "Kerjakan 1 kuis singkat",
  "Ulangi 1 materi yang masih sulit",
];

export function DailyPlan() {
  const [done, setDone] = useState<string[]>([]);

  function toggle(task: string) {
    setDone((current) =>
      current.includes(task) ? current.filter((item) => item !== task) : [...current, task]
    );
  }

  return (
    <Card className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Rencana Harian
        </p>
        <h3 className="text-xl font-extrabold text-foreground">Fokus hari ini</h3>
      </div>

      <CardContent className="space-y-3 p-0">
        {tasks.map((task) => {
          const checked = done.includes(task);

          return (
            <button
              key={task}
              type="button"
              onClick={() => toggle(task)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border border-border/40 bg-muted/30 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-muted",
                checked && "border-primary/20 bg-primary/5 text-muted-foreground"
              )}
            >
              {checked ? (
                <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
              ) : (
                <Circle className="size-5 text-muted-foreground" aria-hidden="true" />
              )}
              <span className={cn(checked && "line-through")}>{task}</span>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}

import { AlertTriangle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { weaknessItems } from "@/lib/learning-data";

export function WeaknessTracker() {
  return (
    <Card className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Weakness Tracker
          </p>
          <h3 className="text-xl font-extrabold text-foreground">Area yang perlu diulang</h3>
        </div>
        <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <AlertTriangle className="size-5" aria-hidden="true" />
        </span>
      </div>

      <CardContent className="space-y-4 p-0">
        {weaknessItems.map((item) => (
          <div key={item.topic}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-foreground">{item.topic}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <p className="text-sm font-extrabold text-primary">{item.wrongRate}%</p>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${item.wrongRate}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

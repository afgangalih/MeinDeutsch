import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const days = [
  { name: "S", label: "Sen", active: true },
  { name: "S", label: "Sel", active: true },
  { name: "R", label: "Rab", active: false },
  { name: "K", label: "Kam", active: true },
  { name: "J", label: "Jum", active: false },
  { name: "S", label: "Sab", active: false },
  { name: "M", label: "Min", active: false },
];

export function WeeklyPlanner() {
  return (
    <Card className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs flex flex-col justify-between">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Jadwal Belajar
        </p>
        <h3 className="text-xl font-extrabold text-foreground">Komitmen minggu ini</h3>
      </div>

      <CardContent className="flex items-center justify-between gap-1 p-0 w-full">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "flex size-9 items-center justify-center rounded-full border text-xs font-extrabold transition-all",
                day.active
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-muted/30 text-muted-foreground/60 border-border/40"
              )}
            >
              {day.name}
            </div>
            <span className="text-[10px] font-bold text-muted-foreground/80">{day.label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import { FourSkillsPractice } from "@/components/dashboard/four-skills/four-skills-practice";

export default function FourSkillsPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Four Skills Practice
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          Latihan Hören, Lesen, Schreiben, Sprechen
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Ruang latihan untuk mengasah kemampuan reseptif dan produktif secara seimbang.
        </p>
      </header>

      <FourSkillsPractice />
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, Headphones, BookOpen, PencilLine, Mic } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Belajar Bahasa Jerman{" "}
              <span className="text-primary">Terstruktur</span> dari A1 hingga C2.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Platform pembelajaran bahasa Jerman modern dengan kurikulum CEFR, latihan empat
              keterampilan, dan dashboard progres personal. Bukan sekadar website materi biasa.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-12 gap-2 px-7 text-base font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
                )}
              >
                Mulai Belajar Sekarang
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#levels"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 px-7 text-base font-semibold rounded-xl border border-border bg-card hover:bg-muted shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                )}
              >
                Lihat Level CEFR
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-8">
              <Stat value="A1 – C2" label="Level CEFR" />
              <div className="hidden h-8 w-px bg-border sm:block" />
              <Stat value="4 Keterampilan" label="Hören, Lesen, Schreiben, Sprechen" />
              <div className="hidden h-8 w-px bg-border sm:block" />
              <Stat value="100% Gratis" label="Mulai belajar tanpa biaya" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Level Aktif Anda</p>
                  <p className="text-xl font-bold text-foreground">A1 - Pemula (Beginner)</p>
                </div>
                <div className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground shadow-sm">
                  Sedang Dipelajari
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">Progres Keseluruhan</span>
                  <span className="font-bold text-primary">35%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: "35%" }} />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { skill: "Hören", desc: "Mendengar", icon: Headphones, pct: 40 },
                  { skill: "Lesen", desc: "Membaca", icon: BookOpen, pct: 55 },
                  { skill: "Schreiben", desc: "Menulis", icon: PencilLine, pct: 25 },
                  { skill: "Sprechen", desc: "Berbicara", icon: Mic, pct: 20 },
                ].map(({ skill, desc, icon: Icon, pct }) => (
                  <div key={skill} className="rounded-2xl border border-border bg-background p-4">
                    <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground font-bold">
                      <Icon className="size-4" />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">{desc}</p>
                    <p className="font-bold text-foreground">{skill}</p>
                    <div className="mt-3">
                      <div className="mb-1 flex justify-between text-[10px] font-semibold text-muted-foreground">
                        <span>Latihan</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-secondary"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

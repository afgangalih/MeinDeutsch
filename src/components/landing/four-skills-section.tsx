"use client";

import { useState } from "react";
import { Headphones, BookOpen, PencilLine, Mic, Play, CheckCircle2, RotateCcw, Volume2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const skills = [
  {
    id: "horen",
    name: "Hören",
    label: "Listening",
    icon: Headphones,
    tagline: "Latih Pendengaran Alami",
    description:
      "Dengarkan percakapan bahasa Jerman sehari-hari dari penutur asli dengan kecepatan yang bisa diatur, transkrip interaktif, dan kuis pemahaman instan.",
  },
  {
    id: "lesen",
    name: "Lesen",
    label: "Reading",
    icon: BookOpen,
    tagline: "Kosakata dalam Konteks",
    description:
      "Baca artikel, dialog, dan cerita pendek Jerman. Arahkan kursor ke kata asing untuk memunculkan terjemahan instan dan menambahkannya ke Vocabulary Bank Anda.",
  },
  {
    id: "schreiben",
    name: "Schreiben",
    label: "Writing",
    icon: PencilLine,
    tagline: "Feedback Menulis Cerdas",
    description:
      "Tulis esai atau tanggapan pendek berdasarkan petunjuk terstruktur. Evaluasi otomatis dengan checklist tata bahasa membantu memperbaiki struktur kalimat Anda.",
  },
  {
    id: "sprechen",
    name: "Sprechen",
    label: "Speaking",
    icon: Mic,
    tagline: "Latihan Pelafalan Aktif",
    description:
      "Latih pelafalan kosakata dan frasa penting dengan merekam suara Anda langsung di browser. Bandingkan rekaman Anda dengan audio model untuk perbaikan mandiri.",
  },
];

export function FourSkillsSection() {
  const [activeSkill, setActiveSkill] = useState("horen");

  return (
    <section id="features" className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-y-0 left-[8%] w-px bg-border/20 pointer-events-none hidden xl:block" />
      <div className="absolute inset-y-0 right-[8%] w-px bg-border/20 pointer-events-none hidden xl:block" />
      
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-24 flex-1 flex flex-col justify-center relative z-10">
        <div className="mb-14 text-center lg:text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Metode Belajar Terpadu
          </p>
          <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Kuasai Bahasa Jerman Secara Utuh.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Jangan hanya menghafal kata. Latih empat keterampilan utama bahasa Jerman dalam satu ekosistem interaktif yang terintegrasi.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="space-y-4 lg:col-span-5">
            {skills.map((skill) => {
              const Icon = skill.icon;
              const isActive = activeSkill === skill.id;

              return (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkill(skill.id)}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 focus:outline-none focus:ring-1 focus:ring-primary/20",
                    isActive
                      ? "border-primary/30 bg-card shadow-xs translate-x-1"
                      : "border-border/40 bg-card/40 hover:bg-card/80"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors",
                      isActive
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "bg-muted border-border/40 text-muted-foreground"
                    )}
                  >
                    <Icon className="size-4.5" />
                  </span>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        ({skill.label})
                      </span>
                    </div>
                    <p className="text-xs font-bold text-primary/80">
                      {skill.tagline}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <Card className="rounded-3xl border border-border/40 bg-card shadow-xs overflow-hidden h-[420px] flex flex-col justify-between">
              <div className="border-b border-border/40 px-6 py-4 bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-destructive/80" />
                  <span className="size-3 rounded-full bg-secondary" />
                  <span className="size-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-bold text-muted-foreground">
                  Simulator Platform: {skills.find((s) => s.id === activeSkill)?.name}
                </span>
              </div>

              <CardContent className="p-8 flex-1 flex flex-col justify-center bg-card/60">
                {activeSkill === "horen" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border/30">
                      <button className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm hover:scale-105 transition-transform">
                        <Play className="size-4 fill-white" />
                      </button>
                      <div className="flex-1 space-y-1.5">
                        <p className="text-xs font-bold text-foreground">Lektion 1: Begrüßung</p>
                        <div className="flex items-center gap-1">
                          <span className="h-4 w-1 rounded-full bg-primary/80 animate-pulse" />
                          <span className="h-6 w-1 rounded-full bg-primary/70 animate-pulse" />
                          <span className="h-5 w-1 rounded-full bg-primary/90 animate-pulse" />
                          <span className="h-7 w-1 rounded-full bg-primary/60 animate-pulse" />
                          <span className="h-4 w-1 rounded-full bg-primary/80 animate-pulse" />
                          <span className="h-5 w-1 rounded-full bg-primary/50 animate-pulse" />
                          <span className="h-3 w-1 rounded-full bg-primary/40 animate-pulse" />
                        </div>
                      </div>
                      <Volume2 className="size-4 text-muted-foreground" />
                    </div>

                    <div className="p-4 rounded-2xl border border-border/30 bg-background space-y-2">
                      <p className="text-xs font-medium text-muted-foreground italic">Transkrip:</p>
                      <p className="text-sm font-bold text-foreground leading-relaxed">
                        &quot;Hallo, Guten Morgen! Ich heiße Sarah. Und du?&quot;
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-bold text-foreground">Pertanyaan: Siapa nama pembicara?</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-xl border border-primary bg-primary/5 text-xs font-bold text-primary text-center">
                          Sarah
                        </div>
                        <div className="p-2.5 rounded-xl border border-border/40 text-xs font-semibold text-muted-foreground text-center hover:bg-muted/40 transition-colors">
                          Alex
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSkill === "lesen" && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl border border-border/30 bg-background space-y-4">
                      <p className="text-sm leading-relaxed text-foreground">
                        Hallo! Ich heiße Sarah. Ich wohne in{" "}
                        <span className="relative group/tooltip inline-block cursor-help border-b border-dashed border-primary font-bold text-primary px-0.5">
                          Berlin
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-foreground text-background text-[10px] rounded-xl shadow-lg opacity-100 transition-opacity z-20 pointer-events-none font-medium">
                            <span className="block font-bold text-secondary mb-0.5">Berlin</span>
                            Ibukota Jerman, kota terbesar di negara ini.
                          </span>
                        </span>
                        . Ich bin Lehrerin von Beruf.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-bold text-foreground">Pertanyaan: Wo wohnt Sarah? (Di mana Sarah tinggal?)</p>
                      <div className="flex flex-col gap-2">
                        <div className="p-2.5 rounded-xl border border-primary bg-primary/5 text-xs font-bold text-primary flex items-center justify-between">
                          <span>Berlin</span>
                          <CheckCircle2 className="size-4 text-primary" />
                        </div>
                        <div className="p-2.5 rounded-xl border border-border/40 text-xs font-semibold text-muted-foreground hover:bg-muted/40 transition-colors">
                          München
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSkill === "schreiben" && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-foreground">Petunjuk: Tulis perkenalan diri singkat (min. 5 kata).</p>
                      <div className="relative rounded-2xl border border-border/30 bg-background p-4 h-24">
                        <p className="text-sm text-foreground font-mono">
                          Ich heiße Alex. Ich wohne in Jakarta...
                        </p>
                        <span className="absolute bottom-2.5 right-3 text-[10px] text-muted-foreground font-bold">
                          7 kata
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-bold text-foreground">Checklist Evaluasi Mandiri:</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-foreground font-semibold">
                          <CheckCircle2 className="size-4 text-green-500 fill-green-500/10 shrink-0" />
                          <span>Minimal 5 kata berhasil terpenuhi.</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground font-semibold">
                          <CheckCircle2 className="size-4 text-green-500 fill-green-500/10 shrink-0" />
                          <span>Penggunaan huruf kapital pada kata benda (Nomen) tepat.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSkill === "sprechen" && (
                  <div className="space-y-6 text-center">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Ucapkan kalimat berikut:</p>
                      <p className="text-lg font-bold text-foreground">&quot;Guten Tag, freut mich.&quot;</p>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 border border-primary/20 text-primary animate-pulse">
                        <Mic className="size-7" />
                      </div>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Merekam Suara...</p>
                    </div>

                    <div className="flex justify-center gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/40 bg-background text-xs font-bold text-foreground hover:bg-muted/40 transition-colors">
                        <RotateCcw className="size-3.5" />
                        Ulangi
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

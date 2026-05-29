"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Lock, Sparkles, BookOpen } from "lucide-react";

import { courseModules } from "@/lib/learning-data";
import { cn } from "@/lib/utils";

const levels = [
  {
    code: "A1",
    title: "Anfänger (A1)",
    desc: "Dasar perkenalan diri, frasa sederhana, dan pemahaman tata bahasa paling mendasar.",
    unlocked: true,
    modulesCount: 3,
  },
  {
    code: "A2",
    title: "Grundlegende (A2)",
    desc: "Ekspresi sehari-hari, informasi keluarga, belanja, geografi lokal, dan pekerjaan sederhana.",
    unlocked: false,
    modulesCount: 4,
  },
  {
    code: "B1",
    title: "Fortgeschrittene (B1)",
    desc: "Pemahaman poin penting dalam pekerjaan, sekolah, perjalanan, dan mengekspresikan opini pribadi.",
    unlocked: false,
    modulesCount: 5,
  },
];

const lockedModulesPreview: Record<string, Array<{ title: string; theme: string; desc: string; duration: string }>> = {
  A2: [
    { title: "Freizeit und Hobbys", theme: "Sosial", desc: "Menceritakan kegiatan waktu luang, hobi, dan membuat janji bertemu.", duration: "25 menit" },
    { title: "Einkaufen & Kleidung", theme: "Belanja", desc: "Interaksi transaksi di toko, menyebutkan ukuran, warna, dan pakaian.", duration: "20 menit" },
  ],
  B1: [
    { title: "Arbeitswelt & Beruf", theme: "Pekerjaan", desc: "Kosa kata dunia kerja, mengirim lamaran, dan percakapan profesional dasar.", duration: "30 menit" },
    { title: "Medien und Technologie", theme: "Teknologi", desc: "Membicarakan penggunaan gawai, media sosial, dan tren teknologi masa kini.", duration: "35 menit" },
  ],
};

export default function CoursesPage() {
  const [activeLevel, setActiveLevel] = useState("A1");

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Struktur Level CEFR
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          Materi Pembelajaran
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Pilih level sertifikasi untuk mengakses kurikulum modul bahasa Jerman yang terstruktur secara berurutan.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        {levels.map((level) => {
          const isActive = activeLevel === level.code;
          return (
            <button
              key={level.code}
              type="button"
              onClick={() => level.unlocked && setActiveLevel(level.code)}
              className={cn(
                "relative text-left p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between min-h-52 shadow-xs group",
                !level.unlocked && "cursor-not-allowed bg-muted/10 border-border/40 opacity-70",
                level.unlocked && !isActive && "bg-card hover:bg-muted/30 border-border/40 hover:-translate-y-0.5 hover:shadow-md",
                isActive && "bg-card border-[#DD0000] ring-1 ring-[#DD0000] shadow-md"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className={cn(
                      "text-xs font-extrabold px-3 py-1 rounded-full",
                      isActive
                        ? "bg-[#DD0000]/10 text-[#DD0000]"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {level.code} Level
                  </span>
                  {!level.unlocked && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/60">
                      <Lock className="size-3.5" />
                      Locked
                    </span>
                  )}
                  {level.unlocked && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-primary">
                      <Sparkles className="size-3.5 text-[#FFCC00]" />
                      Active
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-extrabold text-foreground">{level.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{level.desc}</p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-bold text-muted-foreground">
                <span>{level.modulesCount} Modul Utama</span>
                {level.unlocked && (
                  <span className="text-[#DD0000] group-hover:translate-x-1 transition-transform">
                    Buka &rarr;
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <BookOpen className="size-5 text-[#DD0000]" />
          <h2 className="text-xl font-extrabold text-foreground">
            Daftar Modul - Level {activeLevel}
          </h2>
        </div>

        {activeLevel === "A1" && (
          <div className="grid gap-5">
            {courseModules.map((module) => (
              <Link
                key={module.slug}
                href={`/dashboard/courses/${module.slug}`}
                className="group rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold text-foreground">
                        {module.theme}
                      </span>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                        {module.status}
                      </span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-foreground">{module.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {module.description}
                    </p>
                  </div>

                  <div className="w-full shrink-0 md:w-56">
                    <div className="mb-2 flex items-center justify-between text-xs font-bold text-muted-foreground">
                      <span>{module.progress}% selesai</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {module.duration}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-[#DD0000]"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                      Buka lesson
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeLevel !== "A1" && (
          <div className="grid gap-5">
            {lockedModulesPreview[activeLevel]?.map((module, index) => (
              <div
                key={index}
                className="relative rounded-3xl border border-border/30 bg-muted/10 p-6 opacity-60 flex flex-col justify-between gap-5 md:flex-row md:items-center select-none"
              >
                <div className="max-w-2xl">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                      {module.theme}
                    </span>
                    <span className="rounded-full bg-muted/50 px-3 py-1 text-xs font-bold text-muted-foreground/60 inline-flex items-center gap-1">
                      <Lock className="size-3" />
                      Locked
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-muted-foreground">{module.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground/60">
                    {module.desc}
                  </p>
                </div>

                <div className="w-full shrink-0 md:w-56 text-right text-xs font-bold text-muted-foreground/60 flex items-center justify-end gap-1.5">
                  <Clock className="size-3.5" />
                  {module.duration}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

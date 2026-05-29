"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Lock, Sparkles } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const levels = [
  { code: "A1", title: "Anfänger (A1)", desc: "Materi tata bahasa dasar untuk pemula.", unlocked: true },
  { code: "A2", title: "Grundlegende (A2)", desc: "Struktur kalimat lebih kompleks sehari-hari.", unlocked: false },
  { code: "B1", title: "Fortgeschrittene (B1)", desc: "Konjungsi subordinatif, pasif, dan pengandaian.", unlocked: false },
];

export default function GrammarPage() {
  const [activeLevel, setActiveLevel] = useState("A1");
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGrammar() {
      setLoading(true);
      const { data } = await supabase
        .from("learning_grammar")
        .select("slug, title, category, summary, level_code")
        .eq("level_code", activeLevel)
        .order("order_index", { ascending: true });

      if (data) {
        setTopics(data);
      }
      setLoading(false);
    }
    fetchGrammar();
  }, [activeLevel]);

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Tata Bahasa Jerman
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          Grammar Bank
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Pelajari aturan struktur kalimat, konjugasi verba, preposisi, dan sistem kasus bahasa Jerman secara bertahap.
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
                "relative text-left p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between min-h-40 shadow-xs group",
                !level.unlocked && "cursor-not-allowed bg-muted/10 border-border/40 opacity-70",
                level.unlocked && !isActive && "bg-card hover:bg-muted/30 border-border/40 hover:-translate-y-0.5 hover:shadow-md",
                isActive && "bg-card border-[#DD0000] ring-1 ring-[#DD0000] shadow-md"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span
                    className={cn(
                      "text-xs font-extrabold px-3 py-1 rounded-full",
                      isActive ? "bg-[#DD0000]/10 text-[#DD0000]" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {level.code} Grammar
                  </span>
                  {!level.unlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/60">
                      <Lock className="size-3.5" />
                      Locked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-primary">
                      <Sparkles className="size-3.5 text-[#FFCC00]" />
                      Active
                    </span>
                  )}
                </div>
                <h3 className="text-base font-extrabold text-foreground">{level.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{level.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="size-5 text-[#DD0000]" />
          <h2 className="text-xl font-extrabold text-foreground">
            Topik Grammar - Level {activeLevel}
          </h2>
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 animate-pulse">
            <div className="h-40 bg-muted rounded-3xl" />
            <div className="h-40 bg-muted rounded-3xl" />
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/dashboard/grammar/${topic.slug}`}
                className="group rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md flex flex-col justify-between min-h-48"
              >
                <div>
                  <span className="rounded-full bg-secondary/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-foreground">
                    {topic.category}
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold text-foreground group-hover:text-[#DD0000] transition-colors">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {topic.summary}
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#DD0000]">
                  Buka Teori Lengkap
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}

            {topics.length === 0 && (
              <div className="col-span-2 rounded-3xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground select-none">
                Belum ada materi tata bahasa tersedia untuk tingkat ini.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, FileText, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type GrammarViewerProps = {
  slug: string;
};

function parseMarkdown(text: string) {
  if (!text) return null;
  return text.split("\n").map((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={index} className="text-lg font-extrabold text-foreground mt-8 mb-4">
          {trimmed.slice(4)}
        </h3>
      );
    }

    if (trimmed.startsWith("* ")) {
      const rest = trimmed.slice(2);

      if (rest.startsWith("**") && rest.includes("** : ")) {
        const parts = rest.split("** : ");
        const boldPart = parts[0].replace(/\*\*/g, "");
        const normalPart = parts[1] || "";
        return (
          <div key={index} className="flex gap-3 items-start pl-4 py-2 text-sm sm:text-base font-semibold text-muted-foreground">
            <span className="text-[#DD0000] font-bold shrink-0">•</span>
            <span>
              <strong className="text-foreground font-bold">{boldPart}</strong> : {normalPart}
            </span>
          </div>
        );
      }

      if (rest.startsWith("**") && rest.endsWith("**")) {
        return (
          <div key={index} className="flex gap-3 items-start pl-4 py-2 text-sm sm:text-base font-semibold text-muted-foreground">
            <span className="text-[#DD0000] font-bold shrink-0">•</span>
            <strong className="text-foreground font-bold">{rest.replace(/\*\*/g, "")}</strong>
          </div>
        );
      }

      return (
        <div key={index} className="flex gap-3 items-start pl-4 py-2 text-sm sm:text-base font-semibold text-muted-foreground">
          <span className="text-[#DD0000] font-bold shrink-0">•</span>
          <span>{rest}</span>
        </div>
      );
    }

    if (trimmed.includes("**")) {
      const parts = trimmed.split("**");
      return (
        <p key={index} className="mt-3 text-sm sm:text-base font-medium text-muted-foreground leading-relaxed">
          {parts.map((part, pIdx) =>
            pIdx % 2 === 1 ? (
              <strong key={pIdx} className="text-foreground font-extrabold">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }

    if (trimmed === "") {
      return <div key={index} className="h-3" />;
    }

    return (
      <p key={index} className="mt-3 text-sm sm:text-base font-medium text-muted-foreground leading-relaxed">
        {trimmed}
      </p>
    );
  });
}

export function GrammarViewer({ slug }: GrammarViewerProps) {
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  useEffect(() => {
    async function loadGrammarDetail() {
      setLoading(true);
      const { data } = await supabase
        .from("learning_grammar")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (data) {
        setTopic(data);
      }
      setLoading(false);
    }
    loadGrammarDetail();
  }, [slug]);

  function playText(text: string) {
    if (playingAudio === text) {
      setPlayingAudio(null);
      return;
    }
    setPlayingAudio(text);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.onend = () => setPlayingAudio(null);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-4 w-32 bg-muted rounded-full" />
        <div className="h-32 bg-muted rounded-3xl" />
        <div className="h-96 bg-muted rounded-3xl" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="rounded-3xl border border-border p-8 text-center space-y-4">
        <h2 className="text-xl font-bold">Tata bahasa tidak ditemukan</h2>
        <Link href="/dashboard/grammar" className="text-primary font-bold hover:underline">
          Kembali ke Grammar Bank
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Link
          href="/dashboard/grammar"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="size-3.5" />
          Kembali ke Grammar Bank
        </Link>
      </div>

      <header className="rounded-3xl border border-border/40 bg-card/95 p-6 md:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="h-full flex-1 bg-foreground" />
          <div className="h-full flex-1 bg-[#DD0000]" />
          <div className="h-full flex-1 bg-[#FFCC00]" />
        </div>
        <span className="rounded-full bg-secondary/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-foreground">
          {topic.category}
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {topic.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {topic.summary}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="rounded-3xl border border-border/40 bg-card/95 p-6 md:p-8 shadow-xs">
            <CardContent className="p-0 space-y-6">
              <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                <BookOpen className="size-5 text-[#DD0000]" />
                <h2 className="text-xl font-extrabold text-foreground">Penjelasan Teori</h2>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-7 text-muted-foreground">
                {parseMarkdown(topic.explanation)}
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
            <div className="mb-4 flex items-center gap-2 border-b border-border/40 pb-3">
              <FileText className="size-5 text-[#DD0000]" />
              <h3 className="text-sm font-extrabold text-foreground">Beispiele (Contoh)</h3>
            </div>
            <CardContent className="p-0 space-y-3">
              {topic.examples?.map((example: string, index: number) => {
                const parts = example.split(" (");
                const german = parts[0];
                const translation = parts[1] ? parts[1].replace(")", "") : "";

                return (
                  <div
                    key={index}
                    className="group rounded-2xl border border-border/30 bg-muted/20 p-3.5 flex flex-col justify-between gap-2.5"
                  >
                    <div className="flex items-start justify-between gap-2.5">
                      <span className="text-sm font-extrabold text-foreground leading-relaxed">
                        {german}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => playText(german)}
                        className={cn(
                          "size-8 rounded-full shrink-0 transition-colors",
                          playingAudio === german
                            ? "bg-[#DD0000]/10 text-[#DD0000]"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                        aria-label="Putar audio"
                      >
                        <Volume2 className="size-4" />
                      </Button>
                    </div>
                    {translation && (
                      <span className="text-xs text-muted-foreground/80 font-medium">
                        {translation}
                      </span>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Bookmark, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { vocabularyBank } from "@/lib/learning-data";
import { cn } from "@/lib/utils";

const themes = ["Semua", ...Array.from(new Set(vocabularyBank.map((word) => word.theme)))];

export function VocabularyBank() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("Semua");
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      vocabularyBank.filter((word) => {
        const haystack = `${word.german} ${word.indonesian} ${word.module}`.toLowerCase();
        return (
          haystack.includes(query.toLowerCase()) &&
          (theme === "Semua" || word.theme === theme)
        );
      }),
    [query, theme]
  );

  function toggleSaved(key: string) {
    setSaved((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-3xl border border-border/40 bg-card/95 p-4 shadow-xs sm:flex-row">
        <label className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 w-full rounded-2xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            placeholder="Cari kata, arti, atau modul..."
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {themes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTheme(item)}
              className={cn(
                "h-11 rounded-2xl border border-border px-4 text-sm font-bold transition-colors hover:bg-muted",
                theme === item && "border-primary bg-primary text-primary-foreground"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((word) => {
          const key = `${word.german}-${word.module}`;
          const active = saved.includes(key);

          return (
            <div
              key={key}
              className="rounded-3xl border border-border/40 bg-card/95 p-5 shadow-xs"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-foreground">{word.german}</h3>
                  <p className="text-sm text-muted-foreground">{word.indonesian}</p>
                </div>
                <Button
                  type="button"
                  variant={active ? "default" : "outline"}
                  size="icon"
                  onClick={() => toggleSaved(key)}
                  aria-label={active ? "Hapus dari simpanan" : "Simpan kosakata"}
                >
                  <Bookmark className="size-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="flex items-center justify-between gap-3 text-xs font-bold text-muted-foreground">
                <span>{word.module}</span>
                <span className="rounded-full bg-secondary/20 px-2.5 py-1 text-foreground">
                  {word.theme}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

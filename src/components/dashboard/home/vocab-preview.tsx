import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { difficultVocabulary } from "@/lib/learning-data";

export function VocabPreview() {
  return (
    <Card className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Vocabulary Bank
          </p>
          <h3 className="text-xl font-extrabold text-foreground">Kosakata sulit</h3>
        </div>
        <Bookmark className="size-5 text-secondary" aria-hidden="true" />
      </div>

      <CardContent className="space-y-3 p-0">
        {difficultVocabulary.slice(0, 4).map((word) => (
          <div
            key={`${word.german}-${word.module}`}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-muted/30 px-4 py-3"
          >
            <div>
              <p className="text-sm font-extrabold text-foreground">{word.german}</p>
              <p className="text-xs text-muted-foreground">{word.indonesian}</p>
            </div>
            <span className="rounded-full bg-secondary/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
              {word.theme}
            </span>
          </div>
        ))}

        <Link
          href="/dashboard/vocabulary"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
        >
          Buka vocabulary bank
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}

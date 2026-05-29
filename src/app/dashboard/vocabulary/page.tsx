import { VocabularyBank } from "@/components/dashboard/vocabulary/vocabulary-bank";

export default function VocabularyPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Vocabulary Bank
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          Wortliste Digital
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Cari kosakata, filter berdasarkan tema, dan simpan kata penting ke bank personal demo.
        </p>
      </header>

      <VocabularyBank />
    </div>
  );
}

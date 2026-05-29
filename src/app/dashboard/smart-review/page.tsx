import { QuizCard } from "@/components/dashboard/smart-review/quiz-card";
import { reviewQuestions } from "@/lib/learning-data";

export default function SmartReviewPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Smart Review
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          Ulangi soal yang rawan salah
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Demo ini memakai daftar soal terkurasi. Saat tabel riwayat kuis tersedia, daftar ini bisa
          ditarik dari jawaban salah pengguna.
        </p>
      </header>

      <QuizCard questions={reviewQuestions} />
    </div>
  );
}

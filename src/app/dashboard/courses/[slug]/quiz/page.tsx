import { notFound } from "next/navigation";

import { QuizCard } from "@/components/dashboard/smart-review/quiz-card";
import { courseModules, getModule } from "@/lib/learning-data";

export function generateStaticParams() {
  return courseModules.map((module) => ({ slug: module.slug }));
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getModule(slug);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Quiz · {lesson.title}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          Uji pemahaman lesson
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Jawaban dinilai secara lokal. Pada integrasi Supabase berikutnya, hasil dapat dikirim ke
          riwayat progres pengguna.
        </p>
      </header>

      <QuizCard questions={lesson.quiz} lessonSlug={slug} />
    </div>
  );
}

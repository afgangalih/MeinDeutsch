"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { recordQuizAttempt } from "@/lib/learning-progress";
import type { QuizQuestion } from "@/lib/quiz";
import { isCorrectAnswer, scoreQuiz } from "@/lib/quiz";
import { cn } from "@/lib/utils";

type QuizCardProps = {
  questions: QuizQuestion[];
  lessonSlug?: string;
};

export function QuizCard({ questions, lessonSlug = "smart-review" }: QuizCardProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => scoreQuiz(questions, answers), [answers, questions]);

  function setAnswer(id: string, answer: string) {
    setAnswers((current) => ({ ...current, [id]: answer }));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  async function submit() {
    setSubmitted(true);
    await recordQuizAttempt({ lessonSlug, questions, answers, result });
  }

  return (
    <Card className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Quiz Engine
          </p>
          <h2 className="text-2xl font-extrabold text-foreground">Latihan interaktif</h2>
        </div>
        {submitted ? (
          <div className="rounded-2xl bg-secondary/20 px-4 py-2 text-sm font-extrabold text-foreground">
            Skor {result.correct}/{result.total} ({result.percentage}%)
          </div>
        ) : null}
      </div>

      <CardContent className="space-y-5 p-0">
        {questions.map((question, index) => {
          const answer = answers[question.id] ?? "";
          const correct = submitted && isCorrectAnswer(question, answer);
          const wrong = submitted && !correct;

          return (
            <div
              key={question.id}
              className="rounded-3xl border border-border/50 bg-background p-5"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Soal {index + 1} · {question.category}
                  </p>
                  <p className="mt-1 text-base font-extrabold text-foreground">{question.prompt}</p>
                </div>
                {correct ? (
                  <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
                ) : null}
                {wrong ? <XCircle className="size-5 text-destructive" aria-hidden="true" /> : null}
              </div>

              {question.type === "multiple-choice" ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswer(question.id, option)}
                      className={cn(
                        "rounded-2xl border border-border/50 bg-muted/30 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-muted",
                        answer === option && "border-primary/40 bg-primary/5 text-primary"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : null}

              {question.type === "fill-blank" ? (
                <input
                  value={answer}
                  onChange={(event) => setAnswer(question.id, event.target.value)}
                  className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="Tulis jawaban..."
                />
              ) : null}

              {question.type === "sentence-builder" || question.type === "drag-drop" ? (
                <div className="space-y-3">
                  <div className="flex min-h-11 flex-wrap gap-2 rounded-2xl border border-border bg-muted/30 p-2">
                    {(answer ? answer.split(" ") : []).map((part, partIndex) => (
                      <button
                        key={`${part}-${partIndex}`}
                        type="button"
                        onClick={() =>
                          setAnswer(
                            question.id,
                            answer
                              .split(" ")
                              .filter((_, itemIndex) => itemIndex !== partIndex)
                              .join(" ")
                          )
                        }
                        className="rounded-xl bg-foreground px-3 py-1.5 text-xs font-bold text-background"
                      >
                        {part}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {question.fragments.map((fragment) => (
                      <button
                        key={fragment}
                        type="button"
                        onClick={() =>
                          setAnswer(question.id, [answer, fragment].filter(Boolean).join(" "))
                        }
                        className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold transition-colors hover:bg-muted"
                      >
                        {fragment}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {submitted ? (
                <p
                  className={cn(
                    "mt-4 rounded-2xl px-4 py-3 text-sm",
                    correct
                      ? "bg-primary/10 text-foreground"
                      : "bg-destructive/10 text-destructive"
                  )}
                >
                  {question.explanation}
                </p>
              ) : null}
            </div>
          );
        })}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" className="h-11 flex-1" onClick={submit}>
            Periksa Jawaban
          </Button>
          <Button type="button" variant="outline" className="h-11" onClick={reset}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

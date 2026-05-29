import type { QuizQuestion, QuizResult } from "@/lib/quiz";
import { isCorrectAnswer } from "@/lib/quiz";
import { supabase } from "@/lib/supabase";

type RecordQuizAttemptInput = {
  lessonSlug: string;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  result: QuizResult;
};

export async function recordQuizAttempt({
  lessonSlug,
  questions,
  answers,
  result,
}: RecordQuizAttemptInput) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return;
  }

  const { data: attempt, error } = await supabase
    .from("quiz_attempts")
    .insert({
      user_id: userData.user.id,
      lesson_slug: lessonSlug,
      score: result.correct,
      total: result.total,
      percentage: result.percentage,
    })
    .select("id")
    .single();

  if (error || !attempt) {
    return;
  }

  await supabase.from("quiz_attempt_answers").insert(
    questions.map((question) => ({
      attempt_id: attempt.id,
      question_key: question.id,
      user_answer: answers[question.id] ?? "",
      is_correct: isCorrectAnswer(question, answers[question.id] ?? ""),
      category: question.category,
    }))
  );
}

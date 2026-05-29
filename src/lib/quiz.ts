export type QuizQuestion =
  | {
      id: string;
      type: "multiple-choice";
      prompt: string;
      options: string[];
      answer: string;
      explanation: string;
      category: string;
    }
  | {
      id: string;
      type: "fill-blank";
      prompt: string;
      answer: string;
      explanation: string;
      category: string;
    }
  | {
      id: string;
      type: "sentence-builder" | "drag-drop";
      prompt: string;
      fragments: string[];
      answer: string;
      explanation: string;
      category: string;
    };

export type QuizResult = {
  total: number;
  correct: number;
  percentage: number;
  wrongQuestionIds: string[];
};

export function normalizeAnswer(answer: string) {
  return answer.trim().replace(/\s+/g, " ").toLowerCase();
}

export function isCorrectAnswer(question: QuizQuestion, answer: string) {
  return normalizeAnswer(answer) === normalizeAnswer(question.answer);
}

export function scoreQuiz(
  questions: QuizQuestion[],
  answers: Record<string, string>
): QuizResult {
  const wrongQuestionIds: string[] = [];
  let correct = 0;

  for (const question of questions) {
    if (isCorrectAnswer(question, answers[question.id] ?? "")) {
      correct += 1;
    } else {
      wrongQuestionIds.push(question.id);
    }
  }

  return {
    total: questions.length,
    correct,
    percentage: questions.length ? Math.round((correct / questions.length) * 100) : 0,
    wrongQuestionIds,
  };
}

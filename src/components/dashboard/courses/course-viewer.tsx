"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Lock,
  Play,
  CheckCircle,
  HelpCircle as QuizIcon,
  Volume2,
  Bookmark,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

type CourseViewerProps = {
  slug: string;
};

export function CourseViewer({ slug }: CourseViewerProps) {
  const [activeTab, setActiveTab] = useState("materi");
  const [savedVocab, setSavedVocab] = useState<string[]>([]);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarLessons, setSidebarLessons] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: lessonsList } = await supabase
        .from("learning_lessons")
        .select("slug, title, theme, description")
        .order("order_index", { ascending: true });

      if (lessonsList) {
        setSidebarLessons(lessonsList);
      }

      const { data: activeLesson } = await supabase
        .from("learning_lessons")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!activeLesson) {
        setLoading(false);
        return;
      }

      const { data: vocab } = await supabase
        .from("learning_vocabulary")
        .select("german, indonesian, theme")
        .eq("lesson_id", activeLesson.id);

      const { data: quiz } = await supabase
        .from("quiz_questions")
        .select("question_key, type, prompt, options, fragments, answer, explanation, category")
        .eq("lesson_id", activeLesson.id);

      const { data: course } = await supabase
        .from("learning_courses")
        .select("duration")
        .eq("id", activeLesson.course_id)
        .maybeSingle();

      setLesson({
        ...activeLesson,
        duration: course?.duration || "15 menit",
        vocabulary: vocab || [],
        quiz: (quiz || []).map((q: any) => ({
          id: q.question_key,
          type: q.type,
          prompt: q.prompt,
          options: q.options || [],
          fragments: q.fragments || [],
          answer: q.answer,
          explanation: q.explanation,
          category: q.category,
        })),
      });

      setLoading(false);
    }

    loadData();
  }, [slug]);

  function toggleVocab(word: string) {
    setSavedVocab((curr) =>
      curr.includes(word) ? curr.filter((w) => w !== word) : [...curr, word]
    );
  }

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
        <div className="h-36 bg-muted rounded-3xl" />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="h-96 bg-muted rounded-3xl" />
          <div className="h-80 bg-muted rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="rounded-3xl border border-border/40 bg-card p-8 text-center space-y-4">
        <h2 className="text-xl font-bold">Materi tidak ditemukan</h2>
        <Link href="/dashboard/courses" className="text-primary font-bold hover:underline">
          Kembali ke daftar materi
        </Link>
      </div>
    );
  }

  const activeIndex = sidebarLessons.findIndex((m) => m.slug === slug);
  const prevLesson = activeIndex > 0 ? sidebarLessons[activeIndex - 1] : null;
  const nextLesson = activeIndex < sidebarLessons.length - 1 ? sidebarLessons[activeIndex + 1] : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <Link
          href="/dashboard/courses"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="size-3.5" />
          Kembali ke Daftar Materi
        </Link>
      </div>

      <header className="rounded-3xl border border-border/40 bg-card/95 p-6 md:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="h-full flex-1 bg-foreground" />
          <div className="h-full flex-1 bg-[#DD0000]" />
          <div className="h-full flex-1 bg-[#FFCC00]" />
        </div>
        <p className="text-xs font-extrabold uppercase tracking-wider text-[#DD0000]">
          Modul A1 · {lesson.theme}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {lesson.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {lesson.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground/80">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {lesson.duration} Belajar
          </span>
          <span className="h-3 w-px bg-border/60" />
          <span className="flex items-center gap-1">
            <BookOpen className="size-3.5" />
            Grammar & Kosa Kata
          </span>
        </div>
      </header>

      <div className="sticky top-16 z-30 flex items-center justify-between border-b border-border/40 bg-background/95 py-2 backdrop-blur-md">
        <div className="flex gap-2">
          {["materi", "kosakata", "latihan"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "h-9 px-4 text-xs font-bold rounded-full transition-colors border",
                activeTab === tab
                  ? "border-[#DD0000] bg-[#DD0000]/5 text-[#DD0000]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {activeTab === "materi" && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                    <BookOpen className="size-5 text-[#DD0000]" />
                    Grammar Note
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {lesson.grammar_note}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#FFCC00]/30 bg-[#FFCC00]/5 p-5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">
                    Achtung! (Perhatian)
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Pastikan Anda selalu memperhatikan perubahan akhiran kata kerja (*Verben*) saat berganti subjek. Konjugasi verba merupakan kunci utama dari penyusunan kalimat yang benar dalam bahasa Jerman.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
                <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2 mb-4">
                  <FileText className="size-5 text-[#DD0000]" />
                  Beispiele & Audio (Contoh Kalimat)
                </h3>
                <div className="grid gap-3">
                  {lesson.examples?.map((example: string, index: number) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-muted/20 px-5 py-4 transition-colors hover:border-border/80"
                    >
                      <span className="text-sm font-bold text-foreground">{example}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => playText(example)}
                        className={cn(
                          "size-8 rounded-full transition-colors",
                          playingAudio === example
                            ? "bg-[#DD0000]/10 text-[#DD0000]"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                        aria-label="Putar pelafalan"
                      >
                        <Volume2 className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs text-center space-y-4">
                <div className="aspect-video w-full rounded-2xl bg-muted/40 border border-border/40 flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <button className="flex size-14 items-center justify-center rounded-full bg-[#DD0000] text-white shadow-lg transition-transform group-hover:scale-105">
                      <Play className="size-6 fill-white ml-1" />
                    </button>
                  </div>
                  <span className="text-xs font-bold text-white/90 z-10 absolute bottom-4 left-4">
                    Video Ilustrasi Pembelajaran
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "kosakata" && (
            <div className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2 mb-2">
                <BookOpen className="size-5 text-[#DD0000]" />
                Wortschatz (Daftar Kata)
              </h2>
              <div className="grid gap-3">
                {lesson.vocabulary?.map((word: any) => {
                  const isSaved = savedVocab.includes(word.german);
                  return (
                    <div
                      key={word.german}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-muted/20 px-5 py-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-extrabold text-foreground">{word.german}</p>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => playText(word.german)}
                            className="size-6 text-muted-foreground hover:text-foreground"
                            aria-label="Dengarkan pelafalan"
                          >
                            <Volume2 className="size-3.5" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{word.indonesian}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {word.difficult && (
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#DD0000]">
                            sulit
                          </span>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleVocab(word.german)}
                          className={cn(
                            "size-8 rounded-full",
                            isSaved ? "text-[#FFCC00]" : "text-muted-foreground"
                          )}
                          aria-label="Simpan kata"
                        >
                          <Bookmark className="size-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "latihan" && (
            <div className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs text-center space-y-4">
              <QuizIcon className="mx-auto size-12 text-[#DD0000]/40" />
              <h2 className="text-2xl font-extrabold text-foreground">Kuis Evaluasi Pelajaran</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Uji pemahaman tatabahasa dan kosa kata baru Anda langsung untuk mendapatkan progres kelulusan materi ini.
              </p>
              <Button
                nativeButton={false}
                className="mt-2 h-11 px-8 rounded-full bg-[#DD0000] hover:bg-[#C00000] text-white font-bold"
                render={<Link href={`/dashboard/courses/${slug}/quiz`} />}
              >
                Mulai Ujian Kuis
                <ArrowRight className="size-4" />
              </Button>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            {prevLesson ? (
              <Button
                nativeButton={false}
                variant="outline"
                className="h-10 rounded-full text-xs font-bold flex items-center gap-2"
                render={<Link href={`/dashboard/courses/${prevLesson.slug}`} />}
              >
                <ArrowLeft className="size-4" />
                <span>Sebelumnya: {prevLesson.title}</span>
              </Button>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Button
                nativeButton={false}
                className="h-10 rounded-full text-xs font-bold flex items-center gap-2 bg-[#DD0000] hover:bg-[#C00000] text-white"
                render={<Link href={`/dashboard/courses/${nextLesson.slug}`} />}
              >
                <span>Selanjutnya: {nextLesson.title}</span>
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <Card className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Silabus Modul
              </p>
              <h3 className="text-base font-extrabold text-foreground">Daftar Pelajaran</h3>
            </div>

            <div className="space-y-3">
              {sidebarLessons.map((module, index) => {
                const isActive = module.slug === slug;
                const isCompleted = index < activeIndex;

                return (
                  <div
                    key={module.slug}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-2xl border text-left transition-colors",
                      isActive
                        ? "border-[#DD0000] bg-[#DD0000]/5"
                        : "border-border/30 bg-muted/10"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle className="size-4.5 text-primary mt-0.5 shrink-0" />
                    ) : isActive ? (
                      <div className="size-4.5 rounded-full border-2 border-[#DD0000] flex items-center justify-center mt-0.5 shrink-0">
                        <div className="size-2 rounded-full bg-[#DD0000]" />
                      </div>
                    ) : (
                      <Lock className="size-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <Link
                        href={`/dashboard/courses/${module.slug}`}
                        className={cn(
                          "text-xs font-bold truncate block hover:underline",
                          isActive ? "text-[#DD0000]" : "text-foreground/80"
                        )}
                      >
                        {module.title}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Unduhan Materi
              </p>
              <h3 className="text-base font-extrabold text-foreground">Ringkasan PDF</h3>
            </div>
            <Button
              variant="outline"
              className="h-10 w-full rounded-xl text-xs font-bold gap-2"
            >
              <Download className="size-4" />
              Download Ringkasan A1
            </Button>
          </Card>
        </aside>
      </div>
    </div>
  );
}

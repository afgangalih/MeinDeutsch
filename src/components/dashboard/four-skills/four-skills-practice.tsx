"use client";

import { useState } from "react";
import { Headphones, Mic, PenLine, Square, BookOpenText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function FourSkillsPractice() {
  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState("");

  async function toggleRecording() {
    if (recording && recorder) {
      recorder.stop();
      setRecording(false);
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const nextRecorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    nextRecorder.ondataavailable = (event) => chunks.push(event.data);
    nextRecorder.onstop = () => {
      setAudioUrl(URL.createObjectURL(new Blob(chunks, { type: "audio/webm" })));
      stream.getTracks().forEach((track) => track.stop());
    };

    nextRecorder.start();
    setRecorder(nextRecorder);
    setRecording(true);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
        <Headphones className="mb-4 size-6 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-extrabold">Hören</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Dengarkan dialog pendek lalu jawab inti percakapannya.
        </p>
        <audio className="mt-5 w-full" controls src="" />
        <div className="mt-4 rounded-2xl bg-muted/50 p-4 text-sm font-semibold">
          Pertanyaan: Apa sapaan yang digunakan pembicara?
        </div>
      </section>

      <section className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
        <BookOpenText className="mb-4 size-6 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-extrabold">Lesen</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Hallo, ich bin Raka. Ich wohne in Jakarta und lerne Deutsch am Abend.
        </p>
        <div className="mt-4 grid gap-2 text-sm">
          <button className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-left font-semibold hover:bg-muted">
            Richtig: Raka wohnt in Jakarta.
          </button>
          <button className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-left font-semibold hover:bg-muted">
            Falsch: Raka lernt Deutsch am Morgen.
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
        <PenLine className="mb-4 size-6 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-extrabold">Schreiben</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Tulis 3 kalimat singkat untuk memperkenalkan diri.
        </p>
        <Textarea className="mt-5 min-h-36 rounded-2xl" placeholder="Ich heiße..." />
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full bg-secondary/20 px-3 py-1">Nama</span>
          <span className="rounded-full bg-secondary/20 px-3 py-1">Asal</span>
          <span className="rounded-full bg-secondary/20 px-3 py-1">Tempat tinggal</span>
        </div>
      </section>

      <section className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs">
        <Mic className="mb-4 size-6 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-extrabold">Sprechen</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Rekam perkenalan 20-30 detik, lalu dengarkan kembali artikulasinya.
        </p>
        <Button type="button" className="mt-5 h-11" onClick={toggleRecording}>
          {recording ? <Square className="size-4" /> : <Mic className="size-4" />}
          {recording ? "Stop Recording" : "Mulai Recording"}
        </Button>
        {audioUrl ? <audio className="mt-4 w-full" controls src={audioUrl} /> : null}
      </section>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    title: "Daftar & Pilih Level",
    desc: "Buat akun gratis dan mulai dari level A1. Tidak perlu tes awal — langsung masuk ke materi.",
  },
  {
    num: "02",
    title: "Pelajari Materi & Kerjakan Latihan",
    desc: "Setiap lesson memiliki penjelasan singkat, contoh, dan latihan langsung di akhir materi.",
  },
  {
    num: "03",
    title: "Pantau Progres & Perkuat Kelemahan",
    desc: "Dashboard menampilkan progres real-time. Weakness Tracker memandu kamu latihan di area yang perlu diperkuat.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative min-h-[75vh] lg:min-h-[85vh] flex flex-col justify-center overflow-hidden border-b border-border bg-muted/30 bg-grid-pattern">
      <div className="absolute inset-y-0 left-[8%] w-px bg-border/20 pointer-events-none hidden xl:block" />
      <div className="absolute inset-y-0 right-[8%] w-px bg-border/20 pointer-events-none hidden xl:block" />
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-24 flex-1 flex flex-col justify-center relative z-10">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Cara Kerja
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Tiga langkah untuk mulai.
          </h2>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-5 hidden h-px border-t border-dashed border-border/40 md:block"
            style={{ left: "calc(16.6% + 20px)", right: "calc(16.6% + 20px)" }}
          />

          {steps.map((step) => (
            <div key={step.num} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 mb-6 flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold shadow-sm">
                <span className="text-sm font-bold">{step.num}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/register"
            className={buttonVariants({ size: "lg" }) + " h-12 gap-2 px-8 text-base"}
          >
            Mulai Gratis Sekarang
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

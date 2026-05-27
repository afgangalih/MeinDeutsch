import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, BookOpen, Mic, PencilLine, Headphones } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden border-b border-border">
      <img
        src="/german-flag-waving.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center select-none pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl space-y-8">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 backdrop-blur-md px-4 py-1.5 w-fit text-xs font-semibold text-white/95 shadow-lg">
            <div className="flex gap-0.5 shrink-0">
              <span className="w-1.5 h-3 bg-black rounded-xs"></span>
              <span className="w-1.5 h-3 bg-[#DD0000] rounded-xs"></span>
              <span className="w-1.5 h-3 bg-[#FFCC00] rounded-xs"></span>
            </div>
            <span className="flex items-center gap-1">
              <Sparkles className="size-3.5 text-[#FFCC00]" />
              Platform Bahasa Jerman CEFR A1–C2
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-md">
            Kuasai Bahasa Jerman{" "}
            <span className="text-[#FFCC00]">
              Dari Nol
            </span>
            {" "}Hingga Fasih.
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-white/90 max-w-lg drop-shadow-xs">
            Belajar Deutsch dengan pendekatan terstruktur, interaktif, dan menyenangkan. Kurikulum CEFR resmi, latihan empat keterampilan, dan dashboard progres personal — semuanya gratis.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/register"
              className="h-12 gap-2.5 px-8 text-sm font-extrabold rounded-full bg-[#DD0000] hover:bg-[#C00000] text-white shadow-lg shadow-red-950/20 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
            >
              Mulai Belajar Gratis
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#features"
              className="h-12 px-8 text-sm font-bold rounded-full inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-black shadow-md transition-all duration-300 hover:scale-105"
            >
              Lihat Metode Belajar
              <ArrowRight className="size-4 text-black/80" />
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-4">
              Empat Keterampilan Terintegrasi
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Headphones, label: "Hören", sub: "Listening" },
                { icon: BookOpen, label: "Lesen", sub: "Reading" },
                { icon: PencilLine, label: "Schreiben", sub: "Writing" },
                { icon: Mic, label: "Sprechen", sub: "Speaking" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-black/40 hover:bg-black/50 backdrop-blur-md px-3.5 py-2 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon className="size-3.5 text-[#FFCC00] shrink-0" />
                  <span className="text-xs font-bold text-white/95">{label}</span>
                  <span className="text-[10px] text-white/50">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Kurikulum & Standar</span>
            <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md px-5 py-3 w-fit shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-white/90">
                <ShieldCheck className="size-4 text-[#FFCC00]" />
                <span>CEFR Standard</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2 text-xs font-bold text-white/90">
                <div className="flex gap-0.5 shrink-0">
                  <span className="w-1 h-3 bg-black"></span>
                  <span className="w-1 h-3 bg-[#DD0000]"></span>
                  <span className="w-1 h-3 bg-[#FFCC00]"></span>
                </div>
                <span>Goethe-Institut Aligned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

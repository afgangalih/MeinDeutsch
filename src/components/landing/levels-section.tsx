import { CheckCircle2, Lock } from "lucide-react";

const levels = [
  {
    id: "a1",
    code: "A1",
    name: "Beginner",
    description: "Memahami salam, perkenalan diri, angka, dan kosakata sehari-hari paling dasar.",
    modules: 6,
    active: true,
  },
  {
    id: "a2",
    code: "A2",
    name: "Elementary",
    description: "Berkomunikasi dalam situasi sederhana: berbelanja, bertanya arah, keluarga.",
    modules: null,
    active: false,
  },
  {
    id: "b1",
    code: "B1",
    name: "Intermediate",
    description: "Memahami topik sehari-hari: pekerjaan, perjalanan, berita sederhana.",
    modules: null,
    active: false,
  },
  {
    id: "b2",
    code: "B2",
    name: "Upper Intermediate",
    description: "Mengekspresikan pendapat, memahami teks kompleks dan percakapan panjang.",
    modules: null,
    active: false,
  },
  {
    id: "c1",
    code: "C1",
    name: "Advanced",
    description: "Menguasai nuansa bahasa, idiom, dan teks akademis atau profesional.",
    modules: null,
    active: false,
  },
  {
    id: "c2",
    code: "C2",
    name: "Proficient",
    description: "Memahami hampir segalanya, berekspresi spontan dan fasih seperti penutur asli.",
    modules: null,
    active: false,
  },
];

export function LevelsSection() {
  return (
    <section id="levels" className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden border-b border-border bg-muted/30 bg-grid-pattern">
      <div className="absolute inset-y-0 left-[8%] w-px bg-border/20 pointer-events-none hidden xl:block" />
      <div className="absolute inset-y-0 right-[8%] w-px bg-border/20 pointer-events-none hidden xl:block" />
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-24 flex-1 flex flex-col justify-center relative z-10">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Kurikulum CEFR
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Enam level, satu jalur yang jelas.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Setiap level dirancang mengikuti standar CEFR internasional. Mulai dari A1, berkembang
            sampai C2 dengan struktur yang terukur.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => (
            <div
              key={level.id}
              className={`relative rounded-2xl border p-6 transition-all ${
                level.active
                  ? "border-primary bg-card shadow-xs"
                  : "border-border/30 bg-card/60 opacity-80"
              }`}
            >
              {level.active && (
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                  <CheckCircle2 className="size-3" />
                  Tersedia
                </div>
              )}

              {!level.active && (
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                  <Lock className="size-3" />
                  Coming Soon
                </div>
              )}

              <div
                className={`mb-4 inline-flex items-center justify-center rounded-xl px-3 py-1.5 ${
                  level.active
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <span className="text-sm font-bold">{level.code}</span>
              </div>

              <h3 className="text-xl font-bold text-foreground">
                {level.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{level.description}</p>

              {level.active && level.modules && (
                <p className="mt-4 text-xs font-medium text-primary">
                  {level.modules} modul tersedia
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

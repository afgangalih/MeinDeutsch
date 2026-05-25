import { Headphones, BookOpen, PencilLine, Mic } from "lucide-react";

const skills = [
  {
    id: "horen",
    name: "Hören",
    label: "Listening",
    icon: Headphones,
    description:
      "Latih kemampuan mendengarkan melalui audio pendek dalam bahasa Jerman. Dilengkapi transkrip dan soal pemahaman.",
    color: "bg-primary/10 text-primary border-primary/20",
    iconColor: "text-primary",
  },
  {
    id: "lesen",
    name: "Lesen",
    label: "Reading",
    icon: BookOpen,
    description:
      "Baca teks pendek sesuai level dan jawab pertanyaan richtig/falsch atau pilihan ganda untuk menguji pemahaman.",
    color: "bg-secondary/15 text-foreground border-secondary/30",
    iconColor: "text-secondary",
  },
  {
    id: "schreiben",
    name: "Schreiben",
    label: "Writing",
    icon: PencilLine,
    description:
      "Tulis kalimat dan paragraf pendek berdasarkan prompt. Terima feedback berbasis checklist untuk meningkatkan tulisanmu.",
    color: "bg-primary/10 text-primary border-primary/20",
    iconColor: "text-primary",
  },
  {
    id: "sprechen",
    name: "Sprechen",
    label: "Speaking",
    icon: Mic,
    description:
      "Latih berbicara menggunakan prompt percakapan. Rekam suaramu dan dengarkan ulang untuk evaluasi mandiri.",
    color: "bg-secondary/15 text-foreground border-secondary/30",
    iconColor: "text-secondary",
  },
];

export function FourSkillsSection() {
  return (
    <section id="features" className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Empat Keterampilan
            </p>
            <h2 className="max-w-lg text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Belajar seperti cara otak bekerja.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground md:text-right">
            Bahasa bukan hafalan. MeinDeutsch melatih keempat keterampilan secara terpadu agar
            kamu benar-benar paham, bukan hanya tahu.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.id}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div
                  className={`mb-5 inline-flex size-11 items-center justify-center rounded-xl border ${skill.color}`}
                >
                  <Icon className={`size-5 ${skill.iconColor}`} />
                </div>

                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-foreground">{skill.name}</h3>
                  <span className="text-xs text-muted-foreground">{skill.label}</span>
                </div>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">{skill.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

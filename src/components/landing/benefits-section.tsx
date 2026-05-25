import {
  BarChart3,
  BookMarked,
  Brain,
  ChartNoAxesColumn,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    id: "progress",
    icon: BarChart3,
    title: "Dashboard Progres Personal",
    description:
      "Pantau kemajuan belajarmu secara real-time. Lihat berapa lesson selesai, skor rata-rata, dan skill mana yang perlu lebih banyak latihan.",
  },
  {
    id: "weakness",
    icon: Brain,
    title: "Weakness Tracker",
    description:
      "Sistem secara otomatis mencatat kategori soal yang sering kamu jawab salah, lalu merekomendasikan latihan untuk menutup celah tersebut.",
  },
  {
    id: "smart-review",
    icon: RotateCcw,
    title: "Smart Review",
    description:
      "Soal yang pernah salah akan muncul kembali pada waktu yang tepat. Metode pengulangan terspasi untuk memori jangka panjang.",
  },
  {
    id: "vocab-bank",
    icon: BookMarked,
    title: "Vocabulary & Grammar Bank",
    description:
      "Simpan kosakata sulit ke koleksi pribadimu. Akses kamus kosakata A1 berdasarkan tema dan latih secara mandiri kapan saja.",
  },
  {
    id: "cefr-standard",
    icon: ShieldCheck,
    title: "Standar CEFR & Goethe",
    description:
      "Seluruh materi mengacu pada CEFR dan Goethe-Institut, bukan AI. Konten dikurasi secara manual untuk akurasi dan keandalan.",
  },
  {
    id: "skill-tracker",
    icon: ChartNoAxesColumn,
    title: "Skill Tracker Per Keterampilan",
    description:
      "Lihat progres terpisah untuk Hören, Lesen, Schreiben, dan Sprechen. Ketahui keterampilan mana yang sudah kuat dan mana yang perlu ditingkatkan.",
  },
];

export function BenefitsSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Kenapa MeinDeutsch?
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Bukan website materi biasa.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            MeinDeutsch dirancang sebagai learning platform yang aktif, bukan sekadar kumpulan
            teks. Setiap fitur hadir untuk membuat proses belajar lebih efektif dan terukur.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex flex-col gap-4">
                <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-muted">
                  <Icon className="size-4.5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

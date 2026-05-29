const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

const grammarData = [
  {
    slug: "personalpronomen",
    level_code: "A1",
    category: "Subjek",
    title: "Personalpronomen (Kata Ganti Orang)",
    summary: "Memahami subjek dasar seperti ich, du, er, sie, es, wir, ihr, sie, dan bentuk formal Sie.",
    explanation: "Dalam bahasa Jerman, kata ganti orang (Personalpronomen) digunakan untuk menggantikan orang atau benda dalam kalimat. Bentuk kata kerja akan berubah (terkonjugasi) menyesuaikan subjek yang digunakan.\n\n### Daftar Personalpronomen:\n* **ich** : Saya (Orang pertama tunggal)\n* **du** : Kamu (Orang kedua tunggal informal)\n* **er** : Dia laki-laki (maskulin - der)\n* **sie** : Dia perempuan (feminin - die)\n* **es** : Dia netral (netral - das)\n* **wir** : Kami / Kita\n* **ihr** : Kalian (kumpulan orang kedua informal)\n* **sie** : Mereka (jamak)\n* **Sie** : Anda (formal, huruf S selalu ditulis kapital)",
    examples: [
      "Ich lerne Deutsch. (Saya belajar bahasa Jerman.)",
      "Wir wohnen in Jakarta. (Kami tinggal di Jakarta.)",
      "Wie heißen Sie? (Siapa nama Anda? - Formal)"
    ],
    lesson_slug: "personalpronomen"
  },
  {
    slug: "konjugasi-reguler",
    level_code: "A1",
    category: "Verba",
    title: "Konjugasi Verba Reguler (Kata Kerja Beraturan)",
    summary: "Perubahan akhiran kata kerja beraturan mengikuti kata ganti subjek di waktu sekarang (Präsens).",
    explanation: "Kata kerja bahasa Jerman memiliki bentuk dasar (*Infinitiv*) yang umumnya berakhir dengan **-en** (seperti *lernen*, *wohnen*, *kommen*). Saat disandingkan dengan subjek, akhiran **-en** dibuang dan diganti dengan akhiran konjugasi khusus.\n\n### Rumus Konjugasi:\n* **ich** -> akhiran **-e** (ich lerne)\n* **du** -> akhiran **-st** (du lernst)\n* **er/sie/es** -> akhiran **-t** (er lernt)\n* **wir** -> akhiran **-en** (wir lernen)\n* **ihr** -> akhiran **-t** (ihr lernt)\n* **sie/Sie** -> akhiran **-en** (sie lernen)",
    examples: [
      "Ich wohne in Bandung. (Saya tinggal di Bandung.)",
      "Woher kommst du? (Dari mana kamu berasal?)",
      "Er lernt fleißig. (Dia belajar dengan rajin.)"
    ],
    lesson_slug: "sich-vorstellen"
  },
  {
    slug: "w-fragen",
    level_code: "A1",
    category: "Pertanyaan",
    title: "W-Fragen (Pertanyaan Terbuka)",
    summary: "Membuat kalimat tanya terbuka menggunakan kata tanya yang diawali huruf W seperti wer, was, wo, woher.",
    explanation: "W-Fragen adalah bentuk pertanyaan terbuka yang membutuhkan jawaban penjelasan, bukan sekadar ya atau tidak. Kata kerja utama dalam kalimat W-Fragen selalu diletakkan di **posisi kedua**.\n\n### Kata Tanya Penting A1:\n* **wer** : siapa\n* **was** : apa\n* **wo** : di mana\n* **woher** : dari mana\n* **wie** : bagaimana",
    examples: [
      "Wer ist das? (Siapa itu?)",
      "Was machst du? (Apa yang sedang kamu lakukan?)",
      "Woher kommen Sie? (Dari mana Anda berasal?)"
    ],
    lesson_slug: "begruessung"
  },
  {
    slug: "akkusativ-artikel",
    level_code: "A1",
    category: "Kasus",
    title: "Akkusativ Artikel (Objek Penderita)",
    summary: "Memahami perubahan artikel maskulin der menjadi den saat bertindak sebagai objek langsung.",
    explanation: "Bahasa Jerman menggunakan sistem kasus untuk menentukan peran kata benda dalam kalimat. Kasus Akkusativ digunakan untuk objek langsung (penderita).\n\n### Perubahan Artikel Nominativ ke Akkusativ:\n* Maskulin: **der** / **ein** -> **den** / **einen**\n* Feminin: **die** / **eine** -> **die** / **eine** (tetap)\n* Netral: **das** / **ein** -> **das** / **ein** (tetap)\n* Jamak: **die** -> **die** (tetap)",
    examples: [
      "Ich habe einen Hund. (Saya memiliki seekor anjing. - der Hund menjadi einen Hund)",
      "Er sucht den Schlüssel. (Dia mencari kunci itu. - der Schlüssel menjadi den Schlüssel)",
      "Wir trinken das Wasser. (Kami meminum air itu. - das Wasser tetap das Wasser)"
    ]
  }
];

async function main() {
  console.log("Cleaning up old grammar topics...");
  await supabase.from("learning_grammar").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log("Seeding grammar bank data...");
  for (let i = 0; i < grammarData.length; i++) {
    const item = grammarData[i];
    let lessonId = null;

    if (item.lesson_slug) {
      const { data: lesson } = await supabase
        .from("learning_lessons")
        .select("id")
        .eq("slug", item.lesson_slug)
        .maybeSingle();
      
      if (lesson) {
        lessonId = lesson.id;
      }
    }

    const { error } = await supabase.from("learning_grammar").insert({
      slug: item.slug,
      level_code: item.level_code,
      category: item.category,
      title: item.title,
      summary: item.summary,
      explanation: item.explanation,
      examples: item.examples,
      lesson_id: lessonId,
      order_index: i
    });

    if (error) {
      console.error(`Error inserting grammar ${item.slug}:`, error.message);
    } else {
      console.log(`Successfully seeded grammar: ${item.title}`);
    }
  }

  console.log("Grammar bank seeding completed!");
}

main().catch(console.error);

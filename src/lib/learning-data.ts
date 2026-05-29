import type { QuizQuestion } from "@/lib/quiz";

export type CourseModule = {
  slug: string;
  title: string;
  theme: string;
  description: string;
  progress: number;
  status: "Selesai" | "Berjalan" | "Baru";
  duration: string;
  grammarNote: string;
  examples: string[];
  vocabulary: { german: string; indonesian: string; theme: string; difficult?: boolean }[];
  quiz: QuizQuestion[];
};

export const courseModules: CourseModule[] = [
  {
    slug: "das-alphabet",
    title: "Das Alphabet",
    theme: "Dasar Pelafalan",
    description: "Pengenalan huruf abjad Jerman A-Z, Umlaut (Ä, Ö, Ü), dan Eszett (ß) beserta panduan pelafalan.",
    progress: 0,
    status: "Baru",
    duration: "10 menit",
    grammarNote:
      "Abjad bahasa Jerman mirip dengan bahasa Inggris/Indonesia, tetapi memiliki cara pengucapan (Aussprache) yang khas pada huruf-huruf tertentu serta memiliki 4 huruf tambahan (Ä, Ö, Ü, ß).",
    examples: [
      "A (ah) - Apfel (Apel)",
      "J (yot) - Ja (Ya)",
      "V (fao) - Vater (Ayah)",
      "W (veh) - Wasser (Air)",
      "Z (tset) - Zug (Kereta)",
      "ß (es-tset) - Straße (Jalan)"
    ],
    vocabulary: [
      { german: "A", indonesian: "[ah] seperti pada kata 'Apel'", theme: "Alphabet" },
      { german: "B", indonesian: "[beh]", theme: "Alphabet" },
      { german: "C", indonesian: "[tseh]", theme: "Alphabet" },
      { german: "D", indonesian: "[deh]", theme: "Alphabet" },
      { german: "E", indonesian: "[eh]", theme: "Alphabet" },
      { german: "F", indonesian: "[ef]", theme: "Alphabet" },
      { german: "G", indonesian: "[geh]", theme: "Alphabet" },
      { german: "H", indonesian: "[hah]", theme: "Alphabet" },
      { german: "I", indonesian: "[ih]", theme: "Alphabet" },
      { german: "J", indonesian: "[yot] mirip bunyi 'y'", theme: "Alphabet", difficult: true },
      { german: "K", indonesian: "[kah]", theme: "Alphabet" },
      { german: "L", indonesian: "[el]", theme: "Alphabet" },
      { german: "M", indonesian: "[em]", theme: "Alphabet" },
      { german: "N", indonesian: "[en]", theme: "Alphabet" },
      { german: "O", indonesian: "[oh]", theme: "Alphabet" },
      { german: "P", indonesian: "[peh]", theme: "Alphabet" },
      { german: "Q", indonesian: "[kuh] seperti 'ku'", theme: "Alphabet" },
      { german: "R", indonesian: "[er] dengan getaran tenggorokan", theme: "Alphabet", difficult: true },
      { german: "S", indonesian: "[es]", theme: "Alphabet" },
      { german: "T", indonesian: "[teh]", theme: "Alphabet" },
      { german: "U", indonesian: "[uh] seperti 'u'", theme: "Alphabet" },
      { german: "V", indonesian: "[fao] diucapkan seperti 'f'", theme: "Alphabet", difficult: true },
      { german: "W", indonesian: "[veh] diucapkan seperti 'v'", theme: "Alphabet", difficult: true },
      { german: "X", indonesian: "[iks]", theme: "Alphabet" },
      { german: "Y", indonesian: "[ypsilon] diucapkan mirip 'u' bulat", theme: "Alphabet", difficult: true },
      { german: "Z", indonesian: "[tset] diucapkan seperti 'ts'", theme: "Alphabet", difficult: true },
      { german: "Ä", indonesian: "[ae] mirip 'e' terbuka", theme: "Alphabet" },
      { german: "Ö", indonesian: "[oe] sebut 'e' dengan bibir membulat membentuk 'o'", theme: "Alphabet", difficult: true },
      { german: "Ü", indonesian: "[ue] sebut 'i' dengan bibir membulat membentuk 'u'", theme: "Alphabet", difficult: true },
      { german: "ß", indonesian: "[es-tset] diucapkan seperti 's' tajam ganda", theme: "Alphabet" }
    ],
    quiz: [
      {
        id: "q_alpha_1",
        type: "multiple-choice",
        prompt: "Bagaimana cara melafalkan huruf 'J' dalam bahasa Jerman?",
        options: ["jay", "yot", "dzhe", "je"],
        answer: "yot",
        explanation: "Huruf 'J' dilafalkan sebagai 'yot' dalam bahasa Jerman.",
        category: "Aussprache"
      },
      {
        id: "q_alpha_2",
        type: "multiple-choice",
        prompt: "Huruf tambahan 'ß' disebut dengan nama...",
        options: ["Umlaut", "Eszett / Scharfes S", "Aussprache", "Diphthong"],
        answer: "Eszett / Scharfes S",
        explanation: "Huruf 'ß' disebut Eszett atau Scharfes S (S tajam).",
        category: "Alphabet"
      },
      {
        id: "q_alpha_3",
        type: "fill-blank",
        prompt: "Cara baca huruf 'W' dalam bahasa Jerman mirip bunyi huruf...",
        answer: "v",
        explanation: "Huruf 'W' dilafalkan seperti bunyi 'v' Inggris/Indonesia (contoh: Wasser dibaca Vaser).",
        category: "Alphabet"
      }
    ]
  },
  {
    slug: "begruessung",
    title: "Begrüßung & Alltag",
    theme: "Perkenalan",
    description: "Sapaan, ucapan sopan, dan frasa kecil untuk memulai percakapan.",
    progress: 76,
    status: "Berjalan",
    duration: "18 menit",
    grammarNote:
      "Dalam bahasa Jerman, sapaan formal memakai Sie, sedangkan situasi santai memakai du. Pilih bentuk sesuai lawan bicara.",
    examples: [
      "Guten Morgen, wie geht es Ihnen?",
      "Hallo, ich heiße Nadia.",
      "Danke, mir geht es gut."
    ],
    vocabulary: [
      { german: "Guten Morgen", indonesian: "Selamat pagi", theme: "Perkenalan" },
      { german: "Danke", indonesian: "Terima kasih", theme: "Perkenalan" },
      { german: "Bitte", indonesian: "Silakan / sama-sama", theme: "Perkenalan", difficult: true }
    ],
    quiz: [
      {
        id: "q1",
        type: "multiple-choice",
        prompt: "Sapaan formal untuk pagi hari adalah...",
        options: ["Guten Morgen", "Gute Nacht", "Tschüss", "Bis bald"],
        answer: "Guten Morgen",
        explanation: "Guten Morgen digunakan untuk menyapa pada pagi hari.",
        category: "Begrüßung"
      },
      {
        id: "q2",
        type: "fill-blank",
        prompt: "Lengkapi: Ich ___ Nadia.",
        answer: "heiße",
        explanation: "Ich heiße berarti saya bernama.",
        category: "Verbkonjugation"
      },
      {
        id: "q3",
        type: "sentence-builder",
        prompt: "Susun kalimat: Saya baik-baik saja.",
        fragments: ["geht", "Mir", "gut", "es"],
        answer: "Mir goes es gut",
        explanation: "Urutan idiomatiknya adalah Mir geht es gut.",
        category: "Satzbau"
      }
    ]
  },
  {
    slug: "sich-vorstellen",
    title: "Sich vorstellen",
    theme: "Identitas",
    description: "Memperkenalkan nama, asal, tempat tinggal, dan pekerjaan.",
    progress: 42,
    status: "Berjalan",
    duration: "24 menit",
    grammarNote:
      "Verba sein dan kommen sering dipakai untuk identitas: Ich bin..., Ich komme aus..., Ich wohne in....",
    examples: [
      "Ich komme aus Indonesien.",
      "Ich wohne in Bandung.",
      "Ich bin Studentin."
    ],
    vocabulary: [
      { german: "wohnen", indonesian: "tinggal", theme: "Identitas" },
      { german: "kommen", indonesian: "datang / berasal", theme: "Identitas", difficult: true },
      { german: "der Beruf", indonesian: "pekerjaan", theme: "Identitas" }
    ],
    quiz: [
      {
        id: "q4",
        type: "multiple-choice",
        prompt: "Kalimat untuk mengatakan asal adalah...",
        options: ["Ich komme aus Indonesien.", "Ich trinke Wasser.", "Ich lese ein Buch."],
        answer: "Ich komme aus Indonesien.",
        explanation: "kommen aus dipakai untuk asal.",
        category: "Redemittel"
      },
      {
        id: "q5",
        type: "drag-drop",
        prompt: "Susun kalimat: Saya tinggal di Jakarta.",
        fragments: ["in", "Ich", "Jakarta", "wohne"],
        answer: "Ich wohne in Jakarta",
        explanation: "Struktur dasar: subjek + verba + keterangan.",
        category: "Satzbau"
      }
    ]
  },
  {
    slug: "personalpronomen",
    title: "Personalpronomen",
    theme: "Grammar",
    description: "Subjek ich, du, er, sie, es, wir, ihr, sie dan penggunaannya.",
    progress: 18,
    status: "Baru",
    duration: "20 menit",
    grammarNote:
      "Personalpronomen menggantikan orang atau benda. Bentuk verba berubah mengikuti subjeknya.",
    examples: ["Ich lerne Deutsch.", "Du sprichst gut.", "Wir üben zusammen."],
    vocabulary: [
      { german: "ich", indonesian: "saya", theme: "Grammar" },
      { german: "du", indonesian: "kamu informal", theme: "Grammar" },
      { german: "wir", indonesian: "kami / kita", theme: "Grammar", difficult: true }
    ],
    quiz: [
      {
        id: "q6",
        type: "multiple-choice",
        prompt: "Pronomen untuk 'kami/kita' adalah...",
        options: ["ich", "du", "wir", "ihr"],
        answer: "wir",
        explanation: "wir berarti kami atau kita.",
        category: "Personalpronomen"
      }
    ]
  }
];

export const vocabularyBank = courseModules.flatMap((module) =>
  module.vocabulary.map((word) => ({
    ...word,
    module: module.title
  }))
);

export const grammarTopics = [
  {
    title: "Personalpronomen",
    category: "Subjek",
    summary: "Pronomen seperti ich, du, er, sie, es, wir, ihr, sie.",
    example: "Wir lernen Deutsch."
  },
  {
    title: "Konjugasi verba reguler",
    category: "Verba",
    summary: "Akhiran verba berubah sesuai subjek: ich lerne, du lernst, wir lernen.",
    example: "Du wohnst in Berlin."
  },
  {
    title: "W-Fragen",
    category: "Pertanyaan",
    summary: "Kata tanya seperti wer, wo, was, wie, woher, wohin.",
    example: "Wo wohnst du?"
  },
  {
    title: "Akkusativ Artikel",
    category: "Kasus",
    summary: "Artikel maskulin der berubah menjadi den pada objek Akkusativ.",
    example: "Ich sehe den Mann."
  }
];

export const weaknessItems = [
  { topic: "Personalpronomen", wrongRate: 38, detail: "Sering tertukar antara sie dan Sie." },
  { topic: "Akkusativ Artikel", wrongRate: 46, detail: "Perhatikan der menjadi den." },
  { topic: "Satzbau", wrongRate: 32, detail: "Verba utama tetap di posisi kedua." }
];

export const difficultVocabulary = vocabularyBank.filter((word) => word.difficult);

export const reviewQuestions = courseModules.flatMap((module) =>
  module.quiz
    .filter((question) => ["Personalpronomen", "Satzbau", "Akkusativ Artikel"].includes(question.category))
    .map((question) => ({ ...question, module: module.title }))
);

export function getModule(slug: string) {
  return courseModules.find((module) => module.slug === slug);
}

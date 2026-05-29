const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

const courseModules = [
  {
    slug: "das-alphabet",
    title: "Das Alphabet",
    theme: "Dasar Pelafalan",
    description: "Pengenalan huruf abjad Jerman A-Z, Umlaut (Ä, Ö, Ü), dan Eszett (ß) beserta panduan pelafalan.",
    duration: "10 menit",
    grammarNote: "Abjad bahasa Jerman mirip dengan bahasa Inggris/Indonesia, tetapi memiliki cara pengucapan (Aussprache) yang khas pada huruf-huruf tertentu serta memiliki 4 huruf tambahan (Ä, Ö, Ü, ß).",
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
    duration: "18 menit",
    grammarNote: "Dalam bahasa Jerman, sapaan formal memakai Sie, sedangkan situasi santai memakai du. Pilih bentuk sesuai lawan bicara.",
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
    duration: "24 menit",
    grammarNote: "Verba sein dan kommen sering dipakai untuk identitas: Ich bin..., Ich komme aus..., Ich wohne in....",
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
    duration: "20 menit",
    grammarNote: "Personalpronomen menggantikan orang atau benda. Bentuk verba berubah mengikuti subjeknya.",
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

async function main() {
  console.log("Cleaning up old content...");
  await supabase.from("quiz_questions").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("learning_vocabulary").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("learning_lessons").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("learning_courses").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log("Seeding levels and courses...");
  for (let i = 0; i < courseModules.length; i++) {
    const mod = courseModules[i];
    
    const { data: courseData, error: courseError } = await supabase
      .from("learning_courses")
      .insert({
        slug: mod.slug,
        title: mod.title,
        description: mod.description,
        level_code: "A1",
        order_index: i
      })
      .select()
      .single();

    if (courseError) {
      console.error(`Error inserting course ${mod.slug}:`, courseError.message);
      continue;
    }

    const { data: lessonData, error: lessonError } = await supabase
      .from("learning_lessons")
      .insert({
        course_id: courseData.id,
        slug: mod.slug,
        title: mod.title,
        theme: mod.theme,
        description: mod.description,
        grammar_note: mod.grammarNote,
        examples: mod.examples,
        order_index: 0
      })
      .select()
      .single();

    if (lessonError) {
      console.error(`Error inserting lesson for ${mod.slug}:`, lessonError.message);
      continue;
    }

    if (mod.vocabulary && mod.vocabulary.length > 0) {
      const vocabRows = mod.vocabulary.map(v => ({
        lesson_id: lessonData.id,
        german: v.german,
        indonesian: v.indonesian,
        theme: v.theme
      }));

      const { error: vocabError } = await supabase.from("learning_vocabulary").insert(vocabRows);
      if (vocabError) {
        console.error(`Error inserting vocabulary for ${mod.slug}:`, vocabError.message);
      }
    }

    if (mod.quiz && mod.quiz.length > 0) {
      const quizRows = mod.quiz.map(q => ({
        lesson_id: lessonData.id,
        question_key: q.id,
        type: q.type,
        prompt: q.prompt,
        options: q.options || [],
        fragments: q.fragments || [],
        answer: q.answer,
        explanation: q.explanation,
        category: q.category
      }));

      const { error: quizError } = await supabase.from("quiz_questions").insert(quizRows);
      if (quizError) {
        console.error(`Error inserting quiz questions for ${mod.slug}:`, quizError.message);
      }
    }

    console.log(`Successfully seeded: ${mod.title}`);
  }

  console.log("Database seeding completed!");
}

main().catch(console.error);

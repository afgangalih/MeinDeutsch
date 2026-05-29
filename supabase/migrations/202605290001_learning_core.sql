create table if not exists public.learning_courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  level_code text not null default 'A1',
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.learning_lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.learning_courses(id) on delete cascade,
  slug text not null unique,
  title text not null,
  theme text not null,
  description text not null,
  grammar_note text not null,
  examples jsonb not null default '[]'::jsonb,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.learning_vocabulary (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.learning_lessons(id) on delete cascade,
  german text not null,
  indonesian text not null,
  theme text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.learning_lessons(id) on delete cascade,
  question_key text not null unique,
  type text not null,
  prompt text not null,
  options jsonb not null default '[]'::jsonb,
  fragments jsonb not null default '[]'::jsonb,
  answer text not null,
  explanation text not null,
  category text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_slug text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_slug)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_slug text not null,
  score integer not null,
  total integer not null,
  percentage integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  question_key text not null,
  user_answer text not null,
  is_correct boolean not null,
  category text not null
);

create table if not exists public.saved_vocabulary (
  user_id uuid not null references auth.users(id) on delete cascade,
  german text not null,
  indonesian text not null,
  theme text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, german)
);

alter table public.learning_courses enable row level security;
alter table public.learning_lessons enable row level security;
alter table public.learning_vocabulary enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.quiz_attempt_answers enable row level security;
alter table public.saved_vocabulary enable row level security;

create policy "Learning content is readable by authenticated users"
on public.learning_courses for select to authenticated using (true);

create policy "Lessons are readable by authenticated users"
on public.learning_lessons for select to authenticated using (true);

create policy "Vocabulary is readable by authenticated users"
on public.learning_vocabulary for select to authenticated using (true);

create policy "Quiz questions are readable by authenticated users"
on public.quiz_questions for select to authenticated using (true);

create policy "Users manage own lesson progress"
on public.user_lesson_progress for all to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users create own quiz attempts"
on public.quiz_attempts for insert to authenticated
with check (auth.uid() = user_id);

create policy "Users read own quiz attempts"
on public.quiz_attempts for select to authenticated
using (auth.uid() = user_id);

create policy "Users create answers for own attempts"
on public.quiz_attempt_answers for insert to authenticated
with check (
  exists (
    select 1
    from public.quiz_attempts
    where quiz_attempts.id = quiz_attempt_answers.attempt_id
      and quiz_attempts.user_id = auth.uid()
  )
);

create policy "Users manage own saved vocabulary"
on public.saved_vocabulary for all to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create table if not exists lesson_progress (
  user_id text not null,
  course_id text not null,
  lesson_id text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id, lesson_id)
);

create index if not exists lesson_progress_user_course_idx
  on lesson_progress (user_id, course_id);

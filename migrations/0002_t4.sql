create table if not exists t4_profiles (
  user_id text primary key,
  profile text not null,
  updated_at timestamptz not null default now()
);

create table if not exists t4_applications (
  id text primary key,
  user_id text not null,
  grant_id text not null,
  status text not null default 'draft',
  sections text not null default '[]',
  checked_docs text not null default '[]',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists t4_applications_user_id_idx on t4_applications (user_id);

create table if not exists t4_saved (
  user_id text not null,
  grant_id text not null,
  primary key (user_id, grant_id)
);

create table if not exists t4_ai_usage (
  user_id text not null,
  day date not null,
  calls int not null default 0,
  primary key (user_id, day)
);

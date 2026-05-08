-- Initial schema for in-vest. Skeleton only: no RLS, no triggers, no seed.
-- Run via the Supabase CLI (`supabase db push`) once the project is linked.

create extension if not exists "pgcrypto";

create table if not exists themes (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null,
  title            text not null,
  hypothesis       text not null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  last_reviewed_at timestamptz
);

create table if not exists theme_updates (
  id         uuid primary key default gen_random_uuid(),
  theme_id   uuid not null references themes(id) on delete cascade,
  summary    text not null,
  model      text not null,
  created_at timestamptz not null default now()
);

create table if not exists portfolio_snapshots (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null,
  fetched_at timestamptz not null default now(),
  raw        jsonb not null
);

create table if not exists positions (
  id           uuid primary key default gen_random_uuid(),
  snapshot_id  uuid not null references portfolio_snapshots(id) on delete cascade,
  symbol       text not null,
  quantity     numeric not null,
  market_value numeric,
  cost_basis   numeric
);

create index if not exists themes_user_id_idx on themes(user_id);
create index if not exists theme_updates_theme_id_idx on theme_updates(theme_id);
create index if not exists portfolio_snapshots_user_id_idx on portfolio_snapshots(user_id);
create index if not exists positions_snapshot_id_idx on positions(snapshot_id);

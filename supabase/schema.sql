-- Run this once in the Supabase SQL editor (or via `supabase db push`).
-- Already ran this before? Skip to the "Migration" block at the bottom.

create table if not exists developers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  bio text,
  skills text[] not null default '{}',
  portfolio_url text,
  rate_range text,
  created_at timestamptz not null default now()
);

create unique index if not exists developers_user_id_idx on developers(user_id);

create table if not exists job_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null,
  budget_range text,
  contact_email text not null,
  created_at timestamptz not null default now()
);

alter table developers enable row level security;
alter table job_posts enable row level security;

-- Anyone can browse the directory / job board.
create policy "developers are publicly readable" on developers
  for select using (true);

create policy "job posts are publicly readable" on job_posts
  for select using (true);

-- A developer can only create/edit their own profile.
create policy "developers can insert their own profile" on developers
  for insert with check (auth.uid() = user_id);

create policy "developers can update their own profile" on developers
  for update using (auth.uid() = user_id);

-- Posting a job requires being signed in, and only as yourself.
create policy "users can insert their own job post" on job_posts
  for insert with check (auth.uid() = user_id);

-- =============================================================
-- Migration: run this if job_posts already existed without auth
-- (safe to re-run).
-- =============================================================
alter table job_posts add column if not exists user_id uuid references auth.users(id) on delete cascade;

drop policy if exists "anyone can post a job" on job_posts;
drop policy if exists "users can insert their own job post" on job_posts;
create policy "users can insert their own job post" on job_posts
  for insert with check (auth.uid() = user_id);

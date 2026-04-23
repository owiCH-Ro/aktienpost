-- aktienpost.ch — profiles table
-- Migration 001
--
-- Extends auth.users with the public-facing profile data we need: name,
-- desired plan, activation timestamp. Row-level security only permits
-- users to see + update their own row; inserts happen server-side via
-- /api/register using the service-role key (so we can accept and
-- immediately stub a profile even when email confirmation is pending).

create table if not exists profiles (
  id uuid references auth.users primary key,
  email text not null,
  name text,
  plan text default 'none' check (plan in ('none', 'basis', 'plus', 'premium')),
  active_since timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

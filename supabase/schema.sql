create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  country text not null check (country in ('Китай', 'Корея')),
  year integer not null,
  price_from integer not null,
  image_url text not null,
  image_urls jsonb not null default '[]'::jsonb,
  description text not null,
  mileage text,
  engine text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  telegram_username text,
  desired_car text,
  budget text,
  country_preference text not null default 'Не знаю',
  source text not null default 'landing',
  created_at timestamptz not null default now()
);

alter table public.leads
  add column if not exists telegram_username text;

alter table public.cars
  add column if not exists image_urls jsonb not null default '[]'::jsonb;

alter table public.cars enable row level security;
alter table public.leads enable row level security;

create policy "Published cars are public"
  on public.cars for select
  using (status = 'published' or auth.role() = 'authenticated');

create policy "Authenticated users manage cars"
  on public.cars for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Anyone can create leads"
  on public.leads for insert
  with check (true);

create policy "Authenticated users read leads"
  on public.leads for select
  using (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public)
values ('car-photos', 'car-photos', true)
on conflict (id) do update set public = true;

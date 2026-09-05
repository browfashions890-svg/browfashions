-- =====================================================================
-- Aavaran clothing catalogue — Supabase schema
-- Run this in your Supabase project: SQL Editor → New query → paste → Run
-- =====================================================================

-- Extension needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Table: products
-- ---------------------------------------------------------------------
create table if not exists public.products (
  id                    uuid primary key default gen_random_uuid(),
  product_code          text not null unique,
  name                  text not null,
  slug                  text not null unique,
  category              text not null check (category in ('men', 'women', 'kids')),
  subcategory           text,
  description           text,
  price                 numeric(10, 2) not null check (price >= 0),
  mrp                   numeric(10, 2) check (mrp is null or mrp >= 0),
  discount_percentage   integer default 0 check (discount_percentage between 0 and 100),
  sizes                 text[] default '{}',
  colours               text[] default '{}',
  fabric                text,
  care_instructions     text,
  main_image            text,
  additional_images     text[] default '{}',
  is_available          boolean not null default true,
  is_featured           boolean not null default false,
  is_new_arrival        boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Indexes — speed up the filters/sorts used by the catalogue page
-- ---------------------------------------------------------------------
create index if not exists idx_products_category        on public.products (category);
create index if not exists idx_products_subcategory      on public.products (subcategory);
create index if not exists idx_products_product_code     on public.products (product_code);
create index if not exists idx_products_name             on public.products using gin (to_tsvector('simple', name));
create index if not exists idx_products_is_available     on public.products (is_available);
create index if not exists idx_products_is_featured      on public.products (is_featured);
create index if not exists idx_products_is_new_arrival   on public.products (is_new_arrival);
create index if not exists idx_products_created_at       on public.products (created_at desc);

-- ---------------------------------------------------------------------
-- Keep updated_at current automatically
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table public.products enable row level security;

-- Public (anon) visitors can only READ products that are available.
-- This is the only policy the frontend's anon key relies on.
drop policy if exists "Public can read available products" on public.products;
create policy "Public can read available products"
  on public.products
  for select
  to anon
  using (is_available = true);

-- Authenticated users (your admin login) can read every product,
-- including out-of-stock ones, for the admin dashboard.
drop policy if exists "Authenticated can read all products" on public.products;
create policy "Authenticated can read all products"
  on public.products
  for select
  to authenticated
  using (true);

-- Only authenticated users (admins) can insert/update/delete.
drop policy if exists "Authenticated can insert products" on public.products;
create policy "Authenticated can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update products" on public.products;
create policy "Authenticated can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete products" on public.products;
create policy "Authenticated can delete products"
  on public.products
  for delete
  to authenticated
  using (true);

-- NOTE: "authenticated" here means anyone who has signed in with Supabase
-- Auth (see README: "How to add an admin user"). There is no separate
-- admin flag — every Supabase Auth user you create is treated as an
-- admin. Only create accounts for people you trust with the catalogue.

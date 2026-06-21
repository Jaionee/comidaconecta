-- ============================================================
-- ComidaConecta - Database Schema (Migración Inicial)
-- ============================================================
-- Ejecutar en Supabase SQL Editor

-- 1. EXTENSIONES
create extension if not exists "uuid-ossp";

-- 2. TABLA PROFILES (extiende auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('commerce', 'ngo', 'admin')),
  name text not null,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. TABLA COMMERCES
create table if not exists public.commerces (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade unique,
  business_name text not null,
  business_type text not null check (business_type in ('bakery', 'restaurant', 'grocery', 'supermarket', 'hotel', 'catering', 'other')),
  address text not null,
  city text not null,
  contact_person text not null,
  phone text not null,
  email text not null,
  business_hours text,
  description text,
  logo_url text,
  status text not null default 'pending' check (status in ('pending', 'active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. TABLA NGOS
create table if not exists public.ngos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade unique,
  organization_name text not null,
  organization_type text not null check (organization_type in ('ngo', 'soup-kitchen', 'association', 'food-bank', 'social-resource', 'other')),
  address text not null,
  city text not null,
  contact_person text not null,
  phone text not null,
  email text not null,
  accepted_food_types text[] not null default '{}',
  pickup_hours text,
  description text,
  logo_url text,
  status text not null default 'pending' check (status in ('pending', 'active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. TABLA DONATIONS
create table if not exists public.donations (
  id uuid primary key default uuid_generate_v4(),
  commerce_id uuid not null references public.commerces(id) on delete cascade,
  title text not null,
  description text not null,
  food_type text not null check (food_type in ('bakery', 'fruits-vegetables', 'prepared-food', 'packaged', 'menu', 'other')),
  quantity_text text not null,
  estimated_servings integer not null check (estimated_servings > 0),
  image_url text,
  pickup_address text not null,
  pickup_deadline timestamptz not null,
  status text not null default 'available' check (status in ('available', 'reserved', 'collected', 'cancelled', 'expired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6. TABLA RESERVATIONS
create table if not exists public.reservations (
  id uuid primary key default uuid_generate_v4(),
  donation_id uuid not null references public.donations(id) on delete cascade unique,
  ngo_id uuid not null references public.ngos(id) on delete cascade,
  status text not null default 'reserved' check (status in ('reserved', 'collected', 'cancelled')),
  reserved_at timestamptz not null default now(),
  collected_at timestamptz,
  commerce_confirmed_at timestamptz,
  notes text
);

-- 7. ÍNDICES
create index if not exists idx_donations_status on public.donations(status);
create index if not exists idx_donations_commerce on public.donations(commerce_id);
create index if not exists idx_donations_deadline on public.donations(pickup_deadline);
create index if not exists idx_reservations_ngo on public.reservations(ngo_id);
create index if not exists idx_reservations_donation on public.reservations(donation_id);

-- 8. FUNCIÓN PARA AUTO-ACTUALIZAR UPDATED_AT
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger handle_commerces_updated_at
  before update on public.commerces
  for each row execute function public.handle_updated_at();

create trigger handle_ngos_updated_at
  before update on public.ngos
  for each row execute function public.handle_updated_at();

create trigger handle_donations_updated_at
  before update on public.donations
  for each row execute function public.handle_updated_at();

-- 9. ROW LEVEL SECURITY
alter table public.profiles enable row level security;
alter table public.commerces enable row level security;
alter table public.ngos enable row level security;
alter table public.donations enable row level security;
alter table public.reservations enable row level security;

-- POLÍTICAS PROFILES
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admin can view all profiles"
  on public.profiles for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin can update any profile"
  on public.profiles for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- POLÍTICAS COMMERCES
create policy "Commerce can view own profile"
  on public.commerces for select
  using (user_id = auth.uid());

create policy "Commerce can insert own profile"
  on public.commerces for insert
  with check (user_id = auth.uid());

create policy "Commerce can update own profile"
  on public.commerces for update
  using (user_id = auth.uid());

create policy "Admin can view all commerces"
  on public.commerces for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin can update any commerce"
  on public.commerces for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- POLÍTICAS NGOS
create policy "NGO can view own profile"
  on public.ngos for select
  using (user_id = auth.uid());

create policy "NGO can insert own profile"
  on public.ngos for insert
  with check (user_id = auth.uid());

create policy "NGO can update own profile"
  on public.ngos for update
  using (user_id = auth.uid());

create policy "Admin can view all ngos"
  on public.ngos for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin can update any ngo"
  on public.ngos for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- POLÍTICAS DONATIONS
create policy "Commerce can CRUD own donations"
  on public.donations for all
  using (
    exists (select 1 from public.commerces where id = commerce_id and user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.commerces where id = commerce_id and user_id = auth.uid())
  );

create policy "NGO can view available donations"
  on public.donations for select
  using (
    status = 'available'
    or
    exists (select 1 from public.reservations where donation_id = id and ngo_id in (select id from public.ngos where user_id = auth.uid()))
    or
    exists (select 1 from public.commerces where id = commerce_id)
  );

create policy "Admin can view all donations"
  on public.donations for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin can update any donation"
  on public.donations for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- POLÍTICAS RESERVATIONS
create policy "NGO can view own reservations"
  on public.reservations for select
  using (
    ngo_id in (select id from public.ngos where user_id = auth.uid())
  );

create policy "NGO can insert reservation"
  on public.reservations for insert
  with check (
    ngo_id in (select id from public.ngos where user_id = auth.uid())
  );

create policy "NGO can update own reservation"
  on public.reservations for update
  using (
    ngo_id in (select id from public.ngos where user_id = auth.uid())
  );

create policy "Commerce can view reservations for own donations"
  on public.reservations for select
  using (
    donation_id in (select id from public.donations where commerce_id in (select id from public.commerces where user_id = auth.uid()))
  );

create policy "Commerce can update reservation status"
  on public.reservations for update
  using (
    donation_id in (select id from public.donations where commerce_id in (select id from public.commerces where user_id = auth.uid()))
  );

create policy "Admin can view all reservations"
  on public.reservations for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin can update any reservation"
  on public.reservations for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 10. FUNCIÓN PARA RESERVA ATÓMICA (evita concurrencia)
create or replace function public.reserve_donation(p_donation_id uuid, p_ngo_id uuid)
returns json as $$
declare
  v_donation public.donations;
  v_reservation_id uuid;
begin
  -- Lock the donation row to prevent concurrent reservations
  select * into v_donation
  from public.donations
  where id = p_donation_id
  for update;

  if not found then
    return json_build_object('success', false, 'error', 'Donación no encontrada');
  end if;

  if v_donation.status != 'available' then
    return json_build_object('success', false, 'error', 'Esta donación ya no está disponible');
  end if;

  if v_donation.pickup_deadline < now() then
    return json_build_object('success', false, 'error', 'Esta donación ha caducado');
  end if;

  -- Insert reservation
  insert into public.reservations (donation_id, ngo_id, status)
  values (p_donation_id, p_ngo_id, 'reserved')
  returning id into v_reservation_id;

  -- Update donation status
  update public.donations
  set status = 'reserved', updated_at = now()
  where id = p_donation_id;

  return json_build_object('success', true, 'reservation_id', v_reservation_id);
end;
$$ language plpgsql security definer;

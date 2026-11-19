-- UFH Guest Tracker: database setup for Supabase.
-- ALREADY APPLIED to your project "ufh-tracker". Keep this file as a backup / to rebuild on a new project.
-- Owner email used below: ufih.bg@gmail.com

create schema if not exists private;

create table public.staff (
  email text primary key,
  name text not null default '',
  role text not null default 'staff' check (role in ('staff','admin')),
  active boolean not null default true,
  created_at bigint not null default (extract(epoch from now()) * 1000)::bigint
);
create table public.app_settings (id text primary key, data jsonb not null default '{}'::jsonb);
create table public.app_pricing  (id text primary key, data jsonb not null default '{}'::jsonb);

create table public.guests (
  id text primary key,
  ticket integer not null default 0,
  area text not null check (area in ('trampoline','softplay')),
  name text not null,
  players integer not null default 1 check (players between 1 and 100),
  ctype text not null default 'new' check (ctype in ('new','existing')),
  card text not null default 'Basic' check (card in ('Basic','Premium')),
  bday boolean not null default false,
  socks text not null default 'No socks' check (socks in ('S','M','L','No socks')),
  remark text not null default '',
  base_min integer not null default 60,
  duration_min integer not null check (duration_min >= 1),
  start_at bigint not null,
  extensions jsonb not null default '[]'::jsonb,
  status text not null default 'active' check (status in ('active','completed','cancelled')),
  ended_at bigint, cancelled_at bigint, cancel_reason text,
  by_name text, out_by text, edited_by text, edited_at bigint
);
create index guests_start_at_idx on public.guests (start_at desc);
create index guests_active_idx on public.guests (status) where status = 'active';

create table public.contacts (
  id text primary key references public.guests(id) on delete cascade,
  phone text not null default '',
  start_at bigint not null default 0
);
create index contacts_start_at_idx on public.contacts (start_at);

create table public.billing (
  id text primary key references public.guests(id) on delete cascade,
  start_at bigint not null default 0,
  play numeric(12,2) not null default 0, socks numeric(12,2) not null default 0, card numeric(12,2) not null default 0,
  discount numeric(12,2) not null default 0, disc_type text not null default 'none', disc_val numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0, ext_total numeric(12,2) not null default 0, adjust numeric(12,2) not null default 0,
  cash numeric(12,2) not null default 0, upi numeric(12,2) not null default 0, card_amt numeric(12,2) not null default 0,
  paid_at bigint, ext_list jsonb not null default '[]'::jsonb
);
create index billing_start_at_idx on public.billing (start_at);

create or replace function private.is_owner() returns boolean language sql stable security definer set search_path = ''
as $$ select lower(coalesce((select auth.jwt() ->> 'email'), '')) = 'ufih.bg@gmail.com' $$;
create or replace function private.is_staff() returns boolean language sql stable security definer set search_path = ''
as $$ select private.is_owner() or exists (select 1 from public.staff s where s.email = lower(coalesce((select auth.jwt() ->> 'email'), '')) and s.active) $$;
create or replace function private.is_admin() returns boolean language sql stable security definer set search_path = ''
as $$ select private.is_owner() or exists (select 1 from public.staff s where s.email = lower(coalesce((select auth.jwt() ->> 'email'), '')) and s.active and s.role = 'admin') $$;

revoke all on schema private from public, anon;
grant usage on schema private to authenticated;
revoke execute on function private.is_owner(), private.is_staff(), private.is_admin() from public, anon;
grant execute on function private.is_owner(), private.is_staff(), private.is_admin() to authenticated;

alter table public.staff enable row level security;
alter table public.app_settings enable row level security;
alter table public.app_pricing enable row level security;
alter table public.guests enable row level security;
alter table public.contacts enable row level security;
alter table public.billing enable row level security;

create policy staff_select on public.staff for select to authenticated using (email = lower(coalesce((select auth.jwt() ->> 'email'), '')) or (select private.is_admin()));
create policy staff_insert on public.staff for insert to authenticated with check ((select private.is_admin()));
create policy staff_update on public.staff for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy staff_delete on public.staff for delete to authenticated using ((select private.is_admin()));

create policy settings_select on public.app_settings for select to anon, authenticated using (true);
create policy settings_insert on public.app_settings for insert to authenticated with check ((select private.is_admin()));
create policy settings_update on public.app_settings for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy settings_delete on public.app_settings for delete to authenticated using ((select private.is_admin()));

create policy pricing_select on public.app_pricing for select to authenticated using ((select private.is_staff()));
create policy pricing_insert on public.app_pricing for insert to authenticated with check ((select private.is_admin()));
create policy pricing_update on public.app_pricing for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy pricing_delete on public.app_pricing for delete to authenticated using ((select private.is_admin()));

create policy guests_select on public.guests for select to anon, authenticated using (true);
create policy guests_insert on public.guests for insert to authenticated with check ((select private.is_staff()));
create policy guests_update on public.guests for update to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy guests_delete on public.guests for delete to authenticated using ((select private.is_admin()));

create policy contacts_select on public.contacts for select to authenticated using ((select private.is_staff()));
create policy contacts_insert on public.contacts for insert to authenticated with check ((select private.is_staff()));
create policy contacts_update on public.contacts for update to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy contacts_delete on public.contacts for delete to authenticated using ((select private.is_admin()));

create policy billing_select on public.billing for select to authenticated using ((select private.is_admin()));
create policy billing_insert on public.billing for insert to authenticated with check ((select private.is_admin()));
create policy billing_update on public.billing for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy billing_delete on public.billing for delete to authenticated using ((select private.is_admin()));

revoke all on public.billing, public.contacts, public.app_pricing, public.staff from anon;
revoke insert, update, delete, truncate, references, trigger on public.guests, public.app_settings from anon;
grant select on public.guests, public.app_settings to anon;
grant select, insert, update, delete on public.staff, public.app_settings, public.app_pricing, public.guests, public.contacts, public.billing to authenticated;

-- Staff write money through these functions and can never read it back.
create or replace function public.billing_create(p jsonb) returns void language plpgsql security definer set search_path = ''
as $$
declare adm boolean := (select private.is_admin());
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  insert into public.billing (id, start_at, play, socks, card, discount, disc_type, disc_val, total, ext_total, adjust, cash, upi, card_amt)
  values (p ->> 'id', coalesce((p ->> 'start_at')::bigint, 0), coalesce((p ->> 'play')::numeric, 0), coalesce((p ->> 'socks')::numeric, 0), coalesce((p ->> 'card')::numeric, 0),
    case when adm then coalesce((p ->> 'discount')::numeric, 0) else 0 end,
    case when adm then coalesce(p ->> 'disc_type', 'none') else 'none' end,
    case when adm then coalesce((p ->> 'disc_val')::numeric, 0) else 0 end,
    coalesce((p ->> 'total')::numeric, 0), 0, 0,
    case when adm then coalesce((p ->> 'cash')::numeric, 0) else 0 end,
    case when adm then coalesce((p ->> 'upi')::numeric, 0) else 0 end,
    case when adm then coalesce((p ->> 'card_amt')::numeric, 0) else 0 end)
  on conflict (id) do nothing;
end; $$;

create or replace function public.billing_add_ext(p_id text, p_price numeric, p_min integer) returns void language plpgsql security definer set search_path = ''
as $$
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  update public.billing
     set ext_total = ext_total + greatest(coalesce(p_price, 0), 0),
         ext_list = ext_list || jsonb_build_array(jsonb_build_object('min', p_min, 'price', greatest(coalesce(p_price, 0), 0), 'at', (extract(epoch from now()) * 1000)::bigint))
   where id = p_id;
end; $$;
revoke execute on function public.billing_create(jsonb), public.billing_add_ext(text, numeric, integer) from public, anon;
grant execute on function public.billing_create(jsonb), public.billing_add_ext(text, numeric, integer) to authenticated;

create or replace function public.guest_add_time(p_id text, p_min integer, p_by text, p_at bigint) returns void language sql security invoker set search_path = ''
as $$ update public.guests set duration_min = duration_min + p_min,
       extensions = extensions || jsonb_build_array(jsonb_build_object('min', p_min, 'at', p_at, 'by', p_by)) where id = p_id; $$;
revoke execute on function public.guest_add_time(text, integer, text, bigint) from public, anon;
grant execute on function public.guest_add_time(text, integer, text, bigint) to authenticated;

alter publication supabase_realtime add table public.guests, public.contacts, public.billing, public.app_settings, public.app_pricing, public.staff;


-- =====================================================================
-- PART 2 (already applied): payment status for staff, and Paid / Pending
-- =====================================================================
alter table public.billing add column if not exists paid_by text;
alter table public.billing add column if not exists paid_amount numeric(12,2) not null default 0;

create table public.payment_status (
  id text primary key references public.guests(id) on delete cascade,
  start_at bigint not null default 0,
  due numeric(12,2) not null default 0,
  balance numeric(12,2) not null default 0,
  status text not null default 'pending' check (status in ('pending','partial','paid'))
);
create index payment_status_start_at_idx on public.payment_status (start_at);
alter table public.payment_status enable row level security;
create policy payment_status_select on public.payment_status for select to authenticated using ((select private.is_staff()));
revoke all on public.payment_status from anon;
revoke insert, update, delete, truncate, references, trigger on public.payment_status from authenticated;
grant select on public.payment_status to authenticated;

create or replace function private.sync_payment_status() returns trigger language plpgsql security definer set search_path = ''
as $$
declare v_due numeric; v_paid numeric; v_status text;
begin
  if tg_op = 'DELETE' then delete from public.payment_status where id = old.id; return old; end if;
  v_due := new.total + new.ext_total + new.adjust;
  v_paid := new.paid_amount;
  v_status := case when v_due <= 0 then 'paid' when v_paid >= v_due then 'paid' when v_paid <= 0 then 'pending' else 'partial' end;
  insert into public.payment_status (id, start_at, due, balance, status)
  values (new.id, new.start_at, v_due, greatest(v_due - v_paid, 0), v_status)
  on conflict (id) do update set start_at = excluded.start_at, due = excluded.due, balance = excluded.balance, status = excluded.status;
  return new;
end; $$;
revoke execute on function private.sync_payment_status() from public, anon, authenticated;
create trigger billing_sync_payment_status after insert or update or delete on public.billing
  for each row execute function private.sync_payment_status();

-- money recorded under the old cash/UPI/card boxes counts as received
update public.billing set paid_amount = cash + upi + card_amt where paid_amount = 0 and (cash + upi + card_amt) > 0;
update public.billing set paid_amount = paid_amount;

create or replace function public.billing_create(p jsonb) returns void language plpgsql security definer set search_path = ''
as $$
declare adm boolean := (select private.is_admin());
        v_total numeric := coalesce((p ->> 'total')::numeric, 0);
        v_paid boolean := coalesce((p ->> 'paid')::boolean, false);
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  insert into public.billing (id, start_at, play, socks, card, discount, disc_type, disc_val, total, ext_total, adjust, paid_amount, paid_by, paid_at)
  values (p ->> 'id', coalesce((p ->> 'start_at')::bigint, 0), coalesce((p ->> 'play')::numeric, 0), coalesce((p ->> 'socks')::numeric, 0), coalesce((p ->> 'card')::numeric, 0),
    case when adm then coalesce((p ->> 'discount')::numeric, 0) else 0 end,
    case when adm then coalesce(p ->> 'disc_type', 'none') else 'none' end,
    case when adm then coalesce((p ->> 'disc_val')::numeric, 0) else 0 end,
    v_total, 0, 0, case when v_paid then v_total else 0 end, p ->> 'paid_by',
    case when v_paid then (extract(epoch from now()) * 1000)::bigint end)
  on conflict (id) do nothing;
end; $$;

create or replace function public.billing_set_paid(p_id text, p_paid boolean, p_by text) returns void language plpgsql security definer set search_path = ''
as $$
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  update public.billing
     set paid_amount = case when p_paid then total + ext_total + adjust else 0 end,
         paid_at = (extract(epoch from now()) * 1000)::bigint, paid_by = p_by
   where id = p_id;
end; $$;
revoke execute on function public.billing_set_paid(text, boolean, text) from public, anon;
grant execute on function public.billing_set_paid(text, boolean, text) to authenticated;

alter publication supabase_realtime add table public.payment_status;


-- =====================================================================
-- PART 3 (already applied): Paid by Cash or Paid by UPI
-- =====================================================================
create or replace function public.billing_create(p jsonb) returns void language plpgsql security definer set search_path = ''
as $$
declare adm boolean := (select private.is_admin());
        v_total numeric := coalesce((p ->> 'total')::numeric, 0);
        v_paid boolean := coalesce((p ->> 'paid')::boolean, false);
        v_upi boolean := coalesce(p ->> 'pay_method', 'cash') = 'upi';
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  insert into public.billing (id, start_at, play, socks, card, discount, disc_type, disc_val, total, ext_total, adjust, cash, upi, card_amt, paid_amount, paid_by, paid_at)
  values (p ->> 'id', coalesce((p ->> 'start_at')::bigint, 0), coalesce((p ->> 'play')::numeric, 0), coalesce((p ->> 'socks')::numeric, 0), coalesce((p ->> 'card')::numeric, 0),
    case when adm then coalesce((p ->> 'discount')::numeric, 0) else 0 end,
    case when adm then coalesce(p ->> 'disc_type', 'none') else 'none' end,
    case when adm then coalesce((p ->> 'disc_val')::numeric, 0) else 0 end,
    v_total, 0, 0,
    case when v_paid and not v_upi then v_total else 0 end,
    case when v_paid and v_upi then v_total else 0 end, 0,
    case when v_paid then v_total else 0 end, p ->> 'paid_by',
    case when v_paid then (extract(epoch from now()) * 1000)::bigint end)
  on conflict (id) do nothing;
end; $$;

drop function if exists public.billing_set_paid(text, boolean, text);
create or replace function public.billing_set_paid(p_id text, p_paid boolean, p_by text, p_method text default 'cash')
returns void language plpgsql security definer set search_path = ''
as $$
declare v_bill numeric; v_paid numeric; v_rem numeric; v_upi boolean := coalesce(p_method, 'cash') = 'upi';
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  select total + ext_total + adjust, paid_amount into v_bill, v_paid from public.billing where id = p_id for update;
  if not found then return; end if;
  if p_paid then
    v_rem := greatest(v_bill - v_paid, 0);
    update public.billing set paid_amount = greatest(v_bill, 0),
           cash = cash + case when not v_upi then v_rem else 0 end,
           upi = upi + case when v_upi then v_rem else 0 end,
           paid_at = (extract(epoch from now()) * 1000)::bigint, paid_by = p_by where id = p_id;
  else
    update public.billing set paid_amount = 0, cash = 0, upi = 0, card_amt = 0,
           paid_at = (extract(epoch from now()) * 1000)::bigint, paid_by = p_by where id = p_id;
  end if;
end; $$;
revoke execute on function public.billing_set_paid(text, boolean, text, text) from public, anon;
grant execute on function public.billing_set_paid(text, boolean, text, text) to authenticated;


-- =====================================================================
-- PART 3 (already applied): final Cash / UPI handling and bill updates after edits.
-- These definitions replace the earlier versions of the same functions above.
-- =====================================================================
drop function if exists public.billing_set_paid(text, boolean, text);

-- creating a bill: Pending, or Paid by Cash / UPI (recorded in the cash and upi columns)
create or replace function public.billing_create(p jsonb) returns void language plpgsql security definer set search_path = ''
as $$
declare adm boolean := (select private.is_admin());
        v_total numeric := coalesce((p ->> 'total')::numeric, 0);
        v_paid boolean := coalesce((p ->> 'paid')::boolean, false);
        v_upi boolean := lower(coalesce(p ->> 'pay_method', 'cash')) = 'upi';
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  insert into public.billing (id, start_at, play, socks, card, discount, disc_type, disc_val, total, ext_total, adjust, paid_amount, cash, upi, card_amt, paid_by, paid_at)
  values (p ->> 'id', coalesce((p ->> 'start_at')::bigint, 0), coalesce((p ->> 'play')::numeric, 0), coalesce((p ->> 'socks')::numeric, 0), coalesce((p ->> 'card')::numeric, 0),
    case when adm then coalesce((p ->> 'discount')::numeric, 0) else 0 end,
    case when adm then coalesce(p ->> 'disc_type', 'none') else 'none' end,
    case when adm then coalesce((p ->> 'disc_val')::numeric, 0) else 0 end,
    v_total, 0, 0,
    case when v_paid then v_total else 0 end,
    case when v_paid and not v_upi then v_total else 0 end,
    case when v_paid and v_upi then v_total else 0 end,
    0, p ->> 'paid_by',
    case when v_paid then (extract(epoch from now()) * 1000)::bigint end)
  on conflict (id) do nothing;
end; $$;

-- marking Paid (adds what is still due to Cash or UPI) or Pending
create or replace function public.billing_set_paid(p_id text, p_paid boolean, p_by text, p_method text default 'cash')
returns void language plpgsql security definer set search_path = ''
as $$
declare v_bill numeric; v_paid numeric; v_rem numeric; v_upi boolean := coalesce(p_method, 'cash') = 'upi';
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  select total + ext_total + adjust, paid_amount into v_bill, v_paid from public.billing where id = p_id for update;
  if not found then return; end if;
  if p_paid then
    v_rem := greatest(v_bill - v_paid, 0);
    update public.billing
       set paid_amount = greatest(v_bill, 0),
           cash = cash + case when not v_upi then v_rem else 0 end,
           upi = upi + case when v_upi then v_rem else 0 end,
           paid_at = (extract(epoch from now()) * 1000)::bigint, paid_by = p_by
     where id = p_id;
  else
    update public.billing
       set paid_amount = 0, cash = 0, upi = 0, card_amt = 0,
           paid_at = (extract(epoch from now()) * 1000)::bigint, paid_by = p_by
     where id = p_id;
  end if;
end; $$;
revoke execute on function public.billing_set_paid(text, boolean, text, text) from public, anon;
grant execute on function public.billing_set_paid(text, boolean, text, text) to authenticated;

-- change only the payment method of what has been received (works after the participant has finished)
create or replace function public.billing_set_method(p_id text, p_method text)
returns void language plpgsql security definer set search_path = ''
as $$
declare v_upi boolean := lower(coalesce(p_method, '')) = 'upi';
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  if lower(coalesce(p_method, '')) not in ('cash', 'upi') then return; end if;
  update public.billing
     set cash = case when v_upi then 0 else paid_amount end,
         upi = case when v_upi then paid_amount else 0 end,
         card_amt = 0
   where id = p_id and paid_amount > 0;
end; $$;

-- recalculate the bill after socks / card / play area changes (the admin's discount rule stays: play time only)
create or replace function public.billing_update_items(p_id text, p_play numeric, p_socks numeric, p_card numeric)
returns void language plpgsql security definer set search_path = ''
as $$
declare r public.billing%rowtype; v_play numeric; v_socks numeric; v_card numeric; v_disc numeric;
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  select * into r from public.billing where id = p_id;
  if not found then return; end if;
  v_play := greatest(coalesce(p_play, 0), 0); v_socks := greatest(coalesce(p_socks, 0), 0); v_card := greatest(coalesce(p_card, 0), 0);
  v_disc := case r.disc_type when 'pct' then round(v_play * least(100, greatest(0, r.disc_val)) / 100)
                             when 'amt' then least(v_play, round(greatest(0, r.disc_val))) else 0 end;
  update public.billing set play = v_play, socks = v_socks, card = v_card, discount = v_disc, total = v_play - v_disc + v_socks + v_card where id = p_id;
end; $$;
revoke execute on function public.billing_set_method(text, text), public.billing_update_items(text, numeric, numeric, numeric) from public, anon;
grant execute on function public.billing_set_method(text, text), public.billing_update_items(text, numeric, numeric, numeric) to authenticated;


-- =====================================================================
-- PART 4 (already applied): staff can give discounts too (play time only)
-- =====================================================================
create or replace function public.billing_create(p jsonb) returns void language plpgsql security definer set search_path = ''
as $$
declare v_total numeric := coalesce((p ->> 'total')::numeric, 0);
        v_paid boolean := coalesce((p ->> 'paid')::boolean, false);
        v_upi boolean := lower(coalesce(p ->> 'pay_method', 'cash')) = 'upi';
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  insert into public.billing (id, start_at, play, socks, card, discount, disc_type, disc_val, total, ext_total, adjust, paid_amount, cash, upi, card_amt, paid_by, paid_at)
  values (p ->> 'id', coalesce((p ->> 'start_at')::bigint, 0), coalesce((p ->> 'play')::numeric, 0), coalesce((p ->> 'socks')::numeric, 0), coalesce((p ->> 'card')::numeric, 0),
    greatest(coalesce((p ->> 'discount')::numeric, 0), 0),
    case when lower(coalesce(p ->> 'disc_type', 'none')) in ('pct','amt') then lower(p ->> 'disc_type') else 'none' end,
    greatest(coalesce((p ->> 'disc_val')::numeric, 0), 0),
    v_total, 0, 0,
    case when v_paid then v_total else 0 end,
    case when v_paid and not v_upi then v_total else 0 end,
    case when v_paid and v_upi then v_total else 0 end,
    0, p ->> 'paid_by',
    case when v_paid then (extract(epoch from now()) * 1000)::bigint end)
  on conflict (id) do nothing;
end; $$;

create or replace function public.billing_set_discount(p_id text, p_type text, p_val numeric)
returns void language plpgsql security definer set search_path = ''
as $$
declare r public.billing%rowtype; v_type text; v_val numeric; v_disc numeric;
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  select * into r from public.billing where id = p_id for update;
  if not found then return; end if;
  v_type := case when lower(coalesce(p_type, 'none')) in ('pct','amt') then lower(p_type) else 'none' end;
  v_val := greatest(coalesce(p_val, 0), 0);
  v_disc := case v_type when 'pct' then round(r.play * least(100, v_val) / 100) when 'amt' then least(r.play, round(v_val)) else 0 end;
  update public.billing set disc_type = v_type, disc_val = case when v_type = 'none' then 0 else v_val end,
         discount = v_disc, total = r.play - v_disc + r.socks + r.card where id = p_id;
end; $$;
revoke execute on function public.billing_set_discount(text, text, numeric) from public, anon;
grant execute on function public.billing_set_discount(text, text, numeric) to authenticated;


-- =====================================================================
-- PART 5 (already applied): part payment (separate Cash and UPI amounts)
-- =====================================================================
create or replace function public.billing_create(p jsonb) returns void language plpgsql security definer set search_path = ''
as $$
declare v_total numeric := coalesce((p ->> 'total')::numeric, 0);
        v_paid boolean := coalesce((p ->> 'paid')::boolean, false);
        v_upi boolean := lower(coalesce(p ->> 'pay_method', 'cash')) = 'upi';
        v_part boolean := (p ? 'cash_amt') or (p ? 'upi_amt');
        v_pc numeric := 0; v_pu numeric := 0; v_cash numeric; v_upiv numeric; v_pa numeric;
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  if v_part then
    v_pc := least(greatest(coalesce((p ->> 'cash_amt')::numeric, 0), 0), v_total);
    v_pu := least(greatest(coalesce((p ->> 'upi_amt')::numeric, 0), 0), v_total - v_pc);
    v_cash := v_pc; v_upiv := v_pu; v_pa := v_pc + v_pu;
  else
    v_pa := case when v_paid then v_total else 0 end;
    v_cash := case when v_paid and not v_upi then v_total else 0 end;
    v_upiv := case when v_paid and v_upi then v_total else 0 end;
  end if;
  insert into public.billing (id, start_at, play, socks, card, discount, disc_type, disc_val, total, ext_total, adjust, paid_amount, cash, upi, card_amt, paid_by, paid_at)
  values (p ->> 'id', coalesce((p ->> 'start_at')::bigint, 0), coalesce((p ->> 'play')::numeric, 0), coalesce((p ->> 'socks')::numeric, 0), coalesce((p ->> 'card')::numeric, 0),
    greatest(coalesce((p ->> 'discount')::numeric, 0), 0),
    case when lower(coalesce(p ->> 'disc_type', 'none')) in ('pct','amt') then lower(p ->> 'disc_type') else 'none' end,
    greatest(coalesce((p ->> 'disc_val')::numeric, 0), 0),
    v_total, 0, 0, v_pa, v_cash, v_upiv, 0, p ->> 'paid_by',
    case when v_pa > 0 then (extract(epoch from now()) * 1000)::bigint end)
  on conflict (id) do nothing;
end; $$;

create or replace function public.billing_add_payment(p_id text, p_cash numeric, p_upi numeric, p_by text)
returns void language plpgsql security definer set search_path = ''
as $$
declare v_bill numeric; v_paid numeric; v_room numeric; v_c numeric; v_u numeric;
begin
  if not (select private.is_staff()) then raise exception 'not allowed' using errcode = '42501'; end if;
  select total + ext_total + adjust, paid_amount into v_bill, v_paid from public.billing where id = p_id for update;
  if not found then return; end if;
  v_room := greatest(v_bill - v_paid, 0);
  v_c := least(greatest(coalesce(p_cash, 0), 0), v_room);
  v_u := least(greatest(coalesce(p_upi, 0), 0), v_room - v_c);
  if v_c + v_u <= 0 then return; end if;
  update public.billing set cash = cash + v_c, upi = upi + v_u, paid_amount = paid_amount + v_c + v_u,
         paid_at = (extract(epoch from now()) * 1000)::bigint, paid_by = p_by where id = p_id;
end; $$;
revoke execute on function public.billing_add_payment(text, numeric, numeric, text) from public, anon;
grant execute on function public.billing_add_payment(text, numeric, numeric, text) to authenticated;


-- =====================================================================
-- PART 6 (already applied): price history
-- Each saved price change is a row "v_<start time in ms>" in app_pricing with its own start time (data.effectiveFrom).
-- An entry always uses the prices that were in effect when it checked in. The row "main" always holds the newest saved prices.
-- =====================================================================
insert into public.app_pricing (id, data)
select 'v_0', data || jsonb_build_object('effectiveFrom', 0, 'by', 'original prices')
from public.app_pricing where id = 'main'
on conflict (id) do nothing;

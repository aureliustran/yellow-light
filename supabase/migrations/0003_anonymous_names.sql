-- Đèn Vàng: anonymous commenters.
-- Run once in the Supabase SQL editor, AFTER 0002_analytics_moderation.sql.
--
--  * Every account gets a permanent anonymous number (#1001, #1002, …).
--  * New accounts are called "Ẩn danh". Their Google name and photo are NOT
--    copied any more. Readers can pick their own display name.
--  * Existing accounts that still carry the name Google gave them are reset to
--    "Ẩn danh", and every stored Google photo URL is removed.
--  * The author's (admin's) own name is left alone: rename it from the site.

-- ───────────────────────── Anonymous number ─────────────────────────

create sequence if not exists public.profiles_anon_no_seq;

alter table public.profiles add column if not exists anon_no integer;
alter table public.profiles add column if not exists display_name_changed_at timestamptz;

-- Number existing accounts in signup order.
update public.profiles p
set anon_no = (select coalesce(max(x.anon_no), 1000) from public.profiles x) + o.rn
from (select id, row_number() over (order by created_at, id) as rn
      from public.profiles where anon_no is null) o
where p.id = o.id;

select setval('public.profiles_anon_no_seq', (select coalesce(max(anon_no), 1000) from public.profiles));
alter table public.profiles alter column anon_no set default nextval('public.profiles_anon_no_seq');
alter table public.profiles alter column anon_no set not null;
create unique index if not exists profiles_anon_no_key on public.profiles (anon_no);
alter sequence public.profiles_anon_no_seq owned by public.profiles.anon_no;

alter table public.profiles alter column display_name set default 'Ẩn danh';

-- ───────────────────────── New accounts ─────────────────────────
-- Replaces the 0001 trigger function: no Google name, no Google photo.

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id);  -- name "Ẩn danh" and the number come from column defaults
  return new;
end $$;

-- ───────────────────────── Existing accounts ─────────────────────────

-- Only names that are still exactly what Google supplied; names readers chose stay.
update public.profiles p
set display_name = 'Ẩn danh'
from auth.users u
where u.id = p.id
  and not p.is_admin
  and (p.display_name = 'Độc giả'
       or p.display_name = left(coalesce(
            nullif(u.raw_user_meta_data ->> 'full_name', ''),
            nullif(u.raw_user_meta_data ->> 'name', ''),
            nullif(u.raw_user_meta_data ->> 'user_name', ''),
            nullif(split_part(coalesce(u.email, ''), '@', 1), ''),
            'Độc giả'), 60));

update public.profiles set avatar_url = null where avatar_url is not null;

-- ───────────────────────── Choosing a display name ─────────────────────────
-- Created after the clean-up above so that did not start anyone's cool-down.

create or replace function public.profiles_before_rename()
returns trigger language plpgsql security definer set search_path = public as $$
declare n text; k text;
begin
  if new.display_name is not distinct from old.display_name then return new; end if;
  n := regexp_replace(btrim(new.display_name), '\s+', ' ', 'g');
  new.display_name := n;
  if n ~ '[[:cntrl:]]' or char_length(n) not between 2 and 30 then
    raise exception 'Tên hiển thị phải dài 2–30 ký tự và không có ký tự điều khiển.';
  end if;
  if not public.is_admin() then
    k := lower(replace(n, ' ', ''));
    if k = any (array['admin', 'administrator', 'mod', 'moderator', 'quảntrị', 'quảntrịviên', 'quantri', 'quantrivien',
                      'tácgiả', 'tacgia', 'đènvàng', 'denvang', 'hệthống', 'hethong'])
       or exists (select 1 from public.profiles a
                  where a.is_admin and a.id <> new.id and lower(replace(a.display_name, ' ', '')) = k) then
      raise exception 'Tên này được dành riêng, hãy chọn tên khác.';
    end if;
    if exists (select 1 from public.blocked_terms t where position(t.term in lower(n)) > 0) then
      raise exception 'Tên chứa từ không được phép.';
    end if;
    if old.display_name_changed_at > now() - interval '10 minutes' then
      raise exception 'Bạn vừa đổi tên, thử lại sau ít phút.';
    end if;
    new.display_name_changed_at := now();
  end if;
  return new;
end $$;

drop trigger if exists profiles_before_rename on public.profiles;
create trigger profiles_before_rename
  before update of display_name on public.profiles
  for each row execute function public.profiles_before_rename();
revoke execute on function public.profiles_before_rename() from public, anon, authenticated;

-- Admin tool: put an offensive or impersonating name back to "Ẩn danh".
create or replace function public.admin_reset_display_name(p_user uuid, p_reason text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  perform public.admin_guard();
  if exists (select 1 from public.profiles where id = p_user and is_admin) then
    raise exception 'Không thể đổi tên tài khoản quản trị.';
  end if;
  update public.profiles set display_name = 'Ẩn danh' where id = p_user;
  insert into public.moderation_log (action, user_id, note) values ('reset_name', p_user, p_reason);
end $$;
revoke execute on function public.admin_reset_display_name(uuid, text) from public, anon;
grant  execute on function public.admin_reset_display_name(uuid, text) to authenticated;

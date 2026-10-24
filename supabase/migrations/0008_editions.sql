-- Đèn Vàng: editions. The story is being rewritten (v2); the first version
-- (v1) stays readable as "Legacy". See docs/plan-legacy.md.
-- Run once in the Supabase SQL editor, AFTER 0007_crosspost_truyennhaong.sql.
-- Safe to run before deploying the new site code: every existing chapter
-- becomes v1, and the old site keeps working.
--
--  * chapters.edition: 'v1' or 'v2'. Which one the site shows first is set in
--    src/config.ts (editions.current), not here.
--  * Web addresses and positions are unique per edition, so v2 can reuse a
--    slug and number its chapters from the start.
--  * A chapter cannot move to another edition after it is created.
--  * reorder_chapters takes the chapters of one edition.
--  * get_story_stats(p_edition) counts views of one edition (null = all).
--    The story rating stays one rating for the whole work.

-- ───────────────────────── Column and keys ─────────────────────────

-- The default stays 'v1' so a chapter created by code that does not know about
-- editions yet lands where the site shows it. The site code always sends it.
alter table public.chapters add column if not exists edition text not null default 'v1'
  check (edition in ('v1', 'v2'));

alter table public.chapters drop constraint if exists chapters_position_key;
alter table public.chapters add constraint chapters_position_key
  unique (edition, position) deferrable initially deferred;

alter table public.chapters drop constraint if exists chapters_slug_key;
alter table public.chapters add constraint chapters_slug_key unique (edition, slug);

-- ───────────────────────── Writes ─────────────────────────

create or replace function public.chapters_before_write()
returns trigger language plpgsql as $$
begin
  if tg_op = 'UPDATE' and new.edition is distinct from old.edition then
    raise exception 'Không chuyển được chương sang bản khác.';
  end if;
  if tg_op = 'INSERT' and new.position is null then
    select coalesce(max(position), 0) + 1 into new.position
    from public.chapters where edition = new.edition;
  end if;
  if new.status = 'published' and new.publish_at is null then
    new.publish_at := now();
  end if;
  new.updated_at := now();
  return new;
end $$;

-- Save a new order for one edition. p_ids must list every chapter of that
-- edition exactly once, first to last; the edition is the first chapter's.
create or replace function public.reorder_chapters(p_ids uuid[])
returns void language plpgsql security definer set search_path = public as $$
declare v_edition text;
begin
  if not public.is_admin() then
    raise exception 'Không có quyền.' using errcode = '42501';
  end if;
  select c.edition into v_edition from public.chapters c where c.id = p_ids[1];
  if v_edition is null
     or (select count(*) from public.chapters c where c.edition = v_edition) <> coalesce(array_length(p_ids, 1), 0)
     or exists (select 1 from public.chapters c where c.edition = v_edition and not (c.id = any (p_ids))) then
    raise exception 'Danh sách phải có đủ mọi chương của bản này, mỗi chương một lần.';
  end if;
  update public.chapters c
     set position = t.ord::int
    from unnest(p_ids) with ordinality as t (id, ord)
   where c.id = t.id;
end $$;

-- ───────────────────────── Stats ─────────────────────────

drop function if exists public.get_story_stats();
create or replace function public.get_story_stats(p_edition text default null)
returns table (views bigint, rating_avg numeric, rating_count bigint)
language sql stable security definer set search_path = public as $$
  select
    coalesce((select sum(v.views) from public.chapter_views v
              join public.chapters c on c.id = v.chapter_id
              where public.chapter_is_public(v.chapter_id)
                and (p_edition is null or c.edition = p_edition)), 0)::bigint,
    (select round(avg(s.stars), 1) from public.story_ratings s),
    (select count(*) from public.story_ratings s)
$$;
grant execute on function public.get_story_stats(text) to anon, authenticated;

-- Same as 0002, plus the edition; newest edition first, then story order.
drop function if exists public.admin_chapter_stats();
create or replace function public.admin_chapter_stats()
returns table (
  chapter_id uuid, edition text, kind text, title text, pos integer, is_public boolean,
  views bigint, readers bigint, avg_progress integer, completion integer,
  rating_avg numeric, rating_count bigint, comments bigint, hidden bigint)
language plpgsql stable security definer set search_path = public as $$
#variable_conflict use_column
begin
  perform public.admin_guard();
  return query
  select c.id, c.edition, c.kind, c.title, c.position, public.chapter_is_public(c.id),
    coalesce(v.views, 0)::bigint,
    (select count(distinct e.session_id) from public.view_events e where e.chapter_id = c.id),
    coalesce((select round(avg(e.progress)) from public.view_events e where e.chapter_id = c.id), 0)::integer,
    coalesce((select round(100.0 * count(*) filter (where e.finished) / nullif(count(*), 0))
              from public.view_events e where e.chapter_id = c.id), 0)::integer,
    (select round(avg(r.stars), 1) from public.ratings r where r.chapter_id = c.id),
    (select count(*) from public.ratings r where r.chapter_id = c.id),
    (select count(*) from public.comments m where m.chapter_id = c.id and m.status = 'visible'),
    (select count(*) from public.comments m where m.chapter_id = c.id and m.status = 'hidden')
  from public.chapters c
  left join public.chapter_views v on v.chapter_id = c.id
  order by c.edition desc, c.position;
end $$;
revoke execute on function public.admin_chapter_stats() from public, anon;
grant  execute on function public.admin_chapter_stats() to authenticated;

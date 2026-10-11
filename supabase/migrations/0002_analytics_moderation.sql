-- Đèn Vàng: reader analytics, comment moderation, bans and rating oversight.
-- Run once in the Supabase SQL editor, AFTER 0001_init.sql.
-- Safe to run before deploying the new site code: the old site keeps working.

-- ───────────────────────── Helpers ─────────────────────────

alter table public.profiles add column if not exists banned_until timestamptz;

create or replace function public.is_banned()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((select p.banned_until > now() from public.profiles p where p.id = auth.uid()), false)
$$;
grant execute on function public.is_banned() to anon, authenticated;

-- Used at the top of every admin_* function. Not callable from outside.
create or replace function public.admin_guard()
returns void language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then
    raise exception 'forbidden' using errcode = '42501';
  end if;
end $$;
revoke execute on function public.admin_guard() from public, anon, authenticated;

-- ───────────────────────── Reading events ─────────────────────────
-- One row per browser per chapter per 12 hours. No IP address, no cookies:
-- session_id is a random value the reader's browser makes up for itself.

create table public.view_events (
  id         bigint generated always as identity primary key,
  chapter_id uuid not null references public.chapters (id) on delete cascade,
  session_id text not null check (char_length(session_id) between 8 and 64),
  created_at timestamptz not null default now(),
  device     text not null default 'other',
  browser    text not null default 'other',
  os         text not null default 'other',
  referrer   text not null default 'direct',
  user_id    uuid references public.profiles (id) on delete set null,
  progress   smallint not null default 0 check (progress between 0 and 100),
  finished   boolean not null default false
);

create index view_events_created_idx on public.view_events (created_at);
create index view_events_chapter_idx on public.view_events (chapter_id, created_at);
create index view_events_session_idx on public.view_events (session_id, chapter_id, created_at desc);

alter table public.view_events enable row level security;
revoke all on public.view_events from anon, authenticated;   -- only the functions below touch it

-- Old events are folded into this table by rollup_view_events() so the free
-- database does not fill up.
create table public.view_daily (
  day        date not null,
  chapter_id uuid not null references public.chapters (id) on delete cascade,
  device     text not null,
  views      bigint not null,
  uniques    bigint not null,
  finished   bigint not null default 0,
  primary key (day, chapter_id, device)
);
alter table public.view_daily enable row level security;
revoke all on public.view_daily from anon, authenticated;

create or replace function public.record_view_event(
  p_chapter uuid, p_session text,
  p_device text default 'other', p_browser text default 'other',
  p_os text default 'other', p_referrer text default 'direct')
returns bigint language plpgsql security definer set search_path = public as $$
declare
  ua text := coalesce(nullif(current_setting('request.headers', true), '')::json ->> 'user-agent', '');
  ev bigint;
begin
  if not public.chapter_is_public(p_chapter) then return null; end if;
  if p_session is null or char_length(p_session) not between 8 and 64 then return null; end if;
  if ua ~* '(bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|curl|wget|python-requests)' then
    return null;
  end if;

  -- The same browser opening the same chapter again within 12 hours is one view.
  select e.id into ev from public.view_events e
  where e.chapter_id = p_chapter and e.session_id = p_session and e.created_at > now() - interval '12 hours'
  order by e.id desc limit 1;
  if ev is not null then return ev; end if;

  -- Flood guard.
  if (select count(*) from public.view_events
      where session_id = p_session and created_at > now() - interval '1 hour') >= 60 then
    return null;
  end if;

  insert into public.view_events (chapter_id, session_id, device, browser, os, referrer, user_id)
  values (
    p_chapter, p_session,
    case when p_device in ('mobile', 'tablet', 'desktop') then p_device else 'other' end,
    left(coalesce(nullif(p_browser, ''), 'other'), 30),
    left(coalesce(nullif(p_os, ''), 'other'), 30),
    left(coalesce(nullif(p_referrer, ''), 'direct'), 80),
    auth.uid())
  returning id into ev;

  -- The public read counter shown on the site.
  insert into public.chapter_views (chapter_id, views) values (p_chapter, 1)
  on conflict (chapter_id) do update set views = public.chapter_views.views + 1;
  return ev;
end $$;

-- How far down the chapter the reader got. Only ever goes up.
create or replace function public.update_view_progress(
  p_event bigint, p_session text, p_progress integer, p_finished boolean default false)
returns void language sql security definer set search_path = public as $$
  update public.view_events
  set progress = greatest(progress, least(100, greatest(0, p_progress)))::smallint,
      finished = finished or coalesce(p_finished, false)
  where id = p_event and session_id = p_session
$$;

grant execute on function public.record_view_event(uuid, text, text, text, text, text) to anon, authenticated;
grant execute on function public.update_view_progress(bigint, text, integer, boolean) to anon, authenticated;

-- Fold events older than p_keep_days (whole Vietnam-time days) into view_daily.
-- Called by the weekly GitHub Action with the service-role key.
create or replace function public.rollup_view_events(p_keep_days integer default 90)
returns bigint language plpgsql security definer set search_path = public as $$
declare cutoff timestamptz; n bigint;
begin
  if p_keep_days < 7 then raise exception 'p_keep_days must be at least 7'; end if;
  cutoff := (date_trunc('day', now() at time zone 'Asia/Bangkok') - make_interval(days => p_keep_days))
            at time zone 'Asia/Bangkok';
  insert into public.view_daily (day, chapter_id, device, views, uniques, finished)
  select (created_at at time zone 'Asia/Bangkok')::date, chapter_id, device,
         count(*), count(distinct session_id), count(*) filter (where finished)
  from public.view_events where created_at < cutoff
  group by 1, 2, 3
  on conflict (day, chapter_id, device) do update
    set views = public.view_daily.views + excluded.views,
        uniques = public.view_daily.uniques + excluded.uniques,
        finished = public.view_daily.finished + excluded.finished;
  get diagnostics n = row_count;
  delete from public.view_events where created_at < cutoff;
  return n;
end $$;
revoke execute on function public.rollup_view_events(integer) from public, anon, authenticated;

-- ───────────────────────── Comment moderation ─────────────────────────

alter table public.comments add column if not exists status text not null default 'visible'
  check (status in ('visible', 'hidden'));
alter table public.comments add column if not exists hidden_reason text;
alter table public.comments add column if not exists hidden_at timestamptz;
create index if not exists comments_status_idx on public.comments (status, created_at desc);

-- Readers see visible comments and their own; the admin sees everything.
drop policy if exists "read comments" on public.comments;
create policy "read comments" on public.comments for select using (
  public.is_admin()
  or user_id = auth.uid()
  or (status = 'visible' and public.chapter_is_public(chapter_id))
);

-- Words that are not allowed in comments (lower case). Admin only.
create table public.blocked_terms (
  term       text primary key check (term = lower(btrim(term)) and char_length(term) between 2 and 60),
  created_at timestamptz not null default now()
);
alter table public.blocked_terms enable row level security;
revoke all on public.blocked_terms from anon, authenticated;
grant select, insert, delete on public.blocked_terms to authenticated;
create policy "admin reads terms"   on public.blocked_terms for select using (public.is_admin());
create policy "admin adds terms"    on public.blocked_terms for insert with check (public.is_admin());
create policy "admin removes terms" on public.blocked_terms for delete using (public.is_admin());

-- Reader reports. One per reader per comment. Only the admin reads them.
create table public.comment_reports (
  comment_id  uuid not null references public.comments (id) on delete cascade,
  reporter_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  reason      text not null default '' check (char_length(reason) <= 300),
  created_at  timestamptz not null default now(),
  primary key (comment_id, reporter_id)
);
alter table public.comment_reports enable row level security;
revoke all on public.comment_reports from anon, authenticated;
grant select, insert, delete on public.comment_reports to authenticated;
create policy "report a comment" on public.comment_reports for insert with check (
  reporter_id = auth.uid()
  and not public.is_banned()
  and exists (select 1 from public.comments c where c.id = comment_id and public.chapter_is_public(c.chapter_id))
);
create policy "admin reads reports"  on public.comment_reports for select using (public.is_admin());
create policy "admin clears reports" on public.comment_reports for delete using (public.is_admin());

-- What the admin did, for later.
create table public.moderation_log (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  admin_id   uuid default auth.uid(),
  action     text not null,
  comment_id uuid,
  user_id    uuid,
  note       text
);
alter table public.moderation_log enable row level security;
revoke all on public.moderation_log from anon, authenticated;
grant select on public.moderation_log to authenticated;
create policy "admin reads log" on public.moderation_log for select using (public.is_admin());

-- Replaces the 0001 trigger: adds the ban check, a link limit, duplicate
-- detection and the blocked-word list. The admin is exempt.
create or replace function public.comments_before_insert()
returns trigger language plpgsql security definer set search_path = public as $$
declare p record;
begin
  new.body := btrim(new.body);
  new.status := 'visible';
  new.hidden_reason := null;
  new.hidden_at := null;
  if new.parent_id is not null then
    select chapter_id, parent_id into p from public.comments where id = new.parent_id;
    if not found or p.chapter_id <> new.chapter_id then
      raise exception 'Bình luận gốc không hợp lệ.';
    end if;
    if p.parent_id is not null then
      new.parent_id := p.parent_id;  -- reply to a reply joins the same thread
    end if;
  end if;
  if not public.is_admin() then
    if public.is_banned() then
      raise exception 'Tài khoản của bạn đang bị tạm khóa bình luận.';
    end if;
    if exists (select 1 from public.comments
               where user_id = new.user_id and created_at > now() - interval '15 seconds') then
      raise exception 'Bạn bình luận nhanh quá, đợi vài giây nhé.';
    end if;
    if (select count(*) from public.comments
        where user_id = new.user_id and created_at > now() - interval '1 day') >= 100 then
      raise exception 'Hôm nay bạn đã bình luận đủ nhiều rồi.';
    end if;
    if (char_length(new.body) - char_length(replace(lower(new.body), 'http', ''))) / 4 > 2 then
      raise exception 'Bình luận có quá nhiều liên kết (tối đa 2).';
    end if;
    if exists (select 1 from public.comments
               where user_id = new.user_id and body = new.body and created_at > now() - interval '10 minutes') then
      raise exception 'Bạn vừa gửi bình luận giống hệt.';
    end if;
    if exists (select 1 from public.blocked_terms t where position(t.term in lower(new.body)) > 0) then
      raise exception 'Bình luận chứa từ không được phép.';
    end if;
  end if;
  return new;
end $$;

-- Banned accounts cannot rate either.
drop policy if exists "add own rating" on public.ratings;
create policy "add own rating" on public.ratings for insert
  with check (user_id = auth.uid() and not public.is_banned() and public.chapter_is_public(chapter_id));
drop policy if exists "change own rating" on public.ratings;
create policy "change own rating" on public.ratings for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and not public.is_banned() and public.chapter_is_public(chapter_id));
drop policy if exists "add own story rating" on public.story_ratings;
create policy "add own story rating" on public.story_ratings for insert
  with check (user_id = auth.uid() and not public.is_banned());
drop policy if exists "change own story rating" on public.story_ratings;
create policy "change own story rating" on public.story_ratings for update
  using (user_id = auth.uid()) with check (user_id = auth.uid() and not public.is_banned());

-- The public comment count no longer includes hidden comments.
create or replace function public.get_chapter_stats(p_chapter uuid)
returns table (views bigint, rating_avg numeric, rating_count bigint, comment_count bigint)
language sql stable security definer set search_path = public as $$
  select
    coalesce((select v.views from public.chapter_views v where v.chapter_id = p_chapter), 0),
    (select round(avg(r.stars), 1) from public.ratings r where r.chapter_id = p_chapter),
    (select count(*) from public.ratings r where r.chapter_id = p_chapter),
    (select count(*) from public.comments c where c.chapter_id = p_chapter and c.status = 'visible')
  where public.chapter_is_public(p_chapter)
$$;

-- ───────────────────────── Admin functions ─────────────────────────
-- All of these refuse anyone who is not the admin.

create or replace function public.admin_overview()
returns jsonb language plpgsql stable security definer set search_path = public as $$
#variable_conflict use_column
declare
  d0 timestamptz := (date_trunc('day', now() at time zone 'Asia/Bangkok')) at time zone 'Asia/Bangkok';
  r jsonb;
begin
  perform public.admin_guard();
  select jsonb_build_object(
    'views_today',    (select count(*) from public.view_events where created_at >= d0),
    'views_7d',       (select count(*) from public.view_events where created_at >= d0 - interval '6 days'),
    'views_30d',      (select count(*) from public.view_events where created_at >= d0 - interval '29 days'),
    'readers_today',  (select count(distinct session_id) from public.view_events where created_at >= d0),
    'readers_7d',     (select count(distinct session_id) from public.view_events where created_at >= d0 - interval '6 days'),
    'readers_30d',    (select count(distinct session_id) from public.view_events where created_at >= d0 - interval '29 days'),
    'views_total',    (select coalesce(sum(views), 0) from public.chapter_views),
    'users_total',    (select count(*) from public.profiles),
    'users_new_7d',   (select count(*) from public.profiles where created_at >= d0 - interval '6 days'),
    'comments_7d',    (select count(*) from public.comments where created_at >= d0 - interval '6 days'),
    'comments_hidden',(select count(*) from public.comments where status = 'hidden'),
    'reports_open',   (select count(distinct r.comment_id) from public.comment_reports r
                       join public.comments c on c.id = r.comment_id where c.status = 'visible'),
    'ratings_7d',     (select count(*) from public.ratings where updated_at >= d0 - interval '6 days')
                    + (select count(*) from public.story_ratings where updated_at >= d0 - interval '6 days'),
    'story_rating_avg',   (select round(avg(stars), 1) from public.story_ratings),
    'story_rating_count', (select count(*) from public.story_ratings),
    'banned_users',   (select count(*) from public.profiles where banned_until > now())
  ) into r;
  return r;
end $$;

create or replace function public.admin_views_by_day(p_days integer default 30)
returns table (day date, views bigint, readers bigint)
language plpgsql stable security definer set search_path = public as $$
#variable_conflict use_column
declare today date := (now() at time zone 'Asia/Bangkok')::date;
begin
  perform public.admin_guard();
  p_days := least(greatest(coalesce(p_days, 30), 1), 365);
  return query
  with days as (
    select g::date as day from generate_series(today - (p_days - 1), today, interval '1 day') g
  ),
  ev as (
    select (created_at at time zone 'Asia/Bangkok')::date as day,
           count(*) as v, count(distinct session_id) as r
    from public.view_events group by 1
  ),
  dl as (select d.day, sum(d.views) as v from public.view_daily d group by 1)
  select days.day, (coalesce(ev.v, 0) + coalesce(dl.v, 0))::bigint, coalesce(ev.r, 0)::bigint
  from days left join ev on ev.day = days.day left join dl on dl.day = days.day
  order by days.day;
end $$;

create or replace function public.admin_chapter_stats()
returns table (
  chapter_id uuid, kind text, title text, pos integer, is_public boolean,
  views bigint, readers bigint, avg_progress integer, completion integer,
  rating_avg numeric, rating_count bigint, comments bigint, hidden bigint)
language plpgsql stable security definer set search_path = public as $$
#variable_conflict use_column
begin
  perform public.admin_guard();
  return query
  select c.id, c.kind, c.title, c.position, public.chapter_is_public(c.id),
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
  order by c.position;
end $$;

create or replace function public.admin_breakdown(p_days integer default 30)
returns jsonb language plpgsql stable security definer set search_path = public as $$
#variable_conflict use_column
declare
  since timestamptz;
begin
  perform public.admin_guard();
  p_days := least(greatest(coalesce(p_days, 30), 1), 365);
  since := (date_trunc('day', now() at time zone 'Asia/Bangkok')) at time zone 'Asia/Bangkok' - (p_days - 1) * interval '1 day';
  return jsonb_build_object(
    'device', (select coalesce(jsonb_agg(jsonb_build_object('k', k, 'n', n) order by n desc), '[]'::jsonb)
               from (select device as k, count(*) as n from public.view_events where created_at >= since group by 1) t),
    'browser', (select coalesce(jsonb_agg(jsonb_build_object('k', k, 'n', n) order by n desc), '[]'::jsonb)
                from (select browser as k, count(*) as n from public.view_events where created_at >= since
                      group by 1 order by 2 desc limit 8) t),
    'os', (select coalesce(jsonb_agg(jsonb_build_object('k', k, 'n', n) order by n desc), '[]'::jsonb)
           from (select os as k, count(*) as n from public.view_events where created_at >= since
                 group by 1 order by 2 desc limit 8) t),
    'referrer', (select coalesce(jsonb_agg(jsonb_build_object('k', k, 'n', n) order by n desc), '[]'::jsonb)
                 from (select referrer as k, count(*) as n from public.view_events where created_at >= since
                       group by 1 order by 2 desc limit 10) t),
    'hours', (select jsonb_agg(coalesce(h.n, 0) order by g.hr)
              from generate_series(0, 23) as g(hr)
              left join (select extract(hour from created_at at time zone 'Asia/Bangkok')::integer as hr, count(*) as n
                         from public.view_events where created_at >= since group by 1) h on h.hr = g.hr)
  );
end $$;

create or replace function public.admin_comments(
  p_filter text default 'all', p_limit integer default 40, p_before timestamptz default null)
returns table (
  id uuid, chapter_id uuid, chapter_title text, parent_id uuid, user_id uuid,
  author text, email text, body text, created_at timestamptz, status text,
  hidden_reason text, report_count bigint, report_reasons text[], banned_until timestamptz)
language plpgsql stable security definer set search_path = public as $$
#variable_conflict use_column
begin
  perform public.admin_guard();
  return query
  select m.id, m.chapter_id, c.title, m.parent_id, m.user_id,
    p.display_name, u.email::text, m.body, m.created_at, m.status, m.hidden_reason,
    (select count(*) from public.comment_reports r where r.comment_id = m.id),
    coalesce((select array_agg(r.reason) filter (where r.reason <> '')
              from public.comment_reports r where r.comment_id = m.id), '{}'::text[]),
    p.banned_until
  from public.comments m
  join public.chapters c on c.id = m.chapter_id
  join public.profiles p on p.id = m.user_id
  left join auth.users u on u.id = m.user_id
  where (p_before is null or m.created_at < p_before)
    and (p_filter = 'all'
         or (p_filter = 'hidden' and m.status = 'hidden')
         or (p_filter = 'reported' and exists (select 1 from public.comment_reports r where r.comment_id = m.id)))
  order by m.created_at desc
  limit least(greatest(coalesce(p_limit, 40), 1), 100);
end $$;

create or replace function public.admin_set_comment_status(p_id uuid, p_status text, p_reason text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  perform public.admin_guard();
  if p_status not in ('visible', 'hidden') then raise exception 'bad status'; end if;
  update public.comments
  set status = p_status,
      hidden_reason = case when p_status = 'hidden' then left(nullif(btrim(p_reason), ''), 200) end,
      hidden_at = case when p_status = 'hidden' then now() end
  where id = p_id;
  if p_status = 'visible' then
    delete from public.comment_reports where comment_id = p_id;  -- reviewed
  end if;
  insert into public.moderation_log (action, comment_id, note)
  values (case when p_status = 'hidden' then 'hide_comment' else 'restore_comment' end, p_id, p_reason);
end $$;

-- p_days > 0 bans for that many days, -1 forever, 0 or null lifts the ban.
create or replace function public.admin_ban_user(p_user uuid, p_days integer, p_reason text default null)
returns timestamptz language plpgsql security definer set search_path = public as $$
declare until_at timestamptz;
begin
  perform public.admin_guard();
  if exists (select 1 from public.profiles where id = p_user and is_admin) then
    raise exception 'Không thể khóa tài khoản quản trị.';
  end if;
  if p_days is null or p_days = 0 then until_at := null;
  elsif p_days < 0 then until_at := 'infinity';
  else until_at := now() + make_interval(days => p_days);
  end if;
  update public.profiles set banned_until = until_at where id = p_user;
  insert into public.moderation_log (action, user_id, note)
  values (case when until_at is null then 'unban_user' else 'ban_user' end, p_user, p_reason);
  return until_at;
end $$;

create or replace function public.admin_ratings(p_limit integer default 50, p_before timestamptz default null)
returns table (
  user_id uuid, author text, email text, chapter_id uuid, chapter_title text,
  stars smallint, rated_at timestamptz, suspect text, banned_until timestamptz)
language plpgsql stable security definer set search_path = public as $$
#variable_conflict use_column
begin
  perform public.admin_guard();
  return query
  with all_r as (
    select r.user_id, r.chapter_id, r.stars, r.updated_at from public.ratings r
    union all
    select s.user_id, null::uuid, s.stars, s.updated_at from public.story_ratings s
  )
  select a.user_id, p.display_name, u.email::text, a.chapter_id,
    coalesce(c.title, 'Cả truyện'), a.stars, a.updated_at,
    case
      when (select count(*) from all_r b where b.user_id = a.user_id
            and b.updated_at between a.updated_at - interval '10 minutes' and a.updated_at + interval '10 minutes') >= 5
        then 'burst'
      when (select count(*) from all_r b where b.user_id = a.user_id) >= 3
           and (select max(b.stars) from all_r b where b.user_id = a.user_id) = 1
        then 'all-low'
    end,
    p.banned_until
  from all_r a
  join public.profiles p on p.id = a.user_id
  left join public.chapters c on c.id = a.chapter_id
  left join auth.users u on u.id = a.user_id
  where p_before is null or a.updated_at < p_before
  order by a.updated_at desc
  limit least(greatest(coalesce(p_limit, 50), 1), 200);
end $$;

create or replace function public.admin_rating_summary()
returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  perform public.admin_guard();
  return jsonb_build_object(
    'chapters', (select jsonb_agg(coalesce(x.n, 0) order by g.s)
                 from generate_series(1, 5) as g(s)
                 left join (select stars, count(*) as n from public.ratings group by 1) x on x.stars = g.s),
    'story', (select jsonb_agg(coalesce(x.n, 0) order by g.s)
              from generate_series(1, 5) as g(s)
              left join (select stars, count(*) as n from public.story_ratings group by 1) x on x.stars = g.s)
  );
end $$;

create or replace function public.admin_remove_rating(p_user uuid, p_chapter uuid default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  perform public.admin_guard();
  if p_chapter is null then
    delete from public.story_ratings where user_id = p_user;
  else
    delete from public.ratings where user_id = p_user and chapter_id = p_chapter;
  end if;
  insert into public.moderation_log (action, user_id, comment_id, note)
  values ('remove_rating', p_user, p_chapter, case when p_chapter is null then 'story rating' else 'chapter rating' end);
end $$;

do $$
declare f text;
begin
  foreach f in array array[
    'admin_overview()', 'admin_views_by_day(integer)', 'admin_chapter_stats()', 'admin_breakdown(integer)',
    'admin_comments(text, integer, timestamptz)', 'admin_set_comment_status(uuid, text, text)',
    'admin_ban_user(uuid, integer, text)', 'admin_ratings(integer, timestamptz)',
    'admin_rating_summary()', 'admin_remove_rating(uuid, uuid)']
  loop
    execute format('revoke execute on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;

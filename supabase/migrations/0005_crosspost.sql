-- Cross-posting chapters to other reading sites (rookies.vn first).
--
-- How it fits together:
--   * crosspost_sites   one row per site: how many chapters to show there (teaser).
--   * crosspost_posts   one row per (site, chapter): the converted text for that site,
--                       and once posted, the id of the chapter on that site.
--                       The primary key makes a second record for the same chapter impossible.
--   * crosspost_jobs    the queue. /admin/crosspost adds jobs; the worker on the author's
--                       computer (npm run crosspost:worker) takes them one at a time.
--                       At most one open job per (site, chapter).
--   * crosspost_workers heartbeat, so the admin page can say whether the worker is running.
--
-- Run once in Supabase → SQL Editor.

create table public.crosspost_sites (
  site          text primary key check (site ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name          text not null,
  teaser_limit  integer check (teaser_limit is null or teaser_limit >= 0), -- numbered chapters shown there; null = all
  default_mode  text not null default 'publish' check (default_mode in ('publish', 'draft')),
  enabled       boolean not null default true
);

insert into public.crosspost_sites (site, name, teaser_limit, default_mode)
values ('rookies', 'Rookies.vn', 5, 'publish');

create table public.crosspost_posts (
  site            text not null references public.crosspost_sites (site) on delete cascade,
  chapter_id      uuid not null references public.chapters (id) on delete cascade,
  source_hash     text not null,                 -- the Vercel chapter this conversion was made from
  converted_body  text not null,                 -- the site's version, without title and footer
  converted_at    timestamptz not null default now(),
  check_report    jsonb,                         -- result of the automatic checks
  remote_id       text,                          -- the chapter's id on the other site
  remote_url      text,
  posted_hash     text,                          -- hash of exactly what was last sent (title + text + footer)
  posted_mode     text check (posted_mode is null or posted_mode in ('publish', 'draft')),
  posted_at       timestamptz,
  pending_since   timestamptz,                   -- set just before a new chapter is submitted
  last_error      text,
  primary key (site, chapter_id)
);
-- One local chapter per remote chapter, too.
create unique index crosspost_posts_remote_key on public.crosspost_posts (site, remote_id) where remote_id is not null;

create table public.crosspost_jobs (
  id            bigint generated always as identity primary key,
  site          text not null references public.crosspost_sites (site) on delete cascade,
  chapter_id    uuid not null references public.chapters (id) on delete cascade,
  mode          text not null default 'publish' check (mode in ('publish', 'draft')),
  status        text not null default 'queued' check (status in ('queued', 'running', 'done', 'failed', 'cancelled')),
  result        text,                            -- created | updated | adopted | unchanged
  error         text,
  requested_by  uuid default auth.uid(),
  worker        text,
  created_at    timestamptz not null default now(),
  started_at    timestamptz,
  finished_at   timestamptz
);
-- Pressing "Đồng bộ" twice, or from two tabs, can never queue the same chapter twice.
create unique index crosspost_jobs_one_open on public.crosspost_jobs (site, chapter_id) where status in ('queued', 'running');
create index crosspost_jobs_recent on public.crosspost_jobs (site, created_at desc);

create table public.crosspost_workers (
  worker     text primary key,
  site       text not null,
  last_seen  timestamptz not null default now(),
  info       text
);

alter table public.crosspost_sites   enable row level security;
alter table public.crosspost_posts   enable row level security;
alter table public.crosspost_jobs    enable row level security;
alter table public.crosspost_workers enable row level security;

-- The admin reads everything and may change a site's teaser limit and default.
-- Everything else is written by the worker with the service role key, or through
-- the two functions below.
create policy "admin reads sites"   on public.crosspost_sites   for select using (public.is_admin());
create policy "admin edits sites"   on public.crosspost_sites   for update using (public.is_admin()) with check (public.is_admin());
create policy "admin reads posts"   on public.crosspost_posts   for select using (public.is_admin());
create policy "admin reads jobs"    on public.crosspost_jobs    for select using (public.is_admin());
create policy "admin reads workers" on public.crosspost_workers for select using (public.is_admin());

-- Queue chapters. Chapters that already have an open job are skipped, not doubled.
-- Returns how many jobs were added.
create or replace function public.crosspost_enqueue(p_site text, p_chapters uuid[], p_mode text default 'publish')
returns integer
language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  if not (public.is_admin() or auth.role() = 'service_role') then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_mode not in ('publish', 'draft') then
    raise exception 'mode must be publish or draft';
  end if;
  insert into public.crosspost_jobs (site, chapter_id, mode)
  select p_site, c.id, p_mode
  from public.chapters c
  where c.id = any (p_chapters)
  on conflict (site, chapter_id) where status in ('queued', 'running') do nothing;
  get diagnostics n = row_count;
  return n;
end $$;

-- Cancel jobs that have not started yet.
create or replace function public.crosspost_cancel(p_ids bigint[])
returns integer
language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  if not (public.is_admin() or auth.role() = 'service_role') then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  update public.crosspost_jobs set status = 'cancelled', finished_at = now()
  where id = any (p_ids) and status = 'queued';
  get diagnostics n = row_count;
  return n;
end $$;

-- The worker takes the next job, in story order. "skip locked" means two workers
-- running by mistake still never take the same job.
create or replace function public.crosspost_claim_job(p_site text, p_worker text)
returns setof public.crosspost_jobs
language sql security definer set search_path = public as $$
  update public.crosspost_jobs j
  set status = 'running', started_at = now(), worker = p_worker
  where j.id = (
    select q.id
    from public.crosspost_jobs q
    join public.chapters c on c.id = q.chapter_id
    where q.site = p_site and q.status = 'queued'
    order by c.position, q.id
    limit 1
    for update of q skip locked
  )
  returning j.*;
$$;

revoke all on function public.crosspost_enqueue(text, uuid[], text) from public, anon;
revoke all on function public.crosspost_cancel(bigint[]) from public, anon;
revoke all on function public.crosspost_claim_job(text, text) from public, anon, authenticated;
grant execute on function public.crosspost_enqueue(text, uuid[], text) to authenticated, service_role;
grant execute on function public.crosspost_cancel(bigint[]) to authenticated, service_role;
grant execute on function public.crosspost_claim_job(text, text) to service_role;

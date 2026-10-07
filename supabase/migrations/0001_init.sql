-- Đèn Vàng: database schema, security rules and functions.
-- Run once in the Supabase SQL editor (or with `supabase db push`).

-- ───────────────────────── Profiles ─────────────────────────

create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'Độc giả'
               check (char_length(display_name) between 1 and 60),
  avatar_url   text,
  is_admin     boolean not null default false,
  created_at   timestamptz not null default now()
);

-- Create a profile automatically when someone signs in for the first time.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    left(coalesce(
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(new.raw_user_meta_data ->> 'name', ''),
      nullif(new.raw_user_meta_data ->> 'user_name', ''),
      nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
      'Độc giả'
    ), 60),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false)
$$;

-- ───────────────────────── Chapters ─────────────────────────

create table public.chapters (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  kind        text not null default 'chapter' check (kind in ('chapter', 'interlude')),
  title       text not null check (char_length(title) between 1 and 200),
  color       text check (color is null or color ~ '^#[0-9a-fA-F]{6}$'),  -- interlude dot colour
  story_date  text,                                                       -- e.g. "Thứ Bảy, 3/10/2026"
  body        text not null default '',                                   -- Markdown
  status      text not null default 'draft' check (status in ('draft', 'published')),
  publish_at  timestamptz,                                                -- goes live at this time
  position    integer not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  -- Deferred so a reorder can swap positions inside one transaction.
  constraint chapters_position_key unique (position) deferrable initially deferred
);

create or replace function public.chapters_before_write()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' and new.position is null then
    select coalesce(max(position), 0) + 1 into new.position from public.chapters;
  end if;
  if new.status = 'published' and new.publish_at is null then
    new.publish_at := now();
  end if;
  new.updated_at := now();
  return new;
end $$;

create trigger chapters_before_write
  before insert or update on public.chapters
  for each row execute function public.chapters_before_write();

-- A chapter is public once it is published and its publish time has passed.
create or replace function public.chapter_is_public(p_chapter uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.chapters c
    where c.id = p_chapter and c.status = 'published' and c.publish_at <= now()
  )
$$;

-- Save a new order. p_ids must list every chapter exactly once, first to last.
create or replace function public.reorder_chapters(p_ids uuid[])
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then
    raise exception 'Không có quyền.' using errcode = '42501';
  end if;
  if (select count(*) from public.chapters) <> coalesce(array_length(p_ids, 1), 0)
     or exists (select 1 from public.chapters c where not (c.id = any (p_ids))) then
    raise exception 'Danh sách phải có đủ mọi chương, mỗi chương một lần.';
  end if;
  update public.chapters c
     set position = t.ord::int
    from unnest(p_ids) with ordinality as t (id, ord)
   where c.id = t.id;
end $$;

-- ───────────────────────── Views (read counts) ─────────────────────────

create table public.chapter_views (
  chapter_id uuid primary key references public.chapters (id) on delete cascade,
  views      bigint not null default 0
);

create or replace function public.record_view(p_chapter uuid)
returns bigint language plpgsql security definer set search_path = public as $$
declare v bigint;
begin
  if not public.chapter_is_public(p_chapter) then
    return null;
  end if;
  insert into public.chapter_views (chapter_id, views) values (p_chapter, 1)
  on conflict (chapter_id) do update set views = public.chapter_views.views + 1
  returning views into v;
  return v;
end $$;

-- ───────────────────────── Ratings ─────────────────────────

create table public.ratings (
  user_id    uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  chapter_id uuid not null references public.chapters (id) on delete cascade,
  stars      smallint not null check (stars between 1 and 5),
  updated_at timestamptz not null default now(),
  primary key (user_id, chapter_id)
);

create table public.story_ratings (
  user_id    uuid primary key default auth.uid() references public.profiles (id) on delete cascade,
  stars      smallint not null check (stars between 1 and 5),
  updated_at timestamptz not null default now()
);

-- ───────────────────────── Comments ─────────────────────────

create table public.comments (
  id         uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters (id) on delete cascade,
  user_id    uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  parent_id  uuid references public.comments (id) on delete cascade,
  body       text not null check (char_length(btrim(body)) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index comments_chapter_idx on public.comments (chapter_id, created_at);
create index comments_user_idx on public.comments (user_id, created_at desc);

-- Replies are one level deep, on the same chapter. Also a simple rate limit.
create or replace function public.comments_before_insert()
returns trigger language plpgsql security definer set search_path = public as $$
declare p record;
begin
  new.body := btrim(new.body);
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
    if exists (select 1 from public.comments
               where user_id = new.user_id and created_at > now() - interval '15 seconds') then
      raise exception 'Bạn bình luận nhanh quá, đợi vài giây nhé.';
    end if;
    if (select count(*) from public.comments
        where user_id = new.user_id and created_at > now() - interval '1 day') >= 100 then
      raise exception 'Hôm nay bạn đã bình luận đủ nhiều rồi.';
    end if;
  end if;
  return new;
end $$;

create trigger comments_before_insert
  before insert on public.comments
  for each row execute function public.comments_before_insert();

-- ───────────────────────── Public stats ─────────────────────────

create or replace function public.get_chapter_stats(p_chapter uuid)
returns table (views bigint, rating_avg numeric, rating_count bigint, comment_count bigint)
language sql stable security definer set search_path = public as $$
  select
    coalesce((select v.views from public.chapter_views v where v.chapter_id = p_chapter), 0),
    (select round(avg(r.stars), 1) from public.ratings r where r.chapter_id = p_chapter),
    (select count(*) from public.ratings r where r.chapter_id = p_chapter),
    (select count(*) from public.comments c where c.chapter_id = p_chapter)
  where public.chapter_is_public(p_chapter)
$$;

create or replace function public.get_story_stats()
returns table (views bigint, rating_avg numeric, rating_count bigint)
language sql stable security definer set search_path = public as $$
  select
    coalesce((select sum(v.views) from public.chapter_views v
              where public.chapter_is_public(v.chapter_id)), 0)::bigint,
    (select round(avg(s.stars), 1) from public.story_ratings s),
    (select count(*) from public.story_ratings s)
$$;

-- ───────────────────────── Row level security ─────────────────────────

alter table public.profiles      enable row level security;
alter table public.chapters      enable row level security;
alter table public.chapter_views enable row level security;
alter table public.ratings       enable row level security;
alter table public.story_ratings enable row level security;
alter table public.comments      enable row level security;

-- Profiles: names and avatars are public; you may only rename yourself.
create policy "profiles are public" on public.profiles for select using (true);
create policy "edit own profile" on public.profiles for update
  using (id = auth.uid()) with check (id = auth.uid());
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (display_name) on public.profiles to authenticated;

-- Chapters: readers see public chapters; only the admin sees drafts and writes.
create policy "read public chapters" on public.chapters for select
  using ((status = 'published' and publish_at <= now()) or public.is_admin());
create policy "admin inserts chapters" on public.chapters for insert with check (public.is_admin());
create policy "admin updates chapters" on public.chapters for update
  using (public.is_admin()) with check (public.is_admin());
create policy "admin deletes chapters" on public.chapters for delete using (public.is_admin());

-- View counts: readable by everyone, written only through record_view().
create policy "views are public" on public.chapter_views for select using (true);
revoke insert, update, delete on public.chapter_views from anon, authenticated;

-- Ratings: each signed-in reader manages their own.
create policy "read own rating" on public.ratings for select using (user_id = auth.uid());
create policy "add own rating" on public.ratings for insert
  with check (user_id = auth.uid() and public.chapter_is_public(chapter_id));
create policy "change own rating" on public.ratings for update
  using (user_id = auth.uid()) with check (user_id = auth.uid() and public.chapter_is_public(chapter_id));
create policy "remove own rating" on public.ratings for delete using (user_id = auth.uid());

create policy "read own story rating" on public.story_ratings for select using (user_id = auth.uid());
create policy "add own story rating" on public.story_ratings for insert with check (user_id = auth.uid());
create policy "change own story rating" on public.story_ratings for update
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "remove own story rating" on public.story_ratings for delete using (user_id = auth.uid());

-- Comments: public on public chapters; signed-in readers post; authors and the admin delete.
create policy "read comments" on public.comments for select
  using (public.chapter_is_public(chapter_id) or public.is_admin());
create policy "post comment" on public.comments for insert
  with check (user_id = auth.uid() and public.chapter_is_public(chapter_id));
create policy "delete own or admin" on public.comments for delete
  using (user_id = auth.uid() or public.is_admin());
revoke update on public.comments from anon, authenticated;

-- ───────────────────────── Function access ─────────────────────────

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.chapters_before_write() from public, anon, authenticated;
revoke execute on function public.comments_before_insert() from public, anon, authenticated;
revoke execute on function public.reorder_chapters(uuid[]) from public, anon;
grant  execute on function public.reorder_chapters(uuid[]) to authenticated;
grant  execute on function public.record_view(uuid) to anon, authenticated;
grant  execute on function public.get_chapter_stats(uuid) to anon, authenticated;
grant  execute on function public.get_story_stats() to anon, authenticated;
grant  execute on function public.chapter_is_public(uuid) to anon, authenticated;
grant  execute on function public.is_admin() to anon, authenticated;

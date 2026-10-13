-- Signing the cross-post worker in to the other site from /admin/crosspost.
--
-- The password never reaches the database in readable form:
--   * the worker (on the author's computer) makes a key pair; the private key
--     stays in crosspost/.profile/ and only the public key is stored here;
--   * the admin page encrypts the email and password with that public key in
--     the browser, and stores only the encrypted blob;
--   * the worker decrypts it, signs in, and blanks the blob.
-- Without the author's computer, a copy of this table is useless.
--
-- Run once in Supabase → SQL Editor, after 0005_crosspost.sql.

alter table public.crosspost_workers
  add column public_key       jsonb,                              -- RSA-OAEP public key (JWK)
  add column needs_login      boolean not null default false,     -- the site signed it out; jobs wait
  add column has_saved_login  boolean not null default false,     -- it can sign itself in again
  add column login_note       text;

create table public.crosspost_login_requests (
  id          bigint generated always as identity primary key,
  worker      text not null references public.crosspost_workers (worker) on delete cascade,
  kind        text not null default 'login' check (kind in ('login', 'forget')),
  payload     jsonb check (payload is null or octet_length(payload::text) < 8000), -- encrypted; blanked once read
  status      text not null default 'new' check (status in ('new', 'done', 'failed')),
  message     text,
  created_by  uuid default auth.uid(),
  created_at  timestamptz not null default now(),
  finished_at timestamptz
);
create index crosspost_login_requests_open on public.crosspost_login_requests (worker, created_at) where status = 'new';

alter table public.crosspost_login_requests enable row level security;

create policy "admin reads login requests" on public.crosspost_login_requests
  for select using (public.is_admin());
create policy "admin sends login requests" on public.crosspost_login_requests
  for insert with check (public.is_admin() and status = 'new' and message is null and finished_at is null);

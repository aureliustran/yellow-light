-- Cross-posting: add truyennhaong.vn (Truyện nhà Ong, TNO).
-- Whole story (no teaser limit). Chapters are saved as "Đăng": TNO has no
-- per-chapter review, and nothing is public there until its editors approve
-- the work by hand. No links are sent until linksAllowed is turned on in
-- crosspost/sites/truyennhaong/config.json (after the editors agree).
-- Run once in Supabase → SQL Editor.
insert into public.crosspost_sites (site, name, teaser_limit, default_mode)
values ('truyennhaong', 'Truyện nhà Ong', null, 'publish')
on conflict (site) do nothing;

-- Đèn Vàng: the admin can edit a comment's text (the "U" in admin CRUD).
-- Run once in the Supabase SQL editor, after 0003_anonymous_names.sql.
-- Readers' comments still post immediately; nothing here adds an approval step.

alter table public.comments add column if not exists edited_at timestamptz;

create or replace function public.admin_edit_comment(p_id uuid, p_body text)
returns void language plpgsql security definer set search_path = public as $$
declare n text; old text;
begin
  perform public.admin_guard();
  n := btrim(coalesce(p_body, ''));
  if char_length(n) not between 1 and 2000 then
    raise exception 'Bình luận phải dài 1–2000 ký tự.';
  end if;
  select body into old from public.comments where id = p_id;
  if not found then raise exception 'Không tìm thấy bình luận.'; end if;
  if old = n then return; end if;
  update public.comments set body = n, edited_at = now() where id = p_id;
  insert into public.moderation_log (action, comment_id, note)
  values ('edit_comment', p_id, 'Trước khi sửa: ' || left(old, 200));
end $$;

revoke execute on function public.admin_edit_comment(uuid, text) from public, anon;
grant  execute on function public.admin_edit_comment(uuid, text) to authenticated;

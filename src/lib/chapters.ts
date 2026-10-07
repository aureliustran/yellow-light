// Server-side reads. Runs as an anonymous visitor, so the database's security
// rules only return chapters that are published and past their publish time.
import { serverClient } from './supabase';
import { withNumbers, type ChapterRow, type NumberedChapter } from './chapters-shared';

const LIST_COLUMNS = 'id, slug, kind, title, color, story_date, status, publish_at, position';

export async function getPublishedChapters(): Promise<NumberedChapter[]> {
  const { data, error } = await serverClient()
    .from('chapters')
    .select(LIST_COLUMNS)
    .order('position', { ascending: true });
  if (error) throw error;
  return withNumbers((data ?? []) as ChapterRow[]);
}

export async function getChapterPage(slug: string) {
  const sb = serverClient();
  const [{ data: chapter, error }, list] = await Promise.all([
    sb.from('chapters').select(`${LIST_COLUMNS}, body, updated_at`).eq('slug', slug).maybeSingle(),
    getPublishedChapters(),
  ]);
  if (error) throw error;
  if (!chapter) return null;
  const i = list.findIndex((c) => c.id === chapter.id);
  return {
    chapter: { ...(chapter as ChapterRow), number: list[i]?.number ?? null } as NumberedChapter & { body: string },
    prev: i > 0 ? list[i - 1] : null,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
    progress: list.length ? (i + 1) / list.length : 0,
  };
}

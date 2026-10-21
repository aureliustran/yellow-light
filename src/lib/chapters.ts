// Server-side reads. Runs as an anonymous visitor, so the database's security
// rules only return chapters that are published and past their publish time.
import { serverClient } from './supabase';
import { withNumbers, type ChapterRow, type NumberedChapter } from './chapters-shared';
import { editions, type Edition } from '../config';

const LIST_COLUMNS = 'id, edition, slug, kind, title, color, story_date, status, publish_at, position';

export async function getPublishedChapters(edition: Edition = editions.current): Promise<NumberedChapter[]> {
  const { data, error } = await serverClient()
    .from('chapters')
    .select(LIST_COLUMNS)
    .eq('edition', edition)
    .order('position', { ascending: true });
  if (error) throw error;
  return withNumbers((data ?? []) as ChapterRow[], editions.firstNumber[edition]);
}

export async function getChapterPage(slug: string, edition: Edition = editions.current) {
  const sb = serverClient();
  const [{ data: chapter, error }, list] = await Promise.all([
    sb.from('chapters').select(`${LIST_COLUMNS}, body, updated_at`).eq('edition', edition).eq('slug', slug).maybeSingle(),
    getPublishedChapters(edition),
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

// Is there a public chapter with this web address in that edition? Used to send
// old /doc/ links on to /legacy/ once v1 is no longer current.
export async function chapterExists(slug: string, edition: Edition): Promise<boolean> {
  const { data, error } = await serverClient().from('chapters').select('id').eq('edition', edition).eq('slug', slug).maybeSingle();
  if (error) throw error;
  return !!data;
}

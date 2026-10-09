// Chapter helpers that work both on the server and in the browser.

export type ChapterKind = 'chapter' | 'interlude';
export type ChapterStatus = 'draft' | 'published';

export interface ChapterRow {
  id: string;
  slug: string;
  kind: ChapterKind;
  title: string;
  color: string | null;
  story_date: string | null;
  status: ChapterStatus;
  publish_at: string | null;
  position: number;
  updated_at?: string;
  body?: string;
}

export interface NumberedChapter extends ChapterRow {
  number: number | null; // null for interludes
}

// A special chapter is a chapter whose title is only digits ("3107"): the
// number is its name, so it gets no running number of its own.
export function isSpecialChapter(c: { kind: ChapterKind; title: string }): boolean {
  return c.kind === 'chapter' && /^\d+$/.test(c.title.trim());
}

// Chapter numbers are not stored: they come from the order, and interludes
// and special chapters are skipped, so reordering renumbers everything automatically.
export function withNumbers<T extends ChapterRow>(list: T[]): (T & { number: number | null })[] {
  let n = 0;
  return [...list]
    .sort((a, b) => a.position - b.position)
    .map((c) => ({ ...c, number: c.kind === 'chapter' && !isSpecialChapter(c) ? ++n : null }));
}

export function chapterLabel(c: { kind: ChapterKind; number: number | null }): string {
  if (c.kind !== 'chapter') return 'Interlude';
  return c.number != null ? `Chương ${c.number}` : 'Chương';
}

export function isLive(c: Pick<ChapterRow, 'status' | 'publish_at'>, now = Date.now()): boolean {
  return c.status === 'published' && !!c.publish_at && Date.parse(c.publish_at) <= now;
}

// Chapter helpers that work both on the server and in the browser.
// .ts extension: this file is also loaded by Node (tests, crosspost, scripts).
import { editions, type Edition } from '../config.ts';

export type ChapterKind = 'chapter' | 'interlude';
export type ChapterStatus = 'draft' | 'published';

export interface ChapterRow {
  id: string;
  edition?: Edition;
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
// `list` is one edition; `first` is its first number (editions.firstNumber).
export function withNumbers<T extends ChapterRow>(list: T[], first = 1): (T & { number: number | null })[] {
  let n = first - 1;
  return [...list]
    .sort((a, b) => a.position - b.position)
    .map((c) => ({ ...c, number: c.kind === 'chapter' && !isSpecialChapter(c) ? ++n : null }));
}

export function chapterLabel(c: { kind: ChapterKind; number: number | null; title?: string }): string {
  if (c.kind !== 'chapter') return 'Interlude';
  if (c.number != null) return `Chương ${c.number}`;
  return c.title != null && isSpecialChapter({ kind: c.kind, title: c.title }) ? 'Chương đặc biệt' : 'Chương';
}

// Short name used in the prev/next links: "Chương 31 · Mười hai ghế", "Chương 3107".
export function chapterLinkName(c: { kind: ChapterKind; number: number | null; title: string }): string {
  if (c.kind !== 'chapter') return c.title;
  return c.number != null ? `Chương ${c.number} · ${c.title}` : `Chương ${c.title}`;
}

export function isLive(c: Pick<ChapterRow, 'status' | 'publish_at'>, now = Date.now()): boolean {
  return c.status === 'published' && !!c.publish_at && Date.parse(c.publish_at) <= now;
}

// Where readers open a chapter: the current edition under /doc/, Legacy under
// /legacy/. A row without an edition is from before editions: v1.
export function chapterPath(c: { slug: string; edition?: Edition }): string {
  const ed = c.edition ?? 'v1';
  return `${ed === editions.current ? '/doc' : editions.legacy.path}/${c.slug}`;
}

export function isLegacy(c: { edition?: Edition }): boolean {
  return (c.edition ?? 'v1') !== editions.current;
}

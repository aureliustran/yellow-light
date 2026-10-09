// Turns one of the story's Markdown files into a chapter row.
//
//   # Chương 1: Đèn vàng          → chapter "Đèn vàng"
//   # Hồng phấn                   → interlude "Hồng phấn"
//   # Chương 3107                 → special chapter "3107" (no running number)
//   Oct 4, 2026 · @aureliustran.  → removed (document byline)
//   *Thứ Bảy, 3/10/2026*          → story_date, removed from the body
import { slugify } from '../src/lib/slug.ts';

const BYLINE = /^[A-Z][a-z]{2} \d{1,2}, \d{4} · @\S+\s*$/;
const STORY_DATE = /^\*\s*([^*]*\d{1,2}\/\d{1,2}\/\d{4})\s*\*$/;
const CHAPTER_H1 = /^Chương\s+\d+\s*[:.–-]\s*(.+)$/i;
// A chapter whose heading is only a number is a special chapter: the number is
// its name, and it does not take a place in the running chapter count.
const SPECIAL_H1 = /^Chương\s+(\d+)\s*$/i;

export function parseChapter(text) {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const h1Index = lines.findIndex((l) => /^#\s+\S/.test(l));
  if (h1Index < 0) return null;
  const heading = lines[h1Index].replace(/^#\s+/, '').trim();
  const m = CHAPTER_H1.exec(heading);
  const special = m ? null : SPECIAL_H1.exec(heading);
  const kind = m || special ? 'chapter' : 'interlude';
  const title = (m ? m[1] : special ? special[1] : heading).trim();

  let rest = lines.slice(h1Index + 1);
  let storyDate = null;
  // Only look at the first few non-empty lines for the byline and the date.
  let seen = 0;
  rest = rest.filter((l) => {
    if (seen >= 3 || !l.trim()) return true;
    seen++;
    if (BYLINE.test(l.trim())) return false;
    const d = STORY_DATE.exec(l.trim());
    if (d && !storyDate) {
      storyDate = d[1].trim();
      return false;
    }
    return true;
  });

  const body = rest.join('\n').replace(/^\s+/, '').replace(/\s+$/, '') + '\n';
  return { kind, title, slug: slugify(title), story_date: storyDate, body };
}

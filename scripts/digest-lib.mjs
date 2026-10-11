// Builds the daily admin digest (Markdown, in Vietnamese). Pure functions only,
// so tests/digest.test.ts can run it without a database.
// Returns '' when nothing needs attention, so the workflow stays quiet.

// Comment text is written by strangers. Shown inside `code`, so GitHub does not
// render markdown or notify anyone mentioned with @.
export function snippet(text, max = 100) {
  const flat = String(text ?? '').replace(/\s+/g, ' ').replace(/`/g, "'").trim();
  return '`' + (flat.length > max ? flat.slice(0, max - 1) + '…' : flat || '(trống)') + '`';
}

const plain = (s) => String(s ?? '').replace(/[\r\n`*_<>@#\[\]|]/g, ' ').trim().slice(0, 60) || 'Độc giả';

export function isSpike(last24h, prev7d) {
  const dailyAvg = prev7d / 7;
  return last24h >= 50 && last24h >= 3 * Math.max(dailyAvg, 1);
}

// input: {
//   siteUrl, date,
//   views24h, viewsPrev7d, newUsers,
//   reports:     [{ reason, author, chapter, body }],   // open reports on visible comments
//   newComments: [{ author, chapter, body }],           // visible comments from the last 24 h
//   ratingBursts:[{ name, count }]                      // readers who rated 5+ times in 24 h
// }
export function buildDigest(input) {
  const { siteUrl = '', date = '', views24h = 0, viewsPrev7d = 0, newUsers = 0 } = input;
  const reports = input.reports ?? [];
  const newComments = input.newComments ?? [];
  const bursts = input.ratingBursts ?? [];
  const spike = isSpike(views24h, viewsPrev7d);
  if (!reports.length && !newComments.length && !bursts.length && !spike) return '';

  const lines = [`# Tóm tắt ${date}`.trim(), ''];
  lines.push(
    `Lượt đọc 24 giờ qua: **${views24h}** (trung bình 7 ngày trước đó: ${Math.round(viewsPrev7d / 7)}/ngày) · Tài khoản mới: **${newUsers}**`,
    '',
  );

  if (reports.length) {
    lines.push(`## ⚠️ ${reports.length} báo cáo chưa xử lý`, '');
    for (const r of reports.slice(0, 10)) {
      lines.push(`- **${plain(r.author)}** · ${plain(r.chapter)}: ${snippet(r.body)}${r.reason ? ` — lý do: ${snippet(r.reason, 80)}` : ''}`);
    }
    if (reports.length > 10) lines.push(`- … và ${reports.length - 10} báo cáo khác`);
    lines.push('');
  }
  if (spike) {
    lines.push(`## 📈 Lượt đọc tăng đột biến`, '', `${views24h} lượt trong 24 giờ, cao hơn nhiều so với mức thường ngày. Xem nguồn truy cập ở trang thống kê.`, '');
  }
  if (bursts.length) {
    lines.push(`## ⭐ Chấm điểm dồn dập`, '');
    for (const b of bursts) lines.push(`- **${plain(b.name)}** chấm ${b.count} lần trong 24 giờ`);
    lines.push('');
  }
  if (newComments.length) {
    lines.push(`## 💬 ${newComments.length} bình luận mới`, '');
    for (const c of newComments.slice(0, 8)) lines.push(`- **${plain(c.author)}** · ${plain(c.chapter)}: ${snippet(c.body)}`);
    if (newComments.length > 8) lines.push(`- … và ${newComments.length - 8} bình luận khác`);
    lines.push('');
  }
  if (siteUrl) {
    lines.push(`Xử lý: ${siteUrl}/admin/comments · Thống kê: ${siteUrl}/admin/stats · Đánh giá: ${siteUrl}/admin/ratings`);
  }
  return lines.join('\n').trim() + '\n';
}

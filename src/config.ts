// Story details shown on the site. Edit freely.

export const story = {
  title: 'Đèn Vàng',
  author: 'Aurelius',
  status: 'Truyện dài · Đang ra',
  // Genre tags, roughly in the order the story reaches them.
  // The first `tagsVisible` show on the home page; the rest sit behind a + button.
  tagsVisible: 3,
  tags: [
    'Học đường', 'Ngôn tình', 'Đời thường', 'Chính kịch',
    'Đấu trí', 'Chốn công sở', 'Hào môn thế gia', 'Nam chính xám',
    'Tâm lý', 'Bí ẩn', 'Ngược', 'Slow burn', 'Chữa lành',
    'Du học', 'Khởi nghiệp', 'Thương chiến',
  ],
  // Home page blurb, one string per paragraph. This is a draft: rewrite it.
  blurb: [
    'Sáng thứ Bảy, Thuyên dừng lại ở đèn vàng. Cô gái đi Vespa hồng phía sau thì không.',
    'Một vết xước không tồn tại, một tấm thiệp mời bị đánh rơi, và một lý thuyết rất ngớ ngẩn về đèn vàng.',
  ],
  // Story introduction for other reading sites (one-line hook + paragraphs).
  // Source of truth: `npm run crosspost -- info <site> --save` copies it to the
  // site's story page. Never put a link here while a site has linksAllowed: false.
  tagline: 'Có hai kiểu người trước đèn vàng. Kiểu thứ nhất dừng lại. Kiểu thứ hai vặn ga.',
  intro: [
    "Một tiếng \"cốp\". Một chiếc Vespa hồng, một cái mũ tai mèo lệch sang bên, và một giọng nói trong veo bắt anh phải nhận lỗi, giữa ngã tư, trước mặt bác xe ôm đang cười khẩy. Cô không đòi tiền. Anh đưa, cô còn gạt đi. Cô chỉ muốn nghe anh nói một câu: là lỗi của tôi.",
    "Thuyên đã quen đọc người. Đọc tiếng dép của bố từ năm lên mười, đọc cái cách mẹ đặt bát xuống mâm, đọc đám bạn, đọc thầy cô, đọc cả những cô gái thích mình trước khi họ kịp nói ra. Nhờ vậy anh sống sót, đi qua được một tuổi thơ nhiều thành tích mà ít lời khen, rồi ra Hà Nội làm cậu sinh viên ai cũng quý, ai cũng nghĩ mình hiểu.",
    "Nhưng cô gái áo hồng thì anh đọc sai từ đầu đến cuối.",
    "Một người đã học cách nói điều người khác muốn nghe. Một người đã thề sẽ nói thật với tất cả, vì cả đời chưa ai nói thật với mình. Họ sẽ dạy nhau, làm nhau đau, rồi mất rất lâu mới hiểu ra: đèn vàng không bảo ai phải dừng, cũng không bảo ai phải đi. Nó chỉ hỏi người đứng trước nó muốn gì.",
  ],
  // Short line used for search results and share previews.
  description:
    'Đèn Vàng – truyện dài học đường, ngôn tình, đấu trí chốn công sở và hào môn của Aurelius. Hà Nội, mùa hoa sữa 2026.',
  // Other sites that carry the story (shown in the footer and on /admin/crosspost).
  // Add an entry when a new site goes live; `url` is the story's page there.
  crossposts: [
    { name: 'Rookies.vn', url: 'https://rookies.vn/truyen/den-vang' },
  ] as { name: string; url: string }[],
  footer: [
    '© Aurelius · Truyện hư cấu: nhân vật, tổ chức và sự kiện đều do tác giả tưởng tượng.',
    'Trang ghi lại số liệu đọc ẩn danh (loại thiết bị, trình duyệt, nguồn truy cập, mức độ đã đọc). Không lưu địa chỉ IP, không dùng cookie theo dõi.',
  ],
};

// Editions of the story (docs/plan-legacy.md). `current` is the one the home
// page, "Đọc từ đầu" and /doc/ show; v1 becomes "Legacy" once v2 is current.
// Switch `current` to 'v2' only when v2's first chapter is ready.
export type Edition = 'v1' | 'v2';
export const editions = {
  current: 'v1' as Edition,
  list: ['v2', 'v1'] as Edition[],
  names: { v1: 'Legacy', v2: 'Bản mới' } as Record<Edition, string>,
  // First chapter number per edition: v2 opens with Chương 0.
  firstNumber: { v1: 1, v2: 0 } as Record<Edition, number>,
};

export function isEdition(v: unknown): v is Edition {
  return v === 'v1' || v === 'v2';
}

// Sign-in options. Reading never needs an account; signing in is only for
// commenting, rating and the admin page. Each provider must be enabled in
// Supabase → Authentication → Providers.
export const authProviders: { id: 'google'; label: string }[] = [
  { id: 'google', label: 'Tiếp tục với Google' },
];

// Suggested dot colours for interludes (picked in the admin editor).
export const interludeColors: { name: string; hex: string }[] = [
  { name: 'Hồng phấn', hex: '#F2BFCB' },
  { name: 'Màu giấy can', hex: '#EAE5D6' },
  { name: 'Kem viền nhũ vàng', hex: '#F1E2B4' },
  { name: 'Hồng đất', hex: '#C9908B' },
  { name: 'Màu be', hex: '#D9C8B0' },
  { name: 'Vàng kim', hex: '#D4AF37' },
  { name: 'Hồng', hex: '#F4A6BE' },
  { name: 'Màu xám', hex: '#9AA3A9' },
  { name: 'Hồng cánh sen', hex: '#E58FB0' },
  { name: 'Xanh cổ vịt', hex: '#2E8B8B' },
  { name: 'Ánh xanh màn hình', hex: '#7FB8E6' },
  { name: 'Đỏ sẫm', hex: '#8A2B38' },
  { name: 'Nâu cà phê', hex: '#7B5539' },
  { name: 'Mực tím', hex: '#6A4FB3' },
  { name: 'Váy cổ thuyền', hex: '#26232B' },
];

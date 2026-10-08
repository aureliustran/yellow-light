// Story details shown on the site. Edit freely.

export const story = {
  title: 'Đèn Vàng',
  author: 'Aurelius',
  status: 'Truyện dài · Đang ra',
  // Genre tags, roughly in the order the story reaches them.
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
  // Short line used for search results and share previews.
  description:
    'Đèn Vàng – truyện dài học đường, ngôn tình, đấu trí chốn công sở và hào môn của Aurelius. Hà Nội, mùa hoa sữa 2026.',
  footer: [
    '© Aurelius · Truyện hư cấu: nhân vật, tổ chức và sự kiện đều do tác giả tưởng tượng.',
    'Cũng đăng tại Truyện nhà Ong.',
  ],
};

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
];

// "Kem viền nhũ vàng" → "kem-vien-nhu-vang"
export function slugify(input: string): string {
  const s = (input ?? '')
    .replace(/[đĐ]/g, 'd')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');
  return s || 'chuong';
}

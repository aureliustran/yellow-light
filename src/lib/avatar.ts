// Default avatars. Every reader gets a small traffic light on a soft colour,
// chosen from their anonymous number: the same reader always gets the same
// picture, and nobody's Google photo is ever loaded or shown.

// Backgrounds are the interlude colours; the lit lamp cycles red, yellow, green.
const BACKGROUNDS = ['#F2BFCB', '#EAE5D6', '#F1E2B4', '#C9908B', '#D9C8B0', '#9AA3A9', '#E58FB0', '#7FB8E6'];
const LAMPS = ['#E5484D', '#F5B342', '#3FB27F'];

export function avatarParts(anonNo: number): { background: string; lit: number } {
  const k = Number.isFinite(anonNo) ? Math.abs(Math.trunc(anonNo)) : 0;
  return { background: BACKGROUNDS[Math.floor(k / 3) % BACKGROUNDS.length], lit: k % 3 };
}

export function avatarSvg(anonNo: number): string {
  const { background, lit } = avatarParts(anonNo);
  const lamps = LAMPS.map(
    (color, i) =>
      `<circle cx="32" cy="${22 + i * 10}" r="4.2" fill="${i === lit ? color : '#fff'}"${i === lit ? '' : ' fill-opacity=".16"'}/>`,
  ).join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<rect width="64" height="64" fill="${background}"/>` +
    `<rect x="21" y="11" width="22" height="42" rx="11" fill="#26232B"/>${lamps}</svg>`
  );
}

// For <img src>. A data URI, so there is no request and no third party involved.
export function defaultAvatar(anonNo: number): string {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(avatarSvg(anonNo));
}

export function anonTag(anonNo: number): string {
  return anonNo > 0 ? `#${anonNo}` : '';
}

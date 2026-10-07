// Tap a highlighted phrase to swap between the original (English or Hà Tĩnh)
// and its translation. A switch can flip every phrase at once; the reader's
// choice becomes their default on this device.
import { store } from './ui';

const KEY = 'dv:tr-default';
type Show = 'orig' | 'trans';

function setShow(el: HTMLElement, show: Show): void {
  el.dataset.show = show;
  const btn = el.classList.contains('tr') ? el : el.querySelector<HTMLElement>('.tr-switch');
  btn?.setAttribute('aria-pressed', String(show === 'trans'));
}

export function initTranslations(root: HTMLElement, allSwitch?: HTMLButtonElement | null): void {
  const items = () => [...root.querySelectorAll<HTMLElement>('.tr, .tr-block')];
  const def: Show = store(KEY) === 'trans' ? 'trans' : 'orig';

  const paintSwitch = () => {
    if (!allSwitch) return;
    const list = items();
    allSwitch.hidden = list.length === 0;
    const allTrans = list.length > 0 && list.every((el) => el.dataset.show === 'trans');
    allSwitch.setAttribute('aria-pressed', String(allTrans));
    const label = allSwitch.querySelector('[data-tr-all-label]');
    if (label) label.textContent = allTrans ? 'Nguyên bản' : 'Bản dịch';
  };

  items().forEach((el) => setShow(el, def));

  if (!root.dataset.trBound) {
    root.dataset.trBound = '1';
    const toggle = (target: HTMLElement) => {
      const el = target.classList.contains('tr') ? target : target.closest<HTMLElement>('.tr-block');
      if (!el) return;
      setShow(el, el.dataset.show === 'trans' ? 'orig' : 'trans');
      paintSwitch();
    };
    root.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('.tr, .tr-switch');
      if (!target || !root.contains(target)) return;
      if ((e.target as HTMLElement).closest('a')) return; // let links inside a phrase work
      e.preventDefault();
      toggle(target);
    });
    // Inline phrases are spans with role="button": make them keyboard-friendly.
    root.addEventListener('keydown', (e) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('.tr');
      if (!target || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault();
      toggle(target);
    });
  }

  if (allSwitch && !allSwitch.dataset.bound) {
    allSwitch.dataset.bound = '1';
    allSwitch.addEventListener('click', () => {
      const next: Show = allSwitch.getAttribute('aria-pressed') === 'true' ? 'orig' : 'trans';
      items().forEach((el) => setShow(el, next));
      store(KEY, next);
      paintSwitch();
    });
  }
  paintSwitch();
}

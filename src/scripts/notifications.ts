// Makes each :::notifications block behave like a phone's lock screen: a fixed
// height with the list scrolling inside it, a fade at the bottom while there is
// more to see, tap a card to read it in full, and cards appearing one after
// another when the block scrolls into view. Without JavaScript the list is
// simply shown in full (the CSS only applies these limits under .is-js).

const STAGGER_CAP = 12; // cards past this appear together with the last step

export function initNotifications(root: ParentNode): void {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.querySelectorAll<HTMLElement>('.notif:not([data-ready])').forEach((block) => {
    block.dataset.ready = '';
    block.classList.add('is-js');
    const scroll = block.querySelector<HTMLElement>('.notif-scroll');
    const cards = [...block.querySelectorAll<HTMLElement>('.notif-card')];

    // Fade at the bottom only while there is more below.
    const paintMore = () => {
      if (!scroll) return;
      scroll.toggleAttribute('data-more', scroll.scrollTop + scroll.clientHeight < scroll.scrollHeight - 4);
    };
    scroll?.addEventListener('scroll', paintMore, { passive: true });

    // A card whose text is cut off can be opened (and closed again).
    const paintOpenable = () => {
      cards.forEach((card) => {
        if (card.classList.contains('is-open')) return;
        const body = card.querySelector<HTMLElement>('.nf-body');
        const cut = !!body && body.scrollHeight > body.clientHeight + 1;
        if (cut === card.classList.contains('can-open')) return;
        card.classList.toggle('can-open', cut);
        if (cut) {
          card.tabIndex = 0;
          card.setAttribute('role', 'button');
          card.setAttribute('aria-expanded', 'false');
        } else {
          card.removeAttribute('tabindex');
          card.removeAttribute('role');
          card.removeAttribute('aria-expanded');
        }
      });
      paintMore();
    };
    const toggle = (card: HTMLElement) => {
      const open = card.classList.toggle('is-open');
      card.setAttribute('aria-expanded', String(open));
      paintMore();
    };
    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (!card.classList.contains('can-open') || (e.target as HTMLElement).closest('.tr')) return;
        toggle(card);
      });
      card.addEventListener('keydown', (e) => {
        if (e.target !== card || !card.classList.contains('can-open')) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle(card);
        }
      });
    });
    if (typeof ResizeObserver !== 'undefined' && scroll) new ResizeObserver(paintOpenable).observe(scroll);
    requestAnimationFrame(paintOpenable);
    document.fonts?.ready.then(paintOpenable);

    // Cards appear one after another, like a phone that has just been unlocked.
    if (calm || typeof IntersectionObserver === 'undefined') {
      block.classList.add('is-in');
      return;
    }
    cards.forEach((card, i) => card.style.setProperty('--i', String(Math.min(i, STAGGER_CAP))));
    block.classList.add('is-armed');
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        block.classList.add('is-in');
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(block);
  });
}

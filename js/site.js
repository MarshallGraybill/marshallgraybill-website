/* ==========================================================================
   Marshall Graybill — site motion
   Gentle scroll reveals, self-drawing divider lines, smooth project filtering,
   and the gentoo penguin easter egg. Everything is skipped when the visitor
   has "reduce motion" turned on.
   ========================================================================== */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Gentle reveal on scroll + self-drawing lines ----------
     Only elements that start below the fold are hidden, so nothing above the
     fold flashes, and page-transition snapshots are never taken mid-fade. */
  const REVEAL = '.tile, .shots > figure, .shots .row > figure, .story, .study-index > a, .pub, .cv-entry, .features li, .part, .study-head';
  const LINES = '.story h2, .study-head, .cv-section, .pager, .part-head, .features li';

  function setup() {
    if (reduce || !('IntersectionObserver' in window)) return;
    const fold = window.innerHeight;
    const pending = [];
    document.querySelectorAll(LINES).forEach(el => el.classList.add('rule-draw'));
    document.querySelectorAll(REVEAL + ',' + LINES).forEach(el => {
      if (el.getBoundingClientRect().top > fold * 0.98) {
        if (el.matches(REVEAL)) el.classList.add('will-reveal');
        if (el.matches(LINES)) el.classList.add('will-draw');
        pending.push(el);
      }
    });
    const io = new IntersectionObserver(entries => {
      const shown = entries.filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      shown.forEach((e, i) => {
        e.target.style.transitionDelay = Math.min(i, 5) * 70 + 'ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    pending.forEach(el => io.observe(el));
    window.__revealAll = () => pending.forEach(el => el.classList.add('in'));
  }

  // Arriving through a page transition: show everything at once so the morph has a target.
  window.addEventListener('pagereveal', e => { if (e.viewTransition && window.__revealAll) window.__revealAll(); });

  /* ---------- Smooth filtering on the home grid (FLIP) ---------- */
  function filters() {
    const btns = document.querySelectorAll('.filters button');
    const tiles = [...document.querySelectorAll('.grid .tile')];
    if (!btns.length) return;
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.toggle('on', x === b));
      const show = t => b.dataset.f === 'all' || t.dataset.tags.split(' ').includes(b.dataset.f);
      const apply = () => tiles.forEach(t => t.classList.toggle('hide', !show(t)));
      if (reduce || !Element.prototype.animate) { apply(); return; }

      const before = new Map(tiles.filter(t => !t.classList.contains('hide')).map(t => [t, t.getBoundingClientRect()]));
      const leaving = tiles.filter(t => !t.classList.contains('hide') && !show(t));
      const fadeOut = leaving.map(t => t.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.96)' }],
        { duration: 160, easing: 'ease-in', fill: 'forwards' }).finished);

      Promise.all(fadeOut).then(() => {
        leaving.forEach(t => t.getAnimations().forEach(a => a.cancel()));
        apply();
        tiles.filter(t => !t.classList.contains('hide')).forEach((t, i) => {
          const now = t.getBoundingClientRect(), was = before.get(t);
          t.classList.add('in');
          if (was) {
            const dx = was.left - now.left, dy = was.top - now.top;
            if (dx || dy) t.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
              { duration: 520, easing: 'cubic-bezier(.2,.7,.2,1)' });
          } else {
            t.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
              { duration: 420, delay: 60 + i * 40, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' });
          }
        });
      });
    }));
  }

  /* ---------- Gentoo penguin easter egg ---------- */
  const PENGUIN = `<svg viewBox="10 4 44 58" aria-hidden="true"><g>
    <path fill="#1b1a18" d="M50 18.5 C46.5 16.6 43 15.2 40.5 13.4 C38.5 8.6 33.5 6.4 29 7.6 C24.4 8.8 22.4 13.2 23.2 18.6 C23.8 22.4 21 27 19.6 33 C18.2 39 18.6 45 17.2 50.2 C16.4 53.2 14.6 55.4 12.6 57.2 C16.6 57.4 20.6 56.4 23.6 55.2 C25 56.6 26.4 57.6 28 58 C31.6 58.6 36.4 58.6 41 58 C39.4 56.8 37.6 56.2 35.8 55.8 C41 51.4 43.6 44 42.6 36.6 C42 31.4 39.8 26.6 37.6 22.6 C41.6 21.4 46 20.4 50 18.5 Z"/>
    <path fill="#fff" stroke="#1b1a18" stroke-width="1.5" d="M37.6 22.6 C39.8 26.6 42 31.4 42.6 36.6 C43.6 44 41 51.4 35.8 55.8 C33.2 56.8 30.6 56.6 28.4 55.6 C31.8 50.4 33.6 44 33.4 36.6 C33.2 30.6 34 25.8 37.6 22.6 Z"/>
    <path fill="#1b1a18" d="M27.2 24.6 C24 30 23.6 38.6 29.4 47.8 C30.4 48.6 31.2 48 30.8 46.8 C28.6 39.6 28.8 31.8 30.2 26.4 C29.8 24.8 28.4 23.8 27.2 24.6 Z"/>
    <path fill="#fff" d="M35.4 10.6 C33 8.6 28.6 8.4 26.4 10.4 C28.8 10.2 31 11 32.2 12.8 C33.2 12.6 34.4 11.8 35.4 10.6 Z"/>
    <path fill="#e8642c" d="M40.5 13.4 C43 15.2 46.5 16.6 50 18.5 C46.4 19.4 43 19.4 39.6 18.4 C40.4 16.8 40.6 15 40.5 13.4 Z"/>
    <path fill="#e8642c" d="M27.4 57.2 C30 58.8 35.6 59 41 58 C39 56.6 36.8 56 34.4 56 C31.6 56 29.2 56.4 27.4 57.2 Z"/></g></svg>`;
  window.PENGUIN_SVG = PENGUIN;

  function footerPenguin() {
    const foot = document.querySelector('.site-footer');
    if (!foot || reduce) return;
    foot.classList.add('has-penguin');
    const walk = () => {
      if (foot.querySelector('.waddler')) return;
      const p = document.createElement('div');
      p.className = 'waddler';
      p.innerHTML = '<div class="bob">' + PENGUIN + '</div>';
      foot.appendChild(p);
      p.addEventListener('animationend', e => { if (e.target === p) p.remove(); });
    };
    // Click the copyright line to call the penguin any time.
    foot.style.cursor = 'pointer';
    foot.title = '🐧';
    foot.addEventListener('click', walk);
    // Otherwise it shows up now and then, at most once per visit.
    let seen = false;
    try { seen = sessionStorage.getItem('penguin') === '1'; } catch (e) {}
    if (seen || Math.random() > 0.35) return;
    const io = new IntersectionObserver(es => {
      if (es[0].isIntersecting) {
        io.disconnect(); setTimeout(walk, 500);
        try { sessionStorage.setItem('penguin', '1'); } catch (e) {}
      }
    }, { threshold: 1 });
    io.observe(foot);
  }

  function swimmer() {
    const pool = document.querySelector('.swim-pool');
    if (!pool) return;
    pool.innerHTML = '<div class="swimmer"><div class="glide">' + PENGUIN + '</div>' +
      '<i class="bubble b1"></i><i class="bubble b2"></i><i class="bubble b3"></i></div>';
  }

  document.addEventListener('DOMContentLoaded', () => { setup(); filters(); footerPenguin(); swimmer(); });
})();

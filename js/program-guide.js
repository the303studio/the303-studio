/* V50: The schedule category URL is defined in program-guide.html.
   Do not rewrite it using a stale hardcoded monthly notice list. */

/* V30: FAQ stays a native <details> without JS, with accessible animated
   height + opacity when motion is supported. Only one item remains open. */
(function () {
  'use strict';
  const faq = document.querySelector('.guide-faq-questions');
  if (!faq) return;
  const items = Array.from(faq.querySelectorAll('details.guide-faq-item'));
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (prefersReduced?.matches || !Element.prototype.animate) {
    items.forEach(item => item.addEventListener('toggle', () => {
      if (item.open) items.forEach(other => { if (other !== item) other.open = false; });
    }));
    return;
  }
  faq.classList.add('the303-faq-motion');
  // JS manages one-open behavior while allowing the previous answer to close
  // smoothly. With JS disabled, the original native name grouping still works.
  items.forEach(item => item.removeAttribute('name'));
  const running = new WeakMap();
  const ease = 'cubic-bezier(.22, 1, .36, 1)';
  function stop(item) {
    const old = running.get(item);
    old?.forEach(animation => animation.cancel());
    running.delete(item);
  }
  function run(item, opening) {
    const answer = item.querySelector('.guide-faq-answer');
    const summary = item.querySelector('summary');
    if (!answer || !summary) { item.open = opening; return; }
    stop(item);
    const start = item.getBoundingClientRect().height;
    if (opening) item.open = true;
    const border = parseFloat(getComputedStyle(item).borderBottomWidth) || 0;
    const end = opening ? item.scrollHeight + border : summary.getBoundingClientRect().height + border;
    item.style.overflow = 'hidden';
    const animHeight = item.animate([
      { height: `${start}px` }, { height: `${end}px` }
    ], { duration: opening ? 360 : 300, easing: ease, fill: 'forwards' });
    const animOpacity = answer.animate([
      { opacity: opening ? 0 : 1 }, { opacity: opening ? 1 : 0 }
    ], { duration: opening ? 310 : 240, easing: ease, fill: 'forwards' });
    const pair = [animHeight, animOpacity];
    running.set(item, pair);
    animHeight.finished.then(() => {
      if (running.get(item) !== pair) return;
      if (!opening) item.open = false;
      running.delete(item);
      pair.forEach(animation => animation.cancel());
      item.style.removeProperty('overflow');
    }).catch(() => {});
  }
  items.forEach(item => {
    const summary = item.querySelector('summary');
    summary?.addEventListener('click', event => {
      event.preventDefault();
      if (item.open) run(item, false);
      else {
        items.forEach(other => { if (other !== item && other.open) run(other, false); });
        run(item, true);
      }
    });
  });
  prefersReduced?.addEventListener?.('change', event => {
    if (!event.matches) return;
    items.forEach(item => {
      stop(item);
      item.style.removeProperty('overflow');
    });
    faq.classList.remove('the303-faq-motion');
    // Fallback to the existing native grouping if preference changes mid-session.
    items.forEach(item => item.setAttribute('name', 'the303-first-class-faq'));
  });
})();

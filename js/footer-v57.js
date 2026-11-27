/* THE303 STUDIO | V57 footer entrance (V56A) and original cursor (V55).
   Intentional separation: parent glides 88px to 0, then the unmodified
   footer-motion-test.js controls the inner glyph at its original ±5px. */
(() => {
  if (!document.body.classList.contains('the303-footer-v57')) return;
  const footer = document.querySelector('footer.site-footer');
  const area = footer?.querySelector('.footer-wordmark');
  const name = area?.querySelector('.footer-wordmark-name');
  if (!footer || !area || !name) return;

  const motion = matchMedia('(min-width:851px) and (prefers-reduced-motion:no-preference)');
  let started = false;
  let completed = false;
  let fallback = 0;

  function complete() {
    if (completed) return;
    completed = true;
    if (fallback) clearTimeout(fallback);
    /* An earlier pointermove may have set --slide during the intro.
       Zero it before restoring V55's own hover response to avoid a jump. */
    name.style.removeProperty('--slide');
    footer.classList.add('v57-cursor-ready');
  }
  function start() {
    if (started || completed || !motion.matches) return;
    started = true;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!motion.matches) { complete(); return; }
      footer.classList.add('v57-started');
      // Fallback for transitioncancel/tab suspension; transitionend is preferred.
      fallback = window.setTimeout(complete, 7350);
    }));
  }
  area.addEventListener('transitionend', event => {
    if (started && event.target === area && event.propertyName === 'transform') complete();
  });
  area.addEventListener('transitioncancel', event => {
    if (started && event.target === area && event.propertyName === 'transform' && !motion.matches) complete();
  });
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .25)) start();
  }, {threshold:[0,.25,.5]});
  observer.observe(footer);
  motion.addEventListener('change', () => {
    if (!motion.matches) {
      if (started && !completed) complete();
    } else if (!started && !completed && footer.getBoundingClientRect().top < innerHeight) {
      start();
    }
  });
})();

/* THE303 STUDIO | V65-05: one mobile entrance per page, no touch tracking. */
(() => {
  if (!document.body.classList.contains('the303-footer-v57')) return;
  const footer = document.querySelector('footer.site-footer');
  const area = footer?.querySelector('.footer-wordmark');
  if (!area || !('IntersectionObserver' in window)) return;
  const motion = matchMedia('(max-width:850px) and (prefers-reduced-motion:no-preference)');
  let observer, frame1 = 0, frame2 = 0, fallback = 0;
  let played = false;
  const armed = 'v65-mobile-footer-armed';
  const started = 'v65-mobile-footer-started';
  function clear() {
    observer?.disconnect(); observer = undefined;
    cancelAnimationFrame(frame1); cancelAnimationFrame(frame2);
    clearTimeout(fallback);
    footer.classList.remove(armed, started);
  }
  function start() {
    if (played || !motion.matches) return;
    played = true;
    observer?.disconnect();
    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        if (!motion.matches) { clear(); return; }
        footer.classList.add(started);
        fallback = setTimeout(clear, 4300);
      });
    });
  }
  function setup() {
    clear();
    if (!motion.matches || played) return;
    footer.classList.add(armed);
    observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting && e.intersectionRatio >= .25)) start();
    }, {threshold: [0, .25]});
    observer.observe(footer);
  }
  area.addEventListener('transitionend', e => {
    if (e.target === area && e.propertyName === 'transform' && footer.classList.contains(started)) clear();
  });
  motion.addEventListener('change', setup);
  setup();
})();

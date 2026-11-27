/* THE303 STUDIO | V41 Flying Yoga experience: restrained, perceivable scroll parallax.
   No extra library. One rAF loop runs only as needed. Desktop-only.
   Existing static 18px right-stagger is kept inside the CSS transform. */
(() => {
  'use strict';
  const body = document.body;
  if (body.dataset.page !== 'program-flying') return;
  const section = document.querySelector('.fly16-experience');
  const art = section?.querySelector('.fly16-experience-art');
  const left = art?.querySelector('.photo-frame.left');
  const right = art?.querySelector('.photo-frame.right');
  if (!section || !art || !left || !right) return;
  const frames = [left, right];
  const photos = frames.map(f => f.querySelector('img'));
  if (photos.some(img => !img)) return;

  const desktop = window.matchMedia('(min-width: 851px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const FRAME_RANGE = 20;  // +/-20px frames (40px full travel)
  const PHOTO_RANGE = 16;  // +/-16px photo crop (32px full travel)
  const LERP = 0.18;       // smooth inertia, follows scroll in both directions
  let frame = 0, photo = 0, goalFrame = 0, goalPhoto = 0;
  let raf = 0, enabled = false, inView = false;

  const valid = () => desktop.matches && !reduced.matches;
  const clamp01 = n => Math.max(0, Math.min(1, n));
  function paint() {
    left.style.setProperty('--fly-exp-frame-y', `${frame.toFixed(3)}px`);
    right.style.setProperty('--fly-exp-frame-y', `${(-frame).toFixed(3)}px`);
    photos[0].style.setProperty('--fly-exp-photo-y', `${photo.toFixed(3)}px`);
    photos[1].style.setProperty('--fly-exp-photo-y', `${(-photo).toFixed(3)}px`);
  }
  function animate() {
    raf = 0;
    if (!enabled || !valid()) return;
    frame += (goalFrame - frame) * LERP;
    photo += (goalPhoto - photo) * LERP;
    if (Math.abs(frame - goalFrame) < 0.05) frame = goalFrame;
    if (Math.abs(photo - goalPhoto) < 0.05) photo = goalPhoto;
    paint();
    if (frame !== goalFrame || photo !== goalPhoto) raf = requestAnimationFrame(animate);
  }
  function schedule() {
    if (enabled && valid() && !raf) raf = requestAnimationFrame(animate);
  }
  function onScroll() {
    if (!enabled || !valid() || !inView) return;
    // Use the VISIBLE PHOTO GRID, not the taller section. This concentrates
    // the motion where people can actually see both images moving.
    const rect = art.getBoundingClientRect();
    const h = window.innerHeight;
    const start = h * 0.88;
    const end = h * 0.22 - rect.height * 0.4;
    const progress = clamp01((start - rect.top) / Math.max(1, start - end));
    const direction = 1 - 2 * progress;
    goalFrame = FRAME_RANGE * direction;
    goalPhoto = PHOTO_RANGE * direction;
    schedule();
  }
  function enable() {
    if (!valid() || enabled) return;
    enabled = true;
    body.classList.add('the303-fly-experience-parallax');
    onScroll();
  }
  function disable() {
    enabled = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0; frame = photo = goalFrame = goalPhoto = 0;
    frames.forEach(f => f.style.removeProperty('--fly-exp-frame-y'));
    photos.forEach(p => p.style.removeProperty('--fly-exp-photo-y'));
    body.classList.remove('the303-fly-experience-parallax');
  }
  const observer = new IntersectionObserver(entries => {
    inView = !!entries[0]?.isIntersecting;
    if (inView) onScroll();
  }, {rootMargin:'45% 0px 45% 0px', threshold: 0});
  observer.observe(art);
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll, {passive:true});
  window.addEventListener('pageshow', onScroll);
  const sync = () => valid() ? enable() : disable();
  desktop.addEventListener?.('change', sync);
  reduced.addEventListener?.('change', sync);
  sync();
})();

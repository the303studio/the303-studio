window.addEventListener('load', () => {
  const one = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const panel = one('#philosophy');
  const title = panel.querySelector('.section-title');

  const desktop = matchMedia('(min-width:851px)');
  const reduce = matchMedia('(prefers-reduced-motion:reduce)');
  const pending = new Set();
  const options = {rootMargin:'0px 0px -18% 0px', threshold:0.1};
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting && entry.intersectionRatio >= .1) open(entry.target);
  }, options);
  function open(element) {
    element.classList.add('em-open');
    if (element.classList.contains('em-program-target')) element.classList.add('em-program-open');
    pending.delete(element);
    observer.unobserve(element);

  }
  function watch(element, className) {
    element.classList.add(className);
    pending.add(element);
    observer.observe(element);
  }
  function mask() {
    const span = document.createElement('span');
    span.className = 'em-mask';
    return span;
  }
  function split(element) {
    const source = element.cloneNode(true);
    source.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    const text = source.textContent.trim();
    if (!text) return;
    const fragment = document.createDocumentFragment();
    let index = 0;
    text.split(/\r?\n/).forEach((line, n) => {
      if (n) fragment.append('\n');
      const row = document.createElement('span');
      row.className = 'em-row';
      line.trim().split(/\s+/).forEach((word,i) => {
        if (i) row.append(' ');
        const box = mask();
        for (const part of element === title ? Array.from(word) : [word]) {
          const unit = document.createElement('span');
          unit.className = 'em-unit';
          unit.style.setProperty('--delay',index++ * (element === title ? .035 : .07) + 's');
          unit.textContent = part;
          box.append(unit);
        }
        row.append(box);
      });
      fragment.append(row);
    });
    element.replaceChildren(fragment);
    element.setAttribute('aria-label',text.replace(/\s+/g,' '));
  }
  // V52: the philosophy message is two whole editorial lines, not individual
  // glyphs. Keep the original [data-text] node and editor updates intact.
  function setPhilosophyLines() {
    if (title.querySelector('.phil-v52-line')) return;
    const original = title.textContent.trim();
    if (!original) return;
    const lines = original.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    const frag = document.createDocumentFragment();
    lines.forEach((line,index)=>{
      const span=document.createElement('span');
      span.className='phil-v52-line';
      span.style.setProperty('--phil-line-index',String(index));
      span.textContent=line;
      frag.append(span);
    });
    title.replaceChildren(frag);
    title.setAttribute('aria-label',original.replace(/\s+/g,' '));
  }
  for (let parent=title; parent && parent!==document.body; parent=parent.parentElement) {
    if (parent.classList.contains('reveal')) parent.classList.add('em-owned');
  }
  title.classList.add('phil-v52-title');
  setPhilosophyLines();
  new MutationObserver(()=>{
    if (!title.querySelector('.phil-v52-line')) setPhilosophyLines();
  }).observe(title,{childList:true});

  for (const element of all('#v06-program-title,.v06-cert-english,.v06-cert-title,#v06-media-heading,#journal-heading,.v07-journal-statement')) {
    for (let parent=element;parent && parent!==document.body;parent=parent.parentElement) {
      if(parent.classList.contains('reveal')) parent.classList.add('em-owned');
    }
    split(element);
    watch(element,'em-heading');
    new MutationObserver(() => { if (!element.querySelector('.em-unit')) split(element); }).observe(element,{childList:true});
  }

  // V55: trigger on the actual two-line title, not the outer PHILOSOPHY panel.
  // The panel enters earlier while the title is still offscreen, so the V54
  // one-shot animation often finished before the visitor could see it.
  let philosophyShown = false;
  let philObserver = null;
  function revealPhilosophy() {
    if (philosophyShown) return;
    philosophyShown = true;
    if (philObserver) philObserver.disconnect();
    if (reduce.matches) {
      panel.classList.add('phil-v52-visible');
      return;
    }
    // Let the prepared, hidden state paint first, including on direct anchors.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      panel.classList.add('phil-v52-visible');
    }));
  }
  function philosophyTitleInView() {
    const titleRect = title.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    return (titleRect.top <= innerHeight * .84 && titleRect.bottom > 0)
      || (titleRect.bottom <= 0 && panelRect.bottom > 0 && panelRect.top < innerHeight);
  }
  if (!reduce.matches && 'IntersectionObserver' in window) {
    panel.classList.add('phil-v52-ready');
    philObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) revealPhilosophy();
    }, {rootMargin: '0px 0px -16% 0px', threshold: .16});
    philObserver.observe(title);
    if (philosophyTitleInView()) revealPhilosophy();
  } else {
    revealPhilosophy();
  }
  const programNames = ['lift','glide','dance'];
  programNames.forEach((kind, index) => {
    const label = one('[data-text="prog' + (index + 1) + 'En"]');
    if (!label) return;
    const heading = label.closest('h3');
    heading.classList.add('em-program-name','em-' + kind);
    if (kind === 'dance') {
      split(label);
      new MutationObserver(() => {
        if (!label.querySelector('.em-unit')) split(label);
      }).observe(label,{childList:true});
    }
    watch(heading,'em-program-target');
  });
  const philKeywords = one('.phil-keywords');
  philKeywords.classList.add('em-group','em-open','em-phil-keywords');
  watch(one('.v07-gallery-grid'),'em-grid');
  all('.phil-kw-item').forEach((el,i)=>el.style.setProperty('--delay',(.83+i*.12)+'s'));
  all('.v07-gallery-tile').forEach((el,i)=>el.style.setProperty('--delay',i*.045+'s'));
  const photoObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('em-open');
      photoObserver.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -15% 0px' });
  const stills = all('.v06-dance-image,.v06-cert-image').map(frame => ({
    frame, image: frame.querySelector('img'), current: 0, target: 0
  }));
  for (const frame of all('.v06-dance-image,.v06-cert-image')) {
    frame.classList.add('em-photo','em-owned');
    photoObserver.observe(frame);
  }
  const hero=one('#home'), opening=one('.opening-scenes');

  const clamp=(x,min,max)=>Math.max(min,Math.min(max,x));
  const smoothstep=x=>{ const t=clamp(x,0,1); return t*t*(3-2*t); };
  let current=0,target=0,frame=0;
  function animate() {
    current+=(target-current)*.085;

    panel.style.setProperty('--drift',current.toFixed(2)+'px');

    let unsettled = false;
    for (const photo of stills) {
      photo.current += (photo.target - photo.current) * .09;
      photo.image.style.setProperty('--photo-offset',photo.current.toFixed(2)+'px');
      unsettled ||= Math.abs(photo.target - photo.current) > .025;
    }
    frame=unsettled || Math.abs(target-current)>.025 ? requestAnimationFrame(animate):0;
  }
  function update() {
    const y=scrollY,rect=panel.getBoundingClientRect();
    // A fast scroll can skip the observer threshold; do not leave the copy hidden.
    if (!philosophyShown && philosophyTitleInView()) revealPhilosophy();
    const wide=desktop.matches && !reduce.matches;
    for (const photo of stills) {
      const bounds = photo.frame.getBoundingClientRect();
      const travel = clamp((innerHeight - bounds.top) / (innerHeight + bounds.height),0,1);
      // Reserve the full travel on short frames as well.
      const scale = Math.max(1.045, (bounds.height + 20) / Math.max(1,photo.image.offsetHeight));
      photo.image.style.setProperty("--photo-scale",scale.toFixed(4));
      photo.target = wide ? (travel * 2 - 1) * 9 : 0;
      if (!wide) photo.current = 0;
    }
    const progress=clamp((innerHeight*.68-title.getBoundingClientRect().top)/(innerHeight*.48),0,1);
    target=reduce.matches?0:(progress-.5)*(desktop.matches?52:24);
    hero.style.translate=wide?'0 '+clamp(-opening.getBoundingClientRect().top,0,rect.height)+'px':'';

    if (!frame) frame=requestAnimationFrame(animate);
    if (y+innerHeight>=document.documentElement.scrollHeight-3) [...pending].forEach(open);
  }
  addEventListener('scroll',update,{passive:true});
  addEventListener('resize',update);
  addEventListener('pageshow',update);
  reduce.addEventListener('change',()=>{
    // If motion preference changes while a reveal is pending, show text now.
    if (reduce.matches) revealPhilosophy();
    else if (!philosophyShown && philosophyTitleInView()) revealPhilosophy();
    update();
  });
  update();
  console.log('[THE303] editorial-motion active');
});

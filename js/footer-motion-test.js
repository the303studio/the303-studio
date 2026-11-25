(() => {
  const footer = document.querySelector('footer.site-footer');
  const area = footer.querySelector('.footer-wordmark');
  const name = area.querySelector('.footer-wordmark-name');
  const mobile = matchMedia('(max-width:850px)');
  const bar = document.querySelector('.mobile-bottom-bar');
  const words = ['THE303','STUDIO'].map(text => {
    const word = document.createElement('span');
    word.textContent = text;
    return word;
  });
  name.replaceChildren(words[0], ' ', words[1]);
  const baseline = document.createElement('i');
  words[0].prepend(baseline);
  const canvas = document.createElement('canvas').getContext('2d');
  function fit() {
    const clear = mobile.matches && bar ? Math.max(0,bar.offsetHeight - parseFloat(getComputedStyle(document.body).paddingBottom)) : 0;
    document.body.style.setProperty('--test-bar-height', (mobile.matches && bar ? bar.offsetHeight : 0) + 'px');
    footer.style.setProperty('--clear', clear + 'px');
    const styles = getComputedStyle(area);
    const width = area.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
    area.style.setProperty('--word-size','100px');
    const size = 100 * width / Math.max(1,name.offsetWidth);
    area.style.setProperty('--word-size', Math.max(1,size * .997) + 'px');
    name.style.setProperty('--ink-fit', '1');
    name.style.setProperty('--ink-top', '0px');
    const font = getComputedStyle(name);
    canvas.font = font.fontWeight + ' ' + font.fontSize + ' ' + font.fontFamily;
    const first = canvas.measureText(mobile.matches ? 'THE303' : 'THE303 STUDIO');
    const last = mobile.matches ? canvas.measureText('STUDIO') : first;
    const top = baseline.getBoundingClientRect().top - name.getBoundingClientRect().top - first.actualBoundingBoxAscent;
    const rowStep = mobile.matches ? words[1].offsetTop - words[0].offsetTop : 0;
    const height = first.actualBoundingBoxAscent + rowStep + last.actualBoundingBoxDescent;
    const stretch = Math.max(1,area.clientHeight - 4) / Math.max(1,height);
    name.style.setProperty('--ink-fit',stretch);
    name.style.setProperty('--ink-top',(2 - top * stretch) + 'px');
  }
  const resize = new ResizeObserver(fit);
  resize.observe(area);
  if (bar) resize.observe(bar);
  fit();
  document.fonts.ready.then(fit);
  document.fonts.addEventListener('loadingdone',fit);
  footer.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || mobile.matches) return;
    const bounds = name.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    name.style.setProperty('--slide', Math.max(-5,Math.min(5,(x-.5)*10)) + 'px');
    name.style.setProperty('--x',x*100+'%');
    name.style.setProperty('--y',(event.clientY-bounds.top)/bounds.height*100+'%');
  });
  footer.addEventListener('pointerleave',() => name.style.removeProperty('--slide'));
})();

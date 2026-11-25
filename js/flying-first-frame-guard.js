/* THE303 STUDIO | 03.TEST only | safe PC fallback for first flying stills.
   Image files are packaged with the page. In case an old editor setting refers
   to an image located only in a previous local folder, revert that one image
   to its packaged default. All valid custom paths and mobile views are kept. */
(()=>{'use strict';
  const desktop=window.matchMedia('(min-width: 851px)');
  const firstHero=document.querySelector('#home .hero-slide--line .hero-bg');
  const firstProgram=document.querySelector('#program [data-sequence="flying"] .v09-film-layer:first-child img');
  const defaultHero='./images/main/rolling/01-precision-pc.jpg';
  const defaultProgram='./images/main/flying-sequence/flying-01-pc.webp';
  const lastProbed=new WeakMap();
  function samePath(a,b){
    try {return new URL(a,document.baseURI).href===new URL(b,document.baseURI).href;}
    catch(_) {return a===b;}
  }
  function bgPath(el){
    const css=el?.style.backgroundImage||'';
    const match=css.match(/^url\(["']?(.*?)["']?\)$/i);
    return match?.[1]||'';
  }
  function restoreHero(bad){
    if(!desktop.matches || !firstHero?.isConnected || bgPath(firstHero)!==bad)return;
    firstHero.style.backgroundImage=`url(${JSON.stringify(defaultHero)})`;
    firstHero.dataset.imageDesktop=defaultHero;
    firstHero.dataset.currentImage=defaultHero;
  }
  function restoreProgram(bad){
    if(!desktop.matches || !firstProgram?.isConnected || firstProgram.getAttribute('src')!==bad)return;
    firstProgram.setAttribute('src',defaultProgram);
    document.dispatchEvent(new Event('the303:content-updated'));
  }
  function probe(el, path, fallback, onFail){
    if(!desktop.matches || !el || !path || samePath(path,fallback))return;
    if(lastProbed.get(el)===path)return;
    lastProbed.set(el,path);
    const candidate=new Image();
    candidate.onerror=()=>onFail(path);
    candidate.src=path;
  }
  function inspect(){
    if(!desktop.matches)return;
    if(firstHero){probe(firstHero,bgPath(firstHero),defaultHero,restoreHero);}
    if(firstProgram){
      const src=firstProgram.getAttribute('src')||'';
      probe(firstProgram,src,defaultProgram,restoreProgram);
      // Even if image decoding already failed, a previously saved custom path
      // should never leave the first key visual permanently blank.
      if(firstProgram.complete&&!firstProgram.naturalWidth&&!samePath(src,defaultProgram))restoreProgram(src);
    }
  }
  firstProgram?.addEventListener('error',()=>{
    const src=firstProgram.getAttribute('src')||'';
    if(!samePath(src,defaultProgram))restoreProgram(src);
  });
  document.addEventListener('the303:content-updated',inspect);
  firstHero?.addEventListener('the303:image-changed',inspect);
  if(desktop.addEventListener)desktop.addEventListener('change',inspect);
  else if(desktop.addListener)desktop.addListener(inspect);
  inspect();
})();

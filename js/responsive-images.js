/* THE303 STUDIO — responsive photo routing, independent of page layout.
   Missing mobile crop is optional: desktop source remains usable.
   CSS and source paths are declared per page, not shared between pages. */
(()=>{'use strict';
  const mq=window.matchMedia('(max-width: 850px)');
  const cache=new Map();
  const jobs=new WeakMap();
  function probe(url){
    if(!url)return Promise.resolve(false);
    if(cache.has(url))return cache.get(url);
    const job=new Promise(resolve=>{
      const img=new Image();
      img.onload=()=>resolve(true);
      img.onerror=()=>resolve(false);
      img.src=url;
    });
    cache.set(url,job);return job;
  }
  function choose(element,desktop,mobile,done){
    const ticket=(jobs.get(element)||0)+1;jobs.set(element,ticket);
    if(!mq.matches||!mobile||mobile===desktop){done(desktop);return;}
    // Do not replace the desktop fallback until the mobile crop really exists.
    probe(mobile).then(available=>{
      if(jobs.get(element)!==ticket)return;
      done(available?mobile:desktop);
    });
  }
  function refreshOne(element){
    const desktop=element.dataset.imageDesktop;
    const mobile=element.dataset.imageMobile;
    if(!desktop)return;
    if(element.tagName==='IMG'){
      choose(element,desktop,mobile,src=>{
        if(element.getAttribute('src')!==src)element.setAttribute('src',src);
      });
    } else {
      choose(element,desktop,mobile,src=>{
        if(element.dataset.currentImage===src)return;
        element.style.backgroundImage='url('+JSON.stringify(src)+')';
        element.dataset.currentImage=src;
        element.dispatchEvent(new Event('the303:image-changed'));
      });
    }
  }
  function refresh(){document.querySelectorAll('img[data-image-mobile], [data-image-bg-mobile]').forEach(refreshOne);}
  // Initial fallback source remains in src/style if mobile crop has not been supplied.
  document.querySelectorAll('img[data-image-mobile]').forEach(el=>{
    el.dataset.imageDesktop=el.getAttribute('src');
  });
  document.querySelectorAll('[data-image-bg-mobile]').forEach(el=>{
    const m=(el.getAttribute('style')||'').match(/background-image:\s*url\(["']?(.*?)["']?\)/);
    if(m)el.dataset.imageDesktop=m[1];
  });
  if(mq.addEventListener)mq.addEventListener('change',refresh);
  else if(mq.addListener)mq.addListener(refresh);
  window.THE303ImageRoutes={refresh,refreshOne,probe};
  refresh();
})();

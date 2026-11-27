(()=>{
  'use strict';
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sequences=[...document.querySelectorAll('.v07-sequence')];
  const controllers=[];
  // V09: five independently composed stills inside one fixed viewport.
  // The separate V07 media sequence and nine-image journal lightbox retain their behavior.
  // V13: both flagship programs start with one motionless, editorial key visual.
  // Desktop: hover for 220 ms -> one five-frame pass -> still again.
  // Any device: an independent accessible button also launches exactly one pass.
  // Links remain independent of the action button; reduced motion shows one static image.
  function initMotionSequence(box, frames, count) {
    const interval=700;
    const fade=Math.max(0,Number(box.dataset.fade)||140);
    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const canHover=window.matchMedia('(hover: hover) and (pointer: fine)');
    const shell=box.closest('[data-motion-shell]');
    const trigger=shell?.querySelector('[data-motion-trigger]');
    const sources=[...box.querySelectorAll('source[data-v09-mobile-default]')];
    let active=0, progress=0, playing=false, inView=false;
    let timer=null, cleanupTimer=null, hoverTimer=null;
    let prepared=false, preparing=null, epoch=0, visibleFrames=frames;
    let replayed=false;

    function counter(){if(count)count.textContent=String(active+1).padStart(2,'0')+' / '+String(frames.length).padStart(2,'0')}
    function updateButton(){
      if(!trigger)return;
      const label=trigger.querySelector('[data-motion-label]');
      if(label)label.textContent=playing?'PLAYING':replayed?'REPLAY MOTION':'PLAY MOTION';
      trigger.dataset.playing=String(playing);
      trigger.setAttribute('aria-label', (shell?.dataset.motionShell==='barre'?'바레':'플라잉요가')+ (playing?' 사진 시퀀스 재생 중':' 사진 시퀀스 한 번 재생'));
    }
    function syncSources(){
      let changed=false;
      sources.forEach(src=>{
        const img=src.parentElement?.querySelector('img');
        if(!img)return;
        const desktop=img.getAttribute('src')||'';
        const intended=desktop===src.dataset.v09DesktopDefault ? src.dataset.v09MobileDefault : desktop;
        if(src.getAttribute('srcset')!==intended){src.setAttribute('srcset',intended);changed=true;}
      });
      return changed;
    }
    function clearTimers(){
      if(timer!==null){clearTimeout(timer);timer=null;}
      if(cleanupTimer!==null){clearTimeout(cleanupTimer);cleanupTimer=null;}
      if(hoverTimer!==null){clearTimeout(hoverTimer);hoverTimer=null;}
    }
    function still(){
      clearTimers();playing=false;progress=0;active=0;
      box.classList.remove('v09-film-playing','v111-corner-flash');
      frames.forEach((frame,i)=>{
        frame.classList.toggle('is-current',i===0);
        frame.classList.remove('is-exiting');
        frame.setAttribute('aria-hidden',String(i!==0));
      });
      counter();updateButton();
    }
    function switchTo(next){
      if(cleanupTimer!==null){clearTimeout(cleanupTimer);cleanupTimer=null;}
      const old=frames[active];
      const fresh=frames[next];
      frames.forEach(f=>{if(f!==old)f.classList.remove('is-exiting');});
      if(old!==fresh){
        old.classList.add('is-exiting');old.classList.remove('is-current');
        fresh.classList.remove('is-exiting');fresh.classList.add('is-current');
        old.setAttribute('aria-hidden','true');fresh.setAttribute('aria-hidden','false');
        cleanupTimer=setTimeout(()=>{old.classList.remove('is-exiting');cleanupTimer=null;},fade);
      }
      active=next;counter();
      box.classList.remove('v111-corner-flash');
      void box.offsetWidth;
      box.classList.add('v111-corner-flash');
    }
    function step(){
      if(!playing||!inView||document.hidden||reduceMotion.matches){still();return;}
      progress++;
      const available=visibleFrames.length===frames.length?frames:visibleFrames;
      const nextFrame=available[progress % available.length];
      const next=frames.indexOf(nextFrame);
      if(next<0){still();return;}
      switchTo(next);
      if(progress>=available.length){
        // Final beat is the original key visual. Never auto-loop.
        timer=setTimeout(()=>{timer=null;playing=false;replayed=true;still();},Math.max(220,fade+90));
      }else{
        timer=setTimeout(step,interval);
      }
    }
    async function warm(){
      if(reduceMotion.matches)return;
      if(prepared)return;
      if(preparing)return preparing;
      syncSources();const thisEpoch=epoch;
      preparing=Promise.all(frames.map(async img=>{
        img.loading='eager';
        try{await img.decode();return img.naturalWidth>0;}
        catch(_){return img.complete&&img.naturalWidth>0;}
      })).then(success=>{
        if(thisEpoch!==epoch)return;
        visibleFrames=frames.filter((_,i)=>success[i]);
        prepared=true;
      }).finally(()=>{if(thisEpoch===epoch)preparing=null;});
      return preparing;
    }
    async function play({restart=false,viaHover=false}={}){
      if(playing&&!restart)return;
      if(viaHover&&!shell?.matches(':hover'))return;
      if(reduceMotion.matches||!inView||document.hidden)return;
      const thisEpoch=epoch;
      if(!prepared)await warm();
      if(thisEpoch!==epoch||!inView||document.hidden||reduceMotion.matches||visibleFrames.length<2)return;
      if(viaHover&&!shell?.matches(':hover'))return;
      if(playing&&!restart)return;
      still();replayed=false;playing=true;progress=0;
      box.classList.add('v09-film-playing');
      updateButton();
      timer=setTimeout(step,interval);
    }
    function hoverEnter(e){
      if(!canHover.matches || e.pointerType!=='mouse' || reduceMotion.matches)return;
      if(hoverTimer!==null)clearTimeout(hoverTimer);
      hoverTimer=setTimeout(()=>{hoverTimer=null;if(shell?.matches(':hover'))play({viaHover:true});},220);
    }
    function hoverExit(){
      if(hoverTimer!==null){clearTimeout(hoverTimer);hoverTimer=null;}
      // Re-arming needs a new pointer entry, so never restart under a stationary cursor.
      if(playing)still();
    }
    if(shell){shell.addEventListener('pointerenter',hoverEnter);shell.addEventListener('pointerleave',hoverExit);}
    if(trigger)trigger.addEventListener('click',event=>{
      event.stopPropagation();event.preventDefault();
      play({restart:true});
    });
    function setView(value){
      inView=value;
      if(!value){still();return;}
      if(!reduceMotion.matches)warm();
    }
    function onMotionChange(){still();if(inView&&!reduceMotion.matches)warm();}
    if(reduceMotion.addEventListener)reduceMotion.addEventListener('change',onMotionChange);
    else if(reduceMotion.addListener)reduceMotion.addListener(onMotionChange);
    function refresh(){
      const changed=syncSources();
      const signature=frames.map(f=>f.getAttribute('src')).join('|')+'|'+sources.map(x=>x.getAttribute('srcset')).join('|');
      if(!changed&&signature===refresh.lastSignature)return;
      refresh.lastSignature=signature;epoch++;prepared=false;preparing=null;visibleFrames=frames;replayed=false;
      still();if(inView&&!reduceMotion.matches)warm();
    }
    syncSources();
    refresh.lastSignature=frames.map(f=>f.getAttribute('src')).join('|')+'|'+sources.map(x=>x.getAttribute('srcset')).join('|');
    document.addEventListener('the303:content-updated',refresh);
    still();
    if('IntersectionObserver' in window){
      const preloadObserver=new IntersectionObserver(entries=>{
        if(entries.some(e=>e.isIntersecting)){warm();preloadObserver.disconnect();}
      },{rootMargin:'350px 0px 350px 0px',threshold:0});
      preloadObserver.observe(box);
    }
    controllers.push({box,setView,pause:still,start:()=>{if(!document.hidden&&inView)warm()}});
  }

  sequences.forEach(box=>{
    const frames=[...box.querySelectorAll('.v07-sequence-frame')];
    if(frames.length<2)return;
    const count=box.querySelector('.v07-sequence-count');
    const isMotion=box.dataset.sequence==='flying'||box.dataset.sequence==='barre';
    if(isMotion){initMotionSequence(box,frames,count);return;}
    const isFlying=false;
    // V08: exactly 700ms at full opacity plus a 140ms photo dissolve.
    const delay=isFlying ? (Number(box.dataset.hold)||700)+(Number(box.dataset.fade)||140) : Math.max(2600,Number(box.dataset.delay)||3800);
    let active=0,timer=null,inView=false,ready=!isFlying,preloading=null;
    function preloadFlying(){
      if(!isFlying || ready)return Promise.resolve();
      if(preloading)return preloading;
      // Start only after all five photos are available so quick cuts never flash blank.
      preloading=Promise.all(frames.map(img=>{
        img.loading='eager';
        if(img.complete)return Promise.resolve();
        return new Promise(resolve=>{
          img.addEventListener('load',resolve,{once:true});
          img.addEventListener('error',resolve,{once:true});
        });
      })).then(()=>{ready=true;if(inView)start();});
      return preloading;
    }
    function render(){
      frames.forEach((frame,i)=>{frame.classList.toggle('is-current',i===active);frame.setAttribute('aria-hidden',String(i!==active));});
      if(count)count.textContent=String(active+1).padStart(2,'0')+' / '+String(frames.length).padStart(2,'0');
    }
    function pause(){if(timer!==null){clearTimeout(timer);timer=null;}}
    function start(){
      pause();if(reduce||!inView||document.hidden)return;
      if(isFlying&&!ready){preloadFlying();return;}
      timer=window.setTimeout(()=>{active=(active+1)%frames.length;render();start();},delay);
    }
    controllers.push({box,start,pause,setView:v=>{inView=v;v?start():pause()}});
    render();
  });
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>controllers.find(c=>c.box===entry.target)?.setView(entry.isIntersecting));
    },{rootMargin:'0px 0px -45px 0px',threshold:.2});
    controllers.forEach(c=>observer.observe(c.box));
  }else controllers.forEach(c=>c.setView(true));
  document.addEventListener('visibilitychange',()=>controllers.forEach(c=>document.hidden?c.pause():c.start()));

  const frame=document.getElementById('v07Lightbox');
  const tiles=[...document.querySelectorAll('.v07-gallery-tile')];
  if(!frame||!tiles.length)return;
  const picture=frame.querySelector('.v07-lightbox-image');
  const caption=document.getElementById('v07LightboxCaption');
  const counter=document.getElementById('v07LightboxNumber');
  const closeButton=frame.querySelector('.v07-lightbox-close');
  const prev=frame.querySelector('.v07-lightbox-prev');
  const next=frame.querySelector('.v07-lightbox-next');
  let active=0,opener=null,previousOverflow='';
  function update(){
    const tile=tiles[active];
    const thumb=tile.querySelector('img');
    const src=tile.dataset.fullSrc || thumb?.currentSrc || thumb?.src || '';
    picture.onerror=()=>{picture.onerror=null;picture.src=thumb?.currentSrc||thumb?.src||''};
    picture.src=src;
    picture.alt=thumb?.alt||'THE303 갤러리 사진';
    caption.textContent=tile.querySelector('.v07-tile-caption')?.textContent?.trim()||picture.alt;
    counter.textContent=String(active+1).padStart(2,'0')+' / '+String(tiles.length).padStart(2,'0');
  }
  function open(index,button){
    active=index;opener=button;previousOverflow=document.body.style.overflow;
    frame.hidden=false;document.body.classList.add('v07-lightbox-open');
    document.body.style.overflow='hidden';update();closeButton.focus({preventScroll:true});
  }
  function close(){
    if(frame.hidden)return;
    frame.hidden=true;picture.removeAttribute('src');picture.onerror=null;
    document.body.classList.remove('v07-lightbox-open');document.body.style.overflow=previousOverflow;
    opener?.focus({preventScroll:true});
  }
  function step(offset){active=(active+offset+tiles.length)%tiles.length;update();}
  tiles.forEach((tile,i)=>tile.addEventListener('click',()=>open(i,tile)));
  closeButton.addEventListener('click',close);
  prev.addEventListener('click',()=>step(-1));next.addEventListener('click',()=>step(1));
  frame.addEventListener('click',event=>{if(event.target===frame)close()});
  document.addEventListener('keydown',event=>{
    if(frame.hidden)return;
    if(event.key==='Escape'){event.preventDefault();close();}
    else if(event.key==='ArrowLeft'){event.preventDefault();step(-1);}
    else if(event.key==='ArrowRight'){event.preventDefault();step(1);}
    else if(event.key==='Tab'){
      const focusables=[closeButton,prev,next],i=focusables.indexOf(document.activeElement);
      if(i===-1){event.preventDefault();closeButton.focus();}
      else if(event.shiftKey&&i===0){event.preventDefault();next.focus();}
      else if(!event.shiftKey&&i===focusables.length-1){event.preventDefault();closeButton.focus();}
    }
  });
  // Touch swipe within expanded image.
  let x=0,y=0;
  picture.addEventListener('touchstart',e=>{x=e.changedTouches[0]?.clientX||0;y=e.changedTouches[0]?.clientY||0;},{passive:true});
  picture.addEventListener('touchend',e=>{const p=e.changedTouches[0];if(!p)return;const dx=p.clientX-x,dy=p.clientY-y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2)step(dx<0?1:-1);},{passive:true});
})();
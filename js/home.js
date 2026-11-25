/* THE303 STUDIO | five-scene hero | stable two-panel sliding transition.
   Unlike the old seven-panel 700%-wide rail, only outgoing/incoming panels
   move. This avoids a huge composite layer on older GPUs and retains the
   same horizontal slide, photo zoom, controls and editor image bindings. */
(()=>{
  'use strict';
  /* V38: The home hero may be sticky, so #home's visual position can
     remain at the viewport top even while the document is scrolled.
     Only the MAIN PAGE brand link should restore the actual page origin. */
  document.querySelector('.site-header a.brand[href="#home"]')?.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    // Removing #home prevents stale fragment navigation on subsequent visits.
    try{history.replaceState(history.state,'',location.href.split('#')[0]);}catch(_){/* local preview restrictions */}
    const root=document.documentElement;
    const previous=root.style.scrollBehavior;
    root.style.scrollBehavior='auto';
    // Flush the style change before scrolling (otherwise CSS smooth may win).
    getComputedStyle(root).scrollBehavior;
    window.scrollTo(0,0);
    requestAnimationFrame(()=>{root.style.scrollBehavior=previous;});
  });
  const hero=document.getElementById('home');
  const slider=document.getElementById('heroSlider');
  if(!hero||!slider||!hero.classList.contains('the303-intro-v05'))return;
  const slides=[...slider.querySelectorAll('.hero-slide')];
  const buttons=[...hero.querySelectorAll('.hero-dot')];
  const pauseButton=hero.querySelector('#heroPause');
  const nowEl=hero.querySelector('#heroNow');
  if(slides.length<2)return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const INTERVAL=3600;               // 2026-11-15: previous 4100 ms; slightly faster homepage rhythm.
  const TRANSITION_MS=460;           // 2026-11-15: previous 520 ms; preserve existing slide motion.
  const EASING='cubic-bezier(.68,.02,.22,1)';
  let active=0,timer=null,typeTimer=null,settleTimer=null;
  let manuallyPaused=false,pointerX=0,pointerY=0;
  const decodedImages=new Map();
  const transform=x=>`translate3d(${x}%,0,0)`;
  function noMotion(){return motion.matches;}
  function openMenu(){return document.body.classList.contains('menu-open')||document.getElementById('menuToggle')?.getAttribute('aria-expanded')==='true';}
  function stopAuto(){if(timer!==null){clearTimeout(timer);timer=null;}}
  function stopText(){if(typeTimer!==null){clearTimeout(typeTimer);typeTimer=null;}}
  function setMetadata(real){
    slides.forEach((node,i)=>{
      const selected=i===real;
      node.classList.toggle('active',selected);
      node.classList.remove('v10-text-ready');
      node.setAttribute('aria-hidden',String(!selected));
      node.querySelectorAll('a,button').forEach(a=>{a.tabIndex=selected?0:-1;});
    });
    buttons.forEach((btn,i)=>btn.setAttribute('aria-pressed',String(i===real)));
    if(nowEl)nowEl.textContent=String(real+1).padStart(2,'0');
    hero.dataset.scene=slides[real].dataset.scene;
  }
  function settle(){
    if(settleTimer!==null){clearTimeout(settleTimer);settleTimer=null;}
    slides.forEach((node,i)=>{
      const shown=i===active;
      node.style.transition='none';
      node.style.transform=transform(shown?0:100);
      node.style.visibility=shown?'visible':'hidden';
      node.style.zIndex=shown?'2':'0';
      node.style.pointerEvents=shown?'auto':'none';
    });
  }
  function warmImage(index){
    const slide=slides[((index%slides.length)+slides.length)%slides.length];
    const layer=slide.querySelector('.hero-bg');
    if(!layer)return;
    const css=getComputedStyle(layer).backgroundImage;
    const m=css.match(/url\(["']?(.*?)["']?\)/);
    const src=m?.[1];
    if(!src||decodedImages.has(src))return;
    const img=new Image();img.decoding='async';img.src=src;
    decodedImages.set(src,img);
    if(typeof img.decode==='function')img.decode().catch(()=>{});
    // Retain only the nearby images in memory, without touching background assets.
    if(decodedImages.size>3)decodedImages.delete(decodedImages.keys().next().value);
  }
  function go(index,{initial=false}={}){
    const count=slides.length;
    const incoming=((index%count)+count)%count;
    if(!initial&&incoming===active)return;
    stopText();
    settle();
    const outgoing=slides[active];
    const next=slides[incoming];
    const direction=index>=count?1:index<0?-1:index>active?1:-1;
    active=incoming;
    setMetadata(active);
    if(initial||noMotion()){
      settle();
      next.classList.add('v10-text-ready');
    }else{
      outgoing.style.visibility='visible';
      outgoing.style.zIndex='1';
      outgoing.style.pointerEvents='none';
      outgoing.style.transition='none';
      outgoing.style.transform=transform(0);
      next.style.visibility='visible';
      next.style.zIndex='2';
      next.style.pointerEvents='auto';
      next.style.transition='none';
      next.style.transform=transform(direction*100);
      // Commit the starting positions before the two short GPU-sized panels move.
      void next.offsetWidth;
      const transition=`transform ${TRANSITION_MS}ms ${EASING}`;
      outgoing.style.transition=transition;
      next.style.transition=transition;
      outgoing.style.transform=transform(-direction*100);
      next.style.transform=transform(0);
      settleTimer=setTimeout(settle,TRANSITION_MS+80);
      typeTimer=setTimeout(()=>{
        next.classList.add('v10-text-ready');
        typeTimer=null;
      },TRANSITION_MS+80);
    }
    warmImage(active);
    warmImage(active+1);
  }
  function schedule(){
    stopAuto();
    if(noMotion()||manuallyPaused||document.hidden||openMenu())return;
    timer=setTimeout(()=>{go(active+1);schedule();},INTERVAL);
  }
  function navigate(i){go(i);schedule();}
  function pause(value){
    manuallyPaused=Boolean(value);
    if(pauseButton){
      pauseButton.setAttribute('aria-label',manuallyPaused?'자동 전환 재생':'자동 전환 일시정지');
      pauseButton.setAttribute('aria-pressed',String(manuallyPaused));
      const mark=pauseButton.querySelector('span');if(mark)mark.textContent=manuallyPaused?'▶':'Ⅱ';
    }
    schedule();
  }
  go(0,{initial:true});
  slider.classList.add('v111-loop-ready');
  schedule();
  buttons.forEach((btn,i)=>btn.addEventListener('click',()=>{
    if(active===slides.length-1&&i===0)navigate(slides.length);
    else if(active===0&&i===slides.length-1)navigate(-1);
    else navigate(i);
  }));
  pauseButton?.addEventListener('click',()=>pause(!manuallyPaused));
  hero.addEventListener('touchstart',event=>{
    const t=event.changedTouches?.[0];if(t){pointerX=t.clientX;pointerY=t.clientY;}
  },{passive:true});
  hero.addEventListener('touchend',event=>{
    const t=event.changedTouches?.[0];if(!t)return;
    const dx=t.clientX-pointerX,dy=t.clientY-pointerY;
    if(Math.abs(dx)>44&&Math.abs(dx)>1.2*Math.abs(dy))navigate(active+(dx<0?1:-1));
  },{passive:true});
  hero.addEventListener('keydown',event=>{
    if(!hero.contains(document.activeElement))return;
    if(event.key==='ArrowRight'){event.preventDefault();navigate(active+1);}
    if(event.key==='ArrowLeft'){event.preventDefault();navigate(active-1);}
  });
  document.addEventListener('visibilitychange',schedule);
  document.getElementById('menuToggle')?.addEventListener('click',()=>setTimeout(schedule,0));
  document.getElementById('navBackdrop')?.addEventListener('click',()=>setTimeout(schedule,0));
  document.addEventListener('the303:content-updated',()=>{decodedImages.clear();warmImage(active);warmImage(active+1);});
  if(motion.addEventListener)motion.addEventListener('change',()=>{go(active,{initial:true});schedule();});
})();

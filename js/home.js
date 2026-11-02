(()=>{
 'use strict';
 const slider=document.getElementById('heroSlider');
 if(!slider)return;
 const slides=Array.from(slider.querySelectorAll('.hero-slide'));
 const dots=Array.from(document.querySelectorAll('.hero-dot'));
 const hero=document.querySelector('.hero');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(!slides.length)return;
 let active=0,timer=null,touchX=0;
 slider.style.width=`${slides.length*100}%`;
 slides.forEach(slide=>slide.style.width=`${100/slides.length}%`);
 function show(index){
  active=(index+slides.length)%slides.length;
  slider.style.transform=`translateX(-${active*(100/slides.length)}%)`;
  slides.forEach((s,i)=>{s.classList.toggle('active',i===active);s.setAttribute('aria-hidden',String(i!==active));
    s.querySelectorAll('a').forEach(a=>{if(i===active)a.removeAttribute('tabindex');else a.setAttribute('tabindex','-1');});});
  dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===active)));
 }
 function stop(){if(timer!==null){clearInterval(timer);timer=null;}}
 function start(){
  stop();if(reduce||document.hidden||matchMedia('(max-width: 850px)').matches&&document.body.classList.contains('menu-open'))return;
  timer=setInterval(()=>show(active+1),5500);
 }
 show(0);start();
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);start();}));
 hero?.addEventListener('mouseenter',()=>{if(innerWidth>850)stop();});
 hero?.addEventListener('mouseleave',()=>{if(innerWidth>850)start();});
 hero?.addEventListener('focusin',stop);
 hero?.addEventListener('focusout',event=>{if(!hero.contains(event.relatedTarget))start();});
 hero?.addEventListener('touchstart',event=>{touchX=event.changedTouches[0].screenX;},{passive:true});
 hero?.addEventListener('touchend',event=>{
  const dx=touchX-event.changedTouches[0].screenX;
  if(Math.abs(dx)>=50){show(active+(dx>0?1:-1));start();}
 },{passive:true});
 document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
})();

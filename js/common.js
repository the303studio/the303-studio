(()=>{
  'use strict';
  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header=$('#siteHeader');
  const panel=$('#navPanel');
  const toggle=$('#menuToggle');
  const backdrop=$('#navBackdrop');
  const topButton=$('#toTop');
  const year=$('#currentYear');
  if(year) year.textContent=String(new Date().getFullYear());

  function closeMenu(){
    if(!panel||!toggle)return;
    panel.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','메뉴 열기');
    toggle.querySelector('path')?.setAttribute('d','M3 7h18M3 12h18M3 17h18');
    document.body.classList.remove('menu-open');
    header?.classList.remove('menu-expanded');
    $$('.nav-dropdown').forEach(item=>{
      item.classList.remove('open');
      item.querySelector('.submenu-toggle')?.setAttribute('aria-expanded','false');
    });
  }
  function openMenu(){
    if(!panel||!toggle)return;
    panel.classList.add('open');
    toggle.setAttribute('aria-expanded','true');
    toggle.setAttribute('aria-label','메뉴 닫기');
    toggle.querySelector('path')?.setAttribute('d','M5 5L19 19M19 5L5 19');
    document.body.classList.add('menu-open');
    header?.classList.add('menu-expanded');
  }
  toggle?.addEventListener('click',()=>panel?.classList.contains('open')?closeMenu():openMenu());
  backdrop?.addEventListener('click',closeMenu);
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&panel?.classList.contains('open')){
      closeMenu();toggle?.focus();
    }
  });
  window.addEventListener('resize',()=>{if(innerWidth>1024)closeMenu();});
  $$('.submenu-toggle').forEach(button=>{
    button.setAttribute('aria-expanded','false');
    const parent=button.closest('.nav-dropdown');
    button.setAttribute('aria-label',`${parent?.querySelector('.nav-link')?.textContent?.trim()||'하위'} 메뉴 펼치기`);
    button.addEventListener('click',event=>{
      event.stopPropagation();
      const willOpen=!parent?.classList.contains('open');
      $$('.nav-dropdown').forEach(item=>{
        item.classList.remove('open');
        item.querySelector('.submenu-toggle')?.setAttribute('aria-expanded','false');
      });
      parent?.classList.toggle('open',willOpen);
      button.setAttribute('aria-expanded',String(willOpen));
    });
  });
  $$('.nav-panel a').forEach(link=>link.addEventListener('click',event=>{
    const parent=link.closest('.nav-dropdown');
    if(innerWidth<=1024&&parent&&!link.closest('.dropdown-menu')){
      event.preventDefault();parent.querySelector('.submenu-toggle')?.click();
    }else if(innerWidth<=1024){closeMenu();}
  }));
  const scrollUpdate=()=>{
    header?.classList.toggle('scrolled',scrollY>30);
    topButton?.classList.toggle('show',scrollY>500);
  };
  addEventListener('scroll',scrollUpdate,{passive:true});
  scrollUpdate();
  topButton?.addEventListener('click',()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'}));

  /* All content photos have a quiet placeholder if a future file is not yet present. */
  $$('img').forEach(img=>{
    const parent=img.parentElement;
    if(!parent)return;
    const showMissing=()=>{
      parent.classList.add('image-unavailable');
      parent.dataset.imageLabel=parent.classList.contains('news-thumb')?'이미지 준비 중':
        (parent.classList.contains('mss-image')?'MEDIA STUDIO':'이미지 준비 중');
    };
    img.addEventListener('error',showMissing);
    img.addEventListener('load',()=>parent.classList.remove('image-unavailable'));
    if(img.complete&&!img.naturalWidth)showMissing();
  });
  $$('[data-image-bg]').forEach(el=>{
    let probe;
    const check=()=>{
      const style=getComputedStyle(el).backgroundImage;
      const match=style.match(/url\(["']?(.*?)["']?\)/);
      if(!match){el.classList.add('image-unavailable');return;}
      const src=match[1];
      probe=new Image();
      probe.onload=()=>el.classList.remove('image-unavailable');
      probe.onerror=()=>el.classList.add('image-unavailable');
      probe.src=src;
    };
    check();
    el.addEventListener('the303:image-changed',check);
  });
  if('IntersectionObserver'in window&&!reduce){
    document.documentElement.classList.add('js-ready');
    const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible','active');obs.unobserve(entry.target);}
    }),{threshold:.08,rootMargin:'0px 0px -20px 0px'});
    $$('.reveal').forEach(el=>observer.observe(el));
  }else{
    $$('.reveal').forEach(el=>el.classList.add('is-visible','active'));
  }
  /* The editor may change the contact number without rebuilding the header. */
  function updatePhone(){
    const text=$('[data-text="phone"]')?.textContent?.trim();
    const tel=(text||'053-568-3303').replace(/[^0-9+]/g,'');
    $$('[data-phone-link]').forEach(a=>a.href='tel:'+tel);
  }
  document.addEventListener('the303:content-updated',updatePhone);
  updatePhone();
  $$('a[data-link]').forEach(a=>a.addEventListener('click',event=>{
    if(a.getAttribute('aria-disabled')==='true'||a.getAttribute('href')==='#')event.preventDefault();
  }));
})();

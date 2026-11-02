/* THE303 STUDIO public subpage configuration — no admin mode or browser storage. */
(()=>{'use strict';
 const $$=(q)=>Array.from(document.querySelectorAll(q));
 const link={
  booking:'http://pf.kakao.com/_xdERxlxj',
  socialFb:'https://www.facebook.com/share/1DtPRn45tn/',
  socialIg:'https://www.instagram.com/the303_flyingyoga_barre',
  socialBlog:'https://blog.naver.com/flyingthe303',
  socialYt:''
 };
 $$('[data-link]').forEach(a=>{
   const dest=link[a.dataset.link];
   if(dest){a.href=dest;a.removeAttribute('aria-disabled');
     if(!dest.startsWith('tel:')){a.target='_blank';a.rel='noopener noreferrer';}}
   else{a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.tabIndex=-1;
     if(a.dataset.link==='socialYt')a.title='유튜브 채널 준비 중';}
 });
 const phone=document.querySelector('[data-text="phone"]')?.textContent?.trim()||'053-568-3303';
 const tel=phone.replace(/[^0-9+]/g,'');
 $$('[data-phone-link]').forEach(a=>a.href='tel:'+tel);
 const contactPhone=document.querySelector('[data-page-phone]');
 if(contactPhone){contactPhone.textContent=phone;contactPhone.href='tel:'+tel;}
 document.dispatchEvent(new Event('the303:content-updated'));
})();

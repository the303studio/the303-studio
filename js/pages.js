/* THE303 STUDIO subpages — shared settings and page-specific local editor.
   Local browser edits are previews. Public publishing needs file updates/server CMS. */
(()=>{'use strict';
 const $=(q,root=document)=>root.querySelector(q), $$=(q,root=document)=>Array.from(root.querySelectorAll(q));
 const slug=document.body.dataset.page||'unknown';
 const pageStore='the303-page-'+slug+'-v1';
 // Match the homepage editor key and its legacy fallback order, without changing storage.
 const homeStores=[
   'the303-v70-intro-v05-editor',
   'the303-v69-intro-v05-editor',
   'the303-v68-intro-v03-editor',
   'the303-v67-intro-v2-editor',
   'the303-v66-premium-editor'
 ];
 function read(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}}
 function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}}
 // Do not migrate or overwrite existing user data. The newest valid snapshot wins.
 const home=homeStores.map(read).find(data=>data && typeof data.text==='object' && data.text!==null)||{};
 const OFFICIAL_BOOKING='https://pf.kakao.com/_xdERxlxj';
 const defaultLinks={booking:OFFICIAL_BOOKING,socialFb:'https://www.facebook.com/share/1DtPRn45tn/',socialIg:'https://www.instagram.com/the303_flyingyoga_barre',socialBlog:'https://blog.naver.com/flyingthe303',socialYt:''};
 // Upgrade only the old official HTTP address. Retain an intentionally customized URL.
 function bookingHref(value){
   const raw=typeof value==='string'?value.trim():'';
   if(!raw)return OFFICIAL_BOOKING;
   if(/^http:\/\/pf\.kakao\.com\/_xdERxlxj\/?(?=[?#]|$)/i.test(raw))return raw.replace(/^http:/i,'https:');
   try{
     const url=new URL(raw,location.href);
     if(['https:','http:','tel:','mailto:'].includes(url.protocol))return raw;
   }catch(_){}
   return OFFICIAL_BOOKING;
 }
 const links={...defaultLinks,...(home.link||{})};
 links.booking=bookingHref(links.booking);
 const baseText={brandEn:'THE303 STUDIO',brandSub:'FLYING YOGA & BARRE',address:'대구광역시 달서구 달구벌대로 1525 J타워 3층 301호',phone:'053-568-3303'};
 // Header/footer branding reflects homepage local editor settings on the same origin.
 $$('[data-text]').forEach(el=>{
   const key=el.dataset.text;
   if(typeof home.text?.[key]==='string')el.textContent=home.text[key];
   else if(typeof baseText[key]==='string')el.textContent=baseText[key];
 });
 $$('[data-link]').forEach(a=>{
   const dest=links[a.dataset.link];
   if(dest){a.href=dest;a.removeAttribute('aria-disabled')}
   else{a.href='#';a.setAttribute('aria-disabled','true');if(a.dataset.link==='socialYt'){a.tabIndex=-1;a.title='유튜브 채널 준비 중'}}
   if(a.dataset.link==='booking'){
     const url=new URL(a.href,location.href);
     if((url.protocol==='https:'||url.protocol==='http:')&&url.origin!==location.origin){
       a.target='_blank';a.rel='noopener noreferrer';
     }else{
       // Tel/mail or a custom same-origin URL should not open an empty new tab.
       a.removeAttribute('target');a.removeAttribute('rel');
     }
   }
 });
 document.dispatchEvent(new Event('the303:content-updated'));
 const editorEnabled=new URLSearchParams(location.search).get('editor')==='on';
 const toggler=$('#pageEditorToggle'), aside=$('#pageEditor'), fields=$('#pageEditorFields'), status=$('#pageEditorNotice');
 const textNodes=$$('[data-edit]'), imageNodes=$$('img[data-edit-image]');
 const mobileNodes=$$('img[data-edit-image-mobile]');
 const textDefaults=Object.fromEntries(textNodes.map(el=>[el.dataset.edit,el.textContent]));
 const imgDefaults={
   ...Object.fromEntries(imageNodes.map(el=>[el.dataset.editImage,el.getAttribute('src')])),
   ...Object.fromEntries(mobileNodes.map(el=>[el.dataset.editImageMobile,el.dataset.imageMobile]))
 };
 const saved=read(pageStore)||{};
 // V03: TTC title legacy factory default -> current title, without changing user edits.
 if(slug==='ttc-cert' && saved.texts?.hero_identity==='지도자과정'){
   saved.texts.hero_identity='자격증 과정';
 }
 const savedImages={...(saved.images||{})};
 // Only migrate stock v7 paths. Preserve user-chosen custom image locations.
 imageNodes.forEach(el=>{
   const key=el.dataset.editImage;
   if(el.dataset.legacySrc && savedImages[key]===el.dataset.legacySrc){savedImages[key]=el.getAttribute('src');}
 });
 // V48 | Only migrate studio-introduction factory-default image paths that
 // predate the image-quality update. Preserve every custom editor URL.
 // Do not mutate persistent storage: migration is scoped to this render.
 if(slug==='about-studio'){
   const upgrades={
     hero_photo:{
       './images/studio/hero-pc.jpg':'./images/studio/hero-pc-v48.jpg',
       './images/studio/hero.jpg':'./images/studio/hero-pc-v48.jpg'
     },
     hero_photo_mobile:{
       './images/studio/hero-mo-refined.jpg':'./images/studio/hero-mo-v48.jpg'
     }
   };
   for(const [key, oldPaths] of Object.entries(upgrades)){
     if(Object.prototype.hasOwnProperty.call(oldPaths,savedImages[key])){
       savedImages[key]=oldPaths[savedImages[key]];
     }
   }
 }
 // V49 | Migrate stock image paths for two approved photo changes only.
 // Preserve customized editor image paths and do not overwrite localStorage.
 if(slug==='program-flying'||slug==='ttc-cert'){
   const upgrades=slug==='program-flying'?{
     experience_photo_small:{'./images/flying/experience-detail.jpg':'./images/flying/experience-detail-v49.jpg'},
     experience_photo:{'./images/flying/experience-pc.jpg':'./images/flying/experience-pc-v49.jpg'},
     experience_photo_mobile:{'./images/flying/experience-mo.jpg':'./images/flying/experience-mo-v49.jpg'}
   }:{
     cert_photo:{'./images/ttc/detail.jpg':'./images/ttc/detail-v49.jpg'},
     cert_photo_mobile:{'./images/ttc/detail-mo.jpg':'./images/ttc/detail-mo-v49.jpg'}
   };
   for(const [key, oldPaths] of Object.entries(upgrades)){
     if(Object.prototype.hasOwnProperty.call(oldPaths,savedImages[key])){
       savedImages[key]=oldPaths[savedImages[key]];
     }
   }
 }
 let current={texts:{...textDefaults,...saved.texts},images:{...imgDefaults,...savedImages},notices:Array.isArray(saved.notices)?saved.notices:[]};
 function imgCheck(img){
  if(!img)return;
  const wrap=img.closest('.photo-frame');if(!wrap)return;
  const show=()=>wrap.classList.toggle('is-missing',!img.naturalWidth);
  img.addEventListener('load',show);img.addEventListener('error',()=>wrap.classList.add('is-missing'));
  if(img.complete)show();
 }
 imageNodes.forEach(imgCheck);
 const collection=$('#noticeList');
 function showNotices(){
   if(!collection)return;collection.replaceChildren();
   if(!current.notices.length){
     const box=document.createElement('div');box.className='notice-empty';
     const line=document.createElement('span');line.className='notice-empty-line';
     const p=document.createElement('p');p.textContent='등록된 공지사항이 없습니다. 새로운 소식을 이곳에서 안내하겠습니다.';
     box.append(line,p);collection.append(box);return;
   }
   current.notices.forEach(item=>{
      if(!item.title?.trim())return;
      const detail=document.createElement('details');detail.className='notice-item';
      const summary=document.createElement('summary');
      const h=document.createElement('h3');h.textContent=item.title;
      const date=document.createElement('span');date.className='notice-date';date.textContent=item.date||'';
      const content=document.createElement('p');content.className='notice-content';content.textContent=item.body||'';
      summary.append(h,date);detail.append(summary,content);collection.append(detail);
   });
 }
 function render(){
   textNodes.forEach(el=>{el.textContent=current.texts[el.dataset.edit]??textDefaults[el.dataset.edit]});
   imageNodes.forEach(img=>{
     const src=current.images[img.dataset.editImage]??imgDefaults[img.dataset.editImage];
     const moKey=img.dataset.editImageMobile;
     if(moKey){
       img.dataset.imageDesktop=src;
       img.dataset.imageMobile=current.images[moKey]??imgDefaults[moKey];
       // The router checks whether the optional mobile file exists.
       window.THE303ImageRoutes?.refreshOne(img);
     }else if(img.getAttribute('src')!==src){
       img.closest('.photo-frame')?.classList.remove('is-missing');
       img.setAttribute('src',src);
     }
     if(img.complete&&!img.naturalWidth)img.closest('.photo-frame')?.classList.add('is-missing');
   });
   if(slug==='contact'){
     const address=$('[data-edit="address"]')?.textContent;
     const tel=(home.text?.phone||baseText.phone||'').replace(/[^+0-9]/g,'');
     const link=$('[data-page-phone]');if(link){link.textContent=home.text?.phone||baseText.phone;link.href='tel:'+tel}
     // The official NAVER Place ID is pinned in contact.html. Do not overwrite it with address-only search.
   }
   showNotices();
 }
 render();
 if(!editorEnabled){aside?.remove();toggler?.remove();return;}
 // The query flag is a convenience during drafting, NOT authentication.
 function makeField(label,value,kind='text',onChange){
  const wrap=document.createElement('div');wrap.className='page-editor-field';
  const lab=document.createElement('label');lab.textContent=label;
  const input=document.createElement(kind==='text'?'textarea':'input');
  if(kind!=='text')input.type='text';input.value=value??'';
  input.addEventListener('input',()=>onChange(input.value));
  wrap.append(lab,input);return wrap;
 }
 function collectFields(){
  fields.replaceChildren();
  const textHeader=document.createElement('h3');textHeader.textContent='텍스트 수정';textHeader.style.margin='0 0 15px';fields.append(textHeader);
  for(const [key,val] of Object.entries(current.texts))fields.append(makeField(key,val,'text',v=>current.texts[key]=v));
  const photoHeader=document.createElement('h3');photoHeader.textContent='사진 경로';photoHeader.style.margin='26px 0 15px';fields.append(photoHeader);
  for(const [key,val] of Object.entries(current.images)){
    const caption=key.endsWith('_mobile')?key+' · 모바일 전용 (파일이 없으면 PC 표시)':key+' · 기본/PC';
    fields.append(makeField(caption,val,'path',v=>current.images[key]=v));
  }
  if(slug==='news-notice'){
   const area=document.createElement('section');area.className='page-editor-collection';
   const title=document.createElement('h4');title.textContent='공지사항 항목 관리';area.append(title);
   const add=document.createElement('button');add.type='button';add.textContent='+ 공지 추가';
   add.addEventListener('click',()=>{current.notices.push({title:'',date:'',body:''});collectFields()});area.append(add);
   current.notices.forEach((entry,i)=>{
     const row=document.createElement('div');row.className='collection-row';
     for(const [key,label] of [['title','공지 제목'],['date','날짜 (예: 2026-10-27)'],['body','공지 내용']]){
        row.append(makeField(label,entry[key]||'','text',v=>entry[key]=v));
     }
     const del=document.createElement('button');del.textContent='이 항목 삭제';del.type='button';
     del.addEventListener('click',()=>{current.notices.splice(i,1);collectFields()});row.append(del);area.append(row);
   });fields.append(area);
  }
 }
 const open=()=>{collectFields();aside.classList.add('is-open');aside.setAttribute('aria-hidden','false');$('#pageEditorClose')?.focus()};
 const close=()=>{aside.classList.remove('is-open');aside.setAttribute('aria-hidden','true');toggler?.focus()};
 toggler?.addEventListener('click',open);$('#pageEditorClose')?.addEventListener('click',close);
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&aside.classList.contains('is-open'))close()});
 $('#pageEditorSave')?.addEventListener('click',()=>{
  if(write(pageStore,current)){render();status.textContent='현재 브라우저에 저장했습니다. 공개 반영은 별도 배포가 필요합니다.'}
  else status.textContent='저장할 수 없습니다. 브라우저 저장소 설정을 확인해 주세요.';
 });
 $('#pageEditorReset')?.addEventListener('click',()=>{
  if(!confirm('이 페이지의 로컬 편집 내역을 초기화할까요?'))return;
  current={texts:{...textDefaults},images:{...imgDefaults},notices:[]};
  try{localStorage.removeItem(pageStore)}catch{};
  render();collectFields();status.textContent='이 페이지의 초기 상태로 돌아왔습니다.';
 });
 $('#pageEditorExport')?.addEventListener('click',async()=>{
  const data=JSON.stringify({page:slug,...current},null,2);
  try{await navigator.clipboard.writeText(data);status.textContent='설정 JSON을 복사했습니다.'}
  catch{prompt('설정 내용을 복사하세요.',data)}
 });
})();


/* V31 · Deliberate editorial scroll reveal, additive to the page editor. */
(function () {
  'use strict';
  function initSubpageReveal() {
    const body = document.body;
    const main = document.querySelector('main');
    if (!body?.classList.contains('the303-subpage') || !main) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (reduced?.matches || !('IntersectionObserver' in window)) return;

    // A short entrance on the first heading; no blocking or deferred hero display.
    const firstSection = main.querySelector(':scope > section');
    const heroTitle = firstSection?.querySelector('h1');
    if (heroTitle && typeof heroTitle.animate === 'function' &&
        getComputedStyle(heroTitle).animationName === 'none') {
      heroTitle.animate([
        { opacity: .72, translate: '0 10px' },
        { opacity: 1, translate: '0 0' }
      ], { duration: 850, easing: 'cubic-bezier(.22, 1, .36, 1)' });
    }

    const cardSelector = [
      '.fly16-principle', '.fly16-level', '.fly16-standard', '.fly16-visit-row',
      '.b-principle', '.b-step', '.d-rhythm-row', '.d-info-row',
      '.ttc-learning-item', '.ttc-info-row', '.ws-experience',
      '.mr-eq-row', '.mr-steps > article', '.guide-trial-card',
      '.guide-membership-row', '.guide-faq-item', '.ct-item', '.ct-visit-item',
      '.mp-item', '.ng-card', '.nn-link', '.notice-item', '.nn-notice-item',
      '.ae-keyword'
    ].join(', ');

    // FAQ is the sole repeat-on-reentry exception to the shared one-time reveal.
    const faqRegion = body.dataset.page === 'program-guide' ? main.querySelector('.guide-faq') : null;
    const faqQuestions = faqRegion?.querySelector('.guide-faq-questions');
    const faqItems = faqQuestions ? Array.from(faqQuestions.querySelectorAll('.guide-faq-item')) : [];
    const faqItemSet = new Set(faqItems);
    const registered = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add('is-visible');
        observer.unobserve(target); // one-time, never hide on scroll back
      });
    }, { threshold: .12, rootMargin: '0px 0px -14% 0px' });

    function enroll(el, delay = 0, isCard = false) {
      if (!el || registered.has(el) || el.closest('header, footer, .site-footer, .mobile-bottom-bar')) return;
      registered.add(el);
      el.style.setProperty('--the303-reveal-delay', `${delay}ms`);
      el.classList.add('the303-reveal-item');
      if (isCard) el.classList.add('the303-reveal-card');
      if (!faqItemSet.has(el)) observer.observe(el);
    }
    function groupColumns(parent, count) {
      if (!parent || count <= 1) return 1;
      const css = getComputedStyle(parent);
      if (css.display.includes('grid')) {
        const cols = css.gridTemplateColumns.split(/\s+/).filter(Boolean).length;
        if (cols > 1) return Math.min(cols, 4);
      }
      // Editorial lists should cascade even if they are vertically arranged.
      return Math.min(count, 4);
    }
    function scan() {
      const sections = Array.from(main.querySelectorAll('section'));
      sections.forEach((section, n) => {
        if (section === firstSection || n === 0) return;
        const cards = Array.from(section.querySelectorAll(cardSelector));
        const cardSet = new Set(cards);
        const cardsByParent = new Map();
        cards.forEach(card => {
          if (card.parentElement && !cardsByParent.has(card.parentElement))
            cardsByParent.set(card.parentElement, []);
          cardsByParent.get(card.parentElement)?.push(card);
        });
        cardsByParent.forEach((siblings, parent) => {
          const columns = groupColumns(parent, siblings.length);
          siblings.forEach((card, i) => enroll(card, (i % columns) * 140, true));
        });
        const outsideCard = el => !el.closest(cardSelector) && !el.closest('details') &&
          !el.closest('.site-footer') && !Array.from(cardSet).some(card => card.contains(el));
        section.querySelectorAll('h2').forEach(h => { if (outsideCard(h)) enroll(h); });
        // Limit copy reveals to lead/body paragraphs, not nested rich content.
        Array.from(section.querySelectorAll('p')).filter(outsideCard).slice(0, 3)
          .forEach((p, i) => enroll(p, (Math.min(i, 2) + 1) * 140));
      });
    }
    scan();
    body.classList.add('the303-reveal-active');

    // FAQ: show the four questions in their existing 140ms cascade when the
    // list enters view; rearm only after the entire FAQ section leaves view.
    // This never changes details.open, so expanded answers stay untouched.
    let faqEnterObserver = null;
    let faqExitObserver = null;
    if (faqRegion && faqQuestions && faqItems.length) {
      let canReplay = true;
      faqRegion.classList.add('is-faq-offscreen');
      faqEnterObserver = new IntersectionObserver(entries => {
        if (!canReplay || !entries.some(entry => entry.isIntersecting)) return;
        canReplay = false;
        faqRegion.classList.remove('is-faq-offscreen');
        // Commit the hidden state before re-adding is-visible, even on rapid return.
        void faqQuestions.offsetWidth;
        faqItems.forEach(item => item.classList.add('is-visible'));
      }, { threshold: .01, rootMargin: '0px 0px -14% 0px' });
      faqExitObserver = new IntersectionObserver(entries => {
        if (canReplay || entries.some(entry => entry.isIntersecting)) return;
        faqRegion.classList.add('is-faq-offscreen');
        faqItems.forEach(item => item.classList.remove('is-visible'));
        canReplay = true;
      }, { threshold: 0 });
      faqEnterObserver.observe(faqQuestions);
      faqExitObserver.observe(faqRegion);
    }
    // Public notices may be rendered asynchronously by a separate page script.
    const dynamic = main.querySelector('#noticeList');
    if (dynamic && 'MutationObserver' in window) {
      new MutationObserver(() => scan()).observe(dynamic, { childList: true, subtree: true });
    }
    // If an invisible item receives keyboard focus, reveal it immediately.
    main.addEventListener('focusin', event => {
      const item = event.target.closest?.('.the303-reveal-item');
      if (item) { item.classList.add('is-visible'); observer.unobserve(item); }
    });
    // Restore content immediately if motion preference changes while the page is open.
    reduced?.addEventListener?.('change', event => {
      if (!event.matches) return;
      body.classList.remove('the303-reveal-active');
      observer.disconnect();
      faqEnterObserver?.disconnect();
      faqExitObserver?.disconnect();
      faqRegion?.classList.remove('is-faq-offscreen');
    });
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', initSubpageReveal, { once: true });
  else initSubpageReveal();
})();

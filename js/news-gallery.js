/* THE303 / GALLERY v2.2 — curated album, progressive loading & lightbox */
(()=>{'use strict';
 const grid=document.getElementById('galleryGrid');if(!grid)return;
 // The sequence is an editorial display order. Photo IDs and edit keys remain stable.
 const displayOrder=[1,7,2,3,11,4,5,6,19,8,9,10,12,13,14,15,16,17,18,20];
 const byId=new Map(Array.from(grid.querySelectorAll('.ng-card')).map(card=>[Number((card.querySelector('img')?.dataset.editImage||'').match(/_(\d+)$/)?.[1]||0),card]));
 displayOrder.forEach(n=>{const card=byId.get(n);if(card)grid.appendChild(card)});
 const cards=Array.from(grid.querySelectorAll('.ng-card'));
 cards.forEach(card=>{const img=card.querySelector('img');const btn=card.querySelector('.ng-picture');if(img&&btn)btn.setAttribute('aria-label',`사진 크게 보기: ${img.alt||'THE303 갤러리'}`)});
 const modal=document.getElementById('galleryLightbox');
 const image=modal.querySelector('.ng-lightbox-image');
 const counter=document.getElementById('galleryLightboxCount');
 const title=modal.querySelector('.ng-lightbox-title');
 const prev=modal.querySelector('.ng-lightbox-prev');
 const next=modal.querySelector('.ng-lightbox-next');
 const close=modal.querySelector('.ng-lightbox-close');
 const stage=document.getElementById('galleryLightboxStage');
 const empty=document.getElementById('galleryEmpty');
 const more=document.getElementById('galleryMore');
 const total=document.getElementById('galleryCount');
 const note=document.getElementById('galleryPreviewNote');
 const preview=false; // Public gallery: no preview-only override
 const pageSize=window.innerWidth>=1100?15:12;
 let shown=pageSize,active=-1,opener=null,bodyOverflow='';
 let startX=0,startY=0,touchStarted=false;
 if(preview)note.hidden=false;
 const available=(card)=>card.dataset.loaded!=='false';
 const matchesAll=()=>cards.filter(c=>preview||available(c));
 const realMatches=()=>cards.filter(available);
 function update(){
  const filtered=matchesAll();let i=0;
  cards.forEach(card=>{const show=filtered.includes(card)&&i<shown;if(filtered.includes(card))i++;card.hidden=!show;});
  const count=realMatches().length;
  total.textContent=`사진 ${count}장`;
  empty.hidden=filtered.length>0;
  more.hidden=filtered.length<=shown;
 }
 more.addEventListener('click',()=>{shown+=pageSize;update();});
 function markImage(card){const img=card.querySelector('img');
  const loaded=!!img.complete&&img.naturalWidth>0;
  // Do not classify a not-yet-requested lazy image as missing.
  if(!img.complete)return;
  card.dataset.loaded=String(loaded);card.classList.toggle('is-missing',!loaded);
  const btn=card.querySelector('.ng-picture');btn.disabled=!loaded;
  btn.setAttribute('aria-disabled',String(!loaded));
  update();
 }
 cards.forEach(card=>{
  const img=card.querySelector('img');
  // Eager-load only the first row; subsequent and hidden thumbnails load on demand.
  img.loading=cards.indexOf(card)<(window.innerWidth>=1100?5:window.innerWidth>=480?3:2)?'eager':'lazy';
  card.dataset.loaded='pending';
  card.querySelector('.ng-picture').disabled=false;
  img.addEventListener('load',()=>markImage(card));
  img.addEventListener('error',()=>markImage(card));
  const button=card.querySelector('.ng-picture');
  button.addEventListener('click',()=>{if(!available(card))return;opener=button;active=realMatches().indexOf(card);open();});
  // Initial fallback needs to wait for the responsive router/editor to select the source.
  if(img.complete)markImage(card);
 });
 function display(){
  const list=realMatches();if(!list.length){hide();return;}
  active=(active+list.length)%list.length;
  const card=list[active],thumb=card.querySelector('img');
  const original=thumb.dataset.fullSrc;
  const backup=thumb.currentSrc||thumb.src;
  image.onerror=()=>{image.onerror=null;if(image.src!==backup)image.src=backup;};
  image.src=original||backup;
  image.alt=thumb.alt||'갤러리 사진';
  const memo=card.querySelector('[data-edit^="gallery_caption_"]')?.textContent?.trim()||'';
  title.textContent=/^PHOTO\s*\d+$/i.test(memo)?'':memo;
  title.hidden=!title.textContent;
  counter.textContent=`${String(active+1).padStart(2,'0')} / ${String(list.length).padStart(2,'0')}`;
  prev.hidden=list.length<2;next.hidden=list.length<2;
 }
 function open(){
  bodyOverflow=document.body.style.overflow;
  document.body.classList.add('ng-lightbox-open');
  modal.hidden=false;display();close.focus({preventScroll:true});
 }
 function hide(){if(modal.hidden)return;
  modal.hidden=true;image.removeAttribute('src');image.onerror=null;
  document.body.classList.remove('ng-lightbox-open');document.body.style.overflow=bodyOverflow;
  opener?.focus({preventScroll:true});
 }
 function step(dir){const list=realMatches();if(!list.length)return;active=(active+dir+list.length)%list.length;display();}
 close.addEventListener('click',hide);prev.addEventListener('click',()=>step(-1));next.addEventListener('click',()=>step(1));
 modal.addEventListener('click',e=>{if(e.target===modal)hide()});
 document.addEventListener('keydown',e=>{if(modal.hidden)return;
  if(e.key==='Escape'){e.preventDefault();hide()}
  else if(e.key==='ArrowRight'){e.preventDefault();step(1)}
  else if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}
  else if(e.key==='Tab'){
   const candidates=[close,prev,next].filter(el=>!el.hidden),idx=candidates.indexOf(document.activeElement);
   if(idx<0){e.preventDefault();candidates[0].focus()}
   else if(e.shiftKey&&idx===0){e.preventDefault();candidates[candidates.length-1].focus()}
   else if(!e.shiftKey&&idx===candidates.length-1){e.preventDefault();candidates[0].focus()}
  }
 });
 stage.addEventListener('touchstart',e=>{if(e.touches.length!==1||e.target.closest('button')){touchStarted=false;return;}startX=e.touches[0].clientX;startY=e.touches[0].clientY;touchStarted=true;},{passive:true});
 stage.addEventListener('touchend',e=>{if(!touchStarted||e.changedTouches.length!==1)return;touchStarted=false;
  const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;
  if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.15)step(dx<0?1:-1);
 },{passive:true});
 update();
})();

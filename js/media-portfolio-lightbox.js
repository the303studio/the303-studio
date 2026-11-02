(()=>{'use strict';
const dialog=document.getElementById('mpLightbox');
const figures=[...document.querySelectorAll('.media-portfolio-main .mp-gallery figure.mp-item')];
if(!dialog||!figures.length)return;
const img=dialog.querySelector('.mp-lightbox-image');
const caption=dialog.querySelector('.mp-lightbox-label');
const count=dialog.querySelector('.mp-lightbox-count');
const btnClose=dialog.querySelector('.mp-lightbox-close');
let position=0;let previouslyFocused=null;let startX=null;
const isEditing=()=>document.documentElement.classList.contains('the303-admin-mode');
function render(){
 const fig=figures[position];const photo=fig.querySelector('img');
 const heading=fig.querySelector('figcaption strong');
 const category=fig.querySelector('figcaption span');
 img.src=photo.currentSrc||photo.src;
 img.alt=photo.alt||heading?.textContent||'촬영 작품';
 caption.textContent=`${category?.textContent||''}   ${heading?.textContent||''}`;
 count.textContent=`${position+1} / ${figures.length}`;
}
function open(n){if(isEditing())return;previouslyFocused=document.activeElement;position=n;render();dialog.setAttribute('aria-hidden','false');document.body.classList.add('mp-lightbox-open');btnClose.focus();}
function close(){dialog.setAttribute('aria-hidden','true');document.body.classList.remove('mp-lightbox-open');img.removeAttribute('src');if(previouslyFocused?.focus)previouslyFocused.focus();}
function go(steps){position=(position+steps+figures.length)%figures.length;render();}
figures.forEach((fig,i)=>{
 const button=fig.querySelector('.mp-open-photo');if(button)button.addEventListener('click',()=>open(i));
});
btnClose.addEventListener('click',close);
dialog.querySelector('.mp-lightbox-prev').addEventListener('click',()=>go(-1));
dialog.querySelector('.mp-lightbox-next').addEventListener('click',()=>go(1));
dialog.querySelector('.mp-lightbox-backdrop').addEventListener('click',close);
dialog.addEventListener('keydown',e=>{
 if(e.key==='Escape'){e.preventDefault();close();}
 if(e.key==='ArrowRight'){e.preventDefault();go(1);}
 if(e.key==='ArrowLeft'){e.preventDefault();go(-1);}
 if(e.key==='Tab'){
  const choices=[...dialog.querySelectorAll('button')].filter(b=>!b.disabled);
  const a=choices[0],z=choices[choices.length-1];
  if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}
  else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}
 }
});
dialog.querySelector('.mp-lightbox-image-wrap').addEventListener('touchstart',e=>{startX=e.changedTouches[0]?.clientX??null;},{passive:true});
dialog.querySelector('.mp-lightbox-image-wrap').addEventListener('touchend',e=>{
 if(startX===null)return;const end=e.changedTouches[0]?.clientX??startX;
 const dist=end-startX;startX=null;if(Math.abs(dist)>55)go(dist<0?1:-1);
},{passive:true});
})();

/* THE303 NEWS · NOTICE v2.2
 * First page: up to four pinned notices + latest regular notices, six entries total.
 * Subsequent pages: six regular notices. Search and categories cover the full archive.
 * Public data: js/news-posts.js. Drafts are visible only in ?editor=on.
 * ?demo=1 shows explicitly labelled, non-clickable demonstration entries.
 */
(()=>{'use strict';
 const root=document.querySelector('.news-page'), list=document.getElementById('noticeList');if(!root||!list)return;
 const count=document.getElementById('nnCount'), filters=document.getElementById('nnCategories'), search=document.getElementById('nnSearch'), searchWrap=document.getElementById('nnSearchWrap'), noResults=document.getElementById('nnNoResults'), previewLabel=document.getElementById('nnPreviewLabel'), pager=document.getElementById('nnPagination');
 const demo=false; // Public-only notices: no draft or demo entry
 const categories=['전체','운영 안내','클래스','지도자 과정','워크샵','촬영·대관'];
 const demoPosts=[
  {pinned:true,category:'클래스',title:'플라잉요가·바레 월간 시간표 안내',summary:'수업 시간표와 운영 관련 주요 변경 사항을 안내합니다.',date:'2026-10-26'},
  {pinned:true,category:'지도자 과정',title:'플라잉요가 지도자 과정 안내',summary:'교육 내용과 수업 구성, 문의 방법을 소개합니다.',date:'2026-10-25'},
  {pinned:true,category:'워크샵',title:'스페셜 워크샵 참여 안내',summary:'워크샵별 프로그램과 참여 방법을 확인하세요.',date:'2026-10-24'},
  {pinned:true,category:'운영 안내',title:'스튜디오 이용 및 예약 안내',summary:'방문과 예약에 필요한 주요 내용을 안내합니다.',date:'2026-10-23'},
  {category:'클래스',title:'THE303 바레 클래스 소식',summary:'바레 특유의 균형과 움직임을 경험하는 클래스를 소개합니다.',date:'2026-10-22'},
  {category:'촬영·대관',title:'프로필 촬영과 스튜디오 대관 안내',summary:'촬영 목적과 준비 사항에 맞춘 공간·장비 이용 방법을 안내합니다.',date:'2026-10-21'},
  {category:'클래스',title:'플라잉요가 프로그램 안내',summary:'플라잉요가 수업의 주요 구성과 참여 방법을 안내합니다.',date:'2026-10-20'},
  {category:'워크샵',title:'움직임을 넓히는 워크샵',summary:'워크샵에서 다룰 수 있는 활동과 참여 방식을 안내합니다.',date:'2026-10-19'},
  {category:'운영 안내',title:'방문 상담 안내',summary:'스튜디오 방문과 상담에 필요한 정보를 확인하세요.',date:'2026-10-18'},
  {category:'지도자 과정',title:'지도자 교육 상담 안내',summary:'교육 일정과 참여 관련 문의 방법을 안내합니다.',date:'2026-10-17'},
  {category:'클래스',title:'THE303 프로그램 소개',summary:'플라잉요가와 바레 클래스를 소개합니다.',date:'2026-10-16'},
  {category:'촬영·대관',title:'미디어스튜디오 장비 이용 안내',summary:'카메라·조명·소프트박스 관련 사전 상담 사항을 소개합니다.',date:'2026-10-15'}
 ];
 const validURL=(value)=>{if(typeof value!=='string'||!value.trim())return '';try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}};
 const fmtDate=s=>/^\d{4}-\d{2}-\d{2}$/.test(String(s||''))?s:'';
 const normalize=(input,kind)=>Array.isArray(input)?input.filter(p=>p&&typeof p.title==='string'&&p.title.trim()).map((p,i)=>({
  title:p.title.trim(),summary:String(p.summary||p.description||p.body||'').trim(),category:String(p.category||'운영 안내').trim(),date:fmtDate(p.date),url:validURL(p.url||p.link||''),pinned:p.pinned===true,id:String(p.id||i),kind
 })):[];
 let posts=normalize(window.THE303_PUBLIC_NOTICES,'public');
 if(demo){posts=normalize(demoPosts,'demo');previewLabel.hidden=false}
 root.classList.toggle('nn-has-posts',posts.length>0);
 const byDate=(a,b)=>b.date.localeCompare(a.date);
 posts.sort(byDate);
 let category='전체',page=1;
 const node=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=txt;return el};
 function showEmpty(){const empty=node('div','notice-empty'),copy=node('div','notice-empty-copy');copy.append(node('p',null,'현재 게시된 공지가 없습니다.'),node('small',null,'블로그에서 최근 소식을 만나보세요.'));const a=node('a','nn-empty-link','블로그 소식 확인하기 ↗');a.href='https://blog.naver.com/flyingthe303';a.target='_blank';a.rel='noopener noreferrer';empty.append(copy,a);list.append(empty)}
 function createItem(p,compact){
  const article=node('article','nn-entry'+(compact?' nn-entry--pinned':''));
  const canOpen=p.url&&p.kind==='public';
  const card=node(canOpen?'a':'div','nn-entry-inner');
  if(canOpen){card.href=p.url;card.target='_blank';card.rel='noopener noreferrer';card.setAttribute('aria-label',p.title+' — 네이버 블로그 원문 보기 (새 탭)')}
  const meta=node('div','nn-entry-meta');if(compact)meta.append(node('span','nn-pin-label','중요'));meta.append(node('span','nn-entry-kind',p.category),node('time','nn-entry-date',p.date?p.date.replace(/-/g,'. ')+'.':''));
  const body=node('div','nn-entry-content');body.append(node('h3','nn-entry-title',p.title));if(p.summary)body.append(node('p','nn-entry-desc',p.summary));
  const label=p.kind==='demo'?'디자인 확인용 예시':p.kind==='draft'?'로컬 미리보기 · 미게시':p.url?'블로그 원문 보기':'원문 연결 준비 중';
  const more=node('span','nn-entry-more'+(!canOpen&&p.kind==='public'?' nn-entry-more--pending':''),label);if(canOpen)more.append(node('span','nn-entry-more-icon','↗'));body.append(more);
  // The inline '블로그 원문 보기 ↗' is the sole outbound-link indicator.
  // Keep the entire notice row clickable without a second arrow at its far edge.
  card.append(meta,body);article.append(card);return article;
 }
 function groupHeader(title,desc){const head=node('div','nn-group-head');if(title.startsWith('LATEST /'))head.classList.add('nn-group-head--latest');head.append(node('span','nn-group-title',title));if(desc)head.append(node('span','nn-group-note',desc));return head}
 function drawFilters(){filters.replaceChildren();filters.hidden=!posts.length;if(!posts.length)return;for(const c of categories){if(c!=='전체'&&!posts.some(p=>p.category===c))continue;const btn=node('button','nn-filter'+(category===c?' is-active':''),c);btn.type='button';btn.setAttribute('aria-pressed',String(category===c));btn.addEventListener('click',()=>{category=c;page=1;drawFilters();drawPage()});filters.append(btn)}}
 function drawPager(totalPages){pager.replaceChildren();pager.hidden=totalPages<=1;if(totalPages<=1)return;pager.setAttribute('aria-label','공지사항 페이지 이동');
  const button=(label,target,disabled,active)=>{const el=node('button','nn-page-button'+(active?' is-active':''),label);el.type='button';el.disabled=disabled;el.setAttribute('aria-label',label==='‹'?'이전 페이지':label==='›'?'다음 페이지':label+'페이지');if(active)el.setAttribute('aria-current','page');el.addEventListener('click',()=>{page=target;drawPage();const top=document.getElementById('nnBoardTitle');top?.scrollIntoView({behavior:'auto',block:'start'})});return el};
  pager.append(button('‹',page-1,page===1,false));
  // Keep pagination compact on narrow screens and for long archives.
  const pages=[];for(let n=1;n<=totalPages;n++)if(n===1||n===totalPages||Math.abs(n-page)<=1)pages.push(n);
  let last=0;for(const n of pages){if(last&&n-last>1)pager.append(node('span','nn-page-ellipsis','…'));pager.append(button(String(n),n,false,n===page));last=n}
  pager.append(button('›',page+1,page===totalPages,false));
 }
 function drawPage(){
  const q=(search?.value||'').trim().toLocaleLowerCase('ko');
  const matched=posts.filter(p=>(category==='전체'||p.category===category)&&(!q||(p.category+' '+p.title+' '+p.summary).toLocaleLowerCase('ko').includes(q)));
  const pinned=matched.filter(p=>p.pinned).sort(byDate).slice(0,4);
  const pinnedIds=new Set(pinned);
  const regular=matched.filter(p=>!pinnedIds.has(p)).sort(byDate);
  const firstRegularSlots=Math.max(0,6-pinned.length);
  const firstSlice=regular.slice(0,firstRegularSlots);
  const totalPages=Math.max(1,1+Math.ceil(Math.max(0,regular.length-firstRegularSlots)/6));
  if(page>totalPages)page=totalPages;
  list.replaceChildren();noResults.hidden=matched.length!==0||posts.length===0;
  count.textContent='NOTICE / '+String(matched.length).padStart(2,'0');
  if(!posts.length){showEmpty();pager.hidden=true;return}
  if(!matched.length){pager.replaceChildren();pager.hidden=true;return}
  if(page===1){
   if(pinned.length){list.append(groupHeader('IMPORTANT / 중요 공지',String(pinned.length).padStart(2,'0')));const pinList=node('div','nn-pinned-list');pinned.forEach(p=>pinList.append(createItem(p,true)));list.append(pinList)}
   if(firstSlice.length){list.append(groupHeader('LATEST / 새로운 소식',String(firstSlice.length).padStart(2,'0')));const genList=node('div','nn-regular-list');firstSlice.forEach(p=>genList.append(createItem(p,false)));list.append(genList)}
  }else{
   const start=firstRegularSlots+(page-2)*6,items=regular.slice(start,start+6);
   list.append(groupHeader('ARCHIVE / 지난 공지',String(items.length).padStart(2,'0')));const genList=node('div','nn-regular-list');items.forEach(p=>genList.append(createItem(p,false)));list.append(genList);
  }
  drawPager(totalPages);
 }
 function init(){list.replaceChildren();if(!posts.length){showEmpty();count.textContent='NOTICE / 00';searchWrap.hidden=true;filters.hidden=true;pager.hidden=true;return}drawFilters();searchWrap.hidden=posts.length<3;drawPage()}
 search?.addEventListener('input',()=>{page=1;drawPage()});init();
})();

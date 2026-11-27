/* THE303 STUDIO / V64 Meta Pixel · consent-aware manual install.
   The Meta library and tracking requests are never loaded without opt-in.
   Only the official production domain may send events.
   PageView = consenting page view; KakaoConsultClick = outbound button click, NOT a completed inquiry.
*/
(()=>{'use strict';
  const PIXEL_ID='1196231459601691';
  const STORE_KEY='the303-meta-ads-consent-v1';
  const LIVE_HOSTS=new Set(['the303studio.kr','www.the303studio.kr']);
  const isLive=LIVE_HOSTS.has(location.hostname.toLowerCase());
  let choice=null, loaded=false, bannerSizeObserver=null;
  try {const saved=localStorage.getItem(STORE_KEY);if(saved==='granted'||saved==='denied')choice=saved;}catch(e){}
  const save=(value)=>{choice=value;try{localStorage.setItem(STORE_KEY,value)}catch(e){}};
  function loadMeta(){
    if(loaded||!isLive||choice!=='granted')return;
    loaded=true;
    /* Standard Meta Pixel bootstrap, loaded only after explicit consent. */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init',PIXEL_ID);
    window.fbq('track','PageView');
  }
  function clearMetaCookies(){
    ['_fbp','_fbc'].forEach(name=>{
      const hostname=location.hostname;const domains=['',hostname,'.'+hostname,'.the303studio.kr'];
      domains.forEach(domain=>{
        document.cookie=name+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax'+(domain?'; domain='+domain:'');
      });
    });
  }
  function closeBanner(){
    bannerSizeObserver?.disconnect();bannerSizeObserver=null;
    document.getElementById('the303-meta-consent')?.remove();
    document.body.style.removeProperty('--the303-consent-height');
  }
  function setChoice(value){
    const wasActive=loaded;
    save(value);
    closeBanner();
    if(value==='granted')loadMeta();
    else if(wasActive){
      try{window.fbq?.('consent','revoke')}catch(e){}
      clearMetaCookies();
      /* A reload removes the in-page Meta script after an active opt-out. */
      location.reload();
    }
  }
  function buildBanner(){
    if(document.getElementById('the303-meta-consent'))return;
    const dialog=document.createElement('section');
    dialog.id='the303-meta-consent'; dialog.className='the303-meta-consent';
    dialog.setAttribute('role','region'); dialog.setAttribute('aria-label','광고 측정 쿠키 선택');
    const content=document.createElement('div');content.className='the303-meta-consent-copy';
    const title=document.createElement('strong');title.textContent='광고·쿠키 사용 안내';
    const body=document.createElement('p');
    const fullCopy=document.createElement('span');fullCopy.className='the303-meta-copy-full';fullCopy.textContent='THE303 STUDIO는 선택적으로 Meta 픽셀을 이용해 방문 및 카카오톡 상담 버튼 클릭을 측정합니다. 동의하지 않아도 홈페이지를 이용할 수 있습니다.';
    const mobileCopy=document.createElement('span');mobileCopy.className='the303-meta-copy-mobile';mobileCopy.hidden=true;mobileCopy.textContent='동의 시 Meta 픽셀로 방문·카카오톡 상담 클릭을 측정합니다. 거부해도 이용할 수 있습니다.';
    body.append(fullCopy,mobileCopy);
    const link=document.createElement('a');link.href='./privacy.html';link.textContent='자세히 보기';
    content.append(title,body,link);
    const actions=document.createElement('div');actions.className='the303-meta-consent-actions';
    const decline=document.createElement('button');decline.type='button';decline.className='the303-meta-reject';decline.textContent='거부';decline.addEventListener('click',()=>setChoice('denied'));
    const accept=document.createElement('button');accept.type='button';accept.className='the303-meta-accept';accept.textContent='동의';accept.addEventListener('click',()=>setChoice('granted'));
    actions.append(decline,accept);dialog.append(content,actions);document.body.appendChild(dialog);
    // Layout only: reserve the actual notice height, including font/viewport changes.
    const syncBannerSize=()=>document.body.style.setProperty('--the303-consent-height',Math.ceil(dialog.getBoundingClientRect().height)+'px');
    syncBannerSize();
    if(typeof ResizeObserver==='function'){
      bannerSizeObserver=new ResizeObserver(syncBannerSize);bannerSizeObserver.observe(dialog);
    }
  }
  function addFooterControls(){
    const bottom=document.querySelector('.site-footer .footer-bottom');
    if(!bottom||bottom.querySelector('.the303-meta-footer'))return;
    const links=document.createElement('span');links.className='the303-meta-footer';
    const info=document.createElement('a');info.href='./privacy.html';info.textContent='광고·쿠키 안내';
    const settings=document.createElement('button');settings.type='button';settings.textContent='광고 설정';
    settings.addEventListener('click',buildBanner);
    links.append(info,settings);bottom.appendChild(links);
  }
  function onClick(event){
    if(choice!=='granted'||!loaded||typeof window.fbq!=='function')return;
    const a=event.target.closest?.('a[href]');if(!a)return;
    const href=a.href;
    try{const url=new URL(href);if(url.hostname==='pf.kakao.com'||url.hostname==='kakao.com'||url.hostname.endsWith('.kakao.com')){
      window.fbq('trackCustom','KakaoConsultClick',{channel:'kakao'});
    }}catch(e){}
  }
  function init(){
    addFooterControls();
    document.addEventListener('click',onClick,true);
    if(choice===null)buildBanner();
    else if(choice==='granted')loadMeta();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
  window.THE303Meta={openSettings:buildBanner,getChoice:()=>choice,isLiveDomain:()=>isLive};
})();

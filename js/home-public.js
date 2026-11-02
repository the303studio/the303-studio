/* Public-facing renderer. Derived from latest uploaded master; no editor or browser-persistent override. */
    (()=>{'use strict';
    const $=(selector,root=document)=>root.querySelector(selector);
    const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
    const STORE='the303-v66-premium-editor';
    const FONT_MAP = {'기본 고딕': "'Noto Sans KR',sans-serif", '부드러운 고딕': "'Gowun Dodum',sans-serif", '감성 명조': "'Nanum Myeongjo',serif", '둥근 제목체': "'Jua',sans-serif", '모던 영문': "'Montserrat','Noto Sans KR',sans-serif"};

    const defaults = {
    "text": {
        "brandEn": "THE303 STUDIO",
        "brandSub": "FLYING YOGA & BARRE",
        "nav1": "THE303",
        "navSub1_1": "스튜디오소개",
        "navSub1_2": "오시는길",
        "nav2": "PROGRAM",
        "navSub2_1": "플라잉요가",
        "navSub2_2": "바레",
        "navSub2_3": "에어리얼댄스",
        "nav3": "CERTIFICATE",
        "navSub3_1": "플라잉지도자",
        "navSub3_2": "워크샵",
        "nav4": "MEDIA STUDIO",
        "navSub4_1": "포트폴리오", 
        "navSub4_2": "촬영 및 대관 안내", 
        "nav5": "NEWS",
        "navSub5_1": "공지사항",
        "navSub5_2": "갤러리",
        "navCta": "수업 상담하기",
        
        "heroEyebrow1": "WELLNESS STUDIO",
        "heroTitle1": "MOVE BEYOND",
        "heroCopy1": "DISCOVER YOUR MOVEMENT",
        "heroBtn1": "수업 상담하기",
        "heroService1": "대구 플라잉요가 · 바레 · 에어리얼댄스",
        
        "heroEyebrow2": "WELLNESS STUDIO",
        "heroTitle2": "FIND YOUR BALANCE",
        "heroCopy2": "DISCOVER YOUR MOVEMENT",
        "heroBtn2": "수업 상담하기",
        "heroService2": "대구 플라잉요가 · 바레 · 에어리얼댄스",
        
        "heroEyebrow3": "WELLNESS STUDIO",
        "heroTitle3": "CAPTURE YOUR FLOW",
        "heroCopy3": "DISCOVER YOUR MOVEMENT",
        "heroBtn3": "수업 상담하기",
        "heroService3": "대구 플라잉요가 · 바레 · 에어리얼댄스",

        "philLabel": "THE303 PHILOSOPHY",
        "philTitle": "가벼운 비상\n단단한 아름다움",
        "philKw1": "집중",
        "philEn1": "FOCUS",
        "philDesc1": "내면을 깊게 바라보고",
        "philKw2": "균형",
        "philEn2": "BALANCE",
        "philDesc2": "몸의 균형을 정확히 맞추고",
        "philKw3": "흐름",
        "philEn3": "FLOW",
        "philDesc3": "움직임 속에서 성장합니다.",

        "programLabel": "THE303 PROGRAM",
        "programHeadline": "PRECISION WORKOUTS",
        "prog1Title": "플라잉요가",
        "prog1En": "FLYING YOGA",
        "prog1Desc": "해먹을 활용해 스트레칭과 신체 조절에 집중하는 클래스",
        "prog2Title": "바레",
        "prog2En": "BARRE",
        "prog2Desc": "바를 활용한 섬세한 움직임으로 하체와 코어에 집중하는 클래스",
        "prog3Title": "에어리얼댄스",
        "prog3En": "AERIAL DANCE",
        "prog3Desc": "음악과 공중 동작을 연결해 리듬과 표현을 즐기는 댄스",

        "ttcLabel": "CERTIFICATE",
        "ttcTitle": "배움에서 지도까지\n움직임을 전하는 힘", 
        "ttcDesc": "플라잉요가 지도자 과정과 워크샵을 통해 현장에서 필요한 지도 역량을 키웁니다.",
        "ttcBtn1": "자격증 과정 안내",
        "ttcBtn2": "워크샵",

        "spaceLabel": "MEDIA STUDIO",
        "spaceTitle": "아름다운 변화를 기록하는 미디어 스튜디오",
        "mssEyebrow": "IN-HOUSE STUDIO",
        "mssStatement": "움직임의 순간을 작품으로",
        "mssDescription": "전문 촬영 환경에서 움직임의 아름다움과 자신만의 개성을 섬세하게 기록합니다.",
        "mssList1": "카메라 및 촬영 장비를 갖춘 전용 공간",
        "mssList2": "지도자 과정 수료생 프로필·포트폴리오 촬영 지원",
        "mssBtn1": "포트폴리오", 
        "mssBtn2": "촬영·대관 안내", 

        "newsLabel": "NEWS & NOTICE",
        "journalLabel": "NEWS & STORIES",
        "journalNoticeEn": "NOTICE",
        "journalNoticeDescription": "스튜디오의 새로운 소식과 주요 안내를 전합니다.",
        "journalNoticeKo": "공지사항",
        "journalGalleryEn": "GALLERY",
        "journalGalleryKo": "갤러리",
        "newsTitle": "THE303 JOURNAL",
        "newsItem1": "신규 바레 클래스 오픈 안내 및 수강 등록 가이드",
        "newsItem2": "2026 하반기 플라잉요가 지도자과정 모집 공고",
        "newsItem3": "원데이 에어리얼댄스 안무 워크샵 신청 안내",
        "newsBtn": "공지사항 바로가기",
        "newsMobileBtn": "전체 보기",

        "address": "대구광역시 달서구 달구벌대로 1525 J타워 3층 301호",
        "phone": "053-568-3303"
    },
    "link": {
        "booking": "http://pf.kakao.com/_xdERxlxj",
        "socialFb": "https://www.facebook.com/share/1DtPRn45tn/",
        "socialIg": "https://www.instagram.com/the303_flyingyoga_barre",
        "socialBlog": "https://blog.naver.com/flyingthe303",
        "socialYt": ""
    },
    "images": {
        "philBgPc": "./images/main/philosophy-pc.jpg",
        "philBgMo": "./images/main/philosophy-mo.jpg"
    },
    "textColors": {
        "programHeadline": "#5C534C"
    },
    "textSizes": {},
    "textFonts": {
        "programHeadline": "모던 영문"
    },
    "font": "기본 고딕"
};

    /* New page architecture: filenames can be changed later via the editor.
       Older localStorage snapshots without imagePaths remain compatible. */
    const IMAGE_PATH_DEFAULTS = {
      hero1:'./images/main/hero-01-pc.jpg',
      hero1Mobile:'./images/main/hero-01-mo.jpg',
      hero2:'./images/main/hero-02-pc.jpg',
      hero2Mobile:'./images/main/hero-02-mo.jpg',
      hero3:'./images/main/hero-03-pc.jpg',
      hero3Mobile:'./images/main/hero-03-mo.jpg',
      flying:'./images/main/program-flying.jpg',
      barre:'./images/main/program-barre.jpg',
      dance:'./images/main/program-dance.jpg',
      ttc:'./images/main/certificate-pc.jpg',
      ttcMobile:'./images/main/certificate-mo.jpg',
      media:'./images/main/media-studio.jpg',
      galleryCover:'./images/main/journal-gallery.jpg'
    };
    const LEGACY_PATH_DEFAULTS = {
      hero1:'./images/main/hero1.jpg',hero2:'./images/main/hero2.jpg',hero3:'./images/main/hero3.jpg',
      flying:'./images/flying/hero.jpg',barre:'./images/barre/hero.jpg',dance:'./images/dance/hero.jpg',
      ttc:'./images/ttc/hero.jpg',media:'./images/main/media-studio.jpg',galleryCover:'./images/gallery/gallery-cover.jpg'
    };

    const groupedTextSections=[
        ["01 상단 메뉴 및 로고", [["brandEn", "로고 큰 영문"], ["brandSub", "로고 작은 영문"], ["nav1", "메뉴 1"], ["navSub1_1", "서브 1-1"], ["navSub1_2", "서브 1-2"], ["nav2", "메뉴 2"], ["navSub2_1", "서브 2-1"], ["navSub2_2", "서브 2-2"], ["navSub2_3", "서브 2-3"], ["nav3", "메뉴 3"], ["navSub3_1", "서브 3-1"], ["navSub3_2", "서브 3-2"], ["nav4", "메뉴 4"], ["navSub4_1", "서브 4-1"], ["navSub4_2", "서브 4-2"], ["nav5", "메뉴 5"], ["navSub5_1", "서브 5-1"], ["navSub5_2", "서브 5-2"], ["navCta", "예약 버튼"]]],
        ["02 메인 슬라이드 1", [["heroEyebrow1", "상단 영문"], ["heroTitle1", "큰 제목"], ["heroCopy1", "설명 문구"], ["heroService1", "한글 프로그램 안내"], ["heroBtn1", "버튼"]]],
        ["03 메인 슬라이드 2", [["heroEyebrow2", "상단 영문"], ["heroTitle2", "큰 제목"], ["heroCopy2", "설명 문구"], ["heroService2", "한글 프로그램 안내"], ["heroBtn2", "버튼"]]],
        ["04 메인 슬라이드 3", [["heroEyebrow3", "상단 영문"], ["heroTitle3", "큰 제목"], ["heroCopy3", "설명 문구"], ["heroService3", "한글 프로그램 안내"], ["heroBtn3", "버튼"]]],
        ["05 철학 (Philosophy)", [["philLabel", "상단 라벨"], ["philTitle", "철학 메인 타이틀"], ["philKw1", "철학 한글 1"], ["philEn1", "철학 영문 1"], ["philDesc1", "철학 설명 1"], ["philKw2", "철학 한글 2"], ["philEn2", "철학 영문 2"], ["philDesc2", "철학 설명 2"], ["philKw3", "철학 한글 3"], ["philEn3", "철학 영문 3"], ["philDesc3", "철학 설명 3"]]],
        ["06 프로그램", [["programLabel", "라벨"], ["programHeadline", "큰 제목"], ["prog1Title", "프 1 한글"], ["prog1En", "프 1 영문"], ["prog1Desc", "프 1 설명"], ["prog2Title", "프 2 한글"], ["prog2En", "프 2 영문"], ["prog2Desc", "프 2 설명"], ["prog3Title", "프 3 한글"], ["prog3En", "프 3 영문"], ["prog3Desc", "프 3 설명"]]],
        ["07 자격증 (TTC)", [["ttcLabel", "라벨"], ["ttcTitle", "큰 제목"], ["ttcDesc", "설명"], ["ttcBtn1", "버튼 1"], ["ttcBtn2", "버튼 2"]]],
        ["08 스튜디오", [["spaceLabel", "상단 라벨"], ["spaceTitle", "상단 큰 제목"], ["mssEyebrow", "인하우스 라벨"], ["mssStatement", "핵심 메시지"], ["mssDescription", "촬영 공간 설명"], ["mssList1", "특징 1"], ["mssList2", "특징 2"], ["mssBtn1", "버튼 1"], ["mssBtn2", "버튼 2"]]],
        ["09 THE303 JOURNAL", [["journalLabel", "상단 라벨"], ["newsTitle", "섹션 제목"], ["journalNoticeEn", "공지 카드 영문"], ["journalNoticeDescription", "공지 카드 안내 문장"], ["journalNoticeKo", "공지 카드 한글"], ["journalGalleryEn", "갤러리 카드 영문"], ["journalGalleryKo", "갤러리 카드 한글"]]],
        ["10 하단 정보", [["address", "주소"], ["phone", "전화번호"]]]
    ];

    const clone = o => JSON.parse(JSON.stringify(o));
    const saved = null; // Public version: always use audited file defaults
    let draft = saved && saved.text ? clone(saved) : clone(defaults);
    draft.imagePaths = { ...IMAGE_PATH_DEFAULTS, ...(draft.imagePaths || {}) };
    // Migrate only known v7 factory paths; custom editor paths are left unchanged.
    Object.entries(LEGACY_PATH_DEFAULTS).forEach(([key,oldPath])=>{
      if(draft.imagePaths[key]===oldPath)draft.imagePaths[key]=IMAGE_PATH_DEFAULTS[key];
    });
    // Existing saved factory image moves to the new PC crop; custom image paths stay intact.
    if(draft.imagePaths.ttc==='./images/main/certificate.jpg') draft.imagePaths.ttc=IMAGE_PATH_DEFAULTS.ttc;
    draft.text = { ...defaults.text, ...(draft.text || {}) };
    // 2026-11-01: editorial punctuation normalization for older FACTORY values only.
    // Any customized editor text stays unchanged. The visible HTML and defaults agree.
    const previousFactoryCopy = {
      philTitle: '가벼운 비상,\n단단한 아름다움',
      ttcTitle: '배움에서 지도까지,\n움직임을 전하는 힘.',
      heroCopy1: 'DISCOVER YOUR MOVEMENT.',
      heroCopy2: 'DISCOVER YOUR MOVEMENT.',
      heroCopy3: 'DISCOVER YOUR MOVEMENT.'
    };
    for (const [key, oldText] of Object.entries(previousFactoryCopy)) {
      if (draft.text[key] === oldText) draft.text[key] = defaults.text[key];
    }

    // Replace only the previous factory CERTIFICATE copy in saved editor data.
    // Preserve every genuinely user-edited title/description.
    if (draft.text.ttcTitle === '배움에서 지도까지,\n움직임의 전문성을 넓히다.') {
      draft.text.ttcTitle = defaults.text.ttcTitle;
    }
    if (draft.text.ttcDesc === '플라잉요가 지도자 과정과 워크샵을 통해 실전 티칭의 역량을 기릅니다.') {
      draft.text.ttcDesc = defaults.text.ttcDesc;
    }
    // Migrate only the previous MEDIA STUDIO factory wording; do not override customized copy.
    if (draft.text.mssStatement === '움직임의 순간을, 작품으로.') {
      draft.text.mssStatement = defaults.text.mssStatement;
    }
    if (draft.text.mssBtn2 === '촬영 및 대관 안내') {
      draft.text.mssBtn2 = defaults.text.mssBtn2;
    }
    // Correct typography in untouched factory copy without replacing user edits.
    if (draft.text.mssList2 === '지도자과정 수료생 프로필·포트폴리오 촬영 지원') {
      draft.text.mssList2 = defaults.text.mssList2;
    }
    draft.link = { ...defaults.link, ...(draft.link || {}) };
    draft.images = { ...defaults.images, ...(draft.images || {}) };
    if((draft.images.philBgPc||'').includes('images/main/director.jpg'))draft.images.philBgPc=defaults.images.philBgPc;
    draft.textColors = { ...defaults.textColors, ...(draft.textColors || {}) };
    draft.textSizes = { ...defaults.textSizes, ...(draft.textSizes || {}) };
    draft.textFonts = { ...defaults.textFonts, ...(draft.textFonts || {}) };

    // Migrate old stored CSS `url(...)` strings, including nested wrappers, to
    // real image paths. Native <img>/<source> elements resolve paths reliably.
    function normalizePhilImage(value, fallback = '') {
        let v = String(value ?? '').trim();
        for(let n = 0; n < 6; n++) {
            const m = /^url\(\s*([\s\S]*?)\s*\)$/i.exec(v);
            if(!m)break;
            v = m[1].trim();
            if((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v=v.slice(1,-1).trim();
        }
        if(!v) return fallback;
        if(/[<>\x00-\x1f]/.test(v) || /^(?:javascript|vbscript):/i.test(v)) return fallback;
        if(/^data:/i.test(v) && !/^data:image\/(?:png|jpe?g|gif|webp|avif|bmp|svg\+xml);base64,/i.test(v))return fallback;
        return v;
    }

    const PHIL_PC_DEFAULT='./images/main/philosophy-pc.jpg';
    const PHIL_MO_DEFAULT='./images/main/philosophy-mo.jpg';
    // These data URLs/paths were saved by older versions. Do not reset other
    // text, image, or brand edits stored in localStorage.
    draft.images.philBgPc=normalizePhilImage(draft.images.philBgPc,PHIL_PC_DEFAULT);
    draft.images.philBgMo=normalizePhilImage(draft.images.philBgMo,'');

    function setPhilosophyImages(settings) {
        const img = document.getElementById('philosophyBackgroundImage');
        const mobile = document.getElementById('philosophyMobileSource');
        if(!img || !mobile) return;
        const pc = normalizePhilImage(settings.images?.philBgPc, PHIL_PC_DEFAULT);
        const mo = normalizePhilImage(settings.images?.philBgMo, '');
        // Store the desktop source for mobile load-error fallback.
        img.dataset.desktopSource=pc;
        img.dataset.mobileSource=mo;
        mobile.srcset=mo || pc;
        if(img.getAttribute('src')!==pc)img.setAttribute('src',pc);
    }

    // A missing mobile file must not leave the philosophy section blank.
    // Browser-native <picture> selects the right file; on error we retry PC.
    const philImage=document.getElementById('philosophyBackgroundImage');
    if(philImage){
        philImage.addEventListener('error',()=>{
            const mobile=document.getElementById('philosophyMobileSource');
            const pc=philImage.dataset.desktopSource || PHIL_PC_DEFAULT;
            if(mobile && mobile.getAttribute('srcset')!==pc){
                mobile.setAttribute('srcset',pc);
                philImage.setAttribute('src',pc);
                philImage.dataset.philFallback='pc';
            }else{
                philImage.dataset.philFallback='unavailable';
                const status=document.getElementById('philImageStatus');
                if(status){
                    status.textContent='배경 이미지를 불러오지 못했습니다. images/main/ 폴더와 파일명을 확인해 주세요.';
                    status.style.color='#A63B3B';
                }
            }
        });
        philImage.addEventListener('load',()=>{
            const status=document.getElementById('philImageStatus');
            if(status){
                status.textContent='이미지 연결 확인: '+philImage.naturalWidth+' × '+philImage.naturalHeight+'px';
                status.style.color='#346747';
            }
        });
    }

    function render(o) {
        document.body.style.fontFamily = FONT_MAP[o.font] || FONT_MAP['기본 고딕'];
        
        $$('[data-text]').forEach(el => {
            const k = el.dataset.text;
            const content = String(o.text[k] ?? '');
            // Preserve the editor's single `spaceTitle` field. When its ending
            // is the approved phrase, wrap only that phrase for mobile emphasis.
            // Any differently edited title remains ordinary, editable text.
            if (k === 'spaceTitle' && content.trimEnd().endsWith('미디어 스튜디오')) {
                const phrase = '미디어 스튜디오';
                const end = content.lastIndexOf(phrase);
                const accent = document.createElement('span');
                accent.className = 'space-title-accent';
                accent.textContent = phrase;
                el.replaceChildren(document.createTextNode(content.slice(0, end)), accent,
                                   document.createTextNode(content.slice(end + phrase.length)));
            } else {
                el.textContent = content;
            }
            el.style.whiteSpace = 'pre-line';
            el.style.color = (o.textColors||{})[k] || '';
            el.style.fontSize = (o.textSizes||{})[k] || '';
            if ((o.textFonts||{})[k]) el.style.fontFamily = FONT_MAP[(o.textFonts||{})[k]];
            else el.style.fontFamily = ''; 
        });

        $$('[data-link]').forEach(el => {
            const target = safeLink(o.link[el.dataset.link], el.dataset.link === 'booking' ? 'http://pf.kakao.com/_xdERxlxj' : '#');
            el.href = target;
            const disabled = el.dataset.link === 'socialYt' && target === '#';
            if(disabled){
                // Do not leave href="#": it would send the user to page top.
                // Keep the icon visible, and restore the link on editor update.
                el.removeAttribute('href');
                el.setAttribute('aria-disabled','true');
                el.setAttribute('tabindex','-1');
                el.setAttribute('title','유튜브 채널 준비 중');
            }
            else{el.removeAttribute('aria-disabled');el.removeAttribute('tabindex');el.removeAttribute('title');}
            if(!target.startsWith('#') && !target.startsWith('tel:') && !target.startsWith('mailto:')){
                el.target = '_blank'; el.rel = 'noopener noreferrer';
            } else {
                el.removeAttribute('target'); el.removeAttribute('rel');
            }
        });
        
        const getSafePath=(key)=>{
          const path=String((o.imagePaths||{})[key]||IMAGE_PATH_DEFAULTS[key]||'').trim();
          return /^(?!\s*(?:javascript|vbscript|data):)[^\<>"']+$/i.test(path) ? path : IMAGE_PATH_DEFAULTS[key];
        };
        Object.keys(IMAGE_PATH_DEFAULTS).forEach(key=>{
          const safe=getSafePath(key);
          $$(`[data-image-path="${key}"]`).forEach(img=>{
            if(img.getAttribute('src')!==safe)img.setAttribute('src',safe);
          });
        });
        // Keep mobile <picture> srcset editable; a custom desktop-only path does
        // not erase the dedicated responsive crop.
        $$('[data-image-mobile]').forEach(source=>{
          const safe=getSafePath(source.dataset.imageMobile);
          if(source.getAttribute('srcset')!==safe) source.setAttribute('srcset',safe);
        });
        $$('[data-image-bg]').forEach(bg=>{
          const key=bg.dataset.imageBg;
          bg.dataset.imageDesktop=getSafePath(key);
          const mobileKey=bg.dataset.imageBgMobile;
          if(mobileKey){
            bg.dataset.imageMobile=getSafePath(mobileKey);
            window.THE303ImageRoutes?.refreshOne(bg);
          } else if(bg.dataset.currentImage!==bg.dataset.imageDesktop){
            bg.style.backgroundImage=`url(${JSON.stringify(bg.dataset.imageDesktop)})`;
            bg.dataset.currentImage=bg.dataset.imageDesktop;
            bg.dispatchEvent(new Event('the303:image-changed'));
          }
        });
        document.dispatchEvent(new Event('the303:content-updated'));
        // Philosophy now uses <picture> to avoid stylesheet-relative CSS URL bugs.
        // Old saved `url(...)` values are normalized before assigning src/srcset.
        setPhilosophyImages(o);
    }


    function safeLink(value, fallback = '#footer') {
        const raw = String(value || '').trim();
        if (!raw) return fallback;
        try {
          const parsed = new URL(raw, window.location.href);
          if (['https:', 'http:', 'tel:', 'mailto:'].includes(parsed.protocol)) return raw;
        } catch (_) {}
        return fallback;
    }


    render(draft);
    })();

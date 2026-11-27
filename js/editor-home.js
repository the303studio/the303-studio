    (()=>{'use strict';
    const $=(selector,root=document)=>root.querySelector(selector);
    const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
    const STORE='the303-v70-intro-v05-editor';
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
        "navSub3_1": "자격증과정",
        "navSub3_2": "워크샵",
        "nav4": "MEDIA STUDIO",
        "navSub4_1": "포트폴리오", 
        "navSub4_2": "촬영 및 대관 안내", 
        "nav5": "NEWS",
        "navSub5_1": "공지사항",
        "navSub5_2": "갤러리",
        "navCta": "수업 상담하기",
        
        "heroEyebrow1": "",
        "heroTitle1": "PRECISION",
        "heroCopy1": "",
        "heroBtn1": "EXPLORE FLYING YOGA",
        "heroService1": "대구 플라잉요가 · 바레 · 에어리얼댄스",
        
        "heroEyebrow2": "",
        "heroTitle2": "RHYTHM",
        "heroCopy2": "",
        "heroBtn2": "EXPLORE FLYING YOGA",
        "heroService2": "대구 플라잉요가 · 바레 · 에어리얼댄스",
        
        "heroEyebrow3": "",
        "heroTitle3": "STRENGTH",
        "heroCopy3": "",
        "heroBtn3": "EXPLORE BARRE",
        "heroService3": "대구 플라잉요가 · 바레 · 에어리얼댄스",

        "heroEyebrow4": "",
        "heroTitle4": "SCULPT",
        "heroCopy4": "",
        "heroBtn4": "EXPLORE BARRE",
        "heroService4": "",

        "heroEyebrow5": "STUDIO",
        "heroTitle5": "THE303",
        "heroCopy5": "",
        "heroBtn5": "DISCOVER THE303",
        "heroService5": "",

        "philLabel": "THE303 PHILOSOPHY",
        "philTitle": "가벼운 비상\n단단한 아름다움",
        "philKw1": "집중",
        "philEn1": "FOCUS",
        "philDesc1": "내면을 깊게 바라보고",
        "philKw2": "균형",
        "philEn2": "BALANCE",
        "philDesc2": "몸의 중심을 찾아가고",
        "philKw3": "흐름",
        "philEn3": "FLOW",
        "philDesc3": "움직임 속에서 성장합니다.",

        "programLabel": "THE303 PROGRAM",
        "programHeadline": "THE ART OF MOVEMENT",
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
        "spaceTitle": "움직임이 예술이 되는 순간",
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
        "booking": "https://pf.kakao.com/_xdERxlxj",
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
      hero1:'./images/main/rolling/01-precision-pc.jpg',
      hero1Mobile:'./images/main/rolling/01-precision-mo.jpg',
      hero2:'./images/main/rolling/02-rhythm-pc.jpg',
      hero2Mobile:'./images/main/rolling/02-rhythm-mo.webp',
      hero3:'./images/main/rolling/03-strength-pc.jpg',
      hero3Mobile:'./images/main/rolling/03-strength-mo.jpg',
      hero4:'./images/main/rolling/04-sculpt-pc.jpg',
      hero4Mobile:'./images/main/rolling/04-sculpt-mo.jpg',
      hero5:'./images/main/rolling/05-the303-pc.jpg',
      hero5Mobile:'./images/main/rolling/05-the303-mo.jpg',
      flying:'./images/main/flying-sequence/flying-01-pc.webp',
      barre:'./images/main/barre-sequence/barre-01-pc.jpg',
      dance:'./images/main/program-dance.jpg',
      ttc:'./images/main/certificate-pc.jpg',
      ttcMobile:'./images/main/certificate-mo.jpg',
      media:'./images/media/portfolio-01.jpg',
      galleryCover:'./images/main/journal-gallery.jpg',
      programFlying2:'./images/main/flying-sequence/flying-02-pc.webp',
      programFlying3:'./images/main/flying-sequence/flying-03-pc.webp',
      programFlying4:'./images/main/flying-sequence/flying-04-pc.webp',
      programFlying5:'./images/main/flying-sequence/flying-05-pc.webp',
      mediaPhoto2:'./images/media/portfolio-02.jpg',
      mediaPhoto3:'./images/media/portfolio-04.jpg',
      mediaPhoto4:'./images/media/portfolio-05.jpg',
      journalPhoto1:'./images/main/moments/thumb/moment-01.jpg',
      journalFull1:'./images/main/moments/full/moment-01.jpg',
      journalPhoto2:'./images/main/moments/thumb/moment-02.jpg',
      journalFull2:'./images/main/moments/full/moment-02.jpg',
      journalPhoto3:'./images/main/moments/thumb/moment-03.jpg',
      journalFull3:'./images/main/moments/full/moment-03.jpg',
      journalPhoto4:'./images/main/moments/thumb/moment-04.jpg',
      journalFull4:'./images/main/moments/full/moment-04.jpg',
      journalPhoto5:'./images/main/moments/thumb/moment-05.jpg',
      journalFull5:'./images/main/moments/full/moment-05.jpg',
      journalPhoto6:'./images/main/moments/thumb/moment-06.jpg',
      journalFull6:'./images/main/moments/full/moment-06.jpg',
      journalPhoto7:'./images/main/moments/thumb/moment-07.jpg',
      journalFull7:'./images/main/moments/full/moment-07.jpg',
      journalPhoto8:'./images/main/moments/thumb/moment-08.jpg',
      journalFull8:'./images/main/moments/full/moment-08.jpg',
      journalPhoto9:'./images/main/moments/thumb/moment-09.jpg',
      journalFull9:'./images/main/moments/full/moment-09.jpg'
    };
    const LEGACY_PATH_DEFAULTS = {
      hero1:'./images/main/hero1.jpg',hero2:'./images/main/hero2.jpg',hero3:'./images/main/hero3.jpg',
      flying:'./images/flying/hero.jpg',barre:'./images/barre/hero.jpg',dance:'./images/dance/hero.jpg',
      ttc:'./images/ttc/hero.jpg',media:'./images/main/media-studio.jpg',galleryCover:'./images/gallery/gallery-cover.jpg'
    };

    const groupedTextSections=[
        ["01 상단 메뉴 및 로고", [["brandEn", "로고 큰 영문"], ["brandSub", "로고 작은 영문"], ["nav1", "메뉴 1"], ["navSub1_1", "서브 1-1"], ["navSub1_2", "서브 1-2"], ["nav2", "메뉴 2"], ["navSub2_1", "서브 2-1"], ["navSub2_2", "서브 2-2"], ["navSub2_3", "서브 2-3"], ["nav3", "메뉴 3"], ["navSub3_1", "서브 3-1"], ["navSub3_2", "서브 3-2"], ["nav4", "메뉴 4"], ["navSub4_1", "서브 4-1"], ["navSub4_2", "서브 4-2"], ["nav5", "메뉴 5"], ["navSub5_1", "서브 5-1"], ["navSub5_2", "서브 5-2"], ["navCta", "예약 버튼"]]],
        ["02 인트로 SCULPT", [["heroEyebrow4", "작은 프로그램명"], ["heroTitle4", "큰 영문 카피"], ["heroCopy4", "보조 문구"], ["heroBtn4", "탐색 링크"]]],
        ["03 인트로 RHYTHM", [["heroEyebrow2", "작은 프로그램명"], ["heroTitle2", "큰 영문 카피"], ["heroCopy2", "보조 문구"], ["heroBtn2", "탐색 링크"]]],
        ["04 인트로 STRENGTH", [["heroEyebrow3", "작은 프로그램명"], ["heroTitle3", "큰 영문 카피"], ["heroCopy3", "보조 문구"], ["heroBtn3", "탐색 링크"]]],
        ["05 인트로 PRECISION", [["heroEyebrow1", "작은 프로그램명"], ["heroTitle1", "큰 영문 카피"], ["heroCopy1", "보조 문구"], ["heroBtn1", "탐색 링크"]]],
        ["06 인트로 THE303", [["heroEyebrow5", "작은 프로그램명"], ["heroTitle5", "큰 영문 카피"], ["heroCopy5", "보조 문구"], ["heroBtn5", "탐색 링크"]]],
        ["07 철학 (Philosophy)", [["philLabel", "상단 라벨"], ["philTitle", "철학 메인 타이틀"], ["philKw1", "철학 한글 1"], ["philEn1", "철학 영문 1"], ["philDesc1", "철학 설명 1"], ["philKw2", "철학 한글 2"], ["philEn2", "철학 영문 2"], ["philDesc2", "철학 설명 2"], ["philKw3", "철학 한글 3"], ["philEn3", "철학 영문 3"], ["philDesc3", "철학 설명 3"]]],
        ["08 프로그램", [["programLabel", "라벨"], ["programHeadline", "큰 제목"], ["prog1Title", "프 1 한글"], ["prog1En", "프 1 영문"], ["prog1Desc", "프 1 설명"], ["prog2Title", "프 2 한글"], ["prog2En", "프 2 영문"], ["prog2Desc", "프 2 설명"], ["prog3Title", "프 3 한글"], ["prog3En", "프 3 영문"], ["prog3Desc", "프 3 설명"]]],
        ["09 자격증 (TTC)", [["ttcLabel", "라벨"], ["ttcTitle", "큰 제목"], ["ttcDesc", "설명"], ["ttcBtn1", "버튼 1"], ["ttcBtn2", "버튼 2"]]],
        ["10 스튜디오", [["spaceLabel", "상단 라벨"], ["spaceTitle", "상단 큰 제목"], ["mssEyebrow", "인하우스 라벨"], ["mssStatement", "핵심 메시지"], ["mssDescription", "촬영 공간 설명"], ["mssList1", "특징 1"], ["mssList2", "특징 2"], ["mssBtn1", "버튼 1"], ["mssBtn2", "버튼 2"]]],
        ["11 THE303 JOURNAL", [["journalLabel", "상단 라벨"], ["newsTitle", "섹션 제목"], ["journalNoticeEn", "공지 카드 영문"], ["journalNoticeDescription", "공지 카드 안내 문장"], ["journalNoticeKo", "공지 카드 한글"], ["journalGalleryEn", "갤러리 카드 영문"], ["journalGalleryKo", "갤러리 카드 한글"]]],
        ["12 하단 정보", [["address", "주소"], ["phone", "전화번호"]]]
    ];

    const clone = o => JSON.parse(JSON.stringify(o));
    let saved; try { saved = JSON.parse(localStorage.getItem(STORE)||'null'); } catch(e) { saved = null; }
    // Carry over other master/editor customizations, without recycling the older three-hero copy and photos.
    if(!saved){
      for(const prev of ['the303-v69-intro-v05-editor','the303-v68-intro-v03-editor','the303-v67-intro-v2-editor','the303-v66-premium-editor']){
        let prior=null;try{prior=JSON.parse(localStorage.getItem(prev)||'null');}catch(_){}
        if(prior?.text){
          saved=clone(prior);
          Object.keys(saved.text||{}).forEach(key=>{if(/^hero(?:Eyebrow|Title|Copy|Btn|Service)\d+$/.test(key))delete saved.text[key];});
          Object.keys(saved.imagePaths||{}).forEach(key=>{if(/^hero\d+(?:Mobile)?$/.test(key))delete saved.imagePaths[key];});
          break;
        }
      }
    }
    let draft = saved && saved.text ? clone(saved) : clone(defaults);
    draft.imagePaths = { ...IMAGE_PATH_DEFAULTS, ...(draft.imagePaths || {}) };
    // IMAGE MANAGED MASTER 2026-11-09. Auto-upgrade older factory image paths.
    // This does NOT touch an owner-selected custom image path.
    const FACTORY_IMAGE_PATH_MIGRATION = {
      "./images/main/v11-5/hero-line-pc.jpg": "./images/main/rolling/01-precision-pc.jpg",
      "./images/main/v11-4/hero-flow-pc.jpg": "./images/main/rolling/02-rhythm-pc.jpg",
      "./images/main/intro-v05-03-strength-pc.jpg": "./images/main/rolling/03-strength-pc.jpg",
      "./images/main/intro-v05-04-control-pc.jpg": "./images/main/rolling/04-sculpt-pc.jpg",
      "./images/main/intro-v05-05-brand-pc.jpg": "./images/main/rolling/05-the303-pc.jpg",
      "./images/main/v11/hero-line-mo.jpg": "./images/main/rolling/01-precision-mo.jpg",
      "./images/main/v11-4/hero-flow-mo.webp": "./images/main/rolling/02-rhythm-mo.webp",
      "./images/main/intro-v05-03-strength-mo.jpg": "./images/main/rolling/03-strength-mo.jpg",
      "./images/main/intro-v05-04-control-mo.jpg": "./images/main/rolling/04-sculpt-mo.jpg",
      "./images/main/intro-v05-05-brand-mo.jpg": "./images/main/rolling/05-the303-mo.jpg",
      "./images/main/v11/flying-01-pc.webp": "./images/main/flying-sequence/flying-01-pc.webp",
      "./images/main/v11/flying-01-mo.webp": "./images/main/flying-sequence/flying-01-mo.webp",
      "./images/main/v12/barre-01-mo.webp": "./images/main/barre-sequence/barre-01-mo.webp",
      "./images/main/v11/flying-02-pc.webp": "./images/main/flying-sequence/flying-02-pc.webp",
      "./images/main/v12/barre-02-pc.webp": "./images/main/barre-sequence/barre-02-pc.webp",
      "./images/main/v11/flying-02-mo.webp": "./images/main/flying-sequence/flying-02-mo.webp",
      "./images/main/v12/barre-02-mo.webp": "./images/main/barre-sequence/barre-02-mo.webp",
      "./images/main/v11/flying-03-pc.webp": "./images/main/flying-sequence/flying-03-pc.webp",
      "./images/main/v12/barre-03-pc.webp": "./images/main/barre-sequence/barre-03-pc.webp",
      "./images/main/v11/flying-03-mo.webp": "./images/main/flying-sequence/flying-03-mo.webp",
      "./images/main/v12/barre-03-mo.webp": "./images/main/barre-sequence/barre-03-mo.webp",
      "./images/main/v11/flying-04-pc.webp": "./images/main/flying-sequence/flying-04-pc.webp",
      "./images/main/v12/barre-04-pc.webp": "./images/main/barre-sequence/barre-04-pc.webp",
      "./images/main/v11/flying-04-mo.webp": "./images/main/flying-sequence/flying-04-mo.webp",
      "./images/main/v12/barre-04-mo.webp": "./images/main/barre-sequence/barre-04-mo.webp",
      "./images/main/v11/flying-05-pc.webp": "./images/main/flying-sequence/flying-05-pc.webp",
      "./images/main/v12/barre-05-pc.webp": "./images/main/barre-sequence/barre-05-pc.webp",
      "./images/main/v11/flying-05-mo.webp": "./images/main/flying-sequence/flying-05-mo.webp",
      "./images/main/v12/barre-05-mo.webp": "./images/main/barre-sequence/barre-05-mo.webp",
      "./images/main/v12/barre-01-pc.webp": "./images/main/barre-sequence/barre-01-pc.jpg",
      "./images/main/program-barre.jpg": "./images/main/barre-sequence/barre-01-pc.jpg",
      "./images/main/v11-4/hero-flow-pc.webp": "./images/main/rolling/02-rhythm-pc.jpg",
      "./images/main/v11-5/hero-line-pc.webp": "./images/main/rolling/01-precision-pc.jpg",
      "./images/main/v11/hero-line-mo.webp": "./images/main/rolling/01-precision-mo.jpg",
      "./images/main/hero1.jpg": "./images/main/rolling/01-precision-pc.jpg",
      "./images/main/hero2.jpg": "./images/main/rolling/02-rhythm-pc.jpg",
      "./images/main/hero3.jpg": "./images/main/rolling/03-strength-pc.jpg"
};
    Object.keys(draft.imagePaths).forEach(key=>{
      const currentPath=String(draft.imagePaths[key]||'');
      if(Object.prototype.hasOwnProperty.call(FACTORY_IMAGE_PATH_MIGRATION,currentPath))
        draft.imagePaths[key]=FACTORY_IMAGE_PATH_MIGRATION[currentPath];
    });

    // PC hero JPG photo comparison: migrate only recognizable former factory WebP paths.
    // Preserve custom editor image paths that the owner explicitly selected.
    if (draft.imagePaths.hero1 === './images/main/v11-5/hero-line-pc.webp') {
      draft.imagePaths.hero1 = IMAGE_PATH_DEFAULTS.hero1;
    }
    if (draft.imagePaths.hero2 === './images/main/v11-4/hero-flow-pc.webp') {
      draft.imagePaths.hero2 = IMAGE_PATH_DEFAULTS.hero2;
    }

    // V13.3.4 JPG mobile-hero transition: migrate only the old factory WebP path.
    // Preserve other user-edited image paths stored in this browser.
    if (draft.imagePaths.hero1Mobile === './images/main/v11/hero-line-mo.webp') {
      draft.imagePaths.hero1Mobile = IMAGE_PATH_DEFAULTS.hero1Mobile;
    }

    // V05: retain custom image paths; only upgrade factory V04 image references.
    Object.entries(IMAGE_PATH_DEFAULTS).forEach(([key, fresh]) => {
      if(!/^hero[1-5](?:Mobile)?$/.test(key)) return;
      const old=fresh.replace('intro-v05-', 'intro-v04-');
      if(draft.imagePaths[key]===old) draft.imagePaths[key]=fresh;
    });
    // Migrate only known v7 factory paths; custom editor paths are left unchanged.
    Object.entries(LEGACY_PATH_DEFAULTS).forEach(([key,oldPath])=>{
      if(draft.imagePaths[key]===oldPath)draft.imagePaths[key]=IMAGE_PATH_DEFAULTS[key];
    });
    // MOMENTS nine-cut editorial replacement: upgrade only saved old factory gallery paths.
    // Explicitly edited custom image paths in the user's browser remain untouched.
    const LEGACY_MOMENTS_IMAGE_PATHS = {
      journalPhoto1:'./images/gallery/thumb/gallery-05.jpg',
      journalFull1:'./images/gallery/full/gallery-05.jpg',
      journalPhoto2:'./images/gallery/thumb/gallery-03.jpg',
      journalFull2:'./images/gallery/full/gallery-03.jpg',
      journalPhoto3:'./images/gallery/thumb/gallery-01.jpg',
      journalFull3:'./images/gallery/full/gallery-01.jpg',
      journalPhoto4:'./images/gallery/thumb/gallery-08.jpg',
      journalFull4:'./images/gallery/full/gallery-08.jpg',
      journalPhoto5:'./images/gallery/thumb/gallery-10.jpg',
      journalFull5:'./images/gallery/full/gallery-10.jpg',
      journalPhoto6:'./images/gallery/thumb/gallery-15.jpg',
      journalFull6:'./images/gallery/full/gallery-15.jpg',
      journalPhoto7:'./images/gallery/thumb/gallery-18.jpg',
      journalFull7:'./images/gallery/full/gallery-18.jpg',
      journalPhoto8:'./images/gallery/thumb/gallery-20.jpg',
      journalFull8:'./images/gallery/full/gallery-20.jpg',
      journalPhoto9:'./images/gallery/thumb/gallery-19.jpg',
      journalFull9:'./images/gallery/full/gallery-19.jpg',
    };
    Object.entries(LEGACY_MOMENTS_IMAGE_PATHS).forEach(([key,legacy])=>{
      if(draft.imagePaths[key]===legacy)draft.imagePaths[key]=IMAGE_PATH_DEFAULTS[key];
    });
    // V06: photo-first media image. Never replace an edited custom image path.
    if(draft.imagePaths.media==='./images/main/media-studio.jpg') draft.imagePaths.media='./images/media/portfolio-01.jpg';
    // V06: update old factory copy only, not content customized in the editor.
    if(draft.text?.programHeadline==='PRECISION WORKOUTS') draft.text.programHeadline='THE ART OF MOVEMENT';
    if(draft.text?.spaceTitle==='아름다운 변화를 기록하는 미디어 스튜디오') draft.text.spaceTitle='움직임이 예술이 되는 순간';
    // Existing saved factory image moves to the new PC crop; custom image paths stay intact.
    if(draft.imagePaths.ttc==='./images/main/certificate.jpg') draft.imagePaths.ttc=IMAGE_PATH_DEFAULTS.ttc;
    draft.text = { ...defaults.text, ...(draft.text || {}) };
    // V03: migrate only the former factory navigation label; retain customized labels.
    if (draft.text.navSub3_1 === '플라잉지도자') draft.text.navSub3_1 = '자격증과정';
    // V13.2: update only unchanged previous factory hero keywords.
    // Do not override user-customized editor text or image paths.
    const previousHeroTitles = {
      heroTitle1: ['Balance','LINE'],
      heroTitle2: ['Flow','FLOW'],
      heroTitle3: ['Strength','STRENGTH'],
      heroTitle4: ['Control','CONTROL']
    };
    for (const [key, oldFactoryValues] of Object.entries(previousHeroTitles)) {
      if (oldFactoryValues.includes(draft.text?.[key])) draft.text[key] = defaults.text[key];
    }

    // V13.3.1: migrate recognizable factory hero labels/captions left in this
    // browser's saved editor snapshot. Other custom editor data are preserved.
    const legacyHeroFactoryCopy = {
      heroEyebrow1: ['FLYING YOGA', 'Flying Yoga'],
      heroEyebrow2: ['FLYING YOGA', 'Flying Yoga'],
      heroEyebrow3: ['BARRE', 'Barre'],
      heroEyebrow4: ['BARRE', 'Barre'],
      heroEyebrow5: ['THE303 STUDIO'],
      heroCopy1: ['움직임이 그리는 선', 'DISCOVER YOUR MOVEMENT.'],
      heroCopy2: ['중력을 넘어 흐르는 움직임', 'DISCOVER YOUR MOVEMENT.'],
      heroCopy3: ['단단한 힘의 순간', 'DISCOVER YOUR MOVEMENT.'],
      heroCopy4: ['섬세함으로 완성한 힘'],
      heroCopy5: ['FLOW MEETS STRENGTH']
    };
    for (const [key, knownFactoryValues] of Object.entries(legacyHeroFactoryCopy)) {
      if (knownFactoryValues.includes(draft.text?.[key])) draft.text[key] = defaults.text[key];
    }

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
    if (typeof draft.link.booking === 'string' &&
        /^http:\/\/pf\.kakao\.com\/_xdERxlxj\/?(?=[?#]|$)/i.test(draft.link.booking.trim())) {
      draft.link.booking = draft.link.booking.trim().replace(/^http:/i, 'https:');
    }
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
            const target = safeLink(o.link[el.dataset.link], el.dataset.link === 'booking' ? 'https://pf.kakao.com/_xdERxlxj' : '#');
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
        // V07 photo-wall expanded versions (separate from the nine editable thumbnails).
        $$('[data-gallery-full]').forEach(tile=>{
          const key=tile.dataset.galleryFull;
          const safe=getSafePath(key);
          if(tile.dataset.fullSrc!==safe)tile.dataset.fullSrc=safe;
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

    function build() {
        const root = $('#editFields'); root.textContent = '';
        
        const themes = document.createElement('details');
        themes.innerHTML = `<summary>🎨 전체 폰트 설정</summary>`;
        const tf = document.createElement('div'); tf.className = 'fields';
        
        const fontSel = document.createElement('select'); fontSel.style.cssText = 'width:100%;padding:10px;border:1px solid #d7dacf;background:white;margin-top:10px; font-family:"Noto Sans KR", sans-serif;';
        Object.keys(FONT_MAP).forEach(fname => {
            const opt = document.createElement('option'); opt.value = fname; opt.textContent = fname;
            if(draft.font === fname) opt.selected = true; fontSel.appendChild(opt);
        });
        fontSel.onchange = () => { draft.font = fontSel.value; render(draft); };
        const fontLabel = document.createElement('label'); fontLabel.textContent = '전체 기본 폰트'; fontLabel.style.marginTop = '10px';
        tf.appendChild(fontLabel); tf.appendChild(fontSel);
        themes.appendChild(tf); 
        root.appendChild(themes);

        const imgBlock = document.createElement('details'); imgBlock.innerHTML = `<summary>📷 필라소피 배경 이미지 설정</summary>`;
        const iFields = document.createElement('div'); iFields.className = 'fields';
        const fImgPc = document.createElement('div'); fImgPc.className = 'field';
        fImgPc.innerHTML = `<label>철학 배경 이미지 (기본: PC·모바일 공통)</label>
                          <input type="file" accept="image/*" style="background:#fff; padding:8px; width:100%; border:1px solid #d7dacf;">`;
        const importImage = (file, key) => {
            if (!file) return;
            if (file.size > 2 * 1024 * 1024) {
                $('#saveStatus').textContent = '⚠️ 이미지가 2MB를 초과합니다. 최적화 후 다시 선택해 주세요.';
                return;
            }
            const reader = new FileReader();
            reader.onload = () => { draft.images[key] = reader.result; render(draft); $('#saveStatus').textContent = '이미지가 적용되었습니다. 저장 버튼을 눌러 확정하세요.'; };
            reader.readAsDataURL(file);
        };
        fImgPc.querySelector('input').onchange = (e) => importImage(e.target.files[0], 'philBgPc');
        iFields.appendChild(fImgPc);
        const fImgMo = document.createElement('div'); fImgMo.className = 'field';
        fImgMo.innerHTML = `<label>모바일 전용 이미지 (선택, 미설정 시 PC 이미지 사용)</label><input type="file" accept="image/*" style="background:#fff; padding:8px; width:100%; border:1px solid #d7dacf;">`;
        fImgMo.querySelector('input').onchange = (e) => importImage(e.target.files[0], 'philBgMo');
        iFields.appendChild(fImgMo);
        const clearMo = document.createElement('button'); clearMo.type = 'button'; clearMo.className = 'reset-btn'; clearMo.textContent = '모바일 전용 이미지 해제';
        clearMo.onclick = () => { draft.images.philBgMo=''; render(draft); $('#saveStatus').textContent = '모바일에서 PC 배경 이미지를 함께 사용합니다.'; };
        iFields.appendChild(clearMo);
        const pathSection=document.createElement('div');pathSection.className='fields';
        [['philBgPc','철학 PC 배경 경로'],['philBgMo','철학 모바일 배경 경로 (선택)']].forEach(([key,label])=>{
          const field=document.createElement('div');field.className='field';
          const lab=document.createElement('label');lab.textContent=label;
          const inp=document.createElement('input');inp.type='text';
          inp.value=key==='philBgMo'&&!draft.images[key]?'':normalizePhilImage(draft.images[key],defaults.images[key]);
          inp.placeholder=key==='philBgPc'?'./images/main/philosophy-pc.jpg':'./images/main/philosophy-mo.jpg';
          inp.onchange=()=>{
            const val=normalizePhilImage(inp.value.trim(),key==='philBgPc'?PHIL_PC_DEFAULT:'');
            draft.images[key]=val;
            inp.value=val;
            render(draft);
          };
          field.append(lab,inp);pathSection.append(field);
        });
        iFields.append(pathSection);
        const philImageStatus=document.createElement('p');
        philImageStatus.id='philImageStatus';
        philImageStatus.style.cssText='font-size:12px;line-height:1.7;color:#726A64;';
        philImageStatus.textContent='사진 경로를 입력한 뒤 저장하면 실제 이미지로 연결됩니다.';
        iFields.append(philImageStatus);
        imgBlock.appendChild(iFields);
        root.appendChild(imgBlock);

        const pathBlock = document.createElement('details');
        pathBlock.innerHTML = '<summary>📁 주요 사진 경로 설정 (폴더 이동 후 변경 가능)</summary>';
        const pathFields = document.createElement('div'); pathFields.className = 'fields';
        const imageLabels = {
          hero1:'인트로 4 PRECISION · PC',hero1Mobile:'인트로 4 PRECISION · 모바일',
          hero2:'인트로 2 RHYTHM · PC',hero2Mobile:'인트로 2 RHYTHM · 모바일',
          hero3:'인트로 3 STRENGTH · PC',hero3Mobile:'인트로 3 STRENGTH · 모바일',
          hero4:'인트로 1 SCULPT · PC',hero4Mobile:'인트로 1 SCULPT · 모바일',
          hero5:'인트로 5 THE303 · PC',hero5Mobile:'인트로 5 THE303 · 모바일',
          flying:'메인 전용 · 플라잉요가',barre:'메인 전용 · 바레',dance:'메인 전용 · 에어리얼댄스',
          ttc:'메인 전용 · 지도자과정 PC',ttcMobile:'메인 전용 · 지도자과정 모바일',media:'메인 전용 · 미디어 스튜디오',galleryCover:'메인 JOURNAL 전용 · 갤러리 대표',
          programFlying2:'PROGRAM · 플라잉 추가 컷 02',programFlying3:'PROGRAM · 플라잉 추가 컷 03',programFlying4:'PROGRAM · 플라잉 추가 컷 04',programFlying5:'PROGRAM · 플라잉 추가 컷 05',
          mediaPhoto2:'MEDIA · 포트폴리오 추가 컷 02',mediaPhoto3:'MEDIA · 포트폴리오 추가 컷 03',mediaPhoto4:'MEDIA · 포트폴리오 추가 컷 04',
          journalPhoto1:'JOURNAL · 01 썸네일',journalFull1:'JOURNAL · 01 확대 사진',
          journalPhoto2:'JOURNAL · 02 썸네일',journalFull2:'JOURNAL · 02 확대 사진',
          journalPhoto3:'JOURNAL · 03 썸네일',journalFull3:'JOURNAL · 03 확대 사진',
          journalPhoto4:'JOURNAL · 04 썸네일',journalFull4:'JOURNAL · 04 확대 사진',
          journalPhoto5:'JOURNAL · 05 썸네일',journalFull5:'JOURNAL · 05 확대 사진',
          journalPhoto6:'JOURNAL · 06 썸네일',journalFull6:'JOURNAL · 06 확대 사진',
          journalPhoto7:'JOURNAL · 07 썸네일',journalFull7:'JOURNAL · 07 확대 사진',
          journalPhoto8:'JOURNAL · 08 썸네일',journalFull8:'JOURNAL · 08 확대 사진',
          journalPhoto9:'JOURNAL · 09 썸네일',journalFull9:'JOURNAL · 09 확대 사진'
        };
        Object.entries(imageLabels).forEach(([key,label]) => {
          const field=document.createElement('div');field.className='field';
          const lab=document.createElement('label');lab.textContent=label;
          const input=document.createElement('input');input.type='text';
          input.value=(draft.imagePaths||{})[key]||IMAGE_PATH_DEFAULTS[key];
          input.placeholder=IMAGE_PATH_DEFAULTS[key];
          input.onchange=()=>{
            draft.imagePaths=draft.imagePaths||{};
            draft.imagePaths[key]=input.value.trim()||IMAGE_PATH_DEFAULTS[key];
            render(draft);
          };
          field.append(lab,input);pathFields.appendChild(field);
        });
        const hint=document.createElement('p');hint.style.cssText='font-size:12px;line-height:1.7;color:#726A64;';
        hint.textContent='V08: 플라잉요가 PROGRAM 5컷을 각각 편집할 수 있습니다. 나머지 인트로 및 MEDIA, JOURNAL 사진 편집도 유지합니다. 저장 후 새로고침해 확인하세요.';
        pathFields.appendChild(hint);
        pathBlock.appendChild(pathFields);root.appendChild(pathBlock);

        groupedTextSections.forEach(([label,items]) => {
            const d = document.createElement('details');
            d.innerHTML = `<summary>✎ ${label}</summary>`;
            const fields = document.createElement('div'); fields.className = 'fields';
            items.forEach(([key,name]) => {
                const f = document.createElement('div'); f.className = 'field';
                const isLong = name.includes('설명') || name.includes('특징') || name.includes('타이틀') || name.includes('제목');
                const inp = document.createElement(isLong ? 'textarea' : 'input');
                if(!isLong) inp.type = 'text';
                inp.value = draft.text[key] || '';
                inp.oninput = () => { draft.text[key] = inp.value; render(draft); };
                f.innerHTML = `<label>${name}</label>`; f.appendChild(inp);
                
                const cr = document.createElement('div'); cr.className = 'style-control-bar';
                cr.innerHTML = `<div class="style-item"><span>색상</span><input type="color" value="${draft.textColors[key]||'#000000'}"><button type="button" class="reset-btn">기본</button></div>
                                <div class="style-item"><span>크기</span><input type="number" placeholder="기본" value="${parseInt(draft.textSizes[key])||''}"><span>px</span></div>
                                <div class="style-item"><span>폰트</span><select class="font-sel"><option value="">기본 폰트</option></select></div>`;
                
                const cInp = cr.querySelector('input[type="color"]');
                cInp.oninput = () => { draft.textColors[key] = cInp.value; render(draft); };
                cr.querySelector('.reset-btn').onclick = () => { delete draft.textColors[key]; render(draft); build(); };
                
                const sInp = cr.querySelector('input[type="number"]');
                sInp.oninput = () => { if(sInp.value) draft.textSizes[key] = sInp.value+'px'; else delete draft.textSizes[key]; render(draft); };
                
                const fSel = cr.querySelector('.font-sel');
                Object.keys(FONT_MAP).forEach(fname => {
                    const opt = document.createElement('option'); opt.value = fname; opt.textContent = fname;
                    if((draft.textFonts||{})[key] === fname) opt.selected = true;
                    fSel.appendChild(opt);
                });
                fSel.onchange = () => {
                    draft.textFonts = draft.textFonts || {};
                    if(fSel.value) draft.textFonts[key] = fSel.value; else delete draft.textFonts[key];
                    render(draft);
                };
                
                f.appendChild(cr); fields.appendChild(f);
            });
            d.appendChild(fields); root.appendChild(d);
        });

        const links = document.createElement('details'); links.innerHTML = `<summary>🔗 예약 및 소셜 링크</summary>`;
        const lf = document.createElement('div'); lf.className = 'fields';
        [['booking','예약 URL (버튼 클릭시)'],['socialFb','페이스북'],['socialIg','인스타그램'],['socialBlog','블로그'],['socialYt','유튜브']].forEach(([key,label]) => {
            const f = document.createElement('div'); f.className = 'field';
            f.innerHTML = `<label>${label}</label>`;
            const inp = document.createElement('input'); inp.type = 'url'; inp.value = draft.link[key] || '';
            inp.oninput = () => { draft.link[key] = inp.value; render(draft); };
            f.appendChild(inp); lf.appendChild(f);
        });
        links.appendChild(lf); root.appendChild(links);
    }

    function toggleEditor(open) { $('#editor').classList.toggle('open', open); }
    $('#editToggle').onclick = () => toggleEditor(true);
    $('#closeEditor').onclick = () => toggleEditor(false);

    $('#saveBtn').onclick = () => {
        try { localStorage.setItem(STORE, JSON.stringify(draft)); saved = clone(draft); $('#saveStatus').textContent = '✓ 브라우저에 저장했습니다.'; } 
        catch(e) { $('#saveStatus').textContent = '⚠️ 저장 공간 부족 가능성: 이미지 용량을 줄인 뒤 다시 저장해 주세요.'; }
    };
    $('#cancelBtn').onclick = () => { draft = clone(saved && saved.text ? saved : defaults); draft.imagePaths={...IMAGE_PATH_DEFAULTS,...(draft.imagePaths||{})}; draft.images={...defaults.images,...(draft.images||{})}; render(draft); build(); $('#saveStatus').textContent = ''; };
    $('#resetBtn').onclick = () => { if(confirm("초기 상태로 되돌리시겠습니까?")) { draft = clone(defaults); draft.imagePaths={...IMAGE_PATH_DEFAULTS}; localStorage.removeItem(STORE); render(draft); build(); $('#saveStatus').textContent = '✓ 초기화 완료'; }};
    
    const exportBtn = document.getElementById('exportBtn');
    if(exportBtn) {
        exportBtn.onclick = () => {
            const exportData = JSON.stringify(draft, null, 4);
            const copyFallback=()=>{
              const node=document.createElement('textarea');
              node.value=exportData;node.style.cssText='position:fixed;left:-10000px;top:0';
              document.body.appendChild(node);node.select();
              let ok=false;try{ok=document.execCommand('copy');}catch(_){}
              node.remove();
              alert(ok?'세팅값을 복사했습니다.':'자동 복사가 제한되었습니다. 브라우저에서 HTTPS 환경으로 접속한 뒤 시도해 주세요.');
            };
            if(navigator.clipboard?.writeText) navigator.clipboard.writeText(exportData).then(()=>alert('세팅값을 복사했습니다.')).catch(copyFallback);
            else copyFallback();
        };
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

    render(draft); build();
    })();

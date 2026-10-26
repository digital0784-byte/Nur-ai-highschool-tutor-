export type SupportedLanguage = 'am' | 'om' | 'ti' | 'ar' | 'so' | 'en';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: Record<SupportedLanguage, LanguageInfo> = {
  am: { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', dir: 'ltr' },
  om: { code: 'om', name: 'Afaan Oromoo', nativeName: 'Afaan Oromoo', flag: '🌳', dir: 'ltr' },
  ti: { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', flag: '🇪🇹', dir: 'ltr' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  so: { code: 'so', name: 'Somali', nativeName: 'Af-Soomaali', flag: '🇸🇴', dir: 'ltr' },
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
};

export interface AppDictionary {
  appName: string;
  appSubtitle: string;
  moeTitle: string;
  newCurriculumTag: string;
  back: string;
  selectGrade: string;
  selectLanguage: string;
  gradeLockedMessage: string;
  superAdminMode: string;
  lifetimeSuperAdmin: string;
  switchGrade: string;
  searchModules: string;
  close: string;
  categories: {
    coreLearning: string;
    examsAssessment: string;
    aiSmartTools: string;
    growthPayment: string;
    adminSecurity: string;
  };
  modules: {
    lesson: { title: string; subtitle: string };
    curriculum_engine: { title: string; subtitle: string };
    textbook: { title: string; subtitle: string };
    supplementary: { title: string; subtitle: string };
    video_learning: { title: string; subtitle: string };
    assessment_engine: { title: string; subtitle: string };
    entrance_prep: { title: string; subtitle: string };
    objectives_exam: { title: string; subtitle: string };
    quiz: { title: string; subtitle: string };
    flashcards: { title: string; subtitle: string };
    academic_work_hub: { title: string; subtitle: string };
    ai_tutor: { title: string; subtitle: string };
    photo_voice_tutor: { title: string; subtitle: string };
    smart_search: { title: string; subtitle: string };
    student_review: { title: string; subtitle: string };
    student_app: { title: string; subtitle: string };
    gamification: { title: string; subtitle: string };
    career_pathways: { title: string; subtitle: string };
    premium_learning_center: { title: string; subtitle: string };
    subscription_payment: { title: string; subtitle: string };
    system_feedback: { title: string; subtitle: string };
    admin_dashboard: { title: string; subtitle: string };
    security_fortress: { title: string; subtitle: string };
    system_integration: { title: string; subtitle: string };
  };
  common: {
    startLearning: string;
    practiceNow: string;
    askAi: string;
    submit: string;
    cancel: string;
    save: string;
    viewDetails: string;
    grade: string;
    stream: string;
    naturalScience: string;
    socialScience: string;
    commonStream: string;
    telebirr: string;
    cbe: string;
    active: string;
    pending: string;
    locked: string;
    unlocked: string;
    xp: string;
    streak: string;
    accuracy: string;
    rank: string;
  };
}

export const TRANSLATIONS_ALL: Record<SupportedLanguage, AppDictionary> = {
  am: {
    appName: 'የክፍል 9-12 ቲቶሪያል',
    appSubtitle: 'የኢፌዴሪ ትምህርት ሚኒስቴር አዲሱ ስርአተ ትምህርት (2019 ዓ.ም / 2026)',
    moeTitle: 'የኢፌዴሪ ትምህርት ሚኒስቴር • አዲሱ የሁለተኛ ደረጃ ስርአተ ትምህርት',
    newCurriculumTag: 'አዲሱ ስርአተ ትምህርት 2019 ዓ.ም',
    back: 'ወደ ኋላ',
    selectGrade: 'እባክዎ ክፍልዎን ይምረጡ',
    selectLanguage: 'ቋንቋ ይምረጡ',
    gradeLockedMessage: 'ክፍልዎ የተቆለፈ ነው፤ መቀየር የሚችለው ሱፐር አድሚን ብቻ ነው።',
    superAdminMode: 'ሱፐር አድሚን ሙሉ ፈቃድ',
    lifetimeSuperAdmin: 'የህይወት ዘመን ሱፐር አድሚን (ኑርዬ አህመድ አደም)',
    switchGrade: 'ክፍል ይቀይሩ',
    searchModules: 'ሞጁሎችን ወይም ትምህርቶችን ይፈልጉ...',
    close: 'ዝጋ',
    categories: {
      coreLearning: '📚 ዋና መማሪያ እና መጽሐፍት',
      examsAssessment: '📝 ፈተና እና ምዘና',
      aiSmartTools: '🤖 AI እና ስማርት ረዳቶች',
      growthPayment: '🌟 እድገት፣ ማዕከልና ክፍያ',
      adminSecurity: '🛡️ አስተዳደርና ደህንነት (አድሚን ብቻ)',
    },
    modules: {
      lesson: { title: 'ትምህርት', subtitle: 'የክፍል ትምህርቶችና የብቃት መመሪያዎች' },
      curriculum_engine: { title: 'ስርአተ ትምህርት ኢንጅን', subtitle: 'የ 2019 ዓ.ም የስርአተ ትምህርት ዛፍ' },
      textbook: { title: 'የተማሪ መፅሀፍ', subtitle: 'ዲጂታል መጽሐፍ አንባቢ (DRM የተጠበቀ)' },
      supplementary: { title: 'አጋዥ መፅሀፍት', subtitle: 'ተጨማሪ የማጣቀሻ ቤተ-መጽሐፍት' },
      video_learning: { title: 'ምስላዊ ትምህርት', subtitle: 'ቪዲዮዎችና የ 2D/3D አኒሜሽን ማብራሪያዎች' },
      assessment_engine: { title: 'የፈተናና ምዘና ሞተር', subtitle: 'ስማርት የመመዘኛና የደረጃ መለያ' },
      entrance_prep: { title: 'የዩኒቨርስቲ መግቢያ ፈተና', subtitle: 'የ 12ኛ ክፍል ብሄራዊ ፈተና ዝግጅት' },
      objectives_exam: { title: 'የቻፕተር ፈተና objectives', subtitle: 'የምዕራፍ ማጠቃለያና የግብ ፈተናዎች' },
      quiz: { title: 'ፈተና እና ጥያቄዎች', subtitle: 'የጊዜ ገደብ ያላቸው በይነ-መረብ ጥያቄዎች' },
      flashcards: { title: 'ፍላሽ ካርድ', subtitle: 'የፈጣን ማስታወሻና ክለሳ ካርዶች' },
      academic_work_hub: { title: 'የቤት ስራ እና ፕሮጀክት', subtitle: 'አሳይመንት፣ የቤት ስራና የምርምር ማዕከል' },
      ai_tutor: { title: 'ኑር ኤአይ የግል አስተማሪ', subtitle: 'የሶክራቲክ ዘዴ አጋዥ ከአማርኛ ድጋፍ ጋር' },
      photo_voice_tutor: { title: 'ፎቶ ጥያቄ እና ድምፅ ፈቺ', subtitle: 'የካሜራ OCR እና የድምፅ ጥያቄ መፍቻ' },
      smart_search: { title: 'ስማርት ፍለጋ እና ጥቆማ', subtitle: 'ፈጣን የፅንሰ-ሀሳብና የርእስ ፈላጊ' },
      student_review: { title: 'የእኔ የመማሪያ ግምገማ', subtitle: 'የትምህርት ጥንካሬና ድክመት ትንታኔ' },
      student_app: { title: 'የተማሪ መተግበሪያ', subtitle: 'የተማሪ መነሻና የቀን ተግባራት' },
      gamification: { title: 'የተማሪ ማበረታቻ እና ባጆች', subtitle: 'የደረጃ ነጥቦች (XP)፣ ስትሪክና ዋንጫዎች' },
      career_pathways: { title: 'የወደፊት አላማ እና ሙያ', subtitle: 'የከፍተኛ ትምህርትና የ STEM ሙያ መመሪያ' },
      premium_learning_center: { title: 'ፕሪሚየም የትምህርት ማዕከል', subtitle: 'ልዩ የላብራቶሪና የሙከራ ክፍሎች' },
      subscription_payment: { title: 'ክፍያ እና ሰብስክሪብሽን', subtitle: 'ቴሌብርና የንግድ ባንክ ክፍያ ማረጋገጫ' },
      system_feedback: { title: 'የተጠቃሚ አስተያየቶች', subtitle: 'የአስተያየትና የጥቆማ ሳጥን' },
      admin_dashboard: { title: 'አስተዳደር ዳሽ ቦርድ', subtitle: 'የትምህርት ቤት ERP እና የተማሪዎች ቁጥጥር' },
      security_fortress: { title: 'ደህንነት እና ፍቃዶች', subtitle: 'የተጠቃሚ ሚናዎች፣ ኦዲትና የደህንነት ቅጥር' },
      system_integration: { title: 'የስርአት ውህደትና E2E ፈተና', subtitle: 'የስርአቱ ራስ-ሰር የጤና ምርመራ' },
    },
    common: {
      startLearning: 'መማር ጀምር',
      practiceNow: 'አሁን ተለማመድ',
      askAi: 'ኑር AI ጠይቅ',
      submit: 'አስገባ',
      cancel: 'ሰርዝ',
      save: 'አስቀምጥ',
      viewDetails: 'ዝርዝር እይ',
      grade: 'ክፍል',
      stream: 'ዘርፍ',
      naturalScience: 'የተፈጥሮ ሳይንስ',
      socialScience: 'የማህበራዊ ሳይንስ',
      commonStream: 'አጠቃላይ (የጋራ)',
      telebirr: 'ቴሌብር (Telebirr)',
      cbe: 'የኢትዮጵያ ንግድ ባንክ (CBE)',
      active: 'የነቃ',
      pending: 'በመጠባበቅ ላይ',
      locked: 'የተቆለፈ',
      unlocked: 'የተከፈተ',
      xp: 'ነጥብ',
      streak: 'ቀጣይነት (ቀናት)',
      accuracy: 'ትክክለኛነት',
      rank: 'ደረጃ',
    },
  },
  om: {
    appName: 'Barnoota Kutaa 9-12 (NUR AI)',
    appSubtitle: 'Sirna Barnootaa Haaraa Ministeera Barnootaa (B.A. 2019 / 2026)',
    moeTitle: 'Ministeera Barnootaa Itoophiyaa • Sirna Barnootaa Sadarkaa 2ffaa',
    newCurriculumTag: 'Sirna Barnootaa Haaraa 2019',
    back: 'Duubatti',
    selectGrade: 'Maaloo kutaa keessan filadhaa',
    selectLanguage: 'Afaan filadhaa',
    gradeLockedMessage: 'Kutaan kee cufameera; kan jijjiiruu danda’u Super Admin qofa.',
    superAdminMode: 'Heeyyama Guutuu Super Admin',
    lifetimeSuperAdmin: 'Super Admin Bara Jireenyaa (Nuriye Ahmed Adem)',
    switchGrade: 'Kutaa Jijjiiri',
    searchModules: 'Moojuloota ykn mata duree barbaadi...',
    close: 'Cufi',
    categories: {
      coreLearning: '📚 Barnoota Ijoo fi Kitaabolee',
      examsAssessment: '📝 Qorumsa fi Madaallii',
      aiSmartTools: '🤖 AI fi Meeshaalee Qaxalee',
      growthPayment: '🌟 Guddina, Giddugala fi Kaffaltii',
      adminSecurity: '🛡️ Bulchiinsa fi Nageenya',
    },
    modules: {
      lesson: { title: 'Barnoota', subtitle: 'Ibsa barnootaa fi dandeettii' },
      curriculum_engine: { title: 'Injiinii Sirna Barnootaa', subtitle: 'Muka Sirna Barnootaa 2019' },
      textbook: { title: 'Kitaaba Barataa', subtitle: 'Kitaaba Dijitaalaa (DRM)' },
      supplementary: { title: 'Kitaabolee Daballii', subtitle: 'Mana kitaabaa wabii dabalataa' },
      video_learning: { title: 'Barnoota Viidiyoo', subtitle: 'Viidiyoo fi fakkiiwwan 2D/3D' },
      assessment_engine: { title: 'Injiinii Madaallii', subtitle: 'Madaallii adda baasuu AI' },
      entrance_prep: { title: 'Qophii Qorumsa Seensaa', subtitle: 'Qophii bioolessaa kutaa 12' },
      objectives_exam: { title: 'Qorumsa Boqonnaa', subtitle: 'Qorumsa xumura boqonnaa' },
      quiz: { title: 'Gaaffiilee fi Qorumsa', subtitle: 'Qorumsa yeroo daangeffame' },
      flashcards: { title: 'Kaardii Yaadannoo', subtitle: 'Kaardii deebisanii yaaddachuu' },
      academic_work_hub: { title: 'Hojii Manaa fi Pirojektii', subtitle: 'Hojii mana fi qorannoo' },
      ai_tutor: { title: 'Barsiisaa Dhuunfaa NUR AI', subtitle: 'Barsiisaa AI Socratic' },
      photo_voice_tutor: { title: 'Furmaata Suuraa fi Sagalee', subtitle: 'OCR fi gaaffii sagalee' },
      smart_search: { title: 'Barbaacha Qaxalee', subtitle: 'Barbaacha yaadaa fi dhimmootaa' },
      student_review: { title: 'Madaallii Barataa', subtitle: 'Qaaccessa ciminaa fi laafinaa' },
      student_app: { title: 'Appilikeeshinii Barataa', subtitle: 'Fuula dura barataa fi hojiiwwan' },
      gamification: { title: 'Badhaasa fi Qabxii', subtitle: 'Qabxii XP, sadarkaa fi badhaasa' },
      career_pathways: { title: 'Gara Fuulduraa fi Ogummaa', subtitle: 'Qajeelfama barumsa olaanoo fi STEM' },
      premium_learning_center: { title: 'Giddugala Barnootaa Olaanaa', subtitle: 'Dareewwan yaalii fi laabiraatorii' },
      subscription_payment: { title: 'Kaffaltii fi Maamilummaa', subtitle: 'Telebirr fi Baankii Daldala Itoophiyaa' },
      system_feedback: { title: 'Yaada Fayyadamtootaa', subtitle: 'Saanduqa yaadaa fi gabaasa rakkoo' },
      admin_dashboard: { title: 'Daashboordii Bulchiinsaa', subtitle: 'ERP mana barumsaa fi to’annoo barattootaa' },
      security_fortress: { title: 'Nageenya fi Mirgoota', subtitle: 'Gahee fayyadamtootaa fi eegumsa' },
      system_integration: { title: 'Qorumsa Walitti Qindoominaa', subtitle: 'Qorumsa fayyummaa sirnichaa' },
    },
    common: {
      startLearning: 'Barachuu Jalqabi',
      practiceNow: 'Amma Shaakali',
      askAi: 'NUR AI Gaafadhu',
      submit: 'Galchi',
      cancel: 'Haqi',
      save: 'Olkaayi',
      viewDetails: 'Bal’inaan Ilaali',
      grade: 'Kutaa',
      stream: 'Damee',
      naturalScience: 'Saayinsii Uumamaa',
      socialScience: 'Saayinsii Hawaasaa',
      commonStream: 'Waliigalaa',
      telebirr: 'Telebirr',
      cbe: 'Baankii Daldala Itoophiyaa (CBE)',
      active: 'Hojii irra jira',
      pending: 'Eeggachaa jira',
      locked: 'Cufameera',
      unlocked: 'Banaadha',
      xp: 'XP',
      streak: 'Guyyoota itti fufaa',
      accuracy: 'Sirrii ta’uu',
      rank: 'Sadarkaa',
    },
  },
  ti: {
    appName: 'ናይ ክፍሊ 9-12 ቲቶሪያል',
    appSubtitle: 'ሓዱሽ ስርዓተ ትምህርቲ ሚኒስትሪ ትምህርቲ (2019 ዓ.ም / 2026)',
    moeTitle: 'ሚኒስትሪ ትምህርቲ ኢ.ፌ.ዲ.ሪ • ሓዱሽ ስርዓተ ትምህርቲ ካልኣይ ብርኪ',
    newCurriculumTag: 'ሓዱሽ ስርዓተ ትምህርቲ 2019',
    back: 'ንድሕሪት',
    selectGrade: 'በጃኹም ክፍሊኹም ምረፁ',
    selectLanguage: 'ቋንቋ ምረፁ',
    gradeLockedMessage: 'ክፍልኹም ተዓጽዩ እዩ፤ ክቕይር ዝኽእል ሱፐር ኣድሚን ጥራሕ እዩ።',
    superAdminMode: 'ሱፐር ኣድሚን ምሉእ ፍቓድ',
    lifetimeSuperAdmin: 'ናይ ህይወት ዘመን ሱፐር ኣድሚን (ኑርየ ኣሕመድ ኣደም)',
    switchGrade: 'ክፍሊ ቀይሩ',
    searchModules: 'ሞጁላት ወይ ትምህርትታት ድለዩ...',
    close: 'ዕጾ',
    categories: {
      coreLearning: '📚 ቀንዲ ትምህርትን መጻሕፍትን',
      examsAssessment: '📝 ፈተናን ምዘናን',
      aiSmartTools: '🤖 AIን ስማርት መሳርሕታትን',
      growthPayment: '🌟 ዕብየት፣ ማእከልን ክፍሊትን',
      adminSecurity: '🛡️ ምምሕዳርን ድሕንነትን',
    },
    modules: {
      lesson: { title: 'ትምህርቲ', subtitle: 'ትምህርትታትን መምርሒ ብቕዓትን' },
      curriculum_engine: { title: 'ስርዓተ ትምህርቲ ኢንጅን', subtitle: 'ናይ 2019 ዓ.ም ዛፍ ስርዓተ ትምህርቲ' },
      textbook: { title: 'ናይ ተምሃራይ መጽሓፍ', subtitle: 'ዲጂታል መጽሓፍ ኣንባቢ (DRM)' },
      supplementary: { title: 'ሓገዝቲ መጻሕፍቲ', subtitle: 'ተወሳኺ መወከሲ ቤተ-መጻሕፍቲ' },
      video_learning: { title: 'ቪድዮ ትምህርቲ', subtitle: 'ቪድዮታትን ናይ 2D/3D ኣኒሜሽን መብርሂታትን' },
      assessment_engine: { title: 'ናይ ፈተናን ምዘናን ሞተር', subtitle: 'ስማርት መመርመሪ ብቕዓት' },
      entrance_prep: { title: 'ናይ ዩኒቨርስቲ መእተዊ ፈተና', subtitle: 'ናይ 12 ክፍሊ ሃገራዊ ፈተና ምድላው' },
      objectives_exam: { title: 'ናይ ምዕራፍ ፈተና', subtitle: 'ናይ ምዕራፍ ዕላማታት መፈተኒ' },
      quiz: { title: 'ፈተናታትን ሕቶታትን', subtitle: 'ናይ ግዜ ደረት ዘለዎም ፈተናታት' },
      flashcards: { title: 'ፍላሽ ካርድ', subtitle: 'ናይ ቅልጡፍ መዘኻኸሪ ካርዶች' },
      academic_work_hub: { title: 'ናይ ገዛ ስራሕን ፕሮጀክትን', subtitle: 'ኣሳይመንትን ናይ ምርምር ማእከልን' },
      ai_tutor: { title: 'ኑር ኤኣይ ብሕታዊ መምህር', subtitle: 'ብሶክራቲክ ሜላ ዝሕግዝ AI' },
      photo_voice_tutor: { title: 'ፎቶ ሕቶን ድምጽን ፈታሒ', subtitle: 'ብካሜራ OCRን ብድምጽን ፈታሒ' },
      smart_search: { title: 'ስማርት ምድላይ', subtitle: 'ቅልጡፍ ናይ ሓሳባትን ኣርእስታትን መእለዪ' },
      student_review: { title: 'ናይ ተምሃራይ ገምጋም', subtitle: 'ናይ ብቕዓት ትንታነ' },
      student_app: { title: 'መተግበሪ ተምሃራይ', subtitle: 'ናይ ተምሃራይ መበገስን መዓልታዊ ተግባራትን' },
      gamification: { title: 'ናይ ተምሃራይ መተባብዒ', subtitle: 'ነጥብታት XP፣ ስትሪክን ዋንጫታትን' },
      career_pathways: { title: 'ናይ መጻኢ ዕላማን ሞያን', subtitle: 'ናይ ላዕለዋይ ትምህርትን STEMን መምርሒ' },
      premium_learning_center: { title: 'ፕሪሚየም ማእከል ትምህርቲ', subtitle: 'ፍሉይ ናይ ላቦራቶሪ ትምህርትታት' },
      subscription_payment: { title: 'ክፍሊትን ሰብስክሪፕሽንን', subtitle: 'ቴሌብርን ንግዲ ባንክን ክፍሊት' },
      system_feedback: { title: 'ናይ ተጠቀምቲ ርእይቶ', subtitle: 'ናይ ርእይቶን ጥቆማን ሳንዱቕ' },
      admin_dashboard: { title: 'ናይ ምምሕዳር ዳሽቦርድ', subtitle: 'ናይ ትምህርቲ ቤት ERP' },
      security_fortress: { title: 'ድሕንነትን ፍቓዳትን', subtitle: 'ተራ ተጠቀምትን ሓለዋን' },
      system_integration: { title: 'ናይ ስርዓት ምውህሃድ ፈተና', subtitle: 'ናይ ስርዓቱ ናይ ጥዕና መርመራ' },
    },
    common: {
      startLearning: 'ምምሃር ጀምር',
      practiceNow: 'ሕጂ ተላመድ',
      askAi: 'ንኑር AI ሕተት',
      submit: 'ኣእቱ',
      cancel: 'ሰርዝ',
      save: 'ኣቐምጥ',
      viewDetails: 'ዝርዝር ርአ',
      grade: 'ክፍሊ',
      stream: 'ዓይነት',
      naturalScience: 'ተፈጥሮ ሳይንስ',
      socialScience: 'ማሕበራዊ ሳይንስ',
      commonStream: 'ሓባራዊ',
      telebirr: 'ቴሌብር (Telebirr)',
      cbe: 'ንግዲ ባንኪ ኢትዮጵያ (CBE)',
      active: 'ንጡፍ',
      pending: 'ይጽበ ኣሎ',
      locked: 'ተዓጽዩ',
      unlocked: 'ተኸፊቱ',
      xp: 'XP',
      streak: 'ተኸታታሊ መዓልታት',
      accuracy: 'ትክክለኛነት',
      rank: 'ደረጃ',
    },
  },
  ar: {
    appName: 'دروس الصفوف 9-12 (NUR AI)',
    appSubtitle: 'المنهج الدراسي الجديد لوزارة التعليم الإثيوبية (2019 ت.إ / 2026)',
    moeTitle: 'وزارة التعليم الإثيوبية • المنهج الثانوي الجديد',
    newCurriculumTag: 'المنهج الجديد 2019 ت.إ',
    back: 'رجوع',
    selectGrade: 'يرجى اختيار صفك الدراسي',
    selectLanguage: 'اختر اللغة',
    gradeLockedMessage: 'الصف مقفل؛ لا يمكن تغييره إلا بواسطة المشرف المتميز (Super Admin).',
    superAdminMode: 'وضع المشرف المتميز (كامل الصلاحيات)',
    lifetimeSuperAdmin: 'المشرف المتميز الدائم (نوريه أحمد آدم)',
    switchGrade: 'تغيير الصف',
    searchModules: 'ابحث في الوحدات والدروس...',
    close: 'إغلاق',
    categories: {
      coreLearning: '📚 التعلم الأساسي والكتب',
      examsAssessment: '📝 الامتحانات والتقييم',
      aiSmartTools: '🤖 الذكاء الاصطناعي والأدوات الذكية',
      growthPayment: '🌟 التقدم، المركز والاشتراكات',
      adminSecurity: '🛡️ الإدارة والأمان (للمشرفين فقط)',
    },
    modules: {
      lesson: { title: 'الدروس', subtitle: 'شروحات الدروس وأدلة الكفاءات' },
      curriculum_engine: { title: 'محرك المناهج', subtitle: 'شجرة المنهج الدراسي الجديد' },
      textbook: { title: 'الكتاب المدرسي', subtitle: 'قارئ الكتب الرقمي المحمي (DRM)' },
      supplementary: { title: 'الكتب المساعدة', subtitle: 'مكتبة المراجع الإضافية' },
      video_learning: { title: 'التعلم المرئي', subtitle: 'شروحات الفيديو ورسوم متحركة 2D/3D' },
      assessment_engine: { title: 'محرك التقييم', subtitle: 'تقييم تشخيصي بالذكاء الاصطناعي' },
      entrance_prep: { title: 'التحضير للجامعة', subtitle: 'الامتحانات الوطنية للصف 12' },
      objectives_exam: { title: 'امتحانات الفصول', subtitle: 'امتحانات الأهداف وإتقان الفصول' },
      quiz: { title: 'الاختبارات والأسئلة', subtitle: 'اختبارات تفاعلية محددة بالوقت' },
      flashcards: { title: 'البطاقات التعليمية', subtitle: 'بطاقات التكرار المتباعد والحفظ' },
      academic_work_hub: { title: 'الواجبات والمشاريع', subtitle: 'مركز الواجبات والبحوث والمشاريع' },
      ai_tutor: { title: 'معلم NUR الذكي', subtitle: 'معلم شخصي بالأسلوب السقراطي' },
      photo_voice_tutor: { title: 'حل بالصورة والصوت', subtitle: 'حل المسائل بالتعرف الضوئي والصوت' },
      smart_search: { title: 'البحث الذكي', subtitle: 'بحث المفاهيم والموضوعات الفورية' },
      student_review: { title: 'تقييم أدائي', subtitle: 'تحليلات نقاط القوة والضعف' },
      student_app: { title: 'بوابة الطالب', subtitle: 'الصفحة الرئيسية والأنشطة اليومية' },
      gamification: { title: 'التحفيز والأوسمة', subtitle: 'نقاط XP والشارات والجوائز' },
      career_pathways: { title: 'المسار المهني والمستقبل', subtitle: 'إرشاد التخصصات والعلوم والتقنية' },
      premium_learning_center: { title: 'المركز التعليمي المتميز', subtitle: 'دروس المختبرات المتقدمة' },
      subscription_payment: { title: 'الاشتراكات والمدفوعات', subtitle: 'بوابات Telebirr والبنك التجاري' },
      system_feedback: { title: 'آراء المستخدمين', subtitle: 'صندوق الاقتراحات والإبلاغ' },
      admin_dashboard: { title: 'لوحة تحكم الإدارة', subtitle: 'نظام ERP المدرسي وإدارة الطلاب' },
      security_fortress: { title: 'الأمان والصلاحيات', subtitle: 'إدارة الأدوار وسجلات التدقيق' },
      system_integration: { title: 'التكامل وفحص النظام', subtitle: 'فحوصات السلامة الشاملة E2E' },
    },
    common: {
      startLearning: 'ابدأ التعلم',
      practiceNow: 'تدرب الآن',
      askAi: 'اسأل المعلم الذكي',
      submit: 'إرسال',
      cancel: 'إلغاء',
      save: 'حفظ',
      viewDetails: 'عرض التفاصيل',
      grade: 'الصف',
      stream: 'الفرع',
      naturalScience: 'العلوم الطبيعية',
      socialScience: 'العلوم الاجتماعية',
      commonStream: 'العام المشترك',
      telebirr: 'تيليبير (Telebirr)',
      cbe: 'البنك التجاري الإثيوبي (CBE)',
      active: 'نشط',
      pending: 'قيد الانتظار',
      locked: 'مقفل',
      unlocked: 'مفتوح',
      xp: 'نقطة XP',
      streak: 'أيام متتالية',
      accuracy: 'الدقة',
      rank: 'الترتيب',
    },
  },
  so: {
    appName: 'Casharrada Fasalka 9-12 (NUR AI)',
    appSubtitle: 'Manaahijta Cusub ee Wasaaradda Waxbarashada (2019 T.I / 2026)',
    moeTitle: 'Wasaaradda Waxbarashada Itoobiya • Manhajka Sare ee Cusub',
    newCurriculumTag: 'Manhajka Cusub 2019',
    back: 'Dib u noqo',
    selectGrade: 'Fadlan dooro fasalkaaga',
    selectLanguage: 'Dooro Luuqadda',
    gradeLockedMessage: 'Fasalkaagu waa xidhan yahay; waxa beddeli kara oo kaliya Super Admin.',
    superAdminMode: 'Awoodda Buuxda ee Super Admin',
    lifetimeSuperAdmin: 'Super Admin Joogto ah (Nuriye Ahmed Adem)',
    switchGrade: 'Beddel Fasalka',
    searchModules: 'Raadi casharrada ama qaybaha...',
    close: 'Xidh',
    categories: {
      coreLearning: '📚 Waxbarashada Muhiimka ah & Buugaagta',
      examsAssessment: '📝 Imtixaannada & Qiimeynta',
      aiSmartTools: '🤖 AI & Qalabka Caqliga leh',
      growthPayment: '🌟 Horumarka, Xarunta & Lacag-bixinta',
      adminSecurity: '🛡️ Maamulka & Amniga (Maamulaha Keliya)',
    },
    modules: {
      lesson: { title: 'Casharro', subtitle: 'Sharaxaadda casharrada iyo tilmaamaha' },
      curriculum_engine: { title: 'Matoorka Manhajka', subtitle: 'Geedka Manhajka 2019' },
      textbook: { title: 'Buugga Ardayga', subtitle: 'Akhriska buugaagta dijitaalka ah (DRM)' },
      supplementary: { title: 'Buugaagta Kaalmada', subtitle: 'Maktabadda tixraaca dheeraadka ah' },
      video_learning: { title: 'Casharrada Muuqaalka', subtitle: 'Fiidiyowyo iyo sharaxaad 2D/3D ah' },
      assessment_engine: { title: 'Matoorka Qiimeynta', subtitle: 'Qiimeynta caqliga leh ee AI' },
      entrance_prep: { title: 'U Diyaargarowga Jaamacadda', subtitle: 'Imtixaanka qaranka ee fasalka 12aad' },
      objectives_exam: { title: 'Imtixaanka Cutubka', subtitle: 'Imtixaannada ujeedooyinka cutubyada' },
      quiz: { title: 'Kedisyada & Su’aalaha', subtitle: 'Imtixaanno xaddidan waqtiga' },
      flashcards: { title: 'Kaararka Xusuusta', subtitle: 'Kaararka xusuusashada degdegga ah' },
      academic_work_hub: { title: 'Shaqada Guriga & Mashruuca', subtitle: 'Shaqooyinka guriga iyo cilmi-baarista' },
      ai_tutor: { title: 'Macallinka Gaarka ah ee NUR AI', subtitle: 'Macallin AI ah oo habka Soqraadiga ah' },
      photo_voice_tutor: { title: 'Furaha Sawirka & Codka', subtitle: 'OCR sawirrada iyo su’aalaha codka' },
      smart_search: { title: 'Raadinta Caqliga leh', subtitle: 'Raadinta degdegga ah ee fikradaha' },
      student_review: { title: 'Dib-u-eegista Ardayga', subtitle: 'Falanqaynta awoodda iyo daciifnimada' },
      student_app: { title: 'App-ka Ardayga', subtitle: 'Bogga hore iyo hawlaha maalinlaha ah' },
      gamification: { title: 'Dhiirrigelinta & Billadaha', subtitle: 'Dhibcaha XP, heerar iyo abaalmarino' },
      career_pathways: { title: 'Hadafyada & Shaqooyinka', subtitle: 'Hagaha tacliinta sare iyo STEM' },
      premium_learning_center: { title: 'Xarunta Waxbarashada Sare', subtitle: 'Qaybaha tijaabada ee horumarsan' },
      subscription_payment: { title: 'Bixinta & Diiwaangelinta', subtitle: 'Telebirr iyo Baanka Ganacsiga Itoobiya' },
      system_feedback: { title: 'Fikradaha Isticmaalayaasha', subtitle: 'Sanduuqa talooyinka iyo cabashooyinka' },
      admin_dashboard: { title: 'Bogga Maamulka', subtitle: 'ERP-ga dugsiga iyo maaraynta ardayda' },
      security_fortress: { title: 'Amniga & Ogolaanshaha', subtitle: 'Xeerarka isticmaalayaasha iyo xogta' },
      system_integration: { title: 'Tijaabada Isku-xirka Nidaamka', subtitle: 'Baaritaanka caafimaadka nidaamka' },
    },
    common: {
      startLearning: 'Bilow Barashada',
      practiceNow: 'Tababar Hadda',
      askAi: 'Weydii NUR AI',
      submit: 'Gali',
      cancel: 'Jooji',
      save: 'Keydi',
      viewDetails: 'Eeg Faahfaahinta',
      grade: 'Fasalka',
      stream: 'Laanta',
      naturalScience: 'Sayniska Dabiiciga ah',
      socialScience: 'Sayniska Bulshada',
      commonStream: 'Wadaag',
      telebirr: 'Telebirr',
      cbe: 'Baanka Ganacsiga Itoobiya (CBE)',
      active: 'Firfircoon',
      pending: 'Sugaya',
      locked: 'Xidhan',
      unlocked: 'Furan',
      xp: 'XP',
      streak: 'Maalmo isku xiga',
      accuracy: 'Saxnaanta',
      rank: 'Darajada',
    },
  },
  en: {
    appName: 'Grade 9-12 Tutorial (NUR AI)',
    appSubtitle: 'FDRE Ministry of Education New Curriculum (2019 E.C. / 2026)',
    moeTitle: 'FDRE Ministry of Education • New Secondary Curriculum',
    newCurriculumTag: 'New Curriculum 2019 E.C.',
    back: 'Back',
    selectGrade: 'Please select your Grade',
    selectLanguage: 'Select Language',
    gradeLockedMessage: 'Your grade is locked; only the Super Admin can switch grade levels.',
    superAdminMode: 'Super Admin Master Access',
    lifetimeSuperAdmin: 'Lifetime Super Admin (Nuriye Ahmed Adem)',
    switchGrade: 'Switch Grade',
    searchModules: 'Search modules or topics...',
    close: 'Close',
    categories: {
      coreLearning: '📚 Core Learning & Books',
      examsAssessment: '📝 Exams & Assessment',
      aiSmartTools: '🤖 AI & Smart Tools',
      growthPayment: '🌟 Growth, Premium & Payment',
      adminSecurity: '🛡️ Administration & Security (Admin Only)',
    },
    modules: {
      lesson: { title: 'Lesson Explanations', subtitle: 'Curriculum Competencies & Step-by-Step Guides' },
      curriculum_engine: { title: 'Curriculum Engine', subtitle: '2019 E.C. MoE Curriculum Tree' },
      textbook: { title: 'Student Textbook', subtitle: 'Official PDF Reader (DRM Protected)' },
      supplementary: { title: 'Supplementary Books', subtitle: 'Reference Library & Enrichment Material' },
      video_learning: { title: 'Visual Learning', subtitle: 'HD Videos & 2D/3D Animation Walkthroughs' },
      assessment_engine: { title: 'Assessment Engine', subtitle: 'AI-Powered Diagnostic Skill Evaluator' },
      entrance_prep: { title: 'University Entrance Prep', subtitle: 'Grade 12 National ESSLCE / EAES Prep' },
      objectives_exam: { title: 'Chapter Objectives Exam', subtitle: 'Unit Mastery & Learning Objectives Check' },
      quiz: { title: 'Interactive Quizzes', subtitle: 'Timed Practice Sets with Instant Explanations' },
      flashcards: { title: 'Active Recall Flashcards', subtitle: 'Spaced Repetition High-Yield Fact Cards' },
      academic_work_hub: { title: 'Academic Work Hub', subtitle: 'Homework, Assignments & Research Projects' },
      ai_tutor: { title: 'NUR AI Private Tutor', subtitle: 'Socratic Dialogue Grounded in MoE Textbooks' },
      photo_voice_tutor: { title: 'Photo & Voice Solver', subtitle: 'Multimodal OCR Camera & Speech Question Solver' },
      smart_search: { title: 'Smart Semantic Search', subtitle: 'Instant Concept Finder Across All Units' },
      student_review: { title: 'Learning Review', subtitle: 'Strength, Weakness & Topic Analytics' },
      student_app: { title: 'Student Portal', subtitle: 'Student Home, Daily Tasks & Streaks' },
      gamification: { title: 'Gamification & Badges', subtitle: 'XP Points, Streaks, Leaderboard & Medals' },
      career_pathways: { title: 'Future Career Pathways', subtitle: 'Higher Education & STEM Career Guidance' },
      premium_learning_center: { title: 'Premium Learning Center', subtitle: 'Virtual Labs & Masterclass Bundles' },
      subscription_payment: { title: 'Subscription & Payment', subtitle: 'Telebirr & CBE Payment Verification' },
      system_feedback: { title: 'User Feedback', subtitle: 'Bug Reporting & Suggestions Box' },
      admin_dashboard: { title: 'Admin ERP Dashboard', subtitle: 'School ERP, Financials & Student Records' },
      security_fortress: { title: 'Security Fortress', subtitle: 'RBAC Roles, Audit Logs & DRM Encryption' },
      system_integration: { title: 'System Diagnostics & E2E', subtitle: 'Automated Platform Self-Test Suite' },
    },
    common: {
      startLearning: 'Start Learning',
      practiceNow: 'Practice Now',
      askAi: 'Ask NUR AI',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      viewDetails: 'View Details',
      grade: 'Grade',
      stream: 'Stream',
      naturalScience: 'Natural Science',
      socialScience: 'Social Science',
      commonStream: 'General Secondary (Common)',
      telebirr: 'Telebirr (ቴሌብር)',
      cbe: 'Commercial Bank of Ethiopia (CBE)',
      active: 'Active',
      pending: 'Pending Verification',
      locked: 'Locked',
      unlocked: 'Unlocked',
      xp: 'XP',
      streak: 'Day Streak',
      accuracy: 'Accuracy',
      rank: 'Rank',
    },
  },
};

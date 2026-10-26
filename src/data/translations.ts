export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  moeTitle: string;
  tagline: string;
  aiTutor: string;
  moeTextbooks: string;
  esslceArena: string;
  problemSolver: string;
  imageSolver: string;
  pdfAssistant: string;
  researchEngine: string;
  myProgress: string;
  subscriptions: string;
  adminPanel: string;
  mode: string;
  subject: string;
  grade: string;
  stream: string;
  login: string;
  register: string;
  logout: string;
  guestUser: string;
  activeStatus: string;
  pendingPayment: string;
  subscribeNow: string;
}

export const TRANSLATIONS: Record<'English' | 'Amharic', TranslationDictionary> = {
  English: {
    appName: 'NUR AI High School Tutor',
    appSubtitle: 'Official Ethiopian High School Personal AI Tutor & Curriculum Guide',
    moeTitle: 'FDRE Ministry of Education • New Secondary Curriculum (Grades 9–12)',
    tagline: 'Empowering Ethiopian students with verified MoE textbook solutions, ESSLCE exam preparation, and bilingual AI guidance.',
    aiTutor: 'AI Tutor Chat',
    moeTextbooks: 'MoE Textbooks',
    esslceArena: 'ESSLCE Exam Arena',
    problemSolver: 'Problem Solver',
    imageSolver: 'Image Solver',
    pdfAssistant: 'PDF Assistant',
    researchEngine: 'Two-Layer Research (Part 20)',
    myProgress: 'My Progress',
    subscriptions: 'Subscriptions',
    adminPanel: 'Admin Dashboard',
    mode: 'Learning Mode',
    subject: 'Subject',
    grade: 'Grade',
    stream: 'Stream',
    login: 'Log In',
    register: 'Sign Up',
    logout: 'Log Out',
    guestUser: 'Student (Guest)',
    activeStatus: 'Active Plan',
    pendingPayment: 'Payment Pending',
    subscribeNow: 'Upgrade Subscription',
  },
  Amharic: {
    appName: 'ኑር AI የሁለተኛ ደረጃ አጋዥ',
    appSubtitle: 'የኢፌዴሪ ትምህርት ሚኒስቴር አዲሱ የሁለተኛ ደረጃ ሥርዓተ-ትምህርት አጋዥ (9–12ኛ ክፍል)',
    moeTitle: 'የኢፌዴሪ ትምህርት ሚኒስቴር • አዲሱ ሥርዓተ-ትምህርት',
    tagline: 'ለትምህርት ሚኒስቴር መጽሐፍት ማብራሪያ፣ ለብሔራዊ ፈተና ዝግጅት እና ለሳይንስና ሂሳብ ጥያቄዎች መፍትሔ የሚሰጥ ብልህ አጋዥ።',
    aiTutor: 'ውይይትና ማብራሪያ',
    moeTextbooks: 'የመማሪያ መጽሐፍት',
    esslceArena: 'ብሔራዊ ፈተና ዝግጅት',
    problemSolver: 'የሂሳብና ሳይንስ መፍቻ',
    imageSolver: 'የፎቶ ጥያቄ መፍቻ',
    pdfAssistant: 'የፒዲኤፍ አጋዥ',
    researchEngine: 'ጥናትና ምርምር (Part 20)',
    myProgress: 'የትምህርት ውጤቴ',
    subscriptions: 'የአባልነት ክፍያ',
    adminPanel: 'የአስተዳዳሪ ክፍል',
    mode: 'የመማሪያ ሁኔታ',
    subject: 'የትምህርት ዓይነት',
    grade: 'ክፍል',
    stream: 'ዘርፍ',
    login: 'ግባ',
    register: 'ተመዝገብ',
    logout: 'ውጣ',
    guestUser: 'ተማሪ (እንግዳ)',
    activeStatus: 'የነቃ አባልነት',
    pendingPayment: 'ክፍያ በመጠባበቅ ላይ',
    subscribeNow: 'አባልነትን አድስ',
  },
};

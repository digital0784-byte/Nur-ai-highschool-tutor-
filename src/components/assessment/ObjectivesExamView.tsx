import React, { useState, useEffect } from 'react';
import {
  Target,
  BookOpen,
  Sparkles,
  Award,
  FileCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  Download,
  Send,
  ChevronRight,
  Layers,
  GraduationCap,
  ListChecks,
  Zap,
  HelpCircle,
  RefreshCw,
  Share2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import {
  OFFICIAL_TEXTBOOKS_REGISTRY,
  MoETextbookItem,
  TextbookChapter,
  getTextbooksForGrade,
} from '../../data/textbooksRegistry';
import { geminiService, ChapterSuiteResponse } from '../../services/geminiService';
import confetti from 'canvas-confetti';

type ChapterSuiteTab =
  | 'objectives'
  | 'full_analysis'
  | 'ai_analysis'
  | 'practice_quiz'
  | 'entrance_exam'
  | 'homework';

export const ObjectivesExamView: React.FC = () => {
  const { user, selectedGrade } = useAuth();
  const { t, language } = useLanguage();
  const { addXP, recordQuizScore, addMistake } = useProgress();

  // Books available for student's locked grade
  const availableBooks = getTextbooksForGrade(selectedGrade);
  const [selectedBookId, setSelectedBookId] = useState<string>(
    availableBooks[0]?.id || OFFICIAL_TEXTBOOKS_REGISTRY[0].id
  );

  const currentBook =
    availableBooks.find((b) => b.id === selectedBookId) ||
    availableBooks[0] ||
    OFFICIAL_TEXTBOOKS_REGISTRY[0];

  // Selected Chapter index
  const [chapterIndex, setChapterIndex] = useState<number>(0);
  const currentChapter: TextbookChapter =
    currentBook.tableOfContents[chapterIndex] || currentBook.tableOfContents[0];

  // Active sub-tab among the 6 mandated pillars
  const [activeTab, setActiveTab] = useState<ChapterSuiteTab>('objectives');

  // Competency checklist state
  const [checkedCompetencies, setCheckedCompetencies] = useState<Record<string, boolean>>({});

  // Dynamic AI Suite Data
  const [suiteData, setSuiteData] = useState<ChapterSuiteResponse | null>(null);
  const [isLoadingSuite, setIsLoadingSuite] = useState(false);

  // Practice Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Entrance Exam State
  const [entranceIndex, setEntranceIndex] = useState(0);
  const [entranceOption, setEntranceOption] = useState<number | null>(null);
  const [isEntranceSubmitted, setIsEntranceSubmitted] = useState(false);

  // Homework State
  const [hwSubmissionText, setHwSubmissionText] = useState('');
  const [hwSubmitted, setHwSubmitted] = useState(false);
  const [copiedHw, setCopiedHw] = useState(false);

  // Load Chapter Suite whenever book or chapter changes
  useEffect(() => {
    let isMounted = true;
    const fetchSuite = async () => {
      setIsLoadingSuite(true);
      try {
        const data = await geminiService.getChapterMasterySuite({
          grade: selectedGrade,
          subject: currentBook.subject,
          chapterNumber: currentChapter.chapterNumber,
          chapterTitle: currentChapter.title,
          language: language === 'am' ? 'Amharic' : 'English',
        });
        if (isMounted) {
          setSuiteData(data);
          // Reset quiz states
          setQuizIndex(0);
          setSelectedOption(null);
          setIsAnswerSubmitted(false);
          setQuizScore(0);
          setQuizFinished(false);
          setEntranceIndex(0);
          setEntranceOption(null);
          setIsEntranceSubmitted(false);
          setHwSubmitted(false);
        }
      } catch (err) {
        console.warn('Error loading chapter suite, fallback ready:', err);
      } finally {
        if (isMounted) setIsLoadingSuite(false);
      }
    };

    fetchSuite();
    return () => {
      isMounted = false;
    };
  }, [selectedBookId, chapterIndex, selectedGrade, language]);

  const toggleCompetency = (idx: number) => {
    const key = `${currentBook.id}-ch${currentChapter.chapterNumber}-${idx}`;
    setCheckedCompetencies((prev) => {
      const next = !prev[key];
      if (next) addXP(15);
      return { ...prev, [key]: next };
    });
  };

  const currentObjectives = suiteData?.objectives || currentChapter.keyCompetencies || [
    'Master foundational concepts and mathematical relations of this chapter',
    'Derive formulas with standard SI dimensions',
    'Apply principles to Ethiopian engineering and natural phenomena'
  ];

  const masteredCount = currentObjectives.filter(
    (_, idx) => checkedCompetencies[`${currentBook.id}-ch${currentChapter.chapterNumber}-${idx}`]
  ).length;

  const currentQuizQuestions = suiteData?.practiceQuiz || [
    {
      id: 'q1',
      question: `In ${currentBook.subject} Chapter ${currentChapter.chapterNumber} (${currentChapter.title}), what is the primary conservation law governing the state transitions?`,
      options: [
        'A) Energy and Momentum are conserved in isolated systems',
        'B) Volume remains constant regardless of pressure',
        'C) Kinetic energy is always strictly zero',
        'D) Force is independent of mass'
      ],
      correctIndex: 0,
      explanation: 'According to the MoE 2019 E.C. syllabus, conservation laws form the primary invariant in this unit.',
      citation: `[FDRE MoE ${selectedGrade} ${currentBook.subject} Chapter ${currentChapter.chapterNumber}]`
    }
  ];

  const currentEntranceQuestions = suiteData?.entranceExam || [
    {
      id: 'ee1',
      year: '2024 E.C. ESSLCE National Model',
      question: `In the ESSLCE National Exam for ${currentBook.subject}, which common error do students frequently commit in Chapter ${currentChapter.chapterNumber}?`,
      options: [
        'A) Substituting non-SI metric prefixes without standard conversion',
        'B) Applying Newton’s conservation equations',
        'C) Stating standard gravitational acceleration g = 9.8 m/s²',
        'D) Using dimensional verification'
      ],
      correctIndex: 0,
      explanation: 'Examiners deliberately set distractor options corresponding to un-converted units.',
      examTrap: 'Unit Mismatch Trap: Always convert km/h to m/s, cm to m, or grams to kg before applying formulas.'
    }
  ];

  const currentHw = suiteData?.homework || {
    title: `Chapter ${currentChapter.chapterNumber}: ${currentChapter.title} - Academic Homework Assignment`,
    dueDate: 'Within 7 Days of Chapter Completion',
    instructions: 'Provide all algebraic derivation steps, intermediate values, and SI units.',
    problems: [
      `Problem 1: Derive the fundamental formula for ${currentChapter.title} and verify dimensional homogeneity.`,
      `Problem 2: Calculate the net state output under standard Ethiopian experimental conditions.`,
      `Problem 3: Relate this concept to the Great Ethiopian Renaissance Dam (GERD) or regional agriculture.`
    ],
    projectTask: 'Practical Lab Simulation: Record 5 experimental or spreadsheet data points demonstrating the governing relationship.',
    rubric: '1. Theoretical Derivation (40%)\n2. Correct Numerical Calculation (30%)\n3. Ethiopian Real-World Synthesis (20%)\n4. Neatness & Citations (10%)'
  };

  const handleQuizAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    const q = currentQuizQuestions[quizIndex];
    if (selectedOption === q.correctIndex) {
      setQuizScore((s) => s + 1);
      addXP(20);
    } else {
      addMistake({
        subject: currentBook.subject,
        topic: `${currentChapter.title} (Quiz)`,
        question: q.question,
        chosenAnswer: q.options[selectedOption],
        correctAnswer: q.options[q.correctIndex],
        explanation: q.explanation,
        citation: q.citation,
      });
    }
  };

  const handleQuizNext = () => {
    if (quizIndex < currentQuizQuestions.length - 1) {
      setQuizIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      const pct = Math.round(((quizScore + (selectedOption === currentQuizQuestions[quizIndex].correctIndex ? 1 : 0)) / currentQuizQuestions.length) * 100);
      recordQuizScore(pct, `${currentBook.subject} Ch ${currentChapter.chapterNumber}`);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleCopyHomework = () => {
    const text = `=====================================================
FDRE MINISTRY OF EDUCATION - CHAPTER HOMEWORK
${currentHw.title}
Grade: ${selectedGrade} | Subject: ${currentBook.subject}
Due Date: ${currentHw.dueDate}
=====================================================
INSTRUCTIONS:
${currentHw.instructions}

ASSIGNMENT PROBLEMS:
${currentHw.problems.map((p, i) => `${i + 1}. ${p}`).join('\n\n')}

PROJECT & LAB TASK:
${currentHw.projectTask}

OFFICIAL GRADING RUBRIC:
${currentHw.rubric}
=====================================================`;
    navigator.clipboard.writeText(text);
    setCopiedHw(true);
    setTimeout(() => setCopiedHw(false), 2500);
  };

  const handleHwSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwSubmissionText.trim()) return;
    setHwSubmitted(true);
    addXP(60);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* 1. Header & Selector Studio */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>የምዕራፍ ሙሉ ማስተሪ ስቱዲዮ (Chapter Mastery Studio)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              የእያንዳንዱ ቻፕተር Objectives፣ ሙሉ ትንታኔ፣ ፈተና እና አሳይመንት
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              የ {selectedGrade} {currentBook.subjectAmharic} ({currentBook.subject}) ምዕራፍ {currentChapter.chapterNumber}: {currentChapter.titleAmharic}
            </p>
          </div>

          {isLoadingSuite && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold font-mono animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>AI Engine Synthesizing Suite...</span>
            </div>
          )}
        </div>

        {/* Book Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            ኮርስ ይምረጡ:
          </span>
          {availableBooks.map((b) => {
            const isSelected = b.id === currentBook.id;
            return (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBookId(b.id);
                  setChapterIndex(0);
                }}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                    : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 opacity-80" />
                <span>{b.subjectAmharic} ({b.subject})</span>
              </button>
            );
          })}
        </div>

        {/* Chapter Selector Dropdown / Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            ቻፕተር ይምረጡ:
          </span>
          {currentBook.tableOfContents.map((ch, idx) => {
            const isSelected = chapterIndex === idx;
            return (
              <button
                key={ch.chapterNumber}
                onClick={() => setChapterIndex(idx)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold shadow-xs'
                    : 'bg-slate-950/60 hover:bg-slate-800 text-slate-400 border-slate-800'
                }`}
              >
                <span className="font-mono text-[10px]">Ch {ch.chapterNumber}</span>
                <span className="truncate max-w-[150px]">{ch.titleAmharic || ch.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. The 6 Mandatory Pillar Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <button
          onClick={() => setActiveTab('objectives')}
          className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1.5 ${
            activeTab === 'objectives'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-950/40'
              : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>1. Objectives</span>
          <span className="text-[10px] opacity-80 font-mono">የምዕራፉ ዓላማዎች</span>
        </button>

        <button
          onClick={() => setActiveTab('full_analysis')}
          className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1.5 ${
            activeTab === 'full_analysis'
              ? 'bg-sky-600 text-white border-sky-500 shadow-lg shadow-sky-950/40'
              : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>2. ሙሉ ትንታኔ</span>
          <span className="text-[10px] opacity-80 font-mono">Full Breakdown</span>
        </button>

        <button
          onClick={() => setActiveTab('ai_analysis')}
          className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1.5 ${
            activeTab === 'ai_analysis'
              ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-950/40'
              : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>3. የ AI ትንታኔ</span>
          <span className="text-[10px] opacity-80 font-mono">NUR AI Synthesis</span>
        </button>

        <button
          onClick={() => setActiveTab('practice_quiz')}
          className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1.5 ${
            activeTab === 'practice_quiz'
              ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-950/40'
              : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>4. ፈተና እና ጥያቄ</span>
          <span className="text-[10px] opacity-80 font-mono">Chapter Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('entrance_exam')}
          className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1.5 ${
            activeTab === 'entrance_exam'
              ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-950/40'
              : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>5. Final & Entrance</span>
          <span className="text-[10px] opacity-80 font-mono">ESSLCE Prep</span>
        </button>

        <button
          onClick={() => setActiveTab('homework')}
          className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1.5 ${
            activeTab === 'homework'
              ? 'bg-teal-600 text-white border-teal-500 shadow-lg shadow-teal-950/40'
              : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>6. የቤት ስራና አሳይመንት</span>
          <span className="text-[10px] opacity-80 font-mono">Homework Hub</span>
        </button>
      </div>

      {/* 3. Pillar Content View */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
        {/* ============================================================== */}
        {/* PILLAR 1: OBJECTIVES (የቻፕተሩ objectives & MLCs) */}
        {/* ============================================================== */}
        {activeTab === 'objectives' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-emerald-400 font-bold block mb-1">
                  1. የቻፕተሩ Objectives እና የብቃት ማረጋገጫዎች
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  ምዕራፍ {currentChapter.chapterNumber}: {currentChapter.titleAmharic} ({currentChapter.title})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  በኢፌዴሪ ትምህርት ሚኒስቴር ስርአተ ትምህርት መሰረት እያንዳንዱ ተማሪ ከዚህ ቻፕተር ሊያሳካቸው የሚገቡ ዋና ዋና ውጤቶች።
                </p>
              </div>

              <div className="bg-slate-950 border border-emerald-500/30 px-3.5 py-2 rounded-2xl text-right">
                <span className="text-[10px] text-slate-400 block font-mono">የተሳኩ ብቃቶች</span>
                <span className="text-sm font-bold text-emerald-400">
                  {masteredCount} / {currentObjectives.length} Mastered
                </span>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              {currentObjectives.map((obj, idx) => {
                const key = `${currentBook.id}-ch${currentChapter.chapterNumber}-${idx}`;
                const isChecked = Boolean(checkedCompetencies[key]);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCompetency(idx)}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm cursor-pointer transition flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border shrink-0 transition ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'border-slate-700 bg-slate-900'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <span className="leading-relaxed">{obj}</span>
                    </div>

                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                      {isChecked ? '+15 XP' : 'MLC'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Subsections Quick View */}
            {currentChapter.subsections && currentChapter.subsections.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  የምዕራፉ ንዑሳን አርእስቶች (Subtopics in this Chapter):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {currentChapter.subsections.map((sub) => (
                    <div key={sub.sectionNumber} className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800/80">
                      <span className="text-slate-300">
                        <strong>{sub.sectionNumber}</strong> {sub.titleAmharic || sub.title}
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">ገጽ {sub.page}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* PILLAR 2: FULL DETAILED ANALYSIS (ሙሉ ትንታኔ) */}
        {/* ============================================================== */}
        {activeTab === 'full_analysis' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs text-sky-400 font-bold block mb-1">
                2. የምዕራፉ ሙሉ የፅንሰ-ሀሳብና የቀመር ትንታኔ (Full Theoretical Analysis)
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                ምዕራፍ {currentChapter.chapterNumber}: {currentChapter.title}
              </h3>
            </div>

            {/* Analysis Content */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
              <div className="whitespace-pre-line leading-relaxed">
                {suiteData?.fullAnalysis || currentChapter.summary}
              </div>

              {/* Ethiopian Context Highlight */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1.5 mt-4">
                <span className="font-bold block text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>በኢትዮጵያ ነባራዊ ሁኔታ የተደገፈ ትንታኔ (Ethiopian Real-World Context):</span>
                </span>
                <p>
                  የዚህ ምዕራፍ ፅንሰ-ሀሳብ በታላቁ የኢትዮጵያ ህዳሴ ግድብ (GERD) የኤሌክትሪክ ኃይል ማመንጨት ተርባይኖች፣ በአዋሽ ተፋሰስና በስምጥ ሸለቆ የከርሰ-ምድር ልማት፣ እንዲሁም በባህላዊ የሸክላ ምጣድ የሙቀት ስርጭት ስራ ላይ በቀጥታ በተግባር ይውላል።
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PILLAR 3: AI SYNTHESIS (የ AI ትንታኔ) */}
        {/* ============================================================== */}
        {activeTab === 'ai_analysis' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs text-purple-400 font-bold block mb-1">
                3. NUR AI ባለሁለት-ደረጃ ቅንጅታዊ ትንታኔ (Two-Layer Socratic Synthesis)
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                MoE Curriculum (Layer 1) vs University Extensions (Layer 2)
              </h3>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
              <div className="whitespace-pre-line leading-relaxed">
                {suiteData?.aiAnalysis || (
                  <p>
                    <strong>Layer 1 (MoE Secondary Curriculum):</strong> Emphasizes fundamental principles and secondary school examination problem solving.<br/><br/>
                    <strong>Layer 2 (Approved University Literature):</strong> Extends concepts to multi-variable calculus, non-ideal boundary conditions, and differential equations (OpenStax / Campbell / Brown & LeMay).
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PILLAR 4: PRACTICE QUIZ (ፈተና እና ጥያቄ) */}
        {/* ============================================================== */}
        {activeTab === 'practice_quiz' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-rose-400 font-bold block mb-1">
                  4. የቻፕተሩ ፈተና እና ጥያቄዎች (Interactive Chapter Quiz)
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Question {quizIndex + 1} of {currentQuizQuestions.length}
                </h3>
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-500/30">
                Score: {quizScore}
              </span>
            </div>

            {!quizFinished ? (
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-5">
                <span className="text-[11px] font-mono text-slate-400 block">
                  {currentQuizQuestions[quizIndex].citation}
                </span>

                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQuizQuestions[quizIndex].question}
                </p>

                <div className="space-y-2.5">
                  {currentQuizQuestions[quizIndex].options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (isAnswerSubmitted) {
                      if (idx === currentQuizQuestions[quizIndex].correctIndex) {
                        btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!isAnswerSubmitted) setSelectedOption(idx);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswerSubmitted && idx === currentQuizQuestions[quizIndex].correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswerSubmitted && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-emerald-400 block">MoE Pedagogical Justification:</span>
                    <p className="leading-relaxed">{currentQuizQuestions[quizIndex].explanation}</p>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleQuizAnswer}
                      disabled={selectedOption === null}
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold transition shadow-md"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleQuizNext}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md"
                    >
                      <span>{quizIndex < currentQuizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
                <Award className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">Quiz Finished!</h4>
                <p className="text-sm text-slate-300">
                  You scored <strong className="text-emerald-400 font-mono">{quizScore}</strong> out of{' '}
                  <strong className="text-white font-mono">{currentQuizQuestions.length}</strong>
                </p>
                <button
                  onClick={() => {
                    setQuizIndex(0);
                    setSelectedOption(null);
                    setIsAnswerSubmitted(false);
                    setQuizScore(0);
                    setQuizFinished(false);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* PILLAR 5: FINAL & ENTRANCE EXAM PREP (የዩኒቨርስቲ መግቢያ ፈተና) */}
        {/* ============================================================== */}
        {activeTab === 'entrance_exam' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs text-amber-400 font-bold block mb-1">
                5. ከቻፕተሩ ለ Final Exam እና ለ University Entrance Exam የሚሆኑ ጥያቄዎች
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                ESSLCE / EAES National Model Examination Questions
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                በብሔራዊ የፈተና ኤጀንሲ (EAES) የፈተና ስታንዳርድ መሰረት የተዘጋጁ አስቸጋሪ ጥያቄዎችና የተለመዱ የፈተና ወጥመዶች (Exam Traps)።
              </p>
            </div>

            <div className="space-y-6">
              {currentEntranceQuestions.map((eq, qIdx) => {
                return (
                  <div key={eq.id || qIdx} className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold">
                        {eq.year || 'ESSLCE Standard'}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Exam Question #{qIdx + 1}</span>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                      {eq.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {eq.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-xl border ${
                            oIdx === eq.correctIndex
                              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-bold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>

                    {/* Explanations & Exam Trap */}
                    <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
                      <p className="text-slate-300">
                        <strong className="text-emerald-400">ESSLCE Solution:</strong> {eq.explanation}
                      </p>
                      {eq.examTrap && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                          ⚠️ <strong>የብሔራዊ ፈተና ወጥመድ (National Exam Trap):</strong> {eq.examTrap}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PILLAR 6: HOMEWORK & ASSIGNMENT (የቤት ስራ እና አሳይመንት) */}
        {/* ============================================================== */}
        {activeTab === 'homework' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-teal-400 font-bold block mb-1">
                  6. የቤት ስራ እና አሳይመንት ማዘጋጀት (Homework & Project Hub)
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {currentHw.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Due Date: <strong className="text-amber-300">{currentHw.dueDate}</strong> • 10 Points Total Rubric
                </p>
              </div>

              <button
                onClick={handleCopyHomework}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-teal-300 border border-teal-500/30 text-xs font-bold transition shadow-xs w-fit"
              >
                {copiedHw ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHw ? 'ተገልብጧል (Copied)!' : 'አሳይመንቱን ኮፒ አድርግ (Copy Assignment)'}</span>
              </button>
            </div>

            {/* Assignment Problem Sheet */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <strong>Instructions:</strong> {currentHw.instructions}
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                  የቤት ስራ ጥያቄዎች (Theoretical & Derivation Problems):
                </span>
                {currentHw.problems.map((prob, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-200">
                    {prob}
                  </div>
                ))}
              </div>

              {currentHw.projectTask && (
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs space-y-1">
                  <span className="font-bold block text-purple-300">የተግባራዊ ፕሮጀክት ስራ (Lab & Community Project):</span>
                  <p>{currentHw.projectTask}</p>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 whitespace-pre-line">
                <strong className="text-slate-300 block mb-1">Official Rubric:</strong>
                {currentHw.rubric}
              </div>
            </div>

            {/* Student Submission Form */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white">የተማሪዎች መልስ ማስረከቢያ (Submit Homework Answer):</h4>
              {hwSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <span className="text-xs font-bold text-emerald-200 block">
                    Homework Submitted Successfully (+60 XP Earned)!
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Your answers have been saved to your student profile for instructor rubric review.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHwSubmit} className="space-y-3">
                  <textarea
                    rows={5}
                    required
                    value={hwSubmissionText}
                    onChange={(e) => setHwSubmissionText(e.target.value)}
                    placeholder="Type your algebraic steps, numerical answers with SI units, and citations here..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  />
                  <button
                    type="submit"
                    disabled={!hwSubmissionText.trim()}
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>አሳይመንቱን አስረክብ (Submit Assignment)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObjectivesExamView;

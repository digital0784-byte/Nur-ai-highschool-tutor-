import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  List,
  Search,
  BookOpen,
  Sparkles,
  Award,
  Bookmark,
  Share2,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  OFFICIAL_TEXTBOOKS_REGISTRY,
  MoETextbookItem,
  TextbookChapter,
  TextbookSubsection,
  getTextbooksForGrade,
} from '../../data/textbooksRegistry';

interface TextbookViewProps {
  onNavigateToChapterSuite?: () => void;
}

export const TextbookView: React.FC<TextbookViewProps> = ({ onNavigateToChapterSuite }) => {
  const { user, selectedGrade } = useAuth();
  const { t, isRTL } = useLanguage();

  // Available textbooks for current grade
  const availableBooks = getTextbooksForGrade(selectedGrade);
  const [selectedBookId, setSelectedBookId] = useState<string>(
    availableBooks[0]?.id || OFFICIAL_TEXTBOOKS_REGISTRY[0].id
  );

  const currentBook: MoETextbookItem =
    availableBooks.find((b) => b.id === selectedBookId) ||
    availableBooks[0] ||
    OFFICIAL_TEXTBOOKS_REGISTRY[0];

  // Active chapter and page state
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [activeSubsection, setActiveSubsection] = useState<TextbookSubsection | null>(
    currentBook.tableOfContents[0]?.subsections[0] || null
  );
  const [currentPage, setCurrentPage] = useState<number>(
    currentBook.tableOfContents[0]?.startPage || 1
  );

  // Table of Contents drawer visibility and search query
  const [isTocOpen, setIsTocOpen] = useState<boolean>(true);
  const [tocSearchQuery, setTocSearchQuery] = useState<string>('');
  const [expandedChapterIndex, setExpandedChapterIndex] = useState<number | null>(0);

  // Handle book switch
  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(bookId);
    const newBook = OFFICIAL_TEXTBOOKS_REGISTRY.find((b) => b.id === bookId);
    if (newBook && newBook.tableOfContents.length > 0) {
      setActiveChapterIndex(0);
      setActiveSubsection(newBook.tableOfContents[0].subsections[0] || null);
      setCurrentPage(newBook.tableOfContents[0].startPage);
      setExpandedChapterIndex(0);
    }
  };

  // Jump to specific chapter from Table of Contents (ማውጫ)
  const handleJumpToChapter = (chIndex: number) => {
    setActiveChapterIndex(chIndex);
    const ch = currentBook.tableOfContents[chIndex];
    if (ch) {
      setCurrentPage(ch.startPage);
      setActiveSubsection(ch.subsections[0] || null);
      setExpandedChapterIndex(chIndex);
    }
  };

  // Jump to specific subsection from Table of Contents (ማውጫ)
  const handleJumpToSubsection = (chIndex: number, sub: TextbookSubsection) => {
    setActiveChapterIndex(chIndex);
    setActiveSubsection(sub);
    setCurrentPage(sub.page);
    setExpandedChapterIndex(chIndex);
  };

  const activeChapter: TextbookChapter | undefined = currentBook.tableOfContents[activeChapterIndex];

  // Filter Table of Contents based on user search query
  const filteredToc = currentBook.tableOfContents.filter((ch) => {
    if (!tocSearchQuery.trim()) return true;
    const q = tocSearchQuery.toLowerCase();
    const matchChapter =
      ch.title.toLowerCase().includes(q) ||
      ch.titleAmharic.toLowerCase().includes(q) ||
      ch.chapterNumber.toString() === q;
    const matchSubsections = ch.subsections.some(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        (s.titleAmharic && s.titleAmharic.toLowerCase().includes(q)) ||
        s.page.toString() === q
    );
    return matchChapter || matchSubsections;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* 1. Header & Subject Switcher */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>የኢትዮጵያ አዲሱ ስርአተ ትምህርት (2019 ዓ.ም / 2026)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              የተማሪዎች መማሪያ መፅሀፍት እና ሙሉ ማውጫ (Textbooks & Table of Contents)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              በኢፌዴሪ ትምህርት ሚኒስቴር የታተሙ ይፋዊ የ {selectedGrade} መማሪያ መፅሀፍት ከሙሉ ምዕራፍና ገጽ ማውጫ (Table of Contents) ጋር።
            </p>
          </div>

          {/* Table of Contents Toggle Button */}
          <button
            onClick={() => setIsTocOpen((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-md border ${
              isTocOpen
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-slate-700'
            }`}
          >
            <List className="w-4 h-4" />
            <span>{isTocOpen ? 'ማውጫውን ደብቅ (Hide Index)' : 'የመፅሃፉ ማውጫ (Open Table of Contents)'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/30 font-mono text-[10px]">
              {currentBook.tableOfContents.length} ምዕራፎች
            </span>
          </button>
        </div>

        {/* Available Books Horizontal Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            መፅሃፍ ይምረጡ:
          </span>
          {availableBooks.map((b) => {
            const isSelected = b.id === currentBook.id;
            return (
              <button
                key={b.id}
                onClick={() => handleSelectBook(b.id)}
                className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-md'
                    : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 opacity-80" />
                <span>{b.subjectAmharic} ({b.subject})</span>
                <span className="px-1.5 py-0.2 rounded bg-slate-900 text-[10px] font-mono text-slate-400">
                  {b.totalChapters} Ch
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Two-Column Layout: Table of Contents (ማውጫ) + Textbook Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Table of Contents (የመፅሃፉ ማውጫ) */}
        {isTocOpen && (
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4 max-h-[850px] flex flex-col">
            {/* TOC Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <List className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-black text-white">
                    የመፅሃፉ ማውጫ (Table of Contents)
                  </h3>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {currentBook.subject} • {currentBook.totalPages} ገጾች • {currentBook.edition}
                  </span>
                </div>
              </div>
            </div>

            {/* TOC Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={tocSearchQuery}
                onChange={(e) => setTocSearchQuery(e.target.value)}
                placeholder="ምዕራፍ ወይም ንዑስ አርእስት ይፈልጉ..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Chapters and Subsections Tree */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 no-scrollbar">
              {filteredToc.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  ምንም የተገኘ ማውጫ የለም ("{tocSearchQuery}")
                </div>
              ) : (
                filteredToc.map((chapter) => {
                  const chIndex = currentBook.tableOfContents.findIndex(
                    (c) => c.chapterNumber === chapter.chapterNumber
                  );
                  const isActive = activeChapterIndex === chIndex;
                  const isExpanded = expandedChapterIndex === chIndex;

                  return (
                    <div
                      key={chapter.chapterNumber}
                      className={`rounded-2xl border transition overflow-hidden ${
                        isActive
                          ? 'bg-slate-950 border-emerald-500/50 shadow-sm'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      {/* Chapter Item */}
                      <div
                        onClick={() => {
                          handleJumpToChapter(chIndex);
                          setExpandedChapterIndex(isExpanded ? null : chIndex);
                        }}
                        className="p-3.5 cursor-pointer flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                              isActive
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-900 text-slate-300 group-hover:bg-slate-800'
                            }`}
                          >
                            {chapter.chapterNumber}
                          </span>
                          <div className="min-w-0">
                            <h4
                              className={`text-xs font-bold truncate leading-tight ${
                                isActive ? 'text-emerald-300' : 'text-slate-200 group-hover:text-white'
                              }`}
                            >
                              ምዕራፍ {chapter.chapterNumber}: {chapter.titleAmharic}
                            </h4>
                            <p className="text-[10px] text-slate-400 truncate leading-tight">
                              {chapter.title}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                            ገጽ {chapter.startPage} - {chapter.endPage}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 transition-transform ${
                              isExpanded ? 'rotate-180 text-emerald-400' : ''
                            }`}
                          />
                        </div>
                      </div>

                      {/* Subsections Accordion (ንዑሳን አርእስቶች) */}
                      {isExpanded && chapter.subsections && chapter.subsections.length > 0 && (
                        <div className="bg-slate-900/60 border-t border-slate-800/80 p-2 space-y-1">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block px-2 py-1">
                            ንዑሳን አርእስቶች (Subsections):
                          </span>
                          {chapter.subsections.map((sub) => {
                            const isSubActive =
                              isActive && activeSubsection?.sectionNumber === sub.sectionNumber;
                            return (
                              <button
                                key={sub.sectionNumber}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleJumpToSubsection(chIndex, sub);
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between gap-2 transition ${
                                  isSubActive
                                    ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="font-mono text-[10px] text-slate-400">
                                    {sub.sectionNumber}
                                  </span>
                                  <span className="truncate">
                                    {sub.titleAmharic || sub.title}
                                  </span>
                                </div>
                                <span className="font-mono text-[10px] text-slate-400 shrink-0">
                                  ገጽ {sub.page}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick Summary Badge */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>ጠቅላላ ማውጫ: {currentBook.totalChapters} ምዕራፎች</span>
              <span className="font-mono text-emerald-400 font-bold">
                ገጽ {currentPage} / {currentBook.totalPages}
              </span>
            </div>
          </div>
        )}

        {/* Right Column: Textbook Page Content & Interactive Reader */}
        <div
          className={`${
            isTocOpen ? 'lg:col-span-7' : 'lg:col-span-12'
          } bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6 flex flex-col justify-between`}
        >
          {/* Reader Top Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                {currentBook.subject} ({selectedGrade})
              </span>
              <span className="text-xs text-slate-400 truncate">
                {activeChapter ? `ምዕራፍ ${activeChapter.chapterNumber}: ${activeChapter.titleAmharic}` : ''}
              </span>
            </div>

            {/* Page Jump Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 disabled:opacity-40 transition border border-slate-800"
                title="የቀደመው ገጽ (Previous Page)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl text-xs font-mono">
                <span className="text-slate-400">ገጽ</span>
                <input
                  type="number"
                  min={1}
                  max={currentBook.totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const p = parseInt(e.target.value, 10);
                    if (!isNaN(p)) setCurrentPage(Math.min(currentBook.totalPages, Math.max(1, p)));
                  }}
                  className="w-12 bg-transparent text-center font-bold text-white focus:outline-none"
                />
                <span className="text-slate-500">/ {currentBook.totalPages}</span>
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(currentBook.totalPages, p + 1))}
                disabled={currentPage >= currentBook.totalPages}
                className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 disabled:opacity-40 transition border border-slate-800"
                title="ቀጣዩ ገጽ (Next Page)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reading Canvas with Dynamic DRM Watermark */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800/80 p-6 sm:p-8 min-h-[460px] overflow-hidden space-y-6 shadow-inner">
            {/* Dynamic Watermark Security */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] flex flex-wrap gap-12 items-center justify-center p-8 select-none text-[10px] font-mono text-white rotate-[-20deg]">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i}>
                  FDRE MoE • {user?.email || 'student'} • {selectedGrade} • DRM-PROTECTED
                </span>
              ))}
            </div>

            {/* Section Header */}
            {activeChapter && (
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 border-b border-slate-800/80 pb-2">
                  <span>
                    [FDRE MoE ይፋዊ ማውጫ: {currentBook.subject} • ምዕራፍ {activeChapter.chapterNumber}]
                  </span>
                  <span>ገጽ {currentPage}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-white">
                  ምዕራፍ {activeChapter.chapterNumber}: {activeChapter.titleAmharic} ({activeChapter.title})
                </h3>

                {activeSubsection && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-300">
                    <span className="font-mono text-slate-400">{activeSubsection.sectionNumber}</span>
                    <span>{activeSubsection.titleAmharic || activeSubsection.title}</span>
                  </div>
                )}
              </div>
            )}

            {/* Chapter Summary & Conceptual Breakdown */}
            {activeChapter && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400 block">
                    የምዕራፉ ማጠቃለያ እና ዋና ፅንሰ-ሀሳብ (Chapter Abstract):
                  </span>
                  <p>{activeChapter.summary}</p>
                </div>

                {/* Key Learning Competencies */}
                {activeChapter.keyCompetencies && activeChapter.keyCompetencies.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-white block">
                      የምዕራፉ የብቃት ማረጋገጫዎች (Minimum Learning Competencies):
                    </span>
                    <div className="space-y-1.5">
                      {activeChapter.keyCompetencies.map((comp, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Theoretical Content with Ethiopian Real-World Connection */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1.5">
                  <span className="font-bold block text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>በኢትዮጵያ ነባራዊ ሁኔታ የተደገፈ ማብራሪያ (Ethiopian Real-World Application):</span>
                  </span>
                  <p>
                    ይህ ፅንሰ-ሀሳብ በኢትዮጵያ ታላቁ የህዳሴ ግድብ (GERD) የኤሌክትሪክ ኃይል ማመንጨት፣ በአዋሽ ወንዝ ተፋሰስ የመስኖ ልማትና በባህላዊ የሸክላ ምጣድ የሙቀት ሽግግር ስራ ላይ በቀጥታ በተግባር ይውላል።
                  </p>
                </div>

                {onNavigateToChapterSuite && (
                  <button
                    onClick={onNavigateToChapterSuite}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-600 hover:opacity-90 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>የምዕራፉ Objectives፣ ሙሉ ትንታኔ፣ ፈተና እና አሳይመንት ስቱዲዮ (Open Chapter Mastery Suite)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Bottom Chapter Switcher Navigation */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={() => {
                if (activeChapterIndex > 0) handleJumpToChapter(activeChapterIndex - 1);
              }}
              disabled={activeChapterIndex <= 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-xs font-bold text-slate-300 transition border border-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>የቀደመው ምዕራፍ</span>
            </button>

            <span className="text-[11px] text-slate-400 font-mono">
              ምዕራፍ {activeChapterIndex + 1} ከ {currentBook.tableOfContents.length}
            </span>

            <button
              onClick={() => {
                if (activeChapterIndex < currentBook.tableOfContents.length - 1) {
                  handleJumpToChapter(activeChapterIndex + 1);
                }
              }}
              disabled={activeChapterIndex >= currentBook.tableOfContents.length - 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-xs font-bold text-slate-300 transition border border-slate-800"
            >
              <span>ቀጣዩ ምዕራፍ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextbookView;

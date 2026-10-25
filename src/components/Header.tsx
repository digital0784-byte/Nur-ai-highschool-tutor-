import React from 'react';
import {
  GraduationCap,
  Sparkles,
  BookMarked,
  Languages,
  Layers,
  Compass,
  Award,
  Calculator,
  Library
} from 'lucide-react';
import { ETHIOPIAN_LANGUAGES, LEARNING_MODES } from '../data/curriculumData';

interface HeaderProps {
  currentGrade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  setGrade: (g: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12') => void;
  stream: 'Natural Science' | 'Social Science' | 'Common';
  setStream: (s: 'Natural Science' | 'Social Science' | 'Common') => void;
  subject: string;
  setSubject: (s: string) => void;
  language: string;
  setLanguage: (l: string) => void;
  learningMode: string;
  setLearningMode: (m: string) => void;
  activeTab: 'chat' | 'library' | 'esslce' | 'solver' | 'formulas';
  setActiveTab: (t: 'chat' | 'library' | 'esslce' | 'solver' | 'formulas') => void;
  availableSubjects: string[];
}

export const Header: React.FC<HeaderProps> = ({
  currentGrade,
  setGrade,
  stream,
  setStream,
  subject,
  setSubject,
  language,
  setLanguage,
  learningMode,
  setLearningMode,
  activeTab,
  setActiveTab,
  availableSubjects,
}) => {
  const isHighSenior = currentGrade === 'Grade 11' || currentGrade === 'Grade 12';

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Ministry Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950/40 border-b border-slate-800/80 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-300">
          <div className="flex items-center gap-2">
            {/* Ethiopian flag color pill */}
            <div className="flex h-3 w-6 rounded-sm overflow-hidden shadow-xs border border-white/10">
              <span className="w-1/3 bg-emerald-500 h-full"></span>
              <span className="w-1/3 bg-amber-400 h-full"></span>
              <span className="w-1/3 bg-rose-600 h-full"></span>
            </div>
            <span className="font-semibold text-emerald-400 tracking-wide uppercase text-[11px]">
              FDRE Ministry of Education
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">
              New Secondary Curriculum Specialist (Grades 9–12)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Curriculum Verified
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">ESSLCE Standard</span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-500 p-0.5 shadow-lg shadow-emerald-500/10 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-black text-slate-950">
                ★
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  <span>NUR AI</span>
                  <span className="text-xs font-normal px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    ኑር AI
                  </span>
                </h1>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {currentGrade}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Ethiopian High School Personal AI Tutor & Curriculum Guide
              </p>
            </div>
          </div>

          {/* Quick Selectors Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Grade Selector */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
              {(['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setGrade(g);
                    if (g === 'Grade 9' || g === 'Grade 10') {
                      setStream('Common');
                    } else if (stream === 'Common') {
                      setStream('Natural Science');
                    }
                  }}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    currentGrade === g
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {g.replace('Grade ', 'G-')}
                </button>
              ))}
            </div>

            {/* Stream Selector for 11 & 12 */}
            {isHighSenior && (
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
                <button
                  onClick={() => setStream('Natural Science')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    stream === 'Natural Science'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Natural Sci
                </button>
                <button
                  onClick={() => setStream('Social Science')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    stream === 'Social Science'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Social Sci
                </button>
              </div>
            )}

            {/* Subject Selector */}
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
            >
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
              >
                {ETHIOPIAN_LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Learning Mode & Nav Tabs Row */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs font-semibold">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                activeTab === 'chat'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Tutor Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                activeTab === 'library'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Library className="w-3.5 h-3.5 text-emerald-400" />
              <span>MoE Textbooks & Excerpts</span>
            </button>

            <button
              onClick={() => setActiveTab('esslce')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                activeTab === 'esslce'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>ESSLCE National Exam Arena</span>
            </button>

            <button
              onClick={() => setActiveTab('solver')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                activeTab === 'solver'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-sky-400" />
              <span>Step-by-Step Solver</span>
            </button>

            <button
              onClick={() => setActiveTab('formulas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                activeTab === 'formulas'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5 text-amber-400" />
              <span>Formula & Key Terms Deck</span>
            </button>
          </nav>

          {/* Learning Mode Quick Pills */}
          <div className="flex items-center gap-1 shrink-0 overflow-x-auto pb-1 md:pb-0 text-[11px]">
            <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold mr-1">
              Mode:
            </span>
            {LEARNING_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setLearningMode(mode.id)}
                title={mode.description}
                className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                  learningMode === mode.id
                    ? mode.id === 'BEGINNER'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      : mode.id === 'GUIDED'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50'
                      : mode.id === 'PRACTICE'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <span>{mode.badge.slice(0, 2)}</span>
                <span>{mode.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

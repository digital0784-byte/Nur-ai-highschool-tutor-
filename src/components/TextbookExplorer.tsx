import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  Calculator,
  Flame,
  FileText,
  Bookmark,
  Layers,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { MOE_EXCERPTS, MoETextbookExcerpt } from '../data/curriculumData';
import { CitationBadge } from './CitationBadge';
import { AudioPlayerButton } from './AudioPlayerButton';

interface TextbookExplorerProps {
  currentGrade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  setGrade: (g: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12') => void;
  subject: string;
  setSubject: (s: string) => void;
  onSelectExcerptForChat: (excerpt: MoETextbookExcerpt) => void;
  onSelectExcerptForSolver: (excerpt: MoETextbookExcerpt) => void;
}

export const TextbookExplorer: React.FC<TextbookExplorerProps> = ({
  currentGrade,
  setGrade,
  subject,
  setSubject,
  onSelectExcerptForChat,
  onSelectExcerptForSolver,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('All');
  const [filterGrade, setFilterGrade] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredExcerpts = MOE_EXCERPTS.filter((excerpt) => {
    const matchesSearch =
      searchQuery === '' ||
      excerpt.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.keyFormulasOrTerms.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesSubject =
      filterSubject === 'All' || excerpt.subject.toLowerCase() === filterSubject.toLowerCase();

    const matchesGrade =
      filterGrade === 'All' || excerpt.grade.toLowerCase() === filterGrade.toLowerCase();

    return matchesSearch && matchesSubject && matchesGrade;
  });

  const subjectsList = ['All', 'Physics', 'Mathematics', 'Chemistry', 'Biology', 'History', 'Geography', 'Economics'];
  const gradesList = ['All', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              FDRE Ministry of Education Curriculum Library
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Official Ethiopian High School Textbooks & Excerpts
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Explore primary curriculum excerpts from the FDRE MoE New Secondary Curriculum.
              Every topic is indexed with verified unit names, textbook page citations, and real-world analogies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-2xl text-center">
              <span className="block text-2xl font-black text-emerald-400 font-mono">
                {MOE_EXCERPTS.length}
              </span>
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                MoE Indexed Topics
              </span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-2xl text-center">
              <span className="block text-2xl font-black text-amber-400 font-mono">
                100%
              </span>
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                Verified Citations
              </span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, formulas, laws, or keywords (e.g. Projectile, Haber, Adwa, GERD)..."
              className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
            >
              {subjectsList.map((s) => (
                <option key={s} value={s}>
                  Subject: {s}
                </option>
              ))}
            </select>

            {/* Grade Filter */}
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
            >
              {gradesList.map((g) => (
                <option key={g} value={g}>
                  Grade: {g}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Excerpt Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredExcerpts.map((excerpt) => {
          const isExpanded = expandedId === excerpt.id;

          return (
            <div
              key={excerpt.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-md flex flex-col justify-between transition-all group"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {excerpt.grade}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                      {excerpt.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800/80 text-slate-400">
                      {excerpt.stream}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {excerpt.page}
                  </span>
                </div>

                {/* Unit & Topic Title */}
                <div className="mb-3">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {excerpt.unit}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
                    {excerpt.topic}
                  </h3>
                </div>

                {/* Official MoE Citation Badge */}
                <CitationBadge
                  citationText={`[FDRE MoE Citation: ${excerpt.grade} ${excerpt.subject} | ${excerpt.unit} | Topic: ${excerpt.topic} | Textbook Page: ${excerpt.page}]`}
                />

                {/* Summary */}
                <div className="text-sm text-slate-300 leading-relaxed mb-4">
                  <p className={isExpanded ? '' : 'line-clamp-3'}>{excerpt.summary}</p>
                </div>

                {/* Ethiopian Analogy Box */}
                {excerpt.ethiopianAnalogy && (
                  <div className="mb-4 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                    <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block mb-0.5">
                        Everyday Ethiopian Analogy
                      </span>
                      <p className="italic text-slate-300">{excerpt.ethiopianAnalogy}</p>
                    </div>
                  </div>
                )}

                {/* Key Formulas or Terms */}
                {excerpt.keyFormulasOrTerms.length > 0 && (
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Key Formulas & Principles:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {excerpt.keyFormulasOrTerms.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-300 text-xs font-mono"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sample problem if expanded */}
                {isExpanded && excerpt.sampleProblems && excerpt.sampleProblems.length > 0 && (
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                    <span className="font-bold text-sky-400 uppercase tracking-wider text-[10px] block">
                      Sample MoE Textbook Problem:
                    </span>
                    <p className="text-slate-200 font-medium">
                      {excerpt.sampleProblems[0].question}
                    </p>
                    {excerpt.sampleProblems[0].options && (
                      <div className="grid grid-cols-2 gap-1.5 my-1.5">
                        {excerpt.sampleProblems[0].options.map((opt, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-900 rounded text-slate-300 text-[11px]">
                            {opt}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="pt-2 border-t border-slate-800 text-emerald-300">
                      <span className="font-bold text-white">Solution: </span>
                      {excerpt.sampleProblems[0].solution}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : excerpt.id)}
                  className="text-xs text-slate-400 hover:text-slate-200 underline font-medium"
                >
                  {isExpanded ? 'Show less' : 'View full excerpt & problems'}
                </button>

                <div className="flex items-center gap-2">
                  <AudioPlayerButton text={excerpt.summary} language="English" />

                  <button
                    onClick={() => {
                      setGrade(excerpt.grade);
                      setSubject(excerpt.subject);
                      onSelectExcerptForChat(excerpt);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tutor Me</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExcerpts.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-base font-bold text-white">No textbook excerpts found</h4>
          <p className="text-sm max-w-md mx-auto">
            Try adjusting your search query or selecting a different subject or grade filter.
          </p>
        </div>
      )}
    </div>
  );
};

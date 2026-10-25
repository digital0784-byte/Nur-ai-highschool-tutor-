import React, { useState } from 'react';
import {
  BookMarked,
  Sparkles,
  Search,
  Filter,
  Flame,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RotateCw
} from 'lucide-react';
import { MOE_EXCERPTS, MoETextbookExcerpt } from '../data/curriculumData';

interface FormulaCardsProps {
  currentGrade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  subject: string;
  onAskAboutFormula: (topic: string, formula: string) => void;
}

export const FormulaCards: React.FC<FormulaCardsProps> = ({
  currentGrade,
  subject,
  onAskAboutFormula,
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [filterSubject, setFilterSubject] = useState<string>('All');
  const [search, setSearch] = useState('');

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredExcerpts = MOE_EXCERPTS.filter((item) => {
    const matchesSubject =
      filterSubject === 'All' || item.subject.toLowerCase() === filterSubject.toLowerCase();
    const matchesSearch =
      search === '' ||
      item.topic.toLowerCase().includes(search.toLowerCase()) ||
      item.unit.toLowerCase().includes(search.toLowerCase()) ||
      item.keyFormulasOrTerms.some((k) => k.toLowerCase().includes(search.toLowerCase()));

    return matchesSubject && matchesSearch;
  });

  const subjects = ['All', 'Physics', 'Mathematics', 'Chemistry', 'Biology', 'History', 'Geography', 'Economics'];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <BookMarked className="w-3.5 h-3.5" />
          FDRE MoE High-Yield Concept Deck
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Curriculum Formulas & Key Principles Deck
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Quick-revision flashcards for Ethiopian high school students. Click any card to flip between formulas, SI units, and everyday Ethiopian analogies!
        </p>

        {/* Filter & Search Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by formula or keyword (e.g., Range, Carnot, Le Chatelier, Adwa)..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 font-medium cursor-pointer"
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  Subject: {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredExcerpts.map((excerpt) => {
          const isFlipped = Boolean(flippedCards[excerpt.id]);

          return (
            <div
              key={excerpt.id}
              onClick={() => toggleFlip(excerpt.id)}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-5 shadow-lg flex flex-col justify-between transition-all cursor-pointer relative group min-h-[300px]"
            >
              {/* Card Front vs Back */}
              {!isFlipped ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {excerpt.subject}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{excerpt.page}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      {excerpt.unit}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition mt-0.5">
                      {excerpt.topic}
                    </h3>
                  </div>

                  {/* Formulas list */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Core Formulas & Terms:
                    </span>
                    <div className="space-y-1">
                      {excerpt.keyFormulasOrTerms.slice(0, 4).map((f, i) => (
                        <div
                          key={i}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-200 text-xs font-mono"
                        >
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      Ethiopian Analogy & Context
                    </span>
                    <span className="text-xs text-slate-500">Tap to flip</span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed italic bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
                    "{excerpt.ethiopianAnalogy}"
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Textbook Summary:
                    </span>
                    <p className="text-xs text-slate-300 line-clamp-4 leading-relaxed">
                      {excerpt.summary}
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Card Bar */}
              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[11px] hover:text-slate-200">
                  <RotateCw className="w-3 h-3 text-amber-400" />
                  {isFlipped ? 'Click for Formulas' : 'Click for Analogy'}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAskAboutFormula(excerpt.topic, excerpt.keyFormulasOrTerms[0] || '');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 font-semibold border border-amber-500/30 transition text-[11px]"
                >
                  Tutor This
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

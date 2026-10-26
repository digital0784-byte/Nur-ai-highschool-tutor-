import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, ChevronRight, Share2, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { MOE_EXCERPTS, MoETextbookExcerpt } from '../../data/curriculumData';

export const LessonView: React.FC = () => {
  const { selectedGrade } = useAuth();
  const { t } = useLanguage();
  const [selectedExcerpt, setSelectedExcerpt] = useState<MoETextbookExcerpt>(MOE_EXCERPTS[0]);

  const filteredExcerpts = MOE_EXCERPTS.filter(
    (e) => e.grade === selectedGrade
  );
  const activeExcerpt = filteredExcerpts.length > 0 ? selectedExcerpt : MOE_EXCERPTS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-emerald-400 font-bold block mb-1">
            Category 1: ትምህርት (Lesson Explanations & Competency Guides)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {selectedGrade} Core Curriculum Lessons
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            FDRE Ministry of Education Standard Excerpts with step-by-step derivations and Ethiopian analogies.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300 w-fit">
          {activeExcerpt.page}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lesson Navigator List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lesson Topics</h3>
          <div className="space-y-2">
            {filteredExcerpts.map((ex) => (
              <div
                key={ex.id}
                onClick={() => setSelectedExcerpt(ex)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition space-y-1 ${
                  activeExcerpt.id === ex.id
                    ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-xs'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-emerald-400 font-bold">{ex.subject}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{ex.page}</span>
                </div>
                <p className="font-semibold line-clamp-1">{ex.topic}</p>
                <span className="text-[10px] text-slate-400 block line-clamp-1">{ex.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Lesson Breakdown */}
        <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400 font-bold">
              [FDRE MoE Citation: {activeExcerpt.grade} {activeExcerpt.subject} | {activeExcerpt.unit} | {activeExcerpt.page}]
            </span>
            <h3 className="text-lg font-bold text-white pt-1">{activeExcerpt.topic}</h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <span className="text-xs font-bold text-emerald-300 block">Curriculum Summary:</span>
            <p>{activeExcerpt.summary}</p>
          </div>

          {/* Key Formulas */}
          {activeExcerpt.keyFormulasOrTerms.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">Key Formulas & Terms:</span>
              <div className="flex flex-wrap gap-2">
                {activeExcerpt.keyFormulasOrTerms.map((f, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ethiopian Analogy */}
          {activeExcerpt.ethiopianAnalogy && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
              <span className="font-bold block flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Everyday Ethiopian Analogy:</span>
              </span>
              <p className="leading-relaxed">{activeExcerpt.ethiopianAnalogy}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonView;

import React, { useState } from 'react';
import { Layers, ChevronRight, CheckCircle2, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { getCompetencyTree, CompetencyNode } from '../../engine/curriculumRegistry';

export const EthiopianCurriculumEngineView: React.FC = () => {
  const { selectedGrade } = useAuth();
  const { language } = useLanguage();
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  const nodes = getCompetencyTree(selectedGrade, language);
  const filteredNodes = selectedSubjectFilter === 'all'
    ? nodes
    : nodes.filter((n) => n.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-teal-400 font-bold block mb-1">
            Category 1: ስርአተ ትምህርት ኢንጅን (MoE 2019 E.C. Curriculum Tree)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {selectedGrade} Curriculum Competency Tree
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Standard syllabus structure detailing minimum learning competencies for each chapter.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setSelectedSubjectFilter('all')}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              selectedSubjectFilter === 'all' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedSubjectFilter('physics')}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              selectedSubjectFilter === 'physics' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Physics
          </button>
          <button
            onClick={() => setSelectedSubjectFilter('chemistry')}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              selectedSubjectFilter === 'chemistry' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Chemistry
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredNodes.map((node, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-teal-400">
                {node.subject} • Unit {node.unitNumber}: {node.unitTitle}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
                MoE 2019 E.C.
              </span>
            </div>

            <h3 className="text-sm font-bold text-white">{node.topic}</h3>

            <div className="flex items-start gap-2 pt-1 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Learning Outcome:</strong> {node.competency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EthiopianCurriculumEngineView;

import React, { useState } from 'react';
import { Search, X, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { searchCurriculumKnowledge, SearchResultItem } from '../../engine/searchRecommendationEngine';
import { useAuth } from '../../context/AuthContext';

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult?: (item: SearchResultItem) => void;
}

export const SmartSearchModal: React.FC<SmartSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const { selectedGrade } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);

  if (!isOpen) return null;

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim().length > 1) {
      const res = searchCurriculumKnowledge(q, selectedGrade);
      setResults(res);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search Ethiopian curriculum concepts, formulas, GERD applications..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {query.trim().length > 1 && results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No matching curriculum excerpts found for "{query}". Try "Projectile", "GERD", "Carnot", or "Chromium".
            </div>
          ) : results.length > 0 ? (
            results.map((r) => (
              <div
                key={r.id}
                onClick={() => {
                  if (onSelectResult) onSelectResult(r);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800/80 hover:border-emerald-500/40 cursor-pointer transition flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xs text-emerald-300">{r.title}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">
                      {r.subject} • {r.unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{r.snippet}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
              </div>
            ))
          ) : (
            <div className="py-8 text-center space-y-2 text-slate-500 text-xs">
              <Sparkles className="w-6 h-6 text-slate-600 mx-auto" />
              <p>Type to search official {selectedGrade} Ministry of Education textbook topics and formulas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartSearchModal;

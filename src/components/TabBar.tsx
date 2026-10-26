import React from 'react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { SystemModuleId } from '../types';

interface TabBarProps {
  activeModule: SystemModuleId;
  onSelectModule: (id: SystemModuleId) => void;
  onNavigateBack?: () => void;
  canGoBack?: boolean;
}

export const TabBar: React.FC<TabBarProps> = ({
  activeModule,
  onSelectModule,
  onNavigateBack,
  canGoBack = false,
}) => {
  const { t, isRTL } = useLanguage();
  const { selectedGrade } = useAuth();

  const moduleInfo = t.modules[activeModule] || { title: activeModule, subtitle: '' };

  const quickShortcuts: { id: SystemModuleId; label: string }[] = [
    { id: 'lesson', label: t.modules.lesson.title },
    { id: 'ai_tutor', label: t.modules.ai_tutor.title },
    { id: 'quiz', label: t.modules.quiz.title },
    { id: 'entrance_prep', label: t.modules.entrance_prep.title },
    { id: 'flashcards', label: t.modules.flashcards.title },
  ];

  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Breadcrumb path */}
      <div className="flex items-center gap-1.5 text-slate-400">
        {canGoBack && onNavigateBack && (
          <button
            onClick={onNavigateBack}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 transition mr-1"
            title={t.back}
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        )}
        <button
          onClick={() => onSelectModule('lesson')}
          className="flex items-center gap-1 hover:text-emerald-400 transition"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="font-medium">{selectedGrade}</span>
        </button>
        <ChevronRight className={`w-3.5 h-3.5 text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
        <span className="text-white font-bold truncate max-w-[200px] sm:max-w-xs">
          {moduleInfo.title}
        </span>
      </div>

      {/* Quick Switcher Pills */}
      <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
        {quickShortcuts.map((sc) => (
          <button
            key={sc.id}
            onClick={() => onSelectModule(sc.id)}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] whitespace-nowrap transition ${
              activeModule === sc.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {sc.label}
          </button>
        ))}
      </div>
    </div>
  );
};

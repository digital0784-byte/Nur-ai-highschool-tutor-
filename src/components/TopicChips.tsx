import React from 'react';
import { EthiopianGrade } from '../types';
import { Sparkles, BookOpen } from 'lucide-react';

interface TopicChipsProps {
  topics: { id: string; name: string; unit?: string }[];
  selectedTopicId?: string;
  onSelectTopic: (topicId: string) => void;
  gradeTier?: EthiopianGrade;
}

export const TopicChips: React.FC<TopicChipsProps> = ({
  topics,
  selectedTopicId,
  onSelectTopic,
  gradeTier,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
      {gradeTier && (
        <span className="shrink-0 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono font-bold">
          {gradeTier}
        </span>
      )}
      {topics.map((t) => {
        const isSelected = selectedTopicId === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onSelectTopic(t.id)}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              isSelected
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 opacity-70" />
            <span className="truncate max-w-[200px]">{t.name}</span>
          </button>
        );
      })}
    </div>
  );
};

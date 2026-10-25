import React from 'react';
import { BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';

interface CitationBadgeProps {
  citationText: string;
}

export const CitationBadge: React.FC<CitationBadgeProps> = ({ citationText }) => {
  // Clean up citation brackets if present
  const cleaned = citationText.replace(/^\[|\]$/g, '').trim();

  return (
    <div className="my-3 p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-200 text-xs sm:text-sm font-medium shadow-sm backdrop-blur-sm flex items-start gap-3">
      <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
        <ShieldCheck className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-400 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            FDRE MoE Official Curriculum Citation
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
            Verified Source
          </span>
        </div>
        <p className="font-mono text-xs sm:text-sm text-emerald-100/90 leading-relaxed break-words">
          {cleaned}
        </p>
      </div>
    </div>
  );
};

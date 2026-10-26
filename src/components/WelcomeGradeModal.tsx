import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Lock,
  ArrowRight,
  BookOpen,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { EthiopianGrade } from '../types';
import { LanguageSelectorDropdown } from './LanguageSelectorDropdown';

interface WelcomeGradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeGradeModal: React.FC<WelcomeGradeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  const { setStudentLockedGrade, isSuperAdmin, selectedGrade } = useAuth();
  const [chosenGrade, setChosenGrade] = useState<EthiopianGrade>(selectedGrade || 'Grade 11');

  if (!isOpen) return null;

  const handleConfirm = () => {
    setStudentLockedGrade(chosenGrade);
    onClose();
  };

  const grades: { grade: EthiopianGrade; label: string; desc: string; color: string }[] = [
    {
      grade: 'Grade 9',
      label: 'ክፍል 9 (Grade 9)',
      desc: 'የአዲሱ ስርአተ ትምህርት አጠቃላይ የሁለተኛ ደረጃ መነሻ (General Secondary)',
      color: 'from-emerald-600 to-teal-700',
    },
    {
      grade: 'Grade 10',
      label: 'ክፍል 10 (Grade 10)',
      desc: 'የሁለተኛ ደረጃ መካከለኛ ማጠቃለያና ዝግጅት (General Secondary Final)',
      color: 'from-sky-600 to-cyan-700',
    },
    {
      grade: 'Grade 11',
      label: 'ክፍል 11 (Grade 11)',
      desc: 'የተፈጥሮ ሳይንስ እና የማህበራዊ ሳይንስ ዘርፎች (Streamed Secondary)',
      color: 'from-amber-600 to-orange-700',
    },
    {
      grade: 'Grade 12',
      label: 'ክፍል 12 (Grade 12)',
      desc: 'የዩኒቨርስቲ መግቢያ ብሔራዊ ፈተና ESSLCE / EAES ዝግጅት (National Exam)',
      color: 'from-purple-600 to-indigo-700',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Top Header with Language Selector (Authorized Location #1) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                {t.newCurriculumTag}
              </span>
              <h2 className="text-sm font-bold text-white">{t.appName}</h2>
            </div>
          </div>

          {/* Language Selector Dropdown in Modal */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 hidden sm:inline">{t.selectLanguage}:</span>
            <LanguageSelectorDropdown />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {t.selectGrade}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
            በኢፌዴሪ ትምህርት ሚኒስቴር (MoE) 2019 ዓ.ም አዲሱ ስርአተ ትምህርት መሰረት የተዘጋጁ 24 ሞጁሎችን ይማሩ።
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.gradeLockedMessage}</span>
          </div>
        </div>

        {/* Grade Selection Cards */}
        <div className="space-y-2.5 mb-6">
          {grades.map((item) => {
            const isSelected = chosenGrade === item.grade;
            return (
              <button
                key={item.grade}
                type="button"
                onClick={() => setChosenGrade(item.grade)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-500'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm`}
                  >
                    {item.grade.replace('Grade ', 'G-')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{item.label}</span>
                      {isSelected && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                          የተመረጠ
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-700 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Lock & Enter Button */}
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm sm:text-base transition shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          <span>ክፍሌን አረጋግጬ መማር ልጀምር (Confirm & Enter)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

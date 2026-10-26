import React from 'react';
import { TrendingUp, Award, AlertTriangle, BookOpen, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { researchAnalysisService } from '../../services/researchAnalysisService';

export const StudentLearningReviewView: React.FC = () => {
  const { user, selectedGrade, progress } = useAuth();

  const handleDownloadDiagnostic = () => {
    if (!user) return;
    const reportData = researchAnalysisService.generateStudentDiagnosticSummary(user, progress);
    researchAnalysisService.downloadDiagnosticTextReport(reportData);
  };

  const subjectMastery = [
    { subject: 'Physics', score: 86, status: 'Strong Mastery', color: 'emerald' },
    { subject: 'Chemistry', score: 78, status: 'Proficient', color: 'teal' },
    { subject: 'Mathematics', score: 84, status: 'Strong Mastery', color: 'emerald' },
    { subject: 'Biology', score: 68, status: 'Needs Revision', color: 'amber' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs text-emerald-400 font-bold block mb-1">
            Category 3: የእኔ የመማሪያ ግምገማ (Student Learning Review)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Diagnostic Strength & Weakness Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time radar of topic competencies, quiz performances, and targeted study recommendations.
          </p>
        </div>

        <button
          onClick={handleDownloadDiagnostic}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition shadow-xs"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Download MoE Report</span>
        </button>
      </div>

      {/* Grid of Subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjectMastery.map((s) => (
          <div key={s.subject} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">{s.subject}</span>
              <span className="font-mono text-xs font-bold text-emerald-400">{s.score}%</span>
            </div>

            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full ${s.score >= 80 ? 'bg-emerald-500' : s.score >= 70 ? 'bg-teal-500' : 'bg-amber-500'}`}
                style={{ width: `${s.score}%` }}
              />
            </div>

            <span className="text-[11px] text-slate-400 block font-medium">{s.status}</span>
          </div>
        ))}
      </div>

      {/* Mistake Book Summary */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-sm font-bold text-white">Mistake Book (ደካማ ጎን ማረሚያ)</h3>
        </div>
        <p className="text-xs text-slate-400">
          Questions answered incorrectly on quizzes are saved here with MoE pedagogical explanations so you can review them before national exams.
        </p>

        {progress.mistakeBook.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs text-slate-500">
            No mistakes recorded yet! Take practice quizzes in Category 2 to benchmark your understanding.
          </div>
        ) : (
          <div className="space-y-2">
            {progress.mistakeBook.map((m) => (
              <div key={m.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-slate-200 block">{m.question}</span>
                <p className="text-rose-400 text-[11px]">Your Answer: {m.chosenAnswer}</p>
                <p className="text-emerald-400 text-[11px]">Correct: {m.correctAnswer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLearningReviewView;

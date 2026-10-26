import React, { useState } from 'react';
import { FileText, Upload, CheckCircle2, Clock, Award, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export const AcademicWorkHubView: React.FC = () => {
  const { selectedGrade } = useAuth();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('hw1');
  const [submissionText, setSubmissionText] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState<Record<string, boolean>>({ hw2: true });

  const assignments = [
    {
      id: 'hw1',
      title: 'Derivation of First Law of Thermodynamics for Isobaric Mitad Expansion',
      subject: 'Physics',
      dueDate: '2026-10-30',
      rubric: '1. Governing algebraic equations stated (4 pts)\n2. Dimensional consistency verified (3 pts)\n3. Everyday Ethiopian heat transfer analogy integrated (3 pts)',
    },
    {
      id: 'hw2',
      title: 'Le Chatelier Equilibrium Calculations for Haber-Bosch Fertilizer Plants',
      subject: 'Chemistry',
      dueDate: '2026-11-02',
      rubric: '1. Equilibrium constant K_eq formulated (5 pts)\n2. Partial pressures evaluated (5 pts)',
    },
  ];

  const handleSubmitting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    setSubmittedStatus((prev) => ({ ...prev, [selectedAssignmentId]: true }));
    setSubmissionText('');
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
  };

  const activeHw = assignments.find((a) => a.id === selectedAssignmentId) || assignments[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs text-blue-400 font-bold block mb-1">
          Category 2: የቤት ስራ ፣ አሳይመንት እና ፕሮጀክት (Homework & Academic Work Hub)
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {selectedGrade} Academic Assignments & Projects
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Submit secondary coursework, view teacher grading rubrics, and earn completion certificates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Assignment List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assignments</h3>
          {assignments.map((a) => (
            <div
              key={a.id}
              onClick={() => setSelectedAssignmentId(a.id)}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition space-y-1 ${
                selectedAssignmentId === a.id
                  ? 'bg-blue-500/10 border-blue-500 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-blue-400 font-bold">{a.subject}</span>
                {submittedStatus[a.id] ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3 h-3" /> Submitted
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-400 font-mono">Due {a.dueDate}</span>
                )}
              </div>
              <p className="font-semibold line-clamp-2">{a.title}</p>
            </div>
          ))}
        </div>

        {/* Submission Panel */}
        <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-5">
          <div>
            <span className="text-xs font-mono text-blue-400">{activeHw.subject}</span>
            <h3 className="text-base font-bold text-white mt-1">{activeHw.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Due Date: {activeHw.dueDate}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
            <span className="font-bold text-slate-300 block">Grading Rubric (10 Points Total):</span>
            <p className="text-slate-400 whitespace-pre-line leading-relaxed">{activeHw.rubric}</p>
          </div>

          {submittedStatus[activeHw.id] ? (
            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-200">Assignment Submitted</h4>
              <p className="text-xs text-slate-400">
                Your submission has been securely recorded in the school registry. Instructor feedback pending.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitting} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Your Solution & Derivation:
                </label>
                <textarea
                  rows={6}
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Type your algebraic steps, final numerical answer with SI units, and curriculum citations..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={!submissionText.trim()}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Assignment for Rubric Grading</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicWorkHubView;

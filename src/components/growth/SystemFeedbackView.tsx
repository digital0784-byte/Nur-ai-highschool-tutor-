import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SystemFeedbackView: React.FC = () => {
  const { user, selectedGrade } = useAuth();
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState<'Curriculum Clarification' | 'Bug Report' | 'New Feature'>('Curriculum Clarification');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitted(true);
    setFeedback('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs text-teal-400 font-bold block mb-1">
          Category 4: የተጠቃሚ አስተያየቶች (Feedback & Suggestions)
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Student Feedback & Curriculum Clarification
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Submit corrections, report textbook discrepancies, or suggest features directly to the MoE system team.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-200">Thank You for Your Feedback!</h4>
            <p className="text-xs text-slate-400">
              Your note has been submitted to the NUR AI educational engineering team for review.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Feedback Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
              >
                <option value="Curriculum Clarification">Curriculum / Textbook Clarification</option>
                <option value="Bug Report">Technical Bug Report</option>
                <option value="New Feature">Feature or Subject Request</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Your Message:</label>
              <textarea
                rows={5}
                required
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Explain the textbook topic or system feature in detail..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={!feedback.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Feedback</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SystemFeedbackView;

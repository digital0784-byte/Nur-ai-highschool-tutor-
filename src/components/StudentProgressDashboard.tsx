import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  BookOpen,
  Flame,
  AlertCircle,
  CheckCircle2,
  Clock,
  User,
  Sparkles,
  BookMarked,
  ShieldCheck,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CitationBadge } from './CitationBadge';

interface StudentProgressDashboardProps {
  onPracticeTopic?: (topic: string) => void;
}

export const StudentProgressDashboard: React.FC<StudentProgressDashboardProps> = ({
  onPracticeTopic,
}) => {
  const { user, progress, markMistakeReviewed, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'mistakeBook' | 'profile'>('overview');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [schoolName, setSchoolName] = useState(user?.schoolName || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ displayName, schoolName });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const unreviewedMistakes = progress.mistakeBook.filter((m) => !m.reviewed);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            Personal Learning Analytics
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {user?.displayName || 'Student'}’s Study Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {user?.grade} • {user?.stream} • {user?.schoolName || 'FDRE MoE Secondary School'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('mistakeBook')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'mistakeBook'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Mistake Book</span>
            {unreviewedMistakes.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                {unreviewedMistakes.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'profile'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Profile
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center mb-2">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="block text-2xl font-black text-white font-mono">
                {progress.lessonsCompleted}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Lessons Completed
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 mx-auto flex items-center justify-center mb-2">
                <Award className="w-4 h-4" />
              </div>
              <span className="block text-2xl font-black text-white font-mono">
                {progress.quizzesTaken}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Quizzes Taken
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 mx-auto flex items-center justify-center mb-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="block text-2xl font-black text-emerald-400 font-mono">
                {progress.averageScore}%
              </span>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Average Score
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center mb-2">
                <Flame className="w-4 h-4" />
              </div>
              <span className="block text-2xl font-black text-amber-400 font-mono">
                {progress.studyStreakDays} Days
              </span>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Study Streak
              </span>
            </div>
          </div>

          {/* Weak Topics Analysis Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">Identified Weak Topics for Revision</h3>
              </div>
              <span className="text-xs text-slate-400">Based on recent quiz attempts</span>
            </div>

            <div className="space-y-2.5">
              {progress.weakTopics.map((topic, i) => (
                <div
                  key={i}
                  className="bg-slate-950 border border-slate-800/80 rounded-2xl p-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold flex items-center justify-center font-mono">
                      {i + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{topic}</span>
                  </div>

                  {onPracticeTopic && (
                    <button
                      onClick={() => onPracticeTopic(topic)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Review in Tutor</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Subscription Tier Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Subscription Plan
                </span>
                <h4 className="text-sm font-bold text-white">{user?.subscriptionPlan || 'Active Plan'}</h4>
                <p className="text-xs text-slate-400">Status: <span className="text-emerald-400 font-semibold uppercase">{user?.subscriptionStatus}</span> (Valid until {user?.subscriptionExpiresAt || 'End of Academic Year'})</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mistake Book Tab */}
      {activeTab === 'mistakeBook' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-rose-400" />
              <div>
                <h3 className="text-sm font-bold text-white">The Mistake Book (የስህተቶች ማስታወሻ)</h3>
                <p className="text-xs text-slate-400">Review wrong choices from practice exams to avoid repeating traps.</p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {progress.mistakeBook.length} logged errors
            </span>
          </div>

          {progress.mistakeBook.map((item) => (
            <div
              key={item.id}
              className={`bg-slate-900 border rounded-3xl p-5 space-y-3 shadow-md transition ${
                item.reviewed ? 'border-slate-800 opacity-70' : 'border-rose-500/40 bg-rose-950/10'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
                    {item.subject}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{item.topic}</span>
                </div>
                <span className="text-[11px] text-slate-500">{item.date}</span>
              </div>

              <h4 className="text-sm font-bold text-white">{item.question}</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300">
                  <span className="font-bold block text-[10px] uppercase">Your Selected Option:</span>
                  <span>{item.chosenAnswer}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                  <span className="font-bold block text-[10px] uppercase">Official Correct Option:</span>
                  <span>{item.correctAnswer}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                {item.explanation}
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-mono text-emerald-400">{item.citation}</span>
                {!item.reviewed ? (
                  <button
                    onClick={() => markMistakeReviewed(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark as Mastered</span>
                  </button>
                ) : (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Mastered
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Profile Settings Tab */}
      {activeTab === 'profile' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Student Profile Settings</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Full Name / Display Name:
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                School Name / Region:
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Enrolled Grade:
                </label>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 font-semibold">
                  {user?.grade}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Stream:
                </label>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 font-semibold">
                  {user?.stream}
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between">
              {isSaved ? (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Profile updated successfully!
                </span>
              ) : <span></span>}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-md shadow-emerald-900/30"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { User, Flame, Award, BookOpen, Target, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const StudentPortalDashboard: React.FC = () => {
  const { user, selectedGrade, progress } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>FDRE MoE Secondary Standard (2019 E.C.)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {user?.displayName || 'Ethiopian High School Student'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Enrolled: <strong className="text-white">{selectedGrade}</strong> ({user?.stream || 'Natural Science'}) • {user?.schoolName || 'Addis Ababa Secondary High School'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 border border-amber-500/30 px-4 py-3 rounded-2xl text-center">
              <span className="flex items-center justify-center gap-1 text-xs text-amber-400 font-bold mb-1">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>Streak</span>
              </span>
              <span className="text-2xl font-black text-white font-mono">{progress.studyStreakDays}</span>
              <span className="text-[10px] text-slate-400 block">Days Active</span>
            </div>

            <div className="bg-slate-950/80 border border-emerald-500/30 px-4 py-3 rounded-2xl text-center">
              <span className="flex items-center justify-center gap-1 text-xs text-emerald-400 font-bold mb-1">
                <Award className="w-4 h-4" />
                <span>Rank</span>
              </span>
              <span className="text-xs font-black text-emerald-300 block">{progress.currentLevel || 'Bronze Scholar'}</span>
              <span className="text-[10px] text-slate-400 block mt-1 font-mono">{progress.xpPoints || 340} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Lessons Done</span>
          <span className="text-xl font-black text-white">{progress.lessonsCompleted}</span>
          <span className="text-[11px] text-emerald-400 block mt-0.5">MoE Syllabus Units</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Quizzes Taken</span>
          <span className="text-xl font-black text-white">{progress.quizzesTaken}</span>
          <span className="text-[11px] text-teal-400 block mt-0.5">Timed Assessments</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Average Score</span>
          <span className="text-xl font-black text-white">{progress.averageScore}%</span>
          <span className="text-[11px] text-emerald-400 block mt-0.5">Diagnostic Accuracy</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Daily Goal</span>
          <span className="text-xl font-black text-white">45 min</span>
          <span className="text-[11px] text-purple-400 block mt-0.5">25 min remaining</span>
        </div>
      </div>
    </div>
  );
};

export default StudentPortalDashboard;

import React from 'react';
import { Award, Flame, Star, Sparkles, Trophy, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const GamificationView: React.FC = () => {
  const { progress } = useAuth();

  const badges = [
    { id: 'b1', name: 'Addis Scholar', desc: 'Completed first 5 curriculum lessons', icon: '🏛️', unlocked: true },
    { id: 'b2', name: 'GERD Hydro Power Master', desc: 'Scored 100% on Electromagnetism & Induction quiz', icon: '⚡', unlocked: true },
    { id: 'b3', name: '7-Day Study Fire', desc: 'Maintained a 7-day continuous study streak', icon: '🔥', unlocked: progress.studyStreakDays >= 7 },
    { id: 'b4', name: 'ESSLCE Champion', desc: 'Achieved top 5% national percentile in practice exams', icon: '🏆', unlocked: false },
    { id: 'b5', name: 'Mitad Thermodynamics Ace', desc: 'Derived clay mitad heat transfer equations perfectly', icon: '🥞', unlocked: true },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs text-amber-400 font-bold block mb-1">
          Category 4: የተማሪ ማበረታቻ እና ባጆች (Gamification & Badges)
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Badges, Scholar Ranks & Study Streaks
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Earn XP points, unlock Ethiopian academic achievement badges, and climb the national scholar leaderboard.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((b) => (
          <div
            key={b.id}
            className={`p-5 rounded-2xl border transition space-y-3 ${
              b.unlocked
                ? 'bg-slate-900/80 border-amber-500/40 shadow-lg shadow-amber-950/20'
                : 'bg-slate-950/40 border-slate-900 opacity-60'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl">
              {b.icon}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{b.name}</h3>
                {b.unlocked && <span className="text-[10px] text-amber-400 font-mono font-bold">UNLOCKED</span>}
              </div>
              <p className="text-xs text-slate-400 mt-1">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamificationView;

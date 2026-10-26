import React from 'react';
import { Sparkles, Video, PlaySquare, Check, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PremiumLearningCenterView: React.FC = () => {
  const { selectedGrade } = useAuth();

  const bundles = [
    {
      title: 'ESSLCE National Exam Masterclass Bundle',
      features: ['10+ Past Paper Deep Walkthroughs', 'Exam Distractor Trap Analysis', 'Time Management Shortcuts'],
      status: 'Active via Subscription',
      tag: 'High Yield',
    },
    {
      title: 'Virtual 3D Science Lab Simulations',
      features: ['Projectile Range Simulator', 'Mitad Thermodynamics Lab', 'Electromagnetic Turbine Induction'],
      status: 'Interactive Access',
      tag: 'Interactive',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs text-amber-400 font-bold block mb-1">
          Category 4: ፕሪሚየም የትምህርት ማዕከል (Premium Learning Center)
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Advanced Masterclasses & 3D STEM Lab Simulations
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Supplemental deep-dive video masterclasses and virtual interactive laboratory models.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {bundles.map((b, idx) => (
          <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-mono text-[10px] font-bold">
                {b.tag}
              </span>
              <span className="text-xs text-emerald-400 font-semibold">{b.status}</span>
            </div>

            <h3 className="text-base font-bold text-white">{b.title}</h3>

            <div className="space-y-2 pt-1 text-xs text-slate-300">
              {b.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumLearningCenterView;

import React from 'react';
import { Bookmark, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SupplementaryBooksView: React.FC = () => {
  const { selectedGrade } = useAuth();

  const references = [
    {
      title: 'OpenStax University Physics (Vol 1-3)',
      priority: 'Level 2 Reference',
      subject: 'Physics',
      desc: 'Deep multi-variable extensions to classical mechanics, fluid dynamics, and thermodynamics.',
    },
    {
      title: 'Brown & LeMay: Chemistry - The Central Science',
      priority: 'Level 3 Reference',
      subject: 'Chemistry',
      desc: 'Rigorous atomic orbital overlap theory and advanced industrial equilibrium systems.',
    },
    {
      title: 'Campbell Biology (12th Edition)',
      priority: 'Level 4 Reference',
      subject: 'Biology',
      desc: 'Cellular biochemistry, metabolic pathways, and molecular genetics.',
    },
    {
      title: 'Stewart Calculus: Early Transcendentals',
      priority: 'Level 5 Reference',
      subject: 'Mathematics',
      desc: 'Differential and integral calculus with applied secondary kinematics derivations.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs text-cyan-400 font-bold block mb-1">
          Category 1: አጋዥ መፅሀፍት (Supplementary Reference Library)
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Approved University & Secondary Extensions
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Peer-reviewed university references providing comparative context and university preparation (Layer 2).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {references.map((r, i) => (
          <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono text-[10px] font-bold">
                {r.priority}
              </span>
              <span className="text-xs text-slate-400 font-mono">{r.subject}</span>
            </div>

            <h3 className="text-sm font-bold text-white">{r.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplementaryBooksView;

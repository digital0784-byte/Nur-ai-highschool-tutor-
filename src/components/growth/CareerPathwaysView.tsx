import React from 'react';
import { Compass, GraduationCap, Building2, Briefcase, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CareerPathwaysView: React.FC = () => {
  const { selectedGrade } = useAuth();

  const pathways = [
    {
      title: 'Electrical & Power Engineering (የኤሌክትሪክ ኢንጂነሪንግ)',
      stream: 'Natural Science',
      universities: ['Addis Ababa University (AAiT)', 'ASTU (Adama)', 'AUST (Hawassa)'],
      careerOutlook: 'Grid engineering at Ethiopian Electric Power (EEP), GERD management, telecommunications.',
      keySecondarySubjects: 'Physics (Electromagnetism), Mathematics (Calculus)',
    },
    {
      title: 'Biomedical & Medical Sciences (የህክምና ሳይንስ)',
      stream: 'Natural Science',
      universities: ['Tikur Anbessa (AAU Health Sciences)', 'Jimma University', 'Gondar University'],
      careerOutlook: 'Clinical medicine, pharmaceutical chemistry, public health in regional referral hospitals.',
      keySecondarySubjects: 'Biology (Cell & Genetics), Chemistry (Organic Reactions)',
    },
    {
      title: 'Economics & Development Planning (ኢኮኖሚክስ እና ልማት)',
      stream: 'Social Science',
      universities: ['Addis Ababa University (FBE)', 'Hawassa University', 'Bahir Dar University'],
      careerOutlook: 'Macroeconomic policy, National Bank of Ethiopia (NBE), international development agencies.',
      keySecondarySubjects: 'Economics (Micro & Macro), Mathematics (Statistics)',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs text-sky-400 font-bold block mb-1">
          Category 4: የወደፊት አላማ እና ሙያ (Career Pathways & Higher Education)
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Ethiopian Higher Education & STEM Career Tracks
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Map your secondary school subject mastery to Ethiopian public university entrance requirements and industry careers.
        </p>
      </div>

      <div className="space-y-4">
        {pathways.map((p, idx) => (
          <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span>{p.title}</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 font-mono text-[10px] font-bold w-fit">
                {p.stream}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block font-semibold mb-1">Target Universities:</span>
                <span className="text-slate-200">{p.universities.join(', ')}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block font-semibold mb-1">Required High School Mastery:</span>
                <span className="text-emerald-400 font-medium">{p.keySecondarySubjects}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              <strong className="text-slate-300">Industry Outlook:</strong> {p.careerOutlook}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerPathwaysView;

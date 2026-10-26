import React from 'react';
import { EsslceExamArena } from '../EsslceExamArena';
import { useAuth } from '../../context/AuthContext';

export const EntranceExamPrepView: React.FC = () => {
  const { selectedGrade } = useAuth();

  return (
    <div className="py-2">
      <EsslceExamArena
        currentGrade={selectedGrade}
        subject="Physics"
        onAskTutorAboutQuestion={(q, ctx) => {
          console.log('Ask tutor from EntranceExamPrep:', q, ctx);
        }}
      />
    </div>
  );
};

export default EntranceExamPrepView;

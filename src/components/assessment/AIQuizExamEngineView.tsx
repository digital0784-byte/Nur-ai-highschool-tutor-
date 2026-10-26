import React from 'react';
import { EsslceExamArena } from '../EsslceExamArena';
import { useAuth } from '../../context/AuthContext';

export const AIQuizExamEngineView: React.FC = () => {
  const { selectedGrade } = useAuth();

  return (
    <div className="py-4">
      <EsslceExamArena
        currentGrade={selectedGrade}
        subject="Physics"
        onAskTutorAboutQuestion={(q, ctx) => {
          console.log('Ask tutor:', q, ctx);
        }}
      />
    </div>
  );
};

export default AIQuizExamEngineView;

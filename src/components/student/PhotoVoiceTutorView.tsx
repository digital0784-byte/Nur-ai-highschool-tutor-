import React from 'react';
import { ImageQuestionSolver } from '../ImageQuestionSolver';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const PhotoVoiceTutorView: React.FC = () => {
  const { selectedGrade } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="py-2">
      <ImageQuestionSolver
        currentGrade={selectedGrade}
        subject="Physics"
        language={language === 'am' ? 'Amharic' : 'English'}
        onSendToChat={(problem, solution) => {
          console.log('Send to chat:', problem, solution);
        }}
      />
    </div>
  );
};

export default PhotoVoiceTutorView;

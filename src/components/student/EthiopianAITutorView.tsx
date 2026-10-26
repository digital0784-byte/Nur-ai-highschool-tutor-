import React from 'react';
import { ChatTutor } from '../ChatTutor';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const EthiopianAITutorView: React.FC = () => {
  const { selectedGrade, user } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="py-2 h-full">
      <ChatTutor
        currentGrade={selectedGrade}
        subject="Physics"
        stream={user?.stream || 'Natural Science'}
        language={language === 'am' ? 'Amharic' : language === 'om' ? 'Afaan Oromoo' : language === 'ti' ? 'Tigrinya' : 'English'}
        learningMode="GUIDED"
        setLearningMode={() => {}}
        activeExcerpt={null}
        onClearActiveExcerpt={() => {}}
        onNavigateToExcerpt={() => {}}
      />
    </div>
  );
};

export default EthiopianAITutorView;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProgress, MistakeItem, EthiopianGrade } from '../types';
import { useAuth } from './AuthContext';

interface ProgressContextType {
  progress: StudentProgress;
  addXP: (points: number) => void;
  recordLessonCompleted: () => void;
  recordQuizScore: (scorePercent: number, topic: string) => void;
  addMistake: (mistake: Omit<MistakeItem, 'id' | 'date' | 'reviewed'>) => void;
  markMistakeReviewed: (id: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('app_student_xp');
    return saved ? parseInt(saved, 10) : 340;
  });

  const addXP = (points: number) => {
    setXp((prev) => {
      const next = prev + points;
      localStorage.setItem('app_student_xp', next.toString());
      return next;
    });
  };

  const getLevel = (totalXp: number): StudentProgress['currentLevel'] => {
    if (totalXp >= 1000) return 'National MoE Laureate';
    if (totalXp >= 500) return 'Gold Scholar';
    if (totalXp >= 250) return 'Silver Scholar';
    return 'Bronze Scholar';
  };

  const progress: StudentProgress = {
    ...auth.progress,
    xpPoints: xp,
    currentLevel: getLevel(xp),
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        addXP,
        recordLessonCompleted: auth.recordLessonCompleted,
        recordQuizScore: (score, topic) => {
          auth.recordQuizScore(score, topic);
          addXP(score >= 80 ? 50 : 25);
        },
        addMistake: auth.addMistake,
        markMistakeReviewed: auth.markMistakeReviewed,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

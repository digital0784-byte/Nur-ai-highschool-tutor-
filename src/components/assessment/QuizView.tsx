import React, { useState } from 'react';
import { Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import confetti from 'canvas-confetti';

export const QuizView: React.FC = () => {
  const { t } = useLanguage();
  const { selectedGrade, recordQuizScore, addMistake } = useAuth();

  const questions = [
    {
      id: 'q1',
      question: 'Which of the following describes the trajectory of an ideal projectile in a uniform gravitational field without air resistance?',
      options: [
        'A) Pure hyperbolic path',
        'B) Parabolic curve given by y = x tan θ - (g x²) / (2v₀² cos² θ)',
        'C) Straight oblique line with constant speed',
        'D) Semi-circular trajectory with changing radius'
      ],
      correctIndex: 1,
      explanation: 'According to the MoE Grade 11 Physics textbook (Unit 2), horizontal velocity is constant (v_x = v₀ cos θ) and vertical acceleration is constant (a_y = -g), yielding the classic parabolic trajectory equation.',
      citation: '[FDRE MoE Grade 11 Physics Unit 2 p. 52]',
      examTrap: 'Confusing circular motion equations with parabolic gravitational projectile trajectories.'
    },
    {
      id: 'q2',
      question: 'In the Ethiopian power grid, electricity generated at the Great Ethiopian Renaissance Dam (GERD) is stepped up to high voltages for long-distance transmission primarily to:',
      options: [
        'A) Increase resistance in copper cables',
        'B) Minimize Joule heating losses (I²R) by drastically reducing current',
        'C) Convert AC power directly into DC power without inverters',
        'D) Eliminate the need for step-down transformer stations'
      ],
      correctIndex: 1,
      explanation: 'Since transmitted power is P = V · I, stepping up voltage reduces current I proportionally. Transmission line power loss is P_loss = I²R; thus reducing current minimizes thermal energy loss over national distances.',
      citation: '[FDRE MoE Grade 12 Physics Unit 2 p. 98]',
      examTrap: 'Assuming high voltage increases energy loss rather than minimizing current.'
    },
    {
      id: 'q3',
      question: 'What is the electronic configuration of Chromium (Cr, Atomic number Z = 24)?',
      options: [
        'A) [Ar] 4s² 3d⁴',
        'B) [Ar] 4s¹ 3d⁵',
        'C) [Ar] 4s⁰ 3d⁶',
        'D) [Ne] 3s² 3p⁶ 4s²'
      ],
      correctIndex: 1,
      explanation: 'Chromium has an anomalous configuration where one 4s electron is promoted to 3d to achieve a half-filled 3d⁵ subshell, which provides extra exchange energy stability.',
      citation: '[FDRE MoE Grade 11 Chemistry Unit 1 p. 34]',
      examTrap: 'Strictly applying Aufbau principle without accounting for half-filled d-orbital exchange stability.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      addMistake({
        subject: 'Physics/Chemistry',
        topic: 'Core MoE Concepts',
        question: currentQ.question,
        chosenAnswer: currentQ.options[selectedOption],
        correctAnswer: currentQ.options[currentQ.correctIndex],
        explanation: currentQ.explanation,
        citation: currentQ.citation,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      const finalScorePercent = Math.round(((score + (selectedOption === currentQ.correctIndex ? 1 : 0)) / questions.length) * 100);
      recordQuizScore(finalScorePercent, 'High School Core Quiz');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-rose-400 font-bold block mb-1">
            Category 2: ፈተና እና ጥያቄዎች (Interactive Timed Quizzes)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {selectedGrade} Curriculum Mastery Quiz
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-rose-400" />
          <span>Question {currentIndex + 1} of {questions.length}</span>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400 block">{currentQ.citation}</span>
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnClass = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (idx === currentQ.correctIndex) {
                  btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                } else if (isSelected) {
                  btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
                }
              } else if (isSelected) {
                btnClass = 'bg-rose-500/10 border-rose-500 text-rose-300';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isAnswerSubmitted && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && idx !== currentQ.correctIndex && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanations */}
          {isAnswerSubmitted && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                <span className="font-bold text-emerald-400 block">MoE Pedagogical Justification:</span>
                <p className="leading-relaxed">{currentQ.explanation}</p>
                {currentQ.examTrap && (
                  <p className="text-amber-400 text-[11px] pt-1">
                    ⚠️ <strong>Exam Trap:</strong> {currentQ.examTrap}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold transition shadow-md"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-white">Quiz Completed!</h3>
          <p className="text-sm text-slate-300">
            You scored <span className="font-bold text-emerald-400">{score}</span> out of{' '}
            <span className="font-bold text-white">{questions.length}</span> (
            {Math.round((score / questions.length) * 100)}%)
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Practice Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizView;

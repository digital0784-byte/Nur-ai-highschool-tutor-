import React, { useState, useEffect } from 'react';
import {
  Award,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ESSLCE_QUESTION_BANK, EsslceQuestion } from '../data/curriculumData';
import { CitationBadge } from './CitationBadge';
import { AudioPlayerButton } from './AudioPlayerButton';

interface EsslceExamArenaProps {
  currentGrade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  subject: string;
  onAskTutorAboutQuestion: (questionText: string, context: string) => void;
}

export const EsslceExamArena: React.FC<EsslceExamArenaProps> = ({
  currentGrade,
  subject,
  onAskTutorAboutQuestion,
}) => {
  const [questions, setQuestions] = useState<EsslceQuestion[]>(ESSLCE_QUESTION_BANK);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [isGeneratingAiQuestion, setIsGeneratingAiQuestion] = useState(false);
  const [filterSubject, setFilterSubject] = useState<string>('All');

  // Timer state
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Filter questions according to subject if selected
  const activeQuestions = questions.filter(
    (q) => filterSubject === 'All' || q.subject.toLowerCase() === filterSubject.toLowerCase()
  );

  const currentQ = activeQuestions[currentIndex] || activeQuestions[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0 && !isExamCompleted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setIsExamCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, isExamCompleted]);

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswerSubmitted[currentIndex] || isExamCompleted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleSubmitCurrentAnswer = () => {
    if (selectedAnswers[currentIndex] === undefined) return;

    setIsAnswerSubmitted((prev) => ({
      ...prev,
      [currentIndex]: true,
    }));

    if (selectedAnswers[currentIndex] === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }

    // If last question, mark complete and trigger confetti if score is great
    if (currentIndex === activeQuestions.length - 1) {
      setIsExamCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsAnswerSubmitted({});
    setScore(0);
    setCurrentIndex(0);
    setTimeLeft(15 * 60);
    setIsTimerRunning(true);
    setIsExamCompleted(false);
  };

  const handleGenerateAiQuestion = async () => {
    setIsGeneratingAiQuestion(true);
    try {
      const response = await fetch('/api/generate-esslce-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: currentGrade,
          subject: subject,
          unit: 'Unit 2',
          topic: 'Curriculum Core Mastery',
          language: 'English',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate question');
      }

      const generated: any = await response.json();
      if (generated && generated.question && generated.options) {
        const newQuestion: EsslceQuestion = {
          id: `ai-gen-${Date.now()}`,
          grade: 'Grade 12',
          subject: subject,
          stream: 'Natural Science',
          year: 'AI Generated MoE ESSLCE Standard',
          unit: 'MoE Core Topic',
          topic: 'High-Yield Drill',
          citation: generated.citation || `[FDRE MoE Citation: ${currentGrade} ${subject} | ESSLCE Syllabus]`,
          question: generated.question,
          options: generated.options,
          correctIndex: generated.correctIndex ?? 0,
          explanation: generated.explanation || 'Detailed derivation based on MoE curriculum standards.',
          examTrap: generated.examTrap || 'Look out for common distractor formulas and sign inversions.',
          learningModeHint: generated.learningModeTip || 'Break into fundamental given quantities first.',
        };

        setQuestions((prev) => [newQuestion, ...prev]);
        setCurrentIndex(0);
        setSelectedAnswers({});
        setIsAnswerSubmitted({});
      }
    } catch (err) {
      console.error('Error generating AI question:', err);
    } finally {
      setIsGeneratingAiQuestion(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const subjectsList = ['All', 'Physics', 'Mathematics', 'Chemistry', 'History', 'Geography'];

  if (!currentQ) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>No questions found for the selected subject.</p>
        <button
          onClick={() => setFilterSubject('All')}
          className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
        >
          Reset Filter
        </button>
      </div>
    );
  }

  const isCurrentSubmitted = isAnswerSubmitted[currentIndex];
  const userChoice = selectedAnswers[currentIndex];
  const isCorrect = userChoice === currentQ.correctIndex;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Top Exam Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/70 via-slate-900 to-slate-900 border border-purple-500/30 rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            Educational Assessment & Examination Service (EAES / ESSLCE)
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>National Examination Arena</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              Ethiopian Standard
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Official ESSLCE Grade 12 & Ethiopian High School examination drill with verified textbook page citations & exam traps.
          </p>
        </div>

        {/* Exam Controls & Live Timer */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Timer Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2 flex items-center gap-2.5">
            <Clock className={`w-4 h-4 ${timeLeft < 180 ? 'text-rose-400 animate-pulse' : 'text-purple-400'}`} />
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                Time Remaining
              </span>
              <span className={`text-base font-black font-mono ${timeLeft < 180 ? 'text-rose-400' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* AI Generator Button */}
          <button
            onClick={handleGenerateAiQuestion}
            disabled={isGeneratingAiQuestion}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white shadow-md shadow-purple-900/30 transition"
            title="Generate a brand new authentic ESSLCE question using Gemini AI"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGeneratingAiQuestion ? 'Generating...' : 'New AI Question'}</span>
          </button>
        </div>
      </div>

      {/* Subject Filter & Progress Pill Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
            Subject:
          </span>
          {subjectsList.map((s) => (
            <button
              key={s}
              onClick={() => {
                setFilterSubject(s);
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                filterSubject === s
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="text-slate-400">
            Question <span className="text-white font-mono">{currentIndex + 1}</span> of{' '}
            <span className="text-white font-mono">{activeQuestions.length}</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Question Header & Citation */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {currentQ.subject}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentQ.unit} • {currentQ.topic}
              </span>
            </div>
            <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
              {currentQ.year}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = userChoice === idx;
            const isCorrectOption = idx === currentQ.correctIndex;

            let optionStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

            if (isCurrentSubmitted) {
              if (isCorrectOption) {
                optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
              } else if (isSelected && !isCorrectOption) {
                optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
              } else {
                optionStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'bg-purple-950/50 border-purple-500 text-purple-200 font-semibold shadow-md';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isCurrentSubmitted}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-sm sm:text-base ${optionStyle}`}
              >
                <span>{option}</span>

                {isCurrentSubmitted && isCorrectOption && (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isCurrentSubmitted && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Submit or Navigation Controls */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === activeQuestions.length - 1}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
            >
              Next
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!isCurrentSubmitted ? (
              <button
                onClick={handleSubmitCurrentAnswer}
                disabled={userChoice === undefined}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition shadow-md shadow-emerald-900/30"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentIndex === activeQuestions.length - 1}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white transition shadow-md shadow-purple-900/30 flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Detailed Explanation Drawer (shown after submission) */}
        {isCurrentSubmitted && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-in fade-in duration-300">
            {/* Status notification */}
            <div
              className={`p-4 rounded-2xl border flex items-center gap-3 ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}
            >
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
              )}
              <div>
                <span className="font-bold text-sm block">
                  {isCorrect ? 'Correct! Excellent ESSLCE Mastery.' : 'Incorrect Choice.'}
                </span>
                <span className="text-xs opacity-90">
                  {isCorrect
                    ? 'You correctly applied the textbook formulation.'
                    : `The correct answer is Option ${String.fromCharCode(65 + currentQ.correctIndex)}.`}
                </span>
              </div>
            </div>

            {/* Official MoE Citation */}
            <CitationBadge citationText={currentQ.citation} />

            {/* Step-by-Step Textbook Derivation */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm space-y-2">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] block">
                Official MoE Curriculum Solution:
              </span>
              <p className="text-slate-200 leading-relaxed">{currentQ.explanation}</p>
            </div>

            {/* ESSLCE Exam Trap / Distractor Breakdown */}
            {currentQ.examTrap && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs sm:text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px] block mb-1">
                    ESSLCE Exam Trap & Distractor Breakdown
                  </span>
                  <p className="text-slate-300 leading-relaxed">{currentQ.examTrap}</p>
                </div>
              </div>
            )}

            {/* Beginner Intuitive Hint */}
            {currentQ.learningModeHint && (
              <div className="p-3.5 rounded-2xl bg-sky-950/30 border border-sky-500/30 text-xs sm:text-sm flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sky-300 uppercase tracking-wider text-[10px] block mb-0.5">
                    Intuitive Learning Hint
                  </span>
                  <p className="text-slate-300 italic">{currentQ.learningModeHint}</p>
                </div>
              </div>
            )}

            {/* Ask NUR AI to explain deeper */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() =>
                  onAskTutorAboutQuestion(
                    currentQ.question,
                    `Unit: ${currentQ.unit}, Topic: ${currentQ.topic}. Official Citation: ${currentQ.citation}`
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 transition shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask NUR AI to Tutor Me Deeper on This Problem</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Exam Completed Modal/Banner */}
      {isExamCompleted && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-purple-950/80 border border-emerald-500/40 text-center space-y-4 shadow-2xl">
          <Award className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
          <h3 className="text-2xl font-black text-white">
            ESSLCE Practice Session Completed!
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            You achieved a score of{' '}
            <span className="text-emerald-400 font-bold font-mono text-lg">
              {score} / {activeQuestions.length}
            </span>{' '}
            ({Math.round((score / activeQuestions.length) * 100)}%).
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Practice Test</span>
            </button>
            <button
              onClick={handleGenerateAiQuestion}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Fresh Exam Questions</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

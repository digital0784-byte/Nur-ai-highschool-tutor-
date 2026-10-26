import React, { useState } from 'react';
import { Sparkles, RotateCw, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const FlashcardView: React.FC = () => {
  const { selectedGrade } = useAuth();
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  const cards = [
    {
      question: 'What is the governing equation for horizontal range R of a projectile over flat ground?',
      answer: 'R = (v₀² sin 2θ) / g\n(Maximum range occurs when sin 2θ = 1, i.e., launch angle θ = 45°)',
      citation: '[FDRE MoE Grade 11 Physics Unit 2 p. 54]',
      subject: 'Physics',
    },
    {
      question: 'State Le Chatelier’s Principle as applied in Ethiopian industrial chemical synthesis:',
      answer: 'If an equilibrium system is subjected to a disturbance in concentration, pressure, or temperature, the system will adjust to counteract that disturbance and re-establish equilibrium.',
      citation: '[FDRE MoE Grade 11 Chemistry Unit 5 p. 218]',
      subject: 'Chemistry',
    },
    {
      question: 'Why does electricity generated at the GERD hydropower plant get stepped up to 500 kV for transmission?',
      answer: 'P = V · I implies that increasing voltage V reduces current I proportionally. Thermal power loss in transmission lines is P_loss = I²R. Reducing current drastically minimizes transmission line energy waste.',
      citation: '[FDRE MoE Grade 12 Physics Unit 2 p. 98]',
      subject: 'Physics',
    },
  ];

  const currentCard = cards[index];

  const handleNext = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div className="text-center space-y-1">
        <span className="text-xs text-amber-400 font-bold block">
          Category 2: ፍላሽ ካርድ (Spaced Repetition Active Recall)
        </span>
        <h2 className="text-2xl font-black text-white">
          {selectedGrade} Spaced Recall Cards
        </h2>
        <p className="text-xs text-slate-400">
          Card {index + 1} of {cards.length} • Tap the card to flip between question and verified answer
        </p>
      </div>

      {/* 3D Flip Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="w-full min-h-[280px] sm:min-h-[320px] rounded-3xl p-6 sm:p-8 cursor-pointer select-none bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-mono text-[10px] font-bold">
            {currentCard.subject}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <RotateCw className="w-3.5 h-3.5" />
            <span>{flipped ? 'Showing Answer' : 'Tap to Flip'}</span>
          </span>
        </div>

        <div className="my-auto py-6 text-center space-y-3">
          {!flipped ? (
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentCard.question}
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-semibold text-emerald-300 whitespace-pre-line leading-relaxed">
                {currentCard.answer}
              </p>
              <span className="inline-block mt-3 text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                {currentCard.citation}
              </span>
            </div>
          )}
        </div>

        <div className="text-center text-[10px] text-slate-500 font-mono">
          FDRE Ministry of Education Standard Excerpt
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={() => setFlipped(!flipped)}
          className="px-5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition"
        >
          {flipped ? 'Show Question' : 'Reveal Answer'}
        </button>

        <button
          onClick={handleNext}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardView;

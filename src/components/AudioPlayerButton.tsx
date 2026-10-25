import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

interface AudioPlayerButtonProps {
  text: string;
  language?: string;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({ text, language = 'English' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSupported(false);
    }
  }, []);

  const handleSpeak = () => {
    if (!isSupported) return;

    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isPlaying && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown and citation tags for clean reading
    const cleanText = text
      .replace(/\[FDRE MoE Citation:[^\]]+\]/g, '')
      .replace(/[#*`_~]/g, '')
      .replace(/A\)|B\)|C\)|D\)/g, '')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Map language
    if (language === 'Amharic') {
      utterance.lang = 'am-ET';
    } else if (language === 'Afaan Oromoo') {
      utterance.lang = 'om-ET';
    } else if (language === 'Tigrinya') {
      utterance.lang = 'ti-ET';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="inline-flex items-center gap-1.5">
      <button
        onClick={handleSpeak}
        title={isPlaying ? (isPaused ? 'Resume reading' : 'Pause reading') : 'Listen to explanation'}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
          isPlaying
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
            : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
        }`}
      >
        {isPlaying ? (
          isPaused ? (
            <>
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Listening...</span>
            </>
          )
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Listen</span>
          </>
        )}
      </button>

      {isPlaying && (
        <button
          onClick={handleStop}
          title="Stop reading"
          className="p-1 rounded-md bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-700 transition"
        >
          <VolumeX className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

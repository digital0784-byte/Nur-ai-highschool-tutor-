import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../data/translations_all';

interface LanguageSelectorDropdownProps {
  compactOnMobile?: boolean;
}

export const LanguageSelectorDropdown: React.FC<LanguageSelectorDropdownProps> = ({
  compactOnMobile = false,
}) => {
  const { language, setLanguage, currentLanguageInfo, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold transition shadow-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
        title="Select Language / ቋንቋ ይምረጡ"
      >
        <span className="text-sm leading-none">{currentLanguageInfo.flag}</span>
        <span className={compactOnMobile ? 'hidden sm:inline font-medium' : 'font-medium'}>
          {currentLanguageInfo.nativeName}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95">
          <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800 tracking-wider">
            ቋንቋ ይምረጡ / Select Language
          </div>
          <div className="py-1">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as SupportedLanguage);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition hover:bg-slate-800 ${
                  language === lang.code
                    ? 'text-emerald-400 font-bold bg-emerald-950/30'
                    : 'text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <div>
                    <span className="block font-semibold">{lang.nativeName}</span>
                    <span className="block text-[10px] text-slate-500">{lang.name}</span>
                  </div>
                </div>
                {language === lang.code && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

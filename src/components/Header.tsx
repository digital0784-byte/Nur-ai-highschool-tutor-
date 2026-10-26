import React from 'react';
import {
  Menu,
  ArrowLeft,
  GraduationCap,
  Lock,
  ShieldCheck,
  User,
  CreditCard,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth, SUPER_ADMIN_EMAIL } from '../context/AuthContext';
import { EthiopianGrade } from '../types';
import { LanguageSelectorDropdown } from './LanguageSelectorDropdown';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  onNavigateBack: () => void;
  canGoBack: boolean;
  onOpenSubscriptionModal: () => void;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileMenu,
  onNavigateBack,
  canGoBack,
  onOpenSubscriptionModal,
  onOpenAuthModal,
}) => {
  const { t, isRTL } = useLanguage();
  const { user, selectedGrade, isSuperAdmin, isGradeLocked, switchGrade, logout, isLoggedIn } = useAuth();

  const grades: EthiopianGrade[] = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      {/* Top Flex Row with Brand Logo, Back Button, and strictly placed LanguageSelectorDropdown */}
      <div className="px-3 sm:px-4 py-2 flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Left Side: Menu Toggle + Back Button + Brand Logo */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition shrink-0"
            title="Open Menu / ሞጁሎችን ክፈት"
          >
            <Menu className="w-5 h-5" />
          </button>

          {canGoBack && (
            <button
              type="button"
              onClick={onNavigateBack}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition shrink-0"
              title={t.back}
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="hidden sm:inline">{t.back}</span>
            </button>
          )}

          {/* Brand Identity */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-500 p-0.5 flex items-center justify-center shrink-0 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xs sm:text-sm font-extrabold text-white truncate leading-tight">
                  {t.appName}
                </h1>
                <span className="hidden lg:inline text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                  2019 ዓ.ም
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate leading-tight hidden xs:block">
                {t.newCurriculumTag}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Grade Lock / Super Admin Switcher + Language Selector (100% visible on small mobile screens ~360px) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Dynamic Grade Switcher for Super Admin vs Strict Lock for Student */}
          {isSuperAdmin ? (
            <div className="flex items-center bg-slate-950 border border-purple-500/50 rounded-xl p-0.5 shadow-sm">
              <span className="text-[9px] font-bold text-purple-400 px-1 hidden md:inline">
                Admin:
              </span>
              {grades.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => switchGrade(g)}
                  className={`px-1.5 sm:px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-bold transition ${
                    selectedGrade === g
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={`Switch to ${g}`}
                >
                  {g.replace('Grade ', 'G')}
                </button>
              ))}
            </div>
          ) : (
            <div
              className="inline-flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-xs"
              title={t.gradeLockedMessage}
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>{selectedGrade.replace('Grade ', 'G-')}</span>
            </div>
          )}

          {/* Authorized Placement #2: Global Header Language Selector Dropdown (Never clipped on 360px) */}
          <LanguageSelectorDropdown compactOnMobile={true} />

          {/* User Account / Auth Toggle */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={onOpenSubscriptionModal}
              className="inline-flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition"
              title="Subscription Status"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline font-mono text-[11px]">Telebirr/CBE</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs"
            >
              {t.common.startLearning}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

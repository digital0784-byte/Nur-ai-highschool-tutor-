import React, { useState } from 'react';
import {
  BookOpen,
  Layers,
  FileText,
  Bookmark,
  PlaySquare,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  Camera,
  Search,
  TrendingUp,
  User,
  Flame,
  Compass,
  Zap,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Lock,
  Cpu,
  X,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export type SystemModuleId =
  | 'lesson'
  | 'curriculum_engine'
  | 'textbook'
  | 'supplementary'
  | 'video_learning'
  | 'assessment_engine'
  | 'entrance_prep'
  | 'objectives_exam'
  | 'quiz'
  | 'flashcards'
  | 'academic_work_hub'
  | 'ai_tutor'
  | 'photo_voice_tutor'
  | 'smart_search'
  | 'student_review'
  | 'student_app'
  | 'gamification'
  | 'career_pathways'
  | 'premium_learning_center'
  | 'subscription_payment'
  | 'system_feedback'
  | 'admin_dashboard'
  | 'security_fortress'
  | 'system_integration';

interface SidebarNavigationProps {
  activeModule: SystemModuleId;
  onSelectModule: (id: SystemModuleId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onNavigateBack: () => void;
  canGoBack: boolean;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeModule,
  onSelectModule,
  isOpenMobile,
  onCloseMobile,
  onNavigateBack,
  canGoBack,
}) => {
  const { t, isRTL } = useLanguage();
  const { isSuperAdmin, role } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const isAdminOrSuper = isSuperAdmin || role === 'admin' || role === 'super_admin';

  interface ModuleDef {
    id: SystemModuleId;
    icon: React.ElementType;
    color: string;
  }

  const category1: ModuleDef[] = [
    { id: 'lesson', icon: BookOpen, color: 'text-emerald-400' },
    { id: 'curriculum_engine', icon: Layers, color: 'text-teal-400' },
    { id: 'textbook', icon: FileText, color: 'text-sky-400' },
    { id: 'supplementary', icon: Bookmark, color: 'text-cyan-400' },
    { id: 'video_learning', icon: PlaySquare, color: 'text-indigo-400' },
  ];

  const category2: ModuleDef[] = [
    { id: 'assessment_engine', icon: Award, color: 'text-purple-400' },
    { id: 'entrance_prep', icon: Zap, color: 'text-amber-400' },
    { id: 'objectives_exam', icon: CheckCircle2, color: 'text-emerald-400' },
    { id: 'quiz', icon: Clock, color: 'text-rose-400' },
    { id: 'flashcards', icon: Sparkles, color: 'text-amber-400' },
    { id: 'academic_work_hub', icon: FileText, color: 'text-blue-400' },
  ];

  const category3: ModuleDef[] = [
    { id: 'ai_tutor', icon: Sparkles, color: 'text-emerald-400' },
    { id: 'photo_voice_tutor', icon: Camera, color: 'text-teal-400' },
    { id: 'smart_search', icon: Search, color: 'text-sky-400' },
    { id: 'student_review', icon: TrendingUp, color: 'text-indigo-400' },
    { id: 'student_app', icon: User, color: 'text-amber-400' },
  ];

  const category4: ModuleDef[] = [
    { id: 'gamification', icon: Flame, color: 'text-amber-400' },
    { id: 'career_pathways', icon: Compass, color: 'text-cyan-400' },
    { id: 'premium_learning_center', icon: Zap, color: 'text-yellow-400' },
    { id: 'subscription_payment', icon: CreditCard, color: 'text-emerald-400' },
    { id: 'system_feedback', icon: MessageSquare, color: 'text-slate-400' },
  ];

  const category5: ModuleDef[] = [
    { id: 'admin_dashboard', icon: ShieldCheck, color: 'text-purple-400' },
    { id: 'security_fortress', icon: Lock, color: 'text-rose-400' },
    { id: 'system_integration', icon: Cpu, color: 'text-emerald-400' },
  ];

  const filterModules = (list: ModuleDef[]) => {
    if (!searchQuery.trim()) return list;
    return list.filter((m) => {
      const trans = t.modules[m.id];
      if (!trans) return false;
      return (
        trans.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trans.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const renderModuleButton = (item: ModuleDef) => {
    const isCurrent = activeModule === item.id;
    const moduleTrans = t.modules[item.id];
    if (!moduleTrans) return null;

    const Icon = item.icon;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => {
          onSelectModule(item.id);
          onCloseMobile();
        }}
        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2.5 group ${
          isCurrent
            ? 'bg-emerald-500/20 text-white font-bold border border-emerald-500/40 shadow-sm'
            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`p-1.5 rounded-lg shrink-0 ${
              isCurrent ? 'bg-emerald-500/30 text-emerald-300' : 'bg-slate-950 text-slate-400 group-hover:text-emerald-400'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-bold truncate leading-tight">
              {moduleTrans.title}
            </span>
            <span className="block text-[10px] text-slate-400 truncate leading-tight mt-0.5">
              {moduleTrans.subtitle}
            </span>
          </div>
        </div>

        <ChevronRight
          className={`w-3.5 h-3.5 text-slate-500 shrink-0 group-hover:text-slate-300 transition ${
            isRTL ? 'rotate-180' : ''
          }`}
        />
      </button>
    );
  };

  return (
    <>
      {/* Mobile Backdrop Overlay (bg-black/60 backdrop-blur-xs) */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 z-50 md:z-30 w-72 sm:w-80 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Sidebar Header with Back Button and Close */}
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0 bg-slate-950/60">
          <div className="flex items-center gap-2">
            {canGoBack && (
              <button
                type="button"
                onClick={onNavigateBack}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition"
                title={t.back}
              >
                <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                <span>{t.back}</span>
              </button>
            )}
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {t.appName}
            </span>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar inside Sidebar */}
        <div className="p-3 border-b border-slate-800/80 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchModules}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* 24 Modules Grouped Vertically Under 5 Categories */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Category 1: Core Learning & Books */}
          {filterModules(category1).length > 0 && (
            <div>
              <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider block px-2 mb-1.5">
                {t.categories.coreLearning}
              </span>
              <div className="space-y-1">
                {filterModules(category1).map(renderModuleButton)}
              </div>
            </div>
          )}

          {/* Category 2: Exams & Assessment */}
          {filterModules(category2).length > 0 && (
            <div>
              <span className="text-[11px] font-extrabold text-purple-400 uppercase tracking-wider block px-2 mb-1.5">
                {t.categories.examsAssessment}
              </span>
              <div className="space-y-1">
                {filterModules(category2).map(renderModuleButton)}
              </div>
            </div>
          )}

          {/* Category 3: AI & Smart Tools */}
          {filterModules(category3).length > 0 && (
            <div>
              <span className="text-[11px] font-extrabold text-teal-400 uppercase tracking-wider block px-2 mb-1.5">
                {t.categories.aiSmartTools}
              </span>
              <div className="space-y-1">
                {filterModules(category3).map(renderModuleButton)}
              </div>
            </div>
          )}

          {/* Category 4: Growth, Premium & Payment */}
          {filterModules(category4).length > 0 && (
            <div>
              <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block px-2 mb-1.5">
                {t.categories.growthPayment}
              </span>
              <div className="space-y-1">
                {filterModules(category4).map(renderModuleButton)}
              </div>
            </div>
          )}

          {/* Category 5: Administration & Security (Admin / Super Admin Only) */}
          {isAdminOrSuper && filterModules(category5).length > 0 && (
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] font-extrabold text-rose-400 uppercase tracking-wider block px-2 mb-1.5 flex items-center justify-between">
                <span>{t.categories.adminSecurity}</span>
                <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-mono">
                  ERP
                </span>
              </span>
              <div className="space-y-1">
                {filterModules(category5).map(renderModuleButton)}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Super Admin Badge Footer */}
        <div className="p-3 border-t border-slate-800 shrink-0 bg-slate-950/80 text-[10px] text-slate-400">
          {isSuperAdmin ? (
            <div className="flex items-center gap-2 text-purple-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="truncate">{t.lifetimeSuperAdmin}</span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span>FDRE MoE New Curriculum</span>
              <span className="text-emerald-400 font-mono">2019 E.C.</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

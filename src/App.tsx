/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TabBar } from './components/TabBar';
import { ModuleHost } from './components/ModuleHost';
import { WelcomeGradeModal } from './components/WelcomeGradeModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { AuthModal } from './components/AuthModal';
import { SmartSearchModal } from './components/student/SmartSearchModal';
import { SystemModuleId } from './types';

function AppContent() {
  const { t, isRTL } = useLanguage();
  const { selectedGrade, isGradeLocked } = useAuth();

  // Active module & navigation history stack
  const [activeModule, setActiveModule] = useState<SystemModuleId>('lesson');
  const [moduleHistory, setModuleHistory] = useState<SystemModuleId[]>([]);

  // Mobile drawer state
  const [isOpenMobileDrawer, setIsOpenMobileDrawer] = useState(false);

  // Modals state
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Keyboard shortcut Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto prompt welcome grade lock modal on first visit if grade not yet locked
  useEffect(() => {
    const lockedGrade = localStorage.getItem('app_locked_grade');
    if (!lockedGrade) {
      setIsWelcomeModalOpen(true);
    }
  }, []);

  // Handle module selection with history stacking
  const handleSelectModule = (newModule: SystemModuleId) => {
    if (newModule === 'smart_search') {
      setIsSearchModalOpen(true);
      return;
    }
    if (newModule !== activeModule) {
      setModuleHistory((prev) => [...prev.slice(-15), activeModule]);
      setActiveModule(newModule);
    }
    setIsOpenMobileDrawer(false);
  };

  // Handle back navigation
  const handleNavigateBack = () => {
    if (moduleHistory.length > 0) {
      const prev = moduleHistory[moduleHistory.length - 1];
      setModuleHistory((h) => h.slice(0, -1));
      setActiveModule(prev);
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white ${
        isRTL ? 'rtl-layout' : ''
      }`}
    >
      {/* 1. Global Header Navigation (Houses authorized LanguageSelectorDropdown placement #2) */}
      <Header
        onToggleMobileMenu={() => setIsOpenMobileDrawer((prev) => !prev)}
        onNavigateBack={handleNavigateBack}
        canGoBack={moduleHistory.length > 0}
        onOpenSubscriptionModal={() => setIsSubscriptionModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* 2. Breadcrumb Navigation & Quick Module Switcher */}
      <TabBar
        activeModule={activeModule}
        onSelectModule={handleSelectModule}
        onNavigateBack={handleNavigateBack}
        canGoBack={moduleHistory.length > 0}
      />

      {/* 3. Main Layout: 24-Module Vertical Sidebar + Module Host Content */}
      <div className="flex-1 flex min-w-0 max-w-[1920px] w-full mx-auto relative overflow-hidden">
        {/* Vertical Sidebar Navigation with 5 Categories and Mobile Floating Overlay Drawer */}
        <Sidebar
          activeModule={activeModule}
          onSelectModule={handleSelectModule}
          isOpenMobile={isOpenMobileDrawer}
          onCloseMobile={() => setIsOpenMobileDrawer(false)}
          onNavigateBack={handleNavigateBack}
          canGoBack={moduleHistory.length > 0}
        />

        {/* Dynamic Module Host rendering the 24 modules */}
        <main className="flex-1 min-w-0 bg-slate-950 flex flex-col overflow-y-auto">
          <ModuleHost
            activeModule={activeModule}
            onSelectModule={handleSelectModule}
            onOpenSubscriptionModal={() => setIsSubscriptionModalOpen(true)}
          />
        </main>
      </div>

      {/* 4. Welcome / Grade Selection Modal (Houses authorized LanguageSelectorDropdown placement #1) */}
      <WelcomeGradeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
      />

      {/* 5. Telebirr & CBE Payment / Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        currentGrade={selectedGrade}
      />

      {/* 6. User Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* 7. Smart Search Modal */}
      <SmartSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ProgressProvider>
          <SubscriptionProvider>
            <AppContent />
          </SubscriptionProvider>
        </ProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

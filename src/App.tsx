/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatTutor } from './components/ChatTutor';
import { TextbookExplorer } from './components/TextbookExplorer';
import { EsslceExamArena } from './components/EsslceExamArena';
import { StepByStepSolver } from './components/StepByStepSolver';
import { FormulaCards } from './components/FormulaCards';
import { SUBJECTS_BY_STREAM, MoETextbookExcerpt } from './data/curriculumData';
import { BookOpen, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [currentGrade, setGrade] = useState<'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12'>('Grade 11');
  const [stream, setStream] = useState<'Natural Science' | 'Social Science' | 'Common'>('Natural Science');
  const [subject, setSubject] = useState<string>('Physics');
  const [language, setLanguage] = useState<string>('English');
  const [learningMode, setLearningMode] = useState<string>('GUIDED');
  const [activeTab, setActiveTab] = useState<'chat' | 'library' | 'esslce' | 'solver' | 'formulas'>('chat');
  const [activeExcerpt, setActiveExcerpt] = useState<MoETextbookExcerpt | null>(null);

  // Compute available subjects based on grade and stream
  let streamKey: keyof typeof SUBJECTS_BY_STREAM = 'General Secondary (Grades 9-10)';
  if (currentGrade === 'Grade 11' || currentGrade === 'Grade 12') {
    streamKey = stream === 'Social Science' ? 'Social Science (Grades 11-12)' : 'Natural Science (Grades 11-12)';
  }
  const availableSubjects = SUBJECTS_BY_STREAM[streamKey] || ['Physics', 'Mathematics', 'Chemistry', 'Biology', 'English'];

  // Handle grade change and ensure subject is valid
  const handleSetGrade = (newGrade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12') => {
    setGrade(newGrade);
    let newStreamKey: keyof typeof SUBJECTS_BY_STREAM = 'General Secondary (Grades 9-10)';
    if (newGrade === 'Grade 11' || newGrade === 'Grade 12') {
      newStreamKey = stream === 'Social Science' ? 'Social Science (Grades 11-12)' : 'Natural Science (Grades 11-12)';
    }
    const subjects = SUBJECTS_BY_STREAM[newStreamKey];
    if (!subjects.includes(subject)) {
      setSubject(subjects[0]);
    }
  };

  const handleSetStream = (newStream: 'Natural Science' | 'Social Science' | 'Common') => {
    setStream(newStream);
    const newStreamKey = newStream === 'Social Science' ? 'Social Science (Grades 11-12)' : 'Natural Science (Grades 11-12)';
    const subjects = SUBJECTS_BY_STREAM[newStreamKey];
    if (!subjects.includes(subject)) {
      setSubject(subjects[0]);
    }
  };

  // Cross-component navigations
  const handleSelectExcerptForChat = (excerpt: MoETextbookExcerpt) => {
    setActiveExcerpt(excerpt);
    setActiveTab('chat');
  };

  const handleSelectExcerptForSolver = (excerpt: MoETextbookExcerpt) => {
    setActiveExcerpt(excerpt);
    setActiveTab('solver');
  };

  const handleAskTutorAboutQuestion = (questionText: string, context: string) => {
    setActiveExcerpt({
      id: 'dynamic-esslce',
      grade: currentGrade,
      subject: subject as any,
      stream,
      unit: 'ESSLCE National Exam Practice',
      topic: questionText.slice(0, 50) + '...',
      page: 'National Exam Standard',
      summary: questionText,
      keyFormulasOrTerms: [context],
      ethiopianAnalogy: 'Real National Examination Agency (EAES) question review.',
    });
    setActiveTab('chat');
  };

  const handleSendToChat = (problemText: string, solutionText: string) => {
    setActiveExcerpt({
      id: 'dynamic-problem',
      grade: currentGrade,
      subject: subject as any,
      stream,
      unit: 'Step-by-Step Derivation Lab',
      topic: problemText.slice(0, 50) + '...',
      page: 'MoE Derivation Reference',
      summary: solutionText,
      keyFormulasOrTerms: [],
      ethiopianAnalogy: 'Detailed pedagogical calculation review.',
    });
    setActiveTab('chat');
  };

  const handleAskAboutFormula = (topic: string, formula: string) => {
    setActiveExcerpt({
      id: 'dynamic-formula',
      grade: currentGrade,
      subject: subject as any,
      stream,
      unit: 'Formula Deck Review',
      topic: `${topic} (${formula})`,
      page: 'Concept Reference',
      summary: `Inquiry on formula: ${formula}`,
      keyFormulasOrTerms: [formula],
      ethiopianAnalogy: '',
    });
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* App Header with Grade, Stream, Subject, Language, and Mode Switches */}
      <Header
        currentGrade={currentGrade}
        setGrade={handleSetGrade}
        stream={stream}
        setStream={handleSetStream}
        subject={subject}
        setSubject={setSubject}
        language={language}
        setLanguage={setLanguage}
        learningMode={learningMode}
        setLearningMode={setLearningMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        availableSubjects={availableSubjects}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-10">
        {activeTab === 'chat' && (
          <ChatTutor
            currentGrade={currentGrade}
            subject={subject}
            stream={stream}
            language={language}
            learningMode={learningMode}
            setLearningMode={setLearningMode}
            activeExcerpt={activeExcerpt}
            onClearActiveExcerpt={() => setActiveExcerpt(null)}
            onNavigateToExcerpt={(excerpt) => {
              setActiveExcerpt(excerpt);
              setActiveTab('library');
            }}
          />
        )}

        {activeTab === 'library' && (
          <TextbookExplorer
            currentGrade={currentGrade}
            setGrade={handleSetGrade}
            subject={subject}
            setSubject={setSubject}
            onSelectExcerptForChat={handleSelectExcerptForChat}
            onSelectExcerptForSolver={handleSelectExcerptForSolver}
          />
        )}

        {activeTab === 'esslce' && (
          <EsslceExamArena
            currentGrade={currentGrade}
            subject={subject}
            onAskTutorAboutQuestion={handleAskTutorAboutQuestion}
          />
        )}

        {activeTab === 'solver' && (
          <StepByStepSolver
            currentGrade={currentGrade}
            subject={subject}
            language={language}
            onSendToChat={handleSendToChat}
          />
        )}

        {activeTab === 'formulas' && (
          <FormulaCards
            currentGrade={currentGrade}
            subject={subject}
            onAskAboutFormula={handleAskAboutFormula}
          />
        )}
      </main>

      {/* Official MoE Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              <strong>NUR AI (ኑር AI)</strong> • Official Ethiopian High School AI Personal Tutor for Grades 9–12
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>FDRE Ministry of Education (MoE) New Secondary Curriculum</span>
            <span>•</span>
            <span>EAES / ESSLCE Examination Standard</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import { SystemModuleId } from '../types';

// Category 1: Core Learning & Books
import { LessonView } from './learning/LessonView';
import { EthiopianCurriculumEngineView } from './learning/EthiopianCurriculumEngineView';
import { TextbookView } from './learning/TextbookView';
import { SupplementaryBooksView } from './learning/SupplementaryBooksView';
import { VideoLearningView } from './learning/VideoLearningView';

// Category 2: Exams & Assessment
import { AIQuizExamEngineView } from './assessment/AIQuizExamEngineView';
import { ObjectivesExamView } from './assessment/ObjectivesExamView';
import { QuizView } from './assessment/QuizView';
import { FlashcardView } from './assessment/FlashcardView';
import { AcademicWorkHubView } from './assessment/AcademicWorkHubView';
import { EntranceExamPrepView } from './entrance/EntranceExamPrepView';

// Category 3: AI & Smart Tools
import { EthiopianAITutorView } from './student/EthiopianAITutorView';
import { PhotoVoiceTutorView } from './student/PhotoVoiceTutorView';
import { StudentLearningReviewView } from './student/StudentLearningReviewView';
import { StudentPortalDashboard } from './student/StudentPortalDashboard';

// Category 4: Growth, Premium & Payment
import { GamificationView } from './growth/GamificationView';
import { CareerPathwaysView } from './growth/CareerPathwaysView';
import { PremiumLearningCenterView } from './growth/PremiumLearningCenterView';
import { SubscriptionPaymentView } from './growth/SubscriptionPaymentView';
import { SystemFeedbackView } from './growth/SystemFeedbackView';

// Category 5: Administration & Security
import { AdminDashboardView } from './admin/AdminDashboardView';
import { SecurityFortressView } from './admin/SecurityFortressView';
import { SystemIntegrationView } from './admin/SystemIntegrationView';

interface ModuleHostProps {
  activeModule: SystemModuleId;
  onSelectModule: (mod: SystemModuleId) => void;
  onOpenSubscriptionModal: () => void;
}

export const ModuleHost: React.FC<ModuleHostProps> = ({
  activeModule,
  onSelectModule,
  onOpenSubscriptionModal,
}) => {
  switch (activeModule) {
    // 📚 Category 1: ዋና መማሪያ እና መጽሐፍት (Core Learning & Books)
    case 'lesson':
      return <LessonView />;
    case 'curriculum_engine':
      return <EthiopianCurriculumEngineView />;
    case 'textbook':
      return <TextbookView onNavigateToChapterSuite={() => onSelectModule('objectives_exam')} />;
    case 'supplementary':
      return <SupplementaryBooksView />;
    case 'video_learning':
      return <VideoLearningView />;

    // 📝 Category 2: ፈተና እና ምዘና (Exams & Assessment)
    case 'assessment_engine':
      return <AIQuizExamEngineView />;
    case 'entrance_prep':
      return <EntranceExamPrepView />;
    case 'objectives_exam':
      return <ObjectivesExamView />;
    case 'quiz':
      return <QuizView />;
    case 'flashcards':
      return <FlashcardView />;
    case 'academic_work_hub':
      return <AcademicWorkHubView />;

    // 🤖 Category 3: AI እና ስማርት ረዳቶች (AI & Smart Tools)
    case 'ai_tutor':
      return <EthiopianAITutorView />;
    case 'photo_voice_tutor':
      return <PhotoVoiceTutorView />;
    case 'smart_search':
      return <EthiopianCurriculumEngineView />;
    case 'student_review':
      return <StudentLearningReviewView />;
    case 'student_app':
      return <StudentPortalDashboard />;

    // 🌟 Category 4: እድገት፣ ማዕከልና ክፍያ (Growth, Premium & Payment)
    case 'gamification':
      return <GamificationView />;
    case 'career_pathways':
      return <CareerPathwaysView />;
    case 'premium_learning_center':
      return <PremiumLearningCenterView />;
    case 'subscription_payment':
      return <SubscriptionPaymentView />;
    case 'system_feedback':
      return <SystemFeedbackView />;

    // 🛡️ Category 5: አስተዳደርና ደህንነት (Administration & Security)
    case 'admin_dashboard':
      return <AdminDashboardView />;
    case 'security_fortress':
      return <SecurityFortressView />;
    case 'system_integration':
      return <SystemIntegrationView />;

    default:
      return <LessonView />;
  }
};

export default ModuleHost;

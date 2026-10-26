/**
 * Core type definitions for NUR AI High School Tutor System
 * FDRE Ministry of Education New Secondary Curriculum (2019 E.C. / 2026)
 */

export type UserRole = 'student' | 'teacher' | 'admin' | 'super_admin';

export type EthiopianGrade = 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
export type Grade = EthiopianGrade;

export type EthiopianStream = 'Natural Science' | 'Social Science' | 'Common';
export type Stream = EthiopianStream;

export type SubscriptionStatus = 'none' | 'pending' | 'active' | 'expired' | 'rejected';

export type SupportedLanguage = 'am' | 'om' | 'ti' | 'ar' | 'so' | 'en';

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

export type ActiveTab = SystemModuleId;

export interface Topic {
  id: string;
  name: string;
  unit: string;
  grade: EthiopianGrade;
  subject: string;
  textbookPage?: string;
  estimatedMinutes?: number;
  completed?: boolean;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  hint?: string;
  citation: string;
  subject: string;
  unit: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  citation: string;
  examTrap?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  grade: EthiopianGrade;
  stream: EthiopianStream;
  schoolName?: string;
  preferredLanguage: SupportedLanguage | string;
  subscriptionStatus: 'none' | 'pending' | 'active' | 'expired' | 'rejected';
  subscriptionPlan?: string;
  subscriptionExpiresAt?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  grade: EthiopianGrade;
  amountETB: number;
  provider: 'Telebirr' | 'Commercial Bank of Ethiopia (CBE)' | 'Dashen Bank (Amole)' | 'Bank of Abyssinia';
  transactionReference: string;
  receiptImageName?: string;
  status: 'pending' | 'active' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  adminNotes?: string;
}

export interface MistakeItem {
  id: string;
  subject: string;
  topic: string;
  question: string;
  chosenAnswer: string;
  correctAnswer: string;
  explanation: string;
  citation: string;
  date: string;
  reviewed: boolean;
}

export interface StudentProgress {
  lessonsCompleted: number;
  quizzesTaken: number;
  averageScore: number;
  studyStreakDays: number;
  xpPoints?: number;
  currentLevel?: 'Bronze Scholar' | 'Silver Scholar' | 'Gold Scholar' | 'National MoE Laureate';
  lastActive: string;
  weakTopics: string[];
  mistakeBook: MistakeItem[];
}

export interface AuditLogItem {
  id: string;
  action: string;
  actorEmail: string;
  target: string;
  timestamp: string;
  details: string;
}

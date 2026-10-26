import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  EthiopianGrade,
  EthiopianStream,
  SubscriptionStatus,
  PaymentRecord,
  StudentProgress,
  MistakeItem,
  AuditLogItem,
} from '../types';

export const SUPER_ADMIN_EMAIL = 'mejennur669@gmail.com';
export const SUPER_ADMIN_NAME = 'Nuriye Ahmed Adem (ኑርዬ አህመድ አደም)';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isLoggedIn: boolean;
  isSuperAdmin: boolean;
  isGradeLocked: boolean;
  selectedGrade: EthiopianGrade;
  progress: StudentProgress;
  payments: PaymentRecord[];
  auditLogs: AuditLogItem[];
  login: (email: string, role?: UserRole) => void;
  register: (name: string, email: string, grade: EthiopianGrade, school?: string) => void;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  setStudentLockedGrade: (grade: EthiopianGrade) => void;
  switchGrade: (grade: EthiopianGrade) => boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  submitPayment: (
    provider: PaymentRecord['provider'],
    transactionReference: string,
    amount: number,
    receiptName?: string
  ) => void;
  reviewPayment: (paymentId: string, status: 'active' | 'rejected', notes?: string) => void;
  addMistake: (mistake: Omit<MistakeItem, 'id' | 'date' | 'reviewed'>) => void;
  markMistakeReviewed: (id: string) => void;
  recordLessonCompleted: () => void;
  recordQuizScore: (scorePercent: number, topic: string) => void;
}

const DEFAULT_USER: UserProfile = {
  uid: 'user-ethiopia-001',
  email: 'student@nur-ai.edu.et',
  displayName: 'Almaz Ayana',
  role: 'student',
  grade: 'Grade 11',
  stream: 'Natural Science',
  schoolName: 'Addis Ababa Secondary High School',
  preferredLanguage: 'Amharic',
  subscriptionStatus: 'active',
  subscriptionPlan: 'Grade 11 Standard (200 ETB/mo)',
  subscriptionExpiresAt: '2026-11-25',
  createdAt: '2026-09-01',
};

const DEFAULT_PROGRESS: StudentProgress = {
  lessonsCompleted: 18,
  quizzesTaken: 12,
  averageScore: 86,
  studyStreakDays: 7,
  lastActive: 'Today',
  weakTopics: ['Faraday Induction', 'Chain Rule Derivatives', 'Chromium Electronic Configuration'],
  mistakeBook: [
    {
      id: 'm-1',
      subject: 'Physics',
      topic: 'Projectile Motion',
      question: 'At what launch angle is maximum horizontal range achieved?',
      chosenAnswer: '90°',
      correctAnswer: '45°',
      explanation: '90° gives maximum height, whereas 45° gives maximum horizontal range according to R = (v₀² sin 2θ)/g.',
      citation: '[FDRE MoE Citation: Grade 11 Physics | Unit 2 | p. 52-54]',
      date: '2026-10-24',
      reviewed: false,
    },
    {
      id: 'm-2',
      subject: 'Chemistry',
      topic: 'Electronic Configuration',
      question: 'Ground state electron configuration of Chromium (Z=24)?',
      chosenAnswer: '[Ar] 4s² 3d⁴',
      correctAnswer: '[Ar] 4s¹ 3d⁵',
      explanation: 'Chromium promotes an electron from 4s to 3d to attain a stable half-filled 3d⁵ subshell.',
      citation: '[FDRE MoE Citation: Grade 11 Chemistry | Unit 1 | p. 31-33]',
      date: '2026-10-23',
      reviewed: true,
    },
  ],
};

const DEFAULT_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-001',
    userId: 'user-ethiopia-001',
    userEmail: 'student@nur-ai.edu.et',
    userName: 'Almaz Ayana',
    grade: 'Grade 11',
    amountETB: 200,
    provider: 'Telebirr',
    transactionReference: 'TLB-987452104',
    receiptImageName: 'telebirr_receipt_oct.jpg',
    status: 'active',
    submittedAt: '2026-10-24 14:20',
    reviewedAt: '2026-10-24 14:35',
    reviewedBy: 'mejennur669@gmail.com',
    adminNotes: 'Transaction verified by Super Admin Nuriye Ahmed Adem.',
  },
  {
    id: 'pay-002',
    userId: 'user-ethiopia-002',
    userEmail: 'chaltu.k@gmail.com',
    userName: 'Chaltu Kebede',
    grade: 'Grade 12',
    amountETB: 200,
    provider: 'Commercial Bank of Ethiopia (CBE)',
    transactionReference: 'CBE-FT24298100',
    receiptImageName: 'cbe_mobile_transfer.png',
    status: 'pending',
    submittedAt: '2026-10-25 09:15',
    adminNotes: 'Pending bank receipt reconciliation.',
  },
];

const DEFAULT_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    action: 'PAYMENT_APPROVED',
    actorEmail: 'mejennur669@gmail.com',
    target: 'pay-001 (Almaz Ayana)',
    timestamp: '2026-10-24 14:35',
    details: 'Activated Grade 11 Monthly Tier (200 ETB via Telebirr)',
  },
  {
    id: 'log-2',
    action: 'CURRICULUM_UPDATED',
    actorEmail: 'mejennur669@gmail.com',
    target: 'Grade 11 Physics Unit 2',
    timestamp: '2026-10-20 11:10',
    details: 'Verified MoE 2019 E.C. textbook page citations for two-dimensional kinematics.',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nur_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [selectedGrade, setSelectedGrade] = useState<EthiopianGrade>(() => {
    const saved = localStorage.getItem('app_locked_grade');
    if (saved) return saved as EthiopianGrade;
    return user?.grade || 'Grade 11';
  });

  const [progress, setProgress] = useState<StudentProgress>(() => {
    const saved = localStorage.getItem('nur_progress');
    return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('nur_payments');
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('nur_audit');
    return saved ? JSON.parse(saved) : DEFAULT_AUDIT_LOGS;
  });

  const isSuperAdmin =
    Boolean(user?.email && user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) ||
    user?.role === 'super_admin';

  const isGradeLocked = !isSuperAdmin && Boolean(user?.grade);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nur_user', JSON.stringify(user));
      if (user.grade) {
        localStorage.setItem('app_locked_grade', user.grade);
        setSelectedGrade(user.grade);
      }
    } else {
      localStorage.removeItem('nur_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nur_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('nur_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('nur_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const login = (email: string, requestedRole: UserRole = 'student') => {
    const isTargetSuperAdmin = email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
    const finalRole: UserRole = isTargetSuperAdmin ? 'super_admin' : requestedRole;

    const newUser: UserProfile = {
      uid: isTargetSuperAdmin ? 'super-admin-001' : `user-${Date.now()}`,
      email,
      displayName: isTargetSuperAdmin ? SUPER_ADMIN_NAME : email.split('@')[0],
      role: finalRole,
      grade: 'Grade 11',
      stream: 'Natural Science',
      schoolName: isTargetSuperAdmin ? 'FDRE MoE HQ / NUR AI ERP' : 'Addis Ababa Secondary High School',
      preferredLanguage: 'Amharic',
      subscriptionStatus: 'active',
      subscriptionPlan: isTargetSuperAdmin ? 'Lifetime Super Admin Master Access' : 'High School Monthly Plan',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    setSelectedGrade(newUser.grade);
  };

  const register = (
    name: string,
    email: string,
    grade: EthiopianGrade,
    school?: string
  ) => {
    const isTargetSuperAdmin = email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
    const finalRole: UserRole = isTargetSuperAdmin ? 'super_admin' : 'student';

    const newUser: UserProfile = {
      uid: isTargetSuperAdmin ? 'super-admin-001' : `user-${Date.now()}`,
      email,
      displayName: isTargetSuperAdmin ? SUPER_ADMIN_NAME : name,
      role: finalRole,
      grade,
      stream: grade === 'Grade 9' || grade === 'Grade 10' ? 'Common' : 'Natural Science',
      schoolName: school || 'Ethiopian High School',
      preferredLanguage: 'Amharic',
      subscriptionStatus: isTargetSuperAdmin ? 'active' : 'pending',
      subscriptionPlan: isTargetSuperAdmin ? 'Lifetime Super Admin Master Access' : `${grade} Plan`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    setSelectedGrade(grade);
    localStorage.setItem('app_locked_grade', grade);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (user) {
      // If mejennur669@gmail.com, keep super_admin status
      const updated = {
        ...user,
        role: user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() ? 'super_admin' : newRole,
      };
      setUser(updated);
      setAuditLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          action: 'ROLE_SWITCHED',
          actorEmail: user.email,
          target: `${user.displayName} -> ${newRole}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          details: `Role updated to ${newRole}`,
        },
        ...prev,
      ]);
    }
  };

  const setStudentLockedGrade = (grade: EthiopianGrade) => {
    setSelectedGrade(grade);
    localStorage.setItem('app_locked_grade', grade);
    if (user) {
      const stream = (grade === 'Grade 9' || grade === 'Grade 10') ? 'Common' : (user.stream === 'Common' ? 'Natural Science' : user.stream);
      setUser({ ...user, grade, stream });
    }
  };

  const switchGrade = (grade: EthiopianGrade): boolean => {
    if (!isSuperAdmin) {
      console.warn('Grade switch denied: student grade is locked.');
      return false;
    }
    setSelectedGrade(grade);
    if (user) {
      const stream = (grade === 'Grade 9' || grade === 'Grade 10') ? 'Common' : (user.stream === 'Common' ? 'Natural Science' : user.stream);
      setUser({ ...user, grade, stream });
    }
    return true;
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const submitPayment = (
    provider: PaymentRecord['provider'],
    transactionReference: string,
    amount: number,
    receiptName: string = 'payment_receipt.jpg'
  ) => {
    if (!user) return;
    const newRecord: PaymentRecord = {
      id: `pay-${Date.now()}`,
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      grade: user.grade,
      amountETB: amount,
      provider,
      transactionReference,
      receiptImageName: receiptName,
      status: 'pending',
      submittedAt: new Date().toLocaleString(),
      adminNotes: 'Awaiting administrator verification.',
    };
    setPayments((prev) => [newRecord, ...prev]);
    setUser((prev) => (prev ? { ...prev, subscriptionStatus: 'pending' } : null));

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: 'PAYMENT_SUBMITTED',
        actorEmail: user.email,
        target: transactionReference,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        details: `Submitted ${amount} ETB via ${provider}`,
      },
      ...prev,
    ]);
  };

  const reviewPayment = (paymentId: string, status: 'active' | 'rejected', notes?: string) => {
    setPayments((prev) =>
      prev.map((p) => {
        if (p.id === paymentId) {
          return {
            ...p,
            status,
            reviewedAt: new Date().toLocaleString(),
            reviewedBy: user?.email || 'mejennur669@gmail.com',
            adminNotes: notes || (status === 'active' ? 'Approved by Admin' : 'Rejected by Admin'),
          };
        }
        return p;
      })
    );

    const targetPayment = payments.find((p) => p.id === paymentId);
    if (targetPayment && user && targetPayment.userId === user.uid) {
      setUser((prev) => (prev ? { ...prev, subscriptionStatus: status } : null));
    }

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: status === 'active' ? 'PAYMENT_APPROVED' : 'PAYMENT_REJECTED',
        actorEmail: user?.email || 'mejennur669@gmail.com',
        target: paymentId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        details: notes || `Payment status changed to ${status}`,
      },
      ...prev,
    ]);
  };

  const addMistake = (item: Omit<MistakeItem, 'id' | 'date' | 'reviewed'>) => {
    const newMistake: MistakeItem = {
      ...item,
      id: `mistake-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      reviewed: false,
    };
    setProgress((prev) => ({
      ...prev,
      mistakeBook: [newMistake, ...prev.mistakeBook],
      weakTopics: Array.from(new Set([item.topic, ...prev.weakTopics])),
    }));
  };

  const markMistakeReviewed = (id: string) => {
    setProgress((prev) => ({
      ...prev,
      mistakeBook: prev.mistakeBook.map((m) => (m.id === id ? { ...m, reviewed: true } : m)),
    }));
  };

  const recordLessonCompleted = () => {
    setProgress((prev) => ({
      ...prev,
      lessonsCompleted: prev.lessonsCompleted + 1,
    }));
  };

  const recordQuizScore = (scorePercent: number, topic: string) => {
    setProgress((prev) => {
      const newTotal = prev.quizzesTaken + 1;
      const newAvg = Math.round((prev.averageScore * prev.quizzesTaken + scorePercent) / newTotal);
      return {
        ...prev,
        quizzesTaken: newTotal,
        averageScore: newAvg,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'student',
        isLoggedIn: Boolean(user),
        isSuperAdmin,
        isGradeLocked,
        selectedGrade,
        progress,
        payments,
        auditLogs,
        login,
        register,
        logout,
        switchRole,
        setStudentLockedGrade,
        switchGrade,
        updateProfile,
        submitPayment,
        reviewPayment,
        addMistake,
        markMistakeReviewed,
        recordLessonCompleted,
        recordQuizScore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

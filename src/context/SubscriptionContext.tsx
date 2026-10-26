import React, { createContext, useContext, useState, useEffect } from 'react';
import { EthiopianGrade, PaymentRecord, SubscriptionStatus } from '../types';
import { useAuth } from './AuthContext';

export const PRICING_BY_GRADE: Record<EthiopianGrade, number> = {
  'Grade 9': 160,
  'Grade 10': 180,
  'Grade 11': 200,
  'Grade 12': 200,
};

interface SubscriptionContextType {
  subscriptionStatus: SubscriptionStatus;
  selectedGrade: EthiopianGrade;
  monthlyFeeETB: number;
  isGradeLocked: boolean;
  payments: PaymentRecord[];
  submitPayment: (
    provider: PaymentRecord['provider'],
    transactionReference: string,
    amount: number,
    receiptName?: string
  ) => void;
  reviewPayment: (paymentId: string, status: 'active' | 'rejected', notes?: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, selectedGrade, isGradeLocked, payments, submitPayment, reviewPayment } = useAuth();

  const monthlyFeeETB = PRICING_BY_GRADE[selectedGrade] || 200;
  const subscriptionStatus = user?.subscriptionStatus || 'active';

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptionStatus,
        selectedGrade,
        monthlyFeeETB,
        isGradeLocked,
        payments,
        submitPayment,
        reviewPayment,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

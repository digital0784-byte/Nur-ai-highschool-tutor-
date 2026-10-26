import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  Copy,
  Check,
  Building2,
  Smartphone,
  Sparkles,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PaymentRecord, EthiopianGrade } from '../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade: EthiopianGrade;
}

const PRICING_BY_GRADE: Record<EthiopianGrade, number> = {
  'Grade 9': 160,
  'Grade 10': 180,
  'Grade 11': 200,
  'Grade 12': 200,
};

const PAYMENT_PROVIDERS = [
  {
    name: 'Telebirr' as PaymentRecord['provider'],
    amharic: 'ቴሌብር (Telebirr)',
    accountNumber: '0911-23-45-67',
    accountName: 'NUR AI High School Tutor (MoE Partner)',
    type: 'Mobile Money',
    icon: Smartphone,
    color: 'emerald',
    instructions: 'Send money via Telebirr app or *127#, use your student email as reference, and paste the transaction ID below.',
  },
  {
    name: 'Commercial Bank of Ethiopia (CBE)' as PaymentRecord['provider'],
    amharic: 'የኢትዮጵያ ንግድ ባንክ (CBE)',
    accountNumber: '1000-4592-8192-3',
    accountName: 'NUR AI Educational Services',
    type: 'Bank Transfer / CBE Birr',
    icon: Building2,
    color: 'purple',
    instructions: 'Transfer via CBE Mobile Banking or CBE Birr, then enter your transaction reference number.',
  },
  {
    name: 'Dashen Bank (Amole)' as PaymentRecord['provider'],
    amharic: 'ዳሽን ባንክ (Amole)',
    accountNumber: '5489-1029-3841',
    accountName: 'NUR AI Educational Platform',
    type: 'Bank Transfer',
    icon: Building2,
    color: 'sky',
    instructions: 'Transfer via Dashen Amole or bank branch, and submit the confirmation reference number.',
  },
  {
    name: 'Bank of Abyssinia' as PaymentRecord['provider'],
    amharic: 'የአቢሲኒያ ባንክ (BoA)',
    accountNumber: '8910-2384-9102',
    accountName: 'NUR AI High School Services',
    type: 'Bank Transfer',
    icon: Building2,
    color: 'amber',
    instructions: 'Transfer via BoA Mobile Banking and enter your transfer voucher code.',
  },
];

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentGrade,
}) => {
  const { user, payments, submitPayment } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<PaymentRecord['provider']>('Telebirr');
  const [referenceCode, setReferenceCode] = useState('');
  const [receiptFileName, setReceiptFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPrice = PRICING_BY_GRADE[currentGrade] || 200;
  const currentProviderDetails = PAYMENT_PROVIDERS.find((p) => p.name === selectedProvider)!;
  const userPayments = payments.filter((p) => p.userId === user?.uid);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceCode.trim()) return;

    submitPayment(
      selectedProvider,
      referenceCode.trim(),
      currentPrice,
      receiptFileName || 'receipt_screenshot.jpg'
    );
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  const handleCopyAccount = (acc: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedAccount(acc);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            FDRE MoE Curriculum Subscription
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            NUR AI Student Subscription Plans
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Access unlimited AI explanations, step-by-step problem derivations, PDF analyzers, and full ESSLCE national exam preparation.
          </p>
        </div>

        {/* Grade Pricing Box */}
        <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
          <div
            className={`p-3 rounded-2xl border transition ${
              currentGrade === 'Grade 9'
                ? 'bg-emerald-950/50 border-emerald-500 shadow-sm'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Grade 9</span>
            <span className="text-lg font-black text-white font-mono">160 ETB</span>
            <span className="text-[10px] text-slate-500 block">/ Month</span>
          </div>

          <div
            className={`p-3 rounded-2xl border transition ${
              currentGrade === 'Grade 10'
                ? 'bg-emerald-950/50 border-emerald-500 shadow-sm'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Grade 10</span>
            <span className="text-lg font-black text-white font-mono">180 ETB</span>
            <span className="text-[10px] text-slate-500 block">/ Month</span>
          </div>

          <div
            className={`p-3 rounded-2xl border transition ${
              currentGrade === 'Grade 11' || currentGrade === 'Grade 12'
                ? 'bg-emerald-950/50 border-emerald-500 shadow-sm'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Grades 11 & 12</span>
            <span className="text-lg font-black text-white font-mono">200 ETB</span>
            <span className="text-[10px] text-slate-500 block">/ Month (ESSLCE)</span>
          </div>
        </div>

        {/* Ethiopian Payment Provider Select */}
        <div className="space-y-3 mb-6">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
            Select Ethiopian Payment Method:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_PROVIDERS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setSelectedProvider(p.name)}
                className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 ${
                  selectedProvider === p.name
                    ? 'bg-emerald-950/50 border-emerald-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 shrink-0">
                  <p.icon className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs font-bold block">{p.name}</span>
                  <span className="text-[10px] opacity-70 block">{p.amharic}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Provider Account Information */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2.5 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Recipient Account / Merchant:</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              {currentPrice} ETB
            </span>
          </div>

          <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Account Number</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-white">
                {currentProviderDetails.accountNumber}
              </span>
            </div>
            <button
              onClick={() => handleCopyAccount(currentProviderDetails.accountNumber)}
              className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 flex items-center gap-1"
            >
              {copiedAccount === currentProviderDetails.accountNumber ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed italic">
            "{currentProviderDetails.instructions}"
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Transaction ID / Transfer Reference Number:
            </label>
            <input
              type="text"
              required
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
              placeholder="e.g. TLB-982341209 or CBE-FT2409..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Attach Receipt Screenshot (Optional):
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setReceiptFileName(e.target.files?.[0]?.name || '')}
              className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Manual Verification Guarantee:</strong> Subscriptions are reviewed and approved
              against official merchant ledgers within 15–30 minutes by authorized administrators.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {isSubmitted ? (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Submitted for admin review!
              </span>
            ) : <span></span>}

            <button
              type="submit"
              disabled={!referenceCode.trim() || isSubmitted}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition shadow-md shadow-emerald-900/30"
            >
              Submit Payment for Verification
            </button>
          </div>
        </form>

        {/* Existing Payment History */}
        {userPayments.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Your Payment History
            </h4>
            <div className="space-y-2">
              {userPayments.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{p.provider} • {p.amountETB} ETB</span>
                    <span className="text-[11px] text-slate-500 font-mono">{p.transactionReference}</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : p.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

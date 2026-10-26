import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PRICING_BY_GRADE } from '../../context/SubscriptionContext';

export const SubscriptionPaymentView: React.FC = () => {
  const { user, selectedGrade, submitPayment, payments } = useAuth();
  const [provider, setProvider] = useState<'Telebirr' | 'Commercial Bank of Ethiopia (CBE)'>('Telebirr');
  const [txRef, setTxRef] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const feeETB = PRICING_BY_GRADE[selectedGrade] || 200;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txRef.trim()) return;

    submitPayment(provider, txRef.trim(), feeETB);
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs text-emerald-400 font-bold block mb-1">
          Category 4: ክፍያ እና ሰብስክሪብሽን (Telebirr & CBE Payment Gateways)
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {selectedGrade} Official Subscription & Fee Checkout
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Monthly tuition: <strong className="text-white font-mono">{feeETB} ETB / Month</strong>. Instant ledger reconciliation via Telebirr and Commercial Bank of Ethiopia.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Telebirr Option */}
        <div
          onClick={() => setProvider('Telebirr')}
          className={`p-5 rounded-2xl border cursor-pointer transition space-y-3 ${
            provider === 'Telebirr'
              ? 'bg-emerald-950/40 border-emerald-500 shadow-md'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-sm flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>ቴሌብር (Telebirr)</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">Recommended</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
            <span className="text-slate-400 block">Merchant Phone:</span>
            <div className="flex items-center justify-between font-mono text-emerald-300 font-bold">
              <span>0911-23-45-67</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy('0911234567');
                }}
                className="text-slate-400 hover:text-white"
              >
                {copied === '0911234567' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="text-[10px] text-slate-500 block">Name: NUR AI High School Tutor (MoE Partner)</span>
          </div>
        </div>

        {/* CBE Option */}
        <div
          onClick={() => setProvider('Commercial Bank of Ethiopia (CBE)')}
          className={`p-5 rounded-2xl border cursor-pointer transition space-y-3 ${
            provider === 'Commercial Bank of Ethiopia (CBE)'
              ? 'bg-purple-950/40 border-purple-500 shadow-md'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-400" />
              <span>የኢትዮጵያ ንግድ ባንክ (CBE)</span>
            </span>
            <span className="text-[10px] text-purple-400 font-mono font-bold">CBE Birr / Direct</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
            <span className="text-slate-400 block">Account Number:</span>
            <div className="flex items-center justify-between font-mono text-purple-300 font-bold">
              <span>1000-2345-67890</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy('1000234567890');
                }}
                className="text-slate-400 hover:text-white"
              >
                {copied === '1000234567890' ? <Check className="w-3.5 h-3.5 text-purple-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="text-[10px] text-slate-500 block">Branch: Finfine Main Branch</span>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Enter Transaction Confirmation</h3>
        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
            <span className="font-bold text-emerald-200 text-xs block">
              Payment Submission Received for Reconciliation!
            </span>
            <p className="text-xs text-slate-400">
              Transaction reference <strong className="text-white font-mono">{txRef}</strong> is queued in the ledger.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Transaction Reference / SMS Code:
              </label>
              <input
                type="text"
                required
                value={txRef}
                onChange={(e) => setTxRef(e.target.value)}
                placeholder="e.g. TL9482710385 or CBE18492048"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={!txRef.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition shadow-md"
            >
              Confirm and Submit {feeETB} ETB Payment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPaymentView;

import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  BookOpen,
  Users,
  Settings,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  History,
  FileCheck,
  Search,
  Plus,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOE_EXCERPTS, MoETextbookExcerpt } from '../data/curriculumData';

export const AdminDashboard: React.FC = () => {
  const { user, role, payments, reviewPayment, auditLogs } = useAuth();
  const [activeTab, setActiveTab] = useState<'payments' | 'curriculum' | 'students' | 'audit' | 'settings'>('payments');
  const [searchRef, setSearchRef] = useState('');
  const [curriculumList, setCurriculumList] = useState<MoETextbookExcerpt[]>(MOE_EXCERPTS);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Security Gate
  if (role !== 'admin' && role !== 'super_admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Access Denied: Administrator Privileges Required</h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          You are currently signed in as a standard student. The Administrative Control Center is restricted to authorized FDRE Ministry of Education personnel and platform administrators.
        </p>
        <p className="text-xs text-slate-500 font-mono">
          To test administrative controls in this development environment, switch your active role to "Administrator" or "Super Administrator" using the role selector in the navigation bar.
        </p>
      </div>
    );
  }

  const pendingPayments = payments.filter(
    (p) =>
      p.status === 'pending' &&
      (searchRef === '' || p.transactionReference.toLowerCase().includes(searchRef.toLowerCase()))
  );

  const completedPayments = payments.filter((p) => p.status !== 'pending');

  const handleApprove = (paymentId: string) => {
    reviewPayment(paymentId, 'active', 'Verified by administrator ledger check.');
    setActionSuccess('Payment approved and student subscription activated!');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleReject = (paymentId: string) => {
    reviewPayment(paymentId, 'rejected', 'Transaction reference could not be reconciled.');
    setActionSuccess('Payment marked as rejected.');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/50 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Protected Administrator Control Center
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            NUR AI Administrative Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Signed in as: <strong className="text-white">{user?.email}</strong> ({role.toUpperCase()})
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-2xl overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'payments' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payments ({pendingPayments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'curriculum' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'audit' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Audit Logs</span>
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          {/* Pending Queue */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Pending Payment Approvals</h3>
                <p className="text-xs text-slate-400">Review transfer references and activate student subscriptions.</p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchRef}
                  onChange={(e) => setSearchRef(e.target.value)}
                  placeholder="Filter by ref code..."
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {pendingPayments.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">No Pending Payments</h4>
                <p className="text-xs">All submitted student payments have been reviewed and processed.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingPayments.map((p) => (
                  <div
                    key={p.id}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm">{p.userName}</span>
                        <span className="text-xs text-slate-400">({p.userEmail})</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                          {p.grade}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 flex flex-wrap items-center gap-3 font-mono">
                        <span className="text-emerald-400 font-bold">{p.amountETB} ETB</span>
                        <span>•</span>
                        <span>{p.provider}</span>
                        <span>•</span>
                        <span className="text-slate-400">Ref: {p.transactionReference}</span>
                        <span>•</span>
                        <span className="text-slate-500">{p.submittedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReject(p.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300 border border-slate-700 transition"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(p.id)}
                        className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition"
                      >
                        Approve & Activate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Processed History */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Reviewed Payment History
            </h3>
            <div className="space-y-2">
              {completedPayments.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-950 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white">{p.userName}</span>
                    <span className="text-slate-400 ml-2 font-mono">
                      {p.provider} • {p.amountETB} ETB (Ref: {p.transactionReference})
                    </span>
                    <span className="text-[10px] text-slate-500 block">Notes: {p.adminNotes}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      p.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Management Tab */}
      {activeTab === 'curriculum' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">FDRE MoE Curriculum Repository</h3>
              <p className="text-xs text-slate-400">Currently managing {curriculumList.length} verified textbook excerpts.</p>
            </div>
          </div>

          <div className="space-y-3">
            {curriculumList.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-emerald-400 text-xs">{item.grade} • {item.subject}</span>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      {item.page}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{item.topic}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.summary}</p>
                </div>
                <span className="text-[10px] text-emerald-400/80 font-mono bg-emerald-950/40 px-2 py-1 rounded shrink-0">
                  Verified MoE Edition
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'audit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Security & Administration Audit Trail
          </h3>

          <div className="space-y-2 font-mono text-xs">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="font-bold text-purple-400 mr-2">[{log.action}]</span>
                  <span className="text-slate-200">{log.details}</span>
                  <span className="text-[10px] text-slate-500 block sm:inline sm:ml-2">
                    by {log.actorEmail}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

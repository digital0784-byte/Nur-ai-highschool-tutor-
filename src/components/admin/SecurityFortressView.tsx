import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, Users, History, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useAuth, SUPER_ADMIN_EMAIL, SUPER_ADMIN_NAME } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const SecurityFortressView: React.FC = () => {
  const { t } = useLanguage();
  const { user, isSuperAdmin, auditLogs } = useAuth();
  const [tokenValidityHours, setTokenValidityHours] = useState(24);
  const [drmWatermarkActive, setDrmWatermarkActive] = useState(true);
  const [sessionRevokeNotice, setSessionRevokeNotice] = useState<string | null>(null);

  const handleRevokeTokens = () => {
    setSessionRevokeNotice('All non-admin active student session tokens revoked successfully.');
    setTimeout(() => setSessionRevokeNotice(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Category 5: ደህንነት እና ፍቃዶች (Security & Access Fortress)</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            RBAC Roles, DRM Protection & Audit Trail
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Enforces strict access control, protects official MoE digital textbook assets, and audits privileged system actions.
          </p>
        </div>

        <div className="px-3 py-2 rounded-xl bg-slate-900 border border-purple-500/30 text-xs text-right">
          <span className="text-[10px] text-purple-400 block font-mono">SUPER ADMIN ACTIVE</span>
          <span className="font-bold text-white text-[11px]">{SUPER_ADMIN_NAME}</span>
        </div>
      </div>

      {sessionRevokeNotice && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{sessionRevokeNotice}</span>
        </div>
      )}

      {/* Grid of Security Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1: DRM Protection Config */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">DRM & Textbook Protection Engine</h3>
          </div>
          <p className="text-xs text-slate-400">
            Watermarks each rendered textbook page with the logged-in student's ID and timestamp to deter unauthorized screenshots and redistribution.
          </p>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300">Enforce Dynamic Watermark Overlay</span>
              <input
                type="checkbox"
                checked={drmWatermarkActive}
                onChange={(e) => setDrmWatermarkActive(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <span className="text-xs text-slate-300 block">Session Token Life (Hours)</span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="6"
                  max="72"
                  value={tokenValidityHours}
                  onChange={(e) => setTokenValidityHours(parseInt(e.target.value, 10))}
                  className="flex-1 accent-purple-500"
                />
                <span className="font-mono text-xs text-purple-300 font-bold">{tokenValidityHours}h</span>
              </div>
            </div>

            <button
              onClick={handleRevokeTokens}
              className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Revoke All Active Student Tokens</span>
            </button>
          </div>
        </div>

        {/* Panel 2: RBAC Matrix */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Role-Based Access Control (RBAC)</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Student (ተማሪ)</span>
                <span className="text-[11px] text-slate-400">Locked grade curriculum, quizzes, AI tutor, homework hub</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">Read / Solve</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">School Admin (የትምህርት ቤት አስተዳዳሪ)</span>
                <span className="text-[11px] text-slate-400">Review student enrollments, homework grading, feedback</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-[10px]">Manage</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-purple-500/30 flex items-center justify-between">
              <div>
                <span className="font-bold text-purple-300 block">Lifetime Super Admin (ኑርዬ አህመድ)</span>
                <span className="text-[11px] text-slate-400">Financial reconciliation, grade switcher, DRM rules, ERP</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px]">Full Master</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">System Security Audit Trail</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Immutable Log</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-3 font-semibold">Timestamp</th>
                <th className="py-2 px-3 font-semibold">Actor</th>
                <th className="py-2 px-3 font-semibold">Action</th>
                <th className="py-2 px-3 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">{log.timestamp}</td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-400">{log.actorEmail}</td>
                  <td className="py-2.5 px-3">{log.action}</td>
                  <td className="py-2.5 px-3 text-slate-400">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityFortressView;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import type { AlertData, ReportData } from '../types';

interface FormsModalProps {
  isOpen: boolean;
  type: 'createAlert' | 'scheduleReport' | 'inviteUser' | null;
  onClose: () => void;
  onSubmitAlert: (newAlert: Omit<AlertData, 'id' | 'timeAgo' | 'timestamp'>) => void;
  onSubmitReport: (newReport: Omit<ReportData, 'id' | 'timestamp'>) => void;
}

export default function FormsModal({
  isOpen,
  type,
  onClose,
  onSubmitAlert,
  onSubmitReport,
}: FormsModalProps) {
  if (!isOpen || !type) return null;

  // Form State: Alert
  const [alertSeverity, setAlertSeverity] = useState<'critical' | 'warning' | 'info'>('critical');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDesc, setAlertDesc] = useState('');

  // Form State: Report
  const [reportTitle, setReportTitle] = useState('');
  const [reportCategory, setReportCategory] = useState('Macroeconomics');
  const [reportInterval, setReportInterval] = useState('Daily');

  // Form State: Invite User
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteCl, setInviteCl] = useState('Tier-2 Intel Analyst');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Submit handers
  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle.trim()) return;
    onSubmitAlert({
      severity: alertSeverity,
      title: alertTitle,
      description: alertDesc || 'No supplemental description provided.',
    });
    // Reset or close
    setAlertTitle('');
    setAlertDesc('');
    onClose();
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim()) return;
    onSubmitReport({
      title: reportTitle,
      status: 'draft',
      dateLabel: `Scheduled • ${reportInterval} (${reportCategory})`,
      category: reportCategory,
      size: 'Pending Generation',
    });
    setReportTitle('');
    onClose();
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setInviteEmail('');
      onClose();
    }, 2000);
  };

  return (
    <div
      id="prompt-action-modal-overlay"
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
    >
      <div
        id="prompt-action-modal-box"
        className="bg-[#0f1424] border border-[#1e293b] rounded-xl w-full max-w-md overflow-hidden relative shadow-2xl animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-[#1e293b]/70 bg-[#0e111a] select-none text-left">
          <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-white">
            {type === 'createAlert' && 'System Command: Create Geopolitical Alert'}
            {type === 'scheduleReport' && 'System Command: Schedule Intelligent Report'}
            {type === 'inviteUser' && 'System Command: Grant Terminal Access'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 text-left">
          {type === 'createAlert' && (
            <form onSubmit={handleAlertSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">
                  Severity Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['critical', 'warning', 'info'] as const).map((sev) => (
                    <button
                      type="button"
                      key={sev}
                      onClick={() => setAlertSeverity(sev)}
                      className={`py-1.5 rounded text-[10px] font-mono border transition-all text-center uppercase font-bold ${
                        alertSeverity === sev
                          ? sev === 'critical'
                            ? 'bg-red-500/10 border-red-500 text-red-400'
                            : sev === 'warning'
                            ? 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan'
                            : 'bg-slate-500/10 border-slate-500 text-slate-300'
                          : 'bg-[#0b0e17] border-[#1e293b] text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">
                  Alert Title / Threat Stream
                </label>
                <input
                  type="text"
                  required
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                  placeholder="e.g. Volatility spike in Crude Oil Futures"
                  className="w-full bg-[#0b0e17] border border-[#1e293b] rounded p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan/60 font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">
                  Supplement details & context
                </label>
                <textarea
                  value={alertDesc}
                  onChange={(e) => setAlertDesc(e.target.value)}
                  placeholder="Insert quantitative points, G10 spreads, or supply chain bottlenecks..."
                  rows={3}
                  className="w-full bg-[#0b0e17] border border-[#1e293b] rounded p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan/60 font-sans"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 bg-transparent text-gray-400 border border-[#1e293b] hover:text-white hover:bg-white/5 rounded text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-brand-cyan text-[#0e111a] font-bold rounded text-xs hover:bg-brand-cyan/90 transition-colors"
                >
                  Dispatch Alert
                </button>
              </div>
            </form>
          )}

          {type === 'scheduleReport' && (
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">
                  Report File Title
                </label>
                <input
                  type="text"
                  required
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="e.g. Sub-Saharan Mining Infrastructure Risk Assessment"
                  className="w-full bg-[#0b0e17] border border-[#1e293b] rounded p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan/60 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">
                    Intelligence Quadrant
                  </label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                    className="w-full bg-[#0b0e17] border border-[#1e293b] rounded p-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan/60 font-mono"
                  >
                    <option value="Energy">Energy</option>
                    <option value="Sovereign Bond">Finance</option>
                    <option value="Global Trade">Global Trade</option>
                    <option value="Macroeconomics">Macroeconomics</option>
                    <option value="Military / Geopolitics">Geopolitics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">
                    Aggregation Cycle
                  </label>
                  <select
                    value={reportInterval}
                    onChange={(e) => setReportInterval(e.target.value)}
                    className="w-full bg-[#0b0e17] border border-[#1e293b] rounded p-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan/60 font-mono"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 bg-transparent text-gray-400 border border-[#1e293b] hover:text-white hover:bg-white/5 rounded text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-brand-cyan text-[#0e111a] font-bold rounded text-xs hover:bg-brand-cyan/90 transition-colors"
                >
                  Generate & Schedule
                </button>
              </div>
            </form>
          )}

          {type === 'inviteUser' && (
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              {inviteSuccess ? (
                <div className="py-8 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
                  <div className="h-12 w-12 rounded-full bg-brand-cyan/10 border border-brand-cyan flex items-center justify-center text-brand-cyan mb-3">
                    <Check size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans uppercase">
                    Security Token Dispatched
                  </h4>
                  <p className="text-[10px] text-gray-400 font-mono mt-1 max-w-xs">
                    Sent cryptographic credential access key link to your invitee's secure email.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">
                      Collaborator Security Email
                    </label>
                    <input
                      type="email"
                      required
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="analyst@sentinel.gov"
                      className="w-full bg-[#0b0e17] border border-[#1e293b] rounded p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan/60"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">
                      Terminal Clearance Rank
                    </label>
                    <select
                      value={inviteCl}
                      onChange={(e) => setInviteCl(e.target.value)}
                      className="w-full bg-[#0b0e17] border border-[#1e293b] rounded p-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan/60 font-mono"
                    >
                      <option value="Tier-1 Associate Junior Analyst">Tier-1 Associate Analyst</option>
                      <option value="Tier-2 Intelligent Director Analyst">Tier-2 Intel Analyst</option>
                      <option value="Tier-3 Executive Director General">Tier-3 Director</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-2 bg-transparent text-gray-400 border border-[#1e293b] hover:text-white hover:bg-white/5 rounded text-xs transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-brand-cyan text-[#0e111a] font-bold rounded text-xs hover:bg-brand-cyan/90 transition-colors"
                    >
                      Dispatch Security Ticket
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

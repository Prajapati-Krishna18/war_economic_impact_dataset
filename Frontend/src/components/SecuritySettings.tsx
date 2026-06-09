/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  User,
  Shield,
  Sliders,
  Settings,
  Key,
  Smartphone,
  Laptop,
  CheckCircle,
  AlertOctagon,
  Download,
  Database,
  Plus,
  RefreshCw,
  X,
  Lock,
  FileDown
} from 'lucide-react';

interface SecuritySettingsProps {
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

interface AuditLog {
  timestamp: string;
  actionEvent: string;
  resourcePath: string;
  ipAddress: string;
  status: 'SUCCESS' | 'BLOCKED';
}

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  timeLabel: string;
  current: boolean;
  icon: typeof Laptop | typeof Smartphone;
}

export default function SecuritySettings({ onShowToast }: SecuritySettingsProps) {
  // Mock data for editable information
  const [fullName, setFullName] = useState('Alexander Vance');
  const [analystId, setAnalystId] = useState('ECON-7742-INTEL');
  const [email, setEmail] = useState('a.vance@econ-sentinel.int');
  const [department, setDepartment] = useState('Strategic Risk & Global Markets');

  // Interface preferences
  const [language, setLanguage] = useState('English (International)');
  const [timezone, setTimezone] = useState('GMT (London / Institutional)');
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [encryptedEmail, setEncryptedEmail] = useState(true);
  const [secureSms, setSecureSms] = useState(false);

  // Active secrets
  const [apiKey, setApiKey] = useState('SENT-v3-4kX1...9Pz');
  const [sessions, setSessions] = useState<ActiveSession[]>([
    {
      id: 'SESS-01',
      device: 'MacBook Pro 16" (M2)',
      location: 'London, UK',
      timeLabel: 'Current Session',
      current: true,
      icon: Laptop
    },
    {
      id: 'SESS-02',
      device: 'iPhone 14 Pro',
      location: 'London, UK',
      timeLabel: '4 hours ago',
      current: false,
      icon: Smartphone
    }
  ]);

  // Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      timestamp: '2023-11-24 14:22:01',
      actionEvent: 'Terminal Session Started',
      resourcePath: '/auth/terminal/login',
      ipAddress: '192.168.1.104',
      status: 'SUCCESS'
    },
    {
      timestamp: '2023-11-24 12:45:15',
      actionEvent: 'API Key Generated',
      resourcePath: '/settings/security/api-mgr',
      ipAddress: '192.168.1.104',
      status: 'SUCCESS'
    },
    {
      timestamp: '2023-11-23 09:12:44',
      actionEvent: 'Unauthorized Access Attempt',
      resourcePath: '/intel/sensitive-trade-data',
      ipAddress: '45.12.8.212',
      status: 'BLOCKED'
    },
    {
      timestamp: '2023-11-22 18:05:00',
      actionEvent: 'System Log Exported',
      resourcePath: '/logs/export/audit-trail',
      ipAddress: '192.168.1.104',
      status: 'SUCCESS'
    }
  ]);

  // Modal Editing Personal Details
  const [showEditModal, setShowEditModal] = useState(false);
  const [tempName, setTempName] = useState(fullName);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempDept, setTempDept] = useState(department);

  const handleEditDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) {
      onShowToast('Full Name cannot be empty', 'info');
      return;
    }
    setFullName(tempName);
    setEmail(tempEmail);
    setDepartment(tempDept);
    setShowEditModal(false);
    onShowToast('ANALYST IDENTITY RECORD CALIBRATED SUCCESSFULLY', 'success');
  };

  const handleGenerateKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let rand = '';
    for (let i = 0; i < 8; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const newKey = `SENT-v3-${rand}...${chars.charAt(Math.floor(Math.random() * 26))}${chars.charAt(Math.floor(Math.random() * 10))}z`;
    setApiKey(newKey);
    
    // Add to audit trail
    const newLog: AuditLog = {
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actionEvent: 'API Key Generated',
      resourcePath: '/settings/security/api-mgr',
      ipAddress: '192.168.1.104',
      status: 'SUCCESS'
    };
    setAuditLogs(prev => [newLog, ...prev]);
    onShowToast(`PRODUCED NEW INSTITUTIONAL API INTERFACE SECURE TOKEN: ${newKey}`, 'success');
  };

  const handleTerminateSession = (id: string, device: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    
    // Add to audit trail
    const newLog: AuditLog = {
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actionEvent: `Session Terminated: ${device}`,
      resourcePath: '/auth/session/revoke',
      ipAddress: '192.168.1.104',
      status: 'SUCCESS'
    };
    setAuditLogs(prev => [newLog, ...prev]);
    onShowToast(`TERMINATED SECURE SYSTEM SESSION FOR DEVICE: ${device}`, 'info');
  };

  const handleExportCSV = () => {
    onShowToast('EXPORTED AUDIT COMMUNIQUE: econ_sentinel_audit_logs.csv', 'success');
  };

  const handleRequestDataExport = () => {
    onShowToast('INITIATED FULL STRUCTURAL DATA ENVELOPE ZIP TRANSMISSION VIA SECURE CHANNEL', 'success');
  };

  return (
    <div className="space-y-6 text-left select-none relative animate-in fade-in duration-200" id="security-settings-viewport">
      
      {/* 1. TOP BREADCRUMB & PANEL HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1.5 text-left">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-700">/</span>
            <span className="text-brand-cyan">Profile</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display">
            Analyst Profile & Security Settings
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage your professional identity and institutional security protocols.
          </p>
        </div>
      </div>

      {/* 2. THREE-PANEL CORE GRID DECK */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* LEFT COLUMN: PERSONAL DETAILS & PREFERENCES (3/5 area) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Panel A: Personal Information */}
          <div className="bg-[#121829] border border-[#1e293b]/65 rounded-xl p-5 space-y-5" id="personal-info-card">
            
            <div className="flex justify-between items-center pb-3.5 border-b border-[#1e293b]/40">
              <div className="flex items-center gap-2.5">
                <User size={16} className="text-brand-cyan" />
                <h3 className="text-sm font-bold text-white tracking-tight font-sans uppercase">
                  Personal Information
                </h3>
              </div>
              <button
                onClick={() => {
                  setTempName(fullName);
                  setTempEmail(email);
                  setTempDept(department);
                  setShowEditModal(true);
                }}
                className="px-3 py-1 bg-transparent border border-brand-cyan/40 hover:border-brand-cyan text-brand-cyan rounded text-[10px] font-mono font-semibold hover:bg-brand-cyan/5 transition-all cursor-pointer uppercase"
              >
                Edit Details
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block">
                  FULL NAME
                </span>
                <span className="text-sm font-bold text-white block">
                  {fullName}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block">
                  ANALYST ID
                </span>
                <span className="text-sm font-semibold text-gray-300 font-mono block">
                  {analystId}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block">
                  INSTITUTIONAL EMAIL
                </span>
                <span className="text-sm font-semibold text-gray-300 block">
                  {email}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block">
                  DEPARTMENT
                </span>
                <span className="text-sm font-bold text-white block">
                  {department}
                </span>
              </div>

            </div>

          </div>

          {/* Panel B: Interface Preferences */}
          <div className="bg-[#121829] border border-[#1e293b]/65 rounded-xl p-5 space-y-5" id="interface-preferences-card">
            
            <div className="flex items-center gap-2.5 pb-3.5 border-b border-[#1e293b]/40">
              <Sliders size={16} className="text-brand-cyan" />
              <h3 className="text-sm font-bold text-white tracking-tight font-sans uppercase">
                Interface Preferences
              </h3>
            </div>

            <div className="space-y-5">
              
              {/* Select Language */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-white text-xs">Primary Interface Language</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-tight font-mono">
                    AFFECTS ALL SYSTEM GENERATED REPORTS
                  </p>
                </div>
                <div className="relative w-full sm:w-56">
                  <select
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      onShowToast(`SWITCHED INTERFACE TRANSLATIONS TO: ${e.target.value.toUpperCase()}`, 'info');
                    }}
                    className="appearance-none w-full bg-[#070b14] border border-[#1e293b] hover:border-gray-600 rounded px-3 py-2 pr-8 text-xs font-semibold text-gray-300 focus:outline-none cursor-pointer text-left"
                  >
                    <option value="English (International)">English (International)</option>
                    <option value="Deutsch (G7 Compliant)">Deutsch (G7 Compliant)</option>
                    <option value="Français (Europe)">Français (Europe)</option>
                    <option value="日本語 (Asia)">日本語 (Asia)</option>
                  </select>
                  <ChevronDownIcon size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Select Timezone */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1.5">
                <div>
                  <h4 className="font-bold text-white text-xs">Analysis Timezone</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-tight font-mono">
                    SYNCHRONIZE CHARTS TO LOCAL MARKET HOURS
                  </p>
                </div>
                <div className="relative w-full sm:w-56">
                  <select
                    value={timezone}
                    onChange={(e) => {
                      setTimezone(e.target.value);
                      onShowToast(`CALIBRATED GEOGRAPHIC FRAME RANGE: ${e.target.value}`, 'success');
                    }}
                    className="appearance-none w-full bg-[#070b14] border border-[#1e293b] hover:border-gray-600 rounded px-3 py-2 pr-8 text-xs font-semibold text-gray-300 focus:outline-none cursor-pointer text-left"
                  >
                    <option value="GMT (London / Institutional)">GMT (London / Institutional)</option>
                    <option value="EST (New York Exchange)">EST (New York Exchange)</option>
                    <option value="CET (Frankfurt Exchange)">CET (Frankfurt Exchange)</option>
                    <option value="SGT (Singapore Hub)">SGT (Singapore Hub)</option>
                  </select>
                  <ChevronDownIcon size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sub-section checkbox array */}
              <div className="pt-4 border-t border-[#1e293b]/25 space-y-2">
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                  DEFAULT NOTIFICATION CHANNELS
                </span>
                <div className="flex flex-wrap items-center gap-6 text-xs text-gray-300">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none leading-none">
                    <input
                      type="checkbox"
                      checked={inAppAlerts}
                      onChange={(e) => {
                        setInAppAlerts(e.target.checked);
                        onShowToast(`IN-APP ALERTS: ${e.target.checked ? 'ENABLED' : 'DISABLED'}`, 'info');
                      }}
                      className="accent-brand-cyan h-4 w-4 rounded border-[#1e293b] bg-[#070b14]"
                    />
                    <span>In-App Alert</span>
                  </label>
                  
                  <label className="flex items-center gap-2.5 cursor-pointer select-none leading-none">
                    <input
                      type="checkbox"
                      checked={encryptedEmail}
                      onChange={(e) => {
                        setEncryptedEmail(e.target.checked);
                        onShowToast(`ENCRYPTED EMAIL ROUTING: ${e.target.checked ? 'ENABLED' : 'DISABLED'}`, 'info');
                      }}
                      className="accent-brand-cyan h-4 w-4 rounded border-[#1e293b] bg-[#070b14]"
                    />
                    <span>Encrypted Email</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer select-none leading-none">
                    <input
                      type="checkbox"
                      checked={secureSms}
                      onChange={(e) => {
                        setSecureSms(e.target.checked);
                        onShowToast(`SECURE MOBILE TELEPHONY DISPATCH: ${e.target.checked ? 'ENABLED' : 'DISABLED'}`, 'info');
                      }}
                      className="accent-brand-cyan h-4 w-4 rounded border-[#1e293b] bg-[#070b14]"
                    />
                    <span>Secure SMS</span>
                  </label>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: SECURITY PROTOCOLS & SEEDS (2/5 area) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Panel C: Security Protocols card */}
          <div className="bg-[#121829] border border-[#1e293b]/65 rounded-xl p-5 space-y-5" id="security-protocols-card">
            
            <div className="flex items-center gap-2.5 pb-3.5 border-b border-[#1e293b]/40">
              <Shield size={16} className="text-brand-cyan" />
              <h3 className="text-sm font-bold text-white tracking-tight font-sans uppercase">
                Security Protocols
              </h3>
            </div>

            <div className="space-y-4 font-sans">
              
              {/* MFA indicator */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                  MFA STATUS
                </span>
                <div className="flex items-center justify-between bg-[#070b14]/50 border border-[#1e293b]/40 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-cyan leading-none font-mono">
                    <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
                    <span>ENFORCED & ACTIVE</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-gray-400 bg-slate-800/60 border border-slate-700/50 px-2 py-0.5 rounded uppercase">
                    Hardware Token
                  </span>
                </div>
              </div>

              {/* Generate Client Key section */}
              <div className="space-y-2 pt-1 font-sans">
                <div className="flex justify-between items-center text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                  <span>ACTIVE API KEYS</span>
                  <button
                    onClick={handleGenerateKey}
                    className="text-brand-cyan hover:underline hover:text-[#00c993] text-[9.5px] font-bold font-mono transition flex items-center gap-1 cursor-pointer bg-transparent border-0"
                  >
                    <Plus size={11} />
                    <span>Generate Key</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 bg-[#070b14]/50 border border-[#1e293b]/50 p-3 rounded-xl hover:border-brand-cyan/25 transition-colors">
                  <Key size={14} className="text-gray-400" />
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-xs font-mono font-bold text-white truncate">
                      {apiKey}
                    </div>
                    <div className="text-[9.5px] text-gray-500 font-mono mt-0.5">
                      Production Access • Created 12 Jan
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Sessions list */}
              <div className="space-y-2 pt-1.5 font-sans">
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                  ACTIVE SESSIONS
                </span>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {sessions.map((sess) => {
                    const DevIcon = sess.icon;
                    return (
                      <div
                        key={sess.id}
                        className="flex items-center justify-between bg-[#070b14]/50 border border-[#1e293b]/30 p-2.5 rounded-lg text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-8 w-8 bg-slate-800/40 border border-slate-750 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                            <DevIcon size={14} />
                          </div>
                          <div className="text-left min-w-0">
                            <h4 className="text-[11px] font-bold text-white truncate">
                              {sess.device}
                            </h4>
                            <p className="text-[9.5px] text-gray-500 font-mono mt-0.5 truncate">
                              {sess.location} • {sess.timeLabel}
                            </p>
                          </div>
                        </div>

                        {sess.current ? (
                          <span className="h-2 w-2 rounded-full bg-brand-cyan mr-2 block shrink-0" />
                        ) : (
                          <button
                            onClick={() => handleTerminateSession(sess.id, sess.device)}
                            className="text-[9.5px] font-mono font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded border border-red-500/15 cursor-pointer uppercase transition-all"
                          >
                            Terminate
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 3. LOWER GENERAL AUDIT TRAILS ROW */}
      <div className="bg-[#121829] border border-[#1e293b]/65 rounded-xl p-5" id="institutional-audit-trail-panel">
        
        {/* Table/Panel Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#1e293b]/40 mb-4 font-sans">
          <div className="flex items-center gap-2.5">
            <RefreshCw size={15} className="text-brand-cyan" />
            <h3 className="text-sm font-bold text-white tracking-tight uppercase">
              Institutional Audit Trail
            </h3>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto uppercase">
            {/* Export CSV button */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#070b14] border border-[#1e293b] hover:border-gray-500 rounded text-[10.5px] font-bold text-gray-300 hover:text-white transition-all cursor-pointer font-mono"
            >
              <Download size={12} className="text-gray-400" />
              <span>Export Logs (.CSV)</span>
            </button>

            {/* Request Full Data Export */}
            <button
              onClick={handleRequestDataExport}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-brand-cyan hover:bg-[#00c993] text-[#070b14] rounded text-[10.5px] font-bold transition-all cursor-pointer font-mono shadow-[0_0_12px_rgba(0,224,165,0.15)]"
            >
              <Database size={12} />
              <span>Request Full Data Export</span>
            </button>
          </div>
        </div>

        {/* Audit trail grid list matching layout perfectly */}
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-sans text-left border-collapse select-none">
            <thead>
              <tr className="border-b border-[#1e293b]/40 text-gray-500 font-mono text-[9px] font-bold uppercase tracking-wider">
                <th className="pb-3 pt-1 font-semibold">Timestamp</th>
                <th className="pb-3 pt-1 font-semibold">Action Event</th>
                <th className="pb-3 pt-1 font-semibold">Resource Path</th>
                <th className="pb-3 pt-1 font-semibold">IP Address</th>
                <th className="pb-3 pt-1 font-semibold text-right pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]/20">
              {auditLogs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-800/10 transition-colors">
                  <td className="py-2.5 font-mono text-gray-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-2.5 font-bold text-white whitespace-nowrap">{log.actionEvent}</td>
                  <td className="py-2.5 font-mono text-gray-400 whitespace-nowrap">{log.resourcePath}</td>
                  <td className="py-2.5 font-mono text-gray-300 whitespace-nowrap">{log.ipAddress}</td>
                  <td className="py-2.5 text-right pr-2">
                    <span className={`inline-block font-mono text-[8.5px] font-bold px-2 py-0.5 rounded leading-none uppercase border ${
                      log.status === 'SUCCESS' 
                        ? 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5' 
                        : 'text-red-400 border-red-500/20 bg-red-500/5'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* 4. DIALOG POPUP: EDIT SYSTEM USER IDENTITY */}
      {showEditModal && (
        <div className="fixed inset-0 bg-[#070b14]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121829] border border-[#1e293b] rounded-xl w-full max-w-md p-6 relative font-sans space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex justify-between items-start pb-3 border-b border-[#1e293b]/40">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">Edit Analyst Profile</h3>
                <p className="text-[9px] text-gray-500 font-mono mt-0.5 uppercase">ADMIN_METRIC_EDITOR</p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white cursor-pointer select-none">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleEditDetailsSubmit} className="space-y-4 text-xs font-sans text-left text-gray-300">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full bg-[#070b14] border border-[#1e293b] rounded px-3 py-2 text-white focus:outline-none focus:border-brand-cyan font-semibold"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Institutional Email</label>
                <input
                  type="email"
                  required
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full bg-[#070b14] border border-[#1e293b] rounded px-3 py-2 text-white focus:outline-none focus:border-brand-cyan font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Department Sector</label>
                <input
                  type="text"
                  required
                  value={tempDept}
                  onChange={(e) => setTempDept(e.target.value)}
                  className="w-full bg-[#070b14] border border-[#1e293b] rounded px-3 py-2 text-white focus:outline-none focus:border-brand-cyan font-semibold"
                />
              </div>

              <div className="pt-3 border-t border-[#1e293b]/40 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-[#1e293b] hover:border-gray-500 rounded text-gray-300 font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-cyan hover:bg-[#00c993] text-[#070b14] rounded font-bold transition shadow-[0_0_12px_#00e0a5] cursor-pointer"
                >
                  Update Identity
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

// Compact helper components to keep icon imports fully unified
function ChevronDownIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

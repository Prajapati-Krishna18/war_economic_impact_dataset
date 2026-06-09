/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Link,
  Download,
  UserPlus,
  Users,
  Activity,
  Mail,
  ShieldAlert,
  Search,
  Sliders,
  RotateCw,
  MoreVertical,
  Edit2,
  Key,
  Slash,
  Trash2,
  X,
  CheckCircle,
  AlertTriangle,
  Play
} from 'lucide-react';

interface UserAdministrationProps {
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

// Full schema of admin users
type UserStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  lastLogin: string;
  status: UserStatus;
  avatarUrl?: string; // Optional realistic placeholder
  entitlements: {
    regionalAccess: boolean;
    predictiveSuite: boolean;
    sysAdmin: boolean;
    auditLog: boolean;
  };
  recentActivity: Array<{
    action: string;
    time: string;
  }>;
}

export default function UserAdministration({ onShowToast }: UserAdministrationProps) {
  // Setup concrete state arrays holding our administration pool
  const [usersList, setUsersList] = useState<AdminUser[]>([
    {
      id: 'ES-INTEL-88901',
      name: 'Adrian Vance',
      email: 'a.vance@econ-sentinel.int',
      role: 'Senior Analyst',
      department: 'Global Macro Strategy',
      lastLogin: '12 mins ago',
      status: 'ACTIVE',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      entitlements: {
        regionalAccess: true,
        predictiveSuite: true,
        sysAdmin: false,
        auditLog: true
      },
      recentActivity: [
        { action: 'Data Export: ASEAN Trade Index', time: '12:05 PM Today' },
        { action: 'Session Initiated (IP: 192.168.1.42)', time: '11:53 AM Today' },
        { action: 'Updated Permission Matrix', time: 'Yesterday, 4:30 PM' }
      ]
    },
    {
      id: 'ES-INTEL-94420',
      name: 'Elena Rossi',
      email: 'e.rossi@econ-sentinel.int',
      role: 'Risk Manager',
      department: 'Emerging Markets',
      lastLogin: 'Yesterday, 18:42',
      status: 'ACTIVE',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      entitlements: {
        regionalAccess: true,
        predictiveSuite: true,
        sysAdmin: false,
        auditLog: false
      },
      recentActivity: [
        { action: 'Conflict Severity Analysis Model Compiled', time: 'Yesterday, 7:15 PM' },
        { action: 'Sub-Saharan Drought Metric Updated', time: 'May 30, 2:10 PM' }
      ]
    },
    {
      id: 'ES-INTEL-10931',
      name: 'Marcus Thorne',
      email: 'm.thorne@partner-org.com',
      role: 'External Consultant',
      department: 'Quantitative Intelligence',
      lastLogin: '--',
      status: 'PENDING',
      entitlements: {
        regionalAccess: false,
        predictiveSuite: false,
        sysAdmin: false,
        auditLog: false
      },
      recentActivity: [
        { action: 'Organization invitation generated', time: 'May 31, 9:20 AM' }
      ]
    },
    {
      id: 'ES-INTEL-33451',
      name: 'Sarah Jenkins',
      email: 's.jenkins@econ-sentinel.int',
      role: 'Lead Auditor',
      department: 'Internal Compliance',
      lastLogin: '14 Days ago',
      status: 'SUSPENDED',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      entitlements: {
        regionalAccess: true,
        predictiveSuite: false,
        sysAdmin: false,
        auditLog: true
      },
      recentActivity: [
        { action: 'System Audit Log Purge attempt flagged', time: '14 Days ago' },
        { action: 'Compliance clearance revoked by Security Node', time: '14 Days ago' }
      ]
    }
  ]);

  // Selected state indices (first user selected by default as in screenshot)
  const [selectedUserId, setSelectedUserId] = useState<string>('ES-INTEL-88901');
  const [checkedUsers, setCheckedUsers] = useState<Record<string, boolean>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [tableSearchText, setTableSearchText] = useState<string>('');

  const selectedUser = usersList.find(u => u.id === selectedUserId) || usersList[0];

  const handleToggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedUsers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectAll = () => {
    const allChecked = usersList.every(u => checkedUsers[u.id]);
    const next: Record<string, boolean> = {};
    if (!allChecked) {
      usersList.forEach(u => {
        next[u.id] = true;
      });
    }
    setCheckedUsers(next);
    onShowToast(allChecked ? 'Deselected all administration records' : 'Selected all visible user records', 'info');
  };

  const countChecked = Object.values(checkedUsers).filter(Boolean).length;

  const handleInvitations = () => {
    onShowToast('GENERATED NEW REGULATORY REGISTRATION ENVELOPE', 'success');
  };

  const handleAuditExport = () => {
    onShowToast('ARCHIVED COMPREHENSIVE PRIVILEGE ACTION LEDGER', 'success');
  };

  const handleCreateUserClick = () => {
    onShowToast('INITIALIZED SOVEREIGN OPERATIONAL CREDENTIAL FLOW', 'success');
  };

  const handleToggleEntitlement = (key: keyof AdminUser['entitlements']) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === selectedUser.id) {
        return {
          ...u,
          entitlements: {
            ...u.entitlements,
            [key]: !u.entitlements[key]
          }
        };
      }
      return u;
    }));
    onShowToast(`UPDATED ACCESS VECTORS FOR: ${selectedUser.name}`, 'info');
  };

  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status: newStatus };
      }
      return u;
    }));
    onShowToast(`USER ${userId} RECALIBRATED TO ${newStatus}`, 'success');
  };

  const saveConfiguration = () => {
    onShowToast(`PERSISTED INTEGRITY SHIELD MATRIX FOR ${selectedUser.name}`, 'success');
  };

  return (
    <div className="space-y-6 text-left select-none animate-in fade-in duration-200" id="user-administration-viewport">
      
      {/* 1. SECURE BREADCRUMB SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1.5 select-none text-left">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-700">/</span>
            <span className="text-gray-500">Management</span>
            <span className="text-gray-700">/</span>
            <span className="text-brand-cyan">Users</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display">
            Enterprise User Administration
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Control access, define roles, and audit security events across the intelligence network.
          </p>
        </div>

        {/* Action Header Button docks identical to layout illustration */}
        <div className="flex flex-wrap items-center gap-3 self-end md:self-auto" id="user-hub-actions">
          
          {/* Invite Link [Link Icon] */}
          <button
            onClick={handleInvitations}
            className="flex items-center gap-2 px-4 py-2 bg-[#121829] border border-brand-cyan/25 hover:border-brand-cyan/60 rounded-lg text-xs font-bold text-brand-cyan hover:bg-[#1a2e3b]/30 transition-all cursor-pointer"
          >
            <Link size={13} />
            <span>Invite Link</span>
          </button>

          {/* Export Audit Log [Export Icon] */}
          <button
            onClick={handleAuditExport}
            className="flex items-center gap-2 px-4 py-2 bg-[#121829] border border-[#1e293b] hover:border-gray-500 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Download size={13} className="text-gray-400" />
            <span>Export Audit Log</span>
          </button>

          {/* Create User [Plus icon inside user group layout] */}
          <button
            onClick={handleCreateUserClick}
            className="flex items-center gap-2 px-4 py-2 bg-brand-cyan hover:bg-[#00c993] text-[#070b14] rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <UserPlus size={13} />
            <span>Create User</span>
          </button>

        </div>
      </div>

      {/* 2. SECURITY METADATA KPI DECK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* STAT 1: TOTAL USERS */}
        <div className="bg-[#121829] border border-[#1e293b]/55 p-5 rounded-xl shadow-sm hover:border-[#334155] transition-all">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                TOTAL USERS
              </span>
              <span className="text-3xl font-extrabold font-display tracking-tight text-white block">
                1,248
              </span>
              <div className="flex items-center gap-1 text-[10px] text-brand-cyan font-mono font-bold mt-2">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
                </svg>
                <span>+12% vs last month</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-brand-cyan/5 border border-brand-cyan/15 flex items-center justify-center text-brand-cyan rounded-lg">
              <Users size={16} />
            </div>
          </div>
        </div>

        {/* STAT 2: ACTIVE SESSIONS */}
        <div className="bg-[#121829] border border-[#1e293b]/55 p-5 rounded-xl shadow-sm hover:border-[#334155] transition-all">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                ACTIVE SESSIONS
              </span>
              <span className="text-3xl font-extrabold font-display tracking-tight text-white block">
                342
              </span>
              <span className="text-[10px] text-gray-500 font-mono block mt-2">
                Real-time terminal monitoring
              </span>
            </div>
            <div className="h-10 w-10 bg-brand-cyan/5 border border-brand-cyan/15 flex items-center justify-center text-brand-cyan rounded-lg">
              <Activity size={16} />
            </div>
          </div>
        </div>

        {/* STAT 3: PENDING INVITES */}
        <div className="bg-[#121829] border border-[#1e293b]/55 p-5 rounded-xl shadow-sm hover:border-[#334155] transition-all">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                PENDING INVITES
              </span>
              <span className="text-3xl font-extrabold font-display tracking-tight text-white block">
                18
              </span>
              <span className="text-[10px] text-gray-500 font-mono block mt-2">
                Awaiting organizational verification
              </span>
            </div>
            <div className="h-10 w-10 bg-brand-cyan/5 border border-brand-cyan/15 flex items-center justify-center text-brand-cyan rounded-lg">
              <Mail size={16} />
            </div>
          </div>
        </div>

        {/* STAT 4: SECURITY ALERTS */}
        <div className="bg-[#121829] border border-[#1e293b]/55 p-5 rounded-xl shadow-sm hover:border-[#334155] transition-all">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                SECURITY ALERTS
              </span>
              <span className="text-3xl font-extrabold font-display tracking-tight text-red-500 block">
                4
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-red-500 border border-red-500/30 px-1.5 py-0.5 rounded font-mono bg-red-500/5 mt-2 block w-fit">
                <AlertTriangle size={10} className="animate-pulse" />
                <span>Requires immediate review</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-red-500/5 border border-red-500/20 flex items-center justify-center text-red-400 rounded-lg">
              <ShieldAlert size={16} />
            </div>
          </div>
        </div>

      </div>

      {/* 3. WORKSPACE CORE: LEFT USERS LIST & RIGHT PANEL SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COMPONENT COLUMN (TABLE) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 space-y-4">
            
            {/* Filter toolbar matches screen header exact styling */}
            <div className="flex justify-between items-center bg-[#070b14]/50 border border-[#1e293b]/55 rounded-lg px-4 py-2 text-xs">
              
              <div className="flex items-center gap-4">
                {/* Filters setup action button */}
                <button
                  onClick={() => onShowToast('SURVEILLANCE WORKSPACE FILTER PANEL TOGGLED', 'info')}
                  className="flex items-center gap-2 px-3 py-1 bg-[#121829] hover:bg-slate-800 border border-[#1e293b] rounded font-semibold text-gray-300 transition-colors"
                >
                  <Sliders size={12} className="text-gray-400" />
                  <span>Filters</span>
                </button>

                <span className="font-mono text-gray-400">
                  Selected: <span className="text-brand-cyan font-bold">{countChecked} users</span>
                </span>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-3 text-gray-500">
                <button
                  onClick={() => onShowToast('SYNCHRONIZED ACTIVE SECURITY DIRECTORY', 'info')}
                  className="hover:text-white transition-colors"
                  title="Refresh directory view"
                >
                  <RotateCw size={13} />
                </button>
                <div className="h-4 w-px bg-slate-850"></div>
                <button
                  onClick={() => onShowToast('RETRIEVING ADVANCED RECORD OPTIONS', 'info')}
                  className="hover:text-white transition-colors"
                >
                  <MoreVertical size={14} />
                </button>
              </div>

            </div>

            {/* HIGH FIDELITY TABLE DATALIST */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border-collapse select-none">
                <thead>
                  <tr className="border-b border-[#1e293b]/40 text-gray-500 font-mono font-bold uppercase text-[10px] tracking-wider pb-3">
                    <th className="py-2.5 w-8">
                      <input
                        type="checkbox"
                        checked={usersList.length > 0 && usersList.every(u => checkedUsers[u.id])}
                        onChange={handleSelectAll}
                        className="accent-brand-cyan bg-[#070b14] border-[#1e293b] rounded cursor-pointer"
                      />
                    </th>
                    <th className="py-2.5 font-bold">USER NAME</th>
                    <th className="py-2.5 font-bold">ROLE</th>
                    <th className="py-2.5 font-bold">DEPARTMENT</th>
                    <th className="py-2.5 font-bold">LAST LOGIN</th>
                    <th className="py-2.5 font-bold">STATUS</th>
                    <th className="py-2.5 text-right font-bold">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e293b]/25">
                  {usersList.map((user) => {
                    const isSelected = selectedUserId === user.id;
                    const isChecked = !!checkedUsers[user.id];

                    return (
                      <tr
                        key={user.id}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#1e293b]/25 border-l-2 border-brand-cyan' : 'hover:bg-[#1e293b]/10'
                        }`}
                        onClick={() => setSelectedUserId(user.id)}
                      >
                        {/* Checkbox column */}
                        <td className="py-3 px-1" onClick={(e) => handleToggleCheck(user.id, e)}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="accent-brand-cyan bg-[#070b14] border-[#1e293b] rounded cursor-pointer"
                          />
                        </td>

                        {/* User Identity Column */}
                        <td className="py-3 font-semibold text-white pr-2">
                          <div className="flex items-center gap-3">
                            {/* Profile Pic Placeholder matching Adrian Vance exactly */}
                            {user.avatarUrl ? (
                              <img
                                src={user.avatarUrl}
                                alt={user.name}
                                referrerPolicy="no-referrer"
                                className="h-8 w-8 rounded-full border border-brand-cyan/25 object-cover shrink-0"
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-slate-800 border border-[#1e293b] flex items-center justify-center font-mono font-bold text-gray-300 shrink-0 text-[10px]">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            )}
                            <div>
                              <div className="font-sans font-bold text-white text-xs">{user.name}</div>
                              <div className="text-[10px] text-gray-500 font-mono mt-0.5">{user.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Role field */}
                        <td className="py-3 font-medium text-gray-300">
                          {user.role}
                        </td>

                        {/* Department field */}
                        <td className="py-3 text-gray-400 font-medium">
                          {user.department}
                        </td>

                        {/* Last Login date metadata */}
                        <td className="py-3 font-mono text-gray-500">
                          {user.lastLogin}
                        </td>

                        {/* Badges column */}
                        <td className="py-3">
                          {user.status === 'ACTIVE' && (
                            <span className="text-[9px] text-[#00e0a5] border border-[#00e0a5]/20 bg-[#00e0a5]/5 px-2 py-0.5 rounded font-bold font-mono">
                              ACTIVE
                            </span>
                          )}
                          {user.status === 'PENDING' && (
                            <span className="text-[9px] text-gray-400 border border-[#1e293b]/80 bg-[#121829] px-2 py-0.5 rounded font-bold font-mono">
                              PENDING
                            </span>
                          )}
                          {user.status === 'SUSPENDED' && (
                            <span className="text-[9px] text-[#ef4444] border border-[#ef4444]/30 bg-[#ef4444]/5 px-2 py-0.5 rounded font-bold font-mono">
                              SUSPENDED
                            </span>
                          )}
                        </td>

                        {/* Detailed action triggers based on current status */}
                        <td className="py-3 text-right">
                          <div className="inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {user.status === 'ACTIVE' && (
                              <>
                                <button
                                  onClick={() => onShowToast(`EDIT PRIVILEGES FOR ${user.name}`, 'info')}
                                  className="text-gray-400 hover:text-white transition-colors"
                                  title="Edit profile"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  onClick={() => onShowToast(`TRIGGERING TOKEN RE-KEY FOR: ${user.name}`, 'info')}
                                  className="text-gray-400 hover:text-brand-cyan transition-colors"
                                  title="Rotate authorization keys"
                                >
                                  <Key size={13} />
                                </button>
                                <button
                                  onClick={() => handleStatusChange(user.id, 'SUSPENDED')}
                                  className="text-gray-400 hover:text-[#ef4444] transition-colors"
                                  title="Suspend access"
                                >
                                  <Slash size={13} />
                                </button>
                              </>
                            )}

                            {user.status === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => onShowToast(`RESEND INVITATION PACKET TO: ${user.email}`, 'success')}
                                  className="text-gray-400 hover:text-brand-cyan transition-colors"
                                  title="Resend invite"
                                >
                                  <Mail size={13} />
                                </button>
                                <button
                                  onClick={() => handleStatusChange(user.id, 'SUSPENDED')}
                                  className="text-gray-400 hover:text-[#ef4444] transition-colors"
                                  title="Cancel invitation"
                                >
                                  <X size={13} />
                                </button>
                              </>
                            )}

                            {user.status === 'SUSPENDED' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                                  className="text-gray-400 hover:text-brand-cyan transition-colors"
                                  title="Unsuspend / Activate"
                                >
                                  <RotateCw size={13} />
                                </button>
                                <button
                                  onClick={() => {
                                    setUsersList(prev => prev.filter(u => u.id !== user.id));
                                    onShowToast(`REMOVED ADMINISTATOR ${user.name} FROM DIRECTORY`, 'success');
                                  }}
                                  className="text-gray-400 hover:text-[#ef4444] transition-colors"
                                  title="Permanently remove"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-[#1e293b]/25 gap-3">
              <span className="font-mono text-gray-500 text-[11px]">
                Showing 4 of 1,248 Users
              </span>

              {/* Page Buttons list */}
              <div className="inline-flex items-center gap-1.5" id="user-pagination-group">
                <button
                  onClick={() => onShowToast('RETRIEVING SOURCE ARCHIVES', 'info')}
                  className="px-2 py-1 bg-[#070b14] border border-[#1e293b] text-gray-400 rounded hover:text-white hover:border-[#475569] text-[10px] font-bold"
                >
                  &lt;
                </button>
                <button className="px-2.5 py-1 bg-[#00e0a5]/10 border border-[#00e0a5]/30 text-brand-cyan font-bold rounded text-[10px]">
                  1
                </button>
                <button
                  onClick={() => onShowToast('LOADING PROFILE SEGMENT 2', 'info')}
                  className="px-2.5 py-1 bg-[#070b14] border border-[#1e293b] text-gray-400 hover:text-white rounded text-[10px] font-bold"
                >
                  2
                </button>
                <button
                  onClick={() => onShowToast('LOADING PROFILE SEGMENT 3', 'info')}
                  className="px-2.5 py-1 bg-[#070b14] border border-[#1e293b] text-gray-400 hover:text-white rounded text-[10px] font-bold"
                >
                  3
                </button>
                <span className="text-gray-500 px-1 font-mono text-[10px]">...</span>
                <button
                  onClick={() => onShowToast('LOADING SOVEREIGN END SEGMENT 31', 'info')}
                  className="px-2.5 py-1 bg-[#070b14] border border-[#1e293b] text-gray-400 hover:text-white rounded text-[10px] font-bold"
                >
                  31
                </button>
                <button
                  onClick={() => onShowToast('RETRIEVING SUBSEQUENT RECORD SET', 'info')}
                  className="px-2 py-1 bg-[#070b14] border border-[#1e293b] text-gray-400 rounded hover:text-white hover:border-[#475569] text-[10px] font-bold"
                >
                  &gt;
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT DRAWER COLUMN: USER DETAILS AND SECURITY CALIBRATION (1/3 area) */}
        {isSidebarOpen && selectedUser && (
          <div className="col-span-1 border border-[#1e293b]/55 bg-[#121829] rounded-xl p-5 space-y-6 flex flex-col justify-between" id="user-profile-details">
            
            <div className="space-y-6">
              
              {/* Profile sub-header */}
              <div className="flex justify-between items-start border-b border-[#1e293b]/40 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight font-sans">
                    User Profile & Security
                  </h3>
                  <p className="text-[10px] font-mono text-gray-500 mt-1 uppercase">
                    SYS_SECURITY_CALIBRATOR
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    onShowToast('HIDDEN PROPERTY MANAGER SIDEBAR. TO RE-OPEN CLICK ANY ROW.', 'info');
                  }}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Avatar and Info Card block matches screenshot nicely */}
              <div className="flex items-center gap-4 bg-[#070b14]/50 border border-[#1e293b]/35 p-4 rounded-xl">
                {selectedUser.avatarUrl ? (
                  <img
                    src={selectedUser.avatarUrl}
                    alt={selectedUser.name}
                    referrerPolicy="no-referrer"
                    className="h-14 w-14 rounded-xl border-2 border-brand-cyan shadow-md object-cover shrink-0"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-xl bg-slate-800 border-2 border-[#1e293b] flex items-center justify-center font-mono font-bold text-gray-300 shrink-0 text-lg">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div className="text-left font-sans">
                  <h4 className="text-base font-extrabold text-white tracking-tight leading-snug">
                    {selectedUser.name}
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-brand-cyan tracking-wider block mt-1 uppercase">
                    ID: {selectedUser.id}
                  </span>
                </div>
              </div>

              {/* RECENT ACTIVITY TIMELINE */}
              <div className="space-y-3 font-sans">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest pb-1 border-b border-[#1e293b]/15">
                  <span>RECENT ACTIVITY</span>
                  <button
                    onClick={() => onShowToast(`COMPILING AUDITED EVENT TIME SERIES FOR: ${selectedUser.name}`, 'info')}
                    className="text-brand-cyan hover:underline hover:text-white transition-all text-[9.5px]"
                  >
                    View Full Log
                  </button>
                </div>

                <div className="space-y-3.5 pl-1 pt-1">
                  {selectedUser.recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-[11px]">
                      {/* Interactive dot */}
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan block mt-1.5 shrink-0" />
                      <div>
                        <div className="text-gray-300 font-bold leading-relaxed">{activity.action}</div>
                        <div className="text-[9.5px] text-gray-500 mt-0.5 font-mono">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACCESS ENTITLEMENTS LIST WITH CHECKBOXES */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block pb-1 border-b border-[#1e293b]/15">
                  ACCESS ENTITLEMENTS
                </span>

                <div className="space-y-2">
                  
                  {/* Entitlement 1: Regional Access */}
                  <div
                    onClick={() => handleToggleEntitlement('regionalAccess')}
                    className="flex justify-between items-center bg-[#070b14]/50 border border-[#1e293b]/30 p-2.5 rounded-lg cursor-pointer hover:border-brand-cyan/40 transition-colors text-xs font-semibold font-sans text-gray-300"
                  >
                    <span>Regional Market Access</span>
                    {selectedUser.entitlements.regionalAccess ? (
                      <span className="text-[#00e0a5]">
                        <CheckCircle size={15} />
                      </span>
                    ) : (
                      <span className="text-gray-600">
                        <X size={15} />
                      </span>
                    )}
                  </div>

                  {/* Entitlement 2: Conflict Suite */}
                  <div
                    onClick={() => handleToggleEntitlement('predictiveSuite')}
                    className="flex justify-between items-center bg-[#070b14]/50 border border-[#1e293b]/30 p-2.5 rounded-lg cursor-pointer hover:border-brand-cyan/40 transition-colors text-xs font-semibold font-sans text-gray-300"
                  >
                    <span>Conflict Predictive Suite</span>
                    {selectedUser.entitlements.predictiveSuite ? (
                      <span className="text-[#00e0a5]">
                        <CheckCircle size={15} />
                      </span>
                    ) : (
                      <span className="text-gray-600">
                        <X size={15} />
                      </span>
                    )}
                  </div>

                  {/* Entitlement 3: System Admin */}
                  <div
                    onClick={() => handleToggleEntitlement('sysAdmin')}
                    className="flex justify-between items-center bg-[#070b14]/50 border border-[#1e293b]/30 p-2.5 rounded-lg cursor-pointer hover:border-brand-cyan/40 transition-colors text-xs font-semibold font-sans text-gray-300"
                  >
                    <span>System Administration</span>
                    {selectedUser.entitlements.sysAdmin ? (
                      <span className="text-[#00e0a5]">
                        <CheckCircle size={15} />
                      </span>
                    ) : (
                      <span className="text-gray-600">
                        <X size={15} />
                      </span>
                    )}
                  </div>

                  {/* Entitlement 4: Audit Log View */}
                  <div
                    onClick={() => handleToggleEntitlement('auditLog')}
                    className="flex justify-between items-center bg-[#070b14]/50 border border-[#1e293b]/30 p-2.5 rounded-lg cursor-pointer hover:border-brand-cyan/40 transition-colors text-xs font-semibold font-sans text-gray-300"
                  >
                    <span>Audit Log View</span>
                    {selectedUser.entitlements.auditLog ? (
                      <span className="text-[#00e0a5]">
                        <CheckCircle size={15} />
                      </span>
                    ) : (
                      <span className="text-gray-600">
                        <X size={15} />
                      </span>
                    )}
                  </div>

                </div>
              </div>

              {/* SECURITY OVERRIDE TRIGGER BUTTONS */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block pb-1 border-b border-[#1e293b]/15">
                  SECURITY OVERRIDE
                </span>
                
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Suspend Access block button */}
                  <button
                    onClick={() => {
                      const nextStatus = selectedUser.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
                      handleStatusChange(selectedUser.id, nextStatus);
                    }}
                    className={`py-2 text-xs font-semibold border rounded transition-all cursor-pointer text-center ${
                      selectedUser.status === 'SUSPENDED'
                        ? 'border-brand-cyan text-brand-cyan bg-brand-cyan/5 hover:bg-brand-cyan/10'
                        : 'border-[#ef4444]/40 hover:border-red-500 text-[#ef4444] bg-[#ef4444]/5'
                    }`}
                  >
                    {selectedUser.status === 'SUSPENDED' ? 'Activate Access' : 'Suspend Access'}
                  </button>

                  {/* Reset MFA block button */}
                  <button
                    onClick={() => onShowToast(`MFA RE-CALIBRATED DISPATCH COMPLETED FOR: ${selectedUser.name}`, 'success')}
                    className="py-2 bg-transparent text-gray-300 hover:text-white border border-[#1e293b] hover:border-[#475569] rounded text-[11px] font-semibold transition-all cursor-pointer text-center"
                  >
                    Reset MFA
                  </button>

                </div>
              </div>

            </div>

            {/* Bottom Primary Save Config button */}
            <button
              onClick={saveConfiguration}
              className="w-full mt-6 py-2.5 bg-brand-cyan hover:bg-[#00c993] text-[#070b14] font-bold text-xs rounded transition-all cursor-pointer active:scale-95 shadow-md text-center block"
            >
              Save Configuration Changes
            </button>

          </div>
        )}

        {/* If Drawer sidebar panel was closed, give a floating toggle button right inside column layout or invite users back */}
        {!isSidebarOpen && (
          <div className="col-span-1 bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 flex flex-col justify-center items-center text-center space-y-4">
            <span className="h-10 w-10 rounded-full bg-[#1e293b]/50 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
              <Users size={16} />
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">Profile Panel Collapsed</h4>
              <p className="text-[10px] text-gray-500 mt-1">Select any user profile row inside the registry to view high credentials analytics.</p>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-xs text-brand-cyan hover:underline font-bold"
            >
              Expand Sidebar Panel
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

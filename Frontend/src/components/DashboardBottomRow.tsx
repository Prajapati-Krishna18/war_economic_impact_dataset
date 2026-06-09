/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  History,
  FileText,
  Zap,
  PlusCircle,
  Calendar,
  UserPlus,
  Compass,
  Download,
  CheckCircle2,
} from 'lucide-react';
import type { ActivityData, ReportData } from '../types';

interface DashboardBottomRowProps {
  activities: ActivityData[];
  reports: ReportData[];
  onCreateAlertClick: () => void;
  onScheduleReportClick: () => void;
  onInviteUserClick: () => void;
}

export default function DashboardBottomRow({
  activities,
  reports,
  onCreateAlertClick,
  onScheduleReportClick,
  onInviteUserClick,
}: DashboardBottomRowProps) {
  return (
    <div
      id="dashboard-telemetry-bottom-row"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none"
    >
      {/* COLUMN 1: ACTIVITY FEED */}
      <div
        id="panel-activity-feed"
        className="bg-[#121829] border border-[#1e293b]/50 rounded-xl p-5 flex flex-col justify-between hover:border-brand-cyan/15 transition-all text-left"
      >
        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 border-b border-[#1e293b]/40 pb-2.5">
            <History size={16} className="text-brand-cyan animate-pulse-slow" />
            <h3 className="text-xs font-bold tracking-tight text-white uppercase font-sans">
              Activity Feed
            </h3>
          </div>

          {/* List items */}
          <div className="space-y-4 select-text" id="activity-scroller-list">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-3 items-start relative pl-1 group">
                {/* Custom dot indicator matching screenshot */}
                <div className="mt-1.5 shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-200 leading-snug tracking-tight group-hover:text-white transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono tracking-tighter mt-0.5">
                    {act.type} • {act.timeAgo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal status feed indicator */}
        <div className="mt-4 text-[9px] font-mono text-gray-500 pt-2 border-t border-[#1e293b]/20">
          Showing last 3 active macroeconomic feeds.
        </div>
      </div>

      {/* COLUMN 2: RECENT REPORTS */}
      <div
        id="panel-recent-reports"
        className="bg-[#121829] border border-[#1e293b]/50 rounded-xl p-5 flex flex-col justify-between hover:border-brand-cyan/15 transition-all text-left"
      >
        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 border-b border-[#1e293b]/40 pb-2.5">
            <FileText size={16} className="text-brand-cyan" />
            <h3 className="text-xs font-bold tracking-tight text-white uppercase font-sans">
              Recent Reports
            </h3>
          </div>

          {/* Report line lists */}
          <div className="space-y-3.5 select-text" id="reports-listing-scroller">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="flex items-center gap-3.5 group cursor-pointer"
                onClick={() => alert(`Opening economic intelligence file: [${rep.title}]. Size: ${rep.size || '3.5 MB'}`)}
              >
                {/* PDF/doc outline icon matched visually to screenshot */}
                <div className="h-9 w-9 rounded bg-[#0b0e17] border border-[#1e293b] flex items-center justify-center shrink-0 group-hover:border-brand-cyan/40 transition-colors">
                  <span className="text-[9px] font-mono font-bold text-gray-400 group-hover:text-brand-cyan transition-colors">
                    PDF
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-200 truncate group-hover:text-white leading-tight">
                    {rep.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5 tracking-tighter col-span-1">
                    {rep.dateLabel}
                  </p>
                </div>

                {/* Micro Hover Download Element */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/5 rounded">
                  <Download size={13} className="text-brand-cyan" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Link */}
        <button
          onClick={() => alert('Launching Centralized Report Archival Index (SIP-PDF)...')}
          className="mt-4 text-[10px] font-mono text-brand-cyan font-semibold hover:underline w-fit"
        >
          Explore Complete PDF Database &rarr;
        </button>
      </div>

      {/* COLUMN 3: QUICK ACTIONS */}
      <div
        id="panel-quick-actions"
        className="bg-[#121829] border border-[#1e293b]/50 rounded-xl p-5 flex flex-col justify-between hover:border-brand-cyan/15 transition-all text-left"
      >
        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 border-b border-[#1e293b]/40 pb-2.5">
            <Zap size={16} className="text-brand-cyan" />
            <h3 className="text-xs font-bold tracking-tight text-white uppercase font-sans">
              Quick Actions
            </h3>
          </div>

          {/* Vertical action list */}
          <div className="space-y-2.5">
            {/* Action 1 */}
            <button
              id="action-btn-create-alert"
              onClick={onCreateAlertClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 bg-[#0e111a]/55 border border-[#1e293b] hover:border-brand-cyan/40 hover:bg-[#1e293b]/40 rounded-lg text-left transition-all duration-150 text-xs font-bold text-white group"
            >
              <div className="h-6 w-6 rounded bg-[#10b981]/5 border border-[#10b981]/15 flex items-center justify-center text-[#10b981] group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/25 transition-colors shrink-0">
                <PlusCircle size={14} className="text-[#00e0a5]" />
              </div>
              <span className="text-xs text-brand-cyan font-bold tracking-tight">Create Alert</span>
            </button>

            {/* Action 2 */}
            <button
              id="action-btn-schedule-report"
              onClick={onScheduleReportClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 bg-[#0e111a]/55 border border-[#1e293b] hover:border-brand-cyan/30 hover:bg-[#1e293b]/40 rounded-lg text-left transition-all duration-150 text-xs font-bold text-white group"
            >
              <div className="h-6 w-6 rounded bg-slate-500/5 border border-slate-500/15 flex items-center justify-center text-gray-400 group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/25 transition-colors shrink-0">
                <Calendar size={14} />
              </div>
              <span className="text-xs text-gray-300 font-bold tracking-tight">Schedule Report</span>
            </button>

            {/* Action 3 */}
            <button
              id="action-btn-invite-user"
              onClick={onInviteUserClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 bg-[#0e111a]/55 border border-[#1e293b] hover:border-brand-cyan/30 hover:bg-[#1e293b]/40 rounded-lg text-left transition-all duration-150 text-xs font-bold text-white group"
            >
              <div className="h-6 w-6 rounded bg-slate-500/5 border border-slate-500/15 flex items-center justify-center text-gray-400 group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/25 transition-colors shrink-0">
                <UserPlus size={14} />
              </div>
              <span className="text-xs text-gray-300 font-bold tracking-tight">Invite User</span>
            </button>
          </div>
        </div>

        {/* System Status Banner exactly matched to screenshot */}
        <div
          id="system-status-indicator-banner"
          className="mt-4 p-2.5 bg-[#0e111a]/90 rounded-lg border border-[#1e293b]/40 flex items-center justify-between"
        >
          <span className="text-[10px] text-gray-400 font-sans tracking-tight">
            System Status: All nodes operational
          </span>
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
          </span>
        </div>
      </div>
    </div>
  );
}

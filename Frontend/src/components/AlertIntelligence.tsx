/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SlidersHorizontal, ShieldCheck } from 'lucide-react';
import type { AlertData } from '../types';

interface AlertIntelligenceProps {
  alerts: AlertData[];
  onDismissAlert?: (id: string) => void;
  
  onViewAllAlertsClick?: () => void;
}

export default function AlertIntelligence({
  alerts,
  onDismissAlert,
  onViewAllAlertsClick,
}: AlertIntelligenceProps) {
  return (
    <div
      id="critical-alerts-intelligence-panel"
      className="bg-[#121829] border border-[#1e293b]/50 rounded-xl p-5 flex flex-col justify-between hover:border-brand-cyan/15 transition-all h-full"
    >
      {/* Header with Title and Sliders Icon */}
      <div className="flex justify-between items-center mb-4 select-none text-left">
        <h3 className="text-sm font-bold tracking-tight text-white font-sans uppercase flex items-center gap-2">
          <span>Alert Intelligence</span>
          {alerts.length > 0 && (
            <span className="h-2 w-2 rounded-full bg-[#ef4444] animate-pulse"></span>
          )}
        </h3>
        <button
          id="btn-filter-alerts"
          onClick={() => alert('Filter applied: displaying active, unacknowledged macroeconomics alerts.')}
          className="p-1 px-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-all"
          title="Terminal Alert Settings"
        >
          <SlidersHorizontal size={15} />
        </button>
      </div>

      {/* Alerts Stream List */}
      <div className="space-y-4 flex-1 overflow-y-auto pr-1 text-left select-text" id="alerts-scroller-list">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 h-full">
            <ShieldCheck size={36} className="text-brand-cyan mb-2 opacity-60 animate-bounce" />
            <p className="text-xs font-mono">ALL CLEAR</p>
            <p className="text-[10px] text-gray-600 mt-0.5">No active economic alerts triggered.</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const isCritical = alert.severity === 'critical';
            const isWarning = alert.severity === 'warning';

            // Exact pill decorations
            let badgeBorderClass = '';
            let valLabel = '';

            if (isCritical) {
              badgeBorderClass = 'border-[#ef4444]/40 text-[#ef4444] bg-[#ef4444]/5';
              valLabel = 'CRITICAL';
            } else if (isWarning) {
              badgeBorderClass = 'border-brand-cyan/40 text-brand-cyan bg-brand-cyan/5';
              valLabel = 'WARNING';
            } else {
              badgeBorderClass = 'border-slate-500/40 text-slate-300 bg-slate-500/5';
              valLabel = 'INFO';
            }

            return (
              <div
                key={alert.id}
                id={`alert-row-${alert.id}`}
                className="group relative border-b border-[#1e293b]/40 pb-4 last:border-0 last:pb-0 transition-all duration-200"
              >
                {/* Meta Row: Outlined badge + time */}
                <div className="flex justify-between items-center mb-1.5 select-none">
                  <span
                    className={`px-2 py-0.5 border rounded-full text-[9px] font-mono font-bold tracking-wider leading-none ${badgeBorderClass}`}
                  >
                    {valLabel}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-mono tracking-tighter">
                      {alert.timeAgo}
                    </span>
                    {onDismissAlert && (
                      <button
                        onClick={() => onDismissAlert(alert.id)}
                        className="opacity-0 group-hover:opacity-100 text-[9px] font-mono text-gray-500 hover:text-red-400 cursor-pointer select-none transition-opacity ml-1"
                        title="Dismiss Alert"
                      >
                        [ACK]
                      </button>
                    )}
                  </div>
                </div>

                {/* Bold Subject Line */}
                <h4 className="text-xs font-bold text-white leading-snug tracking-tight mb-1 hover:text-brand-cyan cursor-pointer transition-colors">
                  {alert.title}
                </h4>

                {/* Body paragraph */}
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed tracking-normal">
                  {alert.description}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Button link in bottom footer */}
      <button
        id="btn-view-all-alerts"
        onClick={onViewAllAlertsClick}
        className="w-full mt-4 py-2 bg-[#0b0e17] hover:bg-[#1e293b]/30 border border-[#1e293b]/50 rounded-lg text-center text-xs text-brand-cyan font-bold transition-all hover:shadow-[0_0_8px_rgba(0,e2,a5,0.1)] active:scale-[0.99]"
      >
        View All Intelligence Alerts
      </button>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Bell,
  CheckCircle,
  Archive,
  Settings,
  Shield,
  FileText,
  TrendingUp,
  Globe,
  Database,
  ChevronDown,
  Info,
  Sliders,
  RotateCw,
  MoreVertical,
  X,
  Download,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  AlertTriangle,
  Play
} from 'lucide-react';

interface NotificationHubProps {
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

type NotificationCategory = 'All' | 'Security' | 'Reports' | 'Trade' | 'Conflicts' | 'System';
type SeverityFilter = 'All' | 'Critical' | 'Warning' | 'Info';

interface HubNotification {
  id: string;
  title: string;
  source: string;
  timeLabel: string;
  excerpt: string;
  fullDescription: string;
  category: Exclude<NotificationCategory, 'All'>;
  severity: Exclude<SeverityFilter, 'All'>;
  unread: boolean;
  refCode?: string;
  receivedTime?: string;
  keyTakeaways?: string[];
  attachments?: Array<{
    name: string;
    type: 'pdf' | 'dashboard';
    size?: string;
  }>;
}

export default function NotificationHub({ onShowToast }: NotificationHubProps) {
  // Setup detailed high fidelity mock list matching uploaded screen perfectly
  const [notifications, setNotifications] = useState<HubNotification[]>([
    {
      id: 'NOTIF-001',
      title: 'Cybersecurity Breach: Regional Data Center',
      source: 'InfoSec Sentinel • 14:20 GMT',
      timeLabel: '14:20 GMT',
      excerpt: 'An unauthorized access attempt was detected at the Frankfurt regional node. Multiple authentication failures originating from masked IP ranges. Immediate investigation required.',
      fullDescription: 'The Frankfurt Primary Sentinel Node (Node-DE-309) reported a targeted credential stuffing attempt originating from high-entropy anonymization proxies. Intrusion response protocols automated containment after five consecutive authentication failures on elevated analyst endpoints.',
      category: 'Security',
      severity: 'Critical',
      unread: true,
      refCode: 'SEC-INTEL-DE-9922',
      receivedTime: 'Today | 14:20:11 GMT',
      keyTakeaways: [
        'Endpoint Node-DE-309 isolated under Firewall Rule 54-A.',
        'No telemetry or classified analytical data compromised.',
        'MFA verification session lengths successfully halved for Central Europe analysts.'
      ],
      attachments: [
        { name: 'Intrusion_Response_Log.pdf', type: 'pdf', size: '1.2MB' }
      ]
    },
    {
      id: 'NOTIF-002',
      title: 'Trade Volume Variance: Southeast Asia',
      source: 'Trade Flow Engine • 11:45 GMT',
      timeLabel: '11:45 GMT',
      excerpt: 'Export volumes from Vietnam and Thailand show a 12% deviation from 30-day moving average. Supply chain disruption correlated with recent logistics strike.',
      fullDescription: 'Real-time port telemetry from Hai Phong and Laem Chabang indicates localized container packing queues. Heavy industrial delays stemming from short-term overland rail strikes have temporarily throttled logistics outputs.',
      category: 'Trade',
      severity: 'Warning',
      unread: true,
      refCode: 'TRD-VOL-SEA-341',
      receivedTime: 'Today | 11:45:00 GMT',
      keyTakeaways: [
        'Overall maritime throughput dropped by 12% across five monitored lanes.',
        'Dry cargo dwell times elevated to 4.2 days.',
        'Cargo redirected to Singapore hubs to mitigate regional congestion.'
      ],
      attachments: [
        { name: 'SEA_Logistics_Friction_Model.pdf', type: 'pdf', size: '2.5MB' }
      ]
    },
    {
      id: 'NOTIF-003', // Selected by default
      title: 'Q3 Macro-Economic Outlook Released',
      source: 'Intelligence Dept • 09:00 GMT',
      timeLabel: '09:00 GMT',
      excerpt: 'The comprehensive Q3 outlook covering inflation projections, central bank rate paths, and emerging market debt sustainability is now available for review.',
      fullDescription: 'The Analytical Division has finalized the Q3 Macro-Economic Outlook. This 140-page dossier provides deep-dive analysis into G7 fiscal policies, the impact of decarbonization mandates on manufacturing hubs, and proprietary volatility forecasting for the remainder of the year.',
      category: 'Reports',
      severity: 'Info',
      unread: true,
      refCode: 'INT-2023-Q3-09',
      receivedTime: 'Oct 12, 2023 | 09:00:14 GMT',
      keyTakeaways: [
        'Revised GDP growth for ASEAN-6.',
        'Supply chain robustness testing results.',
        'Liquidity stress scenarios for Tier 2 lenders.'
      ],
      attachments: [
        { name: 'Q3_Outlook_Full_Report.pdf', type: 'pdf', size: '4.2MB' },
        { name: 'Interactive Data Dashboard', type: 'dashboard' }
      ]
    },
    {
      id: 'NOTIF-004',
      title: 'Geopolitical Escalation: Caspian Region',
      source: 'Geopolitical Monitor • 08:30 GMT',
      timeLabel: '08:30 GMT',
      excerpt: 'Increased military posturing reported along the northern Caspian border. Potential impact on pipeline security and energy transit routes monitored.',
      fullDescription: 'Deployment patterns tracked via satellite infrastructure show armored vehicle concentrations close to critical natural gas terminal assets. Regional security coordinates have activated surveillance alerts.',
      category: 'Conflicts',
      severity: 'Warning',
      unread: false,
      refCode: 'GEO-CASP-8821',
      receivedTime: 'Oct 12, 2023 | 08:30:25 GMT',
      keyTakeaways: [
        'Strategic gas lines operating under normal pressure parameters.',
        'Spot price premium index for oil rose by 1.8% inside of 2 hours.',
        'Alternative maritime routes activated for pipeline engineering maintenance crews.'
      ],
      attachments: [
        { name: 'Caspian_Energy_Exposure_Assess.pdf', type: 'pdf', size: '3.1MB' }
      ]
    },
    {
      id: 'NOTIF-005',
      title: 'Consensus Server Synchronization Complete',
      source: 'Core Node Monitor • 04:12 GMT',
      timeLabel: '04:12 GMT',
      excerpt: 'All consensus backup engines across North America and Western Europe have successfully synthesized block metrics.',
      fullDescription: 'Automated consensus checks completed across the decentralized database nodes and backup servers. System integrity index validated at 99.999% with no synchronization faults compiled.',
      category: 'System',
      severity: 'Info',
      unread: false,
      refCode: 'SYS-SYNC-4402',
      receivedTime: 'Oct 11, 2023 | 22:15:00 GMT',
      keyTakeaways: [
        'Global server data consensus fully synchronized.',
        'Database write throughput sustained at 142k records/sec.',
        'No packet loss reported during G7 secure dispatch protocol.'
      ],
      attachments: [
        { name: 'Sync_Telemetry_Manifest.pdf', type: 'pdf', size: '1.1MB' }
      ]
    }
  ]);

  // View state configuration
  const [selectedNotifId, setSelectedNotifId] = useState<string>('NOTIF-003');
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityFilter>('All');
  const [currentTimeRange, setCurrentTimeRange] = useState<string>('Last 24 Hours');
  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);

  const selectedNotification = notifications.find(n => n.id === selectedNotifId) || notifications[2];

  // Handler events
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    onShowToast('MARKED ALL SYSTEM SIGNALS AS READ', 'success');
  };

  const handleBulkArchive = () => {
    setNotifications(prev => prev.filter(n => n.unread));
    onShowToast('ARCHIVED ALL VIEWED SYSTEM SIGNALS', 'success');
  };

  const handleSelectNotification = (id: string) => {
    setSelectedNotifId(id);
    // Automatically flag as read when selected
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleApplySettings = () => {
    setOpenSettingsModal(false);
    onShowToast('SAVED CRITICAL SECURE DISPATCH COMPLIANCE CRITERIA', 'success');
  };

  // Filter computation rules
  const filteredNotifications = notifications.filter(n => {
    const matchCat = selectedCategory === 'All' || n.category === selectedCategory;
    const matchSev = selectedSeverity === 'All' || n.severity === selectedSeverity;
    return matchCat && matchSev;
  });

  return (
    <div className="space-y-6 text-left select-none relative animate-in fade-in duration-200" id="notification-hub-viewport">
      
      {/* 1. TOP BREADCRUMB & INSTRUMENTAL HEADER BOARD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1.5 text-left">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-700">/</span>
            <span className="text-brand-cyan">Notifications</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display">
            Institutional Notification Hub
          </h2>
        </div>

        {/* Action Header Button decks identical to layout illustration */}
        <div className="flex flex-wrap items-center gap-2.5 self-end md:self-auto" id="notification-hub-actions">
          
          {/* Mark All Read button */}
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-[#121829] border border-[#1e293b] hover:border-gray-500 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <CheckCircle size={13} className="text-brand-cyan" />
            <span>Mark All Read</span>
          </button>

          {/* Notification Settings button */}
          <button
            onClick={() => setOpenSettingsModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#121829] border border-[#1e293b] hover:border-gray-500 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Settings size={13} className="text-gray-400" />
            <span>Notification Settings</span>
          </button>

          {/* Bulk Archive button */}
          <button
            onClick={handleBulkArchive}
            className="flex items-center gap-2 px-4 py-2 bg-[#121829] border border-[#1e293b] hover:border-gray-505 hover:bg-red-500/5 hover:text-red-400 rounded-lg text-xs font-bold text-gray-300 transition-all cursor-pointer"
          >
            <Archive size={13} className="text-gray-400" />
            <span>Bulk Archive</span>
          </button>

        </div>
      </div>

      {/* 2. SECURITY SEVERITY FILTER SYSTEM PANEL */}
      <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5" id="notification-filtration-card">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Group of Filters */}
          <div className="space-y-4 flex-1">
            
            {/* Row 1: Categories */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
              <span className="font-mono text-gray-500 uppercase tracking-widest text-[9px] font-bold w-20 shrink-0">
                CATEGORIES
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {(['All', 'Security', 'Reports', 'Trade', 'Conflicts', 'System'] as NotificationCategory[]).map(cat => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        onShowToast(`FILTERED STREAM BY CLASS: ${cat.toUpperCase()}`, 'info');
                      }}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        isActive
                          ? 'bg-brand-cyan text-[#070b14]'
                          : 'bg-[#070b14]/50 border border-[#1e293b] text-gray-400 hover:text-white hover:border-gray-550'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 2: Severity */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
              <span className="font-mono text-gray-500 uppercase tracking-widest text-[9px] font-bold w-20 shrink-0">
                SEVERITY
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                
                {/* Active/Default indicator styling */}
                <button
                  onClick={() => setSelectedSeverity('All')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    selectedSeverity === 'All'
                      ? 'bg-brand-cyan text-[#070b14]'
                      : 'bg-[#070b14]/50 border border-[#1e293b] text-gray-400 hover:text-white'
                  }`}
                >
                  All
                </button>

                {/* Critical pill */}
                <button
                  onClick={() => setSelectedSeverity('Critical')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 border ${
                    selectedSeverity === 'Critical'
                      ? 'bg-[#ef4444]/25 border-red-500 text-red-400 shadow-sm'
                      : 'bg-[#070b14]/50 border-[#1e293b] text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
                  <span>Critical</span>
                </button>

                {/* Warning pill */}
                <button
                  onClick={() => setSelectedSeverity('Warning')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 border ${
                    selectedSeverity === 'Warning'
                      ? 'bg-[#f59e0b]/25 border-amber-500 text-amber-400'
                      : 'bg-[#070b14]/50 border-[#1e293b] text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                  <span>Warning</span>
                </button>

                {/* Info pill */}
                <button
                  onClick={() => setSelectedSeverity('Info')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 border ${
                    selectedSeverity === 'Info'
                      ? 'bg-brand-cyan/2af border-brand-cyan text-brand-cyan bg-[#00e0a5]/5'
                      : 'bg-[#070b14]/50 border-[#1e293b] text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                  <span>Info</span>
                </button>

              </div>
            </div>

          </div>

          {/* Time range configuration dropdown inside the same card layout */}
          <div className="flex flex-col items-start lg:items-end w-full lg:w-fit shrink-0 gap-1.5 select-none self-stretch pt-4 lg:pt-0 border-t lg:border-t-0 border-[#1e293b]/50">
            <span className="font-mono text-gray-500 uppercase tracking-widest text-[9px] font-bold">
              TIME RANGE
            </span>
            <div className="relative w-full sm:w-44 lg:w-40">
              <select
                value={currentTimeRange}
                onChange={(e) => {
                  setCurrentTimeRange(e.target.value);
                  onShowToast(`CALIBRATING NOTIFICATION WINDOW FOR: ${e.target.value.toUpperCase()}`, 'info');
                }}
                className="appearance-none w-full bg-[#070b14] border border-[#1e293b] hover:border-gray-600 rounded px-3.5 py-2 pr-8 text-xs font-semibold text-gray-300 focus:outline-none cursor-pointer text-left"
              >
                <option value="Last 24 Hours">Last 24 Hours</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="All Archives">All Archives</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* 3. CORE TWO COLUMN NOTIFICATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: LIVE CHANNELS TICKER (2/3 area) */}
        <div className="lg:col-span-2 space-y-4">
          
          {filteredNotifications.length === 0 ? (
            <div className="bg-[#121829] border border-[#1e293b]/55 p-12 text-center text-gray-500 rounded-xl space-y-4">
              <span className="h-12 w-12 rounded-full bg-slate-800 border border-[#1e293b] flex items-center justify-center text-gray-400 mx-auto">
                <Bell size={20} />
              </span>
              <div>
                <h4 className="text-white font-bold text-xs">No notifications located</h4>
                <p className="text-[10px] text-gray-500 mt-1">No alerts found matching the current filtration parameters.</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedSeverity('All');
                }}
                className="text-xs text-brand-cyan hover:underline font-bold"
              >
                Reset Filter Indicators
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notif) => {
                const isSelected = selectedNotifId === notif.id;
                
                // Severity background alignments
                const severityBadgeColor = 
                  notif.severity === 'Critical' 
                    ? 'text-[#ef4444] border-[#ef4444]/20 bg-[#ef4444]/5' 
                    : notif.severity === 'Warning' 
                    ? 'text-amber-500 border-amber-500/20 bg-amber-500/5' 
                    : 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5';

                // Category tag color mappings
                const categoryTagColor = 'text-gray-400 border-[#1e293b] bg-[#070b14]/50';

                // Display Category Icon (Shield, FileText, Anchor, Globe, Database)
                const IconComponent = 
                  notif.category === 'Security' 
                    ? Shield 
                    : notif.category === 'Reports' 
                    ? FileText 
                    : notif.category === 'Trade' 
                    ? TrendingUp 
                    : notif.category === 'Conflicts' 
                    ? Globe 
                    : Database;

                // Color mappings for left avatar / box backgrounds inside mockup
                const iconBoxBg = 
                  notif.severity === 'Critical' 
                    ? 'bg-[#ef4444]/10 border-[#ef4444]/20 text-red-400' 
                    : notif.severity === 'Warning' 
                    ? 'bg-[#f59e0b]/10 border-[#f59e0b]/20 text-amber-450' 
                    : 'bg-brand-cyan/10 border-brand-cyan/20 text-brand-cyan';

                return (
                  <div
                    key={notif.id}
                    onClick={() => handleSelectNotification(notif.id)}
                    className={`relative bg-[#121829] border rounded-xl p-5 hover:bg-[#1e293b]/10 transition-all duration-200 cursor-pointer text-left flex gap-4 ${
                      isSelected 
                        ? 'border-brand-cyan shadow-[0_0_14px_rgba(0,224,165,0.06)]' 
                        : 'border-[#1e293b]/55 hover:border-[#475569]/60'
                    }`}
                  >
                    
                    {/* Left Icon Area mapping layout */}
                    <div className={`h-11 w-11 rounded-lg border flex items-center justify-center shrink-0 ${iconBoxBg} self-start`}>
                      <IconComponent size={18} />
                    </div>

                    {/* Channel Description Body */}
                    <div className="flex-1 space-y-2">
                      <div>
                        {/* Title and unread dot */}
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold tracking-tight text-white group-hover:text-brand-cyan transition-colors leading-snug">
                            {notif.title}
                          </h3>
                          
                          {/* Unread tracking dot */}
                          {notif.unread && (
                            <span className="h-2 w-2 rounded-full bg-brand-cyan block animate-pulse shrink-0 ml-3 mt-1" />
                          )}
                        </div>
                        {/* Source stamp */}
                        <p className="text-[10px] text-gray-500 font-mono mt-1">
                          Source: {notif.source}
                        </p>
                      </div>

                      {/* Excerpt narrative text */}
                      <p className="text-xs text-gray-400 leading-relaxed font-sans font-medium">
                        {notif.excerpt}
                      </p>

                      {/* Lower Badges alignment row */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        <span className={`text-[8px] font-bold font-mono tracking-wider px-2 py-0.5 rounded leading-none uppercase border ${severityBadgeColor}`}>
                          {notif.severity}
                        </span>
                        <span className={`text-[8px] font-bold font-mono tracking-wider px-2 py-0.5 rounded leading-none uppercase border ${categoryTagColor}`}>
                          {notif.category}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: DETAILED INVESTIGATION DASHBOARD (1/3 area) */}
        <div className="col-span-1 border border-[#1e293b]/55 bg-[#121829] rounded-xl p-5 space-y-6 flex flex-col justify-between" id="notification-detail-column">
          
          <div className="space-y-5">
            
            {/* Header Close button aligns nicely into sidebar */}
            <div className="flex justify-between items-start border-b border-[#1e293b]/40 pb-4">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight font-sans">
                  Notification Detail
                </h3>
              </div>
              <button
                onClick={() => {
                  onShowToast('TO MINIMIZE DETAIL OVERLAYS, DRILL DOWN ON ANY ROW OR PRESS CLOSE', 'info');
                }}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Sub-Header ID tagging mapping rules */}
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-bold font-mono tracking-wider px-2 py-0.5 rounded-md leading-none uppercase border ${
                selectedNotification.severity === 'Critical' 
                  ? 'text-red-400 border-red-500/20 bg-red-500/5' 
                  : selectedNotification.severity === 'Warning' 
                  ? 'text-amber-500 border-amber-500/20 bg-amber-500/5' 
                  : 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5'
              }`}>
                {selectedNotification.severity}
              </span>
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest leading-none">
                Report Ref: {selectedNotification.refCode || 'N/A'}
              </span>
            </div>

            {/* Title display */}
            <h2 className="text-base font-extrabold text-white tracking-tight leading-snug">
              {selectedNotification.title}
            </h2>

            {/* Received stamp block */}
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider leading-none">
              Received: {selectedNotification.receivedTime || selectedNotification.source}
            </p>

            {/* Deep dive complete paragraph */}
            <p className="text-[11.5px] font-medium leading-relaxed font-sans text-gray-300">
              {selectedNotification.fullDescription}
            </p>

            {/* Key takeaways timeline layout matching mockup exactly */}
            {selectedNotification.keyTakeaways && selectedNotification.keyTakeaways.length > 0 && (
              <div className="space-y-2.5 pl-1.5 pt-1.5 border-t border-[#1e293b]/25">
                <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                  Key takeaways include:
                </div>
                <div className="space-y-2">
                  {selectedNotification.keyTakeaways.map((item, id) => (
                    <div key={id} className="flex gap-2.5 items-start text-[11px] leading-relaxed text-gray-300">
                      <span className="h-1 w-1 rounded-full bg-brand-cyan block mt-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RELATED INTELLIGENCE SECTION */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block pb-1 border-b border-[#1e293b]/15">
                RELATED INTELLIGENCE
              </span>

              {/* Related materials attachment stack list */}
              <div className="space-y-2">
                {selectedNotification.attachments && selectedNotification.attachments.map((file, i) => {
                  
                  if (file.type === 'pdf') {
                    return (
                      <div
                        key={i}
                        onClick={() => onShowToast(`DOWNLOAD DIRECT DECLASSIFIED ATTACHMENT: ${file.name}`, 'success')}
                        className="group flex justify-between items-center bg-[#070b14]/50 border border-[#1e293b]/30 p-2.5 rounded-lg cursor-pointer hover:border-brand-cyan/40 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 text-xs text-gray-300">
                          {/* Crimson red PDF box */}
                          <div className="h-6 w-6 rounded bg-red-500/5 border border-red-500/25 flex items-center justify-center text-red-400 font-mono text-[8px] font-bold">
                            PDF
                          </div>
                          <span className="font-sans font-bold text-white group-hover:text-brand-cyan transition-colors truncate max-w-[170px] text-[11px]">
                            {file.name}
                          </span>
                        </div>
                        <button className="text-gray-500 group-hover:text-white transition-colors cursor-pointer pointer-events-none">
                          <Download size={13} />
                        </button>
                      </div>
                    );
                  }

                  // Dashboard route redirects
                  return (
                    <div
                      key={i}
                      onClick={() => onShowToast('MAPPED NAVIGATION STREAM TO LIVE INTERACTIVE METRIC DECK', 'info')}
                      className="group flex justify-between items-center bg-[#070b14]/50 border border-[#1e293b]/30 p-2.5 rounded-lg cursor-pointer hover:border-brand-cyan/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 text-xs text-gray-300">
                        {/* Teal chart icon box */}
                        <div className="h-6 w-6 rounded bg-brand-cyan/5 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan">
                          <TrendingUp size={11} />
                        </div>
                        <span className="font-sans font-bold text-white group-hover:text-brand-cyan transition-colors text-[11px]">
                          {file.name}
                        </span>
                      </div>
                      <button className="text-gray-500 group-hover:text-white transition-colors cursor-pointer pointer-events-none">
                        <ExternalLink size={12} className="text-brand-cyan" />
                      </button>
                    </div>
                  );
                })}

                {/* Highly aligned custom glowing SVG dashboard visual bar preview exactly matching mock details */}
                <div className="bg-[#070b14] border-2 border-slate-800 rounded-xl p-3 relative h-16 shadow-inner flex items-end justify-between overflow-hidden gap-1 select-none pt-4">
                  {/* Glowing graph backdrop */}
                  <div className="absolute inset-x-0 bottom-0 h-10 flex items-end justify-between px-3">
                    {[10, 18, 14, 28, 42, 30, 48, 65, 80].map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-brand-cyan/20 border-t border-brand-cyan/40 rounded-t shrink-0 group-hover:bg-brand-cyan/35"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  {/* Accent tag */}
                  <span className="absolute top-1.5 left-2.5 font-mono text-[7px] text-gray-500">SURVEILLANCE WORKSPACE PLOT (LIVE)</span>
                </div>

              </div>
            </div>

          </div>

          {/* Dual Action buttons aligned precisely to mock layouts */}
          <div className="grid grid-cols-2 gap-3 mt-6" id="detail-actions-dock">
            
            {/* Analyze Impact (Teal/Green button left) */}
            <button
              onClick={() => onShowToast(`CONCURRENT INTEGRITY IMPACT ANALYSIS DISPATCHED FOR: ${selectedNotification.title}`, 'success')}
              className="py-2.5 bg-brand-cyan hover:bg-[#00c993] text-[#070b14] font-bold text-xs rounded transition-all cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <TrendingUp size={13} />
              <span>Analyze Impact</span>
            </button>

            {/* View Report (outline button right) */}
            <button
              onClick={() => onShowToast(`TRANSITED READ ACCESS SEGMENT DIRECT TO REPORT HUB`, 'success')}
              className="py-2.5 bg-transparent border border-[#1e293b] hover:border-brand-cyan/60 hover:text-white text-gray-300 font-bold text-xs rounded transition-all cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <FileText size={13} className="text-brand-cyan" />
              <span>View Report</span>
            </button>

          </div>

        </div>

      </div>

      {/* 4. MODAL ELEMENT: NOTIFICATION ENGINE PREFERENCE OPTIONS */}
      {openSettingsModal && (
        <div className="fixed inset-0 bg-[#070b14]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none">
          <div className="bg-[#121829] border border-[#1e293b] rounded-xl w-full max-w-md p-6 relative font-sans space-y-4 animate-in zoom-in-95 duration-150 text-left">
            
            <div className="flex justify-between items-start pb-3 border-b border-[#1e293b]/40">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">Notification Settings</h3>
                <p className="text-[9px] text-gray-500 font-mono mt-0.5 uppercase">ROUTINE_ALGORITHM_DISPATCH</p>
              </div>
              <button onClick={() => setOpenSettingsModal(false)} className="text-gray-400 hover:text-white cursor-pointer select-none">
                <X size={15} />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans text-left text-gray-300">
              
              <div className="space-y-2">
                <h4 className="font-bold text-white">Dispatch Threshold Channels</h4>
                <p className="text-[10px] text-gray-500 leading-normal">Limit incoming real-time alerts depending on severity indices.</p>
                <div className="space-y-1.5 pt-1.5">
                  <label className="flex items-center gap-2.5 cursor-pointer leading-none">
                    <input type="checkbox" defaultChecked className="accent-brand-cyan border-[#1e293b] rounded" />
                    <span>Email dispatch summaries for [CRITICAL] security events</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer leading-none">
                    <input type="checkbox" defaultChecked className="accent-brand-cyan border-[#1e293b] rounded" />
                    <span>Deliver SMS payload alerts during off-hours</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer leading-none">
                    <input type="checkbox" defaultChecked className="accent-brand-cyan border-[#1e293b] rounded" />
                    <span>Consolidate daily market variance reports</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#1e293b]/30">
                <h4 className="font-bold text-white">SMTP Dispatch Relay API</h4>
                <input
                  type="text"
                  placeholder="https://dispatch-smtp-relay.econ-sentinel.int/v2"
                  className="w-full bg-[#070b14] border border-[#1e293b] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-[#1e293b]/40 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setOpenSettingsModal(false)}
                  className="px-4 py-2 border border-[#1e293b] hover:border-gray-500 rounded text-gray-300 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplySettings}
                  className="px-4 py-2 bg-brand-cyan text-[#070b14] rounded font-bold transition shadow-[0_0_12px_#00e0a5]"
                >
                  Save Settings
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

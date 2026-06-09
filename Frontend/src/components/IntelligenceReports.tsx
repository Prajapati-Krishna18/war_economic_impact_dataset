/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileText,
  Clock,
  ClipboardList,
  Plus,
  MoreVertical,
  Share2,
  Lock,
  Globe2,
  Users,
  Search,
  Sliders,
  RotateCw,
  Download,
  FileSpreadsheet,
  FileDown,
  X,
  Check,
  Zap,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface IntelligenceReportsProps {
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

type ReportCategory = 'Economic' | 'Trade' | 'Risk';
type ReportTab = 'All' | 'Draft' | 'Scheduled' | 'Published' | 'Archived';
type ShareScope = 'External Shared' | 'Private' | 'Team Shared' | 'Public Link';

interface ReportData {
  id: string; // e.g. "REF-2024-089"
  title: string;
  excerpt: string;
  category: ReportCategory;
  lastUpdated: string;
  author: {
    name: string;
    avatar: string;
  };
  shareScope: ShareScope;
  status: 'Draft' | 'Scheduled' | 'Published' | 'Archived';
  metrics: {
    views: string;
    avgTime: string;
    engagement: string;
  };
  attachments: Array<{
    name: string;
    type: 'pdf' | 'csv';
    date: string;
    size: string;
  }>;
}

export default function IntelligenceReports({ onShowToast }: IntelligenceReportsProps) {
  // Preset list of 4 reports exactly matching screenshot with status/metrics high fidelity
  const [reportsList, setReportsList] = useState<ReportData[]>([
    {
      id: 'REF-2024-089',
      category: 'Economic',
      title: 'Q3 APAC Market Volatility Index',
      excerpt: 'Comprehensive assessment of currency fluctuation in Southeast Asian markets...',
      lastUpdated: 'Updated 2h ago',
      author: {
        name: 'Elena Vance',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
      },
      shareScope: 'External Shared',
      status: 'Published',
      metrics: {
        views: '1,402',
        avgTime: '4m 12s',
        engagement: '82.4%'
      },
      attachments: [
        { name: 'Full_Report_APAC.pdf', type: 'pdf', date: 'Jan 12, 14:30', size: '4.2MB' },
        { name: 'Raw_Data_APAC_Index.csv', type: 'csv', date: 'Jan 12, 14:31', size: '1.8MB' },
        { name: 'Executive_Summary.pdf', type: 'pdf', date: 'Jan 11, 09:15', size: '0.9MB' }
      ]
    },
    {
      id: 'REF-2024-092',
      category: 'Trade',
      title: 'Global Shipping Lane Bottlenecks',
      excerpt: 'Real-time data visualization and impact analysis of maritime route congestions in th...',
      lastUpdated: 'Updated 5h ago',
      author: {
        name: 'Marcus Thorne',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
      },
      shareScope: 'Private',
      status: 'Published',
      metrics: {
        views: '891',
        avgTime: '6m 45s',
        engagement: '74.2%'
      },
      attachments: [
        { name: 'Maritime_Transit_Logistics.pdf', type: 'pdf', date: 'Feb 03, 10:15', size: '6.1MB' },
        { name: 'Suez_Panama_Port_Telemetry.csv', type: 'csv', date: 'Feb 03, 10:18', size: '3.4MB' }
      ]
    },
    {
      id: 'REF-2024-105',
      category: 'Risk',
      title: 'Geopolitical Conflict Spillover',
      excerpt: 'Stress-testing regional economies against potential escalation scenarios in Eastern...',
      lastUpdated: 'Updated Yesterday',
      author: {
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
      },
      shareScope: 'Team Shared',
      status: 'Published',
      metrics: {
        views: '2,319',
        avgTime: '8m 19s',
        engagement: '89.1%'
      },
      attachments: [
        { name: 'Spillover_StressTest_V1.pdf', type: 'pdf', date: 'Mar 15, 16:40', size: '5.8MB' },
        { name: 'Geopolitical_Exposure_Grid.csv', type: 'csv', date: 'Mar 15, 16:45', size: '2.9MB' },
        { name: 'Escalation_Scenario_Brief.pdf', type: 'pdf', date: 'Mar 14, 11:20', size: '1.2MB' }
      ]
    },
    {
      id: 'REF-2024-112',
      category: 'Economic',
      title: 'Central Bank Rate Projections',
      excerpt: 'Analytical model forecasting interest rate movements for the G7 nations through the...',
      lastUpdated: 'Updated 3d ago',
      author: {
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
      },
      shareScope: 'Public Link',
      status: 'Published',
      metrics: {
        views: '3,104',
        avgTime: '3m 50s',
        engagement: '65.8%'
      },
      attachments: [
        { name: 'G7_Macro_Forecast.pdf', type: 'pdf', date: 'Apr 28, 08:30', size: '3.9MB' },
        { name: 'Yield_Curve_Simulation.csv', type: 'csv', date: 'Apr 28, 08:35', size: '2.1MB' }
      ]
    }
  ]);

  // Operational states
  const [selectedReportId, setSelectedReportId] = useState<string>('REF-2024-089');
  const [activeTab, setActiveTab] = useState<ReportTab>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // New report creation modal state
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newExcerpt, setNewExcerpt] = useState<string>('');
  const [newCategory, setNewCategory] = useState<ReportCategory>('Economic');
  const [newShare, setNewShare] = useState<ShareScope>('Private');
  const [newStatus, setNewStatus] = useState<'Draft' | 'Scheduled' | 'Published'>('Published');

  // Trigger modals/options
  const [showRunConfigModal, setShowRunConfigModal] = useState<boolean>(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState<boolean>(false);

  // Handlers
  const selectedReport = reportsList.find(r => r.id === selectedReportId) || reportsList[0];

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      onShowToast('Please provide a descriptive report title', 'info');
      return;
    }

    const nextId = `REF-2024-${Math.floor(120 + Math.random() * 880)}`;
    const createdReport: ReportData = {
      id: nextId,
      category: newCategory,
      title: newTitle,
      excerpt: newExcerpt || 'Analytical macro appraisal structured by Econ-Sentinel algorithmic modeling nodes...',
      lastUpdated: 'Updated just now',
      author: {
        name: 'Director Crawford',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
      },
      shareScope: newShare,
      status: newStatus as any,
      metrics: {
        views: '1',
        avgTime: '0m 30s',
        engagement: '100%'
      },
      attachments: [
        { name: `${newTitle.replace(/\s+/g, '_')}_Draft_Doc.pdf`, type: 'pdf', date: 'Today, 10:57', size: '1.4MB' }
      ]
    };

    setReportsList(prev => [createdReport, ...prev]);
    setSelectedReportId(nextId);
    setShowCreateModal(false);
    setNewTitle('');
    setNewExcerpt('');
    onShowToast(`PRODUCED NEW INSTITUTIONAL MEMORANDUM: ${nextId}`, 'success');
  };

  const deleteReport = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReportsList(prev => prev.filter(r => r.id !== id));
    if (selectedReportId === id) {
      const remaining = reportsList.filter(r => r.id !== id);
      if (remaining.length > 0) {
        setSelectedReportId(remaining[0].id);
      }
    }
    setOpenDropdownId(null);
    onShowToast(`REVOKED ARCHIVED DOSSIER: ${id}`, 'success');
  };

  const handleShareChange = (id: string, scope: ShareScope, e: React.MouseEvent) => {
    e.stopPropagation();
    setReportsList(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, shareScope: scope };
      }
      return r;
    }));
    setOpenDropdownId(null);
    onShowToast(`RE-CALIBRATED SHARE PERMISSION -> ${scope}`, 'info');
  };

  const handleTriggerRunConfig = () => {
    onShowToast('SYNCHRONIZED BACKEND AUTOMATED REPORT ENGINE SCHEDULES', 'success');
    setShowRunConfigModal(true);
  };

  const handleTriggerTemplates = () => {
    onShowToast('MOUNTED CLASSIFIED REPORT MATRIX SCHEMATICS', 'info');
    setShowTemplatesModal(true);
  };

  // Filter reports
  const filteredReports = reportsList.filter(r => {
    // Match search query
    const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        r.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchSearch) return false;

    // Match tab
    if (activeTab === 'All') return true;
    if (activeTab === 'Draft') return r.status === 'Draft';
    if (activeTab === 'Scheduled') return r.status === 'Scheduled';
    if (activeTab === 'Published') return r.status === 'Published';
    if (activeTab === 'Archived') return r.status === 'Archived';
    
    return true;
  });

  return (
    <div className="space-y-6 text-left select-none relative animate-in fade-in duration-200" id="reports-archival-viewport">
      
      {/* 1. TOP BREADCRUMB & HEADER PANEL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1.5 text-left">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-700">/</span>
            <span className="text-brand-cyan">Reports</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display">
            Intelligence Report Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Systematic analysis of global economic shifts and trade risks.
          </p>
        </div>

        {/* Dynamic high fidelity configuration CTA action triggers */}
        <div className="flex flex-wrap items-center gap-3 self-end md:self-auto" id="reports-management-actions">
          
          {/* Schedule Automatic Run: outline button */}
          <button
            onClick={handleTriggerRunConfig}
            className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-slate-800/40 border border-[#1e293b] hover:border-gray-500 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Clock size={13} className="text-gray-400" />
            <span>Schedule Automatic Run</span>
          </button>

          {/* Report Templates: outline button */}
          <button
            onClick={handleTriggerTemplates}
            className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-slate-800/40 border border-[#1e293b] hover:border-gray-500 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <ClipboardList size={13} className="text-gray-400" />
            <span>Report Templates</span>
          </button>

          {/* New Report: Solid glowing green accent trigger */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-cyan hover:bg-[#00c993] text-[#070b14] rounded-lg text-xs font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(0,224,165,0.15)]"
          >
            <Plus size={13} />
            <span>New Report</span>
          </button>

        </div>
      </div>

      {/* 2. TAB CONTROLS NAVIGATION BAR */}
      <div className="border-b border-[#1e293b]/50 select-none pb-px flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Navigation Tab array exactly like screenshot */}
        <div className="flex flex-wrap items-center gap-1">
          {(['All', 'Draft', 'Scheduled', 'Published', 'Archived'] as ReportTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                onShowToast(`FILTERING INTELLIGENCE LIST VIA TAB: ${tab.toUpperCase()}`, 'info');
              }}
              className={`px-4 sm:px-6 py-3 text-xs font-bold font-sans tracking-tight relative transition-all uppercase cursor-pointer ${
                (tab === 'All' && activeTab === 'All') || (tab === activeTab)
                  ? 'text-brand-cyan'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab === 'All' ? 'All Reports' : tab === 'Draft' ? 'Drafts' : tab}
              
              {/* Highlight bar underneath matches exact look */}
              {((tab === 'All' && activeTab === 'All') || tab === activeTab) && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-cyan shadow-[0_0_8px_#00e0a5]" />
              )}
            </button>
          ))}
        </div>

        {/* Lightweight search utility within the panel */}
        <div className="relative mb-2 sm:mb-0 w-full sm:w-64 max-w-xs self-start sm:self-auto">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search report grid..."
            className="w-full bg-[#121829] border border-[#1e293b] text-[11px] placeholder-gray-500 rounded-md pl-8 pr-3 py-1.5 text-white focus:outline-none focus:border-brand-cyan/40 font-mono"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] hover:text-white text-gray-500">
              CLEAR
            </button>
          )}
        </div>

      </div>

      {/* 3. CORE CONTENT SPLIT GRID: LEFT CARDS PLATFORM & RIGHT PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: ARCHIVAL GRID LIST (2/3 area) */}
        <div className="lg:col-span-2 space-y-4">
          
          {filteredReports.length === 0 ? (
            <div className="bg-[#121829] border border-[#1e293b]/40 rounded-xl p-12 text-center text-gray-500 space-y-4">
              <span className="h-12 w-12 rounded-full bg-[#1e293b]/60 border border-[#1e293b] flex items-center justify-center text-gray-400 mx-auto">
                <FileText size={20} />
              </span>
              <div>
                <h4 className="text-white font-bold text-xs">No reports located</h4>
                <p className="text-[10px] text-gray-500 mt-1">No intelligence logs found matching the current filtration scheme.</p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('All');
                  setSearchQuery('');
                }}
                className="text-xs text-brand-cyan hover:underline font-bold"
              >
                Reset filter metrics
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredReports.map((report) => {
                const isSelected = selectedReportId === report.id;
                
                // Color mapping for report categories e.g. Economic, Trade, Risk
                const categoryColorClass = 
                  report.category === 'Economic' 
                    ? 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5' 
                    : report.category === 'Trade' 
                    ? 'text-blue-400 border-blue-450/20 bg-blue-500/5' 
                    : 'text-amber-500 border-amber-500/20 bg-amber-500/5';

                // Icons for share scopes
                const ShareIcon = 
                  report.shareScope === 'Private' 
                    ? Lock 
                    : report.shareScope === 'Team Shared' 
                    ? Users 
                    : report.shareScope === 'Public Link' 
                    ? Share2 
                    : Globe2;

                return (
                  <div
                    key={report.id}
                    onClick={() => {
                      setSelectedReportId(report.id);
                      onShowToast(`RETRIEVING PAYLOAD PROFILE: ${report.id}`, 'info');
                    }}
                    className={`relative bg-[#121829] border rounded-xl p-5 hover:bg-[#1a233b]/15 transition-all duration-200 cursor-pointer text-left ${
                      isSelected 
                        ? 'border-brand-cyan shadow-[0_0_14px_rgba(0,224,165,0.06)]' 
                        : 'border-[#1e293b]/65 hover:border-[#475569]/60'
                    }`}
                  >
                    
                    {/* Upper Badges & More button row */}
                    <div className="flex justify-between items-center mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold font-mono tracking-wider px-2 py-0.5 rounded leading-none uppercase border ${categoryColorClass}`}>
                          {report.category}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono tracking-tight font-semibold">
                          {report.id}
                        </span>
                      </div>

                      {/* Dropdown for action tools */}
                      <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setOpenDropdownId(openDropdownId === report.id ? null : report.id)}
                          className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-slate-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <MoreVertical size={14} />
                        </button>

                        {openDropdownId === report.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-[#0b0e17] border border-[#1e293b] rounded-lg shadow-2xl py-1.5 z-40 animate-in fade-in slide-in-from-top-1 duration-100">
                            
                            <div className="px-3 py-1 border-b border-[#1e293b]/50 mb-1">
                              <span className="text-[8.5px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                                SECURITY DOSSIER
                              </span>
                            </div>

                            {/* Share scope triggers */}
                            <button
                              onClick={(e) => handleShareChange(report.id, 'Private', e)}
                              className="w-full text-left px-3 py-1.5 text-[11px] text-gray-300 hover:text-brand-cyan hover:bg-white/5 transition-colors flex items-center gap-1.5"
                            >
                              <Lock size={11} />
                              <span>Make Private</span>
                            </button>
                            <button
                              onClick={(e) => handleShareChange(report.id, 'Public Link', e)}
                              className="w-full text-left px-3 py-1.5 text-[11px] text-gray-300 hover:text-brand-cyan hover:bg-white/5 transition-colors flex items-center gap-1.5"
                            >
                              <Share2 size={11} />
                              <span>Public Link</span>
                            </button>
                            <button
                              onClick={(e) => handleShareChange(report.id, 'Team Shared', e)}
                              className="w-full text-left px-3 py-1.5 text-[11px] text-gray-300 hover:text-brand-cyan hover:bg-white/5 transition-colors flex items-center gap-1.5"
                            >
                              <Users size={11} />
                              <span>Share Team</span>
                            </button>

                            <div className="h-px bg-[#1e293b] my-1"></div>

                            {/* Delete button option */}
                            <button
                              onClick={(e) => deleteReport(report.id, e)}
                              className="w-full text-left px-3 py-1.5 text-[11px] text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
                            >
                              <X size={11} />
                              <span>Delete Report</span>
                            </button>

                          </div>
                        )}
                      </div>
                    </div>

                    {/* Report title and snippet */}
                    <div className="space-y-1.5 mb-6">
                      <h3 className="text-sm font-bold tracking-tight text-white group-hover:text-brand-cyan transition-colors line-clamp-1">
                        {report.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans font-medium line-clamp-2">
                        {report.excerpt}
                      </p>
                    </div>

                    {/* Card detailed Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#1e293b]/25 mt-1.5">
                      
                      {/* Author */}
                      <div className="flex items-center gap-2">
                        <img
                          src={report.author.avatar}
                          alt={report.author.name}
                          className="h-6 w-6 rounded-full border border-brand-cyan/25 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-[10px] font-bold text-white leading-none">
                            {report.author.name}
                          </div>
                        </div>
                      </div>

                      {/* Updated Date stamp */}
                      <span className="text-[9.5px] font-mono text-gray-500 leading-none">
                        {report.lastUpdated}
                      </span>

                      {/* Shared permissions */}
                      <div className="flex items-center gap-1 text-gray-400 text-[10px] font-mono font-bold leading-none bg-[#070b14] px-2 py-1 rounded border border-[#1e293b]/40">
                        <ShareIcon size={10} className="text-brand-cyan" />
                        <span className="capitalize text-gray-400">{report.shareScope}</span>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* Interactive informational tips explaining automated runs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0a0e1a] border border-[#1e293b]/55 p-4 rounded-xl text-xs text-gray-400">
            <div className="flex gap-3">
              <Zap size={16} className="text-brand-cyan shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white">Cron Execution Framework</h5>
                <p className="text-[10px] text-gray-500 mt-1">Econ-Sentinel deploys automated cron nodes compiling live index trends. Standard data packages refresh in lockstep with Frankfurt exchange. </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle size={16} className="text-[#00e0a5] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white">Integrity Verification Logs</h5>
                <p className="text-[10px] text-gray-500 mt-1">Every download is signed by terminal authority block hashes. These records are audited for security clearances. </p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: REPORT PREVIEW & ANALYTICS (1/3 area) */}
        <div className="col-span-1 border border-[#1e293b]/55 bg-[#121829] rounded-xl p-5 space-y-6 flex flex-col justify-between" id="reports-preview-column">
          
          <div className="space-y-5">
            
            {/* Header info */}
            <div>
              <h3 className="text-xs font-bold text-brand-cyan tracking-wider font-mono uppercase">
                REPORT PREVIEW & ANALYTICS
              </h3>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase">
                ACTIVE_DOSSIER // {selectedReport.id}
              </p>
            </div>

            {/* HIGH FIDELITY TABLET SCREEN MOCKUP */}
            <div className="bg-[#070b14] border-4 border-slate-800 rounded-2xl p-3 relative shadow-inner overflow-hidden select-none flex flex-col justify-between min-h-[180px] group/tablet hover:border-slate-700 transition-colors">
              
              {/* Gloss shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />

              {/* Tablet screen content */}
              <div className="space-y-2 relative z-0">
                
                {/* Active index banner inside screen */}
                <div className="flex justify-between items-center text-[8px] font-mono text-gray-500 border-b border-[#1e293b]/40 pb-1.5">
                  <span className="flex items-center gap-1">
                    <span className="h-1 w-1 bg-[#00e0a5] rounded-full animate-ping" />
                    SYSTEM LIVE: 77.2
                  </span>
                  <span>REF. {selectedReport.id}</span>
                </div>

                {/* Simulated Chart Plot Graphics */}
                <div className="h-20 flex items-end gap-1 px-1.5 pt-2 relative">
                  
                  {/* Background gridlines */}
                  <div className="absolute inset-0 flex flex-col justify-between py-1.5 opacity-20 select-nonepointer-events-none">
                    <div className="border-b border-brand-cyan/20 h-px w-full" />
                    <div className="border-b border-brand-cyan/20 h-px w-full" />
                    <div className="border-b border-brand-cyan/20 h-px w-full" />
                  </div>

                  {/* High quality dynamic line/bars corresponding to the selected report */}
                  {selectedReport.id === 'REF-2024-089' && (
                    <svg className="w-full h-full text-brand-cyan absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,80 L20,30 L40,65 L60,40 L80,15 L100,20" fill="none" stroke="currentColor" strokeWidth="2.5" className="drop-shadow-[0_0_4px_#00e0a5]" />
                      <path d="M0,80 L20,30 L40,65 L60,40 L80,15 L100,20 L100,100 L0,100 Z" fill="url(#grad)" opacity="0.1" />
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00e0a5" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}

                  {selectedReport.id === 'REF-2024-092' && (
                    <svg className="w-full h-full text-blue-400 absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,90 L15,80 L35,85 L50,45 L70,30 L85,55 L100,10" fill="none" stroke="currentColor" strokeWidth="2.5" className="drop-shadow-[0_0_4px_rgba(96,165,250,0.8)]" />
                      <path d="M0,90 L15,80 L35,85 L50,45 L70,30 L85,55 L100,10 L100,100 L0,100 Z" fill="url(#gradBlue)" opacity="0.1" />
                      <defs>
                        <linearGradient id="gradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#2563eb" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}

                  {selectedReport.id === 'REF-2024-105' && (
                    <svg className="w-full h-full text-red-400 absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,50 L20,70 L40,25 L60,90 L80,10 L100,5" fill="none" stroke="currentColor" strokeWidth="2.5" className="drop-shadow-[0_0_4px_rgba(239,68,68,0.8)]" />
                      <path d="M0,50 L20,70 L40,25 L60,90 L80,10 L100,5 L100,100 L0,100 Z" fill="url(#gradRed)" opacity="0.1" />
                      <defs>
                        <linearGradient id="gradRed" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}

                  {selectedReport.id === 'REF-2024-112' && (
                    <svg className="w-full h-full text-amber-500 absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,20 L15,15 L35,45 L50,35 L70,75 L85,80 L100,95" fill="none" stroke="currentColor" strokeWidth="2.5" className="drop-shadow-[0_0_4px_rgba(245,158,11,0.8)]" />
                      <path d="M0,20 L15,15 L35,45 L50,35 L70,75 L85,80 L100,95 L100,100 L0,100 Z" fill="url(#gradAmber)" opacity="0.1" />
                      <defs>
                        <linearGradient id="gradAmber" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}

                  {/* Floating Telemetry Box overlay */}
                  <div className="absolute bottom-2 right-2 bg-slate-900/90 border border-[#1e293b]/80 px-2 py-1 rounded font-mono text-[7px] text-gray-400 space-y-0.5">
                    <div className="flex justify-between gap-3 text-white">
                      <span>INTELLIGENCE LOAD:</span>
                      <span className="text-[#00e0a5]">SECURE</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span>CALIBRATION PT:</span>
                      <span>1.488e-4</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Lower mock Tablet bezel footer indicator */}
              <div className="flex justify-center pt-2 select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-800 border border-slate-700 block" />
              </div>

            </div>

            {/* PREVIEW STATISTICS LIST (Total Views, Avg time spent, engagement) */}
            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest pb-1 border-b border-[#1e293b]/15">
                <span>IMPACT STATISTICS</span>
                <span className="text-[9.5px] text-brand-cyan select-none font-mono">LIVE FEED</span>
              </div>

              <div className="space-y-2.5 font-sans">
                
                {/* Stat row 1: Views */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-400">Total Views</span>
                  <span className="text-sm font-extrabold text-white font-mono">
                    {selectedReport.metrics.views}
                  </span>
                </div>

                {/* Stat row 2: Avg Time Spent */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-400">Avg. Time Spent</span>
                  <span className="text-sm font-extrabold text-white font-mono">
                    {selectedReport.metrics.avgTime}
                  </span>
                </div>

                {/* Stat row 3: Engagement Rate with brand-cyan */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-400">Engagement Rate</span>
                  <span className="text-sm font-extrabold text-brand-cyan font-mono tracking-wide">
                    {selectedReport.metrics.engagement}
                  </span>
                </div>

              </div>
            </div>

            {/* DOWNLOAD HISTORY & ATTACHMENTS FOR SELECTED DOSSIER */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block pb-1 border-b border-[#1e293b]/15">
                DOWNLOAD HISTORY
              </span>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedReport.attachments.map((file, i) => (
                  <div
                    key={i}
                    onClick={() => onShowToast(`DOWNLOAD COMPLETED FOR: ${file.name}`, 'success')}
                    className="group/file flex justify-between items-center bg-[#070b14]/50 border border-[#1e293b]/30 p-2.5 rounded-lg cursor-pointer hover:border-brand-cyan/40 hover:bg-slate-800/10 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {/* File type icon layout matching exact blueprint */}
                      {file.type === 'pdf' ? (
                        <div className="h-7 w-7 rounded bg-[#ef4444]/5 border border-[#ef4444]/25 flex items-center justify-center text-red-400 font-mono text-[9px] font-bold">
                          PDF
                        </div>
                      ) : (
                        <div className="h-7 w-7 rounded bg-blue-500/5 border border-blue-500/25 flex items-center justify-center text-blue-400">
                          <FileSpreadsheet size={13} />
                        </div>
                      )}
                      
                      <div className="text-left font-sans">
                        <div className="text-[11px] font-bold text-white tracking-tight group-hover/file:text-brand-cyan transition-colors truncate max-w-[150px]">
                          {file.name}
                        </div>
                        <div className="text-[9px] font-mono text-gray-550 mt-0.5">
                          {file.date} • {file.size}
                        </div>
                      </div>
                    </div>

                    {/* Download alignment button aligns perfectly to screenshot */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowToast(`PAYLOAD RETRIEVED: ${file.name}`, 'success');
                      }}
                      className="text-gray-500 group-hover/file:text-white transition-colors cursor-pointer p-1"
                    >
                      <Download size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Download Center Trigger CTA Button */}
          <button
            onClick={() => onShowToast(`DISPATCHED ALL ${selectedReport.attachments.length} RESEARCH ATTACHMENTS TO LOCAL ARCHIVAL STREAM`, 'success')}
            className="w-full mt-6 py-2.5 bg-transparent border border-[#1e293b] hover:border-brand-cyan/60 hover:text-white text-gray-300 font-bold text-xs rounded transition-all cursor-pointer text-center flex items-center justify-center gap-2"
          >
            <Download size={14} className="text-brand-cyan" />
            <span>DOWNLOAD CENTER</span>
          </button>

        </div>

      </div>

      {/* 4. MODAL ELEMENT: NEW DOSSIER MEMORANDUM FORM */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-[#070b14]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121829] border border-[#1e293b] rounded-xl w-full max-w-md p-6 relative font-sans space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex justify-between items-start pb-3 border-b border-[#1e293b]/40">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">Create New Intelligence Report</h3>
                <p className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase">ADMIN_PRODUCER_WIDGET</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white cursor-pointer select-none">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4 text-xs font-sans text-left">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Report Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Q4 EMEA Sovereign Trade Vulnerability Matrix"
                  className="w-full bg-[#070b14] border border-[#1e293b] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Short Narrative (Excerpt)</label>
                <textarea
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Summarize key intelligence indicators or geopolitical exposure scopes..."
                  className="w-full bg-[#070b14] border border-[#1e293b] rounded px-3 py-2 text-white h-20 placeholder-gray-650 focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Sector Class</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ReportCategory)}
                    className="w-full bg-[#070b14] border border-[#1e293b] rounded p-2 text-white focus:outline-none focus:border-brand-cyan"
                  >
                    <option value="Economic">Economic</option>
                    <option value="Trade">Trade</option>
                    <option value="Risk">Geopolitical Risk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Share Level</label>
                  <select
                    value={newShare}
                    onChange={(e) => setNewShare(e.target.value as ShareScope)}
                    className="w-full bg-[#070b14] border border-[#1e293b] rounded p-2 text-white focus:outline-none focus:border-brand-cyan"
                  >
                    <option value="Private">Private (Lock)</option>
                    <option value="Public Link">Public Link</option>
                    <option value="Team Shared">Team Shared</option>
                    <option value="External Shared">External Shared</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1e293b]/40 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-[#1e293b] hover:border-gray-500 rounded text-gray-300 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-cyan hover:bg-[#00c993] text-[#070b14] rounded font-bold transition shadow-[0_0_12px_rgba(0,224,165,0.2)]"
                >
                  Schedule and Dispatch
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 5. MODAL ELEMENT: CRON EXECUTION AUTOMATIC RUN */}
      {showRunConfigModal && (
        <div className="fixed inset-0 bg-[#070b14]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121829] border border-[#1e293b] rounded-xl w-full max-w-sm p-6 relative font-sans space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start pb-2 border-b border-[#1e293b]/35">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">Cron Schedule Configurator</h3>
                <p className="text-[9px] text-gray-500 font-mono mt-0.5 uppercase">SYSTEM_INTEGRITY_SCHEDULER</p>
              </div>
              <button onClick={() => setShowRunConfigModal(false)} className="text-gray-400 hover:text-white cursor-pointer select-none">
                <X size={15} />
              </button>
            </div>

            <div className="text-xs text-left text-gray-300 space-y-3 font-sans">
              <p className="text-gray-400 leading-relaxed">Customize automatic polling loops. Compiled files will dispatch via Secure SMTP / S3 Node Storage.</p>
              
              <div className="p-3 bg-[#070b14] border border-[#1e293b] rounded space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-gray-400">
                  <span>REF DATA TARGET:</span>
                  <span className="text-brand-cyan font-bold">ALL ACTIVE DOSSIERS</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-gray-400">
                  <span>DISPATCH CADENCE:</span>
                  <span className="text-white font-bold">Every 2 Hours (Standard)</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-gray-400 font-semibold">Select Interval Cadence</label>
                <select className="w-full bg-[#070b14] border border-[#1e293b] rounded p-2 text-white focus:outline-none focus:border-brand-cyan text-xs">
                  <option>Every 2 Hours (Frankfurt Exchange Align)</option>
                  <option>Daily 08:30 UTC Compliance Run</option>
                  <option>Weekly (Friday Segment Close)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#1e293b]/35 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowRunConfigModal(false)}
                  className="px-3.5 py-1.5 border border-[#1e293b] rounded text-gray-300 hover:border-gray-500 transition font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowRunConfigModal(false);
                    onShowToast('APPLIED CRON CALIBRATION IN ALL BACKGROUND WORKERS', 'success');
                  }}
                  className="px-3.5 py-1.5 bg-brand-cyan text-[#070b14] rounded hover:bg-[#00c993] font-bold transition shadow-[0_0_12px_#00e0a5]"
                >
                  Save Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL ELEMENT: INTEL TEMPLATES SELECTOR */}
      {showTemplatesModal && (
        <div className="fixed inset-0 bg-[#070b14]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121829] border border-[#1e293b] rounded-xl w-full max-w-md p-6 relative font-sans space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start pb-2 border-b border-[#1e293b]/35">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">Intelligence Matrix Templates</h3>
                <p className="text-[9px] text-gray-500 font-mono mt-0.5 uppercase">CHASSIS_LIBRARY</p>
              </div>
              <button onClick={() => setShowTemplatesModal(false)} className="text-gray-400 hover:text-white cursor-pointer select-none">
                <X size={15} />
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {[
                { name: 'G7 Macro Risk matrix', desc: 'Stress metrics forecasting central bank interest rates & sovereign yields.', role: 'Economic' },
                { name: 'Maritime Supply Chain Sentinel', desc: 'Live choke-point congestion assessment for Suez, Panama, Malacca passages.', role: 'Trade' },
                { name: 'APAC Exchange Volatility Model', desc: 'Correlation matrices analyzing foreign exchange shocks inside SE Asia.', role: 'Economic' },
                { name: 'Sub-Saharan Climate Fragility Brief', desc: 'Predictive risk evaluations regarding food insecurity & cross-border strife.', role: 'Risk' }
              ].map((template, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setNewTitle(template.name);
                    setNewExcerpt(template.desc);
                    setNewCategory(template.role as any);
                    setShowTemplatesModal(false);
                    setShowCreateModal(true);
                    onShowToast(`LOADED BLUEPRINT TEMPLATE: ${template.name}`, 'info');
                  }}
                  className="p-3 bg-[#070b14] border border-[#1e293b] hover:border-brand-cyan/40 rounded cursor-pointer transition flex items-start gap-3 group text-left"
                >
                  <FileText size={16} className="text-brand-cyan mt-1 group-hover:scale-105 transition-transform" />
                  <div>
                    <h5 className="text-xs font-bold text-white">{template.name}</h5>
                    <p className="text-[10px] text-gray-400 mt-1">{template.desc}</p>
                    <span className="text-[8px] font-mono text-brand-cyan mt-2 block border border-brand-cyan/20 rounded px-1.5 py-0.5 bg-brand-cyan/5 w-fit uppercase">
                      {template.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowTemplatesModal(false)}
                className="px-3.5 py-1.5 border border-[#1e293b] rounded hover:border-gray-500 text-gray-300 font-semibold text-xs"
              >
                Close Template Library
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

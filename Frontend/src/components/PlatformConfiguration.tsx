/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  User,
  Shield,
  Settings,
  Plus,
  RefreshCw,
  X,
  Network,
  Palette,
  Bell,
  HardDrive,
  Share2,
  Trash2,
  ChevronRight
} from 'lucide-react';
import SecuritySettings from './SecuritySettings';

interface PlatformConfigurationProps {
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

type NestedTab = 'General' | 'Appearance' | 'Notifications' | 'Security' | 'Data' | 'Integrations';

interface APIEndpoint {
  id: string;
  provider: string;
  url: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'OFFLINE';
  latency: number;
}

export default function PlatformConfiguration({ onShowToast }: PlatformConfigurationProps) {
  const [nestedTab, setNestedTab] = useState<NestedTab>('General');

  // General tab - Institutional Identity state
  const [platformName, setPlatformName] = useState('ECON-SENTINEL');
  const [organizationId, setOrganizationId] = useState('ORG-ALPHA-7742');
  const [platformSubtitle, setPlatformSubtitle] = useState('Economic Intelligence & Strategic Analysis');

  // Image logo state
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // General tab - Data Retention slider configurations
  const [liveStreamCache, setLiveStreamCache] = useState(7); // 1-30 Days
  const [analyticalReports, setAnalyticalReports] = useState(24); // 1-60 Months
  const [archiveStorage, setArchiveStorage] = useState(5); // 1-10 Years

  // General tab - Global API Routing state
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([
    {
      id: 'EP-01',
      provider: 'Bloomberg B-Pipe',
      url: 'https://api.bloomberg.com/v1/auth',
      status: 'OPERATIONAL',
      latency: 42
    },
    {
      id: 'EP-02',
      provider: 'Refinitiv Real-Time',
      url: 'https://rt.refinitiv.cloud/stream',
      status: 'OPERATIONAL',
      latency: 58
    },
    {
      id: 'EP-03',
      provider: 'Internal Ledger DB',
      url: 'local://db.sentinel.internal/query',
      status: 'DEGRADED',
      latency: 1240
    }
  ]);

  const [showAddEndpointModal, setShowAddEndpointModal] = useState(false);
  const [newProvider, setNewProvider] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Appearance tab state
  const [themePreset, setThemePreset] = useState('Cosmic Slate');
  const [fontFamily, setFontFamily] = useState('Inter & Space Grotesk');
  const [acrylicBlur, setAcrylicBlur] = useState(true);

  // Notification tab state
  const [smtpServer, setSmtpServer] = useState('https://dispatch-smtp-relay.econ-sentinel.int/v2');
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [smsUrgentDispatch, setSmsUrgentDispatch] = useState(false);

  // Data Management tab state
  const [autoBackupInterval, setAutoBackupInterval] = useState('Daily');
  const [compressionRatio, setCompressionRatio] = useState('High');

  // Integrations state
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.econ-sentinel.int/g7v4');

  const handleApplyIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast(`CALIBRATED INSTITUTIONAL IDENTITY: ${platformName.toUpperCase()}`, 'success');
  };

  const handleLogoUploadClick = () => {
    // Simulated upload trigger
    onShowToast('LOADED RECONSTITUTED VECTOR ASSETS: logo_corporate.svg', 'success');
    setLogoPreview('uploaded');
  };

  const handleAddEndpointSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProvider || !newNewUrlValid(newUrl)) {
      onShowToast('Invalid Provider or URL format', 'info');
      return;
    }
    const fresh: APIEndpoint = {
      id: `EP-${Date.now()}`,
      provider: newProvider,
      url: newUrl,
      status: 'OPERATIONAL',
      latency: Math.floor(Math.random() * 80) + 20
    };
    setEndpoints(prev => [...prev, fresh]);
    setNewProvider('');
    setNewUrl('');
    setShowAddEndpointModal(false);
    onShowToast(`ROUTED NEW INTEGRATION TERMINAL: ${newProvider.toUpperCase()}`, 'success');
  };

  const newNewUrlValid = (url: string) => {
    return url.length > 5;
  };

  const handleDeleteEndpoint = (id: string, name: string) => {
    setEndpoints(prev => prev.filter(e => e.id !== id));
    onShowToast(`DISMANTLED ROUTING TRACE FOR: ${name.toUpperCase()}`, 'info');
  };

  return (
    <div className="space-y-6 text-left select-none relative animate-in fade-in duration-200" id="platform-config-viewport">
      
      {/* 1. TOP BREADCRUMB & PANEL HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1.5 text-left">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-700">/</span>
            <span className="text-brand-cyan">Settings</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display">
            Platform Configuration
          </h2>
        </div>
      </div>

      {/* 2. CORE SETTINGS WRAPPER WITH SUB-SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        {/* NESTED NAVIGATION SIDEBAR (Takes 1/5 of the area) */}
        <div className="lg:col-span-1 space-y-1.5">
          {[
            { id: 'General', label: 'General', icon: Settings },
            { id: 'Appearance', label: 'Appearance', icon: Palette },
            { id: 'Notifications', label: 'Notifications', icon: Bell },
            { id: 'Security', label: 'Security', icon: Shield },
            { id: 'Data', label: 'Data Management', icon: HardDrive },
            { id: 'Integrations', label: 'Integrations', icon: Share2 }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = nestedTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setNestedTab(item.id as NestedTab)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-brand-cyan/10 border-brand-cyan/25 text-brand-cyan shadow-sm font-semibold'
                    : 'bg-[#121829] border-[#1e293b]/40 hover:border-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={14} className={isActive ? 'text-brand-cyan' : 'text-gray-400'} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={12} className={isActive ? 'text-brand-cyan opacity-100' : 'text-gray-600 opacity-0'} />
              </button>
            );
          })}
        </div>

        {/* NESTED CONTENT VIEWPORTS (Takes 4/5 of the area) */}
        <div className="lg:col-span-4 space-y-6">

          {/* VIEWPORT A: GENERAL TAB */}
          {nestedTab === 'General' && (
            <div className="space-y-6">
              
              {/* Row 1: Identity & Corporate Logo */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Institutional Identity Card */}
                <div className="lg:col-span-2 bg-[#121829] border border-[#1e293b]/65 rounded-xl p-6 space-y-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#1e293b]/40">
                    <User size={15} className="text-brand-cyan" />
                    <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                      Institutional Identity
                    </h3>
                  </div>

                  <form onSubmit={handleApplyIdentity} className="space-y-4 font-sans text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-[9.5px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                          PLATFORM NAME
                        </label>
                        <input
                          type="text"
                          value={platformName}
                          onChange={(e) => setPlatformName(e.target.value)}
                          className="w-full bg-[#070b14] border border-[#1e293b]/80 hover:border-gray-600 focus:border-brand-cyan/60 rounded px-3.5 py-2.5 text-white font-semibold transition"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9.5px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                          ORGANIZATION ID
                        </label>
                        <input
                          type="text"
                          value={organizationId}
                          onChange={(e) => setOrganizationId(e.target.value)}
                          className="w-full bg-[#070b14] border border-[#1e293b]/80 hover:border-gray-600 focus:border-brand-cyan/60 rounded px-3.5 py-2.5 text-white font-mono transition"
                        />
                      </div>

                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                        PLATFORM SUBTITLE
                      </label>
                      <input
                        type="text"
                        value={platformSubtitle}
                        onChange={(e) => setPlatformSubtitle(e.target.value)}
                        className="w-full bg-[#070b14] border border-[#1e293b]/80 hover:border-gray-600 focus:border-brand-cyan/60 rounded px-3.5 py-2.5 text-white font-semibold transition"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#070b14] hover:bg-[#121829] border border-brand-cyan/30 hover:border-brand-cyan text-brand-cyan rounded text-[11px] font-bold font-mono transition uppercase cursor-pointer"
                      >
                        Apply Changes
                      </button>
                    </div>
                  </form>
                </div>

                {/* Corporate Logo Card */}
                <div className="bg-[#121829] border border-[#1e293b]/65 rounded-xl p-6 flex flex-col justify-between text-center min-h-[220px]">
                  
                  {/* Top spacing / Alignment */}
                  <div className="space-y-3.5 flex flex-col items-center">
                    
                    {/* Compass Icon block */}
                    <div className="h-14 w-14 rounded-xl pb-1 bg-brand-cyan/5 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shadow-sm relative overflow-hidden group">
                      
                      {/* Interactive blueprint lines in background */}
                      <div className="absolute inset-0 opacity-15 pointer-events-none bg-grid-lines" />
                      
                      {/* Drafting compass custom visualization */}
                      <svg
                        className="w-6 h-6 shrink-0 text-brand-cyan"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="5" r="1.5" />
                        <path d="M12 6.5V10" />
                        <path d="m9 15 3-8.5 3 8.5" />
                        <path d="M8 18h8M12 18v3" />
                      </svg>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white font-sans uppercase">
                        Corporate Logo
                      </h4>
                      <p className="text-[10px] text-gray-500 font-mono uppercase mt-1">
                        SVG or PNG (Max 2MB)
                      </p>
                    </div>
                  </div>

                  {/* Actions  Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleLogoUploadClick}
                      className="w-full py-2 bg-transparent border border-[#1e293b] hover:border-brand-cyan/60 hover:text-white rounded text-xs font-bold text-gray-300 transition-all cursor-pointer font-sans"
                    >
                      Upload New
                    </button>
                    
                    {logoPreview && (
                      <p className="text-[8.5px] text-brand-cyan mt-1.5 font-mono">
                        ✓ ATTACHED_VECTOR_DE-9922.SVG ACTIVE
                      </p>
                    )}
                  </div>

                </div>

              </div>

              {/* Row 2: Data Retention & Lifecycle */}
              <div className="bg-[#121829] border border-[#1e293b]/65 rounded-xl p-6 space-y-6">
                
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#1e293b]/40">
                  <RefreshCw size={15} className="text-brand-cyan" />
                  <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                    Data Retention & Lifecycle
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
                  
                  {/* Slider 1: Live Stream Cache */}
                  <div className="space-y-3.5 bg-[#070b14]/30 border border-[#1e293b]/25 p-4.5 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white uppercase text-[11px]">
                        Live Stream Cache
                      </span>
                      <span className="text-[9.5px] font-mono font-bold text-brand-cyan border border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-0.5 rounded-md leading-none uppercase">
                        {liveStreamCache} Days
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={liveStreamCache}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setLiveStreamCache(val);
                      }}
                      className="w-full accent-brand-cyan cursor-pointer h-1.5 bg-[#070b14] rounded-lg border-0"
                    />

                    <p className="text-[10px] text-gray-400 leading-relaxed font-sans font-medium">
                      High-frequency data persistence in hot storage.
                    </p>
                  </div>

                  {/* Slider 2: Analytical Reports */}
                  <div className="space-y-3.5 bg-[#070b14]/30 border border-[#1e293b]/25 p-4.5 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white uppercase text-[11px]">
                        Analytical Reports
                      </span>
                      <span className="text-[9.5px] font-mono font-bold text-brand-cyan border border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-0.5 rounded-md leading-none uppercase">
                        {analyticalReports} Months
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="60"
                      value={analyticalReports}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setAnalyticalReports(val);
                      }}
                      className="w-full accent-brand-cyan cursor-pointer h-1.5 bg-[#070b14] rounded-lg border-0"
                    />

                    <p className="text-[10px] text-gray-400 leading-relaxed font-sans font-medium">
                      Generated PDF and structured intelligence reports.
                    </p>
                  </div>

                  {/* Slider 3: Archive Storage */}
                  <div className="space-y-3.5 bg-[#070b14]/30 border border-[#1e293b]/25 p-4.5 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white uppercase text-[11px]">
                        Archive Storage
                      </span>
                      <span className="text-[9.5px] font-mono font-bold text-brand-cyan border border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-0.5 rounded-md leading-none uppercase">
                        {archiveStorage} Years
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={archiveStorage}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setArchiveStorage(val);
                      }}
                      className="w-full accent-brand-cyan cursor-pointer h-1.5 bg-[#070b14] rounded-lg border-0"
                    />

                    <p className="text-[10px] text-gray-400 leading-relaxed font-sans font-medium">
                      Long-term regulatory compliance cold storage.
                    </p>
                  </div>

                </div>

              </div>

              {/* Row 3: Global API Routing */}
              <div className="bg-[#121829] border border-[#1e293b]/65 rounded-xl p-6" id="global-api-routing-panel">
                
                {/* Panel row header */}
                <div className="flex justify-between items-center pb-3.5 border-b border-[#1e293b]/40 mb-4">
                  <div className="flex items-center gap-2.5">
                    <Network size={15} className="text-brand-cyan" />
                    <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                      Global API Routing
                    </h3>
                  </div>

                  {/* Add Endpoint button trigger */}
                  <button
                    onClick={() => {
                      setNewProvider('');
                      setNewUrl('');
                      setShowAddEndpointModal(true);
                    }}
                    className="flex items-center gap-1.5 text-brand-cyan hover:text-white font-bold text-[10px] font-mono bg-transparent border-0 cursor-pointer uppercase hover:underline btn-add-terminal"
                  >
                    <Plus size={12} />
                    <span>Add Endpoint</span>
                  </button>
                </div>

                {/* Interactive API Databook Routing table list */}
                <div className="overflow-x-auto select-none">
                  <table className="w-full text-xs font-sans text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1e293b]/35 text-gray-500 font-mono text-[9px] font-bold uppercase tracking-wider">
                        <th className="pb-3 text-left">PROVIDER</th>
                        <th className="pb-3 text-left">ENDPOINT URL</th>
                        <th className="pb-3 text-left">STATUS</th>
                        <th className="pb-3 text-left">LATENCY</th>
                        <th className="pb-3 text-right pr-2">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e293b]/15">
                      {endpoints.map((ep) => (
                        <tr key={ep.id} className="hover:bg-slate-800/10 transition-colors">
                          <td className="py-3 font-bold text-white truncate max-w-[150px]">
                            {ep.provider}
                          </td>
                          <td className="py-3 font-mono text-gray-400 truncate max-w-[240px]">
                            {ep.url}
                          </td>
                          <td className="py-3">
                            <span className={`inline-block font-mono text-[8.5px] font-bold px-2 py-0.5 rounded leading-none uppercase border ${
                              ep.status === 'OPERATIONAL'
                                ? 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5'
                                : ep.status === 'DEGRADED'
                                ? 'text-amber-500 border-amber-500/20 bg-amber-500/5'
                                : 'text-red-400 border-red-500/20 bg-red-400/5'
                            }`}>
                              {ep.status}
                            </span>
                          </td>
                          <td className={`py-3 font-mono font-bold ${
                            ep.status === 'OPERATIONAL'
                              ? 'text-brand-cyan'
                              : ep.status === 'DEGRADED'
                              ? 'text-amber-500'
                              : 'text-red-400'
                          }`}>
                            {ep.latency}ms
                          </td>
                          <td className="py-3 text-right pr-2">
                            <div className="flex justify-end items-center gap-2">
                              {/* Settings triggers */}
                              <button
                                onClick={() => onShowToast(`CALIBRATED POLLING RATIO FOR INTEGRAL ENDPOINT: ${ep.provider.toUpperCase()}`, 'info')}
                                className="h-6 w-6 rounded hover:bg-slate-800 border border-slate-750/0 hover:border-slate-700/60 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
                              >
                                <svg
                                  className="w-3.5 h-3.5 text-gray-400"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                              </button>
                              
                              {/* Tear down action button */}
                              <button
                                onClick={() => handleDeleteEndpoint(ep.id, ep.provider)}
                                className="h-6 w-6 rounded hover:bg-red-500/10 border border-transparent hover:border-red-500/10 flex items-center justify-center text-gray-500 hover:text-red-400 transition cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* VIEWPORT B: APPEARANCE PREFERENCES */}
          {nestedTab === 'Appearance' && (
            <div className="bg-[#121829] border border-[#1e293b]/65 rounded-xl p-6 space-y-6">
              
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#1e293b]/40">
                <Palette size={15} className="text-brand-cyan" />
                <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                  Appearance Configuration
                </h3>
              </div>

              <div className="space-y-5 text-xs font-sans text-left text-gray-300">
                
                {/* Visual Preset Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1.5">
                  <div>
                    <h4 className="font-bold text-white text-xs">Visual Slate Theme Preset</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wide font-mono">
                      CALIBRATE LIGHT PATH FOR CRITICAL DESPATCH CARDS
                    </p>
                  </div>
                  <div className="relative w-full sm:w-56">
                    <select
                      value={themePreset}
                      onChange={(e) => {
                        setThemePreset(e.target.value);
                        onShowToast(`CALIBRATED AMBIENT SLATE CONFIGURATION TO: ${e.target.value.toUpperCase()}`, 'success');
                      }}
                      className="appearance-none w-full bg-[#070b14] border border-[#1e293b] hover:border-gray-600 rounded px-3 py-2 pr-8 text-xs font-semibold text-gray-300 focus:outline-none cursor-pointer"
                    >
                      <option value="Cosmic Slate">Cosmic Slate (Default)</option>
                      <option value="Institutional Black">Institutional Black (95% Pure Mask)</option>
                      <option value="High Entropy Green">High Entropy Green (Terminal Glow)</option>
                    </select>
                  </div>
                </div>

                {/* Font pairing */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#1e293b]/20">
                  <div>
                    <h4 className="font-bold text-white text-xs">System Font Hierarchy Pairing</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wide font-mono">
                      AFFECTS ACCESSIBILITY AND ANALYSIS SPEEDS
                    </p>
                  </div>
                  <div className="relative w-full sm:w-56">
                    <select
                      value={fontFamily}
                      onChange={(e) => {
                        setFontFamily(e.target.value);
                        onShowToast(`REGISTERED GLOBAL GLYPH CALIBRATION: ${e.target.value}`, 'info');
                      }}
                      className="appearance-none w-full bg-[#070b14] border border-[#1e293b] hover:border-gray-600 rounded px-3 py-2 pr-8 text-xs font-semibold text-gray-300 focus:outline-none cursor-pointer"
                    >
                      <option value="Inter & Space Grotesk">Inter & Space Grotesk</option>
                      <option value="JetBrains Mono Heavy">JetBrains Mono Full-Tech</option>
                      <option value="Fira Code & Outfit">Fira Code & Outfit Display</option>
                    </select>
                  </div>
                </div>

                {/* Accessibility Slidings checkbox */}
                <div className="pt-4 border-t border-[#1e293b]/25 space-y-3">
                  <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                    ACCESSIBILITY & HARDENING CONTROL
                  </span>
                  <div className="space-y-2.5 text-xs text-gray-300">
                    <label className="flex items-center gap-2.5 cursor-pointer leading-none">
                      <input
                        type="checkbox"
                        checked={acrylicBlur}
                        onChange={(e) => {
                          setAcrylicBlur(e.target.checked);
                          onShowToast(`ACRYLIC BLUR OVERLAY FX: ${e.target.checked ? 'ENABLED' : 'DISABLED'}`, 'info');
                        }}
                        className="accent-brand-cyan h-4 w-4 rounded border-[#1e293b] bg-[#070b14]"
                      />
                      <span>Apply high fidelity Backdrop-Blur glass layers onto details panel overlays</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer leading-none">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-brand-cyan h-4 w-4 rounded border-[#1e293b] bg-[#070b14]"
                      />
                      <span>Maintain high contrast indicators protecting analyst visual comfort</span>
                    </label>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* VIEWPORT C: NOTIFICATIONS RELAY SETUP */}
          {nestedTab === 'Notifications' && (
            <div className="bg-[#121829] border border-[#1e293b]/65 rounded-xl p-6 space-y-6">
              
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#1e293b]/40">
                <Bell size={15} className="text-brand-cyan" />
                <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                  Notification Dispatch Core
                </h3>
              </div>

              <div className="space-y-4 font-sans text-xs text-gray-305 text-left">
                
                <div className="space-y-1.5">
                  <h4 className="font-bold text-white">SMTP Core Dispatch Address</h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase">ROUTINE_COMMS_RELAY</p>
                  <input
                    type="text"
                    value={smtpServer}
                    onChange={(e) => setSmtpServer(e.target.value)}
                    className="w-full bg-[#070b14] border border-[#1e293b] rounded px-3.5 py-2.5 text-white font-mono"
                  />
                </div>

                <div className="pt-4 border-t border-[#1e293b]/20 space-y-3">
                  <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                    SUBSCRIPTION SUMMARIES
                  </span>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 cursor-pointer leading-none">
                      <input
                        type="checkbox"
                        checked={weeklyDigest}
                        onChange={(e) => setWeeklyDigest(e.target.checked)}
                        className="accent-brand-cyan h-4 w-4 rounded"
                      />
                      <span>Consolidate structured G7 policy summary every Friday midnight</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer leading-none">
                      <input
                        type="checkbox"
                        checked={smsUrgentDispatch}
                        onChange={(e) => setSmsUrgentDispatch(e.target.checked)}
                        className="accent-brand-cyan h-4 w-4 rounded"
                      />
                      <span>Relay immediate SMS trigger during critical oceanic maritime blockades</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => onShowToast('SAVED CRITICAL DISPATCH PARAMETERS', 'success')}
                    className="px-5 py-2 bg-brand-cyan text-[#070b14] rounded text-xs font-bold font-sans transition-all active:scale-95 cursor-pointer"
                  >
                    Save Dispatch Rules
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* VIEWPORT D: SECURITY (REUSE HIGH FIDELITY SECURITY SETTINGS COMPONENT) */}
          {nestedTab === 'Security' && (
            <div className="animate-in fade-in duration-200">
              <SecuritySettings onShowToast={onShowToast} />
            </div>
          )}

          {/* VIEWPORT E: DATA MANAGEMENT */}
          {nestedTab === 'Data' && (
            <div className="bg-[#121829] border border-[#1e293b]/65 rounded-xl p-6 space-y-6">
              
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#1e293b]/40">
                <HardDrive size={15} className="text-brand-cyan" />
                <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                  Data Vault & Recovery Lifecycle
                </h3>
              </div>

              <div className="space-y-5 text-xs text-gray-300 font-sans text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                      Automated Storage Backup Interval
                    </label>
                    <select
                      value={autoBackupInterval}
                      onChange={(e) => {
                        setAutoBackupInterval(e.target.value);
                        onShowToast(`CONFIGURED COLD STORAGE BACKUP DRIFT TO: ${e.target.value.toUpperCase()}`, 'info');
                      }}
                      className="w-full bg-[#070b14] border border-[#1e293b] rounded px-3 py-2 text-white font-semibold"
                    >
                      <option value="Daily">Daily Sync (04:00 GMT)</option>
                      <option value="Weekly">Weekly Sync (Sunday)</option>
                      <option value="Real-Time">Real-time replication (Block-based)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                      Compression Ratio Mode
                    </label>
                    <select
                      value={compressionRatio}
                      onChange={(e) => setCompressionRatio(e.target.value)}
                      className="w-full bg-[#070b14] border border-[#1e293b] rounded px-3 py-2 text-white font-semibold"
                    >
                      <option value="High">High (Deflate64 Compliant)</option>
                      <option value="Standard">Standard (LZO Rapid)</option>
                      <option value="None">None (Uncompressed RAW Binary)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1e293b]/20 flex flex-wrap gap-4 items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">Full Database Structural Purge</h4>
                    <p className="text-[10px] text-gray-500 mt-1 leading-normal">
                      IRREVERSIBLY ERASES ALL OFFLINE ARCHIVED REPORTS AND AUDIT RECORDS INSTANTLY. Requires physical hardware token.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      const confirmPurge = window.confirm('DANGER: This action cannot be undone. Are you sure?');
                      if (confirmPurge) {
                        onShowToast('DENIED: PURGE REQUIRES MFA SECURITY ENVELOPE APPROVAL', 'info');
                      }
                    }}
                    className="px-4.5 py-2 hover:bg-red-500/10 hover:text-red-400 border border-[#1e293b] hover:border-red-500/25 rounded text-xs font-bold font-mono transition-all uppercase cursor-pointer"
                  >
                    Purge All Archives
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* VIEWPORT F: INTEGRATIONS PORTAL */}
          {nestedTab === 'Integrations' && (
            <div className="bg-[#121829] border border-[#1e293b]/65 rounded-xl p-6 space-y-6">
              
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#1e293b]/40">
                <Share2 size={15} className="text-brand-cyan" />
                <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                  External Service Integrations
                </h3>
              </div>

              <div className="space-y-5 text-xs text-gray-300 font-sans text-left">
                
                <div className="space-y-2">
                  <h4 className="font-bold text-white">Consensus Webhook Relay Callback</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                    PUSH REAL-TIME BULK LATENCY TELEMETRY AS JSON PAYLOADS
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="flex-1 bg-[#070b14] border border-[#1e293b] rounded px-3.5 py-2 text-white font-mono"
                    />
                    <button
                      onClick={() => onShowToast('DISPATCHED TEST PAYLOAD INTEGRATION COMPLETED: STATUS_200_OK', 'success')}
                      className="px-4 bg-[#070b14] hover:bg-[#121829] border border-[#1e293b] hover:border-gray-500 text-gray-300 font-mono rounded text-[11px] font-bold transition cursor-pointer"
                    >
                      Test Relay
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#1e293b]/20">
                  <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                    THIRD-PARTY CLOUD FEED PLOTS
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="bg-[#070b14]/50 border border-[#1e293b]/30 p-3.5 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white">IMF Data Warehouse</h4>
                        <p className="text-[10px] text-gray-505 font-mono">Status: Connected • Port 443</p>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan" />
                    </div>

                    <div className="bg-[#070b14]/50 border border-[#1e293b]/30 p-3.5 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white">WTO Global Tariffs Stream</h4>
                        <p className="text-[10px] text-gray-550 font-mono">Status: Offline • Reconnecting</p>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                    </div>

                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* 4. MODAL ELEMENT: ADD API ENDPOINT TERMINAL */}
      {showAddEndpointModal && (
        <div className="fixed inset-0 bg-[#070b14]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121829] border border-[#1e293b] rounded-xl w-full max-w-md p-6 relative font-sans space-y-4 animate-in zoom-in-95 duration-150 text-left">
            
            <div className="flex justify-between items-start pb-3 border-b border-[#1e293b]/40">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">Add API Endpoint Terminal</h3>
                <p className="text-[9px] text-gray-500 font-mono mt-0.5 uppercase">INTEGRITY_TERMINAL_PRODUCER</p>
              </div>
              <button
                onClick={() => setShowAddEndpointModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer select-none"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddEndpointSubmit} className="space-y-4 text-xs font-sans text-left text-gray-300">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Provider Service Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S&P Global ratings"
                  value={newProvider}
                  onChange={(e) => setNewProvider(e.target.value)}
                  className="w-full bg-[#070b14] border border-[#1e293b] rounded px-3 py-2 text-white focus:outline-none focus:border-brand-cyan font-semibold"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Endpoint Absolute URL</label>
                <input
                  type="text"
                  required
                  placeholder="https://api.sandp.com/v3/feed"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-[#070b14] border border-[#1e293b] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan font-mono"
                />
              </div>

              <div className="pt-3 border-t border-[#1e293b]/40 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddEndpointModal(false)}
                  className="px-4 py-2 border border-[#1e293b] hover:border-gray-500 rounded text-gray-300 font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-cyan hover:bg-[#00c993] text-[#070b14] rounded font-bold transition shadow-[0_0_12px_#00e0a5] cursor-pointer"
                >
                  Register Route
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

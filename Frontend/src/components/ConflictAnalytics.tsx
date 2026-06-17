/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { FileDown, Search, Minimize2, ChevronDown, TrendingUp, Compass, RotateCcw, AlertTriangle } from 'lucide-react';
import { fetchStats, fetchOngoingConflicts } from '../services/api';

interface ConflictAnalyticsProps {
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

export default function ConflictAnalytics({ onShowToast }: ConflictAnalyticsProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [activeFrictionTab, setActiveFrictionTab] = useState<'forecasting' | 'timeline'>('forecasting');
  const [selectedRange, setSelectedRange] = useState<string>('Last 24 Months');

  // Live intelligence summary state
  const [worstConflict, setWorstConflict] = useState<any>(null);
  const [globalTension, setGlobalTension] = useState<string>('7.8');
  
  useEffect(() => {
    let isMounted = true;
    let intervalId: ReturnType<typeof setInterval>;

    const loadData = async () => {
      try {
        const [conflicts, stats] = await Promise.all([
          fetchOngoingConflicts(),
          fetchStats()
        ]);
        
        if (!isMounted) return;

        if (conflicts && conflicts.length > 0) {
          // Find the worst conflict by combination of inflation + negative GDP
          const worst = conflicts.sort((a: any, b: any) => 
            ((b.inflationRate || 0) - (b.gdpChange || 0)) - ((a.inflationRate || 0) - (a.gdpChange || 0))
          )[0];
          setWorstConflict(worst);
        }

        if (stats && stats.totalConflicts) {
          const tensionScore = Math.min(10, 5 + (stats.ongoingConflicts * 0.1)).toFixed(1);
          setGlobalTension(tensionScore);
        }
      } catch (e) {
        console.error("Error fetching conflict analytics:", e);
      }
    };

    loadData();
    intervalId = setInterval(loadData, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const handleExport = () => {
    onShowToast('EXPORTING CLASSIFIED GEOPOLITICAL RISK PROFILE // DISPATCHED TO PDF', 'success');
  };

  const executeFullSimulation = () => {
    onShowToast('RUNNING MULTI-AGENT GEOPOLITICAL SIMULATION SENSITIVITY SCHEMATIC', 'success');
  };

  const zoomInMap = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2.0));
    onShowToast('TACTICAL ZOOM IN (+20%)', 'info');
  };

  const zoomOutMap = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.6));
    onShowToast('TACTICAL ZOOM OUT (-20%)', 'info');
  };

  const resetMap = () => {
    setZoomLevel(1.0);
    onShowToast('RESET TACTICAL MAP VECTORS', 'info');
  };

  return (
    <div className="space-y-6 text-left select-none animate-in fade-in duration-200" id="conflict-analytics-viewport">
      
      {/* 1. TOP HEADER NAVIGATION BLOCK */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1.5 select-none text-left">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-700">/</span>
            <span className="text-brand-cyan">Conflict</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display">
            Geopolitical Risk & Conflict Analytics
          </h2>
        </div>

        {/* HUD Navigation Actions */}
        <div className="flex flex-wrap items-center gap-3 self-end md:self-auto" id="conflict-action-bar">
          
          <div className="bg-[#121829] border border-[#1e293b] rounded-lg p-1 flex items-center">
            {/* Risk Forecasting button */}
            <button
              onClick={() => {
                setActiveFrictionTab('forecasting');
                onShowToast('SWITCHED HUD VIEW: RISK FORECASTING MODEL', 'info');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
                activeFrictionTab === 'forecasting'
                  ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              <Compass size={13} />
              <span>Risk Forecasting</span>
            </button>
            {/* Event Timeline button */}
            <button
              onClick={() => {
                setActiveFrictionTab('timeline');
                onShowToast('SWITCHED HUD VIEW: TEMPORAL EVENT TIMELINE', 'info');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
                activeFrictionTab === 'timeline'
                  ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              <TrendingUp size={13} />
              <span>Event Timeline</span>
            </button>
          </div>

          {/* Export intelligence report button matching custom HUD outline styling */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#121829] border border-brand-cyan/25 hover:border-brand-cyan/60 rounded text-xs font-bold text-brand-cyan hover:bg-[#1a2e3b]/30 transition-all cursor-pointer"
          >
            <FileDown size={14} />
            <span>Export Intelligence Report</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN LAYOUT GRID: Left-Map Overlay, Right-Intelligence Summary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MAP CONTAINER GRAPHIC - 2/3 Area */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 relative overflow-hidden min-h-[440px] flex flex-col justify-between" id="geopolitical-radar-box">
            
            {/* Radar Coordinates Mesh and lines layout wrapper */}
            <div className="absolute inset-0 bg-[#070b14]/90 pointer-events-none z-0">
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-8 bg-[#070b14]/95 opacity-50">
                {Array.from({ length: 80 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-[#1e293b]/10"></div>
                ))}
              </div>
            </div>

            {/* Glowing outer threat vector scan lines */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-red-500/20 via-orange-500/30 to-red-500/20 top-1/4 animate-pulse pointer-events-none z-10"></div>

            {/* World Interactive Radar Visualizations */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-lg min-h-[320px] mb-4 z-10">
              
              <svg
                viewBox="0 0 1000 520"
                className="w-full h-full select-none"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* World Map Polylines */}
                <g fill="#1e293b" fillOpacity="0.22" stroke="#1e293b" strokeWidth="0.8" strokeOpacity="0.35">
                  {/* Greenland */}
                  <path d="M 330,40 C 360,45 370,25 350,15 C 320,10 315,35 330,40 Z" />
                  {/* North America */}
                  <path d="M 110,130 C 130,90 220,50 270,70 C 330,90 310,150 290,170 C 280,180 250,200 220,220 C 200,205 180,190 160,200 C 135,215 120,190 110,150 Z" />
                  {/* South America */}
                  <path d="M 220,220 C 240,230 260,260 275,300 C 285,340 250,380 220,410 C 210,380 190,320 185,290 C 175,260 190,235 220,220 Z" />
                  {/* Eurasia */}
                  <path d="M 450,210 C 440,190 420,165 430,130 C 450,100 500,80 530,75 C 570,60 630,52 700,65 C 770,80 815,95 832,135 C 836,165 790,210 760,225 C 740,210 725,195 710,205 C 685,230 645,230 620,205 C 585,198 550,205 500,220 C 475,220 460,218 450,210 Z" />
                  {/* Africa */}
                  <path d="M 450,210 C 490,200 535,225 558,265 C 580,305 565,345 540,378 C 515,394 492,360 484,345 C 470,330 455,275 442,242 C 438,227 442,215 450,210 Z" />
                  {/* Australia */}
                  <path d="M 710,310 C 745,300 770,325 775,355 C 745,370 718,355 712,325 Z" />
                </g>

                {/* Tactical Intercept Curves (Classified Flight Paths / Shipping Disruptions) */}
                <path d="M 480 120 Q 560 190, 600 190" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
                <path d="M 540 180 Q 580 200, 740 185" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2 3" strokeOpacity="0.5" />
                <path d="M 210 145 Q 350 250, 375 320" fill="none" stroke="#00e0a5" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.3" />

                {/* THREAT POINT 1: ACTIVE COMBAT - RED PIN */}
                <g className="cursor-pointer group" onClick={() => onShowToast('SURVEILLANCE FOCUS LOCK: CRIMEA - BLACK SEA MARITIME HUB', 'info')}>
                  <circle cx="540" cy="160" r="28" className="fill-red-500/5 group-hover:fill-red-500/10 transition-colors" />
                  <circle cx="540" cy="160" r="14" className="stroke-red-500 stroke-1 fill-none animate-ping" style={{ transformOrigin: '540px 160px' }} />
                  <circle cx="540" cy="160" r="8" className="fill-red-500 stroke-2 stroke-[#121829]" />
                </g>

                {/* THREAT POINT 2: HIGH TENSION - ORANGE PIN */}
                <g className="cursor-pointer group" onClick={() => onShowToast('SURVEILLANCE FOCUS LOCK: TAIWAN STRAIT CHOKEPULLS', 'info')}>
                  <circle cx="600" cy="190" r="24" className="fill-orange-500/5 group-hover:fill-orange-500/10 transition-colors" />
                  <circle cx="600" cy="190" r="10" className="stroke-orange-500 stroke-1 fill-none animate-pulse" />
                  <circle cx="600" cy="190" r="6" className="fill-orange-500 stroke-2 stroke-[#121829]" />
                </g>

                {/* THREAT POINT 3: SUPPLY DISRUPTION - CYAN PIN */}
                <g className="cursor-pointer group" onClick={() => onShowToast('SURVEILLANCE FOCUS LOCK: PANAMA LOCK CHOKEPULLS', 'info')}>
                  <circle cx="375" cy="320" r="24" className="fill-brand-cyan/5 group-hover:fill-brand-cyan/10 transition-colors" />
                  <circle cx="375" cy="320" r="10" className="stroke-brand-cyan stroke-1 fill-none animate-pulse" />
                  <circle cx="375" cy="320" r="6" className="fill-brand-cyan stroke-2 stroke-[#121829]" />
                </g>

              </svg>

              {/* Float Map legend / metrics overlay matching details overlay */}
              <div className="absolute bottom-4 left-4 bg-[#121829]/95 border border-[#1e293b] rounded-lg p-4 flex gap-6 z-20 shadow-xl max-w-sm">
                
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span className="text-gray-300 font-semibold">Active Combat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                    <span className="text-gray-300 font-semibold">High Tension</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-cyan"></span>
                    <span className="text-gray-300 font-semibold">Supply Disruption</span>
                  </div>
                </div>

                <div className="h-10 w-px bg-[#1e293b]/85 self-center"></div>

                <div className="text-left">
                  <span className="text-[10px] font-mono text-gray-500 font-bold block uppercase tracking-wide leading-none">
                    Global Tension Index
                  </span>
                  <span className="text-xl font-bold font-display text-white mt-1 block">
                    {globalTension} <span className="text-xs text-gray-500">/ 10</span>
                  </span>
                </div>

              </div>

              {/* Floating map camera actions block */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
                <button
                  onClick={zoomInMap}
                  className="h-8 w-8 rounded-lg bg-[#121829] border border-[#1e293b] hover:border-brand-cyan/40 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <Search size={15} />
                </button>
                <button
                  onClick={zoomOutMap}
                  className="h-8 w-8 rounded-lg bg-[#121829] border border-[#1e293b] hover:border-[#475569] text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <Minimize2 size={15} />
                </button>
                <button
                  onClick={resetMap}
                  className="h-8 w-8 rounded-lg bg-[#121829] border border-[#1e293b] text-gray-400 hover:text-white flex items-center justify-center hover:border-brand-cyan/50 transition-all cursor-pointer"
                  title="Reset viewport orientation"
                >
                  <RotateCcw size={14} className="text-gray-400 animate-spin-slow" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* INTELLIGENCE SUMMARY SIDEBAR - 1/3 Area */}
        <div className="col-span-1 select-none">
          <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 space-y-6 flex flex-col justify-between h-full" id="intelligence-conflict-summary">
            
            <div className="space-y-5">
              {/* Sidebar Header Title + Priority badge */}
              <div className="flex justify-between items-start border-b border-[#1e293b]/40 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight font-sans">
                    Intelligence Summary
                  </h3>
                  <p className="text-[10px] font-mono text-gray-500 mt-1 uppercase">
                    SYS_THREAT_MONITOR // R-106
                  </p>
                </div>

                <span className="text-[10px] text-red-500 border border-red-500/30 font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider bg-red-500/5 shadow-[0_0_6px_rgba(239,68,68,0.12)] shrink-0">
                  CRITICAL
                </span>
              </div>

              {/* Warning box detail block */}
              <div className="bg-red-500/5 border border-red-500/30 p-3 rounded-xl flex items-start gap-4">
                <div className="h-9 w-9 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 mt-0.5 animate-pulse">
                  <AlertTriangle size={17} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white transition-all">
                    {worstConflict ? worstConflict.conflictName : 'Monitoring Data...'}
                  </h4>
                  <span className="text-[9px] font-mono text-gray-500 block uppercase mt-1">
                    {worstConflict ? `Detected: Region ${worstConflict.region}` : 'Waiting for telemetry...'}
                  </span>
                </div>
              </div>

              {/* Dual Horizontal KPI Metric Blocks */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Severity score stat */}
                <div className="bg-[#070b14]/50 border border-[#1e293b]/30 p-3 rounded-lg text-left">
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider block">
                    Inflation Rate
                  </span>
                  <span className="text-2xl font-extrabold font-display text-red-500 block mt-1">
                    {worstConflict && worstConflict.inflationRate ? `${worstConflict.inflationRate}%` : '--'}
                  </span>
                </div>

                {/* Market volatility stat */}
                <div className="bg-[#070b14]/50 border border-[#1e293b]/30 p-3 rounded-lg text-left">
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider block">
                    GDP Impact
                  </span>
                  <span className="text-2xl font-extrabold font-display text-orange-500 block mt-1">
                    {worstConflict && worstConflict.gdpChange ? `${worstConflict.gdpChange > 0 ? '+' : ''}${worstConflict.gdpChange}%` : '--'}
                  </span>
                </div>
              </div>

              {/* Economic impact progress breakdown bars */}
              <div className="space-y-3.5">
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block pb-1 border-b border-[#1e293b]/20">
                  ECONOMIC IMPACT BREAKDOWN
                </span>

                {/* Index 1: Agri Commodities */}
                <div className="space-y-1.5 font-sans">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-300">Agri-Commodities</span>
                    <span className="text-red-500 font-bold font-mono">Severe</span>
                  </div>
                  <div className="w-full bg-[#070b14] h-1.5 rounded-full overflow-hidden border border-[#1e293b]/35">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                {/* Index 2: Energy Transit */}
                <div className="space-y-1.5 font-sans">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-300">Energy Transit</span>
                    <span className="text-orange-500 font-bold font-mono">Moderate</span>
                  </div>
                  <div className="w-full bg-[#070b14] h-1.5 rounded-full overflow-hidden border border-[#1e293b]/35">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                {/* Index 3: Insurance Premiums */}
                <div className="space-y-1.5 font-sans">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-300">Insurance Premiums</span>
                    <span className="text-red-500 font-bold font-mono">Severe</span>
                  </div>
                  <div className="w-full bg-[#070b14] h-1.5 rounded-full overflow-hidden border border-[#1e293b]/35">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

            </div>

            {/* Simulated Action trigger button */}
            <button
              onClick={executeFullSimulation}
              className="w-full py-2.5 bg-[#070b14] border border-[#1e293b] hover:border-brand-cyan hover:text-white text-gray-300 rounded font-semibold text-xs font-sans transition-all cursor-pointer active:scale-95"
            >
              Analyze Full Impact Chain
            </button>

          </div>
        </div>

      </div>

      {/* 3. DOCK BAR: CONFLICT SEVERITY TIMELINE FULL-WIDTH WAVE CHART */}
      <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 select-none" id="conflict-timeline-dock">
        
        {/* Navigation / Header of the timeline card */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h4 className="text-base font-bold text-white tracking-tight font-sans">
              Conflict Severity Timeline
            </h4>
            <p className="text-xs text-gray-400 mt-1 leading-normal text-left font-sans">
              Historical intensity vs. global trade impact (24-Month View)
            </p>
          </div>

          {/* Action row controllers */}
          <div className="flex items-center gap-4 select-none">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold font-mono tracking-wide uppercase text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                Intensity
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-cyan"></span>
                Trade Impact
              </span>
            </div>

            {/* Filter picker Select Dropdown */}
            <div className="relative">
              <select
                value={selectedRange}
                onChange={(e) => {
                  setSelectedRange(e.target.value);
                  onShowToast(`CALIBRATED TIMELINE WINDOW COMPRESSION: ${e.target.value}`, 'info');
                }}
                className="appearance-none bg-[#070b14] border border-[#1e293b] rounded pl-3 pr-8 py-1 text-xs text-gray-300 font-semibold focus:outline-none focus:border-brand-cyan/60 font-sans cursor-pointer"
              >
                <option value="Last 24 Months">Last 24 Months</option>
                <option value="Last 12 Months">Last 12 Months</option>
                <option value="Last 36 Months">Last 36 Months</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Dynamic Wave line representation using high-fidelity curated SVG Paths */}
        <div className="h-44 bg-[#070b14]/50 border border-[#1e293b]/25 rounded-lg p-3 relative flex items-end">
          
          {/* Horizontal grid guide lines */}
          <div className="absolute left-3 right-3 top-8 border-t border-[#1e293b]/10"></div>
          <div className="absolute left-3 right-3 top-20 border-t border-[#1e293b]/10"></div>
          <div className="absolute left-3 right-3 top-32 border-t border-[#1e293b]/10"></div>

          <svg viewBox="0 0 1000 120" className="w-full h-full absolute inset-0 z-10 pointer-events-none">
            
            {/* Gradient under Trade Impact Cyan Path */}
            <defs>
              <linearGradient id="trade-cyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e0a5" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#00e0a5" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="intensity-red" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Filled Areas */}
            <path d="M 10 90 Q 250 110, 500 50 T 880 110 L 880 120 L 10 120 Z" fill="url(#intensity-red)" />
            <path d="M 10 90 Q 250 68, 500 80 T 960 40 L 960 120 L 10 120 Z" fill="url(#trade-cyan)" />

            {/* INTENSITY RED PATH */}
            <path
              d="M 10 90 Q 250 110, 500 50 T 880 110 L 1000 30"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeOpacity="0.65"
              strokeDasharray="4 4"
            />

            {/* TRADE IMPACT CYAN LINE */}
            <path
              d="M 10 90 Q 250 68, 500 80 T 960 40 L 1000 20"
              fill="none"
              stroke="#00e0a5"
              strokeWidth="2"
              className="drop-shadow-[0_0_6px_rgba(0,224,165,0.3)]"
            />

          </svg>

          {/* Time scale Labels layout matches bottom screen row exactly */}
          <div className="w-full flex justify-between text-[10px] font-mono text-gray-500 pr-1 select-none z-20 relative pt-1.5 border-t border-[#1e293b]/25">
            <span>Q3 2022</span>
            <span>Q1 2023</span>
            <span>Q3 2023</span>
            <span className="font-bold text-gray-400">PRESENT</span>
          </div>

        </div>

      </div>

      {/* 4. FOOTER CLASSIFIED TELEMETRY HUD TEXT BLOCK */}
      <div className="text-center font-mono text-[9px] text-gray-600 uppercase tracking-[0.2em] pt-2" id="encryption-telemetry-banner">
        SECURE CHANNEL // ENCRYPTION AES-256 ACTIVE // LAST UPDATE: 14:22:01 UTC
      </div>

    </div>
  );
}

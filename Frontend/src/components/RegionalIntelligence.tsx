/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  ArrowLeftRight,
  Calendar,
  FileDown,
  Plus,
  Minus,
  ChevronDown
} from 'lucide-react';

interface RegionalIntelligenceProps {
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

type RegionId = 'europe' | 'north_america' | 'east_asia';

export default function RegionalIntelligence({ onShowToast }: RegionalIntelligenceProps) {
  const [selectedRegion, setSelectedRegion] = useState<RegionId>('europe');
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [selectedQuarter, setSelectedQuarter] = useState<string>('Q3 2024');

  // Trigger region switch
  const selectRegionId = (id: RegionId) => {
    setSelectedRegion(id);
    const names: Record<RegionId, string> = {
      europe: 'Europe (EU-27)',
      north_america: 'North America (USA)',
      east_asia: 'East Asia (APAC)'
    };
    onShowToast(`SURVEILLANCE FOCUS SWAPPED // LOCKED ON: ${names[id].toUpperCase()}`, 'info');
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.15, 2.2));
    onShowToast('SENSOR SCALE INCREMENTED (+15%)', 'info');
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.15, 0.7));
    onShowToast('SENSOR SCALE DECREMENTED (-15%)', 'info');
  };

  const toggle3DMode = () => {
    setIs3DMode((prev) => !prev);
    onShowToast(is3DMode ? 'FLATTEN CO-ORDINATES // 2D MODE' : 'ROTATION INTERRUPT ACTIVE // 3D SKEW ON', 'success');
  };

  const handleExport = () => {
    onShowToast('COMPILING GEOPOLITICAL RISK INDEXES // EXPLAINED DISPATCHED', 'success');
  };

  // Region parameters
  const regionDetails = {
    europe: {
      pillLabel: 'EUROPE (EU-27)',
      gdpTrend: '+2.4% YoY',
      barHeights: [22, 38, 30, 62, 75, 88], // years 2019-2024
      prePandemic: '104.2',
      postRecovery: '112.8',
      riskLevels: {
        inflation: 2, // out of 3
        stability: 3,
        tradeDeficit: 1 // coral danger
      }
    },
    north_america: {
      pillLabel: 'AMERICAS (USA-CAN)',
      gdpTrend: '+3.1% YoY',
      barHeights: [35, 18, 48, 70, 82, 94],
      prePandemic: '108.5',
      postRecovery: '121.2',
      riskLevels: {
        inflation: 3,
        stability: 2,
        tradeDeficit: 2
      }
    },
    east_asia: {
      pillLabel: 'EAST ASIA (ASIA-PACIFIC)',
      gdpTrend: '+4.8% YoY',
      barHeights: [42, 32, 54, 76, 86, 98],
      prePandemic: '111.4',
      postRecovery: '128.6',
      riskLevels: {
        inflation: 1,
        stability: 2,
        tradeDeficit: 3
      }
    }
  };

  return (
    <div className="space-y-6 text-left select-none animate-in fade-in duration-200" id="regional-intelligence-viewport">
      
      {/* 1. TOP HEADER & NAVIGATION BLOCK */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1.5 select-none text-left">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-700">/</span>
            <span className="text-brand-cyan">Regional</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display">
            Regional Economic Intelligence
          </h2>
        </div>

        {/* HUD Sub Navigation Buttons matching the screenshot look */}
        <div className="flex items-center gap-3 self-end md:self-auto" id="regional-hud-actions">
          {/* Compare Regions Action */}
          <button
            onClick={() => onShowToast('INITIATED MULTI-REGION ECONOMETRIC COMPARISON', 'info')}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#121829] border border-[#1e293b] hover:border-gray-600 rounded text-xs font-semibold text-gray-300 hover:bg-[#1e293b]/50 transition-all cursor-pointer"
          >
            <ArrowLeftRight size={13} className="text-gray-400" />
            <span>Compare Regions</span>
          </button>

          {/* Quarter Dropdown Duration */}
          <div className="relative">
            <select
              value={selectedQuarter}
              onChange={(e) => {
                setSelectedQuarter(e.target.value);
                onShowToast(`FILTERING RETRO-CALIBRATED STATS FOR : ${e.target.value}`, 'info');
              }}
              className="appearance-none bg-[#121829] border border-[#1e293b] hover:border-gray-600 rounded px-4 py-1.5 pr-8 text-xs font-semibold text-gray-300 font-sans focus:outline-none cursor-pointer"
            >
              <option value="Q3 2024">Q3 2024</option>
              <option value="Q4 2024">Q4 2024</option>
              <option value="Q1 2025">Q1 2025</option>
              <option value="Q2 2025">Q2 2025</option>
            </select>
            <Calendar size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none hidden sm:block" />
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Export PDF Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#121829] border border-brand-cyan/25 hover:border-brand-cyan/60 rounded text-xs font-semibold text-brand-cyan hover:bg-[#1a2e3b]/30 transition-all cursor-pointer"
          >
            <FileDown size={13} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. CORE DOCK GRID - LEFT MAP & REGIONAL KPIs, RIGHT DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column workstation (spans 2 on desktop) */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          
          {/* A. MAP CONTAINER BLOCK */}
          <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 relative overflow-hidden flex-1 min-h-[480px] flex flex-col justify-between">
            
            {/* Map Header details panel overlay (absolute placed in top left for elegance) */}
            <div className="z-20 pointer-events-none">
              <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider block">
                GLOBAL VIEW
              </span>
              <h4 className="text-base font-bold text-white tracking-tight mt-0.5 font-sans">
                Aggregated Health Score
              </h4>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-[11px] font-medium font-sans text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-cyan"></span>
                  Optimal (80+)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#94a3b8]"></span>
                  Stable (50-80)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#ef4444]"></span>
                  Critical (&lt;50)
                </span>
              </div>
            </div>

            {/* High-Fidelity Interactive Vector World Map */}
            <div className="relative flex-1 flex items-center justify-center min-h-[300px] overflow-hidden rounded-xl mt-4 border border-[#1e293b]/40 bg-[#070b14]/75">
              
              {/* Radar Coordinate Grid lines */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 pointer-events-none">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-[#1e293b]/10"></div>
                ))}
              </div>

              {/* Glowing Ambient center background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,224,165,0.03)_0%,transparent_75%)] pointer-events-none"></div>

              {/* Absolute coordinates panel overlays */}
              <div className="absolute top-2 right-3 font-mono text-[9px] text-gray-600 select-none">
                SYS_VER_GRID_COORD // 44.156° N, 12.004° E
              </div>

              {/* The SVG element supporting zooms and interactive modes */}
              <svg
                viewBox="0 0 1000 520"
                className="w-full h-full select-none"
                style={{
                  transform: `${is3DMode ? 'perspective(1200px) rotateX(25deg) rotateY(-6deg)' : ''} scale(${zoomScale})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* World outlines paths styled high-tech */}
                <g fill="#1e293b" fillOpacity="0.25" stroke="#1e293b" strokeWidth="0.8" strokeOpacity="0.4">
                  {/* Greenland */}
                  <path d="M 330,40 C 360,45 370,25 350,15 C 320,10 315,35 330,40 Z" />
                  
                  {/* North America */}
                  <path d="M 110,130 C 130,90 220,50 270,70 C 330,90 310,150 290,170 C 280,180 250,200 220,220 C 200,205 180,190 160,200 C 135,215 120,190 110,150 Z" />
                  
                  {/* South America */}
                  <path d="M 220,220 C 240,230 260,260 275,300 C 285,340 250,380 220,410 C 210,380 190,320 185,290 C 175,260 190,235 220,220 Z" fillOpacity="0.20" />
                  
                  {/* Eurasia (Europe & Asia) */}
                  <path d="M 450,210 C 440,190 420,165 430,130 C 450,100 500,80 530,75 C 570,60 630,52 700,65 C 770,80 815,95 832,135 C 836,165 790,210 760,225 C 740,210 725,195 710,205 C 685,230 645,230 620,205 C 585,198 550,205 500,220 C 475,220 460,218 450,210 Z" />
                  
                  {/* Africa */}
                  <path d="M 450,210 C 490,200 535,225 558,265 C 580,305 565,345 540,378 C 515,394 492,360 484,345 C 470,330 455,275 442,242 C 438,227 442,215 450,210 Z" fillOpacity="0.22" />
                  
                  {/* Australia */}
                  <path d="M 710,310 C 745,300 770,325 775,355 C 745,370 718,355 712,325 Z" />
                </g>

                {/* Sub-grid scanning vectors */}
                <line x1="100" y1="260" x2="900" y2="260" stroke="rgba(30,41,59,0.15)" strokeDasharray="5 5" />
                <line x1="500" y1="50" x2="500" y2="470" stroke="rgba(30,41,59,0.15)" strokeDasharray="5 5" />

                {/* INTERACTIVE POSITION PIN 1: NORTH AMERICA */}
                <g
                  className="cursor-pointer group"
                  onClick={() => selectRegionId('north_america')}
                >
                  <circle
                    cx="210"
                    cy="145"
                    r="24"
                    className="fill-slate-500/5 group-hover:fill-slate-500/10 transition-colors"
                  />
                  {/* Outer breathing ring */}
                  <circle
                    cx="210"
                    cy="145"
                    r="12"
                    className={`stroke-slate-400 fill-none stroke-1 transition-all duration-500 ${
                      selectedRegion === 'north_america' ? 'scale-125 animate-ping' : ''
                    }`}
                    style={{ transformOrigin: '210px 145px' }}
                  />
                  {/* Outer circle */}
                  <circle
                    cx="210"
                    cy="145"
                    r="7"
                    className={`transition-colors border border-slate-500 ${
                      selectedRegion === 'north_america'
                        ? 'fill-white stroke-slate-300'
                        : 'fill-slate-800 stroke-slate-500'
                    }`}
                  />
                  {/* Miniature Pin Dot */}
                  <circle
                    cx="210"
                    cy="145"
                    r="2.5"
                    className={`${
                      selectedRegion === 'north_america' ? 'fill-[#121829]' : 'fill-[#94a3b8]'
                    }`}
                  />
                </g>

                {/* INTERACTIVE POSITION PIN 2: EUROPE */}
                <g
                  className="cursor-pointer group"
                  onClick={() => selectRegionId('europe')}
                >
                  <circle
                    cx="480"
                    cy="120"
                    r="24"
                    className="fill-brand-cyan/5 group-hover:fill-brand-cyan/10 transition-colors"
                  />
                  {/* Outer breathing ring */}
                  <circle
                    cx="480"
                    cy="120"
                    r="12"
                    className={`stroke-brand-cyan fill-none stroke-1 transition-all duration-500 ${
                      selectedRegion === 'europe' ? 'scale-125 animate-ping' : ''
                    }`}
                    style={{ transformOrigin: '480px 120px' }}
                  />
                  {/* Outer circle */}
                  <circle
                    cx="480"
                    cy="120"
                    r="7"
                    className={`transition-colors ${
                      selectedRegion === 'europe'
                        ? 'fill-[#00e0a5] stroke-[#00e0a5]'
                        : 'fill-slate-800 stroke-brand-cyan/50'
                    }`}
                  />
                  {/* Miniature Pin Dot */}
                  <circle
                    cx="480"
                    cy="120"
                    r="2.5"
                    className={`${selectedRegion === 'europe' ? 'fill-[#121829]' : 'fill-brand-cyan'}`}
                  />
                </g>

                {/* INTERACTIVE POSITION PIN 3: EAST ASIA */}
                <g
                  className="cursor-pointer group"
                  onClick={() => selectRegionId('east_asia')}
                >
                  <circle
                    cx="740"
                    cy="185"
                    r="24"
                    className="fill-brand-cyan/5 group-hover:fill-brand-cyan/10 transition-colors"
                  />
                  {/* Outer breathing ring */}
                  <circle
                    cx="740"
                    cy="185"
                    r="12"
                    className={`stroke-brand-cyan fill-none stroke-1 transition-all duration-500 ${
                      selectedRegion === 'east_asia' ? 'scale-125 animate-ping' : ''
                    }`}
                    style={{ transformOrigin: '740px 185px' }}
                  />
                  {/* Outer circle */}
                  <circle
                    cx="740"
                    cy="185"
                    r="7"
                    className={`transition-colors ${
                      selectedRegion === 'east_asia'
                        ? 'fill-[#00e0a5] stroke-[#00e0a5]'
                        : 'fill-slate-800 stroke-brand-cyan/50'
                    }`}
                  />
                  {/* Miniature Pin Dot */}
                  <circle
                    cx="740"
                    cy="185"
                    r="2.5"
                    className={`${selectedRegion === 'east_asia' ? 'fill-[#121829]' : 'fill-brand-cyan'}`}
                  />
                </g>

              </svg>

              {/* Floating map action buttons row matching the screenshot bottom right */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
                {/* Zoom In Button */}
                <button
                  onClick={handleZoomIn}
                  className="h-8 w-8 rounded-lg bg-[#121829] border border-[#1e293b] hover:border-brand-cyan/30 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <Plus size={16} />
                </button>

                {/* Zoom Out Button */}
                <button
                  onClick={handleZoomOut}
                  className="h-8 w-8 rounded-lg bg-[#121829] border border-[#1e293b] hover:border-brand-cyan/30 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <Minus size={16} />
                </button>

                {/* 3D Transform Skew Button */}
                <button
                  onClick={toggle3DMode}
                  className={`h-8 w-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 ${
                    is3DMode
                      ? 'bg-brand-cyan/15 border-brand-cyan text-brand-cyan shadow-[0_0_8px_rgba(0,224,165,0.2)]'
                      : 'bg-[#121829] border-[#1e293b] text-gray-400 hover:text-white hover:border-[#475569]'
                  }`}
                  title="Toggle 3D View Screen"
                >
                  <span className="font-mono text-[9px] font-bold">3D</span>
                </button>
              </div>

            </div>
          </div>

          {/* B. UNDER-MAP INDEXES - TWO COLUMN ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
            
            {/* PERFORMING REGIONS PANEL */}
            <div className="bg-[#121829] border border-[#1e293b]/50 rounded-xl p-5" id="top-performing-panel">
              <h4 className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-4">
                TOP 5 PERFORMING REGIONS
              </h4>
              <div className="space-y-4 font-sans">
                {/* Northern Europe */}
                <div
                  className={`group/item p-1.5 rounded-lg transition-colors cursor-pointer ${
                    selectedRegion === 'europe' ? 'bg-[#1e293b]/30' : 'hover:bg-slate-800/10'
                  }`}
                  onClick={() => selectRegionId('europe')}
                >
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-white group-hover/item:text-brand-cyan transition-colors">
                      Northern Europe
                    </span>
                    <span className="font-bold font-mono text-brand-cyan">88.4</span>
                  </div>
                  <div className="w-full bg-[#070b14]/90 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-cyan h-full rounded-full transition-all duration-1000" style={{ width: '88.4%' }}></div>
                  </div>
                </div>

                {/* East Asia */}
                <div
                  className={`group/item p-1.5 rounded-lg transition-colors cursor-pointer ${
                    selectedRegion === 'east_asia' ? 'bg-[#1e293b]/30' : 'hover:bg-slate-800/10'
                  }`}
                  onClick={() => selectRegionId('east_asia')}
                >
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-white group-hover/item:text-brand-cyan transition-colors">
                      East Asia
                    </span>
                    <span className="font-bold font-mono text-brand-cyan">82.1</span>
                  </div>
                  <div className="w-full bg-[#070b14]/90 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-cyan h-full rounded-full transition-all duration-1000" style={{ width: '82.1%' }}></div>
                  </div>
                </div>

                {/* North America */}
                <div
                  className={`group/item p-1.5 rounded-lg transition-colors cursor-pointer ${
                    selectedRegion === 'north_america' ? 'bg-[#1e293b]/30' : 'hover:bg-slate-800/10'
                  }`}
                  onClick={() => selectRegionId('north_america')}
                >
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-white group-hover/item:text-brand-cyan transition-colors">
                      North America
                    </span>
                    <span className="font-bold font-mono text-brand-cyan">79.5</span>
                  </div>
                  <div className="w-full bg-[#070b14]/90 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-cyan/85 h-full rounded-full transition-all duration-1000" style={{ width: '79.5%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* CRITICAL RISK SURF_ZONE PANEL */}
            <div className="bg-[#121829] border border-[#1e293b]/50 rounded-xl p-5" id="critical-risk-panel">
              <h4 className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-4">
                CRITICAL RISK REGIONS
              </h4>
              <div className="space-y-4 font-sans">
                {/* Sub-Saharan Africa */}
                <div className="p-1.5 hover:bg-slate-800/10 rounded-lg cursor-pointer" onClick={() => onShowToast('SURVEILLANCE ENGAGED ON AFRICA RIFT VALLEY METRICS', 'info')}>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-white">Sub-Saharan Africa</span>
                    <span className="font-bold font-mono text-[#ef4444]">32.4</span>
                  </div>
                  <div className="w-full bg-[#070b14]/90 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#ef4444] h-full rounded-full transition-all duration-1000" style={{ width: '32.4%' }}></div>
                  </div>
                </div>

                {/* Central Asia */}
                <div className="p-1.5 hover:bg-slate-800/10 rounded-lg cursor-pointer" onClick={() => onShowToast('SURVEILLANCE ENGAGED ON AMU DARYA WATER CORRIDORS', 'info')}>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-white">Central Asia</span>
                    <span className="font-bold font-mono text-[#f97316]">41.8</span>
                  </div>
                  <div className="w-full bg-[#070b14]/90 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#f97316] h-full rounded-full transition-all duration-1000" style={{ width: '41.8%' }}></div>
                  </div>
                </div>

                {/* South America */}
                <div className="p-1.5 hover:bg-slate-800/10 rounded-lg cursor-pointer" onClick={() => onShowToast('SURVEILLANCE ENGAGED ON LITHIUM TRIANGLE COMMODITY SHIFTS', 'info')}>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-white">South America</span>
                    <span className="font-bold font-mono text-[#f59e0b]">48.2</span>
                  </div>
                  <div className="w-full bg-[#070b14]/90 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#f59e0b] h-full rounded-full transition-all duration-1000" style={{ width: '48.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right column: REGION INTELLIGENCE DETAILS panel */}
        <div className="lg:col-span-1 select-none">
          
          <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 space-y-6 h-full flex flex-col justify-between" id="intelligence-details-sidebar">
            
            <div className="space-y-6">
              {/* Sidebar Header containing title & highlighted bordered pill */}
              <div className="flex justify-between items-start gap-2 border-b border-[#1e293b]/40 pb-4">
                <div>
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase block tracking-wider">
                    SURVEILLANCE CONTEXT // 74.A2
                  </span>
                  <h4 className="text-xs font-mono font-bold text-gray-400 mt-0.5">
                    REGION INTELLIGENCE DETAILS
                  </h4>
                </div>
                
                {/* Dynamically switching Pill reflecting clicked spot! */}
                <span className="text-[10px] text-brand-cyan border border-brand-cyan/30 px-2 py-1 rounded bg-brand-cyan/10 font-bold font-mono text-right select-none uppercase shadow-[0_0_8px_rgba(0,224,165,0.06)] shrink-0">
                  {regionDetails[selectedRegion].pillLabel}
                </span>
              </div>

              {/* SECTION A: GDP Growth Trends Header */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white tracking-tight">
                    GDP Growth Trends
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-cyan">
                    {regionDetails[selectedRegion].gdpTrend}
                  </span>
                </div>

                {/* Highly-Stylized high-density custom vertical GDP Bar Chart */}
                <div className="h-28 bg-[#070b14]/40 border border-[#1e293b]/30 rounded-lg p-3 flex flex-col justify-between relative">
                  
                  {/* Absolute reference lines underneath */}
                  <div className="absolute left-3 right-3 top-3 border-t border-[#1e293b]/10"></div>
                  <div className="absolute left-3 right-3 top-12 border-t border-[#1e293b]/10"></div>
                  <div className="absolute left-3 right-3 top-20 border-t border-[#1e293b]/10"></div>
                  
                  {/* Bars row alignment matching screen */}
                  <div className="flex-1 flex items-end justify-between gap-2.5 px-1 relative z-10">
                    
                    {/* 2019 Bar (Dark) */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div
                        className="w-full bg-slate-800 hover:bg-slate-700 rounded-t-sm transition-all duration-500"
                        style={{ height: `${regionDetails[selectedRegion].barHeights[0]}%` }}
                      ></div>
                    </div>

                    {/* 2020 Bar (Dark) */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div
                        className="w-full bg-slate-800 hover:bg-slate-700 rounded-t-sm transition-all duration-500"
                        style={{ height: `${regionDetails[selectedRegion].barHeights[1]}%` }}
                      ></div>
                    </div>

                    {/* 2021 Bar (Dark) */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div
                        className="w-full bg-slate-800 hover:bg-slate-700 rounded-t-sm transition-all duration-500"
                        style={{ height: `${regionDetails[selectedRegion].barHeights[2]}%` }}
                      ></div>
                    </div>

                    {/* 2022 Bar (Cyan) */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div
                        className="w-full bg-brand-cyan hover:brightness-110 rounded-t-sm transition-all duration-500 shadow-[0_0_8px_rgba(0,224,165,0.15)]"
                        style={{ height: `${regionDetails[selectedRegion].barHeights[3]}%` }}
                      ></div>
                    </div>

                    {/* 2023 Bar (Cyan) */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div
                        className="w-full bg-brand-cyan hover:brightness-110 rounded-t-sm transition-all duration-500 shadow-[0_0_10px_rgba(0,224,165,0.2)]"
                        style={{ height: `${regionDetails[selectedRegion].barHeights[4]}%` }}
                      ></div>
                    </div>

                    {/* 2024 P Bar (Cyan) */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div
                        className="w-full bg-brand-cyan hover:brightness-110 rounded-t-sm transition-all duration-500 shadow-[0_0_12px_rgba(0,224,165,0.25)]"
                        style={{ height: `${regionDetails[selectedRegion].barHeights[5]}%` }}
                      ></div>
                    </div>

                  </div>

                  {/* Year labels at bottom bar row */}
                  <div className="flex justify-between text-[9px] font-mono text-gray-400 px-1 pt-1.5 border-t border-[#1e293b]/25">
                    <span className="flex-1 text-center">2019</span>
                    <span className="flex-1 text-center">2020</span>
                    <span className="flex-1 text-center">2021</span>
                    <span className="flex-grow text-center text-brand-cyan">2022</span>
                    <span className="flex-grow text-center text-brand-cyan">2023</span>
                    <span className="flex-grow text-center text-brand-cyan font-bold">2024 (P)</span>
                  </div>

                </div>
              </div>

              {/* SECTION B: Historical Comparison */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-white tracking-tight">
                  Historical Comparison
                </span>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#070b14]/50 border border-[#1e293b]/30 p-2.5 rounded-lg text-left select-none">
                    <span className="text-[9px] font-mono text-gray-500 font-semibold block uppercase">
                      PRE-PANDEMIC
                    </span>
                    <span className="text-xl font-bold font-display text-white block mt-0.5">
                      {regionDetails[selectedRegion].prePandemic}
                    </span>
                  </div>

                  <div className="bg-[#070b14]/50 border border-[#1e293b]/30 p-2.5 rounded-lg text-left select-none">
                    <span className="text-[9px] font-mono text-gray-500 font-semibold block uppercase">
                      POST-RECOVERY
                    </span>
                    <span className="text-xl font-bold font-display text-brand-cyan block mt-0.5">
                      {regionDetails[selectedRegion].postRecovery}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION C: Risk Assessment segments */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-white tracking-tight">
                  Risk Assessment
                </span>

                <div className="space-y-2.5 font-sans">
                  {/* Parameter 1: Inflation Volatility */}
                  <div className="bg-[#070b14]/40 border border-[#1e293b]/25 p-2.5 rounded-lg flex justify-between items-center text-xs">
                    <span className="text-gray-300 font-medium">Inflation Volatility</span>
                    
                    {/* The 3 small segment nodes */}
                    <div className="flex gap-1.5">
                      <span className={`h-1.5 w-6 rounded transition-all ${
                        regionDetails[selectedRegion].riskLevels.inflation >= 1
                          ? 'bg-brand-cyan animate-pulse'
                          : 'bg-slate-800'
                      }`} />
                      <span className={`h-1.5 w-6 rounded transition-all ${
                        regionDetails[selectedRegion].riskLevels.inflation >= 2
                          ? 'bg-brand-cyan'
                          : 'bg-slate-800'
                      }`} />
                      <span className={`h-1.5 w-6 rounded transition-all ${
                        regionDetails[selectedRegion].riskLevels.inflation >= 3
                          ? 'bg-brand-cyan'
                          : 'bg-slate-800'
                      }`} />
                    </div>
                  </div>

                  {/* Parameter 2: Political Stability */}
                  <div className="bg-[#070b14]/40 border border-[#1e293b]/25 p-2.5 rounded-lg flex justify-between items-center text-xs">
                    <span className="text-gray-300 font-medium font-sans">Political Stability</span>
                    
                    {/* The 3 small segment nodes */}
                    <div className="flex gap-1.5">
                      <span className={`h-1.5 w-6 rounded transition-all ${
                        regionDetails[selectedRegion].riskLevels.stability >= 1
                          ? 'bg-brand-cyan'
                          : 'bg-slate-800'
                      }`} />
                      <span className={`h-1.5 w-6 rounded transition-all ${
                        regionDetails[selectedRegion].riskLevels.stability >= 2
                          ? 'bg-brand-cyan'
                          : 'bg-slate-800'
                      }`} />
                      <span className={`h-1.5 w-6 rounded transition-all ${
                        regionDetails[selectedRegion].riskLevels.stability >= 3
                          ? 'bg-brand-cyan'
                          : 'bg-slate-800'
                      }`} />
                    </div>
                  </div>

                  {/* Parameter 3: Trade Deficit Risk */}
                  <div className="bg-[#070b14]/40 border border-[#1e293b]/25 p-2.5 rounded-lg flex justify-between items-center text-xs">
                    <span className="text-gray-300 font-medium font-sans">Trade Deficit Risk</span>
                    
                    {/* The 3 small coral warning segment nodes */}
                    <div className="flex gap-1.5">
                      <span className={`h-1.5 w-6 rounded transition-all ${
                        regionDetails[selectedRegion].riskLevels.tradeDeficit >= 1
                          ? 'bg-[#ef4444]'
                          : 'bg-slate-800'
                      }`} />
                      <span className={`h-1.5 w-6 rounded transition-all ${
                        regionDetails[selectedRegion].riskLevels.tradeDeficit >= 2
                          ? 'bg-[#ef4444]'
                          : 'bg-slate-800'
                      }`} />
                      <span className={`h-1.5 w-6 rounded transition-all ${
                        regionDetails[selectedRegion].riskLevels.tradeDeficit >= 3
                          ? 'bg-[#ef4444]'
                          : 'bg-slate-800'
                      }`} />
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Quick status message payload at bottom of details sidebar */}
            <div className="bg-[#070b14] border border-[#1e293b] p-3 rounded-lg text-[10px] font-mono text-gray-500 leading-normal text-left">
              <span className="text-brand-cyan font-bold">[NODE_DECISION]:</span> Selected sector shows robust macro indicators for {selectedQuarter}. Threat mitigation algorithms initialized.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  GitCommit,
  Anchor,
  AlertOctagon,
  TrendingUp,
  Clock,
  Search,
  Filter,
  Download,
  X,
  Activity,
  Plus,
  Minus
} from 'lucide-react';

interface GlobalTradeIntelligenceProps {
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

type PortId = 'singapore' | 'rotterdam' | 'los_angeles';

export default function GlobalTradeIntelligence({ onShowToast }: GlobalTradeIntelligenceProps) {
  const [activeSubTab, setActiveSubTab] = useState<'route' | 'port' | 'bottleneck'>('route');
  const [selectedPort, setSelectedPort] = useState<PortId>('singapore');
  const [viewportZoom, setViewportZoom] = useState<number>(1.0);
  const [drilldownFilter, setDrilldownFilter] = useState<string>('');

  const handleSubTabChange = (tab: 'route' | 'port' | 'bottleneck') => {
    setActiveSubTab(tab);
    const notifications = {
      route: 'INTERCEPTS ACTIVATED // GLOBAL ROTATION ANALYTICS MATRIX',
      port: 'PORT HARBOR BEACON TERMINALS LOGGED & SYNCED',
      bottleneck: 'BOTTLENECK SENSOR OVERWATCH STACKS DEPLOYED'
    };
    onShowToast(notifications[tab], 'info');
  };

  const handlePortSelect = (id: PortId) => {
    setSelectedPort(id);
    const names = {
      singapore: 'SINGAPORE HUBTERMINAL',
      rotterdam: 'PORT OF ROTTERDAM GATEWAY',
      los_angeles: 'LOS ANGELES SAN PEDRO TERMINAL'
    };
    onShowToast(`SURVEILLANCE FOCUS CHANGED // ANCHOR: ${names[id]}`, 'success');
  };

  const portMetadata = {
    singapore: {
      name: 'Singapore Port',
      status: 'OPERATIONAL - OPTIMAL',
      statusColor: 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5',
      exportCap: 65,
      importCap: 35,
      barHeights: [30, 48, 42, 35, 68, 88]
    },
    rotterdam: {
      name: 'Port of Rotterdam',
      status: 'CONGESTED - HIGH',
      statusColor: 'text-[#ef4444] border-[#ef4444]/20 bg-[#ef4444]/5',
      exportCap: 52,
      importCap: 48,
      barHeights: [45, 38, 55, 48, 72, 60]
    },
    los_angeles: {
      name: 'Los Angeles Port',
      status: 'STABLE - MODERATE',
      statusColor: 'text-orange-400 border-orange-400/20 bg-orange-400/5',
      exportCap: 44,
      importCap: 56,
      barHeights: [22, 35, 60, 52, 58, 70]
    }
  };

  const tradeRoutes = [
    {
      lane: 'CN-SHG → US-LAX',
      description: 'Trans-Pacific Corridor',
      vessels: 142,
      status: 'NOMINAL',
      statusColor: 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5',
      avgTransit: '14.2 Days',
      metric: '-2.4%',
      metricColor: 'text-brand-cyan',
      isUp: false,
      edgeId: 'cn_us'
    },
    {
      lane: 'EU-ROT → SG-SIN',
      description: 'Suez Transit Lane',
      vessels: 88,
      status: 'CONGESTED',
      statusColor: 'text-[#ef4444] border-[#ef4444]/30 bg-[#ef4444]/5',
      avgTransit: '31.5 Days',
      metric: '+12.8%',
      metricColor: 'text-[#ef4444]',
      isUp: true,
      edgeId: 'eu_sg'
    },
    {
      lane: 'US-NYC → EU-RTM',
      description: 'North Atlantic Route',
      vessels: 115,
      status: 'NOMINAL',
      statusColor: 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5',
      avgTransit: '11.8 Days',
      metric: '-1.2%',
      metricColor: 'text-brand-cyan',
      isUp: false,
      edgeId: 'us_eu'
    },
    {
      lane: 'BR-SSZ → EU-ROT',
      description: 'South Atlantic Channel',
      vessels: 64,
      status: 'STABLE',
      statusColor: 'text-gray-300 border-[#1e293b] bg-[#121829]',
      avgTransit: '19.4 Days',
      metric: '+0.5%',
      metricColor: 'text-gray-400',
      isUp: true,
      edgeId: 'br_eu'
    }
  ];

  const filteredRoutes = tradeRoutes.filter(
    r =>
      r.lane.toLowerCase().includes(drilldownFilter.toLowerCase()) ||
      r.description.toLowerCase().includes(drilldownFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left select-none animate-in fade-in duration-200" id="global-trade-viewport">
      
      {/* 1. TOP BREADCRUMB & LOGISTICS HEADER BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1.5 select-none text-left">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-700">/</span>
            <span className="text-brand-cyan">Trade</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display">
            Global Trade Intelligence & Logistics
          </h2>
        </div>

        {/* Action controllers matching layout screenshot */}
        <div className="flex flex-wrap items-center gap-3 self-end md:self-auto" id="logistics-nav-hub">
          {/* Sub tab navigator buttons */}
          <div className="bg-[#121829] border border-[#1e293b] rounded-lg p-1 flex items-center">
            {/* Tab 1: Route Analytics */}
            <button
              onClick={() => handleSubTabChange('route')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
                activeSubTab === 'route'
                  ? 'bg-[#00e0a5]/10 text-brand-cyan border border-[#00e0a5]/25 shadow-sm'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              <GitCommit size={13} className="rotate-45" />
              <span>Route Analytics</span>
            </button>

            {/* Tab 2: Port Status */}
            <button
              onClick={() => handleSubTabChange('port')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
                activeSubTab === 'port'
                  ? 'bg-[#00e0a5]/10 text-brand-cyan border border-[#00e0a5]/25 shadow-sm'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              <Anchor size={13} />
              <span>Port Status</span>
            </button>

            {/* Tab 3: Trade Bottleneck Detection */}
            <button
              onClick={() => handleSubTabChange('bottleneck')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer ${
                activeSubTab === 'bottleneck'
                  ? 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/35 shadow-[0_0_8px_rgba(239,68,68,0.1)]'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/10 border-transparent'
              }`}
            >
              <AlertOctagon size={13} />
              <span>Trade Bottleneck Detection</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. THREE-HEADER STAT KPI CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: THROUGHPUT VOLUME */}
        <div className="bg-[#121829] border border-[#1e293b]/55 p-5 rounded-xl flex items-center justify-between shadow-sm hover:border-[#334155] transition-all">
          <div className="space-y-1 text-left">
            <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
              THROUGHPUT VOLUME
            </span>
            <span className="text-[26px] font-extrabold font-display tracking-tight text-white block">
              42.8M <span className="text-sm font-semibold text-gray-400">TEU</span>
            </span>
          </div>
          <div className="h-10 w-10 bg-brand-cyan/5 border border-brand-cyan/15 flex items-center justify-center text-brand-cyan rounded-lg">
            <Activity size={18} />
          </div>
        </div>

        {/* Card 2: AVG. DWELL TIME */}
        <div className="bg-[#121829] border border-[#1e293b]/55 p-5 rounded-xl flex items-center justify-between shadow-sm hover:border-[#334155] transition-all">
          <div className="space-y-1 text-left">
            <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
              AVG. DWELL TIME
            </span>
            <span className="text-[26px] font-extrabold font-display tracking-tight text-white block">
              5.2 <span className="text-sm font-semibold text-gray-400 font-sans">Days</span>
            </span>
          </div>
          <div className="h-10 w-10 bg-brand-cyan/5 border border-brand-cyan/15 flex items-center justify-center text-brand-cyan rounded-lg">
            <Clock size={18} />
          </div>
        </div>

        {/* Card 3: FREIGHT RATE INDEX */}
        <div className="bg-[#121829] border border-[#1e293b]/55 p-5 rounded-xl flex items-center justify-between shadow-sm hover:border-[#334155] transition-all">
          <div className="space-y-1 text-left">
            <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
              FREIGHT RATE INDEX
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[26px] font-extrabold font-display tracking-tight text-white">
                2,840.15
              </span>
              <span className="text-xs font-bold font-mono text-brand-cyan block">
                +4.2%
              </span>
            </div>
          </div>
          <div className="h-10 w-10 bg-brand-cyan/5 border border-brand-cyan/15 flex items-center justify-center text-brand-cyan rounded-lgScale">
            <TrendingUp size={18} className="text-brand-cyan" />
          </div>
        </div>

      </div>

      {/* 3. CORE LOGISTICS INTERACTIVE GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Network Pulse Map - Left 2/3 */}
        <div className="lg:col-span-2">
          <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 relative overflow-hidden min-h-[460px] flex flex-col justify-between" id="maritime-map-radar">
            
            {/* Deep Background Matrix layout */}
            <div className="absolute inset-0 bg-[#070b14]/90 pointer-events-none z-0">
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-40">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-[#1e293b]/10"></div>
                ))}
              </div>
            </div>

            {/* Map Frame graphic elements overlay */}
            <div className="absolute top-3 right-4 font-mono text-[8px] text-gray-600 block z-10 uppercase tracking-widest">
              Live AIS Transports Plotter // S-Grid OK
            </div>

            {/* High-Fidelity Vector World Map showing transit connections */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[340px] z-10">
              
              <svg
                viewBox="0 0 1000 520"
                className="w-full h-full select-none"
                style={{
                  transform: `scale(${viewportZoom})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* World outline vectors in glowing steel gray */}
                <g fill="#1a2536" fillOpacity="0.3" stroke="#2a3c54" strokeWidth="0.8" strokeOpacity="0.25">
                  <path d="M 330,40 C 360,45 370,25 350,15 C 320,10 315,35 330,40 Z" />
                  <path d="M 110,130 C 130,90 220,50 270,70 C 330,90 310,150 290,170 C 280,180 250,200 220,220 C 200,205 180,190 160,200 C 135,215 120,190 110,150 Z" />
                  <path d="M 220,220 C 240,230 260,260 275,300 C 285,340 250,380 220,410 C 210,380 190,320 185,290 C 175,260 190,235 220,220 Z" />
                  <path d="M 450,210 C 440,190 420,165 430,130 C 450,100 500,80 530,75 C 570,60 630,52 700,65 C 770,80 815,95 832,135 C 836,165 790,210 760,225 C 740,210 725,195 710,205 C 685,230 645,230 620,205 C 585,198 550,205 500,220 C 475,220 460,218 450,210 Z" />
                  <path d="M 450,210 C 490,200 535,225 558,265 C 580,305 565,345 540,378 C 515,394 492,360 484,345 C 470,330 455,275 442,242 C 438,227 442,215 450,210 Z" />
                  <path d="M 710,310 C 745,300 770,325 775,355 C 745,370 718,355 712,325 Z" />
                </g>

                {/* Highly detailed flowing shipping lane curves overlay */}
                <g fill="none" stroke="#00e0a5" strokeWidth="0.8" strokeOpacity="0.15">
                  {/* Trans-Pacific */}
                  <path d="M 210 145 C 310 180, 500 240, 740 185" />
                  {/* Suez Lanes */}
                  <path d="M 480 120 C 490 200, 520 280, 740 185" />
                  {/* Cape of Good Hope */}
                  <path d="M 210 145 C 300 280, 480 380, 740 185" strokeOpacity="0.1" />
                  {/* Panama Channel */}
                  <path d="M 210 145 C 240 240, 275 300, 480 340" strokeOpacity="0.1" />
                </g>

                {/* Active pulse routes (focused highlight curves) */}
                <path d="M 210 145 Q 475 220, 740 185" fill="none" stroke="#00e0a5" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="3 5 animate-marquee" />

                {/* THE SELECTED PORT LOCATIONS AS PINS */}
                {/* Port location: Singapore (High visibility) */}
                <g className="cursor-pointer group" onClick={() => handlePortSelect('singapore')}>
                  <circle cx="718" cy="222" r="22" className="fill-brand-cyan/5 group-hover:fill-brand-cyan/10 transition-colors" />
                  <circle cx="718" cy="222" r="10" className="stroke-brand-cyan fill-none animate-ping" style={{ transformOrigin: '718px 222px' }} />
                  <circle cx="718" cy="222" r="6" className={`transition-all ${selectedPort === 'singapore' ? 'fill-brand-cyan stroke-2 stroke-white scale-110' : 'fill-brand-cyan/80 stroke-2 stroke-[#121829]'}`} />
                </g>

                {/* Port location: Rotterdam */}
                <g className="cursor-pointer group" onClick={() => handlePortSelect('rotterdam')}>
                  <circle cx="484" cy="115" r="22" className="fill-brand-cyan/5 group-hover:fill-brand-cyan/10 transition-colors" />
                  <circle cx="484" cy="115" r="5" className={`transition-all ${selectedPort === 'rotterdam' ? 'fill-brand-cyan stroke-2 stroke-white scale-110' : 'fill-[#94a3b8] stroke-2 stroke-[#121829]'}`} />
                </g>

                {/* Port location: Los Angeles */}
                <g className="cursor-pointer group" onClick={() => handlePortSelect('los_angeles')}>
                  <circle cx="160" cy="175" r="22" className="fill-brand-cyan/5 group-hover:fill-brand-cyan/10 transition-colors" />
                  <circle cx="160" cy="175" r="5" className={`transition-all ${selectedPort === 'los_angeles' ? 'fill-brand-cyan stroke-2 stroke-white scale-110' : 'fill-[#94a3b8] stroke-2 stroke-[#121829]'}`} />
                </g>

                {/* Flowing vessel dots on current lines */}
                <circle cx="415" cy="165" r="3" className="fill-brand-cyan/70 animate-pulse" />
                <circle cx="612" cy="195" r="2.5" className="fill-brand-cyan/70 animate-pulse" />

                {/* Map Critical Highlight block */}
                <circle cx="510" cy="190" r="12" className="stroke-[#ef4444] stroke-1 fill-[#ef4444]/15 animate-pulse" />
                <circle cx="510" cy="190" r="3" className="fill-[#ef4444]" />

              </svg>

              {/* Live Overlay Panel - Left Aligned */}
              <div className="absolute top-4 left-4 bg-[#121829]/95 border border-[#1e293b] rounded-lg p-4 select-none z-20 max-w-xs text-left shadow-2xl">
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-brand-cyan font-bold block uppercase tracking-wider mb-2">
                  <span className="h-2 w-2 rounded-full bg-brand-cyan inline-block animate-ping"></span>
                  Live Network Pulse
                </span>

                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-gray-400">ACTIVE VESSELS</span>
                    <span className="font-bold text-white font-mono">14,208</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-gray-400">CONGESTION LEVEL</span>
                    <span className="font-bold text-xs text-orange-400 font-mono">MODERATE</span>
                  </div>
                </div>
              </div>

              {/* Map Zooms Button Row at base right side */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
                <button
                  onClick={() => setViewportZoom((prev) => Math.min(prev + 0.15, 2.0))}
                  className="h-8 w-8 rounded-lg bg-[#121829] border border-[#1e293b] hover:border-[#475569] text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => setViewportZoom((prev) => Math.max(prev - 0.15, 0.7))}
                  className="h-8 w-8 rounded-lg bg-[#121829] border border-[#1e293b] hover:border-[#475569] text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <Minus size={16} />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Port Intelligence Sidebar - Right 1/3 */}
        <div className="lg:col-span-1">
          <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 space-y-6 flex flex-col justify-between h-full" id="logistics-port-intel">
            
            <div className="space-y-6">
              {/* Header Title with "X" action */}
              <div className="flex justify-between items-start border-b border-[#1e293b]/40 pb-4">
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight font-sans">
                    Port Intelligence
                  </h4>
                  <p className="text-[10px] font-mono text-gray-500 uppercase mt-0.5">
                    HARBOR CORE INTELLIGENCE
                  </p>
                </div>
                <button
                  onClick={() => onShowToast('COLLAPSED ADJACENT WATERWAY SCHEMATICS', 'info')}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Selected Interactive Port Status */}
              <div className="flex items-center gap-3.5 bg-[#070b14]/50 border border-[#1e293b]/30 p-3.5 rounded-xl">
                <div className="h-9 w-9 rounded-lg bg-brand-cyan/15 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan shrink-0">
                  <Anchor size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-normal">
                    {portMetadata[selectedPort].name}
                  </h4>
                  <span className={`text-[9px] font-mono font-bold block mt-1 px-1.5 py-0.5 rounded border leading-none ${portMetadata[selectedPort].statusColor}`}>
                    {portMetadata[selectedPort].status}
                  </span>
                </div>
              </div>

              {/* Export/Import dual capacity indicator */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block pb-1 border-b border-[#1e293b]/15">
                  EXPORT/IMPORT BREAKDOWN
                </span>
                
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                  {/* Export capacity line */}
                  <div
                    className="bg-brand-cyan h-full transition-all duration-500"
                    style={{ width: `${portMetadata[selectedPort].exportCap}%` }}
                  />
                  {/* Import capacity line (implicit rest of the bar) */}
                </div>

                <div className="flex justify-between text-[10px] font-mono font-bold text-gray-400">
                  <span>Exp: {portMetadata[selectedPort].exportCap}%</span>
                  <span>Imp: {portMetadata[selectedPort].importCap}%</span>
                </div>
              </div>

              {/* Horizontal / Vertical mini bar Chart block */}
              <div className="space-y-3 pt-1">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wide block">
                  THROUGHPUT TREND
                </span>

                <div className="h-20 bg-[#070b14]/50 border border-[#1e293b]/20 rounded-lg p-2.5 flex items-end justify-between gap-1.5">
                  {portMetadata[selectedPort].barHeights.map((h, i) => {
                    const isLastTwo = i >= 4;
                    return (
                      <div key={i} className="flex-1 flex flex-col justify-end h-full">
                        <div
                          className={`w-full rounded-t-sm transition-all duration-500 ${
                            isLastTwo
                              ? 'bg-brand-cyan shadow-[0_0_8px_rgba(0,224,165,0.2)]'
                              : 'bg-slate-800'
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom action button */}
            <button
              onClick={() => onShowToast('RETRIEVING AUDITED COMMODITY LEDGER INVENTORIES', 'success')}
              className="w-full py-2.5 bg-[#070b14] border border-[#1e293b] hover:border-brand-cyan hover:text-white text-gray-300 rounded font-semibold text-xs font-sans transition-all cursor-pointer active:scale-95 text-center block"
            >
              View Detailed Ledger
            </button>

          </div>
        </div>

      </div>

      {/* 4. BASE CONTAINER: DETAILED TRADE ROUTE DRILLDOWN TABLE */}
      <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 space-y-4" id="logistics-drilldown-row">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-base font-bold text-white tracking-tight font-sans">
            Trade Route Drill-down
          </h3>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Local search filter input inside tables header */}
            <div className="relative w-full sm:w-60">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search shipping lanes..."
                value={drilldownFilter}
                onChange={(e) => setDrilldownFilter(e.target.value)}
                className="w-full bg-[#070b14] border border-[#1e293b] rounded py-1 px-3 pl-8 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-brand-cyan/60 transition-colors"
              />
            </div>
            
            {/* Filter icon button */}
            <button
              onClick={() => {
                setDrilldownFilter('');
                onShowToast('RESET LANE ROUTE SECTOR FILTERS', 'info');
              }}
              className="h-7 w-7 bg-[#070b14] border border-[#1e293b] text-gray-400 hover:text-white flex items-center justify-center rounded transition-colors cursor-pointer"
            >
              <Filter size={13} />
            </button>

            {/* Document download reports button */}
            <button
              onClick={() => onShowToast('GENERATED HIGH DRILLDOWN ANALYSIS MATRIX DOCUMENT', 'success')}
              className="h-7 w-7 bg-[#070b14] border border-[#1e293b] text-brand-cyan hover:text-white flex items-center justify-center rounded transition-colors cursor-pointer"
            >
              <Download size={13} />
            </button>
          </div>
        </div>

        {/* Drill down lane details list table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border-collapse select-none">
            <thead>
              <tr className="border-b border-[#1e293b]/40 text-gray-500 font-mono font-bold uppercase text-[10px] tracking-wider pb-3">
                <th className="py-2.5 font-bold">LANE / IDENTIFIER</th>
                <th className="py-2.5 font-bold">VESSEL COUNT</th>
                <th className="py-2.5 font-bold">STATUS</th>
                <th className="py-2.5 font-bold">AVG TRANSIT</th>
                <th className="py-2.5 text-right font-bold">METRIC %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]/20">
              {filteredRoutes.map((route, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#1e293b]/15 transition-colors cursor-pointer"
                  onClick={() => onShowToast(`CALCULATED DIRECT ROUTE PARAMETERS FOR : ${route.lane}`, 'info')}
                >
                  {/* Lane Identifier Info and subtle vertical tag color lines */}
                  <td className="py-3.5 pr-2">
                    <div className="flex items-start gap-2.5">
                      <span className={`w-1 h-8 rounded-full shrink-0 ${route.status === 'CONGESTED' ? 'bg-[#ef4444]' : 'bg-brand-cyan'}`} />
                      <div>
                        <div className="font-bold text-white text-sm tracking-tight">{route.lane}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{route.description}</div>
                      </div>
                    </div>
                  </td>

                  {/* Vessel count */}
                  <td className="py-3.5 font-mono text-gray-300 font-bold text-sm">
                    {route.vessels}
                  </td>

                  {/* Operational Status */}
                  <td className="py-3.5">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${route.statusColor}`}>
                      {route.status}
                    </span>
                  </td>

                  {/* Transit durations */}
                  <td className="py-3.5 font-medium text-gray-300">
                    {route.avgTransit}
                  </td>

                  {/* Percentage Metric dynamics */}
                  <td className={`py-3.5 text-right font-mono font-semibold text-sm ${route.metricColor}`}>
                    {route.metric}
                  </td>
                </tr>
              ))}
              {filteredRoutes.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500 font-mono text-xs">
                    NO COMPREHENSIVE LANE INTERCEPTS MATCHING THE FILTER.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

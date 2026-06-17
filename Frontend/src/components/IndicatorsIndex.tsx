/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  PlusCircle,
  Search,
  SlidersHorizontal,
  Lightbulb,
  Maximize2
} from 'lucide-react';

interface IndicatorsIndexProps {
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

type TabType = 'indicator' | 'compare';

export default function IndicatorsIndex({ onShowToast }: IndicatorsIndexProps) {
  const [activeSegment, setActiveSegment] = useState<TabType>('indicator');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndicator, setSelectedIndicator] = useState<'PMI' | 'Consumer' | 'Yield'>('PMI');

  const handleIndicatorClick = (indicator: 'PMI' | 'Consumer' | 'Yield') => {
    setSelectedIndicator(indicator);
    onShowToast(`SURVEILLANCE FOCUSED ON: ${indicator.toUpperCase()} INDICATOR DETAIL MODEL`, 'info');
  };

  const handleActionClick = (country: string) => {
    onShowToast(`EXTRACTED TIME-SERIES MODEL FOR: ${country.toUpperCase()}`, 'success');
  };

  const countriesData = [
    { name: 'United States', gdp: '2.1%', gdpColor: 'text-white', cpi: '3.7%', cpiColor: 'text-[#ef4444]', unemployment: '3.8%', trend: 'cyan' },
    { name: 'Germany', gdp: '-0.1%', gdpColor: 'text-[#ef4444]', cpi: '4.5%', cpiColor: 'text-white', unemployment: '5.7%', trend: 'red' },
    { name: 'China', gdp: '4.9%', gdpColor: 'text-white', cpi: '0.0%', cpiColor: 'text-brand-cyan', unemployment: '5.2%', trend: 'gray' },
    { name: 'United Kingdom', gdp: '0.6%', gdpColor: 'text-white', cpi: '6.7%', cpiColor: 'text-[#ef4444]', unemployment: '4.3%', trend: 'cyan' },
    { name: 'India', gdp: '7.6%', gdpColor: 'text-brand-cyan', cpi: '5.0%', cpiColor: 'text-white', unemployment: '7.1%', trend: 'cyan' }
  ];

  const filteredCountries = countriesData.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left select-none animate-in fade-in duration-200" id="indicators-intel-viewport">
      
      {/* 1. TOP BREADCRUMB & HEADER ACTION WORKSPACE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1.5 select-none text-left">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-700">/</span>
            <span className="text-brand-cyan">Indicators</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display">
            Economic Indicators & Time Series
          </h2>
        </div>

        {/* Dynamic Navigation Toggles and Filter Actions */}
        <div className="flex flex-wrap items-center gap-3 self-end md:self-auto" id="indicators-action-dock">
          
          {/* Segment Toggle Box */}
          <div className="bg-[#121829] border border-[#1e293b] rounded-lg p-1 flex items-center">
            <button
              onClick={() => {
                setActiveSegment('indicator');
                onShowToast('SURVEILLANCE WORKFLOW: INDICATOR SELECTION MODEL', 'info');
              }}
              className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                activeSegment === 'indicator'
                  ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              Indicator Selection
            </button>
            <button
              onClick={() => {
                setActiveSegment('compare');
                onShowToast('SURVEILLANCE WORKFLOW: MULTI-COUNTRY COMPARE MATRIX', 'info');
              }}
              className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                activeSegment === 'compare'
                  ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              Multi-Country Compare
            </button>
          </div>

          {/* Date Selector Dropdown button */}
          <div className="relative">
            <button
              onClick={() => onShowToast('SELECT TARGET INTENDED HISTORICAL RANGE', 'info')}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#121829] border border-[#1e293b] hover:border-gray-500 rounded text-xs font-semibold text-gray-300 transition-all cursor-pointer"
            >
              <Calendar size={13} className="text-gray-400" />
              <span>Date Range</span>
              <ChevronDown size={12} className="text-gray-400" />
            </button>
          </div>

          {/* Save Filter action button */}
          <button
            onClick={() => onShowToast('SAVED ECONOMIC INTELLIGENCE VIEW FILTER STATE', 'success')}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#121829] border border-brand-cyan/25 hover:border-brand-cyan/60 rounded text-xs font-semibold text-brand-cyan hover:bg-[#1a2e3b]/30 transition-all cursor-pointer"
          >
            <span>Save Filter</span>
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC THREE-COLUMN KPI CARD ROW MATCHING SCREENSHOT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* KPI 1: PMI COMPOSITE */}
        <div
          onClick={() => handleIndicatorClick('PMI')}
          className={`bg-[#121829] border rounded-xl p-5 cursor-pointer transition-all ${
            selectedIndicator === 'PMI'
              ? 'border-brand-cyan/60 shadow-[0_0_12px_rgba(0,224,165,0.06)]'
              : 'border-[#1e293b]/55 hover:border-slate-700'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider block">
                GLOBAL MANUFACTURING
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5 font-sans">
                PMI Composite
              </h4>
            </div>
            {/* Tiny Green highlight pill */}
            <span className="text-[10px] text-brand-cyan border border-brand-cyan/35 px-1.5 py-0.5 rounded font-bold font-mono bg-brand-cyan/5">
              +2.4%
            </span>
          </div>

          {/* Huge value display */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-extrabold tracking-tight text-white font-display">
              52.8
            </span>
            <span className="text-xs text-gray-500 font-medium">Index Points</span>
          </div>

          {/* MicroSpark Bars visual */}
          <div className="h-10 flex items-end justify-between gap-1 px-1 mb-3">
            <div className="flex-1 bg-brand-cyan/15 h-3 hover:bg-brand-cyan/30 rounded-t-sm transition-all duration-300"></div>
            <div className="flex-1 bg-brand-cyan/25 h-4 hover:bg-brand-cyan/40 rounded-t-sm transition-all duration-300"></div>
            <div className="flex-1 bg-brand-cyan/40 h-5 hover:bg-brand-cyan/60 rounded-t-sm transition-all duration-300"></div>
            <div className="flex-1 bg-brand-cyan/60 h-7 hover:bg-brand-cyan/[0.75] rounded-t-sm transition-all duration-300"></div>
            <div className="flex-1 bg-brand-cyan h-10 rounded-t-sm shadow-[0_0_8px_rgba(0,224,165,0.2)]"></div>
          </div>

          {/* Spark Footer */}
          <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 border-t border-[#1e293b]/30 pt-2.5">
            <span>Ref: Expansion &gt; 50.0</span>
            <span>Updated: 2h ago</span>
          </div>
        </div>

        {/* KPI 2: CONSUMER CONFIDENCE */}
        <div
          onClick={() => handleIndicatorClick('Consumer')}
          className={`bg-[#121829] border rounded-xl p-5 cursor-pointer transition-all ${
            selectedIndicator === 'Consumer'
              ? 'border-brand-cyan/60 shadow-[0_0_12px_rgba(0,224,165,0.06)]'
              : 'border-[#1e293b]/55 hover:border-slate-700'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider block">
                OECD AGGREGATE
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5 font-sans">
                Consumer Confidence
              </h4>
            </div>
            {/* Tiny Red highlight pill */}
            <span className="text-[10px] text-[#ef4444] border border-[#ef4444]/35 px-1.5 py-0.5 rounded font-bold font-mono bg-[#ef4444]/5">
              -0.8%
            </span>
          </div>

          {/* Huge value display */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-extrabold tracking-tight text-white font-display">
              98.2
            </span>
            <span className="text-xs text-gray-500 font-medium">Points</span>
          </div>

          {/* MicroSpark Bars visual (Decreasing rose/coral tones) */}
          <div className="h-10 flex items-end justify-between gap-1 px-1 mb-3">
            <div className="flex-grow bg-slate-800 h-10 rounded-t-sm transition-all"></div>
            <div className="flex-grow bg-slate-800/85 h-9 rounded-t-sm transition-all"></div>
            <div className="flex-grow bg-[#ef4444]/15 h-8 rounded-t-sm transition-all"></div>
            <div className="flex-grow bg-[#ef4444]/25 h-7 rounded-t-sm transition-all"></div>
            <div className="flex-grow bg-[#ef4444]/40 h-6 rounded-t-sm transition-all"></div>
            <div className="flex-grow bg-[#ef4444]/80 h-4 rounded-t-sm shadow-[0_0_6px_rgba(239,68,68,0.2)]"></div>
          </div>

          {/* Spark Footer */}
          <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 border-t border-[#1e293b]/30 pt-2.5">
            <span>Sentiment: Bearish</span>
            <span>Period: OCT 2023</span>
          </div>
        </div>

        {/* KPI 3: YIELD SPREAD */}
        <div
          onClick={() => handleIndicatorClick('Yield')}
          className={`bg-[#121829] border rounded-xl p-5 cursor-pointer transition-all ${
            selectedIndicator === 'Yield'
              ? 'border-brand-cyan/60 shadow-[0_0_12px_rgba(0,224,165,0.06)]'
              : 'border-[#1e293b]/55 hover:border-slate-700'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider block">
                US TREASURY
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5 font-sans">
                10Y-2Y Yield Spread
              </h4>
            </div>
            {/* Inverted white pill */}
            <span className="text-[10px] text-gray-300 border border-[#1e293b] px-1.5 py-0.5 rounded font-bold font-mono bg-white/5">
              Inverted
            </span>
          </div>

          {/* Huge value display */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-extrabold tracking-tight text-white font-display">
              -0.42
            </span>
            <span className="text-xs text-gray-500 font-medium">Bps</span>
          </div>

          {/* Track slider representation */}
          <div className="h-10 flex flex-col justify-center px-1 mb-3">
            <div className="relative w-full h-[3px] bg-[#070b14] border border-[#1e293b]/20 rounded-full">
              {/* Glowing Indicator Knob placement */}
              <div className="absolute left-[24%] -top-[6px] h-[15px] w-[15px] rounded-full bg-brand-cyan shadow-[0_0_8px_#00e0a5] border-2 border-[#121829]"></div>
            </div>
            <div className="flex justify-between items-center text-[8px] font-semibold text-gray-500 uppercase tracking-wide mt-2">
              <span>Deep Inversion</span>
              <span>Normal</span>
            </div>
          </div>

          {/* Spark Footer */}
          <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 border-t border-[#1e293b]/30 pt-2.5">
            <span>Recession Signal: High</span>
            <span>Daily Close</span>
          </div>
        </div>

      </div>

      {/* 3. CENTER DOCKS - TWO COLUMN LAYOUT (2/3 & 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: G20 CROSS-COUNTRY METRICS TABLE */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 space-y-4">
            
            {/* Header row with country filter inputs */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h4 className="text-sm font-bold text-white tracking-tight font-sans">
                G20 Cross-Country Metrics
              </h4>

              {/* Action Filters Row */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <div className="relative w-full sm:w-48">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter countries..."
                    className="w-full bg-[#070b14] border border-[#1e293b] rounded py-1 px-3 pl-8 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-brand-cyan/60 transition-colors"
                  />
                </div>
                {/* Sliders config block button */}
                <button
                  onClick={() => onShowToast('SURVEILLANCE FILTERS EXPANDED', 'info')}
                  className="h-7 w-7 bg-[#070b14] border border-[#1e293b] text-gray-400 hover:text-white flex items-center justify-center rounded transition-colors cursor-pointer"
                >
                  <SlidersHorizontal size={13} />
                </button>
              </div>
            </div>

            {/* HIGH FIDELITY TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border-collapse select-none">
                <thead>
                  <tr className="border-b border-[#1e293b]/40 text-gray-500 font-mono font-bold uppercase text-[10px] tracking-wider pb-3">
                    <th className="py-2.5 font-bold">COUNTRY</th>
                    <th className="py-2.5 font-bold">GDP GROWTH (Y/Y)</th>
                    <th className="py-2.5 font-bold">CPI INFLATION</th>
                    <th className="py-2.5 font-bold">UNEMPLOYMENT</th>
                    <th className="py-2.5 font-bold text-center">TREND (6M)</th>
                    <th className="py-2.5 text-right font-bold">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e293b]/25">
                  {filteredCountries.map((country, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#1e293b]/15 transition-colors cursor-pointer"
                      onClick={() => handleActionClick(country.name)}
                    >
                      {/* Name */}
                      <td className="py-3 font-bold text-white pr-2">
                        {country.name}
                      </td>

                      {/* GDP */}
                      <td className={`py-3 font-semibold ${country.gdpColor}`}>
                        {country.gdp}
                      </td>

                      {/* CPI Inflation */}
                      <td className={`py-3 font-semibold ${country.cpiColor}`}>
                        {country.cpi}
                      </td>

                      {/* Unemployment */}
                      <td className="py-3 font-mono text-gray-300 font-semibold">
                        {country.unemployment}
                      </td>

                      {/* Trend Sparks matching the columns */}
                      <td className="py-3 align-middle text-center">
                        <div className="inline-flex items-end justify-center gap-1 h-5 w-10">
                          {country.trend === 'cyan' && (
                            <>
                              <span className="w-1 bg-brand-cyan h-2 rounded-t-sm" />
                              <span className="w-1 bg-brand-cyan h-3 rounded-t-sm" />
                              <span className="w-1 bg-brand-cyan/65 h-[18px] rounded-t-sm" />
                              <span className="w-1 bg-brand-cyan h-[14px] rounded-t-sm" />
                              <span className="w-1 bg-brand-cyan h-5 rounded-t-sm" />
                            </>
                          )}
                          {country.trend === 'red' && (
                            <>
                              <span className="w-1 bg-[#ef4444] h-5 rounded-t-sm" />
                              <span className="w-1 bg-[#ef4444]/80 h-[17px] rounded-t-sm" />
                              <span className="w-1 bg-[#ef4444]/60 h-3 rounded-t-sm" />
                              <span className="w-1 bg-[#ef4444]/40 h-2 rounded-t-sm" />
                              <span className="w-1 bg-[#ef4444]/15 h-1 rounded-t-sm" />
                            </>
                          )}
                          {country.trend === 'gray' && (
                            <>
                              <span className="w-1 bg-[#475569]/40 h-2 rounded-t-sm" />
                              <span className="w-1 bg-[#475569]/60 h-[10px] rounded-t-sm" />
                              <span className="w-1 bg-[#475569] h-[15px] rounded-t-sm" />
                              <span className="w-1 bg-[#475569] h-[17px] rounded-t-sm" />
                              <span className="w-1 bg-[#475569]/50 h-[11px] rounded-t-sm" />
                            </>
                          )}
                        </div>
                      </td>

                      {/* Action Plus Button */}
                      <td className="py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActionClick(country.name);
                          }}
                          className="text-gray-400 hover:text-brand-cyan transition-colors"
                        >
                          <PlusCircle size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCountries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-gray-500 font-mono text-xs">
                        NO SOVEREIGN RECORDS MATCHING SYSTEM QUERY.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: 12M MULTI-SERIES CARD & ANALYST INSIGHT */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* MULTI_SERIES CHART CARD */}
          <div className="bg-[#121829] border border-[#1e293b]/55 rounded-xl p-5 space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  12M Multi-Series Compare
                </h4>
                <button
                  onClick={() => onShowToast('EXPANDED 12M CO-INTEGRATION MODEL FRAME', 'info')}
                  className="text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  <Maximize2 size={13} />
                </button>
              </div>

              {/* Legends Row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-semibold font-mono text-gray-500 uppercase tracking-tight">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan block"></span>
                  Core Inflation
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white block"></span>
                  Fed Funds Rate
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#475569] block"></span>
                  Avg. Earnings
                </span>
              </div>

              {/* Dynamic glowing dual curve lines via SVG */}
              <div className="h-32 w-full mt-4 bg-[#070b14]/50 border border-[#1e293b]/20 rounded-lg p-2 relative flex items-end">
                
                {/* Horizontal reference lines underneath */}
                <div className="absolute left-2 right-2 top-6 border-t border-[#1e293b]/10"></div>
                <div className="absolute left-2 right-2 top-14 border-t border-[#1e293b]/10"></div>
                <div className="absolute left-2 right-2 top-22 border-t border-[#1e293b]/10"></div>

                <svg viewBox="0 0 300 110" className="w-full h-full absolute inset-0 z-10 pointer-events-none">
                  {/* Gradient Area under Cyan Curve */}
                  <defs>
                    <linearGradient id="cyan-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00e0a5" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#00e0a5" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* AVG EARNINGS CURVE (Grey line) */}
                  <path
                    d="M 10 90 Q 75 80, 150 75 T 290 85"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                  />

                  {/* FED FUNDS RATE CURVE (White line) */}
                  <path
                    d="M 10 70 Q 75 66, 150 45 T 290 35"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                  />

                  {/* CORE INFLATION CURVE (Cyan Area & Glowing Line) */}
                  <path
                    d="M 10 90 Q 75 60, 150 82 T 290 52 L 290 110 L 10 110 Z"
                    fill="url(#cyan-area)"
                  />
                  <path
                    d="M 10 90 Q 75 60, 150 82 T 290 52"
                    fill="none"
                    stroke="#00e0a5"
                    strokeWidth="2.2"
                    className="drop-shadow-[0_0_4px_rgba(0,224,165,0.4)]"
                  />
                </svg>

                {/* X-Axis labels at absolute bottom */}
                <div className="w-full flex justify-between text-[9px] font-mono text-gray-500 px-2 pt-1 border-t border-[#1e293b]/20 relative z-20">
                  <span>Q1</span>
                  <span>Q2</span>
                  <span>Q3</span>
                  <span>Q4</span>
                </div>
              </div>
            </div>

            {/* Bottom rating block */}
            <div className="mt-4 pt-3 border-t border-[#1e293b]/30">
              <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                <span className="text-gray-500 uppercase tracking-wider">Correlation (Inf/Rate)</span>
                <span className="text-brand-cyan font-bold">0.82 High</span>
              </div>
              {/* Full-width elegant cyan tracker HUD line */}
              <div className="w-full bg-[#070b14] h-1.5 rounded-full overflow-hidden border border-[#1e293b]/35">
                <div className="bg-brand-cyan h-full rounded-full transition-all duration-1000" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>

          {/* ANALYST INSIGHT */}
          <div className="bg-[#121829] border border-brand-cyan/25 rounded-xl p-5 relative overflow-hidden" id="analyst-expert-panel">
            {/* Glowing corner indicator */}
            <div className="absolute top-0 right-0 h-[40px] w-[40px] bg-gradient-to-bl from-brand-cyan/8 to-transparent opacity-60"></div>
            
            <div className="flex gap-3 text-left">
              <div className="h-8 w-8 shrink-0 rounded-lg bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan mt-0.5">
                <Lightbulb size={16} />
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider block">
                  ANALYST INSIGHT
                </span>
                <p className="text-xs text-gray-300 font-medium leading-relaxed mt-2 pr-1">
                  Persistence in core services inflation across G20 suggests a "higher for longer" rate environment. Divergence in German industrial output indicates localized manufacturing recession.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

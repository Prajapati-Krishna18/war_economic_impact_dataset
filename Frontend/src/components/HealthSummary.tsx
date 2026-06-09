/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { heatmapCells, mockLineChartData } from '../mockData';
import { Info, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

interface HealthSummaryProps {
  onCellHover?: (label: string) => void;
}

export default function HealthSummary({ onCellHover }: HealthSummaryProps) {
  const [viewMode, setViewMode] = useState<'Line' | 'Heatmap'>('Heatmap');
  const [hoveredCell, setHoveredCell] = useState<typeof heatmapCells[0] | null>(null);
  const [activeSeries, setActiveSeries] = useState<string | null>(null);

  // Helper coordinate calculations for custom interactive line chart
  const width = 580;
  const height = 230;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Custom scaled line path generator
  const getLinePath = (key: 'gdp' | 'inflation' | 'trade' | 'risk', min: number, max: number) => {
    const range = max - min || 1;
    const points = mockLineChartData.map((d, index) => {
      const val = d[key];
      const x = paddingLeft + (index / (mockLineChartData.length - 1)) * chartWidth;
      const y = paddingTop + chartHeight - ((val - min) / range) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <div
      id="economic-health-summary-panel"
      className="bg-[#121829] border border-[#1e293b]/50 rounded-xl p-5 flex flex-col justify-between hover:border-brand-cyan/15 transition-all"
    >
      {/* Title block with Line/Heatmap toggle */}
      <div className="flex justify-between items-center mb-5 select-none text-left">
        <h3 className="text-sm font-bold tracking-tight text-white font-sans uppercase">
          Global Economic Health Summary
        </h3>

        {/* Custom Toggle Switch Capsule matched visually to screenshot */}
        <div className="bg-[#0b0e17] p-1 rounded-md flex items-center border border-[#1e293b]/50 text-[10px] font-mono leading-none">
          <button
            id="toggle-view-line"
            onClick={() => setViewMode('Line')}
            className={`px-3 py-1.5 rounded transition-all font-semibold ${
              viewMode === 'Line'
                ? 'text-gray-400 cursor-pointer hover:text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Line
          </button>
          <button
            id="toggle-view-heatmap"
            onClick={() => setViewMode('Heatmap')}
            className={`px-3 py-1.5 rounded transition-all font-semibold ${
              viewMode === 'Heatmap'
                ? 'bg-brand-cyan text-[#0e111a] shadow-[0_0_8px_rgba(0,e2,a5,0.25)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Heatmap
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="relative min-h-[250px] flex items-center justify-center">
        {viewMode === 'Heatmap' ? (
          /* HEATMAP VIEW */
          <div className="w-full flex flex-col justify-between">
            {/* Heatmap Tooltip HUD Overlay when hovering */}
            <div className="min-h-[24px] mb-3 text-[11px] font-mono select-none flex items-center justify-between text-gray-400 bg-[#0e121e]/80 px-3 py-1 rounded border border-[#1e293b]/40">
              {hoveredCell ? (
                <>
                  <span className="text-white font-bold">{hoveredCell.country}</span>
                  <span className="text-gray-500">•</span>
                  <span>{hoveredCell.indicator}</span>
                  <span className="text-gray-500">•</span>
                  <span>{hoveredCell.quarterLabel}</span>
                  <span className="text-gray-500">•</span>
                  <span
                    className={`font-bold ${
                      hoveredCell.score > 0
                        ? 'text-brand-cyan'
                        : hoveredCell.score < -5
                        ? 'text-[#f97316]'
                        : 'text-gray-300'
                    }`}
                  >
                    Score: {hoveredCell.score > 0 ? `+${hoveredCell.score}` : hoveredCell.score}
                  </span>
                </>
              ) : (
                <span className="text-gray-500 flex items-center gap-1.5 animate-pulse-slow">
                  <Info size={12} className="text-gray-600" />
                  Hover over grid tiles for direct country forecasts & indices
                </span>
              )}
            </div>

            {/* 6x5 Interactive Matrix Grid in exact visual layout */}
            <div
              id="heatmap-matrix-grid"
              className="grid grid-cols-6 gap-2 w-full aspect-[2/1] relative select-none"
            >
              {heatmapCells.map((cell, idx) => {
                const isHovered =
                  hoveredCell && hoveredCell.row === cell.row && hoveredCell.col === cell.col;

                return (
                  <div
                    key={`cell-${idx}`}
                    id={`heatmap-cell-${cell.row}-${cell.col}`}
                    onMouseEnter={() => {
                      setHoveredCell(cell);
                      if (onCellHover) onCellHover(`${cell.country}: ${cell.indicator}`);
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{ backgroundColor: cell.hexColor }}
                    className={`rounded-sm cursor-pointer transition-all duration-150 relative ${
                      isHovered
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121829] scale-[1.04] z-10'
                        : 'hover:scale-[1.02]'
                    }`}
                  >
                    {/* Tiny index markers or overlays */}
                    <div className="absolute inset-0 bg-black/0 hover:bg-white/5 rounded-sm" />
                    
                    {/* Visual indicators for specific high range metrics */}
                    {cell.score > 7 && (
                      <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-brand-cyan shadow-sm" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quarter label alignments beneath matching screenshot */}
            <div className="grid grid-cols-6 gap-2 mt-4 text-[10px] text-gray-500 font-mono select-none border-t border-[#1e293b]/30 pt-3">
              <div id="label-q1-forecast" className="col-span-2 text-left pr-1 text-gray-400 font-medium">
                Q1 Forecast
              </div>
              <div id="label-q2-forecast" className="col-span-2 text-left pr-1 text-gray-400 font-medium">
                Q2 Forecast
              </div>
              <div id="label-q3-projection" className="col-span-1 text-left text-gray-400 font-medium">
                Q3 Projection
              </div>
              <div id="label-q4-projection" className="col-span-1 text-left text-gray-400 font-medium">
                Q4 Projection
              </div>
            </div>
          </div>
        ) : (
          /* DYNAMIC SVG LINE CHART VIEW */
          <div className="w-full flex flex-col justify-between select-none">
            {/* Legend Toggles */}
            <div className="flex gap-4 mb-2 text-[10px] font-mono justify-end">
              {[
                { label: 'GDP Growth', key: 'gdp', color: '#00e0a5' },
                { label: 'Inflation', key: 'inflation', color: '#f97316' },
                { label: 'Trade Vol', key: 'trade', color: '#06b6d4' },
                { label: 'Risk Senti', key: 'risk', color: '#ef4444' },
              ].map((s) => {
                const isActive = activeSeries === null || activeSeries === s.key;
                return (
                  <button
                    key={s.label}
                    onClick={() => setActiveSeries(activeSeries === s.key ? null : s.key)}
                    className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded transition-all border ${
                      isActive
                        ? 'border-[#1e293b] text-gray-300'
                        : 'border-transparent text-gray-600'
                    }`}
                  >
                    <span className="w-2.5 h-1 rounded-sm" style={{ backgroundColor: s.color }} />
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>

            {/* SVG Plot Container */}
            <svg width="100%" height={height} className="overflow-visible" viewBox={`0 0 ${width} ${height}`}>
              {/* Grid Background Y-Ticks */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingTop + ratio * chartHeight;
                return (
                  <g key={i}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={width - paddingRight}
                      y2={y}
                      stroke="rgba(30,41,59,0.35)"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingLeft - 8}
                      y={y + 3}
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="end"
                    >
                      {`${Math.round((1 - ratio) * 100)}%`}
                    </text>
                  </g>
                );
              })}

              {/* X-Tick Lines and Labels */}
              {mockLineChartData.map((d, idx) => {
                const x = paddingLeft + (idx / (mockLineChartData.length - 1)) * chartWidth;
                return (
                  <g key={idx}>
                    <line
                      x1={x}
                      y1={paddingTop}
                      x2={x}
                      y2={paddingTop + chartHeight}
                      stroke="rgba(30,41,59,0.2)"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <text
                      x={x}
                      y={height - paddingBottom + 18}
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {d.month}
                    </text>
                  </g>
                );
              })}

              {/* GDP Series Path */}
              {(activeSeries === null || activeSeries === 'gdp') && (
                <path
                  d={getLinePath('gdp', 1, 6)}
                  fill="none"
                  stroke="#00e0a5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              )}

              {/* Inflation Series Path */}
              {(activeSeries === null || activeSeries === 'inflation') && (
                <path
                  d={getLinePath('inflation', 2, 7)}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              )}

              {/* Trade Vol Series Path */}
              {(activeSeries === null || activeSeries === 'trade') && (
                <path
                  d={getLinePath('trade', 2, 5)}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              )}

              {/* Geopolitical Risk Series Path */}
              {(activeSeries === null || activeSeries === 'risk') && (
                <path
                  d={getLinePath('risk', 55, 80)}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              )}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

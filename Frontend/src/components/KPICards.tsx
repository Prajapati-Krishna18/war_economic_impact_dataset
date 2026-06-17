/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { KPICardData } from '../types';

interface KPICardsProps {
  cards: KPICardData[];
}

export default function KPICards({ cards }: KPICardsProps) {
  // Helper to draw clean SVG sparkline path
  const getSparklinePath = (points: number[], width = 80, height = 28) => {
    if (!points || points.length === 0) return '';
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min === 0 ? 1 : max - min;

    const coords = points.map((p, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 6) - 3; // padding top/bottom
      return `${x},${y}`;
    });
    return `M ${coords.join(' L ')}`;
  };

  return (
    <div
      id="kpi-statistics-grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 select-none"
    >
      {cards.map((card) => {
        const isInflation = card.id === 'inflation';
        const isGeopolitical = card.id === 'geopolitical';

        // Custom styling color settings matched from the screenshot
        let accentColorClass = 'text-brand-cyan';
        let strokeColor = '#00e0a5';

        if (isInflation) {
          accentColorClass = 'text-[#f97316]'; // Amber warning
          strokeColor = '#f97316';
        } else if (isGeopolitical) {
          // Geopolitical risk drops -0.15. This is positive (cyan/green/teal)
          accentColorClass = 'text-brand-cyan';
          strokeColor = '#f97316'; // Risk sparkline goes downwards, styled in orange/copper in screen
        }

        const isPositiveChange = card.change.startsWith('+');

        return (
          <div
            key={card.id}
            id={`kpi-card-${card.id}`}
            className="bg-[#121829] border border-[#1e293b]/50 rounded-xl p-4 flex flex-col justify-between hover:border-brand-cyan/20 transition-all duration-200"
          >
            {/* Top row label and change tag */}
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] tracking-wider text-gray-500 font-mono font-bold uppercase">
                {card.title}
              </span>
              <div className={`flex items-center gap-0.5 text-xs font-mono font-semibold ${accentColorClass}`}>
                {isPositiveChange ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                <span>{card.change}</span>
              </div>
            </div>

            {/* Bottom row values and sparkline */}
            <div className="flex items-end justify-between mt-2">
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold tracking-tight text-white font-display">
                  {card.value}
                </span>
                <span className="text-[10px] text-gray-400 font-sans mt-0.5 font-medium leading-none">
                  {card.changeLabel}
                </span>
              </div>

              {/* Precise Sparkline drawing */}
              <div className="relative w-20 h-7 overflow-visible mb-1">
                <svg width="80" height="28" className="overflow-visible">
                  {/* Subtle glow filter */}
                  <defs>
                    <linearGradient id={`gradient-${card.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={strokeColor} stopOpacity="0.1" />
                      <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid background reference lines (subtle) */}
                  <line x1="0" y1="14" x2="80" y2="14" stroke="rgba(30,41,59,0.2)" strokeDasharray="2 2" />

                  {/* Shaded Area */}
                  {card.sparklinePoints && (
                    <path
                      d={`${getSparklinePath(card.sparklinePoints, 80, 28)} L 80,28 L 0,28 Z`}
                      fill={`url(#gradient-${card.id})`}
                    />
                  )}

                  {/* Sparkline Path */}
                  <path
                    d={getSparklinePath(card.sparklinePoints, 80, 28)}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />
                  {/* Endpoint Marker Dot */}
                  <circle
                    cx="80"
                    cy={
                      card.sparklinePoints && card.sparklinePoints.length > 0
                        ? 28 -
                          ((card.sparklinePoints[card.sparklinePoints.length - 1] -
                            Math.min(...card.sparklinePoints)) /
                            (Math.max(...card.sparklinePoints) - Math.min(...card.sparklinePoints) || 1)) *
                            22 -
                          3
                        : 14
                    }
                    r="2"
                    fill={strokeColor}
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

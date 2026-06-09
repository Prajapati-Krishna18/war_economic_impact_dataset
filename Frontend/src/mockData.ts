/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { KPICardData, AlertData, ActivityData, ReportData } from './types';

export const initialKPICards: Record<string, KPICardData[]> = {
  Global: [
    {
      id: 'gdp',
      title: 'GLOBAL GDP GROWTH',
      value: '3.12%',
      change: '+0.4%',
      isPositive: true,
      changeLabel: 'Annualized Forecast',
      sparklinePoints: [2.1, 2.3, 2.2, 2.5, 2.8, 2.7, 3.12],
      sparklineColor: '#00e0a5',
      unit: '% growth',
    },
    {
      id: 'inflation',
      title: 'INFLATION INDEX',
      value: '5.84%',
      change: '+1.2%',
      isPositive: false, // inflation rising is generally undesirable, but matched as +1.2% in Amber
      changeLabel: 'Weighted Avg (G20)',
      sparklinePoints: [4.2, 4.5, 4.8, 5.1, 5.6, 5.7, 5.84],
      sparklineColor: '#f97316',
      unit: '% index',
    },
    {
      id: 'trade',
      title: 'TRADE VOLUME',
      value: '$4.2T',
      change: '+2.8%',
      isPositive: true,
      changeLabel: 'Monthly Throughput',
      sparklinePoints: [3.2, 3.5, 3.4, 3.8, 3.9, 4.1, 4.2],
      sparklineColor: '#00e0a5',
      unit: 'USD',
    },
    {
      id: 'geopolitical',
      title: 'GEOPOLITICAL RISK',
      value: '64.2',
      change: '-0.15',
      isPositive: true, // declining risk is positive
      changeLabel: 'SentiScore Index',
      sparklinePoints: [78.2, 75.1, 71.4, 69.8, 67.2, 65.5, 64.2],
      sparklineColor: '#ef4444',
      unit: 'Points',
    },
  ],
  G7: [
    {
      id: 'gdp',
      title: 'GLOBAL GDP GROWTH',
      value: '1.85%',
      change: '+0.1%',
      isPositive: true,
      changeLabel: 'Annualized Forecast',
      sparklinePoints: [1.5, 1.6, 1.5, 1.7, 1.8, 1.8, 1.85],
      sparklineColor: '#00e0a5',
      unit: '% growth',
    },
    {
      id: 'inflation',
      title: 'INFLATION INDEX',
      value: '2.94%',
      change: '-0.4%',
      isPositive: true, // inflation falling is positive
      changeLabel: 'Weighted Avg (G7)',
      sparklinePoints: [4.1, 3.9, 3.5, 3.2, 3.1, 3.0, 2.94],
      sparklineColor: '#00e0a5',
      unit: '% index',
    },
    {
      id: 'trade',
      title: 'TRADE VOLUME',
      value: '$2.1T',
      change: '+1.4%',
      isPositive: true,
      changeLabel: 'Monthly Throughput',
      sparklinePoints: [1.8, 1.9, 1.9, 2.0, 2.05, 2.08, 2.1],
      sparklineColor: '#00e0a5',
      unit: 'USD',
    },
    {
      id: 'geopolitical',
      title: 'GEOPOLITICAL RISK',
      value: '42.8',
      change: '-0.30',
      isPositive: true,
      changeLabel: 'SentiScore Index',
      sparklinePoints: [48.2, 47.0, 45.4, 44.1, 43.5, 43.0, 42.8],
      sparklineColor: '#00e0a5',
      unit: 'Points',
    },
  ],
  'Asia-Pacific': [
    {
      id: 'gdp',
      title: 'GLOBAL GDP GROWTH',
      value: '4.65%',
      change: '+0.88%',
      isPositive: true,
      changeLabel: 'Annualized Forecast',
      sparklinePoints: [3.8, 4.0, 4.1, 4.4, 4.5, 4.6, 4.65],
      sparklineColor: '#00e0a5',
      unit: '% growth',
    },
    {
      id: 'inflation',
      title: 'INFLATION INDEX',
      value: '3.12%',
      change: '+0.15%',
      isPositive: false,
      changeLabel: 'Weighted Avg (APAC)',
      sparklinePoints: [2.8, 2.9, 2.9, 3.0, 3.1, 3.1, 3.12],
      sparklineColor: '#f97316',
      unit: '% index',
    },
    {
      id: 'trade',
      title: 'TRADE VOLUME',
      value: '$1.8T',
      change: '+4.2%',
      isPositive: true,
      changeLabel: 'Monthly Throughput',
      sparklinePoints: [1.4, 1.5, 1.55, 1.65, 1.72, 1.77, 1.8],
      sparklineColor: '#00e0a5',
      unit: 'USD',
    },
    {
      id: 'geopolitical',
      title: 'GEOPOLITICAL RISK',
      value: '58.4',
      change: '+1.50',
      isPositive: false,
      changeLabel: 'SentiScore Index',
      sparklinePoints: [50.1, 51.5, 53.0, 55.4, 56.8, 57.5, 58.4],
      sparklineColor: '#ef4444',
      unit: 'Points',
    },
  ],
  'Developing Nations': [
    {
      id: 'gdp',
      title: 'GLOBAL GDP GROWTH',
      value: '5.20%',
      change: '+1.15%',
      isPositive: true,
      changeLabel: 'Annualized Forecast',
      sparklinePoints: [4.0, 4.2, 4.5, 4.7, 4.9, 5.1, 5.2],
      sparklineColor: '#00e0a5',
      unit: '% growth',
    },
    {
      id: 'inflation',
      title: 'INFLATION INDEX',
      value: '9.45%',
      change: '+2.80%',
      isPositive: false,
      changeLabel: 'Weighted Avg (Dev)',
      sparklinePoints: [6.1, 6.8, 7.5, 8.2, 8.8, 9.1, 9.45],
      sparklineColor: '#ef4444',
      unit: '% index',
    },
    {
      id: 'trade',
      title: 'TRADE VOLUME',
      value: '$0.95T',
      change: '+1.9%',
      isPositive: true,
      changeLabel: 'Monthly Throughput',
      sparklinePoints: [0.85, 0.88, 0.89, 0.91, 0.93, 0.94, 0.95],
      sparklineColor: '#00e0a5',
      unit: 'USD',
    },
    {
      id: 'geopolitical',
      title: 'GEOPOLITICAL RISK',
      value: '72.1',
      change: '-0.45',
      isPositive: true,
      changeLabel: 'SentiScore Index',
      sparklinePoints: [78.5, 77.0, 75.3, 74.0, 73.1, 72.8, 72.1],
      sparklineColor: '#00e0a5',
      unit: 'Points',
    },
  ],
};

export const initialAlerts: AlertData[] = [
  {
    id: 'a1',
    severity: 'critical',
    title: 'Abrupt volatility in EUR/USD spot market',
    description: 'Sudden 1.2% drop following unannounced central bank liquidity adjustment in morning sessions.',
    timeAgo: '2m ago',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: 'a2',
    severity: 'warning',
    title: 'Port congestion index rising in Southeast Asia',
    description: 'Average dwell time increased by 18% in the last 48 hours across major shipping hubs in Malacca.',
    timeAgo: '14h ago',
    timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
  },
  {
    id: 'a3',
    severity: 'info',
    title: 'G7 Economic Summit Draft Released',
    description: 'Initial focus points on semiconductor supply chain sovereignty and critical minerals storage leaked.',
    timeAgo: '1d ago',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export const initialActivities: ActivityData[] = [
  {
    id: 'act1',
    title: 'Oil Futures spiked 2.1% on MENA supply concerns',
    type: 'Economic Event',
    timeAgo: '3h ago',
    timestamp: new Date(Date.now() - 3 * 3600 * 1000),
    category: 'event',
  },
  {
    id: 'act2',
    title: 'New report: "Lithium Supply Chain Risk 2024"',
    type: 'System Update',
    timeAgo: '8h ago',
    timestamp: new Date(Date.now() - 8 * 3600 * 1000),
    category: 'update',
  },
  {
    id: 'act3',
    title: 'Manufacturing PMI (China) beat expectations at 51.2',
    type: 'Data Release',
    timeAgo: '12h ago',
    timestamp: new Date(Date.now() - 12 * 3600 * 1000),
    category: 'release',
  },
];

export const initialReports: ReportData[] = [
  {
    id: 'rep1',
    title: 'Q3 Energy Transition Strategy',
    status: 'published',
    dateLabel: 'Published 2h ago',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000),
    size: '4.2 MB',
    category: 'Energy',
  },
  {
    id: 'rep2',
    title: 'Emerging Markets Debt Report',
    status: 'draft',
    dateLabel: 'Draft • Saved yesterday',
    timestamp: new Date(Date.now() - 24 * 3600 * 1000),
    size: '1.8 MB',
    category: 'Finance',
  },
  {
    id: 'rep3',
    title: 'Nordic Trade Flow Analysis',
    status: 'published',
    dateLabel: 'Published 3d ago',
    timestamp: new Date(Date.now() - 72 * 3600 * 1000),
    size: '3.1 MB',
    category: 'Trade',
  },
];

// Heatmap Matrix Data corresponding to the 6x5 grid
// Let's create an accurate grid representation: 30 cells total.
// We'll give each a specific color, row, column, country name, indicator name, score, and forecast period.
export interface HeatCell {
  row: number; // 0 to 4
  col: number; // 0 to 5
  country: string;
  indicator: string;
  quarterLabel: string;
  score: number; // -10 (worst) to +10 (best)
  colorClass: string; // Tailwind hex color match or similar
  hexColor: string; // The specific shade from the screenshot row-by-row
}

export const heatmapCells: HeatCell[] = [
  // First Row
  { row: 0, col: 0, country: 'United States', indicator: 'Industrial Production', quarterLabel: 'Q1 Forecast', score: 6, colorClass: '', hexColor: '#2C7A7B' },
  { row: 0, col: 1, country: 'Germany', indicator: 'Manufacturing PMI', quarterLabel: 'Q1 Forecast', score: -4, colorClass: '', hexColor: '#1A365D' },
  { row: 0, col: 2, country: 'China', indicator: 'Export Volume Growth', quarterLabel: 'Q1 Forecast', score: 8, colorClass: '', hexColor: '#319795' },
  { row: 0, col: 3, country: 'Japan', indicator: 'Corporate Goods Pricing', quarterLabel: 'Q1 Forecast', score: -8, colorClass: '', hexColor: '#2D3748' },
  { row: 0, col: 4, country: 'United Kingdom', indicator: 'Consumer Expenditure', quarterLabel: 'Q1 Forecast', score: -3, colorClass: '', hexColor: '#2D3047' },
  { row: 0, col: 5, country: 'France', indicator: 'Service Sector Survey', quarterLabel: 'Q1 Forecast', score: -6, colorClass: '', hexColor: '#5C3D46' },

  // Second Row
  { row: 1, col: 0, country: 'India', indicator: 'Infrastructure Index', quarterLabel: 'Q2 Forecast', score: -5, colorClass: '', hexColor: '#1B2E3C' },
  { row: 1, col: 1, country: 'Australia', indicator: 'Commodity Export Value', quarterLabel: 'Q2 Forecast', score: -3, colorClass: '', hexColor: '#2C3E50' },
  { row: 1, col: 2, country: 'Brazil', indicator: 'Agricultural GDP Impact', quarterLabel: 'Q2 Forecast', score: -7, colorClass: '', hexColor: '#222F3E' },
  { row: 1, col: 3, country: 'Canada', indicator: 'Energy Sector Trade cap', quarterLabel: 'Q2 Forecast', score: -8, colorClass: '', hexColor: '#2D3436' },
  { row: 1, col: 4, country: 'South Korea', indicator: 'Semiconductor Shipments', quarterLabel: 'Q2 Forecast', score: -4, colorClass: '', hexColor: '#3F3D56' },
  { row: 1, col: 5, country: 'Italy', indicator: 'Industrial Capacity Utilization', quarterLabel: 'Q2 Forecast', score: -3, colorClass: '', hexColor: '#30336B' },

  // Third Row
  { row: 2, col: 0, country: 'Mexico', indicator: 'Automotive Exports', quarterLabel: 'Q2 Forecast', score: -7, colorClass: '', hexColor: '#1E272E' },
  { row: 2, col: 1, country: 'Russia', indicator: 'Hydrocarbon Yield Metric', quarterLabel: 'Q2 Forecast', score: -2, colorClass: '', hexColor: '#3E343A' },
  { row: 2, col: 2, country: 'South Africa', indicator: 'Mining Production Delta', quarterLabel: 'Q2 Forecast', score: -9, colorClass: '', hexColor: '#2F2F2F' },
  { row: 2, col: 3, country: 'Saudi Arabia', indicator: 'Non-Oil Revenue Base', quarterLabel: 'Q2 Forecast', score: 4, colorClass: '', hexColor: '#20636B' },
  { row: 2, col: 4, country: 'Spain', indicator: 'Tourism Sector Revenue', quarterLabel: 'Q2 Forecast', score: -5, colorClass: '', hexColor: '#2B2B3E' },
  { row: 2, col: 5, country: 'Switzerland', indicator: 'Sovereign Bank Yield Reserve', quarterLabel: 'Q2 Forecast', score: -1, colorClass: '', hexColor: '#1F2A38' },

  // Fourth Row
  { row: 3, col: 0, country: 'Sovereign Funds', indicator: 'G10 Portfolio Liquidity', quarterLabel: 'Q3 Projection', score: -8, colorClass: '', hexColor: '#1A2930' },
  { row: 3, col: 1, country: 'Emerging Markets', indicator: 'High-Yield Bond Yield', quarterLabel: 'Q3 Projection', score: -10, colorClass: '', hexColor: '#2E2D30' },
  { row: 3, col: 2, country: 'Eurozone Corp', indicator: 'Weighted Default Projection', quarterLabel: 'Q3 Projection', score: -3, colorClass: '', hexColor: '#4A3B43' },
  { row: 3, col: 3, country: 'Corporate Bonds', indicator: 'Spread over Treasuries', quarterLabel: 'Q3 Projection', score: -8, colorClass: '', hexColor: '#252627' },
  { row: 3, col: 4, country: 'Cryptocurrencies', indicator: 'Broad Market Value Beta', quarterLabel: 'Q3 Projection', score: -7, colorClass: '', hexColor: '#2C3A47' },
  { row: 3, col: 5, country: 'Global Shipping', indicator: 'Baltic Dry Flow Index', quarterLabel: 'Q3 Projection', score: -6, colorClass: '', hexColor: '#1E2C33' },

  // Fifth Row
  { row: 4, col: 0, country: 'Gold / Metals', indicator: 'Safe Haven Real Inflow', quarterLabel: 'Q4 Projection', score: 5, colorClass: '', hexColor: '#3EA395' },
  { row: 4, col: 1, country: 'Agriculture', indicator: 'Grain Global Stock Reserve', quarterLabel: 'Q4 Projection', score: -2, colorClass: '', hexColor: '#423B33' },
  { row: 4, col: 2, country: 'Base Materials', indicator: 'LME Metal Volume Deliveries', quarterLabel: 'Q4 Projection', score: 7, colorClass: '', hexColor: '#2D8180' },
  { row: 4, col: 3, country: 'Nuclear Fuel', indicator: 'Uranium Contract Index', quarterLabel: 'Q4 Projection', score: -5, colorClass: '', hexColor: '#4A4A33' },
  { row: 4, col: 4, country: 'Rare Earths', indicator: 'Critical Mineral Stockpiles', quarterLabel: 'Q4 Projection', score: -1, colorClass: '', hexColor: '#4F4349' },
  { row: 4, col: 5, country: 'Natural Gas', indicator: 'LNG Spot Arbitrage Level', quarterLabel: 'Q4 Projection', score: 8, colorClass: '', hexColor: '#3a8b8c' },
];

export const mockLineChartData = [
  { month: 'Jan', gdp: 2.8, inflation: 4.5, trade: 3.5, risk: 75.0 },
  { month: 'Feb', gdp: 2.9, inflation: 4.8, trade: 3.6, risk: 72.0 },
  { month: 'Mar', gdp: 3.0, inflation: 5.1, trade: 3.8, risk: 70.0 },
  { month: 'Apr', gdp: 3.05, inflation: 5.4, trade: 3.9, risk: 68.0 },
  { month: 'May', gdp: 3.1, inflation: 5.7, trade: 4.1, risk: 65.0 },
  { month: 'Jun', gdp: 3.12, inflation: 5.84, trade: 4.2, risk: 64.2 },
];

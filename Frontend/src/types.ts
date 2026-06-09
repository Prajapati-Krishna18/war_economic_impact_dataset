/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KPICardData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  changeLabel: string;
  sparklinePoints: number[];
  sparklineColor: string;
  unit: string;
}

export interface AlertData {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timeAgo: string;
  timestamp: Date;
}

export interface ActivityData {
  id: string;
  title: string;
  type: string;
  timeAgo: string;
  timestamp: Date;
  category: 'event' | 'update' | 'release';
}

export interface ReportData {
  id: string;
  title: string;
  status: 'published' | 'draft';
  dateLabel: string;
  timestamp: Date;
  size?: string;
  category: string;
}

export type SidebarTab =
  | 'Dashboard'
  | 'Regional'
  | 'Indicators'
  | 'Conflict'
  | 'Trade'
  | 'Management'
  | 'Reports'
  | 'Notifications'
  | 'Settings';

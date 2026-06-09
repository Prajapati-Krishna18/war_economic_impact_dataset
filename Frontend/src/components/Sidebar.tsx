/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LayoutDashboard,
  Globe,
  TrendingUp,
  ShieldAlert,
  ArrowLeftRight,
  Briefcase,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import type { SidebarTab } from '../types';

interface SidebarProps {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  unreadAlertsCount: number;
  onSignOut?: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, unreadAlertsCount, onSignOut }: SidebarProps) {
  const primaryNavItems = [
    { name: 'Dashboard' as SidebarTab, icon: LayoutDashboard },
    { name: 'Regional' as SidebarTab, icon: Globe },
    { name: 'Indicators' as SidebarTab, icon: TrendingUp },
    { name: 'Conflict' as SidebarTab, icon: ShieldAlert },
    { name: 'Trade' as SidebarTab, icon: ArrowLeftRight },
    { name: 'Management' as SidebarTab, icon: Briefcase },
    { name: 'Reports' as SidebarTab, icon: FileText },
    { name: 'Notifications' as SidebarTab, icon: Bell, badge: unreadAlertsCount },
    { name: 'Settings' as SidebarTab, icon: Settings },
  ];

  return (
    <aside
      id="sidebar-container"
      className="w-68 min-h-screen bg-[#0e111a] border-r border-[#1e293b]/70 flex flex-col justify-between select-none shrink-0"
    >
      <div className="flex flex-col pt-8 px-4">
        {/* Brand Header */}
        <div className="mb-8 px-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 bg-brand-cyan rounded-full animate-pulse-slow"></div>
            <h1 className="text-xl font-bold tracking-wider text-white font-display">
              ECON-SENTINEL
            </h1>
          </div>
          <p className="text-xs text-gray-500 font-mono mt-0.5 tracking-tight pl-3">
            Economic Intelligence
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5" id="primary-navigation">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                id={`nav-${item.name.toLowerCase()}`}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group text-left ${
                  isActive
                    ? 'bg-brand-cyan/8 text-brand-cyan font-medium border border-brand-cyan/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-brand-cyan' : 'text-gray-500 group-hover:text-gray-300'
                    }`}
                  />
                  <span className="text-sm font-sans tracking-tight">{item.name}</span>
                </div>

                {item.badge && item.badge > 0 ? (
                  <span className="bg-brand-orange text-white text-[10px] font-mono px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-[#1e293b]/50">
        <div className="space-y-1">
          <button
            id="nav-support"
            onClick={() => setActiveTab('Settings')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-left"
          >
            <HelpCircle size={18} className="text-gray-500" />
            <span className="text-sm font-sans">Support</span>
          </button>
          <button
            id="nav-signout"
            onClick={() => {
              if (onSignOut) {
                onSignOut();
              } else {
                alert('Signing out of terminal session...');
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all text-left"
          >
            <LogOut size={18} className="text-gray-500" />
            <span className="text-sm font-sans">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

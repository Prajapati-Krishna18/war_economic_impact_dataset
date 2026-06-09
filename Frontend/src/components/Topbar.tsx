/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Bell, AlertTriangle, User, ChevronDown, Check } from 'lucide-react';

interface TopbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onQuickActionClick: () => void;
  alertsCount: number;
  onSearchClick?: () => void;
}

export default function Topbar({
  searchQuery,
  setSearchQuery,
  onQuickActionClick,
  alertsCount,
  onSearchClick,
}: TopbarProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [currentUser] = useState({
    name: 'Director Crawford',
    role: 'Lead Intelligence Analyst',
    email: 'crawford@sentinel.gov',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
  });

  return (
    <header
      id="top-navigation-bar"
      className="h-16 border-b border-[#1e293b]/70 flex items-center justify-between px-8 bg-[#0f1424] select-none"
    >
      {/* Search Input Box */}
      <div 
        className="flex-1 max-w-sm relative select-text" 
        id="search-container"
        onClick={onSearchClick}
      >
        <Search
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
        <input
          id="intelligence-search-input"
          type="text"
          readOnly
          value={searchQuery}
          placeholder="Search Intelligence (Press ⌘K).."
          className="w-full pl-9 pr-14 py-1.5 bg-[#0b0e17] text-white placeholder-gray-500 rounded-full border border-[#1e293b] focus:outline-none focus:border-brand-cyan/60 transition-colors text-xs font-mono cursor-pointer"
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none select-none">
          <kbd className="px-1.5 py-0.5 border border-[#1e293b] font-mono text-[8px] font-extrabold rounded text-gray-500 bg-[#0e111a] leading-none uppercase">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-5">
        {/* Quick Actions Action Button */}
        <button
          id="btn-quick-actions-trigger"
          onClick={onQuickActionClick}
          className="px-5 py-1.5 bg-brand-cyan text-[#0e111a] font-bold text-xs rounded font-sans tracking-wide hover:bg-brand-cyan/90 active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,224,165,0.2)]"
        >
          Quick Actions
        </button>

        <div className="h-6 w-[1px] bg-[#1e293b]"></div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          {/* Notifications Button */}
          <button
            id="btn-bell-notifications"
            className="relative p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-full"
            onClick={() => alert(`Reviewing ${alertsCount} critical intelligence system alerts.`)}
          >
            <Bell size={18} />
            {alertsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_8px_#00e0a5] animate-pulse"></span>
            )}
          </button>

          {/* Theme/Contrast toggler - styling matching the custom display */}
          <button
            id="btn-contrast-toggle"
            onClick={() => alert('Terminal in High Performance Dark mode. Grid contrast has been calibrated.')}
            className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-full"
            title="Calibrate Display"
          >
            <svg
              className="w-4.5 h-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2v20"></path>
              <path d="M12 12h10"></path>
              <path d="M12 12l7-7"></path>
              <path d="M12 12l7 7"></path>
            </svg>
          </button>
        </div>

        <div className="h-6 w-[1px] bg-[#1e293b]"></div>

        {/* User profile dropdown block */}
        <div className="relative" id="user-profile-widget">
          <button
            id="btn-profile-dropdown"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2.5 p-1 hover:bg-white/5 rounded-lg transition-colors text-left"
          >
            <div className="h-8 w-8 rounded-full overflow-hidden border border-[#1e293b] shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden md:flex flex-col select-none pr-1">
              <span className="text-xs font-medium text-white tracking-tight leading-none mb-0.5">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-gray-500 font-mono tracking-tighter leading-none">
                {currentUser.role}
              </span>
            </div>
            <ChevronDown size={14} className="text-gray-500" />
          </button>

          {showProfileDropdown && (
            <div
              id="profile-dropdown-menu"
              className="absolute right-0 mt-2 w-64 bg-[#0b0e17] border border-[#1e293b] rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="px-4 py-2.5 border-b border-[#1e293b]/70">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  Intel Account
                </p>
                <p className="text-xs font-semibold text-white mt-0.5">{currentUser.name}</p>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">{currentUser.email}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => alert('Accessing user security settings...')}
                  className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Terminal Access Keys
                </button>
                <button
                  onClick={() => alert('Checking terminal connectivity...')}
                  className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>Node Connectivity</span>
                  <span className="flex items-center gap-1 text-[9px] text-brand-cyan font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
                    ONLINE
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Star,
  Infinity as InfinityIcon,
  FileText,
  Database,
  Users,
  Flag,
  TrendingUp,
  History,
  CornerDownLeft
} from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  type: 'Recent' | 'Pinned' | 'Extended';
  category: 'Reports' | 'Datasets' | 'Users' | 'Countries' | 'Trade' | 'Indicators';
  subtitle: string;
  badge?: string;
  starred?: boolean;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type: 'success' | 'info') => void;
  onNavigateToTab: (tabName: 'Dashboard' | 'Regional' | 'Indicators' | 'Conflict' | 'Trade' | 'Management' | 'Reports' | 'Notifications' | 'Settings') => void;
}

export default function SearchOverlay({ isOpen, onClose, onShowToast, onNavigateToTab }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Reports' | 'Datasets' | 'Users' | 'Countries' | 'Trade'>('All');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial Seed Data mirroring the screenshot and theme
  const [items, setItems] = useState<SearchItem[]>([
    // Recent Searches
    {
      id: 'rec-1',
      title: 'Crude Oil Export Volatility - APAC Region',
      type: 'Recent',
      category: 'Trade',
      subtitle: 'Last searched 2h ago'
    },
    {
      id: 'rec-2',
      title: 'Lithium Supply Chain Risks 2024',
      type: 'Recent',
      category: 'Trade',
      subtitle: 'Last searched 5h ago'
    },
    // Pinned Entities
    {
      id: 'pin-1',
      title: 'Red Sea Transit Risk Index',
      type: 'Pinned',
      category: 'Indicators',
      subtitle: 'Indicator • Real-time Monitoring',
      badge: 'CRITICAL',
      starred: true
    },
    {
      id: 'pin-2',
      title: 'Federal Republic of Nigeria',
      type: 'Pinned',
      category: 'Countries',
      subtitle: 'Country Profile • West Africa',
      starred: true
    },
    {
      id: 'pin-3',
      title: 'Q3 Global Debt Sustainability Report',
      type: 'Pinned',
      category: 'Reports',
      subtitle: 'Report • IMF / World Bank Fusion',
      starred: true
    },
    // Extended Searchable Corpus
    {
      id: 'ext-1',
      title: 'Suez Canal Flow Telemetry',
      type: 'Extended',
      category: 'Datasets',
      subtitle: 'Dataset • Maritime Channels'
    },
    {
      id: 'ext-2',
      title: 'Executive Strategic Trade Framework',
      type: 'Extended',
      category: 'Reports',
      subtitle: 'Report • Policy Directive'
    },
    {
      id: 'ext-3',
      title: 'Director Crawford',
      type: 'Extended',
      category: 'Users',
      subtitle: 'User • Lead Intelligence Analyst'
    },
    {
      id: 'ext-4',
      title: 'Senior Analyst Henderson',
      type: 'Extended',
      category: 'Users',
      subtitle: 'User • Conflict Specialist'
    },
    {
      id: 'ext-5',
      title: 'G7 Central Bank Swap Lines',
      type: 'Extended',
      category: 'Datasets',
      subtitle: 'Dataset • Global Liquidity'
    },
    {
      id: 'ext-6',
      title: 'Malacca Strait Security Corridors',
      type: 'Extended',
      category: 'Trade',
      subtitle: 'Indicator • Strategic Straits'
    }
  ]);

  // Focus input automatically when overlay is triggered
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  // Handle ESC key and Cmd/Ctrl + K hooks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      // Cmd+K or Ctrl+K to copy link
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleCopySelectedLink();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, items, searchQuery, activeCategory]);

  // Filter items dynamically
  const filteredItems = useMemo(() => {
    let result = items;

    // Filter by Tab Category
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Filter by Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [items, searchQuery, activeCategory]);

  // Separate currently filtered list into groups
  const recentsGroup = useMemo(() => {
    return filteredItems.filter(item => item.type === 'Recent');
  }, [filteredItems]);

  const pinnedGroup = useMemo(() => {
    return filteredItems.filter(item => item.type === 'Pinned' || (item.type === 'Extended' && item.starred));
  }, [filteredItems]);

  const extendedGroup = useMemo(() => {
    return searchQuery.trim() !== ''
      ? filteredItems.filter(item => item.type === 'Extended' && !item.starred)
      : [];
  }, [filteredItems, searchQuery]);

  // Flatten active items for simple keyboard index selection traversal
  const flatSelectableList = useMemo(() => {
    return [...recentsGroup, ...pinnedGroup, ...extendedGroup];
  }, [recentsGroup, pinnedGroup, extendedGroup]);

  // Key navigation controller for the highlighted state index
  useEffect(() => {
    const handleNavigationKeys = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(prev => (prev + 1) % Math.max(1, flatSelectableList.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(prev => (prev - 1 + flatSelectableList.length) % Math.max(1, flatSelectableList.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSelectItem(flatSelectableList[highlightedIndex]);
      }
    };

    window.addEventListener('keydown', handleNavigationKeys);
    return () => window.removeEventListener('keydown', handleNavigationKeys);
  }, [isOpen, flatSelectableList, highlightedIndex]);

  // Safe Index Reset when searchQuery or Categories shift
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery, activeCategory]);

  // Navigation Logic triggered upon selecting search items
  const handleSelectItem = (item?: SearchItem) => {
    if (!item) return;

    // Route matching mapping logic
    onShowToast(`SURVEILLANCE DIRECT CONNECT: MATCHED CORRELATION FOR "${item.title.toUpperCase()}"`, 'success');

    // Switch tabs dynamically based on item category
    if (item.category === 'Indicators') {
      onNavigateToTab('Indicators');
    } else if (item.category === 'Countries') {
      onNavigateToTab('Regional');
    } else if (item.category === 'Reports') {
      onNavigateToTab('Reports');
    } else if (item.category === 'Trade') {
      onNavigateToTab('Trade');
    } else if (item.category === 'Users') {
      onNavigateToTab('Management');
    } else if (item.category === 'Datasets') {
      onNavigateToTab('Dashboard');
    }

    onClose();
  };

  // Copy Deep Link
  const handleCopySelectedLink = () => {
    const item = flatSelectableList[highlightedIndex];
    if (!item) {
      onShowToast('Select a resource first to copy key telemetry index', 'info');
      return;
    }
    const secureUrl = `https://econ-sentinel.int/secure/nodes/query?id=${item.id}&category=${item.category.toLowerCase()}`;
    navigator.clipboard.writeText(secureUrl).then(() => {
      onShowToast(`✓ COPIED SECURE RESOURCE DEEP-LINK: ${item.title.toUpperCase()}`, 'success');
    }).catch(() => {
      onShowToast(`Copied simulation link to memory index`, 'success');
    });
  };

  // Pin/Star State Toggler
  const handleToggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Avoid triggering route action
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const nextState = !item.starred;
          onShowToast(
            nextState
              ? `PINNED STRATEGIC ASSET TO COMMAND MONITOR: ${item.title.toUpperCase()}`
              : `UNPINNED RESOURCE MONITORING CAPABILITY`,
            'info'
          );
          return { ...item, starred: nextState };
        }
        return item;
      })
    );
  };

  // Click outside to close overlay modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in select-none"
    >
      {/* Centered  Palette Panel */}
      <div
        ref={containerRef}
        className="bg-[#111625] border border-[#1e293b]/80 rounded-2xl w-full max-w-xl shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        id="search-command-palette"
      >
        {/* TOP: INPUT MODULE */}
        <div className="p-4 border-b border-[#1e293b]/40 flex items-center gap-3 bg-[#0a0d17]/50">
          
          {/* Custom  Magnifier + Lines Logo Icon as shown in the screenshot */}
          <div className="flex items-center gap-1.5 text-brand-cyan shrink-0" id="brand-indicator-search">
            <svg
              className="w-5 h-5 text-brand-cyan"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="6" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <div className="flex flex-col gap-[2px] h-3 justify-center">
              <span className="w-2.5 h-[1.5px] bg-brand-cyan" />
              <span className="w-1.5 h-[1.5px] bg-brand-cyan" />
              <span className="w-2 h-[1.5px] bg-brand-cyan" />
            </div>
          </div>

          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-0 outline-none text-[13px] text-white placeholder-gray-500 font-sans tracking-wide leading-none py-1 h-8 focus:ring-0"
            placeholder="Search reports, trade data, or regional conflict..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <kbd className="px-1.5 py-0.5 border border-[#1e293b] font-mono text-[8px] font-extrabold rounded text-gray-500 bg-[#0e111a] select-none uppercase shadow-sm shrink-0">
            ESC
          </kbd>
        </div>

        {/* MIDDLE-A: FILTER CATEGORY HORIZONTAL ROW */}
        <div className="px-4 py-2 bg-[#0e111a]/40 border-b border-[#1e293b]/20 flex flex-wrap gap-1.5 select-none items-center">
          {[
            { id: 'All', label: 'All', icon: InfinityIcon },
            { id: 'Reports', label: 'Reports', icon: FileText },
            { id: 'Datasets', label: 'Datasets', icon: Database },
            { id: 'Users', label: 'Users', icon: Users },
            { id: 'Countries', label: 'Countries', icon: Flag },
            { id: 'Trade', label: 'Trade', icon: TrendingUp }
          ].map((cat) => {
            const CatIcon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-tight font-sans cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-brand-cyan/10 border-brand-cyan/25 text-brand-cyan'
                    : 'bg-[#151b2e]/40 border-transparent text-gray-400 hover:text-white hover:bg-[#151b2e]/90'
                }`}
              >
                <CatIcon size={12} className={isSelected ? 'text-brand-cyan' : 'text-gray-500'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* MIDDLE-B: SEARCH HIERARCHICAL FEED VIEW */}
        <div className="flex-1 overflow-y-auto max-h-[300px] divide-y divide-[#1e293b]/15 p-2 space-y-3 Scrollbar-sentinel select-none">
          
          {/* No results prompt */}
          {flatSelectableList.length === 0 && (
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-2">
              <svg
                className="w-8 h-8 text-gray-650"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M8 11h6" />
              </svg>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">NO SURVEILLANCE RECORDS FOUND</p>
                <p className="text-[10px] text-gray-500">Modify keywords or switch filter categories.</p>
              </div>
            </div>
          )}

          {/* SECTION A: RECENT SEARCHES */}
          {recentsGroup.length > 0 && (
            <div className="space-y-1.5 pt-1 text-left">
              <h4 className="px-2 text-[9.5px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                Recent Searches
              </h4>

              <div className="space-y-1">
                {recentsGroup.map((item) => {
                  const globalIdx = flatSelectableList.findIndex(f => f.id === item.id);
                  const isHighlighted = globalIdx === highlightedIndex;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setHighlightedIndex(globalIdx)}
                      className={`w-full flex items-center justify-between px-2.5 py-2.5 rounded-xl transition cursor-pointer ${
                        isHighlighted
                          ? 'bg-[#1e253c]/50 border border-brand-cyan/25'
                          : 'bg-transparent border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* History  Icon */}
                        <div className="h-7 w-7 rounded-lg bg-[#151b2d] flex items-center justify-center text-gray-400 shrink-0 border border-[#1e293b]/50">
                          <History size={13} className="text-gray-400" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-200 tracking-tight block truncate">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-gray-500 font-mono tracking-wide mt-0.5 uppercase">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isHighlighted && (
                          <CornerDownLeft size={10} className="text-brand-cyan opacity-80" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION B: PINNED ENTITIES */}
          {pinnedGroup.length > 0 && (
            <div className="space-y-1.5 pt-2 text-left">
              <h4 className="px-2 text-[9.5px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                Pinned Entities
              </h4>

              <div className="space-y-1 animate-in fade-in">
                {pinnedGroup.map((item) => {
                  const globalIdx = flatSelectableList.findIndex(f => f.id === item.id);
                  const isHighlighted = globalIdx === highlightedIndex;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setHighlightedIndex(globalIdx)}
                      className={`w-full flex items-center justify-between px-2.5 py-2.5 rounded-xl transition cursor-pointer ${
                        isHighlighted
                          ? 'bg-[#1e253c]/50 border border-brand-cyan/25'
                          : 'bg-transparent border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        
                        {/* Custom dynamic thumbnail based on entity type */}
                        {item.title === 'Red Sea Transit Risk Index' ? (
                          <div className="h-8 w-8 rounded-lg overflow-hidden border border-[#1e293b] shrink-0 relative">
                            {/* Graphic simulation of maritime channels */}
                            <div className="absolute inset-0 bg-[#070b14] flex flex-col justify-between p-1">
                              <span className="text-[6px] font-mono text-red-500 bg-red-500/10 rounded px-0.5 leading-none">RISK</span>
                              <div className="flex gap-[1px] items-end h-3">
                                <span className="w-[2px] h-1.5 bg-brand-cyan/40" />
                                <span className="w-[2px] h-3 bg-red-500" />
                                <span className="w-[2px] h-1 bg-brand-cyan/40" />
                              </div>
                            </div>
                          </div>
                        ) : item.title === 'Federal Republic of Nigeria' ? (
                          <div className="h-8 w-8 rounded-lg bg-[#0d2a23] border border-[#153a2f] flex items-center justify-center shrink-0">
                            <Flag size={14} className="text-brand-cyan" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-lg bg-[#1a2333]/70 border border-[#1e293b] flex items-center justify-center shrink-0">
                            <FileText size={14} className="text-gray-400" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-gray-205 tracking-tight truncate max-w-[210px] sm:max-w-xs block">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded leading-none text-red-500 border border-red-500/20 bg-red-500/5 uppercase">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[10px] text-gray-500 font-mono tracking-wide mt-0.5 uppercase">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {isHighlighted && (
                          <span className="text-[8.5px] font-mono text-gray-500">SELECT ↵</span>
                        )}
                        <button
                          onClick={(e) => handleToggleStar(e, item.id)}
                          className={`p-1 hover:bg-white/5 rounded transition text-gray-500 ${
                            item.starred ? 'text-amber-500' : 'text-gray-500 hover:text-white'
                          }`}
                        >
                          <Star size={11} fill={item.starred ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION C: SEARCH CORPUS RESULTS */}
          {extendedGroup.length > 0 && (
            <div className="space-y-1.5 pt-2 text-left animate-in fade-in">
              <h4 className="px-2 text-[9.5px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                 Corpus Matches
              </h4>

              <div className="space-y-1">
                {extendedGroup.map((item) => {
                  const globalIdx = flatSelectableList.findIndex(f => f.id === item.id);
                  const isHighlighted = globalIdx === highlightedIndex;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setHighlightedIndex(globalIdx)}
                      className={`w-full flex items-center justify-between px-2.5 py-2.5 rounded-xl transition cursor-pointer ${
                        isHighlighted
                          ? 'bg-[#1e253c]/50 border border-brand-cyan/25'
                          : 'bg-transparent border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Dynamic category icon */}
                        <div className="h-7 w-7 rounded-lg bg-[#121829] border border-[#1e293b]/70 flex items-center justify-center shrink-0">
                          {item.category === 'Reports' && <FileText size={12} className="text-gray-400" />}
                          {item.category === 'Datasets' && <Database size={12} className="text-brand-cyan" />}
                          {item.category === 'Users' && <Users size={12} className="text-gray-400" />}
                          {item.category === 'Trade' && <TrendingUp size={12} className="text-gray-400" />}
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-200 tracking-tight block truncate">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-gray-500 font-mono tracking-wide mt-0.5 uppercase">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleToggleStar(e, item.id)}
                          className="p-1 hover:bg-white/5 rounded transition text-gray-500 hover:text-white"
                        >
                          <Star size={11} fill="none" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM: FOOTER SHORTCUT HUD AS VIEWED IN THE SCREENSHOT */}
        <div className="px-4 py-2 bg-[#0a0d17] border-t border-[#1e293b]/40 flex justify-between items-center text-[9px] font-mono text-gray-500 select-none">
          <div className="flex items-center gap-3.5">
            <span className="flex items-center gap-1.5 leading-none">
              <kbd className="px-1 border border-[#1e293b] rounded bg-[#070b14] text-[8px] font-extrabold uppercase">↑↓</kbd>
              <span>to navigate</span>
            </span>

            <span className="flex items-center gap-1.5 leading-none">
              <kbd className="px-1 border border-[#1e293b] rounded bg-[#070b14] text-[8px] font-extrabold uppercase">↵</kbd>
              <span>to select</span>
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <span className="flex items-center gap-1.5 leading-none">
              <kbd className="px-1 border border-[#1e293b] rounded bg-[#070b14] text-[8px] font-extrabold uppercase">⌘K</kbd>
              <span>Copy Link</span>
            </span>

            <span className="flex items-center gap-1.5 leading-none">
              <kbd className="px-1 border border-[#1e293b] rounded bg-[#070b14] text-[8px] font-extrabold uppercase">ESC</kbd>
              <span>to close</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

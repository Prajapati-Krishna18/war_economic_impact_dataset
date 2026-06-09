import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
  FileDown,
  Globe,
  Sliders,
  TrendingUp,
  ShieldAlert,
  ArrowLeftRight,
  Briefcase,
  FileText,
  Bell,
  Settings as SettingsIcon,
  HelpCircle,
  Clock,
  ChevronDown,
  AlertOctagon,
  Search,
  BookOpen,
  Anchor,
  Filter,
  CheckCircle,
  CornerDownRight,
  AlertTriangle,
  UserPlus,
  RefreshCw,
} from 'lucide-react';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import KPICards from './components/KPICards';
import HealthSummary from './components/HealthSummary';
import AlertIntelligence from './components/AlertIntelligence';
import DashboardBottomRow from './components/DashboardBottomRow';
import FormsModal from './components/FormsModal';
import RegionalIntelligence from './components/RegionalIntelligence';
import IndicatorsIndex from './components/IndicatorsIndex';
import ConflictAnalytics from './components/ConflictAnalytics';
import GlobalTradeIntelligence from './components/GlobalTradeIntelligence';
import UserAdministration from './components/UserAdministration';
import IntelligenceReports from './components/IntelligenceReports';
import NotificationHub from './components/NotificationHub';
import PlatformConfiguration from './components/PlatformConfiguration';
import SearchOverlay from './components/SearchOverlay';
import SignIn from './components/SignIn';

import type { SidebarTab, KPICardData, AlertData, ActivityData, ReportData } from './types';
import {
  initialKPICards,
  initialAlerts,
  initialActivities,
  initialReports,
} from './mockData';

interface DashboardProps {
  onSignOut: () => void;
  userEmail: string;
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

function Dashboard({ onSignOut, userEmail, onShowToast }: DashboardProps) {
  // Navigation & Hierarchy State
  const [activeTab, setActiveTab] = useState<SidebarTab>('Dashboard');
  const [selectedRegion, setSelectedRegion] = useState<string>('Global');
  const [timeRange, setTimeRange] = useState<string>('Last 30 Days');

  // Search Engine
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  useEffect(() => {
    const handleGlobalK = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOverlayOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalK);
    return () => window.removeEventListener('keydown', handleGlobalK);
  }, []);

  // Live Database State (allowing active additions!)
  const [alerts, setAlerts] = useState<AlertData[]>(initialAlerts);
  const [activities, setActivities] = useState<ActivityData[]>(initialActivities);
  const [reports, setReports] = useState<ReportData[]>(initialReports);
  const [kpiCardsData, setKpiCardsData] = useState<Record<string, KPICardData[]>>(initialKPICards);

  // Fetch Live Data dynamically with polling
  useEffect(() => {
    let isMounted = true;
    let intervalId: ReturnType<typeof setInterval>;

    const loadData = async () => {
      try {
        const { fetchStats, fetchOngoingConflicts } = await import('./services/api');
        
        // 1. Fetch Global Stats for KPI Cards
        const stats = await fetchStats();
        if (isMounted && stats) {
          setKpiCardsData(prev => {
            const newGlobal = [...prev.Global];
            
            // Map stats to KPI cards
            // 0: GDP
            newGlobal[0] = { ...newGlobal[0], value: stats.lowestGDP?.gdpChange ? `${stats.lowestGDP.gdpChange}%` : newGlobal[0].value, changeLabel: `Worst GDP: ${stats.lowestGDP?.conflictName || ''}` };
            // 1: Inflation
            newGlobal[1] = { ...newGlobal[1], value: stats.highestInflation?.inflationRate ? `${stats.highestInflation.inflationRate}%` : newGlobal[1].value, changeLabel: `Highest: ${stats.highestInflation?.conflictName || ''}` };
            // 2: Trade -> mapped to Cost of War or Ongoing Conflicts
            newGlobal[2] = { ...newGlobal[2], title: 'ONGOING CONFLICTS', value: stats.ongoingConflicts?.toString() || newGlobal[2].value, changeLabel: 'Active global conflicts', unit: 'Conflicts' };
            // 3: Geopolitical -> mapped to Total Conflicts
            newGlobal[3] = { ...newGlobal[3], title: 'TOTAL RECORDED CONFLICTS', value: stats.totalConflicts?.toString() || newGlobal[3].value, changeLabel: 'All historical & active', unit: 'Conflicts' };
            
            return { ...prev, Global: newGlobal };
          });
        }

        // 2. Fetch Ongoing Conflicts for Alerts and Activities
        const conflicts = await fetchOngoingConflicts();
        if (isMounted && conflicts && conflicts.length > 0) {
          // Map to Alerts
          const liveAlerts: AlertData[] = conflicts.slice(0, 5).map((c: any) => ({
            id: c._id,
            severity: c.inflationRate > 20 || c.gdpChange < -10 ? 'critical' : 'warning',
            title: `Ongoing Crisis: ${c.conflictName}`,
            description: `Region: ${c.region} | Country: ${c.country} | Start Year: ${c.startYear}`,
            timeAgo: 'Live',
            timestamp: new Date()
          }));
          
          setAlerts(prevAlerts => {
            const userAlerts = prevAlerts.filter(a => typeof a.id === 'string' && a.id.startsWith('alert-'));
            return [...userAlerts, ...liveAlerts];
          });

          // Map to Activities
          const liveActivities: ActivityData[] = conflicts.slice(0, 6).map((c: any, index: number) => ({
            id: `act-${c._id}`,
            title: `${c.conflictName} continues to impact ${c.primaryAffectedSector || 'multiple sectors'}.`,
            type: 'Conflict Update',
            timeAgo: `${index + 1}h ago`,
            timestamp: new Date(),
            category: 'event'
          }));
          
          setActivities(prevActivities => {
            const userActivities = prevActivities.filter(a => typeof a.id === 'string' && !a.id.match(/^act-[a-f0-9]{24}$/));
            return [...userActivities, ...liveActivities];
          });
        }
      } catch (err) {
        console.error("Error polling data:", err);
      }
    };

    // Initial load
    loadData();

    // Poll every 5 seconds
    intervalId = setInterval(loadData, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // Popups & Command Modals
  const [modalType, setModalType] = useState<'createAlert' | 'scheduleReport' | 'inviteUser' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Badge alert counting
  const unreadAlertsCount = useMemo(() => {
    return alerts.filter((a) => a.severity === 'critical').length;
  }, [alerts]);

  // Handle Quick actions click from header and cards
  const openActionForm = (type: 'createAlert' | 'scheduleReport' | 'inviteUser') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Adding alert dynamically from form
  const handleAddNewAlert = (rawAlert: Omit<AlertData, 'id' | 'timeAgo' | 'timestamp'>) => {
    const freshAlert: AlertData = {
      ...rawAlert,
      id: `alert-${Date.now()}`,
      timeAgo: 'Just now',
      timestamp: new Date(),
    };
    setAlerts((prev) => [freshAlert, ...prev]);

    // Prepend matching activity feed
    const freshActivity: ActivityData = {
      id: `act-${Date.now()}`,
      title: `CRITICAL ALERT: ${rawAlert.title}`,
      type: rawAlert.severity.toUpperCase() + ' EVENT',
      timeAgo: 'Just now',
      timestamp: new Date(),
      category: 'event',
    };
    setActivities((prev) => [freshActivity, ...prev]);
    onShowToast(`Dispatched: "${rawAlert.title}" broadcasted successfully.`, 'success');
  };

  // Formatting scheduled reports
  const handleScheduleReport = (rawRep: Omit<ReportData, 'id' | 'timestamp'>) => {
    const freshRep: ReportData = {
      ...rawRep,
      id: `rep-${Date.now()}`,
      timestamp: new Date(),
    };
    setReports((prev) => [freshRep, ...prev]);

    // Prepend matching activity feed
    const freshActivity: ActivityData = {
      id: `act-${Date.now()}`,
      title: `Report Compiled: "${rawRep.title}"`,
      type: 'Archive Update',
      timeAgo: 'Just now',
      timestamp: new Date(),
      category: 'update',
    };
    setActivities((prev) => [freshActivity, ...prev]);
    onShowToast(`Scheduled: "${rawRep.title}" registered inside archive.`, 'success');
  };

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    onShowToast('Alert acknowledged and stored into secure logs.', 'info');
  };

  // Filter dynamic KPI statistics based on dropdown regional selectors
  const activeKPIs = useMemo(() => {
    return kpiCardsData[selectedRegion] || kpiCardsData['Global'];
  }, [selectedRegion, kpiCardsData]);

  // Global search filtering logic (filters Alerts, Events, or Reports dynamically)
  const filteredAlerts = useMemo(() => {
    if (!searchQuery) return alerts;
    const q = searchQuery.toLowerCase();
    return alerts.filter(
      (a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
    );
  }, [alerts, searchQuery]);

  const filteredActivities = useMemo(() => {
    if (!searchQuery) return activities;
    const q = searchQuery.toLowerCase();
    return activities.filter((a) => a.title.toLowerCase().includes(q) || a.type.toLowerCase().includes(q));
  }, [activities, searchQuery]);

  const filteredReports = useMemo(() => {
    if (!searchQuery) return reports;
    const q = searchQuery.toLowerCase();
    return reports.filter((r) => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q));
  }, [reports, searchQuery]);

  return (
    <div className="flex bg-[#070b14] text-gray-100 min-h-screen font-sans antialiased overflow-x-hidden selection:bg-brand-cyan selection:text-black">
      
      {/* 1. SIDEBAR NAVIGATION PANEL */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadAlertsCount={unreadAlertsCount}
        onSignOut={onSignOut}
      />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        
        {/* 2. TOPBAR CONTAINER */}
        <Topbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onQuickActionClick={() => openActionForm('createAlert')}
          alertsCount={unreadAlertsCount}
          onSearchClick={() => setIsSearchOverlayOpen(true)}
        />

        {/* 3. CORE ROUTE CONDITIONAL CONTENT VIEWPORT */}
        <main className="flex-1 p-8">
          
          {activeTab === 'Dashboard' && (
            <div className="animate-in fade-in duration-200">
              
              {/* BREADCRUMB + PAGE HEADER BLOCK */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 text-left">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1.5 select-none">
                    <span className="text-gray-500">Home</span>
                    <span className="text-gray-700">/</span>
                    <span className="text-brand-cyan">Dashboard</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display">
                    Executive Intelligence Overview
                  </h2>
                </div>

                {/* Dropdown Filters on right matching the layout */}
                <div className="flex items-center gap-3 self-end md:self-auto select-none" id="dashboard-hud-filters">
                  {/* Calendar Duration Dropdown */}
                  <div className="relative">
                    <select
                      id="filter-time-range"
                      value={timeRange}
                      onChange={(e) => {
                        setTimeRange(e.target.value);
                        onShowToast(`Calibrating econometric indexes for: ${e.target.value}`, 'info');
                      }}
                      className="appearance-none bg-[#121829] border border-[#1e293b]/70 hover:border-gray-600 rounded px-4 py-1.5 pr-8 text-xs font-medium text-gray-300 font-sans focus:outline-none cursor-pointer"
                    >
                      <option value="Last 24 Hours">Last 24 Hours</option>
                      <option value="Last 7 Days">Last 7 Days</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option value="Last 90 Days">Last 90 Days</option>
                      <option value="Year-to-date (YTD)">Year-to-date (YTD)</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>

                  {/* Geopolitical Region Filter Dropdown */}
                  <div className="relative">
                    <select
                      id="filter-region"
                      value={selectedRegion}
                      onChange={(e) => {
                        setSelectedRegion(e.target.value);
                        onShowToast(`Switching surveillance quadrant to: ${e.target.value}`, 'info');
                      }}
                      className="appearance-none bg-[#121829] border border-[#1e293b]/70 hover:border-gray-600 rounded px-4 py-1.5 pr-8 text-xs font-medium text-gray-300 font-sans focus:outline-none cursor-pointer"
                    >
                      <option value="Global">Global</option>
                      <option value="G7">G7 Group</option>
                      <option value="Asia-Pacific">Asia-Pacific</option>
                      <option value="Developing Nations">Developing Nations</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>

                  {/* Export Report Action Button */}
                  <button
                    id="btn-export-report"
                    onClick={() => {
                      onShowToast('Formatting PDF dispatch... Downloading ECON-SENTINEL report.', 'success');
                      alert('Macroeconomic surveillance summary printed successfully.');
                    }}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-[#121829] border border-brand-cyan/25 hover:border-brand-cyan/60 rounded text-xs font-medium text-brand-cyan hover:bg-[#1a2e3b]/30 transition-all cursor-pointer"
                  >
                    <FileDown size={14} />
                    <span>Export Report</span>
                  </button>
                </div>
              </div>

              {/* 4. STATISTICS CARDS GRID */}
              <KPICards cards={activeKPIs} />

              {/* 5. CENTER DISPLAY BLOCKS 2-COLUMN PANELS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                
                {/* Global Economic Health Summary (Grid Columns spans 2) */}
                <div className="lg:col-span-2">
                  <HealthSummary />
                </div>

                {/* Alert Intelligence (Grid Column spans 1) */}
                <div className="lg:col-span-1">
                  <AlertIntelligence
                    alerts={filteredAlerts}
                    onDismissAlert={handleDismissAlert}
                    onViewAllAlertsClick={() => {
                      onShowToast('Expanded full intelligence alerts databank.', 'success');
                    }}
                  />
                </div>
              </div>

              {/* 6. BOTTOM TELEMETRY BLOCKS (3-COLUMN PANELS) */}
              <DashboardBottomRow
                activities={filteredActivities}
                reports={filteredReports}
                onCreateAlertClick={() => openActionForm('createAlert')}
                onScheduleReportClick={() => openActionForm('scheduleReport')}
                onInviteUserClick={() => openActionForm('inviteUser')}
              />
            </div>
          )}

          {/* TAB 2: REGIONAL Surveillance Quadrants */}
          {activeTab === 'Regional' && (
            <RegionalIntelligence onShowToast={onShowToast} />
          )}

          {/* TAB 3: INDICATORS Custom Calibration */}
          {activeTab === 'Indicators' && (
            <IndicatorsIndex onShowToast={onShowToast} />
          )}

          {/* TAB 4: CONFLICT Risk Flashpoints */}
          {activeTab === 'Conflict' && (
            <ConflictAnalytics onShowToast={onShowToast} />
          )}

          {/* TAB 5: TRADE Maritime Channels */}
          {activeTab === 'Trade' && (
            <GlobalTradeIntelligence onShowToast={onShowToast} />
          )}

          {/* TAB 5.5: MANAGEMENT Enterprise User Administration */}
          {activeTab === 'Management' && (
            <UserAdministration onShowToast={onShowToast} />
          )}

          {/* TAB 6: REPORTS Library Database */}
          {activeTab === 'Reports' && (
            <IntelligenceReports onShowToast={onShowToast} />
          )}

          {/* TAB 6.5: NOTIFICATIONS Hub */}
          {activeTab === 'Notifications' && (
            <NotificationHub onShowToast={onShowToast} />
          )}

          {/* TAB 7: SETTINGS Command Console */}
          {activeTab === 'Settings' && (
            <PlatformConfiguration onShowToast={onShowToast} />
          )}

        </main>

        {/* HUD FOOTER STATUS BAR */}
        <footer className="h-10 border-t border-[#1e293b]/40 bg-[#070b14] flex items-center justify-between px-8 text-[9px] font-mono text-gray-500 select-none shrink-0 text-left">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
            <span>ECON-SENTINEL NODE SERVER v4.16.8 // REGION_G7 DIRECT CONNECTED</span>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <span>PING: 14.5 ms</span>
            <span>CRYP_DISPATCH: HIGH_SECURE_MODE</span>
            <span>SECURE JWT ACTIVE</span>
          </div>
        </footer>

      </div>

      {/* 7. SYSTEM ACTION INPUT POPUPS */}
      <FormsModal
        isOpen={isModalOpen}
        type={modalType}
        onClose={() => {
          setIsModalOpen(false);
          setModalType(null);
        }}
        onSubmitAlert={handleAddNewAlert}
        onSubmitReport={handleScheduleReport}
      />

      {/* 8. COMMAND SEARCH PALETTE OVERLAY */}
      <SearchOverlay
        isOpen={isSearchOverlayOpen}
        onClose={() => setIsSearchOverlayOpen(false)}
        onShowToast={onShowToast}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
        }}
      />

    </div>
  );
}

// Parent App component
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('econ_auth') === 'true';
  });
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('econ_user') || '';
  });

  const [notificationToast, setNotificationToast] = useState<{ show: boolean; msg: string; type: 'success' | 'info' }>({
    show: false,
    msg: '',
    type: 'success',
  });

  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setNotificationToast({ show: true, msg, type });
    setTimeout(() => {
      setNotificationToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  // Helper SignIn wrapper to handle Route constraints and props
  const SignInWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const hasLoggedOut = queryParams.get('logout') === 'true';

    const [showLogoutBanner, setShowLogoutBanner] = useState(hasLoggedOut);

    const handleSignIn = (email: string) => {
      setIsAuthenticated(true);
      setUserEmail(email);
      localStorage.setItem('econ_auth', 'true');
      localStorage.setItem('econ_user', email);
      navigate('/');
    };

    return (
      <SignIn
        onSignIn={handleSignIn}
        showLogoutBanner={showLogoutBanner}
        onCloseBanner={() => setShowLogoutBanner(false)}
        onShowToast={showToast}
      />
    );
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    localStorage.removeItem('econ_auth');
    localStorage.removeItem('econ_user');
  };

  return (
    <BrowserRouter>
      {/* Toast Notification display */}
      {notificationToast.show && (
        <div
          id="notification-toast"
          className="fixed bottom-6 right-6 px-4 py-3 bg-[#0f1424] border-l-4 border-brand-cyan shadow-2xl text-xs rounded-r-lg z-50 flex items-center gap-3 animate-bounce text-left text-gray-200"
        >
          <div className="h-2 w-2 rounded-full bg-brand-cyan animate-ping"></div>
          <div>
            <p className="font-mono font-bold text-gray-400">SENTINEL_NODE // EXEC_OK</p>
            <p className="text-white mt-0.5 font-sans font-medium">{notificationToast.msg}</p>
          </div>
        </div>
      )}

      <Routes>
        <Route
          path="/signin"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <SignInWrapper />
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Dashboard
                onSignOut={handleSignOut}
                userEmail={userEmail}
                onShowToast={showToast}
              />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

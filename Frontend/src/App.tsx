import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Shield, LogOut, Database, TrendingUp, AlertTriangle, Globe } from 'lucide-react';
import SignIn from './components/SignIn';

// Dashboard component to represent the Home route
interface DashboardProps {
  onSignOut: () => void;
  userEmail: string;
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

function Dashboard({ onSignOut, userEmail, onShowToast }: DashboardProps) {
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    onSignOut();
    onShowToast("SECURE DE-AUTHORIZATION COMPLETED: TERMINATED SESSION", "info");
    navigate('/signin?logout=true');
  };

  return (
    <div className="min-h-screen w-full bg-[#070b14] flex flex-col font-sans text-gray-200 relative select-none">
      {/* Background ambient light effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00e0a5]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0ea5e9]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="h-16 border-b border-[#1e293b]/40 bg-[#111625]/80 backdrop-blur-md flex items-center justify-between px-8 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#00e0a5]/10 border border-[#00e0a5]/25 flex items-center justify-center text-brand-cyan shadow-[0_0_15px_rgba(0,224,165,0.1)] relative overflow-hidden">
            <Shield size={18} className="text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-wider text-white font-display">
              ECON-SENTINEL
            </h1>
            <p className="text-[8px] text-gray-500 font-mono tracking-[0.25em] uppercase">
              Surveillance Desk
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col text-right">
            <span className="text-xs font-semibold text-white">{userEmail}</span>
            <span className="text-[9px] font-mono text-brand-cyan tracking-wider">LEVEL_1_ANALYST</span>
          </div>
          <button
            onClick={handleSignOutClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg text-xs font-bold text-red-400 transition-all cursor-pointer"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 z-10 overflow-y-auto max-w-7xl mx-auto w-full flex flex-col gap-8 text-left">
        {/* Page title */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-700">/</span>
            <span className="text-brand-cyan">Dashboard</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white font-display">
            Economic Impact Analytics Dashboard
          </h2>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Real-time geopolitical and macroeconomic modeling. Monitor high-risk conflict zones, supply chain channels, and global inflation anomalies.
          </p>
        </div>

        {/* Dynamic Telemetry Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: GDP Fluctuation Index */}
          <div className="bg-[#111625] border border-[#1e293b]/70 rounded-xl p-6 shadow-xl flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-brand-cyan/5 rounded-bl-full blur-[10px] pointer-events-none" />
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg text-brand-cyan">
                <TrendingUp size={18} />
              </div>
              <span className="text-[10px] font-mono font-bold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/20">
                ACTIVE_SCAN
              </span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white font-display">-$412.5B</p>
              <p className="text-xs text-gray-400 font-sans mt-0.5">Projected Global GDP Variance</p>
            </div>
            <div className="border-t border-[#1e293b]/50 pt-3 text-[10px] font-mono text-gray-500 flex justify-between">
              <span>QUADRANT: WEST_EUR</span>
              <span className="text-red-400 font-semibold">-3.2% Trend</span>
            </div>
          </div>

          {/* Card 2: Supply Chain Disruption Index */}
          <div className="bg-[#111625] border border-[#1e293b]/70 rounded-xl p-6 shadow-xl flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-[#0ea5e9]/5 rounded-bl-full blur-[10px] pointer-events-none" />
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 rounded-lg text-[#0ea5e9]">
                <Globe size={18} />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#0ea5e9] bg-[#0ea5e9]/10 px-2 py-0.5 rounded border border-[#0ea5e9]/20">
                MARITIME_SEC
              </span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white font-display">84.2 pts</p>
              <p className="text-xs text-gray-400 font-sans mt-0.5">Supply Disruption Index</p>
            </div>
            <div className="border-t border-[#1e293b]/50 pt-3 text-[10px] font-mono text-gray-500 flex justify-between">
              <span>QUADRANT: SUEZ_CANAL</span>
              <span className="text-orange-400 font-semibold">+18.4 pts</span>
            </div>
          </div>

          {/* Card 3: Inflation Risk Assessment */}
          <div className="bg-[#111625] border border-[#1e293b]/70 rounded-xl p-6 shadow-xl flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-red-500/5 rounded-bl-full blur-[10px] pointer-events-none" />
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                <AlertTriangle size={18} />
              </div>
              <span className="text-[10px] font-mono font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 animate-pulse">
                HIGH_ALERT
              </span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white font-display">7.84% Avg</p>
              <p className="text-xs text-gray-400 font-sans mt-0.5">Global Commodity Inflation Rate</p>
            </div>
            <div className="border-t border-[#1e293b]/50 pt-3 text-[10px] font-mono text-gray-500 flex justify-between">
              <span>SYSTEM: EXOGENOUS_CPI</span>
              <span className="text-red-400 font-semibold">Critical Spike</span>
            </div>
          </div>
        </div>

        {/* Database & Platform Overview Segment */}
        <div className="bg-[#111625] border border-[#1e293b]/70 rounded-xl p-8 shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded text-brand-cyan">
              <Database size={16} />
            </div>
            <h3 className="text-md font-bold text-white font-mono uppercase tracking-wide">
              INTELLIGENCE REGISTRY DIRECTORY
            </h3>
          </div>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            The dataset includes secure telemetry logs, microeconomic inflation matrices, and G7 financial bulletins. 
            All analytical scripts running on this host are isolated and authenticated via JSON Web Tokens. Accessing other modules requires higher clearance.
          </p>
          <div className="p-4 bg-[#070b14] border border-[#1e293b]/55 rounded-lg font-mono text-[11px] text-gray-400 flex flex-col gap-2">
            <div className="flex justify-between border-b border-[#1e293b]/30 pb-2">
              <span className="text-brand-cyan">NODE_ID: SENTINEL_A7</span>
              <span>Uptime: 100% // Stable</span>
            </div>
            <div className="flex justify-between">
              <span>AUTHENTICATED AS: {userEmail.toUpperCase()}</span>
              <span className="text-brand-cyan">ROUTING: ROUTES-ENABLED (NO_HASH_LINKS)</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 border-t border-[#1e293b]/40 bg-[#070b14] flex items-center justify-between px-8 text-[9px] font-mono text-gray-500 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
          <span>ECON-SENTINEL FRONTEND SERVER v1.0.0</span>
        </div>
        <div>
          <span>SECURE ROUTING ENGINE ACTIVE</span>
        </div>
      </footer>
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

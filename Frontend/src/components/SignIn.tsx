/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  X,
  CheckCircle,
  LogIn,
  Key,
  Globe,
  Database
} from 'lucide-react';

interface SignInProps {
  onSignIn: (email: string) => void;
  showLogoutBanner: boolean;
  onCloseBanner: () => void;
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

export default function SignIn({ onSignIn, showLogoutBanner, onCloseBanner, onShowToast }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sign up simulation popup or inline message
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpOrg, setSignUpOrg] = useState('');

  // Password reset simulation
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleLocalSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Please specify your institutional email or username.');
      return;
    }
    if (!password) {
      setErrorMsg('Institutional passwords must not be bank.');
      return;
    }
    if (password.length < 4) {
      setErrorMsg('Provided password fails to meet the 4-character minimum.');
      return;
    }

    // Success simulation
    onShowToast(`AUTHORIZED SESSION: REGISTERED JWT TOKEN FOR ${email.toUpperCase()}`, 'success');
    onSignIn(email);
  };

  const handleSsoSignIn = () => {
    onShowToast('SSO HANDSHAKE INIT: SHUTTLING SECURITY CERTIFICATE...', 'success');
    setTimeout(() => {
      onShowToast('SSO HANDSHAKE COMPLETED: TOKEN ID AUTHENTICATED', 'success');
      onSignIn('sso-user@organization.int');
    }, 1200);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpEmail || !signUpOrg) return;
    onShowToast(`REQUEST LODGED: PROVISION CONTAINER CREATED FOR ${signUpOrg.toUpperCase()}`, 'success');
    setShowSignUpModal(false);
    setEmail(signUpEmail);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    onShowToast(`SECURITY HANDOFF: DISPATCHED RESET CONTAINER ENVELOPE TO ${resetEmail}`, 'success');
    setShowResetModal(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#070b14] flex flex-col items-center justify-center p-4 relative font-sans overflow-x-hidden selection:bg-brand-cyan selection:text-black select-none">
      
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00e0a5]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#0ea5e9]/3 rounded-full blur-[70px] pointer-events-none" />

      {/* Outer constraint */}
      <div className="w-full max-w-[480px] z-10 flex flex-col gap-6 items-center">
        
        {/* 1. DISMISSIBLE LOGOUT ALERT BANNER */}
        {showLogoutBanner && (
          <div
            id="auth-logout-banner"
            className="w-full border border-[#00e0a5]/20 bg-[#00e0a5]/5 text-[#00e0a5] rounded-xl px-4 py-3 flex items-center justify-between shadow-lg text-xs font-semibold animate-in fade-in duration-300"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle size={15} className="text-brand-cyan shrink-0" />
              <span>Session ended successfully. You have been securely signed out.</span>
            </div>
            <button
              onClick={onCloseBanner}
              className="text-brand-cyan/60 hover:text-white transition duration-150 cursor-pointer p-0.5 rounded hover:bg-[#00e0a5]/10"
              title="Close Notification"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* 2. BRAND LOGO HEADLINE COMPONENT */}
        <div className="text-center space-y-2 mt-4" id="brand-logo-panel">
          <div className="flex justify-center">
            {/* Custom high-fidelity glowing vector shield icon */}
            <div className="h-12 w-12 rounded-xl bg-[#00e0a5]/10 border border-[#00e0a5]/25 flex items-center justify-center text-brand-cyan shadow-[0_0_15px_rgba(0,224,165,0.15)] relative overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-cyan" />
              <Shield size={24} className="text-brand-cyan" />
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-extrabold tracking-wider text-white font-display">
              ECON-SENTINEL
            </h1>
            <p className="text-[10px] text-gray-500 font-mono tracking-[0.25em] uppercase pl-1">
              ECONOMIC INTELLIGENCE
            </p>
          </div>
        </div>

        {/* 3. CENTRAL SIGN IN CARD */}
        <div className="w-full bg-[#111625] border border-[#1e293b]/70 rounded-2xl p-8 shadow-2xl relative" id="auth-signin-card">
          
          <div className="space-y-1 mb-6 text-left">
            <h2 className="text-xl font-extrabold text-white font-display tracking-tight text-left">
              Institutional Sign In
            </h2>
            <p className="text-xs text-gray-400 font-sans">
              Access your economic intelligence dashboard
            </p>
          </div>

          {/* Validation Alert */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/25 text-red-400 text-xs rounded-xl font-mono text-left">
              ⚠ {errorMsg}
            </div>
          )}

          <form onSubmit={handleLocalSignIn} className="space-y-4.5 text-left">
            
            {/* EMAIL OR USERNAME FIELD */}
            <div className="space-y-1.5">
              <label className="text-[9.5px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                EMAIL OR USERNAME
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-xs select-none">
                  @
                </span>
                <input
                  type="text"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#070b14] border border-[#1e293b] hover:border-gray-600 focus:border-brand-cyan/60 rounded-xl pl-9 pr-4 py-3 text-xs font-semibold text-white transition focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            {/* PASSWORD FIELD WITH FORGOT GATE */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[9.5px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                  PASSWORD
                </label>
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-[9.5px] font-mono font-bold text-brand-cyan hover:underline hover:text-white transition cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock size={12} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#070b14] border border-[#1e293b] hover:border-gray-600 focus:border-brand-cyan/60 rounded-xl pl-9 pr-11 py-3 text-xs font-semibold tracking-wide text-white transition focus:outline-none focus:ring-0 font-mono"
                />
                
                {/* Visibility toggler */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition cursor-pointer p-1 rounded"
                >
                  {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>

            {/* REMEMBER DEVICE CONTROLLER */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                id="remember-device"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-brand-cyan h-4 w-4 bg-[#070b14] border-[#1e293b] rounded focus:ring-0 cursor-pointer"
              />
              <label htmlFor="remember-device" className="text-xs text-gray-400 font-sans cursor-pointer leading-none">
                Remember this device for 30 days
              </label>
            </div>

            {/* ACTION SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#00e0a5] hover:bg-[#3df2d1] hover:shadow-[0_0_15px_rgba(0,224,165,0.3)] text-[#070b14] font-extrabold rounded-xl text-xs font-sans transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                id="btn-auth-signin"
              >
                <span>SIGN IN</span>
                <LogIn size={14} className="stroke-[2.5]" />
              </button>
            </div>

          </form>

          {/* 4. INSTITUTIONAL SSO GATEWAY DIVIDER */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-x-0 h-[1px] bg-[#1e293b]/50" />
            <span className="relative px-3.5 bg-[#111625] text-gray-500 font-mono text-[9px] font-bold tracking-widest uppercase">
              INSTITUTIONAL SSO
            </span>
          </div>

          {/* Alternate SSO Provider */}
          <div>
            <button
              onClick={handleSsoSignIn}
              className="w-full py-2.5 bg-transparent border border-[#1e293b] hover:border-brand-cyan/50 hover:text-white text-gray-400 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 font-mono uppercase tracking-wider"
              id="btn-auth-sso"
            >
              <div className="h-4 w-4 bg-white/5 border border-white/10 rounded flex items-center justify-center shrink-0">
                <Key size={10} className="text-gray-400" />
              </div>
              <span>Sign in with SSO</span>
            </button>
          </div>

        </div>

        {/* 5. USER CONVERSION BOTTOM NAVIGATION */}
        <div className="text-center space-y-4">
          <p className="text-xs text-gray-400 font-sans">
            New to ECON-SENTINEL?{' '}
            <button
              onClick={() => {
                setSignUpEmail('');
                setSignUpOrg('');
                setShowSignUpModal(true);
              }}
              className="text-brand-cyan font-semibold hover:underline bg-transparent border-0 cursor-pointer p-0"
            >
              Create Account
            </button>
          </p>

          <div className="flex justify-center gap-6 text-[10px] font-mono text-gray-500 tracking-wider">
            <button
              onClick={() => onShowToast('RETRIEVING SECURITY LAWS & ISOC-G7 MANDATES...', 'info')}
              className="hover:text-white transition bg-transparent border-0 cursor-pointer"
            >
              SECURITY POLICY
            </button>
            <button
              onClick={() => onShowToast('READING PRIVACY DATA SCOPES...', 'info')}
              className="hover:text-white transition bg-transparent border-0 cursor-pointer"
            >
              PRIVACY
            </button>
            <button
              onClick={() => onShowToast('DESPATCHING CRYPTO PIN TO SENTINEL HELPDESK...', 'info')}
              className="hover:text-white transition bg-transparent border-0 cursor-pointer"
            >
              SUPPORT
            </button>
          </div>
        </div>

      </div>

      {/* MODAL 1: SIGN UP GATEWAY */}
      {showSignUpModal && (
        <div className="fixed inset-0 bg-[#070b14]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111625] border border-[#1e293b] rounded-xl w-full max-w-md p-6 relative space-y-4 animate-in zoom-in-95 duration-150 text-left">
            <div className="flex justify-between items-start pb-3 border-b border-[#1e293b]/40">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">Create Institutional Account</h3>
                <p className="text-[9px] text-gray-500 font-mono mt-0.5 uppercase">ROUTINE_SECURITY_VERIFY</p>
              </div>
              <button
                onClick={() => setShowSignUpModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer select-none border-0 bg-transparent p-0"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSignUpSubmit} className="space-y-4 text-xs font-sans text-left text-gray-300">
              <div className="space-y-1">
                <label className="block text-gray-400 font-bold uppercase text-[9px] tracking-wider">Corporate Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="analyst@organization.int"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  className="w-full bg-[#070b14] border border-[#1e293b] rounded-md px-3 py-2 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-gray-400 font-bold uppercase text-[9px] tracking-wider">Institution / Country Org</label>
                <input
                  type="text"
                  required
                  placeholder="G7 Central Intelligence Group"
                  value={signUpOrg}
                  onChange={(e) => setSignUpOrg(e.target.value)}
                  className="w-full bg-[#070b14] border border-[#1e293b] rounded-md px-3 py-2 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="p-3 bg-brand-cyan/5 border border-brand-cyan/25 rounded-lg text-[10px] leading-relaxed text-gray-400">
                ⚠ All sign ups must pass authorization through your agency or department administrator before storage access is activated.
              </div>

              <div className="pt-3 border-t border-[#1e293b]/40 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowSignUpModal(false)}
                  className="px-4 py-2 border border-[#1e293b] hover:border-gray-500 rounded text-gray-300 font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-cyan text-[#070b14] font-bold rounded transition cursor-pointer"
                >
                  Submit Agency Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: RESET PASSWORD */}
      {showResetModal && (
        <div className="fixed inset-0 bg-[#070b14]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111625] border border-[#1e293b] rounded-xl w-full max-w-md p-6 relative space-y-4 animate-in zoom-in-95 duration-150 text-left">
            <div className="flex justify-between items-start pb-3 border-b border-[#1e293b]/40">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">Forgot Password Recovery</h3>
                <p className="text-[9px] text-gray-500 font-mono mt-0.5 uppercase">DISPATCH_CYPHER_MFA</p>
              </div>
              <button
                onClick={() => setShowResetModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer select-none border-0 bg-transparent p-0"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleResetSubmit} className="space-y-4 text-xs font-sans text-left text-gray-300">
              <div className="space-y-1">
                <label className="block text-gray-400 font-bold uppercase text-[9px] tracking-wider">Registered Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full bg-[#070b14] border border-[#1e293b] rounded-md px-3 py-2 text-white focus:outline-none focus:border-brand-cyan font-mono"
                />
              </div>

              <div className="pt-3 border-t border-[#1e293b]/40 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 border border-[#1e293b] hover:border-gray-500 rounded text-gray-300 font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-cyan text-[#070b14] font-bold rounded transition cursor-pointer"
                >
                  Send Cypher Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

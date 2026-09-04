'use client';

import React, { useState, FormEvent } from 'react';

// ----------------------------------------------------------------------
// Type definitions
// ----------------------------------------------------------------------
type Role = 'LEA' | 'Citizen';
type LoginStatus = 'idle' | 'loading' | 'error' | 'success';

// ----------------------------------------------------------------------
// Inline SVG Icons (self-contained, no external dependencies)
// ----------------------------------------------------------------------
const ShieldIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const RadarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <line x1="12" y1="12" x2="12" y2="2" />
    <line x1="12" y1="12" x2="22" y2="12" />
  </svg>
);

const UserIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const AlertIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const MapPinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BrainIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5.7.5 1.2 1.3 1.5 2.2a4 4 0 0 1-6.5 4.1A4 4 0 0 1 3 14c0-1.2.5-2.3 1.3-3.1C4.2 9.3 4 8.4 4 7.5a4 4 0 0 1 4-4z" />
    <path d="M12 4c-.5 0-1 .1-1.5.3" />
    <path d="M12 8c-.5 0-1 .1-1.5.3" />
  </svg>
);

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
export default function CyberPehraLogin() {
  const [role, setRole] = useState<Role>('LEA');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formTouched, setFormTouched] = useState(false);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setFormTouched(false);
    setErrorMessage('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormTouched(true);
    if (!username.trim() || !password.trim()) {
      setLoginStatus('error');
      setErrorMessage('Please enter both username and password.');
      return;
    }
    setLoginStatus('loading');
    setErrorMessage('');
    // Simulate login delay (replace with real API call later)
    setTimeout(() => {
      // For demo: always success if fields non-empty
      setLoginStatus('success');
      // In real implementation, you'd call FastAPI endpoint here.
      // e.g., fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ role, username, password }) })
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-slate-200 flex flex-col">
      {/* Global styles for animations */}
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 100px 100px, 100px 100px; }
        }
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes dataFlow {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scanLine {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Background layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deep gradient - improved */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1330] via-[#091022] to-black" />
        {/* Animated grid overlay - softer */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 200, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 200, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
        {/* Subtle radial glow at top left */}
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-blue-500/5 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <RadarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">CYBERPEHRA</h1>
              <p className="text-xs text-slate-400 tracking-widest uppercase">Predictive Cyber Intelligence</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-medium tracking-wide">SYSTEM ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <LockIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-300 font-medium tracking-wide">SECURE CONNECTION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-slate-300 font-medium tracking-wide">INTELLIGENCE ENGINE ACTIVE</span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 flex flex-col lg:flex-row gap-8 px-6 py-8 lg:px-12 lg:py-12 max-w-7xl mx-auto w-full">
          {/* Left column: Hero + Visual */}
          <div className="flex-1 flex flex-col justify-center space-y-8">
            {/* Hero message */}
            <div className="space-y-4 animate-fadeInUp">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Predict <span className="text-cyan-400">Before</span>
                <br />
                It <span className="text-cyan-400">Happens</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-md">
                AI-powered prediction of cybercrime cash withdrawal hotspots, enabling proactive intervention.
              </p>
            </div>

            {/* Cyber intelligence visual: Radar + Mini indicators + Data flow */}
            <div className="space-y-6">
              {/* Radar and Mini indicators side by side */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Radar visualization */}
                <div className="relative w-64 h-64 mx-auto md:mx-0 shrink-0 animate-fadeInUp animation-delay-200">
                  {/* Radar background circle */}
                  <div className="absolute inset-0 rounded-full border border-cyan-500/20 bg-cyan-500/5 shadow-[0_0_30px_rgba(0,200,255,0.1)]" />
                  {/* Concentric rings */}
                  <div className="absolute inset-4 rounded-full border border-cyan-500/10" />
                  <div className="absolute inset-10 rounded-full border border-cyan-500/10" />
                  <div className="absolute inset-16 rounded-full border border-cyan-500/10" />
                  {/* Sweep line */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{ animation: 'radarSpin 4s linear infinite' }}
                  >
                    <div className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left bg-gradient-to-r from-cyan-400/40 to-transparent" />
                  </div>
                  {/* Predicted risk points (pulsing) */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  </div>
                  <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                    </span>
                  </div>
                  <div className="absolute bottom-1/4 left-2/3 -translate-x-1/2 translate-y-1/2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                  </div>
                  {/* Center dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,200,255,0.8)]" />
                  {/* Scanning line */}
                  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                    <div
                      className="absolute w-full h-0.5 bg-cyan-400/30 left-0"
                      style={{ animation: 'scanLine 3s linear infinite' }}
                    />
                  </div>
                </div>

                {/* Mini intelligence indicators - refined colors */}
                <div className="grid grid-cols-2 gap-3 flex-1 animate-fadeInUp animation-delay-300">
                  <div className="glass-card p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                    <BrainIcon className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-slate-400">AI Prediction</p>
                    <p className="text-sm font-semibold text-white">Active</p>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                    <RadarIcon className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-slate-400">Risk Analysis</p>
                    <p className="text-sm font-semibold text-white">Live</p>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                    <MapPinIcon className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-slate-400">GIS Hotspots</p>
                    <p className="text-sm font-semibold text-white">12 Detected</p>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                    <AlertIcon className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-slate-400">Real-Time Alerts</p>
                    <p className="text-sm font-semibold text-white">Enabled</p>
                  </div>
                </div>
              </div>

              {/* Data flow pipeline */}
              <div className="animate-fadeInUp animation-delay-400">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Intelligence Pipeline</p>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  {[
                    { label: 'Complaint Data', color: 'text-slate-300' },
                    { label: 'AI/ML Engine', color: 'text-purple-400' },
                    { label: 'Risk Score', color: 'text-amber-400' },
                    { label: 'Hotspot Prediction', color: 'text-cyan-400' },
                    { label: 'Actionable Intel', color: 'text-emerald-400' },
                    { label: 'Alert', color: 'text-red-400' },
                  ].map((step, idx) => (
                    <React.Fragment key={step.label}>
                      {idx > 0 && (
                        <div className="relative flex-1 min-w-[20px] max-w-[40px] h-px bg-gradient-to-r from-cyan-400/50 to-cyan-400/10">
                          <span
                            className="absolute top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full"
                            style={{
                              animation: `dataFlow 2s ease-in-out ${idx * 0.5}s infinite`,
                            }}
                          />
                        </div>
                      )}
                      <div className={`text-xs font-medium ${step.color} whitespace-nowrap`}>{step.label}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Login panel */}
          <div className="w-full lg:w-[420px] flex items-center justify-center animate-slideInRight">
            <div className="w-full max-w-md glass-card rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl shadow-black/50">
              <h2 className="text-2xl font-bold text-white mb-6">Secure Access</h2>

              {/* Role selection */}
              <div className="flex rounded-lg bg-slate-800/50 p-1 mb-6 border border-white/5">
                {(['LEA', 'Citizen'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleChange(r)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      role === r
                        ? 'bg-cyan-400/20 text-cyan-300 shadow-inner'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                    aria-pressed={role === r}
                  >
                    {r === 'LEA' ? 'LEA / Admin' : 'Citizen'}
                  </button>
                ))}
              </div>

              {/* Login form */}
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                  {/* Username field */}
                  <div className="relative group">
                    <label htmlFor="username" className="block text-xs font-medium text-slate-400 mb-1">
                      Username / Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400">
                        <UserIcon className="w-4 h-4" />
                      </span>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your ID"
                        className={`w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800/50 border text-white placeholder-slate-500 outline-none transition-all ${
                          formTouched && !username.trim()
                            ? 'border-red-500/70 focus:border-red-500'
                            : 'border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20'
                        }`}
                        aria-invalid={formTouched && !username.trim()}
                        aria-describedby="username-error"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="relative group">
                    <label htmlFor="password" className="block text-xs font-medium text-slate-400 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400">
                        <LockIcon className="w-4 h-4" />
                      </span>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className={`w-full pl-10 pr-12 py-3 rounded-lg bg-slate-800/50 border text-white placeholder-slate-500 outline-none transition-all ${
                          formTouched && !password.trim()
                            ? 'border-red-500/70 focus:border-red-500'
                            : 'border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20'
                        }`}
                        aria-invalid={formTouched && !password.trim()}
                        aria-describedby="password-error"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Error message */}
                  {errorMessage && (
                    <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2 animate-fadeInUp">
                      <AlertIcon className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Login button */}
                  <button
                    type="submit"
                    disabled={loginStatus === 'loading'}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loginStatus === 'loading' ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Authenticating...
                      </>
                    ) : loginStatus === 'success' ? (
                      'Access Granted'
                    ) : (
                      'Login to Secure Console'
                    )}
                  </button>
                </div>
              </form>

              <p className="text-xs text-slate-500 mt-6 text-center">
                Restricted access • Authorized personnel only
              </p>
            </div>
          </div>
        </main>

        <footer className="border-t border-white/5 py-4 px-6 text-center text-xs text-slate-600">
          CyberPehra • Predictive Cyber Intelligence Platform • &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
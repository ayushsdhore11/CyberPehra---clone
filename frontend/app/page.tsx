'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
interface IconProps {
  className?: string;
}

const RadarIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    <line x1="12" y1="12" x2="12" y2="2" /><line x1="12" y1="12" x2="22" y2="12" />
  </svg>
);

const UserIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const AlertIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const MapPinIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const BrainIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5.7.5 1.2 1.3 1.5 2.2a4 4 0 0 1-6.5 4.1A4 4 0 0 1 3 14c0-1.2.5-2.3 1.3-3.1C4.2 9.3 4 8.4 4 7.5a4 4 0 0 1 4-4z" />
  </svg>
);

const ActivityIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ShieldAlertIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ShieldCheckIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
  </svg>
);

const CrosshairIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" />
  </svg>
);

type Role = 'LEA' | 'Citizen';
type LoginStatus = 'idle' | 'loading' | 'error' | 'success';

export default function CyberPehraLogin() {
  const router = useRouter();

  const [role, setRole] = useState<Role>('LEA');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formTouched, setFormTouched] = useState(false);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setErrorMessage('');
    setFormTouched(false);
    setLoginStatus('idle');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setFormTouched(true);
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setLoginStatus('error');
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setLoginStatus('loading');

    setTimeout(() => {
      localStorage.setItem('cyberpehra_role', role);
      localStorage.setItem('cyberpehra_user', username.trim());
      localStorage.setItem('cyberpehra_authenticated', 'true');

      setLoginStatus('success');

      router.push('/dashboard');
    }, 1000);
  };

  const isSecurePortal = role === 'LEA';

  return (
    <div className={`min-h-screen flex flex-col ${isSecurePortal ? 'cyber-grid-secure' : 'cyber-grid'} transition-colors duration-500`}>
      {/* TOP SYSTEM TELEMETRY STRIP */}
      <div className="border-b border-cyan-500/10 bg-slate-950/70 backdrop-blur-md px-6 py-1.5 flex items-center justify-between text-[11px] font-mono tracking-wider text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            CYBERPEHRA INTELLIGENCE GRID v2.4
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">NODE: MUMBAI-WEST-CORE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <ShieldCheckIcon className="w-3.5 h-3.5" /> SECURE SHIELD ACTIVE
          </span>
          <span className="hidden md:inline text-slate-500">AES-256-GCM ENCRYPTED</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-cyan-500/15 bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 shadow-lg shadow-cyan-500/20">
            <RadarIcon className="w-6 h-6 text-cyan-400 animate-pulse-glow" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white leading-none">
                CyberPehra
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 uppercase tracking-widest font-bold">
                SIH EDITION
              </span>
            </div>
            <p className="text-xs text-slate-400 tracking-wider font-mono mt-0.5">
              Predictive Cybercrime Defense Matrix
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold">Grid Online</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <LockIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>SSL Terminated</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <ActivityIcon className="w-3.5 h-3.5" />
            <span>AI Risk Engine Active</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 px-6 py-10 lg:px-14 lg:py-14 max-w-7xl mx-auto w-full">
        {/* LEFT COLUMN - HERO & INTELLIGENCE RADAR */}
        <div className="flex-1 flex flex-col justify-center space-y-9 animate-fadeInUp w-full">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider shadow-sm shadow-cyan-500/20">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              NEXT-GEN CYBERCRIME HOTSPOT FORECASTING
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Predict <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">Before</span>
              <br />
              It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">Happens</span>
            </h2>

            <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
              AI-driven intelligence computing illicit mule cash withdrawal vectors and geographic extraction clusters — equipping law enforcement with proactive interception capabilities.
            </p>
          </div>

          {/* RADAR & THREAT SURVEILLANCE VISUAL WIDGET */}
          <div className="card p-5 border border-cyan-500/20 bg-slate-900/60 backdrop-blur-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <CrosshairIcon className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Live Geospatial Hotspot Sensor
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                SWEEP: 360° ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Animated Radar Circle */}
              <div className="relative w-44 h-44 mx-auto md:mx-0 rounded-full border border-cyan-500/30 bg-slate-950/80 flex items-center justify-center overflow-hidden shadow-inner shadow-cyan-500/20">
                {/* Concentric rings */}
                <div className="absolute inset-3 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-7 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-12 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-16 rounded-full border border-cyan-500/30" />
                
                {/* Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-[1px] bg-cyan-500/20" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="h-full w-[1px] bg-cyan-500/20" />
                </div>

                {/* Rotating Sweep Beam */}
                <div
                  className="absolute inset-0 origin-center animate-radar-sweep pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(0, 229, 255, 0.4) 0deg, rgba(0, 229, 255, 0) 65deg, transparent 360deg)',
                  }}
                />

                {/* Threat Detection Pings */}
                <div className="absolute top-10 right-12 w-2.5 h-2.5 rounded-full bg-red-500 shadow-md shadow-red-500">
                  <span className="absolute -inset-1 rounded-full bg-red-500 animate-ping opacity-75" />
                </div>
                <div className="absolute bottom-11 left-10 w-2 h-2 rounded-full bg-amber-400 shadow-md shadow-amber-400">
                  <span className="absolute -inset-1 rounded-full bg-amber-400 animate-ping opacity-60" />
                </div>
                <div className="absolute top-16 left-12 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400" />

                {/* Center Node */}
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 z-10 border border-slate-900 shadow-sm shadow-cyan-400" />
              </div>

              {/* Live Telemetry Info */}
              <div className="md:col-span-2 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">RADAR FREQUENCY:</span>
                  <span className="text-cyan-400 font-semibold">9.4 GHz X-BAND</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">DETECTED HOTSPOTS:</span>
                  <span className="text-red-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" /> 3 HIGH-RISK VECTORS
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">MODEL INFERENCE:</span>
                  <span className="text-emerald-400 font-semibold">RANDOM FOREST 96.4% ACC</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">PRIMARY LAT/LNG:</span>
                  <span className="text-slate-200">19.0760° N, 72.8777° E</span>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-2 gap-4 max-w-xl">
            <div className="card card-hover card-accent-cyan p-4.5 group">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BrainIcon className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-sm font-bold text-white tracking-wide">AI Prediction</p>
              <p className="text-xs text-slate-400 mt-1">Multi-factor cashout risk inference engine</p>
            </div>

            <div className="card card-hover card-accent-green p-4.5 group">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <MapPinIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-sm font-bold text-white tracking-wide">GIS Hotspots</p>
              <p className="text-xs text-slate-400 mt-1">Geospatial density clustering & mapping</p>
            </div>

            <div className="card card-hover card-accent-amber p-4.5 group">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ActivityIcon className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-sm font-bold text-white tracking-wide">Mule Forensics</p>
              <p className="text-xs text-slate-400 mt-1">Velocity & withdrawal hop analysis</p>
            </div>

            <div className="card card-hover card-accent-red p-4.5 group">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ShieldAlertIcon className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-sm font-bold text-white tracking-wide">LEA Intercept</p>
              <p className="text-xs text-slate-400 mt-1">Instant tactical dispatch alerts</p>
            </div>
          </div>

          {/* INTELLIGENCE PIPELINE */}
          <div>
            <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Autonomous Defense Pipeline
            </p>
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              {[
                { label: 'Incident Ingestion', color: 'text-slate-300', bg: 'bg-slate-800/80 border-slate-700' },
                { label: 'AI/ML Evaluation', color: 'text-cyan-400', bg: 'bg-cyan-950/40 border-cyan-500/40' },
                { label: 'Risk Vector', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-500/40' },
                { label: 'GIS Hotspot', color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-500/40' },
                { label: 'Actionable Intel', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-500/40' },
                { label: 'LEA Dispatch', color: 'text-red-400', bg: 'bg-red-950/40 border-red-500/40' },
              ].map((item, index) => (
                <React.Fragment key={item.label}>
                  {index > 0 && (
                    <span className="text-cyan-500/40 text-xs font-mono">→</span>
                  )}
                  <span className={`px-2.5 py-1 rounded border text-xs font-semibold ${item.color} ${item.bg}`}>
                    {item.label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - AUTHENTICATION CONSOLE */}
        <div className="w-full lg:w-[440px] flex items-center justify-center animate-slideInRight">
          <div className={`w-full max-w-md card p-8 backdrop-blur-2xl transition-all duration-300 ${
            isSecurePortal 
              ? 'border-red-500/30 shadow-2xl shadow-red-950/40' 
              : 'border-cyan-500/30 shadow-2xl shadow-cyan-950/40'
          }`}>
            {/* BADGE / CLASSIFICATION HEADER */}
            <div className="flex items-center justify-between mb-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                isSecurePortal
                  ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-md shadow-red-500/20'
                  : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-md shadow-cyan-500/20'
              }`}>
                <LockIcon className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${
                  isSecurePortal
                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                    : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                }`}>
                  {isSecurePortal ? 'RESTRICTED ACCESS' : 'PUBLIC INTERFACE'}
                </span>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  SECURITY CLEARANCE: {isSecurePortal ? 'LEVEL-3 LEA' : 'LEVEL-1 PUBLIC'}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-1 tracking-tight">
              Console Authentication
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Enter credentials to initialize operational session
            </p>

            {/* PORTAL SELECTOR TABS */}
            <div className="flex rounded-xl bg-slate-950/80 p-1 mb-6 border border-white/10">
              {(['LEA', 'Citizen'] as Role[]).map((item) => {
                const isSelected = role === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleRoleChange(item)}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? item === 'LEA'
                          ? 'bg-gradient-to-r from-red-600/30 to-red-500/20 text-red-300 border border-red-500/40 shadow-sm shadow-red-500/20'
                          : 'bg-gradient-to-r from-cyan-600/30 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? (item === 'LEA' ? 'bg-red-400' : 'bg-cyan-400') : 'bg-slate-600'
                    }`} />
                    {item === 'LEA' ? 'SECURE PORTAL (LEA)' : 'WEB / PORTAL'}
                  </button>
                );
              })}
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                {/* USERNAME */}
                <div>
                  <label htmlFor="username" className="label-text">
                    {isSecurePortal ? 'Officer ID / Badge Number' : 'Citizen / Agent Email'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <UserIcon className="w-4 h-4" />
                    </span>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={isSecurePortal ? 'e.g. LEA-OFFICER-409' : 'e.g. agent@cybercell.gov'}
                      className={`input-field pl-10 font-mono text-sm ${
                        formTouched && !username.trim() ? 'border-red-500 focus:border-red-500' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label htmlFor="password" className="label-text">
                    Access Passcode / Token
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <LockIcon className="w-4 h-4" />
                    </span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter security key"
                      className={`input-field pl-10 pr-10 font-mono text-sm ${
                        formTouched && !password.trim() ? 'border-red-500 focus:border-red-500' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* ERROR NOTIFICATION */}
                {errorMessage && (
                  <div className="flex items-center gap-2.5 text-xs text-red-300 bg-red-950/40 border border-red-500/40 rounded-lg p-3 animate-fadeIn">
                    <AlertIcon className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loginStatus === 'loading'}
                  className={`w-full h-12 mt-2 ${
                    isSecurePortal ? 'btn-danger' : 'btn-primary'
                  }`}
                >
                  {loginStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Verifying Clearance...
                    </>
                  ) : (
                    `Authenticate to ${isSecurePortal ? 'Secure Command' : 'Web Console'}`
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-white/5 text-center">
              <p className="text-[10px] font-mono text-slate-500">
                Authorized Law Enforcement & Registered Analysts Only
              </p>
              <p className="text-[9px] font-mono text-slate-600 mt-1">
                UNAUTHORIZED ACCESS ATTEMPTS ARE LOGGED & PROSECUTED UNDER IT ACT
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-cyan-500/10 py-4 px-6 text-center text-xs font-mono text-slate-500 bg-slate-950/80">
        CyberPehra • Predictive Cybercrime Defense Platform • SIH Control-Room Edition • ©{' '}
        {new Date().getFullYear()}
      </footer>
    </div>
  );
}

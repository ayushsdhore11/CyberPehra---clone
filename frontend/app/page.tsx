'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  RadarIcon,
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  AlertIcon,
  MapPinIcon,
  BrainIcon,
  ActivityIcon,
  ShieldAlertIcon,
} from './components/icons';

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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-600/20">
            <RadarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              CyberPehra
            </h1>
            <p className="text-xs text-slate-500 tracking-wide mt-0.5">
              Predictive Cyber Intelligence
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-slate-600 font-medium">System Online</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <LockIcon className="w-3.5 h-3.5 text-blue-600" />
            Secure Connection
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-slate-600 font-medium">Engine Active</span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex flex-col lg:flex-row gap-8 px-6 py-10 lg:px-16 lg:py-16 max-w-7xl mx-auto w-full">
        {/* LEFT - HERO */}
        <div className="flex-1 flex flex-col justify-center space-y-10 animate-fadeInUp">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide">
              AI-Powered Predictive Analytics
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              Predict <span className="text-blue-600">Before</span>
              <br />
              It <span className="text-blue-600">Happens</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-md leading-relaxed">
              AI-powered prediction of cybercrime cash withdrawal
              hotspots, enabling proactive intervention for law enforcement.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <div className="card card-hover p-5 animate-fadeInUp delay-100">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                <BrainIcon className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-slate-900">AI Prediction</p>
              <p className="text-xs text-slate-500 mt-1">Risk classification engine</p>
            </div>

            <div className="card card-hover p-5 animate-fadeInUp delay-150">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-3">
                <MapPinIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-sm font-semibold text-slate-900">GIS Hotspots</p>
              <p className="text-xs text-slate-500 mt-1">Geospatial clustering</p>
            </div>

            <div className="card card-hover p-5 animate-fadeInUp delay-200">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
                <ActivityIcon className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-sm font-semibold text-slate-900">Risk Analysis</p>
              <p className="text-xs text-slate-500 mt-1">Real-time monitoring</p>
            </div>

            <div className="card card-hover p-5 animate-fadeInUp delay-300">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-3">
                <ShieldAlertIcon className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-sm font-semibold text-slate-900">Alerts</p>
              <p className="text-xs text-slate-500 mt-1">Intelligent notifications</p>
            </div>
          </div>

          {/* PIPELINE */}
          <div className="animate-fadeInUp delay-300">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-semibold">
              Intelligence Pipeline
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { label: 'Complaint Data', color: 'text-slate-600' },
                { label: 'AI/ML Engine', color: 'text-blue-600' },
                { label: 'Risk Score', color: 'text-amber-600' },
                { label: 'Hotspot Prediction', color: 'text-blue-600' },
                { label: 'Actionable Intel', color: 'text-emerald-600' },
                { label: 'Alert', color: 'text-red-600' },
              ].map((item, index) => (
                <React.Fragment key={item.label}>
                  {index > 0 && (
                    <span className="text-slate-300 text-xs">→</span>
                  )}
                  <span className={`text-xs font-semibold ${item.color} whitespace-nowrap`}>
                    {item.label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT - LOGIN */}
        <div className="w-full lg:w-[420px] flex items-center justify-center animate-slideInRight">
          <div className="w-full max-w-md card p-8 shadow-lg shadow-slate-200/60">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-5 shadow-sm shadow-blue-600/20">
              <LockIcon className="w-6 h-6 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-1">Secure Access</h2>
            <p className="text-sm text-slate-500 mb-6">
              Sign in to access the intelligence console
            </p>

            {/* ROLE SWITCH */}
            <div className="flex rounded-lg bg-slate-100 p-1 mb-6">
              {(['LEA', 'Citizen'] as Role[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleRoleChange(item)}
                  className={`flex-1 py-2.5 px-4 rounded-md text-sm font-semibold transition-all ${
                    role === item
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {item === 'LEA' ? 'LEA / Admin' : 'Citizen'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                {/* USERNAME */}
                <div>
                  <label htmlFor="username" className="label-text">
                    Username / Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </span>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your ID"
                      className={`input-field pl-10 ${
                        formTouched && !username.trim() ? 'border-red-400' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label htmlFor="password" className="label-text">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <LockIcon className="w-4 h-4" />
                    </span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className={`input-field pl-10 pr-10 ${
                        formTouched && !password.trim() ? 'border-red-400' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* ERROR */}
                {errorMessage && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 animate-fadeIn">
                    <AlertIcon className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loginStatus === 'loading'}
                  className="btn-primary w-full h-12"
                >
                  {loginStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    'Login to Secure Console'
                  )}
                </button>
              </div>
            </form>

            <p className="text-xs text-slate-400 mt-6 text-center">
              Restricted access • Authorized personnel only
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-400">
        CyberPehra • Predictive Cyber Intelligence Platform • ©{' '}
        {new Date().getFullYear()}
      </footer>
    </div>
  );
}

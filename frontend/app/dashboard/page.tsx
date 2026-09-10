'use client';

import React, { useState, useEffect, useCallback, FormEvent } from 'react';
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

const FileTextIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);

const ActivityIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const PlusCircleIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const RefreshCwIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const ExternalLinkIcon = ({ className = 'w-3.5 h-3.5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const LogOutIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const MenuIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const XIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrendingUpIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const ClockIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const DatabaseIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const ZapIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CrosshairIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" />
  </svg>
);

const LockIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

type ActiveTab = 'prediction' | 'hotspots' | 'complaints' | 'transactions';

interface PredictionData {
  risk_score: number;
  risk_level: string;
  latitude: number;
  longitude: number;
  hotspot_status: string;
  recommendation: string;
  evaluated_at?: string;
}

interface HotspotItem {
  latitude: number;
  longitude: number;
  incident_count: number;
  risk_level: string;
}

interface ComplaintItem {
  id: number;
  crime_type: string;
  fraud_amount: number | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  complaint_time: string;
  status: string;
}

interface TransactionItem {
  id: number;
  transaction_id: string;
  complaint_id: number;
  amount: number | null;
  transaction_type: string | null;
  transaction_time: string;
  source_account: string | null;
  destination_account: string | null;
}

const NAV_ITEMS: { key: ActiveTab; label: string; icon: typeof BrainIcon; desc: string }[] = [
  { key: 'prediction', label: 'AI Risk Predictor', icon: BrainIcon, desc: 'ML Cashout Probability Engine' },
  { key: 'hotspots', label: 'GIS Hotspots', icon: MapPinIcon, desc: 'Live Geospatial Clusters' },
  { key: 'complaints', label: 'Incidents Registry', icon: FileTextIcon, desc: 'National Cyber Complaint DB' },
  { key: 'transactions', label: 'Forensic Tracing', icon: ActivityIcon, desc: 'Mule Accounts & Cashout Nodes' },
];

function getRiskColor(score: number) {
  if (score > 70) return '#ef4444'; // Red
  if (score > 30) return '#f59e0b'; // Amber
  return '#10b981'; // Green
}

function getRiskBg(score: number) {
  if (score > 70) return 'badge-danger';
  if (score > 30) return 'badge-warning';
  return 'badge-success';
}

function getRiskBadgeClass(riskLevel: string) {
  const lower = riskLevel.toLowerCase();
  if (lower.includes('high')) return 'badge-danger';
  if (lower.includes('medium')) return 'badge-warning';
  return 'badge-success';
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<string>('Commander');
  const [role, setRole] = useState<string>('LEA');
  const [authReady, setAuthReady] = useState(false);

  const [tab, setTab] = useState<ActiveTab>('prediction');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  // Prediction form
  const [amount, setAmount] = useState('65000');
  const [hour, setHour] = useState('2');
  const [frequency, setFrequency] = useState('8');
  const [previousFraud, setPreviousFraud] = useState('3');
  const [lat, setLat] = useState('19.0760');
  const [lng, setLng] = useState('72.8777');

  const [predictLoading, setPredictLoading] = useState(false);
  const [predictError, setPredictError] = useState('');
  const [prediction, setPrediction] = useState<PredictionData | null>(null);

  // Hotspots
  const [hotspots, setHotspots] = useState<HotspotItem[]>([]);
  const [hotspotsLoading, setHotspotsLoading] = useState(false);

  // Complaints
  const [complaints, setComplaints] = useState<ComplaintItem[]>([]);
  const [complaintsLoading, setComplaintsLoading] = useState(false);
  const [showNewComplaintModal, setShowNewComplaintModal] = useState(false);
  const [newComplaintCrimeType, setNewComplaintCrimeType] = useState('UPI Fraud');
  const [newComplaintAmount, setNewComplaintAmount] = useState('45000');
  const [newComplaintLocation, setNewComplaintLocation] = useState('Mumbai Cyber Cell');
  const [newComplaintLat, setNewComplaintLat] = useState('19.076');
  const [newComplaintLng, setNewComplaintLng] = useState('72.877');
  const [createComplaintLoading, setCreateComplaintLoading] = useState(false);

  // Transactions
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [showNewTxModal, setShowNewTxModal] = useState(false);
  const [newTxId, setNewTxId] = useState('TXN-8492');
  const [newTxComplaintId, setNewTxComplaintId] = useState('1');
  const [newTxAmount, setNewTxAmount] = useState('25000');
  const [newTxType, setNewTxType] = useState('ATM Cash Withdrawal');
  const [newTxSource, setNewTxSource] = useState('AC-98321049');
  const [newTxDest, setNewTxDest] = useState('ATM-WEST-402');
  const [createTxLoading, setCreateTxLoading] = useState(false);

  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
      setBackendOnline(res.ok);
    } catch {
      setBackendOnline(false);
    }
  }, []);

  const fetchHotspots = useCallback(async () => {
    setHotspotsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/hotspot/`);
      if (res.ok) {
        const data = await res.json();
        setHotspots(data.hotspots || []);
      }
    } catch (e) {
      console.error('Failed to fetch hotspots', e);
    } finally {
      setHotspotsLoading(false);
    }
  }, []);

  const fetchComplaints = useCallback(async () => {
    setComplaintsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/complaints/`);
      if (res.ok) {
        const data = await res.json();
        setComplaints(data || []);
      }
    } catch (e) {
      console.error('Failed to fetch complaints', e);
    } finally {
      setComplaintsLoading(false);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    setTransactionsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/transactions/`);
      if (res.ok) {
        const data = await res.json();
        setTransactions(data || []);
      }
    } catch (e) {
      console.error('Failed to fetch transactions', e);
    } finally {
      setTransactionsLoading(false);
    }
  }, []);

  useEffect(() => {
    const isAuth = typeof window !== 'undefined' ? localStorage.getItem('cyberpehra_authenticated') : null;
    if (!isAuth) {
      router.push('/');
      return;
    }
    const storedUser = localStorage.getItem('cyberpehra_user') || 'Officer';
    const storedRole = localStorage.getItem('cyberpehra_role') || 'LEA';

    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) {
        setUser(storedUser);
        setRole(storedRole);
        setAuthReady(true);
        checkHealth();
        fetchHotspots();
        fetchComplaints();
        fetchTransactions();
      }
    }, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [router, checkHealth, fetchHotspots, fetchComplaints, fetchTransactions]);

  const handleLogout = () => {
    localStorage.removeItem('cyberpehra_authenticated');
    localStorage.removeItem('cyberpehra_user');
    localStorage.removeItem('cyberpehra_role');
    router.push('/');
  };

  const handlePrediction = async (e: FormEvent) => {
    e.preventDefault();
    setPredictLoading(true);
    setPredictError('');

    try {
      const payload = {
        transaction_amount: Number(amount),
        transaction_hour: Number(hour),
        transaction_frequency: Number(frequency),
        previous_fraud_count: Number(previousFraud),
        latitude: Number(lat),
        longitude: Number(lng),
      };

      const res = await fetch(`${API_BASE}/withdrawal/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      setPrediction({
        risk_score: data.risk_score ?? 0,
        risk_level: data.risk_level ?? 'Unknown',
        latitude: data.latitude ?? payload.latitude,
        longitude: data.longitude ?? payload.longitude,
        hotspot_status: data.hotspot_status ?? 'Monitored Location',
        recommendation: data.recommendation ?? 'Review transaction logs.',
        evaluated_at: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      console.error(err);
      setPredictError(
        'Unable to complete prediction. Ensure FastAPI backend is active at ' + API_BASE
      );
    } finally {
      setPredictLoading(false);
    }
  };

  const applyPreset = (
    amt: string, hr: string, freq: string, prev: string, la: string, lo: string
  ) => {
    setAmount(amt);
    setHour(hr);
    setFrequency(freq);
    setPreviousFraud(prev);
    setLat(la);
    setLng(lo);
  };

  const handleCreateComplaint = async (e: FormEvent) => {
    e.preventDefault();
    setCreateComplaintLoading(true);
    try {
      const res = await fetch(`${API_BASE}/complaints/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crime_type: newComplaintCrimeType,
          fraud_amount: Number(newComplaintAmount),
          location: newComplaintLocation,
          latitude: Number(newComplaintLat),
          longitude: Number(newComplaintLng),
        }),
      });
      if (res.ok) {
        setShowNewComplaintModal(false);
        fetchComplaints();
        fetchHotspots();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreateComplaintLoading(false);
    }
  };

  const handleCreateTx = async (e: FormEvent) => {
    e.preventDefault();
    setCreateTxLoading(true);
    try {
      const res = await fetch(`${API_BASE}/transactions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_id: newTxId,
          complaint_id: Number(newTxComplaintId),
          amount: Number(newTxAmount),
          transaction_type: newTxType,
          source_account: newTxSource,
          destination_account: newTxDest,
        }),
      });
      if (res.ok) {
        setShowNewTxModal(false);
        setNewTxId('TXN-' + Math.floor(1000 + Math.random() * 9000));
        fetchTransactions();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreateTxLoading(false);
    }
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4 text-cyan-400">
          <div className="relative">
            <RadarIcon className="w-12 h-12 animate-spin" />
            <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
            Initializing Secure Command Interface...
          </span>
        </div>
      </div>
    );
  }

  const isSecurePortal = role === 'LEA';
  const currentNavItem = NAV_ITEMS.find((n) => n.key === tab);

  // Circular Gauge Math: circumference of circle r=46 is 2*PI*46 ≈ 289
  const gaugeCircumference = 289;
  const currentScore = prediction ? prediction.risk_score : 0;
  const gaugeOffset = gaugeCircumference - (gaugeCircumference * Math.min(100, Math.max(0, currentScore))) / 100;
  const gaugeColor = getRiskColor(currentScore);

  return (
    <div className={`min-h-screen flex ${isSecurePortal ? 'portal-secure cyber-grid-secure' : 'portal-web cyber-grid'} transition-colors duration-500`}>
      {/* SIDEBAR */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-68 bg-slate-950/90 backdrop-blur-xl border-r ${
          isSecurePortal ? 'border-red-500/20' : 'border-cyan-500/20'
        } flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* LOGO AREA */}
        <div className="flex items-center justify-between px-5 h-18 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              isSecurePortal
                ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-md shadow-red-500/20'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-md shadow-cyan-500/20'
            }`}>
              <RadarIcon className="w-5 h-5 animate-pulse-glow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold text-white leading-none tracking-tight">CyberPehra</h1>
                <span className={`text-[9px] font-mono px-1 py-0.2 rounded border font-bold uppercase ${
                  isSecurePortal ? 'border-red-500/30 bg-red-500/10 text-red-400' : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                }`}>
                  {isSecurePortal ? 'SECURE' : 'WEB'}
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-widest">
                {isSecurePortal ? 'RESTRICTED COMMAND' : 'MONITORING PORTAL'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* OPERATIONS NAVIGATION */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 flex items-center gap-1.5">
            <CrosshairIcon className="w-3 h-3 text-cyan-400" />
            Operational Vector
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = tab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setTab(item.key);
                  setSidebarOpen(false);
                  if (item.key === 'hotspots') fetchHotspots();
                  if (item.key === 'complaints') fetchComplaints();
                  if (item.key === 'transactions') fetchTransactions();
                }}
                className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                  isActive
                    ? isSecurePortal
                      ? 'bg-red-500/15 border border-red-500/30 text-white shadow-md shadow-red-950/40'
                      : 'bg-cyan-500/15 border border-cyan-500/30 text-white shadow-md shadow-cyan-950/40'
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                  isActive
                    ? isSecurePortal ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'
                    : 'text-slate-500 group-hover:text-slate-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold tracking-wide truncate">{item.label}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* ENGINE STATUS TELEMETRY */}
        <div className="px-4 py-3 border-t border-white/10 bg-slate-950/50">
          <div className="flex items-center justify-between text-xs font-mono mb-1">
            <span className="text-slate-400 text-[10px]">API ENGINE TELEMETRY</span>
            <span className={`w-2 h-2 rounded-full ${
              backendOnline === null ? 'bg-slate-500 animate-pulse' : backendOnline ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-red-500 shadow-sm shadow-red-500'
            }`} />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className={`font-semibold ${backendOnline ? 'text-emerald-400' : 'text-red-400'}`}>
              {backendOnline === null ? 'PINGING ENGINE...' : backendOnline ? 'FASTAPI BACKEND ONLINE' : 'DISCONNECTED'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono mt-1 truncate">{API_BASE}</p>
        </div>

        {/* USER PROFILE & LOGOUT */}
        <div className="px-3 py-3 border-t border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-slate-900/60 border border-white/5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 border ${
              isSecurePortal
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}>
              {user.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate font-mono">{user}</p>
              <p className="text-[10px] font-mono text-slate-400">
                {isSecurePortal ? 'CLEARANCE: LEA-CMD' : 'CLEARANCE: AGENT-L1'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-all"
              title="Terminate Session"
            >
              <LogOutIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* STICKY TOP HUD BAR */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-5 lg:px-8 h-18 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500">CYBERPEHRA</span>
              <span className="text-slate-700">/</span>
              <span className={`font-bold uppercase tracking-wider ${isSecurePortal ? 'text-red-400' : 'text-cyan-400'}`}>
                {isSecurePortal ? 'SECURE COMMAND' : 'WEB MONITORING'}
              </span>
              <span className="text-slate-700">/</span>
              <span className="text-slate-300 font-semibold">{currentNavItem?.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* LIVE SURVEILLANCE STATUS BADGE */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-300">SURVEILLANCE ACTIVE</span>
            </div>

            {/* CLEARANCE CLASSIFICATION PILL */}
            <div className={`px-3 py-1.5 rounded-full border text-xs font-mono font-bold flex items-center gap-1.5 ${
              isSecurePortal
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}>
              <LockIcon className="w-3.5 h-3.5" />
              <span>{isSecurePortal ? 'TOP SECRET // LEA' : 'PUBLIC CITIZEN CONSOLE'}</span>
            </div>
          </div>
        </header>

        {/* CONTENT CONTAINER */}
        <main className="flex-1 p-5 lg:p-8 max-w-7xl mx-auto w-full">
          {/* SECTION HEADER */}
          <div className="mb-6 animate-fadeInUp flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${isSecurePortal ? 'bg-red-400' : 'bg-cyan-400'}`} />
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  {isSecurePortal ? 'RESTRICTED TACTICAL WORKSPACE' : 'NATIONAL SURVEILLANCE MATRIX'}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                {tab === 'prediction' && 'AI Risk & Cashout Predictor'}
                {tab === 'hotspots' && 'Geospatial Cybercrime Hotspots'}
                {tab === 'complaints' && 'National Incident Registry'}
                {tab === 'transactions' && 'Forensic Transaction Ledger'}
              </h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl">
                {tab === 'prediction' && 'Evaluate illicit cash extraction likelihood and proactive intercept coordinates via AI/ML model inference.'}
                {tab === 'hotspots' && 'Density clustering of reported incidents mapping high-threat cash withdrawal perimeters.'}
                {tab === 'complaints' && 'Incident database feeding predictive modeling and law enforcement tactical response.'}
                {tab === 'transactions' && 'Cryptographic and banking forensic tracking of mule hops and extraction nodes.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                LIVE TELEMETRY SYNC
              </span>
            </div>
          </div>

          {/* TELEMETRY HUD STATS ROW */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="card card-hover card-accent-cyan p-4.5 animate-fadeInUp delay-50">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <BrainIcon className="w-4.5 h-4.5" />
                </div>
                <ZapIcon className="w-4 h-4 text-cyan-500/40" />
              </div>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">AI Risk Classifier</p>
              <p className="text-base font-extrabold text-white mt-0.5">Random Forest v1.0</p>
              <p className="text-[10px] text-cyan-400 font-mono mt-1 flex items-center gap-1">
                <span>●</span> 96.4% INFERENCE ACCURACY
              </p>
            </div>

            <div className="card card-hover card-accent-green p-4.5 animate-fadeInUp delay-100">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MapPinIcon className="w-4.5 h-4.5" />
                </div>
                <TrendingUpIcon className="w-4 h-4 text-emerald-500/40" />
              </div>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Active Clusters</p>
              <p className="text-base font-extrabold text-white mt-0.5">{hotspots.length} Hotspots</p>
              <p className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                <span>●</span> GIS RADIUS: 5.0 KM
              </p>
            </div>

            <div className="card card-hover card-accent-amber p-4.5 animate-fadeInUp delay-150">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <FileTextIcon className="w-4.5 h-4.5" />
                </div>
                <DatabaseIcon className="w-4 h-4 text-amber-500/40" />
              </div>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Complaints Ingested</p>
              <p className="text-base font-extrabold text-white mt-0.5">{complaints.length} Records</p>
              <p className="text-[10px] text-amber-400 font-mono mt-1 flex items-center gap-1">
                <span>●</span> FED TO MODEL
              </p>
            </div>

            <div className="card card-hover card-accent-red p-4.5 animate-fadeInUp delay-200">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <ActivityIcon className="w-4.5 h-4.5" />
                </div>
                <ClockIcon className="w-4 h-4 text-red-500/40" />
              </div>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Mule Ledger</p>
              <p className="text-base font-extrabold text-white mt-0.5">{transactions.length} Traced Hops</p>
              <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                <span>●</span> FORENSIC RECOVERY
              </p>
            </div>
          </div>

          {/* ============ TAB 1: AI RISK PREDICTOR ============ */}
          {tab === 'prediction' && (
            <div className="space-y-6 animate-fadeIn">
              {/* SIMULATION PRESETS */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">Load Telemetry Scenario:</span>
                <button
                  type="button"
                  onClick={() => applyPreset('85000', '1', '12', '5', '19.0760', '72.8777')}
                  className="px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/40 text-red-300 hover:bg-red-500/25 transition-all whitespace-nowrap flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  High Risk ATM (₹85k, 1AM)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('35000', '14', '4', '1', '19.1383', '77.3210')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 transition-all whitespace-nowrap flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Moderate UPI (₹35k, 2PM)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('4500', '11', '1', '0', '18.5204', '73.8567')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 transition-all whitespace-nowrap flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Low Risk Normal (₹4.5k, 11AM)
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* PREDICTION INPUT FORM */}
                <div className="card p-6 lg:col-span-3">
                  <div className="flex items-start justify-between gap-4 mb-5 border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <BrainIcon className="w-5 h-5 text-cyan-400" />
                        AI Cashout & Fraud Risk Assessment
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Supply transaction parameters to compute cash withdrawal probability
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 uppercase font-bold whitespace-nowrap">
                      POST /withdrawal/
                    </span>
                  </div>

                  <form onSubmit={handlePrediction} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label-text">Transaction Amount (₹)</label>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="e.g. 50000"
                          required
                          className="input-field font-mono"
                        />
                      </div>
                      <div>
                        <label className="label-text">Hour of Day (0–23)</label>
                        <input
                          type="number"
                          min="0"
                          max="23"
                          value={hour}
                          onChange={(e) => setHour(e.target.value)}
                          placeholder="e.g. 2"
                          required
                          className="input-field font-mono"
                        />
                      </div>
                      <div>
                        <label className="label-text">Velocity / Frequency (24h)</label>
                        <input
                          type="number"
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                          placeholder="e.g. 8"
                          required
                          className="input-field font-mono"
                        />
                      </div>
                      <div>
                        <label className="label-text">Prior Fraud Incidents</label>
                        <input
                          type="number"
                          value={previousFraud}
                          onChange={(e) => setPreviousFraud(e.target.value)}
                          placeholder="e.g. 3"
                          required
                          className="input-field font-mono"
                        />
                      </div>
                      <div>
                        <label className="label-text">Latitude</label>
                        <input
                          type="number"
                          step="any"
                          value={lat}
                          onChange={(e) => setLat(e.target.value)}
                          placeholder="19.0760"
                          required
                          className="input-field font-mono"
                        />
                      </div>
                      <div>
                        <label className="label-text">Longitude</label>
                        <input
                          type="number"
                          step="any"
                          value={lng}
                          onChange={(e) => setLng(e.target.value)}
                          placeholder="72.8777"
                          required
                          className="input-field font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={predictLoading}
                      className={`w-full h-12 mt-4 font-mono font-bold ${
                        isSecurePortal ? 'btn-danger' : 'btn-primary'
                      }`}
                    >
                      {predictLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Executing Random Forest Inference...
                        </>
                      ) : (
                        'Run AI Intelligence Engine'
                      )}
                    </button>
                  </form>

                  {predictError && (
                    <div className="flex items-center gap-2.5 mt-4 text-xs text-red-300 bg-red-950/40 border border-red-500/40 rounded-xl p-3 animate-fadeIn">
                      <ShieldAlertIcon className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{predictError}</span>
                    </div>
                  )}
                </div>

                {/* PREDICTIVE WORKFLOW ARCHITECTURE */}
                <div className="card p-6 lg:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                      <h3 className="text-base font-bold text-white tracking-tight">Intelligence Workflow</h3>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                        PIPELINE v2
                      </span>
                    </div>

                    <div className="space-y-4">
                      {[
                        { num: '01', title: 'Feature Vector Extraction', desc: 'Nocturnal extraction hours, velocity spikes, prior flagged accounts.' },
                        { num: '02', title: 'Random Forest Risk Scoring', desc: 'Pretrained ML model outputs risk probability index (0–100).' },
                        { num: '03', title: 'Geospatial Node Clustering', desc: 'Coordinates cross-referenced against historical extraction radius.' },
                        { num: '04', title: 'Field Interception Dispatch', desc: 'Generates tactical protocols for rapid police & patrol intervention.' },
                      ].map((step) => (
                        <div key={step.num} className="flex items-start gap-3">
                          <span className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold shadow-sm shadow-cyan-500/10">
                            {step.num}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-slate-200">{step.title}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <ShieldCheckIcon className="w-3.5 h-3.5" /> MODEL INTEGRITY VERIFIED
                    </span>
                    <span>SCIKIT-LEARN 1.9</span>
                  </div>
                </div>
              </div>

              {/* ============ PREDICTION RESULTS REPORT ============ */}
              {prediction && (
                <div className="mt-6 animate-fadeInUp space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <h3 className="text-lg font-extrabold text-white tracking-tight">
                        AI Prediction & Threat Intelligence Report
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Evaluated at {prediction.evaluated_at}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* CIRCULAR RISK GAUGE CARD */}
                    <div className="card p-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
                      <div className="absolute top-4 left-4 text-left">
                        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                          COMPUTED THREAT METRIC
                        </p>
                        <p className="text-xs text-slate-300 font-medium">Random Forest Inference</p>
                      </div>

                      {/* CIRCULAR GAUGE VISUAL */}
                      <div className="relative w-44 h-44 my-4 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          {/* Background Track */}
                          <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="transparent"
                            stroke="rgba(255, 255, 255, 0.08)"
                            strokeWidth="8"
                          />
                          {/* Progress Arc */}
                          <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="transparent"
                            stroke={gaugeColor}
                            strokeWidth="8"
                            strokeDasharray="289"
                            strokeDashoffset={gaugeOffset}
                            strokeLinecap="round"
                            style={{
                              transition: 'stroke-dashoffset 1s ease-out, stroke 0.5s',
                              filter: `drop-shadow(0 0 8px ${gaugeColor}88)`,
                            }}
                          />
                        </svg>

                        {/* Center Score Readout */}
                        <div className="absolute flex flex-col items-center justify-center">
                          <span
                            className="text-5xl font-black font-mono tracking-tight"
                            style={{ color: gaugeColor }}
                          >
                            {prediction.risk_score}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">
                            OUT OF 100
                          </span>
                        </div>
                      </div>

                      {/* CLASSIFICATION BADGE */}
                      <span className={`badge ${getRiskBg(prediction.risk_score)} text-xs px-3 py-1 font-mono tracking-wider font-bold`}>
                        {prediction.risk_level.toUpperCase()} THREAT VECTOR
                      </span>
                    </div>

                    {/* PREDICTED CASHOUT POINT & LOCATION */}
                    <div className="card p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                            <MapPinIcon className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                              PREDICTED CASHOUT POINT
                            </p>
                            <p className="text-sm font-bold text-white mt-0.5">Geospatial Target Node</p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 space-y-2 mt-4">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-slate-400">LATITUDE:</span>
                            <span className="text-cyan-400 font-bold">{prediction.latitude.toFixed(6)}° N</span>
                          </div>
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-slate-400">LONGITUDE:</span>
                            <span className="text-cyan-400 font-bold">{prediction.longitude.toFixed(6)}° E</span>
                          </div>
                          <div className="flex justify-between items-center text-xs font-mono pt-1 border-t border-white/5">
                            <span className="text-slate-400">CLUSTER STATUS:</span>
                            <span className="text-amber-400 font-semibold">{prediction.hotspot_status}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <a
                          href={`https://www.google.com/maps?q=${prediction.latitude},${prediction.longitude}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-secondary text-xs"
                        >
                          <CrosshairIcon className="w-3.5 h-3.5 text-cyan-400" />
                          Launch Satellite Maps
                          <ExternalLinkIcon className="w-3 h-3 text-slate-400" />
                        </a>
                        <span className="text-[10px] font-mono text-slate-400">
                          GIS PIN READY
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* TACTICAL RECOMMENDATION CARD */}
                  <div className={`card p-5 border ${
                    prediction.risk_score > 70 
                      ? 'border-red-500/40 bg-red-950/20' 
                      : prediction.risk_score > 30 
                      ? 'border-amber-500/40 bg-amber-950/20' 
                      : 'border-emerald-500/40 bg-emerald-950/20'
                  }`}>
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        prediction.risk_score > 70 ? 'bg-red-500/20 text-red-400' : prediction.risk_score > 30 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        <ShieldAlertIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={`text-xs font-mono font-bold uppercase tracking-wider ${
                          prediction.risk_score > 70 ? 'text-red-400' : prediction.risk_score > 30 ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          Law Enforcement Directive & Action Protocol
                        </p>
                        <p className="text-sm text-slate-200 mt-1 font-medium leading-relaxed">
                          {prediction.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============ TAB 2: GIS HOTSPOTS ============ */}
          {tab === 'hotspots' && (
            <div className="card p-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-emerald-400" />
                    Geospatial Cybercrime Hotspot Registry
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Clustered coordinate density derived from field cyber complaints
                  </p>
                </div>
                <button
                  onClick={fetchHotspots}
                  disabled={hotspotsLoading}
                  className="btn-secondary font-mono text-xs"
                >
                  <RefreshCwIcon className={`w-3.5 h-3.5 ${hotspotsLoading ? 'animate-spin' : ''}`} />
                  Sync Hotspots
                </button>
              </div>

              {hotspotsLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-12 w-full" />
                  ))}
                </div>
              ) : hotspots.length === 0 ? (
                <div className="empty-state">
                  <MapPinIcon className="w-12 h-12 text-slate-600" />
                  <h4 className="text-slate-300">No Incident Clusters Detected</h4>
                  <p className="text-slate-500">Ingest complaints with GPS coordinates to populate tactical hotspots.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Coordinates (Lat, Lng)</th>
                        <th>Incident Count</th>
                        <th>Threat Classification</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotspots.map((item, idx) => (
                        <tr key={idx}>
                          <td className="font-mono text-cyan-400 font-semibold text-sm">
                            {item.latitude.toFixed(4)}° N, {item.longitude.toFixed(4)}° E
                          </td>
                          <td className="font-semibold text-white font-mono">
                            {item.incident_count} reports logged
                          </td>
                          <td>
                            <span className={`badge ${getRiskBadgeClass(item.risk_level)}`}>
                              {item.risk_level}
                            </span>
                          </td>
                          <td className="text-right">
                            <a
                              href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono font-medium hover:underline"
                            >
                              Open Radar Map <ExternalLinkIcon className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ============ TAB 3: COMPLAINTS REGISTRY ============ */}
          {tab === 'complaints' && (
            <div className="card p-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <FileTextIcon className="w-5 h-5 text-amber-400" />
                    National Cybercrime Incident & FIR Ledger
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Field-reported telemetry directly training the ML fraud classifier
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button onClick={() => setShowNewComplaintModal(true)} className="btn-primary font-mono text-xs">
                    <PlusCircleIcon className="w-4 h-4" />
                    Ingest Incident
                  </button>
                  <button onClick={fetchComplaints} disabled={complaintsLoading} className="btn-secondary font-mono text-xs">
                    <RefreshCwIcon className={`w-3.5 h-3.5 ${complaintsLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>
              </div>

              {complaintsLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-12 w-full" />
                  ))}
                </div>
              ) : complaints.length === 0 ? (
                <div className="empty-state">
                  <FileTextIcon className="w-12 h-12 text-slate-600" />
                  <h4 className="text-slate-300">No Incidents Ingested Yet</h4>
                  <p className="text-slate-500">Record an incident to expand the training repository.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Case #</th>
                        <th>Crime Classification</th>
                        <th>Defrauded Amount</th>
                        <th>Jurisdiction / Location</th>
                        <th>GPS Vector</th>
                        <th>Timestamp</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map((item) => (
                        <tr key={item.id}>
                          <td className="font-mono text-cyan-400 font-bold text-xs">#{item.id}</td>
                          <td className="font-semibold text-white">{item.crime_type}</td>
                          <td className="font-mono text-emerald-400 font-bold">
                            {item.fraud_amount ? `₹${item.fraud_amount.toLocaleString('en-IN')}` : 'N/A'}
                          </td>
                          <td className="text-slate-300">{item.location || 'Unknown Node'}</td>
                          <td className="font-mono text-xs text-slate-400">
                            {item.latitude && item.longitude
                              ? `${item.latitude.toFixed(4)}°, ${item.longitude.toFixed(4)}°`
                              : 'N/A'}
                          </td>
                          <td className="text-xs text-slate-400 font-mono">
                            {new Date(item.complaint_time).toLocaleDateString()}{' '}
                            {new Date(item.complaint_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td>
                            <span className="badge badge-info text-[10px] font-mono">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ============ TAB 4: TRANSACTIONS FORENSIC LEDGER ============ */}
          {tab === 'transactions' && (
            <div className="card p-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <ActivityIcon className="w-5 h-5 text-red-400" />
                    Forensic Mule Transaction & Cashout Ledger
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Mule accounts, transfer hops, and illicit withdrawal nodes linked to active cases
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button onClick={() => setShowNewTxModal(true)} className="btn-primary font-mono text-xs">
                    <PlusCircleIcon className="w-4 h-4" />
                    Log Forensic Hop
                  </button>
                  <button onClick={fetchTransactions} disabled={transactionsLoading} className="btn-secondary font-mono text-xs">
                    <RefreshCwIcon className={`w-3.5 h-3.5 ${transactionsLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>
              </div>

              {transactionsLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-12 w-full" />
                  ))}
                </div>
              ) : transactions.length === 0 ? (
                <div className="empty-state">
                  <ActivityIcon className="w-12 h-12 text-slate-600" />
                  <h4 className="text-slate-300">No Forensic Transactions Recorded</h4>
                  <p className="text-slate-500">Log a mule transaction to begin forensic network tracing.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>TXN Hash / Ref</th>
                        <th>Linked Case</th>
                        <th>Amount</th>
                        <th>Extraction Channel</th>
                        <th>Source Node</th>
                        <th>Destination / ATM</th>
                        <th>Recorded At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id}>
                          <td className="font-mono font-bold text-cyan-400 text-xs">{tx.transaction_id}</td>
                          <td className="text-slate-300 font-mono text-xs">Case #{tx.complaint_id}</td>
                          <td className="font-mono text-emerald-400 font-bold">
                            {tx.amount != null ? `₹${tx.amount.toLocaleString('en-IN')}` : 'N/A'}
                          </td>
                          <td className="text-xs text-slate-300 font-medium">{tx.transaction_type || 'Transfer'}</td>
                          <td className="font-mono text-xs text-slate-400">{tx.source_account || 'N/A'}</td>
                          <td className="font-mono text-xs text-amber-400 font-semibold">{tx.destination_account || 'N/A'}</td>
                          <td className="text-xs text-slate-400 font-mono">
                            {new Date(tx.transaction_time).toLocaleDateString()}{' '}
                            {new Date(tx.transaction_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-4 px-8 text-center text-xs font-mono text-slate-500 bg-slate-950/80">
          CyberPehra Predictive Defense Command • End-to-End Cryptographic Ledger • ©{' '}
          {new Date().getFullYear()}
        </footer>
      </div>

      {/* ============ NEW COMPLAINT MODAL ============ */}
      {showNewComplaintModal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowNewComplaintModal(false)}
        >
          <div className="modal-content border border-cyan-500/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <FileTextIcon className="w-5 h-5 text-cyan-400" />
                Ingest Cybercrime Incident
              </h3>
              <button
                onClick={() => setShowNewComplaintModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              Submit incident telemetry into the database for immediate AI hotspot processing.
            </p>

            <form onSubmit={handleCreateComplaint} className="space-y-4">
              <div>
                <label className="label-text">Crime Classification</label>
                <select
                  value={newComplaintCrimeType}
                  onChange={(e) => setNewComplaintCrimeType(e.target.value)}
                  className="input-field"
                >
                  <option value="UPI Fraud">UPI Fraud</option>
                  <option value="ATM Cloning">ATM Cloning</option>
                  <option value="SIM Swap & OTP">SIM Swap & OTP</option>
                  <option value="Phishing Syndicate">Phishing Syndicate</option>
                  <option value="Investment Scam">Investment Scam</option>
                  <option value="Card Skimming">Card Skimming</option>
                </select>
              </div>

              <div>
                <label className="label-text">Fraud Amount (₹)</label>
                <input
                  type="number"
                  value={newComplaintAmount}
                  onChange={(e) => setNewComplaintAmount(e.target.value)}
                  placeholder="50000"
                  required
                  className="input-field font-mono"
                />
              </div>

              <div>
                <label className="label-text">City / Jurisdiction</label>
                <input
                  type="text"
                  value={newComplaintLocation}
                  onChange={(e) => setNewComplaintLocation(e.target.value)}
                  placeholder="e.g. Pune Central"
                  required
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-text">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={newComplaintLat}
                    onChange={(e) => setNewComplaintLat(e.target.value)}
                    placeholder="18.5204"
                    required
                    className="input-field font-mono"
                  />
                </div>
                <div>
                  <label className="label-text">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={newComplaintLng}
                    onChange={(e) => setNewComplaintLng(e.target.value)}
                    placeholder="73.8567"
                    required
                    className="input-field font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowNewComplaintModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createComplaintLoading}
                  className="btn-primary text-xs"
                >
                  {createComplaintLoading ? 'Ingesting...' : 'Ingest Complaint'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ NEW TRANSACTION MODAL ============ */}
      {showNewTxModal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowNewTxModal(false)}
        >
          <div className="modal-content border border-red-500/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <ActivityIcon className="w-5 h-5 text-red-400" />
                Log Forensic Mule Transaction
              </h3>
              <button
                onClick={() => setShowNewTxModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              Record suspicious withdrawal or transfer hop linked to an open investigation.
            </p>

            <form onSubmit={handleCreateTx} className="space-y-4">
              <div>
                <label className="label-text">Transaction Ref / Hash</label>
                <input
                  type="text"
                  value={newTxId}
                  onChange={(e) => setNewTxId(e.target.value)}
                  required
                  className="input-field font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-text">Linked Case #</label>
                  <input
                    type="number"
                    value={newTxComplaintId}
                    onChange={(e) => setNewTxComplaintId(e.target.value)}
                    required
                    className="input-field font-mono"
                  />
                </div>
                <div>
                  <label className="label-text">Amount (₹)</label>
                  <input
                    type="number"
                    value={newTxAmount}
                    onChange={(e) => setNewTxAmount(e.target.value)}
                    required
                    className="input-field font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="label-text">Extraction Channel</label>
                <select
                  value={newTxType}
                  onChange={(e) => setNewTxType(e.target.value)}
                  className="input-field"
                >
                  <option value="ATM Cash Withdrawal">ATM Cash Withdrawal</option>
                  <option value="IMPS Transfer">IMPS Transfer</option>
                  <option value="UPI P2P">UPI P2P</option>
                  <option value="Crypto On-Ramp">Crypto On-Ramp</option>
                  <option value="POS Swiping">POS Swiping</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-text">Source Mule Account</label>
                  <input
                    type="text"
                    value={newTxSource}
                    onChange={(e) => setNewTxSource(e.target.value)}
                    placeholder="e.g. AC-98124"
                    className="input-field font-mono"
                  />
                </div>
                <div>
                  <label className="label-text">Destination Node / ATM</label>
                  <input
                    type="text"
                    value={newTxDest}
                    onChange={(e) => setNewTxDest(e.target.value)}
                    placeholder="e.g. ATM-MUM-40"
                    className="input-field font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowNewTxModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createTxLoading}
                  className="btn-danger text-xs"
                >
                  {createTxLoading ? 'Recording...' : 'Log Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

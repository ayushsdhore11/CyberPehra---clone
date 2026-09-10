'use client';

import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  RadarIcon,
  ShieldAlertIcon,
  MapPinIcon,
  BrainIcon,
  FileTextIcon,
  ActivityIcon,
  PlusCircleIcon,
  RefreshCwIcon,
  ExternalLinkIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  TrendingUpIcon,
  ClockIcon,
  DatabaseIcon,
  ZapIcon,
} from '../components/icons';

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

const NAV_ITEMS: { key: ActiveTab; label: string; icon: typeof BrainIcon }[] = [
  { key: 'prediction', label: 'Risk Predictor', icon: BrainIcon },
  { key: 'hotspots', label: 'GIS Hotspots', icon: MapPinIcon },
  { key: 'complaints', label: 'Incidents', icon: FileTextIcon },
  { key: 'transactions', label: 'Transactions', icon: ActivityIcon },
];

function getRiskColor(score: number) {
  if (score > 70) return '#dc2626';
  if (score > 30) return '#d97706';
  return '#16a34a';
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
        setNewTxId('TXN' + Math.floor(1000 + Math.random() * 9000));
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-blue-600">
          <RadarIcon className="w-7 h-7 animate-spin" />
          <span className="font-semibold text-sm tracking-wide">Initializing console...</span>
        </div>
      </div>
    );
  }

  const currentNavItem = NAV_ITEMS.find((n) => n.key === tab);

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* SIDEBAR */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-600/20">
              <RadarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-none">CyberPehra</h1>
              <p className="text-[10px] text-slate-400 mt-0.5 tracking-wide uppercase">Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600 p-1"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Operations
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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Backend status */}
        <div className="px-4 py-3 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                backendOnline === null
                  ? 'bg-slate-300'
                  : backendOnline
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
            />
            <span className="text-slate-500 font-medium">
              {backendOnline === null
                ? 'Connecting...'
                : backendOnline
                ? 'API Engine Online'
                : 'API Offline'}
            </span>
          </div>
        </div>

        {/* User + logout */}
        <div className="px-3 py-3 border-t border-slate-200">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
              {user.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user}</p>
              <p className="text-xs text-slate-400">{role === 'LEA' ? 'LEA Command' : 'Citizen Agent'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all"
              title="Log Out"
            >
              <LogOutIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-5 lg:px-8 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-500 hover:text-slate-700 p-1"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">Dashboard</span>
              <span className="text-slate-300">/</span>
              <span className="font-semibold text-slate-700">{currentNavItem?.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-medium text-slate-600">Monitoring Active</span>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100">
              <span className="text-xs font-bold text-blue-700">
                {role === 'LEA' ? 'LEA COMMAND' : 'CITIZEN AGENT'}
              </span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-5 lg:p-8 max-w-7xl mx-auto w-full">
          {/* PAGE HEADER */}
          <div className="mb-6 animate-fadeInUp">
            <h2 className="text-2xl font-bold text-slate-900">
              {tab === 'prediction' && 'AI Risk & Hotspot Predictor'}
              {tab === 'hotspots' && 'Live GIS Cybercrime Hotspots'}
              {tab === 'complaints' && 'Incident & Complaint Registry'}
              {tab === 'transactions' && 'Forensic Transaction Tracing'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {tab === 'prediction' && 'Assess criminal cash withdrawal likelihood with ML-powered risk scoring'}
              {tab === 'hotspots' && 'Aggregated clusters grouped by incident density from field complaints'}
              {tab === 'complaints' && 'Database of reported cybercrime activities feeding the ML model'}
              {tab === 'transactions' && 'Mule accounts and illicit withdrawal transactions linked to active complaints'}
            </p>
          </div>

          {/* STATS ROW */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="card card-hover p-5 animate-fadeInUp delay-50">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <BrainIcon className="w-5 h-5 text-blue-600" />
                </div>
                <ZapIcon className="w-4 h-4 text-slate-300" />
              </div>
              <p className="text-xs text-slate-500 font-medium">AI Risk Classifier</p>
              <p className="text-base font-bold text-slate-900 mt-1">Random Forest v1.0</p>
            </div>

            <div className="card card-hover p-5 animate-fadeInUp delay-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <TrendingUpIcon className="w-4 h-4 text-slate-300" />
              </div>
              <p className="text-xs text-slate-500 font-medium">Active Hotspots</p>
              <p className="text-base font-bold text-slate-900 mt-1">{hotspots.length} Clusters</p>
            </div>

            <div className="card card-hover p-5 animate-fadeInUp delay-150">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <FileTextIcon className="w-5 h-5 text-amber-600" />
                </div>
                <DatabaseIcon className="w-4 h-4 text-slate-300" />
              </div>
              <p className="text-xs text-slate-500 font-medium">Ingested Complaints</p>
              <p className="text-base font-bold text-slate-900 mt-1">{complaints.length} Records</p>
            </div>

            <div className="card card-hover p-5 animate-fadeInUp delay-200">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                  <ActivityIcon className="w-5 h-5 text-rose-600" />
                </div>
                <ClockIcon className="w-4 h-4 text-slate-300" />
              </div>
              <p className="text-xs text-slate-500 font-medium">Monitored Transactions</p>
              <p className="text-base font-bold text-slate-900 mt-1">{transactions.length} Traced</p>
            </div>
          </div>

          {/* ============ PREDICTION TAB ============ */}
          {tab === 'prediction' && (
            <div className="animate-fadeIn">
              {/* Presets */}
              <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
                <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Load Simulation:</span>
                <button
                  type="button"
                  onClick={() => applyPreset('85000', '1', '12', '5', '19.0760', '72.8777')}
                  className="badge badge-danger hover:opacity-80 transition-opacity whitespace-nowrap"
                >
                  High Risk ATM (₹85k, 1AM)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('35000', '14', '4', '1', '19.1383', '77.3210')}
                  className="badge badge-warning hover:opacity-80 transition-opacity whitespace-nowrap"
                >
                  Moderate UPI (₹35k, 2PM)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('4500', '11', '1', '0', '18.5204', '73.8567')}
                  className="badge badge-success hover:opacity-80 transition-opacity whitespace-nowrap"
                >
                  Low Risk (₹4.5k, 11AM)
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* FORM */}
                <div className="card p-6 lg:col-span-3">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">AI Fraud & Cash Withdrawal Prediction</h3>
                      <p className="text-xs text-slate-500 mt-1">Enter transaction parameters to assess criminal withdrawal likelihood</p>
                    </div>
                    <span className="badge badge-info whitespace-nowrap">POST /withdrawal/</span>
                  </div>

                  <form onSubmit={handlePrediction}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label-text">Transaction Amount (₹)</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 50000" required className="input-field" />
                      </div>
                      <div>
                        <label className="label-text">Hour of Day (0–23)</label>
                        <input type="number" min="0" max="23" value={hour} onChange={(e) => setHour(e.target.value)} placeholder="e.g. 2" required className="input-field" />
                      </div>
                      <div>
                        <label className="label-text">Transaction Velocity (24h)</label>
                        <input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="e.g. 8" required className="input-field" />
                      </div>
                      <div>
                        <label className="label-text">Prior Fraud Incidents</label>
                        <input type="number" value={previousFraud} onChange={(e) => setPreviousFraud(e.target.value)} placeholder="e.g. 3" required className="input-field" />
                      </div>
                      <div>
                        <label className="label-text">Latitude</label>
                        <input type="number" step="any" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="19.0760" required className="input-field" />
                      </div>
                      <div>
                        <label className="label-text">Longitude</label>
                        <input type="number" step="any" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="72.8777" required className="input-field" />
                      </div>
                    </div>

                    <button type="submit" disabled={predictLoading} className="btn-primary w-full h-12 mt-5">
                      {predictLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Analyzing...
                        </>
                      ) : (
                        'Run Intelligence Model'
                      )}
                    </button>
                  </form>

                  {predictError && (
                    <div className="flex items-center gap-2 mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 animate-fadeIn">
                      <ShieldAlertIcon className="w-4 h-4 shrink-0" />
                      <span>{predictError}</span>
                    </div>
                  )}
                </div>

                {/* WORKFLOW */}
                <div className="card p-6 lg:col-span-2">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Predictive Workflow</h3>
                  <p className="text-xs text-slate-500 mb-5">Architecture of the intelligence engine</p>

                  <div className="space-y-4">
                    {[
                      { num: '01', title: 'Ingestion & Feature Vector', desc: 'Telemetry on transaction volume, nocturnal hours & account velocity.' },
                      { num: '02', title: 'Ensemble Random Forest', desc: 'Scikit-learn model evaluates probability of mule cash extraction.' },
                      { num: '03', title: 'Geospatial Clustering', desc: 'Coordinates mapped against known financial extraction hotspots.' },
                      { num: '04', title: 'Law Enforcement Dispatch', desc: 'Generates preventive interception protocols for field officers.' },
                    ].map((step) => (
                      <div key={step.num} className="flex items-start gap-3">
                        <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                          {step.num}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RESULTS */}
              {prediction && (
                <div className="mt-6 animate-fadeInUp">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-1.5 h-6 rounded-full bg-blue-600" />
                    <h3 className="text-lg font-bold text-slate-900">Prediction Analysis Report</h3>
                    <span className="text-xs text-green-600 font-semibold ml-auto">
                      Evaluated at {prediction.evaluated_at}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Risk Score */}
                    <div className="card p-6">
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Computed Fraud Risk Metric</p>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-5xl font-extrabold" style={{ color: getRiskColor(prediction.risk_score) }}>
                          {prediction.risk_score}
                        </span>
                        <span className="text-lg text-slate-400 font-medium">/ 100</span>
                      </div>
                      <span className={`badge mt-3 ${getRiskBg(prediction.risk_score)}`}>
                        {prediction.risk_level.toUpperCase()}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="card p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          <MapPinIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Predicted Cashout Point</p>
                          <p className="text-lg font-bold text-slate-900 mt-1">
                            {prediction.latitude.toFixed(4)}, {prediction.longitude.toFixed(4)}
                          </p>
                          <p className="text-sm text-blue-600 mt-1">{prediction.hotspot_status}</p>
                          <a
                            href={`https://www.google.com/maps?q=${prediction.latitude},${prediction.longitude}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 mt-3 text-xs text-blue-600 hover:underline font-medium"
                          >
                            View on Map <ExternalLinkIcon className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="card p-5 mt-4 border-amber-200 bg-amber-50/50">
                    <div className="flex items-start gap-3">
                      <ShieldAlertIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Tactical Recommendation</p>
                        <p className="text-sm text-slate-700 mt-1">{prediction.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============ HOTSPOTS TAB ============ */}
          {tab === 'hotspots' && (
            <div className="card p-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Live GIS Cybercrime Hotspots</h3>
                  <p className="text-xs text-slate-500 mt-1">Aggregated clusters grouped by incident density from field complaints</p>
                </div>
                <button onClick={fetchHotspots} disabled={hotspotsLoading} className="btn-secondary">
                  <RefreshCwIcon className={`w-4 h-4 ${hotspotsLoading ? 'animate-spin' : ''}`} />
                  Refresh Data
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
                  <MapPinIcon className="w-12 h-12" />
                  <h4>No incident coordinates found</h4>
                  <p>Ingest complaints with latitude/longitude to generate clusters.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Coordinates (Lat, Lng)</th>
                        <th>Incident Count</th>
                        <th>Threat Level</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotspots.map((item, idx) => (
                        <tr key={idx}>
                          <td className="font-mono text-blue-600 text-sm">
                            {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                          </td>
                          <td className="font-semibold text-slate-900">{item.incident_count} reports</td>
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
                              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
                            >
                              Open Map <ExternalLinkIcon className="w-3 h-3" />
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

          {/* ============ COMPLAINTS TAB ============ */}
          {tab === 'complaints' && (
            <div className="card p-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">National Incident & Complaint Registry</h3>
                  <p className="text-xs text-slate-500 mt-1">Database of reported cybercrime activities feeding the ML model</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowNewComplaintModal(true)} className="btn-primary">
                    <PlusCircleIcon className="w-4 h-4" />
                    Report Incident
                  </button>
                  <button onClick={fetchComplaints} disabled={complaintsLoading} className="btn-secondary">
                    <RefreshCwIcon className={`w-4 h-4 ${complaintsLoading ? 'animate-spin' : ''}`} />
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
                  <FileTextIcon className="w-12 h-12" />
                  <h4>No complaints logged yet</h4>
                  <p>Report an incident to start building your registry.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Crime Type</th>
                        <th>Fraud Amount</th>
                        <th>Location</th>
                        <th>Coordinates</th>
                        <th>Report Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map((item) => (
                        <tr key={item.id}>
                          <td className="font-mono text-blue-600 text-sm">#{item.id}</td>
                          <td className="font-semibold text-slate-900">{item.crime_type}</td>
                          <td className="font-mono text-green-600 font-semibold">
                            {item.fraud_amount ? `₹${item.fraud_amount.toLocaleString()}` : 'N/A'}
                          </td>
                          <td className="text-slate-600">{item.location || 'Unknown'}</td>
                          <td className="font-mono text-xs text-slate-500">
                            {item.latitude && item.longitude
                              ? `${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}`
                              : 'N/A'}
                          </td>
                          <td className="text-xs text-slate-500">
                            {new Date(item.complaint_time).toLocaleDateString()}{' '}
                            {new Date(item.complaint_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td>
                            <span className="badge badge-info">{item.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ============ TRANSACTIONS TAB ============ */}
          {tab === 'transactions' && (
            <div className="card p-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Forensic Transaction Tracing</h3>
                  <p className="text-xs text-slate-500 mt-1">Mule accounts and illicit withdrawal transactions linked to active complaints</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowNewTxModal(true)} className="btn-primary">
                    <PlusCircleIcon className="w-4 h-4" />
                    Log Transaction
                  </button>
                  <button onClick={fetchTransactions} disabled={transactionsLoading} className="btn-secondary">
                    <RefreshCwIcon className={`w-4 h-4 ${transactionsLoading ? 'animate-spin' : ''}`} />
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
                  <ActivityIcon className="w-12 h-12" />
                  <h4>No transactions traced yet</h4>
                  <p>Log a transaction to start building the forensic ledger.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>TXN ID</th>
                        <th>Linked Case</th>
                        <th>Amount</th>
                        <th>Channel</th>
                        <th>Source Account</th>
                        <th>Destination / Node</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id}>
                          <td className="font-mono font-semibold text-blue-600 text-sm">{tx.transaction_id}</td>
                          <td className="text-slate-600">Case #{tx.complaint_id}</td>
                          <td className="font-mono text-green-600 font-semibold">
                            {tx.amount != null ? `₹${tx.amount.toLocaleString()}` : 'N/A'}
                          </td>
                          <td className="text-xs text-slate-600">{tx.transaction_type || 'Transfer'}</td>
                          <td className="font-mono text-xs text-slate-500">{tx.source_account || 'N/A'}</td>
                          <td className="font-mono text-xs text-amber-600">{tx.destination_account || 'N/A'}</td>
                          <td className="text-xs text-slate-500">
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
        <footer className="border-t border-slate-200 py-4 px-8 text-center text-xs text-slate-400">
          CyberPehra Predictive Defense Command • Secured via End-to-End Encryption • ©{' '}
          {new Date().getFullYear()}
        </footer>
      </div>

      {/* NEW COMPLAINT MODAL */}
      {showNewComplaintModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowNewComplaintModal(false)}>
          <div className="modal-content">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Report Cybercrime Incident</h3>
            <p className="text-xs text-slate-500 mb-5">
              Submit incident telemetry into the database for immediate AI hotspot processing.
            </p>

            <form onSubmit={handleCreateComplaint} className="space-y-4">
              <div>
                <label className="label-text">Crime Type</label>
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
                <input type="number" value={newComplaintAmount} onChange={(e) => setNewComplaintAmount(e.target.value)} placeholder="50000" required className="input-field" />
              </div>

              <div>
                <label className="label-text">City / Region</label>
                <input type="text" value={newComplaintLocation} onChange={(e) => setNewComplaintLocation(e.target.value)} placeholder="e.g. Pune Central" required className="input-field" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-text">Latitude</label>
                  <input type="number" step="any" value={newComplaintLat} onChange={(e) => setNewComplaintLat(e.target.value)} placeholder="18.5204" required className="input-field" />
                </div>
                <div>
                  <label className="label-text">Longitude</label>
                  <input type="number" step="any" value={newComplaintLng} onChange={(e) => setNewComplaintLng(e.target.value)} placeholder="73.8567" required className="input-field" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowNewComplaintModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={createComplaintLoading} className="btn-primary">
                  {createComplaintLoading ? 'Registering...' : 'Register Complaint'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW TRANSACTION MODAL */}
      {showNewTxModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowNewTxModal(false)}>
          <div className="modal-content">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Log Forensic Transaction</h3>
            <p className="text-xs text-slate-500 mb-5">
              Record suspicious withdrawal or transfer hop linked to an open investigation.
            </p>

            <form onSubmit={handleCreateTx} className="space-y-4">
              <div>
                <label className="label-text">Transaction Ref ID</label>
                <input type="text" value={newTxId} onChange={(e) => setNewTxId(e.target.value)} required className="input-field" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-text">Linked Case #</label>
                  <input type="number" value={newTxComplaintId} onChange={(e) => setNewTxComplaintId(e.target.value)} required className="input-field" />
                </div>
                <div>
                  <label className="label-text">Amount (₹)</label>
                  <input type="number" value={newTxAmount} onChange={(e) => setNewTxAmount(e.target.value)} required className="input-field" />
                </div>
              </div>

              <div>
                <label className="label-text">Transaction Channel</label>
                <select value={newTxType} onChange={(e) => setNewTxType(e.target.value)} className="input-field">
                  <option value="ATM Cash Withdrawal">ATM Cash Withdrawal</option>
                  <option value="IMPS Transfer">IMPS Transfer</option>
                  <option value="UPI P2P">UPI P2P</option>
                  <option value="Crypto On-Ramp">Crypto On-Ramp</option>
                  <option value="POS Swiping">POS Swiping</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-text">Source Account</label>
                  <input type="text" value={newTxSource} onChange={(e) => setNewTxSource(e.target.value)} placeholder="e.g. AC-98124" className="input-field" />
                </div>
                <div>
                  <label className="label-text">Destination Node / ATM</label>
                  <input type="text" value={newTxDest} onChange={(e) => setNewTxDest(e.target.value)} placeholder="e.g. ATM-MUM-40" className="input-field" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowNewTxModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={createTxLoading} className="btn-primary">
                  {createTxLoading ? 'Logging...' : 'Log Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Bell,
  Brain,
  ChevronDown,
  Clock3,
  MapPin,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  const [prediction, setPrediction] = useState<{
    risk_score: number;
    risk_level: string;
    hotspot: boolean;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPrediction = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/prediction/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transaction_amount: 85000,
            transaction_count: 12,
            complaint_count: 15,
            location_risk: 0.9,
            withdrawal_distance: 2.5,
            withdrawal_hour: 2,
            previous_cases: 10,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();

      setPrediction(data);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to prediction server. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h1 className="font-bold tracking-wide">CyberPehra</h1>
              <p className="text-xs text-slate-500">
                Intelligence System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-slate-400 transition hover:text-white">
              <Bell size={20} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
                A
              </div>

              <div>
                <p className="text-sm font-medium">LEA Officer</p>
                <p className="text-xs text-slate-500">Authorized Access</p>
              </div>

              <ChevronDown size={16} className="text-slate-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 px-4 py-8 lg:block">
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg bg-blue-600/10 px-4 py-3 text-sm font-medium text-blue-400"
            >
              <TrendingUp size={18} />
              Dashboard
            </a>

            <a
              href="#heatmap"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              <MapPin size={18} />
              Risk Heatmap
            </a>

            <a
              href="#predictions"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              <Brain size={18} />
              Predictions
            </a>

            <a
              href="#alerts"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              <Bell size={18} />
              Alerts
            </a>

            <a
              href="#reports"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              <ShieldCheck size={18} />
              Intelligence Reports
            </a>
          </nav>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              LEA Intelligence Dashboard
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Predictive Risk Overview
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Monitor predicted hotspots, risk levels, and actionable
              intelligence.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Predicted Hotspots</p>
                <MapPin size={18} className="text-red-400" />
              </div>

              <p className="mt-3 text-3xl font-bold">12</p>
              <p className="mt-1 text-xs text-slate-500">
                Sample dashboard data
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">High-Risk Locations</p>
                <AlertTriangle size={18} className="text-orange-400" />
              </div>

              <p className="mt-3 text-3xl font-bold">8</p>
              <p className="mt-1 text-xs text-slate-500">
                Sample dashboard data
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Active Alerts</p>
                <Bell size={18} className="text-blue-400" />
              </div>

              <p className="mt-3 text-3xl font-bold">5</p>
              <p className="mt-1 text-xs text-slate-500">
                Sample dashboard data
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Risk Analysis</p>
                <TrendingUp size={18} className="text-cyan-400" />
              </div>

              <p className="mt-3 text-3xl font-bold">
                {prediction ? `${prediction.risk_score}%` : "--"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                ML prediction result
              </p>
            </div>
          </div>

          {/* Prediction Section */}
          <section
            id="predictions"
            className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Brain size={20} className="text-blue-400" />

                  <h3 className="text-lg font-semibold">
                    Predictive Intelligence
                  </h3>
                </div>

                <p className="mt-2 text-sm text-slate-400">
                  Run the trained Random Forest model on sample transaction
                  and complaint data.
                </p>
              </div>

              <button
                onClick={getPrediction}
                disabled={loading}
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Run Prediction"}
              </button>
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            {prediction && (
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Risk Score
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    {prediction.risk_score}%
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Risk Level
                  </p>

                  <p className="mt-2 text-2xl font-bold text-white">
                    {prediction.risk_level}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Predicted Hotspot
                  </p>

                  <p className="mt-2 text-2xl font-bold text-white">
                    {prediction.hotspot ? "YES" : "NO"}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Heatmap */}
          <section
            id="heatmap"
            className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Predicted Risk Heatmap
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Sample visualization of potential high-risk locations
                </p>
              </div>

              <MapPin size={20} className="text-red-400" />
            </div>

            <div className="relative h-72 overflow-hidden rounded-xl border border-white/10 bg-slate-950">
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.2)_1px,transparent_1px)] [background-size:40px_40px]" />

              <div className="absolute left-[20%] top-[25%] h-4 w-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/70" />

              <div className="absolute left-[45%] top-[50%] h-5 w-5 rounded-full bg-red-500 shadow-lg shadow-red-500/80" />

              <div className="absolute right-[25%] top-[30%] h-4 w-4 rounded-full bg-orange-400 shadow-lg shadow-orange-400/70" />

              <div className="absolute right-[35%] bottom-[20%] h-4 w-4 rounded-full bg-blue-400 shadow-lg shadow-blue-400/70" />

              <div className="absolute left-[42%] top-[42%] rounded-lg border border-red-400/30 bg-slate-900/90 px-3 py-2 text-xs text-white">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-red-400" />
                  Potential High-Risk Location
                </div>
              </div>

              <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-slate-900/90 px-3 py-2 text-xs text-slate-400">
                Sample prediction map
              </div>
            </div>
          </section>

          {/* Alerts */}
          <section
            id="alerts"
            className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-center gap-2">
              <Bell size={20} className="text-blue-400" />
              <h3 className="text-lg font-semibold">Recent Alerts</h3>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <AlertTriangle size={18} className="text-red-400" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    High-risk location detected
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Sample alert
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 size={13} />
                  Recent
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <MapPin size={18} className="text-orange-400" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    Potential withdrawal hotspot
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Sample alert
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 size={13} />
                  Recent
                </div>
              </div>
            </div>
          </section>

          {/* Reports */}
          <section
            id="reports"
            className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-cyan-400" />

              <h3 className="text-lg font-semibold">
                Intelligence Reports
              </h3>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Authorized investigators can review predictive intelligence
              and supporting information.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
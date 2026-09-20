"use client";

import dynamic from "next/dynamic";
import { FormEvent, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Brain,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Gauge,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Shield,
  ShieldCheck,
  Target,
  X,
} from "lucide-react";

import {
  predictHotspots,
  type HotspotRequest,
} from "../lib/hotspotApi";
import { generateIntelligence } from "../lib/intelligenceApi";
import { generateAlert } from "../lib/alertApi";

const HotspotMap = dynamic(
  () => import("./HotspotMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
        <div className="text-sm font-medium text-slate-500">
          Loading GIS map...
        </div>
      </div>
    ),
  }
);

type PredictionInput = {
  transaction_amount: string;
  transaction_count: string;
  complaint_count: string;
  latitude: string;
  longitude: string;
  location_risk: string;
  withdrawal_distance: string;
  withdrawal_hour: string;
  previous_cases: string;
};

type PredictionResult = {
  risk_score: number;
  risk_level: string;
  hotspot: boolean;
  latitude: number;
  longitude: number;
  location: string;
};

type IntelligenceResult = {
  location: string;
  risk_score: number;
  risk_level: string;
  priority: string;
  hotspot: boolean;
  recommended_action: string;
  intelligence: string;
};

type AlertResult = {
  alert_id: string;
  location: string;
  risk_score: number;
  risk_level: string;
  priority: string;
  alert_status: string;
  message: string;
  recommended_action: string;
  created_at: string;
};

type MapHotspotLocation = {
  location: string;
  latitude: number;
  longitude: number;
  riskScore: number;
  riskLevel: string;
  hotspot: boolean;
};

const initialInput: PredictionInput = {
  transaction_amount: "85000",
  transaction_count: "12",
  complaint_count: "15",
  latitude: "18.5204",
  longitude: "73.8567",
  location_risk: "0.9",
  withdrawal_distance: "2.5",
  withdrawal_hour: "2",
  previous_cases: "10",
};

const navItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Risk Hotspots",
    icon: Target,
  },
  {
    name: "Predictions",
    icon: Gauge,
  },
  {
    name: "Alerts",
    icon: Bell,
  },
  {
    name: "Intelligence",
    icon: Brain,
  },
];

function getRiskClass(level: string) {
  const value = level.toUpperCase();

  if (value === "HIGH") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (value === "MEDIUM") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-green-50 text-green-700 border-green-200";
}

function getPriorityClass(priority: string) {
  const value = priority.toUpperCase();

  if (value === "URGENT") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (value === "HIGH") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-green-50 text-green-700 border-green-200";
}

export default function AdminDashboard() {
  const [input, setInput] =
    useState<PredictionInput>(initialInput);

  const [prediction, setPrediction] =
    useState<PredictionResult | null>(null);

  const [intelligence, setIntelligence] =
    useState<IntelligenceResult | null>(null);

  const [alert, setAlert] =
    useState<AlertResult | null>(null);

  const [hotspotLocations, setHotspotLocations] =
    useState<MapHotspotLocation[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [activeSection, setActiveSection] =
    useState("Dashboard");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [showUserMenu, setShowUserMenu] =
    useState(false);

  const updateInput = (
    field: keyof PredictionInput,
    value: string
  ) => {
    setInput((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const buildPayload = (): HotspotRequest => ({
    transaction_amount:
      Number(input.transaction_amount),

    transaction_count:
      Number(input.transaction_count),

    complaint_count:
      Number(input.complaint_count),

    location_risk:
      Number(input.location_risk),

    withdrawal_distance:
      Number(input.withdrawal_distance),

    withdrawal_hour:
      Number(input.withdrawal_hour),

    previous_cases:
      Number(input.previous_cases),
  });

  const handlePrediction = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setPrediction(null);
    setIntelligence(null);
    setAlert(null);
    setHotspotLocations([]);
    setLoading(true);

    try {
      const payload = {
        transaction_amount:
          Number(input.transaction_amount),

        transaction_count:
          Number(input.transaction_count),

        complaint_count:
          Number(input.complaint_count),

        latitude:
          Number(input.latitude),

        longitude:
          Number(input.longitude),

        location_risk:
          Number(input.location_risk),

        withdrawal_distance:
          Number(input.withdrawal_distance),

        withdrawal_hour:
          Number(input.withdrawal_hour),

        previous_cases:
          Number(input.previous_cases),
      };

      const response = await fetch(
        "http://127.0.0.1:8000/api/prediction/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Prediction request failed: ${response.status}`
        );
      }

      const predictionData: PredictionResult =
        await response.json();

      setPrediction(predictionData);

      try {
        const hotspotResponse =
          await predictHotspots(
            buildPayload()
          );

        setHotspotLocations(
          hotspotResponse.locations.map(
            (item) => ({
              location: item.location,
              latitude: item.latitude,
              longitude: item.longitude,
              riskScore: Number(
                item.risk_score
              ),
              riskLevel:
                item.risk_level,
              hotspot: Boolean(
                item.hotspot
              ),
            })
          )
        );
      } catch {
      }

      try {
        const intelligenceData =
          await generateIntelligence({
            location:
              predictionData.location,
            risk_score:
              predictionData.risk_score,
            risk_level:
              predictionData.risk_level,
            hotspot:
              predictionData.hotspot,
            transaction_amount:
              payload.transaction_amount,
            complaint_count:
              payload.complaint_count,
            withdrawal_hour:
              payload.withdrawal_hour,
            previous_cases:
              payload.previous_cases,
          });

        setIntelligence(
          intelligenceData
        );
      } catch {
      }

      try {
        const alertData =
          await generateAlert({
            location:
              predictionData.location,
            risk_score:
              predictionData.risk_score,
            risk_level:
              predictionData.risk_level,
            hotspot:
              predictionData.hotspot,
          });

        setAlert(alertData);
      } catch {
      }
    } catch {
      setError(
        "Unable to connect to the CyberPehra backend. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetDashboard = () => {
    setInput(initialInput);
    setPrediction(null);
    setIntelligence(null);
    setAlert(null);
    setHotspotLocations([]);
    setError("");
  };

  const handleNavigation = (name: string) => {
    setActiveSection(name);
    setMobileMenuOpen(false);

    if (
      name === "Risk Hotspots" &&
      prediction
    ) {
      setTimeout(() => {
        document
          .getElementById("risk-hotspots")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }

    if (
      name === "Predictions"
    ) {
      setTimeout(() => {
        document
          .getElementById("prediction-section")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }

    if (
      name === "Alerts" &&
      alert
    ) {
      setTimeout(() => {
        document
          .getElementById("alerts-section")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }

    if (
      name === "Intelligence" &&
      intelligence
    ) {
      setTimeout(() => {
        document
          .getElementById(
            "intelligence-section"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                CyberPehra
              </h1>

              <p className="text-xs text-slate-500">
                Cybercrime Intelligence
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navItems.map(
              (item) => {
                const Icon = item.icon;
                const active =
                  activeSection ===
                  item.name;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() =>
                      handleNavigation(
                        item.name
                      )
                    }
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-5 w-5" />

                    {item.name}
                  </button>
                );
              }
            )}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                A
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  Admin
                </p>

                <p className="truncate text-xs text-slate-500">
                  Law Enforcement
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setMobileMenuOpen(
                      true
                    )
                  }
                  className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>

                <div>
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {activeSection}
                  </h2>

                  <p className="hidden text-sm text-slate-500 sm:block">
                    Predictive cybercrime
                    intelligence dashboard
                  </p>
                </div>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setShowUserMenu(
                      (value) =>
                        !value
                    )
                  }
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    A
                  </div>

                  <span className="hidden text-sm font-medium sm:block">
                    Admin
                  </span>

                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                    <button
                      type="button"
                      onClick={() =>
                        setShowUserMenu(
                          false
                        )
                      }
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
                    >
                      <LogOut className="h-4 w-4" />
                      Close menu
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Mobile Sidebar */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-slate-900/40"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              />

              <aside className="relative flex h-full w-72 flex-col bg-white shadow-xl">
                <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
                      <ShieldCheck className="h-6 w-6 text-white" />
                    </div>

                    <div>
                      <h1 className="font-bold">
                        CyberPehra
                      </h1>

                      <p className="text-xs text-slate-500">
                        Intelligence
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                    className="rounded-lg p-2 hover:bg-slate-100"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="space-y-1 p-4">
                  {navItems.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      return (
                        <button
                          key={
                            item.name
                          }
                          type="button"
                          onClick={() =>
                            handleNavigation(
                              item.name
                            )
                          }
                          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                            activeSection ===
                            item.name
                              ? "bg-slate-900 text-white"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Icon className="h-5 w-5" />

                          {
                            item.name
                          }
                        </button>
                      );
                    }
                  )}
                </nav>
              </aside>
            </div>
          )}

          <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
            {/* Overview */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      System Status
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      Operational
                    </p>
                  </div>

                  <div className="rounded-xl bg-green-50 p-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>

                <p className="mt-3 text-xs text-green-600">
                  Backend connected
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Prediction
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {prediction
                        ? `${prediction.risk_score}%`
                        : "--"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-3">
                    <Gauge className="h-6 w-6 text-blue-600" />
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Current risk score
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Predicted Location
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {prediction
                        ? prediction.location
                        : "--"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-indigo-50 p-3">
                    <MapPin className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Likely withdrawal location
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Alert Status
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {alert
                        ? alert.priority
                        : "--"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-red-50 p-3">
                    <Bell className="h-6 w-6 text-red-600" />
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Generated from prediction
                </p>
              </div>
            </section>

            {/* Prediction */}
            <section
              id="prediction-section"
              className="rounded-2xl border border-slate-200 bg-white"
            >
              <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-slate-700" />

                      <h3 className="text-lg font-bold">
                        Cash Withdrawal Risk Prediction
                      </h3>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      Analyze complaint and transaction indicators to forecast likely cash withdrawal risk.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetDashboard}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <form
                onSubmit={handlePrediction}
                className="p-5 sm:p-6"
              >
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <InputField
                    label="Transaction Amount"
                    value={
                      input.transaction_amount
                    }
                    onChange={(value) =>
                      updateInput(
                        "transaction_amount",
                        value
                      )
                    }
                    type="number"
                    placeholder="85000"
                  />

                  <InputField
                    label="Transaction Count"
                    value={
                      input.transaction_count
                    }
                    onChange={(value) =>
                      updateInput(
                        "transaction_count",
                        value
                      )
                    }
                    type="number"
                    placeholder="12"
                  />

                  <InputField
                    label="Complaint Count"
                    value={
                      input.complaint_count
                    }
                    onChange={(value) =>
                      updateInput(
                        "complaint_count",
                        value
                      )
                    }
                    type="number"
                    placeholder="15"
                  />

                  <InputField
                    label="Latitude"
                    value={input.latitude}
                    onChange={(value) =>
                      updateInput(
                        "latitude",
                        value
                      )
                    }
                    type="number"
                    step="any"
                    placeholder="18.5204"
                  />

                  <InputField
                    label="Longitude"
                    value={
                      input.longitude
                    }
                    onChange={(value) =>
                      updateInput(
                        "longitude",
                        value
                      )
                    }
                    type="number"
                    step="any"
                    placeholder="73.8567"
                  />

                  <InputField
                    label="Location Risk"
                    value={
                      input.location_risk
                    }
                    onChange={(value) =>
                      updateInput(
                        "location_risk",
                        value
                      )
                    }
                    type="number"
                    step="any"
                    placeholder="0.9"
                  />

                  <InputField
                    label="Withdrawal Distance"
                    value={
                      input.withdrawal_distance
                    }
                    onChange={(value) =>
                      updateInput(
                        "withdrawal_distance",
                        value
                      )
                    }
                    type="number"
                    step="any"
                    placeholder="2.5"
                  />

                  <InputField
                    label="Withdrawal Hour"
                    value={
                      input.withdrawal_hour
                    }
                    onChange={(value) =>
                      updateInput(
                        "withdrawal_hour",
                        value
                      )
                    }
                    type="number"
                    placeholder="2"
                  />

                  <InputField
                    label="Previous Cases"
                    value={
                      input.previous_cases
                    }
                    onChange={(value) =>
                      updateInput(
                        "previous_cases",
                        value
                      )
                    }
                    type="number"
                    placeholder="10"
                  />
                </div>

                {error && (
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

                    <p>{error}</p>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5" />
                        Run Prediction
                      </>
                    )}
                  </button>
                </div>
              </form>
            </section>

            {/* Prediction Result */}
            {prediction && !loading && (
              <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Risk Score
                    </p>

                    <Gauge className="h-5 w-5 text-slate-500" />
                  </div>

                  <p className="mt-3 text-4xl font-bold tracking-tight">
                    {prediction.risk_score}%
                  </p>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-900 transition-all"
                      style={{
                        width: `${Math.min(
                          prediction.risk_score,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-medium text-slate-500">
                    Risk Level
                  </p>

                  <div className="mt-4">
                    <span
                      className={`inline-flex rounded-full border px-4 py-2 text-sm font-bold ${getRiskClass(
                        prediction.risk_level
                      )}`}
                    >
                      {prediction.risk_level}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-slate-500">
                    Model classification based on complaint and transaction indicators.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-medium text-slate-500">
                    Likely Withdrawal Location
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-slate-700" />

                    <p className="text-2xl font-bold">
                      {prediction.location}
                    </p>
                  </div>

                  <p className="mt-3 text-sm text-slate-500">
                    {prediction.latitude.toFixed(
                      4
                    )}
                    ,{" "}
                    {prediction.longitude.toFixed(
                      4
                    )}
                  </p>
                </div>
              </section>
            )}

            {/* GIS Hotspots */}
            {prediction && !loading && (
              <section
                id="risk-hotspots"
                className="rounded-2xl border border-slate-200 bg-white"
              >
                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-slate-700" />

                        <h3 className="text-lg font-bold">
                          GIS Risk Hotspots
                        </h3>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        Predicted cybercrime-related cash withdrawal risk across monitored locations.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                        High
                      </span>

                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                        Medium
                      </span>

                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                        Low
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <HotspotMap
                    locations={
                      hotspotLocations
                    }
                    location={
                      prediction.location
                    }
                    latitude={
                      prediction.latitude
                    }
                    longitude={
                      prediction.longitude
                    }
                    riskScore={
                      prediction.risk_score
                    }
                    riskLevel={
                      prediction.risk_level
                    }
                    hotspot={
                      prediction.hotspot
                    }
                  />
                </div>
              </section>
            )}

            {/* Location Risk Table */}
            {hotspotLocations.length >
              0 && (
              <section className="rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                  <h3 className="text-lg font-bold">
                    Location Risk Summary
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Model-generated risk across monitored locations.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50">
                      <tr>
                        <th className="px-5 py-3 font-semibold text-slate-600">
                          Location
                        </th>

                        <th className="px-5 py-3 font-semibold text-slate-600">
                          Risk Score
                        </th>

                        <th className="px-5 py-3 font-semibold text-slate-600">
                          Risk Level
                        </th>

                        <th className="px-5 py-3 font-semibold text-slate-600">
                          Hotspot
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {hotspotLocations.map(
                        (item) => (
                          <tr
                            key={`${item.location}-${item.latitude}`}
                            className="hover:bg-slate-50"
                          >
                            <td className="px-5 py-4 font-medium text-slate-900">
                              {item.location}
                            </td>

                            <td className="px-5 py-4 font-semibold">
                              {item.riskScore}%
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getRiskClass(
                                  item.riskLevel
                                )}`}
                              >
                                {
                                  item.riskLevel
                                }
                              </span>
                            </td>

                            <td className="px-5 py-4">
                              {item.hotspot ? (
                                <span className="inline-flex items-center gap-1.5 font-semibold text-red-600">
                                  <CircleAlert className="h-4 w-4" />
                                  Yes
                                </span>
                              ) : (
                                <span className="font-medium text-green-600">
                                  No
                                </span>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Intelligence */}
            {intelligence && (
              <section
                id="intelligence-section"
                className="rounded-2xl border border-slate-200 bg-white"
              >
                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-slate-700" />

                        <h3 className="text-lg font-bold">
                          Actionable Intelligence
                        </h3>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        Intelligence generated from the prediction result.
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getPriorityClass(
                        intelligence.priority
                      )}`}
                    >
                      {
                        intelligence.priority
                      }
                    </span>
                  </div>
                </div>

                <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-5 lg:col-span-2">
                    <p className="text-sm font-semibold text-slate-700">
                      Intelligence
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {
                        intelligence.intelligence
                      }
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-5">
                    <p className="text-sm font-semibold text-slate-700">
                      Recommended Action
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {
                        intelligence.recommended_action
                      }
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Alerts */}
            {alert && (
              <section
                id="alerts-section"
                className="rounded-2xl border border-slate-200 bg-white"
              >
                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-slate-700" />

                    <h3 className="text-lg font-bold">
                      Alert
                    </h3>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Proactive monitoring alert generated from the prediction.
                  </p>
                </div>

                <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-3">
                  <div className="rounded-xl border border-red-100 bg-red-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                      Alert ID
                    </p>

                    <p className="mt-2 break-all text-sm font-bold text-red-900">
                      {alert.alert_id}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Location
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      {alert.location}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Risk: {alert.risk_score}%
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold ${getPriorityClass(
                          alert.priority
                        )}`}
                      >
                        {alert.priority}
                      </span>

                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
                        {
                          alert.alert_status
                        }
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5 lg:col-span-2">
                    <p className="text-sm font-semibold text-slate-700">
                      Alert Message
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {alert.message}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-5">
                    <p className="text-sm font-semibold text-slate-700">
                      Recommended Action
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {
                        alert.recommended_action
                      }
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Footer */}
            <footer className="border-t border-slate-200 py-6 text-center">
              <p className="text-xs text-slate-500">
                CyberPehra • Predictive Cybercrime Intelligence System
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Intelligence supports timely and proactive intervention.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  step?: string;
  placeholder?: string;
};

function InputField({
  label,
  value,
  onChange,
  type = "text",
  step,
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        step={step}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
      />
    </div>
  );
}
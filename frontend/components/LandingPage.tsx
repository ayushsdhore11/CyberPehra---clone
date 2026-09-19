"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Database,
  FileWarning,
  LockKeyhole,
  MapPin,
  MapPinned,
  ShieldAlert,
  ShieldCheck,
  Share2,
  Target,
  UserCheck,
} from "lucide-react";
import type { ReactNode } from "react";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* =====================================================
          SUBTLE TECHNICAL BACKGROUND
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft, restrained ambient highlights */}
        <div className="absolute left-1/2 top-[-100px] h-[320px] w-[580px] -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute right-[-100px] top-[140px] h-[260px] w-[260px] rounded-full bg-slate-100/60 blur-3xl" />

        {/* Crisp, fine architectural grid */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      {/* =====================================================
          MAIN SECTIONS
      ===================================================== */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <Security />
        <Footer />
      </div>
    </main>
  );
}

/* =========================================================
   HERO SECTION
========================================================= */

function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Core Message & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-900 shadow-xs">
              <ShieldCheck size={13} className="text-blue-700" />
              <span>AI-Powered Cybercrime Intelligence</span>
            </div>

            <h1 className="mt-3.5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-[46px] lg:leading-[1.12]">
              Predict Cybercrime{" "}
              <span className="text-blue-800">
                Before It Escalates
              </span>
            </h1>

            <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              CyberPehra analyzes cybercrime complaint and transaction patterns
              to identify potential cash-withdrawal hotspots, assess risk, and
              generate actionable intelligence for proactive intervention.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
              >
                Access Platform
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-950"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-600">
              <HeroFeature text="Predictive risk analysis" />
              <HeroFeature text="Location intelligence" />
              <HeroFeature text="Actionable alerts" />
            </div>
          </motion.div>

          {/* Right Column: Predictive Intelligence Preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <PredictiveCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroFeature({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <CheckCircle2 size={14} className="text-emerald-600" />
      {text}
    </span>
  );
}

/* =========================================================
   PREDICTIVE CARD (Hero Visual Preview)
========================================================= */

function PredictiveCard() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="relative overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-md">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 text-white shadow-xs">
              <BrainCircuit size={17} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-900">
                Predictive Intelligence
              </p>
              <p className="text-[11px] text-slate-500">
                Cybercrime risk analysis workflow
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Operational
          </div>
        </div>

        {/* Workflow Steps Preview */}
        <div className="space-y-1.5 px-3.5 py-3.5">
          <WorkflowStep
            number="01"
            icon={<FileWarning size={15} />}
            title="Cybercrime Complaints"
            description="Complaint and transaction signals"
            badge="Signals"
          />

          <WorkflowConnector />

          <WorkflowStep
            number="02"
            icon={<BrainCircuit size={15} />}
            title="Pattern & Transaction Analysis"
            description="Identify relevant risk signals"
            badge="Processing"
            active
          />

          <WorkflowConnector />

          <WorkflowStep
            number="03"
            icon={<MapPin size={15} />}
            title="Likely Cash Withdrawal Location"
            description="Potential hotspot for verification"
            badge="Forecasting"
          />

          <WorkflowConnector />

          <WorkflowStep
            number="04"
            icon={<ShieldCheck size={15} />}
            title="Actionable Intelligence"
            description="Support timely intervention"
            badge="Interdiction"
          />
        </div>

        {/* Card Footer */}
        <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-2.5">
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck size={14} className="shrink-0 text-blue-700" />
            <p className="text-[10px] font-medium leading-normal text-slate-500">
              Predictive output supports authorized human decision-making and verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowStep({
  number,
  icon,
  title,
  description,
  badge,
  active = false,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  badge: string;
  active?: boolean;
}) {
  return (
    <div
      className={`group flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors ${
        active
          ? "border-blue-200 bg-blue-50/40"
          : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          active
            ? "bg-blue-900 text-white"
            : "bg-slate-100 text-slate-700 group-hover:text-blue-900"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-400">
            {number}
          </span>
          <p className="truncate text-xs font-bold text-slate-900">
            {title}
          </p>
        </div>
        <p className="truncate text-[10px] text-slate-500">
          {description}
        </p>
      </div>

      <span
        className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold ${
          active
            ? "bg-blue-100 text-blue-800"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {badge}
      </span>
    </div>
  );
}

function WorkflowConnector() {
  return (
    <div className="relative ml-[27px] h-2">
      <div className="absolute left-0 top-0 h-full border-l border-slate-200" />
    </div>
  );
}

/* =========================================================
   FEATURES (Core Capabilities)
========================================================= */

const features = [
  {
    title: "Complaint Intelligence",
    description:
      "Organize cybercrime complaint information and identify relevant patterns for further analysis.",
    icon: BrainCircuit,
  },
  {
    title: "Predictive Risk Analysis",
    description:
      "Analyze complaint and transaction patterns to assess potential location-based risk.",
    icon: ShieldAlert,
  },
  {
    title: "Withdrawal Hotspot Forecasting",
    description:
      "Identify potential cash-withdrawal locations that may require verification and monitoring.",
    icon: MapPinned,
  },
  {
    title: "Actionable Intelligence & Alerts",
    description:
      "Convert predictive results into structured intelligence and alerts for authorized users.",
    icon: BellRing,
  },
];

function Features() {
  return (
    <section id="features" className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue-800">
            Core Capabilities
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Intelligence Built Around the Problem
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            CyberPehra combines complaint intelligence, predictive analysis,
            hotspot forecasting, and actionable alerts in one platform.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-3.5 text-base font-bold text-slate-950">
                    {feature.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HOW IT WORKS (Operational Workflow)
========================================================= */

const steps = [
  {
    icon: Database,
    number: "01",
    title: "Cybercrime Complaints",
    description:
      "Complaint and related transaction data enter the intelligence workflow.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Pattern & Transaction Analysis",
    description:
      "Complaint, transaction, and location patterns are analyzed for risk signals.",
  },
  {
    icon: Target,
    number: "03",
    title: "Risk Prediction",
    description:
      "System models patterns to estimate risk and forecast potential withdrawal points.",
  },
  {
    icon: MapPin,
    number: "04",
    title: "Hotspot Forecasting",
    description:
      "Likely withdrawal hotspots are visualized geographically for verification.",
  },
  {
    icon: BellRing,
    number: "05",
    title: "Alerts & Intelligence",
    description:
      "Structured alerts support authorized agencies and banks in taking action.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative border-y border-slate-200/70 bg-slate-50/60 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-800">
            Operational Workflow
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            How CyberPehra Works
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            CyberPehra analyzes complaint and transaction patterns to forecast
            likely cash withdrawal hotspots and generate actionable intelligence for timely response.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 sm:gap-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative flex flex-col rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-bold text-blue-800">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-bold text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECURITY & ACCESS GOVERNANCE
========================================================= */

const securityPoints = [
  {
    icon: LockKeyhole,
    title: "Secure Access",
    description:
      "Investigative intelligence is provided through a secure interface for authorized users.",
  },
  {
    icon: UserCheck,
    title: "Authorized Investigators",
    description:
      "Access to alerts, intelligence reports, and supporting evidence is restricted to authorized personnel.",
  },
  {
    icon: Share2,
    title: "Controlled Intelligence Sharing",
    description:
      "Relevant alerts and intelligence can be shared with authorized law enforcement agencies and financial institutions.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible Data Handling",
    description:
      "The system is designed with security and data protection considerations for sensitive cybercrime intelligence.",
  },
];

function Security() {
  return (
    <section id="security" className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-800">
            Security & Access Governance
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Secure Intelligence for Authorized Action
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            CyberPehra is designed to provide sensitive cybercrime intelligence
            through secure, controlled, and authorized access.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {securityPoints.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                  <Icon size={20} />
                </div>

                <h3 className="mt-3.5 text-base font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Verification advisory callout */}
        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-700 sm:text-sm">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>
              Sensitive intelligence is intended for authorized users and supports human verification and decision-making.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER (Institutional / Security Portal)
========================================================= */

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Platform Identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-900 text-white">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-slate-950">CyberPehra</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
              Predictive intelligence platform for forecasting likely cash withdrawal hotspots
              from cybercrime complaint and transaction patterns.
            </p>
            <p className="mt-3 text-[11px] text-slate-500">
              Authorized access only. All activities are monitored and logged.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quick Navigation
            </h4>
            <ul className="mt-2.5 space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/" className="hover:text-blue-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-900 transition-colors">
                  Core Capabilities
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-blue-900 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-blue-900 transition-colors">
                  Security & Governance
                </a>
              </li>
              <li>
                <Link href="/login" className="font-semibold text-blue-800 hover:underline">
                  Authorized Login &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency / Reporting Portal Notice */}
          <div className="lg:col-span-4">
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-900">
                National Cybercrime Reporting
              </h4>
              <p className="mt-1.5 text-xs text-slate-600">
                If you have been a victim of cyber financial fraud, report immediately to the National Cyber Crime Helpline:
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="rounded bg-blue-900 px-2 py-0.5 text-xs font-bold text-white">
                  1930
                </span>
                <span className="text-xs font-medium text-slate-700">
                  or visit <span className="font-semibold text-blue-800">cybercrime.gov.in</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 pt-4 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} CyberPehra Intelligence System. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500">
            Confidential &bull; Law Enforcement & Financial Security Network
          </p>
        </div>
      </div>
    </footer>
  );
}
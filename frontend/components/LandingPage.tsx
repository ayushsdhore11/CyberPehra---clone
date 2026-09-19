"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowDown,
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
  Sparkles,
  Target,
  UserCheck,
} from "lucide-react";
import type { ReactNode } from "react";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* =====================================================
          ONE COMMON BACKGROUND FOR ENTIRE LANDING PAGE
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft gradient blobs */}
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="absolute right-[-180px] top-[100px] h-[350px] w-[350px] rounded-full bg-cyan-100/40 blur-3xl" />

        <div className="absolute bottom-[-180px] left-[-180px] h-[350px] w-[350px] rounded-full bg-indigo-100/40 blur-3xl" />

        {/* One continuous subtle grid */}
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(37,99,235,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.035)_1px,transparent_1px)] [background-size:44px_44px]" />

        {/* Subtle dots */}
        <div className="absolute right-[5%] top-[30%] grid grid-cols-5 gap-2 opacity-25">
          {Array.from({ length: 25 }).map((_, i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full bg-blue-300"
            />
          ))}
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <Security />
      </div>
    </main>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 mx-auto grid min-h-[75vh] max-w-7xl items-center gap-8 px-6 py-8 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-8">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
            <Sparkles size={13} />
            AI-Powered Cybercrime Intelligence
          </div>

          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.04] tracking-tight text-slate-950 sm:text-5xl lg:text-[58px]">
            Predict Cybercrime
            <br />
            <span className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Before It Escalates
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            CyberPehra analyzes cybercrime complaint and transaction patterns
            to identify potential cash-withdrawal hotspots, assess risk, and
            generate actionable intelligence for proactive intervention.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="group inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
            >
              Access Platform

              <ArrowRight
                size={17}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#how-it-works"
              className="group inline-flex items-center rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              See How It Works

              <ArrowDown
                size={16}
                className="ml-2 transition-transform group-hover:translate-y-0.5"
              />
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium text-slate-500">
            <HeroFeature text="Predictive risk analysis" />
            <HeroFeature text="Location intelligence" />
            <HeroFeature text="Actionable alerts" />
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 25, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <PredictiveCard />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-slate-400 lg:block"
      >
        <ArrowDown size={15} />
      </motion.div>
    </section>
  );
}

function HeroFeature({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <CheckCircle2 size={14} className="text-emerald-500" />
      {text}
    </span>
  );
}

/* =========================================================
   PREDICTIVE CARD
========================================================= */

function PredictiveCard() {
  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative mx-auto w-full max-w-[440px]"
    >
      <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-r from-blue-200/30 via-cyan-200/30 to-indigo-200/30 blur-xl" />

      <div className="relative overflow-hidden rounded-[24px] border border-blue-100 bg-white/95 shadow-[0_20px_55px_rgba(37,99,235,0.13)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-100 text-blue-600"
            >
              <BrainCircuit size={20} />
            </motion.div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
                Predictive Intelligence
              </p>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Cybercrime risk analysis workflow
              </p>
            </div>
          </div>

          <div className="hidden gap-1.5 sm:flex">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            <span className="h-2 w-2 rounded-full bg-violet-400" />
          </div>
        </div>

        <div className="space-y-2.5 px-4 py-4">
          <WorkflowStep
            number="01"
            icon={<FileWarning size={18} />}
            title="Cybercrime Complaints"
            description="Complaint and transaction signals"
            color="blue"
          />

          <WorkflowConnector />

          <WorkflowStep
            number="02"
            icon={<BrainCircuit size={18} />}
            title="Pattern & Transaction Analysis"
            description="Identify relevant risk signals"
            color="cyan"
            active
          />

          <WorkflowConnector />

          <WorkflowStep
            number="03"
            icon={<MapPin size={18} />}
            title="Likely Cash Withdrawal Location"
            description="Potential hotspot for verification"
            color="indigo"
          />

          <WorkflowConnector />

          <WorkflowStep
            number="04"
            icon={<ShieldCheck size={18} />}
            title="Actionable Intelligence"
            description="Support timely intervention"
            color="green"
          />
        </div>

        <div className="border-t border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-cyan-50/70 px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <ShieldCheck size={15} />
            </div>

            <p className="text-[9px] font-medium leading-3.5 text-slate-500">
              Predictive output supports authorized human decision-making and
              verification.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WorkflowStep({
  number,
  icon,
  title,
  description,
  color,
  active = false,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  color: "blue" | "cyan" | "indigo" | "green";
  active?: boolean;
}) {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    cyan: "bg-cyan-50 text-cyan-600",
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-emerald-50 text-emerald-600",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -1 }}
      transition={{ duration: 0.2 }}
      className={`group relative flex items-center gap-3 rounded-[17px] border px-3 py-3 ${
        active
          ? "border-cyan-200 bg-gradient-to-r from-cyan-50/80 via-white to-blue-50/60 shadow-[0_6px_20px_rgba(6,182,212,0.08)]"
          : "border-slate-100 bg-white hover:border-blue-100 hover:bg-blue-50/30"
      }`}
    >
      {active && (
        <motion.div
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -left-1 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-cyan-400"
        />
      )}

      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles[color]}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span
            className={`rounded-full px-1.5 py-0.5 text-[8px] font-black ${styles[color]}`}
          >
            {number}
          </span>

          <p className="truncate text-xs font-extrabold text-slate-900 sm:text-sm">
            {title}
          </p>
        </div>

        <p className="mt-0.5 text-[9px] leading-3.5 text-slate-500">
          {description}
        </p>
      </div>

      <ChevronRight
        size={16}
        className="shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500"
      />
    </motion.div>
  );
}

function WorkflowConnector() {
  return (
    <div className="relative ml-[25px] h-2.5">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-blue-200" />

      <motion.div
        animate={{
          y: [0, 7, 0],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[calc(50%-2px)] top-0 h-1 w-1 rounded-full bg-cyan-500"
      />
    </div>
  );
}

/* =========================================================
   FEATURES
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
    <section
      id="features"
      className="relative px-6 py-20 sm:px-8 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900">
            Core Capabilities
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Intelligence Built Around the Problem
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            CyberPehra combines complaint intelligence, predictive analysis,
            hotspot forecasting, and actionable alerts in one platform.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className="group rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-800 transition group-hover:bg-blue-900 group-hover:text-white">
                  <Icon size={21} />
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HOW IT WORKS
========================================================= */

const steps = [
  {
    icon: Database,
    number: "01",
    title: "Cybercrime Complaints",
    description:
      "Complaint and related transaction information enters the intelligence workflow.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Pattern & Transaction Analysis",
    description:
      "Complaint, transaction, account, and location patterns are analyzed to identify relevant signals.",
  },
  {
    icon: Target,
    number: "03",
    title: "Risk Prediction",
    description:
      "The system analyzes identified patterns to estimate risk and forecast likely cash withdrawal locations.",
  },
  {
    icon: MapPin,
    number: "04",
    title: "Hotspot Forecasting",
    description:
      "Potential withdrawal hotspots are visualized geographically through risk intelligence.",
  },
  {
    icon: BellRing,
    number: "05",
    title: "Alerts & Intelligence",
    description:
      "Timely alerts and intelligence support authorized agencies and financial institutions in taking appropriate action.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative px-6 py-20 sm:px-8 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            How It Works
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            How{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              CyberPehra
            </span>{" "}
            Works
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            CyberPehra analyzes complaint and transaction patterns to forecast
            likely cash withdrawal hotspots and generate actionable
            intelligence for timely response.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-[10%] right-[10%] top-12 hidden h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative text-center"
                >
                  <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-blue-100 bg-white/95 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-blue-200 group-hover:shadow-md">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition duration-300 group-hover:bg-blue-900 group-hover:text-white">
                      <Icon size={24} />
                    </div>
                  </div>

                  <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-blue-700">
                    {step.number}
                  </p>

                  <h3 className="mt-2 text-base font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECURITY
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
      "Access to alerts, intelligence reports, and supporting evidence is designed for authorized personnel.",
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
    <section
      id="security"
      className="relative px-6 py-20 sm:px-8 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Security & Access
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Secure Intelligence for{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Authorized Action
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            CyberPehra is designed to provide sensitive cybercrime intelligence
            through secure, controlled, and authorized access.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {securityPoints.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition duration-300 group-hover:bg-blue-900 group-hover:text-white">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-blue-100 bg-white/95 px-6 py-4 text-center shadow-sm">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />

            Sensitive intelligence is intended for authorized users and
            supports human verification and decision-making.
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  BrainCircuit,
  CheckCircle2,
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
import { type ReactNode } from "react";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white pt-[68px] text-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-160px] h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute right-[-160px] top-[420px] h-[340px] w-[340px] rounded-full bg-slate-100/70 blur-3xl" />
        <div className="absolute left-[-180px] top-[1050px] h-[320px] w-[320px] rounded-full bg-blue-50/80 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="relative z-10">
        <Hero />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <Security />
        <ClosingCTA />
        <Footer />
      </div>
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:max-w-[1360px] lg:px-8 lg:py-14 xl:max-w-[1440px] xl:py-16 2xl:max-w-[1520px]">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-blue-900">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              AI-Powered Cybercrime Intelligence
            </div>

            <h1 className="mt-3 max-w-3xl text-[30px] font-extrabold leading-[1.1] tracking-tight text-slate-950 sm:text-[38px] lg:text-[40px] xl:text-[46px] 2xl:text-[52px]">
              Predict Likely
              <span className="block text-blue-800">
                Cash Withdrawal Locations
              </span>
              <span className="block">in Advance</span>
            </h1>

            <p className="mt-3 max-w-2xl text-[14px] leading-6 text-slate-600 sm:text-base sm:leading-7 xl:text-lg">
              CyberPehra analyzes cybercrime complaints and transaction
              patterns to forecast likely cash-withdrawal hotspots, assess
              risk, and generate actionable intelligence for timely
              intervention.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-950 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-900 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 xl:py-3"
              >
                Access Intelligence Platform
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 xl:py-3"
              >
                Explore Workflow
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 border-t border-slate-200 pt-4">
              <HeroFeature text="Predictive risk analysis" />
              <HeroFeature text="Location intelligence" />
              <HeroFeature text="Actionable alerts" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
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
    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 sm:text-sm">
      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
      {text}
    </div>
  );
}

function PredictiveCard() {
  return (
    <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto lg:mr-0">
      <div className="absolute -inset-5 rounded-[28px] bg-blue-100/40 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <div className="border-b border-slate-200 bg-slate-950 px-4 py-3 text-white xl:px-5 xl:py-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-800 xl:h-10 xl:w-10">
                <BrainCircuit className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-200">
                  Intelligence Engine
                </p>
                <p className="mt-0.5 text-xs text-slate-300">
                  Predictive analysis workflow
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              ACTIVE
            </div>
          </div>
        </div>

        <div className="space-y-2 p-3.5 xl:space-y-2.5 xl:p-4">
          <WorkflowStep
            number="01"
            icon={<FileWarning size={16} />}
            title="Cybercrime Complaints"
            description="Complaint and transaction signals"
            badge="INPUT"
          />

          <WorkflowConnector />

          <WorkflowStep
            number="02"
            icon={<BrainCircuit size={16} />}
            title="Pattern Analysis"
            description="Identify relevant risk signals"
            badge="ANALYSIS"
            active
          />

          <WorkflowConnector />

          <WorkflowStep
            number="03"
            icon={<MapPin size={16} />}
            title="Likely Withdrawal Location"
            description="Forecast potential cash hotspot"
            badge="FORECAST"
          />

          <WorkflowConnector />

          <WorkflowStep
            number="04"
            icon={<ShieldCheck size={16} />}
            title="Actionable Intelligence"
            description="Support timely intervention"
            badge="ACTION"
          />
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-4 py-2.5 xl:px-5 xl:py-3">
          <div className="flex gap-2.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-800" />
            <p className="text-[10px] leading-relaxed text-slate-500">
              Predictive output supports authorized human verification and
              decision-making.
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
      className={`flex items-center gap-3 rounded-xl border p-2.5 transition-all xl:p-3 ${
        active
          ? "border-blue-200 bg-blue-50/70 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg xl:h-9 xl:w-9 ${
          active ? "bg-blue-950 text-white" : "bg-slate-100 text-slate-700"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-extrabold tracking-wide text-slate-400">
            {number}
          </span>
          <p className="truncate text-xs font-bold text-slate-900">{title}</p>
        </div>

        <p className="mt-0.5 truncate text-[10px] text-slate-500">
          {description}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-md px-1.5 py-1 text-[8px] font-extrabold tracking-wide ${
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
    <div className="relative ml-[27px] h-2 xl:ml-[31px]">
      <div className="absolute left-0 top-0 h-full border-l border-dashed border-slate-300" />
    </div>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-slate-200 bg-slate-50/70">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-200 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:max-w-[1360px] lg:px-8 xl:max-w-[1440px] 2xl:max-w-[1520px]">
        <TrustItem
          icon={<ShieldCheck />}
          title="Secure Intelligence"
          description="Controlled access for authorized users"
        />
        <TrustItem
          icon={<Target />}
          title="Predictive Analysis"
          description="Risk-based location forecasting"
        />
        <TrustItem
          icon={<MapPinned />}
          title="GIS Visualization"
          description="Geographic hotspot intelligence"
        />
      </div>
    </section>
  );
}

function TrustItem({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 px-2 py-4 sm:px-6 xl:py-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-900 shadow-sm ring-1 ring-slate-200">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold text-slate-900">{title}</p>
        <p className="mt-0.5 text-[11px] text-slate-500">{description}</p>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Complaint Intelligence",
    description:
      "Organize cybercrime complaint information and identify relevant patterns for further analysis.",
    icon: BrainCircuit,
    metric: "Structured intake",
  },
  {
    title: "Predictive Risk Analysis",
    description:
      "Analyze complaint and transaction patterns to assess potential location-based risk.",
    icon: ShieldAlert,
    metric: "0–100 risk score",
  },
  {
    title: "Withdrawal Hotspot Forecasting",
    description:
      "Identify potential cash-withdrawal locations that may require verification and monitoring.",
    icon: MapPinned,
    metric: "GIS heatmap",
  },
  {
    title: "Actionable Intelligence & Alerts",
    description:
      "Convert predictive results into structured intelligence and alerts for authorized users.",
    icon: BellRing,
    metric: "Real-time alerts",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-[88px] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:max-w-[1360px] lg:px-8 xl:max-w-[1440px] 2xl:max-w-[1520px]">
        <SectionHeading
          eyebrow="Core Capabilities"
          title="Intelligence Built Around the Problem"
          description="CyberPehra combines complaint intelligence, predictive analysis, hotspot forecasting, and actionable alerts in one operational workflow."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900 transition-colors group-hover:bg-blue-950 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>

                <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700">
                  {feature.metric}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
    title: "Pattern Analysis",
    description:
      "Complaint, transaction, and location patterns are analyzed for risk signals.",
  },
  {
    icon: Target,
    number: "03",
    title: "Risk Prediction",
    description:
      "The model estimates risk and forecasts potential withdrawal points.",
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
      "Structured alerts support authorized agencies and financial institutions.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-[88px] border-y border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:max-w-[1360px] lg:px-8 xl:max-w-[1440px] 2xl:max-w-[1520px]">
        <SectionHeading
          eyebrow="Operational Workflow"
          title="How CyberPehra Works"
          description="From cybercrime complaints to predictive location intelligence and actionable alerts."
        />

        <div className="relative mt-12">
          <div className="absolute left-[10%] right-[10%] top-12 hidden border-t border-dashed border-slate-300 lg:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 text-white shadow-sm ring-4 ring-slate-50">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-xs font-extrabold tracking-wide text-blue-800">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-bold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-800">
        {eyebrow}
      </p>

      <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}

const securityPoints = [
  {
    icon: LockKeyhole,
    title: "Secure Access",
    description:
      "Investigative intelligence is provided through a secure interface for authorized users.",
    featured: true,
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
      "Relevant intelligence can be shared with authorized law enforcement agencies and financial institutions.",
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
      className="relative scroll-mt-[88px] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:max-w-[1360px] lg:px-8 xl:max-w-[1440px] 2xl:max-w-[1520px]">
        <SectionHeading
          eyebrow="Security & Access Governance"
          title="Secure Intelligence for Authorized Action"
          description="CyberPehra is designed to provide sensitive cybercrime intelligence through secure, controlled, and authorized access."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {securityPoints.map((item) => {
            const Icon = item.icon;
            const featured = item.featured;

            return (
              <div
                key={item.title}
                className={`rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md ${
                  featured
                    ? "border-blue-200 bg-blue-50/40"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    featured
                      ? "bg-blue-950 text-white"
                      : "bg-blue-50 text-blue-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

          <p className="text-xs leading-5 text-slate-700 sm:text-sm">
            Sensitive intelligence is intended for authorized users and
            supports human verification and decision-making.
          </p>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-800">
          Get Started
        </p>

        <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
          Ready to predict the next hotspot?
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Access the intelligence console with authorized credentials, or
          request a walkthrough for your agency or institution.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/login"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-950 px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-900 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Authorized Login
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-100"
          >
            Review Workflow
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:max-w-[1360px] lg:px-8 xl:max-w-[1440px] 2xl:max-w-[1520px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-800 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="font-bold text-white">CyberPehra</p>
                <p className="text-[9px] uppercase tracking-[0.15em] text-slate-500">
                  Predictive Cybercrime Intelligence
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              Predictive intelligence platform for forecasting likely cash
              withdrawal hotspots from cybercrime complaint and transaction
              patterns.
            </p>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              System Operational
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform
            </h4>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-white"
                >
                  Core Capabilities
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-white"
                >
                  How It Works
                </a>
              </li>

              <li>
                <a
                  href="#security"
                  className="transition-colors hover:text-white"
                >
                  Security & Governance
                </a>
              </li>

              <li>
                <Link
                  href="/login"
                  className="font-semibold text-blue-300 transition-colors hover:text-white"
                >
                  Authorized Login →
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                National Cybercrime Reporting
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                If you are a victim of cyber financial fraud, report
                immediately through the National Cyber Crime Helpline.
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="rounded-lg bg-blue-800 px-3 py-1.5 text-sm font-extrabold text-white">
                  1930
                </span>

                <span className="text-xs text-slate-400">
                  National Cyber Crime Helpline
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-800 pt-5 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CyberPehra Intelligence System. All
            rights reserved.
          </p>

          <p>Confidential • Law Enforcement & Financial Security Network</p>
        </div>
      </div>
    </footer>
  );
}
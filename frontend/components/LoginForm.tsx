"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [role, setRole] = useState<"admin" | "citizen">("admin");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/complaint");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[640px] w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl lg:grid-cols-12">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 p-8 text-white sm:p-10 lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-950 shadow-md">
                <ShieldCheck size={22} />
              </div>

              <div className="text-left">
                <h1 className="text-xl font-black tracking-tight">
                  CyberPehra
                </h1>

                <p className="text-[11px] font-medium text-blue-200">
                  Cybercrime Intelligence Platform
                </p>
              </div>
            </button>
          </div>

          <div className="relative z-10 my-auto space-y-4 py-10">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    Predictive Intelligence
                  </h3>

                  <p className="text-[11px] text-blue-200">
                    Cybercrime risk analysis
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px]">
                <span className="text-blue-200">
                  Intelligence Status
                </span>

                <span className="font-bold text-cyan-300">
                  SECURE
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-bold">
                From complaints to intelligence
              </h3>

              <p className="mt-1.5 text-[11px] leading-5 text-blue-200">
                Analyze cybercrime patterns, forecast potential
                withdrawal hotspots, and support proactive
                intervention.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 border-t border-white/10 pt-4 text-[11px] text-blue-200">
            <ShieldCheck size={15} className="text-cyan-300" />
            <span>Authorized access • Secure session</span>
          </div>
        </section>

        <section className="flex items-center bg-white p-8 sm:p-10 lg:col-span-7 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h1 className="text-lg font-black text-slate-900">
                  CyberPehra
                </h1>

                <p className="text-[10px] text-slate-500">
                  Cybercrime Intelligence Platform
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-800">
                Authorized Access
              </p>

              <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-900">
                Welcome Back
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Sign in to continue to the CyberPehra platform
              </p>
            </div>

            <div className="mb-5">
              <p className="mb-2 text-xs font-bold text-slate-700">
                Select Access Type
              </p>

              <div className="grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold transition ${
                    role === "admin"
                      ? "bg-blue-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <ShieldCheck size={15} />
                  Admin / LEA
                </button>

                <button
                  type="button"
                  onClick={() => setRole("citizen")}
                  className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold transition ${
                    role === "citizen"
                      ? "bg-blue-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <User size={15} />
                  Citizen
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-bold text-slate-700"
                >
                  Email / Official ID
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail size={16} />
                  </div>

                  <input
                    id="email"
                    type="text"
                    placeholder="Enter your email or official ID"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-800 transition hover:text-indigo-700"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <LockKeyhole size={16} />
                  </div>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition hover:text-slate-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-950 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-95 hover:shadow-lg"
              >
                Sign In
                <ArrowRight size={17} />
              </button>
            </form>

            <div className="mt-6 flex items-start gap-2 border-t border-slate-100 pt-4">
              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-emerald-500"
              />

              <p className="text-[10px] leading-4 text-slate-500">
                Access is restricted to authorized users. Sensitive
                cybercrime intelligence is protected through controlled
                access.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
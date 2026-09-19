"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, ShieldCheck, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#security", label: "Security" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLoginPage = pathname === "/login";
  const isDashboardPage = pathname === "/dashboard";

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/95 py-3 shadow-sm backdrop-blur-md"
          : "border-b border-slate-100 bg-white/90 py-4 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-10 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 via-indigo-700 to-cyan-500 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900">
                CyberPehra
              </span>

              <span className="-mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-600">
                Intelligence System
              </span>
            </div>
          </Link>

          {/* Desktop */}
          {!isLoginPage && !isDashboardPage && (
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-blue-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Desktop Actions */}
          {!isDashboardPage && (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/login"
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isLoginPage
                    ? "bg-blue-50 text-blue-900"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-900"
                }`}
              >
                Login
              </Link>

              {!isLoginPage && (
                <Link
                  href="/login"
                  className="group inline-flex items-center rounded-xl bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-950 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Get Started
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          )}

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-200 bg-white md:hidden"
          >
            <div className="space-y-2 px-4 pb-5 pt-3">
              {!isLoginPage &&
                !isDashboardPage &&
                navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-900"
                  >
                    {link.label}
                  </Link>
                ))}

              {!isDashboardPage && (
                <div className="border-t border-slate-100 pt-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl bg-blue-900 px-4 py-2.5 text-center text-sm font-bold text-white"
                  >
                    {isLoginPage ? "Login" : "Access Platform"}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
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
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/95 py-2.5 shadow-sm backdrop-blur-md"
          : "border-b border-slate-100 bg-white/90 py-3 backdrop-blur-sm"
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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-950 leading-tight">
                CyberPehra
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Intelligence System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isLoginPage && !isDashboardPage && (
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100/80 hover:text-slate-950"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Desktop Actions */}
          {!isDashboardPage && (
            <div className="hidden items-center gap-2.5 md:flex">
              <Link
                href="/login"
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isLoginPage
                    ? "bg-slate-100 text-slate-900 font-semibold"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
                }`}
              >
                Login
              </Link>

              {!isLoginPage && (
                <Link
                  href="/login"
                  className="group inline-flex items-center rounded-lg bg-blue-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
                >
                  Access Platform
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          )}

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-lg p-1.5 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
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
            <div className="space-y-1 px-4 pb-4 pt-2">
              {!isLoginPage &&
                !isDashboardPage &&
                navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-900"
                  >
                    {link.label}
                  </Link>
                ))}

              {!isDashboardPage && (
                <div className="border-t border-slate-100 pt-2.5">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg bg-blue-900 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-800"
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
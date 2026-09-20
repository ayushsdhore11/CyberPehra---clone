"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Menu, ShieldCheck, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setHidden(false);
      } else if (currentScrollY > lastScrollY.current) {
        setHidden(true);
        setMobileOpen(false);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isLoginPage = pathname === "/login";
  const isDashboardPage = pathname === "/dashboard";

  if (isDashboardPage) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:max-w-[1360px] lg:px-8 xl:max-w-[1440px] 2xl:max-w-[1520px]">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-950 text-white shadow-sm">
            <ShieldCheck className="h-[19px] w-[19px]" />
          </div>

          <div>
            <div className="text-[17px] font-extrabold tracking-tight text-slate-950">
              CyberPehra
            </div>

            <div className="hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:block">
              Predictive Cybercrime Intelligence
            </div>
          </div>
        </Link>

        {!isLoginPage && (
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/#features"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-950"
            >
              Platform
            </Link>

            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-950"
            >
              How It Works
            </Link>

            <Link
              href="/#security"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-950"
            >
              Security
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-900 hover:shadow-md"
            >
              Authorized Login
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        )}

        {isLoginPage && (
          <Link
            href="/"
            className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 md:inline-flex"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        )}

        <button
          type="button"
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-200 bg-white md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6 lg:max-w-[1360px] xl:max-w-[1440px] 2xl:max-w-[1520px]">
              {!isLoginPage && (
                <>
                  <Link
                    href="/#features"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-950"
                  >
                    Platform
                  </Link>

                  <Link
                    href="/#how-it-works"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-950"
                  >
                    How It Works
                  </Link>

                  <Link
                    href="/#security"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-950"
                  >
                    Security
                  </Link>
                </>
              )}

              <Link
                href={isLoginPage ? "/" : "/login"}
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-950 px-4 py-3 text-sm font-semibold text-white"
              >
                {isLoginPage ? (
                  <>
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </>
                ) : (
                  <>
                    Authorized Login
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
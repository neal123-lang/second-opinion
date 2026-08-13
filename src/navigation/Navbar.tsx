"use client";

import { Activity, ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);


  const [patientOpen, setPatientOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);

  const [mobilePatientOpen, setMobilePatientOpen] = useState(false);
  const [mobileProviderOpen, setMobileProviderOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

const patientRef = useRef<HTMLDivElement>(null);
const providerRef = useRef<HTMLDivElement>(null);

  const closeAllMenus = () => {
  setMobileOpen(false);
  setPatientOpen(false);
  setProviderOpen(false);
  setMobilePatientOpen(false);
  setMobileProviderOpen(false);
  setMobileAboutOpen(false);
};

  // Close desktop dropdowns on outside click or Escape
  useEffect(() => {
  if (!patientOpen && !providerOpen) return;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      patientOpen &&
      patientRef.current &&
      event.target instanceof Node &&
      !patientRef.current.contains(event.target)
    ) {
      setPatientOpen(false);
    }

    if (
      providerOpen &&
      providerRef.current &&
      event.target instanceof Node &&
      !providerRef.current.contains(event.target)
    ) {
      setProviderOpen(false);
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setPatientOpen(false);
      setProviderOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("keydown", handleEscape);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleEscape);
  };
}, [patientOpen, providerOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[76px] items-center">
            {/* =========================================================
                LOGO
            ========================================================== */}
            <Link
              href="/"
              onClick={closeAllMenus}
              className="group flex shrink-0 items-center gap-3"
              aria-label="Second Opinion by Qikplus - Home"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#5645D4] shadow-sm shadow-[#5645D4]/20 transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#5645D4]/30">
                <Activity
                  className="h-[19px] w-[19px] text-white"
                  strokeWidth={2.5}
                />

                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#8B7FE8]" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-extrabold tracking-tight text-[#172033] sm:text-[16px]">
                  Second Opinion
                </span>

                <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#5645D4]">
                  Qikplus Platform
                </span>
              </div>
            </Link>

            {/* =========================================================
                DESKTOP NAVIGATION
            ========================================================== */}
            <nav
              className="ml-8 hidden items-center gap-0.5 lg:flex"
              aria-label="Main navigation"
            >
              {/* How It Works */}
              <Link
                href="/how-it-works"
                className="rounded-lg px-3 py-2.5 text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-[#5645D4]/5 hover:text-[#5645D4]"
              >
                How It Works
              </Link>

              {/* Specialties */}
              <Link
                href="/surgical-specialties"
                className="rounded-lg px-3 py-2.5 text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-[#5645D4]/5 hover:text-[#5645D4]"
              >
                Specialties
              </Link>

              {/* =====================================================
                  FOR PATIENTS
              ====================================================== */}
              <div className="relative" ref={patientRef}>
                <button
                  type="button"
                  aria-expanded={patientOpen}
                  aria-haspopup="menu"
                  onClick={() => {
                    setPatientOpen(!patientOpen);
                    setProviderOpen(false);
                  }}
                  className="group inline-flex items-center gap-1 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-[#5645D4]/5 hover:text-[#5645D4]"
                >
                  For Patients
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      patientOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {patientOpen && (
                  <div
                    className="absolute left-0 top-[calc(100%+10px)] w-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10"
                    role="menu"
                  >
                    <Link
                      href="/for-patients"
                      onClick={closeAllMenus}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F7F6FD]"
                      role="menuitem"
                    >
                      <span className="block text-sm font-bold text-slate-800">
                        For Patients
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Understand the Qikplus patient experience
                      </span>
                    </Link>

                    <Link
                      href="/patient-journey"
                      onClick={closeAllMenus}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F7F6FD]"
                      role="menuitem"
                    >
                      <span className="block text-sm font-semibold text-slate-700">
                        Patient Journey
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Follow your journey step by step
                      </span>
                    </Link>

                    <Link
                      href="/what-you-receive"
                      onClick={closeAllMenus}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F7F6FD]"
                      role="menuitem"
                    >
                      <span className="block text-sm font-semibold text-slate-700">
                        What You Receive
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Understand your Caselet
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              {/* =====================================================
    RESOURCES
====================================================== */}
              <div className="relative" ref={providerRef}>
                <button
                  type="button"
                  aria-expanded={providerOpen}
                  aria-haspopup="menu"
                  onClick={() => {
                    setProviderOpen(!providerOpen);
                    setPatientOpen(false);
                  }}
                  className="group inline-flex items-center gap-1 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-[#5645D4]/5 hover:text-[#5645D4]"
                >
                  Resources
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      providerOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {providerOpen && (
                  <div
                    className="absolute left-0 top-[calc(100%+10px)] w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10"
                    role="menu"
                  >
                    {/* FAQs */}
                    <Link
                      href="/faqs"
                      onClick={closeAllMenus}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F7F6FD]"
                      role="menuitem"
                    >
                      <span className="block text-sm font-bold text-slate-800">
                        FAQs
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Answers to common patient questions
                      </span>
                    </Link>

                    {/* Blog */}
                    <Link
                      href="/blog"
                      onClick={closeAllMenus}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F7F6FD]"
                      role="menuitem"
                    >
                      <span className="block text-sm font-semibold text-slate-700">
                        Blog
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Insights on surgery and second opinions
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              {/* =====================================================
                  ABOUT
              ====================================================== */}
              <div className="relative">
                <Link
                  href="/about"
                  className="rounded-lg px-3 py-2.5 text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-[#5645D4]/5 hover:text-[#5645D4]"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg px-3 py-2.5 text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-[#5645D4]/5 hover:text-[#5645D4]"
                >
                  Contact
                </Link>
              </div>
            </nav>

            {/* =========================================================
                DESKTOP ACTIONS
            ========================================================== */}
            <div className="ml-auto hidden items-center gap-2 lg:flex">
              <Link
                href="/auth/patient/login"
                className="rounded-lg px-3 py-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:text-[#5645D4]"
              >
                Sign In
              </Link>

              <Link
                href="/auth/patient/login?role=patient"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#5645D4] px-4.5 py-2.5 text-[13px] font-bold text-white shadow-sm shadow-[#5645D4]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4938C2] hover:shadow-md hover:shadow-[#5645D4]/25"
              >
                Get Started
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </Link>
            </div>

            {/* =========================================================
                MOBILE MENU BUTTON
            ========================================================== */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all hover:border-[#C8C2F0] hover:bg-[#F7F6FD] hover:text-[#5645D4] lg:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* =========================================================
              MOBILE NAVIGATION
          ========================================================== */}
          {mobileOpen && (
            <div className="border-t border-slate-100 py-4 lg:hidden">
              <nav
                className="flex max-h-[calc(100vh-100px)] flex-col overflow-y-auto"
                aria-label="Mobile navigation"
              >
                <Link
                  href="/how-it-works"
                  onClick={closeAllMenus}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#F7F6FD] hover:text-[#5645D4]"
                >
                  How It Works
                </Link>

                <Link
                  href="/surgical-specialties"
                  onClick={closeAllMenus}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#F7F6FD] hover:text-[#5645D4]"
                >
                  Specialties
                </Link>

                {/* Mobile Patients */}
                <div className="rounded-xl">
                  <button
                    type="button"
                    onClick={() => setMobilePatientOpen(!mobilePatientOpen)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-[#F7F6FD]"
                  >
                    For Patients
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobilePatientOpen ? "rotate-180 text-[#5645D4]" : ""
                      }`}
                    />
                  </button>

                  {mobilePatientOpen && (
                    <div className="ml-3 border-l border-[#5645D4]/15 pl-3">
                      <Link
                      href="/for-patients"
                      onClick={closeAllMenus}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F7F6FD]"
                      role="menuitem"
                    >
                      <span className="block text-sm font-bold text-slate-800">
                        For Patients
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Understand the Qikplus patient experience
                      </span>
                    </Link>

                    <Link
                      href="/patient-journey"
                      onClick={closeAllMenus}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F7F6FD]"
                      role="menuitem"
                    >
                      <span className="block text-sm font-semibold text-slate-700">
                        Patient Journey
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Follow your journey step by step
                      </span>
                    </Link>

                    <Link
                      href="/what-you-receive"
                      onClick={closeAllMenus}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F7F6FD]"
                      role="menuitem"
                    >
                      <span className="block text-sm font-semibold text-slate-700">
                        What You Receive
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Understand your Caselet
                      </span>
                    </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Providers */}
                <div className="rounded-xl">
                  <button
                    type="button"
                    onClick={() => setMobileProviderOpen(!mobileProviderOpen)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-[#F7F6FD]"
                  >
                    Resources
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileProviderOpen ? "rotate-180 text-[#5645D4]" : ""
                      }`}
                    />
                  </button>

                  {mobileProviderOpen && (
                    <div className="ml-3 border-l border-[#5645D4]/15 pl-3">
                       <Link
                      href="/faqs"
                      onClick={closeAllMenus}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F7F6FD]"
                      role="menuitem"
                    >
                      <span className="block text-sm font-bold text-slate-800">
                        FAQs
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Answers to common patient questions
                      </span>
                    </Link>

                    {/* Blog */}
                    <Link
                      href="/blog"
                      onClick={closeAllMenus}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F7F6FD]"
                      role="menuitem"
                    >
                      <span className="block text-sm font-semibold text-slate-700">
                        Blog
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Insights on surgery and second opinions
                      </span>
                    </Link>
                    </div>
                  )}
                </div>

             
                   <Link
                  href="/about"
                  onClick={closeAllMenus}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#F7F6FD] hover:text-[#5645D4]"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={closeAllMenus}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#F7F6FD] hover:text-[#5645D4]"
                >
                  Contact
                </Link>

                 
                

                {/* Mobile Actions */}
                <div className="mt-3 border-t border-slate-100 pt-3">
                  <Link
                    href="/auth/patient/login"
                    onClick={closeAllMenus}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/auth/patient/login?role=patient"
                    onClick={closeAllMenus}
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#5645D4] px-4 py-3 text-sm font-bold text-white shadow-sm shadow-[#5645D4]/20 transition-all hover:bg-[#4938C2]"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

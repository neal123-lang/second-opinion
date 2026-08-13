import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-[#0A1530] text-white">
      {/* =========================================================
          MAIN FOOTER
      ========================================================== */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* =====================================================
              BRAND / INTRO
          ====================================================== */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              {/* Logo */}
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#5645D4] shadow-lg shadow-[#5645D4]/20 transition-transform duration-200 group-hover:scale-105">
                <Activity
                  className="h-5 w-5 text-white"
                  strokeWidth={2.5}
                />

                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#0A1530] bg-[#8B7FE8]" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold tracking-tight text-white">
                  Second Opinion
                </span>

                <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A9A0F0]">
                  Qikplus Platform
                </span>
              </div>
            </Link>

            <p className="mt-6 text-sm leading-7 text-slate-300">
              A structured second-opinion platform designed to help patients
              understand complex surgical decisions, organize their medical
              information, and connect with verified surgical specialists.
            </p>

            {/* Trust indicator */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5645D4]/20">
                <ShieldCheck className="h-4 w-4 text-[#A9A0F0]" />
              </div>

              <div>
                <p className="text-xs font-bold text-white">
                  Patient-first approach
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  Designed to support informed conversations with qualified
                  healthcare professionals.
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              FOR PATIENTS
          ====================================================== */}
          <div>
            <h3 className="text-sm font-bold text-white">
              For Patients
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/for-patients"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  For Patients
                </Link>
              </li>

              <li>
                <Link
                  href="/for-patients/how-it-works"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  How It Works
                </Link>
              </li>

              <li>
                <Link
                  href="/for-patients/what-you-receive"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  What You Receive
                </Link>
              </li>

              <li>
                <Link
                  href="/surgical-specialties"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Surgical Specialties
                </Link>
              </li>

              <li>
                <Link
                  href="/auth/patient/login?role=patient"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#A9A0F0] transition-colors hover:text-white"
                >
                  Get a Second Opinion
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================================================
              RESOURCES
          ====================================================== */}
          <div>
            <h3 className="text-sm font-bold text-white">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  How It Works
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Frequently Asked Questions
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/patient-journey"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Patient Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================================================
              FOR PROVIDERS
          ====================================================== */}
          <div>
            <h3 className="text-sm font-bold text-white">
              For Providers
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/auth/v2/login"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  For Doctors
                </Link>
              </li>


              <li>
                <Link
                  href="/auth/v2/login"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  For Hospitals
                </Link>
              </li>

              <li>
                <Link
                  href="/auth/v2/login"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Hospital Partnerships
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* =======================================================
            SPECIALTIES
        ======================================================== */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xs">
              <h3 className="text-sm font-bold text-white">
                Surgical Specialties
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Explore the surgical specialties covered through the Qikplus
                second-opinion platform.
              </p>
            </div>

            <div className="grid flex-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 lg:pl-10">
              <Link
                href="/surgical-specialties/general-surgery"
                className="text-xs text-slate-400 transition-colors hover:text-[#A9A0F0]"
              >
                General Surgery
              </Link>

              <Link
                href="/surgical-specialties/orthopedic-surgery"
                className="text-xs text-slate-400 transition-colors hover:text-[#A9A0F0]"
              >
                Orthopedic Surgery
              </Link>

              <Link
                href="/surgical-specialties/neurosurgery"
                className="text-xs text-slate-400 transition-colors hover:text-[#A9A0F0]"
              >
                Neurosurgery
              </Link>

              <Link
                href="/surgical-specialties/cardiothoracic-surgery"
                className="text-xs text-slate-400 transition-colors hover:text-[#A9A0F0]"
              >
                Cardiothoracic Surgery
              </Link>

              <Link
                href="/surgical-specialties/vascular-surgery"
                className="text-xs text-slate-400 transition-colors hover:text-[#A9A0F0]"
              >
                Vascular Surgery
              </Link>

              <Link
                href="/surgical-specialties/urology"
                className="text-xs text-slate-400 transition-colors hover:text-[#A9A0F0]"
              >
                Urology
              </Link>

              <Link
                href="/surgical-specialties/gynecologic-surgery"
                className="text-xs text-slate-400 transition-colors hover:text-[#A9A0F0]"
              >
                Gynecologic Surgery
              </Link>

              <Link
                href="/surgical-specialties/ent-surgery"
                className="text-xs text-slate-400 transition-colors hover:text-[#A9A0F0]"
              >
                ENT Surgery
              </Link>

              <Link
                href="/surgical-specialties"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#A9A0F0] transition-colors hover:text-white"
              >
                View All Specialties
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* =======================================================
            CONTACT / CTA
        ======================================================== */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#5645D4]/20 to-[#5645D4]/5 p-6 sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#A9A0F0]">
                Need help?
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                Have questions about your second opinion?
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Our team can help you understand how the platform works and
                guide you through the next step.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#5645D4] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#5645D4]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4938C2]"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM BAR
      ========================================================== */}
      <div className="border-t border-white/10 bg-[#070F24]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

          <p className="text-xs text-slate-500">
            © {currentYear} Qikplus. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy-policy"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/medical-disclaimer"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Medical Disclaimer
            </Link>

            <Link
              href="/cookie-policy"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Cookie Policy
            </Link>

            <Link
              href="/contact"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================
          MEDICAL DISCLAIMER
      ========================================================== */}
      <div className="border-t border-white/5 bg-[#070F24]">
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-1 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] leading-5 text-slate-300">
            The information provided through Second Opinion by Qikplus is
            intended to support discussions between patients and qualified
            healthcare professionals. It is not a substitute for professional
            medical diagnosis, treatment, or emergency medical care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
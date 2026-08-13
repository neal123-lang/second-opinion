import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Second Opinion by Qikplus",
  description:
    "Contact Second Opinion by Qikplus for questions about surgical second opinions, specialist consultations, patient support, healthcare partnerships, and the Qikplus platform.",
  keywords: [
    "contact Qikplus",
    "Second Opinion Qikplus contact",
    "surgical second opinion support",
    "medical second opinion",
    "patient support",
    "specialist consultation",
    "hospital partnership",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Second Opinion by Qikplus",
    description:
      "Get in touch with the Qikplus team for patient support, surgical second opinions, specialist consultations, and healthcare partnerships.",
    url: "/contact",
    type: "website",
  },
};

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Patient Support",
    description:
      "Have questions about getting a surgical second opinion, uploading reports, or understanding your Caselet?",
    action: "Get patient support",
    href: "/auth/patient/login?role=patient",
  },
  {
    icon: Stethoscope,
    title: "For Doctors",
    description:
      "Are you a verified surgical specialist interested in reviewing structured patient cases through Qikplus?",
    action: "Explore for doctors",
    href: "/for-doctors",
  },
  {
    icon: ShieldCheck,
    title: "For Hospitals",
    description:
      "Interested in partnering with Qikplus to provide patients with a more structured path to surgical care?",
    action: "Explore partnerships",
    href: "/for-hospitals",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-[#F8F7FD] via-white to-white">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#5645D4]/8 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-32 h-[300px] w-[300px] rounded-full bg-[#8B7FE8]/8 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:pb-24 lg:pt-36">
          {/* Breadcrumb */}
          
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center rounded-full border border-[#5645D4]/15 bg-[#5645D4]/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              We&apos;re here to help
            </span>

            <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-[#172033] sm:text-5xl lg:text-6xl">
              Let&apos;s talk about your{" "}
              <span className="text-[#5645D4]">next step</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Whether you have a question about getting a surgical second
              opinion, need help with the platform, or want to explore a
              partnership, our team is here to help you understand what comes
              next.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT CONTENT
      ========================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            {/* LEFT — CONTACT INFORMATION */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
                Contact Qikplus
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[#172033] sm:text-4xl">
                How can we help?
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                Tell us what you need help with and we&apos;ll point you toward
                the right next step. For medical concerns, Qikplus helps
                organize your information and connect you with appropriate
                specialist pathways.
              </p>

              {/* Contact details */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-[#5645D4]/20 hover:shadow-md hover:shadow-slate-900/5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email
                    </p>

                    <a
                      href="mailto:support@qikplus.com"
                      className="mt-1 block text-sm font-bold text-[#172033] transition-colors hover:text-[#5645D4]"
                    >
                      support@qikplus.com
                    </a>

                    <p className="mt-1 text-xs text-slate-500">
                      For general questions and platform support
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-[#5645D4]/20 hover:shadow-md hover:shadow-slate-900/5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Phone
                    </p>

                    <a
                      href="tel:+910000000000"
                      className="mt-1 block text-sm font-bold text-[#172033] transition-colors hover:text-[#5645D4]"
                    >
                      +91 00000 00000
                    </a>

                    <p className="mt-1 text-xs text-slate-500">
                      Available during support hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-[#5645D4]/20 hover:shadow-md hover:shadow-slate-900/5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
                    <Clock3 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Support hours
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#172033]">
                      Monday – Friday
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      9:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy note */}
              <div className="mt-6 rounded-2xl border border-[#5645D4]/10 bg-[#F8F7FD] p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#5645D4]" />

                  <div>
                    <h3 className="text-sm font-bold text-[#172033]">
                      Your information matters
                    </h3>

                    <p className="mt-1.5 text-xs leading-6 text-slate-600">
                      Please avoid sending highly sensitive medical information
                      through a general contact form. Use the secure patient
                      workflow when submitting clinical reports for review.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — FORM */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10">
              <div className="mb-7">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
                  Send us a message
                </span>

                <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-[#172033] sm:text-3xl">
                  How can we assist you?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fill in the details below and our team will get back to you.
                </p>
              </div>

              <form className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-bold text-[#172033]"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-[#172033] outline-none transition-all placeholder:text-slate-400 focus:border-[#5645D4] focus:bg-white focus:ring-4 focus:ring-[#5645D4]/10"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold text-[#172033]"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-[#172033] outline-none transition-all placeholder:text-slate-400 focus:border-[#5645D4] focus:bg-white focus:ring-4 focus:ring-[#5645D4]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-bold text-[#172033]"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-[#172033] outline-none transition-all placeholder:text-slate-400 focus:border-[#5645D4] focus:bg-white focus:ring-4 focus:ring-[#5645D4]/10"
                    />
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label
                    htmlFor="reason"
                    className="mb-2 block text-xs font-bold text-[#172033]"
                  >
                    I&apos;m contacting you about
                  </label>

                  <select
                    id="reason"
                    name="reason"
                    defaultValue=""
                    className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-[#172033] outline-none transition-all focus:border-[#5645D4] focus:bg-white focus:ring-4 focus:ring-[#5645D4]/10"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="patient-support">
                      Patient support
                    </option>
                    <option value="second-opinion">
                      Getting a surgical second opinion
                    </option>
                    <option value="doctor">
                      Becoming a specialist
                    </option>
                    <option value="hospital">
                      Hospital partnership
                    </option>
                    <option value="general">
                      General enquiry
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-bold text-[#172033]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm leading-6 text-[#172033] outline-none transition-all placeholder:text-slate-400 focus:border-[#5645D4] focus:bg-white focus:ring-4 focus:ring-[#5645D4]/10"
                  />
                </div>

                {/* Disclaimer */}
                <p className="text-[11px] leading-5 text-slate-500">
                  Please do not include urgent medical information or
                  confidential clinical reports in this form. For a surgical
                  second opinion, use the secure patient workflow.
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#5645D4] px-5 text-sm font-bold text-white shadow-lg shadow-[#5645D4]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4938C2] hover:shadow-xl hover:shadow-[#5645D4]/25"
                >
                  Send Message

                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          AUDIENCE OPTIONS
      ========================================================== */}
      <section className="border-t border-slate-200 bg-[#F8F7FD] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              Find your pathway
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[#172033] sm:text-4xl">
              Looking for something specific?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Choose the pathway that best matches what you need from Qikplus.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {contactOptions.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#5645D4]/20 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4] transition-colors group-hover:bg-[#5645D4] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold text-[#172033]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#5645D4] transition-colors hover:text-[#4938C2]"
                  >
                    {item.action}

                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          LOCATION / TRUST CTA
      ========================================================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-[#0A1530] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#5645D4]/30 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#A9A0F2]">
                  Ready when you are
                </span>

                <h2 className="mt-3 max-w-2xl text-2xl font-extrabold tracking-[-0.025em] text-white sm:text-3xl">
                  Start with a clearer understanding of your surgical options.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  If you are considering surgery and want another qualified
                  perspective, you can begin your secure second-opinion journey
                  through Qikplus.
                </p>
              </div>

              <Link
                href="/auth/patient/login?role=patient"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5645D4] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#6656DB]"
              >
                Start My Second Opinion

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STRUCTURED DATA
      ========================================================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Second Opinion by Qikplus",
            description:
              "Contact Second Opinion by Qikplus for patient support, surgical second opinions, specialist consultations, and healthcare partnerships.",
            url: "/contact",
            mainEntity: {
              "@type": "Organization",
              name: "Second Opinion by Qikplus",
              email: "support@qikplus.com",
            },
          }),
        }}
      />
    </main>
  );
}
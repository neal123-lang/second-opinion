import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  HeartPulse,
  ClipboardCheck,
  MessageCircleQuestion,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "For Patients | Get a Clearer Second Opinion Before Surgery",
  description:
    "Qikplus helps patients organize medical reports, understand their surgical case, and receive a structured second opinion from a verified surgical specialist before making an important healthcare decision.",
  keywords: [
    "second opinion for surgery",
    "surgical second opinion",
    "medical second opinion",
    "second opinion doctor",
    "surgical specialist consultation",
    "online second opinion",
    "Qikplus",
  ],
  alternates: {
    canonical: "/for-patients",
  },
  openGraph: {
    title: "For Patients | Qikplus Second Opinion",
    description:
      "Get clarity before an important surgical decision with a structured case review from a verified surgical specialist.",
    url: "/for-patients",
    type: "website",
  },
};

const benefits = [
  {
    icon: FileText,
    title: "Bring your medical information together",
    description:
      "Upload relevant reports, scans, prescriptions, discharge summaries and other medical documents so your case can be reviewed in one structured place.",
  },
  {
    icon: Stethoscope,
    title: "Get specialist-led case review",
    description:
      "Your case is prepared for review by a verified surgical specialist relevant to your condition and clinical situation.",
  },
  {
    icon: ClipboardCheck,
    title: "Understand your case more clearly",
    description:
      "Receive a structured Caselet that helps turn complex medical information into a clearer overview for you and your family.",
  },
  {
    icon: UserCheck,
    title: "Be better prepared for your next consultation",
    description:
      "Use your Caselet to have a more informed conversation with your existing doctor or specialist.",
  },
];

const process = [
  {
    number: "01",
    title: "Create your case",
    description:
      "Start your second-opinion request and provide the relevant details about your diagnosis, treatment recommendation and surgical decision.",
  },
  {
    number: "02",
    title: "Upload your reports",
    description:
      "Securely submit the medical reports and documents that are relevant to your case, including imaging, laboratory reports and hospital records.",
  },
  {
    number: "03",
    title: "Your case is structured",
    description:
      "Your submitted information is organized into a structured clinical case so the reviewing specialist can focus on the information that matters.",
  },
  {
    number: "04",
    title: "Specialist reviews your case",
    description:
      "A verified surgical specialist reviews the available information and prepares a structured assessment for your case.",
  },
  {
    number: "05",
    title: "Receive your Caselet",
    description:
      "Get a patient-friendly summary and specialist-oriented information that can help you understand and discuss your case.",
  },
  {
    number: "06",
    title: "Move forward with clarity",
    description:
      "Take the information into your next consultation and make your healthcare decisions with a clearer understanding of your situation.",
  },
];

const faqs = [
  {
    question: "What is a surgical second opinion?",
    answer:
      "A surgical second opinion is an independent review of your medical situation by another qualified specialist. It can help you better understand your diagnosis, recommended procedure, available considerations and questions to discuss with your treating team.",
  },
  {
    question: "Who is Qikplus for?",
    answer:
      "Qikplus is designed for patients who are facing an important surgical decision and want their medical information organized and reviewed by a relevant surgical specialist.",
  },
  {
    question: "What medical documents can I upload?",
    answer:
      "Depending on your case, you may be able to provide diagnostic reports, laboratory results, imaging reports, scans, prescriptions, biopsy reports, discharge summaries and other relevant medical documents.",
  },
  {
    question: "Does Qikplus replace my treating doctor?",
    answer:
      "No. Qikplus is designed to support informed conversations and second-opinion review. It does not replace your treating physician, emergency medical care or an in-person clinical examination when one is required.",
  },
  {
    question: "What is a Caselet?",
    answer:
      "A Caselet is a structured representation of your medical case designed to make important information easier to understand and discuss. It can include a patient-friendly summary and information intended to support specialist conversations.",
  },
  {
    question: "Is my medical information confidential?",
    answer:
      "Qikplus is designed around secure handling of patient information. Patients should review the platform's applicable privacy policy and terms to understand how their information is collected, processed, stored and shared.",
  },
];

export default function ForPatientsPage() {
  return (
    <main className="overflow-hidden bg-white text-[#172033]">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative isolate border-b border-slate-100 bg-[#FAF9FF] pt-28 sm:pt-32">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#5645D4]/10 blur-3xl" />
          <div className="absolute -right-32 top-20 h-[420px] w-[420px] rounded-full bg-[#8B7FE8]/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-[#5645D4]/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          {/* Breadcrumb */}
          <div className="mb-10 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <Link
              href="/"
              className="transition-colors hover:text-[#5645D4]"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#5645D4]">For Patients</span>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5645D4]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4] shadow-sm">
              <HeartPulse className="h-3.5 w-3.5" />
              Patient-first second opinions
            </div>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] text-[#172033] sm:text-5xl lg:text-6xl">
              Get a clearer{" "}
              <span className="text-[#5645D4]">
                second opinion
              </span>{" "}
              before surgery
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Facing an important surgical decision can be overwhelming.
              Qikplus helps you organize your medical information, structure
              your case and get it reviewed by a verified surgical specialist
              so you can approach your next healthcare conversation with
              greater clarity.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/auth/patient/login?role=patient"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5645D4] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5645D4]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4938C2] hover:shadow-xl hover:shadow-[#5645D4]/25"
              >
                Get My Second Opinion
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-[#5645D4]/25 hover:bg-[#F7F6FD] hover:text-[#5645D4]"
              >
                See How It Works
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#5645D4]" />
                Structured case review
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#5645D4]" />
                Verified specialists
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#5645D4]" />
                Patient-friendly information
              </span>
            </div>
          </div>

          {/* Hero trust panel */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_70px_rgba(35,25,100,0.08)] sm:grid-cols-3">
              <div className="border-b border-slate-100 p-6 sm:border-b-0 sm:border-r">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h2 className="text-sm font-bold text-[#172033]">
                  Structured medical information
                </h2>
                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Bring relevant reports and documents together into one
                  organized case.
                </p>
              </div>

              <div className="border-b border-slate-100 p-6 sm:border-b-0 sm:border-r">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <h2 className="text-sm font-bold text-[#172033]">
                  Specialist-led review
                </h2>
                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Have your case prepared for review by a relevant surgical
                  specialist.
                </p>
              </div>

              <div className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="text-sm font-bold text-[#172033]">
                  Confidential experience
                </h2>
                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Designed to help you manage sensitive healthcare information
                  responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY PATIENTS SEEK A SECOND OPINION
      ========================================================== */}
      <section className="border-b border-slate-100 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
                Why patients choose a second opinion
              </span>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#172033] sm:text-4xl">
                Important surgical decisions deserve clarity
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                A recommendation for surgery can bring difficult questions:
                Is surgery necessary? Are there alternatives? What should I
                ask my surgeon? Should I seek another specialist's view?
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Qikplus is designed to help you approach these questions with
                a more organized understanding of your medical information and
                a structured specialist review.
              </p>

              <Link
                href="/patient-journey"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#5645D4]"
              >
                Explore the patient journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Understand your diagnosis",
                  text: "Organize the information surrounding your condition and recommended treatment.",
                },
                {
                  title: "Prepare better questions",
                  text: "Use a structured overview to identify topics you may want to discuss with your doctors.",
                },
                {
                  title: "Explore another perspective",
                  text: "A second specialist perspective can provide additional context for an important decision.",
                },
                {
                  title: "Involve your family",
                  text: "A clearer summary can make it easier to explain the situation to the people supporting you.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-[#FAF9FF] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#5645D4]/20 hover:shadow-lg hover:shadow-[#5645D4]/5"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#5645D4]" />
                  <h3 className="mt-4 text-base font-bold text-[#172033]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT QIKPLUS DOES
      ========================================================== */}
      <section className="bg-[#F8F7FC] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              How Qikplus helps
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              From medical documents to a clearer case
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Qikplus brings structure to the information you already have and
              helps connect it with specialist review.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#5645D4]/20 hover:shadow-xl hover:shadow-[#5645D4]/5"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4] transition-colors group-hover:bg-[#5645D4] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5645D4]">
                        0{index + 1}
                      </div>

                      <h3 className="text-lg font-bold text-[#172033]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          PROCESS
      ========================================================== */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              Your experience
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              A simple path from uncertainty to clarity
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              The Qikplus patient experience is designed to make the process
              easier to understand from the moment you start your case to the
              moment you receive your structured second-opinion information.
            </p>
          </div>

          <div className="relative mx-auto mt-14 max-w-4xl">
            {/* Vertical line */}
            <div className="absolute bottom-8 left-[23px] top-8 hidden w-px bg-[#5645D4]/15 sm:block" />

            <div className="space-y-6">
              {process.map((step) => (
                <div
                  key={step.number}
                  className="relative flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#5645D4]/20 hover:shadow-lg hover:shadow-[#5645D4]/5 sm:gap-7"
                >
                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5645D4] text-xs font-extrabold text-white shadow-md shadow-[#5645D4]/20">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#172033] sm:text-lg">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/patient-journey"
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#5645D4]"
            >
              View the complete patient journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT YOU RECEIVE
      ========================================================== */}
      <section className="bg-[#F8F7FC] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
                What you receive
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
                Your case, organized for understanding
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Medical information can be difficult to interpret when it is
                spread across multiple reports, scans and hospital documents.
                Qikplus turns your submitted information into a structured
                Caselet designed to support clearer conversations.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "A structured overview of your submitted case",
                  "Patient-friendly information designed for easier understanding",
                  "Specialist-oriented information to support clinical discussion",
                  "A clearer starting point for your next consultation",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#5645D4]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/what-you-receive"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-[#5645D4]/20 bg-white px-5 py-3 text-sm font-bold text-[#5645D4] transition-all hover:bg-[#5645D4] hover:text-white"
              >
                See what you receive
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Caselet visual */}
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#5645D4]/5 blur-2xl" />

              <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#5645D4]">
                      Qikplus Caselet
                    </span>

                    <h3 className="mt-1 text-lg font-bold text-[#172033]">
                      Patient Case Overview
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
                    <FileCheck2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-4 py-5">
                  <div>
                    <div className="mb-2 h-2 w-24 rounded-full bg-slate-200" />
                    <div className="h-2 w-full rounded-full bg-slate-100" />
                    <div className="mt-2 h-2 w-4/5 rounded-full bg-slate-100" />
                  </div>

                  <div className="rounded-xl bg-[#F8F7FC] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5645D4]/10 text-[#5645D4]">
                        <Stethoscope className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#172033]">
                          Specialist Review
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500">
                          Structured clinical information
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-100 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Reports
                      </p>
                      <p className="mt-2 text-sm font-bold text-[#172033]">
                        Organized
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Review
                      </p>
                      <p className="mt-2 text-sm font-bold text-[#172033]">
                        Specialist-led
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-[#5645D4]/5 px-4 py-3 text-xs font-semibold text-[#5645D4]">
                  <Sparkles className="h-4 w-4" />
                  Designed for clearer healthcare conversations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRIVACY / TRUST
      ========================================================== */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#5645D4]/10 bg-[#FAF9FF] p-7 sm:p-10">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#5645D4] text-white shadow-lg shadow-[#5645D4]/20">
                <LockKeyhole className="h-6 w-6" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#5645D4]">
                  Privacy matters
                </span>

                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#172033]">
                  Your healthcare information deserves careful handling
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Qikplus is designed with the sensitive nature of healthcare
                  information in mind. Your medical documents and case
                  information should be handled responsibly throughout the
                  second-opinion process.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                    Secure case submission
                  </span>

                  <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                    Confidential information
                  </span>

                  <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                    Patient-focused experience
                  </span>
                </div>

                <p className="mt-5 text-xs leading-6 text-slate-500">
                  Please review Qikplus's Privacy Policy and Terms of Service
                  for the specific details governing the handling of your
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section className="bg-[#F8F7FC] py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
              <MessageCircleQuestion className="h-6 w-6" />
            </div>

            <span className="mt-5 block text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              Patient FAQs
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              Questions patients often ask
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white transition-all open:border-[#5645D4]/20 open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-sm font-bold text-[#172033] sm:px-6">
                  {faq.question}

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F7F6FD] text-[#5645D4] transition-transform group-open:rotate-45">
                    <span className="text-lg font-normal leading-none">
                      +
                    </span>
                  </span>
                </summary>

                <div className="px-5 pb-5 sm:px-6">
                  <p className="max-w-3xl text-sm leading-7 text-slate-500">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faqs"
              className="text-sm font-bold text-[#5645D4] hover:underline"
            >
              View all frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#5645D4] py-20 sm:py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-[#8B7FE8]/30 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
            <HeartPulse className="h-3.5 w-3.5" />
            Your next decision deserves clarity
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Take the next step with a clearer understanding of your case.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
            Organize your medical information, start your case and prepare for
            a more informed conversation about your surgical options.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/patient/login?role=patient"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#5645D4] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Get My Second Opinion
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/15"
            >
              Talk to Our Team
            </Link>
          </div>

          <p className="mt-7 text-xs text-white/60">
            Qikplus provides second-opinion support and does not replace
            emergency medical care or your treating physician.
          </p>
        </div>
      </section>
    </main>
  );
}
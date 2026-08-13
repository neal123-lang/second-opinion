import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  FileText,
  HeartPulse,
  Info,
  Lock,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "What You Receive | Your Qikplus Caselet | Second Opinion",
  description:
    "Understand what you receive through Qikplus. Your Caselet organizes your medical information into a clear patient summary and specialist discussion brief to help you prepare for an informed surgical conversation.",
  keywords: [
    "Qikplus Caselet",
    "second opinion caselet",
    "medical second opinion",
    "surgical second opinion",
    "patient medical summary",
    "specialist discussion brief",
    "surgical decision support",
  ],
};

const caseletContents = [
  {
    icon: FileText,
    title: "Patient-Friendly Summary",
    description:
      "A clear overview of the information provided in your case, written to help you and your family understand the key details without unnecessary medical complexity.",
  },
  {
    icon: Stethoscope,
    title: "Specialist Discussion Brief",
    description:
      "A concise clinical-oriented document that organizes the relevant information for discussion with a surgeon or other appropriate healthcare professional.",
  },
  {
    icon: ClipboardCheck,
    title: "Case Information Organized",
    description:
      "Important reports, findings, medical history and supporting information are brought together into a structured view of your case.",
  },
  {
    icon: MessageCircle,
    title: "Questions to Discuss",
    description:
      "Use the organized case information to prepare more focused questions for your treating doctor or surgical specialist.",
  },
];

const benefits = [
  "Understand your case more clearly",
  "Keep important medical information organized",
  "Prepare for a specialist consultation",
  "Share relevant information with your family",
  "Use your Caselet during medical discussions",
  "Approach important surgical conversations with greater clarity",
];

export default function WhatYouReceivePage() {
  return (
    <main className="overflow-hidden bg-white text-[#172033]">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative border-b border-slate-100 bg-[#FAFAFE] pt-32 pb-20 sm:pt-36 sm:pb-24">
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-[#5645D4]/8 blur-3xl" />
        <div className="absolute right-[-120px] top-20 h-[360px] w-[360px] rounded-full bg-[#8B7FE8]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5645D4]/15 bg-[#5645D4]/5 px-4 py-2">
              <HeartPulse className="h-4 w-4 text-[#5645D4]" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
                What You Receive
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#172033] sm:text-5xl lg:text-6xl">
              Your medical information,
              <br />
              <span className="text-[#5645D4]">
                organized for clarity.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Qikplus transforms the information you provide into a structured
              Caselet designed to help you understand your case, prepare for
              specialist conversations, and make more informed decisions about
              your next steps.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/auth/patient/login?role=patient"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5645D4] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5645D4]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4938C2]"
              >
                Get My Second Opinion
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-[#5645D4]/30 hover:bg-[#F7F6FD] hover:text-[#5645D4]"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO / CASELET
      ========================================================= */}
      <section className="border-b border-slate-100 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

            {/* Left */}
            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
                Your Caselet
              </span>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#172033] sm:text-4xl">
                One organized view of
                <span className="text-[#5645D4]"> your case.</span>
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600">
                Medical information can quickly become difficult to follow when
                it is spread across reports, scans, prescriptions, consultation
                notes and discharge documents.
              </p>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Your Qikplus Caselet is designed to bring the information you
                provide into a more structured format, making it easier to
                review and discuss with your healthcare team.
              </p>

              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#5645D4]/10 bg-[#F7F6FD] p-5">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#5645D4]" />

                <div>
                  <p className="text-sm font-bold text-[#172033]">
                    Designed around your information
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    The Caselet is created from the medical information and
                    documents you provide as part of your Qikplus case.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Caselet Preview */}
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#5645D4]/5 blur-2xl" />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(23,32,51,0.08)]">

                <div className="border-b border-slate-100 bg-[#FAFAFE] px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#5645D4]">
                        Qikplus
                      </div>
                      <h3 className="mt-1 text-lg font-extrabold text-[#172033]">
                        Caselet Overview
                      </h3>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5645D4] text-white">
                      <HeartPulse className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-6">

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-[#5645D4]" />
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        Patient Overview
                      </span>
                    </div>

                    <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                    <div className="mt-2 h-3 w-1/2 rounded-full bg-slate-100" />
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#5645D4]" />
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        Medical Information
                      </span>
                    </div>

                    <div className="h-3 w-full rounded-full bg-slate-200" />
                    <div className="mt-2 h-3 w-5/6 rounded-full bg-slate-100" />
                    <div className="mt-2 h-3 w-2/3 rounded-full bg-slate-100" />
                  </div>

                  <div className="rounded-xl border border-[#5645D4]/10 bg-[#F7F6FD] p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-[#5645D4]" />
                      <span className="text-xs font-bold uppercase tracking-wide text-[#5645D4]">
                        Specialist Discussion
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-slate-600">
                      Structured information to support a focused medical
                      conversation.
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT IS INCLUDED
      ========================================================= */}
      <section className="bg-[#FAFAFE] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              What&apos;s Included
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              Everything organized around your case
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Your Caselet is designed to make the information you provide
              easier to understand, review and discuss.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">

            {caseletContents.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#5645D4]/20 hover:shadow-[0_15px_40px_rgba(23,32,51,0.07)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4] transition-colors group-hover:bg-[#5645D4] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#172033]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =========================================================
          TWO DOCUMENTS
      ========================================================= */}
      <section className="border-b border-slate-100 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              Built for Different Conversations
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              Clear information for you.
              <br />
              Focused information for discussion.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Qikplus organizes your case with both the patient perspective and
              specialist discussion in mind.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">

            {/* Patient Summary */}
            <div className="rounded-3xl border border-slate-200 bg-[#FAFAFE] p-7 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5645D4]/10 text-[#5645D4]">
                <BookOpen className="h-6 w-6" />
              </div>

              <div className="mt-6">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#5645D4]">
                  For You & Your Family
                </span>

                <h3 className="mt-2 text-2xl font-extrabold text-[#172033]">
                  Plain-Language Summary
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  A simpler view of the information in your case, helping you
                  understand what has been documented and prepare for your next
                  medical conversation.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    "Easy-to-follow case overview",
                    "Important information organized clearly",
                    "Useful for family discussions",
                    "Helps you prepare questions",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5645D4]/10 text-[#5645D4]">
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specialist Brief */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0075DE]/10 text-[#0075DE]">
                <Stethoscope className="h-6 w-6" />
              </div>

              <div className="mt-6">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#0075DE]">
                  For Medical Discussion
                </span>

                <h3 className="mt-2 text-2xl font-extrabold text-[#172033]">
                  Specialist Discussion Brief
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  A concise, structured view intended to help organize relevant
                  case information for discussion with your treating doctor or
                  an appropriate specialist.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    "Relevant case information brought together",
                    "Structured for easier review",
                    "Useful during specialist conversations",
                    "Supports focused questions and discussion",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0075DE]/10 text-[#0075DE]">
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          HOW TO USE IT
      ========================================================= */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
                Make It Useful
              </span>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#172033] sm:text-4xl">
                Take your Caselet into your next medical conversation.
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600">
                The Caselet is not meant to replace your treating doctor or
                medical consultation. It is a structured resource that can help
                you prepare for those conversations.
              </p>

              <Link
                href="/how-it-works"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#5645D4]"
              >
                Learn how Qikplus works
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="space-y-4">

              {[
                {
                  number: "01",
                  title: "Review your Caselet",
                  description:
                    "Read through the organized information and make sure you understand the key points of your case.",
                },
                {
                  number: "02",
                  title: "Discuss it with your family",
                  description:
                    "Use the patient-friendly summary to help explain your situation and prepare together for important conversations.",
                },
                {
                  number: "03",
                  title: "Prepare your questions",
                  description:
                    "Identify anything you would like to clarify with your treating doctor or surgical specialist.",
                },
                {
                  number: "04",
                  title: "Take it to your consultation",
                  description:
                    "Use the Caselet as a reference during your medical discussion and decision-making process.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 rounded-2xl border border-slate-200 bg-[#FAFAFE] p-5 sm:p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5645D4] text-xs font-extrabold text-white">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="font-bold text-[#172033]">
                      {step.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================= */}
      <section className="bg-[#FAFAFE] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              Why It Matters
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              More clarity before an important decision
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Having your information organized can make it easier to prepare,
              ask questions and participate in conversations about your care.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5645D4]/10 text-[#5645D4]">
                  <Check className="h-3.5 w-3.5" />
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          IMPORTANT NOTE
      ========================================================= */}
      <section className="border-t border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl border border-[#5645D4]/10 bg-[#F7F6FD] p-6 sm:p-8">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#5645D4] shadow-sm">
                <Info className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold text-[#172033]">
                  An important distinction
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Your Qikplus Caselet is designed to organize and communicate
                  information and support your preparation for medical
                  discussions. It does not replace an in-person consultation,
                  diagnosis, treatment plan or medical advice from your
                  healthcare professional.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#172033] py-20 sm:py-24">
        <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#5645D4]/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5645D4] text-white shadow-lg shadow-[#5645D4]/20">
            <Lock className="h-5 w-5" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to get more clarity about your case?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Start your Qikplus journey and organize your medical information
            before your next important surgical conversation.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/patient/login?role=patient"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5645D4] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#4938C2]"
            >
              Get My Second Opinion
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Contact Qikplus
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
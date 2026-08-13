import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  FileText,
  HeartPulse,
  Hospital,
  Lock,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Second Opinion by Qikplus",
  description:
    "Learn how Second Opinion by Qikplus helps patients make informed surgical decisions by combining structured medical information, AI-assisted organization and specialist-led second opinions.",
  keywords: [
    "about Qikplus",
    "second opinion platform",
    "surgical second opinion",
    "medical second opinion",
    "surgical specialists",
    "patient healthcare platform",
    "AI healthcare platform",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Second Opinion by Qikplus",
    description:
      "A patient-first platform designed to bring clarity to complex surgical decisions through structured medical information and specialist-led second opinions.",
    type: "website",
  },
};

const values = [
  {
    icon: HeartPulse,
    title: "Patient First",
    description:
      "Every part of the platform is designed around one goal: helping patients understand their options before making an important surgical decision.",
  },
  {
    icon: Stethoscope,
    title: "Specialist-Led",
    description:
      "Technology helps organize information, but clinical judgment remains with qualified surgical specialists who review the case.",
  },
  {
    icon: Brain,
    title: "AI-Assisted, Not AI-Decided",
    description:
      "Our platform uses AI to structure complex medical information and make it easier to understand. It does not replace a doctor's clinical judgment.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "Patients deserve clear information about their case, the review process and the professionals involved in their second opinion.",
  },
];

const audiences = [
  {
    icon: Users,
    title: "Patients & Families",
    description:
      "For people facing surgery who want to better understand their diagnosis, proposed treatment and available options.",
    href: "/patient-journey",
    link: "Explore the patient journey",
  },
  {
    icon: Stethoscope,
    title: "Surgical Specialists",
    description:
      "For qualified specialists who want to review structured cases and provide meaningful clinical perspectives to patients.",
    href: "/for-doctors",
    link: "For doctors",
  },
  {
    icon: Hospital,
    title: "Hospitals",
    description:
      "For hospitals and healthcare institutions interested in building trusted patient relationships through specialist-led care.",
    href: "/for-hospitals",
    link: "For hospitals",
  },
];

const principles = [
  "Medical information should be easier for patients to understand.",
  "Patients should have the opportunity to seek another qualified clinical perspective.",
  "AI should support healthcare professionals, not replace them.",
  "Complex medical cases should be organized before they are reviewed.",
  "Patients and families should have more confidence when discussing treatment options.",
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-[#172033]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative border-slate-200/70 border-b bg-gradient-to-b from-[#F7F6FD] via-white to-white pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#5645D4]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#8B7FE8]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">

            {/* Breadcrumb */}
            <div className="mb-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
              <Link
                href="/"
                className="transition-colors hover:text-[#5645D4]"
              >
                Home
              </Link>

              <span>/</span>

              <span className="text-[#5645D4]">About Us</span>
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5645D4]/15 bg-[#5645D4]/5 px-4 py-2">
              <Activity className="h-4 w-4 text-[#5645D4]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5645D4]">
                About Second Opinion by Qikplus
              </span>
            </div>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-[#172033] sm:text-5xl lg:text-6xl">
              Bringing clarity to
              <span className="block text-[#5645D4]">
                important surgical decisions.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Second Opinion by Qikplus is a patient-focused healthcare
              platform designed to make complex surgical decisions easier to
              understand. We bring together structured medical information,
              AI-assisted organization and specialist-led clinical review in
              one connected experience.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5645D4] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5645D4]/20 transition-all hover:-translate-y-0.5 hover:bg-[#4938C2]"
              >
                See How It Works
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/auth/patient/login?role=patient"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-[#5645D4]/30 hover:bg-[#F7F6FD] hover:text-[#5645D4]"
              >
                Get a Second Opinion
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY WE EXIST
      ====================================================== */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">

            {/* Left */}
            <div>
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#5645D4]">
                Why Qikplus exists
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
                Surgery is a major decision.
                <span className="block text-[#5645D4]">
                  Understanding it should not be.
                </span>
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-600">
                When patients are told they may need surgery, they are often
                expected to process complicated reports, scan findings,
                medical terminology and treatment recommendations in a very
                short period of time.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600">
                That can make it difficult to know what questions to ask,
                whether another clinical perspective would be useful, or how
                to explain the situation to family members.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Qikplus was created to bring structure and clarity to this
                process. Instead of simply storing medical documents, the
                platform helps turn scattered clinical information into a
                structured case that can be reviewed by an appropriate
                specialist.
              </p>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="rounded-3xl border border-[#5645D4]/10 bg-[#F7F6FD] p-6 sm:p-8">

                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5645D4] text-white shadow-lg shadow-[#5645D4]/20">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-bold text-[#172033]">
                      From scattered information
                    </p>
                    <p className="text-xs text-slate-500">
                      Reports, scans, notes and clinical documents
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Medical reports",
                    "Imaging & scan findings",
                    "Previous treatment history",
                    "Doctor recommendations",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#5645D4]" />
                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="my-6 flex justify-center">
                  <div className="h-10 w-px bg-[#5645D4]/20" />
                </div>

                <div className="rounded-2xl bg-[#5645D4] p-5 text-white shadow-xl shadow-[#5645D4]/20">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5" />

                    <div>
                      <p className="font-bold">
                        Structured Caselet
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-white/75">
                        Organized information prepared for meaningful
                        specialist review and patient understanding.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          OUR APPROACH
      ====================================================== */}
      <section className="border-slate-200/70 border-y bg-[#F7F6FD] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#5645D4]">
              Our approach
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              Technology that supports
              <span className="block text-[#5645D4]">
                better conversations with doctors.
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Qikplus is built around a simple principle: technology should
              make healthcare information easier to organize and understand,
              while qualified healthcare professionals remain responsible
              for clinical interpretation and medical decisions.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#5645D4]/20 hover:shadow-xl hover:shadow-[#5645D4]/5"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4] transition-colors group-hover:bg-[#5645D4] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-bold text-base text-[#172033]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          AI + DOCTOR
      ====================================================== */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            <div className="order-2 lg:order-1">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-[#F7F6FD] p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
                      <Brain className="h-5 w-5" />
                    </div>

                    <h3 className="font-bold text-[#172033]">
                      AI-Assisted
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Helps organize and structure complex information.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F7F6FD] p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
                      <Stethoscope className="h-5 w-5" />
                    </div>

                    <h3 className="font-bold text-[#172033]">
                      Specialist-Led
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Qualified specialists provide clinical perspective.
                    </p>
                  </div>

                </div>

                <div className="mt-4 rounded-2xl border border-[#5645D4]/10 bg-[#5645D4] p-5 text-white">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                    <div>
                      <p className="font-bold">
                        Human clinical judgment remains central.
                      </p>

                      <p className="mt-1 text-sm leading-6 text-white/75">
                        Qikplus does not present AI-generated information as
                        a substitute for diagnosis, treatment or professional
                        medical advice.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#5645D4]">
                The role of technology
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
                AI can organize the information.
                <span className="block text-[#5645D4]">
                  Doctors provide the judgment.
                </span>
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-600">
                Medical records can be difficult to navigate because
                information is often spread across multiple reports,
                investigations and treatment notes.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Qikplus uses technology to help structure that information
                into a clearer case format. This can help patients and
                specialists focus on the information that matters during a
                second-opinion consultation.
              </p>

              <div className="mt-7 flex items-start gap-3">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#5645D4]" />

                <p className="text-sm leading-6 text-slate-500">
                  Patient privacy, confidentiality and responsible handling of
                  healthcare information are fundamental to the platform.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          WHO WE SERVE
      ====================================================== */}
      <section className="border-slate-200/70 border-y bg-[#F7F6FD] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#5645D4]">
              Our ecosystem
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              Built around the people involved
              <span className="block text-[#5645D4]">
                in a surgical decision.
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Qikplus connects the different parts of the healthcare journey
              while keeping the patient at the center.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {audiences.map((audience) => {
              const Icon = audience.icon;

              return (
                <div
                  key={audience.title}
                  className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#5645D4]/20 hover:shadow-xl hover:shadow-[#5645D4]/5"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-bold text-[#172033]">
                    {audience.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                    {audience.description}
                  </p>

                  <Link
                    href={audience.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#5645D4] transition-all group-hover:gap-3"
                  >
                    {audience.link}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PRINCIPLES
      ====================================================== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl bg-[#172033] p-7 text-white sm:p-10 lg:p-12">

            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

              <div>
                <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#A59CF0]">
                  What we believe
                </span>

                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Better information leads to better conversations.
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-300">
                  We believe patients should have the information and
                  confidence they need to participate meaningfully in
                  conversations about their healthcare.
                </p>
              </div>

              <div className="space-y-4">
                {principles.map((principle, index) => (
                  <div
                    key={principle}
                    className="flex gap-4 border-slate-700 border-b pb-4 last:border-0"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#5645D4] text-xs font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <p className="text-sm leading-6 text-slate-300">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-3xl bg-[#5645D4] px-6 py-12 text-center shadow-xl shadow-[#5645D4]/20 sm:px-10 sm:py-14 lg:px-16">

            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                Take the next step
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Get more clarity before making a surgical decision.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                Organize your medical information, understand your case and
                explore a specialist-led second opinion through Qikplus.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/auth/patient/login?role=patient"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#5645D4] transition-all hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Start My Second Opinion
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
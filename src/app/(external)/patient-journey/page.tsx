import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Upload,
  ClipboardCheck,
  MessageCircle,
  BookOpen,
  HeartPulse,
  SearchCheck,
  LockKeyhole,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Patient Journey | How Second Opinion by Qikplus Works",
  description:
    "Understand the patient journey with Second Opinion by Qikplus. Upload your medical reports, get your case reviewed by a verified surgical specialist, receive a clear Caselet, and prepare for your next medical consultation.",
  keywords: [
    "surgical second opinion",
    "online second opinion",
    "medical second opinion",
    "patient journey",
    "surgical specialist review",
    "medical report review",
    "second opinion consultation",
    "Qikplus second opinion",
  ],
  alternates: {
    canonical: "/patient-journey",
  },
  openGraph: {
    title: "Patient Journey | Second Opinion by Qikplus",
    description:
      "See how Second Opinion by Qikplus helps patients move from medical reports to clearer surgical decisions.",
    type: "website",
  },
};

const journeySteps = [
  {
    number: "01",
    icon: Upload,
    title: "Start Your Case",
    subtitle: "Share your medical information securely",
    description:
      "Begin your second opinion journey by creating your case and uploading the medical information relevant to your condition. This may include diagnostic reports, imaging, prescriptions, biopsy reports, discharge summaries, or other documents provided by your treating team.",
    points: [
      "Upload relevant medical reports",
      "Add your diagnosis and treatment history",
      "Share the reason you are seeking a second opinion",
      "Keep your information organized in one place",
    ],
  },
  {
    number: "02",
    icon: SearchCheck,
    title: "Your Case Is Structured",
    subtitle: "Turn complex medical information into a clear case",
    description:
      "Your submitted information is organized into a structured clinical case so that the reviewing specialist can understand the important details without having to work through disconnected documents.",
    points: [
      "Important clinical information is organized",
      "Reports and supporting documents are brought together",
      "Relevant questions and concerns are highlighted",
      "The case is prepared for specialist review",
    ],
  },
  {
    number: "03",
    icon: Stethoscope,
    title: "Specialist Reviews Your Case",
    subtitle: "A qualified surgical specialist evaluates the information",
    description:
      "Your case is reviewed by a verified surgical specialist relevant to your condition. The specialist considers the information available in your case and provides an independent clinical perspective to help you prepare for your next discussion with your treating doctor.",
    points: [
      "Condition-specific specialist review",
      "Review of available reports and clinical information",
      "Independent perspective on the presented case",
      "Questions and considerations for further discussion",
    ],
  },
  {
    number: "04",
    icon: BookOpen,
    title: "Receive Your Caselet",
    subtitle: "Understand your case in a simpler format",
    description:
      "Once the review is completed, you receive a structured Caselet designed to make complex medical information easier to understand and discuss. It can help you and your family organize the important questions before your next consultation.",
    points: [
      "Plain-language case summary",
      "Key medical information and findings",
      "Specialist observations and considerations",
      "Questions to discuss with your treating team",
    ],
  },
  {
    number: "05",
    icon: MessageCircle,
    title: "Prepare for the Next Consultation",
    subtitle: "Take clearer questions into your doctor's appointment",
    description:
      "Use your Caselet as a discussion aid when speaking with your treating doctor or another specialist. A second opinion is intended to support informed conversations and should be considered alongside your complete medical history and professional medical advice.",
    points: [
      "Discuss your questions with your doctor",
      "Compare the perspectives you receive",
      "Understand available treatment considerations",
      "Make decisions together with your healthcare team",
    ],
  },
];

const benefits = [
  {
    icon: FileText,
    title: "One organized case",
    description:
      "Keep your relevant medical reports, information and questions organized instead of searching through multiple files.",
  },
  {
    icon: Stethoscope,
    title: "Specialist perspective",
    description:
      "Get your case reviewed by a verified surgical specialist relevant to the condition presented.",
  },
  {
    icon: BookOpen,
    title: "Clearer information",
    description:
      "Receive structured information designed to make complex medical details easier to understand and discuss.",
  },
  {
    icon: MessageCircle,
    title: "Better conversations",
    description:
      "Go into your next medical consultation with better-organized information and more focused questions.",
  },
];

const safetyPoints = [
  "A second opinion does not replace your treating doctor's medical advice.",
  "The quality of the review depends on the completeness and accuracy of the information provided.",
  "Urgent or emergency medical conditions require immediate medical attention.",
  "Treatment decisions should be made with an appropriately qualified healthcare professional.",
];

const faqs = [
  {
    question: "What is a surgical second opinion?",
    answer:
      "A surgical second opinion is an independent medical perspective from a qualified specialist after reviewing the available information about a patient's condition. It can help patients understand their diagnosis, treatment options and questions to discuss with their treating team.",
  },
  {
    question: "What medical documents should I upload?",
    answer:
      "Upload the reports that are relevant to your condition, such as diagnostic reports, imaging reports, biopsy or pathology reports, prescriptions, discharge summaries and other documents provided by your healthcare team.",
  },
  {
    question: "Will a doctor review my case?",
    answer:
      "The Qikplus platform is designed to connect cases with verified surgical specialists for specialist review. The specialist's assessment is based on the clinical information available in the submitted case.",
  },
  {
    question: "Can a second opinion replace my current doctor?",
    answer:
      "No. A second opinion is intended to provide an additional perspective and support a conversation with your treating team. It should not be considered a replacement for ongoing medical care.",
  },
  {
    question: "What is a Caselet?",
    answer:
      "A Caselet is a structured summary of your case designed to organize important medical information, specialist observations and discussion points in a format that is easier for patients and families to understand and use during consultations.",
  },
];

export default function PatientJourneyPage() {
  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative bg-muted overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-180px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#5645d4]/8 blur-3xl" />
          <div className="absolute right-[-100px] top-40 h-[260px] w-[260px] rounded-full bg-[#5645d4]/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5645d4]/20 bg-[#5645d4]/6 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#5645d4]">
              <HeartPulse className="h-3.5 w-3.5" />
              Your Patient Journey
            </div>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              From medical reports to{" "}
              <span className="text-[#5645d4]">clearer decisions</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              A surgical decision can come with complicated reports, unfamiliar
              medical terms and difficult questions. Second Opinion by Qikplus
              helps organize your case, connect it with a verified surgical
              specialist and give you clearer information for your next
              consultation.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/auth/patient/login?role=patient"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5645d4] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5645d4]/20 transition-all hover:-translate-y-0.5 hover:bg-[#4938c4]"
              >
                Start My Second Opinion
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-bold text-foreground transition-all hover:border-[#5645d4]/30 hover:bg-[#5645d4]/5"
              >
                See How It Works
              </Link>
            </div>
          </div>

          {/* HERO TRUST STRIP */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:grid-cols-3">
            <div className="flex items-center justify-center gap-3 border-b border-border px-5 py-5 sm:border-b-0 sm:border-r">
              <ShieldCheck className="h-5 w-5 text-[#5645d4]" />
              <span className="text-sm font-semibold">
                Confidential Case Handling
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 border-b border-border px-5 py-5 sm:border-b-0 sm:border-r">
              <Stethoscope className="h-5 w-5 text-[#5645d4]" />
              <span className="text-sm font-semibold">
                Verified Specialist Review
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 px-5 py-5">
              <FileText className="h-5 w-5 text-[#5645d4]" />
              <span className="text-sm font-semibold">
                Structured Caselet
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#5645d4]">
                Why the journey matters
              </span>

              <h2 className="max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                A second opinion should give you more than another medical
                report
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
              <p>
                When you are considering surgery, understanding your condition
                and treatment options can be difficult. Different reports,
                scans and medical terms can make it challenging to understand
                what information matters most.
              </p>

              <p>
                Qikplus is designed to bring these pieces together into a
                structured patient journey. Your information is organized,
                reviewed by a relevant surgical specialist and presented in a
                format that can support a more informed conversation with your
                healthcare team.
              </p>

              <p>
                The goal is not to tell you what decision to make. The goal is
                to help you understand your case better and prepare better
                questions before making an important medical decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN JOURNEY */}
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#5645d4]">
              The complete journey
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              How your second opinion journey works
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
              From uploading your medical information to preparing for your
              next consultation, every stage is designed to make the process
              simpler and more structured.
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl">
            {/* Desktop timeline */}
            <div className="absolute left-[39px] top-10 hidden h-[calc(100%-80px)] w-px bg-[#5645d4]/20 md:block" />

            <div className="space-y-6">
              {journeySteps.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.number}
                    className="relative grid gap-6 md:grid-cols-[80px_1fr]"
                  >
                    <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#5645d4]/20 bg-white shadow-sm">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5645d4] text-white shadow-md shadow-[#5645d4]/20">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5645d4]/25 hover:shadow-md sm:p-8">
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#5645d4]">
                            Step {step.number}
                          </span>

                          <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                            {step.title}
                          </h3>

                          <p className="mt-1 text-sm font-medium text-muted-foreground">
                            {step.subtitle}
                          </p>
                        </div>

                        <div className="rounded-full bg-[#5645d4]/8 px-3 py-1.5 text-xs font-bold text-[#5645d4]">
                          {step.number}
                        </div>
                      </div>

                      <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                        {step.description}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {step.points.map((point) => (
                          <div
                            key={point}
                            className="flex items-start gap-2.5 rounded-xl bg-muted/60 px-4 py-3"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5645d4]" />
                            <span className="text-xs font-medium leading-5 text-foreground sm:text-sm">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#5645d4]">
                What you receive
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Everything organized around your case
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                The Qikplus patient experience is designed around clarity.
                Instead of receiving disconnected information, your case is
                organized so you can understand the important details and use
                them during future medical conversations.
              </p>

              <Link
                href="/auth/patient/login?role=patient"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#5645d4] transition-colors hover:text-[#4938c4]"
              >
                Create your case
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#5645d4]/25 hover:shadow-lg"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#5645d4]/10 text-[#5645d4] transition-colors group-hover:bg-[#5645d4] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-bold">{benefit.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CASELET EXPLANATION */}
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="overflow-hidden rounded-3xl bg-[#5645d4] text-white shadow-xl shadow-[#5645d4]/15">
            <div className="grid lg:grid-cols-[1fr_0.9fr]">
              <div className="p-8 sm:p-10 lg:p-14">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                  Your Caselet
                </span>

                <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                  A clearer way to carry your case into the next consultation
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                  Medical information can be difficult to explain when you
                  have multiple reports and specialist notes. A Caselet brings
                  the important parts of your case together in a structured
                  format that is easier to review and discuss.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Case overview",
                    "Relevant medical history",
                    "Available investigation findings",
                    "Specialist observations",
                    "Important discussion points",
                    "Questions for your doctor",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-3"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center border-t border-white/10 bg-white/5 p-8 lg:border-l lg:border-t-0 lg:p-12">
                <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-white/60">
                        Qikplus
                      </div>
                      <div className="mt-1 font-bold">Caselet Overview</div>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <ClipboardCheck className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-2 rounded-full bg-white/20" />
                    <div className="h-2 w-4/5 rounded-full bg-white/20" />
                    <div className="h-2 w-3/5 rounded-full bg-white/20" />

                    <div className="my-5 h-px bg-white/10" />

                    <div className="rounded-xl bg-white/10 p-4">
                      <div className="text-xs text-white/60">
                        Specialist Review
                      </div>
                      <div className="mt-2 h-2 w-4/5 rounded-full bg-white/25" />
                      <div className="mt-2 h-2 w-3/5 rounded-full bg-white/20" />
                    </div>

                    <div className="rounded-xl bg-white/10 p-4">
                      <div className="text-xs text-white/60">
                        Discussion Points
                      </div>
                      <div className="mt-2 h-2 w-3/4 rounded-full bg-white/25" />
                      <div className="mt-2 h-2 w-1/2 rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY / SAFETY */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5645d4]/10 text-[#5645d4]">
                <LockKeyhole className="h-5 w-5" />
              </div>

              <h2 className="mt-6 text-2xl font-extrabold">
                Built around privacy and responsible care
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Your medical information is sensitive. The patient journey is
                designed around responsible handling of the information needed
                to review and understand your case.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Share only information relevant to your case",
                  "Keep your medical documents organized",
                  "Review information carefully before submission",
                  "Use your Caselet as a discussion aid with qualified professionals",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5645d4]" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <h2 className="mt-6 text-2xl font-extrabold">
                An important note about second opinions
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                A second opinion is an additional clinical perspective. It
                should support, not replace, your relationship with your
                treating healthcare professional.
              </p>

              <div className="mt-6 space-y-3">
                {safetyPoints.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                    <span className="text-sm leading-6 text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#5645d4]">
              Frequently asked questions
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Questions about the patient journey
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Here are answers to some common questions about getting a
              surgical second opinion through Qikplus.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border bg-card px-5 py-4 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold sm:text-base">
                  {faq.question}

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5645d4]/10 text-[#5645d4] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="max-w-3xl pt-4 text-sm leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#5645d4] px-6 py-12 text-center shadow-xl shadow-[#5645d4]/15 sm:px-10 sm:py-16">
            <div className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                <UserRound className="h-5 w-5" />
              </div>

              <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to get a clearer view of your surgical case?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                Start your case, organize your medical information and take a
                more structured approach to your next surgical consultation.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/auth/patient/login?role=patient"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#5645d4] transition-all hover:bg-white/90"
                >
                  Start My Second Opinion
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/15"
                >
                  Talk to Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
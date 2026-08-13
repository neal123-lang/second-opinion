import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Clock,
  FileCheck2,
  FileText,
  HelpCircle,
  Hospital,
  ShieldCheck,
  Stethoscope,
  Upload,
  UserCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | Surgical Second Opinion & Caselet | Qikplus",
  description:
    "Learn how Qikplus works. Upload your medical reports, get AI-powered clinical insights, connect with verified surgical specialists, receive a structured Caselet, and move forward with greater clarity.",
  alternates: {
    canonical: "/how-it-works",
  },
  openGraph: {
    title: "How It Works | Second Opinion by Qikplus",
    description:
      "From medical reports to surgical consultation and hospital admission, discover how the Qikplus patient journey works.",
    url: "/how-it-works",
    type: "website",
  },
};

const journeySteps = [
  {
    number: "01",
    label: "START WITH YOUR REPORTS",
    title: "Upload Reports & Documents",
    shortDescription:
      "Bring your relevant medical reports, scans and hospital documents together in one place.",
    description:
      "Your Qikplus journey starts with the information you already have. Upload the medical documents related to your condition or proposed surgery so your case can be organized before the specialist consultation.",
    icon: Upload,
    color: "bg-secondary text-secondary-foreground",
    whatYouCanUpload: [
      "Laboratory and blood test reports",
      "MRI, CT and other imaging reports",
      "Biopsy and pathology reports",
      "Hospital discharge summaries",
      "Previous consultation notes",
      "Other relevant medical documents",
    ],
    outcome:
      "Your medical information becomes the starting point for a structured case review.",
  },
  {
    number: "02",
    label: "AI-POWERED CLINICAL STRUCTURING",
    title: "AI Generates Clinical Insights",
    shortDescription:
      "Qikplus organizes complex medical information into a structured doctor brief and simplified patient summary.",
    description:
      "Medical reports can contain technical terminology, measurements, findings and information spread across multiple documents. Qikplus uses its AI-powered engine to organize the available information into a structured format that is easier to review and discuss.",
    icon: Brain,
    color: "bg-secondary text-secondary-foreground",
    whatYouGet: [
      "Structured clinical information",
      "A simplified patient-oriented summary",
      "Relevant information organized for specialist review",
      "A clearer starting point for your consultation",
    ],
    outcome:
      "Instead of starting a consultation with scattered documents, your case has already been organized for review.",
  },
  {
    number: "03",
    label: "EXPERT SPECIALIST CONSULTATION",
    title: "Connect With a Verified Surgical Specialist",
    shortDescription:
      "Your structured case history is available to support a focused consultation with a relevant surgical specialist.",
    description:
      "Once your information has been structured, you can connect with a verified surgical specialist relevant to your case. The specialist can review the available case information and use it as a foundation for a focused consultation.",
    icon: Stethoscope,
    color: "bg-secondary text-secondary-foreground",
    whatYouGet: [
      "Access to relevant surgical expertise",
      "Your case history prepared before consultation",
      "A focused 20-minute consultation experience",
      "An opportunity to ask questions about your case",
    ],
    outcome:
      "You spend more of the consultation discussing your condition and options instead of trying to explain every document from scratch.",
  },
  {
    number: "04",
    label: "SURGICAL DECISION",
    title: "Understand Your Options & Decide With Confidence",
    shortDescription:
      "Use the structured information and specialist discussion to better understand the next steps in your surgical journey.",
    description:
      "A surgical decision can involve questions about whether a procedure is necessary, what options may be available, what preparation is required and what should happen next. Qikplus is designed to help you approach these conversations with better-organized information.",
    icon: UserCheck,
    color: "bg-secondary text-secondary-foreground",
    whatYouGet: [
      "Better-organized information about your case",
      "Clearer questions for your treating team",
      "A structured basis for discussing treatment options",
      "Greater confidence going into the next decision",
    ],
    outcome:
      "You are better prepared to discuss the surgical recommendation and next steps with your healthcare team.",
  },
  {
    number: "05",
    label: "PARTNER HOSPITAL TRANSITION",
    title: "Move Forward to IPD Admission",
    shortDescription:
      "When appropriate, Qikplus can support the transition from consultation and decision-making to inpatient hospital admission through partner hospitals.",
    description:
      "For patients who decide to proceed with treatment, the Qikplus journey can continue toward inpatient admission at a partner hospital. The objective is to make the transition from informed decision to hospital care more seamless.",
    icon: Building2,
    color: "bg-secondary text-secondary-foreground",
    whatYouGet: [
      "A more informed transition toward hospital care",
      "Connection with partner hospital pathways",
      "Better continuity of the information collected during the journey",
      "A clearer next step after the surgical decision",
    ],
    outcome:
      "The journey can continue from second opinion and consultation toward appropriate hospital care.",
  },
];

const benefits = [
  {
    icon: Users,
    title: "For Patients",
    description:
      "Understand your medical information, prepare better questions and approach important surgical decisions with greater clarity.",
  },
  {
    icon: Stethoscope,
    title: "For Specialists",
    description:
      "Receive structured patient information before consultation so valuable consultation time can focus on clinical discussion.",
  },
  {
    icon: Hospital,
    title: "For Hospitals",
    description:
      "Connect with patients who have already gone through a structured information and consultation journey.",
  },
];

const faqs = [
  {
    question: "What is the Qikplus patient journey?",
    answer:
      "The Qikplus patient journey has five main stages: uploading medical reports and documents, generating AI-powered clinical insights, connecting with a verified surgical specialist, making a more informed surgical decision, and, where appropriate, moving toward IPD admission at a partner hospital.",
  },
  {
    question: "What documents can I upload?",
    answer:
      "Patients can upload relevant medical information such as laboratory reports, MRI or CT reports, imaging documents, biopsy reports, hospital discharge summaries, consultation notes and other case-related documents.",
  },
  {
    question: "What does the Qikplus AI engine do?",
    answer:
      "The Qikplus AI engine organizes available medical information into a structured doctor brief and simplified patient summary. Its role is to help organize and present information for review and discussion; it should not be treated as a replacement for professional medical judgment.",
  },
  {
    question: "Do I get to speak with a surgical specialist?",
    answer:
      "Yes. The Qikplus journey includes the option to connect with verified surgical specialists. The platform prepares the available case history so the consultation can be more focused.",
  },
  {
    question: "How long is the specialist consultation?",
    answer:
      "The Qikplus Home page currently describes a 20-minute assured consultation experience. The exact availability and consultation process can depend on the specialist and case.",
  },
  {
    question: "What is a Caselet?",
    answer:
      "A Caselet is a structured summary of the patient's medical information designed to make the case easier to understand and discuss. Qikplus describes the Caselet as including a simplified patient summary and a structured doctor brief.",
  },
  {
    question: "Can I use the Caselet with my existing doctor?",
    answer:
      "The Caselet is designed to support medical conversations. Patients can use the information to help prepare questions and discuss their case and treatment options with their existing healthcare team.",
  },
  {
    question: "Does Qikplus replace my doctor?",
    answer:
      "No. Qikplus is a platform designed to organize medical information and facilitate specialist consultations. It does not replace your treating doctor or emergency medical care.",
  },
  {
    question: "Is Qikplus for emergency medical situations?",
    answer:
      "No. Qikplus is not an emergency medical service. If you are experiencing a medical emergency, seek immediate medical attention through the appropriate emergency healthcare service.",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Qikplus works for surgical second opinions",
  description:
    "The five-stage Qikplus patient journey from medical report upload to specialist consultation and potential hospital admission.",
  step: journeySteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.description,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary">
      {/* =========================================================
          STRUCTURED DATA
      ========================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="pt-16">
        {/* =========================================================
            HERO
        ========================================================== */}

        <section className="relative bg-muted overflow-hidden px-4 pt-12 pb-16 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1 text-xs font-semibold text-secondary-foreground">
                <Activity className="h-3.5 w-3.5" />
                Simple, Structured, Specialist-Led
              </div>

              <h1 className="font-extrabold text-3xl text-foreground leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
                From medical reports to{" "}
                <span className="text-primary">surgical clarity.</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
                Qikplus brings your medical information, AI-powered clinical
                structuring, surgical specialists and partner hospitals into one
                connected journey — helping you move from scattered reports to a
                more informed surgical decision.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/auth/patient/login?role=patient"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground text-sm transition-all hover:bg-primary-pressed sm:w-auto"
                >
                  Get My Caselet
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#patient-journey"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 font-bold text-foreground text-sm transition-all hover:bg-muted sm:w-auto"
                >
                  Explore the Journey
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            DETAILED 5 STEPS
        ========================================================== */}

        <section className="bg-background px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="mb-2 block font-bold text-xs text-muted-foreground tracking-widest uppercase">
                Step-by-Step
              </span>

              <h2 className="mb-3 font-extrabold text-2xl text-foreground sm:text-4xl">
                How Qikplus works in detail
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed sm:text-base">
                Here is what happens at each stage of your journey, from
                uploading your first report to moving forward with the
                appropriate next step.
              </p>
            </div>

            <div className="space-y-8">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.number}
                    id={`step-${step.number}`}
                    className="scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <div className="grid lg:grid-cols-[190px_1fr]">
                      {/* Step number */}

                      <div className="border-b border-border bg-muted p-6 lg:border-r lg:border-b-0">
                        <div className="flex items-center gap-3 lg:block">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary font-black text-secondary-foreground">
                            {step.number}
                          </div>

                          <div className="lg:mt-5">
                            <span className="font-bold text-[10px] text-muted-foreground tracking-widest">
                              STEP {step.number}
                            </span>

                            <p className="mt-1 font-extrabold text-sm text-foreground">
                              {step.label}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Content */}

                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col gap-5 sm:flex-row">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-extrabold text-xl text-foreground sm:text-2xl">
                              {step.title}
                            </h3>

                            <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-7">
                              {step.description}
                            </p>

                            {/* Details */}

                            <div className="mt-7">
                              <h4 className="mb-3 font-bold text-xs text-foreground uppercase tracking-wider">
                                What happens at this stage
                              </h4>

                              <div className="grid gap-3 sm:grid-cols-2">
                                {(
                                  step.whatYouCanUpload ?? step.whatYouGet
                                )?.map((item) => (
                                  <div
                                    key={item}
                                    className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/40 p-3"
                                  >
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                                    <span className="text-xs text-muted-foreground leading-5">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Outcome */}

                            <div className="mt-6 rounded-xl border border-primary/15 bg-secondary/50 p-4">
                              <div className="flex gap-3">
                                <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                                <div>
                                  <span className="font-bold text-xs text-foreground">
                                    What this means for you
                                  </span>

                                  <p className="mt-1 text-xs text-muted-foreground leading-5">
                                    {step.outcome}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            CASELET SECTION
        ========================================================== */}

        <section className="border-t border-border bg-muted px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="mb-2 block font-bold text-xs text-muted-foreground tracking-widest uppercase">
                  Your Caselet
                </span>

                <h2 className="mb-4 font-extrabold text-2xl text-foreground sm:text-4xl">
                  What is a Caselet?
                </h2>

                <p className="text-sm text-muted-foreground leading-7">
                  Your medical reports can contain pages of technical
                  terminology, measurements, findings and information from
                  different appointments. A Caselet is designed to bring the
                  important information together into a structured format.
                </p>

                <p className="mt-4 text-sm text-muted-foreground leading-7">
                  Qikplus describes the Caselet as a combination of a simplified
                  patient summary and a structured doctor brief, helping
                  patients understand their case and helping specialists begin
                  with relevant information already organized.
                </p>

                <Link
                  href="/auth/patient/login?role=patient"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground text-sm transition-all hover:bg-primary-pressed"
                >
                  Get My Caselet
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Caselet visual */}

              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-primary/5 blur-2xl" />

                <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  {/* Fake document header */}

                  <div className="border-b border-border bg-background px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-extrabold text-sm text-foreground">
                          Patient Caselet
                        </div>

                        <div className="mt-1 text-[10px] text-muted-foreground">
                          Structured Clinical Summary
                        </div>
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                        <FileText className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div>
                      <div className="mb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        Patient Summary
                      </div>

                      <div className="h-2 w-full rounded bg-muted" />
                      <div className="mt-2 h-2 w-5/6 rounded bg-muted" />
                      <div className="mt-2 h-2 w-4/6 rounded bg-muted" />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-border bg-muted p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-primary" />

                          <span className="font-bold text-xs text-foreground">
                            Doctor Brief
                          </span>
                        </div>

                        <div className="h-2 w-full rounded bg-background" />
                        <div className="mt-2 h-2 w-4/5 rounded bg-background" />
                      </div>

                      <div className="rounded-xl border border-border bg-muted p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-primary" />

                          <span className="font-bold text-xs text-foreground">
                            Questions
                          </span>
                        </div>

                        <div className="h-2 w-full rounded bg-background" />
                        <div className="mt-2 h-2 w-3/5 rounded bg-background" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-primary/10 bg-secondary px-3 py-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary" />

                      <span className="text-[11px] font-semibold text-secondary-foreground">
                        Ready for specialist discussion
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            AI + SPECIALIST
        ========================================================== */}

        <section className="bg-background px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="mb-2 block font-bold text-xs text-muted-foreground tracking-widest uppercase">
                Technology + Expertise
              </span>

              <h2 className="mb-3 font-extrabold text-2xl text-foreground sm:text-4xl">
                AI organizes the information.
                <br className="hidden sm:block" />
                Specialists bring clinical expertise.
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed sm:text-base">
                Qikplus combines technology with specialist consultation to
                create a more structured experience around complex surgical
                decisions.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* AI */}

              <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <Brain className="h-5 w-5" />
                  </div>

                  <div>
                    <span className="font-bold text-[10px] text-muted-foreground tracking-widest">
                      TECHNOLOGY
                    </span>

                    <h3 className="mt-1 font-extrabold text-lg text-foreground">
                      AI-powered clinical structuring
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm text-muted-foreground leading-6">
                  Qikplus uses AI to organize raw medical information into a
                  structured doctor brief and simplified patient summary.
                </p>

                <ul className="mt-5 space-y-3">
                  {[
                    "Organizes complex information.",
                    "Creates a structured starting point for review.",
                    "Produces a simplified patient-oriented summary.",
                    "Helps prepare the case for consultation.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specialist */}

              <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <Stethoscope className="h-5 w-5" />
                  </div>

                  <div>
                    <span className="font-bold text-[10px] text-muted-foreground tracking-widest">
                      EXPERTISE
                    </span>

                    <h3 className="mt-1 font-extrabold text-lg text-foreground">
                      Surgical specialist consultation
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm text-muted-foreground leading-6">
                  The structured case gives the specialist a clearer starting
                  point for consultation, allowing the conversation to focus on
                  the patient's condition and potential next steps.
                </p>

                <ul className="mt-5 space-y-3">
                  {[
                    "Relevant surgical expertise.",
                    "Case history available before consultation.",
                    "Focused consultation experience.",
                    "Opportunity to discuss questions and options.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            BEFORE / AFTER
        ========================================================== */}

        <section className="border-t border-border bg-muted px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <span className="mb-2 block font-bold text-xs text-muted-foreground tracking-widest uppercase">
                Why The Journey Matters
              </span>

              <h2 className="mb-3 font-extrabold text-2xl text-foreground sm:text-4xl">
                From scattered information to structured clarity
              </h2>

              <p className="mx-auto max-w-xl text-sm text-muted-foreground leading-relaxed">
                Qikplus is designed to address the information and coordination
                challenges patients can face before an important surgical
                decision.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Before */}

              <div className="rounded-2xl border border-destructive/20 bg-card p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-destructive/10 px-3 py-1 font-bold text-[10px] text-destructive uppercase">
                    Without structured preparation
                  </span>
                </div>

                <h3 className="mb-4 font-extrabold text-lg text-foreground">
                  Scattered medical information
                </h3>

                <ul className="space-y-3">
                  {[
                    "Multiple reports and documents.",
                    "Complex medical terminology.",
                    "Limited time to explain the complete history.",
                    "Difficulty knowing which questions to ask.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs text-muted-foreground"
                    >
                      <span className="font-bold text-destructive">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}

              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <FileCheck2 className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-secondary px-3 py-1 font-bold text-[10px] text-secondary-foreground uppercase">
                    With Qikplus
                  </span>
                </div>

                <h3 className="mb-4 font-extrabold text-lg text-foreground">
                  Structured case preparation
                </h3>

                <ul className="space-y-3">
                  {[
                    "Medical information organized into a case.",
                    "AI-powered clinical structuring.",
                    "Specialist consultation with case history available.",
                    "A clearer basis for discussing treatment options.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHO BENEFITS
        ========================================================== */}

        <section className="bg-background px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <span className="mb-2 block font-bold text-xs text-muted-foreground tracking-widest uppercase">
                One Connected Platform
              </span>

              <h2 className="mb-3 font-extrabold text-2xl text-foreground sm:text-4xl">
                Built for the entire surgical care ecosystem
              </h2>

              <p className="mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed">
                Qikplus connects patients, surgical specialists and partner
                hospitals through a structured healthcare journey.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-muted-foreground/30 hover:shadow-sm"
                  >
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="font-extrabold text-base text-foreground">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 text-xs text-muted-foreground leading-6">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SPECIALTIES CTA
        ========================================================== */}

        <section className="border-t border-border bg-muted px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-card p-7 sm:p-9 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <span className="mb-2 block font-bold text-xs text-muted-foreground tracking-widest uppercase">
                  Surgical Expertise
                </span>

                <h2 className="font-extrabold text-2xl text-foreground sm:text-3xl">
                  Explore the surgical specialties supported by Qikplus
                </h2>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  From general surgery and orthopaedics to neurosurgery, cardiac
                  surgery, urology, oncology and other specialties, explore the
                  areas where Qikplus can support surgical consultations.
                </p>
              </div>

              <Link
                href="/#surgical-specialties"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground text-sm transition-all hover:bg-primary-pressed"
              >
                Explore Specialties
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            FAQ
        ========================================================== */}

        <section className="bg-background px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <span className="mb-2 block font-bold text-xs text-muted-foreground tracking-widest uppercase">
                Frequently Asked Questions
              </span>

              <h2 className="mb-3 font-extrabold text-2xl text-foreground sm:text-4xl">
                Questions about how Qikplus works
              </h2>

              <p className="mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed">
                Find answers to common questions about reports, AI-powered
                insights, specialist consultations and the Caselet.
              </p>
            </div>

            <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
              {faqs.map((faq) => (
                <details key={faq.question} className="group px-5 py-5 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold text-sm text-foreground">
                    <span>{faq.question}</span>

                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>

                  <p className="mt-3 pr-6 text-xs text-muted-foreground leading-6 sm:text-sm">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================== */}

        <section className="bg-background px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy p-8 text-center text-on-primary sm:p-12">
              <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

              <div className="relative z-10 mx-auto max-w-2xl">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 font-bold text-xs text-white">
                  <Clock className="h-3.5 w-3.5" />
                  Start Your Second Opinion
                </span>

                <h2 className="mb-4 font-extrabold text-3xl text-white leading-tight sm:text-4xl">
                  Get clarity before your next surgical decision.
                </h2>

                <p className="mb-8 text-sm text-white/80 leading-relaxed sm:text-base">
                  Upload your medical reports and begin your Qikplus journey
                  toward a structured case, specialist consultation and a
                  clearer path forward.
                </p>

                <div className="flex flex-col justify-center gap-3.5 sm:flex-row">
                  <Link
                    href="/auth/patient/login?role=patient"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-bold text-primary-foreground text-sm transition-all hover:bg-primary-pressed"
                  >
                    Get My Caselet
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/#surgical-specialties"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-bold text-white text-sm transition-all hover:bg-white/10"
                  >
                    Explore Specialties
                    <Stethoscope className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

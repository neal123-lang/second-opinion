import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Second Opinion by Qikplus",
  description:
    "Find answers to frequently asked questions about surgical second opinions, Caselets, specialist reviews, medical reports, patient privacy, consultations, and the Qikplus platform.",
  keywords: [
    "Qikplus FAQ",
    "Second Opinion FAQ",
    "surgical second opinion",
    "medical second opinion",
    "how does Qikplus work",
    "Caselet",
    "specialist review",
    "surgical consultation",
    "patient medical reports",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Second Opinion by Qikplus",
    description:
      "Answers to common questions about surgical second opinions, specialist reviews, Caselets, consultations, privacy, and Qikplus.",
    url: "/faq",
    type: "website",
  },
};

type FAQ = {
  question: string;
  answer: string;
};

const patientFaqs: FAQ[] = [
  {
    question: "What is a surgical second opinion?",
    answer:
      "A surgical second opinion is an independent review of your medical information by another qualified specialist before you make a decision about surgery. It can help you better understand your diagnosis, proposed treatment, available options, and questions you may want to discuss with your treating doctor.",
  },
  {
    question: "What is Qikplus Second Opinion?",
    answer:
      "Second Opinion by Qikplus is a platform designed to help patients organize their medical information and obtain a structured review from a verified surgical specialist. The platform brings together your reports, relevant clinical information, specialist review, and a structured Caselet so that you can approach your next consultation with greater clarity.",
  },
  {
    question: "Who can use Qikplus?",
    answer:
      "Qikplus is designed for patients who are considering surgery or want an additional specialist perspective on a surgical condition. It can also support doctors and hospitals through dedicated provider and partnership pathways.",
  },
  {
    question: "Do I need to have a surgery recommendation before using Qikplus?",
    answer:
      "The platform is intended for people seeking greater clarity around a surgical decision. If a doctor has recommended surgery or you are evaluating whether surgery is appropriate, a second opinion may help you prepare for your next discussion with a qualified specialist.",
  },
  {
    question: "What medical documents can I submit?",
    answer:
      "Depending on your case, relevant information may include laboratory reports, imaging reports, MRI or CT scan information, biopsy reports, prescriptions, discharge summaries, previous consultation notes, and other documents relevant to your condition.",
  },
  {
    question: "Can I upload scans and medical reports?",
    answer:
      "Yes. The platform is designed to organize relevant medical documentation so that the reviewing specialist can understand the available information as part of the case review process.",
  },
];

const processFaqs: FAQ[] = [
  {
    question: "How does the Qikplus second-opinion process work?",
    answer:
      "The process is designed around four main stages: submit your relevant medical information, have the case reviewed by an appropriate specialist, receive your structured Caselet, and use that information during your next consultation or decision-making process.",
  },
  {
    question: "What is a Caselet?",
    answer:
      "A Caselet is a structured representation of your medical case designed to make complex information easier to understand and discuss. It can include a patient-friendly summary as well as information that can support a specialist discussion.",
  },
  {
    question: "Who reviews my case?",
    answer:
      "Cases are intended to be reviewed by a verified surgical specialist relevant to the condition or surgical area involved. The specialist review is an important part of the Qikplus process and is not intended to be replaced by an automated system.",
  },
  {
    question: "Does AI make the medical decision?",
    answer:
      "No. AI can help structure and organize information, but it should not replace the judgment of a qualified medical professional. The purpose of the platform is to help organize your case and facilitate specialist review and clearer discussions.",
  },
  {
    question: "How long does the review take?",
    answer:
      "The turnaround time can depend on the type of case, the information provided, specialist availability, and the review pathway. Any applicable estimated turnaround should be confirmed through the platform when you submit your case.",
  },
  {
    question: "Can I use my Caselet when speaking to my current doctor?",
    answer:
      "Yes. One of the purposes of a structured Caselet is to help you and your family understand the case and provide a useful basis for discussion with your existing treating team or another specialist.",
  },
];

const specialistFaqs: FAQ[] = [
  {
    question: "Are the specialists on Qikplus verified?",
    answer:
      "Qikplus is designed to work with verified surgical specialists who are matched to relevant cases. Specialist credentials and participation requirements are part of the provider onboarding process.",
  },
  {
    question: "Does Qikplus replace my treating doctor?",
    answer:
      "No. A second opinion is intended to provide an additional specialist perspective. It does not automatically replace your existing doctor, surgeon, or healthcare team.",
  },
  {
    question: "Can Qikplus tell me whether I should have surgery?",
    answer:
      "The platform can help you obtain and understand an additional specialist perspective, but medical treatment decisions should be made with qualified healthcare professionals who understand your individual clinical circumstances.",
  },
  {
    question: "Can I contact a specialist directly?",
    answer:
      "Depending on the available pathway and case, patients may have the option to connect with selected specialists for further consultation. Availability and applicable consultation arrangements may vary.",
  },
];

const privacyFaqs: FAQ[] = [
  {
    question: "Is my medical information private?",
    answer:
      "Protecting patient information is an important part of the Qikplus experience. Patients should use the secure platform workflow when submitting medical information and should avoid sending sensitive clinical documents through general contact channels.",
  },
  {
    question: "Should I send medical reports through the Contact Us form?",
    answer:
      "No. General contact forms should be used for questions and support requests rather than sensitive clinical documentation. Use the secure patient workflow when submitting medical information for a second-opinion review.",
  },
  {
    question: "Is Qikplus an emergency medical service?",
    answer:
      "No. Qikplus is not intended for medical emergencies or urgent clinical care. If you are experiencing a medical emergency, seek immediate assistance through your local emergency medical service or healthcare facility.",
  },
  {
    question: "Does a second opinion guarantee a different diagnosis or treatment?",
    answer:
      "No. A second opinion may confirm the original assessment, provide additional context, or identify questions and alternatives worth discussing. It does not guarantee that the diagnosis or treatment recommendation will change.",
  },
];

function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <details className="group rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-[#5645D4]/20 hover:shadow-md hover:shadow-slate-900/5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left sm:px-6">
        <span className="text-sm font-bold leading-6 text-[#172033] sm:text-[15px]">
          {faq.question}
        </span>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F7F6FD] text-[#5645D4] transition-transform duration-200 group-open:rotate-180">
          <ChevronDown className="h-4 w-4" />
        </span>
      </summary>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="border-t border-slate-100 pt-4">
          <p className="text-sm leading-7 text-slate-600">
            {faq.answer}
          </p>
        </div>
      </div>
    </details>
  );
}

function FAQSection({
  eyebrow,
  title,
  description,
  faqs,
}: {
  eyebrow: string;
  title: string;
  description: string;
  faqs: FAQ[];
}) {
  return (
    <section className="border-b border-slate-200/70 py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5645D4]">
            {eyebrow}
          </span>

          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-[#172033] sm:text-3xl">
            {title}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            {description}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FAQPage() {
  const allFaqs = [
    ...patientFaqs,
    ...processFaqs,
    ...specialistFaqs,
    ...privacyFaqs,
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-[#F8F7FD] via-white to-white">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#5645D4]/8 blur-3xl" />

        <div className="pointer-events-none absolute -left-40 top-32 h-[300px] w-[300px] rounded-full bg-[#8B7FE8]/8 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:pb-24 lg:pt-36">
          {/* Breadcrumb */}
         

          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5645D4]/10 text-[#5645D4]">
              <HelpCircle className="h-7 w-7" />
            </div>

            <span className="inline-flex items-center rounded-full border border-[#5645D4]/15 bg-[#5645D4]/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              Frequently Asked Questions
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-[#172033] sm:text-5xl lg:text-6xl">
              Questions? Start{" "}
              <span className="text-[#5645D4]">here.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Find clear answers about surgical second opinions, specialist
              reviews, Caselets, medical reports, patient privacy, and how the
              Qikplus platform works.
            </p>
          </div>

          {/* Quick navigation */}
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {[
              ["Patients", "#patients"],
              ["How It Works", "#how-it-works"],
              ["Specialists", "#specialists"],
              ["Privacy & Safety", "#privacy"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all hover:border-[#5645D4]/20 hover:bg-[#F7F6FD] hover:text-[#5645D4]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST STRIP
      ========================================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl divide-y divide-slate-200 px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex items-center gap-3 py-5 md:px-6 md:first:pl-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5645D4]/10 text-[#5645D4]">
              <Stethoscope className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-bold text-[#172033]">
                Specialist-focused
              </p>
              <p className="text-[11px] text-slate-500">
                Built around qualified clinical review
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-5 md:px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5645D4]/10 text-[#5645D4]">
              <ShieldCheck className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-bold text-[#172033]">
                Privacy-conscious
              </p>
              <p className="text-[11px] text-slate-500">
                Use secure workflows for clinical information
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-5 md:px-6 md:last:pr-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5645D4]/10 text-[#5645D4]">
              <HelpCircle className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-bold text-[#172033]">
                Clear information
              </p>
              <p className="text-[11px] text-slate-500">
                Designed to make complex cases easier to discuss
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ SECTIONS
      ========================================================== */}
      <div id="patients">
        <FAQSection
          eyebrow="For Patients"
          title="Questions about getting a second opinion"
          description="Understand who Qikplus is designed for, what information you may need, and how a surgical second opinion can fit into your healthcare decision-making process."
          faqs={patientFaqs}
        />
      </div>

      <div id="how-it-works">
        <FAQSection
          eyebrow="The Process"
          title="How Qikplus works"
          description="Learn how your medical information moves through the Qikplus workflow, from submitting your case to receiving a structured Caselet and preparing for your next consultation."
          faqs={processFaqs}
        />
      </div>

      <div id="specialists">
        <FAQSection
          eyebrow="Specialists & Clinical Review"
          title="Questions about specialist involvement"
          description="Understand the role of qualified surgical specialists and how specialist review fits into the Qikplus second-opinion experience."
          faqs={specialistFaqs}
        />
      </div>

      <div id="privacy">
        <FAQSection
          eyebrow="Privacy & Safety"
          title="Your information and healthcare decisions"
          description="Important information about privacy, sensitive medical documents, emergencies, and the role of a second opinion in your healthcare journey."
          faqs={privacyFaqs}
        />
      </div>

      {/* =========================================================
          STILL HAVE QUESTIONS
      ========================================================== */}
      <section className="bg-[#F8F7FD] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-[#0A1530] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#5645D4]/30 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A9A0F2]">
                  Still have questions?
                </span>

                <h2 className="mt-3 max-w-2xl text-2xl font-extrabold tracking-[-0.03em] text-white sm:text-3xl">
                  We&apos;re here to help you understand what comes next.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  If you cannot find the answer you are looking for, contact
                  the Qikplus team and we&apos;ll help guide you to the right
                  pathway.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5645D4] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#6656DB]"
              >
                Contact Us

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SEO FAQ STRUCTURED DATA
      ========================================================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
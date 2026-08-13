"use client";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Search,
  ShieldCheck,
  Stethoscope,
  Upload,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Specialty = {
  id: number;
  category: string;
  title: string;
  description: string;
  procedures: string[];
};

type FAQ = {
  question: string;
  answer: string;
};

type Props = {
  specialtyData: Specialty[];
  faqData: FAQ[];
};

const categoryStyles: Record<
  string,
  {
    icon: typeof Activity;
    accent: string;
    soft: string;
  }
> = {
  General: {
    icon: Activity,
    accent: "text-[#5645D4]",
    soft: "bg-[#5645D4]/10",
  },
  "Ortho & Spine": {
    icon: Activity,
    accent: "text-[#4B46C6]",
    soft: "bg-[#4B46C6]/10",
  },
  "Neuro & Heart": {
    icon: Activity,
    accent: "text-[#5645D4]",
    soft: "bg-[#5645D4]/10",
  },
  "Organs & Oncology": {
    icon: Activity,
    accent: "text-[#6555D9]",
    soft: "bg-[#6555D9]/10",
  },
  "Women & Children": {
    icon: Users,
    accent: "text-[#735FDC]",
    soft: "bg-[#735FDC]/10",
  },
  Specialized: {
    icon: Stethoscope,
    accent: "text-[#4938C2]",
    soft: "bg-[#4938C2]/10",
  },
};

export default function SpecialtiesClient({
  specialtyData,
  faqData,
}: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    "All",
    "General",
    "Ortho & Spine",
    "Neuro & Heart",
    "Organs & Oncology",
    "Women & Children",
    "Specialized",
  ];

  const filteredSpecialties = useMemo(() => {
    const query = search.toLowerCase().trim();

    return specialtyData.filter((specialty) => {
      const categoryMatch =
        activeCategory === "All" || specialty.category === activeCategory;

      const searchMatch =
        !query ||
        specialty.title.toLowerCase().includes(query) ||
        specialty.description.toLowerCase().includes(query) ||
        specialty.procedures.some((procedure) =>
          procedure.toLowerCase().includes(query)
        );

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search, specialtyData]);

  return (
    <main className="overflow-hidden bg-white">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative border-b border-slate-200 bg-[#FAFAFE]">
        <div className="absolute inset-0 -z-0">
          <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#5645D4]/10 blur-3xl" />
          <div className="absolute bottom-[-180px] right-[-100px] h-[380px] w-[380px] rounded-full bg-[#8B7FE8]/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5645D4]/15 bg-[#5645D4]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#5645D4]">
              <Activity className="h-3.5 w-3.5" />
              Comprehensive Surgical Care
            </div>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-[#172033] sm:text-5xl lg:text-6xl">
              Surgical specialties for{" "}
              <span className="text-[#5645D4]">
                informed decisions
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Explore the surgical specialties supported by Qikplus. Upload
              your medical reports, organize your case, and get the clarity
              you need before making an important surgical decision.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/auth/patient/login?role=patient"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5645D4] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5645D4]/20 transition-all hover:-translate-y-0.5 hover:bg-[#4938C2]"
              >
                Get My Second Opinion
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-colors hover:border-[#C8C2F0] hover:bg-[#F7F6FD] hover:text-[#5645D4]"
              >
                See How It Works
              </Link>
            </div>
          </div>

          {/* Trust stats */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ["20+", "Surgical specialties"],
              ["100+", "Surgical procedures"],
              ["1 platform", "For structured case review"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-center shadow-sm backdrop-blur"
              >
                <p className="text-xl font-extrabold text-[#172033]">
                  {value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SPECIALTIES
      ========================================================== */}
      <section
        id="specialties"
        className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              Our Coverage
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              Explore surgical specialties
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Find the specialty that best matches your diagnosis, proposed
              procedure or surgical concern. Each specialty includes common
              procedures supported through the Qikplus platform.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search specialty or procedure..."
                aria-label="Search surgical specialties"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#5645D4]/50 focus:ring-4 focus:ring-[#5645D4]/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:justify-center">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-all ${
                  activeCategory === category
                    ? "bg-[#5645D4] text-white shadow-md shadow-[#5645D4]/15"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#C8C2F0] hover:bg-[#F7F6FD] hover:text-[#5645D4]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Result count */}
          <div className="mb-5 mt-10 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">
              {filteredSpecialties.length}{" "}
              {filteredSpecialties.length === 1
                ? "specialty"
                : "specialties"}{" "}
              available
            </p>

            {search && (
              <p className="text-xs text-slate-500">
                Results for &ldquo;{search}&rdquo;
              </p>
            )}
          </div>

          {/* Specialty cards */}
          {filteredSpecialties.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredSpecialties.map((specialty) => {
                const style =
                  categoryStyles[specialty.category] ??
                  categoryStyles.Specialized;

                const Icon = style.icon;

                return (
                  <article
                    key={specialty.id}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8C2F0] hover:shadow-xl hover:shadow-[#5645D4]/8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.soft} ${style.accent}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {String(specialty.id).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-extrabold tracking-tight text-[#172033]">
                      {specialty.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {specialty.description}
                    </p>

                    <div className="mt-5 border-t border-slate-100 pt-5">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5645D4]">
                        Common procedures
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {specialty.procedures.map((procedure) => (
                          <span
                            key={procedure}
                            className="rounded-lg bg-[#F7F6FD] px-2.5 py-1.5 text-[11px] font-medium leading-4 text-slate-600"
                          >
                            {procedure}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-6">
                      <Link
                        href="/auth/patient/login?role=patient"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5645D4] transition-colors hover:text-[#4938C2]"
                      >
                        Consult a Specialist
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-slate-300" />
              <h3 className="mt-4 text-lg font-bold text-slate-800">
                No specialty found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try searching for another specialty or procedure.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-5 rounded-xl bg-[#5645D4] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#4938C2]"
              >
                View all specialties
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          WHY SECOND OPINION
      ========================================================== */}
      <section className="border-y border-slate-200 bg-[#FAFAFE] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
                Why Get a Second Opinion?
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
                More clarity before an important surgical decision
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Surgery can involve significant decisions about diagnosis,
                treatment options, timing and recovery. A specialist second
                opinion can help you prepare better questions and understand
                the proposed treatment before moving forward.
              </p>

              <Link
                href="/how-it-works"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#5645D4]"
              >
                Learn how Qikplus works
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Upload,
                  title: "Organize your reports",
                  text: "Bring relevant medical documents together in one structured case.",
                },
                {
                  icon: ShieldCheck,
                  title: "Specialist-focused review",
                  text: "Prepare your case for review by an appropriate medical specialist.",
                },
                {
                  icon: Stethoscope,
                  title: "Understand your options",
                  text: "Use structured information to have a more productive medical discussion.",
                },
                {
                  icon: CheckCircle2,
                  title: "Make informed decisions",
                  text: "Move forward with greater clarity about your next steps.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5645D4]/10 text-[#5645D4]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-4 text-sm font-extrabold text-[#172033]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              Simple Process
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              From medical reports to clearer conversations
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Qikplus helps structure the information around your case so you
              can approach your next surgical discussion better prepared.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Upload reports",
                text: "Submit relevant scans, laboratory reports and medical documents.",
              },
              {
                number: "02",
                title: "Structure the case",
                text: "Your information is organized into a clearer case overview.",
              },
              {
                number: "03",
                title: "Specialist review",
                text: "Your case can be prepared for an appropriate specialist consultation.",
              },
              {
                number: "04",
                title: "Discuss & decide",
                text: "Use the structured information to discuss your treatment options.",
              },
            ].map((step) => (
              <div key={step.number} className="relative">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="text-3xl font-black text-[#5645D4]/15">
                    {step.number}
                  </span>

                  <h3 className="mt-3 text-base font-extrabold text-[#172033]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section className="border-t border-slate-200 bg-[#FAFAFE] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5645D4]">
              Frequently Asked Questions
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              Questions about surgical second opinions
            </h2>
          </div>

          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {faqData.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question} className="px-5 sm:px-7">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-sm font-bold leading-6 text-[#172033] sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#5645D4] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-5 pr-8">
                      <p className="text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#5645D4] px-6 py-12 text-center shadow-2xl shadow-[#5645D4]/20 sm:px-12 sm:py-16">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
                <Stethoscope className="h-3.5 w-3.5" />
                Surgical Second Opinion
              </span>

              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Have a surgical decision ahead?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                Upload your medical reports and take the next step toward a
                clearer, more informed conversation about your treatment.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/auth/patient/login?role=patient"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#5645D4] transition-all hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Get My Second Opinion
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/15"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>

          {/* Medical disclaimer */}
          <div className="mx-auto mt-8 max-w-3xl text-center">
            <p className="text-[11px] leading-5 text-slate-400">
              Qikplus is designed to support informed healthcare discussions
              and second opinions. Information provided through the platform
              should not be considered a substitute for an in-person medical
              examination, diagnosis, emergency care or treatment advice from
              your treating healthcare professional.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import {
  Activity,
  AlertCircle,
  ArrowRight,
  Award,
  Baby,
  Bone,
  BookOpen,
  Brain,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Eye,
  FileCheck2,
  FileQuestion,
  Heart,
  HeartPulse,
  LockKeyhole,
  Menu,
  Search,
  ShieldCheck,
  ShieldAlert,
  Smile,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Upload,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type SurgicalSpecialty = {
  id: string;
  number: number;
  name: string;
  icon: LucideIcon;
  category: string;
  procedures: string[];
};

/* =========================================================
   SURGICAL SPECIALTIES
========================================================= */

const surgicalSpecialties: SurgicalSpecialty[] = [
  {
    id: "general-surgery",
    number: 1,
    name: "General Surgery",
    icon: Activity,
    category: "General",
    procedures: [
      "Hernia Repair",
      "Gallbladder Surgery",
      "Appendix Surgery",
      "Thyroid Surgery",
      "Piles, Fissure & Fistula Surgery",
      "Breast Surgery",
    ],
  },
  {
    id: "orthopaedics",
    number: 2,
    name: "Orthopaedics",
    icon: Bone,
    category: "Ortho & Spine",
    procedures: [
      "Total Knee Replacement",
      "Total Hip Replacement",
      "ACL & Ligament Reconstruction",
      "Arthroscopy",
      "Shoulder Replacement",
      "Sports Injury Surgery",
      "Trauma & Fracture Fixation",
    ],
  },
  {
    id: "spine-surgery",
    number: 3,
    name: "Spine Surgery",
    icon: Activity,
    category: "Ortho & Spine",
    procedures: [
      "Slip Disc Surgery",
      "Lumbar Decompression",
      "Cervical Spine Surgery",
      "Spinal Fusion",
      "Minimally Invasive Spine Surgery",
    ],
  },
  {
    id: "neurosurgery",
    number: 4,
    name: "Neurosurgery",
    icon: Brain,
    category: "Neuro & Heart",
    procedures: [
      "Brain Tumor Surgery",
      "Stroke Intervention",
      "Aneurysm Surgery",
      "Hydrocephalus",
      "Skull Base Surgery",
    ],
  },
  {
    id: "cardiac-surgery",
    number: 5,
    name: "Cardiac Surgery",
    icon: HeartPulse,
    category: "Neuro & Heart",
    procedures: [
      "CABG / Bypass Surgery",
      "Valve Replacement",
      "Minimally Invasive Cardiac Surgery",
      "Aortic Surgery",
      "Congenital Heart Surgery",
    ],
  },
  {
    id: "cardiology-interventional",
    number: 6,
    name: "Interventional Cardiology",
    icon: Heart,
    category: "Neuro & Heart",
    procedures: [
      "Angiography",
      "Angioplasty",
      "Pacemaker Implantation",
      "TAVI / TAVR",
      "Device Closure Procedures",
    ],
  },
  {
    id: "urology",
    number: 7,
    name: "Urology",
    icon: Stethoscope,
    category: "Organs & Oncology",
    procedures: [
      "Kidney Stone Surgery",
      "TURP",
      "Laser Prostate Surgery",
      "Kidney Surgery",
      "Bladder Surgery",
      "Ureteric Reconstruction",
    ],
  },
  {
    id: "nephrology-renal-transplant",
    number: 8,
    name: "Nephrology & Renal Transplant",
    icon: Activity,
    category: "Organs & Oncology",
    procedures: ["Kidney Transplant", "Dialysis Access Surgery"],
  },
  {
    id: "gastroenterology-gi-surgery",
    number: 9,
    name: "Gastroenterology & GI Surgery",
    icon: Activity,
    category: "General",
    procedures: [
      "Bariatric Surgery",
      "Liver Surgery",
      "Pancreatic Surgery",
      "Colorectal Surgery",
      "Laparoscopic GI Surgery",
    ],
  },
  {
    id: "oncology",
    number: 10,
    name: "Surgical Oncology",
    icon: ShieldAlert,
    category: "Organs & Oncology",
    procedures: [
      "Breast Cancer Surgery",
      "Head & Neck Cancer Surgery",
      "GI Cancer Surgery",
      "Gynecological Cancer Surgery",
      "Urological Cancer Surgery",
      "Thoracic Oncology Surgery",
    ],
  },
  {
    id: "gynecology",
    number: 11,
    name: "Gynecology",
    icon: Users,
    category: "Women & Children",
    procedures: [
      "Hysterectomy",
      "Fibroid Surgery",
      "Ovarian Cyst Surgery",
      "Endometriosis Surgery",
      "Urogynecology Procedures",
    ],
  },
  {
    id: "obstetrics",
    number: 12,
    name: "Obstetrics",
    icon: Baby,
    category: "Women & Children",
    procedures: ["High-Risk Pregnancy Procedures", "Caesarean Section"],
  },
  {
    id: "ivf-fertility",
    number: 13,
    name: "IVF & Fertility",
    icon: Sparkles,
    category: "Women & Children",
    procedures: [
      "IVF Procedures",
      "ICSI",
      "Fertility Preservation",
      "Male Infertility Procedures",
    ],
  },
  {
    id: "ent",
    number: 14,
    name: "ENT",
    icon: Stethoscope,
    category: "Specialized",
    procedures: [
      "Cochlear Implant",
      "Tonsil Surgery",
      "Sinus Surgery",
      "Septoplasty",
      "Thyroid & Neck Procedures",
    ],
  },
  {
    id: "ophthalmology",
    number: 15,
    name: "Ophthalmology",
    icon: Eye,
    category: "Specialized",
    procedures: [
      "Cataract Surgery",
      "LASIK",
      "Retina Surgery",
      "Cornea Transplant",
      "Glaucoma Surgery",
    ],
  },
  {
    id: "plastic-cosmetic-reconstructive",
    number: 16,
    name: "Plastic, Cosmetic & Reconstructive Surgery",
    icon: Sparkles,
    category: "Specialized",
    procedures: [
      "Reconstructive Surgery",
      "Burns Management",
      "Hand Surgery",
      "Cosmetic Procedures",
      "Maxillofacial Reconstruction",
    ],
  },
  {
    id: "vascular-surgery",
    number: 17,
    name: "Vascular Surgery",
    icon: Activity,
    category: "Neuro & Heart",
    procedures: [
      "Varicose Vein Surgery",
      "AV Fistula Creation",
      "Peripheral Vascular Procedures",
      "Endovascular Aneurysm Repair",
    ],
  },
  {
    id: "thoracic-surgery",
    number: 18,
    name: "Thoracic Surgery",
    icon: Activity,
    category: "Organs & Oncology",
    procedures: [
      "Lung Surgery",
      "VATS Procedures",
      "Mediastinal Tumor Surgery",
    ],
  },
  {
    id: "pediatric-surgery",
    number: 19,
    name: "Pediatric Surgery",
    icon: Baby,
    category: "Women & Children",
    procedures: [
      "Congenital Anomaly Surgery",
      "Pediatric Urology",
      "Pediatric General Surgery",
    ],
  },
  {
    id: "dental-maxillofacial-surgery",
    number: 20,
    name: "Dental & Maxillofacial Surgery",
    icon: Smile,
    category: "Specialized",
    procedures: [
      "Dental Implants",
      "Jaw Surgery",
      "Oral Cancer Surgery",
      "Facial Trauma Reconstruction",
    ],
  },
  {
    id: "transplant-surgery",
    number: 21,
    name: "Transplant Surgery",
    icon: Award,
    category: "Organs & Oncology",
    procedures: [
      "Kidney Transplant",
      "Liver Transplant",
      "Bone Marrow Transplant",
    ],
  },
];

/* =========================================================
   DATA
========================================================= */

const patientSteps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload your medical reports",
    description:
      "Securely upload reports, scans, prescriptions, biopsy results, discharge summaries and other documents relevant to your surgical decision.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Your case is structured",
    description:
      "Qikplus helps organize the information in your medical records into a structured case that is easier to review and understand.",
  },
  {
    number: "03",
    icon: Stethoscope,
    title: "A specialist reviews your case",
    description:
      "Your case can be reviewed by a relevant surgical specialist so the clinical context is considered alongside your reports.",
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Receive your Caselet",
    description:
      "Receive a structured summary designed to help you understand your case, prepare questions and discuss options with your treating team.",
  },
  {
    number: "05",
    icon: UserCheck,
    title: "Make a more informed decision",
    description:
      "Use your Caselet and specialist consultation to have a more focused conversation about surgery, alternatives and next steps.",
  },
];

const faqs = [
  {
    question: "What is a surgical second opinion?",
    answer:
      "A surgical second opinion is an additional clinical review of your diagnosis, reports and proposed treatment plan by another qualified specialist. It can help you better understand your condition, the recommended procedure and possible alternatives before making a major healthcare decision.",
  },
  {
    question: "Why should I get a second opinion before surgery?",
    answer:
      "Surgery can be a significant medical decision. A second opinion may help you understand whether the proposed procedure is appropriate for your situation, what questions you should ask and whether there are other treatment approaches worth discussing with your treating doctor.",
  },
  {
    question: "What documents can I upload?",
    answer:
      "Depending on your case, you may be able to provide diagnostic reports, blood tests, imaging reports, scans, biopsy reports, prescriptions, discharge summaries and other relevant medical documents.",
  },
  {
    question: "Does Qikplus replace my treating doctor?",
    answer:
      "No. Qikplus is designed to support informed healthcare conversations and second-opinion reviews. It does not replace your treating physician, emergency medical care or an in-person clinical examination.",
  },
  {
    question: "Can Qikplus help with different types of surgery?",
    answer:
      "Qikplus is designed around a broad range of surgical and procedure-related specialties, including general surgery, orthopaedics, spine surgery, neurosurgery, cardiac care, urology, oncology, gynecology, ENT, ophthalmology and other specialties.",
  },
  {
    question: "What is a Caselet?",
    answer:
      "A Caselet is a structured representation of your medical case designed to make important information easier to review and discuss. It can help you and your family understand the case and prepare for conversations with healthcare professionals.",
  },
];

/* =========================================================
   SMALL REUSABLE COMPONENTS
========================================================= */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 inline-flex items-center rounded-full border border-[#5645D4]/15 bg-[#5645D4]/6 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#5645D4]">
      {children}
    </span>
  );
}

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5645D4] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5645D4]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4938C2] hover:shadow-xl hover:shadow-[#5645D4]/20"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-[#5645D4]/30 hover:bg-[#F8F7FE] hover:text-[#5645D4]"
    >
      {children}
    </Link>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    const query = searchQuery.trim().toLowerCase();

    return surgicalSpecialties.filter((specialty) => {
      const matchesCategory =
        selectedCategory === "All" || specialty.category === selectedCategory;

      const matchesSearch =
        !query ||
        specialty.name.toLowerCase().includes(query) ||
        specialty.procedures.some((procedure) =>
          procedure.toLowerCase().includes(query),
        );

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-white text-[#172033] selection:bg-[#5645D4]/20 selection:text-[#4938C2]">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#FAFAFE] pt-28 pb-16 sm:pt-32 sm:pb-24">
        <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[#5645D4]/8 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 h-96 w-96 rounded-full bg-[#8B7FE8]/8 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <SectionLabel>Surgical second opinions, made clearer</SectionLabel>

            <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-[1.18] tracking-[-0.035em] text-[#10182B] sm:text-5xl lg:mx-0 lg:text-[56px]">
              Get a{" "}
              <span className="text-[#5645D4]">surgical second opinion</span>{" "}
              before making a major decision.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg lg:mx-0">
              Upload your medical reports and get your case organized for
              specialist review. Qikplus helps patients understand complex
              medical information, prepare better questions and make more
              informed decisions about surgery.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <PrimaryButton href="/auth/patient/login?role=patient">
                Start My Second Opinion
              </PrimaryButton>

              <SecondaryButton href="/how-it-works">
                <BookOpen className="h-4 w-4" />
                See How It Works
              </SecondaryButton>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="border-r border-slate-200 ">
                  <div className="text-2xl font-extrabold tracking-tight text-[#5645D4]">
                    20+
                  </div>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                    Surgical Specialties
                  </p>
                </div>

                <div className="border-r border-slate-200">
                  <div className="text-2xl font-extrabold tracking-tight text-[#5645D4]">
                    100+
                  </div>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                    Surgical Procedures
                  </p>
                </div>

                <div>
                  <div className="text-2xl font-extrabold tracking-tight text-[#5645D4]">
                    1000s
                  </div>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                    Patients Seeking Care
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#5645D4]/6 blur-2xl" />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10">
              <img
                src="/lendingpage/hero_img.png"
                alt="Specialist reviewing medical reports for a surgical second opinion"
                className="h-auto w-full rounded-[1.35rem] object-cover"
                loading="eager"
              />

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:left-auto sm:max-w-[290px]">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5645D4] text-white">
                    <Stethoscope className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#172033]">
                      Your case, made easier to review
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Structured medical information for a more focused
                      specialist conversation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST / VALUE STRIP
      ====================================================== */}

      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-slate-100 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6">
          <div className="flex items-center gap-4 px-5 py-6 sm:px-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5645D4]/8 text-[#5645D4]">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#172033]">Specialist-led</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Clinical context remains central to the review.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-5 py-6 sm:px-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5645D4]/8 text-[#5645D4]">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#172033]">
                Privacy-conscious
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Built for sensitive healthcare information.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-5 py-6 sm:px-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5645D4]/8 text-[#5645D4]">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#172033]">
                Structured Caselet
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Easier information for your next medical conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY SECOND OPINION
      ====================================================== */}

      <section className="bg-white px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <SectionLabel>Why a second opinion matters</SectionLabel>

              <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.025em] text-[#10182B] sm:text-4xl">
                Before surgery, clarity is part of good decision-making.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                A surgical recommendation can involve complex reports, imaging,
                multiple treatment options and difficult questions. A second
                opinion gives you an opportunity to have another qualified
                specialist look at the clinical information before you proceed.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Qikplus brings structure to that process so that your medical
                information is easier to review and your consultation can be
                more focused.
              </p>

              <div className="mt-7">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-[#5645D4]"
                >
                  Why patients choose Qikplus
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: FileQuestion,
                  title: "Understand your reports",
                  text: "Turn scattered medical information into a structured case that is easier to discuss.",
                },
                {
                  icon: Users,
                  title: "Get another clinical perspective",
                  text: "Seek an additional specialist perspective when you are considering a surgical procedure.",
                },
                {
                  icon: BookOpen,
                  title: "Prepare better questions",
                  text: "Know what to ask about the proposed procedure, alternatives, risks and recovery.",
                },
                {
                  icon: CheckCircle2,
                  title: "Make an informed decision",
                  text: "Use clearer information to have a more meaningful discussion with your healthcare team.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-[#FCFCFE] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#5645D4]/20 hover:shadow-lg hover:shadow-slate-900/5"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#5645D4]/8 text-[#5645D4]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="text-base font-extrabold text-[#172033]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section
        id="how-it-works"
        className="bg-[#F8F7FC] px-4 py-20 sm:px-6 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>How Qikplus works</SectionLabel>

            <h2 className="text-3xl font-extrabold tracking-[-0.025em] text-[#10182B] sm:text-4xl">
              A simpler way to prepare for a surgical decision
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              From your first report upload to a structured case and specialist
              discussion, Qikplus is designed to make the second opinion process
              easier to navigate.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {patientSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5645D4] text-xs font-extrabold text-white">
                      {step.number}
                    </span>

                    <Icon className="h-5 w-5 text-[#5645D4]" />
                  </div>

                  <h3 className="text-sm font-extrabold leading-5 text-[#172033]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-slate-500">
                    {step.description}
                  </p>

                  {index < patientSteps.length - 1 && (
                    <div className="absolute -right-3 top-10 z-10 hidden lg:block">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-[#5645D4] shadow-sm">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#5645D4]"
            >
              Explore the complete patient journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          CASELET
      ====================================================== */}

      <section className="bg-white px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#5645D4]/5 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F8F7FC] p-5 shadow-xl shadow-slate-900/5 sm:p-7">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5645D4]">
                        Qikplus Caselet
                      </p>
                      <h3 className="mt-1 text-lg font-extrabold text-[#172033]">
                        Surgical Case Summary
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5645D4]/8 text-[#5645D4]">
                      <FileCheck2 className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      "Patient information",
                      "Relevant medical history",
                      "Key diagnostic findings",
                      "Current treatment / recommendation",
                      "Questions for specialist discussion",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl bg-[#F8F7FC] px-3.5 py-3"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#5645D4]" />
                        <span className="text-xs font-semibold text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl bg-[#5645D4] p-4 text-white">
                    <p className="text-xs font-bold">
                      Designed for a clearer medical conversation
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-white/75">
                      Use your structured case information when discussing your
                      treatment plan with qualified healthcare professionals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <SectionLabel>What you receive</SectionLabel>

              <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.025em] text-[#10182B] sm:text-4xl">
                Your medical information, organized into a useful Caselet.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Medical records can be difficult to interpret when they are
                spread across multiple reports, scans and documents. Qikplus
                helps organize the information into a structured case that can
                support your next specialist conversation.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "A structured overview of the information you provide",
                  "Important findings organized for easier review",
                  "Plain-language context to help you understand the case",
                  "Questions to discuss with your treating doctor or specialist",
                  "A format that can help your family follow the situation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5645D4]/10 text-[#5645D4]">
                      <Check className="h-3 w-3" />
                    </div>

                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <SecondaryButton href="/what-you-receive">
                  See What You Receive
                  <ArrowRight className="h-4 w-4" />
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SPECIALTIES
      ====================================================== */}

      <section
        id="surgical-specialties"
        className="bg-[#F8F7FC] px-4 py-20 sm:px-6 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Surgical specialties</SectionLabel>

              <h2 className="text-3xl font-extrabold tracking-[-0.025em] text-[#10182B] sm:text-4xl">
                Explore surgical specialties and procedures
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Explore the surgical specialties supported by the Qikplus
                platform, from general surgery and orthopaedics to spine,
                neurosurgery, cardiac care, urology, oncology, gynecology and
                more.
              </p>
            </div>

            <Link
              href="/surgical-specialties"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#5645D4]"
            >
              View all specialties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* FILTERS */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-1.5">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      selectedCategory === category
                        ? "bg-[#5645D4] text-white shadow-sm"
                        : "text-slate-500 hover:bg-[#F8F7FC] hover:text-[#5645D4]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search specialty or procedure..."
                  aria-label="Search surgical specialties"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-[#FAFAFE] pl-9 pr-4 text-xs font-medium text-slate-700 outline-none transition focus:border-[#5645D4]/40 focus:ring-2 focus:ring-[#5645D4]/10"
                />
              </div>
            </div>
          </div>

          {/* SPECIALTY CARDS */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSpecialties.slice(0, 9).map((specialty) => {
              const Icon = specialty.icon;

              return (
                <article
                  key={specialty.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#5645D4]/20 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5645D4]/8 text-[#5645D4] transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="rounded-full bg-[#F3F1FC] px-2.5 py-1 text-[10px] font-bold text-[#5645D4]">
                      {specialty.category}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-extrabold text-[#172033]">
                    {specialty.name}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Specialist review and second-opinion support for relevant
                    conditions and procedures.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {specialty.procedures.slice(0, 4).map((procedure) => (
                      <span
                        key={procedure}
                        className="rounded-lg border border-slate-100 bg-[#F8F7FC] px-2 py-1 text-[10px] font-semibold text-slate-500"
                      >
                        {procedure}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/surgical-specialties#${specialty.id}`}
                    className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#5645D4]"
                  >
                    Explore specialty
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              );
            })}
          </div>

          {filteredSpecialties.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <Search className="mx-auto h-8 w-8 text-slate-300" />

              <h3 className="mt-4 text-sm font-bold text-[#172033]">
                No specialties found
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Try another specialty or procedure name.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-xs font-bold text-[#5645D4]"
              >
                Clear filters
              </button>
            </div>
          )}

          {filteredSpecialties.length > 9 && (
            <div className="mt-8 text-center">
              <Link
                href="/surgical-specialties"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 transition hover:border-[#5645D4]/30 hover:text-[#5645D4]"
              >
                Explore all {filteredSpecialties.length} matching specialties
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          WHY QIKPLUS
      ====================================================== */}

      <section
        id="why-qikplus"
        className="bg-white px-4 py-20 sm:px-6 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Why Qikplus</SectionLabel>

            <h2 className="text-3xl font-extrabold tracking-[-0.025em] text-[#10182B] sm:text-4xl">
              Built around better-informed surgical conversations
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Qikplus combines structured medical information, technology and
              specialist review to create a more organized path to a surgical
              second opinion.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Specialist-led",
                text: "Technology can organize information, but clinical judgment remains with qualified healthcare professionals.",
              },
              {
                icon: Sparkles,
                title: "AI-assisted",
                text: "AI can help structure complex medical information without being positioned as a replacement for a doctor.",
              },
              {
                icon: FileCheck2,
                title: "Structured",
                text: "A clear case format can make it easier to review reports and prepare for a specialist conversation.",
              },
              {
                icon: LockKeyhole,
                title: "Confidential",
                text: "The platform is designed around the sensitivity of personal healthcare information.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5645D4]/8 text-[#5645D4]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-base font-extrabold text-[#172033]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PATIENT / DOCTOR / HOSPITAL
      ====================================================== */}

      <section className="bg-[#0A1530] px-4 py-20 text-white sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white/80">
                One healthcare ecosystem
              </span>

              <h2 className="mt-5 text-3xl text-white font-extrabold leading-tight tracking-[-0.025em] sm:text-4xl">
                Connecting patients, specialists and hospitals around better
                informed care.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                Qikplus is designed to support the different participants in the
                surgical care journey while keeping the patient at the center of
                the experience.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Users,
                  title: "Patients",
                  text: "Understand your case and prepare for your next medical conversation.",
                  href: "/auth/patient/login",
                },
                {
                  icon: Stethoscope,
                  title: "Doctors",
                  text: "Review structured cases and focus consultation time on clinical discussion.",
                  href: "/auth/v2/login",
                },
                {
                  icon: Building2,
                  title: "Hospitals",
                  text: "Explore a structured model for connecting with patients seeking specialist care.",
                  href: "/auth/v2/login",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:bg-white/[0.09]"
                  >
                    <Icon className="h-5 w-5 text-[#A49BEF]" />

                    <h3 className="mt-5 text-sm font-extrabold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-white/55">
                      {item.text}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#BDB6F4]">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ====================================================== */}

      <section className="bg-[#F8F7FC] px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionLabel>Patient benefits</SectionLabel>

              <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.025em] text-[#10182B] sm:text-4xl">
                Spend less time trying to understand your records and more time
                asking the right questions.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                The goal is not to replace the healthcare system. The goal is to
                help you enter important medical conversations better prepared.
              </p>

              <div className="mt-8">
                <PrimaryButton href="/auth/patient/login?role=patient">
                  Start My Case
                </PrimaryButton>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: BookOpen,
                  title: "Understand the bigger picture",
                  text: "Bring together the information that matters to your surgical decision.",
                },
                {
                  icon: Clock3,
                  title: "Prepare before consultation",
                  text: "Have your key information organized before speaking with a specialist.",
                },
                {
                  icon: Users,
                  title: "Involve your family",
                  text: "Use clearer information to help family members understand the situation.",
                },
                {
                  icon: ShieldCheck,
                  title: "Make decisions thoughtfully",
                  text: "Use a second opinion as an additional input alongside your treating doctor's advice.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5645D4]/8 text-[#5645D4]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-4 text-sm font-extrabold text-[#172033]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="bg-white px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Frequently asked questions</SectionLabel>

            <h2 className="text-3xl font-extrabold tracking-[-0.025em] text-[#10182B] sm:text-4xl">
              Questions about surgical second opinions
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Learn more about second opinions, Caselets, specialist review and
              how the Qikplus platform works.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-sm font-bold leading-6 text-[#172033]">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#5645D4] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6">
                      <p className="text-sm leading-7 text-slate-500">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#5645D4]"
            >
              View all frequently asked questions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          MEDICAL DISCLAIMER
      ====================================================== */}

      <section className="border-t border-slate-100 bg-[#FAFAFE] px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-5xl gap-4 rounded-2xl border border-[#5645D4]/10 bg-white p-5 sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5645D4]/8 text-[#5645D4]">
            <AlertCircle className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-[#172033]">
              Important medical information
            </h2>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Qikplus is designed to support healthcare information, specialist
              second opinions and informed conversations. It does not replace
              your treating physician, an in-person medical examination or
              emergency medical care. If you are experiencing a medical
              emergency, seek immediate medical attention through your local
              emergency services or healthcare facility.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-white px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#5645D4] px-6 py-14 text-center shadow-2xl shadow-[#5645D4]/20 sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/90">
                <Sparkles className="h-3.5 w-3.5" />
                Start with clarity
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-0.025em] text-white sm:text-5xl">
                Have a surgical decision ahead?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                Organize your medical information, seek an additional specialist
                perspective and prepare for a more informed conversation about
                your care.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/auth/patient/login?role=patient"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#5645D4] transition hover:-translate-y-0.5 hover:bg-white/95"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Talk to Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SEO SUPPORTING CONTENT
      ====================================================== */}

      <section className="border-t border-slate-100 bg-[#FAFAFE] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-extrabold text-[#172033]">
            Surgical second opinion platform for patients
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              Choosing whether to undergo surgery can be one of the most
              important healthcare decisions a patient makes. Medical reports,
              diagnostic imaging and treatment recommendations can be difficult
              to understand, especially when several procedures or treatment
              options are being considered.
            </p>

            <p>
              Qikplus is designed to make the surgical second-opinion process
              more organized. Patients can provide relevant medical information,
              have their case structured for review and use the resulting
              Caselet to prepare for discussions with qualified healthcare
              professionals.
            </p>

            <p>
              The platform supports a broad range of surgical specialties,
              including general surgery, orthopaedics, spine surgery,
              neurosurgery, cardiac surgery, urology, gastroenterology,
              oncology, gynecology, ENT, ophthalmology, vascular surgery,
              thoracic surgery, pediatric surgery and transplant-related care.
            </p>

            <p>
              Whether you are considering a major operation, looking for another
              perspective on a diagnosis or simply want to better understand
              your treatment plan, a structured second opinion can help you
              prepare more effectively for your next conversation with your
              medical team.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

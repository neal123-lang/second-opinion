"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { type Variants, motion } from "motion/react";

import { showPatientError } from "@/lib/patient-alert";
import { doctorService } from "@/lib/services/doctor-service";
import { patientOrderService } from "@/lib/services/patient-order-service";
import { getApiErrorMessage } from "@/lib/utils";

interface Doctor {
  doctor_id: string;
  full_name: string;
  specialities: string[];
  qualification: string;
  experience_years: number;
  consultation_fee: number;
  profile_photo: string | null;
}

const SPECIALTY_ICON_MAP: Record<string, string> = {
  cardiology: "/heart.png",
  cardiac: "/heart.png",
  heart: "/heart.png",
  dermatology: "/dermatology.png",
  skin: "/dermatology.png",
  nephrology: "/nephrology.png",
  kidney: "/nephrology.png",
  renal: "/nephrology.png",
  oncology: "/oncology.png",
  cancer: "/oncology.png",
  pulmonology: "/pulmonology.png",
  lung: "/pulmonology.png",
  respiratory: "/pulmonology.png",
  arthritis: "/arthritis.png",
  rheumatology: "/arthritis.png",
  orthopedics: "/arthritis.png",
  ortho: "/arthritis.png",
  mind: "/mind.png",
  psychiatry: "/mind.png",
  mental: "/mind.png",
  neurology: "/mind.png",
  neuro: "/mind.png",
  head: "/head.png",
  ent: "/head.png",
  disease: "/disease.png",
  infection: "/disease.png",
  general: "/medical.png",
  medical: "/medical.png",
};

function getSpecialtyIcon(specialty: string): string {
  if (!specialty) return "/medical.png";
  const lower = specialty.toLowerCase().trim();
  for (const [key, iconPath] of Object.entries(SPECIALTY_ICON_MAP)) {
    if (lower.includes(key)) {
      return iconPath;
    }
  }
  return "/medical.png";
}

function formatImageSrc(src: string | null | undefined): string | null {
  if (!src || typeof src !== "string") return null;
  const trimmed = src.trim();
  if (!trimmed || trimmed === "null" || trimmed === "undefined") return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed;
  }
  return `/${trimmed}`;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ConsultantsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctors, setSelectedDoctors] = useState<Set<string>>(new Set());
  const [openSpecialties, setOpenSpecialties] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await doctorService.getDoctors({
        page: 1,
        limit: 20,
        sort_by: "created_at",
        sort_order: "desc",
      });
      if (res && res.data) {
        setDoctors(res.data);
        if (res.data.length > 0) {
          const allSpecs = new Set<string>();
          res.data.forEach((d: Doctor) => {
            (d.specialities || ["General"]).forEach((s: string) => allSpecs.add(s));
          });
          const firstTwo = Array.from(allSpecs).slice(0, 2);
          setOpenSpecialties(new Set(firstTwo));
        }
      }
    } catch (error) {
      showPatientError("Failed to load consultants");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (doctorId: string) => {
    setSelectedDoctors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(doctorId)) {
        newSet.delete(doctorId);
      } else {
        newSet.add(doctorId);
      }
      return newSet;
    });
  };

  const toggleSpecialty = (specialty: string) => {
    setOpenSpecialties((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(specialty)) {
        newSet.delete(specialty);
      } else {
        newSet.add(specialty);
      }
      return newSet;
    });
  };

  const handleContinue = async () => {
    if (selectedDoctors.size === 0 || submitting) {
      showPatientError("Please select at least one consultant", "Selection Required");
      return;
    }
    const selectedIds = Array.from(selectedDoctors);

    try {
      setSubmitting(true);
      const res = await patientOrderService.createOrder(selectedIds);
      if (res && res.success !== false && res.order_id) {
        router.push(`/patient/second-opinion/upload?order_id=${res.order_id}`);
      } else {
        showPatientError(res?.message || "Could not create order. Please try again.", "Order Error");
      }
    } catch (error: any) {
      showPatientError(
        error.message || getApiErrorMessage(error, "Failed to create order. Please try again."),
        "Order Error"
      );
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) return doctors;
    const q = searchQuery.toLowerCase().trim();
    return doctors.filter(
      (doc) =>
        doc.full_name.toLowerCase().includes(q) ||
        doc.qualification.toLowerCase().includes(q) ||
        doc.specialities?.some((s) => s.toLowerCase().includes(q))
    );
  }, [doctors, searchQuery]);

  const groupedDoctors = useMemo(() => {
    const grouped: Record<string, Doctor[]> = {};
    filteredDoctors.forEach((doc) => {
      if (doc.specialities && doc.specialities.length > 0) {
        doc.specialities.forEach((spec) => {
          if (!grouped[spec]) grouped[spec] = [];
          if (!grouped[spec].find((d) => d.doctor_id === doc.doctor_id)) {
            grouped[spec].push(doc);
          }
        });
      } else {
        if (!grouped["General"]) grouped["General"] = [];
        grouped["General"].push(doc);
      }
    });
    return grouped;
  }, [filteredDoctors]);

  const specialtyEntries = Object.entries(groupedDoctors);

  const totalEstimatedFee = useMemo(() => {
    let sum = 0;
    doctors.forEach((doc) => {
      if (selectedDoctors.has(doc.doctor_id)) {
        sum += doc.consultation_fee || 0;
      }
    });
    return sum;
  }, [doctors, selectedDoctors]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      {/* Sticky Header */}
      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="px-5 py-3.5 bg-card/95 backdrop-blur-sm text-card-foreground flex items-center justify-between sticky top-0 z-30 border-b border-border"
      >
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-10 w-10 flex items-center justify-center bg-card hover:bg-muted text-foreground border border-border rounded-sm active:scale-95 shrink-0 cursor-pointer"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-muted-foreground" strokeWidth={2} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-primary bg-primary/10 uppercase tracking-wider">
                <Sparkles className="h-3 w-3" /> Step 1 of 3
              </span>
            </div>
            <h1 className="text-base font-bold tracking-tight text-foreground mt-0.5">
              Select Specialists
            </h1>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
          <div className="w-24 bg-muted h-2 rounded-full overflow-hidden border border-border">
            <div className="w-1/3 bg-primary h-full rounded-full" />
          </div>
          <span>33%</span>
        </div>
      </motion.header>

      {/* Main Card Deck Area */}
      <main className="flex-1 p-5 pb-32 max-w-md mx-auto w-full space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3 bg-card rounded-sm border border-border p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-xs font-semibold text-foreground">Loading medical specialists...</p>
            <p className="text-[11px] text-muted-foreground">Fetching verified doctors panel...</p>
          </div>
        ) : specialtyEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6 bg-card rounded-sm border border-border p-8 space-y-3">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Search className="h-6 w-6" />
            </div>
            <p className="text-base font-bold text-card-foreground">No specialists found</p>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              {searchQuery
                ? `No consultants matched "${searchQuery}". Try searching another keyword.`
                : "We are onboarding new certified specialists regularly. Please check back shortly."}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {specialtyEntries.map(([specialty, docs]) => {
              const isOpen = openSpecialties.has(specialty) || searchQuery.length > 0;
              const iconPath = getSpecialtyIcon(specialty);

              return (
                <motion.div
                  key={specialty}
                  variants={itemVariants}
                  className="bg-card rounded-sm border border-border overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleSpecialty(specialty)}
                    className="w-full px-5 py-4 flex items-center justify-between bg-card hover:bg-muted/50 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="h-11 w-11 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                        <Image
                          src={iconPath}
                          alt={specialty}
                          width={38}
                          height={38}
                          unoptimized
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-foreground text-base tracking-tight truncate">
                            {specialty}
                          </h3>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-muted text-muted-foreground border border-border">
                            {docs.length} {docs.length === 1 ? "doctor" : "doctors"}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Certified {specialty.toLowerCase()} specialists panel
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 pl-2">
                      <div className="h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                        <ChevronDown
                          className={`h-4.5 w-4.5 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-2 space-y-3 border-t border-border/80">
                      {docs.map((doc) => {
                        const isSelected = selectedDoctors.has(doc.doctor_id);
                        const photoSrc = formatImageSrc(doc.profile_photo);

                        return (
                          <motion.div
                            key={`${specialty}-${doc.doctor_id}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            onClick={() => toggleSelection(doc.doctor_id)}
                            className={`group relative border p-4 flex gap-4 items-start cursor-pointer rounded-sm select-none ${
                              isSelected
                                ? "border-primary bg-primary/[0.04] shadow-primary/10 ring-1 ring-primary/20"
                                : "border-border bg-card hover:border-primary/60"
                            }`}
                          >
                            <div className="absolute top-4 right-4 z-10">
                              {isSelected ? (
                                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center animate-in zoom-in-50">
                                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                </div>
                              ) : (
                                <div className="h-6 w-6 rounded-full border-2 border-border bg-background group-hover:border-primary/50 transition-colors" />
                              )}
                            </div>

                            <div className="relative shrink-0">
                              {photoSrc ? (
                                <div className="h-16 w-16 overflow-hidden rounded-full border border-border">
                                  <Image
                                    src={photoSrc}
                                    alt={doc.full_name}
                                    width={56}
                                    height={56}
                                    unoptimized
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-14 w-14 overflow-hidden flex items-center justify-center p-1.5">
                                  <Image
                                    src="/media/doctor.png"
                                    alt={doc.full_name || "Doctor"}
                                    width={56}
                                    height={56}
                                    unoptimized
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              )}
                              <span
                                className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-card"
                                title="Verified Specialist"
                              >
                                <ShieldCheck className="h-3 w-3" />
                              </span>
                            </div>

                            <div className="flex-1 min-w-0 pr-7">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="font-bold text-foreground text-base tracking-tight truncate">
                                  {doc.full_name}
                                </h4>
                              </div>

                              <p className="text-xs text-muted-foreground mt-0.5 font-medium truncate">
                                {doc.qualification}
                              </p>

                              <div className="flex flex-wrap items-center gap-2 mt-3">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted border border-border text-muted-foreground text-xs font-semibold">
                                  <Award className="h-3.5 w-3.5 text-muted-foreground" />
                                  {doc.experience_years} Years Exp
                                </span>

                                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-extrabold">
                                  ₹{doc.consultation_fee}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>

      {/* Fixed Bottom Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 w-full p-4 bg-card/95 backdrop-blur-md border-t border-border shadow-[0_-8px_24px_rgba(0,0,0,0.08)] z-30"
      >
        <div className="max-w-md mx-auto space-y-2.5">
          {selectedDoctors.size > 0 && (
            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <UserCheck className="h-4 w-4 text-primary" />
                <span>
                  Selected: <strong className="text-primary">{selectedDoctors.size}</strong>{" "}
                  {selectedDoctors.size === 1 ? "specialist" : "specialists"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground">Total Fee: </span>
                <strong className="text-sm font-extrabold text-foreground">₹{totalEstimatedFee}</strong>
              </div>
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={selectedDoctors.size > 0 && !loading && !submitting ? { scale: 1.01 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            type="button"
            onClick={handleContinue}
            disabled={selectedDoctors.size === 0 || loading || submitting}
            className="w-full h-12 rounded-md text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/25 flex items-center justify-center gap-2.5 transition-all disabled:bg-primary/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
          >
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : selectedDoctors.size > 0 ? (
              <>
                Continue with {selectedDoctors.size} {selectedDoctors.size === 1 ? "Specialist" : "Specialists"}
                <ArrowRight className="h-5 w-5" />
              </>
            ) : (
              "Select At Least 1 Consultant to Continue"
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

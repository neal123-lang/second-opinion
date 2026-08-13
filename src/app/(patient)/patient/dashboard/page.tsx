"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, ShieldCheck, Sparkles, Calendar, History, Loader2 } from "lucide-react";
import { type Variants, motion } from "motion/react";

import { useAuthStore } from "@/stores/auth/use-auth-store";
import { caseletService } from "@/lib/services/caselet-service";
import { showPatientError } from "@/lib/patient-alert";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function PatientDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [creatingCaselet, setCreatingCaselet] = useState(false);

  const firstName = user?.full_name?.split(" ")[0] || "there";

  const handleLogout = () => {
    logout();
    router.push("/auth/patient/login");
  };

  const handleCreateCaselet = async () => {
    try {
      setCreatingCaselet(true);
      const res = await caseletService.createCaselet();
      if (res && res.success !== false && res.caselet_id) {
        router.push(`/patient/caselet/document_upload?caselet_id=${res.caselet_id}`);
      } else {
        showPatientError(res?.message || "Failed to create caselet. Please try again.", "Caselet Error");
      }
    } catch (error: any) {
      showPatientError(error.message || "Failed to initiate caselet generation.", "Caselet Error");
    } finally {
      setCreatingCaselet(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Bar */}
      <header className="px-6 pt-10 pb-7 bg-card border-b border-border sticky top-0 z-20 shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-primary bg-primary/10">
                <Sparkles className="h-3 w-3" /> Patient Portal
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome, {firstName}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Manage your consultations &amp; medical records</p>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={handleLogout}
            title="Logout"
            className="h-10 w-10 rounded-md flex items-center justify-center bg-card hover:bg-muted text-foreground border border-border shrink-0 cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5 text-muted-foreground" strokeWidth={1.75} />
          </motion.button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 space-y-6 max-w-md mx-auto w-full">
        {/* Section Heading */}
        <div>
          <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-3">Available Services</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {/* Second Opinion Service Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => router.push("/patient/second-opinion/consultants")}
              className="bg-card rounded-xl border border-border p-4 hover:border-primary/60 hover:shadow-md cursor-pointer group flex items-center justify-between gap-4 select-none"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="h-12 w-12 shrink-0 overflow-hidden flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/media/doctor.png"
                    alt="Second Opinion"
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-card-foreground group-hover:text-primary transition-colors duration-200 truncate">
                      Second Opinion
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border shrink-0">
                      Popular
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Select top specialists to review your diagnosis &amp; treatment.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Caselet Generation Card */}
            <motion.div
              variants={cardVariants}
              whileHover={!creatingCaselet ? { scale: 1.015, y: -2 } : undefined}
              whileTap={!creatingCaselet ? { scale: 0.98 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <button
                type="button"
                onClick={handleCreateCaselet}
                disabled={creatingCaselet}
                className="w-full text-left bg-card rounded-xl border border-border p-4 hover:border-primary/60 hover:shadow-md cursor-pointer group flex items-center justify-between gap-4 disabled:opacity-75 disabled:cursor-not-allowed select-none"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="h-12 w-12 shrink-0 overflow-hidden flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
                    {creatingCaselet ? (
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    ) : (
                      <Image
                        src="/media/case.png"
                        alt="Caselet Generation"
                        width={48}
                        height={48}
                        unoptimized
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-card-foreground group-hover:text-primary transition-colors duration-200 truncate">
                        Caselet Generation
                      </h3>
                      {creatingCaselet && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary shrink-0">
                          Creating...
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Generate a structured health timeline summary for doctors.
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Caselet Download & Status Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => router.push("/patient/caselet/status")}
              className="bg-card rounded-xl border border-border p-4 hover:border-primary/60 hover:shadow-md cursor-pointer group flex items-center justify-between gap-4 select-none"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="h-12 w-12 shrink-0 overflow-hidden flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/media/google-docs.png"
                    alt="Caselet Status & History"
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-card-foreground group-hover:text-primary transition-colors duration-200 truncate">
                      Caselet Status &amp; Download
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary shrink-0">
                      History
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Check status and download your generated caselets.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Approved Slots Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => router.push("/patient/bookings")}
              className="bg-card rounded-xl border border-border p-4 hover:border-primary/60 hover:shadow-md cursor-pointer group flex items-center justify-between gap-4 select-none"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="h-12 w-12 shrink-0 overflow-hidden flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/media/appointment.png"
                    alt="Approved Slots"
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base text-card-foreground group-hover:text-primary transition-colors duration-200 truncate">
                    Approve Slots
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    View and manage your consultation time slots.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Booking History Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => router.push("/patient/booking-history")}
              className="bg-card rounded-xl border border-border p-4 hover:border-primary/60 hover:shadow-md cursor-pointer group flex items-center justify-between gap-4 select-none"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="h-12 w-12 shrink-0 overflow-hidden flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/media/icons8-history-96.png"
                    alt="Booking History"
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base text-card-foreground group-hover:text-primary transition-colors duration-200 truncate">
                    Booking History
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    View your confirmed bookings &amp; selected time slots.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}



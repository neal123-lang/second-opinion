"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Home,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { type Variants, motion } from "motion/react";

import { showPatientError } from "@/lib/patient-alert";
import { type CaseletHistoryItem, caseletService } from "@/lib/services/caselet-service";
import { toast } from "sonner";

function formatDate(dateString?: string | null): string {
  if (!dateString) return "N/A";
  try {
    let str = dateString.trim();
    if (!str) return "N/A";
    // Append 'Z' if missing timezone offset so JS parses UTC correctly
    if (!str.endsWith("Z") && !/[+-]\d{2}(:\d{2})?$/.test(str)) {
      str += "Z";
    }
    const date = new Date(str);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return dateString;
  }
}

function getStatusBadge(status?: string | null) {
  const normalized = (status || "PENDING").toUpperCase();
  switch (normalized) {
    case "COMPLETED":
    case "SUCCESS":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20">
          <CheckCircle2 className="h-3 w-3" /> Completed
        </span>
      );
    case "PROCESSING":
    case "PENDING":
    case "IN_PROGRESS":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold text-amber-700 bg-amber-500/10 border border-amber-500/20">
          <Clock className="h-3 w-3 animate-spin text-amber-600" /> Processing
        </span>
      );
    case "FAILED":
    case "ERROR":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold text-[#ff385c] bg-[#ff385c]/10 border border-[#ff385c]/20">
          <AlertCircle className="h-3 w-3" /> Failed
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold text-[#6a6a6a] bg-[#f7f7f7] border border-[#ebebeb]">
          {normalized}
        </span>
      );
  }
}

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
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function CaseletStatusPage() {
  const router = useRouter();
  const [historyItems, setHistoryItems] = useState<CaseletHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [checkingStatusId, setCheckingStatusId] = useState<string | null>(null);

  const fetchHistory = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setErrorMsg(null);

      const res = await caseletService.getCaseletHistory();
      if (res && res.success !== false && Array.isArray(res.caselet_history)) {
        setHistoryItems(res.caselet_history);
      } else {
        const msg = res?.message || "Failed to fetch caselet history.";
        setErrorMsg(msg);
        showPatientError(msg, "History Fetch Error");
      }
    } catch (err: any) {
      const msg = err.message || "An unexpected error occurred while fetching caselet status.";
      setErrorMsg(msg);
      showPatientError(msg, "History Fetch Error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleCheckStatus = async (caseletId: string) => {
    if (!caseletId) return;
    try {
      setCheckingStatusId(caseletId);
      const res = await caseletService.getFlexreportStatus(caseletId);
      if (res && res.success !== false) {
        const rawStatus =
          res.flexreport?.status ||
          res.status ||
          res.flexreport_status ||
          res.data?.status ||
          res.data?.flexreport_status ||
          res.data?.flexreport?.status ||
          "PROCESSING";
        const newStatus = String(rawStatus).toUpperCase();

        setHistoryItems((prev) =>
          prev.map((item) => {
            if (item.id === caseletId || item.caselet_number === caseletId) {
              return {
                ...item,
                status: newStatus,
                flexreport_status: newStatus,
                flexreport_completed_at:
                  newStatus === "COMPLETED" || newStatus === "SUCCESS"
                    ? new Date().toISOString()
                    : item.flexreport_completed_at,
              };
            }
            return item;
          })
        );

        if (newStatus === "COMPLETED" || newStatus === "SUCCESS") {
          toast.success("Caselet generation complete! You can now view and download reports.");
        } else {
          toast.info(`Status: ${newStatus}`);
        }
      } else {
        showPatientError(res.message || "Failed to check status. Please try again.", "Status Check Error");
      }
    } catch (error: any) {
      showPatientError(error.message || "Failed to check status.", "Status Check Error");
    } finally {
      setCheckingStatusId(null);
    }
  };

  const handleViewAndDownloadReport = async (caseletId: string) => {
    if (!caseletId) return;
    try {
      setDownloadingId(caseletId);
      const res = await caseletService.downloadCaseletReport(caseletId);
      if (!res.success) {
        showPatientError(res.message || "Failed to download caselet report. Please try again.", "Download Error");
      }
    } catch (error: any) {
      showPatientError(error.message || "Failed to download caselet report.", "Download Error");
    } finally {
      setDownloadingId(null);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Sticky Header Bar */}
      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="px-5 py-4 bg-card text-card-foreground flex items-center justify-between sticky top-0 z-20 border-b border-border"
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => router.push("/patient/dashboard")}
            className="h-9 w-9 rounded-md flex items-center justify-center bg-card hover:bg-muted text-foreground transition-colors border border-border shrink-0 cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-muted-foreground" />
          </motion.button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-wider">
                <Sparkles className="h-2.5 w-2.5" /> Patient Records
              </span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Caselet Status &amp; Downloads
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => fetchHistory(true)}
            disabled={loading || refreshing}
            className="h-9 px-3 rounded-md text-xs font-semibold bg-card hover:bg-muted text-foreground transition-colors border border-border flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            title="Refresh Status"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-muted-foreground ${refreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => router.push("/patient/dashboard")}
            className="h-9 w-9 rounded-md flex items-center justify-center bg-card hover:bg-muted text-foreground transition-colors border border-border shrink-0 cursor-pointer"
            title="Dashboard"
          >
            <Home className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Container */}
      <main className="flex-1 p-5 pb-12 max-w-md mx-auto w-full space-y-4">
        {/* Loading State */}
        {loading ? (
          <div className="bg-card rounded-md border border-border p-8 text-center space-y-3">
            <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
            <p className="text-xs font-semibold text-foreground">Fetching Caselet Status...</p>
            <p className="text-[11px] text-muted-foreground">Please wait while we retrieve your history.</p>
          </div>
        ) : errorMsg && historyItems.length === 0 ? (
          /* Error State */
          <div className="bg-card rounded-md border border-destructive/20 p-6 text-center space-y-3">
            <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground">Could Not Load Caselet History</h3>
              <p className="text-xs text-muted-foreground">{errorMsg}</p>
            </div>
            <button
              type="button"
              onClick={() => fetchHistory(false)}
              className="px-4 py-2 text-xs font-bold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : historyItems.length === 0 ? (
          /* Empty State */
          <div className="bg-card rounded-md border border-border p-8 text-center space-y-4">
            <div className="h-14 w-14 mx-auto rounded-full bg-muted border border-border flex items-center justify-center">
              <FileText className="h-7 w-7 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-foreground">No Caselets Generated Yet</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                You haven&apos;t generated any medical caselets yet. Create your first caselet from the patient dashboard.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/patient/dashboard")}
              className="px-5 py-2.5 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors shadow-sm cursor-pointer"
            >
              Generate Caselet
            </button>
          </div>
        ) : (
          /* History Card List */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {historyItems.map((item) => {
              const statusUpper = (item.status || "").toUpperCase();
              const flexStatusUpper = (item.flexreport_status || "").toUpperCase();

              const isCompleted =
                statusUpper === "COMPLETED" ||
                flexStatusUpper === "COMPLETED" ||
                statusUpper === "SUCCESS" ||
                flexStatusUpper === "SUCCESS";

              const isFailed =
                statusUpper === "FAILED" ||
                flexStatusUpper === "FAILED" ||
                statusUpper === "ERROR" ||
                flexStatusUpper === "ERROR";

              const isProcessing = !isCompleted && !isFailed;
              const displayStatus = isCompleted ? "COMPLETED" : isFailed ? "FAILED" : "PROCESSING";

              return (
                <motion.div
                  key={item.id || item.caselet_number}
                  variants={cardVariants}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-card rounded-md border border-border p-4.5 space-y-3.5 hover:border-primary/60 transition-colors"
                >
                  {/* Card Top Row */}
                  <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden flex items-center justify-center p-1 ">
                        <Image
                          src="/media/case.png"
                          alt="Caselet"
                          width={36}
                          height={36}
                          unoptimized
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className=" text-sm font-mono text-foreground">
                            {item.caselet_number || "CASE-XXXXXX"}
                          </h3>
                          {item.flexreport_visit_number != null && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                              Visit #{item.flexreport_visit_number}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Created: {formatDate(item.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">{getStatusBadge(displayStatus)}</div>
                  </div>

                  {/* Key Metadata Details */}
                  <div className="space-y-2 text-xs divide-y divide-border">
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-muted-foreground">Report Status</span>
                      <span className="font-semibold text-foreground uppercase text-[11px]">
                        {item.flexreport_status || item.status || "PROCESSING"}
                      </span>
                    </div>

                    {item.flexreport_submitted_at && (
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-muted-foreground">Submitted At</span>
                        <span className="text-muted-foreground text-[11px]">
                          {formatDate(item.flexreport_submitted_at)}
                        </span>
                      </div>
                    )}

                    {item.flexreport_completed_at && (
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-muted-foreground">Completed At</span>
                        <span className="text-muted-foreground text-[11px]">
                          {formatDate(item.flexreport_completed_at)}
                        </span>
                      </div>
                    )}

                    {item.updated_at && (
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-muted-foreground">Last Updated</span>
                        <span className="text-muted-foreground text-[11px]">{formatDate(item.updated_at)}</span>
                      </div>
                    )}
                  </div>

                  {/* Error Notification if any */}
                  {item.flexreport_error && (
                    <div className="p-2.5 rounded-md bg-destructive/10 border border-destructive/20 text-[11px] text-destructive flex items-start gap-2">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-destructive" />
                      <span>{item.flexreport_error}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-1 flex items-center gap-2">
                    {isCompleted ? (
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        type="button"
                        onClick={() => router.push(`/patient/caselet/reports?caselet_id=${item.id}`)}
                        className="w-full h-10 rounded-md text-xs font-bold flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" /> View &amp; Download Reports
                      </motion.button>
                    ) : isProcessing ? (
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => handleCheckStatus(item.id)}
                        disabled={checkingStatusId === item.id}
                        className="w-full h-10 rounded-md text-xs font-bold flex items-center justify-center gap-2 bg-card hover:bg-muted text-foreground border border-border transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {checkingStatusId === item.id ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                            Checking Status...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
                            Check Status
                          </>
                        )}
                      </motion.button>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => router.push(`/patient/caselet/reports?caselet_id=${item.id}`)}
                        className="w-full h-10 rounded-md text-xs font-bold flex items-center justify-center gap-2 bg-card hover:bg-muted text-foreground border border-border transition-all cursor-pointer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> View Caselet Reports
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>
    </div>
  );
}

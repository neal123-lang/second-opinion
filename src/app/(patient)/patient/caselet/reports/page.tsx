"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Home,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { type Variants, motion } from "motion/react";

import { showPatientError } from "@/lib/patient-alert";
import { type CaseletReportsResponse, caseletService } from "@/lib/services/caselet-service";

interface ReportDoc {
  id: string;
  title: string;
  description: string;
  tag: string;
  url: string;
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

function CaseletReportsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const caseletId = searchParams.get("caselet_id");

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [reportsData, setReportsData] = useState<CaseletReportsResponse | null>(null);
  const [documentsList, setDocumentsList] = useState<ReportDoc[]>([]);

  const fetchReports = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await caseletService.getCaseletReports(id);

      if (res && res.success !== false) {
        setReportsData(res);
        const docs: ReportDoc[] = [];

        const reportsObj = res.reports || res.data?.reports || res.data || {};

        // Direct string URL check
        if (typeof res.reports === "string" && res.reports.startsWith("http")) {
          docs.push({
            id: "patient_report_direct",
            title: "Patient Health Caselet (PDF)",
            description: "Structured health timeline and summary prepared for patients.",
            tag: "Patient Report",
            url: res.reports,
          });
        }

        const patientUrl =
          reportsObj.patient_report_url ||
          reportsObj.patient_report ||
          reportsObj.patient_pdf ||
          (typeof reportsObj === "string" ? reportsObj : null);

        if (patientUrl && typeof patientUrl === "string" && !docs.some((d) => d.url === patientUrl)) {
          docs.push({
            id: "patient_report",
            title: "Patient Health Caselet (PDF)",
            description: "Structured health timeline and summary prepared for patients.",
            tag: "Patient Report",
            url: patientUrl,
          });
        }

        const doctorUrl =
          reportsObj.doctor_report_url ||
          reportsObj.doctor_report ||
          reportsObj.doctor_pdf;

        if (doctorUrl && typeof doctorUrl === "string" && !docs.some((d) => d.url === doctorUrl)) {
          docs.push({
            id: "doctor_report",
            title: "Doctor Clinical Report (PDF)",
            description: "Detailed clinical synthesis & surgical findings for consulting specialists.",
            tag: "Clinical Summary",
            url: doctorUrl,
          });
        }

        // Generic URL fallbacks
        const genericUrl =
          res.report_url ||
          res.download_url ||
          res.pdf_url ||
          res.url ||
          res.data?.report_url ||
          res.data?.download_url ||
          res.data?.pdf_url ||
          res.data?.url;

        if (genericUrl && typeof genericUrl === "string" && !docs.some((d) => d.url === genericUrl)) {
          docs.push({
            id: "general_report",
            title: "Medical Caselet Report (PDF)",
            description: "Official generated health caselet document.",
            tag: "Caselet PDF",
            url: genericUrl,
          });
        }

        setDocumentsList(docs);
      } else {
        const msg = res?.message || "Failed to load caselet reports.";
        setErrorMsg(msg);
        showPatientError(msg, "Reports Error");
      }
    } catch (err: any) {
      const msg = err.message || "An unexpected error occurred while loading reports.";
      setErrorMsg(msg);
      showPatientError(msg, "Reports Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (caseletId) {
      fetchReports(caseletId);
    } else {
      setLoading(false);
      setErrorMsg("No Caselet ID provided in request.");
    }
  }, [caseletId, fetchReports]);

  const handleDownloadDoc = (url: string) => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
            onClick={() => router.push("/patient/caselet/status")}
            className="h-9 w-9 rounded-md flex items-center justify-center bg-card hover:bg-muted text-foreground transition-colors border border-border shrink-0 cursor-pointer"
            title="Back to Caselet Status"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-muted-foreground" />
          </motion.button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-wider">
                <Sparkles className="h-2.5 w-2.5" /> Caselet Documents
              </span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Download Reports
            </h1>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => router.push("/patient/dashboard")}
          className="h-9 w-9 rounded-md flex items-center justify-center bg-card hover:bg-muted text-foreground transition-colors border border-border shrink-0 cursor-pointer"
          title="Dashboard"
        >
          <Home className="h-4 w-4 text-muted-foreground" />
        </motion.button>
      </motion.header>

      {/* Main Container */}
      <main className="flex-1 p-5 pb-12 max-w-md mx-auto w-full space-y-4">
        {/* Caselet Reference Card */}
        {reportsData?.caselet_number && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-md border border-border p-4 flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Caselet Reference
              </span>
              <p className="text-base font-extrabold font-mono text-foreground mt-0.5">
                {reportsData.caselet_number}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20">
              <CheckCircle2 className="h-3.5 w-3.5" /> Verified
            </span>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-card rounded-md border border-border p-8 text-center space-y-3">
            <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
            <p className="text-xs font-semibold text-foreground">Fetching Available Reports...</p>
            <p className="text-[11px] text-muted-foreground">Please wait while we retrieve your report links.</p>
          </div>
        ) : errorMsg && documentsList.length === 0 ? (
          /* Error State */
          <div className="bg-card rounded-md border border-destructive/20 p-6 text-center space-y-3">
            <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground">Unable to Load Caselet Reports</h3>
              <p className="text-xs text-muted-foreground">{errorMsg}</p>
            </div>
            {caseletId && (
              <button
                type="button"
                onClick={() => fetchReports(caseletId)}
                className="px-4 py-2 text-xs font-bold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Try Again
              </button>
            )}
          </div>
        ) : documentsList.length === 0 ? (
          /* Empty State */
          <div className="bg-card rounded-md border border-border p-8 text-center space-y-4">
            <div className="h-14 w-14 mx-auto rounded-full bg-muted border border-border flex items-center justify-center">
              <FileText className="h-7 w-7 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-foreground">No Report Documents Found</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                The report compilation is still in progress or no document links were returned for this caselet.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/patient/caselet/status")}
              className="px-5 py-2.5 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors shadow-sm cursor-pointer"
            >
              Back to Status History
            </button>
          </div>
        ) : (
          /* Documents Card List */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                Available Caselet Documents ({documentsList.length})
              </h2>
            </div>

            {documentsList.map((doc) => (
              <motion.div
                key={doc.id}
                variants={cardVariants}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-card rounded-md border border-border p-4.5 space-y-3.5 hover:border-primary/60 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 shrink-0 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <Image
                      src="/media/google-docs.png"
                      alt="PDF Document"
                      width={32}
                      height={32}
                      unoptimized
                      className="h-8 w-8 object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-foreground truncate">{doc.title}</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary shrink-0">
                        {doc.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{doc.description}</p>
                  </div>
                </div>

                <div className="pt-1">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    type="button"
                    onClick={() => handleDownloadDoc(doc.url)}
                    className="w-full h-11 rounded-md text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="h-4 w-4" /> Download PDF Report
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Support Card */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>Encrypted &amp; Confidential Patient Document</span>
        </div>
      </main>
    </div>
  );
}

export default function CaseletReportsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <CaseletReportsContent />
    </Suspense>
  );
}

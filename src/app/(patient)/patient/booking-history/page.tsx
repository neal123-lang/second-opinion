"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { type Variants, motion } from "motion/react";

import { showPatientError } from "@/lib/patient-alert";
import {
  type BookingHistoryItem,
  type HistoryDoctorAssignment,
  type HistorySlotOption,
  patientBookingService,
} from "@/lib/services/patient-booking-service";
import { getApiErrorMessage } from "@/lib/utils";

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

export default function BookingHistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [history, setHistory] = useState<BookingHistoryItem[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async (isSilent = false) => {
    try {
      if (!isSilent) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const data = await patientBookingService.getBookingHistory();
      setHistory(data || []);
    } catch (error) {
      showPatientError(getApiErrorMessage(error, "Failed to load booking history."), "Error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatReceipt = (data: BookingHistoryItem) => {
    const doctorsList =
      data.doctors?.map((docAssignment) => {
        const rawName = docAssignment.doctor?.name;
        const formattedName = rawName
          ? rawName.toLowerCase().startsWith("dr.") || rawName.toLowerCase().startsWith("dr ")
            ? rawName
            : `Dr. ${rawName}`
          : "Specialist Doctor";
        return {
          name: formattedName,
          fee: docAssignment.consultation_fee ?? docAssignment.doctor?.consultation_fee ?? 0,
        };
      }) || [];

    const doctorNames = doctorsList.map((d) => d.name).join(", ") || "Specialist Doctor(s)";

    return {
      receiptNo: data.request_number,
      date: data.created_at,
      doctors: doctorsList,
      doctorNames,
      platformFee: data.platform_fee || 0,
      discount: data.discount_amount || 0,
      total: data.grand_total || 0,
    };
  };

  const handleDownloadReceipt = (req: BookingHistoryItem) => {
    const receipt = formatReceipt(req);
    const formattedDate = formatDate(receipt.date);

    const doctorsRowsHtml =
      receipt.doctors.length > 0
        ? receipt.doctors
            .map(
              (doc) => `
        <tr>
          <td>Consultation Fee (${doc.name})</td>
          <td style="text-align: right;">₹${doc.fee}</td>
        </tr>`
            )
            .join("")
        : `
        <tr>
          <td>Consultation Fee</td>
          <td style="text-align: right;">₹${req.consultation_total || 0}</td>
        </tr>`;

    const htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Receipt_${receipt.receiptNo}</title>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #222; max-width: 550px; margin: auto; background-color: #fff; }
      .header { text-align: center; border-bottom: 2px solid #5645d4; padding-bottom: 16px; margin-bottom: 24px; }
      .logo { font-size: 20px; font-weight: 800; color: #5645d4; letter-spacing: -0.5px; }
      .sub { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; font-weight: 600; }
      .details { margin-bottom: 20px; font-size: 13px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
      .details-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
      .details-label { color: #666; font-weight: 500; }
      .details-value { font-weight: 600; color: #222; text-align: right; }
      .table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; }
      .table th, .table td { padding: 10px 12px; text-align: left; font-size: 13px; }
      .table th { background: #f7f7f7; color: #444; font-weight: 700; border-bottom: 1px solid #ddd; }
      .table td { border-bottom: 1px solid #eee; }
      .total-row td { font-size: 15px; font-weight: 800; color: #5645d4; border-top: 2px solid #ebebeb; border-bottom: none; }
      .stamp-container { text-align: center; margin-top: 25px; }
      .stamp { padding: 8px 16px; border: 2px dashed #10b981; color: #10b981; font-weight: 700; border-radius: 6px; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; display: inline-block; }
      .footer { text-align: center; margin-top: 30px; font-size: 10px; color: #888; border-top: 1px solid #eee; padding-top: 12px; }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="logo">QikPlus Second Opinion</div>
      <div class="sub">Official Consultation Payment Receipt</div>
    </div>
    <div class="details">
      <div class="details-row"><span class="details-label">Receipt Number:</span> <span class="details-value">${receipt.receiptNo}</span></div>
      <div class="details-row"><span class="details-label">Payment Date:</span> <span class="details-value">${formattedDate}</span></div>
      <div class="details-row"><span class="details-label">Attending Doctor(s):</span> <span class="details-value">${receipt.doctorNames}</span></div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Description</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${doctorsRowsHtml}
        <tr>
          <td>Platform Fee</td>
          <td style="text-align: right;">₹${receipt.platformFee}</td>
        </tr>
        ${receipt.discount > 0 ? `<tr><td>Discount Applied</td><td style="text-align: right;">-₹${receipt.discount}</td></tr>` : ""}
        <tr class="total-row">
          <td>Total Paid</td>
          <td style="text-align: right;">₹${receipt.total}</td>
        </tr>
      </tbody>
    </table>
    <div class="stamp-container">
      <div class="stamp">✓ PAYMENT VERIFIED &amp; CONFIRMED</div>
    </div>
    <div class="footer">
      This is a computer-generated receipt for your consultation request ${receipt.receiptNo}.
    </div>
    <script>
      window.onload = function() { window.print(); }
    </script>
  </body>
</html>`;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    } else {
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Receipt_${receipt.receiptNo}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const formatTime = (time?: string) => {
    if (!time) return "--:--";
    try {
      const timePart = time.includes("T") ? time.split("T")[1] : time;
      const cleanTime = timePart.split(".")[0].replace("Z", "");
      const parts = cleanTime.split(":");
      if (parts.length >= 2) {
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        if (!isNaN(hours) && !isNaN(minutes)) {
          const date = new Date(2000, 0, 1, hours, minutes);
          return format(date, "h:mm a");
        }
      }
      return time;
    } catch {
      return time;
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "Date unavailable";
    try {
      let str = date.trim();
      if (!str) return "Date unavailable";
      // If YYYY-MM-DD format (appointment_date), parse directly without timezone shift
      if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
        const [y, m, d] = str.split("-").map(Number);
        return format(new Date(y, m - 1, d), "EEE, MMM d, yyyy");
      }
      // If ISO timestamp missing 'Z' or offset, append 'Z' for UTC parsing
      if (str.includes("T") && !str.endsWith("Z") && !/[+-]\d{2}(:\d{2})?$/.test(str)) {
        str += "Z";
      }
      const parsedDate = new Date(str);
      if (isNaN(parsedDate.getTime())) return date;
      return format(parsedDate, "EEE, MMM d, yyyy");
    } catch {
      return date;
    }
  };

  const formatDoctorName = (name?: string) => {
    if (!name) return "Specialist Doctor";
    if (name.toLowerCase().startsWith("dr.") || name.toLowerCase().startsWith("dr ")) {
      return name;
    }
    return `Dr. ${name}`;
  };

  const formatExperience = (years?: number) => {
    if (!years || years <= 0) return null;
    if (years > 100) return `Practicing since ${years}`;
    return `${years} ${years === 1 ? "year" : "years"} exp`;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "SELECTED":
      case "CONFIRMED":
      case "PATIENT_CONFIRMED":
        return "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20";
      case "OFFERED":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      {/* Sticky Header */}
      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="px-5 py-4 bg-card text-card-foreground flex items-center justify-between sticky top-0 z-20 border-b border-border "
      >
        <div className="flex items-center gap-3.5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => router.back()}
            className="h-10 w-10 rounded-md flex items-center justify-center bg-card hover:bg-muted text-foreground transition-colors border border-border shrink-0 cursor-pointer"
            title="Go Back"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-muted-foreground" strokeWidth={1.75} />
          </motion.button>
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-wider">
              <Sparkles className="h-2.5 w-2.5" /> History
            </span>
            <h1 className="text-base font-bold tracking-tight leading-none text-foreground mt-0.5">
              Booking History
            </h1>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => fetchHistory(true)}
          disabled={loading || refreshing}
          className="h-9 w-9 rounded-md flex items-center justify-center bg-card hover:bg-muted text-muted-foreground border border-border transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          title="Refresh History"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-primary" : ""}`} />
        </motion.button>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 p-5 pb-32 max-w-md mx-auto w-full space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3 bg-card rounded-md border border-border p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-xs font-semibold text-foreground">Loading booking history...</p>
            <p className="text-[11px] text-muted-foreground">Retrieving your confirmed appointments...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6 bg-card rounded-md border border-border p-8">
            <Calendar className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <p className="text-base font-bold text-card-foreground">No booking history</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              You have not booked any specialist consultation slots yet.
            </p>
            <button
              type="button"
              onClick={() => fetchHistory(true)}
              disabled={refreshing}
              className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {history.map((req) => (
              <motion.div
                key={req.id}
                variants={cardVariants}
                className="bg-card rounded-md border border-border p-4.5 space-y-4 "
              >
                {/* Request Header */}
                <div className="flex items-start justify-between border-b border-border pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      Request Number
                    </span>
                    <h3 className="font-bold text-sm text-card-foreground font-mono mt-0.5">{req.request_number}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Created: {formatDate(req.created_at)}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold border ${getStatusColor(req.status)}`}>
                      <CheckCircle className="h-3 w-3" />
                      {(req.status || "").replace(/_/g, " ")}
                    </span>
                    <p className="text-xs font-bold text-card-foreground mt-0.5">₹{req.grand_total}</p>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      type="button"
                      onClick={() => handleDownloadReceipt(req)}
                      className="mt-1 px-2.5 py-1 rounded-md bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-bold transition-colors flex items-center gap-1 border border-primary/20 cursor-pointer"
                      title="Download Receipt"
                    >
                      <Download className="h-3 w-3" />
                      Receipt
                    </motion.button>
                  </div>
                </div>

                {/* Doctors & Selected Slots */}
                <div className="space-y-4">
                  {req.doctors?.map((docAssignment: HistoryDoctorAssignment) => {
                    const doc = docAssignment.doctor;
                    const doctorName = formatDoctorName(doc?.name);
                    const expText = formatExperience(doc?.experience_years);

                    const selectedSlots =
                      docAssignment.slot_options?.filter(
                        (s: HistorySlotOption) =>
                          s.status === "SELECTED" || s.status === "CONFIRMED" || s.status === "PATIENT_CONFIRMED"
                      ) || [];

                    return (
                      <div key={docAssignment.id} className="space-y-3 bg-muted/50 p-3.5 rounded-lg border border-border/80">
                        {/* Doctor Info Card */}
                        {doc && (
                          <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold overflow-hidden p-1 border border-primary/20">
                              <Image
                                src={doc.profile_photo || "/media/doctor.png"}
                                alt={doctorName}
                                width={44}
                                height={44}
                                unoptimized
                                className="h-full w-full object-contain rounded-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="font-bold text-sm text-foreground truncate">{doctorName}</h4>
                                {docAssignment.consultation_fee > 0 && (
                                  <span className="text-xs font-bold text-primary">₹{docAssignment.consultation_fee}</span>
                                )}
                              </div>
                              {doc.qualification && (
                                <p className="text-xs text-muted-foreground truncate">{doc.qualification}</p>
                              )}
                              {expText && (
                                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                  <Award className="h-3 w-3 text-primary" />
                                  {expText}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Selected Slots List */}
                        <div>
                          <h5 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                            Confirmed Consultation Slot ({selectedSlots.length})
                          </h5>

                          {selectedSlots.length === 0 ? (
                            <p className="text-xs text-muted-foreground italic">No confirmed slot for this doctor.</p>
                          ) : (
                            <div className="space-y-2">
                              {selectedSlots.map((slot: HistorySlotOption, index: number) => (
                                <div
                                  key={slot.id}
                                  className="bg-card rounded-sm border border-border p-3 flex items-center justify-between gap-3 "
                                >
                                  <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <div className="h-10 w-10 flex items-center justify-center shrink-0 p-1">
                                      <Image
                                        src="/media/appointment.png"
                                        alt="Slot"
                                        width={40}
                                        height={40}
                                        unoptimized
                                        className="h-full w-full object-contain"
                                      />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2">
                                        <h5 className="font-bold text-xs text-card-foreground truncate">
                                          Slot #{slot.slot_number || index + 1}
                                        </h5>
                                        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-sm text-[9px] font-bold border ${getStatusColor(slot.status)}`}>
                                          <CheckCircle className="h-2.5 w-2.5" />
                                          {slot.status}
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-[11px] text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <Calendar className="h-3 w-3 text-primary shrink-0" />
                                          {formatDate(slot.appointment_date)}
                                        </span>
                                        <span className="flex items-center gap-1 font-medium text-foreground">
                                          <Clock className="h-3 w-3 text-primary shrink-0" />
                                          {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ClipboardList,
  DollarSign,
  ExternalLink,
  FileText,
  Hash,
  Send,
  Sparkles,
  Stethoscope,
  Tag,
  User,
} from "lucide-react";
import { showPatientError, showPatientSuccess } from "@/lib/patient-alert";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  type SecondOpinionDoctor,
  type SecondOpinionRequest,
  type SlotOption,
  secondOpinionService,
} from "@/lib/services/second-opinion-service";

interface PatientSummary {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  blood_group?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_number?: string | null;
}

type RequestWithPatient = SecondOpinionRequest & { patient?: PatientSummary | null };

const DOCTOR_SLOTS_LOCKED_STATUSES = ["TIME_SLOT_PROVIDED", "BOOKING_CONFIRMED"];

function getStatusVariant(status: string) {
  switch (status) {
    case "PAYMENT_COMPLETED":
    case "BOOKING_CONFIRMED":
    case "ACCEPTED":
    case "COMPLETED":
      return "border border-primary/30 bg-primary/10 text-primary font-semibold";
    case "TIME_SLOT_PENDING":
    case "TIME_SLOT_PROVIDED":
      return "border border-primary/20 bg-primary/5 text-primary font-semibold";
    case "REJECTED":
    case "CANCELLED":
      return "border border-destructive/30 bg-destructive/10 text-destructive font-semibold";
    default:
      return "border border-border bg-muted text-muted-foreground font-semibold";
  }
}

function getStatusDotColor(status: string) {
  switch (status) {
    case "PAYMENT_COMPLETED":
    case "BOOKING_CONFIRMED":
    case "ACCEPTED":
    case "COMPLETED":
    case "TIME_SLOT_PENDING":
    case "TIME_SLOT_PROVIDED":
      return "bg-primary";
    case "REJECTED":
    case "CANCELLED":
      return "bg-destructive";
    default:
      return "bg-muted-foreground";
  }
}

function fmt(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmtShort(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function cur(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(
    amount,
  );
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function initials(first?: string | null, last?: string | null) {
  const a = (first?.[0] ?? "").toUpperCase();
  const b = (last?.[0] ?? "").toUpperCase();
  return a + b || "?";
}

interface SlotForm {
  appointment_date: string;
  start_time: string;
  end_time: string;
  remarks: string;
}

const REQUIRED_SLOTS = 3;
const EMPTY: SlotForm = { appointment_date: "", start_time: "", end_time: "", remarks: "" };

function makeSlotSet(): SlotForm[] {
  return Array.from({ length: REQUIRED_SLOTS }, () => ({ ...EMPTY }));
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 first:pt-0">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <span className="text-xs font-bold text-foreground">{children}</span>
    </div>
  );
}

function DoctorSlotFields({
  doctor,
  slots,
  onChange,
}: {
  doctor: SecondOpinionDoctor;
  slots: SlotForm[];
  onChange: (index: number, key: keyof SlotForm, value: string) => void;
}) {
  const min = todayStr();

  return (
    <div className="space-y-3 rounded-[14px] border border-border bg-muted/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Stethoscope className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Dr. {doctor.doctor_id.slice(0, 8)}…</p>
            <p className="text-[11px] font-medium text-muted-foreground">{cur(doctor.consultation_fee)} consultation</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-muted-foreground">Exactly 3 slots required</span>
      </div>

      {Array.from({ length: REQUIRED_SLOTS }).map((_, i) => {
        const slot = slots[i] ?? EMPTY;
        return (
          <div
            key={i}
            className="flex flex-wrap items-end gap-2 rounded-xl border border-border bg-card p-3"
          >
            <div className="w-[130px] space-y-1">
              <label className="text-[10px] font-semibold text-muted-foreground">Date *</label>
              <Input
                type="date"
                min={min}
                value={slot.appointment_date}
                onChange={(e) => onChange(i, "appointment_date", e.target.value)}
                className="h-9 rounded-lg border-border text-xs focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
              />
            </div>
            <div className="w-[110px] space-y-1">
              <label className="text-[10px] font-semibold text-muted-foreground">Start *</label>
              <Input
                type="time"
                value={slot.start_time}
                onChange={(e) => onChange(i, "start_time", e.target.value)}
                className="h-9 rounded-lg border-border text-xs focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
              />
            </div>
            <div className="w-[110px] space-y-1">
              <label className="text-[10px] font-semibold text-muted-foreground">End *</label>
              <Input
                type="time"
                value={slot.end_time}
                onChange={(e) => onChange(i, "end_time", e.target.value)}
                className="h-9 rounded-lg border-border text-xs focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
              />
            </div>
            <div className="min-w-[120px] flex-1 space-y-1">
              <label className="text-[10px] font-semibold text-muted-foreground">Remarks</label>
              <Input
                placeholder="Optional"
                value={slot.remarks}
                onChange={(e) => onChange(i, "remarks", e.target.value)}
                className="h-9 rounded-lg border-border text-xs placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DoctorSlotsLockedCard({ doctor }: { doctor: SecondOpinionDoctor }) {
  const label = doctor.status === "BOOKING_CONFIRMED" ? "Booking confirmed" : "Slots submitted";
  return (
    <div className="flex items-center justify-between gap-2 rounded-[14px] border border-border bg-card p-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-foreground">Dr. {doctor.doctor_id.slice(0, 8)}…</p>
          <p className="text-[11px] font-medium text-muted-foreground">{cur(doctor.consultation_fee)} consultation</p>
        </div>
      </div>
      <Badge
        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusVariant(doctor.status)}`}
      >
        <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${getStatusDotColor(doctor.status)}`} />
        {label}
      </Badge>
    </div>
  );
}

export function RequestDetails({ id }: { id: string }) {
  const router = useRouter();
  const [request, setRequest] = useState<RequestWithPatient | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [remarks, setRemarks] = useState("");

  const [slotsByDoctor, setSlotsByDoctor] = useState<Record<string, SlotForm[]>>({});
  const [submittingSlots, setSubmittingSlots] = useState(false);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const data = await secondOpinionService.getRequestById(id);
      setRequest(data as RequestWithPatient);
    } catch (error: unknown) {
      console.error(error);
      const axiosError = error as { response?: { data?: { detail?: string; message?: string } } };
      const message =
        axiosError.response?.data?.detail ??
        axiosError.response?.data?.message ??
        (error instanceof Error ? error.message : "Failed to load request details.");
      showPatientError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [id]);

  useEffect(() => {
    if (!request?.doctors) return;
    setSlotsByDoctor((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const doctor of request.doctors!) {
        const needsForm = !DOCTOR_SLOTS_LOCKED_STATUSES.includes(doctor.status);
        if (needsForm && !next[doctor.id]) {
          next[doctor.id] = makeSlotSet();
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [request]);

  const pendingDoctors = useMemo(
    () => (request?.doctors ?? []).filter((d) => !DOCTOR_SLOTS_LOCKED_STATUSES.includes(d.status)),
    [request],
  );
  const doneDoctors = useMemo(
    () => (request?.doctors ?? []).filter((d) => DOCTOR_SLOTS_LOCKED_STATUSES.includes(d.status)),
    [request],
  );

  const updateSlot = (doctorId: string, index: number, key: keyof SlotForm, value: string) => {
    setSlotsByDoctor((prev) => {
      const current = prev[doctorId] ?? makeSlotSet();
      const updated = current.map((s, idx) => (idx === index ? { ...s, [key]: value } : s));
      return { ...prev, [doctorId]: updated };
    });
  };

  const handleSubmitAllSlots = async () => {
    if (pendingDoctors.length === 0) return;

    const min = todayStr();

    for (const doctor of pendingDoctors) {
      const label = `Dr. ${doctor.doctor_id.slice(0, 8)}…`;
      const slots = slotsByDoctor[doctor.id] ?? [];
      for (let i = 0; i < REQUIRED_SLOTS; i++) {
        const s = slots[i];
        if (!s?.appointment_date || s.appointment_date < min) {
          showPatientError(`${label} – Slot ${i + 1}: select a valid future date.`);
          return;
        }
        if (!s.start_time || !s.end_time) {
          showPatientError(`${label} – Slot ${i + 1}: start and end time are required.`);
          return;
        }
        if (s.end_time <= s.start_time) {
          showPatientError(`${label} – Slot ${i + 1}: end time must be after start time.`);
          return;
        }
      }
    }

    try {
      setSubmittingSlots(true);

      const results = await Promise.allSettled(
        pendingDoctors.map((doctor) => {
          const slots = slotsByDoctor[doctor.id];
          const payload: SlotOption[] = slots.map((s) => ({
            appointment_date: s.appointment_date,
            start_time: `${s.start_time}:00.000Z`,
            end_time: `${s.end_time}:00.000Z`,
            remarks: s.remarks || "",
          }));
          return secondOpinionService.submitSlotOptions(request!.id, doctor.id, payload);
        }),
      );

      const failed = results
        .map((r, idx) => ({ r, doctor: pendingDoctors[idx] }))
        .filter(({ r }) => r.status === "rejected");

      if (failed.length === 0) {
        showPatientSuccess("Slots submitted for all doctors!");
      } else if (failed.length === pendingDoctors.length) {
        showPatientError("Failed to submit slots. Please try again.");
      } else {
        const names = failed.map(({ doctor }) => `Dr. ${doctor.doctor_id.slice(0, 8)}…`).join(", ");
        showPatientError(`Slots submitted, but failed for: ${names}`);
      }

      const failedIds = new Set(failed.map(({ doctor }) => doctor.id));
      setSlotsByDoctor((prev) => {
        const next = { ...prev };
        for (const doctor of pendingDoctors) {
          if (!failedIds.has(doctor.id)) delete next[doctor.id];
        }
        return next;
      });

      await fetchRequest();
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { detail?: string; message?: string } } };
      const message =
        axiosError.response?.data?.detail ??
        axiosError.response?.data?.message ??
        (error instanceof Error ? error.message : "Failed to submit slots.");
      showPatientError(message);
    } finally {
      setSubmittingSlots(false);
    }
  };

  const handleAccept = async () => {
    if (!remarks.trim()) {
      showPatientError("Please enter remarks before accepting.");
      return;
    }
    try {
      setAccepting(true);
      await secondOpinionService.acceptRequest(id, remarks.trim());
      showPatientSuccess("Request accepted!");
      await fetchRequest();
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { detail?: string; message?: string } } };
      const message =
        axiosError.response?.data?.detail ??
        axiosError.response?.data?.message ??
        (error instanceof Error ? error.message : "Failed to accept the request.");
      showPatientError(message);
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[40vh] flex-col items-center justify-center space-y-3">
        <Spinner className="h-6 w-6 text-primary" />
        <span className="text-xs font-medium text-muted-foreground">Loading request details...</span>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <ClipboardList className="h-8 w-8 text-muted-foreground" />
        <p className="text-base font-bold text-foreground">Request Not Found</p>
        <Button asChild size="sm" className="rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
          <Link href="/dashboard/second-opinion-requests">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Requests
          </Link>
        </Button>
      </div>
    );
  }

  const canAccept = request.status === "PAYMENT_COMPLETED";
  const REQUEST_STATUSES_ALLOWING_SLOTS = ["TIME_SLOT_PENDING", "PAYMENT_COMPLETED", "ACCEPTED"];
  const canBookSlots = REQUEST_STATUSES_ALLOWING_SLOTS.includes(request.status) && pendingDoctors.length > 0;
  const patient = request.patient;
  const fullName = [patient?.first_name, patient?.last_name].filter(Boolean).join(" ") || "Unknown patient";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-2">
      {/* ── Back button ── */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-fit px-0 text-xs font-medium text-foreground hover:bg-transparent hover:underline"
        asChild
      >
        <Link href="/dashboard/second-opinion-requests">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Second Opinion Requests
        </Link>
      </Button>

      {/* ── Hero header ── */}
      <div className="relative overflow-hidden rounded-[14px] border border-border bg-card p-6 shadow-xs">
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {initials(patient?.first_name, patient?.last_name)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight text-foreground">{fullName}</h1>
                <Badge
                  className={`rounded-full px-3 py-0.5 text-[11px] uppercase tracking-wider ${getStatusVariant(request.status)}`}
                >
                  <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${getStatusDotColor(request.status)}`} />
                  {request.status.replace(/_/g, " ")}
                </Badge>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1 font-mono">
                  <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                  {request.request_number}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {fmtShort(request.created_at)}
                </span>
                {patient?.gender && (
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    {patient.gender}
                  </span>
                )}
                {patient?.blood_group && (
                  <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
                    {patient.blood_group}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Grand Total
            </span>
            <p className="text-xl font-bold text-primary">{cur(request.grand_total)}</p>
          </div>
        </div>
      </div>

      {/* ── Two-column info ── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left: Financial + IDs */}
        <Card className="rounded-[14px] border border-border bg-card">
          <CardHeader className="pb-2 pt-5 px-6">
            <CardTitle className="flex items-center gap-2 text-sm font-bold text-foreground">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <DollarSign className="h-4 w-4" />
              </div>
              Financials & IDs
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border/60 px-6 pb-5">
            <InfoRow label="Platform Fee">{cur(request.platform_fee)}</InfoRow>
            <InfoRow label="Consultation">{cur(request.consultation_total)}</InfoRow>
            <InfoRow label="Discount">
              {request.discount_amount > 0 ? `- ${cur(request.discount_amount)}` : "—"}
            </InfoRow>
            <InfoRow label="Grand Total">
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                {cur(request.grand_total)}
              </span>
            </InfoRow>
            <InfoRow label="Patient ID">
              <span className="max-w-[180px] truncate font-mono text-xs text-foreground">{request.patient_id}</span>
            </InfoRow>
            <InfoRow label="Payment ID">
              <span className="max-w-[180px] truncate font-mono text-xs text-foreground">{request.payment_id}</span>
            </InfoRow>
            <InfoRow label="Coupon">
              {request.coupon_id ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
                  <Tag className="h-3 w-3 text-primary" />
                  {request.coupon_id}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </InfoRow>
          </CardContent>
        </Card>

        {/* Right: Timeline + Remarks + Documents */}
        <Card className="rounded-[14px] border border-border bg-card">
          <CardHeader className="pb-2 pt-5 px-6">
            <CardTitle className="flex items-center gap-2 text-sm font-bold text-foreground">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-4 w-4" />
              </div>
              Timeline & Attachments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-6 pb-5">
            <div className="flex gap-3">
              <div className="flex-1 rounded-xl border border-border bg-muted/40 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Created
                </span>
                <p className="text-xs font-bold text-foreground mt-0.5">{fmt(request.created_at)}</p>
              </div>
              <div className="flex-1 rounded-xl border border-border bg-muted/40 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Updated
                </span>
                <p className="text-xs font-bold text-foreground mt-0.5">{fmt(request.updated_at)}</p>
              </div>
            </div>

            {request.remarks && (
              <div className="rounded-xl border border-border bg-muted/30 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Remarks</span>
                <p className="text-xs font-medium text-foreground mt-0.5">{request.remarks}</p>
              </div>
            )}

            {/* Documents */}
            {request.documents && request.documents.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  Documents ({request.documents.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {request.documents.map((doc) => (
                    <a
                      key={doc.id}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 transition hover:border-primary/50 hover:bg-muted/50"
                    >
                      {doc.document_type.startsWith("image/") ? (
                        <img
                          src={doc.document_url}
                          alt={doc.document_name}
                          className="h-7 w-7 rounded-lg object-cover ring-1 ring-border"
                        />
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FileText className="h-3.5 w-3.5" />
                        </div>
                      )}
                      <span className="max-w-[120px] truncate text-xs font-medium text-foreground">
                        {doc.document_name}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Assigned Doctors ── */}
      {request.doctors && request.doctors.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">Assigned Medical Specialists</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {request.doctors.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between gap-3 rounded-[14px] border border-border bg-card p-4 shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-mono text-xs font-bold text-foreground">
                      Dr. {d.doctor_id.slice(0, 8)}…
                    </p>
                    <p className="text-[11px] font-medium text-muted-foreground">{cur(d.consultation_fee)}</p>
                  </div>
                </div>
                <Badge
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${getStatusVariant(d.status)}`}
                >
                  {d.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Accept Action ── */}
      {canAccept && (
        <Card className="rounded-[14px] border border-border bg-card shadow-xs">
          <CardContent className="flex flex-wrap items-end gap-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-sm font-bold text-foreground">Accept Request</span>
                <span className="block text-xs text-muted-foreground">Add official remarks to accept this case</span>
              </div>
            </div>
            <div className="min-w-[240px] flex-1">
              <Input
                placeholder="Enter remarks *"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="h-11 rounded-lg border-border text-xs placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
              />
            </div>
            <Button
              onClick={handleAccept}
              disabled={accepting || !remarks.trim()}
              className="h-11 rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {accepting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Accepting…
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Accept Request
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ── Slot Booking ── */}
      {canBookSlots && (
        <Card className="rounded-[14px] border border-border bg-card shadow-xs">
          <CardHeader className="pb-2 pt-5 px-6">
            <CardTitle className="flex items-center gap-2 text-sm font-bold text-foreground">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-4 w-4" />
              </div>
              Book Time Slots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            {pendingDoctors.map((doctor) => (
              <DoctorSlotFields
                key={doctor.id}
                doctor={doctor}
                slots={slotsByDoctor[doctor.id] ?? makeSlotSet()}
                onChange={(index, key, value) => updateSlot(doctor.id, index, key, value)}
              />
            ))}

            {doneDoctors.map((doctor) => (
              <DoctorSlotsLockedCard key={doctor.id} doctor={doctor} />
            ))}

            <div className="flex justify-end pt-2">
              <Button
                onClick={handleSubmitAllSlots}
                disabled={submittingSlots}
                className="h-11 rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {submittingSlots ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" /> Submitting…
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Submit Slots for All Doctors
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
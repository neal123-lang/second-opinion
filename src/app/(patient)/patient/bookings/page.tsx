"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Loader2, CheckCircle, ChevronRight, RefreshCw, Award } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { patientBookingService, DoctorSlotGroup, SlotOptionsResponse } from "@/lib/services/patient-booking-service";
import { showPatientError } from "@/lib/patient-alert";
import { getApiErrorMessage } from "@/lib/utils";

export default function BookingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bookingSlotId, setBookingSlotId] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [data, setData] = useState<SlotOptionsResponse | null>(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async (isSilent = false) => {
    try {
      if (!isSilent) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const res = await patientBookingService.getSlotOptions();
      if (res && res.success) {
        setData(res);
      } else {
        const errorMsg = res?.details || res?.message || "No slots available";
        showPatientError(errorMsg, "Error");
      }
    } catch (error) {
      showPatientError(getApiErrorMessage(error, "Failed to load slots. Please try again."), "Error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const extractIdString = (val: any): string => {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "number") return String(val);
    if (typeof val === "object" && val !== null) {
      if (typeof val.id === "string") return val.id;
      if (typeof val.request_id === "string") return val.request_id;
      if (typeof val.id === "object" && val.id) return extractIdString(val.id);
      if (typeof val.request_id === "object" && val.request_id) return extractIdString(val.request_id);
    }
    return "";
  };

  const getRequestId = (): string => {
    if (!data) return "";

    if (data.data && typeof data.data === "object") {
      const idFromReqId = extractIdString((data.data as any).request_id);
      if (idFromReqId) return idFromReqId;

      const idFromDataId = extractIdString((data.data as any).id);
      if (idFromDataId) return idFromDataId;

      const idFromRequest = extractIdString((data.data as any).request);
      if (idFromRequest) return idFromRequest;
    }

    const topReqId = extractIdString((data as any).request_id);
    if (topReqId) return topReqId;

    const reqObjId = extractIdString(data.request);
    if (reqObjId) return reqObjId;

    return "";
  };

  const handleBookSlot = async (slotId: string) => {
    const requestId = getRequestId();
    if (!requestId || bookingSlotId !== null) {
      if (!requestId) {
        showPatientError("Invalid request ID for slot booking.", "Error");
      }
      return;
    }

    try {
      setBookingSlotId(slotId);
      setSelectedSlotId(slotId);
      const res = await patientBookingService.selectSlot(requestId, slotId);
      if (res && (res.status === "SELECTED" || (res as any).success !== false)) {
        toast.success("Slot booked successfully!");
        await fetchSlots(true);
      } else {
        const errorMsg = (res as any)?.details || (res as any)?.message || "Failed to book slot. Please try again.";
        showPatientError(errorMsg, "Booking Failed");
      }
    } catch (error) {
      showPatientError(getApiErrorMessage(error, "Failed to book slot. Please try again."), "Booking Failed");
    } finally {
      setBookingSlotId(null);
    }
  };

  const formatTime = (time?: string) => {
    if (!time) return "--:--";
    try {
      return format(new Date(`2000-01-01T${time}`), "h:mm a");
    } catch {
      return time;
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "Date unavailable";
    try {
      return format(new Date(date), "EEE, MMM d, yyyy");
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
    return `${years} ${years === 1 ? "year" : "years"} experience`;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "OFFERED":
      case "SLOT_PROVIDED":
        return "bg-primary/10 text-primary border-primary/20";
      case "SELECTED":
        return "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20";
      case "BOOKED":
        return "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "OFFERED":
      case "SLOT_PROVIDED":
        return <Clock className="h-3.5 w-3.5" />;
      case "SELECTED":
        return <CheckCircle className="h-3.5 w-3.5" />;
      default:
        return <Clock className="h-3.5 w-3.5" />;
    }
  };

  const getDoctorGroups = (): DoctorSlotGroup[] => {
    if (!data) return [];
    if (typeof data.data === "object" && data.data !== null && Array.isArray((data.data as any).doctors)) {
      return (data.data as any).doctors;
    }
    if (Array.isArray(data.data)) {
      return [{
        request_doctor_id: "",
        doctor_id: "",
        consultation_fee: 0,
        status: "",
        slots: data.data,
      }];
    }
    if (Array.isArray(data.slots)) {
      return [{
        request_doctor_id: "",
        doctor_id: "",
        consultation_fee: 0,
        status: "",
        slots: data.slots,
      }];
    }
    return [];
  };

  const doctorGroups = getDoctorGroups();
  const totalSlotsCount = doctorGroups.reduce((acc, group) => acc + (group.slots?.length || 0), 0);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      {/* Sticky Header */}
      <header className="px-5 py-4 bg-card text-card-foreground flex items-center justify-between sticky top-0 z-20 border-b border-border">
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => router.back()}
            className="h-10 w-10 rounded-md flex items-center justify-center bg-card hover:bg-muted text-foreground transition-colors border border-border shrink-0"
            title="Go Back"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-muted-foreground" strokeWidth={1.75} />
          </button>
          <div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold text-primary bg-primary/10 uppercase leading-none mb-1">
              Bookings
            </span>
            <h1 className="text-base font-bold tracking-tight leading-none text-foreground">
              Available Slots
            </h1>
          </div>
        </div>

        <button
          onClick={() => fetchSlots(true)}
          disabled={loading || refreshing || bookingSlotId !== null}
          className="h-9 w-9 rounded-md flex items-center justify-center bg-card hover:bg-muted text-muted-foreground border border-border transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refresh Slots"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-primary" : ""}`} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 pb-32 max-w-md mx-auto w-full space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">Loading available slots...</p>
          </div>
        ) : totalSlotsCount === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6 bg-card rounded-md border border-border p-8">
            <Calendar className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <p className="text-base font-bold text-card-foreground">No slots available</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              No time slots have been offered by specialists yet. Please check back later.
            </p>
            <button
              onClick={() => fetchSlots(true)}
              disabled={refreshing}
              className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:bg-primary/90 transition-all flex items-center gap-1.5"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh Slots
            </button>
          </div>
        ) : (
          <>
            {/* Request Info (Legacy Support) */}
            {data?.request && (
              <div className="bg-card rounded-md border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-card-foreground">Request Details</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold border ${getStatusColor(data.request.status)}`}>
                    {getStatusIcon(data.request.status)}
                    {(data.request.status || "").replace(/_/g, " ")}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Request Number</p>
                    <p className="font-medium text-foreground">{data.request.request_number}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Amount</p>
                    <p className="font-medium text-foreground">₹{data.request.grand_total}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Platform Fee</p>
                    <p className="font-medium text-foreground">₹{data.request.platform_fee}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Consultation</p>
                    <p className="font-medium text-foreground">₹{data.request.consultation_total}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Doctor Slot Groups */}
            {doctorGroups.map((group, groupIdx) => {
              const doc = group.doctor;
              const doctorName = formatDoctorName(doc?.name);
              const fee = doc?.consultation_fee ?? group.consultation_fee;
              const expText = formatExperience(doc?.experience_years);

              return (
                <div key={group.request_doctor_id || group.doctor_id || `group-${groupIdx}`} className="space-y-3">
                  {/* Doctor Info Card Header */}
                  {doc && (
                    <div className="bg-card rounded-md border border-border p-4 flex items-center gap-3.5 shadow-sm">
                      <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold overflow-hidden p-1">
                        <img
                          src={doc.profile_photo || "/media/doctor.png"}
                          alt={doctorName}
                          className="h-full w-full object-contain rounded-full"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/media/doctor.png";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-sm text-foreground truncate">{doctorName}</h3>
                          {fee !== undefined && fee > 0 && (
                            <span className="text-xs font-semibold text-primary">₹{fee}</span>
                          )}
                        </div>
                        {doc.qualification && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{doc.qualification}</p>
                        )}
                        {expText && (
                          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Award className="h-3 w-3 text-primary" />
                            {expText}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase pt-1">
                    Offered Time Slots ({group.slots?.length || 0})
                  </h2>

                  <div className="space-y-3">
                    {group.slots?.map((slot, index) => {
                      const isBookingThis = bookingSlotId === slot.id;
                      const isSelected = selectedSlotId === slot.id;

                      return (
                        <div
                          key={slot.id || `slot-${index}`}
                          className={`bg-card rounded-md border p-4 flex items-center justify-between gap-4 transition-all cursor-pointer ${
                            isSelected
                              ? "border-primary bg-primary/[0.03] shadow-sm shadow-primary/10"
                              : "border-border hover:border-primary"
                          }`}
                          onClick={() => setSelectedSlotId(isSelected ? null : slot.id)}
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="h-14 w-14 flex items-center justify-center shrink-0 p-1">
                              <img
                                src="/media/appointment.png"
                                alt="Slot"
                                className="h-full w-full object-contain"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = "/media/medical-appointment.png";
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-card-foreground truncate text-base">
                                  Slot {slot.slot_number || index + 1}
                                </h4>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getStatusColor(slot.status)}`}>
                                  {getStatusIcon(slot.status)}
                                  {(slot.status || "").replace(/_/g, " ")}
                                </span>
                              </div>

                              {/* Doctor Name Tag on Slot Card */}
                              <p className="text-xs font-semibold text-primary mt-0.5 flex items-center gap-1.5">
                                <img src="/media/doctor.png" alt="Doctor" className="h-3.5 w-3.5 object-contain" /> {doctorName}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {formatDate(slot.appointment_date)}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                              </p>
                              {slot.remarks && (
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed italic">
                                  "{slot.remarks}"
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {slot.status === "OFFERED" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookSlot(slot.id);
                                }}
                                disabled={bookingSlotId !== null}
                                className="h-10 px-4 rounded-md text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:bg-primary/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
                              >
                                {isBookingThis ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <>
                                    Book Slot
                                    <ChevronRight className="h-4 w-4" />
                                  </>
                                )}
                              </button>
                            )}
                            {slot.status === "SELECTED" && (
                              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#10b981]/10 text-[#10b981] text-xs font-semibold">
                                <CheckCircle className="h-3.5 w-3.5" />
                                Booked
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </main>
    </div>
  );
}
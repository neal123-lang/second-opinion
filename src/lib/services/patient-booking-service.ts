import { apiClient } from "../api-client";
import { getApiErrorMessage } from "../utils";

export interface DoctorInfo {
  id: string;
  name: string;
  qualification?: string;
  experience_years?: number;
  consultation_fee?: number;
  profile_photo?: string | null;
}

export interface DoctorSlotGroup {
  request_doctor_id: string;
  doctor_id: string;
  consultation_fee: number;
  status: string;
  doctor?: DoctorInfo;
  slots: SlotOption[];
}

export interface SlotOption {
  id: string;
  round_number?: number;
  slot_number?: number;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  remarks?: string;
  request_doctor_id?: string;
  created_at?: string;
  created_by?: string;
  doctor_name?: string;
}

export interface SlotOptionsData {
  request_id?: string;
  doctors?: DoctorSlotGroup[];
}

export interface SecondOpinionRequest {
  request_number: string;
  patient_id: string;
  status: string;
  platform_fee: number;
  coupon_id: string | null;
  remarks: string | null;
  updated_at: string;
  id: string;
  payment_id: string;
  consultation_total: number;
  discount_amount: number;
  grand_total: number;
  created_at: string;
}

export interface SlotOptionsResponse {
  success: boolean;
  details?: string;
  message?: string;
  data?: SlotOptionsData | DoctorSlotGroup[] | SlotOption[] | any;
  slots?: SlotOption[];
  request?: SecondOpinionRequest;
}

export interface SelectSlotRequest {
  slot_id: string;
}

export interface SelectSlotResponse {
  request_doctor_id?: string;
  appointment_date?: string;
  end_time?: string;
  remarks?: string;
  created_at?: string;
  round_number?: number;
  id?: string;
  slot_number?: number;
  start_time?: string;
  status?: string;
  created_by?: string;
  success?: boolean;
  details?: string;
  message?: string;
}

export interface HistorySlotOption {
  id: string;
  round_number?: number;
  slot_number?: number;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  remarks?: string;
  request_doctor_id?: string;
  created_at?: string;
  created_by?: string;
}

export interface HistoryDoctorAssignment {
  id: string;
  request_id: string;
  doctor_id: string;
  status: string;
  consultation_fee: number;
  created_at: string;
  doctor?: DoctorInfo;
  slot_options?: HistorySlotOption[];
}

export interface BookingHistoryItem {
  id: string;
  request_number: string;
  patient_id: string;
  status: string;
  platform_fee: number;
  coupon_id?: string | null;
  remarks?: string | null;
  payment_id: string;
  consultation_total: number;
  discount_amount: number;
  grand_total: number;
  created_at: string;
  updated_at: string;
  doctors?: HistoryDoctorAssignment[];
}

export const patientBookingService = {
  getSlotOptions: async (): Promise<SlotOptionsResponse> => {
    try {
      const response = await apiClient.get<SlotOptionsResponse>(
        "/qikplus/api/v1/patient/second-opinion-requests/slot-options"
      );
      if (response.data && response.data.success === false) {
        const errorMsg = response.data.details || response.data.message || "Patient slot option not found";
        throw new Error(errorMsg);
      }
      return response.data;
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to load slot options. Please try again.");
      console.error("Get Slot Options Error:", message);
      throw new Error(message);
    }
  },

  selectSlot: async (requestId: string | any, slotId: string): Promise<SelectSlotResponse> => {
    try {
      let cleanRequestId = "";
      if (typeof requestId === "string") {
        cleanRequestId = requestId;
      } else if (typeof requestId === "object" && requestId !== null) {
        cleanRequestId = requestId.id || requestId.request_id || "";
      } else if (requestId) {
        cleanRequestId = String(requestId);
      }

      const response = await apiClient.post<SelectSlotResponse>(
        `/qikplus/api/v1/patient/second-opinion-requests/select-slot?request_id=${encodeURIComponent(cleanRequestId)}`,
        { slot_id: slotId }
      );
      if ((response.data as any)?.success === false) {
        const errorMsg = (response.data as any).details || (response.data as any).message || "Failed to book slot.";
        throw new Error(errorMsg);
      }
      return response.data;
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to book slot. Please try again.");
      console.error("Select Slot Error:", message);
      throw new Error(message);
    }
  },

  getBookingHistory: async (): Promise<BookingHistoryItem[]> => {
    try {
      const response = await apiClient.get<any>(
        "/qikplus/api/v1/patient/second-opinion-requests/patient/booking-history"
      );
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return [];
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to load booking history.");
      console.error("Get Booking History Error:", message);
      throw new Error(message);
    }
  },
};
import { apiClient } from "../api-client";

export interface SecondOpinionDocument {
  id: string;
  document_type: string;
  document_url: string;
  document_name: string;
  request_id: string;
  uploaded_at: string;
}

export interface SecondOpinionDoctor {
  id: string;
  doctor_id: string;
  request_id: string;
  consultation_fee: number;
  status: string;
  created_at: string;
}

export interface SecondOpinionRequest {
  id: string;
  request_number: string;
  patient_id: string;
  status: string;
  platform_fee: number;
  coupon_id: string | null;
  remarks: string | null;
  updated_at: string;
  payment_id: string;
  consultation_total: number;
  discount_amount: number;
  grand_total: number;
  created_at: string;
  documents?: SecondOpinionDocument[];
  doctors?: SecondOpinionDoctor[];
}

export interface SlotOption {
  appointment_date: string;
  start_time: string;
  end_time: string;
  remarks: string;
}

import { getApiErrorMessage } from "../utils";

export const secondOpinionService = {
  getRequests: async (): Promise<SecondOpinionRequest[]> => {
    try {
      const response = await apiClient.get<SecondOpinionRequest[]>(
        "/qikplus/api/v1/hospital-admin/second-opinion-requests",
      );
      return response.data;
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, "Failed to fetch second opinion requests."));
    }
  },

  getRequestById: async (id: string): Promise<SecondOpinionRequest> => {
    try {
      const response = await apiClient.get<SecondOpinionRequest>(
        `/qikplus/api/v1/hospital-admin/second-opinion-requests/${id}`,
      );
      return response.data;
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, "Failed to fetch request details."));
    }
  },

  acceptRequest: async (id: string, remarks: string): Promise<SecondOpinionRequest> => {
    try {
      const response = await apiClient.post<SecondOpinionRequest>(
        `/qikplus/api/v1/hospital-admin/second-opinion-requests/${id}/accept`,
        { remarks },
      );
      return response.data;
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, "Failed to accept request."));
    }
  },

  submitSlotOptions: async (
    requestId: string,
    doctorAssignmentId: string,
    slots: SlotOption[],
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post(
        `/qikplus/api/v1/hospital-admin/second-opinion-requests/${requestId}/doctors/${doctorAssignmentId}/slot-options`,
        { slots },
      );
      return response.data;
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, "Failed to submit slot options."));
    }
  },
};

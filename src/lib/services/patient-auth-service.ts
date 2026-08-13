import { apiClient } from "../api-client";
import { getApiErrorMessage } from "../utils";

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  is_new_user: boolean;
  access_token: string;
  patient: {
    id: string;
    first_name: string;
    last_name: string | null;
    phone: string;
    is_profile_completed: boolean;
    role: string;
  };
}

export interface UpdateNameData {
  first_name: string;
  last_name: string;
}

export const patientAuthService = {
  sendOtp: async (phone: string): Promise<SendOtpResponse> => {
    try {
      const response = await apiClient.post("/qikplus/api/v1/patient/auth/send-otp", {
        phone,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(getApiErrorMessage(error, "Failed to send OTP. Please try again."));
    }
  },

  verifyOtp: async (phone: string, otp: string): Promise<VerifyOtpResponse> => {
    try {
      const response = await apiClient.post("/qikplus/api/v1/patient/auth/verify-otp", {
        phone,
        otp,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(getApiErrorMessage(error, "Failed to verify code. Please try again."));
    }
  },

  updateName: async (data: UpdateNameData): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put("/qikplus/api/v1/patient/auth/name", {
        first_name: data.first_name,
        last_name: data.last_name,
      });
      return response.data;
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, "Failed to update profile name. Please try again."));
    }
  },
};

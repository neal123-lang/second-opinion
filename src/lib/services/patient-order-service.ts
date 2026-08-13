import { apiClient } from "../api-client";
import { getApiErrorMessage } from "../utils";

export interface CreateOrderRequest {
  doctor_ids: string[];
}

export interface DoctorOrderItem {
  doctor_id: string;
  consultation_fee: string | number;
  doctor_name?: string;
}

export interface CreateOrderResponse {
  success?: boolean;
  order_id?: string;
  consultation_amount?: string;
  platform_fee?: string;
  discount_amount?: string;
  tax_amount?: string;
  total_amount?: string;
  status?: string;
  doctors?: DoctorOrderItem[];
  message?: string;
}

export interface PreviewDocument {
  document_id: string;
  document_name: string;
  document_type: string;
  document_url: string;
}

export interface OrderPriceSummary {
  consultation_amount: string;
  platform_fee: string;
  discount_amount: string;
  tax_amount: string;
  total_amount: string;
}

export interface OrderPreviewResponse {
  success?: boolean;
  order_id?: string;
  status?: string;
  doctors?: DoctorOrderItem[];
  documents?: PreviewDocument[];
  price?: OrderPriceSummary;
  message?: string;
}

export interface CreatePaymentResponse {
  success?: boolean;
  payment_id?: string;
  order_id?: string;
  razorpay_order_id?: string;
  razorpay_key_id?: string;
  amount?: string;
  amount_in_paise?: number;
  currency?: string;
  status?: string;
  message?: string;
}

export interface VerifyPaymentRequest {
  order_id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success?: boolean;
  status?: string;
  message?: string;
  data?: any;
}

export const patientOrderService = {
  createOrder: async (doctorIds: string[]): Promise<CreateOrderResponse> => {
    try {
      const response = await apiClient.post<CreateOrderResponse>("/qikplus/api/v1/patient/orders", {
        doctor_ids: doctorIds,
      });
      return {
        success: true,
        ...response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to create order. Please try again.");
      console.error("Create Order Error:", message);
      return {
        success: false,
        message,
      };
    }
  },

  uploadDocuments: async (orderId: string, formData: FormData): Promise<{ success: boolean; message?: string; data?: any }> => {
    try {
      const response = await apiClient.post(`/qikplus/api/v1/patient/orders/${orderId}/documents`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to upload documents. Please try again.");
      console.warn("Upload Documents Error:", message);
      return {
        success: false,
        message,
      };
    }
  },

  getOrderPreview: async (orderId: string): Promise<OrderPreviewResponse> => {
    try {
      const response = await apiClient.get<OrderPreviewResponse>(`/qikplus/api/v1/patient/orders/${orderId}/preview`);
      return {
        success: true,
        ...response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to fetch order preview. Please try again.");
      console.error("Get Order Preview Error:", message);
      return {
        success: false,
        message,
      };
    }
  },

  createPayment: async (orderId: string): Promise<CreatePaymentResponse> => {
    try {
      const response = await apiClient.post<CreatePaymentResponse>(
        `/qikplus/api/v1/patient/orders/${orderId}/payment`,
        {}
      );
      return {
        success: true,
        ...response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to initiate payment. Please try again.");
      console.error("Initiate Payment Error:", message);
      return {
        success: false,
        message,
      };
    }
  },

  verifyPayment: async (data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> => {
    try {
      const response = await apiClient.post<VerifyPaymentResponse>(
        "/qikplus/api/v1/patient/payments/verify",
        data
      );
      return {
        success: true,
        ...response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to verify payment. Please try again.");
      console.error("Verify Payment Error:", message);
      return {
        success: false,
        message,
      };
    }
  },
};

import { apiClient } from "../api-client";
import { getApiErrorMessage } from "../utils";

export interface CreateCaseletResponse {
  success?: boolean;
  caselet_id?: string;
  caselet_number?: string;
  draft_order_id?: string;
  amount?: number;
  status?: string;
  message?: string;
}

export interface CaseletDocument {
  document_id?: string;
  document_name?: string;
  document_type?: string;
  document_url?: string;
  created_at?: string;
}

export interface CaseletInfo {
  caselet_id: string;
  caselet_number: string;
  status: string;
  created_at?: string;
}

export interface CaseletPaymentInfo {
  amount: number;
  currency: string;
}

export interface CaseletPreviewResponse {
  success?: boolean;
  caselet?: CaseletInfo;
  documents?: CaseletDocument[];
  payment?: CaseletPaymentInfo;
  message?: string;
}

export interface CaseletPaymentResponse {
  success?: boolean;
  payment_id?: string;
  order_id?: string;
  razorpay_order_id?: string;
  razorpay_key_id?: string;
  amount?: string | number;
  amount_in_paise?: number;
  currency?: string;
  status?: string;
  message?: string;
}

export const caseletService = {
  createCaselet: async (): Promise<CreateCaseletResponse> => {
    try {
      const response = await apiClient.post<CreateCaseletResponse>("/qikplus/api/v1/caselets", {});
      return {
        success: response.data.success ?? true,
        ...response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to create caselet. Please try again.");
      console.error("Create Caselet Error:", message);
      return {
        success: false,
        message,
      };
    }
  },

  uploadDocuments: async (
    caseletId: string,
    formData: FormData,
  ): Promise<{ success: boolean; message?: string; data?: any }> => {
    try {
      const response = await apiClient.post(`/qikplus/api/v1/caselets/${caseletId}/documents`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to upload caselet documents.");
      console.error("Upload Caselet Documents Error:", message);
      return {
        success: false,
        message,
      };
    }
  },

  getPreview: async (caseletId: string): Promise<CaseletPreviewResponse> => {
    try {
      const response = await apiClient.get<CaseletPreviewResponse>(`/qikplus/api/v1/caselets/${caseletId}/preview`);
      return {
        success: response.data.success ?? true,
        ...response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to fetch caselet preview.");
      console.error("Get Caselet Preview Error:", message);
      return {
        success: false,
        message,
      };
    }
  },

  createPayment: async (caseletId: string): Promise<CaseletPaymentResponse> => {
    const primaryEndpoint = `/qikplus/api/v1/patient/${caseletId}/payment`;
    const fallbackEndpoint = `/qikplus/api/v1/patient/caselets/${caseletId}/payment`;

    try {
      const response = await apiClient.post<CaseletPaymentResponse>(primaryEndpoint, {});
      return {
        success: true,
        ...response.data,
      };
    } catch (primaryError: any) {
      if (primaryError.response?.status === 404) {
        try {
          const fallbackRes = await apiClient.post<CaseletPaymentResponse>(fallbackEndpoint, {});
          return {
            success: true,
            ...fallbackRes.data,
          };
        } catch (fallbackError: any) {
          const message = getApiErrorMessage(fallbackError, "Failed to initiate caselet payment.");
          return { success: false, message };
        }
      }
      const message = getApiErrorMessage(primaryError, "Failed to initiate caselet payment.");
      console.error("Caselet Payment Error:", message);
      return {
        success: false,
        message,
      };
    }
  },

  verifyPayment: async (data: VerifyCaseletPaymentRequest): Promise<VerifyCaseletPaymentResponse> => {
    try {
      const response = await apiClient.post<VerifyCaseletPaymentResponse>(
        "/qikplus/api/v1/patient/payment/verify",
        data
      );
      return {
        success: true,
        ...response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to verify caselet payment.");
      const errorCode = error.response?.data?.detail?.error_code || error.response?.data?.error_code;
      console.error("Verify Caselet Payment Error:", message, errorCode);
      return {
        success: false,
        message,
        error_code: errorCode,
      };
    }
  },

  getCaseletHistory: async (): Promise<CaseletHistoryResponse> => {
    try {
      const response = await apiClient.get<CaseletHistoryResponse>("/qikplus/api/v1/caselets/caselet/history");
      return {
        success: response.data.success ?? true,
        ...response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to fetch caselet history.");
      console.error("Get Caselet History Error:", message);
      return {
        success: false,
        message,
      };
    }
  },

  getCaseletReports: async (caseletId: string): Promise<CaseletReportsResponse> => {
    try {
      const response = await apiClient.get<CaseletReportsResponse>(`/qikplus/api/v1/caselets/caselet/${caseletId}/reports`);
      return {
        success: response.data.success ?? true,
        ...response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to fetch caselet report.");
      console.error("Get Caselet Reports Error:", message);
      return {
        success: false,
        message,
      };
    }
  },

  getFlexreportStatus: async (caseletId: string): Promise<FlexreportStatusResponse> => {
    try {
      const response = await apiClient.get<FlexreportStatusResponse>(
        `/qikplus/api/v1/caselets/caselet/${caseletId}/flexreport/status`
      );
      return {
        success: response.data.success ?? true,
        ...response.data,
      };
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to check caselet status.");
      console.error("Get Flexreport Status Error:", message);
      return {
        success: false,
        message,
      };
    }
  },

  downloadCaseletReport: async (caseletId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      // First try standard JSON fetch
      const res = await caseletService.getCaseletReports(caseletId);
      if (res && res.success !== false) {
        const fileUrl =
          res.reports?.patient_report_url ||
          res.reports?.doctor_report_url ||
          (typeof res.reports === "string" ? res.reports : null) ||
          res.report_url ||
          res.download_url ||
          res.pdf_url ||
          res.url ||
          res.data?.patient_report_url ||
          res.data?.doctor_report_url ||
          res.data?.report_url ||
          res.data?.download_url ||
          res.data?.pdf_url ||
          res.data?.url ||
          (Array.isArray(res.reports) ? res.reports[0]?.patient_report_url || res.reports[0]?.url : null);

        if (fileUrl && typeof fileUrl === "string") {
          window.open(fileUrl, "_blank", "noopener,noreferrer");
          return { success: true };
        }
      }

      // Fallback: Direct binary blob response fetch if JSON did not provide a URL
      const response = await apiClient.get(`/qikplus/api/v1/caselets/caselet/${caseletId}/reports`, {
        responseType: "blob",
      });

      const contentType = String(response.headers["content-type"] || "");

      if (contentType.includes("application/json")) {
        const textData = await response.data.text();
        const json = JSON.parse(textData);
        if (json.success === false) {
          return { success: false, message: json.message || "Failed to download report." };
        }
        const fileUrl =
          json.reports?.patient_report_url ||
          json.reports?.doctor_report_url ||
          json.report_url ||
          json.download_url ||
          json.pdf_url ||
          json.url ||
          json.data?.patient_report_url ||
          json.data?.doctor_report_url ||
          json.data?.report_url ||
          json.data?.download_url;

        if (fileUrl && typeof fileUrl === "string") {
          window.open(fileUrl, "_blank", "noopener,noreferrer");
          return { success: true };
        } else {
          return { success: false, message: json.message || "No report download URL found in response." };
        }
      } else {
        const blob = new Blob([response.data], { type: contentType || "application/pdf" });
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;

        const disposition = String(response.headers["content-disposition"] || "");
        let filename = `Caselet_Report_${caseletId}.pdf`;
        if (disposition && disposition.includes("filename=")) {
          const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, "");
          }
        }

        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
        return { success: true };
      }
    } catch (error: any) {
      const message = getApiErrorMessage(error, "Failed to download caselet report.");
      console.error("Download Caselet Report Error:", message);
      return {
        success: false,
        message,
      };
    }
  },
};

export interface VerifyCaseletPaymentRequest {
  order_id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyCaseletPaymentResponse {
  success?: boolean;
  status?: string;
  message?: string;
  caselet_id?: string;
  caselet_number?: string;
  payment_id?: string;
  payment_status?: string;
  caselet_status?: string;
  error_code?: string;
  data?: any;
}

export interface CaseletHistoryItem {
  caselet_number: string;
  id: string;
  draft_order_id?: string | null;
  flexreport_task_id?: string | null;
  flexreport_status?: string | null;
  flexreport_completed_at?: string | null;
  flexreport_visit_number?: number | null;
  updated_at?: string | null;
  patient_id?: string | null;
  status?: string | null;
  flexreport_submitted_at?: string | null;
  flexreport_error?: string | null;
  created_at?: string | null;
}

export interface CaseletHistoryResponse {
  success?: boolean;
  caselet_history?: CaseletHistoryItem[];
  message?: string;
}

export interface CaseletReportsData {
  doctor_report_url?: string;
  patient_report_url?: string;
  [key: string]: any;
}

export interface CaseletReportsResponse {
  success?: boolean;
  message?: string;
  caselet_id?: string;
  caselet_number?: string;
  reports?: CaseletReportsData | any;
  report_url?: string;
  download_url?: string;
  pdf_url?: string;
  url?: string;
  data?: any;
}

export interface FlexreportStatusResponse {
  success?: boolean;
  status?: string;
  flexreport_status?: string;
  message?: string;
  data?: any;
  [key: string]: any;
}





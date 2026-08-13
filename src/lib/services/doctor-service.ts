import { apiClient } from "../api-client";

export const doctorService = {
  createDoctor: async (formData: FormData): Promise<any> => {
    const response = await apiClient.post("/qikplus/api/v1/hospital-admin/doctors", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getDoctors: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    speciality_id?: string;
    sort_by?: string;
    sort_order?: string;
  }): Promise<any> => {
    const response = await apiClient.get("/qikplus/api/v1/hospital-admin/doctors", {
      params,
    });
    return response.data;
  },

  getDoctorById: async (id: string): Promise<any> => {
    const response = await apiClient.get(`/qikplus/api/v1/hospital-admin/doctors/${id}`);
    return response.data;
  },
};

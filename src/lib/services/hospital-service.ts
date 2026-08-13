import { apiClient } from "../api-client";

export interface Hospital {
  id: string;
  hospital_name: string;
  hospital_code: string;
  logo: string | null;
  email: string;
  phone: string;
  city: string;
  state: string;
  subscription_plan: string | null;
  subscription_end_date: string | null;
  doctors_count: number;
  active_requests: number;
  status: string;
  hospital_admin: {
    name: string;
    email: string;
    phone: string;
    profile_pic: string | null;
  };
}

export interface PaginatedHospitals {
  total_records: number;
  page: number;
  limit: number;
  hospitals: Hospital[];
}

export interface DetailedHospital extends Omit<Hospital, "hospital_admin"> {
  registration_number: string;
  website: string | null;
  address: string;
  country: string;
  pincode: string;
  hospital_logo?: string | null;
  subscription: {
    plan: string | null;
    start_date: string | null;
    end_date: string | null;
    status: string | null;
  };
  admin: {
    id: string;
    name: string;
    email: string;
    mobile: string;
    role?: string;
  };
}

export interface GetHospitalsParams {
  page?: number;
  limit?: number;
  search?: string;
  plan?: string;
}

export const hospitalService = {
  getHospitals: async (params?: GetHospitalsParams): Promise<PaginatedHospitals> => {
    const response = await apiClient.get<PaginatedHospitals>("/qikplus/api/v1/super-admin/hospitals", { params });
    return response.data;
  },

  getHospitalById: async (id: string): Promise<DetailedHospital> => {
    const response = await apiClient.get<DetailedHospital>(`/qikplus/api/v1/super-admin/hospitals/${id}`);
    return response.data;
  },

  createHospital: async (formData: FormData): Promise<{ success?: boolean; message?: string }> => {
    const response = await apiClient.post("/qikplus/api/v1/super-admin/hospitals", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  resetHospitalPassword: async (id: string, new_password: string): Promise<{ success?: boolean; message?: string }> => {
    const params = new URLSearchParams();
    params.append("new_password", new_password);

    const response = await apiClient.post(
      `/qikplus/api/v1/super-admin/hospitals/${id}/reset-password`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    return response.data;
  },
};

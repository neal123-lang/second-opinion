import { apiClient } from "../api-client";

export interface Speciality {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  status: string;
  display_order: number;
}

export interface Language {
  id: string;
  code: string;
  name: string;
  status: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const masterService = {
  getSpecialities: async (): Promise<Speciality[]> => {
    const response = await apiClient.get<ApiResponse<Speciality[]>>("/qikplus/api/v1/masters/specialities");
    return response.data.data;
  },

  getLanguages: async (): Promise<Language[]> => {
    const response = await apiClient.get<ApiResponse<Language[]>>("/qikplus/api/v1/masters/languages");
    return response.data.data;
  },
};

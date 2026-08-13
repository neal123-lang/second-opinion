import type { User } from "@/stores/auth/use-auth-store";

import { apiClient } from "../api-client";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  loginUser: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/qikplus/api/v1/login/", credentials);
    return response.data;
  },
};

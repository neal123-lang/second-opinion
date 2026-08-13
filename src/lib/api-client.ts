import axios from "axios";

import { useAuthStore } from "@/stores/auth/use-auth-store";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!baseURL && typeof window !== "undefined") {
  console.error(
    "[api-client] NEXT_PUBLIC_BASE_API_URL is not set. API calls will fail.",
  );
}

let isRedirecting = false;

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and user on 401
      useAuthStore.getState().logout();
      // Redirect to login if we are in the browser, with debounce to prevent loops
      if (typeof window !== "undefined" && !isRedirecting) {
        isRedirecting = true;
        const target = window.location.pathname.includes("/patient")
          ? "/auth/patient/login"
          : "/auth/v2/login";
        window.location.replace(target);
      }
    }
    return Promise.reject(error);
  },
);

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (str: string, maxInitials = 2): string => {
  if (typeof str !== "string" || !str.trim()) return "?";

  const words = str.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";

  if (words.length === 1) {
    return words[0].slice(0, maxInitials).toUpperCase();
  }

  // For multi-word names (e.g. "Platform Super Admin"), return first & last word initial
  return (words[0][0] + words[words.length - 1][0]).toUpperCase().slice(0, maxInitials);
};

export function formatCurrency(
  amount: number,
  opts?: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    noDecimals?: boolean;
  },
) {
  const { currency = "USD", locale = "en-US", minimumFractionDigits, maximumFractionDigits, noDecimals } = opts ?? {};

  const formatOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    minimumFractionDigits: noDecimals ? 0 : minimumFractionDigits,
    maximumFractionDigits: noDecimals ? 0 : maximumFractionDigits,
  };

  return new Intl.NumberFormat(locale, formatOptions).format(amount);
}

export function getApiErrorMessage(error: any, fallback = "An unexpected error occurred."): string {
  if (!error) return fallback;

  if (typeof error === "string") return error;

  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    if (data) {
      if (typeof data.details === "string" && data.details.trim()) return data.details;
      if (typeof data.detail === "string" && data.detail.trim()) return data.detail;

      if (typeof data.detail === "object" && data.detail !== null && !Array.isArray(data.detail)) {
        if (typeof data.detail.details === "string" && data.detail.details.trim()) return data.detail.details;
        if (typeof data.detail.message === "string" && data.detail.message.trim()) return data.detail.message;
        if (typeof data.detail.detail === "string" && data.detail.detail.trim()) return data.detail.detail;
        if (typeof data.detail.error === "string" && data.detail.error.trim()) return data.detail.error;
      }

      if (typeof data.details === "object" && data.details !== null && !Array.isArray(data.details)) {
        if (typeof data.details.details === "string" && data.details.details.trim()) return data.details.details;
        if (typeof data.details.message === "string" && data.details.message.trim()) return data.details.message;
        if (typeof data.details.detail === "string" && data.details.detail.trim()) return data.details.detail;
        if (typeof data.details.error === "string" && data.details.error.trim()) return data.details.error;
      }

      if (typeof data.message === "string" && data.message.trim()) return data.message;
      if (typeof data.error === "string" && data.error.trim()) return data.error;

      if (typeof data.error === "object" && data.error !== null) {
        if (typeof data.error.details === "string" && data.error.details.trim()) return data.error.details;
        if (typeof data.error.message === "string" && data.error.message.trim()) return data.error.message;
      }

      if (Array.isArray(data.detail) && data.detail.length > 0) {
        const msg = data.detail
          .map((err: any) => (typeof err === "string" ? err : err.msg || err.message || err.details || JSON.stringify(err)))
          .join(", ");
        if (msg) return msg;
      }
      if (Array.isArray(data.details) && data.details.length > 0) {
        const msg = data.details
          .map((err: any) => (typeof err === "string" ? err : err.msg || err.message || err.details || JSON.stringify(err)))
          .join(", ");
        if (msg) return msg;
      }
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        const msg = data.errors
          .map((err: any) => (typeof err === "string" ? err : err.msg || err.message || err.details || JSON.stringify(err)))
          .join(", ");
        if (msg) return msg;
      }

      if (typeof data === "string" && data.trim().length > 0 && !data.startsWith("<!DOCTYPE")) {
        return data;
      }
    }

    if (status) {
      return `Server Error (${status}): ${fallback}`;
    }
  }

  if (typeof error === "object") {
    if (typeof error.details === "string" && error.details.trim()) return error.details;
    if (typeof error.detail === "string" && error.detail.trim()) return error.detail;
    if (typeof error.message === "string" && error.message.trim()) return error.message;
    if (typeof error.error === "string" && error.error.trim()) return error.error;
  }

  if (error.message && typeof error.message === "string") return error.message;

  return fallback;
}

export function getRoleRedirectPath(user?: { role?: string } | null): string {
  if (!user || !user.role) return "/dashboard/hospitals";

  const role = user.role.toUpperCase();
  if (role === "SUPER_ADMIN") {
    return "/dashboard/hospitals";
  }
  if (role === "HOSPITAL_ADMIN") {
    return "/dashboard/doctors";
  }
  if (role === "PATIENT" || role === "USER") {
    return "/patient/dashboard";
  }

  return "/dashboard/hospitals";
}

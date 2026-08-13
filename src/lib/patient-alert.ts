import Swal from "sweetalert2";
import { getApiErrorMessage } from "./utils";

/**
 * Centered SweetAlert modals adhering strictly to design.md and theme tokens
 */

export function showPatientError(message: unknown, title = "Error") {
  const displayMessage =
    typeof message === "string"
      ? message
      : getApiErrorMessage(message, "An unexpected error occurred.");

  return Swal.fire({
    icon: "error",
    iconColor: "var(--destructive, #c13515)",
    title,
    text: displayMessage,
    confirmButtonText: "OK",
    confirmButtonColor: "var(--primary, #ff385c)",
    customClass: {
      popup: "rounded-xl border border-border bg-card text-card-foreground shadow-xl font-sans",
      title: "text-lg font-bold text-foreground",
      htmlContainer: "text-sm text-muted-foreground",
      confirmButton: "rounded-md px-6 py-2.5 font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 outline-none shadow-md",
    },
  });
}

export function showPatientSuccess(message: string, title = "Success") {
  return Swal.fire({
    icon: "success",
    iconColor: "var(--primary, #ff385c)",
    title,
    text: message,
    confirmButtonText: "Continue",
    confirmButtonColor: "var(--primary, #ff385c)",
    customClass: {
      popup: "rounded-xl border border-border bg-card text-card-foreground shadow-xl font-sans",
      title: "text-lg font-bold text-foreground",
      htmlContainer: "text-sm text-muted-foreground",
      confirmButton: "rounded-md px-6 py-2.5 font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 outline-none shadow-md",
    },
  });
}

"use client";

import { Suspense, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { ArrowRight, Loader2, User, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { showPatientError } from "@/lib/patient-alert";
import { patientAuthService } from "@/lib/services/patient-auth-service";
import { getApiErrorMessage } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth/use-auth-store";

function RegisterContent() {
  const router = useRouter();
  const [phone, setPhone] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const storedPhone = typeof window !== "undefined" ? sessionStorage.getItem("patient_phone") : null;
    if (!storedPhone) {
      router.replace("/auth/patient/login");
    } else {
      setPhone(storedPhone);
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    try {
      setLoading(true);
      const res = await patientAuthService.updateName({
        first_name: formData.firstName,
        last_name: formData.lastName,
      });

      if (res.success !== false) {
        const currentUser = useAuthStore.getState().user;
        const currentToken = useAuthStore.getState().token;

        if (currentUser && currentToken) {
          login(currentToken, {
            ...currentUser,
            full_name: [formData.firstName, formData.lastName].filter(Boolean).join(" "),
          });
        }

        toast.success("Profile updated successfully! Welcome.");
        router.push("/patient/dashboard");
      } else {
        showPatientError(res.message || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      showPatientError(error.message || getApiErrorMessage(error, "An error occurred during registration."));
      console.error("Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!phone) return null;

  return (
    <div className="flex flex-col min-h-full bg-background relative overflow-hidden flex-1 text-foreground">
      <div className="flex flex-col items-center justify-center pt-12 pb-8 px-6 relative z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-primary bg-primary/10 uppercase mb-4">
          Almost there
        </span>

        <div className="relative h-20 w-20 mb-5 flex items-center justify-center">
          <div className="relative h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 text-primary-foreground">
            <UserPlus className="h-8 w-8" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-[26px] leading-tight font-semibold tracking-tight text-foreground text-center">
          Complete your profile
        </h1>
        <p className="text-sm text-muted-foreground mt-2 text-center max-w-[280px] leading-relaxed">
          Tell us a bit about yourself to get started
        </p>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-8 pb-8 bg-card text-card-foreground rounded-t-[32px] sm:rounded-b-[32px] border-t border-border shadow-[0_-8px_24px_rgba(0,0,0,0.04)] relative z-10">
        <div className="h-1.5 w-10 bg-muted rounded-full mx-auto mb-6" />

        <form onSubmit={handleRegister} className="flex-1 flex flex-col gap-5">
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Mobile number
            </label>
            <input
              id="phone"
              type="tel"
              value={`+91 ${phone}`}
              disabled
              className="w-full h-14 px-4 rounded-[14px] bg-muted text-muted-foreground font-medium border border-border cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="firstName" className="text-xs font-semibold text-foreground uppercase tracking-wide">
                First name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  <User className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  className="w-full pl-9 pr-3 h-14 rounded-[14px] bg-muted border border-border outline-none focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground/70"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="lastName" className="text-xs font-semibold text-foreground uppercase tracking-wide">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe (optional)"
                className="w-full px-3 h-14 rounded-[14px] bg-muted border border-border outline-none focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground/70"
                value={formData.lastName}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.firstName.trim()}
            className="w-full h-12 rounded-md text-base font-semibold mt-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:bg-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Complete registration
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PatientRegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}

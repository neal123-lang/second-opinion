"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowRight, Loader2, ShieldCheck, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

import Lottie from "lottie-react";
import unlockAnimation from "../../../../../public/lottie/Unlock.json";

import { Checkbox } from "@/components/ui/checkbox";
import { showPatientError } from "@/lib/patient-alert";
import { patientAuthService } from "@/lib/services/patient-auth-service";
import { getApiErrorMessage } from "@/lib/utils";

export default function PatientLoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [touched, setTouched] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = /^[6-9]\d{9}$/.test(phoneNumber);
  const showError = touched && phoneNumber.length > 0 && !isValid;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(digitsOnly);
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isValid) {
      setTouched(true);
      return;
    }
    if (!consentGiven) {
      toast.error("Please provide DPDP consent to receive OTP.");
      return;
    }

    try {
      setLoading(true);
      const res = await patientAuthService.sendOtp(phoneNumber);
      if (res.success || res.message === "OTP sent successfully.") {
        toast.success("OTP sent successfully!");
        sessionStorage.setItem("patient_phone", phoneNumber);
        router.push("/auth/patient/verify");
      } else {
        showPatientError(res.message || "Failed to send OTP. Please try again.");
      }
    } catch (error: unknown) {
      const errorMsg = getApiErrorMessage(error, "An error occurred. Please try again.");
      showPatientError(errorMsg);
      console.error("OTP Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = isValid && consentGiven;

  return (
    <div className="flex flex-col min-h-full bg-background relative overflow-hidden flex-1 text-foreground">
      {/* Brand & Access Tag */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center justify-center pt-10 pb-6 px-6 relative z-10"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-primary bg-primary/10 uppercase mb-3">
          Secure patient access
        </span>

        {/* Lottie Unlock Animation */}
        <div className="relative h-40 w-40 mb-3 flex items-center justify-center">
          <Lottie
            animationData={unlockAnimation}
            loop={true}
            autoplay={true}
            className="h-full w-full object-contain"
          />
        </div>

        <h1 className="text-[26px] leading-tight font-semibold tracking-tight text-foreground text-center">
          Welcome back
        </h1>
      </motion.div>

      {/* Form Sheet Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex flex-col px-6 pt-8 pb-8 bg-card text-card-foreground rounded-t-[32px] sm:rounded-b-[32px] border-t border-border shadow-[0_-8px_24px_rgba(0,0,0,0.04)] relative z-10"
      >
        <div className="h-1.5 w-10 bg-muted rounded-full mx-auto mb-6" />

        <form onSubmit={handleSendOtp} className="flex-1 flex flex-col">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-xs font-semibold text-foreground tracking-wide uppercase">
              Mobile number
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground pointer-events-none">
                <Smartphone className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
                <span className="text-sm font-semibold border-r border-border pr-2.5 text-foreground">+91</span>
              </span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="98765 43210"
                className={`w-full pl-[4.85rem] pr-4 h-14 text-base tracking-wide rounded-[14px] bg-muted border outline-none transition-all placeholder:text-muted-foreground/70 text-foreground ${
                  showError
                    ? "border-destructive bg-destructive/5 focus:border-destructive"
                    : "border-border focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/10"
                }`}
                value={phoneNumber}
                onChange={handlePhoneChange}
                onBlur={() => setTouched(true)}
                disabled={loading}
                required
              />
            </div>
            {showError ? (
              <p className="text-xs font-medium text-destructive pl-1 pt-0.5">Enter a valid 10-digit mobile number</p>
            ) : (
              <p className="text-xs text-muted-foreground pl-1 pt-0.5">
                We&apos;ll send a one-time verification code via SMS
              </p>
            )}
          </div>

          {/* DPDP Consent Checkbox */}
          <div className="mt-5 flex items-start space-x-3 rounded-xl border border-border/80 bg-muted/40 p-3.5 transition-colors">
            <Checkbox
              id="dpdp-consent"
              checked={consentGiven}
              onCheckedChange={(checked) => setConsentGiven(checked === true)}
              disabled={loading}
              className="mt-0.5 shrink-0"
            />
            <label
              htmlFor="dpdp-consent"
              className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none"
            >
              I consent to the collection and processing of my personal health data under the{" "}
              <span className="font-semibold text-foreground">DPDP Act 2023</span> to receive medical second opinion services.
            </label>
          </div>

          <motion.button
            whileTap={isFormValid && !loading ? { scale: 0.97 } : undefined}
            whileHover={isFormValid && !loading ? { scale: 1.01 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            type="submit"
            disabled={loading || phoneNumber.length !== 10 || !isValid || !consentGiven}
            className="w-full h-12 rounded-md text-base font-semibold mt-5 bg-primary hover:bg-primary/90 active:bg-primary/90 text-primary-foreground shadow-md shadow-primary/25 flex items-center justify-center gap-2 transition-all disabled:bg-primary/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {loading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Sending OTP...</span>
              </motion.div>
            ) : (
              <>
                Get OTP
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Your health data is encrypted &amp; confidential</span>
          </div>

          <p className="mt-auto pt-8 text-center text-xs text-muted-foreground leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-primary underline underline-offset-2 hover:opacity-80">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary underline underline-offset-2 hover:opacity-80">
              Privacy Policy
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}


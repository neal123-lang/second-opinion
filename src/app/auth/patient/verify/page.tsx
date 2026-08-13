"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { CheckCircle2, Loader2, Pencil, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

import Lottie from "lottie-react";
import otpAnimation from "../../../../../public/lottie/otp.json";

import { showPatientError } from "@/lib/patient-alert";
import { patientAuthService } from "@/lib/services/patient-auth-service";
import { getApiErrorMessage } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth/use-auth-store";

const RESEND_COOLDOWN_SECONDS = 45;
const OTP_LENGTH = 4;

function VerifyOtpContent() {
  const router = useRouter();
  const [phone, setPhone] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const hasAutoSubmitted = useRef(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const otp = digits.join("");

  useEffect(() => {
    const storedPhone = typeof window !== "undefined" ? sessionStorage.getItem("patient_phone") : null;
    if (!storedPhone) {
      router.replace("/auth/patient/login");
    } else {
      setPhone(storedPhone);
    }
  }, [router]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleResendOtp = async () => {
    if (!phone || cooldown > 0) return;
    try {
      setResending(true);
      const res = await patientAuthService.sendOtp(phone);
      if (res.success || res.message === "OTP sent successfully.") {
        toast.success("New code sent.");
        setDigits(Array(OTP_LENGTH).fill(""));
        hasAutoSubmitted.current = false;
        setCooldown(RESEND_COOLDOWN_SECONDS);
        inputRefs.current[0]?.focus();
      } else {
        showPatientError(res.message || "Couldn't resend the code. Try again.");
      }
    } catch (error: unknown) {
      showPatientError(getApiErrorMessage(error, "Something went wrong."));
    } finally {
      setResending(false);
    }
  };

  const handleVerifyOtp = useCallback(
    async (code: string) => {
      if (!phone || code.length !== OTP_LENGTH || loading) return;

      try {
        setLoading(true);
        const res = await patientAuthService.verifyOtp(phone, code);

        if (res.success || res.access_token) {
          setIsSuccess(true);
          const { access_token, patient, is_new_user } = res;

          login(access_token, {
            id: patient?.id,
            full_name: [patient?.first_name, patient?.last_name].filter(Boolean).join(" ") || "Patient",
            email: "",
            role: patient?.role || "PATIENT",
            hospital_id: null,
          });

          const isProfileComplete = !is_new_user && patient?.is_profile_completed && Boolean(patient?.first_name?.trim());

          setTimeout(() => {
            if (isProfileComplete) {
              toast.success("You're verified. Welcome back.");
              router.push("/patient/dashboard");
            } else {
              toast.success("Phone verified. Please complete your profile.");
              router.push("/auth/patient/register");
            }
          }, 300);
        } else {
          setIsSuccess(false);
          showPatientError(res.message || "That code didn't match. Try again.");
          setDigits(Array(OTP_LENGTH).fill(""));
          hasAutoSubmitted.current = false;
          inputRefs.current[0]?.focus();
        }
      } catch (error: unknown) {
        setIsSuccess(false);
        showPatientError(getApiErrorMessage(error, "That code didn't match. Try again."));
        setDigits(Array(OTP_LENGTH).fill(""));
        hasAutoSubmitted.current = false;
        inputRefs.current[0]?.focus();
      } finally {
        setLoading(false);
      }
    },
    [phone, loading, login, router],
  );

  useEffect(() => {
    if (otp.length === OTP_LENGTH && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      handleVerifyOtp(otp);
    }
  }, [otp, handleVerifyOtp]);

  const setDigitAt = (index: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleDigitChange = (index: number, rawValue: string) => {
    const value = rawValue.replace(/\D/g, "");
    if (!value) {
      setDigitAt(index, "");
      return;
    }
    if (value.length > 1) {
      const chars = value.slice(0, OTP_LENGTH).split("");
      setDigits((prev) => {
        const next = [...prev];
        chars.forEach((char, i) => {
          if (index + i < OTP_LENGTH) next[index + i] = char;
        });
        return next;
      });
      const lastFilled = Math.min(index + chars.length, OTP_LENGTH) - 1;
      inputRefs.current[lastFilled]?.focus();
      return;
    }
    setDigitAt(index, value[value.length - 1]);
    if (index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (!phone) return null;

  const maskedPhone = phone.length > 4 ? `${"•".repeat(phone.length - 4)}${phone.slice(-4)}` : phone;
  const isButtonDisabled = loading || otp.length !== OTP_LENGTH;

  return (
    <div className="flex flex-col min-h-full bg-background relative overflow-hidden flex-1 text-foreground">
      {/* Header / brand */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center justify-center pt-10 pb-6 px-6 relative z-10"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-primary bg-primary/10 uppercase mb-3">
          Verify it&apos;s you
        </span>

        {/* Lottie OTP Animation */}
        <div className="relative h-40 w-60 mb-3 flex items-center justify-center">
          <Lottie
            animationData={otpAnimation}
            loop={true}
            autoplay={true}
            className="h-full w-full object-contain"
          />
        </div>

        <h1 className="text-[26px] leading-tight font-semibold tracking-tight text-foreground text-center">
          Enter your code
        </h1>
        <p className="text-sm text-muted-foreground mt-2 text-center max-w-[280px] leading-relaxed">
          We sent a 4-digit code to
          <br />
          <span className="font-semibold text-foreground tabular-nums">+91 {maskedPhone}</span>
        </p>
      </motion.div>

      {/* Form sheet */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex flex-col px-6 pt-8 pb-8 bg-card text-card-foreground rounded-t-[32px] sm:rounded-b-[32px] border-t border-border shadow-[0_-8px_24px_rgba(0,0,0,0.04)] relative z-10"
      >
        <div className="h-1.5 w-10 bg-muted rounded-full mx-auto mb-8" />

        <div className="flex-1 flex flex-col">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex gap-3 sm:gap-4">
              {digits.map((digit, index) => (
                <motion.input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={OTP_LENGTH}
                  value={digit}
                  disabled={loading}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  animate={{
                    scale: digit ? [1, 1.06, 1] : 1,
                    borderColor: digit ? "var(--primary)" : "var(--border)",
                  }}
                  transition={{ duration: 0.2 }}
                  className={`w-14 h-16 sm:w-16 sm:h-20 text-2xl sm:text-3xl font-bold text-center rounded-[14px] border outline-none transition-colors text-foreground bg-muted focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center w-full px-1">
              <Link href="/auth/patient/login" className="text-xs text-muted-foreground font-medium flex items-center gap-1 hover:text-foreground">
                <Pencil className="h-3 w-3 text-primary" />
                Change number
              </Link>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending || cooldown > 0}
                className="text-xs text-primary font-semibold hover:opacity-90 disabled:text-muted-foreground/60"
              >
                {resending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : cooldown > 0 ? (
                  `Resend in ${cooldown}s`
                ) : (
                  "Resend code"
                )}
              </button>
            </div>
          </div>

          <motion.button
            whileTap={!isButtonDisabled ? { scale: 0.97 } : undefined}
            whileHover={!isButtonDisabled ? { scale: 1.01 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            type="button"
            onClick={() => handleVerifyOtp(otp)}
            disabled={isButtonDisabled}
            className="w-full h-12 rounded-md text-base font-semibold mt-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/25 flex items-center justify-center gap-2 transition-all disabled:bg-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-5 w-5 animate-pulse text-primary-foreground" />
                <span>Redirecting to Dashboard...</span>
              </motion.div>
            ) : loading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Verifying code...</span>
              </motion.div>
            ) : (
              <>
                Verify securely
                <CheckCircle2 className="h-5 w-5" />
              </>
            )}
          </motion.button>

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
        </div>
      </motion.div>
    </div>
  );
}

export default function PatientVerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}


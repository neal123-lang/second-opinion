"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Home, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import Lottie from "lottie-react";

import successAnimation from "../../../../../../public/lottie/Success.json";
import { caseletService, CaseletPreviewResponse, VerifyCaseletPaymentRequest, VerifyCaseletPaymentResponse } from "@/lib/services/caselet-service";
import { showPatientError } from "@/lib/patient-alert";

function formatCurrency(amount?: number | string | null, currency = "INR"): string {
  const num = typeof amount === "number" ? amount : parseFloat(String(amount || 0)) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 2,
  }).format(num);
}

function CaseletThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const caseletId = searchParams.get("caselet_id");
  const orderId = searchParams.get("order_id");
  const razorpayOrderId = searchParams.get("razorpay_order_id");
  const razorpayPaymentId = searchParams.get("razorpay_payment_id") || searchParams.get("payment_id");
  const razorpaySignature = searchParams.get("razorpay_signature");

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [previewDetails, setPreviewDetails] = useState<CaseletPreviewResponse | null>(null);
  const [verifyResult, setVerifyResult] = useState<VerifyCaseletPaymentResponse | null>(null);

  const verificationExecutedRef = useRef(false);

  useEffect(() => {
    if (caseletId) {
      fetchCaseletSummary(caseletId);
    }

    const hasVerificationParams = !!(orderId && razorpayOrderId && razorpayPaymentId && razorpaySignature);

    if (hasVerificationParams) {
      if (!verificationExecutedRef.current) {
        verificationExecutedRef.current = true;
        setVerifying(true);
        setVerified(false);
        verifyPaymentDetails({
          order_id: orderId!,
          razorpay_order_id: razorpayOrderId!,
          razorpay_payment_id: razorpayPaymentId!,
          razorpay_signature: razorpaySignature!,
        });
      }
    } else {
      setVerifying(false);
      setVerified(true);
    }
  }, [caseletId, orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature]);

  const verifyPaymentDetails = async (data: VerifyCaseletPaymentRequest) => {
    try {
      setVerifying(true);
      setVerifyError(null);
      const res = await caseletService.verifyPayment(data);
      if (res && res.success !== false) {
        setVerified(true);
        setVerifyResult(res);
        if (res.caselet_id && !caseletId) {
          fetchCaseletSummary(res.caselet_id);
        }
      } else {
        const errorMsg = res?.message || "Payment verification failed or pending.";
        const errorCode = res?.error_code || "";
        if (
          errorMsg.includes("already been paid") ||
          errorMsg.includes("DRAFT_ORDER_ALREADY_PAID") ||
          errorCode === "DRAFT_ORDER_ALREADY_PAID"
        ) {
          setVerified(true);
          setVerifyResult(res);
        } else {
          setVerified(false);
          setVerifyError(errorMsg);
          showPatientError(errorMsg, "Payment Verification Error");
        }
      }
    } catch (error: any) {
      console.error("Payment verification failed:", error);
      const errorMsg = error.message || "Could not verify payment signature automatically.";
      if (errorMsg.includes("already been paid") || errorMsg.includes("DRAFT_ORDER_ALREADY_PAID")) {
        setVerified(true);
      } else {
        setVerified(false);
        setVerifyError(errorMsg);
        showPatientError(errorMsg, "Payment Verification Error");
      }
    } finally {
      setVerifying(false);
    }
  };

  const fetchCaseletSummary = async (id: string) => {
    try {
      setLoading(true);
      const res = await caseletService.getPreview(id);
      if (res && res.success !== false) {
        setPreviewDetails(res);
      }
    } catch (error: any) {
      console.error("Failed to load caselet summary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
  
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans relative">
      {/* Top Bar Header */}
      <header className="px-5 py-4 bg-card text-card-foreground flex items-center justify-between sticky top-0 z-20 border-b border-border">
        <div className="flex items-center gap-2.5">
          <h1 className="text-base font-bold tracking-tight text-foreground">
            Caselet Order
          </h1>
        </div>
        <button
          type="button"
          onClick={() => router.push("/patient/dashboard")}
          className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <Home className="h-3.5 w-3.5" />
          Dashboard
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 pb-12 max-w-md mx-auto w-full space-y-4">
        {/* Verification Loading State */}
        {verifying ? (
          <div className="bg-card rounded-xl border border-border p-8 text-center space-y-3">
            <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
            <p className="text-sm font-bold text-foreground">Verifying Payment Details...</p>
            <p className="text-xs text-muted-foreground">
              Please wait while we confirm your payment signature with Razorpay.
            </p>
          </div>
        ) : (
          <>
            {/* Success Banner Card */}
            <div className="bg-card rounded-xl border border-border p-6 text-center space-y-3">
              {verified ? (
                <div className="mx-auto h-30 w-30 flex items-center justify-center">
                  <Lottie animationData={successAnimation} loop={false} className="h-24 w-24" />
                </div>
              ) : (
                <div className="mx-auto h-16 w-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <AlertCircle className="h-10 w-10 text-amber-600" />
                </div>
              )}

              <div className="space-y-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                    verified
                      ? "text-[#10b981] bg-[#10b981]/10"
                      : "text-amber-700 bg-amber-100"
                  }`}
                >
                  {verified
                    ? verifyResult?.caselet_status || "Payment Verified"
                    : "Verification Status Pending"}
                </span>
                <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                  {verified ? "Thank You for Your Request!" : "Payment Submitted"}
                </h2>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {verified
                  ? verifyResult?.message ||
                    "Your caselet generation request and payment have been verified. Our panel of medical experts will review your details."
                  : verifyError || "Your payment details have been received and are being processed by our system."}
              </p>
            </div>

            {/* Transaction Summary Card */}
            <div className="bg-card rounded-xl border border-border p-4.5 space-y-3.5">
              <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center justify-between">
                <span>Order Reference</span>
                <span className="text-[10px] text-primary font-semibold">
                  {verified ? "VERIFIED" : "PROCESSING"}
                </span>
              </h3>

              <div className="space-y-2 text-xs divide-y divide-border">
                {verifyResult?.caselet_number || previewDetails?.caselet?.caselet_number ? (
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-muted-foreground">Caselet Number</span>
                    <span className="font-mono font-bold text-foreground">
                      {verifyResult?.caselet_number || previewDetails?.caselet?.caselet_number}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-muted-foreground">Caselet ID</span>
                    <span className="font-mono font-bold text-foreground truncate max-w-[180px]">
                      {verifyResult?.caselet_id || caseletId || "N/A"}
                    </span>
                  </div>
                )}

                {(verifyResult?.payment_id || razorpayPaymentId) && (
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-muted-foreground">Payment Ref / ID</span>
                    <span className="font-mono font-semibold text-muted-foreground truncate max-w-[180px]">
                      {verifyResult?.payment_id || razorpayPaymentId}
                    </span>
                  </div>
                )}

                {razorpayOrderId && (
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-muted-foreground">Razorpay Order ID</span>
                    <span className="font-mono font-semibold text-muted-foreground truncate max-w-[180px]">
                      {razorpayOrderId}
                    </span>
                  </div>
                )}

                {previewDetails?.payment?.amount !== undefined && (
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-bold text-primary text-sm">
                      {formatCurrency(previewDetails.payment.amount, previewDetails.payment.currency)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps Timeline */}
            <div className="bg-card rounded-xl border border-border p-4.5 space-y-3">
              <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                What Happens Next?
              </h3>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    1
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground">Document Analysis</p>
                    <p className="text-[11px] text-muted-foreground leading-tight">
                      Your uploaded medical records are processed by our clinical system.
                    </p>
                  </div>
                </div>

              

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-full bg-muted text-muted-foreground border border-border flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    2
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground">Caselet Delivery</p>
                    <p className="text-[11px] text-muted-foreground leading-tight">
                      Caselet submitted for processing. You will get the response within 10 minutes on both WhatsApp and the app.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => router.push("/patient/dashboard")}
                className="w-full h-12 rounded-lg text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                Go to Patient Dashboard
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Support badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Need help? Contact support 24/7</span>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function CaseletThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <CaseletThankYouContent />
    </Suspense>
  );
}

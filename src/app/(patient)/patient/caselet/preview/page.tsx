"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Check, CreditCard, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { caseletService, CaseletPreviewResponse } from "@/lib/services/caselet-service";
import { showPatientError } from "@/lib/patient-alert";
import { getApiErrorMessage } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function formatCurrency(amount?: number | string | null, currency = "INR"): string {
  const num = typeof amount === "number" ? amount : parseFloat(String(amount || 0)) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 2,
  }).format(num);
}

function CaseletPreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const caseletId = searchParams.get("caselet_id");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<CaseletPreviewResponse | null>(null);

  useEffect(() => {
    if (!caseletId) {
      showPatientError("Invalid caselet session.", "Session Expired");
      router.replace("/patient/dashboard");
      return;
    }
    fetchPreview(caseletId);
  }, [caseletId, router]);

  const fetchPreview = async (id: string) => {
    try {
      setLoading(true);
      const res = await caseletService.getPreview(id);
      if (res && res.success !== false) {
        setPreview(res);
      } else {
        showPatientError(res.message || "Failed to load caselet preview.", "Preview Error");
      }
    } catch (error: any) {
      showPatientError(error.message || getApiErrorMessage(error, "Failed to load caselet preview."), "Preview Error");
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = async () => {
    if (!caseletId) return;
    try {
      setSubmitting(true);
      const res = await caseletService.createPayment(caseletId);

      if (!res || res.success === false) {
        showPatientError(res?.message || "Failed to initiate payment.", "Payment Error");
        setSubmitting(false);
        return;
      }

      // Check if Razorpay keys are returned
      if (res.razorpay_order_id && res.razorpay_key_id) {
        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
          showPatientError("Failed to load Razorpay payment SDK.", "SDK Error");
          setSubmitting(false);
          return;
        }

        const amountInPaise =
          res.amount_in_paise ||
          Math.round((parseFloat(String(res.amount || preview?.payment?.amount || 0)) || 0) * 100);

        const options = {
          key: res.razorpay_key_id,
          amount: amountInPaise,
          currency: res.currency || preview?.payment?.currency || "INR",
          name: "Second Opinion Healthcare",
          description: `Caselet Generation Fee (${preview?.caselet?.caselet_number || caseletId})`,
          order_id: res.razorpay_order_id,
          handler: function (response: any) {
            toast.success("Payment completed successfully!");
            const rzpOrderId = response?.razorpay_order_id || res.razorpay_order_id || "";
            const rzpPaymentId = response?.razorpay_payment_id || res.payment_id || "";
            const rzpSignature = response?.razorpay_signature || "";
            const orderId = res.order_id || caseletId;

            const queryParams = new URLSearchParams({
              caselet_id: caseletId,
              order_id: orderId,
              razorpay_order_id: rzpOrderId,
              razorpay_payment_id: rzpPaymentId,
              razorpay_signature: rzpSignature,
            }).toString();

            router.push(`/patient/caselet/thank-you?${queryParams}`);
          },
          modal: {
            ondismiss: function () {
              toast.info("Payment process cancelled.");
              setSubmitting(false);
            },
          },
          theme: {
            color: "#5645d4",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", function (response: any) {
          showPatientError(response.error?.description || "Payment failed. Please try again.", "Payment Failed");
          setSubmitting(false);
        });
        razorpay.open();
      } else {
        // Direct successful payment initiation response
        toast.success("Payment initiated successfully!");
        router.push(
          `/patient/caselet/thank-you?caselet_id=${caseletId}&payment_id=${res.payment_id || res.order_id || ""}`,
        );
      }
    } catch (error: any) {
      showPatientError(error.message || getApiErrorMessage(error, "Failed to process payment."), "Payment Error");
      setSubmitting(false);
    }
  };

  if (!caseletId) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans relative">
      {/* Sticky Header */}
      <header className="px-5 py-4 bg-card text-card-foreground flex items-center justify-between sticky top-0 z-20 border-b border-border">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-10 w-10 rounded-md flex items-center justify-center bg-card hover:bg-muted text-foreground transition-colors border border-border shrink-0"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-muted-foreground" strokeWidth={1.75} />
          </button>
          <div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold text-primary bg-primary/10 uppercase leading-none mb-1">
              Preview &amp; Payment
            </span>
            <h1 className="text-base font-bold tracking-tight leading-none text-foreground">Caselet Summary</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 pb-10 max-w-md mx-auto w-full space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">Loading caselet details...</p>
          </div>
        ) : !preview ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6 bg-card rounded-md border border-border p-8">
            <p className="text-base font-bold text-card-foreground">Preview unavailable</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              We could not retrieve the details for this caselet. Please try again.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Caselet Header Card */}
            <div className="bg-card rounded-md border border-border p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Caselet Number</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold text-primary bg-primary/10 uppercase">
                  {preview.caselet?.status || "PAYMENT_PENDING"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="text-base font-extrabold text-foreground font-mono">
                  {preview.caselet?.caselet_number || "CASE-000000"}
                </p>
              </div>
            </div>

            {/* Attached Documents Card */}
            <div className="bg-card rounded-md border border-border p-4.5 space-y-3">
              <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                Attached Documents ({preview.documents?.length || 0})
              </h2>

              {preview.documents && preview.documents.length > 0 ? (
                <div className="space-y-2">
                  {preview.documents.map((doc, i) => (
                    <div
                      key={doc.document_id || i}
                      className="flex items-center justify-between p-3 rounded-md bg-muted border border-border"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Image src="/media/google-docs.png" alt="Document" width={18} height={18} className="shrink-0" />
                        <span className="text-xs font-semibold text-foreground truncate">
                          {doc.document_name || doc.document_type || `Document #${i + 1}`}
                        </span>
                      </div>
                      <Check className="h-4 w-4 text-foreground" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">No documents attached for this caselet.</p>
              )}
            </div>

            {/* Payment Summary Card */}
            <div className="bg-card rounded-md border border-border p-4.5 space-y-3">
              <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Payment Details</h2>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-sm font-bold pt-1">
                  <span className="text-foreground">Caselet Generation Fee</span>
                  <span className="text-primary text-lg font-extrabold">
                    {formatCurrency(preview.payment?.amount, preview.payment?.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Make Payment Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleMakePayment}
                disabled={submitting}
                className="w-full h-12 rounded-md text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:bg-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    Make Payment ({formatCurrency(preview.payment?.amount, preview.payment?.currency)})
                  </>
                )}
              </button>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Encrypted &amp; Secure Payment</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function CaseletPreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <CaseletPreviewContent />
    </Suspense>
  );
}

"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check, FileText, Loader2, ShieldCheck, Stethoscope, CreditCard } from "lucide-react";
import { toast } from "sonner";

import { patientOrderService, OrderPreviewResponse } from "@/lib/services/patient-order-service";
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

function parseCleanAmount(val: string | number | undefined | null): number {
  if (val === null || val === undefined) return 0;
  if (typeof val === "number") return isNaN(val) ? 0 : val;
  const cleaned = String(val).trim();
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

function formatINR(val: string | number | undefined | null): string {
  const num = parseCleanAmount(val);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(num);
}

function OrderPreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<OrderPreviewResponse | null>(null);

  useEffect(() => {
    if (!orderId) {
      showPatientError("Invalid order session.", "Session Expired");
      router.replace("/patient/second-opinion/consultants");
      return;
    }
    fetchPreview(orderId);
  }, [orderId, router]);

  const fetchPreview = async (id: string) => {
    try {
      setLoading(true);
      const res = await patientOrderService.getOrderPreview(id);
      if (res && res.success !== false && res.order_id) {
        setPreview(res);
      } else {
        showPatientError(res.message || "Failed to load order summary.", "Preview Error");
      }
    } catch (error: any) {
      showPatientError(error.message || getApiErrorMessage(error, "Failed to load order summary."), "Preview Error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async () => {
    if (!orderId) return;
    try {
      setSubmitting(true);

      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        showPatientError("Failed to load Razorpay payment SDK. Please check your network connection.", "SDK Error");
        setSubmitting(false);
        return;
      }

      const res = await patientOrderService.createPayment(orderId);
      if (!res || res.success === false || !res.razorpay_order_id || !res.razorpay_key_id) {
        showPatientError(res?.message || "Failed to initiate payment session. Please try again.", "Payment Error");
        setSubmitting(false);
        return;
      }

      const amountInPaise = res.amount_in_paise || Math.round(parseCleanAmount(res.amount || preview?.price?.total_amount) * 100);

      const options = {
        key: res.razorpay_key_id,
        amount: amountInPaise,
        currency: res.currency || "INR",
        name: "Second Opinion Healthcare",
        description: `Consultation Order #${orderId}`,
        order_id: res.razorpay_order_id,
        handler: function (response: any) {
          toast.success("Payment completed successfully!");
          const rzpOrderId = response?.razorpay_order_id || res.razorpay_order_id || "";
          const rzpPaymentId = response?.razorpay_payment_id || res.payment_id || "";
          const rzpSignature = response?.razorpay_signature || "";

          const queryParams = new URLSearchParams({
            order_id: orderId,
            razorpay_order_id: rzpOrderId,
            razorpay_payment_id: rzpPaymentId,
            razorpay_signature: rzpSignature,
          }).toString();

          router.push(`/patient/second-opinion/thank-you?${queryParams}`);
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
        console.error("Razorpay Payment Failed:", response.error);
        showPatientError(
          response.error?.description || "Payment failed. Please try again.",
          "Payment Failed"
        );
        setSubmitting(false);
      });
      razorpay.open();
    } catch (error: any) {
      showPatientError(error.message || getApiErrorMessage(error, "Failed to process payment."), "Payment Error");
      setSubmitting(false);
    }
  };

  if (!orderId) return null;

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
              Step 3 of 3
            </span>
            <h1 className="text-base font-bold tracking-tight leading-none text-foreground">
              Order Summary &amp; Preview
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-5 pb-10 max-w-md mx-auto w-full space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">Preparing your order preview...</p>
          </div>
        ) : !preview ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6 bg-card rounded-md border border-border p-8">
            <p className="text-base font-bold text-card-foreground">Preview unavailable</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              We could not load the summary for this order. Please try again.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Order Status Header Card */}
            <div className="bg-card rounded-md border border-border p-4.5  space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Order Reference</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold text-primary bg-primary/10 uppercase">
                  {preview.status || "PENDING"}
                </span>
              </div>
              <p className="text-sm font-bold text-card-foreground font-mono truncate">{preview.order_id}</p>
            </div>

            {/* Selected Specialists Card */}
            <div className="bg-card rounded-md border border-border p-4.5  space-y-3">
              <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                Selected Specialists ({preview.doctors?.length || 0})
              </h2>

              {preview.doctors && preview.doctors.length > 0 ? (
                <div className="space-y-2.5">
                  {preview.doctors.map((doc, i) => (
                    <div
                      key={doc.doctor_id || i}
                      className="flex items-center justify-between p-3 rounded-md bg-muted border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Stethoscope className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">
                            {doc.doctor_name || `Doctor #${doc.doctor_id?.slice(0, 8)}`}
                          </p>
                          <p className="text-[11px] text-muted-foreground">Medical Specialist</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-primary">
                        {formatINR(doc.consultation_fee)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">No specialists assigned to this order.</p>
              )}
            </div>

            {/* Uploaded Documents Card */}
            <div className="bg-card rounded-md border border-border p-4.5  space-y-3">
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
                        <FileText className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-xs font-semibold text-foreground truncate">
                          {doc.document_name || doc.document_type || `Document #${i + 1}`}
                        </span>
                      </div>
                      <Check className="h-4 w-4 text-foreground" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">No documents attached for this consultation.</p>
              )}
            </div>

            {/* Price Summary Breakdown Card */}
            <div className="bg-card rounded-md border border-border p-4.5  space-y-3">
              <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                Payment Breakdown
              </h2>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Consultation Amount</span>
                  <span className="font-semibold text-foreground">
                    {formatINR(preview.price?.consultation_amount)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Platform Fee</span>
                  <span className="font-semibold text-foreground">
                    {formatINR(preview.price?.platform_fee)}
                  </span>
                </div>
                {parseCleanAmount(preview.price?.discount_amount) > 0 && (
                  <div className="flex justify-between text-foreground">
                    <span>Discount</span>
                    <span className="font-semibold text-primary">
                      -{formatINR(preview.price?.discount_amount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes &amp; GST</span>
                  <span className="font-semibold text-foreground">
                    {formatINR(preview.price?.tax_amount)}
                  </span>
                </div>

                <div className="pt-2.5 border-t border-border flex justify-between items-center text-sm font-bold">
                  <span className="text-foreground">Total Payable Amount</span>
                  <span className="text-primary text-base font-extrabold">
                    {formatINR(preview.price?.total_amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={submitting}
                className="w-full h-12 rounded-md text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:bg-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    Proceed to Payment ({formatINR(preview.price?.total_amount)})
                  </>
                )}
              </button>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Encrypted &amp; PCI-DSS compliant checkout</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function OrderPreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <OrderPreviewContent />
    </Suspense>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";

import { Calendar, DollarSign, Eye, Hash, Search } from "lucide-react";
import { showPatientError } from "@/lib/patient-alert";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type SecondOpinionRequest, secondOpinionService } from "@/lib/services/second-opinion-service";

function getStatusVariant(status: string) {
  switch (status) {
    case "PAYMENT_COMPLETED":
      return "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "TIME_SLOT_PENDING":
      return "border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400";
    case "ACCEPTED":
      return "border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400";
    case "REJECTED":
      return "border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400";
    case "COMPLETED":
      return "border border-primary/30 bg-primary/10 text-primary";
    default:
      return "border border-border bg-muted text-muted-foreground";
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function RequestsTable() {
  const [data, setData] = useState<SecondOpinionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await secondOpinionService.getRequests();
      setData(response);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { detail?: string; message?: string } } };
      const message = axiosError.response?.data?.detail ?? axiosError.response?.data?.message ?? (error instanceof Error ? error.message : "Failed to fetch second opinion requests.");
      showPatientError(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const filteredData = data.filter((req) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      req.request_number.toLowerCase().includes(term) ||
      req.status.toLowerCase().includes(term) ||
      req.patient_id.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="flex flex-col gap-4 rounded-[14px] border border-border bg-card p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by request number, status, or patient ID..."
            className="h-11 rounded-full border-border bg-background pl-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[14px] border border-border bg-card">
        <Table>
          <TableHeader className="bg-muted/60">
            <TableRow className="border-b border-border">
              <TableHead className="font-semibold text-foreground">Request #</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
              <TableHead className="font-semibold text-foreground">Platform Fee</TableHead>
              <TableHead className="font-semibold text-foreground">Consultation</TableHead>
              <TableHead className="font-semibold text-foreground">Grand Total</TableHead>
              <TableHead className="font-semibold text-foreground">Created</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-28 text-center">
                  <div className="flex items-center justify-center font-medium text-muted-foreground">
                    <Spinner className="mr-2 h-4 w-4 text-primary" />
                    Loading requests...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-28 text-center text-muted-foreground">
                  No second opinion requests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((request) => (
                <TableRow key={request.id} className="border-b border-border transition hover:bg-muted/40">
                  <TableCell>
                    <Link
                      href={`/dashboard/second-opinion-requests/${request.id}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-foreground underline-offset-4 hover:underline"
                    >
                      <Hash className="h-3.5 w-3.5 text-primary" />
                      {request.request_number}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusVariant(request.status)}`}
                    >
                      {request.status.replace(/_/g, " ")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-foreground">
                      {formatCurrency(request.platform_fee)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-foreground">
                      {formatCurrency(request.consultation_total)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs font-bold text-foreground">
                      <DollarSign className="h-3 w-3 text-primary" />
                      {formatCurrency(request.grand_total)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(request.created_at)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-full px-3 text-xs font-semibold text-primary hover:bg-primary/10"
                      asChild
                    >
                      <Link href={`/dashboard/second-opinion-requests/${request.id}`}>
                        <Eye className="mr-1.5 h-3.5 w-3.5" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

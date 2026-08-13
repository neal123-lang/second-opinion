"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";

import { Mail, MapPin, MoreHorizontal, Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Hospital, hospitalService } from "@/lib/services/hospital-service";

export function HospitalsTable() {
  const [data, setData] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  // Filter state (Draft state, applied when user clicks 'Apply Filters')
  const [draftFilters, setDraftFilters] = useState({
    search: "",
    city: "",
    state: "",
    subscription_plan: "",
  });

  // Applied filters (Used for actual API call)
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    city: "",
    state: "",
    subscription_plan: "",
  });

  const fetchHospitals = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        ...appliedFilters,
        sort_by: "created_at",
        sort_order: "desc",
      };

      // Clean up empty params
      const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== ""));

      const response = await hospitalService.getHospitals(cleanParams);
      setData(response.hospitals);
      setTotalRecords(response.total_records);
    } catch (error) {
      toast.error("Failed to fetch hospitals.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, appliedFilters]);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  const handleApplyFilters = () => {
    setPage(1); // Reset to page 1 on new filter
    setAppliedFilters(draftFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters = { search: "", city: "", state: "", subscription_plan: "" };
    setDraftFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setPage(1);
  };

  const totalPages = Math.ceil(totalRecords / limit) || 1;

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-[14px] border border-border bg-card p-4  md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hospitals by name, code, email..."
            className="h-11 rounded-full border-border bg-background pl-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
            value={draftFilters.search}
            onChange={(e) => setDraftFilters({ ...draftFilters, search: e.target.value })}
          />
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="City"
            value={draftFilters.city}
            onChange={(e) => setDraftFilters({ ...draftFilters, city: e.target.value })}
            className="h-11 w-36 md:w-44 rounded-full border-border bg-background text-sm text-foreground"
          />
          <Input
            placeholder="State"
            value={draftFilters.state}
            onChange={(e) => setDraftFilters({ ...draftFilters, state: e.target.value })}
            className="h-11 w-36 md:w-44 rounded-full border-border bg-background text-sm text-foreground"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-11 rounded-full border-border px-5 text-xs font-semibold text-foreground hover:bg-muted"
            onClick={handleClearFilters}
          >
            Clear
          </Button>
          <Button
            className="h-11 rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            onClick={handleApplyFilters}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[14px] border border-border bg-card ">
        <Table>
          <TableHeader className="bg-muted/60">
            <TableRow className="border-b border-border">
              <TableHead className="font-semibold text-foreground">Code</TableHead>
              <TableHead className="font-semibold text-foreground">Hospital</TableHead>
              <TableHead className="font-semibold text-foreground">Contact</TableHead>
              <TableHead className="font-semibold text-foreground">Location</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center">
                  <div className="flex items-center justify-center font-medium text-muted-foreground">
                    <Spinner className="mr-2 h-4 w-4 text-primary" />
                    Loading hospitals...
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center text-muted-foreground">
                  No hospitals found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((hospital) => (
                <TableRow key={hospital.id} className="border-b border-border transition hover:bg-muted/40">
                  <TableCell className="font-medium text-muted-foreground">{hospital.hospital_code}</TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/hospitals/${hospital.id}`}
                      className="font-semibold text-foreground underline-offset-4 hover:underline"
                    >
                      {hospital.hospital_name}
                    </Link>
                    <div className="mt-1">
                      <span className="inline-flex items-center gap-1.5   px-2.5 py-0.5 text-xs font-medium text-foreground">
                        <Mail className="h-3 w-3 text-primary" />
                        {hospital.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-semibold text-foreground">{hospital.hospital_admin?.name}</div>
                    <div className="text-xs text-muted-foreground">{hospital.phone}</div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs font-medium text-foreground">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {hospital.city}, {hospital.state}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        hospital.status === "ACTIVE"
                          ? "border border-primary/30 bg-primary/10 text-primary"
                          : "border border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      {hospital.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 rounded-full p-0 hover:bg-muted">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4 text-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="rounded-xl border-border bg-popover text-popover-foreground"
                      >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild className="cursor-pointer font-medium text-popover-foreground">
                          <Link href={`/dashboard/hospitals/${hospital.id}`}>View details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer font-medium text-popover-foreground">
                          Edit hospital
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer font-medium text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!loading && data.length > 0 && (
        <Pagination className="py-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage((p) => p - 1);
                }}
                className={page <= 1 ? "pointer-events-none opacity-50" : "border-border text-foreground hover:bg-muted"}
              />
            </PaginationItem>

            <PaginationItem>
              <span className="mx-4 text-xs font-medium text-muted-foreground">
                Page {page} of {totalPages} ({totalRecords} total)
              </span>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage((p) => p + 1);
                }}
                className={
                  page >= totalPages ? "pointer-events-none opacity-50" : "border-border text-foreground hover:bg-muted"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

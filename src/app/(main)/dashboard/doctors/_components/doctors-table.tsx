"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, Loader2, Mail, MoreHorizontal, Search, SlidersHorizontal } from "lucide-react";

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { doctorService } from "@/lib/services/doctor-service";

export interface Doctor {
  doctor_id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  profile_photo: string | null;
  qualification: string;
  experience_years: number;
  consultation_fee: number;
  registration_number: string;
  specialities: string[];
  status: string;
}

export function DoctorsTable() {
  const router = useRouter();
  const [data, setData] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await doctorService.getDoctors({
        page,
        limit,
        search,
      });
      setData(response.data || []);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    // Simple debounce for search
    const delayDebounceFn = setTimeout(() => {
      fetchDoctors();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchDoctors]);

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-[14px] border border-border bg-card p-4  md:flex-row md:items-center">
     
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors by name, specialty, registration..."
            className="h-11 rounded-full border-border bg-background pl-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-11 rounded-full border-border px-5 text-xs font-semibold text-foreground hover:bg-muted"
            onClick={() => {
              setSearch("");
              setPage(1);
            }}
          >
            Clear
          </Button>
          <Button className="h-11 rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[14px] border border-border bg-card ">

        <Table>
          <TableHeader className="bg-muted/60">
            <TableRow className="border-b border-border">
              <TableHead className="font-semibold text-foreground">Registration No.</TableHead>
              <TableHead className="font-semibold text-foreground">Doctor</TableHead>
              <TableHead className="font-semibold text-foreground">Contact</TableHead>
              <TableHead className="font-semibold text-foreground">Specialities</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center text-muted-foreground">
                  No doctors found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((doctor) => (
                <TableRow
                  key={doctor.doctor_id}
                  className="cursor-pointer border-b border-border transition hover:bg-muted/40"
                  onClick={() => router.push(`/dashboard/doctors/${doctor.doctor_id}`)}
                >
                  <TableCell>
                    <span className="inline-flex items-center rounded-lg border border-border bg-muted px-2.5 py-1 text-xs font-mono font-semibold text-foreground">
                      {doctor.registration_number}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-foreground">{doctor.full_name}</div>
                    <div className="max-w-[200px] truncate text-xs text-muted-foreground">{doctor.qualification}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="text-xs font-medium text-foreground">{doctor.phone}</div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-foreground">
                        <Mail className="h-3 w-3 text-primary" />
                        {doctor.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {doctor.specialities?.map((spec, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[10px] font-semibold text-foreground"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        doctor.status === "ACTIVE"
                          ? "border border-primary/30 bg-primary/10 text-primary"
                          : "border border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      {doctor.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" className="h-8 w-8 rounded-full p-0 hover:bg-muted">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4 text-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="rounded-xl border-border bg-popover text-popover-foreground"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild className="cursor-pointer font-medium text-popover-foreground">
                          <Link href={`/dashboard/doctors/${doctor.doctor_id}`}>
                            <Eye className="mr-2 h-4 w-4 text-primary" />
                            View Profile
                          </Link>
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

      {/* Pagination Controls */}
      <div className="flex items-center justify-between py-2">
        <span className="text-xs font-medium text-muted-foreground">Showing page {page}</span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border bg-card px-4 text-xs font-semibold text-foreground hover:bg-muted shadow-xs"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border bg-card px-4 text-xs font-semibold text-foreground hover:bg-muted shadow-xs"
            onClick={() => setPage((p) => p + 1)}
            disabled={data.length < limit || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

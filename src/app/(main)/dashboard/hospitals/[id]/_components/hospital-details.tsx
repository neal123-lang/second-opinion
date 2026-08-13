"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Globe,
  Hash,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { type DetailedHospital, hospitalService } from "@/lib/services/hospital-service";
import { getInitials } from "@/lib/utils";

import { ResetPasswordDialog } from "./reset-password-dialog";

export function HospitalDetails({ id }: { id: string }) {
  const [hospital, setHospital] = useState<DetailedHospital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHospital() {
      try {
        setLoading(true);
        const data = await hospitalService.getHospitalById(id);
        setHospital(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load hospital details.");
      } finally {
        setLoading(false);
      }
    }
    fetchHospital();
  }, [id]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard.`);
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <Spinner className="h-8 w-8 text-primary" />
        <span className="text-sm font-medium text-muted-foreground animate-pulse">Loading hospital details...</span>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Building2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Hospital Not Found</h2>
          <p className="text-sm text-muted-foreground">The hospital facility you are looking for does not exist or was removed.</p>
        </div>
        <Button asChild className="rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
          <Link href="/dashboard/hospitals">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hospitals
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
      {/* Navigation & Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="px-0 text-xs font-medium text-foreground hover:bg-transparent hover:underline" asChild>
          <Link href="/dashboard/hospitals">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hospitals Directory
          </Link>
        </Button>
        <div className="flex gap-3">
          <ResetPasswordDialog hospitalId={hospital.id} />
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="relative rounded-[14px] border border-border bg-card  overflow-hidden">
        {/* Banner Area */}
        <div className="h-32 md:h-44 w-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:to-background relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          {hospital.status === "ACTIVE" ? (
            <Badge className="absolute top-4 right-4 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
              Active Facility
            </Badge>
          ) : (
            <Badge variant="secondary" className="absolute top-4 right-4 rounded-full border border-border bg-muted px-3.5 py-1 text-xs font-semibold text-muted-foreground">
              {hospital.status}
            </Badge>
          )}
        </div>

        <div className="px-6 pb-8 md:px-10">
          <div className="relative flex flex-col md:flex-row md:items-end gap-6 md:gap-8 -mt-14 md:-mt-16 mb-4">
            <div className="relative">
              <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-background shadow-md rounded-[14px] bg-card">
                <AvatarImage src={hospital.hospital_logo || hospital.logo || ""} alt={hospital.hospital_name} className="object-cover" />
                <AvatarFallback className="text-3xl font-bold rounded-[14px] bg-primary/10 text-primary">
                  {getInitials(hospital.hospital_name)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1  border border-border">
                <div className="bg-primary/10 rounded-full p-2 text-primary">
                  <Building2 className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-2 pt-2 md:pt-0 md:pb-1">
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {hospital.hospital_name}
                  </h1>
                  <Badge variant="outline" className="rounded-md border-border bg-muted/60 font-mono text-xs font-semibold text-foreground px-2.5 py-0.5">
                    {hospital.hospital_code}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-2 pt-0.5">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>{hospital.address ? `${hospital.address}, ` : ""}{hospital.city}, {hospital.state}, {hospital.country}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Facility Details */}
        <Card className="rounded-[14px] border border-border bg-card ">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-4 w-4" />
              </div>
              Facility Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="flex items-center justify-between py-2 border-b border-border/60">
              <span className="text-xs font-semibold text-muted-foreground">Hospital Code</span>
              <Badge variant="outline" className="rounded-md border-border font-mono text-xs font-bold text-foreground">
                {hospital.hospital_code}
              </Badge>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border/60">
              <span className="text-xs font-semibold text-muted-foreground">Registration No.</span>
              <span className="text-xs font-bold font-mono text-foreground">{hospital.registration_number}</span>
            </div>

            <div className="py-2 border-b border-border/60 space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Official Email</span>
              <div className="flex items-center justify-between pt-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  <span>{hospital.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => copyToClipboard(hospital.email, "Email")}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div className="py-2 border-b border-border/60 space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Phone Number</span>
              <div className="flex items-center justify-between pt-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <span>{hospital.phone}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => copyToClipboard(hospital.phone, "Phone number")}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {hospital.website && (
              <div className="py-2 space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Official Website</span>
                <div className="pt-1">
                  <a
                    href={hospital.website.startsWith("http") ? hospital.website : `https://${hospital.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span className="truncate max-w-[200px]">{hospital.website}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location Info */}
        <Card className="rounded-[14px] border border-border bg-card ">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-4 w-4" />
              </div>
              Location & Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="space-y-1 pb-3 border-b border-border/60">
              <span className="text-xs font-semibold text-muted-foreground">Street Address</span>
              <p className="text-sm font-medium text-foreground leading-relaxed pt-0.5">{hospital.address || "N/A"}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-0.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">City</span>
                <p className="text-xs font-bold text-foreground">{hospital.city || "N/A"}</p>
              </div>

              <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-0.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">State</span>
                <p className="text-xs font-bold text-foreground">{hospital.state || "N/A"}</p>
              </div>

              <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-0.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Country</span>
                <p className="text-xs font-bold text-foreground">{hospital.country || "N/A"}</p>
              </div>

              <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-0.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Pincode</span>
                <p className="text-xs font-bold font-mono text-foreground">{hospital.pincode || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Administrator Info */}
        <Card className="rounded-[14px] border border-border bg-card ">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <User className="h-4 w-4" />
              </div>
              Administrator
            </CardTitle>
            <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              {hospital.admin?.role || "Hospital Admin"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="flex items-center gap-3 py-2 border-b border-border/60">
              <Avatar className="h-10 w-10 rounded-full border border-border">
                <AvatarFallback className="rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {getInitials(hospital.admin?.name || "Admin")}
                </AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 flex-1">
                <span className="text-sm font-bold text-foreground truncate">{hospital.admin?.name || "N/A"}</span>
                <span className="text-xs text-muted-foreground truncate">{hospital.admin?.email}</span>
              </div>
            </div>

            <div className="py-2 border-b border-border/60 space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Admin Mobile</span>
              <div className="flex items-center justify-between pt-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <span>{hospital.admin?.mobile || "N/A"}</span>
                </div>
                {hospital.admin?.mobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={() => copyToClipboard(hospital.admin.mobile, "Admin mobile")}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>

            <div className="pt-2">
              <ResetPasswordDialog hospitalId={hospital.id} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

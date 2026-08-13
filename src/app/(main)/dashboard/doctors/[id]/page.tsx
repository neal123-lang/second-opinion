"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  Edit,
  FileText,
  Languages,
  Loader2,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";

import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { doctorService } from "@/lib/services/doctor-service";

interface DoctorDetail {
  doctor_id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  profile_photo: string | null;
  qualification: string;
  registration_number: string;
  experience_years: number;
  consultation_fee: number;
  biography: string;
  status: string;
  specialities: {
    id: string;
    name: string;
  }[];
  languages: {
    id: string;
    name: string;
  }[];
  documents: any[];
}

export default function DoctorProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [doctor, setDoctor] = useState<DoctorDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const data = await doctorService.getDoctorById(id);
        setDoctor(data);
      } catch (error) {
        console.error("Failed to fetch doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="w-fit hover:bg-transparent hover:underline px-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Doctors
        </Button>
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-muted/30 p-8 text-center text-muted-foreground">
          <User className="h-12 w-12 text-muted-foreground/50" />
          <div>
            <h3 className="text-lg font-medium text-foreground">Doctor Not Found</h3>
            <p className="text-sm">The doctor profile you are looking for does not exist or has been removed.</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/dashboard/doctors")}>
            Return to Directory
          </Button>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard.`);
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full">
      {/* Navigation & Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="px-0 hover:bg-transparent hover:underline text-foreground text-xs font-medium" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Doctors Directory
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex rounded-full border-border">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button size="sm" className="gap-2 rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="relative rounded-[14px] border border-border bg-card  overflow-hidden">
        {/* Banner Area */}
        <div className="h-32 md:h-48 w-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:to-background relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          {doctor.status === "ACTIVE" ? (
            <Badge className="absolute top-4 right-4 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
              Active Provider
            </Badge>
          ) : (
            <Badge variant="secondary" className="absolute top-4 right-4 rounded-full border border-border bg-muted px-3.5 py-1 text-xs font-semibold text-muted-foreground">
              {doctor.status}
            </Badge>
          )}
        </div>

        <div className="px-6 pb-8 md:px-10">
          <div className="relative flex flex-col md:flex-row md:items-end gap-6 md:gap-8 -mt-16 md:-mt-20 mb-6">
            <div className="relative">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background  rounded-[14px] bg-card">
                <AvatarImage src={doctor.profile_photo || ""} alt={doctor.full_name} className="object-cover" />
                <AvatarFallback className="text-4xl font-bold rounded-[14px] bg-primary/10 text-primary">
                  {getInitials(doctor.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1  border border-border">
                <div className="bg-primary/10 rounded-full p-2 text-primary">
                  <Stethoscope className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-2 pt-2 md:pt-0 md:pb-2">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Dr. {doctor.full_name}
                </h1>
                <p className="text-base text-muted-foreground font-medium flex items-center gap-2">
                  <span>{doctor.qualification}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                  <span className="text-primary font-semibold">{doctor.experience_years}+ Years Exp</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                {doctor.specialities?.map((spec) => (
                  <Badge
                    key={spec.id}
                    variant="secondary"
                    className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {spec.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-row md:flex-col gap-3 md:pb-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex-1 md:flex-none justify-start gap-2.5 h-11 rounded-full border-border bg-card px-4 text-xs font-semibold text-foreground hover:bg-muted"
                onClick={() => copyToClipboard(doctor.phone, "Phone number")}
              >
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">{doctor.phone}</span>
                <Copy className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
              </Button>
              <Button
                variant="outline"
                className="flex-1 md:flex-none justify-start gap-2.5 h-11 rounded-full border-border bg-card px-4 text-xs font-semibold text-foreground hover:bg-muted"
                onClick={() => copyToClipboard(doctor.email, "Email")}
              >
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">{doctor.email}</span>
                <Copy className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main Content Area */}
        <div className="flex flex-col gap-8 min-w-0">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start h-12 p-1 bg-muted/40 rounded-full mb-6 inline-flex overflow-x-auto no-scrollbar border border-border">
              <TabsTrigger value="overview" className="rounded-full px-6 text-xs font-bold data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:">
                Overview
              </TabsTrigger>
              <TabsTrigger value="documents" className="rounded-full px-6 text-xs font-bold data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:">
                Documents
              </TabsTrigger>
              <TabsTrigger value="schedule" className="rounded-full px-6 text-xs font-bold data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:">
                Schedule & Slots
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="overview"
              className="space-y-8 mt-0 outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
            >
              {/* Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-[14px] border border-border bg-card p-4 ">
                  <CardContent className="p-0 flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Consultation Fee
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-foreground">₹{doctor.consultation_fee}</span>
                  </CardContent>
                </Card>
                <Card className="rounded-[14px] border border-border bg-card p-4 ">
                  <CardContent className="p-0 flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Reg. Number
                    </span>
                    <span className="text-base font-bold font-mono tracking-tight mt-1 flex items-center justify-between text-foreground">
                      {doctor.registration_number}
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-muted" onClick={() => copyToClipboard(doctor.registration_number, "Registration number")}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </span>
                  </CardContent>
                </Card>
                <Card className="rounded-[14px] border border-border bg-card p-4 ">
                  <CardContent className="p-0 flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                      <Languages className="h-4 w-4 text-primary" />
                      Languages
                    </span>
                    <span
                      className="text-sm font-semibold tracking-tight mt-1 line-clamp-1 text-foreground"
                      title={doctor.languages?.map((l) => l.name).join(", ")}
                    >
                      {doctor.languages?.length > 0 ? doctor.languages.map((l) => l.name).join(", ") : "Not specified"}
                    </span>
                  </CardContent>
                </Card>
                <Card className="rounded-[14px] border border-border bg-card p-4 ">
                  <CardContent className="p-0 flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      Experience
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-foreground">
                      {doctor.experience_years} <span className="text-xs font-normal text-muted-foreground">Yrs</span>
                    </span>
                  </CardContent>
                </Card>
              </div>

              {doctor.biography && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold tracking-tight flex items-center gap-2 text-foreground">
                    <User className="h-5 w-5 text-primary" />
                    About Dr. {doctor.full_name.split(" ")[0]}
                  </h3>
                  <div className="rounded-[14px] border border-border bg-card p-6 ">
                    <p className="text-sm leading-relaxed text-muted-foreground">{doctor.biography}</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="documents"
              className="mt-0 outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
            >
              <Card className="rounded-[14px] border border-border bg-card ">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-bold text-foreground">Verification Documents</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">Official documents and certificates submitted by the doctor.</CardDescription>
                </CardHeader>
                <CardContent>
                  {doctor.documents?.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {doctor.documents.map((doc, idx) => (
                        <div
                          key={idx}
                          className="group flex items-center justify-between gap-4 rounded-[14px] border border-border p-4 transition-all hover:bg-muted/40"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-foreground">Document {idx + 1}</span>
                              <span className="text-[11px] text-muted-foreground">Verification File</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-full border-border text-xs font-semibold px-4">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-[14px] bg-muted/20">
                      <div className="bg-muted p-3.5 rounded-full mb-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground">No documents uploaded</h3>
                      <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                        There are no verification documents available for this doctor yet.
                      </p>
                      <Button variant="outline" className="mt-4 rounded-full border-border text-xs font-semibold px-5">
                        Request Documents
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="schedule"
              className="mt-0 outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
            >
              <Card className="rounded-[14px] border border-border bg-card  overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-base font-bold text-foreground">Availability & Schedule</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">Manage working hours and appointment slots</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">No Schedule Configured</h3>
                  <p className="mb-6 mt-1 max-w-md text-xs text-muted-foreground leading-relaxed">
                    Set up regular working hours, break times, and specific availability exceptions for this doctor to
                    enable appointment booking.
                  </p>
                  <Button className="rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                    <Calendar className="mr-2 h-4 w-4" />
                    Configure Schedule
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar - Analytics & Actions */}
        <div className="flex flex-col gap-6">
          <Card className="rounded-[14px] border border-border bg-card  overflow-hidden">
            <div className="bg-muted/40 px-6 py-4 border-b border-border flex items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Performance Summary</CardTitle>
            </div>
            <CardContent className="p-0">
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-5 border-b border-border/60">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Total Appointments
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-foreground">0</span>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar className="h-4.5 w-4.5" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 border-b border-border/60">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Patient Rating
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold tracking-tight text-muted-foreground">--</span>
                    </div>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Award className="h-4.5 w-4.5" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Profile Views
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-foreground">0</span>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-4.5 w-4.5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[14px] border border-border bg-card ">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">Doctor ID</p>
                <div className="flex items-center justify-between bg-muted/40 p-2.5 rounded-lg border border-border">
                  <p className="text-xs font-mono text-foreground truncate mr-2" title={doctor.doctor_id}>
                    {doctor.doctor_id}
                  </p>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded hover:bg-muted shrink-0" onClick={() => copyToClipboard(doctor.doctor_id, "Doctor ID")}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">User ID</p>
                <div className="flex items-center justify-between bg-muted/40 p-2.5 rounded-lg border border-border">
                  <p className="text-xs font-mono text-foreground truncate mr-2" title={doctor.user_id}>
                    {doctor.user_id}
                  </p>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded hover:bg-muted shrink-0" onClick={() => copyToClipboard(doctor.user_id, "User ID")}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

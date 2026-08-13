"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Activity, ArrowRight, Building2, Calendar, Heart, Plus, ShieldCheck, Star, UserCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getRoleRedirectPath } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth/use-auth-store";

export default function Page() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user?.role) {
      const redirectPath = getRoleRedirectPath(user);
      if (redirectPath && redirectPath !== "/dashboard") {
        router.replace(redirectPath);
      }
    }
  }, [user, router]);
  const stats = [
    { label: "Active Consultations", value: "28", change: "+12% this week", icon: Activity },
    { label: "Verified Doctors", value: "142", change: "+4 new today", icon: UserCheck },
    { label: "Partner Hospitals", value: "36", change: "Across 12 cities", icon: Building2 },
    { label: "Pending Opinions", value: "9", change: "3 high priority", icon: Calendar },
  ];

  const featuredDoctors = [
    {
      id: "doc-1",
      name: "Dr. Sarah Jenkins",
      title: "Senior Cardiologist · Mount Sinai",
      rating: "4.94",
      reviews: 128,
      experience: "14 yrs exp.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
      badge: "Guest favorite",
      price: "$150 consultation",
    },
    {
      id: "doc-2",
      name: "Dr. Marcus Vance",
      title: "Neurology Specialist · Mayo Clinic",
      rating: "4.98",
      reviews: 210,
      experience: "18 yrs exp.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
      badge: "Top Rated",
      price: "$180 consultation",
    },
    {
      id: "doc-3",
      name: "Dr. Elena Rostova",
      title: "Oncology Lead · Johns Hopkins",
      rating: "4.91",
      reviews: 95,
      experience: "11 yrs exp.",
      image: "https://images.unsplash.com/photo-1594824813566-7885a3964478?auto=format&fit=crop&q=80&w=600",
      badge: "Guest favorite",
      price: "$200 consultation",
    },
  ];

  const featuredHospitals = [
    {
      id: "hosp-1",
      name: "St. Jude Super Specialty Medical Center",
      location: "San Francisco, CA · 2.4 miles",
      rating: "4.89",
      beds: "450+ Beds",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800",
      tag: "Multi-Specialty",
    },
    {
      id: "hosp-2",
      name: "Cedar-Sinai Advanced Heart Institute",
      location: "Los Angeles, CA · 5.1 miles",
      rating: "4.96",
      beds: "320+ Beds",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
      tag: "Cardiology Hub",
    },
  ];

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-10 py-4">
      {/* Category Navigation Bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-8 text-sm font-semibold text-foreground">
          <button className="flex items-center gap-2 border-b-2 border-foreground pb-3 text-foreground">
            <Activity className="size-4 text-primary" />
            <span>Overview</span>
          </button>
          <Link href="/dashboard/doctors" className="flex items-center gap-2 pb-3 text-muted-foreground hover:text-foreground">
            <UserCheck className="size-4" />
            <span>Doctors</span>
            <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[8px] font-bold tracking-widest text-card-foreground uppercase">
              NEW
            </span>
          </Link>
          <Link href="/dashboard/hospitals" className="flex items-center gap-2 pb-3 text-muted-foreground hover:text-foreground">
            <Building2 className="size-4" />
            <span>Hospitals</span>
          </Link>
          <Link href="/dashboard/second-opinion-requests" className="flex items-center gap-2 pb-3 text-muted-foreground hover:text-foreground">
            <ShieldCheck className="size-4" />
            <span>Second Opinions</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/doctors">
            <Button size="sm" className="rounded-full bg-primary px-5 font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-1 size-4" /> Find Specialist
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Welcome Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] font-bold leading-[1.43] tracking-normal text-foreground">
          Medical Operations & Second Opinions
        </h1>
        <p className="text-[14px] leading-[1.43] text-muted-foreground">
          Monitor verified specialists, patient consultations, and hospital network performance across your network.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-3 rounded-[14px] border border-border bg-card p-5 shadow-xs transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">{stat.label}</span>
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-foreground">
                <stat.icon className="size-4 text-primary" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-card-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Doctors Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[21px] font-bold leading-[1.43] text-foreground">Featured Medical Specialists</h2>
            <p className="text-xs text-muted-foreground">Top rated physicians available for secondary review</p>
          </div>
          <Link
            href="/dashboard/doctors"
            className="flex items-center gap-1 text-sm font-semibold text-foreground underline"
          >
            View all doctors <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="group flex flex-col overflow-hidden rounded-[14px] border border-border bg-card transition hover:shadow-md"
            >
              {/* Photo plate with badge and heart wishlist */}
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-card-foreground shadow-xs">
                  {doc.badge}
                </div>
                <button
                  type="button"
                  className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-card/80 text-card-foreground backdrop-blur-xs transition hover:bg-card"
                >
                  <Heart className="size-4 text-primary" />
                </button>
              </div>

              {/* Meta lines */}
              <div className="flex flex-col gap-1 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-card-foreground">{doc.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-semibold text-card-foreground">
                    <Star className="size-3.5 fill-foreground text-foreground" />
                    <span>{doc.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{doc.title}</p>
                <p className="text-xs text-muted-foreground">{doc.experience}</p>
                <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                  <span className="text-xs font-semibold text-card-foreground">{doc.price}</span>
                  <Link href={`/dashboard/doctors/${doc.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 rounded-lg border-border text-xs font-medium text-foreground hover:bg-muted"
                    >
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Hospitals Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[21px] font-bold leading-[1.43] text-foreground">Partner Hospital Networks</h2>
            <p className="text-xs text-muted-foreground">
              Premier healthcare centers providing specialized second opinion reviews
            </p>
          </div>
          <Link
            href="/dashboard/hospitals"
            className="flex items-center gap-1 text-sm font-semibold text-foreground underline"
          >
            View all hospitals <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredHospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="flex overflow-hidden rounded-[14px] border border-border bg-card transition hover:shadow-md"
            >
              <div className="relative h-48 w-48 shrink-0 bg-muted">
                <img src={hosp.image} alt={hosp.name} className="h-full w-full object-cover" />
                <div className="absolute top-2 left-2 rounded-full bg-card px-2 py-0.5 text-[10px] font-bold tracking-wider text-card-foreground uppercase">
                  {hosp.tag}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-card-foreground">{hosp.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{hosp.location}</p>
                  <p className="text-xs text-muted-foreground">{hosp.beds}</p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-1 text-sm font-semibold text-card-foreground">
                    <Star className="size-4 fill-foreground text-foreground" />
                    <span>{hosp.rating}</span>
                  </div>
                  <Link href={`/dashboard/hospitals/${hosp.id}`}>
                    <Button
                      size="sm"
                      className="h-8 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      Explore Network
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

import Image from "next/image";

import { Stethoscope } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/config/app-config";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <div className="grid h-dvh justify-center p-2 lg:grid-cols-2">
        {/* LEFT PANEL (Brand + Trust Messaging) */}
        <div className="relative order-2 hidden h-full items-center justify-center rounded-3xl bg-primary lg:flex">
          {/* Top Branding */}
          <div className="absolute top-10 w-full space-y-2 px-10 text-primary-foreground">
            <Stethoscope className="size-10" />
            <h1 className="font-semibold text-2xl">{APP_CONFIG.name}</h1>
            <p className="text-sm opacity-90">Get clarity on your diagnosis from trusted medical experts.</p>
          </div>

          {/* Center Image */}
          <div className="px-10 flex items-center justify-center">
            <Image
              src="/lendingpage/hero_img.png"
              alt="Second Opinion Consultation"
              width={600}
              height={600}
              className="max-h-[50vh] w-auto object-contain rounded-2xl mix-blend-lighten [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_98%)]"
              priority
            />
          </div>

          {/* Bottom Info Sections */}
          <div className="absolute bottom-10 flex w-full justify-between px-10">
            <div className="flex-1 space-y-1 text-primary-foreground">
              <h2 className="font-medium">Why second opinion?</h2>
              <p className="text-sm opacity-90">
                Avoid misdiagnosis and explore better treatment options with expert review.
              </p>
            </div>

            <Separator orientation="vertical" className="mx-3 h-auto!" />

            <div className="flex-1 space-y-1 text-primary-foreground">
              <h2 className="font-medium">100% secure & private</h2>
              <p className="text-sm opacity-90">
                Your medical records are encrypted and reviewed only by verified doctors.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (Auth / Forms) */}
        <div className="relative order-1 flex h-full">{children}</div>
      </div>
    </main>
  );
}

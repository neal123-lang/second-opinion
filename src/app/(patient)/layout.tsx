import type { ReactNode } from "react";

import { Lexend, Plus_Jakarta_Sans } from "next/font/google";

import { AuthGuard } from "@/components/auth-guard";

// Body face: Plus Jakarta Sans — warm, humanist, highly legible on mobile.
// Display face: Lexend — used only for headings, designed for reading clarity
// (fitting for a healthcare product) but with enough character to not read generic.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-lexend",
});

export default function PatientLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AuthGuard>
      <div
        className={`${jakarta.variable} ${lexend.variable} flex flex-col min-h-screen bg-background [font-family:var(--font-jakarta)]`}
      >
        {/* Mobile-first layout container */}
        <div className="flex-1 flex flex-col w-full max-w-md mx-auto relative bg-background overflow-hidden">
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}

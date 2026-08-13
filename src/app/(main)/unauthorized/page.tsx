import Link from "next/link";

import { Lock } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-md flex-col items-center rounded-[14px] border border-border bg-card p-8 text-center text-card-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.1)]">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lock className="size-7" />
        </div>
        <h1 className="mt-4 text-[22px] font-bold leading-tight text-foreground">Access Restricted</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          You do not have permission to access this area. Please contact your system administrator or switch to an
          authorized account.
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

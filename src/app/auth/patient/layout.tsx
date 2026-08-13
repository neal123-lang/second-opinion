export default function PatientAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col sm:items-center sm:justify-center p-0 sm:p-4 text-foreground">
      <div className="w-full min-h-screen sm:min-h-0 sm:h-auto sm:max-w-md sm:rounded-[32px] sm:border sm:border-border bg-card text-card-foreground sm:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col relative">
        {/* Soft ambient glows based on design.md */}
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 h-48 w-48 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

        <div className="flex-1 overflow-y-auto relative z-10 flex flex-col">{children}</div>
      </div>
    </div>
  );
}

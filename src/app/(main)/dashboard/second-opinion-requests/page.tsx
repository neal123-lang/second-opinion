import { RequestsTable } from "./_components/requests-table";

export default function SecondOpinionRequestsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Second Opinion Requests</h1>
          <p className="text-muted-foreground">Review and manage incoming second opinion requests.</p>
        </div>
      </div>

      <RequestsTable />
    </div>
  );
}

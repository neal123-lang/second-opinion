import { AddHospitalDialog } from "./_components/add-hospital-dialog";
import { HospitalsTable } from "./_components/hospitals-table";

export default function HospitalsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hospitals</h1>
          <p className="text-muted-foreground">Manage hospitals, clinics, and branches across the platform.</p>
        </div>
        <AddHospitalDialog />
      </div>

      <HospitalsTable />
    </div>
  );
}

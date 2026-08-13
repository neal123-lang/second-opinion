import { AddDoctorDialog } from "./_components/add-doctor-dialog";
import { DoctorsTable } from "./_components/doctors-table";

export default function DoctorsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Doctors</h1>
          <p className="text-muted-foreground">Manage doctors and specialists across the platform.</p>
        </div>
        <AddDoctorDialog />
      </div>

      <DoctorsTable />
    </div>
  );
}

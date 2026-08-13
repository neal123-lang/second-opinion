import { HospitalDetails } from "./_components/hospital-details";

export default async function HospitalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <HospitalDetails id={id} />;
}

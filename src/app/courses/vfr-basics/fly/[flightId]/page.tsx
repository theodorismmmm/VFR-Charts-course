import { requireUser } from "@/lib/auth-guard";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FlightSim } from "@/components/flight-sim";
import { getFlight } from "@/lib/flights";

type PageProps = {
  params: Promise<{ flightId: string }>;
};

export default function FlightPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="page-shell page-shell--wide">
          <p className="fly-wait">Setting the radios.</p>
        </div>
      }
    >
      <FlightRoute params={params} />
    </Suspense>
  );
}

async function FlightRoute({ params }: PageProps) {
  await requireUser();
  const { flightId } = await params;
  const flight = getFlight(flightId);
  if (!flight) notFound();
  return (
    <div className="page-shell page-shell--wide">
      <FlightSim flight={flight} />
    </div>
  );
}

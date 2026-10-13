import AvailableTrips from "@/components/sections/AvailableTrips";
import { getAvailableTrips } from "@/lib/trips";

export const metadata = {
  title: "Trip | Tapakswaka",
  description:
    "Semua open trip Tapakswaka yang lagi dibuka — lengkap dengan harga, jadwal, dan fasilitas.",
};

/**
 * "/trips" — full list of available trips (open & confirmed status).
 */
export default async function TripsPage() {
  const trips = await getAvailableTrips();

  return (
    <main className="flex flex-1 flex-col pt-16">
      <AvailableTrips trips={trips} />
    </main>
  );
}

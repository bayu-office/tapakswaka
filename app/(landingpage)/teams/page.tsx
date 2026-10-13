import OurTeams from "@/components/sections/OurTeams";
import { getTeams } from "@/lib/content";

export const metadata = {
  title: "The Clowns | Tapakswaka",
  description:
    "Kenali THE CLOWNS — tim anomali Tapakswaka yang kelihatan kayak pelawak, tapi soal eksekusi trip layaknya tactical strike team.",
};

/**
 * "/teams" — the full team list.
 */
export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <main className="flex flex-1 flex-col pt-16">
      <OurTeams members={teams} />
    </main>
  );
}

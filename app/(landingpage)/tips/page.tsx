import TipsTricks from "@/components/sections/TipsTricks";
import { getTips } from "@/lib/content";

export const metadata = {
  title: "Tips & Trik | Tapakswaka",
  description:
    "Bekal sebelum berangkat — tips packing, budgeting, dan survival dari traveler yang udah duluan jalan.",
};

/**
 * "/tips" — full tips & tricks list.
 */
export default async function TipsPage() {
  const tips = await getTips();

  return (
    <main className="flex flex-1 flex-col pt-16">
      <TipsTricks tips={tips} />
    </main>
  );
}

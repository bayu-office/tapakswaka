import Contact from "@/components/sections/Contact";
import { getContactInfo } from "@/lib/content";

export const metadata = {
  title: "Kontak | Tapakswaka",
  description:
    "Nanya-nanya dulu gratis — chat, DM, atau email Tapakswaka untuk info trip berikutnya.",
};

/**
 * "/contact" — contact info + message form.
 */
export default async function ContactPage() {
  const contacts = await getContactInfo();

  return (
    <main className="flex flex-1 flex-col pt-16">
      <Contact contacts={contacts} />
    </main>
  );
}

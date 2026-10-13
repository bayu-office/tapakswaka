import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Landing page layout — wraps every landing route with Navbar + Footer.
 * Route group `(landingpage)` keeps all routes at the root URL level.
 */
export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}


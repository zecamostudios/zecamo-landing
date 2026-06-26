import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyContactCTA from "@/components/layout/StickyContactCTA";
import Hero from "@/components/sections/Hero";
import Timeline from "@/components/sections/Timeline";
import Services from "@/components/sections/Services";
import Cases from "@/components/sections/Cases";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Services />
        <Cases />
        <Contact />
      </main>
      <Footer />
      <StickyContactCTA />
    </>
  );
}

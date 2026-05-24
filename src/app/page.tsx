import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyContactCTA from "@/components/layout/StickyContactCTA";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import HowWeWork from "@/components/sections/HowWeWork";
import ForWho from "@/components/sections/ForWho";
import Cases from "@/components/sections/Cases";
import Method from "@/components/sections/Method";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowWeWork />
        <ForWho />
        <Cases />
        <Method />
        <Contact />
      </main>
      <Footer />
      <StickyContactCTA />
    </>
  );
}

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AiChat from "@/components/chat/AiChat";
import Hero from "@/components/sections/Hero";
import Timeline from "@/components/sections/Timeline";
import Configurator from "@/components/sections/Configurator";
import Services from "@/components/sections/Services";
import Cases from "@/components/sections/Cases";
import Calculator from "@/components/sections/Calculator";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Configurator />
        <Services />
        <Cases />
        <Calculator />
        <Contact />
      </main>
      <Footer />
      <AiChat />
    </>
  );
}

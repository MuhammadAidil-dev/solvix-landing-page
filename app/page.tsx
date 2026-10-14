import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Hero } from "../components/sections/Hero";
import { Portfolio } from "../components/sections/Portfolio";
import { Process } from "../components/sections/Process";
import { Services } from "../components/sections/Services";
import { Stats } from "../components/sections/Stats";
import { TrustStrip } from "../components/sections/TrustStrip";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <About />
        <Stats />
        <Process />
        <Portfolio />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

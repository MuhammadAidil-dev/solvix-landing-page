import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Contact } from "../components/sections/Contact";
import { Hero } from "../components/sections/Hero";
import { Portfolio } from "../components/sections/Portfolio";
import { Process } from "../components/sections/Process";
import { PullQuote } from "../components/sections/PullQuote";
import { Services } from "../components/sections/Services";
import { Team } from "../components/sections/Team";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PullQuote />
        <Services />
        <Process />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

import Image from "next/image";
import { BrowserFrame } from "../ui/BrowserFrame";
import { BTN_SECONDARY } from "../ui/buttonStyles";
import { Blob, ScribbleRing, Sparkle, Squiggle } from "../ui/Decor";
import { IconArrow } from "../ui/Icon";
import { Mark } from "../ui/Mark";
import { SectionHeading } from "../ui/Section";
import { CASES } from "./data";

export function Portfolio() {
  return (
    <section id="portofolio" className="relative overflow-hidden bg-paper py-24 md:py-28">
      <Blob variant={1} className="-left-32 top-[22%] h-[460px] w-[460px] text-sun" />
      <Blob variant={2} className="-right-32 bottom-[8%] h-[460px] w-[460px] text-mist-deep" />
      <Sparkle className="right-[8%] top-24 h-8 w-8 text-accent" />
      <Sparkle className="bottom-20 left-[6%] h-6 w-6 text-navy" />
      <Squiggle className="left-[44%] top-[44%] hidden h-3 w-28 text-accent/50 lg:block" />
      <ScribbleRing className="right-[6%] top-[48%] h-16 w-16 text-navy/30" />

      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <SectionHeading
          title={
            <>
              Proyek <Mark variant="brush">terpilih</Mark>
            </>
          }
          lead="Dua sistem yang sudah berjalan dan bisa Anda kunjungi langsung."
        />
        <div className="space-y-24">
          {CASES.map((item, i) => (
            <article key={item.title} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <BrowserFrame url={item.href.replace("https://", "").replace(/\/$/, "")}>
                  <div className="relative aspect-video bg-mist">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                </BrowserFrame>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <span className="rounded-full bg-mist px-3 py-1 text-[13px] font-medium text-accent">
                  {item.industry}
                </span>
                <h3 className="mt-5 font-heading text-[clamp(26px,3vw,36px)] font-semibold leading-tight text-navy">
                  {item.title}
                </h3>
                <p className="mt-4 text-[18px] leading-relaxed text-body">{item.description}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${BTN_SECONDARY} mt-8`}
                >
                  Kunjungi situs
                  <IconArrow className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

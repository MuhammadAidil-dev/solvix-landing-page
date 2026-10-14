import { Blob, ScribbleRing, Sparkle, Squiggle, type BlobVariant } from "../ui/Decor";
import { IconArrow } from "../ui/Icon";
import { Mark } from "../ui/Mark";
import { SectionHeading } from "../ui/Section";
import { SERVICES } from "./data";

const CARD_TINTS = [
  { bg: "bg-sky-soft", blob: "text-sky" },
  { bg: "bg-sun-soft", blob: "text-sun-deep" },
  { bg: "bg-mist", blob: "text-mist-deep" },
  { bg: "bg-sky-soft", blob: "text-sky" },
  { bg: "bg-sun-soft", blob: "text-sun-deep" },
];

export function Services() {
  return (
    <section id="layanan" className="relative overflow-hidden bg-cream py-24 md:py-28">
      <Blob variant={2} className="-right-24 -top-16 h-[360px] w-[360px] text-sun" />
      <Blob variant={3} className="-bottom-24 -left-24 h-[320px] w-[320px] text-mist-deep" />
      <Sparkle className="left-[8%] top-24 h-7 w-7 text-accent" />
      <Sparkle className="right-[9%] top-[46%] h-5 w-5 text-navy" />
      <Squiggle className="bottom-12 right-[12%] h-3 w-28 text-accent/50" />
      <ScribbleRing className="bottom-[22%] left-[5%] h-16 w-16 text-navy/30" />

      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <SectionHeading
          title={
            <>
              Lima layanan dalam <Mark variant="brush">satu tim</Mark>
            </>
          }
          lead="Dari rancangan sampai pemeliharaan, semua siklus produk digital Anda ditangani di satu tempat."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s, i) => {
            const tint = CARD_TINTS[i % CARD_TINTS.length];
            return (
              <a
                key={s.title}
                href="#kontak"
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-paper transition-all duration-200 hover:border-accent hover:shadow-[0_16px_40px_-16px_rgba(43,127,255,0.35)] lg:col-span-2 ${
                  i === 3 ? "lg:col-start-2" : ""
                }`}
              >
                <div className={`relative h-[132px] overflow-hidden ${tint.bg}`}>
                  <Blob
                    variant={((i % 3) + 1) as BlobVariant}
                    className={`-right-6 -top-10 h-[190px] w-[190px] ${tint.blob}`}
                  />
                  <Sparkle className="bottom-5 right-8 h-5 w-5 text-accent/70" />
                  <span className="absolute right-6 top-5 font-heading text-[15px] font-semibold text-navy/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`absolute bottom-0 left-7 flex h-[68px] w-[68px] translate-y-1/2 items-center justify-center rounded-2xl text-white ring-4 ring-paper transition-transform duration-200 group-hover:-rotate-6 ${s.tile}`}
                  >
                    <s.icon className="h-8 w-8" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-7 pb-7 pt-12">
                  <h3 className="font-heading text-[21px] font-semibold leading-tight text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[16px] leading-relaxed text-body">{s.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.scope.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-mist px-3 py-1 text-[13px] font-medium text-navy"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-medium text-accent">
                    Diskusikan
                    <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

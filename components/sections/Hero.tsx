import { BTN_PRIMARY, BTN_SECONDARY } from "../ui/buttonStyles";
import { Blob, DoodleArrow, LoopArrow, ScribbleRing, Sparkle, Squiggle } from "../ui/Decor";
import { IconCheck } from "../ui/Icon";
import { Mark } from "../ui/Mark";
import { SERVICES } from "./data";

const TILE_POSITIONS = [
  "left-[7%] top-[12%] -rotate-6",
  "left-[4%] bottom-[14%] rotate-6",
  "right-[8%] top-[10%] rotate-6",
  "right-[3%] top-[48%] -rotate-3",
  "right-[14%] bottom-[8%] rotate-3",
];

function ServiceTile({ index, className }: { index: number; className?: string }) {
  const svc = SERVICES[index];
  return (
    <div className={`text-center ${className ?? ""}`}>
      <span
        className={`mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-2xl text-white ${svc.tile}`}
      >
        <svc.icon className="h-10 w-10" />
      </span>
      <span className="mt-2 block text-[14px] font-medium text-navy">{svc.title}</span>
    </div>
  );
}

/** Dekorasi hero: bentuk flat + tile layanan di tepi (hanya layar lebar). */
function HeroDecor() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Blob
        variant={1}
        className="-right-32 top-4 h-[320px] w-[320px] text-sun md:h-[520px] md:w-[520px]"
      />
      <Blob variant={2} className="-left-28 bottom-[-80px] h-[380px] w-[380px] text-mist-deep" />
      <ScribbleRing className="left-[22%] top-[14%] hidden h-20 w-20 text-accent/50 xl:block" />
      <DoodleArrow className="bottom-[22%] left-[18%] hidden h-12 w-24 rotate-[28deg] text-navy/50 xl:block" />
      <LoopArrow className="right-[20%] top-[40%] hidden h-14 w-24 -rotate-12 text-accent/60 xl:block" />
      <Sparkle className="right-[22%] top-[12%] h-7 w-7 text-accent" />
      <Sparkle className="left-[16%] top-[44%] h-5 w-5 text-navy" />
      <Sparkle className="bottom-[10%] right-[30%] h-6 w-6 text-accent" />
      <Squiggle className="bottom-[6%] left-[10%] hidden h-3 w-24 text-navy/40 lg:block" />
      <div className="hidden xl:block">
        {TILE_POSITIONS.map((pos, i) => (
          <ServiceTile key={i} index={i} className={`absolute ${pos}`} />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="atas"
      className="relative flex min-h-[calc(100dvh-68px)] items-center overflow-hidden bg-paper"
    >
      <HeroDecor />
      <div className="relative mx-auto flex w-full max-w-[860px] flex-col items-center px-6 py-16 text-center md:py-20">
        <h1 className="font-heading text-[clamp(38px,5.2vw,64px)] font-semibold leading-[1.1] tracking-[-0.02em]">
          Kami membangun <Mark variant="underline">sistem digital</Mark> sesuai kebutuhan bisnis
          Anda.
        </h1>
        <p className="mt-8 max-w-[600px] text-[20px] leading-relaxed text-body">
          Jasa pembuatan aplikasi dan software di Riau: dari analisis kebutuhan sampai sistem
          berjalan dan terawat.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#kontak" className={BTN_PRIMARY}>
            Hubungi Kami
          </a>
          <a href="#layanan" className={BTN_SECONDARY}>
            Lihat Layanan
          </a>
        </div>
        <p className="mt-5 flex items-center gap-2 text-[15px] text-muted">
          <IconCheck className="h-4 w-4 text-accent" />
          Ceritakan kendala operasional usaha anda, kami bantu petakan solusinya
        </p>
        <div className="mt-14 flex flex-wrap justify-center gap-6 xl:hidden">
          {SERVICES.map((_, i) => (
            <ServiceTile key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

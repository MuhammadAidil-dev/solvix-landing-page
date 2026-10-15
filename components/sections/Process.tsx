import { Blob, LoopArrow, Sparkle } from "../ui/Decor";
import { Mark } from "../ui/Mark";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/Section";
import { STEPS } from "./data";

export function Process() {
  return (
    <section id="proses" className="relative overflow-hidden bg-paper py-24 md:py-28">
      <Blob variant={3} className="-left-32 top-10 h-[300px] w-[300px] text-mist-deep/70" />
      <Blob variant={1} className="-right-28 bottom-0 h-[320px] w-[320px] text-sun" />
      <Sparkle className="right-[10%] top-20 h-7 w-7 text-accent" />
      <Sparkle className="bottom-24 left-[12%] h-5 w-5 text-navy" />
      <LoopArrow className="left-[8%] top-16 hidden h-14 w-24 text-accent/60 lg:block" />

      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <SectionHeading
          title={
            <>
              Alur kerja yang <Mark variant="underline">terstruktur</Mark>
            </>
          }
          lead="Setiap proyek melewati lima tahap yang sama, dengan hasil yang bisa Anda tinjau di tiap tahap."
        />
        <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          <div
            className="absolute left-[10%] right-[10%] top-7 hidden border-t-2 border-dashed border-accent/30 lg:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <li key={step.num} className="relative text-center">
              <Reveal step={i}>
                <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent font-heading text-[18px] font-semibold text-white ring-8 ring-paper">
                  {step.num}
                </span>
                <h3 className="mt-5 font-heading text-[18px] font-semibold leading-snug text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-body">{step.description}</p>
                <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {step.outputs.map((output) => (
                    <li
                      key={output}
                      className="rounded-full bg-mist px-3 py-1 text-[13px] font-medium text-navy"
                    >
                      {output}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

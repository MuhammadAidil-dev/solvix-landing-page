import { Reveal } from "../ui/Reveal";
import { STATS } from "./data";

export function Stats() {
  return (
    <section className="border-y border-hairline bg-cream py-16">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-2 gap-y-10 px-6 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            step={i}
            className={`text-center ${i > 0 ? "lg:border-l lg:border-hairline" : ""}`}
          >
            <div className="font-heading text-[clamp(44px,5vw,64px)] font-semibold leading-none text-accent">
              {stat.value}
            </div>
            <div className="mt-3 text-[16px] text-body">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

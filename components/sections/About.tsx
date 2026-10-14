import { Blob, ScribbleRing, Sparkle } from "../ui/Decor";
import { Mark } from "../ui/Mark";
import { BUSINESS_LINES, PROFILE } from "./data";

export function About() {
  return (
    <section id="tentang" className="relative overflow-hidden bg-paper py-24 md:py-28">
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.15] tracking-[-0.015em]">
            Perusahaan <Mark variant="circle">resmi</Mark> dan terdaftar
          </h2>
          <p className="mt-6 text-[18px] leading-relaxed text-body">
            PT TOP SOLVIX LABS adalah perusahaan pengembangan perangkat lunak berbadan hukum,
            berdomisili di Tembilahan, Riau.
          </p>
          <ul className="mt-8 space-y-5">
            {BUSINESS_LINES.map((line) => (
              <li key={line.title} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mist text-accent">
                  <line.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-[17px] font-semibold leading-snug text-navy">
                    {line.title}
                  </h3>
                  <p className="mt-0.5 text-[16px] leading-relaxed text-body">{line.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <Blob variant={1} className="-bottom-16 -left-20 h-[420px] w-[420px] text-sun" />
          <Sparkle className="-right-4 -top-6 h-8 w-8 text-accent" />
          <ScribbleRing className="-bottom-6 right-6 h-16 w-16 text-navy/30" />
          <div className="relative overflow-hidden rounded-xl border border-hairline bg-paper shadow-[0_12px_40px_-12px_rgba(11,37,69,0.18)]">
            <div className="flex items-center justify-between bg-navy px-7 py-5">
              <h3 className="font-heading text-[18px] font-semibold text-white">
                Profil Perusahaan
              </h3>
              <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-medium text-white">
                Terdaftar
              </span>
            </div>
            <dl className="px-7 py-2">
              {PROFILE.map((row) => (
                <div
                  key={row.label}
                  className="flex items-start gap-4 border-t border-hairline py-4 first:border-t-0"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mist text-accent">
                    <row.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[13px] font-medium text-muted">{row.label}</dt>
                    <dd className="mt-0.5 break-words font-heading text-[17px] font-medium leading-snug text-navy">
                      {row.value}
                    </dd>
                    <dd className="mt-0.5 text-[14px] leading-snug text-body">{row.note}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

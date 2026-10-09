import { Crosses, DotsBg, GridBg, Rings } from "../ui/Decor";
import { Spot, type SpotName } from "../ui/Illustration";
import { Section } from "../ui/Section";

// PLACEHOLDER COPY — ganti sebelum situs dianggap final (spec §5.1).
const STEPS: {
  title: string;
  description: string;
  spot: SpotName;
  outputs: string[];
}[] = [
  {
    title: "Discovery & Analisis",
    description:
      "Kami memahami masalah bisnis Anda, lalu menyepakati kebutuhan dan batasan proyek.",
    spot: "discovery",
    outputs: ["Dokumen requirement", "Scope proyek"],
  },
  {
    title: "Desain Sistem",
    description: "Arsitektur, basis data, dan keputusan teknis ditetapkan sebelum penulisan kode.",
    spot: "design",
    outputs: ["Arsitektur sistem", "Skema basis data", "Desain antarmuka"],
  },
  {
    title: "Pengembangan",
    description: "Sistem dibangun bertahap dan ditinjau bersama secara rutin.",
    spot: "code",
    outputs: ["Rilis bertahap", "Review rutin"],
  },
  {
    title: "Pengujian",
    description: "Fungsi, performa, dan keamanan diuji sebelum sistem diluncurkan.",
    spot: "testing",
    outputs: ["Uji fungsional", "Uji performa", "Uji keamanan"],
  },
  {
    title: "Deploy & Pendampingan",
    description: "Sistem diluncurkan, dipantau, dan kami dampingi selama masa operasional awal.",
    spot: "deploy",
    outputs: ["Peluncuran", "Monitoring", "Pendampingan"],
  },
];

export function Process() {
  return (
    <Section
      id="proses"
      tone="paper"
      decor={
        <>
          <GridBg />
          <Rings className="-right-40 top-24 h-[480px] w-[480px] text-navy/[0.08]" />
          <DotsBg className="-left-20 bottom-10 hidden h-[360px] w-[360px] lg:block" />
          <Crosses className="right-10 bottom-16 hidden text-navy/25 lg:block" />
        </>
      }
      eyebrow="Proses"
      heading={
        <>
          Alur kerja yang <em>terstruktur</em> dan bisa dipantau.
        </>
      }
      subheading="Setiap proyek melewati lima tahap yang sama, dengan hasil yang bisa Anda tinjau di tiap tahap."
    >
      <ol className="mx-auto max-w-[960px]">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="reveal grid items-center gap-x-8 gap-y-5 border-t border-hairline py-10 last:border-b md:grid-cols-[96px_1fr_140px]"
          >
            <p className="font-serif text-[56px] italic leading-none text-accent">
              {String(i + 1).padStart(2, "0")}
            </p>

            <div>
              <h3 className="text-[22px] font-normal leading-[1.2] tracking-[-0.015em]">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-[540px] text-[16px] font-light text-body">
                {step.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  Hasil
                </span>
                {step.outputs.map((output) => (
                  <span
                    key={output}
                    className="rounded-[4px] border border-hairline bg-cream px-3 py-1.5 text-[13px] font-light text-body"
                  >
                    {output}
                  </span>
                ))}
              </div>
            </div>

            <Spot name={step.spot} className="hidden h-[72px] w-full text-navy md:block" />
          </li>
        ))}
      </ol>
    </Section>
  );
}

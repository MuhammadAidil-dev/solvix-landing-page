import { Section } from "../ui/Section";

// PLACEHOLDER COPY — ganti sebelum situs dianggap final (spec §5.1).
const STEPS = [
  {
    title: "Discovery & Analisis",
    description:
      "Memahami masalah bisnis, memetakan requirement, dan menyusun scope bersama klien.",
  },
  {
    title: "Desain Sistem",
    description: "Merancang arsitektur, basis data, serta keputusan teknis sebelum kode ditulis.",
  },
  {
    title: "Pengembangan",
    description: "Implementasi bertahap dengan review rutin agar arah tetap sesuai.",
  },
  {
    title: "Pengujian",
    description: "Quality assurance menyeluruh: fungsional, performa, dan keamanan.",
  },
  {
    title: "Deploy & Pendampingan",
    description: "Peluncuran, monitoring, serta pendampingan operasional.",
  },
];

export function Process() {
  return (
    <Section
      id="proses"
      eyebrow="Proses"
      heading={
        <>
          Alur kerja yang <em>transparan</em> dan bisa dilacak.
        </>
      }
      subheading="Setiap proyek berjalan melalui lima tahap yang sama."
    >
      <div className="mx-auto max-w-[900px]">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="grid gap-4 border-t border-hairline py-11 last:border-b md:grid-cols-[120px_1fr] md:gap-10"
          >
            <p className="font-serif text-[44px] italic leading-none text-accent">
              {String(i + 1).padStart(2, "0")}
            </p>
            <div>
              <h3 className="text-[22px] font-normal leading-[1.2] tracking-[-0.015em]">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-[640px] text-[16px] font-light text-body">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

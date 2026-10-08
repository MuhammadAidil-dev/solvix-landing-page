import { Section } from "../ui/Section";

// PLACEHOLDER COPY — ganti sebelum situs dianggap final (spec §5.1).
const SERVICES = [
  {
    title: "Pengembangan Web App",
    description:
      "Aplikasi web kustom dengan arsitektur scalable, dokumentasi teknis, dan mudah dirawat tim Anda.",
  },
  {
    title: "Aplikasi Mobile",
    description:
      "Build native dan cross-platform untuk iOS serta Android dengan pengalaman pengguna yang mulus.",
  },
  {
    title: "Integrasi Sistem",
    description:
      "Menghubungkan sistem legacy, API pihak ketiga, dan basis data internal menjadi satu alur yang utuh.",
  },
  {
    title: "Dashboard & Analitik",
    description:
      "Visualisasi data operasional agar keputusan bisnis diambil lebih cepat dan berbasis bukti.",
  },
  {
    title: "Automasi Proses",
    description: "Menghilangkan pekerjaan manual berulang melalui otomasi alur kerja yang andal.",
  },
  {
    title: "Pemeliharaan & Support",
    description:
      "Monitoring, perbaikan bug, dan peningkatan performa berkelanjutan setelah sistem berjalan.",
  },
];

const NUMERALS = ["i.", "ii.", "iii.", "iv.", "v.", "vi."];

export function Services() {
  return (
    <Section
      id="layanan"
      eyebrow="Layanan"
      heading={
        <>
          Enam layanan untuk <em>siklus hidup</em> produk digital Anda.
        </>
      }
      subheading="Dari riset kebutuhan sampai pemeliharaan berkelanjutan."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {SERVICES.map((service, i) => (
          <article
            key={service.title}
            className="rounded-[6px] border border-hairline bg-paper p-7 transition-colors duration-200 hover:border-navy md:p-11 md:px-[38px]"
          >
            <p className="mb-5 font-serif text-xl italic text-accent">{NUMERALS[i]}</p>
            <h3 className="text-[20px] font-medium leading-[1.25] tracking-[-0.012em]">
              {service.title}
            </h3>
            <p className="mt-3 text-[15.5px] font-light leading-[1.7] text-body">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

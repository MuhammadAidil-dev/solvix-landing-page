import { Crosses, DotsBg, Rings } from "../ui/Decor";
import { Spot, type SpotName } from "../ui/Illustration";
import { Section } from "../ui/Section";

// PLACEHOLDER COPY — ganti sebelum situs dianggap final (spec §5.1).
const SERVICES: {
  title: string;
  description: string;
  spot: SpotName;
  scope: string[];
}[] = [
  {
    title: "Aplikasi Web",
    description: "Aplikasi web kustom yang terdokumentasi dan mudah dirawat tim Anda.",
    spot: "web",
    scope: ["Dashboard admin", "Portal pelanggan", "Aplikasi internal"],
  },
  {
    title: "Aplikasi Mobile",
    description: "Aplikasi iOS dan Android, native maupun cross-platform.",
    spot: "mobile",
    scope: ["iOS", "Android", "Cross-platform"],
  },
  {
    title: "Integrasi Sistem",
    description:
      "Menghubungkan sistem lama, API pihak ketiga, dan basis data internal dalam satu alur.",
    spot: "integration",
    scope: ["REST API", "Sistem legacy", "Sinkronisasi data"],
  },
  {
    title: "Dashboard & Analitik",
    description:
      "Data operasional ditampilkan jelas, sehingga keputusan bisnis lebih cepat diambil.",
    spot: "dashboard",
    scope: ["Laporan real-time", "Visualisasi data", "Ekspor laporan"],
  },
  {
    title: "Otomasi Proses",
    description: "Pekerjaan manual yang berulang dialihkan ke alur kerja otomatis.",
    spot: "automation",
    scope: ["Alur kerja", "Notifikasi otomatis", "Penjadwalan tugas"],
  },
  {
    title: "Pemeliharaan & Support",
    description: "Monitoring, perbaikan bug, dan peningkatan performa setelah sistem berjalan.",
    spot: "support",
    scope: ["Monitoring", "Perbaikan bug", "Optimasi performa"],
  },
];

const NUMERALS = ["i.", "ii.", "iii.", "iv.", "v.", "vi."];

export function Services() {
  return (
    <Section
      id="layanan"
      decor={
        <>
          <Rings className="-left-48 top-1/3 h-[520px] w-[520px] text-navy/[0.07]" />
          <Rings className="-right-40 bottom-10 h-[380px] w-[380px] text-accent/[0.12]" />
          <DotsBg className="right-0 top-24 hidden h-[360px] w-[360px] lg:block" />
          <Crosses className="left-8 top-16 hidden text-navy/25 lg:block" />
        </>
      }
      eyebrow="Layanan"
      heading={
        <>
          Enam layanan, dari <em>rancangan</em> sampai pemeliharaan.
        </>
      }
      subheading="Satu tim menangani seluruh siklus produk digital Anda."
    >
      <ol className="mx-auto max-w-[960px]">
        {SERVICES.map((service, i) => (
          <li
            key={service.title}
            className="reveal grid items-center gap-x-8 gap-y-5 border-t border-hairline py-9 last:border-b md:grid-cols-[96px_1fr_140px]"
          >
            <p className="font-serif text-[56px] italic leading-none text-navy">{NUMERALS[i]}</p>

            <div>
              <h3 className="text-[22px] font-normal leading-[1.2] tracking-[-0.015em]">
                {service.title}
              </h3>
              <p className="mt-2.5 max-w-[540px] text-[16px] font-light text-body">
                {service.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.scope.map((item) => (
                  <li
                    key={item}
                    className="rounded-[4px] border border-hairline bg-paper px-3 py-1.5 text-[13px] font-light text-body"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Spot name={service.spot} className="hidden h-[72px] w-full text-navy md:block" />
          </li>
        ))}
      </ol>
    </Section>
  );
}

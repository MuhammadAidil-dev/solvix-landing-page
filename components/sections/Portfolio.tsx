import { Section } from "../ui/Section";

// PLACEHOLDER COPY + ANGKA FAKTIF — ganti sebelum situs dianggap final (spec §5.1).
// `metric` saat ini adalah data rekaan. DESIGN.md §7 melarang klaim yang tidak
// bisa dibuktikan; jangan loloskan angka ini ke produksi.
const CASES = [
  {
    industry: "Logistik",
    title: "Sistem Manajemen Distribusi",
    description: "Pemantauan armada dan stok real-time untuk operator logistik nasional.",
    metric: "−40%",
    metricLabel: "waktu operasional",
  },
  {
    industry: "Fintech",
    title: "Portal Rekonsiliasi",
    description: "Otomatisasi pencocokan transaksi keuangan harian antar bank.",
    metric: "12 juta",
    metricLabel: "transaksi per bulan",
  },
  {
    industry: "Manufaktur",
    title: "Dashboard Produksi",
    description: "Monitoring mesin dan kualitas produksi langsung dari lantai pabrik.",
    metric: "99,9%",
    metricLabel: "ketersediaan sistem",
  },
];

export function Portfolio() {
  return (
    <Section
      id="portofolio"
      eyebrow="Portofolio"
      heading={
        <>
          Proyek <em>terpilih</em>.
        </>
      }
      subheading="Contoh hasil kerja pada beberapa industri."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {CASES.map((item, i) => (
          <article
            key={item.title}
            className="flex flex-col overflow-hidden rounded-[6px] border border-hairline bg-paper"
          >
            <div className="flex h-[170px] items-center justify-center bg-gradient-to-br from-[#EEF3FA] to-[#DCE7F5]">
              <span className="font-serif text-[44px] italic text-accent opacity-50">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-7">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted">
                {item.industry}
              </p>
              <h3 className="mt-3 text-[19px] font-medium leading-[1.25] tracking-[-0.012em]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] font-light leading-[1.7] text-body">
                {item.description}
              </p>

              <div className="mt-auto pt-6">
                <p className="text-[26px] font-light tracking-[-0.02em]">
                  <em>{item.metric}</em>
                </p>
                <p className="text-[13.5px] font-light text-muted">{item.metricLabel}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

import { Crosses, GridBg, Rings } from "../ui/Decor";
import { Icon, type IconName } from "../ui/Icon";
import { AboutBlueprint, Spot, type SpotName } from "../ui/Illustration";
import { Section } from "../ui/Section";

const FACTS: { icon: IconName; label: string; value: string }[] = [
  { icon: "building", label: "Badan hukum", value: "PT TOP SOLVIX LABS" },
  { icon: "file", label: "Akta pendirian", value: "Nomor 22, 19 Agustus 2026" },
  { icon: "pin", label: "Domisili", value: "Tembilahan, Kab. Indragiri Hilir, Riau" },
];

// Bidang usaha sesuai akta pendirian.
const BUSINESS_LINES: { title: string; description: string; spot: SpotName }[] = [
  {
    title: "Pengembangan perangkat lunak",
    description: "Aplikasi bisnis, web, dan basis data yang dibuat sesuai kebutuhan klien.",
    spot: "code",
  },
  {
    title: "Pengembangan e-commerce",
    description: "Aplikasi toko online untuk jual-beli barang dan jasa lewat internet.",
    spot: "cart",
  },
  {
    title: "Konsultansi & perancangan IoT",
    description: "Perangkat berbasis sensor dan mikrokontroler yang dirancang sesuai pesanan.",
    spot: "iot",
  },
  {
    title: "Penerbitan perangkat lunak",
    description: "Aplikasi siap pakai, termasuk aplikasi bisnis dan teknologi finansial.",
    spot: "publish",
  },
  {
    title: "Perdagangan eceran perangkat lunak",
    description: "Penjualan perangkat lunak eceran bagi pengguna akhir.",
    spot: "retail",
  },
];

const NUMERALS = ["i.", "ii.", "iii.", "iv.", "v."];

export function About() {
  return (
    <Section
      id="tentang"
      tone="mist"
      decor={
        <>
          <GridBg />
          <Rings className="-right-32 -top-32 h-[460px] w-[460px] text-navy/[0.09]" />
          <Rings className="-bottom-40 -left-32 h-[420px] w-[420px] text-accent/[0.14]" />
          <Crosses className="bottom-10 right-8 hidden text-navy/25 lg:block" />
        </>
      }
      eyebrow="Tentang Kami"
      heading={
        <>
          Membangun sistem digital untuk kebutuhan <em>operasional</em> bisnis.
        </>
      }
      subheading="PT TOP SOLVIX LABS adalah perusahaan pengembangan perangkat lunak berbadan hukum, berdomisili di Tembilahan, Riau."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[5fr_7fr]">
        {/* Profil: ilustrasi + buku besar fakta perusahaan. */}
        <article className="reveal rounded-[6px] border border-hairline bg-paper p-3.5">
          <div className="rounded-[4px] border border-hairline bg-cream p-5">
            <AboutBlueprint className="h-auto w-full" />
          </div>

          <div className="px-4 pb-3 pt-7 md:px-5">
            <p className="font-serif text-[22px] italic leading-none text-accent">Profil</p>
            <dl className="mt-5">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-start gap-4 border-t border-hairline py-4 last:pb-2"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-hairline bg-cream text-navy">
                    <Icon name={fact.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <dt className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-[16px] font-light leading-[1.5] text-text">
                      {fact.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </article>

        {/* Bidang usaha: baris bernomor, gaya yang sama dengan Layanan. */}
        <div className="reveal">
          <p className="font-serif text-[22px] italic leading-none text-accent">Bidang usaha</p>
          <ol className="mt-5">
            {BUSINESS_LINES.map((line, i) => (
              <li
                key={line.title}
                className="grid items-center gap-x-6 gap-y-3 border-t border-hairline py-6 last:border-b sm:grid-cols-[56px_1fr_104px]"
              >
                <p className="font-serif text-[36px] italic leading-none text-navy">
                  {NUMERALS[i]}
                </p>
                <div>
                  <h3 className="text-[18px] font-normal leading-[1.25] tracking-[-0.012em]">
                    {line.title}
                  </h3>
                  <p className="mt-1.5 text-[15.5px] font-light leading-[1.7] text-body">
                    {line.description}
                  </p>
                </div>
                <Spot name={line.spot} className="hidden h-[52px] w-full text-navy sm:block" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

import { Icon, type IconName } from "../ui/Icon";
import { HeroBlueprint } from "../ui/Illustration";
import { Container } from "../ui/Section";

// Bidang usaha sesuai akta pendirian — bukan klaim angka.
const CAPABILITIES: { icon: IconName; label: string }[] = [
  { icon: "web", label: "Web & Aplikasi" },
  { icon: "cart", label: "E-commerce" },
  { icon: "iot", label: "IoT" },
  { icon: "integration", label: "Integrasi Sistem" },
];

export function Hero() {
  return (
    <section
      id="atas"
      className="relative flex min-h-[calc(100dvh_-_76px)] items-center overflow-hidden py-20 md:py-24"
    >
      <div aria-hidden="true" className="hero-motif pointer-events-none absolute inset-0" />

      <Container>
        <div className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Pengembangan Software
            </p>

            <h1 className="text-[clamp(34px,4.6vw,56px)] font-light leading-[1.12] tracking-[-0.028em]">
              Masalah operasional, kami ubah menjadi <em>sistem digital</em> yang berjalan.
            </h1>

            <p className="mt-6 max-w-[520px] text-[18px] font-light text-body">
              PT TOP SOLVIX LABS membangun perangkat lunak kustom dengan dokumentasi jelas dan
              dukungan jangka panjang.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#kontak"
                className="inline-flex items-center gap-2 rounded-[4px] bg-navy px-8 py-[15px] text-[15px] font-medium text-paper transition-colors duration-200 hover:bg-navy-soft"
              >
                Mulai Diskusi
                <Icon name="arrow" className="h-4 w-4" />
              </a>
              <a
                href="#portofolio"
                className="px-1 pb-[2px] text-[15px] text-accent underline decoration-2 underline-offset-4"
              >
                Lihat Portofolio
              </a>
            </div>

            <ul className="mt-10 flex max-w-[520px] flex-wrap items-center gap-x-8 gap-y-4 border-t border-hairline pt-6">
              {CAPABILITIES.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5 text-[14.5px] text-body">
                  <Icon name={item.icon} className="h-5 w-5 text-navy" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[6px] border border-hairline bg-cream p-4 md:p-6">
            <HeroBlueprint className="h-auto w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}

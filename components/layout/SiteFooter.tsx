import Image from "next/image";
import { Container } from "../ui/Section";

export function SiteFooter() {
  return (
    <footer className="relative bg-navy py-14 text-[14px] text-white/65">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent/40" />
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3">
            <Image
              src="/brand/logo-on-navy.png"
              alt="Top Solvix Labs"
              width={140}
              height={26}
              className="opacity-90"
            />
            <p className="text-white/55">© 2026 PT TOP SOLVIX LABS</p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-2">
            <a href="#tentang" className="transition-colors duration-150 hover:text-white">
              Tentang
            </a>
            <a href="#layanan" className="transition-colors duration-150 hover:text-white">
              Layanan
            </a>
            <a href="#proses" className="transition-colors duration-150 hover:text-white">
              Proses
            </a>
            <a href="#portofolio" className="transition-colors duration-150 hover:text-white">
              Portofolio
            </a>
            <a href="#kontak" className="transition-colors duration-150 hover:text-white">
              Kontak
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

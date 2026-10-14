import Image from "next/image";
import { EMAIL, PHONE_LABEL, SERVICES } from "../sections/data";

const COMPANY_LINKS = [
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#proses", label: "Cara Kerja" },
  { href: "#portofolio", label: "Portofolio" },
  { href: "#kontak", label: "Kontak" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy pb-10 pt-16 text-white/65">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/brand/logo-on-navy.png" alt="Top Solvix Labs" width={154} height={40} />
            <p className="mt-6 max-w-[320px] text-[15px] leading-relaxed">
              Perusahaan pengembangan perangkat lunak berbadan hukum, berdomisili di Tembilahan,
              Riau.
            </p>
          </div>
          <div>
            <h4 className="mb-5 font-heading text-[16px] font-semibold text-white">Layanan</h4>
            <ul className="space-y-3 text-[15px]">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a href="#layanan" className="transition-colors hover:text-white">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 font-heading text-[16px] font-semibold text-white">Perusahaan</h4>
            <ul className="space-y-3 text-[15px]">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 font-heading text-[16px] font-semibold text-white">Kontak</h4>
            <ul className="space-y-3 text-[15px]">
              <li>{EMAIL}</li>
              <li>{PHONE_LABEL}</li>
              <li>Tembilahan, Riau</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-7 text-[14px]">
          © 2026 PT TOP SOLVIX LABS. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}

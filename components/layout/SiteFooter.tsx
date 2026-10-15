import Image from "next/image";
import { IconInstagram, IconTiktok } from "../ui/Icon";
import { EMAIL, INSTAGRAM_HREF, PHONE_LABEL, SERVICES, TIKTOK_HREF } from "../sections/data";

const SOCIAL_LINKS = [
  { href: INSTAGRAM_HREF, label: "Instagram Top Solvix Labs", icon: IconInstagram },
  { href: TIKTOK_HREF, label: "TikTok Top Solvix Labs", icon: IconTiktok },
];

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
            <ul className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white hover:text-white"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
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

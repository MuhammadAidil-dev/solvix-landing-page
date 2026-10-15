import { DotsPattern, Sparkle } from "../ui/Decor";
import { IconWhatsapp } from "../ui/Icon";
import { Mark } from "../ui/Mark";
import { Reveal } from "../ui/Reveal";
import { EMAIL, WHATSAPP_HREF } from "./data";

export function Contact() {
  return (
    <section id="kontak" className="relative overflow-hidden bg-navy py-24 md:py-28">
      <Sparkle className="left-[12%] top-24 h-8 w-8 text-accent" />
      <Sparkle className="bottom-24 right-[14%] h-6 w-6 text-white/60" />
      <DotsPattern id="contact-dots-l" className="-left-6 top-10 h-40 w-40 text-white/10" />
      <DotsPattern id="contact-dots-r" className="-right-6 bottom-10 h-40 w-40 text-white/10" />
      <div className="relative mx-auto w-full max-w-[1240px] px-6 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[760px] font-heading text-[clamp(32px,4.4vw,52px)] font-semibold leading-[1.12] tracking-[-0.015em] text-white">
            Ceritakan{" "}
            <Mark variant="underline" tone="light">
              masalah
            </Mark>{" "}
            Anda kepada kami
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[18px] leading-relaxed text-white/70">
            Kirim pesan lewat WhatsApp atau email. Konsultasi gratis, dan kami balas dalam 1×24 jam
            kerja.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[48px] items-center gap-2.5 rounded-md bg-accent px-7 text-[16px] font-medium text-white transition-colors hover:bg-white hover:text-navy"
            >
              <IconWhatsapp className="h-5 w-5" />
              Hubungi via WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-[48px] items-center gap-2.5 rounded-md border border-white/40 px-7 text-[16px] font-medium text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {EMAIL}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

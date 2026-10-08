import { Section } from "../ui/Section";

// PLACEHOLDER — ganti WhatsApp dan email dengan kontak asli (spec §5.1).
const WHATSAPP_HREF = "#";
const EMAIL = "kontak@topsolvixlabs.co.id";

export function Contact() {
  return (
    <Section
      id="kontak"
      eyebrow="Kontak"
      heading={
        <>
          Ceritakan <em>masalah</em> Anda kepada kami.
        </>
      }
      subheading="Kami akan merespons dalam 1×24 jam kerja dengan konsultasi awal."
    >
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <a
          href={WHATSAPP_HREF}
          className="rounded-[4px] bg-navy px-8 py-[15px] text-[15px] font-medium text-paper transition-colors duration-200 hover:bg-navy-soft"
        >
          Hubungi via WhatsApp
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="px-1 pb-[2px] text-[15px] text-accent underline decoration-2 underline-offset-4"
        >
          {EMAIL}
        </a>
      </div>

      <p className="mt-14 text-center text-[14px] font-light text-muted">Jakarta, Indonesia</p>
    </Section>
  );
}

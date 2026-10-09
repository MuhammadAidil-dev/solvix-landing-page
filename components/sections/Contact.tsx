import { GridBg, Rings } from "../ui/Decor";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";

const WHATSAPP_HREF = "https://wa.me/6282282873453";
const EMAIL = "business@topsolvixlabs.my.id";

export function Contact() {
  return (
    <Section
      id="kontak"
      tone="navy"
      decor={
        <>
          <GridBg light />
          <Rings className="-left-40 -top-40 h-[520px] w-[520px] text-white/[0.09]" />
          <Rings className="-bottom-48 -right-40 h-[560px] w-[560px] text-accent/25" />
        </>
      }
      eyebrow="Kontak"
      heading={
        <>
          Ceritakan <em>masalah</em> Anda kepada kami.
        </>
      }
      subheading="Kirim pesan lewat WhatsApp atau email. Kami membalas dalam 1×24 jam kerja dan memulai dengan konsultasi awal."
    >
      <div className="reveal relative mx-auto max-w-[760px] overflow-hidden rounded-[6px] border border-white/15 bg-white/[0.04] px-6 py-12 text-center md:px-12 md:py-14">
        <div className="relative flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-[4px] bg-paper px-8 py-[15px] text-[15px] font-medium text-navy transition-colors duration-200 hover:bg-cream"
          >
            <Icon name="chat" className="h-5 w-5" />
            Hubungi via WhatsApp
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 px-1 pb-[2px] text-[15px] text-paper underline decoration-accent decoration-2 underline-offset-4"
          >
            <Icon name="mail" className="h-5 w-5" />
            {EMAIL}
          </a>
        </div>

        <p className="relative mt-10 inline-flex items-center justify-center gap-2 border-t border-white/15 pt-6 text-[14px] font-light text-white/60">
          <Icon name="pin" className="h-4 w-4" />
          Tembilahan, Indragiri Hilir, Riau
        </p>
      </div>
    </Section>
  );
}

import Image from "next/image";
import { DotsBg, GridBg, Rings } from "../ui/Decor";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";

const CASES = [
  {
    industry: "Manajemen Gym",
    title: "TOP GYM",
    description:
      "Sistem berbasis cloud untuk mengelola gym: member, absensi, pembayaran, kelas, fasilitas, akses pintu, dan laporan bisnis.",
    href: "https://topgym.my.id/",
    image: "/portfolio/topgym-landing.png",
    imageAlt: "Tampilan halaman utama TOP GYM",
  },
  {
    industry: "Ritel",
    title: "Solvix Retail",
    description:
      "Toko online dengan katalog, keranjang belanja, pelacakan pesanan, dan program member dengan harga khusus.",
    href: "https://solvixretail.my.id/",
    image: "/portfolio/solvix-retail-landing.png",
    imageAlt: "Tampilan halaman utama Solvix Retail",
  },
];

export function Portfolio() {
  return (
    <Section
      id="portofolio"
      tone="mist"
      decor={
        <>
          <GridBg />
          <Rings className="left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 text-navy/[0.07]" />
          <DotsBg className="-right-16 top-10 hidden h-[320px] w-[320px] lg:block" />
          <DotsBg className="-left-16 bottom-10 hidden h-[320px] w-[320px] lg:block" />
        </>
      }
      eyebrow="Portofolio"
      heading={
        <>
          Proyek <em>terpilih</em>.
        </>
      }
      subheading="Dua sistem yang sudah berjalan dan bisa Anda kunjungi langsung."
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-8">
        {CASES.map((item, i) => (
          <figure key={item.title} className="reveal group flex flex-col">
            {/* Dicetak seperti gambar majalah: bingkai kertas tipis + keterangan. */}
            <div className="rounded-[2px] border border-hairline bg-paper p-3.5">
              <div className="relative aspect-video overflow-hidden border border-hairline bg-[#EEF3FA]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 768px) 540px, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>

            <figcaption className="mt-5 flex flex-1 flex-col">
              <p className="flex items-baseline gap-3 text-[12px] font-medium uppercase tracking-[0.2em] text-muted">
                <span className="font-serif text-[17px] font-normal normal-case italic tracking-[-0.01em] text-accent">
                  Gbr. {i + 1}
                </span>
                {item.industry}
              </p>
              <h3 className="mt-3 text-[22px] font-normal leading-[1.2] tracking-[-0.015em]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[16px] font-light leading-[1.7] text-body">
                {item.description}
              </p>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-[15px] text-accent underline decoration-2 underline-offset-4"
              >
                Kunjungi situs
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

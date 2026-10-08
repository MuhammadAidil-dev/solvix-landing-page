import { Container } from "../ui/Section";

export function Hero() {
  return (
    <section id="atas" className="pt-24 md:pt-32">
      <Container>
        <div className="mx-auto max-w-[840px] text-center">
          <p className="mb-7 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Perusahaan Pengembangan Software
          </p>

          <h1 className="text-[clamp(36px,5.6vw,66px)] font-light leading-[1.1] tracking-[-0.028em]">
            Masalah bisnis yang rumit, kami ubah menjadi <em>solusi digital</em> yang sederhana dan
            berjalan.
          </h1>

          <p className="mx-auto mt-[30px] max-w-[600px] text-[18.5px] font-light text-body">
            PT TOP SOLVIX LABS merancang perangkat lunak kustom bagi bisnis yang membutuhkan sistem
            andal, dokumentasi jelas, dan dukungan jangka panjang.
          </p>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#kontak"
              className="rounded-[4px] bg-navy px-8 py-[15px] text-[15px] font-medium text-paper transition-colors duration-200 hover:bg-navy-soft"
            >
              Mulai Diskusi
            </a>
            <a
              href="#portofolio"
              className="px-1 pb-[2px] text-[15px] text-accent underline decoration-2 underline-offset-4"
            >
              Lihat Portofolio
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

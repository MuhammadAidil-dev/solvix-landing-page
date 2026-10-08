import type { ReactNode } from "react";

/**
 * Section wrapper — DESIGN.md §5.
 *
 * Bagian ini hanya menangani spacing dan max-width. Tidak ada warna background
 * di sini: pemisahan antar section datang dari jarak, bukan dari blok warna
 * (DESIGN.md §6).
 *
 * Heading/subheading sengaja lewat props, bukan children, supaya jarak
 * eyebrow → heading → subheading → konten selalu konsisten dan tidak bisa
 * dirusak per-pemanggil.
 */

const CONTAINER = "mx-auto w-full max-w-[1120px] px-6 md:px-9";

export function Container({ children }: { children: ReactNode }) {
  return <div className={CONTAINER}>{children}</div>;
}

interface SectionProps {
  id?: string;
  eyebrow?: string;
  heading?: ReactNode;
  subheading?: ReactNode;
  children: ReactNode;
}

export function Section({ id, eyebrow, heading, subheading, children }: SectionProps) {
  return (
    <section id={id} className="py-20 md:py-[110px]">
      <Container>
        {(eyebrow || heading || subheading) && (
          <div className="mx-auto mb-12 max-w-[660px] text-center md:mb-16">
            {eyebrow && (
              <p className="mb-7 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-light leading-[1.18] tracking-[-0.025em]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-[18px] text-[16px] font-light text-body md:text-[17px]">
                {subheading}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

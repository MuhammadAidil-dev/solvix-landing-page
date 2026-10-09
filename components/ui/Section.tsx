import type { ReactNode } from "react";

/**
 * Section wrapper — DESIGN.md §5 dan §10.
 *
 * Menangani spacing, max-width, header section, warna latar (`tone`), dan slot
 * dekorasi latar (`decor`). Dekorasi dirender di belakang konten.
 *
 * Heading/subheading sengaja lewat props, bukan children, supaya jarak
 * eyebrow → heading → subheading → konten selalu konsisten dan tidak bisa
 * dirusak per-pemanggil.
 */

const CONTAINER = "mx-auto w-full max-w-[1120px] px-6 md:px-9";

export function Container({ children }: { children: ReactNode }) {
  return <div className={CONTAINER}>{children}</div>;
}

export type SectionTone = "cream" | "paper" | "mist" | "navy";

const TONES: Record<SectionTone, { section: string; sub: string }> = {
  cream: { section: "", sub: "text-body" },
  paper: { section: "border-y border-hairline bg-paper", sub: "text-body" },
  mist: { section: "bg-mist", sub: "text-body" },
  navy: { section: "bg-navy text-paper", sub: "text-white/70" },
};

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  decor?: ReactNode;
  eyebrow?: string;
  heading?: ReactNode;
  subheading?: ReactNode;
  children: ReactNode;
}

export function Section({
  id,
  tone = "cream",
  decor,
  eyebrow,
  heading,
  subheading,
  children,
}: SectionProps) {
  const t = TONES[tone];
  return (
    <section id={id} className={`relative overflow-hidden py-20 md:py-[110px] ${t.section}`}>
      {decor}
      <Container>
        <div className="relative">
          {(eyebrow || heading || subheading) && (
            <div className="reveal mx-auto mb-12 max-w-[660px] text-center md:mb-16">
              {eyebrow && (
                <p className="mb-7 flex items-center justify-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
                  {eyebrow}
                  <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
                </p>
              )}
              {heading && (
                <h2 className="text-[clamp(28px,3.6vw,44px)] font-light leading-[1.18] tracking-[-0.025em]">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className={`mt-[18px] text-[16px] font-light md:text-[17px] ${t.sub}`}>
                  {subheading}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}

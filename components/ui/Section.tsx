import type { ReactNode } from "react";

/** Lebar konten dan padding horizontal yang dipakai semua section. */
export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[1240px] px-6">{children}</div>;
}

interface SectionHeadingProps {
  title: ReactNode;
  lead: string;
  tone?: "dark" | "light";
}

/** Heading section rata tengah: judul (dengan satu `Mark`) + satu kalimat pengantar. */
export function SectionHeading({ title, lead, tone = "dark" }: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div className="mx-auto mb-14 max-w-[760px] text-center">
      <h2
        className={`font-heading text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.15] tracking-[-0.015em] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <p className={`mt-5 text-[18px] leading-relaxed ${light ? "text-white/70" : "text-body"}`}>
        {lead}
      </p>
    </div>
  );
}

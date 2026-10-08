"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "../ui/Section";

const LINKS = [
  { href: "#layanan", label: "Layanan" },
  { href: "#proses", label: "Proses" },
  { href: "#portofolio", label: "Portofolio" },
  { href: "#tim", label: "Tim" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy untuk menandai section yang sedang terlihat.
  // Toleran terhadap kondisi tanpa match — jangan melempar error.
  useEffect(() => {
    const targets = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-hairline bg-cream/90 backdrop-blur-md transition-colors duration-200 ${
        scrolled ? "bg-cream/95" : ""
      }`}
    >
      <Container>
        <div className="flex h-[76px] items-center justify-between">
          <a href="#atas" aria-label="Top Solvix Labs — ke atas">
            {/* 154×40 = rasio kanvas 1493:388 persis (error 0.00%), jadi mark
                tidak gepeng. Mark terlihat 131×23px di dalam kanvas itu. */}
            <Image src="/brand/logo-on-light.png" alt="Top Solvix Labs" width={154} height={40} />
          </a>

          <nav aria-label="Navigasi utama" className="hidden gap-9 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[14.5px] transition-colors duration-150 ${
                  active === link.href ? "text-accent" : "text-body hover:text-text"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#kontak"
            className="text-[14.5px] font-medium text-text underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-150 hover:text-accent"
          >
            Hubungi Kami
          </a>
        </div>
      </Container>
    </header>
  );
}

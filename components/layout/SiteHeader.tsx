"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IconChevron } from "../ui/Icon";
import { NAV, SERVICES } from "../sections/data";

const LINK_BASE = "rounded-md px-4 py-2 text-[15px] font-medium transition-colors hover:bg-mist";

export function SiteHeader() {
  const [active, setActive] = useState<string>("");

  // Scroll spy untuk menandai section yang sedang terlihat.
  // Toleran terhadap kondisi tanpa match — jangan melempar error.
  useEffect(() => {
    const targets = NAV.map((l) => document.getElementById(l.href.slice(1))).filter(
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

  const linkClass = (href: string) =>
    `${LINK_BASE} ${active === href ? "text-accent" : "text-navy"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] w-full max-w-[1240px] items-center justify-between px-6">
        <a href="#atas" aria-label="Top Solvix Labs — ke atas" className="flex items-center">
          {/* 154×40 = rasio kanvas logo 1493:388, jadi mark tidak gepeng. */}
          <Image src="/brand/logo-on-light.png" alt="Top Solvix Labs" width={154} height={40} />
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.label === "Layanan" ? (
              <div key={item.href} className="group relative">
                <a href={item.href} className={`flex items-center gap-1 ${linkClass(item.href)}`}>
                  {item.label}
                  <IconChevron className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </a>
                <div className="invisible absolute left-0 top-full w-[560px] translate-y-1 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mt-2 grid grid-cols-2 gap-1 rounded-xl border border-hairline bg-paper p-3 shadow-[0_16px_40px_-12px_rgba(11,37,69,0.2)]">
                    {SERVICES.map((s) => (
                      <a
                        key={s.title}
                        href="#layanan"
                        className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-mist"
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${s.tile}`}
                        >
                          <s.icon className="h-[18px] w-[18px]" />
                        </span>
                        <span>
                          <span className="block text-[15px] font-medium text-navy">{s.title}</span>
                          <span className="block text-[13px] leading-snug text-muted">
                            {s.scope[0]}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.label}
              </a>
            )
          )}
        </nav>

        <a
          href="#kontak"
          className="inline-flex h-10 items-center rounded-md bg-accent px-5 text-[15px] font-medium text-white transition-colors hover:bg-navy"
        >
          Hubungi Kami
        </a>
      </div>
    </header>
  );
}

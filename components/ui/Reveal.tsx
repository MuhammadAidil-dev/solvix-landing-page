"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Urutan dalam grup; tiap langkah menambah jeda 80ms (maksimal 4 langkah). */
  step?: number;
  className?: string;
}

const STEP_MS = 80;
const MAX_STEP = 3;

/**
 * Fade-in + naik tipis sekali saat masuk viewport. Gaya sembunyi ada di `globals.css`
 * dan hanya aktif jika JS jalan (`.js-reveal`) dan pengguna tidak meminta reduced-motion.
 */
export function Reveal({ children, step = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // Browser lama tanpa IntersectionObserver: tampilkan langsung lewat DOM.
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={step > 0 ? { transitionDelay: `${Math.min(step, MAX_STEP) * STEP_MS}ms` } : undefined}
    >
      {children}
    </div>
  );
}

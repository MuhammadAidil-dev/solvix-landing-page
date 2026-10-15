"use client";

import Image from "next/image";
import { useEffect, useState, type AnimationEvent } from "react";

/** Pengaman jika `animationend` tidak pernah terpicu: overlay tidak boleh menutup halaman. */
const FALLBACK_MS = 4000;

/**
 * Animasi pembuka logo: dua garis mark membentuk "X", lalu wordmark muncul. Tampil di setiap muat ulang halaman.
 * Tampil tidaknya diatur CSS lewat kelas `js-splash` di `<html>` (diset script di layout), sehingga
 * pengguna reduced-motion tidak pernah melihatnya.
 *
 * Koordinat SVG memakai sistem koordinat `logo-on-light.png` (1493×388) agar X-nya jatuh persis
 * di posisi X pada logo; PNG-nya sendiri dipotong di depan X.
 */
export function Splash() {
  const [done, setDone] = useState(false);

  const finish = () => {
    document.documentElement.classList.remove("js-splash");
    setDone(true);
  };

  useEffect(() => {
    if (!document.documentElement.classList.contains("js-splash")) return;
    const timer = window.setTimeout(finish, FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (done) return null;

  const onAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) finish();
  };

  return (
    <div className="splash" aria-hidden="true" onAnimationEnd={onAnimationEnd}>
      <div className="splash-logo">
        <Image
          src="/brand/logo-on-light.png"
          alt=""
          width={1493}
          height={388}
          priority
          className="splash-wordmark"
        />
        <svg viewBox="0 0 1493 388" className="absolute inset-0 h-full w-full">
          <line
            className="splash-line splash-line-navy"
            x1="1215"
            y1="118"
            x2="1281"
            y2="206"
            pathLength="1"
            stroke="#0b2545"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <line
            className="splash-line splash-line-blue"
            x1="1237"
            y1="195"
            x2="1347"
            y2="90"
            pathLength="1"
            stroke="#2b7fff"
            strokeWidth="26"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

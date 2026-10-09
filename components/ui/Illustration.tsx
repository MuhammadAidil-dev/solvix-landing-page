import type { ReactNode } from "react";

/**
 * Ilustrasi garis (DESIGN.md §10): navy 1.4px dengan satu detail `accent`.
 * Dekoratif murni, jadi selalu `aria-hidden`. Tidak ada foto stok.
 */
const ACCENT = "#2B7FFF";

const SPOTS = {
  web: (
    <>
      <rect x="8" y="8" width="104" height="48" rx="4" />
      <path d="M8 20h104M20 32h40M20 42h60" />
      <rect x="74" y="28" width="30" height="20" rx="2" stroke={ACCENT} />
    </>
  ),
  mobile: (
    <>
      <rect x="20" y="6" width="26" height="52" rx="5" />
      <rect x="62" y="14" width="40" height="44" rx="5" />
      <path d="M28 50h10" />
      <path d="M72 26h20M72 36h14" stroke={ACCENT} />
    </>
  ),
  integration: (
    <>
      <circle cx="20" cy="32" r="9" />
      <circle cx="60" cy="14" r="9" />
      <circle cx="60" cy="50" r="9" />
      <circle cx="100" cy="32" r="9" stroke={ACCENT} />
      <path d="M28 28l24-10M28 36l24 10M68 18l24 10M68 46l24-10" />
    </>
  ),
  dashboard: (
    <>
      <path d="M10 6v52h100" />
      <path d="M26 50V34M44 50V24M62 50V30M80 50V16" />
      <path d="M96 50V10" stroke={ACCENT} />
    </>
  ),
  automation: (
    <>
      <circle cx="36" cy="32" r="11" />
      <circle cx="36" cy="32" r="4" />
      <path d="M36 14v6M36 44v6M18 32h6M48 32h6M23 19l4 4M45 41l4 4M49 19l-4 4M27 41l-4 4" />
      <path d="M68 32h30m-8-7 8 7-8 7" stroke={ACCENT} />
    </>
  ),
  support: (
    <>
      <path d="M60 6l34 12v18c0 14-14 22-34 26-20-4-34-12-34-26V18z" />
      <path d="m46 34 10 10 18-20" stroke={ACCENT} />
    </>
  ),
  discovery: (
    <>
      <circle cx="50" cy="28" r="20" />
      <path d="m64 43 22 15" />
      <path d="M40 28h20M50 18v20" stroke={ACCENT} />
    </>
  ),
  design: (
    <>
      <rect x="14" y="8" width="92" height="48" rx="4" />
      <path d="M14 22h92M44 22v34" />
      <path d="M54 34h40M54 44h26" stroke={ACCENT} />
    </>
  ),
  code: (
    <>
      <path d="m42 14-26 18 26 18M78 14l26 18-26 18" />
      <path d="m66 10-12 44" stroke={ACCENT} />
    </>
  ),
  testing: (
    <>
      <rect x="22" y="8" width="64" height="48" rx="4" />
      <path d="M32 24h20M32 34h28M32 44h16" />
      <circle cx="88" cy="44" r="14" fill="#FFFFFF" stroke={ACCENT} />
      <path d="m82 44 4 4 8-8" stroke={ACCENT} />
    </>
  ),
  deploy: (
    <>
      <path d="M60 8v34M44 24l16-16 16 16" stroke={ACCENT} />
      <path d="M20 44v10h80V44" />
    </>
  ),
  iot: (
    <>
      <rect x="40" y="18" width="40" height="28" rx="3" />
      <path d="M50 18v-8M60 18v-8M70 18v-8M50 46v8M60 46v8M70 46v8M40 28h-8M40 36h-8M80 28h8M80 36h8" />
      <circle cx="60" cy="32" r="5" stroke={ACCENT} />
    </>
  ),
  cart: (
    <>
      <path d="M16 12h12l8 28h50l8-22H32" />
      <circle cx="42" cy="50" r="4" />
      <circle cx="80" cy="50" r="4" />
      <path d="M48 28h30" stroke={ACCENT} />
    </>
  ),
  publish: (
    <>
      <rect x="28" y="8" width="46" height="48" rx="3" />
      <path d="M38 22h26M38 32h26M38 42h14" />
      <path d="M82 20l20 12-20 12z" stroke={ACCENT} />
    </>
  ),
  retail: (
    <>
      <path d="M14 22 20 8h80l6 14" />
      <path d="M14 22c0 6 5 9 9 9s9-3 9-9c0 6 5 9 9 9s9-3 9-9c0 6 5 9 9 9s9-3 9-9c0 6 5 9 9 9s9-3 9-9" />
      <path d="M22 31v25h76V31" />
      <rect x="50" y="40" width="20" height="16" stroke={ACCENT} />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type SpotName = keyof typeof SPOTS;

export function Spot({ name, className }: { name: SpotName; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {SPOTS[name]}
    </svg>
  );
}

/** Blueprint peramban + ponsel + roda gigi untuk Hero. */
export function HeroBlueprint({ className }: { className?: string }) {
  return (
    <svg
      viewBox="30 22 340 222"
      fill="none"
      stroke="#0B2545"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="40" y="40" width="230" height="150" rx="6" fill="#FFFFFF" />
      <path d="M40 62h230" />
      <circle cx="54" cy="51" r="3" />
      <circle cx="66" cy="51" r="3" />
      <circle cx="78" cy="51" r="3" />
      <rect x="56" y="78" width="60" height="96" rx="3" />
      <path d="M130 82h120M130 98h90M130 114h110" />
      <rect x="130" y="130" width="120" height="44" rx="3" />
      <path d="M138 164l22-18 18 10 22-20 20 14" stroke={ACCENT} />
      <rect x="236" y="110" width="92" height="124" rx="10" fill="#FFFFFF" />
      <path d="M270 222h24" />
      <rect x="248" y="126" width="68" height="40" rx="3" fill="#EEF3FA" />
      <path d="M248 180h68M248 192h44" />
      <circle cx="332" cy="60" r="26" />
      <circle cx="332" cy="60" r="9" />
      <path d="M332 28v10M332 82v10M300 60h10M354 60h10M309 37l7 7M348 76l7 7M355 37l-7 7M316 76l-7 7" />
      <path d="M300 60h-30M80 190v26h120" strokeDasharray="3 5" />
      <circle cx="80" cy="216" r="4" fill={ACCENT} stroke={ACCENT} />
    </svg>
  );
}

/** Gedung + akta + penanda lokasi untuk bagian Tentang. */
export function AboutBlueprint({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 200"
      fill="none"
      stroke="#0B2545"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M10 176h340" />
      <rect x="30" y="52" width="104" height="124" rx="3" fill="#FFFFFF" />
      <path d="M30 76h104M82 76v100" />
      <path d="M44 92h14M44 108h14M44 124h14M44 140h14M98 92h22M98 108h22M98 124h22M98 140h22" />
      <path d="M68 176v-24h28v24" />
      <rect x="168" y="30" width="96" height="124" rx="3" fill="#FFFFFF" />
      <path d="M182 52h44M182 66h68M182 80h68M182 94h52" />
      <circle cx="236" cy="128" r="14" stroke="#2B7FFF" />
      <path d="m230 128 4 4 8-9" stroke="#2B7FFF" />
      <path d="M182 128h26M182 140h18" />
      <path d="M300 176v-60" strokeDasharray="3 5" />
      <path d="M300 116c-16-14-22-26-22-36a22 22 0 0 1 44 0c0 10-6 22-22 36z" fill="#FFFFFF" />
      <circle cx="300" cy="80" r="7" fill="#2B7FFF" stroke="#2B7FFF" />
      <path d="M134 114h30M264 92h12" strokeDasharray="3 5" />
    </svg>
  );
}

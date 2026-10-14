/**
 * Elemen dekoratif flat: bentuk organik, sparkle, garis bergelombang, coretan
 * lingkaran, dan panah doodle. Semuanya `absolute`, tidak menerima klik, dan
 * dirender di belakang konten — pemanggil yang menentukan posisi, ukuran, dan
 * warna lewat `className` (`text-*` menjadi warna isian/garis).
 */
interface DecorProps {
  className?: string;
}

const BASE = "pointer-events-none absolute";

const BLOB_PATHS = {
  1: "M43 -61C58 -49 74 -38 80 -22C86 -6 82 15 72 32C62 49 46 62 27 69C8 76 -14 77 -33 69C-52 61 -68 44 -75 24C-82 4 -80 -19 -69 -37C-58 -55 -38 -68 -17 -72C4 -76 28 -73 43 -61Z",
  2: "M61 -52C74 -36 77 -12 72 10C67 32 54 53 35 63C16 73 -9 72 -31 62C-53 52 -72 33 -76 10C-80 -13 -69 -39 -50 -54C-31 -69 -4 -73 17 -69C38 -65 48 -68 61 -52Z",
  3: "M52 -58C66 -42 71 -19 70 3C69 25 62 48 46 60C30 72 5 73 -17 67C-39 61 -59 48 -68 29C-77 10 -75 -15 -63 -34C-51 -53 -29 -66 -5 -70C19 -74 38 -74 52 -58Z",
} as const;

export type BlobVariant = keyof typeof BLOB_PATHS;

export function Blob({ className, variant = 1 }: DecorProps & { variant?: BlobVariant }) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      className={`${BASE} ${className ?? ""}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={BLOB_PATHS[variant]} />
    </svg>
  );
}

export function Sparkle({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`${BASE} ${className ?? ""}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20 0 C21.5 12 28 18.5 40 20 C28 21.5 21.5 28 20 40 C18.5 28 12 21.5 0 20 C12 18.5 18.5 12 20 0Z" />
    </svg>
  );
}

export function Squiggle({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 120 12"
      fill="none"
      className={`${BASE} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path
        d="M2 8 Q 12 2, 22 8 T 42 8 T 62 8 T 82 8 T 102 8 T 122 8"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScribbleRing({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={`${BASE} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path
        d="M50 8 C78 6 94 28 92 52 C90 78 68 94 44 92 C20 90 6 70 8 46 C10 24 30 10 56 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleArrow({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      className={`${BASE} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path
        d="M6 54 C 30 10, 70 6, 108 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M96 14 L110 26 L94 36"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LoopArrow({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 140 90"
      fill="none"
      className={`${BASE} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path
        d="M8 12 C 40 4, 78 18, 70 44 C 63 66, 36 58, 46 40 C 56 22, 100 30, 124 66"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M108 60 L126 68 L128 48"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Pola titik. `id` harus unik per halaman karena dipakai sebagai id `<pattern>`. */
export function DotsPattern({ id, className }: DecorProps & { id: string }) {
  return (
    <svg className={`${BASE} ${className ?? ""}`} fill="currentColor" aria-hidden="true">
      <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="2.5" cy="2.5" r="1.5" />
      </pattern>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Elemen dekoratif latar section (DESIGN.md §10). Semuanya `aria-hidden`,
 * tidak menerima klik, dan diletakkan di belakang konten.
 */

/** Lingkaran konsentris bergaya blueprint. Warna lewat `text-*` pada className. */
export function Rings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className={`pointer-events-none absolute ${className ?? ""}`}
    >
      {[200, 160, 120, 80, 40].map((r) => (
        <circle key={r} cx="200" cy="200" r={r - 0.5} />
      ))}
      <path d="M200 0v400M0 200h400" strokeDasharray="2 6" />
    </svg>
  );
}

/** Grid garis tipis yang memudar ke tepi. Gunakan `light` di atas navy. */
export function GridBg({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`${light ? "bg-grid-light" : "bg-grid"} pointer-events-none absolute inset-0 ${className ?? ""}`}
    />
  );
}

/** Titik-titik teknis yang memudar ke tepi. */
export function DotsBg({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`bg-dots pointer-events-none absolute ${className ?? ""}`} />
  );
}

/** Deretan tanda plus kecil, seperti penanda registrasi cetak. */
export function Crosses({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`pointer-events-none absolute ${className ?? ""}`}
    >
      {[12, 60, 108].flatMap((x) =>
        [12, 60, 108].map((y) => (
          <path key={`${x}-${y}`} d={`M${x - 5} ${y}h10M${x} ${y - 5}v10`} />
        ))
      )}
    </svg>
  );
}

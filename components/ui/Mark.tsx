import type { ReactNode } from "react";

/**
 * Penanda kata di dalam heading, digambar tangan: `underline` (garis
 * bergelombang), `circle` (dilingkari), atau `brush` (sapuan stabilo).
 * `tone="light"` untuk permukaan navy.
 */
interface MarkProps {
  children: ReactNode;
  variant?: "underline" | "circle" | "brush";
  tone?: "accent" | "light";
}

export function Mark({ children, variant = "underline", tone = "accent" }: MarkProps) {
  const color = tone === "light" ? "text-white" : "text-accent";
  const stroke = tone === "light" ? "text-white/80" : "text-accent";

  if (variant === "circle") {
    return (
      <span className={`relative inline-block px-1 ${color}`}>
        {children}
        <svg
          viewBox="0 0 120 44"
          preserveAspectRatio="none"
          className={`absolute -inset-x-2 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+16px)] ${stroke}`}
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="60"
            cy="22"
            rx="56"
            ry="17"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="340 22 18 14"
            transform="rotate(-2 60 22)"
          />
        </svg>
      </span>
    );
  }

  if (variant === "brush") {
    return (
      <span className="relative inline-block text-navy">
        <span
          className="absolute inset-x-[-4px] bottom-[2px] top-[46%] -rotate-1 rounded-sm bg-accent/25"
          aria-hidden="true"
        />
        <span className="relative">{children}</span>
      </span>
    );
  }

  return (
    <span className={`relative inline-block ${color}`}>
      {children}
      <svg
        viewBox="0 0 120 12"
        preserveAspectRatio="none"
        className={`absolute -bottom-2 left-0 h-3 w-full ${stroke}`}
        aria-hidden="true"
      >
        <path
          d="M2 8 Q 12 2, 22 8 T 42 8 T 62 8 T 82 8 T 102 8 T 122 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

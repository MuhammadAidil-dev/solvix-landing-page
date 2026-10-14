import type { ReactNode } from "react";

/** Bingkai jendela browser untuk screenshot proyek. */
export function BrowserFrame({ children, url }: { children: ReactNode; url: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-paper shadow-[0_12px_40px_-12px_rgba(11,37,69,0.18)]">
      <div className="flex items-center gap-3 border-b border-hairline bg-cream px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
          <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
          <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
        </span>
        <span className="flex-1 truncate rounded-md bg-paper px-3 py-1 text-[12px] text-muted">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

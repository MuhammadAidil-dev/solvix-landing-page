import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "w-full rounded border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900",
        className
      )}
      {...props}
    />
  );
}

/** Kelas tombol untuk elemen `<a>`. Dipisah dari `button.tsx` yang untuk `<button>`. */
const BASE =
  "inline-flex h-[48px] items-center justify-center gap-2 rounded-md px-7 text-[16px] font-medium transition-colors";

export const BTN_PRIMARY = `${BASE} bg-accent text-white hover:bg-navy`;
export const BTN_SECONDARY = `${BASE} border border-accent text-accent hover:bg-accent hover:text-white`;

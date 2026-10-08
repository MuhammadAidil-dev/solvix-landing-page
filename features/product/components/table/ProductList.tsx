"use client";

import { Toast } from "../../../../components/ui/toast";
import { useProducts } from "../../hooks/hooks";

export function ProductList() {
  const { data, loading, error } = useProducts();

  if (loading) return <p className="text-sm text-zinc-500">Memuat produk…</p>;

  return (
    <div className="space-y-3">
      <Toast message={error} />
      <ul className="divide-y rounded border bg-white">
        {data.map((p) => (
          <li key={String(p.id)} className="flex items-center justify-between px-4 py-2 text-sm">
            <span>{p.name}</span>
            {typeof p.price === "number" && (
              <span className="text-zinc-500">{p.price}</span>
            )}
          </li>
        ))}
        {data.length === 0 && !error && (
          <li className="px-4 py-2 text-sm text-zinc-500">Belum ada produk.</li>
        )}
      </ul>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { ApiError } from "../../../lib/api-error";
import { listProducts } from "../service/api";
import type { Product } from "../schema/schema";

export function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    listProducts()
      .then((rows) => alive && setData(rows))
      .catch((err: unknown) =>
        alive && setError(err instanceof ApiError ? err.message : "Gagal memuat produk")
      )
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return { data, loading, error };
}
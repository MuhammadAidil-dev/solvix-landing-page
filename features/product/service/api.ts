import { apiPublic } from "../../../lib/fetcher";
import type { Product } from "../schema/schema";

export function listProducts(): Promise<Product[]> {
  return apiPublic<Product[]>("/products");
}
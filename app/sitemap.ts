import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Satu halaman. Tambahkan entri di sini saat ada halaman layanan/artikel.
  return [{ url: `${SITE_URL}/` }];
}

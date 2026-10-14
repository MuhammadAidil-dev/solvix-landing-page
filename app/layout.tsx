import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const heading = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PT TOP SOLVIX LABS — Perusahaan Pengembangan Software",
  description:
    "PT TOP SOLVIX LABS merancang dan membangun perangkat lunak kustom untuk menyelesaikan masalah operasional bisnis melalui solusi digital.",
  openGraph: {
    title: "PT TOP SOLVIX LABS",
    description:
      "Perusahaan pengembangan software yang mengubah masalah operasional menjadi solusi digital.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}

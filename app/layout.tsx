import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
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
    <html lang="id" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}

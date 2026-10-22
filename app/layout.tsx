import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import { Splash } from "../components/ui/Splash";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "../lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
  openGraph: {
    title: "PT TOP SOLVIX LABS",
    description:
      "Perusahaan pengembangan software yang mengubah masalah operasional menjadi solusi digital.",
    url: "/",
    siteName: SITE_NAME,
    locale: "id_ID",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: script di bawah menambah kelas `js-reveal` ke <html> sebelum hydrate.
    <html lang="id" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        <Script id="js-flags" strategy="beforeInteractive">
          {`var d=document.documentElement;d.classList.add("js-reveal");try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("js-splash")}catch(e){}`}
        </Script>
        <Splash />
        {children}
      </body>
    </html>
  );
}

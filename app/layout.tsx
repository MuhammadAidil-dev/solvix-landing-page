import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solvix App",
  description: "Solvix frontend template (Next App Router)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}

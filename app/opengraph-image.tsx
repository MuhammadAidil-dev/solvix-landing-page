import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "PT TOP SOLVIX LABS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Kanvas logo 1493:388 (lihat DESIGN.md §1) — lebar 840 → tinggi 218, tanpa distorsi.
const LOGO_WIDTH = 840;
const LOGO_HEIGHT = 218;

export default async function OpengraphImage() {
  // Varian berlatar navy hanya boleh di atas navy, jadi latar kartu memakai token `navy`.
  const logo = await readFile(join(process.cwd(), "public", "brand", "logo-on-navy.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0B2545",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={LOGO_WIDTH} height={LOGO_HEIGHT} />
    </div>,
    size
  );
}

# DESIGN.md — PT TOP SOLVIX LABS

Design system untuk company profile `solvix-landing`. Dokumen ini adalah kontrak visual: kalau sebuah keputusan tidak ada di sini, jangan berkreasi — tanya dulu.

Gaya: **Friendly Flat Doodle**. Tampilan ramah, cerah, dan terstruktur: permukaan **flat** (warna solid, tanpa gradien), **bentuk organik** (blob) sebagai latar, **aksen doodle gambar tangan** (garis bergelombang, lingkaran coretan, panah), **ikon dalam tile berwarna**, dan **tipografi geometris yang tebal-sedang**. Prinsip: satu sistem emphasis (penanda gambar tangan di satu kata heading), warna aksen sebagai tanda baca, dekorasi selalu di belakang konten.

---

## 1. Brand

PT TOP SOLVIX LABS adalah software house yang menyelesaikan masalah operasional bisnis lewat solusi digital. Posisi yang harus terasa dari setiap layar: **tepercaya, teknis, tidak berteriak.**

Logo sudah ada — kata "TOP SOLVIX" + "LABS" biru dengan mark "X" dari dua garis bersilangan. Warna diambil langsung dari file logo, bukan dikira-kira:

- **Navy `#0B2545` dan biru `#2B7FFF`** — dua warna ini identik dengan pixel di file logo.

Brand kit menyediakan varian berlatar **putih** dan berlatar **navy**. Pilihannya ditentukan oleh permukaan, bukan selera:

| Aset                | Latar          | Dipakai di                |
| ------------------- | -------------- | ------------------------- |
| `logo-on-light.png` | transparan     | permukaan terang (navbar) |
| `logo-on-navy.png`  | navy `#0B2545` | permukaan navy (footer)   |
| `icon.png`          | putih          | favicon / app icon        |

Varian navbar memakai file **ber-alpha** (bukan berlatar putih). Alasannya teknis, bukan selera: navbar memakai `paper` `#FFFFFF` dengan transparansi 95%, dan logo berlatar putih `#FFFFFF` di atasnya memunculkan kotak putih yang subtly berbeda — junction yang selalu dikeluhkan. File transparan menghapus junction itu tanpa mengubah warna background apa pun. Warna mark sendiri tidak berubah: `#0B2545` 91% + `#2B7FFF` 9%, persis sama seperti varian berlatar putih.

Ukuran render wajib mengikuti **rasio kanvas `1493:388`**, bukan rasio mark. `next/image` diberi dimensi dalam pixel kanvas; memakai `width: 140, height: 26` membuat mark ter-render gepeng pada 71.5% tinggi sebenarnya. Nilai yang dipakai di navbar: `154×40` (error rasio 0.00%).

Kanvas `icon.png` adalah `1024×1024` dengan **padding asimetris**: `237px` kiri/kanan, `218px` atas, `313px` bawah. Mark karena itu meleset ke atas sekitar `48px` terhadap titik tengah optik. Ketimpangan ini dibiarkan, bukan diperbaiki: menggeser mark sama saja menyusun ulang aset yang dilarang oleh aturan di bawah.

Dua aturan yang tidak boleh dilanggar:

- **Varian berlatar navy hanya boleh di atas `navy`.** Latar logo `#0B2545` persis sama dengan token navy, jadi di footer ia menyatu seamless. Dipakai di navbar, ia jadi kotak navy di atas cream.
- **Varian berlatar putih hanya boleh di atas permukaan terang.** Dipakai di footer, ia jadi kotak putih di atas navy.

File di `public/brand/` sengaja dinamai menurut permukaannya (`logo-on-light`, `logo-on-navy`) dan bukan "terang/gelap", karena nama itu ambigu — bisa berarti terang/gelap pada teks atau pada latar. Jangan ganti penamaan itu tanpa memperbarui tabel di atas.

Mark "X" tidak boleh diedit, dipotong, atau diganti warna. Boleh `width` varied, tidak boleh distorsi.

Watermark yang salah: nuansa "startupicorn" yang dehumanis, gradient ungu-merah, ilustrasi 3D, foto stok orang_POINTING_atas_layar.

---

## 2. Color

Token ini adalah satu-satunya sumber kebenaran warna, dipetakan ke `tailwind.config.ts` → `theme.extend.colors`.

| Token         | Hex       | Peran                                              |
| ------------- | --------- | -------------------------------------------------- |
| `navy`        | `#0B2545` | teks utama, permukaan Kontak                       |
| `navy-soft`   | `#1B3A5C` | tile ikon gelap                                    |
| `accent`      | `#2B7FFF` | CTA, kata emphasis, nomor, centang, tile ikon      |
| `accent-soft` | `#7AA8F5` | tile ikon (variasi)                                |
| `accent-pale` | `#B9CFF0` | tile ikon (variasi)                                |
| `paper`       | `#FFFFFF` | latar halaman dan kartu                            |
| `cream`       | `#FBFAF7` | latar section selang-seling, strip, header jendela |
| `mist`        | `#EEF3FA` | chip, kotak ikon kecil, latar gambar               |
| `mist-deep`   | `#DCE7F5` | bentuk dekoratif biru                              |
| `sky`         | `#C9DDFB` | bentuk dekoratif di header kartu                   |
| `sky-soft`    | `#E3EEFF` | header kartu layanan                               |
| `sun`         | `#FFE9A8` | bentuk dekoratif kuning besar                      |
| `sun-deep`    | `#FFE39A` | bentuk dekoratif kuning di header kartu            |
| `sun-soft`    | `#FFF3CF` | header kartu layanan                               |
| `hairline`    | `#E7E5DF` | border 1px                                         |
| `text`        | `#0B2545` | alias `navy`                                       |
| `body`        | `#4A5C70` | teks paragraf                                      |
| `muted`       | `#8A97A5` | teks sekunder, label                               |

Aturan warna:

- **Latar halaman `paper`; `cream` dipakai selang-seling.** Ritme latar: Hero `paper` → strip legal `cream` → Layanan `cream` → Tentang `paper` → Angka `cream` → Proses `paper` → Portofolio `paper` → Kontak `navy` → Footer `navy` (dipisah dari Kontak oleh garis `white/10`). Antar section yang sama-sama terang, pemisahnya adalah bentuk dekoratif, bukan perubahan warna.
- **`accent` adalah warna aksi dan penanda.** Dipakai di: tombol utama, tepi tombol sekunder, kata emphasis di heading, nomor langkah dan angka statistik, centang, link "Diskusikan", dan tile ikon. Bukan untuk blok latar besar.
- **`sun` (kuning) hanya untuk bentuk dekoratif** — blob latar dan header kartu. Tidak pernah untuk teks, tombol, border, atau ikon.
- **Tidak ada warna lain.** Tidak ada hijau/merah/ungu, tidak ada warna status, tidak ada warna dari identitas proyek di portofolio. Biru + navy + kuning dekoratif + netral itu seluruh palet.
- **Tidak ada gradien.** Semua permukaan solid. Tidak ada glow berwarna dan tidak ada `blur` dekoratif.
- **Bayangan hanya untuk permukaan yang "terangkat"**: bingkai browser, kartu profil perusahaan, dropdown menu, dan hover kartu layanan. Bayangan lembut, rendah opasitas, berwarna `navy`/`accent` transparan. Tombol, teks, chip, dan kartu biasa tidak memakai bayangan.

Tailwind mapping:

```ts
colors: {
  navy: "#0B2545",
  "navy-soft": "#1B3A5C",
  accent: "#2B7FFF",
  "accent-soft": "#7AA8F5",
  "accent-pale": "#B9CFF0",
  cream: "#FBFAF7",
  paper: "#FFFFFF",
  mist: "#EEF3FA",
  "mist-deep": "#DCE7F5",
  sky: "#C9DDFB",
  "sky-soft": "#E3EEFF",
  sun: "#FFE9A8",
  "sun-deep": "#FFE39A",
  "sun-soft": "#FFF3CF",
  hairline: "#E7E5DF",
  text: "#0B2545",
  body: "#4A5C70",
  muted: "#8A97A5",
}
```

> `cn()` di `lib/utils.ts` cuma filter+join — **tidak** ada Tailwind conflict resolution (`clsx`/`tailwind-merge` tidak terpasang). Jangan menulis class yang bergantung pada override; nilai warna selalu ditulis utuh.

---

## 3. Typography

Dua keluarga, dimuat lewat `next/font` di `app/layout.tsx`:

- **Outfit** — heading, nomor, dan angka besar. Weight `500`, `600`, `700`. Class: `font-heading` (CSS variable `--font-heading`).
- **Inter** — seluruh teks lain: paragraf, label, tombol, navigasi. Weight `400`, `500`. Default `body` (CSS variable `--font-body`, class `font-sans`).

Tidak ada font ketiga, tidak ada serif, tidak ada mono.

### Type ramp

| Peran           | Ukuran                     | Font / Weight | Tracking   | Line-height |
| --------------- | -------------------------- | ------------- | ---------- | ----------- |
| Hero H1         | `clamp(38px, 5.2vw, 64px)` | Outfit 600    | `-0.02em`  | 1.1         |
| Section H2      | `clamp(30px, 3.8vw, 46px)` | Outfit 600    | `-0.015em` | 1.15        |
| Kontak H2       | `clamp(32px, 4.4vw, 52px)` | Outfit 600    | `-0.015em` | 1.12        |
| Judul proyek    | `clamp(26px, 3vw, 36px)`   | Outfit 600    | normal     | 1.25        |
| Angka statistik | `clamp(44px, 5vw, 64px)`   | Outfit 600    | normal     | 1           |
| Card H3         | `17px`–`21px`              | Outfit 600    | normal     | 1.25        |
| Lead (hero)     | `20px`                     | Inter 400     | normal     | 1.6         |
| Lead (section)  | `18px`                     | Inter 400     | normal     | 1.6         |
| Body            | `16px`                     | Inter 400     | normal     | 1.6         |
| Chip / label    | `13px`–`15px`              | Inter 500     | normal     | 1.3         |
| Nav link        | `15px`                     | Inter 500     | normal     | 1           |
| Button          | `16px` (nav `15px`)        | Inter 500     | normal     | 1           |

Aturan:

- **Prose minimal 16px.** Pengecualian hanya untuk elemen non-prosa: chip (13px), label dan catatan di kartu profil (13px–14px), teks tile (14px).
- **Heading selalu Outfit 600**, tidak ada heading `font-bold` 700 kecuali nomor kecil yang sengaja dibedakan. Tidak ada heading tipis.
- **Emphasis = `Mark`** (`components/ui/Mark.tsx`): penanda gambar tangan di **tepat satu** kata/frasa per heading. Tiga varian: `underline` (garis bergelombang), `circle` (dilingkari), `brush` (sapuan stabilo). Tidak pernah memakai italic, bold ekstra, atau warna sebagai alat emphasis lain.
- Tidak ada `text-transform: uppercase`.
- Tidak ada teks terpusat di dalam kartu kecuali langkah Proses.

---

## 4. Spacing

Base unit **4px**. Semua spacing kelipatan 4 (kecuali ukuran mikro yang sudah ada di komponen, mis. `13px` chip).

| Konteks                    | Nilai                                          |
| -------------------------- | ---------------------------------------------- |
| Tinggi header              | `68px`                                         |
| Padding section            | `96px` (mobile) / `112px` (`md`) atas/bawah    |
| Padding hero               | `80px`/`96px` atas, `96px`/`128px` bawah       |
| Max width konten           | `1240px`, padding horizontal `24px`            |
| Max width teks hero        | `860px` (tengah)                               |
| Max width heading section  | `760px` (tengah)                               |
| Heading section → konten   | `56px`                                         |
| Gap antar kartu            | `24px`                                         |
| Gap antar baris portofolio | `96px`                                         |
| Tinggi tombol              | `48px` (nav `40px`), padding horizontal `28px` |

- Padding section tidak boleh dikompres di mobile di bawah `96px`.

---

## 5. Components

Komponen section ada di `components/sections/`, primitif di `components/ui/`.

| Komponen             | Spec                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Button primary**   | bg `accent`, teks `paper`, `radius: 6px`, weight 500. Hover → bg `navy`. Kelas: `BTN_PRIMARY` di `components/ui/buttonStyles.ts`.                                                                                                                                                                                                                                                                                          |
| **Button secondary** | transparan, border 1px `accent`, teks `accent`, `radius: 6px`. Hover → bg `accent`, teks `paper`. `BTN_SECONDARY`.                                                                                                                                                                                                                                                                                                         |
| **Button di navy**   | utama: bg `accent`, hover bg `paper` teks `navy`. Sekunder: border `white/40`, hover bg `white/10`.                                                                                                                                                                                                                                                                                                                        |
| **Header**           | sticky, bg `paper/95` + `backdrop-blur`, border-bottom `hairline`, tinggi 68px. Link nav: `radius: 6px`, hover bg `mist`, aktif (scroll spy) teks `accent`. "Layanan" membuka dropdown 2 kolom (tile ikon + judul + cakupan pertama). Satu tombol primary "Hubungi Kami".                                                                                                                                                  |
| **Tile ikon**        | kotak `radius: 16px` berisi ikon garis putih, warna dari `accent` / `accent-soft` / `accent-pale` / `navy-soft`. Ukuran 84px (hero), 68px (kartu), 36px (dropdown).                                                                                                                                                                                                                                                        |
| **Kartu layanan**    | bg `paper`, border `hairline`, `radius: 16px`. **Header berwarna** 132px (`sky-soft` / `sun-soft` / `mist`) berisi blob, sparkle, nomor `01–05`, dan tile ikon yang menumpang di tepi bawah header (ring `paper`). Isi: judul, deskripsi, chip cakupan, link "Diskusikan →". Hover: border → `accent`, bayangan lembut, tile miring 6°. Grid 6 kolom, tiap kartu `col-span-2`, kartu ke-4 `col-start-2` (3 + 2 di tengah). |
| **Chip**             | `radius` penuh (pill), bg `mist`, teks `navy` 13px weight 500. Dipakai untuk cakupan layanan, hasil tahap proses, dan industri proyek (teks `accent`).                                                                                                                                                                                                                                                                     |
| **Kartu profil**     | bg `paper`, border `hairline`, `radius: 12px`, bayangan lembut. Header `navy` dengan lencana "Terdaftar" (`accent`). Baris: kotak ikon 40px (`mist`) + label `muted` + nilai Outfit + catatan `body`.                                                                                                                                                                                                                      |
| **Langkah proses**   | lingkaran `accent` 56px dengan nomor putih, ring 8px `paper`, dihubungkan garis putus-putus `accent/30` (desktop). Judul, deskripsi, chip hasil — rata tengah.                                                                                                                                                                                                                                                             |
| **Bingkai browser**  | `components/ui/BrowserFrame.tsx`: border `hairline`, `radius: 12px`, bar atas `cream` dengan tiga titik dan URL, bayangan lembut. Berisi screenshot proyek (`object-top`).                                                                                                                                                                                                                                                 |
| **Angka statistik**  | Outfit 600 `accent`, label `body`, dipisah garis vertikal `hairline` di desktop. Nilai diturunkan dari data (`STATS`), bukan di-hardcode.                                                                                                                                                                                                                                                                                  |
| **Strip legal**      | bg `cream`, border atas/bawah `hairline`, daftar fakta berbadan hukum dengan centang `accent`.                                                                                                                                                                                                                                                                                                                             |
| **Footer**           | bg `navy`, border-top `white/10`, teks `white/65`, judul kolom Outfit putih, tautan hover → putih. 4 kolom: brand, Layanan, Perusahaan, Kontak.                                                                                                                                                                                                                                                                            |

---

## 6. Layout

- **Satu halaman panjang**, scroll dengan anchor navigation. Urutan: `Hero → Strip legal → Layanan → Tentang → Angka → Proses → Portofolio → Kontak → Footer`.
- **Hero rata tengah**: judul (satu `Mark`), lead, dua tombol, satu baris catatan bercentang. Dekorasi mengelilingi teks — bentuk blob, sparkle, doodle, dan **tile layanan** di kiri/kanan pada layar ≥ `xl`. Di bawah `xl`, tile pindah menjadi satu baris di bawah catatan.
- **Heading section rata tengah** (`SectionHeading`), max-width `760px`. Konten boleh selebar container.
- **Tentang**: dua kolom di `lg` — teks + daftar bidang usaha di kiri, kartu profil di kanan.
- **Portofolio**: baris selang-seling (gambar kiri/teks kanan, lalu sebaliknya); di mobile selalu gambar dulu.
- **Proses**: 5 kolom di `lg`, 2 kolom di `md`, 1 kolom di mobile.
- Konten di dalam kartu rata kiri.
- Anchor: `#atas`, `#tentang`, `#layanan`, `#proses`, `#portofolio`, `#kontak`. `scroll-padding-top: 84px` mengkompensasi header.

---

## 7. Dekorasi

Dekorasi adalah bagian dari identitas, tetapi tidak pernah bersaing dengan konten. Semua ada di `components/ui/Decor.tsx` dan `Mark.tsx`.

| Elemen                      | Spec                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Blob**                    | bentuk organik solid, 3 varian. Warna dari token (`sun`, `mist-deep`, `sky`, `sun-deep`), tanpa blur. |
| **Sparkle**                 | bintang empat sudut solid, `accent` atau `navy` (di navy: `white/60`). Kecil: 20–32px.                |
| **Squiggle**                | garis bergelombang 3.5px, `accent/50` atau `navy/40`.                                                 |
| **ScribbleRing**            | lingkaran coretan terbuka 3px, `accent/50` atau `navy/30`.                                            |
| **DoodleArrow / LoopArrow** | panah gambar tangan 3px, `navy/50` atau `accent/60`. Hanya di layar lebar.                            |
| **DotsPattern**             | pola titik. Hanya di section navy, `white/10`. `id` pattern harus unik per halaman.                   |
| **Mark**                    | penanda kata di heading (lihat §3).                                                                   |

Aturan:

- Selalu `absolute`, `pointer-events-none`, `aria-hidden`, dan di belakang konten (konten dibungkus `relative` setelahnya).
- Setiap section punya 2 blob, 2–3 sparkle/doodle. Jangan menumpuk lebih dari itu.
- Bentuk besar boleh terpotong tepi section (`overflow-hidden`); jangan sampai menutupi teks hingga kontrasnya turun.
- Doodle dan tile hero disembunyikan di layar kecil, bukan dikecilkan.
- Hanya warna token. Tanpa gradien, tanpa blur, tanpa glow.

---

## 8. Voice

Bahasa: **Bahasa Indonesia** untuk semua copy user-facing. Istilah teknis boleh English (`API`, `dashboard`, `deploy`).

Prinsip — dari disiplin Stripe: satu kalimat yang bisa muncul di company profile mana pun harus ditulis ulang sampai tidak bisa.

- **Spesifik > abstrak.** "Pemantauan armada dan stok real-time untuk operator logistik" — bukan "Solusi logistik innovative".
- **Klaim harus bisa dibuktikan.** Kalau ada angka, angka itu asli dan bisa dipertanggungjawabkan. Kalau belum ada angka, pakai kalimat tanpa angka. Jangan seberta jadi placeholder angka jadi terlihat palsu.
- **Tidak ada marketing fluff.** Larangan keras: _solusi inovatif_, _terdepan_, _terbaik_, _solusi terbaik_, _inovatif_, _mutu_, _terpercaya_, _profesional_, _world-class_, _one-stop solution_, _Transformasi digital_.
- **Format angka Indonesia.** `12 juta`, `40%`, `1×24 jam`. Jangan `12M` atau `12jt` di copy final.
- Kalimat pendek. Sub-heading maksimal satu kalimat.
- CTA pakai kata kerja nyata: "Mulai Diskusi", "Hubungi via WhatsApp". Bukan "Kirim Pesan Sekarang" kalau form-nya memang kontak.

Semua copy saat ini placeholder dan akan diganti. Struktur dan panjangnya sudah final supaya penggantian copy tidak menyentuh layout.

---

## 9. Motion

Motion minimal dan hanya merespons interaksi. Tidak ada animasi yang berjalan sendiri.

| Elemen             | Efek                                                            | Durasi  |
| ------------------ | --------------------------------------------------------------- | ------- |
| Tombol, link nav   | `color` / `background-color` / `border-color`                   | `150ms` |
| Kartu layanan      | `border-color` → `accent`, bayangan muncul                      | `200ms` |
| Tile ikon di kartu | miring `-6°` saat hover kartu                                   | `200ms` |
| Panah "Diskusikan" | bergeser `4px` ke kanan saat hover kartu                        | `200ms` |
| Dropdown Layanan   | fade + naik `4px`, buka lewat hover atau fokus keyboard         | `150ms` |
| Chevron nav        | berputar `180°` saat dropdown terbuka                           | `150ms` |
| Scroll             | `scroll-behavior: smooth`, nonaktif di `prefers-reduced-motion` | —       |

Larangan mutlak: parallax, animasi loop (mengambang, berdenyut), animasi hero, scroll-jacking, `framer-motion`, count-up angka, marquee, carousel.

---

## 10. Anti-patterns

Semuanya **dilarang**:

1. **Gradien** dalam bentuk apa pun, dan glow/`blur` dekoratif.
2. **Bayangan di tombol, chip, teks, atau kartu biasa.** Bayangan hanya untuk bingkai browser, kartu profil, dropdown, dan hover kartu layanan.
3. **Kuning (`sun*`) di luar bentuk dekoratif** — bukan untuk teks, tombol, border, atau ikon.
4. **Warna di luar palet §2**, termasuk warna identitas proyek di portofolio.
5. **Lebih dari satu `Mark` per heading.** Dan emphasis lewat italic, bold, atau warna.
6. **Heading tipis atau heading dengan font selain Outfit.**
7. **Body text di bawah 16px** (kecuali chip, label, dan teks tile sesuai §3).
8. **Border radius di atas 16px** untuk komponen (kartu layanan dan tile ikon 16px, kartu profil/bingkai 12px, tombol 6px). Pengecualian: pill (chip, lencana), lingkaran (nomor langkah), dan `icon.png` / favicon yang mengikuti rasio app icon platform.
9. **`text-transform: uppercase`.**
10. **Ikon emoji sebagai dekorasi.** Ikon memakai garis 1.8px `currentColor` dari `components/ui/Icon.tsx`.
11. **Foto stok orang di ruang kerja.** Visual hanya screenshot proyek nyata, ilustrasi flat, dan tile ikon.
12. **Dekorasi yang menimpa teks**, menerima klik, atau tidak `aria-hidden`.
13. **Animasi yang berjalan sendiri**, parallax, count-up, marquee, carousel, FAQ accordion.
14. **Copy yang mengandung kata terlarang di §8 Voice**, atau copy yang menjual produk padahal bisnisnya jasa pengembangan.
15. **CTA yang tidak sesuai isi halaman** (mis. "Masuk", "Coba Gratis", "Demo") — halaman ini company profile, tidak ada login atau demo.

Setiap violation di atas harus diperbaiki, bukan diabaikan dengan alasan "penting untuk konversi".

---

## Implementasi

Semua section adalah **Server Component** kecuali `SiteHeader` (butuh scroll spy). Jangan tambahkan `"use client"` tanpa alasan eksplisit.

- **Konten** (teks, daftar layanan, langkah, fakta perusahaan, kontak) ada di `components/sections/data.ts`. Mengganti copy tidak menyentuh layout. Ia berada di `components/` supaya class Tailwind di dalamnya (mis. warna `tile`) ikut ter-scan.
- **Primitif UI** di `components/ui/`: `Icon`, `Decor`, `Mark`, `Section` (`Container`, `SectionHeading`), `BrowserFrame`, `buttonStyles`.
- **Font** lewat `next/font` dengan `display: "swap"` dan CSS variable `--font-heading` / `--font-body`. Jangan `<link>` ke Google Fonts di markup.
- Tailwind `content` mencakup `app`, `components`, `features`, `stores`, `lib` — kalau menambah folder source baru, tambahkan juga ke `tailwind.config.ts` atau class-nya akan ter-purge.
- Data legalitas di kartu profil diambil dari dokumen resmi perusahaan. Jangan menambah data pribadi (NIK, nama pemegang saham, komposisi saham, NPWP) tanpa persetujuan eksplisit.

---

## Status dokumen ini

Dokumen ini adalah **source of truth untuk setiap keputusan visual** di repo ini. Tidak ada dokumen lain yang boleh mengulang atau menimpa aturan di sini — kalau spec atau komentar kode bertentangan dengan dokumen ini, dokumen ini yang menang.

Satu-satunya cara mengubahnya adalah mengubah dokumen ini lebih dulu, lalu menyesuaikan kode. Kalau aturan di sini berubah, Section 10 (Anti-patterns) yang pertama harus diperbarui — bagian itu yang paling cepat usang.

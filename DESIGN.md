# DESIGN.md — PT TOP SOLVIX LABS

Design system untuk company profile `solvix-landing`. Dokumen ini adalah kontrak visual: kalau sebuah keputusan tidak ada di sini, jangan Creativity — tanya dulu.

Gaya: **Light Editorial Calm** (referensi: Stripe, Anthropic). Prinsip: banyak whitespace, tipografi yang menanggung beban visual, **satu** sistem emphasis, warna aksen diperlakukan sebagai tanda baca bukan dekorasi.

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

Varian navbar memakai file **ber-alpha** (bukan berlatar putih). Alasannya teknis, bukan selera: navbar memakai `cream` `#FBFAF7`, dan logo berlatar putih `#FFFFFF` di atasnya memunculkan kotak putih yang subtly berbeda — junction yang selalu dikeluhkan. File transparan menghapus junction itu tanpa mengubah warna background apa pun. Warna mark sendiri tidak berubah: `#0B2545` 91% + `#2B7FFF` 9%, persis sama seperti varian berlatar putih.

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

Token ini adalah satu-satunya sumber kebenaran warna. mapped ke `tailwind.config.ts` → `theme.extend.colors`.

| Token       | Hex       | Token      | Hex       |
| ----------- | --------- | ---------- | --------- |
| `navy`      | `#0B2545` | `cream`    | `#FBFAF7` |
| `navy-soft` | `#1B3A5C` | `paper`    | `#FFFFFF` |
| `accent`    | `#2B7FFF` | `hairline` | `#E7E5DF` |
| `text`      | `#0B2545` |            |           |
| `body`      | `#4A5C70` |            |           |
| `muted`     | `#8A97A5` |            |           |

Aturanakai warna — ini bagian yang paling sering dilanggar:

- **Background halaman SELALU `cream`.** Bukan putih. Cards memakai `paper` supaya ada satu tingkat pemisahan. Halaman tanpa section gelap tidak perlu bg gelap —-itulahSection 1 yang lexer.
- **`accent` adalah tanda baca, bukan chrome.** Boleh muncul di: CTA utama, **satu kata** di dalam heading (dengan style italic serif, bukan warna), eyebrow label di atas section heading, link inline di body, dan angka metrik di portofolio. Di luar itu: jangan.
- **Maksimal satu kemunculan `accent` per viewport.** Kalau dua section terlihat bersamaan (setelah scroll),_section yang bawah belum boleh pakai accent. Ini yang bikin halaman terasa mahal.
- **Tidak ada warna lain.** Tidak ada abu-abu di luar `hairline`/`muted`, tidak ada warna status, tidak ada warna dari identitas proyek di portofolio. Biru + navy + netral itu seluruh palet.
- Tidak ada `shadow` di mana pun. Pemisahan antar card hanya lewat `hairline` 1px. Kalau sebuah card butuh "mengambang", itu tanda desainnya salah, bukan tanda perlu shadow.

Tailwind mapping:

```ts
colors: {
  navy: "#0B2545",
  "navy-soft": "#1B3A5C",
  accent: "#2B7FFF",
  cream: "#FBFAF7",
  paper: "#FFFFFF",
  hairline: "#E7E5DF",
  text: "#0B2545",
  body: "#4A5C70",
  muted: "#8A97A5",
}
```

> `cn()` di `lib/utils.ts` cuma filter+join — **tidak** ada Tailwind conflict resolution (`clsx`/`tailwind-merge` tidak terpasang). Jangan menulis class yang bergantung pada override; nilai warna selalu ditulis utuh.

---

## 3. Typography

Dua keluarga saja. Tidak ada font display ketiga, tidak ada mono.

- **Plus Jakarta Sans** — seluruh halaman. Weight yang boleh dipakai: `300`, `400`, `500`. **Jarang `600`.** Kalau butuh lebih tegas, naikkan size atau turunkan warna, bukan tambah bold.
- **Source Serif 4, italic** — **hanya** untuk satu kata/frasa emphasis di dalam heading, dan angka besar di portofolio. Ini satu-satunya sumber emphasis di seluruh sistem.

### Type ramp

| Peran       | Desktop                    | Mobile | Weight           | Tracking   | Line-height |
| ----------- | -------------------------- | ------ | ---------------- | ---------- | ----------- |
| Hero H1     | `clamp(36px, 5.6vw, 66px)` | —      | 300              | `-0.028em` | 1.1         |
| Section H2  | `clamp(28px, 3.6vw, 44px)` | —      | 300              | `-0.025em` | 1.18        |
| Card H3     | `20px`                     | —      | 500              | `-0.012em` | 1.25        |
| Sub-heading | `22px`                     | —      | 400              | `-0.015em` | 1.2         |
| Body        | `16px`                     | —      | 300              | normal     | 1.65        |
| Card body   | `15.5px`                   | —      | 300              | normal     | 1.7         |
| Eyebrow     | `12px`                     | —      | 500              | `0.2em`    | 1           |
| Big number  | `26px`                     | —      | 300 serif italic | `-0.02em`  | 1           |
| Nav link    | `14.5px`                   | —      | 400              | normal     | 1           |
| Button      | `15px`                     | —      | 500              | normal     | 1           |

Aturan yang tidak bisa ditawar:

- **Prose minimal 16px.** Card body boleh 15.5px sesuai ramp di atas — itu satu-satunya pengecualian. Tidak ada 14px atau lebih kecil untuk konten; nav link 14.5px dan eyebrow 12px itu navigasi dan label, bukan konten yang dibaca.
- **Body weight 300.** Ini yang bikin terasa tenang. Jangan pakai 400 untuk body copy; 400 hanya untuk card H3 dan nav.
- **Heading selalu weight 300.** Tidak ada headingtebal di dokumen ini. Kalau sebuah heading terasa lemah, naikkan `letter-spacing` atau ubah strukturnya.
- Emphasis = **italic serif**, selalu. Tidak pernah pakai `font-bold` atau warna sebagai alat emphasis lain. Kalau butuh dua kata menonjol dalam satu heading, dua kata itu italic serif.
- Tidak ada `text-transform: uppercase` selain eyebrow label.

Font loading: pakai `next/font` di `app/layout.tsx` dengan `display: "swap"`, variable font, dan expose sebagai CSS variable (`--font-sans`, `--font-serif`). Jangan `<link>` ke Google Fonts di markup — itu hanya benar di mockup throwaway.

---

## 4. Spacing

Base unit **4px**. Semua spacing kelipatan 4.

| Konteks                             | Nilai                                               |
| ----------------------------------- | --------------------------------------------------- |
| Inline terkecil (ikon ↔ teks, chip) | `8px`                                               |
| Padding button                      | `15px 32px`                                         |
| Padding card                        | `44px 38px`                                         |
| Gap antar elemen dalam card         | `12px`–`16px`                                       |
| Padding antar section               | `110px` atas/bawah                                  |
| Gap grid antar card                 | `24px`                                              |
| Max width konten                    | `1120px`, padding horizontal `36px` (mobile `24px`) |
| Section eyebrow → heading           | `28px`                                              |
| Heading → sub-heading               | `18px`                                              |
| Sub-heading → grid card             | `64px`                                              |

- Padding section **tidak** boleh dikompres di mobile. `110px → 80px` boleh terjadi, `110px → 40px` tidak. Whitespace yang hilang adalah yang bikin halaman terasa sempit di HP.
- Tidak ada nilai spacing ganjil: `35px`, `22px`, `13px` salah.

---

## 5. Components

Semua komponen di `components/sections/` kecuali primitif di `components/ui/`.

**Section wrapper** — setiap section punya bentuk yang sama: eyebrow → heading (dengan satu kata italic serif) → sub-heading opsional → konten. Section wrapper hanya menangani spacing dan max-width, tidak warna background.

```tsx
<Section id="layanan" eyebrow="Layanan">
  <h2>Enam layanan untuk <em>siklus hidup</em> produk digital Anda.</em></h2>
  <p>Dari riset kebutuhan sampai pemeliharaan berkelanjutan.</p>
</Section>
```

`em` di dalam `h2` = kata emphasis. Aturan: **tepat satu** `em` per heading, tidak lebih.

| Komponen            | Spec                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Card**            | bg `paper`, border `1px` `hairline`, `radius: 6px`, **tanpa shadow**. Padding `44px 38px`. Hover hanya `border-color` → `navy`, **tanpa** translate/transform.                              |
| **Button primary**  | bg `navy`, teks `paper`, `radius: 4px`, weight 500. Hover → bg `navy-soft`.                                                                                                                 |
| **Button link**     | transparan, teks `accent`, `border-bottom: 2px` `accent`, padding-bottom `2px`. Hover: warnanya tetap.                                                                                      |
| **Card numbered**   | nomor dengan **serif italic** `accent`, bukan mono, bukan bold sans. Ini yang membedakan dari template agency.                                                                              |
| **Process item**    | grid `120px / 1fr`, nomor serif italic besar (`44px`), dipisah `border-top: 1px` `hairline`. Item terakhir punya `border-bottom`.                                                           |
| **Portfolio card**  | area visual atas `170px` dengan bg `#EEF3FA` → `#DCE7F5` gradient dan angka serif italic besar `accent` (bukan foto stok). Body `paper`.                                                    |
| **Team avatar**     | bulat, `112px`, gradient `#E6EEF9` → `#CFDEF2`, inisial `navy` weight 300. Bukan foto orang.                                                                                                |
| **Pull quote band** | satu-satunya tempat `navy` full-bleed di halaman: bg `navy`, teks `paper`, serif italic, `padding: 80px 0`. Maksimal **satu** di seluruh halaman.                                           |
| **Footer**          | bg `navy`, teks `rgba(255,255,255,.65)`, tautan hover → putih.                                                                                                                              |
| **Hero motif**      | motif garis/grid teknis `hairline` di atas `cream`, opacity rendah (`4%`–`8%`). **Bukan** gradient, **bukan** foto, **bukan** ilustrasi. `cream` tetap warna background — §2 tidak berubah. |

---

## 6. Layout

- **Satu halaman panjang**, scroll dengan anchor navigation. Header sticky dengan backdrop-blur, bg `cream`/`rgba(251,250,247,.9)`, `border-bottom: 1px` `hairline`, tinggi `76px`.
- Section berurutan: `Hero → Pull quote → Layanan → Proses → Portofolio → Tim → Kontak → Footer`.
- **Hero mengisi sisa viewport dan isinya center vertikal.** `min-height: calc(100dvh - 76px)` — `76px` adalah tinggi header sticky, jadi hero tepat mengisi layar tanpa shove. Pakai **`dvh`**, bukan `vh`: address bar HP yang muncul/menghilang tidak boleh menggeser centering. Padding vertikal hero (`80px`/`96px`) hanya sebagai breathing room, bukan untuk mendorong konten ke bawah. Centering harus datang dari `min-height` plus flex, bukan dari padding — kalau padding yang kedua, blok akan terlihat melayang tinggi di layar besar.
- **Section heading selalu center-aligned** dengan `max-width: 660px`. Konten (card grid) boleh full container width. Pola ini yang bikin halaman terasa seperti majalah, bukan landing page SaaS.
- Card grid: layanan `2 kolom` (desktop), `1 kolom` (< 620px). Portofolio `3 kolom` → `1`. Tim `4 kolom` → `2` → `1`.
- Section **tidak** dimulai dengan padding vertikal yang.flowBH di mobile — rhythm dari spacing section yang konsisten sudah cukup.

Hero dikecualikan dari dua aturan di halaman ini, dan hanya Hero: ia memakai `min-height` viewport + centering vertikal (§6), dan ia memakai motif garis tipis di atas `cream` (§5) alih-alih block warna atau gradient. Section setelah Hero tetap `110px` atas/bawah dan tetap tanpa background block.

- Konten di dalam card selalu justify ke kiri. Tidak ada `text-center` di dalam card, kecuali Team.

---

## 7. Voice

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

## 8. Motion

Motion di dokumen ini **sangat sedikit dan lambat**. Setiap transisi hanya `color` atau `border-color`, `150ms`–`220ms`, `ease`.

| Elemen         | Hover                                | Durasi  |
| -------------- | ------------------------------------ | ------- |
| Card           | `border-color: hairline → navy`      | `220ms` |
| Button primary | `background-color: navy → navy-soft` | `200ms` |
| Nav link       | `color`                              | `150ms` |
| Button link    | tidak ada perubahan                  | —       |

Larangan mutlak: tidak ada fade-in saat scroll, tidak ada parallax, tidak ada animasi loop, tidak ada animasi hero, tidak ada `framer-motion`. Halaman ini menang dengan tipografi dan whitespace, bukan gerakan. Animasi di sini akan langsung mengubah karakter brand dari "tenang" jadi "startupicorn".

Kalau `--prefers-reduced-motion` relevan: karena tidak ada motion yang berarti, tidak perlu handling tambahan.

---

## 9. Anti-patterns

Bagian ini yang paling load-bearing. Semuanya **dilarang**:

1. **Drop shadow di card.** Pemisahan hanya `hairline` 1px.
2. **Gradient pada background section.** Hanya boleh di `hero-vis` (tidak dipakai di style ini) dan area visual card portofolio.
3. **Warna aksen lebih dari satu kali per viewport.**
4. **Heading bold.** Semua heading weight 300.
5. **Body text di bawah 16px.**
6. **Lebih dari satu `em` (italic serif) per heading.**
7. **Border radius di atas 8px.** Card 6px, button 4px. Pengecualian: `icon.png` / favicon, yang mengikuti rasio app icon platform (`224px` di kanvas `1024` ≈ 22%). Batas 8px ini mengikat komponen di dalam halaman, bukan aset platform.
8. **`text-transform: uppercase` di luar eyebrow.**
9. **Ikon emoji sebagai dekorasi** (`💻 📱 🔗`). Kalau butuh ikon, pakai icon line-weight 1.5px, atau tidak ada.
10. **Foto stok orang di ruang kerja.** Team pakai inisial, portofolio pakai angka/nama industri.
11. **Card yang hover-nya translate/zoom.** Hanya border-color.
12. **Count-up number, marquee logo, testimonial carousel, FAQ accordion.** Tidak ada interaksi yang tidak melayani tujuan.
13. **Copy yang mengandung salah satu kata terlarang di Section 7.**
14. **Section dengan background gelap lebih dari satu** (pull quote + footer + contact boleh, tapi tidak boleh jadi pola berulang di tengah halaman).

Setiap violation di atas harus diperbaiki, bukan diabaikan dengan alasan "penting untuk konversi".

---

## Implementasi

Semua section adalah **Server Component** kecuali `SiteHeader` (butuh scroll spy active state). Jangan tambahkan `"use client"` tanpa alasan eksplisit.

Tailwind `content` sudah mencakup `app`, `components`, `features`, `stores`, `lib` — kalau menambah folder source baru, tambahkan juga ke `tailwind.config.ts` atau class-nya akan ter-purge.

Mockup referensi untuk 4 arah desain ada di folder temp (throwaway, bukan bagian repo). Style yang dipakai adalah **B — Light Editorial Calm**; A/C/D tidak dipakai.

---

## Status dokumen ini

Dokumen ini adalah **source of truth untuk setiap keputusan visual** di repo ini. Tidak ada dokumen lain yang boleh mengulang atau menimpa aturan di sini — kalau spec atau komentar kode bertentangan dengan dokumen ini, dokumen ini yang menang.

Satu-satunya cara mengubahnya adalah mengubah dokumen ini lebih dulu, lalu menyesuaikan kode. Kalau aturan di sini berubah, Section 9 (Anti-patterns) yang pertama harus diperbarui — bagian itu yang paling cepat usang.

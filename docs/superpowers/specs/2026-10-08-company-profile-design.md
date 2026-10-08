# Spec — Company Profile PT TOP SOLVIX LABS

**Status:** menunggu review
**Tanggal:** 2026-10-08
**Stack:** Next.js 16.4 App Router, React 19, Tailwind, TypeScript

> **Source of truth untuk aturan visual adalah `DESIGN.md`, bukan dokumen ini.**
>
> Spec ini hanya berwenang atas **scope, arsitektur, dan kriteria selesai**. Ia tidak mengulang aturan warna, tipografi, spacing, komponen, voice, atau anti-pattern — kalau ia mengulang, Guidelines itu akan berbeda dalam dua tempat dan tidak ada yang menang.
>
> Kalau ada konflik antara keduanya:
> - pertanyaan **"seperti apa tampilannya?"** → jawabannya `DESIGN.md`, tanpa kecuali.
> - pertanyaan **"apa yang dibangun dan kapan dianggap selesai?"** → jawabannya spec ini.
>
> Mengubah `DESIGN.md` berarti mengubah spec. Mengubah spec tidak berarti mengubah `DESIGN.md`.

---

## 1. Tujuan

Ganti halaman utama `solvix-landing` dari demo produk menjadi company profile publik untuk PT TOP SOLVIX LABS — perusahaan pengembangan software yang menyelesaikan masalah operasional bisnis melalui solusi digital.

Halaman ini untuk兩 hal: memberi calon klien gambaran bahwa kami bisa扎得住 pekerjaan teknis, dan memberi mereka jalan yang jelas untuk menghubungi kami. Bukan dashboard, bukan produk SaaS, bukan halaman login.

## 2. Di luar scope

- Tidak ada backend, tidak ada form yang POST. CTA = link WhatsApp/email statis.
- Tidak ada CMS. Copy diubah lewat edit file.
- Tidak ada dark mode, tidak ada bahasa Inggris.
- Tidak ada halaman detail terpisah. Satu halaman dengan anchor navigation.
- Tidak ada animasibeyond hover 150–220ms.
- Tidak ada SEO advanced (sitemap, robots, OG image) — halaman company profile satu halaman tidak butuh.
- Tidak ada halaman 404 kustom (App Router default sudah adequate).

## 3. Keputusan yang sudah dikunci

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Letak halaman | Home `/` diganti company profile | Company profile adalah wajah perusahaan, bukan demo |
| Bahasa | Bahasa Indonesia | Konsisten dengan konvensi string repo dan positioning lokal |
| Struktur | Satu halaman panjang + anchor nav | Repo kecil, mudah dirawat, cukup untuk 6 section |
| Gaya | B — Light Editorial Calm | Sudah dipilih lewat perbandingan 4 mockup |
| Demo | UI demo dibuang, infrastruktur HTTP/auth dipertahankan | Menjaga 6 test coverage + AGENTS.md tetap akurat |
| `components/ui` | `Button` dipakai, `Input` + `Toast` dihapus | Hindari dead code |
| Konten | Placeholder struktur dulu, copy asli menyusul | Copy final belum tersedia |
| CTA | Link WhatsApp/email statis | Tidak butuh backend |

## 4. Arsitektur

### 4.1 Peta perubahan file

Semua keputusan visual (warna, font, spacing, komponen, voice, anti-patterns) dirujuk ke `DESIGN.md`. Daftar di bawah hanya menyebut nama file dan perannya, bukan menentukan penampilannya.

**Dokumen** — sudah ada, sudah disetujui, **bukan output implementasi**. Tidak ada langkah yang menghasilkannya:

| File | Peran |
|---|---|
| `DESIGN.md` | **Source of truth untuk semua aturan visual** |
| `docs/superpowers/specs/2026-10-08-company-profile-design.md` | Dokumen ini — scope, arsitektur, kriteria selesai |

**Dibuat oleh implementasi:**

```
public/brand/logo-on-light.png        ← Logo-Utama-TopSolvix-Terang.png (latar putih → navbar)
public/brand/logo-on-navy.png         ← Logo-Utama-TopSolvix-Gelap.png  (latar navy → footer)
public/brand/icon.png                 ← Icon-TopSolvix-Terang.png       (latar putih → favicon)
app/icon.png                          ← sama dengan icon.png (konvensi App Router untuk favicon)
components/ui/Section.tsx            ← section wrapper primitive
components/layout/SiteHeader.tsx     ← client, sticky + scroll spy
components/layout/SiteFooter.tsx     ← server
components/sections/Hero.tsx
components/sections/PullQuote.tsx
components/sections/Services.tsx
components/sections/Process.tsx
components/sections/Portfolio.tsx
components/sections/Team.tsx
components/sections/Contact.tsx
```

> `DESIGN.md` dan spec ini sengaja tidak ada di daftar ini — keduanya dokumen planning yang sudah ada sebelum implementasi dimulai.

**Dimodifikasi:**

```
tailwind.config.ts    → theme.extend.colors (9 token dari DESIGN.md §2)
app/globals.css       → font variables + base body style
app/layout.tsx        → next/font, metadata baru, hapus wrapper max-w-3xl
app/page.tsx          → komposisi 7 section
AGENTS.md             → hapus referensi feature/auth yang tidak ada lagi
```

**Dihapus:**

```
app/login/page.tsx
features/auth/**                       (7 file: components, hooks, schema, service, store)
features/product/**                    (4 file)
components/ui/input.tsx
components/ui/toast.tsx
```

**Dipertahankan tanpa perubahan:**

```
lib/fetcher.ts, lib/api-error.ts, lib/config.ts
lib/__tests__/fetcher.test.ts          (6 test — regression gate)
stores/auth.ts
proxy.ts
components/ui/button.tsx
app/error.tsx, app/loading.tsx
```

### 4.2 Aturan boundary

Mengikuti konvensi yang sudah ada di AGENTS.md:

- Semua section adalah **Server Component**. Hanya `SiteHeader` yang `"use client"` (butuh scroll spy). Jangan tambahkan `"use client"` tanpa alasan.
- `components/ui/` tetap primitif presentasional. `Button` yang dipakai ulang tidak boleh berubah jadi spesifik company profile.
- `lib/` tidak boleh di-import oleh komponen presentasional. Infrastruktur HTTP berdiri sendiri; company profile tidak memanggil API.
- Tidak ada `fetch` di mana pun di halaman ini.

### 4.3 Struktur halaman

Urutan section dan anchor-nya adalah keputusan arsitektur. Semua detail tampilannya — warna, ukuran, radius, spacing, tipografi — ditentukan `DESIGN.md` §2–§6, bukan di sini.

```
SiteHeader      sticky, anchor ke #layanan #proses #portofolio #tim #kontak
Hero            section pembuka: identitas + CTA utama
PullQuote       satu band kutipan; satu-satunya blok solid di tengah halaman
Services        6 layanan
Process         5 tahap alur kerja
Portfolio       3 studi kasus
Team            4 anggota
Contact         CTA penutup + kanal kontak
SiteFooter      penutup
```

Tepat satu `SiteHeader` dan satu `SiteFooter` per halaman. Section urutan tengah boleh ditambah atau dipindah, tapi tidak boleh ada blok dark kedua di tengah halaman tanpa persetujuan ulang `DESIGN.md`.

## 5. Model konten

Semua copy hardcoded sebagai konstanta lokal di file section masing-masing. Tidak ada file konten terpisah, tidak ada CMS — inigregi cukup untuk satu halaman.

Struktur data per section:

- `Services` — array 6 `{ title, description }`, key untuk React
- `Process` — array 5 `{ title, description }`
- `Portfolio` — array 3 `{ industry, title, description, metric }`
- `Team` — array 4 `{ initials, name, role }`

### 5.1 Placeholder yang wajib diganti

Copy sekarang placeholder. Yang **wajib** diganti sebelum situs dianggap final:

1. Semua heading, sub-heading, dan body copy — 6 section
2. Nomor WhatsApp dan email di `Contact`
3. Nama tim di `Team`
4. **Angka metrik portofolio** (`-40%`, `12jt`, `99.9%`) — ini data fiktif. `DESIGN.md` §7 melarang klaim yang tidak bisa dibuktikan. Jangan loloskan angka placeholder ke produksi.

Nomor placeholder yang akan dipakai sebagai pola: `0812-xxxx-xxxx`, `kontak@topsolvixlabs.co.id`.

## 6. Error handling

Company profile statis tidak punya error runtime yang perlu ditangani. Yang perlu dijaga:

- `app/error.tsx` yang sudah ada tetap dipakai — biarkan apa adanya, jangan restyle (di luar scope visual).
- Font gagal load → `next/font` dengan `display: "swap"` sudah mencegah layout shift fatal.
- Anchor scrollspy tidak menemukan section → komponen harus tolerate `IntersectionObserver` tanpa match, jangan throw.
- Tidak ada `loading.tsx` baru dibutuhkan; halaman ini prerender statis.

## 7. Rencana implementasi

Setiap langkah harus独立的 dan terverifikasi sebelum lanjut.

| # | Langkah | Verifikasi |
|---|---|---|
| 1 | Salin logo ke `public/brand/`, buat `favicon.ico` | File ada, `next/image` atau `<img>` resolve |
| 2 | Token warna di `tailwind.config.ts` | `npm run build` sukses |
| 3 | Font + base style di `globals.css` & `layout.tsx` | Font ter-load, `curl /` 200 |
| 4 | `components/ui/Section.tsx` | typecheck |
| 5 | `SiteFooter` + `SiteHeader` | typecheck |
| 6 | Section: Hero → PullQuote → Services → Process → Portfolio → Team → Contact | typecheck tiap section |
| 7 | `app/page.tsx` komposisi | `npm run dev` → 200 di `/` |
| 8 | Hapus demo (`app/login`, `features/**`, `Input`, `Toast`) | `npm run typecheck` 0 error, `npm test` 6 pass |
| 9 | Update `AGENTS.md` | tidak ada referensi ke file yang sudah dihapus |
| 10 | Verifikasi penuh | lihat §8 |

Langkah 8走在最后 dengan sengaja: selama demo masih ada, `npm test` masih punya cakupan dan rollback mudah.

## 8. Testing & verifikasi

Tidak ada unit test baru untuk section — semuanya server component tanpa logika. Verifikasi dilakukan di level aplikasi:

```
npm run typecheck   # 0 error
npm test            # 6 pass (regression gate — wajib, infra HTTP tidak boleh rusak)
npm run lint        # 0 error, warning lama tetap 2
npm run build       # sukses, / prerendered
npm run start       # HTTP 200 di /
```

Pemeriksaan visual manual — wajib, karena tidak ada test yang menangkap regressi visual:

1. Halaman `bg-cream` (bukan putih) — cek dengan inspect
2. Tidak ada drop shadow di card mana pun
3. Aksen biru maksimal satu kemunculan per viewport, saat scroll
4. Semua heading weight 300 (bukan bold)
5. Tepat satu `em` italic serif per heading
6. Body text minimal 16px
7. Mobile 375px: card jadi 1 kolom, padding section tetap lega
8. Logo header = varian gelap, logo footer = varian terang

## 9. Kriteria selesai

Selesai bila:

- [ ] `npm run typecheck` → 0 error
- [ ] `npm test` → 6 pass
- [ ] `npm run lint` → 0 error
- [ ] `npm run build` → sukses
- [ ] `npm run start` → HTTP 200 di `/`
- [ ] Ketiga file logo ter-load di header, footer, dan favicon
- [ ] `app/login`, `features/auth`, `features/product`, `components/ui/input.tsx`, `components/ui/toast.tsx` tidak ada
- [ ] `lib/` dan `stores/auth.ts` tidak berubah
- [ ] `AGENTS.md` tidak menyebut file yang sudah dihapus
- [ ] Pemeriksaan visual §8 nomor 1–8 lolos
- [ ] Tidak ada satu pun aturan Anti-patterns di `DESIGN.md` §9 yang dilanggar

## 10. Pertanyaan terbuka

Tidak memblokir implementasi — placeholder menutupi semuanya. Perlu dijawab sebelum situs dianggap final:

1. **Nomor WhatsApp dan email** yang sebenarnya
2. **Copy final** untuk 6 section
3. **Nama tim** dan apakah ada foto (mengubah keputusan avatar inisial)
4. **Angka metrik portofolio** yang bisa dibuktikan
5. **Alamat lengkap kantor** (sekarang "Jakarta, Indonesia")
6. **Nama domain** untuk link di footer/metadata

## 11. Di luar repo

Folder mockup di `%TEMP%\opencode\solvix-design` bersifat sekali pakai untuk pemilihan arah desain — A/C/D tidak dipakai dan tidak perlu disimpan. `DESIGN.md` adalah dokumen yang bertahan.
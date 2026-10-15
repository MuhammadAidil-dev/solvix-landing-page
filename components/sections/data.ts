import {
  IconBox,
  IconBuilding,
  IconCart,
  IconChart,
  IconCode,
  IconDoc,
  IconGear,
  IconId,
  IconLink,
  IconPin,
  IconStore,
  IconWrench,
} from "../ui/Icon";

/**
 * Konten halaman. Berada di `components/` supaya class Tailwind di dalamnya
 * (mis. `tile`) ikut ter-scan.
 */

export const WHATSAPP_HREF = "https://wa.me/6282282873453";
export const EMAIL = "topsolvixlabs@gmail.com";
export const PHONE_LABEL = "+62 822-8287-3453";
export const INSTAGRAM_HREF = "https://www.instagram.com/topsolvix.labs";
export const TIKTOK_HREF = "https://www.tiktok.com/@topsolvix.labs";

export const NAV = [
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Proses", href: "#proses" },
  { label: "Portofolio", href: "#portofolio" },
  { label: "Kontak", href: "#kontak" },
];

export const FACTS = [
  "PT TOP SOLVIX LABS",
  "Akta Nomor 22, 19 Agustus 2026",
  "Tembilahan, Kab. Indragiri Hilir, Riau",
];

export const PROFILE = [
  {
    icon: IconBuilding,
    label: "Badan hukum",
    value: "PT TOP SOLVIX LABS",
    note: "Perseroan Terbatas, swasta nasional",
  },
  {
    icon: IconDoc,
    label: "Pengesahan Menteri Hukum",
    value: "AHU-0069837.AH.01.01.TAHUN 2026",
    note: "Ditetapkan 31 Agustus 2026",
  },
  { icon: IconDoc, label: "Akta pendirian", value: "Nomor 22", note: "19 Agustus 2026" },
  {
    icon: IconId,
    label: "Nomor Induk Berusaha",
    value: "0909260097813",
    note: "Usaha Mikro, terbit 9 September 2026",
  },
  {
    icon: IconCode,
    label: "KBLI",
    value: "62199",
    note: "Aktivitas Pemrograman Komputer Lainnya",
  },
  {
    icon: IconPin,
    label: "Alamat kantor",
    value: "Jl. Sri Gemilang, Lorong Taman Husada",
    note: "Pekan Arba, Tembilahan, Kab. Indragiri Hilir, Riau 29212",
  },
];

export const BUSINESS_LINES = [
  {
    icon: IconCode,
    title: "Pengembangan perangkat lunak",
    description: "Aplikasi bisnis, web, dan basis data yang dibuat sesuai kebutuhan klien.",
  },
  {
    icon: IconCart,
    title: "Pengembangan e-commerce",
    description: "Aplikasi toko online untuk jual-beli barang dan jasa lewat internet.",
  },
  {
    icon: IconBox,
    title: "Penerbitan perangkat lunak",
    description: "Aplikasi siap pakai, termasuk aplikasi bisnis dan teknologi finansial.",
  },
  {
    icon: IconStore,
    title: "Perdagangan eceran perangkat lunak",
    description: "Penjualan perangkat lunak eceran bagi pengguna akhir.",
  },
];

export const SERVICES = [
  {
    icon: IconCode,
    tile: "bg-accent",
    title: "Aplikasi Web",
    description: "Aplikasi web kustom yang terdokumentasi dan mudah dirawat tim Anda.",
    scope: ["Dashboard admin", "Portal pelanggan", "Aplikasi internal"],
  },
  {
    icon: IconLink,
    tile: "bg-accent-soft",
    title: "Integrasi Sistem",
    description:
      "Menghubungkan sistem lama, API pihak ketiga, dan basis data internal dalam satu alur.",
    scope: ["REST API", "Sistem legacy", "Sinkronisasi data"],
  },
  {
    icon: IconChart,
    tile: "bg-accent-pale",
    title: "Dashboard & Analitik",
    description:
      "Data operasional ditampilkan jelas, sehingga keputusan bisnis lebih cepat diambil.",
    scope: ["Laporan real-time", "Visualisasi data", "Ekspor laporan"],
  },
  {
    icon: IconGear,
    tile: "bg-navy-soft",
    title: "Otomasi Proses",
    description: "Pekerjaan manual yang berulang dialihkan ke alur kerja otomatis.",
    scope: ["Alur kerja", "Notifikasi otomatis", "Penjadwalan tugas"],
  },
  {
    icon: IconWrench,
    tile: "bg-accent",
    title: "Pemeliharaan & Support",
    description: "Monitoring, perbaikan bug, dan peningkatan performa setelah sistem berjalan.",
    scope: ["Monitoring", "Perbaikan bug", "Optimasi performa"],
  },
];

export const STEPS = [
  {
    num: "01",
    title: "Discovery & Analisis",
    description:
      "Kami memahami masalah bisnis Anda, lalu menyepakati kebutuhan dan batasan proyek.",
    outputs: ["Dokumen requirement", "Scope proyek"],
  },
  {
    num: "02",
    title: "Desain Sistem",
    description: "Arsitektur, basis data, dan keputusan teknis ditetapkan sebelum penulisan kode.",
    outputs: ["Arsitektur sistem", "Skema basis data", "Desain antarmuka"],
  },
  {
    num: "03",
    title: "Pengembangan",
    description: "Sistem dibangun bertahap dan ditinjau bersama secara rutin.",
    outputs: ["Rilis bertahap", "Review rutin"],
  },
  {
    num: "04",
    title: "Pengujian",
    description: "Fungsi, performa, dan keamanan diuji sebelum sistem diluncurkan.",
    outputs: ["Uji fungsional", "Uji performa", "Uji keamanan"],
  },
  {
    num: "05",
    title: "Deploy & Pendampingan",
    description: "Sistem diluncurkan, dipantau, dan kami dampingi selama masa operasional awal.",
    outputs: ["Peluncuran", "Monitoring", "Pendampingan"],
  },
];

export const STATS = [
  { value: String(BUSINESS_LINES.length), label: "Bidang usaha" },
  { value: String(SERVICES.length), label: "Layanan" },
  { value: String(STEPS.length), label: "Tahap proses" },
  { value: "2", label: "Proyek live" },
];

export const CASES = [
  {
    industry: "Manajemen Gym",
    title: "TOP GYM",
    description:
      "Aplikasi manajemen gym terpadu: member, absensi, pembayaran, kelas, akses pintu, dan laporan bisnis.",
    href: "https://topgym.my.id/",
    image: "/portfolio/topgym-landing.png",
    imageAlt: "Tampilan halaman utama TOP GYM",
  },
  {
    industry: "Ritel",
    title: "Solvix Retail",
    description:
      "Toko online dengan katalog, keranjang belanja, pelacakan pesanan, dan program member dengan harga khusus.",
    href: "https://solvixretail.my.id/",
    image: "/portfolio/solvix-retail-landing.png",
    imageAlt: "Tampilan halaman utama Solvix Retail",
  },
];

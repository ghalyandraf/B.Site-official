/* =========================================================
   Data paket layanan.
   ========================================================= */

/* Harga domain per tahun (rupiah). needsDoc: butuh dokumen identitas/legalitas */
export const domainExtensions = [
  { ext: ".web.id", price: 25000, needsDoc: false },
  { ext: ".com", price: 160000, needsDoc: false },
  { ext: ".id", price: 300000, needsDoc: true },
];

export const DEFAULT_DOMAIN = ".com";

/*
  webPrice     : biaya pembuatan website (sekali bayar)
  hostingPrice : biaya hosting (per bulan / per tahun sesuai period)
  withDomain   : harga ikut menambah domain pilihan
  period       : "once" | "month" | "year" | "first"
  yearlyPrice  : pasangan harga tahunan untuk opsi hosting
  renewal      : tampilkan info perpanjangan
*/
export const packages = [
  {
    id: "shared-hosting-month",
    webPrice: 0,
    hostingPrice: 150000,
    withDomain: false,
    period: "month",
    renewal: false,
    featured: false,
    id_text: {
      name: "Shared Hosting",
      desc: "Cocok untuk portfolio, landing page, dan company profile.",
      badge: "",
      features: [
        "1 website aktif",
        "15 GB SSD",
        "Akses SSH (Jailed)",
        "Gratis 1 domain .web.id dan SSL untuk pembelian 1 tahun",
      ],
      button: "Pesan Shared Hosting",
    },
  },
  {
    id: "shared-hosting-year",
    webPrice: 0,
    hostingPrice: 1650000,
    withDomain: false,
    period: "year",
    renewal: false,
    featured: false,
    id_text: {
      name: "Shared Hosting / Tahun",
      desc: "Bayar 1 tahun lebih hemat dan dapat gratis 1 bulan. Cocok untuk portfolio, landing page, dan company profile.",
      badge: "HEMAT",
      features: [
        "1 website aktif",
        "15 GB SSD",
        "Akses SSH (Jailed)",
        "Gratis 1 domain .web.id dan SSL untuk pembelian 1 tahun",
      ],
      button: "Pesan Shared Hosting / Tahun",
    },
  },
  {
    id: "private-hosting-month",
    webPrice: 0,
    hostingPrice: 225000,
    withDomain: false,
    period: "month",
    renewal: false,
    featured: true,
    id_text: {
      name: "Private Hosting",
      desc: "Resource terisolasi di data center Indonesia, jadi akses lokal cepat dan kuota tidak dibagi dengan pengguna lain.",
      badge: "REKOMENDASI",
      features: [
        "Website unlimited",
        "60 GB SSD",
        "Data center di Indonesia",
        "Akses SSH (Full Root)",
        "Gratis 1 domain (.com/.id) dan SSL untuk pembelian 1 tahun",
        "2 GB RAM dedicated",
        "IP dedicated",
      ],
      button: "Pesan Private Hosting",
    },
  },
  {
    id: "private-hosting-year",
    webPrice: 0,
    hostingPrice: 2250000,
    withDomain: false,
    period: "year",
    renewal: false,
    featured: true,
    id_text: {
      name: "Private Hosting / Tahun",
      desc: "Bayar 1 tahun lebih hemat dan mendapatkan gratis 2 bulan. Resource terisolasi di data center Indonesia.",
      badge: "HEMAT",
      features: [
        "Website unlimited",
        "60 GB SSD",
        "Data center di Indonesia",
        "Akses SSH (Full Root)",
        "Gratis 1 domain (.com/.id) dan SSL untuk pembelian 1 tahun",
        "2 GB RAM dedicated",
        "IP dedicated",
      ],
      button: "Pesan Private Hosting / Tahun",
    },
  },
  {
    id: "hosting-domain",
    webPrice: 0,
    hostingPrice: 150000,
    withDomain: true,
    period: "year",
    renewal: false,
    featured: false,
    id_text: {
      name: "Hosting + Domain Saja",
      desc: "Paket hosting dan domain untuk kebutuhan website yang sudah ada atau dibuat sendiri.",
      badge: "",
      features: [
        "Domain sesuai ekstensi pilihan",
        "Hosting siap pakai",
        "Setup awal",
        "Dukungan via WhatsApp",
      ],
      button: "Pesan Hosting + Domain",
    },
  },
];

export const packageTexts = {
  id: {
    eyebrow: "PAKET LAYANAN",
    title: "Pilih paket yang pas.",
    desc: "Mau website lengkap, website saja, atau hosting dan domain saja? Harga domain menyesuaikan ekstensi yang kamu pilih.",
    domainTitle: "Pilih ekstensi domain",
    domainHint: "Harga domain per tahun",
    docNote:
      "Ekstensi ini biasanya butuh dokumen identitas atau legalitas untuk pendaftaran.",
    month: "/ bulan",
    year: "/ tahun",
    first: "/ tahun pertama",
    once: "/ project",
    breakdownTitle: "Rincian harga",
    web: "Website",
    hosting: "Hosting",
    domain: "Domain",
    renewLabel: "Perpanjangan tahun berikutnya",
    note: "Harga di atas dapat berubah sesuai kebutuhan, ekstensi domain, dan masa aktif layanan.",
    waIntro: "Halo B.Site, saya tertarik dengan paket berikut:",
    waPackage: "Paket",
    waDomain: "Ekstensi domain",
    waPrice: "Harga",
    waRenew: "Perpanjangan per tahun",
    waOutro: "Boleh minta informasi lebih lanjut?",
  },
  en: {
    eyebrow: "SERVICE PACKAGES",
    title: "Choose the right package.",
    desc: "Need a full website, a website only, or just hosting and a domain? Domain pricing depends on the extension you choose.",
    domainTitle: "Choose a domain extension",
    domainHint: "Domain price per year",
    docNote:
      "This extension usually requires identity or legal documents for registration.",
    month: "/ month",
    year: "/ year",
    first: "/ first year",
    once: "/ project",
    breakdownTitle: "Price breakdown",
    web: "Website",
    hosting: "Hosting",
    domain: "Domain",
    renewLabel: "Renewal for the following year",
    note: "Prices above may change depending on service needs, domain extension, and service period.",
    waIntro: "Halo B.Site, saya tertarik dengan paket berikut:",
    waPackage: "Paket",
    waDomain: "Ekstensi domain",
    waPrice: "Harga",
    waRenew: "Perpanjangan per tahun",
    waOutro: "Boleh minta informasi lebih lanjut?",
  },
};
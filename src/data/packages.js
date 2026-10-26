/* =========================================================
   Data paket layanan. SEMUA ANGKA DI BAWAH ADALAH PLACEHOLDER,
   ganti sesuai harga asli B.Site.
   ========================================================= */

/* Harga domain per tahun (rupiah). needsDoc: butuh dokumen identitas/legalitas */
export const domainExtensions = [
  { ext: ".my.id", price: 15000, needsDoc: false },
  { ext: ".web.id", price: 25000, needsDoc: false },
  { ext: ".com", price: 160000, needsDoc: false },
  { ext: ".net", price: 180000, needsDoc: false },
  { ext: ".id", price: 300000, needsDoc: true },
  { ext: ".co.id", price: 350000, needsDoc: true },
];

export const DEFAULT_DOMAIN = ".com";

/*
  webPrice     : biaya pembuatan website (sekali bayar)
  hostingPrice : biaya hosting per tahun
  withDomain   : apakah harga ikut menambah domain pilihan
  period       : "once" (tahun pertama, lalu perpanjangan) | "year"
  renewal      : tampilkan info perpanjangan tahunan
*/
export const packages = [
  {
    id: "full",
    webPrice: 800000,
    hostingPrice: 300000,
    withDomain: true,
    period: "first",
    renewal: true,
    featured: true,
    id_text: {
      name: "Web + Hosting + Domain",
      desc: "Paket paling lengkap. Website langsung online tanpa kamu repot mengurus hosting dan domain sendiri.",
      badge: "PALING LENGKAP",
      features: [
        "Pembuatan website sesuai kebutuhan",
        "Hosting dan domain sudah termasuk",
        "Setup dan konfigurasi sampai online",
        "Desain responsif di semua perangkat",
        "Konsultasi awal melalui WhatsApp",
      ],
      button: "Pesan Paket Lengkap",
    },
    en_text: {
      name: "Web + Hosting + Domain",
      desc: "The most complete package. Your website goes live without you having to arrange hosting and a domain yourself.",
      badge: "MOST COMPLETE",
      features: [
        "Website built to your needs",
        "Hosting and domain included",
        "Setup and configuration until it's live",
        "Responsive design on all devices",
        "Initial consultation via WhatsApp",
      ],
      button: "Order Complete Package",
    },
  },
  {
    id: "web",
    webPrice: 800000,
    hostingPrice: 0,
    withDomain: false,
    period: "once",
    renewal: false,
    featured: false,
    id_text: {
      name: "Web Saja",
      desc: "Cocok kalau kamu sudah punya hosting dan domain sendiri. Kami fokus ke pembuatan websitenya.",
      badge: "",
      features: [
        "Pembuatan website sesuai kebutuhan",
        "Tanpa hosting dan domain",
        "File website siap diunggah",
        "Desain responsif di semua perangkat",
        "Konsultasi awal melalui WhatsApp",
      ],
      button: "Pesan Web Saja",
    },
    en_text: {
      name: "Website Only",
      desc: "Ideal if you already have your own hosting and domain. We focus on building the website itself.",
      badge: "",
      features: [
        "Website built to your needs",
        "No hosting and domain",
        "Website files ready to upload",
        "Responsive design on all devices",
        "Initial consultation via WhatsApp",
      ],
      button: "Order Website Only",
    },
  },
  {
    id: "hosting",
    webPrice: 0,
    hostingPrice: 300000,
    withDomain: true,
    period: "year",
    renewal: false,
    featured: false,
    id_text: {
      name: "Hosting + Domain Saja",
      desc: "Beli hosting dan domain tanpa pembuatan website. Cocok kalau websitenya sudah jadi atau dibuat sendiri.",
      badge: "",
      features: [
        "Domain sesuai ekstensi pilihan kamu",
        "Paket hosting siap pakai",
        "Bantuan setup awal",
        "Perpanjangan dilakukan tiap tahun",
        "Konsultasi melalui WhatsApp",
      ],
      button: "Pesan Hosting + Domain",
    },
    en_text: {
      name: "Hosting + Domain Only",
      desc: "Buy hosting and a domain without website development. Great if your website is already built or you made it yourself.",
      badge: "",
      features: [
        "Domain with the extension you choose",
        "Ready-to-use hosting plan",
        "Initial setup assistance",
        "Renewed every year",
        "Consultation via WhatsApp",
      ],
      button: "Order Hosting + Domain",
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
    once: "/ project",
    year: "/ tahun",
    first: "/ tahun pertama",
    breakdownTitle: "Rincian harga",
    web: "Website",
    hosting: "Hosting (1 tahun)",
    domain: "Domain",
    renewLabel: "Perpanjangan tahun berikutnya",
    note: "Harga di atas bersifat contoh dan dapat berubah. Konfirmasi harga dan cakupan paket sebelum pembayaran.",
    waIntro: "Halo B.Site, saya tertarik dengan paket berikut:",
    waPackage: "Paket",
    waDomain: "Ekstensi domain",
    waPrice: "Harga",
    waRenew: "Perpanjangan per tahun",
    waOutro: "Boleh minta informasi lebih lanjut?",
  },
  en: {
    eyebrow: "SERVICE PACKAGES",
    title: "Pick the right package.",
    desc: "A complete website, a website only, or just hosting and a domain? Domain prices follow the extension you choose.",
    domainTitle: "Choose a domain extension",
    domainHint: "Domain price per year",
    docNote:
      "This extension usually requires identity or legal documents to register.",
    once: "/ project",
    year: "/ year",
    first: "/ first year",
    breakdownTitle: "Price breakdown",
    web: "Website",
    hosting: "Hosting (1 year)",
    domain: "Domain",
    renewLabel: "Renewal for following years",
    note: "Prices above are samples and may change. Please confirm price and package scope before payment.",
    waIntro: "Halo B.Site, saya tertarik dengan paket berikut:",
    waPackage: "Paket",
    waDomain: "Ekstensi domain",
    waPrice: "Harga",
    waRenew: "Perpanjangan per tahun",
    waOutro: "Boleh minta informasi lebih lanjut?",
  },
};
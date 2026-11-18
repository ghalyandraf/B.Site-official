export const hostingPlans = [
  {
    id: "shared",
    name: "Shared",
    monthly: 150000,
    yearly: 1650000,
    freeMonths: 1,
    desc: "Cocok untuk portfolio, landing page, dan company profile.",
    features: [
      "1 website aktif",
      "15 GB SSD",
      "Akses SSH (Jailed)",
      "Gratis 1 domain .web.id dan SSL untuk pembelian 1 tahun",
    ],
  },
  {
    id: "private",
    name: "Private",
    monthly: 225000,
    yearly: 2250000,
    freeMonths: 2,
    desc: "Resource terisolasi di data center Indonesia, jadi akses lokal cepat dan kuota tidak dibagi dengan pengguna lain.",
    features: [
      "Website unlimited",
      "60 GB SSD",
      "Data center di Indonesia",
      "Akses SSH (Full Root)",
      "Gratis 1 domain (.com/.id) dan SSL untuk pembelian 1 tahun",
      "2 GB RAM dedicated",
      "IP dedicated",
    ],
  },
];
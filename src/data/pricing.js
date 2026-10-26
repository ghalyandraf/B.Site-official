
export const pricing = [
  {
    id: 1,
    name: "Personal Portfolio Template",
    description:
      "Template website personal untuk mahasiswa, pelajar, freelancer, dan pencari kerja.",
    originalPrice: 350000,
    studentDiscount: 30,
    features: [
      "Desain modern dan responsif",
      "Halaman profil dan tentang saya",
      "Bagian keahlian dan proyek",
      "Tautan media sosial",
      "Bantuan instalasi dasar",
    ],
    label: "Student Favorite",
  },
];

export function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

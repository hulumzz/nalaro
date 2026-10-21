export interface Product {
  number: string;
  code: string;
  slug: string;
  category: string;
  name: string;
  description: string;
  focus: string[];
  status: "Live" | "Beta" | "Coming Soon" | "Slot";
  url: string | null;
  isSlot?: boolean;
}

export const products: Product[] = [
  {
    number: "01", code: "N/01", slug: "skripzy", category: "RESEARCH & WRITING",
    name: "Skripzy Workspace",
    description: "Susun riset, analisis data, dan tulis naskah akademik dengan bantuan AI.",
    focus: ["penelitian", "analisis data", "penulisan akademik", "AI research assistant"],
    status: "Live",
    url: "https://ww.skripzy.id",
  },
  {
    number: "02", code: "N/02", slug: "class", category: "EDUCATION & LEARNING",
    name: "Nalaro Class",
    description: "Kelola materi, buat kuis, dan pantau progres siswa dalam satu kelas.",
    focus: ["LMS", "kuis interaktif", "gamifikasi kelas", "materi", "evaluasi"],
    status: "Live",
    url: "https://class.nalaro.digital",
  },
  {
    number: "03", code: "N/03", slug: "enveely", category: "INVITATION & EVENTS",
    name: "Enveely",
    description: "Buat undangan digital dengan informasi acara dan tautan yang mudah dibagikan.",
    focus: ["undangan digital", "acara personal", "desain undangan"],
    status: "Live",
    url: "https://enveely.nalaro.digital",
  },
  {
    number: "04", code: "N/04", slug: "store", category: "COMMERCE & BUSINESS",
    name: "Nalaro Store",
    description: "Buka toko online sendiri. Kelola katalog, stok, dan pesanan dari satu tempat.",
    focus: ["toko online", "etalase produk", "manajemen pesanan", "bisnis & UMKM"],
    status: "Live",
    url: "https://store.nalaro.digital",
  },
];

export const activeProducts = products.filter(p => p.status === "Live" || p.status === "Beta");
export const productCount = activeProducts.length;

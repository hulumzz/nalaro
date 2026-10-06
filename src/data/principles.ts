// src/data/principles.ts

export interface Principle {
  code: string;
  name: string;
  description: string;
}

export const principles: Principle[] = [
  {
    code: "P1",
    name: "Solve First",
    description:
      "Mulai dari masalah nyata. Jika tidak ada masalah yang jelas, jangan bangun.",
  },
  {
    code: "P2",
    name: "Simple by Default",
    description:
      "Pilih solusi paling sederhana yang benar-benar bekerja. Kompleksitas hanya ditambahkan saat dibutuhkan.",
  },
  {
    code: "P3",
    name: "Useful Over Flashy",
    description:
      "Fitur dan desain yang berguna lebih penting daripada yang terlihat mengesankan tetapi tidak dipakai.",
  },
  {
    code: "P4",
    name: "Human-centered",
    description:
      "Setiap keputusan diukur dari dampaknya terhadap orang yang menggunakan produk.",
  },
  {
    code: "P5",
    name: "Build Learn Improve",
    description:
      "Bangun, pelajari hasilnya, perbaiki. Siklus ini tidak pernah selesai.",
  },
];

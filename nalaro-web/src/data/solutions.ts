// src/data/solutions.ts

export interface Solution {
  code: string;
  name: string;
  input: string;
  output: string;
}

export const solutions: Solution[] = [
  {
    code: "S/A",
    name: "Custom Web Application",
    input: "Kebutuhan organisasi",
    output: "Aplikasi web yang pas",
  },
  {
    code: "S/B",
    name: "Information System",
    input: "Administrasi, arsip, inventory, workflow",
    output: "Sistem yang rapi",
  },
  {
    code: "S/C",
    name: "Digital Platform",
    input: "Multi-user, dashboard, database, autentikasi",
    output: "Platform utuh",
  },
  {
    code: "S/D",
    name: "Website & Digital Presence",
    input: "Company profile, portal, landing page",
    output: "Kehadiran digital",
  },
  {
    code: "S/E",
    name: "Custom Digital Solution",
    input: "Masalah spesifik",
    output: "Solusi yang dirancang untuk itu",
  },
];

export const audiences = [
  {
    label: "Individual",
    items: ["Peneliti", "Mahasiswa", "Kreator konten", "Freelancer"],
  },
  {
    label: "Business",
    items: ["Startup", "UMKM", "Perusahaan"],
  },
  {
    label: "Institution",
    items: ["Sekolah", "Universitas", "Lembaga pemerintah"],
  },
  {
    label: "Community",
    items: ["Organisasi", "Komunitas", "NGO"],
  },
];

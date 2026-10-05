// src/data/site.ts — Identitas, kontak, nav, meta

export const site = {
  name: "Nalaro",
  tagline: "Digital Product Studio",
  headline: "We build useful digital products.",
  subheadline:
    "Nalaro membuat SaaS, AI tools, platform pendidikan, dan solusi digital untuk masalah yang nyata.",
  tag: "Ideas into useful digital products.",
  closing: "Build useful things.",
  ctaPrimary: "Explore Products",
  ctaSecondary: "Build With Nalaro",

  domain: "TODO: domain final (mis. nalaro.com / nalaro.id)",
  email: "TODO: email kontak",
  whatsapp: "TODO: nomor format internasional tanpa +",
  social: {
    instagram: "TODO: Instagram",
    linkedin: "TODO: LinkedIn",
    github: "TODO: GitHub",
  },

  logo: "TODO: file logo Nalaro (SVG)",
  founded: "TODO: tahun berdiri",
  location: "TODO: kota/negara",

  // Dihitung otomatis dari products.ts
  get activeProductCount() {
    return 3; // Update ini setelah menghitung dari products.ts
  },
} as const;

export const nav = [
  { id: "index", label: "Index", number: "00" },
  { id: "products", label: "Products", number: "01" },
  { id: "solutions", label: "Solutions", number: "02" },
  { id: "works", label: "Works", number: "03" },
  { id: "lab", label: "Lab", number: "04" },
  { id: "about", label: "About", number: "05" },
  { id: "contact", label: "Contact", number: "06" },
] as const;

export type NavItem = (typeof nav)[number];

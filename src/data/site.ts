const configured = (value: string | undefined) => value?.trim() || "";
export const site = {
  name: "Nalaro",
  tagline: "Digital Product Studio",
  headline: "We build better digital products.",
  subheadline: "Produk untuk riset, kelas, toko online, dan undangan. Kami juga membuat website serta aplikasi sesuai kebutuhanmu.",
  description: "Nalaro Digital membangun produk SaaS, AI untuk riset, platform kelas, toko online, undangan digital, serta website dan aplikasi untuk bisnis maupun pendidikan.",
  closing: "Build better experiences.",
  domain: configured(import.meta.env.PUBLIC_SITE_URL) || "https://nalaro.digital",
  email: configured(import.meta.env.PUBLIC_CONTACT_EMAIL) || "business@nalaro.digital",
  whatsapp: (configured(import.meta.env.PUBLIC_WHATSAPP) || "6285771298582").replace(/\D/g, ""),
  social: { instagram: "", linkedin: "", github: "" },
  logo: "/brand/nalaro.png",
  founded: "", location: "",
  ctaPrimary: "Jelajahi produk",
  ctaSecondary: "Bahas proyek",
};
export const nav = [
  { id: "products", label: "Produk", number: "01" },
  { id: "solutions", label: "Solusi", number: "02" },
  { id: "works", label: "Proses", number: "03" },
  { id: "about", label: "Studio", number: "04" },
] as const;
export type NavItem = (typeof nav)[number];

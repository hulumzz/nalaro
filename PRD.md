# PRD — Website Induk Nalaro

Versi 1.0 · Dokumen ini adalah sumber kebenaran untuk **struktur, konten, dan teknis**. Untuk **visual dan interaksi**, ikuti `Desain.md`.

---

## 0. Instruksi untuk AI Agent (baca dulu)

1. Baca `PRD.md` lalu `Desain.md` sampai habis sebelum menulis kode.
2. Jika PRD dan Desain bertentangan: PRD menang untuk struktur dan isi konten, Desain menang untuk tampilan dan gerak.
3. **Dilarang mengarang** metrik, nama klien, testimoni, logo klien, harga, atau jumlah pengguna. Jika data belum ada, pakai placeholder yang ditandai `TODO:` pada file data (lihat Bagian 3) dan tampilkan state "Segera hadir" sesuai Desain.md.
4. Semua teks yang tampil di halaman harus berasal dari `src/data/*` atau content collection. Tidak boleh ada teks tertanam langsung di komponen, kecuali label UI sistem.
5. Kerjakan per fase (Bagian 11). Setelah tiap fase, jalankan checklist Definition of Done (Bagian 12) sebelum lanjut.
6. Jangan menambah dependensi di luar daftar Bagian 5 tanpa alasan tertulis di `DECISIONS.md`.

---

## 1. Ringkasan

**Nalaro** adalah digital product studio. Website ini adalah pusat ekosistem: memperkenalkan Nalaro, menampilkan produk (Skripzy AI, Nalaro Class, Enveely), menjelaskan Nalaro Solutions, menampilkan Works, Nalaro Lab, dan menjadi pintu kolaborasi.

- Pesan utama: **We build useful digital products.**
- Pesan pendukung: **Ideas into useful digital products.**
- Prinsip: **Build useful things.**
- Identitas utama: **product builder**, bukan agensi website, bukan freelancer, bukan penyedia template. Hindari framing tersebut di seluruh teks dan visual.

## 2. Tujuan dan Ukuran Keberhasilan

| Tujuan | Ukuran |
|---|---|
| Pengunjung paham dalam 5 detik bahwa Nalaro membangun produk | Headline hero + daftar produk terlihat tanpa scroll di desktop |
| Mengarahkan trafik ke 3 produk | Tiap produk punya tautan keluar yang jelas, dapat dilacak (opsional, Bagian 8.6) |
| Menarik calon klien Solutions tanpa mengubah identitas | Kontak tersedia, tetapi Solutions tampil setelah Products |
| Cepat dan stabil | Lighthouse mobile: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95 |
| Mudah dirawat tanpa backend | Konten diubah lewat file data/markdown, deploy otomatis dari Git |

## 3. Data yang Harus Diisi Pemilik (placeholder di `src/data/site.ts`)

Agent harus membuat file dengan field berikut dan menandai yang belum ada dengan `TODO:`. Jangan mengisi dengan data karangan.

| Field | Nilai | Status |
|---|---|---|
| `domain` | TODO: domain final (mis. nalaro.com / nalaro.id) | Belum ada |
| `email` | TODO: email kontak | Belum ada |
| `whatsapp` | TODO: nomor format internasional tanpa `+` | Belum ada |
| `social` | TODO: Instagram / LinkedIn / GitHub bila ada | Belum ada |
| `products.skripzy.url` | TODO: URL produk | Belum ada |
| `products.class.url` | TODO: URL produk | Belum ada |
| `products.enveely.url` | TODO: URL produk | Belum ada |
| `logo` | TODO: file logo Nalaro (SVG). Jika belum ada, pakai wordmark teks sesuai Desain.md | Belum ada |
| `works[]` | TODO: minimal 1 case study nyata | Belum ada |
| `lab[]` | TODO: entri eksperimen nyata | Belum ada |
| `founded` | TODO: tahun berdiri (untuk footer) | Belum ada |
| `location` | TODO: kota/negara (untuk strip metadata) | Belum ada |

Aturan placeholder: jika URL produk masih `TODO`, baris produk tetap tampil tetapi tautan diganti state "Segera hadir" (tidak bisa diklik, tidak ada `href` kosong).

## 4. Ruang Lingkup

**Termasuk (v1)**
- Satu halaman utama dengan 8 section (Bagian 7), navigasi anchor.
- Halaman tambahan statis: `/404`, `/lab/[slug]` dan `/works/[slug]` (dari markdown, hanya dibuat bila ada entri).
- SEO dasar, Open Graph, sitemap, robots, favicon, JSON-LD.
- Form kontak tanpa backend (mailto dan WhatsApp).
- Mode gerak berkurang (reduced motion) dan aksesibilitas keyboard.

**Tidak termasuk (v1)**
- Backend, database, autentikasi, CMS berbayar, komentar, newsletter berbasis server.
- Blog panjang. Insights/Lab cukup log singkat.
- Multi-bahasa (struktur data disiapkan agar mudah ditambah di v2).
- Halaman terpisah untuk tiap produk (produk berdiri di domainnya sendiri).

## 5. Tech Stack (dibuat agar mudah dan statis)

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | **Astro** (versi stabil terbaru), output `static` | Hasil HTML statis, JS minimal, mudah untuk agent |
| Bahasa | TypeScript (strict) | Model data aman |
| Styling | **Tailwind CSS v4** dengan token kustom di `@theme` | Token dari Desain.md ditaruh di satu tempat. **Palet bawaan Tailwind tidak boleh dipakai** |
| Animasi | **GSAP** + ScrollTrigger (impor modular, hanya yang dipakai) | Kontrol presisi untuk gerak scroll. Tanpa Framer Motion |
| Smooth scroll | **Lenis**, opsional, mati saat reduced motion | Boleh dilewati bila mengganggu performa |
| Font | **@fontsource-variable** (self-host): Anybody, Instrument Sans, Martian Mono | Tanpa request ke Google Fonts, tanpa layout shift |
| Ikon | **Tidak ada library ikon.** Glyph SVG kustom di `src/components/glyph/` | Lihat Desain.md |
| Konten | Astro Content Collections (markdown) untuk `works` dan `lab` | Tanpa CMS |
| Form | `mailto:` dan `https://wa.me/` | Tanpa backend |
| Analitik | Opsional: Umami atau Plausible (tanpa cookie) via satu `<script>` | Tanpa banner cookie |
| Hosting | Cloudflare Pages, Vercel, atau Netlify | Gratis, deploy dari Git |

**Dilarang:** React/Vue untuk komponen statis (gunakan `.astro`), shadcn/ui, lucide/heroicons/fontawesome, Bootstrap, library carousel, library partikel, Lottie, three.js. Pengecualian: `<canvas>` 2D buatan sendiri untuk field titik (Desain.md §9.2).

Fallback jika Astro bermasalah: HTML + CSS + JS biasa dengan Vite. Struktur data tetap sama.

## 6. Struktur Folder

```
nalaro/
├─ PRD.md
├─ Desain.md
├─ DECISIONS.md                # catatan keputusan teknis agent
├─ astro.config.mjs
├─ package.json
├─ public/
│  ├─ favicon.svg
│  ├─ og/nalaro-og.png         # 1200x630, dibuat sesuai Desain.md §14
│  ├─ robots.txt
│  └─ brand/                   # logo produk bila tersedia (SVG, monokrom)
├─ src/
│  ├─ styles/
│  │  ├─ tokens.css            # @theme: warna, font, spasi, easing
│  │  └─ global.css            # reset, base, utilitas kustom
│  ├─ data/
│  │  ├─ site.ts               # identitas, kontak, nav, meta
│  │  ├─ products.ts
│  │  ├─ solutions.ts
│  │  ├─ principles.ts
│  │  └─ pipeline.ts           # Idea → Experiment → Lab → Product
│  ├─ content/
│  │  ├─ works/*.md
│  │  ├─ lab/*.md
│  │  └─ config.ts             # skema koleksi
│  ├─ components/
│  │  ├─ layout/ (Rail, Dock, Header, Footer, CornerTicks)
│  │  ├─ glyph/  (Arrow, Cross, Square, ProductMark*)
│  │  ├─ sections/ (Hero, Registry, Spec, Works, Lab, Principles, Contact)
│  │  └─ ui/ (BracketLink, DataRow, Index, Ticker)
│  ├─ scripts/
│  │  ├─ field.ts              # canvas titik
│  │  ├─ motion.ts             # GSAP, ScrollTrigger
│  │  ├─ registry.ts           # preview mengikuti kursor
│  │  └─ dock.ts               # status section aktif
│  ├─ layouts/Base.astro
│  └─ pages/
│     ├─ index.astro
│     ├─ 404.astro
│     ├─ works/[slug].astro
│     └─ lab/[slug].astro
```

## 7. Struktur Informasi dan Spesifikasi Section

Urutan di halaman utama. ID anchor dipakai oleh Rail dan Dock.

| No | ID | Nama tampil | Asal brief |
|---|---|---|---|
| 00 | `#index` | Index (hero) | §12 |
| 01 | `#products` | Products | §6A, §8 |
| 02 | `#solutions` | Solutions | §7 |
| 03 | `#works` | Works | §9 |
| 04 | `#lab` | Lab | §13 |
| 05 | `#about` | About | §3 sampai §5, §14 |
| 06 | `#contact` | Contact | §12 CTA |

Catatan: brief menyebut Insights/Lab. Pada v1 keduanya digabung menjadi **Lab** (log eksperimen dan catatan singkat).

### 7.1 Index (Hero)
- Headline: **We build useful digital products.**
- Subteks (maks 2 baris): "Nalaro membuat SaaS, AI tools, platform pendidikan, dan solusi digital untuk masalah yang nyata."
- Aksi utama **Explore Products**: menuju `#products`. Aksi sekunder **Build With Nalaro**: menuju `#contact`. Penempatan dan bentuk keduanya WAJIB mengikuti Desain.md §8 (bukan tombol di bawah subteks).
- Strip metadata (data nyata, bukan hiasan): nama studio, kategori, lokasi, tahun, jumlah produk aktif (dihitung dari `products.ts`).
- Visual: field titik + skema pipeline (Desain.md §9).

### 7.2 Products
- Tiga baris produk dari `products.ts`. Tiap baris: nomor entri, nama, satu kalimat deskripsi, daftar fokus, status, tautan keluar.
- Baris keempat tetap ada: **"Entri berikutnya"** sebagai slot kosong yang menegaskan "Produk baru terus ditambahkan." Ini memenuhi prinsip Scalable.
- Semua tautan produk: `target="_blank"` dan `rel="noopener"`.

### 7.3 Solutions
- Judul: "Nalaro Solutions". Kalimat pembuka menegaskan bahwa ini kapabilitas, bukan identitas utama: "Kapabilitas yang sama yang kami pakai untuk produk sendiri, tersedia untuk kebutuhan spesifik Anda."
- Lima entri dari `solutions.ts` (Custom Web Application, Information System, Digital Platform, Website & Digital Presence, Custom Digital Solution) ditampilkan sebagai lembar spesifikasi (Desain.md §10.3).
- Aksi di akhir: **Build With Nalaro** menuju `#contact`.

### 7.4 Works
- Frame: "Masalah, solusi, hasil" bukan galeri gambar.
- Kategori (sebagai tautan filter teks): Government & Public Service, Education, Business, Community, Productivity, Internal Information System.
- Tiap entri memiliki: Masalah, Yang dibangun, Teknologi, Fitur, Manfaat.
- Jika koleksi kosong: tampilkan state kosong yang jujur ("Studi kasus sedang disusun") dan **tetap tampilkan kerangka satu entri contoh bertanda `CONTOH`**. Jangan menampilkan proyek fiktif seolah nyata.

### 7.5 Lab
- Alur tampil di atas log: **Idea → Experiment → Nalaro Lab → Product**.
- Log eksperimen dari koleksi `lab`. Status: `Idea`, `Prototype`, `Live`, `Graduated`.
- Jika kosong: state kosong yang jujur.

### 7.6 About
- Kalimat identitas (Core Statement §21 brief).
- Visi (§3) dan 6 misi (§4) diringkas, bukan disalin utuh.
- Lima prinsip (Solve First, Simple by Default, Useful Over Flashy, Human-centered, Build Learn Improve) dari `principles.ts`.
- Bagian "Yang bukan Nalaro" **tidak ditampilkan** di website. Itu panduan internal.

### 7.7 Contact
- Slab tautan raksasa (Desain.md §8.3) menuju `mailto:` dan WhatsApp.
- Panel "Ceritakan kebutuhan Anda": formulir ringan di sisi klien yang menyusun teks lalu membuka `mailto:` atau `wa.me` (Bagian 8.4).

### 7.8 Footer
- Wordmark raksasa, tautan section, kontak, tahun, kalimat "Build useful things."

## 8. Fitur Fungsional

1. **Navigasi anchor** dengan scroll halus; menghormati `prefers-reduced-motion`.
2. **Rail dan Dock** menampilkan section aktif berdasarkan IntersectionObserver.
3. **Registry preview**: pada desktop, panel pratinjau mengikuti kursor saat hover baris produk. Pada layar sentuh, baris berupa akordeon.
4. **Formulir kontak tanpa backend**
   - Field: Nama, Kebutuhan (pilihan: Produk / Solutions / Kolaborasi / Lainnya), Cerita singkat.
   - Submit membuat string URL-encoded lalu `window.location` ke `mailto:` atau `https://wa.me/<nomor>?text=...`.
   - Validasi minimal: nama dan cerita tidak kosong. Pesan galat inline, tanpa alert.
5. **Salin email** satu klik dengan konfirmasi inline (teks berubah, bukan toast generik).
6. **Pelacakan klik keluar** (opsional): atribut `data-umami-event="open-product"` pada tautan produk bila analitik diaktifkan.
7. **Halaman 404** dengan gaya yang sama (Desain.md §12).
8. **Detail Works dan Lab**: halaman markdown statis, hanya dibuat jika ada entri.

## 9. Konten Awal (siap dipakai, dapat diedit pemilik)

**products.ts**

| Nomor | Nama | Deskripsi (1 kalimat) | Fokus | Status |
|---|---|---|---|---|
| N/01 | Skripzy AI | AI workspace untuk penelitian dan aktivitas akademik. | penelitian, analisis data, penulisan akademik, AI research assistant | TODO: Live / Beta |
| N/02 | Nalaro Class | Platform belajar yang menyatukan LMS, kuis interaktif, dan gamifikasi. | LMS, kuis, classroom game, materi, evaluasi | TODO |
| N/03 | Enveely | Undangan digital yang sederhana dan modern untuk dibuat dan dibagikan. | digital invitation, personal event, desain undangan | TODO |
| N/04 | Entri berikutnya | Produk baru terus ditambahkan ke ekosistem. | produk berikutnya | Slot kosong |

**solutions.ts**

| Kode | Nama | Masukan → Keluaran |
|---|---|---|
| S/A | Custom Web Application | Kebutuhan organisasi → aplikasi web yang pas |
| S/B | Information System | Administrasi, arsip, inventory, workflow → sistem yang rapi |
| S/C | Digital Platform | Multi-user, dashboard, database, autentikasi → platform utuh |
| S/D | Website & Digital Presence | Company profile, portal, landing page → kehadiran digital |
| S/E | Custom Digital Solution | Masalah spesifik → solusi yang dirancang untuk itu |

**Copy kunci** (jangan ubah makna)
- Hero: "We build useful digital products."
- Tag: "Ideas into useful digital products."
- Penutup: "Build useful things."
- CTA: "Explore Products" dan "Build With Nalaro".

**Aturan suara** (dari brief §16): sederhana, percaya diri tanpa klaim berlebihan, modern, manusiawi, berorientasi masalah. Hindari kata: "revolusioner", "terdepan", "inovatif", "cutting-edge", "seamless", "end-to-end", "unlock", "empower", "game-changer".

## 10. Non-Fungsional

- **Performa:** LCP < 2,0 detik pada 4G; CLS < 0,05; JS awal < 90 KB gzip (di luar font); tidak ada gambar bitmap di atas fold.
- **Font:** subset Latin, `font-display: swap`, preload 2 file kritis (Anybody dan Instrument Sans).
- **Aksesibilitas:** WCAG 2.2 AA. Fokus terlihat, urutan tab logis, semua elemen interaktif punya nama, kontras sesuai tabel Desain.md §3.3, `prefers-reduced-motion` dihormati penuh.
- **SEO:** satu `<h1>`, hierarki heading benar, `<title>` dan meta description, Open Graph, Twitter card, canonical, `sitemap.xml`, `robots.txt`, JSON-LD `Organization` (nama, url, logo bila ada, sameAs bila ada).
- **Browser:** dua versi terakhir Chrome, Safari, Firefox, Edge; Safari iOS 16+.
- **Privasi:** tanpa cookie, tanpa pelacak pihak ketiga selain analitik opsional tanpa cookie.
- **Keamanan:** tanpa input yang dirender sebagai HTML; tautan keluar `rel="noopener"`.

## 11. Rencana Kerja per Fase

**Fase 1 — Fondasi**
- [ ] Inisialisasi Astro + TypeScript + Tailwind v4
- [ ] `tokens.css` dari Desain.md §3 dan §4 (warna, font, skala tipografi, spasi, easing)
- [ ] Muat font dengan @fontsource
- [ ] `Base.astro` (meta, OG, JSON-LD), `site.ts` dengan placeholder `TODO`
- [ ] Grid 12 kolom dan utilitas hairline

**Fase 2 — Kerangka dan konten**
- [ ] Rail, Dock, Header, Footer, CornerTicks
- [ ] Seluruh section dengan konten statis dari `src/data/*`
- [ ] Responsif penuh (Desain.md §11)

**Fase 3 — Gerak dan interaksi**
- [ ] Field titik canvas, skema pipeline SVG
- [ ] Registry preview, Dock aktif, urutan masuk halaman
- [ ] Slab kontak dan formulir
- [ ] Reduced motion

**Fase 4 — Penyelesaian**
- [ ] 404, halaman Works/Lab (bila ada entri), sitemap, robots
- [ ] OG image, favicon
- [ ] Audit Lighthouse, aksesibilitas, anti-pola (Desain.md §15)
- [ ] Deploy dan sambungkan domain

## 12. Definition of Done

1. Semua item Fase 1 sampai 4 selesai.
2. Tidak ada `TODO:` yang tampil ke pengunjung (kecuali state "Segera hadir" yang disengaja).
3. Skor Lighthouse mobile sesuai Bagian 2.
4. Lolos **Daftar Periksa Anti-AI** di Desain.md §15 (semua poin harus lolos).
5. Semua tautan produk, kontak, dan anchor diuji manual.
6. Tab keyboard menjangkau seluruh elemen interaktif; reduced motion dicoba.
7. `DECISIONS.md` memuat semua penyimpangan dari dokumen ini beserta alasannya.

## 13. Deploy

1. Buat repo Git, dorong kode.
2. Hubungkan ke Cloudflare Pages / Vercel / Netlify. Build command: `npm run build`. Output: `dist`.
3. Pasang domain, aktifkan HTTPS.
4. Uji ulang Lighthouse pada URL produksi.

## 14. Risiko

| Risiko | Mitigasi |
|---|---|
| Desain terlalu eksperimental sehingga membingungkan | Aturan "setiap ornamen membawa informasi" dan uji 5 detik di Desain.md |
| Konten Works/Lab kosong saat rilis | State kosong yang jujur; jangan memalsukan isi |
| Animasi berat di perangkat low-end | Batas FPS canvas, matikan field di layar kecil atau reduced motion |
| Identitas Nalaro tergeser menjadi "agensi" | Products selalu sebelum Solutions; tidak ada kata "jasa murah", "template", "agency" |
| Brief §15 menyarankan desain tidak terlalu futuristik | Keputusan pemilik: tampilan futuristik tetap dipakai, diwujudkan lewat presisi dan tipografi, bukan efek AI. Copy tetap sederhana dan ramah |

# Nalaro

Website studio produk digital Nalaro. Dibangun dengan Astro, CSS, dan TypeScript. Seluruh halaman diprerender menjadi HTML statis.

## Menjalankan

- Install dependensi dengan `npm install`.
- Jalankan pengembangan dengan `npm run dev -- --background`.
- Periksa server dengan `npm run astro -- dev status`.
- Lihat log dengan `npm run astro -- dev logs`.
- Hentikan dengan `npm run astro -- dev stop`.
- Build produksi dengan `npm run build`.
- Preview hasil build dengan `npm run preview -- --host 127.0.0.1`.

Jika mode background gagal karena batas startup 30 detik pada Windows, hasil build tetap dapat diperiksa lewat perintah preview.

## Konten dan konfigurasi

- `src/data/site.ts` berisi identitas, kontak, dan navigasi.
- `src/data/home.ts` berisi copy halaman, percakapan demo, serta urutan build.
- `src/data/products.ts` berisi produk, status, dan tautan.
- `src/data/solutions.ts` berisi pilihan solusi.
- `src/styles/tokens.css` berisi warna serta keluarga font.
- `src/styles/global.css` berisi tata letak dan breakpoint.
- Logo resmi berasal dari folder `favicon/` milik pemilik proyek. Salinan web berada di `public/brand/`.

Konfigurasi bawaan telah dikonfirmasi pemilik:

- Domain `https://nalaro.web.id`
- Email `nalaro@skripzy.id`
- WhatsApp `6285771298582`

Gunakan `.env.example` untuk override. `PUBLIC_SITE_URL` mengatur canonical, sitemap, robots, schema, dan alamat gambar Open Graph. Perubahan konfigurasi membutuhkan build ulang. Halaman 404 memakai noindex.

## Demo hero

Terminal adalah demonstrasi proses pembuatan produk. Tidak terhubung ke deployment, chatbot, atau layanan AI sungguhan. Tersedia tiga skenario dan kontrol jeda. Percakapan, label, dan isi build log diketik bertahap. Setelah selesai, hasil ditahan selama 4,5 detik lalu otomatis berulang dengan skenario yang sama. Animasi dan waktu jeda berhenti saat tidak terlihat atau tab tersembunyi. Reduced motion menampilkan hasil lengkap tanpa animasi atau loop. HTML awal tetap terbaca tanpa JavaScript.

Form kontak memvalidasi nama dan cerita lalu membuka draft di email atau WhatsApp. Website tidak menyimpan atau mengirim pesan secara otomatis.

## Verifikasi lokal

Setelah build dan preview berjalan, jalankan `npm run test:ui`. Pemeriksaan menggunakan Microsoft Edge headless yang terpasang di Windows. Untuk Chrome gunakan variabel `TEST_BROWSER=chrome`, atau atur `TEST_URL` bila port preview berbeda.

Pemeriksaan mencakup 320, 390, 600, 768, 1024, 1440, dan 1920px, aksesibilitas axe, menu, accordion, reduced motion, terminal, form, tautan, dan SEO. Hasil serta screenshot berada di `artifacts/` (tidak masuk Git). Tidak ada pesan yang dikirim selama pengujian.

Gambar berbagi tautan dapat dibuat ulang dengan `npm run generate:og`.

Belum ada deployment otomatis yang dikonfigurasi oleh perubahan desain ini.

Panduan lengkap konfigurasi Git integration, domain, environment variable, dan deploy langsung ada di [docs/deploy-cloudflare-pages.md](docs/deploy-cloudflare-pages.md).

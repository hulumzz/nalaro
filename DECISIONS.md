# Keputusan Teknis (DECISIONS.md)

1. **Framework & Struktur**: Menggunakan Astro v7 dengan @tailwindcss/vite (Tailwind v4) untuk menghasilkan bundel HTML murni yang statis. Tidak ada island React/Vue karena seluruh interaksi bisa ditangani vanilla JS dan GSAP.
2. **Animasi & Interaksi**: GSAP dan ScrollTrigger digunakan untuk animasi masuk dan pemantauan section. Lenis digunakan untuk *smooth scroll*. Keduanya dinonaktifkan secara agresif jika `prefers-reduced-motion: reduce` aktif untuk mematuhi panduan aksesibilitas.
3. **Canvas Field (Hero)**: Dibangun murni dengan Canvas 2D (`scripts/field.ts`) dengan batasan maksimal 6000 titik, 30fps cap, dan deteksi IntersectionObserver untuk menghentikan loop di luar layar. Menghindari library Three.js atau partikel berat demi performa maksimal.
4. **Form Kontak**: Sepenuhnya di sisi klien menggunakan URL generation (mailto: dan wa.me). Validasi dilakukan sebelum URL digenerate.
5. **Aksesibilitas**: Semua elemen fungsional dapat dijangkau keyboard (`tabindex`), visibilitas outline (`:focus-visible`) dipertahankan namun disesuaikan warna kontrasnya dengan state Ink/Bone/Flare.
6. **Anti-AI Design**: Semua library ikon pihak ketiga dihapus. Glyph khusus (Arrow, StatusSquare, ProductMark) dibangun dengan SVG primitif `stroke` 1px `currentColor` untuk beradaptasi dengan status hover section (Ink ↔ Bone).
7. **Penyimpangan 404**: Ada penggunaan `radial-gradient` murni untuk menggambar pola grid bintik-bintik dekoratif sebagai latar halaman 404, karena ini cara paling performant untuk latar titik (bukan efek gradasi warna riil).

8. **Font Preload**: Preload hard-coded ke `/fonts/anybody-variable.woff2` dihapus karena file tersebut tidak ada di `public/` dan menghasilkan request 404. Font tetap self-hosted lewat `@fontsource-variable`. Preload eksplisit baru ditambahkan kembali bila URL aset font hasil build sudah ditetapkan secara nyata, bukan ditebak.

## Redesign 6 Oktober 2026

Permintaan terbaru pemilik menggantikan batasan layout lama pada PRD.md dan Desain.md. Konsep studio produk, sudut tegas, font Anybody/Instrument Sans/Martian Mono, latar gelap, dan aksen #FF5B2E dipertahankan. Teks utama menggunakan #F5F5F2 agar lebih putih dan kontras.

- Navigasi rail/dock diganti header sederhana dan menu mobile. Semua section menggunakan satu container dan skala jarak yang konsisten.
- Hero mengikuti nalaro-deploy-log-preview.html milik pemilik. Percakapan dan build log merupakan demo berlabel, dengan tiga skenario, jeda, ulang, reduced motion, serta penghentian saat offscreen/tab tersembunyi. Tidak ada panggilan AI atau deployment sungguhan.
- Produk menggunakan preview HTML/CSS dan tautan resmi yang dikonfirmasi pemilik. Label Live berarti tautan produk tersedia, bukan klaim kesiapan produksi atau jaminan kapasitas.
- Bagian Works menampilkan proses kerja dan catatan studi kasus yang jujur. Contoh studi kasus fiktif, filter kosong, serta label registry/internal dihapus dari halaman. Lab tetap ada sebagai ruang eksperimen ringkas.
- Animasi menggunakan CSS, IntersectionObserver, dan timer kecil. GSAP, Lenis, canvas lama, rail, dan dock tidak dimuat oleh halaman baru. Scroll tetap native.
- Kontak memakai draft mailto/WhatsApp dengan validasi dan URL encoding. Tidak ada backend atau pengiriman otomatis.
- Domain, email, WhatsApp, serta ketiga URL produk diambil dari jawaban pemilik pada sesi ini. Canonical, sitemap, robots, schema Organization/WebSite, dan OG memakai domain nalaro.web.id. Font Latin self-hosted dengan preload dua file utama. Logo asli dari favicon/ diterapkan pada halaman serta browser.
- @playwright/test dan @axe-core/playwright ditambahkan sebagai dependensi pengembangan untuk verifikasi responsif, aksesibilitas, dan interaksi tanpa mengirim pesan. sharp dipakai untuk membuat aset OG dari SVG, tanpa layanan eksternal.
- Pengujian lokal tidak membuktikan deployment produksi, login produk, atau perilaku perangkat fisik. Prototype dan aset asli milik pemilik dipertahankan.

### Penyempurnaan setelah review pemilik

Sapaan hero menjadi "Hi, I'm Nalaro!" dan pengantar produk menjadi "Coba produk resmi kami". Ilustrasi Enveely digambar ulang sebagai SVG dengan kartu yang terbaca, lipatan amplop yang konsisten, dan gerak kartu saat hover/fokus. Terminal mengetik label serta pesan log per karakter, mempertahankan hasil selama 4,5 detik, kemudian mengulang otomatis. Tombol ulang dihapus; kontrol jeda tetap tersedia untuk aksesibilitas. Loop tetap berhenti saat offscreen, tab tersembunyi, dan reduced motion aktif.

Pemeriksaan HTTP pada sesi ini berhasil untuk nalaro.web.id dan Skripzy. Domain Enveely dan Nalaro Class menghasilkan ENOTFOUND dari lingkungan lokal; tautan sesuai instruksi pemilik dipertahankan dengan status Segera hadir.

# Keputusan Teknis (DECISIONS.md)

1. **Framework & Struktur**: Menggunakan Astro v7 dengan @tailwindcss/vite (Tailwind v4) untuk menghasilkan bundel HTML murni yang statis. Tidak ada island React/Vue karena seluruh interaksi bisa ditangani vanilla JS dan GSAP.
2. **Animasi & Interaksi**: GSAP dan ScrollTrigger digunakan untuk animasi masuk dan pemantauan section. Lenis digunakan untuk *smooth scroll*. Keduanya dinonaktifkan secara agresif jika `prefers-reduced-motion: reduce` aktif untuk mematuhi panduan aksesibilitas.
3. **Canvas Field (Hero)**: Dibangun murni dengan Canvas 2D (`scripts/field.ts`) dengan batasan maksimal 6000 titik, 30fps cap, dan deteksi IntersectionObserver untuk menghentikan loop di luar layar. Menghindari library Three.js atau partikel berat demi performa maksimal.
4. **Form Kontak**: Sepenuhnya di sisi klien menggunakan URL generation (mailto: dan wa.me). Validasi dilakukan sebelum URL digenerate.
5. **Aksesibilitas**: Semua elemen fungsional dapat dijangkau keyboard (`tabindex`), visibilitas outline (`:focus-visible`) dipertahankan namun disesuaikan warna kontrasnya dengan state Ink/Bone/Flare.
6. **Anti-AI Design**: Semua library ikon pihak ketiga dihapus. Glyph khusus (Arrow, StatusSquare, ProductMark) dibangun dengan SVG primitif `stroke` 1px `currentColor` untuk beradaptasi dengan status hover section (Ink ↔ Bone).
7. **Penyimpangan 404**: Ada penggunaan `radial-gradient` murni untuk menggambar pola grid bintik-bintik dekoratif sebagai latar halaman 404, karena ini cara paling performant untuk latar titik (bukan efek gradasi warna riil).

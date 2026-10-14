# Google Search Console — Nalaro Digital

Sitemap situs utama: https://nalaro.digital/sitemap.xml

Setelah Cloudflare Pages berhasil menayangkan rilis:

1. Pastikan `https://nalaro.digital/robots.txt` dan `https://nalaro.digital/sitemap.xml` berstatus HTTP 200.
2. Periksa keempat URL di sitemap: /, /faq/, /privacy-policy/, /terms-of-use/.
3. Verifikasi properti domain `nalaro.digital` melalui Google Search Console (DNS TXT di Cloudflare).
4. Buka Sitemaps dan kirim `https://nalaro.digital/sitemap.xml`.
5. Gunakan URL Inspection untuk mengecek indexing beranda. Pantau laporan Page indexing setelah crawler datang.

Produk pada subdomain (termasuk Nalaro Store dan Nalaro Class) perlu sitemap serta canonical di domain masing-masing, bukan disatukan dalam sitemap Nalaro induk. Pengiriman sitemap tidak menjamin indexing atau ranking otomatis.

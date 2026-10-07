# Deploy ke Cloudflare Pages

Website ini adalah Astro statis. Tidak memakai Pages Functions, database, atau secret di Cloudflare.

## Konfigurasi project baru

1. Buka **Cloudflare Dashboard > Workers & Pages > Create application > Pages > Import an existing Git repository**.
2. Pilih repository `hulumzz/nalaro` dan gunakan branch produksi `main`.
3. Pada konfigurasi build, isi:

   | Pengaturan | Nilai |
   | --- | --- |
   | Framework preset | Astro |
   | Production branch | `main` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | kosong / repository root |
   | Node version | `22.12.0` |

4. Tambahkan environment variable produksi dan preview berikut. Nilai yang sama sudah aman untuk proyek ini karena bukan rahasia.

   | Nama | Nilai |
   | --- | --- |
   | `PUBLIC_SITE_URL` | `https://nalaro.digital` |
   | `PUBLIC_CONTACT_EMAIL` | `nalaro@skripzy.id` |
   | `PUBLIC_WHATSAPP` | `6285771298582` |

5. Simpan lalu jalankan deployment pertama. Setiap push berikutnya ke `main` otomatis memperbarui produksi. Branch atau pull request akan menerima preview URL terpisah.

## Domain

Setelah deployment pertama selesai, buka **Custom domains** pada project Pages dan tambahkan `nalaro.digital`. Pastikan domain sudah berada di akun Cloudflare atau ikuti instruksi DNS dari dashboard. Jangan mengaktifkan redirect domain sebelum certificate dan deployment telah aktif.

## Deploy langsung dari komputer

Untuk deploy tanpa Git integration, build dulu lalu jalankan:

```powershell
npm.cmd run build
npx.cmd wrangler@latest pages deploy dist --project-name=nalaro
```

Tambahkan `--branch=preview` untuk deployment preview manual. Perintah ini memerlukan login Cloudflare yang memiliki akses ke project Pages. Git integration lebih cocok untuk workflow harian karena setiap push sudah membuat deployment dan preview.

## Verifikasi setelah rilis

1. Buka URL `*.pages.dev`, lalu domain `https://nalaro.digital` setelah domain aktif.
2. Cek halaman utama, menu mobile, ketiga tautan produk, form email/WhatsApp, serta loop terminal.
3. Buka `/robots.txt`, `/sitemap.xml`, dan cek preview Open Graph dengan URL production.
4. Jika build gagal, lihat **Deployments > build log** dan pastikan `NODE_VERSION=22.12.0`, perintah build, serta output `dist` masih sama.

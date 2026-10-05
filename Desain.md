# Desain — Website Induk Nalaro

Versi 1.0 · Pasangan dari `PRD.md`. Dokumen ini mengatur **tampilan, tata letak, gerak, dan larangan**. Semua nilai di sini bersifat mengikat. Jika ragu, pilih opsi dengan dekorasi paling sedikit.

---

## 1. Konsep: "Registry"

Website Nalaro adalah **instrumen presisi yang mencatat apa saja yang telah dibangun**, bukan brosur perusahaan. Rasa futuristiknya datang dari **kejelasan, kepadatan informasi, tipografi kinetik, dan sudut yang tegas**, bukan dari cahaya neon, gradien, atau efek kaca.

Gambaran rasa: panel instrumen lab, lembar spesifikasi teknik, katalog arsip bernomor, cetak biru yang hidup.

Satu aturan yang menentukan segalanya:

> **Setiap ornamen harus membawa data nyata.**
> Koordinat = nomor section sungguhan. Angka berjalan = jam WIB atau persentase scroll sungguhan. Diagram = struktur ekosistem Nalaro sungguhan. Jika sebuah elemen tidak menyampaikan informasi, hapus.

Ini selaras dengan filosofi brief: *Useful over flashy*.

## 2. Prinsip Desain

1. **Presisi, bukan efek.** Garis 1px, sudut 0°, grid yang terlihat.
2. **Asimetri yang disengaja.** Tidak ada komposisi tengah. Judul menggantung di margin kiri, isi dimulai dari kolom 4 atau 5.
3. **Tipografi sebagai gambar.** Ukuran ekstrem dan variasi lebar huruf (axis `wdth`) menggantikan ilustrasi dan ikon.
4. **Satu sinyal.** Satu warna aksen (Flare) dipakai hemat. Sisanya netral hangat.
5. **Potongan keras.** Perpindahan section lewat pergantian warna latar (Ink ↔ Bone), tanpa gradien, tanpa bayangan.
6. **Setiap section punya komposisi berbeda.** Tidak boleh dua section berturut-turut memakai pola layout yang sama.
7. **Ramah tetap utama.** Futuristik tidak boleh membuat pengguna bingung. Copy tetap sederhana dan manusiawi (brief §16).

## 3. Warna

### 3.1 Palet (hanya ini, jangan tambah warna)

| Token | Hex | Fungsi |
|---|---|---|
| `ink` | `#0B0C0A` | Latar utama gelap, teks di atas Bone dan Flare |
| `ink-2` | `#151613` | Permukaan bertingkat di atas Ink (panel, pratinjau) |
| `line` | `#2A2C27` | Garis hairline di atas Ink |
| `bone` | `#E9E6DD` | Latar terang, teks di atas Ink |
| `bone-2` | `#DAD6CA` | Permukaan bertingkat di atas Bone, garis di atas Bone (dengan alfa) |
| `mute` | `#8B8E86` | Teks sekunder di atas Ink dan Ink-2 |
| `mute-b` | `#5F625B` | Teks sekunder di atas Bone saja |
| `flare` | `#FF5B2E` | Sinyal: satu-satunya aksen |

### 3.2 Aturan pemakaian

- **Flare** maksimal ±3% luas layar pada satu waktu, kecuali section Contact (latar penuh Flare).
- Hanya **satu elemen terisi Flare** per viewport, di luar Contact.
- Flare dipakai untuk: penanda aktif (kotak 6px), kursor ketik pada visual Skripzy, tick progres Dock, status Graduated, hover slab, garis kilat pada diagram, `::selection`.
- Flare **tidak boleh** jadi warna teks di atas Bone (kontras gagal). Di atas Bone, aksen ditampilkan sebagai blok Flare dengan teks Ink.
- Teks di atas Flare selalu Ink.
- Tidak ada warna lain per produk. Identitas produk dibedakan oleh bentuk (Bagian 10.2), bukan warna.
- Dilarang: gradien jenis apa pun, bayangan, blur, transparansi untuk efek kaca, warna dari palet bawaan Tailwind.
- Garis di atas Bone: Ink dengan alfa 16% untuk hairline, 100% untuk garis penekanan.

### 3.3 Kontras (sudah dihitung, jangan dilanggar)

| Teks → Latar | Rasio | Boleh untuk |
|---|---|---|
| Bone → Ink | 15,7 | Semua teks |
| Ink → Bone | 15,7 | Semua teks |
| Mute → Ink | 5,9 | Teks sekunder, label |
| Mute → Ink-2 | 5,5 | Teks sekunder pada panel |
| Flare → Ink | 6,3 | Teks aksen kecil, tautan, penanda |
| Flare → Ink-2 | 5,9 | Idem |
| Ink → Flare | 6,3 | Semua teks di latar Flare |
| Mute-B → Bone | 5,0 | Teks sekunder di Bone |
| Mute-B → Bone-2 | 4,3 | **Dilarang** untuk teks. Hanya dekoratif |
| Flare → Bone | 2,5 | **Dilarang** untuk teks atau garis informatif |

### 3.4 Token CSS (letakkan di `src/styles/tokens.css`)

```css
@import "tailwindcss";

@theme {
  --color-*: initial;          /* buang seluruh palet bawaan */
  --radius-*: initial;         /* tidak ada radius */
  --shadow-*: initial;         /* tidak ada bayangan */

  --color-ink: #0B0C0A;
  --color-ink-2: #151613;
  --color-line: #2A2C27;
  --color-bone: #E9E6DD;
  --color-bone-2: #DAD6CA;
  --color-mute: #8B8E86;
  --color-mute-b: #5F625B;
  --color-flare: #FF5B2E;

  --font-display: "Anybody Variable", "Arial Narrow", sans-serif;
  --font-body: "Instrument Sans Variable", system-ui, sans-serif;
  --font-mono: "Martian Mono Variable", ui-monospace, monospace;

  --ease-out: cubic-bezier(.16, 1, .3, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
}

:root {
  --rail: 64px;
  --dock: 40px;
  --gutter: 16px;
  --margin: 20px;
}
@media (min-width: 1024px) { :root { --gutter: 24px; --margin: 32px; --dock: 40px; } }

* { border-radius: 0 !important; box-shadow: none !important; }
::selection { background: var(--color-flare); color: var(--color-ink); }
```

## 4. Tipografi dan Spasi

### 4.1 Keluarga huruf (self-host lewat @fontsource-variable)

| Peran | Font | Catatan |
|---|---|---|
| Display | **Anybody** (variabel, axis `wght` dan `wdth`) | Dipakai lebar ekstrem. Gunakan varian yang memuat axis `wdth` (mis. `@fontsource-variable/anybody/wdth.css`; jika tidak ada, `full.css`). Verifikasi axis di DevTools sebelum lanjut |
| Body | **Instrument Sans** (variabel) | Teks bacaan dan UI |
| Mono | **Martian Mono** (variabel) | Label, data, nomor, metadata |

Dilarang tampil: Inter, Roboto, Arial, Helvetica, Poppins, Montserrat, Space Grotesk, Outfit, font sistem sebagai font utama.

Lebar huruf dikendalikan dengan `font-stretch` (persen). Buat utilitas:
`.w-cond { font-stretch: 70% }`, `.w-norm { font-stretch: 100% }`, `.w-wide { font-stretch: 125% }`, `.w-max { font-stretch: 150% }`.

### 4.2 Skala (fluid)

| Token | Ukuran | Bobot | Lebar | Line-height | Letter-spacing | Pakai untuk |
|---|---|---|---|---|---|---|
| `mega` | `clamp(8rem, 27vw, 30rem)` | 900 | 150% | .78 | -.03em | Wordmark footer saja |
| `hero` | `clamp(2.75rem, 7.4vw, 8rem)` | 800 | 70–150% (lihat 9.1) | .9 | -.02em | Headline hero |
| `slab` | `clamp(2.25rem, 8vw, 9rem)` | 800 | 125% | .92 | -.02em | Slab kontak |
| `h2` | `clamp(2rem, 4.6vw, 4.5rem)` | 800 | 125% | .95 | -.015em | Judul section |
| `h3` | `clamp(1.25rem, 2vw, 1.75rem)` | 700 | 110% | 1.05 | -.01em | Judul entri |
| `lede` | `clamp(1.25rem, 2.2vw, 1.75rem)` | 500 | 100% (body) | 1.3 | -.01em | Kalimat pembuka |
| `body` | `1.0625rem` | 400 | 100% | 1.6 | 0 | Teks bacaan, maks 62ch |
| `small` | `.9375rem` | 400 | 100% | 1.5 | 0 | Keterangan |
| `label` | `.75rem` | 500 | mono | 1.4 | .08em, huruf kapital | Label, data, nomor. **Minimum 12px, jangan lebih kecil** |

Aturan: tidak ada teks rata tengah. Judul display tidak boleh dipotong di tengah kata. Gunakan `text-wrap: balance` pada judul dan `pretty` pada paragraf.

### 4.3 Spasi dan grid

- Basis 8px. Skala spasi (px): 4, 8, 16, 24, 32, 48, 72, 112, 176. Jangan memakai nilai di luar skala.
- Padding vertikal section: 112 (desktop), 72 (mobile).
- Grid 12 kolom, gutter 24 (desktop) / 16 (mobile). Margin kanan 32 / 20. Margin kiri = lebar Rail (64) + 32.
- Teks bacaan maksimum 62ch.

## 5. Kerangka Global

### 5.1 Rail (desktop ≥ 1024px)
Kolom tetap di kiri, lebar 64px, tinggi penuh, garis kanan 1px `line`.
- Atas: tanda "N" (SVG di Bagian 14), 32px, tautan ke `#index`.
- Tengah: daftar nomor `00` sampai `06` (mono, label) bertumpuk vertikal. Section aktif: kotak Flare 6px di kiri angka dan angka berubah Bone. Lainnya Mute. Hover menampilkan nama section di sebelah kanan sebagai panel Ink-2 ber-border 1px (tanpa bayangan), muncul 120ms.
- Bawah: teks vertikal (`writing-mode: vertical-rl`, diputar 180°) berisi `{Nama section aktif}` dan di bawahnya jam `HH:MM WIB`.

### 5.2 Dock (semua layar)
Strip bawah tetap, tinggi 40px (mobile 48px), garis atas 1px, latar `ink` solid.
- Kiri: `05 / 06 — About` (mono, label).
- Tengah (desktop): garis progres 1px dengan tick Flare 2×10px yang bergeser sesuai scroll. Berisi persentase scroll sebagai angka mono.
- Kanan: aksi persisten **Build With Nalaro** sebagai BracketLink (Bagian 7.2). Tersembunyi saat section Contact aktif.
- Dock bukan bar pil mengambang. Ia menempel penuh dari tepi ke tepi.

### 5.3 Top strip (desktop) dan Top bar (mobile)
- **Desktop:** tidak ada navbar tradisional dengan tautan tengah dan tombol kanan. Gantinya **strip data** setinggi 48px di bagian atas hero (bukan sticky), berisi sel-sel yang dipisah garis vertikal 1px: `NALARO — DIGITAL PRODUCT STUDIO` · `PRODUK AKTIF 03` · `{LOKASI}` · `{TAHUN}` · `{JAM} WIB`. Semua nilai dari data nyata. Navigasi dilakukan lewat Rail dan Dock.
- **Mobile:** top bar 56px, kiri wordmark teks, kanan tombol teks `Index`. Menekan membuka overlay penuh: daftar section dalam tipografi `h2`, bernomor, dengan tombol `Tutup` di kanan atas. Tidak ada ikon hamburger.

### 5.4 Corner ticks
Komponen `CornerTicks`: empat sudut berbentuk L (8×8px, garis 1px, warna `mute`) menempel di sudut sebuah bingkai. Dipakai **hanya** pada: kanvas field hero, panel pratinjau produk, panel form kontak, dan OG image. Tidak dipakai dekoratif di tempat lain.

### 5.5 Penanda section
Setiap section memiliki penanda `Index`: nomor dua digit (mono) + garis 24px + nama. Contoh: `01 ── Products`. Diletakkan menggantung di margin kiri (di atas h2), bukan di tengah.

## 6. Bahasa Bentuk

- **Sudut:** selalu 0. Tidak ada `border-radius`, tidak ada lingkaran, tidak ada pil.
- **Garis:** hairline 1px (`line` di Ink, Ink 16% di Bone). Garis penekanan 2px hanya untuk fokus dan tick Dock.
- **Penanda status:** kotak, bukan titik bulat. Idea = kotak kosong. Prototype = kotak dengan satu diagonal. Live = kotak penuh Bone. Graduated = kotak penuh Flare.
- **Panah:** glyph SVG kustom dengan ujung kotak (bukan karakter teks, bukan dari library). Empat arah dibuat dari satu path, diputar. Garis 1.5px, kepala berupa sudut siku tanpa pembulatan.
- **Ikon:** tidak ada. Makna disampaikan oleh angka, kata, bentuk geometris dasar, dan diagram. Jika sebuah makna terasa membutuhkan ikon, tulis katanya.
- **Pemisah titik-titik:** satu-satunya garis putus yang diizinkan adalah leader titik pada `DataRow` dan border slot kosong "Entri berikutnya".
- **Tekstur:** tidak ada noise, grain, atau pola latar selain field titik hero.
- **Gambar:** tidak ada foto stok, ilustrasi 3D, blob, mockup perangkat. Jika screenshot proyek disediakan pemilik, olah monokrom: `grayscale(1) contrast(1.4)` dengan `mix-blend-mode: lighten` di atas Ink, rasio 4:3, ditampilkan hanya pada hover atau di halaman detail.

## 7. Komponen

### 7.1 `Index`
`01` (mono, label, Flare di atas Ink / Ink di atas Bone) + garis 24px + nama (mono, label, Mute). Lihat 5.5.

### 7.2 `BracketLink` (aksi inline)
Teks mono kapital dalam kurung siku: `[ Build With Nalaro  ↗ ]`. Hover/fokus: kurung bergeser keluar 4px (180ms, ease-out) dan teks mendapat garis bawah 1px dengan offset 4px. Tanpa latar. Dipakai untuk aksi sekunder dan tautan teks.

### 7.3 `Gate` (aksi utama berbentuk sel panel)
Sel persegi panjang tanpa radius, border 1px, tinggi minimal 96px (desktop) / 72px (mobile). Label di kiri atas dalam `h3`, panah glyph di kanan bawah. Hover/fokus: latar berubah menjadi Bone dengan teks Ink dalam 140ms (potongan keras), panah bergeser 8px searah panahnya. Dipakai untuk **Explore Products**, **Build With Nalaro** (hero), dan tombol kirim form.

### 7.4 `Slab` (tautan raksasa)
Baris selebar kolom konten, tinggi ±1,2× ukuran `slab`, border atas dan bawah 1px. Hover/fokus: latar Ink menyapu dari kiri ke kanan (clip-path, 360ms, ease-out), teks berubah Flare. Dipakai pada Contact.

### 7.5 `DataRow`
Dua sel sebaris: label mono (Mute) di kiri, nilai (Bone) di kanan, diisi leader titik 1px di tengah. Dipakai untuk metadata: status produk, kategori Works, tanggal Lab.

### 7.6 `Ticker`
**Bukan marquee.** Sel kecil yang angkanya berubah sesuai data nyata (jam WIB per detik, persentase scroll). Digit mono lebar tetap agar tidak bergeser. Marquee teks berjalan dilarang di seluruh situs.

### 7.7 Fokus
- Di Ink: outline 2px Flare, offset 3px.
- Di Bone dan Flare: outline 2px Ink, offset 3px.
- Fokus tidak boleh dihapus. Gunakan `:focus-visible`.

### 7.8 Input form
Hanya garis bawah 1px (Ink di Flare). Label mono di atas input (bukan placeholder sebagai label). Pilihan "Kebutuhan" ditampilkan sebagai kata-kata sebaris dengan penanda kotak (seperti radio), bukan dropdown dan bukan chip. Galat inline: teks mono diawali `GALAT —` dengan garis bawah 2px.

## 8. Aksi dan Penempatan CTA

Brief meminta CTA utama **Explore Products** dan sekunder **Build With Nalaro**. Penempatannya sengaja tidak biasa.

### 8.1 Hero: "Gate Row"
Satu baris panel di **dasar hero** (tepat di atas Dock), selebar grid konten, tinggi 96px. Terbagi dua sel oleh garis vertikal:
- Sel kiri (±66%): **Explore Products** + panah ke bawah. Ini aksi utama dan satu-satunya elemen terisi di hero: latar Bone, teks Ink, bukan Flare.
- Sel kanan (±34%): **Build With Nalaro** + panah ↗. Hanya border, teks Bone.

Selain itu, kata **"products"** pada headline adalah tautan inline ke `#products` (garis bawah 3px yang menebal saat hover). Dilarang menempatkan dua tombol berdampingan di bawah subteks.

### 8.2 Persisten
Aksi di Dock (5.2). Tidak ada tombol mengambang bulat atau pil, tidak ada widget chat.

### 8.3 Contact: Slab
Lihat 10.7. Ini adalah klimaks CTA, berupa tipografi raksasa yang bisa diklik.

### 8.4 Dalam Products dan Solutions
- Produk: sel **Open** setinggi baris di ujung kanan, dipisah garis vertikal 1px. Seluruh baris juga dapat diklik.
- Solutions: satu BracketLink **Build With Nalaro** di kolom kiri sticky.

Batas: maksimal satu elemen `Gate` atau `Slab` terisi per viewport.

## 9. Hero

### 9.1 Komposisi (desktop 1440×900)
1. Top strip data (5.3).
2. **Headline** mulai di kolom 2, rentang kolom 2–9:
   ```
   We build
   USEFUL           ← lebar 150%, bobot 800
   digital products.
   ```
   - "We build" dan "digital products." lebar 70% (condensed), "useful" lebar 150% (extended). Kontras lebar adalah penekanan utama, **bukan warna**.
   - Kata "products" adalah tautan (8.1).
3. **Subteks** di kolom 2–6, 17px, 2 baris: "Nalaro membuat SaaS, AI tools, platform pendidikan, dan solusi digital untuk masalah yang nyata."
4. **Frame diagram** di kolom 8–12, tinggi ±62vh, dengan CornerTicks, berisi kanvas field (9.2) dan skema pipeline (9.3). Label `FIG.01 — Ekosistem` di kiri bawah frame (mono, label).
5. **Gate Row** di dasar (8.1).
6. Wordmark mega **tidak** tampil di hero (khusus footer).

Tinggi hero: `100svh − dock`. Pada layar pendek, Gate Row tetap terlihat tanpa scroll.

### 9.2 Field titik (kanvas 2D buatan sendiri)
- Grid titik jarak 24px, jari-jari 1px, warna `line`.
- Kursor dalam radius 140px mendorong titik hingga 10px menjauh, lalu kembali dengan easing (lerp .12). Titik dekat kursor berubah ke `mute`.
- Setiap 7 detik, satu garis pindai vertikal melintas dalam 900ms; titik yang dilewati menyala Flare 400ms lalu pudar.
- Batas: ≤ 6000 titik, 30fps, `devicePixelRatio` maks 2.
- Berhenti saat frame di luar layar (IntersectionObserver) dan saat tab tersembunyi.
- Layar < 768px atau reduced motion: gambar statis satu kali, tanpa animasi.
- Kanvas bersifat dekoratif: `aria-hidden="true"`.

### 9.3 Skema pipeline (SVG di atas kanvas)
Menggambarkan **Idea → Experiment → Lab → Product** dan percabangan ke tiga produk.
- Empat simpul berupa kotak 10px dengan label mono: `IDEA`, `EXPERIMENT`, `LAB`, `PRODUCT`.
- Jalur 1px (`mute`), `vector-effect: non-scaling-stroke`, bersiku (jalur tegak lurus, bukan kurva).
- Dari `PRODUCT`, jalur bercabang ke tiga terminal berlabel `N/01 Skripzy AI`, `N/02 Nalaro Class`, `N/03 Enveely`. Terminal berupa kotak 10px; saat dihover, terminal menyala Flare dan label menjadi tautan ke produk.
- Penanda bergerak: garis pendek Flare (3×14px) menyusuri jalur dari IDEA ke terminal, berulang tiap 6 detik.
- Saat dimuat, jalur tergambar (stroke-dashoffset, 1200ms).
- Diagram **harus dihasilkan dari `pipeline.ts` dan `products.ts`**: menambah produk menambah terminal otomatis.
- Mobile: tampil di bawah headline, tinggi 280px, statis.
- Aksesibilitas: `role="img"` dengan `aria-label` yang menjelaskan alurnya, atau daftar tautan produk tersembunyi visual untuk pembaca layar.

## 10. Section

### 10.1 Products — "Registry" (latar Ink)
- Header: Index `01 ── Products`, `h2` "Products", lede satu kalimat: "Produk yang kami bangun dan miliki."
- **Daftar baris penuh lebar**, tiap baris min-height 22vh, border atas 1px. Grid baris (desktop):
  | Kolom | Isi |
  |---|---|
  | 1 | `N/01` mono, label, Flare |
  | 2–6 | Nama produk, display 700, lebar 120%, ukuran `clamp(2.5rem, 6vw, 6rem)` |
  | 7–9 | Deskripsi (body) + daftar fokus mono dipisah ` / ` |
  | 10 | `DataRow` Status |
  | 11–12 | Sel **Open** + glyph panah, dipisah garis vertikal |
- **Hover/fokus (pointer halus):** baris berbalik menjadi Bone dengan teks Ink (140ms); lebar huruf nama bergerak 120% → 150% (400ms, ease-out); **panel pratinjau** 300×200 (Ink-2, border 1px, CornerTicks) muncul dan mengikuti kursor dengan lerp .15, offset (24, 24), dijepit dalam viewport. Isi panel: visual produk (10.2).
- **Sentuh:** baris menjadi akordeon. Ketuk membuka deskripsi, visual inline 160px, dan sel Open.
- **Reduced motion:** panel tidak mengikuti kursor, tampil statis di kanan baris saat hover/fokus, tanpa animasi lebar huruf.
- **Baris 04 "Entri berikutnya":** border putus-putus, nama dalam teks outline (stroke 1px Mute, isi transparan), label `SLOT 04 — TERBUKA`. Tidak bisa diklik.
- Status "Segera hadir": sel Open diganti teks mono Mute `SEGERA HADIR`, tanpa panah, tidak dapat difokuskan.

### 10.2 Visual produk (SVG primitif, viewBox 160×160, garis 1px Bone, satu elemen Flare)
Dirancang dari bentuk dasar agar tiap produk punya "sidik jari" bentuk sendiri tanpa warna berbeda.
| Produk | Visual |
|---|---|
| **Skripzy AI** | 7 garis horizontal dengan panjang berbeda (naskah). Garis terakhir sebagian Flare, diakhiri kursor blok 2×10px yang berkedip `steps(1)` tiap 1 detik. Tanpa kerangka halaman |
| **Nalaro Class** | Grid 4×4 kotak 20px. Beberapa terisi Bone. Satu kotak terisi Flare ("jawaban terpilih"). Jalur siku dari kotak itu menuju batang skor vertikal di kanan |
| **Enveely** | Amplop dari dua diagonal yang bertemu di tengah + persegi panjang dasar. Kotak Flare 8px sebagai segel di titik temu. Saat hover, garis penutup (flap) berputar terbuka 24° |

Jika logo resmi tersedia di `public/brand/`, tampilkan monokrom kecil (24px) di kolom 1 baris. Visual di atas tetap dipakai untuk pratinjau.

### 10.3 Solutions — "Spec Sheet" (latar **Bone**, pembalikan warna pertama)
- Komposisi: kolom kiri 1–4 **sticky** (Index `02`, `h2` "Solutions", lede, BracketLink Build With Nalaro). Kolom kanan 5–12 berisi lembar spesifikasi.
- Lede: "Kapabilitas yang sama yang kami pakai untuk produk sendiri, tersedia untuk kebutuhan spesifik Anda."
- Lembar spesifikasi: lima baris dari `solutions.ts`. Tiap baris:
  - Kode mono `S/A`
  - Nama (`h3`)
  - Dua mini-kolom: `MASUKAN` dan `KELUARAN` (label mono Mute-B + teks body), dipisah garis panjang 1px dengan ujung kotak yang memanjang saat masuk viewport (scaleX 0→1, 600ms)
  - Pemisah baris: Ink 16%
- Di bawah lembar: blok **"Untuk siapa"** berisi empat kolom bergaris vertikal: Individual, Business, Institution, Community, masing-masing berisi daftar dari brief §10 (teks body kecil, tanpa ikon, tanpa kartu).
- Catatan kaki mono Mute-B: `Kapabilitas Nalaro. Identitas utama: produk.`
- Dilarang: grid kartu, ikon di atas judul, "Layanan kami" dengan tiga kolom setara.

### 10.4 Works — "Case Files" (latar Ink)
- Header: Index `03`, `h2` "Works", lede: "Masalah, solusi, hasil."
- Baris filter kategori berupa tautan teks mono (bukan chip). Aktif ditandai kotak Flare 6px di depan teks. Kategori sesuai brief §9.
- Daftar entri (baris penuh, border 1px). Tiap entri: kolom kiri `DataRow` (Tahun, Kategori), judul `h3`, lalu empat sel: `MASALAH`, `DIBANGUN`, `TEKNOLOGI`, `MANFAAT` (label mono, isi body kecil). Seluruh baris menaut ke `/works/[slug]`.
- Hover: garis kiri 2px Flare muncul; bila ada screenshot, tampil sebagai pratinjau monokrom (aturan gambar di Bagian 6).
- State kosong: Bagian 12.

### 10.5 Lab — "Log" (latar Bone)
- Header: Index `04`, `h2` "Lab", lede: "Tempat ide diuji sebelum jadi produk."
- **Strip pipeline** horizontal: empat tahap `Idea → Experiment → Nalaro Lab → Product` berupa garis 1px dengan kotak di tiap tahap dan hitungan entri per status (mono, dari data nyata).
- **Log** berbentuk tabel, terbaru di atas. Kolom: tanggal (`2026.10.05`), nama (`h3`), satu baris deskripsi, status (glyph kotak + teks). Graduated menampilkan `→ N/0x` yang menaut ke produknya.
- Tidak ada kartu, tidak ada thumbnail wajib.

### 10.6 About — "Statement" (latar Ink)
- Index `05`. Pernyataan besar (ukuran `h2`, bobot 500, lebar 100%, rata kiri, rentang kolom 2–11): Core Statement dari brief §21: "Nalaro adalah digital product studio yang membangun SaaS, AI tools, platform pendidikan, dan solusi digital untuk menyelesaikan masalah nyata." Frasa "digital product studio" diberi garis bawah 3px Flare (bukan latar sorot).
- **Prinsip:** lima baris `P1` sampai `P5` (Solve First, Simple by Default, Useful Over Flashy, Human-centered, Build Learn Improve). Kiri: nama (display 700, lebar 125%). Kanan: satu kalimat penjelas. Statis, tanpa hover tersembunyi.
- **Visi dan Misi:** dua kolom berlabel mono `VISI` dan `MISI`; misi ditulis ringkas bernomor 01–06.
- Tidak ada foto tim atau avatar (tidak ada datanya).

### 10.7 Contact — "Slab" (latar **Flare**)
- Index `06` (Ink). Satu-satunya section berlatar Flare, seluruh teks Ink.
- Dua Slab bertumpuk:
  1. `Tulis ke {email}` + panah
  2. `Chat via WhatsApp` + panah
  Tinggi tiap slab ±1,2× ukuran `slab`. Hover: sapuan Ink dari kiri, teks Flare.
- Di bawahnya **panel form** (border 1px Ink, CornerTicks Ink) dua kolom: kiri teks "Ceritakan kebutuhan Anda." (`lede`); kanan form (7.8): Nama, Kebutuhan (kata pilihan sebaris), Cerita singkat. Dua sel `Gate` untuk submit: `Kirim lewat Email` dan `Kirim lewat WhatsApp`.
- Aksi "Salin email": BracketLink; teks berubah menjadi `[ Tersalin ]` selama 1,6 detik.

### 10.8 Footer (latar Ink)
- Baris atas: tiga kolom teks tautan (Section, Kontak, Produk) dengan Index kecil, tanpa ikon sosial bulat. Tautan sosial berupa teks.
- Tengah: **wordmark mega "NALARO"**, rata kiri, `aria-hidden`, warna Ink-2 dengan stroke 1px `line`, dipotong di bagian bawah oleh `overflow: hidden` (±14% tinggi huruf terpotong). Di desktop, lebar huruf (`font-stretch`) mengikuti posisi X kursor, 80% → 150% (lerp, 200ms).
- Baris bawah (mono, label): `© {tahun} Nalaro — Build useful things.` · `Build terakhir {tanggal build}` · BracketLink `Kembali ke index`.

## 11. Responsif

| Rentang | Perilaku |
|---|---|
| 0–639px | Rail hilang, top bar + overlay Index (5.3). Dock 48px. Hero: headline `clamp` minimum 2.75rem, diagram di bawah headline (statis), Gate Row menjadi dua baris penuh 72px. Registry menjadi akordeon. Spec Sheet satu kolom, kolom kiri tidak sticky. Slab `slab` mengecil, label tetap terbaca |
| 640–1023px | Seperti mobile dengan margin lebih lebar (32px) dan grid 8 kolom |
| 1024–1439px | Layout penuh, Rail aktif |
| ≥ 1440px | Konten dibatasi lebar maksimum 1680px, rata kiri terhadap Rail. Ruang sisa di kanan dibiarkan kosong (bukan diratakan ke tengah) |

Target sentuh minimal 48×48px. Uji pada lebar 360, 390, 768, 1024, 1440, 1920.

## 12. State Khusus

- **Kosong (Works/Lab):** satu baris dengan border putus-putus: label mono `BELUM ADA ENTRI`, teks body: "Studi kasus sedang disusun." (Works) / "Eksperimen pertama sedang berjalan." (Lab). Tidak ada ilustrasi. Untuk Works, tampilkan satu kerangka entri bertanda `CONTOH` (outline saja) agar struktur terlihat.
- **404:** latar Ink, kode `404` dalam `mega` rata kiri dipotong seperti footer, satu kalimat "Halaman ini tidak ada di registry.", BracketLink `Kembali ke index`.
- **Form galat:** 7.8.
- **Loading:** tidak ada spinner. Situs statis, tidak ada state loading.

## 13. Gerak

### 13.1 Token
Durasi: 120 (mikro), 180, 240, 400, 600, 900 ms. Easing: `--ease-out` untuk masuk, `--ease-in-out` untuk transisi dua arah. Tidak ada easing "bounce" atau "spring".

### 13.2 Urutan masuk halaman (total ≤ 1,4 detik)
| Waktu | Aksi |
|---|---|
| 0 ms | Hairline Rail dan strip data tergambar (scaleX/scaleY 0→1, 480ms) |
| 120 ms | Baris headline terungkap bergantian (clip-path inset dari bawah, 600ms, jeda 90ms); `font-stretch` tiap baris menetap dari 150% ke nilai akhir (400ms) |
| 500 ms | Jalur diagram tergambar (1200ms) |
| 700 ms | Digit Ticker "mengacak" 300ms lalu menetap (hanya angka) |
| 800 ms | Gate Row naik 16px sambil terungkap (hanya elemen ini yang memakai opasitas) |

### 13.3 Scroll
- Hanya **h2 dan hairline** yang beranimasi saat masuk viewport (h2: clip-path reveal 600ms; hairline: scaleX 0→1 600ms). Isi paragraf, daftar, dan baris muncul tanpa animasi.
- Dilarang: "fade-up" untuk semua elemen, stagger kartu, parallax, scroll-jacking, pin panjang.
- Smooth scroll (Lenis) boleh, durasi 1.0, dinonaktifkan saat reduced motion.

### 13.4 Hover dan fokus
Hanya yang tercantum di komponen. Transisi 120–180ms untuk warna, 400ms untuk `font-stretch`.

### 13.5 Reduced motion
Jika `prefers-reduced-motion: reduce`: tidak ada reveal, tidak ada pengacakan digit, kanvas statis, tidak ada animasi `font-stretch`, panel pratinjau statis, kedip kursor Skripzy dimatikan. Semua konten tetap tampil penuh.

### 13.6 Performa gerak
Animasikan hanya `transform`, `clip-path`, `opacity`, dan `font-stretch` pada elemen tunggal. Hindari animasi layout. Hentikan semua loop saat di luar layar.

## 14. Aset

- **Wordmark sementara:** teks `NALARO`, Anybody 800, lebar 140%, letter-spacing -.01em. Ganti dengan logo resmi jika tersedia, tanpa mengubah tata letak.
- **Tanda "N" / favicon** (`public/favicon.svg`):
  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#0B0C0A"/>
    <path d="M8 24V8h3.2L21 19.2V8h3v16h-3.2L11 12.8V24z" fill="#E9E6DD"/>
    <rect x="25" y="5" width="3" height="3" fill="#FF5B2E"/>
  </svg>
  ```
- **OG image (1200×630):** latar Ink; headline "We build useful digital products." di kiri atas dengan aturan lebar huruf yang sama seperti hero; wordmark mega terpotong di kiri bawah (Ink-2, stroke Line); satu kotak Flare 24px di kanan atas; CornerTicks di empat sudut bingkai dalam. Tanpa gradien, tanpa foto. Dibuat dari SVG lalu diekspor ke PNG.
- **Format gambar:** AVIF/WebP bila ada bitmap. Tidak ada bitmap di atas fold.

## 15. Daftar Periksa Anti-AI (wajib lolos semua sebelum rilis)

**Larangan mutlak**
1. Tidak ada badge, pil, atau chip kecil (termasuk di atas headline seperti "✨ New", "Introducing", "Powered by AI"). Tidak ada elemen dengan sudut membulat sama sekali.
2. Tidak ada emoji di UI, konten, alt text, atau commit.
3. Tidak ada library ikon dan tidak ada ikon di kotak atau lingkaran berwarna di atas judul.
4. Tidak ada grid tiga kartu setara berisi ikon + judul + deskripsi.
5. Tidak ada gradien (linear, radial, conic, mesh), glow, blur, glassmorphism, atau bayangan.
6. Tidak ada palet ungu-biru atau palet bawaan Tailwind.
7. Tidak ada hero rata tengah dengan dua tombol berdampingan di bawah subteks.
8. Tidak ada tombol berbentuk pil atau bulat. Aksi hanya `Gate`, `Slab`, `BracketLink`.
9. Tidak ada font Inter, Roboto, Arial, Poppins, Space Grotesk, atau font sistem sebagai font tampil.
10. Tidak ada animasi fade-up massal.
11. Tidak ada strip "Trusted by", testimoni, atau statistik karangan ("10K+ users", "99.9% uptime").
12. Tidak ada foto stok, ilustrasi 3D, blob, orb, atau mockup perangkat generik.
13. Tidak ada marquee teks berjalan.
14. Tidak ada kata klise: unlock, elevate, supercharge, seamless, revolutionize, next-gen, empower, cutting-edge, game-changer.
15. Tidak ada teks atau blok rata tengah.
16. Tidak ada dekorasi tanpa data (aturan di Bagian 1).

**Uji otomatis (jalankan di akar proyek, hasil harus 0 baris)**
```bash
grep -rnE "rounded-(sm|md|lg|xl|2xl|3xl|full)|shadow-|gradient|backdrop-|blur-" src/
grep -rnE "lucide|heroicons|fontawesome|react-icons" package.json src/
grep -rnP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" src/
grep -rnE "text-center|justify-center" src/components/sections/
```
(`justify-center` boleh hanya untuk perataan vertikal item dalam Gate; tinjau manual.)

**Uji manual**
- **Uji 5 detik:** buka halaman 5 detik, lalu jawab: apa yang Nalaro bangun? Apa tiga produknya? Jika salah satu tidak terjawab, perbaiki hierarki.
- **Uji templat:** jika tampilan bisa dihasilkan oleh perintah "modern dark SaaS landing page" tanpa perubahan, berarti gagal.
- **Uji tiga warna:** tangkapan layar mana pun hanya boleh memuat Ink/Bone, satu abu hangat, dan paling banyak satu elemen Flare terisi (kecuali Contact).
- **Uji data:** tunjuk satu elemen dekoratif dan sebutkan sumber datanya. Jika tidak ada, hapus.
- **Uji keyboard:** seluruh halaman dapat dioperasikan tanpa mouse, fokus selalu terlihat.
- **Uji reduced motion:** seluruh konten terbaca penuh tanpa gerak.

## 16. Microcopy

| Elemen | Teks |
|---|---|
| Aksi utama hero | Explore Products |
| Aksi sekunder | Build With Nalaro |
| Tautan produk | Open |
| Produk belum aktif | Segera hadir |
| Slot kosong | Entri berikutnya · Slot 04 — terbuka |
| Salin email | Salin email → Tersalin |
| Galat nama | GALAT — Isi nama Anda |
| Galat cerita | GALAT — Ceritakan kebutuhan Anda singkat saja |
| Kirim email / WA | Kirim lewat Email / Kirim lewat WhatsApp |
| Menu mobile | Index / Tutup |
| Footer | Build useful things. |
| Format tanggal | `2026.10.05` |
| Format nomor | dua digit (`01`), entri `N/01`, solusi `S/A`, prinsip `P1` |

Nada: sederhana, langsung, manusiawi. Kalimat pendek. Bicara tentang masalah yang diselesaikan, bukan teknologi yang dipakai.

## 17. Urutan Implementasi yang Disarankan

1. `tokens.css` (3.4) dan font, lalu uji bahwa `font-stretch` bekerja.
2. Grid, Rail, Dock, CornerTicks, glyph panah dan tanda N.
3. Hero statis (tanpa gerak) lengkap dengan Gate Row.
4. Registry, Spec Sheet, Works, Lab, About, Contact, Footer dalam bentuk statis.
5. Responsif.
6. Gerak: field, diagram, urutan masuk, scroll, preview, Footer.
7. Reduced motion, aksesibilitas, performa, Daftar Periksa Anti-AI (Bagian 15).

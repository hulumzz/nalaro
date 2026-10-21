export const home = {
  hero: { eyebrow: "Hi, I'm Nalaro!", note: "Contoh alur pengembangan aplikasi.", productsLabel: "Produk Nalaro" },
  products: { label: "Produk Nalaro", title: "Pilih yang\nkamu butuhkan.", intro: "Riset, kelola kelas, buka toko, atau buat undangan.", next: "Butuh aplikasi dengan fitur khusus?", nextLink: "Lihat prosesnya" },
  solutions: { label: "Nalaro Solutions", title: "Pekerjaan menumpuk?\nRapikan sistemnya.", intro: "Kami membuat website dan aplikasi untuk mengelola data, melayani pelanggan, dan mengurangi pekerjaan manual.", visualLabel: "Data dan akses tim dalam satu aplikasi", visualTitle: "Semua terhubung.\nLebih mudah dikelola.", audiences: "Untuk bisnis, institusi, komunitas, dan proyek pribadi." },
  process: { label: "Cara kami bekerja", title: "Dari kebutuhan\nsampai siap dipakai.", intro: "Sepakati fitur, coba desainnya, lalu pantau pengembangan sampai rilis.", caseTitle: "Coba produk kami", caseText: "Lihat hasilnya langsung di Skripzy, Nalaro Class, Enveely, dan Nalaro Store.", caseLink: "Lihat produk Nalaro" },
  lab: { label: "Nalaro Lab", title: "Ruang untuk mencoba.", text: "Ide kecil kami uji di sini. Yang berguna kami kembangkan lebih jauh.", note: "Catatan eksperimen akan dibagikan di sini.", stages: ["Ide", "Eksperimen", "Prototipe", "Produk"] },
  about: { label: "Tentang studio", title: "Studio di balik\nproduk Nalaro.", text: "Kami mengembangkan produk sendiri dan mengerjakan website serta aplikasi untuk bisnis, sekolah, dan komunitas.", detail: "Dari penentuan fitur sampai pemeliharaan, kamu bekerja langsung dengan tim yang membangunnya." },
  contact: { label: "Kontak", title: "Ceritakan\nkebutuhanmu.", text: "Sebutkan apa yang ingin dibuat atau pekerjaan yang ingin dipermudah.", offline: "Susun ceritamu di sini, lalu simpan untuk percakapan berikutnya.", note: "Pesan dibuka melalui aplikasi email atau WhatsApp milikmu." },
};
export const processSteps = [
  { title: "Pahami dulu", text: "Kami dengarkan kebutuhanmu dan pelajari cara kerjanya.", label: "Discover" },
  { title: "Buat bentuknya", text: "Alur dan desain bisa kamu coba sebelum masuk pengembangan.", label: "Design" },
  { title: "Bangun dan uji", text: "Fitur dikerjakan bertahap, lalu diuji dengan skenario pemakaian.", label: "Build" },
  { title: "Rilis dan rawat", text: "Produk diluncurkan. Masukan pengguna jadi bahan perbaikan.", label: "Ship" },
];
export const studioPrinciples = [
  { title: "Pahami masalahnya", text: "Fitur dipilih berdasarkan kebutuhan pengguna." },
  { title: "Buat mudah dipakai", text: "Pengguna tidak perlu menebak langkah berikutnya." },
  { title: "Perbaiki terus", text: "Perbaikan mengikuti hasil uji dan masukan pengguna." },
];
export const buildScenarios = [
  { id: "crm", label: "Kelola pelanggan", name: "Customer workspace", client: "Data pelanggan masih tersebar di chat. Bisa dibuatkan satu tempat untuk mengelolanya?", reply: "Bisa. Kita satukan kontak, riwayat percakapan, dan jadwal follow up dalam satu alur.", module: "Kontak & follow up", endpoint: "customer-workspace", final: "Workspace pelanggan siap digunakan." },
  { id: "class", label: "Ruang belajar", name: "Learning workspace", client: "Aku ingin materi dan kuis kelas ada di satu tempat. Progres murid juga bisa dilihat.", reply: "Kita buat ruang kelas dengan materi, kuis interaktif, dan ringkasan progres belajar.", module: "Materi & kuis", endpoint: "learning-workspace", final: "Ruang belajar siap digunakan." },
  { id: "portal", label: "Portal bisnis", name: "Business workspace", client: "Tim kami masih merekap pekerjaan manual. Aku butuh portal yang bisa dipakai bersama.", reply: "Kita susun dashboard, pembagian akses, dan laporan yang mengikuti cara kerja timmu.", module: "Tim & laporan", endpoint: "business-workspace", final: "Portal tim siap digunakan." },
];
export const buildEvents = [
  { tag: "DISCOVER", text: "Kebutuhan dan alur kerja dipetakan." },
  { tag: "CONCEPT", text: "Fitur utama dan struktur data disusun." },
  { tag: "DESIGN", text: "Antarmuka dan interaksi dirancang." },
  { tag: "BUILD", text: "Modul dibangun dan dihubungkan." },
  { tag: "REFINE", text: "Detail tampilan dirapikan." },
  { tag: "TEST", text: "Alur utama selesai diuji." },
  { tag: "DEPLOY", text: "Build disiapkan untuk rilis." },
  { tag: "LIVE", text: buildScenarios[0].final },
];

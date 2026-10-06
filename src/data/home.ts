export const home = {
  hero: { eyebrow: "Hi, I'm Nalaro!", note: "Dari percakapan pertama sampai produk siap dipakai.", productsLabel: "Coba produk resmi kami" },
  products: { label: "Produk Nalaro", title: "Berbeda kebutuhan.\nSatu perhatian pada detail.", intro: "Produk yang kami bangun sendiri, dari ruang belajar sampai momen yang ingin dirayakan.", next: "Masih ada ruang untuk ide berikutnya.", nextLink: "Kenali cara kami bekerja" },
  solutions: { label: "Nalaro Solutions", title: "Kebutuhanmu punya\ncaranya sendiri.", intro: "Pengalaman membangun produk kami bawa ke pekerjaanmu. Ceritakan alurnya, kita cari bagian yang bisa dibuat lebih mudah.", visualLabel: "Dibangun mengikuti alur kerjamu", visualTitle: "Semua terhubung.\nLebih mudah dikelola.", audiences: "Untuk bisnis, institusi, komunitas, dan proyek pribadi." },
  process: { label: "Cara kami bekerja", title: "Dimulai dengan mendengar.\nDibangun bersama.", intro: "Kamu ikut melihat perkembangannya. Ada ruang untuk bertanya, mencoba, dan memperbaiki sebelum produk diluncurkan.", caseTitle: "Catatan dari proyek kami", caseText: "Studi kasus sedang kami susun. Sementara itu, kamu bisa mengenal produk yang sedang kami bangun.", caseLink: "Lihat produk Nalaro" },
  lab: { label: "Nalaro Lab", title: "Ruang untuk mencoba.", text: "Ide kecil kami uji di sini. Yang berguna kami kembangkan lebih jauh.", note: "Catatan eksperimen akan dibagikan di sini.", stages: ["Ide", "Eksperimen", "Prototipe", "Produk"] },
  about: { label: "Tentang studio", title: "Dibuat dengan nalar.\nDirawat dengan perhatian.", text: "Nalaro adalah studio produk digital. Kami membangun alat yang ingin kami pakai sendiri, lalu membukanya untuk lebih banyak orang.", detail: "Kami suka alur yang jelas, tampilan yang enak dibaca, dan fitur yang memang diperlukan. Sesudah rilis, kami tetap mendengar dan memperbaiki." },
  contact: { label: "Bangun bersama Nalaro", title: "Ada yang ingin\nkamu bangun?", text: "Boleh mulai dari masalah yang sering kamu temui. Tidak perlu brief yang sempurna.", offline: "Susun ceritamu di sini, lalu simpan untuk percakapan berikutnya.", note: "Pesan dibuka melalui aplikasi email atau WhatsApp milikmu." },
};
export const processSteps = [
  { title: "Pahami dulu", text: "Kami dengarkan kebutuhanmu dan pelajari cara kerjanya.", label: "Discover" },
  { title: "Buat bentuknya", text: "Alur dan desain bisa kamu coba sebelum masuk pengembangan.", label: "Design" },
  { title: "Bangun dan uji", text: "Fitur dikerjakan bertahap, lalu diuji dengan skenario pemakaian.", label: "Build" },
  { title: "Rilis dan rawat", text: "Produk diluncurkan. Masukan pengguna jadi bahan perbaikan.", label: "Ship" },
];
export const studioPrinciples = [
  { title: "Pahami masalahnya", text: "Alasan sebuah fitur dibuat harus jelas." },
  { title: "Buat mudah dipakai", text: "Pengguna tidak perlu menebak langkah berikutnya." },
  { title: "Perbaiki terus", text: "Pemakaian sehari-hari memberi pelajaran terbaik." },
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

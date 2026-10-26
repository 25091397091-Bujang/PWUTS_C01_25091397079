# UJIAN TENGAH SEMESTER (UTS) GASAL 2026/2027
## PEMROGRAMAN WEB (2 SKS) — UNIVERSITAS NEGERI SURABAYA

---

### IDENTITAS MAHASISWA & PENGERJAAN TUGAS
* **Nama Lengkap** : Aby Putra Mahendra
* **NIM** : 25091397079
* **Program Studi** : D4 Manajemen Informatika
* **Jurusan / Fakultas** : Program Vokasi, Universitas Negeri Surabaya
* **Kelas / Angkatan** : D4 MI 2025 / 2026
* **Kelompok** : C01
* **Dosen Pengampu** : Ari Kurniawan, S.Kom, M.T.
* **Peran Tugas** : **Anggota 3**
* **Format Folder Repository** : `PWUTS_C01_25091397079`

---

## 1. Topik Proyek & Latar Belakang Proposal

Website ini dikembangkan berdasarkan dokumen proposal resmi:
> **"PROPOSAL PERANCANGAN SISTEM INFORMASI MANAJEMEN RENTAL MOBIL BERBASIS WEBSITE" (AUTORENT)**  
> Mata Kuliah: Pemrograman Web, D4 Manajemen Informatika UNESA 2026

**Autorent** adalah sistem penyewaan kendaraan mobil berbasis web *single-vendor* pada tahap *Minimum Viable Product* (MVP). Sistem ini dirancang untuk menyelesaikan persoalan operasional rental manual, seperti pencatatan transaksi yang rawan hilang, pencegahan pemesanan bertumpang tindih (*double booking*), penghitungan durasi sewa kelipatan 24 jam yang transparan, kemudahan pemesanan bagi *customer* tanpa registrasi akun (*guest checkout*), serta verifikasi pembayaran manual melalui unggah bukti transfer.

---

## 2. Matriks Pembagian Tugas Kelompok C01

Berdasarkan kesepakatan pembagian tugas kelompok:

| Bagian Halaman | Anggota 1 | Anggota 2 | Anggota 3 (Saya - Aby Putra Mahendra) |
| :--- | :--- | :--- | :--- |
| **1. Homepage (Item 2.a)** | Homepage Rental Mobil | Homepage Rental Mobil | **Homepage Rental Mobil (Responsive Web Design + AJAX Navigation)** |
| **2. Halaman 2.b** | Katalog Mobil — pencarian dan filter mobil | Detail Mobil — informasi dan simulasi pemilihan mobil | **Cek Status Booking — pencarian status dengan kode booking unik (WF-6)** |
| **3. Halaman 2.c** | Form Booking — data penyewa, tanggal sewa, durasi | Form Pembayaran — unggah bukti pembayaran dan validasi | **Form Data Mobil Admin — tambah data mobil dan validasi input (WF-8)** |

---

## 3. Rincian Pemenuhan Butir Tugas UTS (Anggota 3)

### A. Butir 2.a — Homepage Sebagai Layout Utama & Navigasi AJAX
* **File Utama**: `index.html`
* **Responsive Web Design**: Menggunakan HTML5, CSS3 kustom (`css/style.css`), dan framework Bootstrap 5.3.3. Tampilan responsif sempurna untuk Desktop, Laptop, Tablet, dan Smartphone (NFR-RESP-001 & NFR-RESP-002).
* **Navigasi Berbasis AJAX**: Hyperlink navigasi menu pada header/navbar (Beranda, Cek Status Booking 2.b, Form Data Mobil 2.c) memuat konten halaman secara asinkron (*asynchronous*) menggunakan teknik AJAX (`$.ajax` / `fetch`) ke dalam kontainer `<main id="main-content">` tanpa memuat ulang (*page reload*) seluruh halaman web.
* **Hash Routing & Direct Access**: Dilengkapi URL hash router (`#beranda`, `#cek-status`, `#form-mobil`) sehingga tombol Back/Forward browser berfungsi normal dan URL dapat dibagikan secara langsung.
* **Hybrid Offline / Protocol file:/// Fallback**: Terdapat mekanisme fallback pintar menggunakan `<template>` di dalam `index.html`, sehingga website **100% berjalan sempurna dan bebas error** saat dibuka langsung via double-click Windows Explorer (`file:///`) maupun saat dijalankan melalui Web Server HTTP (Live Server / XAMPP / Apache).
* **Aset Gambar**: Menggunakan siluet vektor SVG kustom beresolusi tinggi untuk logo Autorent dan 8 varian unit mobil armada, memastikan tampilan tajam, ringan, dan tidak bergantung pada CDN gambar eksternal yang rawan *broken link*.

---

### B. Butir 2.b — Halaman Cek Status Booking (WF-6 Proposal)
* **File Partial / Konten**: `pages/cek-status.html`
* **File Logika & Script**: `js/status-booking.js`
* **Implementasi Fitur & Skenario Interaktif**:
  1. **FR-BOOK-009 & FR-BOOK-010**: Formulir pencarian status pemesanan menggunakan kode booking unik (format 8 karakter alfanumerik kapital, misal: `RNT-X9K2M`).
  2. **Live Input Formatting**: Input otomatis dikonversi ke huruf kapital dan karakter non-alfanumerik disaring secara real-time.
  3. **Tombol Sampel Cepat (Quick Test Chips)**: Disediakan tombol sampel kode booking instan untuk memudahkan Bapak Dosen dalam menguji berbagai variasi status pemesanan sesuai proposal:
     * `RNT-X9K2M` → Status: **Confirmed** (Avanza - Pembayaran Lunas)
     * `RNT-64TRL` → Status: **Pending Payment** (Innova Zenix - Bukti Menunggu Verifikasi Admin)
     * `RNT-C7MYQ` → Status: **Pending Payment (Rejected)** (Brio Satya - Bukti Struk Buram, Memerlukan Tindakan Upload Ulang)
     * `RNT-W1Y3Z` → Status: **Completed** (Ertiga Hybrid - Masa Sewa Telah Selesai)
     * `RNT-EXPR8` → Status: **Expired** (Xenia - Melebihi Batas Waktu 24 Jam)
     * `RNT-INVALID` → Status: **Simulasi 404** (Kode Tidak Terdaftar / Pesan Kesalahan Ramah)
  4. **State 1: Booking Ditemukan (Persis Wireframe WF-6 Proposal Halaman 38)**:
     * **Identifikasi Reservasi**: Menampilkan kode booking, badge status pemesanan, tombol cetak bukti (*print invoice*), dan tombol bantuan CS.
     * **Timeline Alur Booking**: Visualisasi step interaktif: *1. Booking Dibuat* → *2. Upload Bukti Bayar* → *3. Verifikasi Admin* → *4. Pengambilan Unit*.
     * **Informasi Unit & Reservasi**: Foto unit, kategori kendaraan, plat nomor, tanggal & jam mulai/selesai sewa, durasi sewa kelipatan 24 jam, serta identitas penyewa.
     * **Rincian Biaya & Status Pembayaran**: Rincian tarif per 24 jam, total biaya, rekening tujuan transfer, dan catatan verifikasi admin.
  5. **Simulasi Interaktif Unggah Ulang Bukti (FR-PAY-004 & FR-PAY-005)**:
     * Jika kode dengan status *Rejected* (`RNT-C7MYQ`) dibuka, sistem menampilkan alasan penolakan dan tombol untuk membuka modal interaktif simulasi upload bukti bayar baru (validasi format JPG/PNG maks 10MB). Setelah dikirim, status reservasi otomatis berganti menjadi *Pending Verification*.
  6. **Fitur Cetak Bukti (Invoice Print Media)**:
     * Tombol "Cetak Bukti" memicu print preview browser dengan layout invoice bersih (navbar, footer, dan tombol aksi otomatis disembunyikan saat dicetak).

---

### C. Butir 2.c — Form Data Mobil Admin & Validasi Input (WF-8 Proposal)
* **File Partial / Konten**: `pages/form-mobil.html`
* **File Logika & Script**: `js/form-mobil.js`
* **Struktur Data**: Disesuaikan dengan tabel `vehicles` dan `categories` pada skema basis data proposal Bab IV Subbab 4.3.
* **Sistem Validasi Menyeluruh Sebelum Submit**:
  1. **Nama Kendaraan (`name`)**: Wajib diisi, minimal 4 karakter (menampilkan feedback hijau jika valid / merah jika invalid).
  2. **Kategori Kendaraan (`category_id`)**: Wajib dipilih dari dropdown master kategori (MPV, SUV, City Car, Sedan).
  3. **Nomor Polisi / Plat Nomor (`plate`)**: Wajib diisi dengan validasi Regex plat nomor standar Indonesia (contoh: `L 1284 PDA` atau `B 2001 KLS`).
  4. **Tarif Sewa per 24 Jam (`price_per_day`)**: Wajib diisi angka nominal minimal Rp 100.000 dengan *live formatting preview* pemisah ribuan Rupiah secara real-time.
  5. **Kapasitas Penumpang (`capacity`)**: Wajib berupa angka bulat positif antara 2 hingga 15 orang.
  6. **Transmisi Kendaraan**: Wajib dipilih (Manual / Otomatis CVT).
  7. **Status Awal (`status`)**: Wajib dipilih (`Available` atau `Unavailable`).
  8. **Foto Kendaraan (`photo`)**: Opsi fleksibel: dapat memilih dari preset siluet vektor Autorent atau mengunggah berkas foto lokal dari komputer (dengan validasi tipe file `image/jpeg, image/png, image/webp` dan ukuran maksimal 5 MB).
  9. **Deskripsi & Fasilitas Unit (`description`)**: Wajib diisi minimal 20 karakter dengan indikator penghitung karakter interaktif (*live character counter*).
* **Fitur Interaktif & Simulasi Database**:
  1. **Live Synchronized Card Preview**: Setiap kali admin mengetik nama, memilih kategori, mengganti tarif, atau memilih foto, kartu katalog di samping form akan ter-update secara instan (*realtime sync*).
  2. **Modal Konfirmasi Data Sebelum Submit**: Saat tombol simpan diklik, form dicegat oleh JavaScript (`e.preventDefault()`). Bila ada field yang tidak valid, kursor otomatis fokus ke field bermasalah. Bila valid, modal konfirmasi muncul menampilkan ringkasan data kendaraan yang akan disimpan.
  3. **Simulasi AJAX HTTP POST Server**: Menampilkan indikator loading "*Menyimpan ke HTTP Server...*", data kemudian disimpan ke state memori dan `localStorage`, serta memicu respon sukses HTTP 201 Created.
  4. **Master Table Kendaraan (Sesuai WF-8 Halaman 39)**:
     * Data yang baru ditambahkan langsung muncul secara otomatis di baris paling atas tabel.
     * **Toggle Status (FR-VEH-007)**: Admin dapat mengubah status mobil antara `Available` dan `Unavailable` hanya dengan 1 kali klik.
     * **Proteksi Hapus Sesuai Aturan Bisnis (BR-013 & FR-VEH-006)**: Kendaraan yang telah memiliki histori pemesanan di sistem (seperti Avanza, Zenix, Brio, Xenia, Ertiga) **dilindungi dari penghapusan permanen** demi integritas data transaksi. Sistem akan memunculkan dialog edukatif instruksi untuk menggunakan fitur toggle status. Unit kendaraan baru yang belum memiliki histori booking dapat dihapus secara normal.
     * **Live Search & Filter Status**: Pencarian cepat berdasarkan nama mobil / nomor plat serta filter ketersediaan langsung di tabel admin.

---

## 4. Struktur Folder & Berkas Proyek

```
PWUTS_C01_25091397079/
│
├── index.html                  # Layout utama website (Item 2.a), Responsive Web Design & AJAX Router
├── README.md                   # Catatan & dokumentasi lengkap pengerjaan UTS (Item 2.e)
├── database.sql                # DDL & DML skema MySQL 5 tabel sesuai proposal Bab IV
│
├── css/
│   └── style.css               # Desain antarmuka modern, custom variables, responsive media queries
│
├── js/
│   ├── app.js                  # Engine navigasi AJAX, hash router, render katalog & filter homepage
│   ├── status-booking.js       # Logika interaktif Cek Status Booking (Item 2.b & WF-6)
│   └── form-mobil.js           # Logika validasi form ketat & CRUD data armada admin (Item 2.c & WF-8)
│
├── pages/
│   ├── home-content.html       # Konten partial Beranda yang dimuat via AJAX
│   ├── cek-status.html         # Konten partial Cek Status Booking yang dimuat via AJAX
│   └── form-mobil.html         # Konten partial Form Tambah Mobil Admin yang dimuat via AJAX
│
├── assets/
│   └── images/                 # Aset grafis vektor SVG tajam & ringan
│       ├── logo.svg            # Logo resmi Rental Mobil Autorent
│       ├── avanza.svg          # Ilustrasi unit Toyota Avanza 1.3 G (MPV)
│       ├── zenix.svg           # Ilustrasi unit Toyota Innova Zenix 2.0 V (Premium MPV)
│       ├── brio.svg            # Ilustrasi unit Honda Brio Satya E CVT (City Car)
│       ├── pajero.svg          # Ilustrasi unit Mitsubishi Pajero Sport Dakar (SUV)
│       ├── xenia.svg           # Ilustrasi unit Daihatsu Xenia 1.3 R (MPV)
│       ├── fortuner.svg        # Ilustrasi unit Toyota Fortuner GR Sport (SUV)
│       ├── ertiga.svg          # Ilustrasi unit Suzuki Ertiga Hybrid (Smart MPV)
│       ├── stargazer.svg       # Ilustrasi unit Hyundai Stargazer Trend (MPV)
│       └── default-car.svg     # Ilustrasi default armada baru
│
└── api/                        # Mock endpoint backend PHP Native (opsional untuk HTTP server)
    ├── submit_car.php          # Endpoint penerima HTTP POST penambahan mobil
    └── check_status.php        # Endpoint penerima HTTP GET pencarian status booking
```

---

## 5. Panduan Cara Menjalankan Website

Aplikasi web ini dirancang sangat fleksibel dan dapat dijalankan dengan dua cara:

### Cara 1: Menggunakan Web Server Lokal (Direkomendasikan)
1. **VS Code Live Server**:
   * Buka folder `PWUTS_C01_25091397079` di VS Code.
   * Klik kanan pada file `index.html` dan pilih **"Open with Live Server"**.
   * Website akan terbuka di peramban pada alamat `http://127.0.0.1:5500/index.html`.
2. **PHP Built-in Server**:
   * Buka terminal di dalam folder proyek:
     ```bash
     php -S localhost:8000
     ```
   * Buka peramban dan akses: `http://localhost:8000`
3. **XAMPP / Laragon**:
   * Salin folder `PWUTS_C01_25091397079` ke direktori `htdocs` (misal: `C:/xampp/htdocs/PWUTS_C01_25091397079`).
   * Buka peramban dan akses: `http://localhost/PWUTS_C01_25091397079/`

### Cara 2: Membuka Langsung File HTML (Offline / Double Click)
* Anda dapat langsung membuka file `index.html` dengan cara klik ganda (*double click*) di File Explorer peramban modern (Google Chrome, Microsoft Edge, Mozilla Firefox).
* Berkat arsitektur *Hybrid Fallback Engine* yang telah saya implementasikan, seluruh navigasi menu AJAX, fitur pencarian status, validasi form, serta live preview akan **tetap berjalan 100% lancar tanpa hambatan kendala keamanan CORS lokal**.

---

## 6. Kesimpulan & Penutup

Seluruh ketentuan yang diinstruksikan dalam lembar soal UTS Pemrograman Web Gasal 2026/2027 serta kesepakatan pembagian tugas kelompok C01 untuk **Anggota 3 (Aby Putra Mahendra - 25091397079)** telah selesai dikerjakan secara komprehensif, terstruktur, dan berpatokan penuh pada dokumen proposal perancangan sistem informasi rental mobil Autorent.

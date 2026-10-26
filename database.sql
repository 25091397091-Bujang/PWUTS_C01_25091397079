-- ===================================================================
-- SISTEM INFORMASI MANAJEMEN RENTAL MOBIL BERBASIS WEBSITE (AUTORENT)
-- Skema Basis Data MySQL Sesuai Proposal Bab IV Subbab 4.3 (ERD & Data Dictionary)
-- Mata Kuliah: Pemrograman Web (2 SKS) - Universitas Negeri Surabaya
-- Mahasiswa: Aby Putra Mahendra (NIM: 25091397079) - Anggota 3
-- ===================================================================

CREATE DATABASE IF NOT EXISTS `autorent_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `autorent_db`;

-- --------------------------------------------------------
-- 1. Tabel Admins (Autentikasi Pengelola)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `vehicles`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Admin
INSERT INTO `admins` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Administrator Autorent', 'admin@autorent.com', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeFX1r2YqLq4qFm2j7V9Vz.gG87pT1wS6', NOW());

-- --------------------------------------------------------
-- 2. Tabel Categories (Kategori Kelas Kendaraan)
-- --------------------------------------------------------
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Categories
INSERT INTO `categories` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'MPV', 'Multi-Purpose Vehicle untuk kenyamanan perjalanan keluarga besar dan grup.', NOW()),
(2, 'SUV', 'Sport Utility Vehicle dengan ground clearance tinggi, mesin tangguh, dan performa segala medan.', NOW()),
(3, 'City Car', 'Kendaraan lincah, kompak, dan hemat bahan bakar untuk kebutuhan perkotaan.', NOW()),
(4, 'Sedan', 'Kendaraan kelas eksekutif dengan kenyamanan suspensi premium dan bagasi terpisah.', NOW());

-- --------------------------------------------------------
-- 3. Tabel Vehicles (Armada Kendaraan - Kebutuhan Item 2.c)
-- --------------------------------------------------------
CREATE TABLE `vehicles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `plate` VARCHAR(20) NOT NULL UNIQUE,
  `description` TEXT NOT NULL,
  `price_per_day` DECIMAL(12,2) NOT NULL,
  `capacity` TINYINT UNSIGNED NOT NULL,
  `transmission` VARCHAR(30) NOT NULL DEFAULT 'Manual',
  `fuel` VARCHAR(30) NOT NULL DEFAULT 'Bensin',
  `photo` VARCHAR(255) NOT NULL,
  `status` ENUM('Available', 'Unavailable') NOT NULL DEFAULT 'Available',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_vehicles_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Vehicles (Sesuai Proposal Bab IV)
INSERT INTO `vehicles` (`id`, `category_id`, `name`, `plate`, `description`, `price_per_day`, `capacity`, `transmission`, `fuel`, `photo`, `status`, `created_at`) VALUES
(1, 1, 'Toyota Avanza 1.3 G', 'B 1284 PDA', 'Unit Toyota Avanza 1.3 G dalam kondisi prima dan terawat dengan riwayat servis berkala di bengkel resmi. Kabin senyap, bersih, bebas asap rokok, AC double blower dingin merata.', 350000.00, 7, 'Manual', 'Bensin', 'assets/images/avanza.svg', 'Available', NOW()),
(2, 1, 'Toyota Innova Zenix 2.0 V', 'B 2001 KLS', 'Innova Zenix generasi terbaru dengan transmisi CVT halus dan ruang kabin lapang premium. Dilengkapi head unit touchscreen dan fitur keselamatan mutakhir.', 650000.00, 7, 'Otomatis (CVT/AT)', 'Bensin', 'assets/images/zenix.svg', 'Available', NOW()),
(3, 3, 'Honda Brio Satya E CVT', 'B 4421 TZZ', 'City car gesit dan lincah untuk lalu lintas perkotaan. Sangat hemat bahan bakar, AC dingin, dan bagasi cukup untuk belanja harian atau liburan berdua.', 300000.00, 5, 'Otomatis (CVT/AT)', 'Bensin', 'assets/images/brio.svg', 'Unavailable', NOW()),
(4, 2, 'Mitsubishi Pajero Sport Dakar', 'B 5899 DKR', 'Big SUV tangguh dengan mesin diesel bertenaga tinggi. Cocok untuk medan luar kota, jalan menanjak, dan perjalanan dinas VIP dengan kenyamanan maksimal.', 850000.00, 7, 'Otomatis (CVT/AT)', 'Solar', 'assets/images/pajero.svg', 'Available', NOW()),
(5, 1, 'Daihatsu Xenia 1.3 R', 'L 1092 XN', 'Mobil keluarga ekonomis dengan konsumsi bahan bakar efisien dan suspensi nyaman. Pilihan ideal untuk mudik atau perjalanan rombongan di Jawa Timur.', 330000.00, 7, 'Manual', 'Bensin', 'assets/images/xenia.svg', 'Available', NOW()),
(6, 2, 'Toyota Fortuner GR Sport', 'L 1777 GR', 'Varian sporty GR dengan akselerasi responsif dan tampilan gagah. Dilengkapi fitur keamanan canggih TSS dan sistem audio JBL premium.', 900000.00, 7, 'Otomatis (CVT/AT)', 'Solar', 'assets/images/fortuner.svg', 'Available', NOW()),
(7, 1, 'Suzuki Ertiga Hybrid', 'L 1945 IND', 'Teknologi Smart Hybrid Suzuki ramah lingkungan dan sangat irit. Dilengkapi fitur Cruise Control dan jok ergonomis untuk perjalanan jauh tanpa pegal.', 375000.00, 7, 'Manual', 'Hybrid', 'assets/images/ertiga.svg', 'Available', NOW()),
(8, 1, 'Hyundai Stargazer Trend', 'L 2026 HYU', 'Desain futuristik dengan One Curve Design. Dilengkapi Wireless Smartphone Charger, ruang kabin super lega, dan fitur Bluelink modern.', 420000.00, 7, 'Otomatis (CVT/AT)', 'Bensin', 'assets/images/stargazer.svg', 'Available', NOW());

-- --------------------------------------------------------
-- 4. Tabel Bookings (Transaksi Reservasi - Kebutuhan Item 2.b)
-- --------------------------------------------------------
CREATE TABLE `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `booking_code` CHAR(9) NOT NULL UNIQUE,
  `vehicle_id` INT NOT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_phone` VARCHAR(20) NOT NULL,
  `customer_email` VARCHAR(150) NOT NULL,
  `start_at` DATETIME NOT NULL,
  `end_at` DATETIME NOT NULL,
  `duration_days` SMALLINT UNSIGNED NOT NULL,
  `price_per_day` DECIMAL(12,2) NOT NULL,
  `total_price` DECIMAL(12,2) NOT NULL,
  `status` ENUM('Pending Payment', 'Confirmed', 'Completed', 'Expired') NOT NULL DEFAULT 'Pending Payment',
  `payment_deadline` DATETIME NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_bookings_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Bookings
INSERT INTO `bookings` (`id`, `booking_code`, `vehicle_id`, `customer_name`, `customer_phone`, `customer_email`, `start_at`, `end_at`, `duration_days`, `price_per_day`, `total_price`, `status`, `payment_deadline`, `created_at`) VALUES
(1, 'RNT-X9K2M', 1, 'Budi Santoso', '0812-3456-7890', 'budi@example.com', '2026-10-25 09:00:00', '2026-10-27 09:00:00', 2, 350000.00, 700000.00, 'Confirmed', '2026-10-26 08:45:00', '2026-10-25 08:45:00'),
(2, 'RNT-64TRL', 2, 'Siti Rahma', '0857-9876-5432', 'siti.rahma@example.com', '2026-10-28 10:00:00', '2026-10-30 10:00:00', 2, 650000.00, 1300000.00, 'Pending Payment', '2026-10-27 14:10:00', '2026-10-26 14:10:00'),
(3, 'RNT-C7MYQ', 3, 'Ahmad Fauzi', '0813-1122-3344', 'ahmad.fauzi@example.com', '2026-10-29 08:00:00', '2026-10-30 08:00:00', 1, 300000.00, 300000.00, 'Pending Payment', '2026-10-27 11:00:00', '2026-10-26 11:00:00'),
(4, 'RNT-W1Y3Z', 7, 'Maya Indah', '0821-4455-6677', 'maya.indah@example.com', '2026-10-20 09:00:00', '2026-10-22 09:00:00', 2, 375000.00, 750000.00, 'Completed', '2026-10-20 10:00:00', '2026-10-19 10:00:00'),
(5, 'RNT-EXPR8', 5, 'Denny Pratama', '0819-8877-6655', 'denny@example.com', '2026-10-24 10:00:00', '2026-10-25 10:00:00', 1, 330000.00, 330000.00, 'Expired', '2026-10-24 09:00:00', '2026-10-23 09:00:00');

-- --------------------------------------------------------
-- 5. Tabel Payments (Bukti & Verifikasi Pembayaran)
-- --------------------------------------------------------
CREATE TABLE `payments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `booking_id` INT NOT NULL UNIQUE,
  `amount` DECIMAL(12,2) NOT NULL,
  `proof_path` VARCHAR(255) NULL,
  `verification_status` ENUM('Pending', 'Accepted', 'Rejected') NOT NULL DEFAULT 'Pending',
  `rejection_reason` TEXT NULL,
  `verified_by` INT NULL,
  `verified_at` DATETIME NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_payments_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_payments_admin` FOREIGN KEY (`verified_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Payments
INSERT INTO `payments` (`id`, `booking_id`, `amount`, `proof_path`, `verification_status`, `rejection_reason`, `verified_by`, `verified_at`, `created_at`) VALUES
(1, 1, 700000.00, 'uploads/proofs/mandiri_700k.jpg', 'Accepted', NULL, 1, '2026-10-25 09:30:00', '2026-10-25 09:12:00'),
(2, 2, 1300000.00, 'uploads/proofs/bca_1300k.jpg', 'Pending', NULL, NULL, NULL, '2026-10-26 14:35:00'),
(3, 3, 300000.00, 'uploads/proofs/struk_buram.jpg', 'Rejected', 'Foto struk transfer buram dan nominal tidak terbaca dengan jelas. Silakan upload ulang foto struk resmi perbankan atau screenshot m-Banking yang sah.', 1, '2026-10-26 11:45:00', '2026-10-26 11:20:00'),
(4, 4, 750000.00, 'uploads/proofs/bca_750k.jpg', 'Accepted', NULL, 1, '2026-10-19 11:00:00', '2026-10-19 10:30:00');

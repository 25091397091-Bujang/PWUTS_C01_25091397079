<?php
/**
 * AUTORENT - HTTP API Endpoint: Tambah Mobil (Tabel vehicles)
 * Endpoint ini menerima request AJAX POST dari Item 2.c
 * Pengembang: Aby Putra Mahendra (NIM: 25091397079) - Anggota 3
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Metode HTTP tidak diizinkan. Gunakan POST.'
    ]);
    exit;
}

// Ambil input JSON atau FORM POST
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

// Validasi Server-side (NFR-SEC-003)
$name = trim($data['name'] ?? '');
$categoryId = intval($data['category_id'] ?? 0);
$plate = strtoupper(trim($data['plate'] ?? ''));
$pricePerDay = floatval($data['price_per_day'] ?? 0);
$capacity = intval($data['capacity'] ?? 0);
$transmission = trim($data['transmission'] ?? '');
$description = trim($data['description'] ?? '');
$status = trim($data['status'] ?? 'Available');
$photo = trim($data['photo'] ?? 'assets/images/default-car.svg');

$errors = [];

if (strlen($name) < 4) {
    $errors[] = 'Nama kendaraan minimal 4 karakter.';
}
if ($categoryId <= 0) {
    $errors[] = 'Kategori kendaraan wajib dipilih.';
}
if (!preg_match('/^[A-Z]{1,2}\s[0-9]{1,4}\s[A-Z]{1,3}$/', $plate)) {
    $errors[] = 'Format plat nomor kendaraan tidak valid.';
}
if ($pricePerDay < 100000) {
    $errors[] = 'Tarif sewa minimal Rp 100.000 / 24 jam.';
}
if ($capacity < 2 || $capacity > 15) {
    $errors[] = 'Kapasitas penumpang harus antara 2 hingga 15 orang.';
}
if (empty($transmission)) {
    $errors[] = 'Transmisi wajib dipilih.';
}
if (strlen($description) < 20) {
    $errors[] = 'Deskripsi unit wajib diisi minimal 20 karakter.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'status' => 'validation_error',
        'errors' => $errors
    ]);
    exit;
}

// Respon Sukses Simulasi Penyimpanan Basis Data
http_response_code(201);
echo json_encode([
    'status' => 'success',
    'message' => 'Data kendaraan baru berhasil disimpan ke basis data Autorent!',
    'data' => [
        'id' => rand(10, 999),
        'category_id' => $categoryId,
        'name' => $name,
        'plate' => $plate,
        'price_per_day' => $pricePerDay,
        'capacity' => $capacity,
        'transmission' => $transmission,
        'status' => $status,
        'photo' => $photo,
        'description' => $description,
        'created_at' => date('Y-m-d H:i:s')
    ]
]);

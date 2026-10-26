<?php
/**
 * AUTORENT - HTTP API Endpoint: Cek Status Booking (Item 2.b)
 * Pengembang: Aby Putra Mahendra (NIM: 25091397079) - Anggota 3
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$code = strtoupper(trim($_GET['code'] ?? ''));

if (empty($code)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Kode booking wajib disertakan.']);
    exit;
}

// Data Dummy Database
$bookings = [
    'RNT-X9K2M' => [
        'booking_code' => 'RNT-X9K2M',
        'customer_name' => 'Budi Santoso',
        'vehicle_name' => 'Toyota Avanza 1.3 G',
        'category_name' => 'MPV Keluarga',
        'start_at' => '2026-10-25 09:00',
        'end_at' => '2026-10-27 09:00',
        'duration_days' => 2,
        'total_price' => 700000,
        'status' => 'Confirmed',
        'payment_status' => 'Verified'
    ],
    'RNT-64TRL' => [
        'booking_code' => 'RNT-64TRL',
        'customer_name' => 'Siti Rahma',
        'vehicle_name' => 'Toyota Innova Zenix 2.0 V',
        'category_name' => 'Premium MPV',
        'start_at' => '2026-10-28 10:00',
        'end_at' => '2026-10-30 10:00',
        'duration_days' => 2,
        'total_price' => 1300000,
        'status' => 'Pending Payment',
        'payment_status' => 'Pending'
    ]
];

if (isset($bookings[$code])) {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'data' => $bookings[$code]]);
} else {
    http_response_code(404);
    echo json_encode(['status' => 'not_found', 'message' => 'Kode booking tidak ditemukan.']);
}

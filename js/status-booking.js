/**
 * AUTORENT - Modul Cek Status Booking (Item 2.b & WF-6 Proposal)
 * Pengembang: Aby Putra Mahendra (NIM: 25091397079) - Anggota 3
 * Kelompok: C01 / D4 Manajemen Informatika Unesa
 */

// Dataset Booking Sesuai Proposal Bab 3 & 4 (Mock Database tabel bookings & payments)
window.AutorentBookings = [
  {
    booking_code: "RNT-X9K2M",
    customer_name: "Budi Santoso",
    customer_phone: "0812-3456-7890",
    customer_email: "budi@example.com",
    vehicle_id: 1,
    vehicle_name: "Toyota Avanza 1.3 G",
    vehicle_plate: "B 1284 PDA",
    category_name: "MPV Keluarga",
    transmission: "Manual 5-Speed",
    capacity: 7,
    photo: "assets/images/avanza.svg",
    start_at: "2026-10-25 09:00",
    end_at: "2026-10-27 09:00",
    duration_days: 2,
    price_per_day: 350000,
    total_price: 700000,
    status: "Confirmed", // Status Booking: Pending Payment, Confirmed, Completed, Expired
    payment_status: "Verified", // Verified, Pending, Rejected, Expired
    payment_method: "Transfer Bank Mandiri (137-00-1828374-1)",
    bank_account_name: "PT Autorent Rental Indonesia",
    rejection_reason: null,
    created_at: "2026-10-25 08:45 WIB",
    proof_uploaded_at: "2026-10-25 09:12 WIB",
    verified_at: "2026-10-25 09:30 WIB",
    timeline_step: 3 // 1: Dibuat, 2: Upload Bukti, 3: Terverifikasi, 4: Selesai
  },
  {
    booking_code: "RNT-64TRL",
    customer_name: "Siti Rahma",
    customer_phone: "0857-9876-5432",
    customer_email: "siti.rahma@example.com",
    vehicle_id: 2,
    vehicle_name: "Toyota Innova Zenix 2.0 V",
    vehicle_plate: "B 2001 KLS",
    category_name: "Premium MPV",
    transmission: "Otomatis CVT",
    capacity: 7,
    photo: "assets/images/zenix.svg",
    start_at: "2026-10-28 10:00",
    end_at: "2026-10-30 10:00",
    duration_days: 2,
    price_per_day: 650000,
    total_price: 1300000,
    status: "Pending Payment",
    payment_status: "Pending", // Sedang diverifikasi admin
    payment_method: "Transfer Bank BCA (8271 0029 4912)",
    bank_account_name: "PT Autorent Rental Indonesia",
    rejection_reason: null,
    created_at: "2026-10-26 14:10 WIB",
    proof_uploaded_at: "2026-10-26 14:35 WIB",
    verified_at: null,
    timeline_step: 2
  },
  {
    booking_code: "RNT-C7MYQ",
    customer_name: "Ahmad Fauzi",
    customer_phone: "0813-1122-3344",
    customer_email: "ahmad.fauzi@example.com",
    vehicle_id: 3,
    vehicle_name: "Honda Brio Satya E CVT",
    vehicle_plate: "B 4421 TZZ",
    category_name: "City Car Ringkas",
    transmission: "Otomatis",
    capacity: 5,
    photo: "assets/images/brio.svg",
    start_at: "2026-10-29 08:00",
    end_at: "2026-10-30 08:00",
    duration_days: 1,
    price_per_day: 300000,
    total_price: 300000,
    status: "Pending Payment",
    payment_status: "Rejected", // Bukti ditolak admin (FR-PAY-004 & FR-PAY-005)
    payment_method: "Transfer Bank Mandiri (137-00-1828374-1)",
    bank_account_name: "PT Autorent Rental Indonesia",
    rejection_reason: "Foto struk transfer buram dan nominal tidak terbaca dengan jelas. Silakan upload ulang foto struk resmi perbankan atau screenshot m-Banking yang sah.",
    created_at: "2026-10-26 11:00 WIB",
    proof_uploaded_at: "2026-10-26 11:20 WIB",
    verified_at: "2026-10-26 11:45 WIB",
    timeline_step: 2
  },
  {
    booking_code: "RNT-W1Y3Z",
    customer_name: "Maya Indah",
    customer_phone: "0821-4455-6677",
    customer_email: "maya.indah@example.com",
    vehicle_id: 7,
    vehicle_name: "Suzuki Ertiga Hybrid",
    vehicle_plate: "L 1945 IND",
    category_name: "Smart Hybrid MPV",
    transmission: "Manual",
    capacity: 7,
    photo: "assets/images/ertiga.svg",
    start_at: "2026-10-20 09:00",
    end_at: "2026-10-22 09:00",
    duration_days: 2,
    price_per_day: 375000,
    total_price: 750000,
    status: "Completed",
    payment_status: "Verified",
    payment_method: "Transfer Bank BCA",
    bank_account_name: "PT Autorent Rental Indonesia",
    rejection_reason: null,
    created_at: "2026-10-19 10:00 WIB",
    proof_uploaded_at: "2026-10-19 10:30 WIB",
    verified_at: "2026-10-19 11:00 WIB",
    timeline_step: 4
  },
  {
    booking_code: "RNT-EXPR8",
    customer_name: "Denny Pratama",
    customer_phone: "0819-8877-6655",
    customer_email: "denny@example.com",
    vehicle_id: 5,
    vehicle_name: "Daihatsu Xenia 1.3 R",
    vehicle_plate: "L 1092 XN",
    category_name: "MPV Keluarga",
    transmission: "Manual",
    capacity: 7,
    photo: "assets/images/xenia.svg",
    start_at: "2026-10-24 10:00",
    end_at: "2026-10-25 10:00",
    duration_days: 1,
    price_per_day: 330000,
    total_price: 330000,
    status: "Expired",
    payment_status: "Expired",
    payment_method: "Transfer Bank Mandiri",
    bank_account_name: "PT Autorent Rental Indonesia",
    rejection_reason: "Pemesanan kedaluwarsa karena tidak ada unggahan bukti pembayaran yang valid dalam batas waktu 24 jam (FR-BOOK-011).",
    created_at: "2026-10-23 09:00 WIB",
    proof_uploaded_at: null,
    verified_at: null,
    timeline_step: 1
  }
];

// Helper: Format Rupiah
function formatRupiah(amount) {
  return "Rp " + Number(amount).toLocaleString("id-ID");
}

// Inisialisasi Event Modul Status Booking
function initStatusBookingModule() {
  const $form = $("#form-cek-booking");
  const $input = $("#input-booking-code");
  const $feedback = $("#booking-code-feedback");
  const $placeholder = $("#booking-result-placeholder");

  if (!$form.length) return;

  // Real-time input formatter: uppercase, hapus spasi & karakter ilegal
  $input.off("input").on("input", function () {
    let val = $(this).val().toUpperCase().replace(/[^A-Z0-9-]/g, "");
    $(this).val(val);
    $feedback.addClass("d-none");
    $(this).removeClass("is-invalid");
  });

  // Handler Submit Pencarian Kode Booking
  $form.off("submit").on("submit", function (e) {
    e.preventDefault();
    const code = $input.val().trim().toUpperCase();

    // Validasi format kode booking (FR-BOOK-005 & FR-BOOK-010)
    if (!code || code.length < 5) {
      $feedback.removeClass("d-none").html('<i class="bi bi-exclamation-triangle-fill me-1"></i> Mohon masukkan kode booking yang valid (minimal 5 karakter).');
      $input.addClass("is-invalid").focus();
      return;
    }

    // Tampilkan simulasi loading
    $placeholder.html(`
      <div class="card border-0 shadow-sm p-5 text-center bg-white rounded-4">
        <div class="spinner-border text-primary mx-auto mb-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h6 class="fw-bold text-dark">Memeriksa Basis Data Reservasi Autorent...</h6>
        <p class="text-muted small mb-0">Mencocokkan kode booking <strong>${code}</strong> dengan sistem database.</p>
      </div>
    `);

    // Simulasi delay Ajax query ke database (350ms)
    setTimeout(function () {
      executeBookingSearch(code);
    }, 350);
  });

  // Handler Quick Code Chips
  $(".quick-code-chip").off("click").on("click", function () {
    const code = $(this).data("code");
    $input.val(code);
    $form.trigger("submit");
  });

  // Handler Modal Upload Bukti File Preview
  $("#reupload-file-input").off("change").on("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Ukuran file melebihi batas 10 MB!");
        $(this).val("");
        $("#reupload-preview-box").addClass("d-none");
        return;
      }
      const reader = new FileReader();
      reader.onload = function (evt) {
        $("#reupload-preview-img").attr("src", evt.target.result);
        $("#reupload-preview-box").removeClass("d-none");
      };
      reader.readAsDataURL(file);
    }
  });

  // Handler Submit Upload Bukti Ulang
  $("#form-reupload-bukti").off("submit").on("submit", function (e) {
    e.preventDefault();
    const file = $("#reupload-file-input")[0].files[0];
    if (!file) {
      alert("Silakan pilih file bukti pembayaran terlebih dahulu!");
      return;
    }

    const currentCode = $("#active-booking-code-view").text().trim();
    const booking = window.AutorentBookings.find(b => b.booking_code === currentCode);

    if (booking) {
      booking.payment_status = "Pending";
      booking.status = "Pending Payment";
      booking.rejection_reason = null;
      booking.proof_uploaded_at = "Baru saja diunggah (" + new Date().toLocaleTimeString("id-ID") + " WIB)";
      booking.timeline_step = 2;

      // Close modal
      const modalEl = document.getElementById("modalUploadBukti");
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      alert("Bukti pembayaran berhasil diunggah ulang! Status kini 'Pending Verification' menunggu konfirmasi admin.");
      executeBookingSearch(currentCode);
    }
  });
}

// Eksekusi Pencarian Data Booking
function executeBookingSearch(code) {
  const $placeholder = $("#booking-result-placeholder");
  const booking = window.AutorentBookings.find(b => b.booking_code === code);

  if (booking) {
    renderStateFound(booking, $placeholder);
  } else {
    renderStateNotFound(code, $placeholder);
  }
}

// Render State 1: Booking Ditemukan (Sesuai WF-6 Halaman 38)
function renderStateFound(b, $container) {
  // Tentukan badge class & status text
  let statusBadgeClass = "badge-available";
  let statusText = b.status;
  let statusIcon = "bi-check-circle-fill";

  if (b.status === "Confirmed") {
    statusBadgeClass = "badge-confirmed";
    statusIcon = "bi-check2-circle";
  } else if (b.status === "Pending Payment") {
    statusBadgeClass = "badge-pending";
    statusIcon = "bi-hourglass-split";
  } else if (b.status === "Expired") {
    statusBadgeClass = "badge-expired";
    statusIcon = "bi-x-circle-fill";
  } else if (b.status === "Completed") {
    statusBadgeClass = "badge-completed";
    statusIcon = "bi-flag-fill";
  }

  // Tentukan status verifikasi pembayaran
  let paymentVerificationHtml = "";
  if (b.payment_status === "Verified") {
    paymentVerificationHtml = `
      <div class="alert alert-success d-flex align-items-center gap-2 p-3 rounded-3 mb-3">
        <i class="bi bi-shield-check fs-3 text-success"></i>
        <div>
          <div class="fw-bold text-success">Pembayaran Terverifikasi (Lunas)</div>
          <div class="small text-muted">Diverifikasi oleh Admin pada ${b.verified_at || 'Sistem'}</div>
        </div>
      </div>
    `;
  } else if (b.payment_status === "Rejected") {
    paymentVerificationHtml = `
      <div class="alert alert-danger p-3 rounded-3 mb-3">
        <div class="d-flex align-items-center gap-2 mb-2">
          <i class="bi bi-exclamation-octagon-fill fs-4 text-danger"></i>
          <strong class="text-danger">Status Verifikasi: REJECTED (PERLU TINDAKAN)</strong>
        </div>
        <p class="small text-dark mb-2">
          <strong>Alasan Penolakan:</strong> ${b.rejection_reason}
        </p>
        <button class="btn btn-sm btn-danger fw-bold" data-bs-toggle="modal" data-bs-target="#modalUploadBukti">
          <i class="bi bi-cloud-arrow-up-fill me-1"></i> Unggah Ulang Bukti Pembayaran
        </button>
      </div>
    `;
  } else if (b.payment_status === "Pending") {
    paymentVerificationHtml = `
      <div class="alert alert-warning p-3 rounded-3 mb-3">
        <div class="d-flex align-items-center gap-2 mb-1">
          <i class="bi bi-hourglass-split fs-4 text-warning"></i>
          <strong class="text-dark">Status Verifikasi: Menunggu Review Admin</strong>
        </div>
        <div class="small text-muted">
          Bukti pembayaran telah kami terima pada ${b.proof_uploaded_at || '-'}. Tim operasional kami sedang melakukan rekonsiliasi transfer.
        </div>
      </div>
    `;
  } else if (b.payment_status === "Expired") {
    paymentVerificationHtml = `
      <div class="alert alert-secondary p-3 rounded-3 mb-3">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-slash-circle fs-4 text-secondary"></i>
          <div>
            <strong>Batas Waktu Pembayaran Terlewati</strong>
            <div class="small text-muted">Booking otomatis dibatalkan sistem karena tidak ada pembayaran dalam 24 jam.</div>
          </div>
        </div>
      </div>
    `;
  }

  // Tentukan state step timeline
  const step1Class = b.timeline_step >= 1 ? "completed" : "";
  const step2Class = b.timeline_step > 2 ? "completed" : (b.timeline_step === 2 ? (b.payment_status === "Rejected" ? "active" : "completed") : "");
  const step3Class = b.timeline_step >= 3 ? "completed" : (b.timeline_step === 2 ? "active" : "");
  const step4Class = b.timeline_step === 4 ? "completed" : "";

  const html = `
    <div class="booking-result-card mb-4">
      
      <!-- Bar Header Identifikasi Reservasi -->
      <div class="booking-header-bar">
        <div class="d-flex align-items-center gap-3">
          <div class="bg-primary bg-opacity-10 text-primary p-2 rounded-circle">
            <i class="bi ${statusIcon} fs-4"></i>
          </div>
          <div>
            <div class="small text-muted text-uppercase fw-bold">Identifikasi Reservasi</div>
            <div class="booking-code-highlight" id="active-booking-code-view">${b.booking_code}</div>
          </div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="vehicle-status-badge ${statusBadgeClass} fs-6 px-3 py-2">
            Status: ${statusText}
          </span>
          <button class="btn btn-outline-secondary btn-sm fw-bold btn-print-hide" onclick="window.print()" title="Cetak Bukti Pemesanan">
            <i class="bi bi-printer me-1"></i> Cetak Bukti
          </button>
          <button class="btn btn-outline-primary btn-sm fw-bold btn-print-hide" data-bs-toggle="modal" data-bs-target="#modalBantuanCS">
            <i class="bi bi-headset me-1"></i> Bantuan
          </button>
        </div>
      </div>

      <div class="p-4">
        
        <!-- Timeline Alur Booking (Sesuai WF-6) -->
        <div class="mb-4">
          <span class="small fw-bold text-muted text-uppercase d-block mb-2">Timeline Alur Booking</span>
          <div class="timeline-tracker">
            <div class="timeline-step ${step1Class}">
              <div class="timeline-circle"><i class="bi bi-check-lg"></i></div>
              <span class="timeline-label">1. Booking Dibuat<br><small class="text-muted">${b.created_at}</small></span>
            </div>
            <div class="timeline-step ${step2Class}">
              <div class="timeline-circle">
                ${b.payment_status === 'Rejected' ? '<i class="bi bi-exclamation"></i>' : '<i class="bi bi-check-lg"></i>'}
              </div>
              <span class="timeline-label">2. Upload Bukti Bayar<br><small class="text-muted">${b.proof_uploaded_at || 'Menunggu'}</small></span>
            </div>
            <div class="timeline-step ${step3Class}">
              <div class="timeline-circle"><i class="bi bi-shield-check"></i></div>
              <span class="timeline-label">3. Verifikasi Admin<br><small class="text-muted">${b.verified_at || 'Dalam Proses'}</small></span>
            </div>
            <div class="timeline-step ${step4Class}">
              <div class="timeline-circle"><i class="bi bi-key-fill"></i></div>
              <span class="timeline-label">4. Pengambilan Unit<br><small class="text-muted">Siap Digunakan</small></span>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <!-- Kolom Kiri: Informasi Unit & Reservasi -->
          <div class="col-lg-6">
            <div class="card h-100 border-0 bg-light p-3 rounded-4">
              <h6 class="fw-bold text-dark border-bottom pb-2 mb-3">
                <i class="bi bi-car-front-fill text-primary me-2"></i> Informasi Unit &amp; Reservasi
              </h6>

              <div class="d-flex gap-3 mb-3">
                <img src="${b.photo}" alt="${b.vehicle_name}" class="rounded-3 border bg-white" style="width: 120px; height: 80px; object-fit: cover;" />
                <div>
                  <h6 class="fw-bold mb-1">${b.vehicle_name}</h6>
                  <div class="badge bg-secondary mb-1">${b.category_name}</div>
                  <div class="small text-muted font-monospace">Plat: ${b.vehicle_plate}</div>
                  <div class="small text-muted">${b.transmission} • ${b.capacity} Penumpang</div>
                </div>
              </div>

              <div class="bg-white p-3 rounded-3 border mb-3">
                <div class="row g-2 small">
                  <div class="col-6 border-end">
                    <span class="text-muted d-block">Mulai Sewa (Ambil):</span>
                    <strong class="text-dark">${b.start_at} WIB</strong>
                  </div>
                  <div class="col-6 ps-2">
                    <span class="text-muted d-block">Selesai Sewa (Kembali):</span>
                    <strong class="text-dark">${b.end_at} WIB</strong>
                  </div>
                </div>
                <div class="mt-2 pt-2 border-top small text-muted d-flex justify-content-between">
                  <span>Durasi Penyewaan:</span>
                  <strong class="text-dark">${b.duration_days} Hari (${b.duration_days * 24} Jam)</strong>
                </div>
              </div>

              <div class="small text-muted mb-1">Penyewa (Guest):</div>
              <div class="fw-bold text-dark small">${b.customer_name} (${b.customer_phone} • ${b.customer_email})</div>
            </div>
          </div>

          <!-- Kolom Kanan: Rincian Biaya & Status Pembayaran -->
          <div class="col-lg-6">
            <div class="card h-100 border-0 bg-light p-3 rounded-4">
              <h6 class="fw-bold text-dark border-bottom pb-2 mb-3">
                <i class="bi bi-wallet2 text-success me-2"></i> Rincian Biaya &amp; Status Verifikasi
              </h6>

              ${paymentVerificationHtml}

              <div class="bg-white p-3 rounded-3 border mb-3">
                <div class="d-flex justify-content-between small text-muted mb-1">
                  <span>Tarif Harian:</span>
                  <span>${formatRupiah(b.price_per_day)} / 24 Jam</span>
                </div>
                <div class="d-flex justify-content-between small text-muted mb-2">
                  <span>Lama Sewa:</span>
                  <span>${b.duration_days} Hari</span>
                </div>
                <div class="d-flex justify-content-between border-top pt-2">
                  <span class="fw-bold text-dark">Total Biaya Sewa:</span>
                  <span class="fw-bold text-primary fs-5">${formatRupiah(b.total_price)}</span>
                </div>
              </div>

              <div class="small text-muted">
                <div>Metode Bayar: <strong>${b.payment_method}</strong></div>
                <div>Atas Nama: <strong>${b.bank_account_name}</strong></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  $container.html(html);
}

// Render State 2: Data Tidak Ditemukan (FR-BOOK-010)
function renderStateNotFound(code, $container) {
  const html = `
    <div class="card border-danger border-opacity-25 shadow-sm p-4 text-center bg-white rounded-4">
      <div class="py-3">
        <div class="badge bg-danger bg-opacity-10 text-danger p-3 rounded-circle mb-3">
          <i class="bi bi-x-octagon-fill fs-1"></i>
        </div>
        <h4 class="fw-bold text-danger">Kode Booking Tidak Ditemukan!</h4>
        <p class="text-muted mx-auto mb-3" style="max-width: 500px;">
          Kode reservasi <code class="text-danger fw-bold fs-6">${code}</code> tidak terdaftar di sistem Autorent. Mohon periksa kembali ejaan huruf dan angka pada bukti reservasi Anda.
        </p>
        <div class="alert alert-light border small text-muted mx-auto text-start" style="max-width: 520px;">
          <strong>Panduan Format Kode Booking (FR-BOOK-005):</strong>
          <ul class="mb-0 mt-1 ps-3">
            <li>Terdiri dari kombinasi huruf kapital dan angka (contoh: <code>RNT-X9K2M</code>).</li>
            <li>Sistem tidak menggunakan karakter membingungkan seperti angka 0 dengan huruf O, atau angka 1 dengan huruf I.</li>
            <li>Silakan coba klik salah satu tombol sampel di bagian atas form.</li>
          </ul>
        </div>
        <div class="mt-3">
          <button class="btn btn-outline-secondary fw-bold px-4" onclick="$('#input-booking-code').focus().select();">
            <i class="bi bi-arrow-left me-1"></i> Coba Input Kode Lain
          </button>
        </div>
      </div>
    </div>
  `;

  $container.html(html);
}

// Export modul ke window
window.initStatusBookingModule = initStatusBookingModule;

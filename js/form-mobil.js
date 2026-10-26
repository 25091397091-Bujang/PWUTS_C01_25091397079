/**
 * AUTORENT - Modul Form Data Mobil Admin & Validasi Input (Item 2.c & WF-8 Proposal)
 * Pengembang: Aby Putra Mahendra (NIM: 25091397079) - Anggota 3
 * Kelompok: C01 / D4 Manajemen Informatika Unesa
 */

// Dataset Awal Kendaraan Sesuai Proposal Bab 3 & 4 (Tabel vehicles)
const INITIAL_VEHICLES = [
  {
    id: 1,
    code: "VH-001",
    name: "Toyota Avanza 1.3 G",
    category_id: 1,
    category_name: "MPV",
    plate: "B 1284 PDA",
    price_per_day: 350000,
    capacity: 7,
    transmission: "Manual",
    fuel: "Bensin",
    photo: "assets/images/avanza.svg",
    status: "Available",
    has_history: true,
    description: "Unit Toyota Avanza 1.3 G dalam kondisi prima dan terawat dengan riwayat servis berkala di bengkel resmi. Kabin senyap, bersih, bebas asap rokok, AC double blower dingin merata."
  },
  {
    id: 2,
    code: "VH-002",
    name: "Toyota Innova Zenix 2.0 V",
    category_id: 1,
    category_name: "MPV",
    plate: "B 2001 KLS",
    price_per_day: 650000,
    capacity: 7,
    transmission: "Otomatis (CVT/AT)",
    fuel: "Bensin",
    photo: "assets/images/zenix.svg",
    status: "Available",
    has_history: true,
    description: "Innova Zenix generasi terbaru dengan transmisi CVT halus dan ruang kabin lapang premium. Dilengkapi head unit touchscreen dan fitur keselamatan mutakhir."
  },
  {
    id: 3,
    code: "VH-003",
    name: "Honda Brio Satya E CVT",
    category_id: 3,
    category_name: "City Car",
    plate: "B 4421 TZZ",
    price_per_day: 300000,
    capacity: 5,
    transmission: "Otomatis (CVT/AT)",
    fuel: "Bensin",
    photo: "assets/images/brio.svg",
    status: "Unavailable",
    has_history: true,
    description: "City car gesit dan lincah untuk lalu lintas perkotaan. Sangat hemat bahan bakar, AC dingin, dan bagasi cukup untuk belanja harian atau liburan berdua."
  },
  {
    id: 4,
    code: "VH-004",
    name: "Mitsubishi Pajero Sport Dakar",
    category_id: 2,
    category_name: "SUV",
    plate: "B 5899 DKR",
    price_per_day: 850000,
    capacity: 7,
    transmission: "Otomatis (CVT/AT)",
    fuel: "Solar",
    photo: "assets/images/pajero.svg",
    status: "Available",
    has_history: false,
    description: "Big SUV tangguh dengan mesin diesel bertenaga tinggi. Cocok untuk medan luar kota, jalan menanjak, dan perjalanan dinas VIP dengan kenyamanan maksimal."
  },
  {
    id: 5,
    code: "VH-005",
    name: "Daihatsu Xenia 1.3 R",
    category_id: 1,
    category_name: "MPV",
    plate: "L 1092 XN",
    price_per_day: 330000,
    capacity: 7,
    transmission: "Manual",
    fuel: "Bensin",
    photo: "assets/images/xenia.svg",
    status: "Available",
    has_history: true,
    description: "Mobil keluarga ekonomis dengan konsumsi bahan bakar efisien dan suspensi nyaman. Pilihan ideal untuk mudik atau perjalanan rombongan di Jawa Timur."
  },
  {
    id: 6,
    code: "VH-006",
    name: "Toyota Fortuner GR Sport",
    category_id: 2,
    category_name: "SUV",
    plate: "L 1777 GR",
    price_per_day: 900000,
    capacity: 7,
    transmission: "Otomatis (CVT/AT)",
    fuel: "Solar",
    photo: "assets/images/fortuner.svg",
    status: "Available",
    has_history: true,
    description: "Varian sporty GR dengan akselerasi responsif dan tampilan gagah. Dilengkapi fitur keamanan canggih TSS dan sistem audio JBL premium."
  },
  {
    id: 7,
    code: "VH-007",
    name: "Suzuki Ertiga Hybrid",
    category_id: 1,
    category_name: "MPV",
    plate: "L 1945 IND",
    price_per_day: 375000,
    capacity: 7,
    transmission: "Manual",
    fuel: "Hybrid",
    photo: "assets/images/ertiga.svg",
    status: "Available",
    has_history: true,
    description: "Teknologi Smart Hybrid Suzuki ramah lingkungan dan sangat irit. Dilengkapi fitur Cruise Control dan jok ergonomis untuk perjalanan jauh tanpa pegal."
  },
  {
    id: 8,
    code: "VH-008",
    name: "Hyundai Stargazer Trend",
    category_id: 1,
    category_name: "MPV",
    plate: "L 2026 HYU",
    price_per_day: 420000,
    capacity: 7,
    transmission: "Otomatis (CVT/AT)",
    fuel: "Bensin",
    photo: "assets/images/stargazer.svg",
    status: "Available",
    has_history: false,
    description: "Desain futuristik dengan One Curve Design. Dilengkapi Wireless Smartphone Charger, ruang kabin super lega, dan fitur Bluelink modern."
  }
];

// Inisialisasi Database Lokal / LocalStorage
function getStoredVehicles() {
  const localData = localStorage.getItem("autorent_vehicles_db");
  if (localData) {
    try {
      return JSON.parse(localData);
    } catch (e) {
      console.warn("Gagal parse localStorage, menggunakan data inisial.", e);
    }
  }
  return [...INITIAL_VEHICLES];
}

function saveStoredVehicles(vehicles) {
  localStorage.setItem("autorent_vehicles_db", JSON.stringify(vehicles));
  window.AutorentVehicles = vehicles;
}

// Inisialisasi awal ke window
window.AutorentVehicles = getStoredVehicles();

// State temporary untuk form
let currentUploadedPhotoBase64 = null;
let currentCarDataToSave = null;

// Inisialisasi Modul Form Mobil
function initFormMobilModule() {
  const $form = $("#form-tambah-mobil");
  if (!$form.length) return;

  // Render Tabel Mobil Admin
  renderAdminVehicleTable();

  // Reset state
  currentUploadedPhotoBase64 = null;
  currentCarDataToSave = null;

  // Setup Event Listeners Realtime Validation & Live Preview
  setupFormValidationListeners();
  setupLivePreviewListeners();
  setupPhotoMethodToggle();

  // Setup Form Submit Handler
  $form.off("submit").on("submit", function (e) {
    e.preventDefault();
    if (validateAllFormFields()) {
      showConfirmationModal();
    }
  });

  // Setup Final Confirm Save Button
  $("#btn-final-confirm-save").off("click").on("click", function () {
    executeSaveCar();
  });

  // Setup Search & Filter pada Tabel Admin
  $("#admin-table-search").off("input").on("input", function () {
    filterAdminTable();
  });

  $("#admin-table-filter-status").off("change").on("change", function () {
    filterAdminTable();
  });
}

// Setup Toggle Metode Foto (Preset vs Upload)
function setupPhotoMethodToggle() {
  $('input[name="photo-method"]').off("change").on("change", function () {
    if ($(this).val() === "preset") {
      $("#box-preset-select").removeClass("d-none");
      $("#box-upload-input").addClass("d-none");
      currentUploadedPhotoBase64 = null;
      updateLivePreview();
    } else {
      $("#box-preset-select").addClass("d-none");
      $("#box-upload-input").removeClass("d-none");
      if (currentUploadedPhotoBase64) {
        $("#preview-car-image").attr("src", currentUploadedPhotoBase64);
      } else {
        $("#preview-car-image").attr("src", "assets/images/default-car.svg");
      }
    }
  });

  // File Upload Change Handler with Validation
  $("#car-photo-file").off("change").on("change", function (e) {
    const file = e.target.files[0];
    const $err = $("#err-car-photo");

    if (!file) {
      currentUploadedPhotoBase64 = null;
      return;
    }

    // Cek format gambar
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      $err.text("Format file tidak didukung! Gunakan format JPG, PNG, atau WEBP.").show();
      $(this).addClass("is-invalid").val("");
      currentUploadedPhotoBase64 = null;
      return;
    }

    // Cek ukuran gambar (maks 5MB)
    if (file.size > 5 * 1024 * 1024) {
      $err.text("Ukuran file terlalu besar! Maksimal ukuran file 5 MB.").show();
      $(this).addClass("is-invalid").val("");
      currentUploadedPhotoBase64 = null;
      return;
    }

    $err.hide();
    $(this).removeClass("is-invalid").addClass("is-valid");

    // Baca ke Base64 untuk preview
    const reader = new FileReader();
    reader.onload = function (evt) {
      currentUploadedPhotoBase64 = evt.target.result;
      $("#preview-car-image").attr("src", currentUploadedPhotoBase64);
    };
    reader.readAsDataURL(file);
  });
}

// Setup Listener untuk Live Preview Sinkron
function setupLivePreviewListeners() {
  $("#car-name").on("input", function () {
    const val = $(this).val().trim();
    $("#preview-car-name").text(val || "Nama Kendaraan");
  });

  $("#car-plate").on("input", function () {
    let val = $(this).val().toUpperCase();
    $(this).val(val);
    $("#preview-car-plate").text(val ? `Plat: ${val}` : "Plat: [L XXXX XX]");
  });

  $("#car-category").on("change", function () {
    const text = $("#car-category option:selected").text().split("-")[1] || "MPV";
    $("#preview-category-badge").text(text.trim());
  });

  $("#car-price").on("input", function () {
    const val = $(this).val();
    if (val && !isNaN(val)) {
      const formatted = "Rp " + Number(val).toLocaleString("id-ID");
      $("#preview-car-price").text(formatted);
      $("#price-formatted-preview").text("Format nominal: " + formatted);
    } else {
      $("#preview-car-price").text("Rp 0");
      $("#price-formatted-preview").text("Format nominal: Rp 0");
    }
  });

  $("#car-capacity").on("input", function () {
    const val = $(this).val();
    $("#preview-spec-cap").html(`<i class="bi bi-people-fill text-primary"></i> ${val || 7} Kursi`);
  });

  $("#car-transmission").on("change", function () {
    const val = $(this).val() || "Manual";
    $("#preview-spec-trans").html(`<i class="bi bi-gear-fill text-secondary"></i> ${val}`);
  });

  $("#car-status").on("change", function () {
    const val = $(this).val();
    const $badge = $("#preview-status-badge");
    if (val === "Available") {
      $badge.removeClass("badge-unavailable").addClass("badge-available").text("Available");
    } else {
      $badge.removeClass("badge-available").addClass("badge-unavailable").text("Unavailable");
    }
  });

  $("#car-photo-preset").on("change", function () {
    if ($('input[name="photo-method"]:checked').val() === "preset") {
      $("#preview-car-image").attr("src", $(this).val());
    }
  });

  $("#car-desc").on("input", function () {
    const val = $(this).val();
    $("#preview-car-desc").text(val || "Deskripsi unit kendaraan...");
    $("#desc-char-count").text(`${val.length} / 20 min`);
    if (val.length >= 20) {
      $("#desc-char-count").removeClass("text-danger").addClass("text-success fw-bold");
    } else {
      $("#desc-char-count").removeClass("text-success fw-bold").addClass("text-danger");
    }
  });
}

function updateLivePreview() {
  if ($('input[name="photo-method"]:checked').val() === "preset") {
    $("#preview-car-image").attr("src", $("#car-photo-preset").val());
  } else if (currentUploadedPhotoBase64) {
    $("#preview-car-image").attr("src", currentUploadedPhotoBase64);
  }
}

// Validasi Form Input Realtime (Blur & Change)
function setupFormValidationListeners() {
  $("#car-name").on("blur", function () {
    validateNameField($(this));
  });

  $("#car-category").on("change blur", function () {
    validateCategoryField($(this));
  });

  $("#car-plate").on("blur", function () {
    validatePlateField($(this));
  });

  $("#car-price").on("blur", function () {
    validatePriceField($(this));
  });

  $("#car-capacity").on("blur", function () {
    validateCapacityField($(this));
  });

  $("#car-transmission").on("change blur", function () {
    validateTransmissionField($(this));
  });

  $("#car-desc").on("blur", function () {
    validateDescField($(this));
  });
}

// Validator Individual
function validateNameField($el) {
  const val = $el.val().trim();
  if (val.length < 4) {
    $el.removeClass("is-valid").addClass("is-invalid");
    $("#err-car-name").text("Nama kendaraan wajib diisi minimal 4 karakter!").show();
    return false;
  }
  $el.removeClass("is-invalid").addClass("is-valid");
  $("#err-car-name").hide();
  return true;
}

function validateCategoryField($el) {
  const val = $el.val();
  if (!val) {
    $el.removeClass("is-valid").addClass("is-invalid");
    $("#err-car-category").show();
    return false;
  }
  $el.removeClass("is-invalid").addClass("is-valid");
  $("#err-car-category").hide();
  return true;
}

function validatePlateField($el) {
  const val = $el.val().trim().toUpperCase();
  // Regex format plat nomor Indonesia: Contoh 'L 1284 PDA' atau 'B 123 AB'
  const plateRegex = /^[A-Z]{1,2}\s[0-9]{1,4}\s[A-Z]{1,3}$/;
  if (!val || !plateRegex.test(val)) {
    $el.removeClass("is-valid").addClass("is-invalid");
    $("#err-car-plate").text("Format plat nomor tidak valid! Gunakan format dengan spasi (Contoh: L 1284 PDA atau B 2001 KLS).").show();
    return false;
  }
  $el.removeClass("is-invalid").addClass("is-valid");
  $("#err-car-plate").hide();
  return true;
}

function validatePriceField($el) {
  const val = Number($el.val());
  if (isNaN(val) || val < 100000) {
    $el.removeClass("is-valid").addClass("is-invalid");
    $("#err-car-price").text("Tarif sewa per 24 jam minimal Rp 100.000!").show();
    return false;
  }
  $el.removeClass("is-invalid").addClass("is-valid");
  $("#err-car-price").hide();
  return true;
}

function validateCapacityField($el) {
  const val = parseInt($el.val(), 10);
  if (isNaN(val) || val < 2 || val > 15) {
    $el.removeClass("is-valid").addClass("is-invalid");
    $("#err-car-capacity").text("Kapasitas penumpang harus diisi angka antara 2 hingga 15 orang!").show();
    return false;
  }
  $el.removeClass("is-invalid").addClass("is-valid");
  $("#err-car-capacity").hide();
  return true;
}

function validateTransmissionField($el) {
  const val = $el.val();
  if (!val) {
    $el.removeClass("is-valid").addClass("is-invalid");
    $("#err-car-transmission").show();
    return false;
  }
  $el.removeClass("is-invalid").addClass("is-valid");
  $("#err-car-transmission").hide();
  return true;
}

function validateDescField($el) {
  const val = $el.val().trim();
  if (val.length < 20) {
    $el.removeClass("is-valid").addClass("is-invalid");
    $("#err-car-desc").text(`Deskripsi masih terlalu singkat (${val.length}/20 karakter minimal).`).show();
    return false;
  }
  $el.removeClass("is-invalid").addClass("is-valid");
  $("#err-car-desc").hide();
  return true;
}

// Validasi Menyeluruh Sebelum Submit
function validateAllFormFields() {
  const isNameOk = validateNameField($("#car-name"));
  const isCatOk = validateCategoryField($("#car-category"));
  const isPlateOk = validatePlateField($("#car-plate"));
  const isPriceOk = validatePriceField($("#car-price"));
  const isCapOk = validateCapacityField($("#car-capacity"));
  const isTransOk = validateTransmissionField($("#car-transmission"));
  const isDescOk = validateDescField($("#car-desc"));

  // Validasi Foto
  let isPhotoOk = true;
  const photoMethod = $('input[name="photo-method"]:checked').val();
  if (photoMethod === "upload" && !currentUploadedPhotoBase64) {
    $("#car-photo-file").addClass("is-invalid");
    $("#err-car-photo").text("Silakan pilih file gambar dari perangkat Anda terlebih dahulu.").show();
    isPhotoOk = false;
  } else {
    $("#err-car-photo").hide();
  }

  const allValid = isNameOk && isCatOk && isPlateOk && isPriceOk && isCapOk && isTransOk && isDescOk && isPhotoOk;

  if (!allValid) {
    // Focus ke input pertama yang invalid
    $(".is-invalid").first().focus();
  }

  return allValid;
}

// Buka Modal Konfirmasi Submit
function showConfirmationModal() {
  const name = $("#car-name").val().trim();
  const categoryText = $("#car-category option:selected").text();
  const plate = $("#car-plate").val().trim().toUpperCase();
  const price = Number($("#car-price").val());
  const capacity = $("#car-capacity").val();
  const transmission = $("#car-transmission").val();
  const status = $("#car-status").val();
  const description = $("#car-desc").val().trim();

  let photoSrc = $("#car-photo-preset").val();
  if ($('input[name="photo-method"]:checked').val() === "upload" && currentUploadedPhotoBase64) {
    photoSrc = currentUploadedPhotoBase64;
  }

  // Siapkan objek payload data mobil
  currentCarDataToSave = {
    name,
    category_id: parseInt($("#car-category").val(), 10),
    category_name: categoryText.split("-")[1].trim(),
    plate,
    price_per_day: price,
    capacity: parseInt(capacity, 10),
    transmission,
    fuel: "Bensin",
    photo: photoSrc,
    status,
    has_history: false,
    description
  };

  // Set teks di modal konfirmasi
  $("#modal-conf-name").text(name);
  $("#modal-conf-cat").text(categoryText);
  $("#modal-conf-plate").text(plate);
  $("#modal-conf-price").text("Rp " + price.toLocaleString("id-ID") + " / 24 jam");
  $("#modal-conf-spec").text(`${capacity} Orang • ${transmission}`);
  $("#modal-conf-status").html(
    status === "Available" 
      ? '<span class="badge bg-success">Available</span>' 
      : '<span class="badge bg-danger">Unavailable</span>'
  );

  const modalEl = document.getElementById("modalConfirmSubmitCar");
  const modalInstance = new bootstrap.Modal(modalEl);
  modalInstance.show();
}

// Eksekusi Simpan Data Mobil (Simulasi AJAX HTTP POST & Database)
function executeSaveCar() {
  if (!currentCarDataToSave) return;

  const $btn = $("#btn-final-confirm-save");
  $btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan ke HTTP Server...');

  // Simulasi AJAX Request HTTP POST ke Server
  setTimeout(function () {
    const vehicles = getStoredVehicles();
    const newId = vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1;
    const newCode = "VH-" + String(newId).padStart(3, "0");

    const newCar = {
      id: newId,
      code: newCode,
      ...currentCarDataToSave
    };

    vehicles.unshift(newCar); // Masukkan paling atas
    saveStoredVehicles(vehicles);

    // Reset tombol & sembunyikan modal
    $btn.prop("disabled", false).html('<i class="bi bi-save2-fill me-1"></i> Ya, Simpan ke Database');
    const modalEl = document.getElementById("modalConfirmSubmitCar");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    // Reset form
    $("#form-tambah-mobil")[0].reset();
    $(".is-valid").removeClass("is-valid");
    currentUploadedPhotoBase64 = null;
    $("#preview-car-name").text("Nama Kendaraan");
    $("#preview-car-plate").text("Plat: [L XXXX XX]");
    $("#preview-car-price").text("Rp 350.000");
    $("#desc-char-count").text("0 / 20 min").removeClass("text-success fw-bold");
    $("#preview-car-image").attr("src", "assets/images/avanza.svg");

    // Render ulang tabel
    renderAdminVehicleTable();

    // Tampilkan notifikasi sukses
    alert(`BERHASIL DISIMPAN!\nData kendaraan "${newCar.name}" (${newCar.plate}) berhasil ditambahkan ke basis data sistem rental mobil Autorent!`);

    // Smooth scroll ke tabel armada
    document.getElementById("tabel-armada-section").scrollIntoView({ behavior: "smooth" });
  }, 450);
}

// Render Tabel Data Mobil Admin (Sesuai WF-8 Halaman 39)
function renderAdminVehicleTable(filteredList = null) {
  const $tbody = $("#admin-vehicles-tbody");
  if (!$tbody.length) return;

  const list = filteredList || getStoredVehicles();
  $("#admin-total-car-count").text(list.length);

  if (list.length === 0) {
    $tbody.html(`
      <tr>
        <td colspan="7" class="text-center py-4 text-muted">
          <i class="bi bi-inbox fs-3 d-block mb-1"></i>
          Tidak ada data kendaraan yang cocok dengan pencarian.
        </td>
      </tr>
    `);
    return;
  }

  let rowsHtml = "";
  list.forEach(car => {
    const isAvail = car.status === "Available";
    const statusBadge = isAvail
      ? `<span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1"><i class="bi bi-check-circle me-1"></i>Available</span>`
      : `<span class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1"><i class="bi bi-slash-circle me-1"></i>Unavailable</span>`;

    rowsHtml += `
      <tr>
        <td class="font-monospace text-muted fw-bold">#${car.code}</td>
        <td>
          <img src="${car.photo}" alt="${car.name}" class="table-vehicle-thumb" />
        </td>
        <td>
          <div class="fw-bold text-dark">${car.name}</div>
          <div class="small text-muted font-monospace">Plat: ${car.plate} • ${car.capacity} Kursi • ${car.transmission}</div>
        </td>
        <td>
          <span class="badge bg-light text-dark border">${car.category_name}</span>
        </td>
        <td>
          <span class="fw-bold text-primary">Rp ${Number(car.price_per_day).toLocaleString("id-ID")}</span>
          <span class="small text-muted">/24 jam</span>
        </td>
        <td>${statusBadge}</td>
        <td class="text-center">
          <div class="btn-group btn-group-sm">
            <button 
              type="button" 
              class="btn btn-outline-secondary btn-toggle-status" 
              data-id="${car.id}" 
              title="Toggle Status Ketersediaan (FR-VEH-007)"
            >
              <i class="bi bi-toggle-${isAvail ? 'on text-success' : 'off text-muted'} fs-6"></i> Toggle
            </button>
            <button 
              type="button" 
              class="btn btn-outline-danger btn-delete-car" 
              data-id="${car.id}" 
              title="Hapus Kendaraan"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  $tbody.html(rowsHtml);

  // Bind Event Toggle Status
  $(".btn-toggle-status").off("click").on("click", function () {
    const carId = parseInt($(this).data("id"), 10);
    handleToggleStatus(carId);
  });

  // Bind Event Delete
  $(".btn-delete-car").off("click").on("click", function () {
    const carId = parseInt($(this).data("id"), 10);
    handleDeleteCar(carId);
  });
}

// Handler Toggle Status Available <-> Unavailable (FR-VEH-007)
function handleToggleStatus(carId) {
  const vehicles = getStoredVehicles();
  const car = vehicles.find(v => v.id === carId);

  if (car) {
    car.status = car.status === "Available" ? "Unavailable" : "Available";
    saveStoredVehicles(vehicles);
    renderAdminVehicleTable();
    
    // Tampilkan notifikasi kecil
    const msg = `Status unit ${car.name} diubah menjadi: ${car.status}`;
    console.log(msg);
  }
}

// Handler Hapus Kendaraan dengan Pengecekan Aturan Bisnis (BR-013 & FR-VEH-006)
function handleDeleteCar(carId) {
  const vehicles = getStoredVehicles();
  const car = vehicles.find(v => v.id === carId);

  if (!car) return;

  // Cek Aturan Bisnis BR-013 & FR-VEH-006:
  // "Kendaraan yang telah memiliki histori booking tidak boleh dihapus secara permanen. Kendaraan yang tidak digunakan dapat diubah menjadi berstatus Unavailable."
  if (car.has_history) {
    alert(
      `PERINGATAN ATURAN BISNIS (BR-013 & FR-VEH-006):\n\n` +
      `Kendaraan #${car.code} (${car.name}) TIDAK DAPAT DIHAPUS karena memiliki riwayat pemesanan/transaksi aktif di sistem.\n\n` +
      `Gunakan tombol "Toggle" untuk mengubah statusnya menjadi "Unavailable" agar tidak dapat dipesan lagi oleh pelanggan.`
    );
    return;
  }

  // Jika unit baru tanpa histori pemesanan, konfirmasi hapus
  const ok = confirm(`Apakah Anda yakin ingin menghapus data kendaraan "${car.name}" (#${car.code}) secara permanen?`);
  if (ok) {
    const updated = vehicles.filter(v => v.id !== carId);
    saveStoredVehicles(updated);
    renderAdminVehicleTable();
    alert(`Data kendaraan "${car.name}" berhasil dihapus.`);
  }
}

// Filter dan Pencarian Tabel Admin
function filterAdminTable() {
  const keyword = ($("#admin-table-search").val() || "").toLowerCase().trim();
  const statusFilter = $("#admin-table-filter-status").val();
  const vehicles = getStoredVehicles();

  const filtered = vehicles.filter(car => {
    const matchName = car.name.toLowerCase().includes(keyword) || car.plate.toLowerCase().includes(keyword) || car.code.toLowerCase().includes(keyword);
    const matchStatus = !statusFilter || car.status === statusFilter;
    return matchName && matchStatus;
  });

  renderAdminVehicleTable(filtered);
}

// Export modul ke window
window.initFormMobilModule = initFormMobilModule;
window.getStoredVehicles = getStoredVehicles;

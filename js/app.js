/**
 * AUTORENT - Main Application Script & AJAX Router
 * Pengembang: Aby Putra Mahendra (NIM: 25091397079) - Anggota 3
 * Kelompok: C01 / D4 Manajemen Informatika Unesa
 * 
 * Modul ini menangani:
 * 1. Navigasi menu berbasis teknik AJAX (Item 2.a)
 * 2. Hash routing (#beranda, #cek-status, #form-mobil)
 * 3. Render katalog kendaraan & live filter di homepage
 * 4. Fallback rendering bila dijalankan langsung dari protocol file://
 */

$(document).ready(function () {
  console.log("Autorent Web Application Initialized - Anggota 3: Aby Putra Mahendra (25091397079)");

  // Setup Global AJAX Setup
  setupAjaxNavigation();

  // Load initial page based on window hash or default to beranda
  handleHashRouting();

  // Listen to browser hash changes (Back / Forward buttons)
  window.addEventListener("hashchange", handleHashRouting);
});

// Cache untuk template halaman (Mendukung offline & fallback protocol file://)
const PageTemplatesCache = {};

/**
 * Setup Navigasi Berbasis Teknik AJAX (Ketentuan Item 2.a)
 */
function setupAjaxNavigation() {
  // Tangkap seluruh klik pada link dengan class .ajax-link
  $(document).on("click", ".ajax-link", function (e) {
    e.preventDefault();
    const targetPage = $(this).data("page");
    const targetHash = $(this).attr("href");

    if (targetHash && targetHash.startsWith("#")) {
      window.location.hash = targetHash;
    } else if (targetPage) {
      loadPageViaAjax(targetPage);
    }
  });
}

/**
 * Hash Routing Handler
 */
function handleHashRouting() {
  let hash = window.location.hash.replace("#", "").toLowerCase().trim();

  // Mapping Hash ke File Halaman
  let pageName = "home-content";
  if (hash === "cek-status" || hash === "status" || hash === "2b") {
    pageName = "cek-status";
    hash = "cek-status";
  } else if (hash === "form-mobil" || hash === "tambah-mobil" || hash === "admin" || hash === "2c") {
    pageName = "form-mobil";
    hash = "form-mobil";
  } else {
    pageName = "home-content";
    hash = "beranda";
  }

  // Update active state di navbar
  updateActiveNavbar(hash);

  // Muat konten via Ajax
  loadPageViaAjax(pageName);
}

/**
 * Update class active pada navigasi
 */
function updateActiveNavbar(activeHash) {
  $(".nav-link").removeClass("active");
  $(`.nav-link[href="#${activeHash}"]`).addClass("active");
}

/**
 * Muat Konten Halaman Menggunakan Teknik AJAX (Item 2.a)
 */
function loadPageViaAjax(pageName) {
  const $container = $("#main-content");
  const $loader = $("#ajax-loader-overlay");

  // Tampilkan loading overlay
  $loader.css("display", "flex");

  const pagePath = `pages/${pageName}.html`;

  // Cek apakah ada di cache memori
  if (PageTemplatesCache[pageName]) {
    renderPageContent(pageName, PageTemplatesCache[pageName]);
    $loader.hide();
    return;
  }

  // Lakukan Request AJAX menggunakan jQuery $.ajax
  $.ajax({
    url: pagePath,
    type: "GET",
    dataType: "html",
    timeout: 5000,
    success: function (responseHtml) {
      PageTemplatesCache[pageName] = responseHtml;
      renderPageContent(pageName, responseHtml);
      $loader.hide();
    },
    error: function (xhr, status, error) {
      console.warn(`Ajax request to ${pagePath} failed or blocked by CORS/file protocol. Utilizing embedded fallback.`);
      
      // Mengatasi pembatasan CORS file:// peramban lokal jika dibuka langsung double click
      fallbackLoadPage(pageName);
      $loader.hide();
    }
  });
}

/**
 * Render Konten Halaman dan Inisialisasi Modul Terkait
 */
function renderPageContent(pageName, html) {
  const $container = $("#main-content");
  $container.html(html);

  // Scroll ke atas dengan halus
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Inisialisasi logika interaktif modul yang sesuai
  if (pageName === "home-content") {
    initHomePageModule();
  } else if (pageName === "cek-status") {
    if (typeof window.initStatusBookingModule === "function") {
      window.initStatusBookingModule();
    }
  } else if (pageName === "form-mobil") {
    if (typeof window.initFormMobilModule === "function") {
      window.initFormMobilModule();
    }
  }
}

/**
 * Modul Homepage: Render Katalog Kendaraan & Filter
 */
function initHomePageModule() {
  renderVehicleCatalog();

  // Setup Event Filter & Search di Beranda
  $("#filter-search-input").off("input").on("input", filterVehicleCatalog);
  $("#filter-category-select").off("change").on("change", filterVehicleCatalog);
  $("#filter-status-select").off("change").on("change", filterVehicleCatalog);

  $("#btn-reset-filter").off("click").on("click", function () {
    $("#filter-search-input").val("");
    $("#filter-category-select").val("");
    $("#filter-status-select").val("");
    renderVehicleCatalog();
  });
}

/**
 * Render Katalog Mobil di Homepage
 */
function renderVehicleCatalog(customList = null) {
  const $grid = $("#vehicle-grid-container");
  if (!$grid.length) return;

  const vehicles = customList || (typeof window.getStoredVehicles === "function" ? window.getStoredVehicles() : []);

  // Update total armada tersedia di Hero
  const availableCount = vehicles.filter(v => v.status === "Available").length;
  $("#home-total-available").text(`${availableCount} Unit`);
  $("#catalog-count-badge").text(`Menampilkan ${vehicles.length} Kendaraan`);

  if (vehicles.length === 0) {
    $grid.html(`
      <div class="col-12 py-5 text-center">
        <div class="card border-0 bg-light p-5 rounded-4">
          <i class="bi bi-car-front text-muted" style="font-size: 3rem;"></i>
          <h5 class="fw-bold text-muted mt-3">Tidak Ada Kendaraan yang Sesuai</h5>
          <p class="text-muted small">Coba ubah kata kunci pencarian atau reset filter kategori.</p>
        </div>
      </div>
    `);
    return;
  }

  let html = "";
  vehicles.forEach(car => {
    const isAvail = car.status === "Available";
    const statusClass = isAvail ? "badge-available" : "badge-unavailable";
    const statusText = isAvail ? "Available" : "Unavailable";

    html += `
      <div class="col-md-6 col-lg-3">
        <div class="vehicle-card">
          <div class="vehicle-img-wrapper">
            <span class="vehicle-category-badge">${car.category_name}</span>
            <span class="vehicle-status-badge ${statusClass}">${statusText}</span>
            <img src="${car.photo}" alt="${car.name}" class="vehicle-img" loading="lazy" />
          </div>
          <div class="vehicle-body">
            <h5 class="vehicle-title">${car.name}</h5>
            <div class="vehicle-specs">
              <span><i class="bi bi-people-fill text-primary"></i> ${car.capacity} Kursi</span>
              <span><i class="bi bi-fuel-pump-fill text-danger"></i> ${car.fuel || 'Bensin'}</span>
              <span><i class="bi bi-gear-fill text-secondary"></i> ${car.transmission}</span>
            </div>
            <p class="small text-muted text-truncate mb-3" title="${car.description}">
              ${car.description}
            </p>
            <div class="vehicle-price-box">
              <div>
                <span class="price-nominal">Rp ${Number(car.price_per_day).toLocaleString("id-ID")}</span>
                <span class="price-unit">/ 24 Jam</span>
              </div>
              <a href="#cek-status" class="btn btn-sm btn-outline-primary fw-bold ajax-link" data-page="cek-status" title="Lihat Status Booking">
                Detail <i class="bi bi-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  $grid.html(html);
}

/**
 * Filter Katalog Kendaraan
 */
function filterVehicleCatalog() {
  const keyword = ($("#filter-search-input").val() || "").toLowerCase().trim();
  const category = $("#filter-category-select").val();
  const status = $("#filter-status-select").val();

  const allVehicles = typeof window.getStoredVehicles === "function" ? window.getStoredVehicles() : [];

  const filtered = allVehicles.filter(car => {
    const matchKeyword = car.name.toLowerCase().includes(keyword) || (car.plate && car.plate.toLowerCase().includes(keyword));
    const matchCategory = !category || car.category_name.toLowerCase().includes(category.toLowerCase());
    const matchStatus = !status || car.status === status;
    return matchKeyword && matchCategory && matchStatus;
  });

  renderVehicleCatalog(filtered);
}

/**
 * Fallback jika AJAX file:// diblokir di browser lokal
 */
function fallbackLoadPage(pageName) {
  // Jika fetch gagal (karena browser lokal menolak XMLHttpRequest pada file:///),
  // muat template yang disematkan dalam DOM script tag di index.html
  const templateElement = document.getElementById(`template-${pageName}`);
  if (templateElement) {
    const html = templateElement.innerHTML;
    PageTemplatesCache[pageName] = html;
    renderPageContent(pageName, html);
  } else {
    $("#main-content").html(`
      <div class="container py-5 text-center">
        <div class="alert alert-warning p-4 rounded-4 shadow-sm">
          <i class="bi bi-shield-exclamation fs-1 text-warning mb-2 d-block"></i>
          <h4>Pemberitahuan Navigasi AJAX</h4>
          <p class="mb-2">Halaman <code>${pageName}</code> sedang dimuat melalui AJAX.</p>
          <p class="small text-muted">Jika Anda membuka file langsung melalui protokol <code>file:///</code>, pastikan menjalankan via Web Server lokal (seperti Live Server, XAMPP, atau <code>php -S localhost:8000</code>) agar request AJAX dapat berjalan optimal.</p>
        </div>
      </div>
    `);
  }
}

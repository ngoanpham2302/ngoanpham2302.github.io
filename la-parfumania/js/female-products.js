// Open mobile filter
$(".mobile-filter__btn").on("click", function () {
  $(".mobile-filter-backdrop").toggleClass("open-filter");
});

// Close mobile filter

$(".btn-close-filter").on("click", closeMobileFilter);

function closeMobileFilter() {
  $(".mobile-filter-backdrop").removeClass("open-filter");
}

// Khi click vào mọi vị trí bên ngoài mobile filter sẽ đóng filter

$(document).on("click", function (event) {
  if ($(event.target).is(".mobile-filter-backdrop")) {
    closeMobileFilter();
  }
});

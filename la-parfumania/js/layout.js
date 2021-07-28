// Open mobile menu
$(".mobile-menu-icon").on("click", function () {
  $(".backdrop-bg").toggleClass("open-menu");
});

// Close mobile menu
$(".btn-close-menu").on("click", closeMobileMenu);

function closeMobileMenu() {
  $(".backdrop-bg").removeClass("open-menu");
}

// Khi click vào mọi vị trí bên ngoài mobile menu sẽ đóng menu
$(document).on("click", function (event) {
  if ($(event.target).is(".backdrop-bg")) {
    closeMobileMenu();
  }
});

// Open mobile/tablet search
$(".mobile-search-trigger").on("click", function () {
  $(".mobile-search-icon").toggleClass("open-search");
});

// Close mobile/tablet search
$(".btn-close-search").on("click", closeMobileSearch);

function closeMobileSearch() {
  $(".mobile-search-icon").removeClass("open-search");
}

// Khi click vào mọi vị trí bên ngoài mobile search bar, mobile search icon sẽ đóng search bar

$(document).on("click", function (event) {
  let flag = $(event.target).closest(
    ".mobile-search-bar, .mobile-search-trigger"
  ).length;
  if (!flag) {
    closeMobileSearch();
  }
});

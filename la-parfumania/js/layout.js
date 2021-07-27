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

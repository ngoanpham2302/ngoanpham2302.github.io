function hideMenu() {
  if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) {
    $(".header-menu").addClass("hide");
  }

  if (window.matchMedia && window.matchMedia("(min-width: 769px)").matches) {
    $(".header-menu").removeClass("hide");
  }
}

window.onload = hideMenu;
window.onresize = hideMenu;

// Ẩn hiện menu
$(".menu-icon").on("click", function () {
  $(".header-menu").toggleClass("hide");
});

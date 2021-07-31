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

// Update pagination
function updatePages() {
  $(".pagination-item").addClass("d-none");
  $(".pagination-item:nth-child(2)").removeClass("d-none");
  $(".page-next")
    .removeClass("d-none")
    .css("opacity", "0.6")
    .css("pointer-events", "none");
  $(".page-prev").removeClass("d-none").css("opacity", "0.6");
}

// Tìm kiếm sản phẩm
$(".product-search-input").on("keyup", showProduct);
let productCards = $(".product-item");

function showProduct() {
  Array.from(productCards).forEach((card) => {
    let productBrand = $(card)
      .find(".product-card__brand")
      .text()
      .toLowerCase();

    let productName = $(card).find(".product-card__name").text().toLowerCase();
    let searchValue = $(".product-search-input").val().toLowerCase();

    let brandFlag = productBrand.includes(searchValue);
    let nameFlag = productName.includes(searchValue);

    if (brandFlag || nameFlag) {
      $(card).css("display", "block");
    } else {
      $(card).css("display", "none");
    }
  });
  updatePages();
}

// Lọc sản phẩm theo thương hiệu
$(".filter__brand-item").on("click", filterBrands);

function filterBrands() {
  $(".filter__item").removeClass("active");

  Array.from(productCards).forEach((card) => {
    if ($(this).attr("data-brand") == $(card).attr("data-brand")) {
      $(card).css("display", "block");
    } else {
      $(card).css("display", "none");
    }
  });

  $(this).addClass("active");
  updatePages();
}

// Xóa lọc
$(".remove-filter__btn").on("click", function () {
  $(".filter__item").removeClass("active");
  productCards.css("display", "block");

  $(".pagination-item").removeClass("d-none");
  $(".page-next").css("opacity", "1").css("pointer-events", "auto");
});

// Chọn số lượng sản phẩm/trang
$(".select-page-items").on("change", changeItemsPerPage);

function changeItemsPerPage() {
  let itemsPage = Number($(this).val());
  productCards.css("display", "none");

  let newProductArr = Array.from(productCards).slice(0, itemsPage);

  newProductArr.forEach((card) => {
    $(card).css("display", "block");
  });

  updatePages();
}

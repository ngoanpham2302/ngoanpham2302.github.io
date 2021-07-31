// Ready function

$(function () {
  // Product detail images

  $(".product-detail__slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 700,
    arrows: false,
    fade: true,
    asNavFor: ".product-detail__slider-nav",
  });

  $(".product-detail__slider-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 700,
    asNavFor: ".product-detail__slider-for",
    arrows: true,
    focusOnSelect: true,
    prevArrow:
      '<button class="prev-arrow" aria-label="Previous" type="button"><span class="iconify prev-arrow" data-icon="fluent:chevron-left-28-regular" data-inline="false"></span></button>',
    nextArrow:
      '<button class="next-arrow" aria-label="Next" type="button"><span class="iconify next-arrow" data-icon="fluent:chevron-right-28-regular" data-inline="false"></span></button>',
  });

  // ---------------------------------

  // Product list

  $(".products-slider").slick({
    autoplay: true,
    autoplaySpeed: 5500,
    speed: 1200,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    prevArrow:
      '<button class="prev-arrow" aria-label="Previous" type="button"><span class="iconify prev-arrow" data-icon="fluent:chevron-left-28-regular" data-inline="false"></span></button>',
    nextArrow:
      '<button class="next-arrow" aria-label="Next" type="button"><span class="iconify next-arrow" data-icon="fluent:chevron-right-28-regular" data-inline="false"></span></button>',

    responsive: [
      {
        breakpoint: 1430,
        settings: {
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 1390,
        settings: {
          arrows: true,
          dots: false,
        },
      },
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 3,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: true,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  });
});

// Thay đổi giá, tên sản phẩm ở trang chi tiết sản phẩm khi chọn dung tích
$(".btn-volume").on("click", changeVolume);

function changeVolume() {
  $(".btn-volume").removeClass("selected");
  $(this).addClass("selected");

  let volume = Number($(this).attr("data-volume"));
  let productPrice = ((volume * 1860000) / 30).toLocaleString("vi-VN");

  $(".product-detail__price").text(`${productPrice}₫`);
  $(".product-detail__name .product__volume").text(`${volume} ml`);
}

// quantity-btn: Button tăng giảm số lượng sản phẩm trang product detail

// Button giảm số lượng sp
let quantityDesBtn = $(".product-detail__quantity .quantity-decrease-btn");

quantityDesBtn.on("click", function () {
  let quantityInput = $(this).next();
  let quantity = Number(quantityInput.val());

  if (quantity == 0) {
    quantity = 0;
  } else if (quantity <= 1) {
    quantity = 1;
  } else {
    quantity -= 1;
  }

  quantityInput.val(quantity);
});

// Button tăng số lượng sp
let quantityIncBtn = $(".product-detail__quantity .quantity-increase-btn");

quantityIncBtn.on("click", function () {
  let quantityInput = $(this).prev();
  let quantity = Number(quantityInput.val());

  quantity += 1;

  quantityInput.val(quantity);
});

// -------- Button Add to wishlist phần chi tiết sản phẩm ---------

// Thêm sp vào danh sách yêu thích
let detailAddWishlist = $(".addtowishlist-btn > .wishlist-icon--empty");

detailAddWishlist.on("click", function () {
  $(this).next().css("display", "inline");
  $(this).css("display", "none");

  $(".wishlist-noti")
    .removeClass("text-danger")
    .addClass("text-success")
    .text("Đã thêm vào danh sách yêu thích!");

  changeUiToast();
});

// Bỏ sp khỏi danh sách yêu thích
let detailRemoveWishlist = $(".addtowishlist-btn > .wishlist-icon--filled");

detailRemoveWishlist.on("click", function () {
  // $(this).closest(".toast").find("button.btn-close-toast").click();
  $(this).prev().css("display", "inline");
  $(this).css("display", "none");

  $(".wishlist-noti")
    .removeClass("text-success")
    .addClass("text-danger")
    .text("Đã xóa khỏi danh sách yêu thích!");

  changeUiToast();
});

function changeUiToast() {
  $("#wishlistToast .toast-img img").attr(
    "src",
    "./images/products/cart-ysl-libre.webp"
  );
  $("#wishlistToast .toast-brand-text").text("Yves Saint Laurent");
  $("#wishlistToast .toast-name-text").text("Libre EDP");

  // Show toast
  let wishlistToast = document.getElementById("wishlistToast");
  let wishlistAlert = new bootstrap.Toast(wishlistToast); //inizialize toast
  wishlistAlert.show(); //show toast
}

// Button Add to cart phần chi tiết sản phẩm
let detailAddCart = $(".product-detail__buy .addtocart-btn");

detailAddCart.on("click", function () {
  $("#addcartToast .toast-img img").attr(
    "src",
    "./images/products/cart-ysl-libre.webp"
  );
  $("#addcartToast .toast-brand-text").text("Yves Saint Laurent");
  $("#addcartToast .toast-name-text").text("Libre EDP");

  let addcartToast = document.getElementById("addcartToast");
  let addcartAlert = new bootstrap.Toast(addcartToast); //inizialize toast
  addcartAlert.show(); //show toast
  updateCartBadge(); 
});

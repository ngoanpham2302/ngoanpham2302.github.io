// -------- Button Add to wishlist phần product card ---------

// Thêm sp vào danh sách yêu thích
let cardAddWishlist = $(".product-card__wishlist > .wishlist-icon--empty");

cardAddWishlist.on("click", function () {
  $(this).css("display", "none");
  $(this).next().css("display", "inline");

  $(".wishlist-noti")
    .removeClass("text-danger")
    .addClass("text-success")
    .text(`Đã thêm vào danh sách yêu thích!`);

  changeCardUiToast($(this));
});

// Bỏ sp khỏi danh sách yêu thích
let cardRemoveWishlist = $(".product-card__wishlist > .wishlist-icon--filled");

cardRemoveWishlist.on("click", function () {
  $(this).css("display", "none");
  $(this).prev().css("display", "inline");

  $(".wishlist-noti")
    .removeClass("text-success")
    .addClass("text-danger")
    .text(`Đã xóa khỏi danh sách yêu thích!`);

  changeCardUiToast($(this));
});

function changeCardUiToast(btnObj) {
  let imgSrc = btnObj.parent().prev().attr("src");
  let brand = btnObj
    .parent()
    .parent()
    .next()
    .children(".product-card__brand")
    .text();
  let name = btnObj
    .parent()
    .parent()
    .next()
    .children(".product-card__name")
    .text();

  $("#wishlistToast .toast-img img").attr("src", imgSrc);
  $("#wishlistToast .toast-brand-text").text(brand);
  $("#wishlistToast .toast-name-text").text(name);

  // Show toast
  let wishlistToast = document.getElementById("wishlistToast");
  let wishlistAlert = new bootstrap.Toast(wishlistToast); //inizialize toast
  wishlistAlert.show(); //show toast
}

// Button Add to cart phần product card
let cardAddCart = $(".card-body .btn-addtocart");

cardAddCart.on("click", function () {
  let imgSrc = $(this).parent().prev().children(".card-img-top").attr("src");
  let brand = $(this).parent().children(".product-card__brand").text();
  let name = $(this).parent().children(".product-card__name").text();

  $("#addcartToast .toast-img img").attr("src", imgSrc);
  $("#addcartToast .toast-brand-text").text(brand);
  $("#addcartToast .toast-name-text").text(name);

  let addcartToast = document.getElementById("addcartToast");
  let addcartAlert = new bootstrap.Toast(addcartToast); //inizialize toast
  addcartAlert.show(); //show toast
  updateCartBadge();
});

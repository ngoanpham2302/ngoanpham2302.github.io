// // Button remove từng sản phẩm yêu thích
// $(".btn-remove-product").on("click", function () {
//   $(this).parents(".product-row").remove();
// });

// // Button remove toàn bộ sản phẩm yêu thích
// $(".btn-confirm-remove-all").on("click", function () {
//   $(".product-row").remove();
//   $(".cart-btns .btn-remove-all").css("display", "none");

//   $(".btn-to-cart-page").css("display", "none");
//   $(".btn-continue-shopping").removeClass("d-none");
//   $(".cart-btns").css("justify-content", "center");

//   $(".cart-body").html(
//     `<p class="empty-cart-message">Danh sách yêu thích của bạn đang trống!</p>`
//   );
// });

// Random Id cho sản phẩm trong giỏ hàng
function randomId() {
  return Math.floor(Math.random() * 100000);
}

// Tạo mảng danh sách sản phẩm trong giỏ hàng
let list = [
  {
    id: randomId(),
    image: "./images/products/cart-dior-homme-intense.webp",
    name: "Dior Homme Intense&nbsp;EDP",
    volume: "100ml",
    price: 2800000,
    status: "Còn hàng",
    statusClass: "available",
  },
  {
    id: randomId(),
    image: "./images/products/cart-armani-my-way.webp",
    name: "Giorgio Armani My Way&nbsp;EDP",
    volume: "100ml",
    price: 2590000,
    status: "Hết hàng",
    statusClass: "unavailable",
  },
];

function showEmptyList() {
  $(".cart-btns .btn-remove-all").css("display", "none");
  $(".btn-to-cart-page").css("display", "none");
  $(".btn-continue-shopping").removeClass("d-none");
  $(".cart-btns").css("justify-content", "center");

  $(".cart-body").html(
    `<p class="empty-cart-message">Danh sách yêu thích của bạn đang trống!</p>`
  );
}

// Render các sản phẩm trong danh sách ra ngoài giao diện
function renderList(arr) {
  let productsContent = "";

  // Mảng cart rỗng, báo giỏ hàng trống
  if (arr.length == 0) {
    showEmptyList();
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    let product = arr[i];

    productsContent += `<div class="product-row">
                  <div class="pro-img">
                    <a href="./product-detail.html"
                      ><img
                        src="${product.image}"
                        alt="product-image"
                    /></a>
                  </div>

                  <div class="product-cols">
                    <div class="pro-name mobile-flex">
                      <a href="./product-detail.html">${product.name}</a>
                      <button class="btn-remove-product btn-remove-mobile" onclick="removeItem(${
                        product.id
                      })">
                        <span
                          class="iconify remove-icon"
                          data-icon="icomoon-free:bin"
                          data-inline="false"
                        ></span>
                      </button>
                    </div>
                    <div class="pro-volume medium-col">${product.volume}</div>
                    <div class="unit-price medium-col mobile-flex">
                      <span class="col-name">Đơn giá</span>
                      <span class="col-value">${product.price.toLocaleString(
                        "vi-VN"
                      )}đ</span>
                    </div>

                    <div class="pro-quantity medium-col mobile-flex status">
                      <span class="col-name">Tình trạng</span>
                      <span class="col-value status--${product.statusClass}">${
                        product.status
                      }</span>
                    </div>

                    <div
                      class="total-price medium-col mobile-flex wish-to-cart"
                    >
                      <button class="section__btn btn-wishtocart">
                        THÊM VÀO GIỎ
                      </button>
                    </div>

                    <div class="pro-remove text-center mobile-hidden" onclick="removeItem(${
                      product.id
                    })">
                      <button class="btn-remove-product">
                        <span
                          class="iconify remove-icon"
                          data-icon="icomoon-free:bin"
                          data-inline="false"
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>`;
  }

  $(".cart-body").html(productsContent);
}

// Button remove từng sản phẩm trong giỏ hàng
function removeItem(removeId) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == removeId) {
      list.splice(i, 1);
    }
  }

  renderList(list);
}

// Button remove toàn bộ sản phẩm trong giỏ hàng
$(".btn-confirm-remove-all").on("click", function () {
  renderList([]);
  showEmptyList();
});

window.onload = renderList(list);

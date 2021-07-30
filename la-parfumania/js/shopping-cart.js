let discountPercent;
// Random Id cho sản phẩm trong giỏ hàng
function randomId() {
  return Math.floor(Math.random() * 100000);
}

// Tạo mảng danh sách sản phẩm trong giỏ hàng
let cart = [
  {
    id: randomId(),
    image: "./images/products/cart-ysl-libre.webp",
    name: "Yves Saint Laurent Libre EDP",
    volume: "30ml",
    price: 1860000,
    quantity: 1,
  },
  {
    id: randomId(),
    image: "./images/products/cart-armani-si.webp",
    name: "Yves Saint Laurent Libre EDP",
    volume: "100ml",
    price: 3580000,
    quantity: 1,
  },
];

// Tạo mảng mã giảm giá
let discountCodes = {
  D10: 10,
  D20: 20,
  D30: 30,
};

function showEmptyCart() {
  $(".cart-btns .btn-remove-all").css("display", "none");
  $(".cart-btns").css("justify-content", "center");
  $(".cart-body").html(
    `<p class="empty-cart-message">Giỏ hàng của bạn đang trống!</p>`
  );
}

// Render các sản phẩm trong danh sách ra ngoài giao diện
function renderCart(arr) {
  let productsContent = "";

  // Update tổng số tiền
  updateSubtotalDiscount(arr);

  // Mảng cart rỗng, báo giỏ hàng trống
  if (arr.length == 0) {
    showEmptyCart();
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
                      <a href="./product-detail.html"
                        >${product.name}</a
                      >
                      <button class="btn-remove-product btn-remove-mobile" onclick="removeProduct(${
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

                    <div class="pro-quantity medium-col mobile-flex">
                      <span class="col-name">Số lượng</span>
                      <div class="cart__quantity">
                        <button class="quantity-btn quantity-decrease-btn" onclick="quantityDecrease(${
                          product.id
                        },$(this))">
                          -
                        </button>
                        <input type="text" class="quantity-input" value="${
                          product.quantity
                        }" onchange="changeQuantity(${product.id}, $(this)) "/>
                        <button class="quantity-btn quantity-increase-btn" onclick="quantityIncrease(${
                          product.id
                        },$(this))">
                          +
                        </button>
                      </div>
                    </div>

                    <div class="total-price medium-col mobile-flex">
                      <span class="col-name">Thành tiền</span>
                      <span class="col-value">${(
                        product.price * product.quantity
                      ).toLocaleString("vi-VN")}đ</span>
                    </div>

                    <div class="pro-remove text-center mobile-hidden">
                      <button class="btn-remove-product" onclick="removeProduct(${
                        product.id
                      })">
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
function removeProduct(removeId) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == removeId) {
      cart.splice(i, 1);
    }
  }

  renderCart(cart);
}

// Button remove toàn bộ sản phẩm trong giỏ hàng
$(".btn-confirm-remove-all").on("click", function () {
  renderCart([]);
  showEmptyCart();
});

// cart__quantity: Button tăng giảm số lượng sản phẩm trang shopping cart

// Button giảm số lượng sp
function quantityDecrease(changeId, btnObj) {
  let quantityInput = btnObj.next();
  let quantity = Number(quantityInput.val());

  if (quantity == 0) {
    quantity = 0;
  } else if (quantity <= 1) {
    quantity = 1;
  } else {
    quantity -= 1;
  }

  quantityInput.val(quantity);
  updateProductQuantity(changeId, quantityInput);
  renderCart(cart);
}

// Button tăng số lượng sp
function quantityIncrease(changeId, btnObj) {
  let quantityInput = btnObj.prev();
  let quantity = Number(quantityInput.val());

  quantity += 1;
  quantityInput.val(quantity);

  updateProductQuantity(changeId, quantityInput);
  renderCart(cart);
}

// Sự kiện thay đổi số lượng sản phẩm => thay đổi quantity của từng sp trong mảng cart (trường hợp user nhập trực tiếp số lượng sp tại quantity input)
function changeQuantity(changeId, inputObj) {
  if (inputObj.val() < 1) {
    inputObj.val("1");
  }

  updateProductQuantity(changeId, inputObj);
  renderCart(cart);
}

// Update số lượng sp trong mảng cart
function updateProductQuantity(proId, inputObj) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == proId) {
      cart[i].quantity = Number(inputObj.val());
    }
  }
}

// Update tổng số tiền, giảm giá trong giỏ hàng
function updateSubtotalDiscount(arr) {
  let subtotal = 0;
  let discount = 0;

  for (let i = 0; i < arr.length; i++) {
    subtotal += arr[i].price * arr[i].quantity;
  }

  // Update tổng tiền tạm tính (trước discount)
  $(".order__temp-value").text(subtotal.toLocaleString("vi-VN"));

  // Tính tiền discount
  discountPercent = validateDiscountCode();

  if (discountPercent) {
    discount = (subtotal * discountPercent) / 100;
  } else {
    discount = 0;
  }

  subtotal -= discount;

  $(".discount-amount").text(discount.toLocaleString("vi-VN"));
  $(".order__subtotal-value").text(subtotal.toLocaleString("vi-VN"));
}

// Kiểm tra mã giảm giá có valid không
function validateDiscountCode() {
  let discountValue = $(".discount-input").val();
  if (discountCodes[discountValue]) {
    return discountCodes[discountValue];
  }
  return 0;
}

// Apply discount button
$(".btn-apply-discount").on("click", function () {
  updateSubtotalDiscount(cart);
  if (discountPercent) {
    $(".discount-input").addClass("is-valid");
  } else {
    $(".discount-input").addClass("is-invalid");
    $(".discount-input").next().addClass("invalid-feedback");
  }
});

window.onload = renderCart(cart);

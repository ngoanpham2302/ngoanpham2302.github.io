// ------------ Start: Mobile Menu ------------
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
// ------------ End: Mobile Menu ------------

// ------------ Start: Mobile Search Bar ------------
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
// ------------ End: Mobile Search Bar ------------

// ------------ Start: Back To Top ------------
// Back to top button
let toTopBtn = $(".btn-to-top");

$(window).on("scroll", function () {
  if ($(window).scrollTop() > 300) {
    toTopBtn.addClass("show-totop");
  } else {
    toTopBtn.removeClass("show-totop");
  }
});

toTopBtn.on("click", function (event) {
  event.preventDefault();
  $("html, body").scrollTop(0);
});
// ------------ End: Back To Top ------------

// ------------ Start: Validate Login/Signup ------------

// Ẩn/Hiện mật khẩu login/signup
$("#show-hide-pass-login").on("click", showHidePasswordLogin);

function showHidePasswordLogin() {
  let passInput = $("#login-password");

  if (passInput.attr("type") === "password") {
    passInput.attr("type", "text");
  } else {
    passInput.attr("type", "password");
  }
}

$("#show-hide-pass-signup").on("click", showHidePasswordSignup);

function showHidePasswordSignup() {
  let passInput = $("#signup-password");

  if (passInput.attr("type") === "password") {
    passInput.attr("type", "text");
  } else {
    passInput.attr("type", "password");
  }
}

// Validate Login Input
let isValidLoginInput, isValidSignupInput, isValidPaymentInfo;

function validateLoginInput() {
  isValidLoginInput = true;

  validateEmail("#login-email");
  validateLoginPassword("#login-password");

  return isValidLoginInput;
}

// Validate Signup Input
function validateSignupInput() {
  isValidSignupInput = true;

  validateEmail("#signup-email");
  validateSignupPassword("#signup-password");
  validatePhone("#signup-phone");

  return isValidSignupInput;
}

// Function validate name, phone, email, password có thể tái sử dụng

// Validate email
function validateEmail(emailId) {
  let emailRegex =
    /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let emailValue = $(emailId).val().trim();

  if (emailValue === "") {
    setError(emailId, "Vui lòng nhập email");
    isValidLoginInput = false;
    isValidSignupInput = false;
  } else {
    if (!emailRegex.test(emailValue)) {
      setError(emailId, "Email không hợp lệ. VD: ab_12@gmail.com");
      isValidLoginInput = false;
      isValidSignupInput = false;
    } else {
      setSuccess(emailId);
    }
  }
}

// Validate login password
function validateLoginPassword(passwordId) {
  let passValue = $(passwordId).val().trim();

  if (passValue === "") {
    setError(passwordId, "Vui lòng nhập mật khẩu");
    isValidLoginInput = false;
  } else {
    setSuccess(passwordId);
  }
}

// Validate signup password
function validateSignupPassword(passwordId) {
  let passValue = $(passwordId).val().trim();

  if (passValue === "") {
    setError(passwordId, "Vui lòng nhập mật khẩu");
    isValidSignupInput = false;
  } else {
    if (passValue.length < 4) {
      setError(passwordId, "Mật khẩu dài 4-12 ký tự");
      isValidSignupInput = false;
    } else {
      setSuccess(passwordId);
    }
  }
}

// Validate name
function validateName(nameId) {
  let nameValue = $(nameId).val().trim();

  if (nameValue === "") {
    setError(nameId, "Vui lòng nhập họ tên");
    isValidLoginInput = false;
    isValidSignupInput = false;
  } else {
    if (nameValue.length < 2 || nameValue.length > 20) {
      setError(nameId, "Vui lòng nhập tên từ 2 - 50 ký tự");
      isValidLoginInput = false;
      isValidSignupInput = false;
    } else {
      setSuccess(nameId);
    }
  }
}

// Validate phone
function validatePhone(phoneId) {
  let phoneRegex = /^\(?([0-9]{2,7})\)?[-. ]?([0-9]{3,5})[-. ]?([0-9]{3,5})$/;
  let phoneValue = $(phoneId).val().trim();

  if (phoneValue === "") {
    setError(phoneId, "Vui lòng nhập số điện thoại");
    isValidLoginInput = false;
    isValidSignupInput = false;
    isValidPaymentInfo = false;
  } else {
    if (!phoneRegex.test(phoneValue)) {
      setError(phoneId, "Số điện thoại không hợp lệ. VD: 0981234567");
      isValidLoginInput = false;
      isValidSignupInput = false;
      isValidPaymentInfo = false;
    } else {
      setSuccess(phoneId);
    }
  }
}

// Validate city, name
function validateCity(nameId, message) {
  let nameValue = $(nameId).val().trim();

  if (nameValue === "") {
    setError(nameId, message);
    isValidPaymentInfo = false;
  } else {
    setSuccess(nameId);
  }
}

// Validate select form
function validateSelect(selectId, message) {
  let selectValue = $(selectId).val();

  if (selectValue === "" || selectValue == null) {
    setError(selectId, message);
    isValidPaymentInfo = false;
  } else {
    setSuccess(selectId);
  }
}

// Set CSS error style cho input
function setError(eleId, message) {
  // isValidLoginInput = false;

  $(eleId).addClass("is-invalid");
  $(eleId).next().addClass("invalid-feedback");
  $(eleId).next().text(message).show();
}

// Set CSS success style cho input
function setSuccess(eleId) {
  $(eleId).addClass("is-valid");
}

// Input, select change => change CSS style (TH đã validate input ít nhất 1 lần trước đó và đang hiển thị error/success message)
$(".form-control").on("input", function () {
  $(this).removeClass("is-invalid").removeClass("is-valid");
  $(this).next().removeClass("invalid-feedback").hide();
});

// Change CSS Style cho input[type=text] cho visa datepicker
$(".form-control").on("change", function () {
  $(this).removeClass("is-invalid").removeClass("is-valid");
  $(this).next().removeClass("invalid-feedback").hide();
});

$(".form-select").on("change", function () {
  $(this).removeClass("is-invalid").removeClass("is-valid");
  $(this).next().removeClass("invalid-feedback").hide();
});

function removeErrorStyle() {
  $(".form-control").removeClass("is-invalid").removeClass("is-valid");
  $(".error").removeClass("invalid-feedback").hide();
}

// Click button login, mô phỏng login/logout
$(".btn-login").click(function () {
  removeErrorStyle();
  validateLoginInput();

  if (isValidLoginInput) {
    let userName = $("#login-email").val();
    $(".login-name").text(userName);

    setTimeout(function () {
      $("#loginModal").modal("hide");

      // Show toast báo đăng nhập thành công, thay đổi ảnh account
      let loginToast = document.getElementById("loginToast");
      let loginAlert = new bootstrap.Toast(loginToast); //inizialize toast
      loginAlert.show(); //show toast

      $(".user-login").removeClass("d-none");
      $(".header-component__btn-account").hide();
    }, 400);
  }
});

// User Logout
$(".user-login").on("click", function () {
  $(".user-dropdown").toggleClass("show");
});

$(".user-logout").on("click", function () {
  $(".header-component__btn-account").show();
  $(".user-login").addClass("d-none");
});

// Click button signup
$(".btn-signup").click(function () {
  removeErrorStyle();
  validateSignupInput();

  if (isValidSignupInput) {
    setTimeout(function () {
      $("#loginModal").modal("hide");

      // Show toast báo đăng ký thành công
      let signupToast = document.getElementById("signupToast");
      let signupAlert = new bootstrap.Toast(signupToast); //inizialize toast
      signupAlert.show(); //show toast
    }, 400);
  }
});

// ------------ End: Validate Login/Signup ------------

// Update cart badge
function updateCartBadge() {
  let desktopBadge = Number($(".header-component__cart-badge").text());
  let mobileBadge = Number($(".mobile-component__cart-badge").text());

  desktopBadge += 1;
  mobileBadge += 1;

  $(".header-component__cart-badge").text(desktopBadge);
  $(".mobile-component__cart-badge").text(mobileBadge);
}

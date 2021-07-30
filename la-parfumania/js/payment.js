// Checkbox ẩn/hiện giao hàng tới địa chỉ khác
$(".order__receiver-info").hide();
$("#other-address").on("click", showHideAddress);

function showHideAddress() {
  $(".order__receiver-info").slideToggle();
}

// Visa/Mastercard datepicker
$("#datepicker").datepicker({
  format: "mm/yy",
  startView: "months",
  minViewMode: "months",
});

// Validate thông tin thanh toán
// let isValidPaymentInfo; (đã khai báo tại layout.js)

function validatePaymentInfo() {
  isValidPaymentInfo = true;

  if ($(".order__receiver-info").css("display") == "none") {
    validateOrderFirstInfo();
  } else {
    validateOrderReceiverInfo();
  }

  if ($("#visa").hasClass("show")) {
    validateVisaInfo();
  }

  return isValidPaymentInfo;
}

// Validate visa
function validateVisaCvv(cvvId) {
  let cvvRegex = /^[0-9]{3,4}$/;
  let cvvValue = $(cvvId).val().trim();

  if (cvvValue === "") {
    setError(cvvId, "Vui lòng nhập mã CVV/CVC");
    isValidPaymentInfo = false;
  } else {
    if (!cvvRegex.test(cvvValue)) {
      setError(cvvId, "Mã CVV không hợp lệ");
      isValidPaymentInfo = false;
    } else {
      setSuccess(cvvId);
    }
  }
}

// Validate visa
function validateVisaNumber(visaId) {
  // Regex for visa, mastercard
  // let visaRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
  // regex for visa: /^4[0-9]{12}(?:[0-9]{3})?$/

  let visaRegex = /^[0-9]{2,20}$/;
  let visaValue = $(visaId).val().trim();

  if (visaValue === "") {
    setError(visaId, "Vui lòng nhập số thẻ visa");
    isValidPaymentInfo = false;
  } else {
    if (!visaRegex.test(visaValue)) {
      setError(visaId, "Số thẻ visa không hợp lệ");
      isValidPaymentInfo = false;
    } else {
      setSuccess(visaId);
    }
  }
}

function validateOrderFirstInfo() {
  validatePhone(".order__first-info .phone-input");
  validateCity(".order__first-info .city-input");
  validateCity(".order__first-info .name-input");
  validateCity(".order__first-info .district-input");
  validateCity(".order__first-info .ward-input");
  validateCity(".order__first-info .address-input");
  validateSelect(".ship-method-select");
}

function validateOrderReceiverInfo() {
  validatePhone(".order__receiver-info .phone-input");
  validateCity(".order__receiver-info .city-input");
  validateCity(".order__receiver-info .name-input");
  validateCity(".order__receiver-info .district-input");
  validateCity(".order__receiver-info .ward-input");
  validateCity(".order__receiver-info .address-input");
  validateSelect(".ship-method-select");
}

function validateVisaInfo() {
  validateVisaNumber(".visa-card-number");
  validateCity(".visa-card-name");
  validateCity(".visa-card-date");
  validateVisaCvv(".visa-card-cvv");
}

// Click button đặt hàng
$(".btn-place-order").click(function () {
  removeErrorStyle();
  validatePaymentInfo();

  if (!isValidPaymentInfo) {
    // Show toast báo payment info không hợp lệ
    let paymentToast = document.getElementById("paymentToast");
    let paymentAlert = new bootstrap.Toast(paymentToast); //inizialize toast
    paymentAlert.show(); //show toast
  } else {
    // Chuyển sang trang Hoàn tất đơn hàng
    window.location.href = "./order-complete.html";
  }
});

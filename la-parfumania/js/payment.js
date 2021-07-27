// Check giao hàng tới địa chỉ khác

let isChecked = $("#other-address").is(":checked");

if (isChecked) {
  $(".order__receiver-info").removeClass("d-none");
} else {
  $(".order__receiver-info").addClass("d-none");
}

$("#datepicker").datepicker({
  format: "mm/yy",
  startView: "months",
  minViewMode: "months",
});

// Màn hình hiển thị biểu thức lúc nhập và kết quả sau khi tính
let result = document.querySelector(".result");

// Màn hình lưu lại biểu thức đã nhập (sau khi ấn nút =)
let expression = document.querySelector(".expression");

// Btn AC
function allClear() {
  expression.innerHTML = "";
  result.innerHTML = "0";
}

// Btn CE
function clearEntry() {
  result.innerHTML = result.innerHTML.slice(0, -1);
  if (result.innerHTML.length === 0) {
    result.innerHTML = "0";
  }
}

// Display Expression
function display(value) {
  // Không cho phép đóng ngoặc khi chưa nhập biểu thức (lúc chưa có giá trị nhập vào)
  if (result.innerHTML == "") {
    if (value == ")") {
      value = "";
    }
  }

  // Xử lý ban đầu khi nhập vào có số 0
  if (result.innerHTML === "0") {
    // Không cho phép đóng ngoặc khi chưa nhập biểu thức (lúc màn hình đang có số 0)
    if (value == ")") {
      value = "0";
    }

    // Cho phép nhập các phép toán (có thể tính toán được) khi màn hình chỉ có số 0:
    if (
      value == "^3" ||
      value == "%" ||
      value == "^2" ||
      value == "." ||
      value == "+" ||
      value == "-" ||
      value == "×" ||
      value == "÷" ||
      value == "!"
    ) {
      value = "0" + value;
    }

    // Xóa số 0 khi bấm các button còn lại
    result.innerHTML = "";
  }

  result.innerHTML += value;
}

// Btn Equal
function calculate() {
  let cal = result.innerHTML;

  // Thay thế các button đặc biệt bằng các phép toán đúng
  cal = cal.replace(/ × /g, " * ");
  cal = cal.replace(/ ÷ /g, " / ");
  cal = cal.replace(/%/g, "/ 100");
  cal = cal.replace(/\^2/g, "**2");
  cal = cal.replace(/\^3/g, "**3");
  cal = cal.replace(/π/g, "Math.PI");
  cal = cal.replace(/e\^\(/g, "Math.exp(");
  cal = cal.replace(/√\(/g, "Math.sqrt(");
  cal = cal.replace(/log\(/g, "Math.log10(");
  cal = cal.replace(/ln\(/g, "Math.log(");
  cal = calFacExp(cal);

  let answer = eval(cal);

  // Thông báo khi nhập vào biểu thức sai (VD: căn của số âm)
  if ((answer + "").includes("NaN")) {
    alert("Biểu thức nhập vào không hợp lệ!");
    return;
  } else {
    expression.innerHTML = result.innerHTML + " =";
    // Thêm dấu phân tách số đối với các số lớn
    result.innerHTML = Number(answer).toLocaleString("en-US");
  }
}

// Tính toán đối với các phép tính đặc biệt

// Tính từng giai thừa trong 1 biểu thức (do có thể nhập vào 1 biểu thức dài có chứa 1 hoặc nhiều giai thừa)

// Thực hiện lặp qua chuỗi biểu thức được nhập vào, tìm các vị trí có xuất hiện giai thừa, tính toán trả về kết quả của giai thừa ngay tại đó

function calFacExp(str) {
  // Vị trí bắt đầu lặp
  let startIndex = 0;
  let pos;

  do {
    let num = "";
    // Vị trí của giai thừa trong biểu thức
    pos = str.indexOf("!", startIndex);

    // Nếu trong biểu thức có chứa "!"
    if (pos != -1) {
      // Tăng vị trí bắt đầu lặp lên 1 (chuẩn bị cho vòng lặp mới (nếu vẫn còn "!"))
      startIndex = pos + 1;

      let i;
      // Xử lý trường hợp không có dấu ngoặc () ngay trước "!"
      if (str.charAt(pos - 1) != ")") {
        for (i = pos - 1; i >= 0; i--) {
          if (str[i] == " " || i == 0) break;
        }
        num = str.slice(i, pos);
      } else {
        for (i = pos - 1; i >= 0; i--) {
          if (str[i] == "(") break;
        }
        num = eval(str.slice(i, pos));
      }

      // num = eval(str.slice(i, pos));
      let factorial = calFac(+num);
      str = str.replace(num + "!", factorial);
    }
  } while (pos != -1);

  return str;
}

// Tính giai thừa của 1 số

function calFac(n) {
  if (Number.isInteger(n) == false || n < 0) {
    alert("Biểu thức nhập vào không hợp lệ!");
    return;
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  let fac = 1;
  for (let i = 1; i <= n; i++) {
    fac *= i;
  }
  return fac;
}

// Bổ sung tính năng tự đóng ngoặc / không cho phép đóng ngoặc khi chưa có mở ngoặc
// Xử lý trường hợp xuất hiện dấu ngoặc liền trước "!" trong biểu thức có giai thừa
// Xử lý khi >=2 dấu phép tính liền nhau
// Thêm dấu +/- cho số âm
// Validate input (1 số trường hợp nhập sai khác)
// CSS ẩn bớt số trên màn hình để không bị tràn màn hình
// Xử lý khi bấm thiếu dấu phép tính (coi như dấu nhân)
// Bổ sung phép tính số mũ x^y

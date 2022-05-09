const data = [
  {
    ask: "Trên bề mặt trái đất nơi được mặt trời lên thiên đỉnh 2 lần trong năm là:",
    answer: "Vùng nằm giữa hai chí tuyến.",
    choices: [
      "Cực Bắc và cực Nam.",
      "Vùng từ chí tuyến đến cực.",
      "Vùng nằm giữa hai chí tuyến.",
      "Khắp bề mặt trái đất.",
    ],
  },
  {
    ask: "Trên bề mặt trái đất có hiện tượng ngày đêm luân phiên nhau với nhịp điệu 24 giờ là do:",
    answer: "Trái Đất tự quay quanh trục.",
    choices: [
      "Trái Đất tự quay quanh trục.",
      "Trục Trái Đất nghiêng.",
      "Trái Đất chuyển động quanh Mặt Trời.",
      "Trái Đất có dạng hình khối cầu.",
    ],
  },
  {
    ask: "Giờ quốc tế (giờ GMT) được tính theo giờ của múi giờ số mấy ?",
    answer: "Múi giờ số 0.",
    choices: [
      "Múi giờ số 12.",
      "Múi giờ số 0.",
      "Múi giờ số 6.",
      "Múi giờ số 18.",
    ],
  },
  {
    ask: "Chí tuyến Bắc và chí tuyến Nam có hiện tượng Mặt Trời lên thiên đỉnh mấy lần trong năm?",
    answer: "Một lần duy nhất.",
    choices: [
      "Không có lần nào.",
      "Một lần duy nhất.",
      "Hai lần trong năm.",
      "Ba lần trong năm.",
    ],
  },
  {
    ask: "Ở bán cầu Bắc từ ngày 23/9 đến ngày 21/3 hiện tượng ngày và đêm diễn ra thế nào?",
    answer: "Ngày ngắn hơn đêm.",
    choices: [
      "Ngày dài hơn đêm.",
      "Ngày và đêm khác nhau.",
      "Ngày và đêm bằng nhau.",
      "Ngày ngắn hơn đêm.",
    ],
  },
];

// Shuffle thứ tự các lựa chọn trong mảng choices
for (let i = 0; i < data.length; i++) {
  data[i].choices.sort(() => Math.random() - 0.5);
}

// Shuffle thứ tự câu hỏi trong mảng data
data.sort(() => Math.random() - 0.5);

// Câu hỏi hiện tại (current question)
let curQuestion = 0;

// Function render ra từng câu hỏi

function renderQuestion(count) {
  // Lấy ra câu hỏi hiện tại
  let question = data[count];

  // Cập nhật title, nội dung câu hỏi
  $(".question-title").html(`Câu hỏi ${count + 1}/${data.length}`);

  $(".question-content").html(`${question.ask}`);

  // Cập nhật các lựa chọn cho câu hỏi
  let choiceContent = "";

  for (let i = 0; i < question.choices.length; i++) {
    choiceContent += `<div
              class="choice border"
              id="choice-${count + 1}"
              onclick="checkResult(this)"
            >
              <p>${question.choices[i]}</p>
              <i class="fas fa-check-circle hide"></i>
             <i class="fas fa-times-circle hide"></i>
            </div>
             `;
  }
  $(".choices-box").html(choiceContent);
  $(".btn-next").addClass("disable");

  // Xử lý khi ở câu hỏi cuối: Nút "Câu tiếp theo" thành nút "Kết thúc"
  if (count == data.length - 1) {
    $(".btn-next").addClass("hide");
    $(".btn-submit").removeClass("hide").addClass("disable");
  }

  // Cập nhật thanh tiến trình
  $(".progress-bar").css("width", `${((count + 1) / data.length) * 100}%`);
}

renderQuestion(curQuestion);

// Biến kiểm tra nếu người dùng trả lời mới cho next, và không cho phép chọn lại đáp án (mặc định flag = false là chưa cho next và cho chọn đáp án)
let allowNext = false;

// Lắng nghe sự kiện nút "Câu hỏi tiếp"
$(".btn-next").on("click", () => {
  // Tăng câu hỏi lên 1, nếu là câu hỏi cuối cùng thì không tăng lên nữa
  if (allowNext) {
    if (curQuestion < data.length - 1) {
      curQuestion++;
    } else {
      curQuestion = data.length - 1;
    }
    renderQuestion(curQuestion);
    allowNext = false;
  }

  $(".hint").removeClass("disabled-hint");
  // Cách viết khác khi tăng/giảm:
  // const movePrev = Math.max(0, curQuestion - 1);
  // const moveNext= Math.min(data.length - 1, curQuestion + 1);
});

// Check và show kết quả đúng sai cho từng câu hỏi, cập nhật diamond

let userCorrect = 0;
let diamonds = 0;

function checkResult(choice) {
  if (!allowNext) {
    if ($(choice).find("p").text() == data[curQuestion].answer) {
      diamonds += 100;
      userCorrect++;

      $(choice).find(".fa-check-circle").removeClass("hide");
      $(choice).addClass("right-selected");
      $(".right-sound").get(0).play();
    } else {
      diamonds -= 50;

      $(choice).find(".fa-times-circle").removeClass("hide");
      $(choice).addClass("wrong-selected");
      $(".wrong-sound").get(0).play();
    }

    // Sau khi chọn đáp án thì cho phép next sang câu tiếp
    $(".btn-next").removeClass("disable");
    $(".btn-submit").removeClass("disable");
    allowNext = true;
    // Sau khi chọn đáp án thì Không cho dùng nút 50:50
    $(".hint").addClass("disabled-hint");

    // Cập nhật diamond
    $(".diamonds").html(`${diamonds}`);
  }
}

// Sau khi trả lời hết, người dùng ấn nút "Kết thúc"
$(".btn-submit").on("click", () => {
  $(".end-game").removeClass("hide");
  $(".quiz").addClass("hide");

  // Cập nhật nội dung khi game end
  renderGameEnd();
  clearInterval(interval);
});

// Hiển thị nội dung khi game end
function renderGameEnd() {
  if (userCorrect == data.length) {
    $(".end-title").html("Thật xuất sắc !");
    $(".end-result").html(`Bạn đã trả lời đúng tất cả các câu hỏi.`);
    $(".winner-sound").get(0).play();
  } else if (userCorrect == 0) {
    $(".end-result").html(`Bạn không trả lời được câu hỏi nào.`);
    $(".end-sound").get(0).play();
  } else {
    $(".end-result").html(
      `Bạn đã trả lời đúng ${userCorrect}/${data.length} câu hỏi.`
    );
    $(".end-sound").get(0).play();
  }
}

// Countdown thời gian chơi game
let time = 50;
let interval = setInterval(countDown, 1000);

function countDown() {
  time--;
  $(".time").html(`${time}s`);

  if (time <= 5) {
    $(".time").css("color", "#ffd000");
  } else {
    $(".time").css("color", "#fff");
  }

  if (time == 0) {
    clearInterval(interval);

    $(".end-game").removeClass("hide");
    $(".quiz").addClass("hide");
    $(".end-title").html("Hết giờ !");
    $(".loser-sound").get(0).play();
  }
}

// Gán sự kiện cho nút "Chơi lại"
$(".play-again").on("click", () => {
  window.location.reload();
});

// Gán sự kiện cho nút 50:50: loại bỏ 2 đáp án sai, nút 50:50 chỉ được sử dụng 1 lần
let allowHint = true;

$(".hint").on("click", hint);

function hint() {
  if (allowHint) {
    // Loại bỏ đáp án đúng trong mảng choices của câu hỏi hiện tại
    let curChoices = data[curQuestion].choices;
    curChoices.forEach((item, index) => {
      if (item == data[curQuestion].answer) {
        curChoices.splice(index, 1);
      }
    });

    // Chọn ngẫu nhiên 2 đáp án sai trong mảng choices (mảng đã được loại bỏ đáp án đúng)
    curChoices.sort(() => Math.random() - 0.5);
    let firstHint = curChoices[0];
    let secondHint = curChoices[1];

    // Khi người dùng bấm nút 50:50, thêm hiệu ứng cho 2 đáp án sai
    let list = document.querySelectorAll(".choice p");
    Array.from(list).forEach((item) => {
      if (item.innerText == firstHint || item.innerText == secondHint) {
        $(item).addClass("hint-choice");
        $(item).parent().addClass("disable");
        $(".hint-sound").get(0).play();
      }
    });

    // Disable nút 50:50
    allowHint = false;
    $(".hint").addClass("disable");
  }
}

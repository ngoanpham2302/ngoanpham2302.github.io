let cardsDeck = [
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "f10",
  "f11",
  "f12",
];

// Card hiện tại
let curCard = null;
let correctTimes = 0;
let numberOfCards = 9;
let time;
let moves;
// Biến đếm số lượng card đang mở hiện tại
let countCards = 0;

// Ready function (window.onload)
$(function () {
  renderCards();
  $(".card").css("pointer-events", "none");
  $(".count-moves").hide();
});

// Function render cards
function renderCards() {
  cards = cardsDeck.slice(0, numberOfCards);
  if (numberOfCards == 12) {
    $(".container").addClass("hard");
  }

  // Nhân đôi mảng cards ban đầu để tạo ra các cặp bài
  cards = cards.concat(cards);

  // Shuffle mảng cards
  cards.sort(() => Math.random() - 0.5);

  // Thêm các quân bài vào cards wrapper
  let allCards = "";
  for (let i = 0; i < cards.length; i++) {
    allCards += `<div class="grid-item">
          <div class="card" data-name="${cards[i]}" onclick="flipCard(this)">
            <div class="front">
              <img src="img/${cards[i]}.jpg" alt="card-front" />
            </div>
            <div class="back">
              <img src="img/back.jpg" alt="card-back" />
            </div>
          </div>
        </div>`;
  }
  $(".cards-wrapper").html(allCards);
}

// Start Game
let interval;

function start(btn) {
  playMode(btn);
  renderCards();

  $(".moves").html(`You got<br />${moves} moves`);
  $(".count-moves").show();

  setTimeout(function () {
    $(".card").css("pointer-events", "auto");
    $(".start").addClass("hide");

    $(".game-sound").get(0).play();
    $(".game-sound").get(0).volume = 0.6;
  }, 300);

  // Countdown time
  interval = setInterval(countDown, 1000);
  function countDown() {
    time--;
    $("progress").attr("value", time);

    if (time == 10) {
      $(".time-sound").get(0).play();
      $(".time-sound").get(0).loop();
    }

    if (time == 0 && correctTimes < numberOfCards) {
      endGame("lose");
    }
  }
}

// Chọn playmode
function playMode(btn) {
  $(".click-sound").get(0).play();

  if (btn.value == "normal") {
    numberOfCards = 9;
    time = 45;
    moves = 40;
  } else if (btn.value == "hard") {
    numberOfCards = 12;
    time = 50;
    moves = 45;
  }

  $("progress").attr("max", time);
  $("progress").attr("value", time);
}

// Function lật bài
function flipCard(card) {
  // Không cho mở cùng lúc quá 2 card
  if (countCards >= 2) return;

  $(card).toggleClass("flipped");
  $(".flip-sound").get(0).play();

  moves--;
  $(".moves").html(`${moves}<br />moves left`);
  if (moves == 1 || moves == 0) {
    $(".moves").html(`${moves}<br />move left`);
  }

  if (moves == 0 && correctTimes < numberOfCards) {
    endGame("lose");
    $(".lose .modal-title").html("Out of moves !");
  }

  // Không cho click liên tiếp vào cùng 1 card
  if ($(card).hasClass("flipped")) {
    $(card).addClass("disabled");
  } else {
    $(card).removeClass("disabled");
  }

  if (!curCard) {
    countCards++;
    curCard = $(card);
    $(card).find(".front").removeClass("unmatched");
  } else {
    countCards++;
    // Khi lật sai
    if (curCard.attr("data-name") != $(card).attr("data-name")) {
      setTimeout(function () {
        $(card).toggleClass("flipped");
        $(curCard).toggleClass("flipped");

        $(".wrong-sound").get(0).play();
        $(".wrong-sound").get(0).volume = 0.7;
        curCard = null;
        countCards = 0;
      }, 400);

      $(card).find(".front").addClass("unmatched");
      $(curCard).find(".front").addClass("unmatched");

      // Khi lật đúng
    } else {
      setTimeout(function () {
        $(card).addClass("hidden");
        $(curCard).addClass("hidden");

        $(".right-sound").get(0).play();
        curCard = null;
        countCards = 0;
      }, 400);

      $(card).find(".front").removeClass("unmatched");
      $(curCard).find(".front").removeClass("unmatched");
      $(card).find(".front").addClass("matched");
      $(curCard).find(".front").addClass("matched");

      correctTimes++;
      if (correctTimes == numberOfCards && time >= 0 && moves >= 0) {
        endGame("win");
      }
    }
  }
}

// End Game
function endGame(status) {
  clearInterval(interval);
  $(".game-sound").get(0).pause();
  $(".time-sound").get(0).pause();
  $(".card").css("pointer-events", "none");

  if (status == "win") {
    setTimeout(function () {
      $(".win").removeClass("hide");
      $(".win-sound").get(0).play();
    }, 800);
  } else if (status == "lose") {
    setTimeout(function () {
      $(".lose").removeClass("hide");
      $(".lose-sound").get(0).play();
    }, 600);
  }
}

// Button Play again
$(".btn-restart").on("click", function () {
  $(".click-sound").get(0).play();

  setTimeout(function () {
    window.location.reload();
  }, 600);
});



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

  // Product list

  $(".products-slider").slick({
    autoplay: true,
    autoplaySpeed: 4000,
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

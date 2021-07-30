// Ready function

$(function () {
  // Home Banner

  $(".banner-slider").slick({
    autoplay: true,
    autoplaySpeed: 8000,
    speed: 1300,
    slidesToShow: 1,
    arrows: false,
    dots: true,
    fade: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    draggable: true,
    swipe: true,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          fade: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          fade: false,
          autoplaySpeed: 5000,
          speed: 900,
          draggable: true,
          swipe: true,
        },
      },
    ],
  });

  // ---------------------------------
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

  // Brands list
  $(".brands-slider").slick({
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    pauseOnFocus: false,
    pauseOnHover: false,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplaySpeed: 3000,
        },
      },
    ],
  });

  // Customer pictures gallery

  // Zoom in
  $(".picture-gallery a").fancybox();

  $(".picture-gallery").slick({
    autoplay: false,
    speed: 700,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    pauseOnFocus: false,
    pauseOnHover: false,

    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
});

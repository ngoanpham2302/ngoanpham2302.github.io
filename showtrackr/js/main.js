// Section Shows

$(".slider").slick({
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: false,
  speed: 1000,
  centerMode: true,
  slidesToShow: 5.6,
  slidesToScroll: 1,
  pauseOnFocus: false,
  pauseOnHover: false,

  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 4.6,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3.6,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2.6,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1.6,
      },
    },
  ],
});

// Section Community

$(".comment-list-01").slick({
  autoplay: true,
  autoplaySpeed: 3500,
  speed: 1000,
  arrows: false,
  centerMode: true,
  slidesToShow: 3.2,
  slidesToScroll: 1,
  pauseOnFocus: false,
  pauseOnHover: false,
  vertical: true,

  responsive: [
    {
      breakpoint: 768,
      settings: {
        vertical: false,
        slidesToShow: 2.2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        vertical: false,
        slidesToShow: 1.2,
      },
    },
    {
      breakpoint: 360,
      settings: {
        vertical: false,
        slidesToShow: 1,
      },
    },
  ],
});

$(".comment-list-02").slick({
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1000,
  arrows: false,
  centerMode: true,
  slidesToShow: 3.4,
  slidesToScroll: 1,
  pauseOnFocus: false,
  pauseOnHover: false,
  vertical: true,
});

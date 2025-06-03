import Swiper from "swiper";
import {Pagination} from "swiper/modules";

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.section-trust__slider .swiper')
  if (slider) {
    new Swiper(slider, {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 0,
      slideToClickedSlide: true,
      breakpoints: {
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
      },
      pagination: {
        el: '.section-trust__slider .slider-dots',
        bulletClass: 'slider-dot',
        bulletActiveClass: 'slider-dot--active',
        clickable: true,
      },
    })
  }
})
import Swiper from "swiper";
import {Pagination} from "swiper/modules";

document.addEventListener('DOMContentLoaded', ()=>{
  const slider = document.querySelector('.section-productivity__slider .swiper')
  if(slider) {
    new Swiper(slider, {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 0,
      slideToClickedSlide: true,
      pagination: {
        el: '.section-productivity__slider .slider-dots',
        bulletClass: 'slider-dot',
        bulletActiveClass: 'slider-dot--active',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 32,
        }
      }
    })
  }
})
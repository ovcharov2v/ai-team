import Swiper from "swiper";
import {Pagination} from "swiper/modules";

document.addEventListener('DOMContentLoaded', ()=>{
  const slider = document.querySelector('.section-agents__slider .swiper')
  if(slider) {
    new Swiper(slider, {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      slideToClickedSlide: true,
      slideActiveClass: 'agent--border',
      pagination: {
        el: '.section-agents__slider .slider-dots',
        bulletClass: 'slider-dot',
        bulletActiveClass: 'slider-dot--active',
        clickable: true,
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
        }
      }
    })
  }
})
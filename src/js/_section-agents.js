import Swiper from "swiper";
import {Pagination} from "swiper/modules";

document.addEventListener('DOMContentLoaded', ()=>{
  const slider = document.querySelector('.section-agents__slider .swiper')
  if(slider) {
    new Swiper(slider, {
      modules: [Pagination],
      slidesPerView: 1.3,
      spaceBetween: 4,
      slideToClickedSlide: true,
      slideActiveClass: 'agent--border',
      breakpoints: {
        768: {
          slidesPerView: 2.95,
        },
        1024: {
          slidesPerView: 3,
        }
      }
    })
  }
})
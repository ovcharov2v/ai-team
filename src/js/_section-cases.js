import Swiper from "swiper";

document.addEventListener('DOMContentLoaded', ()=>{
  const slider = document.querySelector('.section-cases__slider.swiper')
  if(slider) {
    new Swiper(slider, {
      slidesPerView: 1.3,
      spaceBetween: 4,
      slideToClickedSlide: true,
      breakpoints: {
        768: {
          slidesPerView: 2.95,
        },
        1024: {
          slidesPerView: 3.6,
        }
      }
    })
  }
})
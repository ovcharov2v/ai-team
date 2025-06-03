import Swiper from "swiper";

document.addEventListener('DOMContentLoaded', ()=>{
  const slider = document.querySelector('.section-other__slider.swiper')
  if(slider) {
    new Swiper(slider, {
      slidesPerView: 1.2,
      spaceBetween: 16,
      slideToClickedSlide: true,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
      }
    })
  }
})
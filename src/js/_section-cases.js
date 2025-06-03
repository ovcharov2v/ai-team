import Swiper from "swiper";

document.addEventListener('DOMContentLoaded', ()=>{
  const slider = document.querySelector('.section-cases__slider.swiper')
  if(slider) {
    new Swiper(slider, {
      slidesPerView: 1.1,
      spaceBetween: 16,
      slideToClickedSlide: true,
      breakpoints: {
        768: {
          slidesPerView: 2.2,
          spaceBetween: 32,
        },
        1024: {
          slidesPerView: 3,
        }
      }
    })
  }
})
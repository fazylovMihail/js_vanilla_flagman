import { renderGoodsOfDay } from "./render/cards.js";

// Инициализация слайдера
export default function initSwiper(data, { swiper, dayProductsList }) {
  renderGoodsOfDay(data, dayProductsList, ['day-products__item', 'swiper-slide']);

  // Возвращаю на случай если понадобятся какие-то операции со слайдером
  return new Swiper(swiper, {
    navigation: {
      nextEl: '.day-products__navigation-btn--next',
      prevEl: '.day-products__navigation-btn--prev',
    },
    spaceBetween: 40,
    slidesPerView: 4
  });
}
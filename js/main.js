import { getData } from './components/components.js';
import Product from './components/Product.js';
import renderCheckboxCounts from './components/render/checkboxCounts.js';
import { paginationManager, handleCatalogInput, handleCatalogSelect } from './components/catalog.js';
import initSwiper from './components/swiper.js';
import initCitySelect from './components/citySelect.js';
import renderBasket from './components/render/basket.js';
import { handleQuestionSubmit, getQuestionValidator } from './components/questionForm.js';

document.addEventListener('DOMContentLoaded', async () => {
  const ELEMENTS = {
    // Селекторы бургерного меню хедера
    headerCatalogBtn: document.querySelector('.header__catalog-btn'),
    headerCatalog: document.querySelector('.header__catalog'),
    mainMenuClose: document.querySelector('.main-menu__close'),
    // Селекторы меню выбора города
    locationCity: document.querySelector('.location__city'),
    locationCityName: document.querySelector('.location__city-name'),
    locationSubLinks: document.querySelectorAll('.location__sublink'),
    // Селекторы корзины
    headerBasketBtn: document.querySelector('.header__user-btn'),
    headerBasket: document.querySelector('.header__basket.basket'),
    headerBasketList: document.querySelector('.header__basket .basket__list'),
    headerBasketCount: document.querySelector('.header__user-count'),
    // Селекторы списка карточек и Обертки кнопок пагинации
    catalogList: document.querySelector('.catalog__list'),
    catalogPagination: document.querySelector('.catalog__pagination'),
    // Селекторы формы фильтрации
    catalogForm: document.querySelector('.catalog-form'),
    catalogFormReset: document.querySelector('.catalog-form__reset'),
    customCheckboxes: document.querySelectorAll('.catalog-form .custom-checkbox'),
    customRadios: document.querySelectorAll('.catalog-form .custom-radio'),
    // Селект сортировки
    catalogSortSelect: document.querySelector('.catalog__sort-select'),
    // Селекторы слайдера
    swiper: document.querySelector('.day-products__slider'),
    dayProductsList: document.querySelector('.day-products__list'),
    // Кнопки раздела FAQ
    faqAccordionBtns: document.querySelectorAll('.faq__accordion .accordion__btn'),
    // Форма обратной связи
    questionsForm: document.querySelector('.questions__form')
  }
  // Массив инпутов фильрации
  const catalogFormInputs = [
    ...ELEMENTS.customCheckboxes,
    ...ELEMENTS.customRadios
  ];

  const basket = [];
  renderBasket(basket, ELEMENTS);

  // Получение базы карточек
  const data = await getData() || [];
  const productData = data.map(el => new Product(el, basket, ELEMENTS)); // Общий массив для операций фильтрации

  // Массив, с которым будет работать ф-я сортировки
  let filteredData = handleCatalogInput(productData, ELEMENTS);

  // Открытие и закрытие каталога товаров
  ELEMENTS.headerCatalogBtn.addEventListener('click', () => ELEMENTS.headerCatalog.classList.add('main-menu--active'));
  ELEMENTS.mainMenuClose.addEventListener('click', () => ELEMENTS.headerCatalog.classList.remove('main-menu--active'));

  // Город пользователя
  let city = JSON.parse(localStorage.getItem('city')) || ELEMENTS.locationCityName.textContent;

  // Работа меню выбора города
  initCitySelect(city, ELEMENTS);

  // Открытие и закрытие корзины
  ELEMENTS.headerBasketBtn.addEventListener('click', e => {
    e.stopPropagation();
    ELEMENTS.headerBasket.classList.toggle('basket--active');
  });

  document.addEventListener('click', e => {
    if (!ELEMENTS.headerBasket.contains(e.target)) {
      ELEMENTS.headerBasket.classList.remove('basket--active');
    }
  });

  // Работа аккордеона
  ELEMENTS.faqAccordionBtns.forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('accordion__btn--active'));
  });

  // Ресет формы фильрации
  ELEMENTS.catalogFormReset.addEventListener('click', () => {
    ELEMENTS.catalogForm.reset();
    filteredData = handleCatalogInput(productData, ELEMENTS);
  });

  // Пагинация и рендер
  paginationManager(productData, ELEMENTS);

  // Рендер количества карточек в категории
  renderCheckboxCounts(productData, ELEMENTS.customCheckboxes);

  // Рендер товаров дня
  initSwiper(productData, ELEMENTS);

  // Работа селекта сортировки
  ELEMENTS.catalogSortSelect.addEventListener('input', () => {
    handleCatalogSelect(filteredData, ELEMENTS);
  });

  // Работа фильтрации
  catalogFormInputs.forEach(item => item.addEventListener('input', () => {
    filteredData = handleCatalogInput(productData, ELEMENTS);
  }));

  // Валидация и отправка формы
  const validator = getQuestionValidator(ELEMENTS.questionsForm);
  ELEMENTS.questionsForm.addEventListener('submit', await validator.onSuccess(handleQuestionSubmit));
});

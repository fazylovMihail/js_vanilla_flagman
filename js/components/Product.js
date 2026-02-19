import { createEl } from "./components.js";
import renderBasket from "./render/basket.js";

// Класс товаров
export default class Product {
  constructor(data, basketArr, ELEMENTS) {
    Object.assign(this, data);
    this.basketArr = basketArr;
    this.ELEMENTS = ELEMENTS;
  }

  // Метод для удаления всех HTML тегов
  sanitize(text) {
    const el = createEl('div');
    el.innerHTML = text;
    return el.textContent;
  }

  // Получение карточки товара
  getCardEl() {
    this.card = createEl('div', { className: 'product-card' });

    this.card.innerHTML = `
            <div class="product-card__visual">
              <img class="product-card__img" src="${this.image}" height="436" width="290"
                    alt="Изображение товара">
              <div class="product-card__more">
                <a href="#" class="product-card__link btn btn--icon">
                  <span class="btn__text">В корзину</span>
                  <svg width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-basket"></use>
                  </svg>
                </a>
                <a href="#" class="product-card__link btn btn--secondary">
                  <span class="btn__text">Подробнее</span>
                </a>
              </div>
            </div>
            <div class="product-card__info">
              <h2 class="product-card__title">${this.sanitize(this.name)}</h2>
              <span class="product-card__old">
              <span class="product-card__old-number">${this.sanitize(this.price.old)}</span>
              <span class="product-card__old-add">₽</span>
            </span>
              <span class="product-card__price">
              <span class="product-card__price-number">${this.sanitize(this.price.new)}</span>
              <span class="product-card__price-add">₽</span>
            </span>
              <div class="product-card__tooltip tooltip">
                <button class="tooltip__btn" aria-label="Показать подсказку">
                  <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-i"></use>
                  </svg>
                </button>
                <div class="tooltip__content">
                  <span class="tooltip__text">Наличие товара по городам:</span>
                  <ul class="tooltip__list">
                    <li class="tooltip__item">
                      <span class="tooltip__text">Москва: <span class="tooltip__count">${this.sanitize(this.availability.moscow)}</span></span>
                    </li>
                    <li class="tooltip__item">
                      <span class="tooltip__text">Оренбург: <span class="tooltip__count">${this.sanitize(this.availability.orenburg)}</span></span>
                    </li>
                    <li class="tooltip__item">
                      <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${this.sanitize(this.availability.saintPetersburg)}</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
      `;

    this.card.querySelector('.product-card__link').addEventListener('click', this.addToBasket.bind(this));
    this.initTippy();

    return this.card;
  }

  getBasketItemEl() {
    this.basketItem = createEl('li', { className: 'basket__item' });
    this.basketItem.innerHTML = `
      <div class="basket__img">
        <img src="${this.sanitize(this.image)}" alt="Фотография товара" height="60" width="60">
      </div>
      <span class="basket__name">${this.sanitize(this.name)}</span>
      <span class="basket__price">${this.sanitize(this.price.new)} руб</span>
      <button class="basket__close" type="button">
        <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
          <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
      </button>`;

    this.basketItem.querySelector('.basket__close').addEventListener('click', this.deleteProduct.bind(this));

    return this.basketItem;
  }

  addToBasket(e) {
    e.preventDefault();

    this.basketArr.push(this);
    renderBasket(this.basketArr, this.ELEMENTS);
  }

  deleteProduct() {
    const deleteIndex = this.basketArr.indexOf(this);

    this.basketArr.splice(deleteIndex, 1);
    renderBasket(this.basketArr, this.ELEMENTS);
  }

  initTippy() {
    const tooltipBtn = this.card.querySelector('.tooltip__btn');
    const tooltipContent = this.card.querySelector('.tooltip__content');

    tippy(tooltipBtn, {
      content: tooltipContent.innerHTML,
      placement: 'top-start',
      theme: 'tomato',
      allowHTML: true
    });
  }
}
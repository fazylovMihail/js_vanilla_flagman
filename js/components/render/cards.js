import { createEl } from "../components.js";

// Рендер карточек каталога
function renderCards(arr, cardsListEl, itemClassName) {
  cardsListEl.innerHTML = '';

  if (!arr) return;

  arr.forEach(productObj => {
    const contentItem = createEl('li', { className: itemClassName });
    const productCard = productObj.getCardEl();

    contentItem.append(productCard);
    cardsListEl.append(contentItem);
  });
}

// Рендер карточек товаров дня
function renderGoodsOfDay(data, cardsListEl, itemClassName) {
  const goodsOfDayArr = [];

  data.forEach(obj => {
    if (obj.goodsOfDay) {
      goodsOfDayArr.push(obj);
    }
  });

  renderCards(goodsOfDayArr, cardsListEl, itemClassName);
}

export { renderCards, renderGoodsOfDay }
import { createEl } from "../components.js";

// Отрисовка корзины
export default function renderBasket(basketArr, { headerBasketList, headerBasketCount }) {
  renderBasketEmpty(headerBasketList, basketArr);
  renderBasketCount(basketArr, headerBasketCount);

  headerBasketList.innerHTML = '';

  basketArr.forEach(product => {
    headerBasketList.append(product.getBasketItemEl());
  });
}

// Отрисовка плашки пустой корзины
function renderBasketEmpty(headerBasketList, basketArr) {
  if (basketArr.length) {
    const basketEmpty = document.querySelector('.basket__empty-block');
    if (basketEmpty) {
      basketEmpty.remove();
    }
  } else {
    const basketEmpty = createEl('div', { className: 'basket__empty-block', text: 'Корзина пока пуста' });
    headerBasketList.after(basketEmpty);
  }
}

function renderBasketCount(basketArr, basketCountEl) {
  basketCountEl.innerHTML = '';
  basketCountEl.textContent = basketArr.length;
}
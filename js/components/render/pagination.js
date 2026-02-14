import { createEl } from "../components.js";
import { renderCards } from "./cards.js";

// Рендер пагинации
export default function renderPagination(matrix, cardsListEl, paginationEl) {
  paginationEl.innerHTML = '';

  if (matrix.length < 2) return;

  for (let i = 0; i < matrix.length; i++) {
    const catalogPaginationItem = createEl('li', { className: 'catalog__pagination-item' });
    const catalogPaginationLink = createEl('button', { className: 'catalog__pagination-link', text: i + 1 });

    catalogPaginationLink.addEventListener('click', () => {
      renderCards(matrix[i], cardsListEl, 'catalog__item');
    });

    catalogPaginationItem.append(catalogPaginationLink);
    paginationEl.append(catalogPaginationItem);
  }
}
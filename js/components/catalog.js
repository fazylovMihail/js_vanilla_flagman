import { pagination, sortData } from "./components.js";
import { renderCards } from "./render/cards.js";
import renderPagination from "./render/pagination.js";

// Обрабочик пагинации
function paginationManager(arr, { catalogList, catalogPagination }) {
  const paginatedArr = pagination(arr);

  renderCards(paginatedArr[0], catalogList, 'catalog__item');
  renderPagination(paginatedArr, catalogList, catalogPagination);
}

// Обработчик для чекбоксов и радиокнопок
function handleCatalogInput(arr, { catalogForm, catalogSortSelect, catalogList, catalogPagination }) {
  const formData = Object.fromEntries(new FormData(catalogForm));
  const checkboxChecked = catalogForm.querySelectorAll('.custom-checkbox__field:checked');

  formData.type = [...checkboxChecked].map(checkbox => checkbox.value);

  const filteredArr = arr.filter(obj => {
    const filteredType = formData.type.length === 0 || formData.type.some(item => obj.type.includes(item));
    let statusMatch = true;

    if (formData.status === 'instock') {
      statusMatch = Object.values(obj.availability).some(count => count > 0);
    }

    return filteredType && statusMatch;
  });

  handleCatalogSelect(filteredArr, { catalogSortSelect, catalogList, catalogPagination });

  return filteredArr;
}

// Обработчик селекта сортировки
function handleCatalogSelect(data, { catalogSortSelect, catalogList, catalogPagination }) {
  sortData(data, catalogSortSelect);
  paginationManager(data, { catalogList, catalogPagination });
}

export { paginationManager, handleCatalogInput, handleCatalogSelect }
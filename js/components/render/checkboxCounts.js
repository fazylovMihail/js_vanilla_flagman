import { getCounts } from "../components.js";

// Рендер количества товаров в категориях
export default function renderCheckboxCounts(arr, checkboxes) {
  const customCheckboxCounts = document.querySelectorAll('.custom-checkbox__count');
  const types = [];

  checkboxes.forEach(checkbox => types.push(checkbox.querySelector('.custom-checkbox__field').value));

  const counts = getCounts(arr, types);
  customCheckboxCounts.forEach((checkboxCount, index) => checkboxCount.textContent = counts[types[index]]);
}
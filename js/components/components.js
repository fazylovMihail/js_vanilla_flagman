import { pageSize } from "./contants.js";

// Ф-я для получения БД
async function getData() {
  try {
    const response = await fetch(`${window.location.protocol}/data/data.json`, { method: 'GET' });
    if (!response.ok) throw new Error('Ошибка запроса');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Ф-я, осуществляющая пагинацию
function pagination(matrix) {
  const pages = [];

  for (let i = 0; i < matrix.length; i++) {
    if (i === 0 || i % pageSize === 0) {
      const arr = matrix.slice(i, i + pageSize);
      pages.push(arr);
    }
  }

  return pages;
}

// Ф-я для создания DOM-элемента
function createEl(tag, properties) {
  const el = document.createElement(tag);

  if (properties) {
    Object.entries(properties).forEach(([key, value]) => {
      switch (key) {
        case 'text':
          el.textContent = value;
          break;
        case 'className':
          if (Array.isArray(value)) {
            value.forEach(item => el.classList.add(item));
          } else {
            el.classList.add(value);
          }
          break;
        default:
          el.setAttribute(key, value);
          break
      }
    });
  }

  return el;
}

// Ф-я, получающая кол-во категорий
function getCounts(arr, types) {
  return types.reduce((acc, type) => {
    acc[type] = 0;
    arr.forEach(obj => {
      if (obj.type.includes(type)) {
        acc[type] = acc[type] + 1;
      }
    }); return acc;
  }, {});
}

// Ф-я для сортировки БД
function sortData(data, selectEl) {
  const value = selectEl.value;
  switch (value) {
    case 'price-min':
      data.sort((a, b) => a.price.new - b.price.new);
      break;
    case 'price-max':
      data.sort((a, b) => b.price.new - a.price.new);
      break;
    case 'rating-max':
      data.sort((a, b) => b.rating - a.rating);
      break;
  }
}

async function sendForm(formData) {
  const response = await fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }
}

export {
  getData,
  createEl,
  pagination,
  getCounts,
  sortData,
  sendForm
}
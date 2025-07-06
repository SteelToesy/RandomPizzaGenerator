let checkboxes = [];
let selectedIngredients = [];

const filterWrapper = document.querySelector('.generator__filters-wrapper');

function loadFilters() {
  return fetch('http://localhost:3000/api/v1/ingredients/grouped')
    .then(res => res.json())
    .then(categories => {
      filterWrapper.innerHTML = '';

      for (const [category, items] of Object.entries(categories)) {
        const categoryEl = createCategoryElement(category, items);
        filterWrapper.appendChild(categoryEl);
      }

      checkboxes = Array.from(document.querySelectorAll('.generator__filters-item input[type="checkbox"]'));
    });
}

function createCategoryElement(category, items) {
  const categoryEl = document.createElement('li');
  categoryEl.classList.add('generator__filters-category');

  const title = document.createElement('h3');
  title.textContent = category;
  categoryEl.appendChild(title);

  const itemList = document.createElement('ul');

  for (let i = 0; i < items.length; i++) {
    const itemEl = createCheckboxElement(category, items[i], i);
    itemList.appendChild(itemEl);
  }

  categoryEl.appendChild(itemList);
  return categoryEl;
}

function createCheckboxElement(category, name, index) {
  const itemEl = document.createElement('li');
  itemEl.classList.add('generator__filters-item');

  const checkboxId = `${category}-${index}`;
  itemEl.innerHTML = `
    <input type="checkbox" id="${checkboxId}" name="${name}">
    <label for="${checkboxId}"></label>${name}
  `;
  return itemEl;
}

function setupCheckboxControls() {
  document.getElementById('check_all').addEventListener('click', () => setCheckboxes(true));
  document.getElementById('uncheck_all').addEventListener('click', () => setCheckboxes(false));
  document.getElementById('check_random').addEventListener('click', () => randomizeCheckboxes());
}

function setCheckboxes(state) {
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = state;
  }
}

function randomizeCheckboxes() {
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = Math.random() < 0.5;
  }
}

const filterWrapper = document.querySelector('.generator__filters-wrapper');

var checkboxes;

async function loadFilters() {
  const res = await fetch('http://localhost:3000/api/v1/ingredients/grouped');
  const categories = await res.json();
  console.log(categories);

  filterWrapper.innerHTML = ''; // Clear existing HTML

  for (const [category, items] of Object.entries(categories)) {
    const categoryEl = document.createElement('li');
    categoryEl.classList.add('generator__filters-category');

    const title = document.createElement('h3');
    title.textContent = category;
    categoryEl.appendChild(title);

    const itemList = document.createElement('ul');

    items.forEach((name, index) => {
      const itemEl = document.createElement('li');
      itemEl.classList.add('generator__filters-item');

      const checkboxId = `${category}-${index}`; // unique ID per checkbox

      itemEl.innerHTML = `
        <input type="checkbox" id="${checkboxId}" class="topping_checkbox" name="${name}">
        <label for="${checkboxId}">${name}</label>
      `;

      itemList.appendChild(itemEl);
    });

    categoryEl.appendChild(itemList);
    filterWrapper.appendChild(categoryEl);
  }
  checkboxes = document.querySelectorAll('.topping_checkbox');
}

document.getElementById('check_all').addEventListener('click', function() {
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = true;
    });
});

document.getElementById('uncheck_all').addEventListener('click', function() {
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
});

document.getElementById('check_random').addEventListener('click', function() {
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = Math.random() < .5;
    });
});

loadFilters();
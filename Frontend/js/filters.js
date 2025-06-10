const filterWrapper = document.querySelector('.generator__filters-wrapper');

var checkboxes;

async function loadFilters() {
  const res = await fetch('http://localhost:3000/api/v1/ingredients/grouped');
  const categories = await res.json();
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
        <input type="checkbox" id="${checkboxId}" name="${name}">
        <label for="${checkboxId}"></label>${name}
      `;

      itemList.appendChild(itemEl);
    });

    categoryEl.appendChild(itemList);
    filterWrapper.appendChild(categoryEl);
  }
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

function initializeCategoryToggle() {
  document.querySelectorAll('.generator__filters-category').forEach(category => {
    const title = category.querySelector('h3');
    const itemList = category.querySelector('ul');

    let isOpen = false;

    itemList.style.height = '0';
    itemList.style.overflow = 'hidden';
    itemList.style.transition = 'height 0.3s ease';

    title.addEventListener('click', () => {
      if (isOpen) {
        itemList.style.height = itemList.scrollHeight + 'px';
        requestAnimationFrame(() => {
          itemList.style.height = '0';
        });
      } else {
        itemList.style.height = itemList.scrollHeight + 'px';

        const onOpenEnd = () => {
          itemList.style.height = 'auto';
          itemList.removeEventListener('transitionend', onOpenEnd);
        };
        itemList.addEventListener('transitionend', onOpenEnd);
      }

      isOpen = !isOpen;
    });
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadFilters();
  initializeCategoryToggle();
});
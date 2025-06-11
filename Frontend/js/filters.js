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

  checkboxes = Array.from(document.querySelectorAll('.generator__filters-item input[type="checkbox"]'));
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

//slide toggle

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
//generating pizza
function setupPizzaGenerationButton() {
  const generationButtons = [
    document.querySelector('.generator__submission-regenerate-button'),
    document.querySelector('.generator__generation-button')
  ];

   generationButtons[1].addEventListener('click', async () => {
    document.querySelector('.generator__submission').classList.add('active');
    document.querySelector('.generator__generation').classList.add('disabled');
  });

  generationButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', async () => {

      });
    }
  });
}

// saving pizza
function setupPizzaSavingButton() {
  const submissionButton = document.querySelector('.generator__submission-button.btn__primary');

  const generationButton = document.querySelector('.generator__generation-button.btn__primary');

  generationButton.addEventListener('click', async () => {
    document.querySelector('.generator__submission').classList.add('active');
    document.querySelector('.generator__generation').classList.add('disabled');
  });

  submissionButton.addEventListener('click', async () => {
    const nameInput = document.querySelector('#generator__pizza-name');
    let pizzaName = nameInput.value.trim();

    const checked = Array.from(document.querySelectorAll('.generator__filters-item input:checked'));
    let selectedIngredients = checked.map(input => input.name);

    // If no ingredients selected, randomly choose 1-4
    if (selectedIngredients.length === 0) {
      const allCheckboxes = Array.from(document.querySelectorAll('.generator__filters-item input'));
      const shuffled = allCheckboxes.sort(() => 0.5 - Math.random());
      const randomCount = Math.floor(Math.random() * 4) + 1;
      const randomSelection = shuffled.slice(0, randomCount).map(cb => cb.name);
      selectedIngredients = randomSelection;
    }

    // If name is empty, auto-generate one
    if (!pizzaName) {
      try {
        const res = await fetch('http://localhost:3000/api/v1/pizzas');
        const pizzas = await res.json();
        pizzaName = `Pizza ${pizzas.length + 1}`;
      } catch (error) {
        alert('Failed to fetch existing pizzas');
        return;
      }
    }

    try {
      // Step 1: Create the Pizza
      const pizzaRes = await fetch('http://localhost:3000/api/v1/pizzas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: pizzaName })
      });

      if (!pizzaRes.ok) throw new Error('Failed to create pizza');

      const pizza = await pizzaRes.json();

      // Step 2: Create the Recipe and link ingredients
      const recipePayload = {
        name: `${pizzaName} Recipe`,
        description: 'Custom generated pizza',
        steps: 'Auto-generated: Add ingredients and bake.',
        pizzaId: pizza.id,
        ingredients: selectedIngredients
      };

      const recipeRes = await fetch('http://localhost:3000/api/v1/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipePayload)
      });

      if (!recipeRes.ok) throw new Error('Failed to create recipe');

      alert('Pizza and recipe created!');
      nameInput.value = '';
      document.querySelectorAll('.generator__filters-item input:checked')
        .forEach(cb => cb.checked = false);

    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadFilters();
  setupPizzaGenerationButton();
  setupPizzaSavingButton();
  initializeCategoryToggle();
});
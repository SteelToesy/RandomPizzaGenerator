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

let selectedIngredients;

//generating pizza
function setupPizzaGenerationButton() {
  const listContainer = document.querySelector('.generator__ingredients-generated');


  const generationButtons = [
    document.querySelector('.generator__submission-regenerate-button'),
    document.querySelector('.generator__generation-button')
  ];

  document.querySelector('.generator__typ-regenerate-button').addEventListener('click', () => {
    document.querySelector('.generator__generation').classList.remove('disabled');
    document.querySelector('.generator__typ').classList.remove('active');
  })

  document.querySelector('.generator__generation-button').addEventListener('click', async () => {
    document.querySelector('.generator__submission').classList.add('active');
    document.querySelector('.generator__generation').classList.add('disabled');
  });

  generationButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', async () => {
        listContainer.innerHTML = '';

        const toppingAmount = parseInt(document.getElementById('topping_amount').value, 10);
        const checked = Array.from(document.querySelectorAll('.generator__filters-item input:checked'));
        const randomizedChecked = checked.sort(() => Math.random() - 0.5);
        selectedIngredients = randomizedChecked.slice(0, toppingAmount).map(input => input.name);

        selectedIngredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.className = 'generator__ingredients-item';
            li.textContent = ingredient;
            listContainer.appendChild(li);
        });
      });
    }
  });
}

// saving pizza
function setupPizzaSavingButton() {
  const submissionButton = document.querySelector('.generator__submission-button.btn__primary');

  submissionButton.addEventListener('click', async () => {
    const nameInput = document.querySelector('#generator__pizza-name');
    const descriptionInput = document.getElementById('generator__pizza-description');
    const stepsInput = document.getElementById('generator__pizza-steps');

    let pizzaName = nameInput.value.trim();
    let pizzaDescription = descriptionInput.innerText.trim();
    let pizzaSteps = stepsInput.innerText.trim();

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
        description: pizzaDescription,
        steps: pizzaSteps,
        pizzaId: pizza.id,
        ingredients: selectedIngredients
      };

      const recipeRes = await fetch('http://localhost:3000/api/v1/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipePayload)
      });

      if (!recipeRes.ok) throw new Error('Failed to create recipe');

      document.querySelector('.generator__submission').classList.remove('active');
      document.querySelector('.generator__typ').classList.add('active');

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
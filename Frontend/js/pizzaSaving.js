function setupPizzaSavingButton() {
  const submissionButton = document.querySelector('.generator__submission-button.btn__primary');
  submissionButton.addEventListener('click', savePizza);
}

async function savePizza() {
  const nameInput = document.querySelector('#generator__pizza-name');
  const descriptionInput = document.getElementById('generator__pizza-description');
  const stepsInput = document.getElementById('generator__pizza-steps');

  let pizzaName = nameInput.value.trim();
  let pizzaDescription = descriptionInput.innerText.trim();
  let pizzaSteps = stepsInput.innerText.trim();

  if (selectedIngredients.length === 0) {
    selectRandomIngredients();
  }

  if (!pizzaName) {
    pizzaName = await generateFallbackPizzaName();
    if (!pizzaName) return;
  }

  try {
    const existingPizzasRes = await fetch('http://localhost:3000/api/v1/pizzas');
    if (!existingPizzasRes.ok) throw new Error('Failed to fetch pizzas');
    const existingPizzas = await existingPizzasRes.json();

    const existingPizza = existingPizzas.find(p => p.name.toLowerCase() === pizzaName.toLowerCase());

    let pizza;
    if (existingPizza) {
      pizza = await updatePizza(existingPizza.id, pizzaName);
    } else {
      pizza = await createPizza(pizzaName);
    }

    await createOrUpdateRecipe(pizza, pizzaDescription, pizzaSteps);
    resetForm(nameInput);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

function selectRandomIngredients() {
  const allCheckboxes = Array.from(document.querySelectorAll('.generator__filters-item input'));
  shuffleArray(allCheckboxes);

  const randomCount = Math.floor(Math.random() * 4) + 1;
  selectedIngredients = [];

  for (let i = 0; i < randomCount; i++) {
    selectedIngredients.push(allCheckboxes[i].name);
  }
}

async function generateFallbackPizzaName() {
  try {
    const res = await fetch('http://localhost:3000/api/v1/pizzas');
    const pizzas = await res.json();
    return `Pizza ${pizzas.length + 1}`;
  } catch (error) {
    alert('Failed to fetch existing pizzas');
    return null;
  }
}

function resetForm(nameInput) {
  document.querySelector('.generator__submission').classList.remove('active');
  document.querySelector('.generator__typ').classList.add('active');

  nameInput.value = '';

  const checkedInputs = document.querySelectorAll('.generator__filters-item input:checked');
  for (let i = 0; i < checkedInputs.length; i++) {
    checkedInputs[i].checked = false;
  }
}

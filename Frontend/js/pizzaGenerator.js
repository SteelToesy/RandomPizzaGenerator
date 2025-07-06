function setupPizzaGenerationButton() {
  const listContainer = document.querySelector('.generator__ingredients-generated');

  const generationButtons = [
    document.querySelector('.generator__submission-regenerate-button'),
    document.querySelector('.generator__generation-button')
  ];

  document.querySelector('.generator__typ-regenerate-button').addEventListener('click', resetGenerationView);

  document.querySelector('.generator__generation-button').addEventListener('click', () => {
    document.querySelector('.generator__submission').classList.add('active');
    document.querySelector('.generator__generation').classList.add('disabled');
  });

  for (let i = 0; i < generationButtons.length; i++) {
    const button = generationButtons[i];
    if (button) {
      button.addEventListener('click', () => generatePizza(listContainer));
    }
  }
}

function resetGenerationView() {
  document.querySelector('.generator__generation').classList.remove('disabled');
  document.querySelector('.generator__typ').classList.remove('active');
}

function generatePizza(listContainer) {
  listContainer.innerHTML = '';
  const toppingAmount = parseInt(document.getElementById('topping_amount').value, 10);

  const checkedInputs = document.querySelectorAll('.generator__filters-item input:checked');
  const checked = Array.from(checkedInputs);

  shuffleArray(checked);

  selectedIngredients = [];
  for (let i = 0; i < Math.min(toppingAmount, checked.length); i++) {
    selectedIngredients.push(checked[i].name);
  }

  for (let i = 0; i < selectedIngredients.length; i++) {
    const li = document.createElement('li');
    li.className = 'generator__ingredients-item';
    li.textContent = selectedIngredients[i];
    listContainer.appendChild(li);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

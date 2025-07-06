const pizzaListing = document.querySelector('.pizza__listing');

async function loadPizzas() {
  const res = await fetch('http://localhost:3000/api/v1/pizzas/summaries');
  const pizzas = await res.json();
  pizzaListing.innerHTML = '';

  pizzas.forEach(pizza => {
    const pizzaEl = document.createElement('div');
    pizzaEl.classList.add('pizza__item');

    pizzaEl.innerHTML = `
      <h2 class="h3" id="${pizza.id}">${pizza.name}</h2>
      <h3 class="h5">amount of toppings: ${pizza.toppingCount}</h3>
      <h3 class="h5">Rating: ${pizza.averageRating ?? 'No reviews'}</h3>
      <button class="btn btn__primary">Remove this pizza</button>
    `;

    const removeButton = pizzaEl.querySelector('button');
    removeButton.addEventListener('click', async () => {
      await deletePizza(pizza.id);
      loadPizzas(); 
    });

    pizzaListing.appendChild(pizzaEl);
  });
}

async function deletePizza(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/pizzas/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Failed to delete pizza:', errorData.message);
    }
  } catch (error) {
    console.error('Error deleting pizza:', error);
  }
}


loadPizzas();
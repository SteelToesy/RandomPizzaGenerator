const pizzaListing = document.querySelector('.pizza__listing');

async function loadPizzas() {
  const res = await fetch('http://localhost:3000/api/v1/pizzas/summaries');
  const pizzas = await res.json();

  pizzaListing.innerHTML = ''; // Clear existing pizzas

  pizzas.forEach(pizza => {
    const pizzaEl = document.createElement('div');
    pizzaEl.classList.add('pizza__item');

    pizzaEl.innerHTML = `
      <h2 class="h3">${pizza.name}</h2>
      <h3 class="h5">amount of toppings: ${pizza.toppingCount}</h3>
      <h3 class="h5">Rating: ${pizza.averageRating ?? 'No reviews'}</h3>
      <button class="btn btn__primary">View this pizza</button>
    `;

    pizzaListing.appendChild(pizzaEl);
  });
}

loadPizzas();
fetch('http://localhost:3000/api/v1/pizzas')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('pizza-container');
    data.forEach(pizza => {
      const pizzaElement = document.createElement('div');
      pizzaElement.innerHTML = `<h3>${pizza.name}</h3>`;
      container.appendChild(pizzaElement);
    });
  })
  .catch(error => console.error('Error fetching pizzas:', error));

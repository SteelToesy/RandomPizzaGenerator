async function updatePizza(id, name) {
  const res = await fetch(`http://localhost:3000/api/v1/pizzas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  if (!res.ok) throw new Error('Failed to update pizza');
  return await res.json();
}

async function createPizza(name) {
  const res = await fetch('http://localhost:3000/api/v1/pizzas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  if (!res.ok) throw new Error('Failed to create pizza');
  return await res.json();
}

async function createRecipe(pizza, description, steps) {
  const recipePayload = {
    name: `${pizza.name} Recipe`,
    description,
    steps,
    pizzaId: pizza.id,
    ingredients: selectedIngredients
  };

  const res = await fetch('http://localhost:3000/api/v1/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipePayload)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create recipe');
  }

  return await res.json();
}

async function updateRecipe(recipeId, pizza, description, steps) {
  const recipePayload = {
    name: `${pizza.name} Recipe`,
    description,
    steps,
    pizzaId: pizza.id,
    ingredients: selectedIngredients
  };

  const res = await fetch(`http://localhost:3000/api/v1/recipes/${recipeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipePayload)
  });

  if (!res.ok) throw new Error('Failed to update recipe');
}

async function createOrUpdateRecipe(pizza, description, steps) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/recipes`);
    if (!res.ok) throw new Error('Failed to fetch recipes');

    const recipes = await res.json();
    const existingRecipe = recipes.find(r => r.pizza_id === pizza.id);

    if (existingRecipe) {
      await updateRecipe(existingRecipe.id, pizza, description, steps);
    } else {
      await createRecipe(pizza, description, steps);
    }
  } catch (error) {
    throw new Error('Error managing recipe: ' + error.message);
  }
}

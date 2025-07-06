import db from '../db/db.js';

export const getAllRecipes = (req, res) => {
  const stmt = db.prepare('SELECT * FROM recipe');
  const recipes = stmt.all();

  if (recipes.length === 0) {
    return res.status(404).json({ message: 'No recipes found.' });
  }
  res.status(200).json(recipes);
};

export const getRecipeById = (req, res) => {
  const stmt = db.prepare('SELECT * FROM recipe WHERE id = ?');
  const recipe = stmt.get(req.params.id);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};

export const createRecipe = (req, res) => {
  const { name, description, steps, pizzaId, ingredients } = req.body;

  if (!name || !pizzaId || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'Missing required fields: name, pizzaId, and ingredients are required.' });
  }

  try {
    const insertRecipe = db.prepare(`
      INSERT INTO recipe (name, description, steps, pizza_id)
      VALUES (?, ?, ?, ?)
    `);
    const result = insertRecipe.run(name, description, steps, pizzaId);
    const recipeId = result.lastInsertRowid;

    const getIngredientId = db.prepare(`SELECT id FROM ingredient WHERE name = ?`);
    const linkIngredient = db.prepare(`
      INSERT INTO recipe_ingredient (recipe_id, ingredient_id)
      VALUES (?, ?)
    `);

    for (const ingredientName of ingredients) {
      const row = getIngredientId.get(ingredientName);
      if (row) {
        linkIngredient.run(recipeId, row.id);
      }
    }

    res.status(201).json({ id: recipeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
};


export const updateRecipe = (req, res) => {
  const { name, description, steps, pizzaId, ingredients } = req.body;
  const recipeId = req.params.id;

  if (!name || !pizzaId || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'Missing required fields: name, pizzaId, and ingredients are required.' });
  }

  const updateStmt = db.prepare('UPDATE recipe SET name = ?, description = ?, steps = ?, pizza_id = ? WHERE id = ?');
  const info = updateStmt.run(name, description, steps, pizzaId, recipeId);

  if (info.changes > 0) {
    const deleteIngredientsStmt = db.prepare('DELETE FROM recipe_ingredient WHERE recipe_id = ?');
    deleteIngredientsStmt.run(recipeId);

    const getIngredientId = db.prepare('SELECT id FROM ingredient WHERE name = ?');
    const linkIngredient = db.prepare('INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (?, ?)');

    for (const ingredientName of ingredients) {
      const row = getIngredientId.get(ingredientName);
      if (row) {
        linkIngredient.run(recipeId, row.id);
      }
    }

    const updatedRecipe = db.prepare('SELECT * FROM recipe WHERE id = ?').get(recipeId);
    res.json(updatedRecipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};



export const deleteRecipe = (req, res) => {
  const stmt = db.prepare('DELETE FROM recipe WHERE id = ?');
  stmt.run(req.params.id);

  if (info.changes === 0) {
    return res.status(404).json({ message: 'Recipe not found.' });
  }
  
  res.status(204).send();
};

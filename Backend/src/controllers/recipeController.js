import db from '../db/db.js';

// GET all recipes
export const getAllRecipes = (req, res) => {
  const stmt = db.prepare('SELECT * FROM recipe');
  const recipes = stmt.all();
  res.json(recipes);
};

// GET recipe by ID
export const getRecipeById = (req, res) => {
  const stmt = db.prepare('SELECT * FROM recipe WHERE id = ?');
  const recipe = stmt.get(req.params.id);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};

// POST create recipe
export const createRecipe = (req, res) => {
  const { name, description, steps, pizzaId, ingredients } = req.body;

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


// PATCH/PUT update recipe
export const updateRecipe = (req, res) => {
  const { pizza_id } = req.body;

  const updateStmt = db.prepare('UPDATE recipe SET pizza_id = ? WHERE id = ?');
  const info = updateStmt.run(pizza_id, req.params.id);

  if (info.changes > 0) {
    const updatedRecipe = db.prepare('SELECT * FROM recipe WHERE id = ?').get(req.params.id);
    res.json(updatedRecipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};

// DELETE recipe
export const deleteRecipe = (req, res) => {
  const stmt = db.prepare('DELETE FROM recipe WHERE id = ?');
  stmt.run(req.params.id);
  res.status(204).send();
};

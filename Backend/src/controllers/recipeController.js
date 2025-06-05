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
  const { pizza_id } = req.body;

  if (!pizza_id) {
    return res.status(400).json({ message: 'pizza_id is required' });
  }

  try {
    const insertStmt = db.prepare('INSERT INTO recipe (pizza_id) VALUES (?)');
    const info = insertStmt.run(pizza_id);

    const newRecipe = db.prepare('SELECT * FROM recipe WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
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

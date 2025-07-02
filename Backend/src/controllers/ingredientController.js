import db from '../db/db.js';

export const getAllIngredients = (req, res) => {
  const stmt = db.prepare('SELECT * FROM ingredient');
  const ingredients = stmt.all();
  res.json(ingredients);
};

export const getIngredientById = (req, res) => {
  const stmt = db.prepare('SELECT * FROM ingredient WHERE id = ?');
  const ingredient = stmt.get(req.params.id);

  if (ingredient) {
    res.json(ingredient);
  } else {
    res.status(404).json({ message: 'Ingredient not found' });
  }
};

export const createIngredient = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Ingredient name is required' });

  const stmt = db.prepare('INSERT INTO ingredient (name) VALUES (?)');
  const info = stmt.run(name);

  const newIngredient = db.prepare('SELECT * FROM ingredient WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(newIngredient);
};

export const updateIngredient = (req, res) => {
  const { name } = req.body;

  const stmt = db.prepare('UPDATE ingredient SET name = ? WHERE id = ?');
  const info = stmt.run(name, req.params.id);

  if (info.changes > 0) {
    const updated = db.prepare('SELECT * FROM ingredient WHERE id = ?').get(req.params.id);
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Ingredient not found' });
  }
};

export const deleteIngredient = (req, res) => {
  const stmt = db.prepare('DELETE FROM ingredient WHERE id = ?');
  stmt.run(req.params.id);
  res.status(204).send();
};

export const getIngredientsGroupedByCategory = (req, res) => {
  const rows = db.prepare('SELECT * FROM ingredient').all();

  const grouped = rows.reduce((acc, ingredient) => {
    const category = ingredient.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(ingredient.name);
    return acc;
  }, {});

  res.json(grouped);
};
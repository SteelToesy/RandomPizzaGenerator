import pool from '../db.js';

export const getAllIngredients = async (req, res) => {
  const result = await pool.query('SELECT * FROM ingredient');
  res.json(result.rows);
};

export const getIngredientById = async (req, res) => {
  const result = await pool.query('SELECT * FROM ingredient WHERE id = $1', [req.params.id]);
  result.rows.length
    ? res.json(result.rows[0])
    : res.status(404).json({ message: 'Ingredient not found' });
};

export const createIngredient = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Ingredient name is required' });

  const result = await pool.query(
    'INSERT INTO ingredient (name) VALUES ($1) RETURNING *',
    [name]
  );
  res.status(201).json(result.rows[0]);
};

export const updateIngredient = async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    'UPDATE ingredient SET name = $1 WHERE id = $2 RETURNING *',
    [name, req.params.id]
  );
  result.rows.length
    ? res.json(result.rows[0])
    : res.status(404).json({ message: 'Ingredient not found' });
};

export const deleteIngredient = async (req, res) => {
  await pool.query('DELETE FROM ingredient WHERE id = $1', [req.params.id]);
  res.status(204).send();
};

import pool from '../db.js';

export const getAllRecipes = async (req, res) => {
  const result = await pool.query('SELECT * FROM recipe');
  res.json(result.rows);
};

export const getRecipeById = async (req, res) => {
  const result = await pool.query('SELECT * FROM recipe WHERE id = $1', [req.params.id]);
  result.rows.length
    ? res.json(result.rows[0])
    : res.status(404).json({ message: 'Recipe not found' });
};

export const createRecipe = async (req, res) => {
  const { pizza_id } = req.body;
  if (!pizza_id) return res.status(400).json({ message: 'pizza_id is required' });

  const result = await pool.query(
    'INSERT INTO recipe (pizza_id) VALUES ($1) RETURNING *',
    [pizza_id]
  );
  res.status(201).json(result.rows[0]);
};

export const updateRecipe = async (req, res) => {
  const { pizza_id } = req.body;
  const result = await pool.query(
    'UPDATE recipe SET pizza_id = $1 WHERE id = $2 RETURNING *',
    [pizza_id, req.params.id]
  );
  result.rows.length
    ? res.json(result.rows[0])
    : res.status(404).json({ message: 'Recipe not found' });
};

export const deleteRecipe = async (req, res) => {
  await pool.query('DELETE FROM recipe WHERE id = $1', [req.params.id]);
  res.status(204).send();
};

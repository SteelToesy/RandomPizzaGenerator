import pool from '../db.js';

export const getAllPizzas = async (req, res) => {
  const result = await pool.query('SELECT * FROM pizza');
  res.json(result.rows);
};

export const getPizzaById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM pizza WHERE id = $1', [id]);
  result.rows.length
    ? res.json(result.rows[0])
    : res.status(404).json({ message: 'Pizza not found' });
};

export const updatePizza = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await pool.query(
    'UPDATE pizza SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  result.rows.length
    ? res.json(result.rows[0])
    : res.status(404).json({ message: 'Pizza not found' });
};

export const deletePizza = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM pizza WHERE id = $1', [id]);
  res.status(204).send(); // No Content
};

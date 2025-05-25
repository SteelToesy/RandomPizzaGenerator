import pool from '../db.js';

export const getAllPizzas = async (req, res) => {
  const result = await pool.query('SELECT * FROM pizza');
  res.json(result.rows);
};

export const createPizza = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Pizza name is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO pizza (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating pizza:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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

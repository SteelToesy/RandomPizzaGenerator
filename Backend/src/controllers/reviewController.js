import pool from '../db.js';

export const getAllReviews = async (req, res) => {
  const result = await pool.query('SELECT * FROM review');
  res.json(result.rows);
};

export const getReviewById = async (req, res) => {
  const result = await pool.query('SELECT * FROM review WHERE id = $1', [req.params.id]);
  result.rows.length
    ? res.json(result.rows[0])
    : res.status(404).json({ message: 'Review not found' });
};

export const createReview = async (req, res) => {
  const { pizza_id, rating, comment } = req.body;
  if (!pizza_id || !rating) {
    return res.status(400).json({ message: 'pizza_id and rating are required' });
  }

  const result = await pool.query(
    'INSERT INTO review (pizza_id, rating, comment) VALUES ($1, $2, $3) RETURNING *',
    [pizza_id, rating, comment]
  );
  res.status(201).json(result.rows[0]);
};

export const updateReview = async (req, res) => {
  const { rating, comment } = req.body;
  const result = await pool.query(
    'UPDATE review SET rating = $1, comment = $2 WHERE id = $3 RETURNING *',
    [rating, comment, req.params.id]
  );
  result.rows.length
    ? res.json(result.rows[0])
    : res.status(404).json({ message: 'Review not found' });
};

export const deleteReview = async (req, res) => {
  await pool.query('DELETE FROM review WHERE id = $1', [req.params.id]);
  res.status(204).send();
};

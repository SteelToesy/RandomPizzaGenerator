import db from '../db/db.js';

export const getAllReviews = (req, res) => {
  const stmt = db.prepare('SELECT * FROM review');
  const reviews = stmt.all();

  if (reviews === 0){
    res.status(404).json({message: 'No reviews found'})
  }
    res.status(200).send();
};

export const getReviewById = (req, res) => {
  const stmt = db.prepare('SELECT * FROM review WHERE id = ?');
  const review = stmt.get(req.params.id);

  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
};

export const createReview = (req, res) => {
  const { pizza_id, rating, comment } = req.body;

  if (!pizza_id || !rating) {
    return res.status(400).json({ message: 'pizza_id and rating are required' });
  }

  try {
    const insertStmt = db.prepare(
      'INSERT INTO review (pizza_id, rating, comment) VALUES (?, ?, ?)'
    );
    const info = insertStmt.run(pizza_id, rating, comment);

    const newReview = db.prepare('SELECT * FROM review WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateReview = (req, res) => {
  const { rating, comment } = req.body;

  const updateStmt = db.prepare(
    'UPDATE review SET rating = ?, comment = ? WHERE id = ?'
  );
  const info = updateStmt.run(rating, comment, req.params.id);

  if (info.changes > 0) {
    const updatedReview = db.prepare('SELECT * FROM review WHERE id = ?').get(req.params.id);
    res.json(updatedReview);
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
};

export const deleteReview = (req, res) => {
  const stmt = db.prepare('DELETE FROM review WHERE id = ?');
  stmt.run(req.params.id);
  
  if (info.changes === 0) {
    return res.status(404).json({ message: 'Review not found.' });
  }

  res.status(204).send();
};

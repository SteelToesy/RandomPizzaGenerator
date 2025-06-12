import db from '../db/db.js';

// GET all pizzas
export const getAllPizzas = (req, res) => {
  const stmt = db.prepare('SELECT * FROM pizza');
  const pizzas = stmt.all();
  res.json(pizzas);
};

// GET pizza by ID
export const getPizzaById = (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('SELECT * FROM pizza WHERE id = ?');
  const pizza = stmt.get(id);

  if (pizza) {
    res.json(pizza);
  } else {
    res.status(404).json({ message: 'Pizza not found' });
  }
};

// GET pizza info for listing
export const getPizzaSummaries = (req, res) => {
  const stmt = db.prepare(`
    SELECT 
      p.id, 
      p.name, 
      COUNT(DISTINCT ri.ingredient_id) AS toppingCount,
      ROUND(AVG(r.rating), 1) AS averageRating
    FROM pizza p
    LEFT JOIN recipe rc ON p.id = rc.pizza_id
    LEFT JOIN recipe_ingredient ri ON rc.id = ri.recipe_id
    LEFT JOIN review r ON p.id = r.pizza_id
    GROUP BY p.id
  `);

  const pizzas = stmt.all();
  res.json(pizzas);
};



// POST create new pizza
export const createPizza = (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Pizza name is required' });
  }

  try {
    const stmt = db.prepare('INSERT INTO pizza (name) VALUES (?)');
    const result = stmt.run(name.trim());
    res.status(201).json({ id: result.lastInsertRowid, name: name.trim() });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};


// PATCH/PUT update pizza
export const updatePizza = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updateStmt = db.prepare('UPDATE pizza SET name = ? WHERE id = ?');
  const info = updateStmt.run(name, id);

  if (info.changes > 0) {
    const updatedPizza = db.prepare('SELECT * FROM pizza WHERE id = ?').get(id);
    res.json(updatedPizza);
  } else {
    res.status(404).json({ message: 'Pizza not found' });
  }
};

// DELETE pizza
export const deletePizza = (req, res) => {
  const { id } = req.params;
  const deleteStmt = db.prepare('DELETE FROM pizza WHERE id = ?');
  deleteStmt.run(id);
  res.status(204).send(); // No Content
};

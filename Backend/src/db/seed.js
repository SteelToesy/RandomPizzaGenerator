import db from './db.js';

db.exec(`
  DROP TABLE IF EXISTS review;
  DROP TABLE IF EXISTS recipe_ingredient;
  DROP TABLE IF EXISTS recipe;
  DROP TABLE IF EXISTS pizza;
  DROP TABLE IF EXISTS ingredient;

  CREATE TABLE ingredient (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT,
    quantity TEXT,
    category TEXT
  );

  CREATE TABLE pizza (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );

  CREATE TABLE recipe (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    steps TEXT,
    pizza_id INTEGER UNIQUE,
    FOREIGN KEY (pizza_id) REFERENCES pizza(id) ON DELETE CASCADE
  );

  CREATE TABLE recipe_ingredient (
    recipe_id INTEGER,
    ingredient_id INTEGER,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id) ON DELETE CASCADE
  );

  CREATE TABLE review (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pizza_id INTEGER,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    author TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pizza_id) REFERENCES pizza(id) ON DELETE CASCADE
  );
`);

const insertIngredient = db.prepare('INSERT INTO ingredient (name, type, quantity, category) VALUES (?, ?, ?, ?)');
insertIngredient.run('Tomato Sauce', 'sauce', '100g', 'vegetable');
insertIngredient.run('Mozzarella', 'cheese', '100g', 'dairy');
insertIngredient.run('Basil', 'herb', '10 leaves', 'vegetable');
insertIngredient.run('Pepperoni', 'meat', '80g', 'meat');
insertIngredient.run('Olives', 'topping', '30g', 'vegetable');

const insertPizza = db.prepare('INSERT INTO pizza (name) VALUES (?)');
insertPizza.run('Margherita');
insertPizza.run('Pepperoni Feast');

const insertRecipe = db.prepare('INSERT INTO recipe (name, description, steps, pizza_id) VALUES (?, ?, ?, ?)');
insertRecipe.run('Margherita Recipe', 'Classic with basil', 'Spread sauce, add cheese, top with basil.', 1);
insertRecipe.run('Pepperoni Recipe', 'Spicy meat lover', 'Layer sauce, cheese, then pepperoni.', 2);

const insertRecipeIngredient = db.prepare('INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (?, ?)');
insertRecipeIngredient.run(1, 1); // Tomato Sauce for Margherita
insertRecipeIngredient.run(1, 2); // Mozzarella
insertRecipeIngredient.run(1, 3); // Basil

insertRecipeIngredient.run(2, 1); // Tomato Sauce
insertRecipeIngredient.run(2, 2); // Mozzarella
insertRecipeIngredient.run(2, 4); // Pepperoni

const insertReview = db.prepare('INSERT INTO review (pizza_id, rating, comment, author) VALUES (?, ?, ?, ?)');
insertReview.run(1, 5, 'Delicious and fresh!', 'Alice');
insertReview.run(2, 4, 'Spicy and satisfying!', 'Bob');
insertReview.run(2, 3, 'Too spicy for me, but good quality.', 'Charlie');

console.log('Database seeded successfully!');
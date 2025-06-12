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

insertIngredient.run('Mushrooms', 'topping', '50g', 'vegetable');
insertIngredient.run('Onions', 'topping', '40g', 'vegetable');
insertIngredient.run('Green Peppers', 'topping', '35g', 'vegetable');
insertIngredient.run('Black Olives', 'topping', '30g', 'vegetable');
insertIngredient.run('Parmesan', 'cheese', '50g', 'dairy');

insertIngredient.run('Ham', 'meat', '70g', 'meat');
insertIngredient.run('Bacon', 'meat', '60g', 'meat');
insertIngredient.run('Pineapple', 'topping', '50g', 'fruit');
insertIngredient.run('Chicken', 'meat', '80g', 'meat');
insertIngredient.run('Spinach', 'topping', '30g', 'vegetable');

insertIngredient.run('Sun-dried Tomatoes', 'topping', '40g', 'vegetable');
insertIngredient.run('Ricotta', 'cheese', '60g', 'dairy');
insertIngredient.run('Arugula', 'topping', '20g', 'vegetable');
insertIngredient.run('Gorgonzola', 'cheese', '50g', 'dairy');
insertIngredient.run('Anchovies', 'meat', '30g', 'meat');

insertIngredient.run('Zucchini', 'topping', '45g', 'vegetable');
insertIngredient.run('Goat Cheese', 'cheese', '55g', 'dairy');
insertIngredient.run('Artichoke Hearts', 'topping', '40g', 'vegetable');
insertIngredient.run('Prosciutto', 'meat', '50g', 'meat');
insertIngredient.run('Cherry Tomatoes', 'topping', '40g', 'vegetable');

insertIngredient.run('Feta', 'cheese', '50g', 'dairy');
insertIngredient.run('Eggplant', 'topping', '50g', 'vegetable');
insertIngredient.run('Oregano', 'herb', '5g', 'vegetable');
insertIngredient.run('Rosemary', 'herb', '3g', 'vegetable');
insertIngredient.run('Chili Flakes', 'spice', '2g', 'vegetable');

insertIngredient.run('Truffle Oil', 'sauce', '10ml', 'oil');
insertIngredient.run('Pesto', 'sauce', '40g', 'vegetable');
insertIngredient.run('Barbecue Sauce', 'sauce', '50g', 'condiment');
insertIngredient.run('Garlic', 'topping', '10g', 'vegetable');
insertIngredient.run('Caramelized Onions', 'topping', '40g', 'vegetable');

insertIngredient.run('Sweet Corn', 'topping', '30g', 'vegetable');
insertIngredient.run('Capers', 'topping', '10g', 'vegetable');
insertIngredient.run('Crushed Red Pepper', 'spice', '3g', 'vegetable');
insertIngredient.run('Paprika', 'spice', '3g', 'vegetable');
insertIngredient.run('Sausage', 'meat', '70g', 'meat');

insertIngredient.run('Smoked Salmon', 'meat', '60g', 'meat');
insertIngredient.run('Broccoli', 'topping', '40g', 'vegetable');
insertIngredient.run('Blue Cheese', 'cheese', '40g', 'dairy');
insertIngredient.run('Alfredo Sauce', 'sauce', '50g', 'dairy');
insertIngredient.run('Egg', 'topping', '1 piece', 'protein');

insertIngredient.run('Chorizo', 'meat', '60g', 'meat');
insertIngredient.run('Jalapeños', 'topping', '20g', 'vegetable');
insertIngredient.run('Leeks', 'topping', '30g', 'vegetable');
insertIngredient.run('Beef', 'meat', '80g', 'meat');
insertIngredient.run('Red Onion', 'topping', '30g', 'vegetable');

insertIngredient.run('Seafood Mix', 'meat', '70g', 'meat');
insertIngredient.run('Crab Meat', 'meat', '50g', 'meat');
insertIngredient.run('Tuna', 'meat', '60g', 'meat');
insertIngredient.run('Cheddar', 'cheese', '50g', 'dairy');
insertIngredient.run('Horseradish Sauce', 'sauce', '20g', 'condiment');

insertIngredient.run('Fig', 'topping', '40g', 'fruit');
insertIngredient.run('Pear', 'topping', '35g', 'fruit');
insertIngredient.run('Apple Slices', 'topping', '30g', 'fruit');
insertIngredient.run('Grapes', 'topping', '30g', 'fruit');

insertIngredient.run('Olive Oil', 'sauce', '15ml', 'oil');
insertIngredient.run('Chili Oil', 'sauce', '10ml', 'oil');
insertIngredient.run('Garlic Oil', 'sauce', '10ml', 'oil');

insertIngredient.run('Hot Sauce', 'sauce', '10ml', 'condiment');
insertIngredient.run('Mustard', 'sauce', '15g', 'condiment');
insertIngredient.run('Aioli', 'sauce', '20g', 'condiment');

insertIngredient.run('Tofu', 'topping', '60g', 'protein');
insertIngredient.run('Tempeh', 'topping', '60g', 'protein');
insertIngredient.run('Boiled Egg', 'topping', '1 piece', 'protein');
insertIngredient.run('Lentils', 'topping', '50g', 'protein');

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
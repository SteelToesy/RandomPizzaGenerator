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

const ingredients = [
  ['Tomato Sauce', 'sauce', '100g', 'vegetable'],
  ['Mozzarella', 'cheese', '100g', 'dairy'],
  ['Basil', 'herb', '10 leaves', 'vegetable'],
  ['Pepperoni', 'meat', '80g', 'meat'],
  ['Olives', 'topping', '30g', 'vegetable'],

  ['Mushrooms', 'topping', '50g', 'vegetable'],
  ['Onions', 'topping', '40g', 'vegetable'],
  ['Green Peppers', 'topping', '35g', 'vegetable'],
  ['Black Olives', 'topping', '30g', 'vegetable'],
  ['Parmesan', 'cheese', '50g', 'dairy'],

  ['Ham', 'meat', '70g', 'meat'],
  ['Bacon', 'meat', '60g', 'meat'],
  ['Pineapple', 'topping', '50g', 'fruit'],
  ['Chicken', 'meat', '80g', 'meat'],
  ['Spinach', 'topping', '30g', 'vegetable'],

  ['Sun-dried Tomatoes', 'topping', '40g', 'vegetable'],
  ['Ricotta', 'cheese', '60g', 'dairy'],
  ['Arugula', 'topping', '20g', 'vegetable'],
  ['Gorgonzola', 'cheese', '50g', 'dairy'],
  ['Anchovies', 'meat', '30g', 'meat'],

  ['Zucchini', 'topping', '45g', 'vegetable'],
  ['Goat Cheese', 'cheese', '55g', 'dairy'],
  ['Artichoke Hearts', 'topping', '40g', 'vegetable'],
  ['Prosciutto', 'meat', '50g', 'meat'],
  ['Cherry Tomatoes', 'topping', '40g', 'vegetable'],

  ['Feta', 'cheese', '50g', 'dairy'],
  ['Eggplant', 'topping', '50g', 'vegetable'],
  ['Oregano', 'herb', '5g', 'vegetable'],
  ['Rosemary', 'herb', '3g', 'vegetable'],
  ['Chili Flakes', 'spice', '2g', 'vegetable'],

  ['Truffle Oil', 'sauce', '10ml', 'oil'],
  ['Pesto', 'sauce', '40g', 'vegetable'],
  ['Barbecue Sauce', 'sauce', '50g', 'condiment'],
  ['Garlic', 'topping', '10g', 'vegetable'],
  ['Caramelized Onions', 'topping', '40g', 'vegetable'],

  ['Sweet Corn', 'topping', '30g', 'vegetable'],
  ['Capers', 'topping', '10g', 'vegetable'],
  ['Crushed Red Pepper', 'spice', '3g', 'vegetable'],
  ['Paprika', 'spice', '3g', 'vegetable'],
  ['Sausage', 'meat', '70g', 'meat'],

  ['Smoked Salmon', 'meat', '60g', 'meat'],
  ['Broccoli', 'topping', '40g', 'vegetable'],
  ['Blue Cheese', 'cheese', '40g', 'dairy'],
  ['Alfredo Sauce', 'sauce', '50g', 'dairy'],
  ['Egg', 'topping', '1 piece', 'protein'],

  ['Chorizo', 'meat', '60g', 'meat'],
  ['Jalapeños', 'topping', '20g', 'vegetable'],
  ['Leeks', 'topping', '30g', 'vegetable'],
  ['Beef', 'meat', '80g', 'meat'],
  ['Red Onion', 'topping', '30g', 'vegetable'],

  ['Seafood Mix', 'meat', '70g', 'meat'],
  ['Crab Meat', 'meat', '50g', 'meat'],
  ['Tuna', 'meat', '60g', 'meat'],
  ['Cheddar', 'cheese', '50g', 'dairy'],
  ['Horseradish Sauce', 'sauce', '20g', 'condiment'],

  ['Fig', 'topping', '40g', 'fruit'],
  ['Pear', 'topping', '35g', 'fruit'],
  ['Apple Slices', 'topping', '30g', 'fruit'],
  ['Grapes', 'topping', '30g', 'fruit'],

  ['Olive Oil', 'sauce', '15ml', 'oil'],
  ['Chili Oil', 'sauce', '10ml', 'oil'],
  ['Garlic Oil', 'sauce', '10ml', 'oil'],

  ['Hot Sauce', 'sauce', '10ml', 'condiment'],
  ['Mustard', 'sauce', '15g', 'condiment'],
  ['Aioli', 'sauce', '20g', 'condiment'],

  ['Tofu', 'topping', '60g', 'protein'],
  ['Tempeh', 'topping', '60g', 'protein'],
  ['Boiled Egg', 'topping', '1 piece', 'protein'],
  ['Lentils', 'topping', '50g', 'protein']
];


const pizzas = [
  ['Margherita'],
  ['Pepperoni Feast']
];

const recipes = [
  ['Margherita Recipe', 'Classic with basil', 'Spread sauce, add cheese, top with basil.', 1],
  ['Pepperoni Recipe', 'Spicy meat lover', 'Layer sauce, cheese, then pepperoni.', 2]
];

const recipeIngredients = [
  [1, 1],
  [1, 2],
  [1, 3],
  [2, 1],
  [2, 2], 
  [2, 4], 
];

const reviews = [
  [1, 5, 'Delicious and fresh!', 'Alice'],
  [2, 4, 'Spicy and satisfying!', 'Bob'],
  [2, 3, 'Too spicy for me, but good quality.', 'Charlie']
];

const insertIngredient = db.prepare('INSERT INTO ingredient (name, type, quantity, category) VALUES (?, ?, ?, ?)');
const insertPizza = db.prepare('INSERT INTO pizza (name) VALUES (?)');
const insertRecipe = db.prepare('INSERT INTO recipe (name, description, steps, pizza_id) VALUES (?, ?, ?, ?)');
const insertRecipeIngredient = db.prepare('INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (?, ?)');
const insertReview = db.prepare('INSERT INTO review (pizza_id, rating, comment, author) VALUES (?, ?, ?, ?)');

const insertAll = db.transaction(() => {
  for (const ingredient of ingredients) {
    insertIngredient.run(...ingredient);
  }
  for (const pizza of pizzas) {
    insertPizza.run(...pizza);
  }
  for (const recipe of recipes) {
    insertRecipe.run(...recipe);
  }
  for (const ri of recipeIngredients) {
    insertRecipeIngredient.run(...ri);
  }
  for (const review of reviews) {
    insertReview.run(...review);
  }
});

insertAll();

console.log('Database seeded successfully!');

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import pizzaRouter from './routes/pizzaRouter.js';
import recipeRouter from './routes/recipeRouter.js';
import ingredientRouter from './routes/ingredientRouter.js';
import reviewRouter from './routes/reviewRouter.js';

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to Frontend folder
const frontendDir = path.join(__dirname, './../../Frontend');

const app = express();
const PORT = 3000;

// Serve static frontend files (JS, CSS, images, etc.)
app.use(express.static(frontendDir));
app.use(express.json());

// API routes
app.use('/api/v1/pizzas', pizzaRouter);
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/ingredients', ingredientRouter);
app.use('/api/v1/reviews', reviewRouter);

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// Clean routes for frontend pages in /pages/
app.get('/:page', (req, res) => {
  res.sendFile(path.join(frontendDir, 'pages', `${req.params.page}.html`));
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening at: http://localhost:${PORT}`);
});

export const port = PORT;
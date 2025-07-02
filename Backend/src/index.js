import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import pizzaRouter from './routes/pizzaRouter.js';
import recipeRouter from './routes/recipeRouter.js';
import ingredientRouter from './routes/ingredientRouter.js';
import reviewRouter from './routes/reviewRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.join(__dirname, './../../Frontend');

const app = express();
const PORT = 3000;

app.use(express.static(frontendDir));
app.use(express.json());

app.use('/api/v1/pizzas', pizzaRouter);
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/ingredients', ingredientRouter);
app.use('/api/v1/reviews', reviewRouter);

app.get('/', (res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.get('/:page', (req, res) => {
  res.sendFile(path.join(frontendDir, 'pages', `${req.params.page}.html`));
});

app.listen(PORT, () => {
  console.log(`Listening at: http://localhost:${PORT}`);
});

export const port = PORT;